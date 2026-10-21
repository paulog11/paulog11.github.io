/**
 * SHINJUKU — the people. Where they walk is `CROWDS` and `entranceWalk` in
 * layout.ts; this file is what a person is, where one is at time `t`, and how
 * few of them are worth drawing at a given zoom.
 *
 * THE RULES THE TRAFFIC OBEYS, AND SO DO THEY. A person's position is a pure
 * function of (index, time): the per-person numbers below (phase, speed, which
 * way, which colour) are hashed from the index ONCE and stored, and nothing is
 * ever written back. There is no Math.random, no per-person state to update or
 * get out of step, and nothing allocates in a frame.
 *
 * WHAT A PERSON IS DRAWN WITH, and the primitives that were not used:
 *  - `isoTile` / `isoPatch` draw a 2:1 diamond lying in the ground plane. A
 *    person is an upright mark, so a diamond reads as a smudge on the road, and
 *    it is also nine canvas calls (four `put`s and a `poly` of four points) where
 *    the mark below is four.
 *  - `isoBox` / `isoPost` draw three faces and a stroke. Far too much for a
 *    2-4 px figure, and a crowd of a few hundred is hundreds of them.
 *  - One sorter item per person is the expensive way: the sorter is O(n log n)
 *    over everything on screen and walkers would double its count.
 *  So: `surface.ellipse`, an upright oval standing on the person's foot, drawn
 *  in the `terrain` pass (the entrances' own forecourt, which the lot's paving
 *  would cover there, is drawn from the sorted pass — see `drawEntranceFlow`).
 *  The ground pass runs before every solid, so a building, a deck or a car that
 *  is nearer the camera covers a person behind it, which is the right answer
 *  and costs nothing. The projection is one affine map per frame, not a
 *  `camera` call per person.
 *
 * ZOOM. A person is world-sized (`personH`), with a floor so it is still a mark at
 * the opening zoom and a ceiling so it is not a smear at 2.8. The cost control is
 * HOW MANY. Each person has a fixed rank in [0, 1) and is drawn when
 * the rank is below `keepAt(zoom)`, which means a person never pops back and
 * forth as the zoom moves, and the crowd thickens smoothly instead.
 *
 * NIGHT. No light per person: a lamp each would be hundreds of pool adds. The
 * marks go pale instead. The light field's mask darkens everything it does not
 * cover, and a dark coat on a dark road at 0.45 mask is not there, so by night
 * every colour is pulled toward a cool pale grey, in a few quantised steps so the
 * colour strings the canvas keys on do not change every frame.
 */
import { hashStep, toUnit } from '@latticekit/core';
import { LEVEL_H, mix } from '@latticekit/draw';
import type { Pen } from '@latticekit/draw';
import { HALF_H, HALF_W } from '@latticekit/iso';
import type { TileRange } from '@latticekit/iso';

import { CROWDS, ENTRANCES, ENTRANCE_PEOPLE, entranceWalk } from './layout.ts';
import { hourNow } from './sprites.ts';

// ── how many, at what zoom ───────────────────────────────────────────────────

/** Below this zoom a person is a sub-pixel mark and nothing is drawn. The camera
 *  will not go below 0.3, so this is the floor of the range, not a cliff in it. */
const ZOOM_NONE = 0.28;
/** At and above this, every person is drawn. */
const ZOOM_FULL = 1.0;
/** The share drawn at the camera's minimum zoom. At 0.35 a tile is 22 px wide and
 *  a person is 3-4 px tall: about half of them already read as a thin stream along the street. */
const KEEP_FAR = 0.45;

function keepAt(zoom: number): number {
  if (zoom >= ZOOM_FULL) return 1;
  if (zoom <= ZOOM_NONE) return 0;
  return KEEP_FAR + (1 - KEEP_FAR) * ((zoom - ZOOM_NONE) / (ZOOM_FULL - ZOOM_NONE));
}

// ── the people, as numbers ───────────────────────────────────────────────────

const SEED = 0x70656f70;
/** Tiles per second. A brisk walk in a ward where a tile is ten metres would be a
 *  quarter of this; at that speed a crowd looks like a still photograph. */
const SPEED_MIN = 0.35;
const SPEED_SPAN = 0.45;
/** A person grows in and shrinks out over this many tiles at the end of a walk,
 *  which is what hides the wrap from the far end back to the start. */
const FADE = 0.6;

interface Group {
  readonly x0: number;
  readonly y0: number;
  readonly w: number;
  readonly d: number;
  readonly first: number;
  readonly count: number;
  /** Length of the long side, which is the walk. */
  readonly len: number;
  readonly alongX: boolean;
}

const groups: Group[] = [];
let total = 0;
for (const s of CROWDS) {
  const alongX = s.w >= s.d;
  const len = alongX ? s.w : s.d;
  const count = Math.max(1, Math.round(len * s.perTile));
  groups.push({ x0: s.gx, y0: s.gy, w: s.w, d: s.d, first: total, count, len, alongX });
  total += count;
}
const entranceFirst = total;
total += ENTRANCES.length * ENTRANCE_PEOPLE;

/** Phase in [0, 1) round the walk, signed speed in tiles/s, position across the strip
 *  in [0, 1), colour class, and the rank that decides whether the zoom keeps them. */
const phase = new Float32Array(total);
const speed = new Float32Array(total);
const across = new Float32Array(total);
const kind = new Uint8Array(total);
const rank = new Float32Array(total);

/** Colour classes: mostly dark coats, some brighter. Repeats are weights. */
const DAY_COLORS = [
  0x2b2e38ff, 0x363a47ff, 0x453b33ff, 0x232c3cff, 0x3a3340ff, 0x2f3b36ff, // coats
  0xcf4048ff, 0xe3b238ff, 0x3b80d0ff, 0xe8e6e0ff, 0x58ad76ff, // a few bright ones
];
const NIGHT_PALE = 0xc7d2e8ff;
const CLASSES = DAY_COLORS.length;
/** Out of this many, the first `DARK` are coats. */
const DARK = 6;

for (let p = 0; p < total; p++) {
  const h = (n: number): number => toUnit(hashStep(SEED + p * 31, n));
  phase[p] = h(1);
  speed[p] = SPEED_MIN + SPEED_SPAN * h(2);
  across[p] = h(3);
  rank[p] = h(5);
  // Four in five are dark, the rest a bright; walking either way is a coin toss.
  kind[p] = h(4) < 0.78 ? Math.floor(h(6) * DARK) : DARK + Math.floor(h(7) * (CLASSES - DARK));
  if (h(8) < 0.5) speed[p] = -(speed[p] ?? 0);
}

// ── the hour ─────────────────────────────────────────────────────────────────

const colors = new Uint32Array(CLASSES);
let colorStep = -1;

/** Re-colour for the hour, but only when it has moved by an eighth: `cssOf` memoises
 *  by value, so a colour that changed every frame would make a string every frame. */
function setColors(): void {
  const step = Math.round((1 - hourNow()) * 8);
  if (step === colorStep) return;
  colorStep = step;
  for (let c = 0; c < CLASSES; c++) colors[c] = mix(DAY_COLORS[c] ?? 0, NIGHT_PALE, (step / 8) * 0.62) >>> 0;
}

// ── a mark ───────────────────────────────────────────────────────────────────

/** A person's height in px. It is WORLD-SCALED: 1.7 m is 0.57 of a 3 m storey, so
 *  `LEVEL_H · 0.57 · zoom`, which is what keeps one the right size next to the
 *  buildings and the buses (a storey is 26 px at zoom 1, so a person is ~15). The
 *  first version capped a person at 2-4 px "however far in you are", and at zoom
 *  1.0 a crowd of three-pixel specks stood beside two-hundred-pixel towers: it read
 *  as dust on the road, not people. The floor is what a person can be and still
 *  show as a mark at the opening zoom, and the ceiling stops a close-up smear. */
const PERSON_STOREYS = 0.57;
const PERSON_MIN = 3.4;
const PERSON_MAX = 34;
/** From this zoom a person gets a head, a second ellipse: below it the head is a pixel. */
const HEAD_ZOOM = 1.1;
const HEAD = 0xe0b9a0ff;

function personH(zoom: number): number {
  return Math.min(PERSON_MAX, Math.max(PERSON_MIN, LEVEL_H * PERSON_STOREYS * zoom));
}

/** An upright oval standing on (sx, sy), `h` px tall, `fade` in (0, 1] for a person
 *  arriving or leaving. Close in, a head on top of the body. */
function mark(pen: Pen, sx: number, sy: number, fade: number, h: number, c: number): void {
  const hh = h * fade;
  const body = h >= LEVEL_H * PERSON_STOREYS * HEAD_ZOOM ? hh * 0.74 : hh;
  const w = Math.max(0.9, hh * 0.19);
  pen.surface.ellipse(sx, sy - body / 2, w, body / 2, colors[c] ?? 0);
  if (body < hh) pen.surface.ellipse(sx, sy - hh + hh * 0.13, hh * 0.12, hh * 0.13, HEAD);
}

// ── the streets ──────────────────────────────────────────────────────────────

/** Every street strip that is on screen, drawn. Called at the end of the `terrain`
 *  pass, after the roads and the rail, so a people-mark lies on top of them and
 *  under every solid. `visible` is the pass's own tile range. */
export function drawCrowds(pen: Pen, visible: Readonly<TileRange>): void {
  const cam = pen.camera;
  const zoom = cam.zoom;
  const keep = keepAt(zoom);
  if (keep <= 0) return;
  setColors();

  // World → screen is affine, so project the grid origin once and the rest is two
  // multiply-adds a person: sx = bx + (x - y)·ax, sy = by + (x + y)·ay.
  const ax = HALF_W * zoom;
  const ay = HALF_H * zoom;
  const bx = cam.toScreenX(0) + pen.snapX;
  const by = cam.toScreenY(0) + pen.snapY;
  // Past these a mark is off screen. The slack is a mark's own size.
  const vw = cam.viewW + 6;
  const vh = cam.viewH + 8;
  const h = personH(zoom);
  const t = pen.t;

  for (let g = 0; g < groups.length; g++) {
    const s = groups[g];
    if (s === undefined) continue;
    // The pass's range is the bounding box of a diamond, so most of a far-out view's
    // strips are inside it and off screen. It is the cheap test; the corners are the exact one.
    if (s.x0 + s.w < visible.gx0 || s.x0 > visible.gx1 || s.y0 + s.d < visible.gy0 || s.y0 > visible.gy1) continue;
    const xn = bx + (s.x0 - s.y0 - s.d) * ax;
    const xp = bx + (s.x0 + s.w - s.y0) * ax;
    const yn = by + (s.x0 + s.y0) * ay;
    const yp = by + (s.x0 + s.w + s.y0 + s.d) * ay;
    if (xp < -6 || xn > vw || yp < -8 || yn > vh) continue;

    const fadeInv = 1 / Math.min(FADE, s.len / 3);
    for (let j = 0; j < s.count; j++) {
      const p = s.first + j;
      if ((rank[p] ?? 1) > keep) continue;
      // Where round the walk: a sawtooth in [0, len), at the person's own signed speed.
      let a = (phase[p] ?? 0) + ((speed[p] ?? 0) * t) / s.len;
      a = (a - Math.floor(a)) * s.len;
      const u = (across[p] ?? 0);
      const x = s.alongX ? s.x0 + a : s.x0 + u * s.w;
      const y = s.alongX ? s.y0 + u * s.d : s.y0 + a;
      const sx = bx + (x - y) * ax;
      const sy = by + (x + y) * ay;
      if (sx < -6 || sx > vw || sy < -8 || sy > vh) continue;
      const fade = Math.min(1, a * fadeInv, (s.len - a) * fadeInv);
      if (fade < 0.3) continue;
      mark(pen, sx, sy, fade, h, kind[p] ?? 0);
    }
  }
}

// ── the entrances ────────────────────────────────────────────────────────────

/** Speed along an entrance walk, tiles per second. The walk is about 4 tiles. */
const WALK_SPEED = 0.55;

const walks: Float64Array[] = ENTRANCES.map((e) => Float64Array.from(entranceWalk(e)));
const walkLen: Float64Array[] = walks.map((w) => {
  const out = new Float64Array(3);
  for (let k = 0; k < 3; k++) out[k] = Math.hypot((w[2 * k + 2] ?? 0) - (w[2 * k] ?? 0), (w[2 * k + 3] ?? 0) - (w[2 * k + 1] ?? 0));
  return out;
});

/** Which entrance stands at a lot's near tile, or -1. `paintItem` asks this of every
 *  building it paints, so it is one lookup, not a scan. */
const entranceByTile = new Map<number, number>();
ENTRANCES.forEach((e, k) => entranceByTile.set(e.gx * 1024 + e.gy, k));
export function entranceAt(gx: number, gy: number): number {
  return entranceByTile.get(gx * 1024 + gy) ?? -1;
}

/** The people going down into entrance `k` and coming up out of it. Drawn from the
 *  SORTED pass, right after the entrance sprite and before whatever is nearer the
 *  camera: the sprite's paving lies on its whole lot, so anyone drawn in the
 *  terrain pass would be under it, and the stairs are the point. The mark is
 *  drawn with the same rules as the street ones, and fades to nothing at the mouth.
 *
 *  Half the people walk the path from the mouth outward, half the other way, at
 *  the same speed, so the two streams pass each other on the forecourt. */
export function drawEntranceFlow(pen: Pen, k: number): void {
  const cam = pen.camera;
  const zoom = cam.zoom;
  const keep = keepAt(zoom);
  if (keep <= 0) return;
  setColors();
  const w = walks[k];
  const lens = walkLen[k];
  if (w === undefined || lens === undefined) return;
  const l0 = lens[0] ?? 0;
  const l1 = lens[1] ?? 0;
  const walkTotal = l0 + l1 + (lens[2] ?? 0);
  const ax = HALF_W * zoom;
  const ay = HALF_H * zoom;
  const bx = cam.toScreenX(0) + pen.snapX;
  const by = cam.toScreenY(0) + pen.snapY;
  const h = personH(zoom);
  const t = pen.t;
  const first = entranceFirst + k * ENTRANCE_PEOPLE;

  for (let j = 0; j < ENTRANCE_PEOPLE; j++) {
    const p = first + j;
    if ((rank[p] ?? 1) > keep) continue;
    // Distance from the mouth. Going out it grows with time; going in, it shrinks.
    let f = (phase[p] ?? 0) + (WALK_SPEED * t) / walkTotal * ((j & 1) === 0 ? 1 : -1);
    f -= Math.floor(f);
    const s = f * walkTotal;
    // Which of the three legs, and how far along it.
    let leg = 0;
    let at = s;
    if (at >= l0) { at -= l0; leg = 1; if (at >= l1) { at -= l1; leg = 2; } }
    const len = leg === 0 ? l0 : leg === 1 ? l1 : (lens[2] ?? 1);
    const u = len > 0 ? at / len : 0;
    const x = (w[2 * leg] ?? 0) + u * ((w[2 * leg + 2] ?? 0) - (w[2 * leg] ?? 0));
    const y = (w[2 * leg + 1] ?? 0) + u * ((w[2 * leg + 3] ?? 0) - (w[2 * leg + 1] ?? 0));
    // Gone at the mouth in a quarter-tile, and fading out into the stream at the street end.
    const fade = Math.min(1, s * 4, (walkTotal - s) / FADE);
    if (fade < 0.3) continue;
    mark(pen, bx + (x - y) * ax, by + (x + y) * ay, fade, h, kind[p] ?? 0);
  }
}
