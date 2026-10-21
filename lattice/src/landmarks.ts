/**
 * The two hand-placed landmarks: 都庁 (the Tokyo Metropolitan Government
 * Building) and the Mode Gakuen Cocoon Tower. Where they stand is `LANDMARKS` in
 * layout.ts; this file is what they look like.
 *
 * The contract with main.ts is `landmarkDef(id).w/.d === LANDMARKS[id].w/.d`:
 * those numbers go to the depth sorter. Only the +gx (east) and +gy (south)
 * faces are ever visible, so plazas, piers and windows go on those sides.
 *
 * Two rules decide where everything below lives.
 *
 * - `massing` reads NO palette. A measuring replay (`spriteHeightPx`, which
 *   main.ts's `heightOf` calls) runs it with only the kit's ten slots, and
 *   `Palette.get` throws on this ward's own. So massing speaks in slot NAMES,
 *   and anything that needs a computed colour waits for `animate`, where
 *   `pen.palette` is the real frame's.
 * - WITHIN one sprite, call order is paint order; the sorter orders only whole
 *   sprites. Massing therefore emits back to front (low gx+gy first), or a far
 *   tower paints over a near one. `animate` runs after ALL of the massing, so
 *   anything drawn there lands over every part of the sprite, and may only go
 *   where nothing of the sprite stands in front of it. See `windows`.
 */
import { hashStep, toUnit } from '@latticekit/core';
import {
  FACE_LEFT, FACE_RIGHT, FACE_TOP, LEVEL_H, defineSprite, glowDot, isoWall,
  levelsToPx, mix, outlineOf, shade,
} from '@latticekit/draw';
import type { Ink, Pen, SolidWriter, SpriteDef, Variant } from '@latticekit/draw';
import { HALF_H, HALF_W } from '@latticekit/iso';

import { KABUKICHO_DEFS } from './kabukicho.ts';
import { ISETAN } from './shopping.ts';
import { hourNow } from './sprites.ts';

/** Brightness in nine levels. `softEllipse` keys its ramp cache on the colour,
 *  so a continuously animated intensity is a key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

/** Windows come on at dusk building by building, not all at once: each floor
 *  has a fixed 0–1 draw and is lit once the dusk threshold falls below it.
 *  ~80% of floors are lit at midnight, none by 0.72 of daylight. The key
 *  addresses the floor by index, so the strip and its pool agree on which
 *  floors those are. */
function isLit(v: Variant, key: number, dn: number): boolean {
  return dn < 0.72 && toUnit(hashStep(v.seed, key)) > 0.2 + 0.7 * dn;
}

// ── tiers: one box of facade ─────────────────────────────────────────────────

interface Tier {
  /** Floor-key namespace, so two tiers never share a hash draw. */
  id: number;
  x: number; y: number; w: number; d: number;
  /** Storeys. */
  z0: number; z1: number;
  /** Tiles between piers. */
  gap: number;
}

/** Floors in a 3-on, 1-off rhythm: window bands for three storeys, then a
 *  plant floor. Even spacing reads as a spreadsheet. */
const isWindowFloor = (k: number): boolean => k % 4 !== 3;

/** Dark glass bands and light piers on a tier's two visible faces.
 *
 *  +gy is the lit face (screen-left), +gx the shaded one (screen-right).
 *  `wall` fills FLAT, unlike `box`, so a face's tone cannot be derived and has
 *  to be chosen. With no palette to shade from, the choice is a slot per face:
 *  the lit +gy face gets the blue `towerglass` and pale `granite`, the shaded
 *  +gx face the greyer, darker `darkstone` and `slate`. The ordering is what
 *  matters, and it holds at night too. */
function dress(s: SolidWriter, t: Tier, onX = true): void {
  const floors = Math.floor(t.z1 - t.z0);
  for (const f of onX ? (['y', 'x'] as const) : (['y'] as const)) {
    const run0 = (f === 'y' ? t.x : t.y) + 0.12;
    const run1 = (f === 'y' ? t.x + t.w : t.y + t.d) - 0.12;
    const edge = f === 'y' ? t.y + t.d : t.x + t.w;
    const line = (u0: number, u1: number, za: number, zb: number, c: Ink): void => {
      if (f === 'y') s.wall(u0, edge, u1, edge, za, zb, c);
      else s.wall(edge, u0, edge, u1, za, zb, c);
    };
    const glass: Ink = f === 'y' ? 'towerglass' : 'darkstone';
    for (let k = 0; k < floors; k += 4) {
      const hi = Math.min(k + 2.85, floors - 0.12);
      if (hi > k + 0.3) line(run0, run1, t.z0 + k + 0.15, t.z0 + hi, glass);
    }
    const pier: Ink = f === 'y' ? 'granite' : 'slate';
    for (let u = run0; u < run1 - 0.05; u += t.gap) line(u, u + 0.09, t.z0, t.z1, pier);
  }
}

function tier(s: SolidWriter, t: Tier, color: Ink, onX = true): void {
  s.box(t.x, t.y, t.w, t.d, { color, h: t.z1 - t.z0, z: t.z0 });
  dress(s, t, onX);
}

// ── 都庁 ─────────────────────────────────────────────────────────────────────
//
// No.1 is one mass that splits into twin legs. The 1.1-tile slot between them
// IS the silhouette: nothing may encroach on it, so every oversail (the collar
// and the crowns) is pushed OUTWARD. The slot floor is the collar's top, and
// the face inside the slot is leg A's +gx face, shaded dark: it reads as depth
// rather than as a gap, which is as much "see through" as a sprite engine with
// no transparency can give.

const SPLIT = 13.85;           // where the shaft ends and the legs begin
const MID = 17.6;              // the leg setback
const CROWN = 20.3;            // base of the cream observatory band
const TOP = 21.4;              // top of the crown
const SLOT_X0 = 4.7;           // the slot, in tile x: 1.4 wide, as wide as a leg
const SLOT_X1 = 6.1;

const PODIUM: Tier = { id: 1, x: 2.8, y: 0.6, w: 5.1, d: 4.7, z0: 0, z1: 2.4, gap: 0.6 };
const SHAFT: Tier = { id: 2, x: 3.3, y: 1.1, w: 4.2, d: 3.6, z0: 2.4, z1: 13.4, gap: 0.9 };
const LEG_A: Tier = { id: 3, x: 3.3, y: 1.35, w: SLOT_X0 - 3.3, d: 3.1, z0: SPLIT, z1: MID, gap: 0.75 };
const LEG_B: Tier = { id: 4, x: SLOT_X1, y: 1.35, w: 7.5 - SLOT_X1, d: 3.1, z0: SPLIT, z1: MID, gap: 0.75 };
// Upper legs: set back on the outer, back and front sides, never on the slot side.
const UP_A: Tier = { id: 5, x: 3.5, y: 1.45, w: SLOT_X0 - 3.5, d: 2.8, z0: MID, z1: CROWN, gap: 0.65 };
const UP_B: Tier = { id: 6, x: SLOT_X1, y: 1.45, w: 7.3 - SLOT_X1, d: 2.8, z0: MID, z1: CROWN, gap: 0.65 };
// No.2: three setbacks, west of No.1 and shorter.
const N2_A: Tier = { id: 7, x: 0.3, y: 4.0, w: 2.3, d: 3.6, z0: 0, z1: 6.5, gap: 0.8 };
const N2_B: Tier = { id: 8, x: 0.6, y: 4.3, w: 1.7, d: 3.0, z0: 6.5, z1: 10.5, gap: 0.7 };
const N2_C: Tier = { id: 9, x: 0.85, y: 4.55, w: 1.2, d: 2.5, z0: 10.5, z1: 13.8, gap: 0.6 };
const LIT_TIERS: readonly Tier[] = [SHAFT, LEG_A, LEG_B, UP_A, UP_B, N2_A, N2_B, N2_C];

/** Aircraft-warning lights: gx, gy, z (storeys), and a phase so they alternate. */
const MASTS = [
  { x: (3.5 + SLOT_X0) / 2, y: 2.85, z: 24.4, phase: 0 },
  { x: (SLOT_X1 + 7.3) / 2, y: 2.85, z: 24.4, phase: 0.55 },
  { x: 1.45, y: 5.8, z: 16.2, phase: 0.28 },
] as const;

const LAMPS_X = [4.1, 6.7] as const;
const LAMP_Y = 6.2;

const TOCHO = defineSprite({
  id: 'shinjuku.tocho', w: 8, d: 8,
  massing(s) {
    // Ground first: shadows and the paved plaza, S and E only. The camera never
    // sees north or west of a mass, so ground detail there would be pure cost.
    s.shadow(2.8, 0.6, 5.1, 4.7, 0.5);
    s.shadow(0.3, 4.0, 2.3, 3.6, 0.45);
    s.patch(2.8, 5.3, 5.2, 2.7, 0, 'concrete');
    s.patch(3.0, 5.5, 1.0, 1.3, 0, 'leaf');
    s.patch(6.8, 5.5, 1.0, 1.3, 0, 'leaf');
    s.patch(4.3, 6.5, 2.2, 1.0, 0, 'darkstone', 'ink');     // the sunken garden

    // No.2 first: it is west of No.1 and shorter, so No.1 may overlap it on
    // screen but never the other way round.
    tier(s, N2_A, 'darkstone');
    tier(s, N2_B, 'darkstone');
    tier(s, N2_C, 'darkstone');
    s.box(0.95, 4.65, 1.0, 2.3, { color: 'darkstone', h: 0.5, z: 13.8 });
    s.post(1.45, 5.8, 14.3, 1.9, 'metal', 0.08);

    // No.1. The podium is the pale base that makes the dark mass above it read.
    s.box(PODIUM.x, PODIUM.y, PODIUM.w, PODIUM.d, { color: 'granite', h: PODIUM.z1 });
    dress(s, PODIUM);
    tier(s, SHAFT, 'darkstone');
    // The collar: proud of the shaft on every side, so the mass visibly
    // continues before the slot opens. Its top is the slot's floor.
    s.box(3.2, 1.0, 4.4, 3.8, { color: 'granite', h: SPLIT - 13.4, z: 13.4 });
    // Legs, west to east. B stands in front of A's +gx face, so it comes second.
    tier(s, LEG_A, 'darkstone');
    tier(s, LEG_B, 'darkstone');
    tier(s, UP_A, 'darkstone');
    tier(s, UP_B, 'darkstone');
    for (const [x0, x1] of [[3.4, SLOT_X0], [SLOT_X1, 7.4]] as const) {
      // The cream observatory band, then a dark machine-room cap. The dark cap
      // against the pale band is what makes the band read.
      s.box(x0, 1.35, x1 - x0, 3.0, { color: 'cream', h: TOP - CROWN, z: CROWN });
      s.box(x0 + 0.2, 1.65, x1 - x0 - 0.4, 2.4, { color: 'darkstone', h: 0.55, z: TOP });
      s.post((x0 + x1) / 2, 2.85, TOP + 0.55, 2.3, 'metal', 0.07);
    }

    // The plaza's trees and lamps stand in front of the podium (higher gy), so
    // they come last.
    for (const [tx, ty] of [[3.5, 5.95], [7.35, 5.95], [3.45, 7.35], [7.5, 7.45]] as const) {
      s.cylinder(tx, ty, 0.06, { color: 'wood', h: 0.7 });
      s.cylinder(tx, ty, 0.34, { color: 'leaf', h: 0.75, z: 0.55 });
    }
    for (const lx of LAMPS_X) s.post(lx, LAMP_Y, 0, 1.2, 'metal', 0.07);
  },
  animate(pen, gx, gy, v) {
    // Something moves on everything: the red aircraft lights alternate, on for
    // a third of each 1.6 s cycle. `intensity <= 0` draws nothing at all.
    for (const m of MASTS) {
      const on = ((pen.t / 1.6 + m.phase) % 1) < 0.33;
      glowDot(pen, gx + m.x, gy + m.y, m.z, 'bad', 0.2, on ? 1 : 0);
    }
    const dn = hourNow();
    if (dn < 0.72) {
      windows(pen, gx, gy, v, dn);
      pool(pen, gx, gy, v, dn);
    }
  },
});

/** Warm window strips on the lit floors, at night.
 *
 *  These are drawn from `animate`, i.e. OVER the whole sprite, so each is
 *  confined to a face that nothing of this sprite stands in front of:
 *  - the +gy and +gx faces of the shaft, of leg B and of No.2's upper tiers
 *    have no neighbour in front;
 *  - leg A's +gx face is the slot, and leg B stands in front of all of it but
 *    the last tile or so of its front, so only that sliver is lit;
 *  - No.2's lowest floors on +gx are behind the podium's corner, so they stay
 *    dark;
 *  - the podium is not lit at all, because the plaza trees stand in front of it.
 *  At zoom under 0.7 a strip is one run, because the piers are sub-pixel and
 *  one fill is the same picture for a fifth of the cost; closer in, it is
 *  split at the piers so the facade keeps its rhythm. */
function windows(pen: Pen, gx: number, gy: number, v: Variant, dn: number): void {
  const p = pen.palette;
  const dark = p.get('darkstone');
  const amber = p.get('neon_amber');
  const warmY = mix(dark, amber, 0.85);
  const warmX = mix(dark, amber, 0.7);
  const bays = pen.camera.zoom >= 0.7;
  for (const t of LIT_TIERS) {
    const floors = Math.floor(t.z1 - t.z0);
    const front = t.y + t.d;
    const slot = t === LEG_A || t === UP_A;
    const yEdge = gy + front;
    const xEdge = gx + t.x + t.w;
    for (let k = 0; k < floors; k++) {
      if (!isWindowFloor(k) || !isLit(v, t.id * 100 + k, dn)) continue;
      const za = t.z0 + k + 0.22;
      const zb = t.z0 + k + 0.78;
      strip(bays, gx + t.x + 0.12, gx + t.x + t.w - 0.12, t.gap, (a, b) => isoWall(pen, a, yEdge, b, yEdge, za, zb, warmY));
      if (t === N2_A && k < 3) continue;
      const lo = slot ? front - 1.0 : t.y + 0.12;
      strip(bays, gy + lo, gy + front - 0.12, t.gap, (a, b) => isoWall(pen, xEdge, a, xEdge, b, za, zb, warmX));
    }
  }
}

/** One window run from `a` to `b`, whole or split at every `gap`. */
function strip(bays: boolean, a: number, b: number, gap: number, emit: (a: number, b: number) => void): void {
  if (!bays) { emit(a, b); return; }
  for (let u = a; u < b - 0.05; u += gap) emit(u + 0.09, Math.min(u + gap, b));
}

/** One pool per lit floor, on the +gy face, plus the plaza lamps. Windows are
 *  scarce and steep rather than a wide fog (the same lesson as main.ts's light
 *  field). Gated on `active`, and on the hour: `Light.bloom` does not scale with
 *  darkness, so a pool at dusk-before-dark would be a warm smudge at noon. */
function pool(pen: Pen, gx: number, gy: number, v: Variant, dn: number): void {
  const L = pen.light;
  if (L === undefined || !L.active) return;
  const warmth = snap(1 - dn);
  for (const t of LIT_TIERS) {
    const floors = Math.floor(t.z1 - t.z0);
    for (let k = 0; k < floors; k++) {
      if (!isWindowFloor(k) || !isLit(v, t.id * 100 + k, dn)) continue;
      L.add(gx + t.x + t.w / 2, gy + t.y + t.d, (t.z0 + k + 0.5) * LEVEL_H, Math.min(1.6, 0.5 + t.w * 0.28), 0.34 * warmth, 'neon_amber');
    }
  }
  for (const lx of LAMPS_X) {
    L.add(gx + lx, gy + LAMP_Y, 1.1 * LEVEL_H, 0.7, 0.7 * warmth, 'warn');
    L.add(gx + lx, gy + LAMP_Y, 1.1 * LEVEL_H, 2.2, 0.24 * warmth, 'warn');
  }
}

// ── コクーンタワー ───────────────────────────────────────────────────────────
//
// An egg, from the lathe profile the three.js version settled on: narrow base,
// a bulge at 42% of the height, a rounded crown.
//
// It is drawn in `animate`, with the surface's own polygon primitives, and
// that is deliberate. It was first stacked `cylinder`s, and that cannot be made
// to read: `isoCylinder` always paints its own base cap, in the dark right-face
// tone, over the top of the segment below it, so every joint is a dark scallop
// and twelve segments are a stack of twelve discs however thin they are. A
// lathe is one convex polygon, and `animate` is the only hook with the surface.
// `massing` keeps the plinth and a hidden core of the egg's full height, so
// `heightOf` (the name plate, the sorter's cull) measures the real tower; the
// skin is drawn over the core and nothing else of the sprite stands in front.

/** (radius fraction, height fraction). */
const PROFILE: readonly (readonly [number, number])[] = [
  [0.52, 0], [0.74, 0.08], [0.92, 0.22], [1.0, 0.42], [0.97, 0.6], [0.86, 0.78], [0.62, 0.93], [0.3, 1.0],
];
const R_MAX = 1.9;             // tiles; the footprint is 4, so this nearly fills it
const BODY_Z = 0.9;            // storeys: the plinth's top
const BODY_H = 15;
const CAP_H = 0.35;
const C = 2;                   // the footprint's centre, in tiles

/** Radius in tiles at a height fraction, by linear interpolation. */
function radiusAt(hf: number): number {
  for (let i = 1; i < PROFILE.length; i++) {
    const a = PROFILE[i - 1];
    const b = PROFILE[i];
    if (a === undefined || b === undefined) continue;
    if (hf <= b[1]) return (a[0] + ((b[0] - a[0]) * (hf - a[1])) / (b[1] - a[1])) * R_MAX;
  }
  return (PROFILE[PROFILE.length - 1]?.[0] ?? 0) * R_MAX;
}

const COCOON = defineSprite({
  id: 'shinjuku.cocoon', w: 4, d: 4,
  massing(s) {
    s.shadow(0.3, 0.3, 3.4, 3.4, 0.5);
    s.box(0.3, 0.3, 3.4, 3.4, { color: 'darkstone', h: BODY_Z });
    s.cylinder(C, C, 0.5, { color: 'towerglass', h: BODY_H + CAP_H, z: BODY_Z });
  },
  animate(pen, gx, gy, v) {
    const dn = hourNow();
    drawEgg(pen, gx, gy, dn);
    // The crown beacon breathes, in nine steps rather than a continuous ramp.
    glowDot(pen, gx + C, gy + C, BODY_Z + BODY_H + CAP_H + 0.3, 'bad', 0.2, snap(0.45 + 0.55 * Math.max(0, Math.sin(pen.t * 2.4))));
    if (dn >= 0.72) return;
    // Two cool pools, mid-body and at the foot: the egg lights its own plinth.
    const L = pen.light;
    if (L?.active) {
      const warmth = snap(1 - dn);
      L.add(gx + C, gy + C, (BODY_Z + BODY_H * 0.4) * LEVEL_H, 1.7, 0.3 * warmth, 'neon_cyan');
      L.add(gx + C, gy + C + 1.6, LEVEL_H, 1.3, 0.3 * warmth, 'warn');
    }
    // Lit cells scattered over the half that faces the camera.
    for (let i = 0; i < 24; i++) {
      if (!isLit(v, 900 + i, dn)) continue;
      const hf = 0.08 + 0.84 * toUnit(hashStep(v.seed, 1000 + i));
      const a = 0.2 + (Math.PI - 0.4) * toUnit(hashStep(v.seed, 2000 + i));
      const r = radiusAt(hf);
      const flicker = snap(0.6 + 0.4 * Math.sin(pen.t * 0.7 + i * 1.9));
      // The same screen-ellipse point as the lattice, back in grid terms.
      glowDot(pen, gx + C + (r * (Math.cos(a) + Math.sin(a))) / 2, gy + C + (r * (Math.sin(a) - Math.cos(a))) / 2,
        BODY_Z + hf * BODY_H, i % 3 === 0 ? 'neon_cyan' : 'neon_amber', 0.12, flicker);
    }
  },
});

/** The egg's skin: one convex body polygon with a left-to-right ramp, a pale
 *  rib at every joint, and a woven lattice of helices over the half that faces
 *  the camera. */
function drawEgg(pen: Pen, gx: number, gy: number, dn: number): void {
  const cam = pen.camera;
  const S = pen.surface;
  const xy = pen.xy;
  const p = pen.palette;
  // A little of the canopy white in the glass: the real skin is silver, and
  // pure towerglass is the same blue as every neighbouring office.
  const glass = mix(p.get('towerglass'), p.get('canopy'), 0.2);
  const cx = cam.toScreenX((gx - gy) * HALF_W) + pen.snapX;
  const wy0 = (gx + gy + 2 * C) * HALF_H;
  const yAt = (z: number): number => cam.toScreenY(wy0 - levelsToPx(z)) + pen.snapY;
  const rxOf = (r: number): number => r * HALF_W * cam.zoom;

  // The body: down the left edge from the crown, round the front of the base,
  // up the right. Convex, because the profile is concave in height.
  const M = 20;
  let n = 0;
  for (let i = M; i >= 0; i--) {
    const hf = i / M;
    xy[n++] = cx - rxOf(radiusAt(hf));
    xy[n++] = yAt(BODY_Z + hf * BODY_H);
  }
  const rx0 = rxOf(radiusAt(0));
  const yBase = yAt(BODY_Z);
  for (let i = 1; i < 12; i++) {
    const a = Math.PI - (i * Math.PI) / 12;
    xy[n++] = cx + rx0 * Math.cos(a);
    xy[n++] = yBase + (rx0 / 2) * Math.sin(a);
  }
  for (let i = 0; i <= M; i++) {
    const hf = i / M;
    xy[n++] = cx + rxOf(radiusAt(hf));
    xy[n++] = yAt(BODY_Z + hf * BODY_H);
  }
  const rxMax = rxOf(R_MAX);
  S.polyRamp(xy, n / 2, cx - rxMax, 0, cx + rxMax, 0, shade(glass, FACE_LEFT), shade(glass, FACE_RIGHT));

  // The silhouette, open at the crown: the cap ellipse closes it.
  S.stroke(xy, n / 2, false, outlineOf(glass), 1);

  // Ribs and lattice, in a mid-tone lighter than the glass.
  const rib = mix(glass, p.get('canopy'), 0.5);
  // At night the lattice is what is lit: it picks up the cyan of the lit
  // classrooms behind it, so the egg stays a shape against the dark.
  const midTone = mix(shade(rib, FACE_LEFT + 0.1), p.get('neon_cyan'), 0.45 * (1 - dn));
  const lw = Math.max(1, cam.zoom * 1.4);
  // Ribs: the front half of a latitude circle every 1.5 storeys.
  for (let k = 1; k < 10; k++) {
    const hf = k / 10;
    const rx = rxOf(radiusAt(hf));
    const y = yAt(BODY_Z + hf * BODY_H);
    n = 0;
    for (let i = 0; i <= 12; i++) {
      const a = (i * Math.PI) / 12;
      xy[n++] = cx + rx * Math.cos(a);
      xy[n++] = y + (rx / 2) * Math.sin(a);
    }
    S.stroke(xy, 13, false, midTone, lw);
  }
  // Helices, both hands. A point is (angle, height) on the same screen ellipse
  // `isoCylinder` uses, whose half-width is r * HALF_W and NOT the r * sqrt(2) *
  // HALF_W a true grid circle would project to: use the true one and the
  // lattice floats outside the body. The front half is sin(angle) > 0.
  const TURN = Math.PI;
  for (const hand of [1, -1]) {
    for (let j = 0; j < 7; j++) {
      const a0 = (j / 7) * Math.PI * 2;
      n = 0;
      for (let i = 0; i <= 24; i++) {
        const hf = 0.03 + (0.94 * i) / 24;
        const a = a0 + hand * hf * TURN;
        const front = Math.sin(a) > 0.05;
        if (front) {
          const rx = rxOf(radiusAt(hf));
          xy[n++] = cx + rx * Math.cos(a);
          xy[n++] = yAt(BODY_Z + hf * BODY_H) + (rx / 2) * Math.sin(a);
        }
        if ((!front || i === 24) && n >= 4) {
          S.stroke(xy, n / 2, false, midTone, lw);
          n = 0;
        }
      }
    }
  }

  // The crown: a flat cap on the dome.
  const rTop = rxOf(radiusAt(1));
  const yTop = yAt(BODY_Z + BODY_H);
  S.ellipse(cx, yTop, rTop, rTop / 2, shade(p.get('canopy'), FACE_TOP));
  S.ellipse(cx, yTop - levelsToPx(CAP_H) * cam.zoom, rTop * 0.6, rTop * 0.3, shade(p.get('canopy'), FACE_LEFT));
}

const BY_ID: ReadonlyMap<string, SpriteDef> = new Map([
  ['tocho', TOCHO], ['cocoon', COCOON], ['isetan', ISETAN], ...KABUKICHO_DEFS,
]);

/** The sprite for a `LANDMARKS` entry. Throws on an id it does not know, so a
 *  landmark added to the layout without art fails loudly instead of being a
 *  nameless hole. */
export function landmarkDef(id: string): SpriteDef {
  const def = BY_ID.get(id);
  if (def === undefined) throw new Error(`landmarkDef: no sprite for landmark "${id}"`);
  return def;
}
