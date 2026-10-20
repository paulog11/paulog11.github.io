/**
 * CHŌME — the boot, and the frame.
 *
 * The order in this file is the whole reason it is not written from memory.
 * Two mistakes here produce no error, no warning and a plausible-looking
 * picture: a hand-typed `stepMs` beside a loop running at 16.667 (every
 * gesture mistimed by a constant 4%), and a light field that was created but
 * never put on the pen (the entire night disabled in silence, while the field
 * goes on reporting that it is working). The loop is built BEFORE the input
 * because the input takes the loop itself as its step, and `light` is on the
 * `beginFrame` literal because that is the only place it can be.
 */
import { createScope } from '@latticekit/core';
import {
  DepthSorter, createCamera, tileBounds,
} from '@latticekit/iso';
import type { Rect, Tile, TileRange } from '@latticekit/iso';
import {
  LEVEL_H, beginFrame, createCanvas2dSurface, createLightField, createPalette,
  endFrame, isoTile, renderFrame,
} from '@latticekit/draw';
import type { Passes, Pen, SpriteDef, Variant } from '@latticekit/draw';
import { browserFrames, createLoop } from '@latticekit/loop';
import { createInput } from '@latticekit/input';
import { drive } from '@latticekit/ui';
import { installFlushTriggers } from '@latticekit/persist';

import { AVENUES, LANE_FAR, LANE_NEAR, LOTS, PITCH, W, avenue, isStreet, keyOf, lotOf, neighbourAt, neighbourLevel, tileOf } from './layout.ts';
import { KINDS, createWard } from './city.ts';
import type { Kind, Placed } from './city.ts';
import {
  DAY_X, NEIGHBOUR_DEF, NIGHT_X, defOf, drawCar, drawGhost, heightOf, paint,
  setHour, variantFor,
} from './sprites.ts';
import { createHud } from './hud.ts';
import { openSave } from './save.ts';
import { audio } from './sound.ts';

// ── the screen ───────────────────────────────────────────────────────────────

const host = document.getElementById('app') ?? document.body;
const canvas = document.createElement('canvas');
canvas.style.cssText = 'display:block;width:100%;height:100%';
canvas.setAttribute('aria-label', 'Chōme — an isometric ward you build, block by block');
host.append(canvas);

const scope = createScope();
const surface = createCanvas2dSurface(canvas);
// The DAY stop set, extended with the ward's own six materials. Both sets are
// hoisted at module scope in sprites.ts: a set rebuilt inside the render
// callback bumps `Palette.rev` every frame, and `rev` is what every cache in
// the kit keys on. The symptom is not a wrong colour — it is a frame time that
// climbs at dusk and stays climbed.
const palette = createPalette(DAY_X);

// ── the world, and the camera that has to be told about it ───────────────────

/** The fence: the whole map, plus six storeys of air rather than the tallest
 *  building's. `tileBounds`' height argument extends `minY` UPWARD, and what a
 *  camera clamp does with thirty storeys of that is let the player park the
 *  viewport in the sky above the far corner and still satisfy `keepVisible`. */
const worldRect: Rect = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
tileBounds(0, 0, W, W, LEVEL_H * 6, worldRect);

/** The opening shot is a REGION of the ward, never the whole of it. A fresh
 *  camera looks at world (0,0) — the top corner of the map in a 2:1 projection
 *  — so with no fit at all the first frame is empty sky beside the world.
 *  Fitting `worldRect` is the opposite failure: every corner on screen at once,
 *  which is the diorama. */
const opening: Rect = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
tileBounds(W * 0.3, W * 0.32, W * 0.4, W * 0.4, LEVEL_H * 6, opening);

const camera = createCamera(Math.max(1, innerWidth), Math.max(1, innerHeight), {
  bounds: worldRect,
  minZoom: 0.3,
  maxZoom: 2.8,
  keepVisible: 0.5,
});
camera.fitBounds(opening, 24);

// ── the night. Built unconditionally: it costs nothing while darkness is 0 ───
//
// Scarce, small and steep. A soft, wide, generously bloomed pool on every
// window does not add up to a lit ward — it adds up to fog, with no edge
// anywhere and no way to tell a lamp from the ground beside it.
const light = createLightField(surface, { scale: 0.7, falloff: 3.4, bloom: 0.24 });

const order = new DepthSorter(4096);

// ── the clock, BEFORE the input, because the input needs it ──────────────────

const loop = createLoop({
  clock: { now: () => performance.now() },
  // rAF paints; an interval ticks when the tab is hidden, so `update` keeps
  // running and the economy and the autosave do not stop existing.
  frames: browserFrames(),
});

const input = createInput({
  element: canvas,
  camera,
  step: loop,
  // The ward IS level — the streets are one plane and there is no height field
  // anywhere in this game. Saying so is what separates a flat world from one
  // that never answered: told nothing, `createInput` resolves on z = 0 anyway
  // and files a diagnostic about it.
  terrain: 'flat',
  actions: { build: ['tap'], cycle: ['key:Space'] },
});

// ── the ward ─────────────────────────────────────────────────────────────────

const saved = openSave(loop, () => {
  const s = ward.snapshot();
  return { version: 1 as const, coin: s.coin, lots: s.lots };
});
const ward = createWard(saved.opened.source === 'save'
  ? { coin: saved.opened.state.coin, lots: saved.opened.state.lots }
  : undefined);

scope.add(installFlushTriggers(saved.auto, { visibility: document, page: window }));

let selected: Kind = 'home';

// ── the HUD ──────────────────────────────────────────────────────────────────

const hud = createHud(loop, () => ({
  coin: ward.coin(),
  rate: ward.rate(),
  pop: ward.population(),
  night: ward.night(),
  selected,
  price: ward.price,
  affordable: (kind) => ward.coin() >= ward.price(kind),
  owned: ward.owned,
}), (kind) => {
  selected = kind;
  audio.unlock();
  audio.play('pick');
});
scope.add(drive(hud.ui, loop));
scope.add(hud.destroy);

// A save that may not persist is a toast: the player can do nothing about it
// and must not be blocked at the door.
if (!saved.opened.durable) {
  hud.say('not-durable', 'This browser may not keep your ward between visits.');
}
// A save that has STOPPED being written is different in kind — everything from
// now on is unrecorded — so it is said plainly rather than as a hint.
if (!saved.opened.writable) {
  hud.say('not-writable', 'A newer version of this game wrote the save. Nothing from now on is being kept.', 'bad');
}

// ── one resize handler, so there cannot be two that disagree ─────────────────

function fit(): void {
  const w = Math.max(1, innerWidth);
  const h = Math.max(1, innerHeight);
  // `surface.pixelRatio`, never `devicePixelRatio` — the surface already
  // clamped the device's ratio, and re-reading the raw one undoes that.
  surface.resize(w, h, surface.pixelRatio);
  camera.resize(w, h);
  camera.fitBounds(opening, 24);
}
addEventListener('resize', fit);
visualViewport?.addEventListener('resize', fit);
scope.add(() => {
  removeEventListener('resize', fit);
  visualViewport?.removeEventListener('resize', fit);
});
fit();

// ── the ward's day ───────────────────────────────────────────────────────────

/** A full day in three minutes: fast enough that somebody sees dusk inside the
 *  first ninety seconds, slow enough that it is not a strobe.
 *
 *  `?day=8` shortens it. That exists because the day runs on `loop.realTime`,
 *  which advances only as frames render — so a harness that fast-forwards the
 *  wall clock gets a fast-forwarded ECONOMY and a ward still standing at noon,
 *  and there is otherwise no way to look at the night without waiting for it. */
const DAY_SECONDS = (() => {
  const asked = Number(new URLSearchParams(location.search).get('day'));
  return Number.isFinite(asked) && asked >= 4 ? asked : 180;
})();
let daylight = 1;
let pushedRev = -1;

// ── what is in the frame ─────────────────────────────────────────────────────

interface Build {
  readonly def: SpriteDef;
  readonly gx: number;
  readonly gy: number;
  readonly v: Variant;
  readonly hPx: number;
}

/** A car is its index; a building is its object. ONE array, in the sorter's own
 *  index space, so `frame[order.indexAt(i)]` is the only expression that ever
 *  reads it. Two collections and an offset is arithmetic that is correct only
 *  while three unchecked facts hold at once. */
type Item = Build | number;
const frame: Item[] = [];

/** Built lazily and kept: a `Build` per lot, so a frame allocates nothing.
 *  Bounded by the lots the camera has actually visited. */
const views = new Map<number, Build>();

function buildFor(key: number, lx: number, ly: number, placed: Placed | undefined): Build {
  let b = views.get(key);
  if (b === undefined) {
    const def = placed === undefined ? NEIGHBOUR_DEF : defOf(placed.kind);
    const level = placed === undefined ? neighbourLevel(lx, ly) : 2;
    const v = variantFor(placed === undefined ? (lx * 73856093) ^ (ly * 19349663) : placed.seed, level);
    b = { def, gx: tileOf(lx), gy: tileOf(ly), v, hPx: heightOf(def, v) };
    views.set(key, b);
  }
  return b;
}

const CARS = 64;
const carX = new Float64Array(CARS);
const carY = new Float64Array(CARS);
const carAxis = new Uint8Array(CARS);

/** Traffic with no per-car state: position is a function of (index, time), so
 *  there is nothing to update and nothing to get out of step. */
function moveCars(t: number): void {
  for (let i = 0; i < CARS; i++) {
    const alongX = (i & 1) === 0;
    const a = (i * 7 + (i >> 1)) % AVENUES;
    const back = (i & 2) === 0;
    // Both lanes are INSIDE the street's two tiles. Taken from the street's
    // centre instead, the far lane lands on a lot and the car drives through
    // the buildings — see `avenue`.
    const lane = back ? LANE_NEAR : LANE_FAR;
    const speed = 3.1 + (i % 5) * 0.55;
    const s = (((back ? t : -t) * speed + i * 11.3) % W + W) % W;
    carAxis[i] = alongX ? 1 : 0;
    if (alongX) { carX[i] = s; carY[i] = avenue(a) + lane; }
    else { carX[i] = avenue(a) + lane; carY[i] = s; }
  }
}

const range: TileRange = { gx0: 0, gy0: 0, gx1: 0, gy1: 0 };
const hover: Tile = { gx: 0, gy: 0 };
let hovering = false;

/** Fill the sorter from the visible lots only. Everything off-screen costs
 *  exactly nothing because it was never asked about. */
function fillFrame(t: number): void {
  order.clear();
  camera.visibleTileBounds(range, 4);
  const lx0 = Math.max(0, Math.floor(range.gx0 / PITCH) * 4);
  const lx1 = Math.min(LOTS, (Math.floor(range.gx1 / PITCH) + 1) * 4);
  const ly0 = Math.max(0, Math.floor(range.gy0 / PITCH) * 4);
  const ly1 = Math.min(LOTS, (Math.floor(range.gy1 / PITCH) + 1) * 4);

  for (let ly = ly0; ly < ly1; ly++) {
    for (let lx = lx0; lx < lx1; lx++) {
      const key = keyOf(lx, ly);
      const placed = ward.lots.get(key);
      if (placed === undefined && !neighbourAt(lx, ly)) continue;
      const b = buildFor(key, lx, ly, placed);
      frame[order.add(b.gx, b.gy, 2, 2, b.hPx)] = b;
    }
  }

  moveCars(t);
  for (let i = 0; i < CARS; i++) {
    frame[order.addPoint(carX[i] ?? 0, carY[i] ?? 0, 0, 0.32)] = i;
  }
}

// ── the taps ─────────────────────────────────────────────────────────────────

input.onAction('build', (e) => {
  // The audio context cannot exist until a gesture, and this package installs
  // no listener of its own on purpose.
  audio.unlock();
  // `terrain: 'flat'` means `onGround` is always true, but the ward's edges are
  // not the lattice's, so `refuse` is what actually decides.
  const why = ward.refuse(selected, e.gx, e.gy);
  if (why !== undefined) {
    audio.play('deny');
    hud.say(`no:${why}`, why, 'bad');
    return;
  }
  const placed = ward.place(selected, e.gx, e.gy);
  if (placed === undefined) return;
  audio.play('place');
  if (ward.owned('park') === 0 && ward.owned('home') === 3) {
    hud.say('try-a-park', 'Three homes. A pocket park beside them would pay all of them more.', 'good');
  }
});

input.onAction('cycle', () => {
  const next = KINDS[(KINDS.indexOf(selected) + 1) % KINDS.length];
  if (next === undefined) return;
  selected = next;
  audio.unlock();
  audio.play('pick');
});

// ── the frame ────────────────────────────────────────────────────────────────

/** The pen for the sorted walk, hoisted: a visitor closed over `pen` would be
 *  a closure per frame, and this runs thirty times a second. */
let sheet: Pen | undefined;

function paintItem(item: Item): void {
  const pen = sheet;
  if (pen === undefined) return;
  if (typeof item === 'number') {
    drawCar(pen, item, carX[item] ?? 0, carY[item] ?? 0, carAxis[item] === 1);
    return;
  }
  paint(pen, item.def, item.gx, item.gy, item.v);
}

const passes: Passes = {
  // One storey of margin, not the tallest building's: the solids cull reads
  // each item's own height, so all this buys is enough over-scan that the
  // paving does not pop at the bottom edge.
  maxHeightPx: LEVEL_H,
  terrain(pen, visible) {
    const gx0 = Math.max(0, visible.gx0);
    const gx1 = Math.min(W, visible.gx1);
    for (let gy = Math.max(0, visible.gy0); gy < Math.min(W, visible.gy1); gy++) {
      const streetY = isStreet(gy);
      for (let gx = gx0; gx < gx1; gx++) {
        isoTile(pen, gx, gy, streetY || isStreet(gx) ? 'road' : 'paving');
      }
    }
  },
  solids(pen, sorted) {
    sheet = pen;
    for (let i = 0; i < sorted.count; i++) paintItem(frame[sorted.indexAt(i)] as Item);
  },
  placement(pen) {
    if (!hovering) return;
    const lx = lotOf(hover.gx);
    const ly = lotOf(hover.gy);
    if (lx < 0 || ly < 0) return;
    drawGhost(pen, tileOf(lx), tileOf(ly), selected,
      ward.refuse(selected, hover.gx, hover.gy) === undefined);
  },
};

loop.onUpdate((_dt, tick) => {
  // BEFORE the game's update: a handler must see the ward as the player left
  // it, not one step behind it.
  input.tick(tick);

  daylight = 0.5 + 0.5 * Math.cos((loop.realTime / DAY_SECONDS) * Math.PI * 2);
  const dark = daylight < 0.4;
  if (dark !== ward.night()) {
    ward.setNight(dark);
    audio.play('chime');
    hud.say(dark ? 'dusk' : 'dawn',
      dark ? 'Dusk. The shops trade better now.' : 'Morning over the ward.');
  }

  // There is no hover GESTURE — `GestureMap` has six members and none of them
  // is a pointer with no button down. Asking once per update is the only way,
  // and it goes through the same picker the tap does, so the ghost cannot
  // disagree with where the building lands.
  hovering = input.hoverTile(hover);

  // The palette is pushed from UPDATE, never from render: pushed from render it
  // stops in a backgrounded tab and the player comes back to a night ward under
  // a noon HUD. `lerp` quantizes `t` internally, so most of these are no-ops.
  palette.lerp(NIGHT_X, DAY_X, daylight);
  if (palette.rev !== pushedRev) pushedRev = palette.rev;
});

loop.onRender((_alpha, time, nowMs) => {
  // The camera's glide integrates here, at display rate. It delivers nothing.
  input.frame(nowMs);
  setHour(daylight, camera.zoom);
  fillFrame(time);

  // `light` on the literal. Left out, `pen.light` is undefined, every
  // `light.add` accumulates into a buffer nobody reads, and the field goes on
  // reporting `active: true` with a live count.
  const pen = beginFrame({ surface, camera, palette, t: time, clear: 'sky', light });
  // 0.45, not 1. The night is applied TWICE — `palette.lerp` has already
  // rolled every material to its NIGHT stop, and the light field's mask then
  // darkens what that produced. At a full-strength mask the two compound and
  // 71% of the frame composites to one near-black colour: the ward stops
  // existing rather than getting dark. The palette carries the hour; the mask
  // only has to make the lit things pop out of it.
  light.begin(pen, (1 - daylight) * 0.45, 'night');
  renderFrame(pen, passes, order);
  endFrame(pen);
});

// ── teardown, and the one line that saves an hour under Vite ─────────────────

function dispose(): void {
  loop.stop();
  input.dispose();
  light.dispose();
  scope.dispose();
  canvas.remove();
}
// HMR re-evaluates the module and `createInput` correctly throws on a second
// binding to the same canvas — while the FIRST instance is still bound and
// still rendering. So the symptom is not the error: it is a game that keeps
// drawing while every tap does nothing.
if (import.meta.hot) import.meta.hot.dispose(dispose);

loop.start();
