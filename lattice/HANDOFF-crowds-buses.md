# Handoff: crowds and buses (NEXT.md section 3 item 5)

> **FINISHED 2026-10-21.** Everything below was written when the work was unfinished and is kept only as history. What happened: buses and crowds were looked at in frames (day and night), people were re-scaled to world size with a far-zoom floor (the 2-4 px cap made them read as dust), paired A/B showed +0.10 to +0.13 ms, the check.mjs asserts were negative-tested. See NEXT.md 3.5. Safe to delete this file.

Stopped mid-task on the coordinator's instruction. Code is written and compiles; nothing has been measured and almost nothing has been looked at.

## 1. Status
- Buses: code written, **not looked at** (no screenshot of a bus, day or night). Partly done.
- Crowds (street margins, zebras, entrance flows): code written, **barely looked at**. Partly done.
- CROWDS table and check.mjs asserts: done, passing. The asserts have not been negative-tested (never confirmed they fail on a bad strip).
- Perf measurement (A/B): **not started.** No numbers exist.

## 2. Files touched
`npx tsc --noEmit` passes and `node tools/check.mjs` passes (23734 checks) as of the end of this session.
- `src/layout.ts`, "crowds" region at the end (from line ~468): `WALK_MARGIN`, `CrowdStrip`, helpers `margins()` / `crossing()`, the `CROWDS` table (16 strips), `ENTRANCE_PEOPLE` (6), `entranceWalk(e)` (4-point path: stair mouth, hood front, street margin, 3 tiles on toward the concourse).
- `src/crowd.ts` (new): `drawCrowds(pen, visible)`, `drawEntranceFlow(pen, k)`, `entranceAt(gx, gy)`. Per-person numbers hashed once into typed arrays; position is a pure function of (index, `pen.t`).
- `src/sprites.ts` (appended at the end, from line ~732): `BUS_H`, `drawBus(pen, i, gx, gy, alongX, forward)`.
- `src/main.ts`: imports; `carDir`, `isBus` (`(i & 7) === 3`), `BUS_AVENUE`, bus branch in `moveCars`; `BUS_HALF`; the bus rail test and `addPoint` height in `fillFrame`; the bus dispatch plus the entrance-flow hook in `paintItem`; `drawCrowds(pen, visible)` at the end of the `terrain` pass.
- `tools/check.mjs`: CROWDS section (line ~358) plus extra imports and one console line.

## 3. Design decisions and why
- Crowds draw in the **terrain pass** with `surface.ellipse` (an upright oval, 4 canvas calls). Not `isoTile`/`isoPatch`: a ground diamond reads as a smudge and costs 9 calls. Not sorter items: they would double the sorter's count. The terrain pass runs before solids, so buildings, decks and cars correctly cover people. Projection is one affine map per frame (`bx + (x-y)*HALF_W*zoom`), not a camera call per person.
- **Entrance flows** draw from `paintItem`, right after the entrance sprite, not in the terrain pass: the entrance sprite's paving covers its whole lot (`s.patch(0.06, ...)`), which would hide anyone on the forecourt. `entranceAt` finds the entrance by a position-keyed `Map` so entrance registration in main.ts stays untouched.
- Pedestrians use street margins (offsets 0..0.3 and 1.7..2) outside the car lanes at 0.4 and 1.6. The two zebra crossings per frontage do walk through the lanes; cars ignore them. Streets and entrance forecourts only: no "plaza" strips, because an empty lot has no reason for a crowd.
- LOD: each person has a fixed hash rank; drawn if `rank <= keepAt(zoom)`. Nothing below zoom 0.28, 20% at the 0.3 floor, linear up to 100% at zoom 1.0. A fixed rank means no pop in and out. A mark is 2-4 px at any zoom (`markSize`), not world-sized.
- Night: no light per person. Colours are pulled toward pale grey-blue in 8 quantised steps (`setColors`) so `cssOf` strings do not change every frame.
- Buses: every 8th vehicle (`i & 7 === 3`), 8 of 64, so the count is unchanged. First attempt was `i % 8 === 3` with the cars' own formula; dead end, because low bits `i & 3` are all `3`, so every bus drove north on a gy street and only avenues 2, 6, 10 and 14 (all Nishi) were used. Fix: axis and direction come from rank `k = i >> 3`; avenues come from `BUS_AVENUE = [8,7,7,9,5,10,6,11]` (station frontages, concourse cross-streets, Isetan, the 一番街 street). Speed 1.9-2.5 tiles/s against a car's 3.1-5.3. The sorter gets `BUS_H * LEVEL_H` as height (cars get 0) and radius 0.32. A bus is skipped if either end is in the rail corridor.
- `drawBus`: white or cream isoBox, a stripe wall in a signage slot, a window band (lit `warn` at night), and an end face (windscreen, board, lamps) only when `detail` (zoom > 0.52). Only the +gx/+gy end is visible, so it is the front of a forward bus and the rear of one going the other way.

## 4. Measurements
None. `look.mjs` reported `frameMs` ~9.7 at the opening and ~10.2 in one other run, both WITH my code, with nothing to compare against. Plan for the A/B: `scratchpad/A/` is a frozen baseline copy of src/ and tools/ taken before any of my edits (it includes the other agents' work at that moment). Budgets: +1.0 ms at the opening and station views, +1.5 ms at a zoom-1.0 entrance/concourse view.

## 5. What was seen
- Opening (zoom 0.350, 1280x713), `.look-crowds/open/frame-a.png`: **people do not read.** The only marks are a few 1-2 px dots near entrance hoods. The west frontage is mostly behind decks and Nishi blocks. I did not look at a bus up close, a night frame, a motion pair, or any zoom-1.0 frame.
- `.look-crowds/z1west/` was captured but **never opened**. Its `--eval` printed zoom 0.350, so `--at` may not have applied: either the camera did not move or the eval ran first. Check this before trusting any `lk.sh` frame.
- Unverified: whether crowd density at zoom 1.0 looks like a crowd; whether zebras through car lanes look wrong; whether the entrance flows show people vanishing at the hood; bus sorting against cars at crossings; night marks; every GPU, phone portrait and night-cost question.

## 6. Next steps
1. Start `npx vite --port 5186 --strictPort`. Use `scratchpad/lk.sh NAME ZOOM TX TY [?day=8] [port]` (writes to `.look-crowds/NAME`) and `scratchpad/crop.py` to enlarge. Fix the `--at` not applying problem first.
2. Look at: station west and east frontage at zoom 1.0 and 0.5; an east entrance (e.g. 98,48) at 1.0; the opening; a bus close up (tile near x=70 or y=80); each day and `?day=8`, each at two times. Tune `perTile`, `markSize`, `KEEP_FAR`, colours.
3. Measure: copy src/ to a snapshot, add a temporary `nocrowd` URL flag there only (not in the real tree) that makes `drawCrowds` and `drawEntranceFlow` return early and `isBus` return false. Serve the snapshot (node_modules symlinked), use the `perf.mjs` sampling (`loop.stats.frameMs`, 4 s after 3 s settle), alternate on/off at least 5 times per view: opening, station (81,76 @0.5), entrance/concourse (71,76 @1.0). If over budget, cut `perTile`, `KEEP_FAR`, or `ENTRANCE_PEOPLE`.
4. Negative-test the check.mjs asserts (temporarily add a strip in the rail corridor or on a lot in a scratch copy; it must fail).
5. Run `npx tsc --noEmit` and `node tools/check.mjs`. Consider updating `BUDGET` in `tools/perf.mjs` only if the cost is intended.
6. Write the final report: what reads at zoom 0.35 (today: nothing), before/after ms with noise.

## 7. Cleanup
- Temp flags or debug code in the real tree: **none** (grep for `nocrowd` and `URLSearchParams` in crowd.ts and sprites.ts is clean).
- My dev server on port 5186 is killed. No Chrome of mine is left; the `lattice-look-*` Chromes still running belong to other agents.
- Scratch, all in `/private/tmp/claude-501/-Users-paulogonzales-Code-paulog-github-io/2c3ff1af-158d-4668-901f-3e360086ce8d/scratchpad/` (shared with other agents; only these are mine): `A/` (baseline snapshot with a symlinked node_modules), `lk.sh`, `crop.py`. `/tmp/vite5186.log` is also mine. `.look-crowds/` in the repo is gitignored.
- No git commands that change state were run.
