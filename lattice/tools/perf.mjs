/**
 * Shinjuku's frame-cost budget, in headless Chrome, with no test framework.
 *   npm run perf        (or: node tools/perf.mjs)
 *
 * Every sprite added to the ward costs frame time, and nothing else in this repo notices. NEXT.md
 * records one such regression found by hand: ZAKKYO took the frame from 7.3 to 10.2 ms. Compiling
 * and `npm run check` were green throughout. This is the net for that: it starts its own Vite dev
 * server, opens three named views through tools/look.mjs, reads `loop.stats.frameMs` out of the
 * running page, and exits 1 if any view is over its budget.
 *
 * ## What is measured
 *
 * `frameMs` is the loop's own figure for one pump (update + render + bookkeeping), smoothed over
 * about eight frames. A single read is noise, so the page is sampled every 50 ms for four seconds
 * after a settle and the mean is taken. It does not include the display's cadence: that is what
 * `fps` carries, and it is printed for context but not budgeted.
 *
 * The three views are the three places the cost differs most:
 *   - opening    what a visitor sees first (the fit in main.ts), mostly the station and Nishi
 *   - kabukicho  tile (115, 35) at zoom 0.5: ZAKKYO country, the densest sign-and-lot block
 *   - station    tile (81, 76) at zoom 0.5: the rail corridor, decks, canopies and trains
 * Each view is a fresh page, so a camera move from an earlier view cannot warm a later one.
 * `order.count` (sprites in the sorted last frame) is printed beside each, because a number of
 * milliseconds alone cannot tell "a new sprite doubled the frame" from "the camera moved".
 *
 * ## Why a view that did not land is not a pass
 *
 * `--at` moves the camera with `zoomAt` + `centerOnTile`, and the camera clamps silently. A view
 * that clamped somewhere else would measure the wrong place and pass. So after sampling, the
 * camera is compared with where gridToWorld says the tile is, and with itself from before the
 * sampling started (a Vite full reload mid-run puts it back at the opening). Anything that does
 * not match, or a page that never rendered, is a measurement failure (exit 2), never a pass.
 *
 * ## How the budgets were chosen
 *
 * Each budget is the baseline measured on the working tree below, times 1.35, rounded up to the
 * next 0.5 ms. Headless Chrome here is software-rendered on a machine that is doing other things,
 * so two runs of the same code differ by a few percent; 35% is wider than that noise and far
 * narrower than the regressions this exists for (a new sprite doubling a frame is +100%).
 * It is a tripwire, not a microbenchmark. A GPU browser will be several times faster, so these
 * numbers say nothing about a real device, only about whether this tree got slower than itself.
 * Re-baseline (and say why in the commit) after an intended change: a FAIL prints the 1.35x
 * figures to paste in.
 *
 * Baseline: 2026-10-20 22:48, 1280x800, headless Chrome 155, a loaded Mac, on a frozen copy of
 * the working tree. Three back-to-back runs: opening 9.55 / 9.29 / 9.24, kabukicho 8.99 / 9.11 /
 * 9.02, station 6.10 / 5.92 / 5.99 (spread 1-3%); the budgets use the means (9.36, 9.04, 6.00).
 * At that moment kabukicho.ts, shopping.ts and entrances.ts were still placeholder boxes. When
 * the real Kabukicho art landed the same view measured 31-37 ms (about 4x), which is exactly what
 * a FAIL here is for: cheapen the art, or re-baseline kabukicho on purpose and say why.
 *
 * ## Exit codes, as look.mjs has them
 *
 * 0 every view under budget. 1 a view over budget. 2 could not measure (no Chrome, port busy, a
 * page that never compiled). Another agent editing src/ mid-run can leave a compile error for a
 * moment, so a failed view is retried after a wait before it becomes a 2.
 *
 * Impure by nature: spawns a dev server and a browser. The server is killed on every way out.
 */
import { spawn, spawnSync } from 'node:child_process';
import { get as httpGet } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gridToWorldX, gridToWorldY } from '@latticekit/iso';
import { look } from './look.mjs';

// ms per frame, per view. See "How the budgets were chosen" above before editing.
const BUDGET = {
  opening: 13.0, // baseline 9.36 ms
  kabukicho: 12.5, // baseline 9.04 ms
  station: 8.5, // baseline 6.00 ms
};

const PORT = 5199;
const URL = `http://localhost:${PORT}/`;
const SIZE = { width: 1280, height: 800 };
const SETTLE_MS = 3000; // after the camera move, before anything is read
const SAMPLE_MS = 4000; // how long frameMs is sampled
const ATTEMPTS = 4; // a view is tried this many times...
const RETRY_WAIT_MS = 30_000; // ...with this long between, for a tree that is mid-edit

/** `tile` and `zoom` are where the camera must land; `at` (built below) is how look.mjs gets it there. */
const VIEWS = [
  { name: 'opening' },
  { name: 'kabukicho', tile: [115, 35], zoom: 0.5 },
  { name: 'station', tile: [81, 76], zoom: 0.5 },
].map((v) => ({
  ...v,
  at: v.tile
    ? `(c => { c.zoomAt(${v.zoom} / c.zoom, c.viewW / 2, c.viewH / 2); c.centerOnTile(${v.tile[0]}, ${v.tile[1]}); })(window.__lattice.camera)`
    : null,
}));

/** Runs in the page: sample the stats, and bring back the evidence that the view held still. */
const SAMPLE = `(async () => {
  const L = window.__lattice;
  const cam = L.camera;
  const state = () => ({ x: cam.x, y: cam.y, zoom: cam.zoom });
  const before = state();
  const age = performance.now();
  const renders0 = L.loop.stats.renders;
  const frameMs = [];
  const fps = [];
  const end = performance.now() + ${SAMPLE_MS};
  while (performance.now() < end) {
    await new Promise((r) => setTimeout(r, 50));
    frameMs.push(L.loop.stats.frameMs);
    fps.push(L.loop.stats.fps);
  }
  return {
    frameMs, fps, before, after: state(), age,
    renders: L.loop.stats.renders - renders0,
    count: L.order.count,
    sameInstance: window.__lattice === L,
  };
})()`;

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/** Baseline times 1.35, up to the next 0.5 ms. The rule BUDGET was filled in by. */
const budgetFor = (baselineMs) => Math.ceil(baselineMs * 1.35 * 2) / 2;

// ── the dev server ───────────────────────────────────────────────────────────

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let vite = null;
// Our own children and nobody else's: vite, and the Chrome look.mjs spawned. look() closes its
// Chrome in a `finally`, which a SIGTERM never runs, and other agents may be running their own
// Chromes right now, so this matches on parent pid rather than on a name.
const stopChildren = () => {
  vite?.kill('SIGKILL');
  spawnSync('pkill', ['-KILL', '-P', String(process.pid)]);
};
process.on('exit', stopChildren);
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(sig, () => process.exit(130));

const answers = () =>
  new Promise((resolve) => {
    const req = httpGet(URL, (res) => (res.resume(), resolve(true)));
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => (req.destroy(), resolve(false)));
  });

async function startVite() {
  // Checked first: with --strictPort a busy port makes Vite exit, but a poll would already have
  // been answered by whatever else is on it, and we would measure somebody else's server.
  if (await answers()) throw new Error(`perf: port ${PORT} is already serving something — stop it first`);
  let tail = '';
  vite = spawn(process.execPath, [join(ROOT, 'node_modules/vite/bin/vite.js'), '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let exited = false;
  vite.on('exit', () => (exited = true));
  for (const stream of [vite.stdout, vite.stderr]) stream.on('data', (d) => (tail = (tail + d).slice(-1500)));

  for (const deadline = Date.now() + 30_000; Date.now() < deadline; await wait(200)) {
    if (exited) throw new Error(`perf: vite exited before it answered:\n${tail}`);
    if (await answers()) return;
  }
  throw new Error(`perf: vite did not answer on port ${PORT} within 30 s:\n${tail}`);
}

// ── one view ─────────────────────────────────────────────────────────────────

/** Open the view in a fresh page and read it. Throws if anything about it cannot be trusted. */
async function measureOnce(view) {
  const report = await look({
    url: URL,
    out: null,
    evals: [SAMPLE],
    at: view.at ? [view.at] : [],
    advanceMs: 0,
    settleMs: SETTLE_MS,
    gapMs: 250,
    ...SIZE,
  });
  const r = report.probes[0].value;
  // An expression that threw comes back as a string. A page that never compiled has no
  // `window.__lattice`, so this is also where a half-saved source file shows up.
  if (typeof r !== 'object' || r === null) throw new Error(`the page was not ready — ${r}`);

  // performance.now() restarts at every navigation. Vite full-reloads the page whenever a file under
  // src/ is saved, which puts the camera back at the opening and the frame costs back to cold.
  if (r.age < SETTLE_MS) throw new Error(`the page reloaded after the camera moved (it was ${Math.round(r.age)} ms old) — was src/ edited?`);
  if (!r.sameInstance) throw new Error('the page reloaded while it was being sampled');
  if (r.renders < 10) throw new Error(`only ${r.renders} frames rendered in ${SAMPLE_MS} ms — the numbers would be stale`);
  const drift = Math.max(Math.abs(r.after.x - r.before.x), Math.abs(r.after.y - r.before.y), Math.abs(r.after.zoom - r.before.zoom));
  if (drift > 0.5) throw new Error(`the camera moved during sampling (${drift.toFixed(2)})`);
  if (!(r.count > 0)) throw new Error('order.count is 0 — nothing was drawn');
  if (view.tile) {
    const [gx, gy] = view.tile;
    const want = { x: gridToWorldX(gx, gy), y: gridToWorldY(gx, gy) };
    if (Math.abs(r.after.x - want.x) > 0.5 || Math.abs(r.after.y - want.y) > 0.5 || Math.abs(r.after.zoom - view.zoom) > 1e-3) {
      throw new Error(
        `the camera did not land on tile ${gx},${gy} @ ${view.zoom}: ` +
          `it is at ${r.after.x.toFixed(1)},${r.after.y.toFixed(1)} @ ${r.after.zoom.toFixed(3)}, ` +
          `wanted ${want.x},${want.y} (the bounds clamp may have moved it)`,
      );
    }
  }
  return { ms: mean(r.frameMs), fps: mean(r.fps), count: r.count, camera: r.after };
}

async function measure(view) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await measureOnce(view);
    } catch (err) {
      // No browser is not a tree that is mid-edit; waiting will not conjure one.
      if (/no Chrome/.test(err.message) || attempt === ATTEMPTS) throw err;
      process.stderr.write(`perf: ${view.name}, attempt ${attempt}/${ATTEMPTS}: ${err.message.split('\n')[0]} — retrying in ${RETRY_WAIT_MS / 1000} s\n`);
      await wait(RETRY_WAIT_MS);
    }
  }
}

// ── the run ──────────────────────────────────────────────────────────────────

try {
  await startVite();
  const rows = [];
  for (const view of VIEWS) rows.push({ view, ...(await measure(view)) });

  console.log(`shinjuku perf: frameMs, ${SIZE.width}x${SIZE.height} headless Chrome, mean of ${SAMPLE_MS / 50} samples after ${SETTLE_MS / 1000} s`);
  let failed = false;
  for (const { view, ms, fps, count, camera } of rows) {
    const budget = BUDGET[view.name];
    const pass = ms <= budget;
    failed ||= !pass;
    console.log(
      `  ${pass ? 'PASS' : 'FAIL'}  ${view.name.padEnd(10)} baseline ${ms.toFixed(2)} ms  budget ${budget.toFixed(1)} ms  ` +
        `${fps.toFixed(0)} fps  ${count} in order  camera ${camera.x.toFixed(0)},${camera.y.toFixed(0)} @ ${camera.zoom.toFixed(2)}`,
    );
  }
  if (failed) {
    console.log(`\n  over budget. If the slowdown is intended, the 1.35x budgets for this tree are:`);
    console.log(`  ${rows.map(({ view, ms }) => `${view.name}: ${budgetFor(ms).toFixed(1)}`).join(', ')}`);
  }
  process.exit(failed ? 1 : 0);
} catch (err) {
  process.stderr.write(`${err.message}\n`);
  process.exit(2);
}
