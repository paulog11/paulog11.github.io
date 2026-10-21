/**
 * SHINJUKU — the boot, and the frame.
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
import { createScope, v2 } from '@latticekit/core';
import {
  DepthSorter, TILE_H, anchorToScreen, anchorVisible, createCamera, footprintAnchor, tileBounds,
} from '@latticekit/iso';
import type { Anchor, Rect, TileRange } from '@latticekit/iso';
import {
  LEVEL_H, beginFrame, createCanvas2dSurface, createLightField, createPalette,
  endFrame, isoTile, renderFrame,
} from '@latticekit/draw';
import type { Passes, Pen, SpriteDef, Variant } from '@latticekit/draw';
import { browserFrames, createLoop } from '@latticekit/loop';
import { createInput } from '@latticekit/input';

import {
  AVENUES, ENTRANCES, LANDMARKS, LANE_FAR, LANE_NEAR, LOT, LOTS, PITCH, RAIL_X0, RAIL_X1, STATION_PIECES, TRAINS, W,
  avenue, carVisible, districtAtTile, districtOf, isRail, isStreet, keyOf, neighbourAt, neighbourLevel, tileOf, trainCarY,
} from './layout.ts';
import type { TrainRun } from './layout.ts';
import {
  BUS_H, DAY_X, NIGHT_X, defForLot, drawBus, drawCar, heightOf, paint, setHour, variantFor,
} from './sprites.ts';
import { landmarkDef } from './landmarks.ts';
import { shoppingDefFor } from './shopping.ts';
import { entranceDef } from './entrances.ts';
import { paintRail, stationDef, trainCarDef } from './station.ts';
import { drawCrowds, drawEntranceFlow, entranceAt } from './crowd.ts';

// ── the screen ───────────────────────────────────────────────────────────────

const host = document.getElementById('app') ?? document.body;
const canvas = document.createElement('canvas');
canvas.style.cssText = 'display:block;width:100%;height:100%';
canvas.setAttribute('aria-label', 'Shinjuku — an explorable isometric city; drag to pan, scroll or pinch to zoom');
host.append(canvas);

const scope = createScope();
const surface = createCanvas2dSurface(canvas);
// The DAY stop set, extended with the ward's own materials. Both sets are
// hoisted at module scope in sprites.ts: a set rebuilt inside the render
// callback bumps `Palette.rev` every frame, and `rev` is what every cache in
// the kit keys on. The symptom is not a wrong colour — it is a frame time that
// climbs at dusk and stays climbed.
const palette = createPalette(DAY_X);

// ── the world, and the camera that has to be told about it ───────────────────

/** The tallest filler: a Nishi tower (`LEVELS.N` tops out at 11, plus
 *  one storey of crown). The fence is
 *  the whole map plus THAT much air, not 都庁's. `tileBounds`' height argument
 *  extends `minY` UPWARD, and what a camera clamp does with an oversized one is
 *  let the player park the viewport in the sky above the far corner and still
 *  satisfy `keepVisible`. */
const TALLEST_FILLER = 12;
const worldRect: Rect = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
tileBounds(0, 0, W, W, LEVEL_H * TALLEST_FILLER, worldRect);

/** The opening shot is a REGION of the ward, never the whole of it. A fresh
 *  camera looks at world (0,0) — the top corner of the map in a 2:1 projection
 *  — so with no fit at all the first frame is empty sky beside the world.
 *  Fitting `worldRect` is the opposite failure: every corner on screen at once,
 *  which is the diorama.
 *
 *  This one runs from 都庁's west edge (gx 32) to the corridor's east edge
 *  (gx 92), over gy 72–90. The fit is HEIGHT-limited at desktop sizes, so the
 *  two numbers that matter are the bottom and the headroom. The bottom is the
 *  rect's south corner (92, 90), which is level on screen with the south
 *  deck's (90, 92): both decks and the concourse between them are in frame.
 *  The headroom is 25 storeys, 都庁's roof (24.2) plus its name plate; less
 *  sends the plate off the top edge. The rect's own north corner is far below
 *  都庁's roof, so the height, not gy, is what sets the top. */
const opening: Rect = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
tileBounds(32, 72, 92 - 32, 90 - 72, LEVEL_H * 25, opening);

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
  // running and the day does not stop turning.
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
  // No `actions`: this is a place to look at, so all the input does is pan and
  // zoom, which `createInput` binds by default.
});

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
 *  wall clock gets a ward still standing at noon, and there is otherwise no
 *  way to look at the night without waiting for it. */
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
  /** The SAME w/d the sprite declares — `order.add` is given these, and a
   *  sorter and a sprite that disagree about a footprint draw in the wrong order
   *  with no error. */
  readonly w: number;
  readonly d: number;
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

function buildFor(key: number, lx: number, ly: number): Build {
  let b = views.get(key);
  if (b === undefined) {
    const seed = (lx * 73856093) ^ (ly * 19349663);
    const d = districtOf(lx, ly);
    const def = shoppingDefFor(d, seed) ?? defForLot(d, seed);
    const v = variantFor(seed, neighbourLevel(lx, ly));
    b = { def, gx: tileOf(lx), gy: tileOf(ly), w: def.w, d: def.d, v, hPx: heightOf(def, v) };
    views.set(key, b);
  }
  return b;
}

/** The landmarks and the station: built once, here, and handed to the sorter
 *  every frame. About thirty-three items, and the sorter culls the off-screen
 *  ones, so there is no reason to range-check them ourselves. The footprints are
 *  the layout's tile rects exactly — nothing is adjusted on the way through. */
const fixed: Build[] = [];

function fixedBuild(def: SpriteDef, f: { gx: number; gy: number; w: number; d: number }, seed: number): Build {
  const v = variantFor(seed, 0);
  const b: Build = { def, gx: f.gx, gy: f.gy, w: f.w, d: f.d, v, hPx: heightOf(def, v) };
  fixed.push(b);
  return b;
}

// ── name plates: DOM over the canvas, not drawn on it ────────────────────────
//
// Native CSS text stays crisp at every zoom, which canvas text at 0.4× does not.
// Each plate holds ONE anchor for its building (never a copy of the building's
// position) and one scratch Vec2 is shared by all of them: a frame allocates
// nothing.

interface Plate {
  readonly el: HTMLDivElement;
  readonly anchor: Anchor;
  x: number;
  y: number;
  shown: boolean;
}
const plates: Plate[] = [];
const plateAt = v2(0, 0);
/** Clearance above the roof, in world pixels. */
const PLATE_LIFT = 14;
/** Slack at the viewport edge so a plate slides off rather than vanishing. */
const PLATE_MARGIN = 120;

function addPlate(label: string, b: Build): void {
  const el = document.createElement('div');
  el.className = 'plate';
  el.textContent = label;
  el.hidden = true;
  host.append(el);
  const anchor = footprintAnchor(b, b.hPx + PLATE_LIFT, { gx: 0, gy: 0, zPx: 0 });
  // NaN, so the first visible frame always writes.
  plates.push({ el, anchor, x: NaN, y: NaN, shown: false });
}

LANDMARKS.forEach((m, i) => {
  addPlate(m.label, fixedBuild(landmarkDef(m.id), m, 0x4c4d0000 + i));
});
STATION_PIECES.forEach((p, i) => {
  const b = fixedBuild(stationDef(p), p, 0x53540000 + i);
  // Only the concourse deck carries a name.
  if (p.kind === 'deck' && p.label) addPlate(p.label, b);
});

// Subway entrances are fixed too, but nameless: a plate on each would be a
// forest of labels, and the sign on the hood is the label.
ENTRANCES.forEach((e, i) => {
  fixedBuild(entranceDef(e.line), { gx: e.gx, gy: e.gy, w: LOT, d: LOT }, 0x454e0000 + i);
});

/** Called once per render, after the camera has moved. Writes the style only
 *  when the rounded position changed, because a style write is a layout
 *  invalidation and a plate on a still camera should cost nothing. */
function placePlates(): void {
  for (const p of plates) {
    const visible = anchorVisible(camera, p.anchor, PLATE_MARGIN);
    if (visible !== p.shown) { p.el.hidden = !visible; p.shown = visible; }
    if (!visible) continue;
    anchorToScreen(camera, p.anchor, plateAt);
    const x = Math.round(plateAt.x);
    const y = Math.round(plateAt.y);
    if (x === p.x && y === p.y) continue;
    p.x = x;
    p.y = y;
    // The individual `translate` property, so the CSS `transform` that centres
    // the plate above its anchor is left alone.
    p.el.style.translate = `${x}px ${y}px`;
  }
}

const CARS = 64;
const carX = new Float64Array(CARS);
const carY = new Float64Array(CARS);
const carAxis = new Uint8Array(CARS);
/** +1 when the vehicle is travelling toward +gx / +gy, which is the way the camera
 *  sees the front of it, and -1 when it is going the other way. */
const carDir = new Int8Array(CARS);

/** Every eighth vehicle is a bus: 8 of the 64, so the count, and the sorter's, do
 *  not grow. The test is on the index, like everything else about a vehicle. */
const isBus = (i: number): boolean => (i & 7) === 3;

/** The bus routes, by rank (`i >> 3`): the avenue each runs on, and (by the rank's
 *  low bits, in `moveCars`) which axis and which way. They are the streets a bus
 *  would take in Shinjuku — both station frontages, the cross-streets either side
 *  of the concourse, Isetan's, and the 一番街 gate's — and not the 4 avenues the
 *  cars' own formula would give every bus, which are all in Nishi. */
const BUS_AVENUE: readonly number[] = [8, 7, 7, 9, 5, 10, 6, 11];

/** Traffic with no per-car state: position is a function of (index, time), so
 *  there is nothing to update and nothing to get out of step. */
function moveCars(t: number): void {
  for (let i = 0; i < CARS; i++) {
    const bus = isBus(i);
    // A bus's low bits are all the same (i & 7 is 3), so left to them every bus
    // would drive north along a gy street. Its rank (`i >> 3`) is what varies.
    const k = i >> 3;
    const alongX = bus ? (k & 1) === 0 : (i & 1) === 0;
    let a = bus ? (BUS_AVENUE[k] ?? 0) : (i * 7 + (i >> 1)) % AVENUES;
    // A gx-running car drives down avenue `a` at x = avenue(a) + lane. Avenue 8
    // is gx 80, the middle of the rail corridor: there is no street there, so
    // those cars move to avenue 9, 10 or 11 (spread by `i`) and the count
    // stays 64.
    if (!alongX && isRail(avenue(a))) a = (a + 1 + ((i >> 2) % 3)) % AVENUES;
    const back = bus ? (k & 2) === 0 : (i & 2) === 0;
    // Both lanes are INSIDE the street's two tiles. Taken from the street's
    // centre instead, the far lane lands on a lot and the car drives through
    // the buildings — see `avenue`.
    const lane = back ? LANE_NEAR : LANE_FAR;
    // Buses are slow: 1.9 to 2.5 tiles a second against a car's 3.1 to 5.3.
    const speed = bus ? 1.9 + (i % 3) * 0.3 : 3.1 + (i % 5) * 0.55;
    const s = (((back ? t : -t) * speed + i * 11.3) % W + W) % W;
    carAxis[i] = alongX ? 1 : 0;
    carDir[i] = back ? 1 : -1;
    if (alongX) { carX[i] = s; carY[i] = avenue(a) + lane; }
    else { carX[i] = avenue(a) + lane; carY[i] = s; }
  }
}

// ── trains ───────────────────────────────────────────────────────────────────

/** One car of one train: a `Build` whose `gy` moves. Every car is its own
 *  sorter item, so a train slides under a deck car by car, and all of them are
 *  made here once — a frame writes `gy` and allocates nothing. Where a car is
 *  and whether it is drawn at all is `trainCarY` / `carVisible` in layout.ts. */
interface TrainCar {
  readonly def: SpriteDef;
  readonly gx: number;
  gy: number;
  readonly w: number;
  readonly d: number;
  readonly v: Variant;
  readonly hPx: number;
  readonly run: TrainRun;
  readonly k: number;
}
const trainCars: TrainCar[] = [];
for (const run of TRAINS) {
  for (let k = 0; k < run.cars; k++) {
    // Car 0 is the +gy end: the cab, which is what the camera sees.
    const def = trainCarDef(run.livery, k === 0 ? 'cab' : k === run.cars - 1 ? 'tail' : 'mid');
    const v = variantFor(0x54520000 + trainCars.length, 0);
    trainCars.push({ def, gx: run.gx, gy: 0, w: def.w, d: def.d, v, hPx: heightOf(def, v), run, k });
  }
}

/** Half a bus's length, in tiles, for the one place main.ts needs it. */
const BUS_HALF = 0.95;

const range: TileRange = { gx0: 0, gy0: 0, gx1: 0, gy1: 0 };

/** How far past the viewport to look for buildings, in tiles. A roof can be on
 *  screen while its base is below the bottom edge, so this is the tallest filler
 *  in tile-heights — it was 4 when the ward topped out at four storeys, and a
 *  Nishi tower would pop in at the bottom of the frame at that. */
const MARGIN_TILES = Math.ceil((LEVEL_H * TALLEST_FILLER) / TILE_H);

/** Fill the sorter from the visible lots only. Everything off-screen costs
 *  exactly nothing because it was never asked about. */
function fillFrame(t: number): void {
  order.clear();
  camera.visibleTileBounds(range, MARGIN_TILES);
  // One lot more on the LOW side: a 4×4 tower is anchored on its north corner,
  // so the anchor can be a lot off-screen while the body is not.
  const lx0 = Math.max(0, Math.floor(range.gx0 / PITCH) * 4 - 1);
  const lx1 = Math.min(LOTS, (Math.floor(range.gx1 / PITCH) + 1) * 4);
  const ly0 = Math.max(0, Math.floor(range.gy0 / PITCH) * 4 - 1);
  const ly1 = Math.min(LOTS, (Math.floor(range.gy1 / PITCH) + 1) * 4);

  for (let ly = ly0; ly < ly1; ly++) {
    for (let lx = lx0; lx < lx1; lx++) {
      if (!neighbourAt(lx, ly)) continue;
      const b = buildFor(keyOf(lx, ly), lx, ly);
      frame[order.add(b.gx, b.gy, b.w, b.d, b.hPx)] = b;
    }
  }

  for (const b of fixed) frame[order.add(b.gx, b.gy, b.w, b.d, b.hPx)] = b;

  // A car under a deck is not added at all: a footprint overlapping a deck's
  // would be a cycle in the sorter, and its absence is the train passing beneath.
  for (const c of trainCars) {
    const y = trainCarY(c.run, c.k, t);
    if (!carVisible(y)) continue;
    c.gy = y;
    frame[order.add(c.gx, y, c.w, c.d, c.hPx)] = c;
  }

  moveCars(t);
  for (let i = 0; i < CARS; i++) {
    const x = carX[i] ?? 0;
    // A car on an east-west street passes UNDER the station: inside the
    // corridor it is simply not drawn, so it reads as going beneath the decks.
    // A bus is long enough that an end can be in it with the middle outside.
    if (carAxis[i] === 1 && (isRail(x) || (isBus(i) && (isRail(x - BUS_HALF) || isRail(x + BUS_HALF))))) continue;
    frame[order.addPoint(x, carY[i] ?? 0, isBus(i) ? BUS_H * LEVEL_H : 0, 0.32)] = i;
  }
}

// ── the frame ────────────────────────────────────────────────────────────────

/** The pen for the sorted walk, hoisted: a visitor closed over `pen` would be
 *  a closure per frame, and this runs thirty times a second. */
let sheet: Pen | undefined;

function paintItem(item: Item): void {
  const pen = sheet;
  if (pen === undefined) return;
  if (typeof item === 'number') {
    if (isBus(item)) drawBus(pen, item, carX[item] ?? 0, carY[item] ?? 0, carAxis[item] === 1, carDir[item] === 1);
    else drawCar(pen, item, carX[item] ?? 0, carY[item] ?? 0, carAxis[item] === 1);
    return;
  }
  paint(pen, item.def, item.gx, item.gy, item.v);
  // The people on an entrance's forecourt go right after it, before anything nearer
  // the camera, because the sprite's own paving would hide them in the terrain pass.
  const e = entranceAt(item.gx, item.gy);
  if (e >= 0) drawEntranceFlow(pen, e);
}

const passes: Passes = {
  // One storey of margin, not the tallest building's: the solids cull reads
  // each item's own height, so all this buys is enough over-scan that the
  // paving does not pop at the bottom edge.
  maxHeightPx: LEVEL_H,
  terrain(pen, visible) {
    const gx0 = Math.max(0, visible.gx0);
    const gx1 = Math.min(W, visible.gx1);
    const gy0 = Math.max(0, visible.gy0);
    const gy1 = Math.min(W, visible.gy1);
    for (let gy = gy0; gy < gy1; gy++) {
      const streetY = isStreet(gy);
      for (let gx = gx0; gx < gx1; gx++) {
        // The corridor is one call below, not a per-tile case here.
        if (isRail(gx)) continue;
        if (streetY || isStreet(gx)) isoTile(pen, gx, gy, 'road');
        // Gyoen's lots are lawn; its streets stay road.
        else isoTile(pen, gx, gy, districtAtTile(gx, gy) === 'G' ? 'leaf' : 'paving');
      }
    }
    paintRail(pen, Math.max(gx0, RAIL_X0), Math.min(gx1, RAIL_X1), gy0, gy1);
    // Last, so the people lie on the road and the rail and under every solid.
    drawCrowds(pen, visible);
  },
  solids(pen, sorted) {
    sheet = pen;
    for (let i = 0; i < sorted.count; i++) paintItem(frame[sorted.indexAt(i)] as Item);
  },
};

loop.onUpdate((_dt, tick) => {
  // BEFORE anything reads the camera: a pan gesture must have landed first.
  input.tick(tick);

  daylight = 0.5 + 0.5 * Math.cos((loop.realTime / DAY_SECONDS) * Math.PI * 2);

  // The palette is pushed from UPDATE, never from render: pushed from render it
  // stops in a backgrounded tab and the viewer comes back to a night ward under
  // a noon clock. `lerp` quantizes `t` internally, so most of these are no-ops.
  palette.lerp(NIGHT_X, DAY_X, daylight);
  if (palette.rev !== pushedRev) pushedRev = palette.rev;
});

loop.onRender((_alpha, time, nowMs) => {
  // The camera's glide integrates here, at display rate. It delivers nothing.
  input.frame(nowMs);
  placePlates();
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

// `tools/look.mjs --eval` reads this: `order.count` is the density of the last
// frame, `loop.stats` its cost, `camera` where it was looking, `cars` where the
// traffic is (a bus is `isBus(i)`), so a look can be aimed at one.
declare global {
  interface Window {
    __lattice?: {
      order: DepthSorter; loop: typeof loop; camera: typeof camera;
      cars: { x: Float64Array; y: Float64Array; axis: Uint8Array; isBus: (i: number) => boolean };
    };
  }
}
window.__lattice = { order, loop, camera, cars: { x: carX, y: carY, axis: carAxis, isBus } };

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
