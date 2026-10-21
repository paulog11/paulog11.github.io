/**
 * SHINJUKU — the art for the FILLER, and the palette for everything. All of it
 * from one colour per solid; `shade` derives the three faces, which is what
 * keeps cool shadows under warm highlights without anybody choosing either.
 * `defForLot` is the one door the layout comes through: a district in, a
 * sprite out. Five archetypes stand behind it:
 *
 *   ZAKKYO     Kabukichō's pencil buildings — two skinny towers per lot, a
 *              stack of neon blades, a rooftop billboard. The densest and
 *              loudest thing in the ward on purpose.
 *   MIDRISE    retail: a glazed ground floor, an awning, a big rooftop sign.
 *   OFFICE     a Nishi tower on a plaza, the shaft never filling its site.
 *   NEIGHBOUR  the fringe: a concrete "mansion" block, not a tiled townhouse.
 *   GROVE      Gyoen, as forest.
 *
 * The station and the two landmarks live in `station.ts` and `landmarks.ts`
 * and borrow this file's palette.
 *
 * Twenty-three materials of our own go in through `extendStops`, into BOTH stop sets.
 * A slot defined in only one of them is the bug where a single thing stays
 * gold at midnight while everything around it goes dark, and it is silent.
 *
 * The stop sets are HOISTED. Rebuilding one inside the render callback bumps
 * `Palette.rev` every frame, and `rev` is what every cache in the kit keys on
 * — the symptom is not a wrong colour, it is a frame time that climbs at dusk
 * and stays climbed.
 *
 * Two rules every archetype here obeys, both from the layout, not from taste:
 *  - Only the +gx and +gy faces are ever on screen, so signs and windows go
 *    there and nowhere else.
 *  - A building is at most `level + 1` storeys tall, rooftop kit included:
 *    main.ts sizes the camera fence and the cull margin on that.
 */
import { hashStep, toUnit } from '@latticekit/core';
import {
  DAY, LEVEL_H, NIGHT, VARIANT_ZERO, defineSprite, drawSprite, extendStops, glowDot, isoBox,
  isoCylinder, isoWall, spriteHeightPx,
} from '@latticekit/draw';
import type { Ink, Pen, SolidWriter, SpriteDef, Variant } from '@latticekit/draw';

import type { District } from './layout.ts';

/** The ground is warm-neutral on purpose. A blue-grey paving at 63% lightness
 *  reads as WATER next to warm walls — the ward's empty lots looked like a
 *  frozen lake, and nothing in the code said "blue". */
const MATERIALS_DAY = {
  road: 0x3f424aff, paving: 0x8d877dff,
  tile: 0xb4573cff, slate: 0x6b7585ff,
  stucco: 0xd9cdbaff, brick: 0xc08a6eff, plaster: 0xcfd3cbff,
  wood: 0x7a5a3eff, leaf: 0x5f9b52ff,
  // Shinjuku's own. Towers and civic stone are neutral on purpose, for the same
  // reason as the paving: a blue-grey mass at this lightness reads as water.
  concrete: 0xbab6acff, towerglass: 0x5d6f86ff, granite: 0xb4b9c1ff,
  darkstone: 0x565a60ff, cream: 0xeed8a8ff, canopy: 0xe6e3dcff,
  // The rail corridor. Ballast is darker than the platform concrete so the two
  // read as separate ground, and the rail itself is the lightest thing on it.
  ballast: 0x7a746bff, rail: 0xa9a69eff, jrgreen: 0x13a057ff, chuo: 0xee5a24ff,
  // Signage. See the note below: these four barely move between the sets.
  neon_red: 0xff2d55ff, neon_cyan: 0x00e5ffff, neon_amber: 0xffb347ff, neon_pink: 0xff6fa8ff,
};
const MATERIALS_NIGHT = {
  road: 0x191b20ff, paving: 0x2f2c28ff,
  tile: 0x4a2a24ff, slate: 0x2b323cff,
  stucco: 0x4e4c48ff, brick: 0x45342cff, plaster: 0x4a4e4cff,
  wood: 0x32271dff, leaf: 0x24402aff,
  concrete: 0x45433fff, towerglass: 0x1c2433ff, granite: 0x3d4249ff,
  darkstone: 0x1f2124ff, cream: 0x5b5346ff, canopy: 0x4b4d52ff,
  ballast: 0x25231fff, rail: 0x3b3b3cff, jrgreen: 0x0d4a2cff, chuo: 0x6a2a14ff,
  // DELIBERATELY near-identical to the day values (a touch brighter, if
  // anything). Signage glows at night, so the one set of slots that must NOT
  // roll down with the rest is the neon; rolled down like `brick`, a sign would
  // go as dark as the wall it is bolted to. The light field, not the palette,
  // is what gives them a pool on the ground.
  neon_red: 0xff3860ff, neon_cyan: 0x18e8ffff, neon_amber: 0xffba55ff, neon_pink: 0xff78b0ff,
};

export const DAY_X = extendStops(DAY, MATERIALS_DAY);
export const NIGHT_X = extendStops(NIGHT, MATERIALS_NIGHT);

/** Roofs for the odd pitched fringe house. Shinjuku's fringe is concrete, so
 *  these are the exception and not the town's character. */
const ROOFS: readonly Ink[] = ['tile', 'slate'];

/** Buildings do not fill their lot. The 0.16-tile skirt on every side is what
 *  leaves paving visible between neighbours — without it a block of sixteen
 *  lots renders as one continuous mass and the street grid disappears. */
const PAD = 0.16;
const SPAN = 2 - PAD * 2;

// ── what the art needs to know about the hour, and the zoom ──────────────────

/** 1 at noon, 0 at midnight. Set once per frame, read by every `animate` hook,
 *  so the windows and the palette cannot disagree about what time it is. */
let daylight = 1;
/** Windows are sub-metre detail. Below this zoom they are a cost with nothing
 *  to show for it, so they are skipped rather than drawn small. */
let detail = true;

export function setHour(light: number, zoom: number): void {
  daylight = light;
  detail = zoom > 0.52;
}

/** The hour the art is drawing right now, 1 at noon and 0 at midnight. Exported
 *  so the station can ask the art what time it is rather than sniffing the
 *  palette for it — the two must never disagree. */
export function hourNow(): number {
  return daylight;
}

/** The same number in `massing` and in `animate`, addressed by index rather
 *  than by draw order — the two hooks get different `Rng` streams, so a
 *  feature that draws in the same order in both still lands somewhere else.
 *
 *  Indices are partitioned so two features never share a roll: 0–2 and 11–40
 *  are the fringe and `litWindow`; 100s ZAKKYO, 140s MIDRISE, 160s OFFICE,
 *  200s GROVE; 300+ are the per-floor lights. */
function at(v: Variant, i: number): number {
  return toUnit(hashStep(v.seed, i));
}

function pick<T>(list: readonly T[], u: number): T {
  return list[Math.min(list.length - 1, Math.floor(u * list.length))] as T;
}

function roofOf(v: Variant): Ink {
  return pick(ROOFS, at(v, 1));
}

/** Window rhythm: three, three, gap, three. Even spacing reads as a
 *  spreadsheet; this reads as a building. */
function litWindow(v: Variant, i: number): boolean {
  if (i % 4 === 3) return false;
  // Somebody is always up, and somebody is always out.
  return at(v, i + 11) > 0.18 + 0.62 * daylight;
}

/** Warm windows up a fringe facade, in storeys.
 *
 *  Below the detail zoom this is ONE bloom for the whole building rather than
 *  nothing. Skipping it outright left the ward pitch dark at the opening shot
 *  with only the headlights moving — the window rhythm is the night, and it
 *  was being hidden at exactly the zoom everyone starts at. The far band is
 *  allowed to be simpler; it is not allowed to be missing. */
function windows(pen: Pen, gx: number, gy: number, v: Variant, storeys: number): void {
  if (daylight > 0.74) return;
  if (!detail) {
    if (at(v, 3) > 0.42) {
      pen.light?.add(gx + 1, gy + 1, storeys * 13, 1.05, 0.34, 'warn');
    }
    return;
  }
  let i = 0;
  for (let s = 0; s < storeys; s++) {
    for (let k = 0; k < 3; k++, i++) {
      if (!litWindow(v, i)) continue;
      pen.light?.add(gx + PAD + 0.25 + k * (SPAN - 0.5) / 2, gy + 2 - PAD, (0.55 + s) * LEVEL_H, 0.45, 0.4, 'warn');
    }
  }
}

/** Lit floors of a tall building, decided PER FLOOR — never per window — and
 *  drawn as warm bands on the glazing's own footprint, on the south face and
 *  (when `east`) the east one. `base` is the section's lowest storey: the gap
 *  storey of the three-on-one-off rhythm is counted from it, so the dark floor
 *  lines up with the unglazed band the massing drew.
 *
 *  Bands, not light pools. A pool is a 2:1 ellipse lying in the ground plane,
 *  and one per floor stacks into a column of floating discs that hides the
 *  tower it was meant to light. A wall on the face is the thing the eye reads
 *  as a lit window, costs one fill, and cannot spill off the building.
 *
 *  Below the detail zoom it lights a three-storey run at a time, matching what
 *  `windowRun` built: the far band is allowed to be simpler, not missing. */
function litBands(
  pen: Pen, gx: number, gy: number, v: Variant,
  x0: number, y0: number, x1: number, y1: number, inset: number, east: boolean,
  base: number, f0: number, f1: number, salt: number,
): void {
  if (daylight > 0.74) return;
  // Somebody is always up and somebody is always out: about 70% of floors at
  // midnight, a quarter as the first lights come on at dusk.
  const bar = 0.3 + 0.6 * daylight;
  // `from` is where an open stretch of lit floors began, or -1 for none.
  let from = -1;
  for (let f = f0; f <= f1; f++) {
    const lit = f < f1 - 0.4 && (f - base) % 4 !== 3 && at(v, salt + f) > bar;
    if (lit && from < 0) from = f;
    // Close the stretch. Near, every floor is its own band with a sliver of wall
    // between; far, a stretch is one wall, because a storey is 9 px there.
    if (!lit && from >= 0) {
      if (detail) {
        for (let k = from; k < f; k++) bandWall(pen, gx, gy, x0, y0, x1, y1, inset, east, k + 0.25, k + 0.75);
      } else {
        bandWall(pen, gx, gy, x0, y0, x1, y1, inset, east, from + 0.2, f - 0.2);
      }
      from = -1;
    }
  }
}

function bandWall(
  pen: Pen, gx: number, gy: number, x0: number, y0: number, x1: number, y1: number,
  inset: number, east: boolean, z0: number, z1: number,
): void {
  isoWall(pen, gx + x0 + inset, gy + y1, gx + x1 - inset, gy + y1, z0, z1, 'warn');
  if (east) isoWall(pen, gx + x1, gy + y0 + inset, gx + x1, gy + y1 - inset, z0, z1, 'warn');
}

/** A neon sign's pool where it shines. Small on purpose: a pool is a ground-plane
 *  ellipse, and a big one reads as a disc hovering over the street rather than
 *  as light from a sign. Breathes a little so a street of them is not one frozen
 *  colour, and is skipped at noon, where the slab's own bright face is all the
 *  sign needs. */
function neonPool(
  pen: Pen, gx: number, gy: number, x: number, y: number, z: number, color: Ink, phase: number, radius: number,
): void {
  const light = pen.light;
  if (light === undefined || daylight > 0.8) return;
  const breathe = 0.7 + 0.12 * Math.sin(pen.t * 1.7 + phase * 6.283);
  light.add(gx + x, gy + y, z * LEVEL_H, radius, snap(breathe * (1.15 - daylight * 0.5)), color);
}

/** Window bands up one face, from storey `from` to `to`: three storeys glazed,
 *  one of wall, counted from storey 1 so every face of a building agrees (and
 *  `litBands`, whose `base` is 1 here, lights the same floors). Run it
 *  along the lattice, never into it — an edge-on wall throws.
 *
 *  Far away it is ONE wall per three-storey run instead of one per storey: a
 *  storey is 9 px at the opening zoom, and the far band is allowed to be built
 *  of fewer faces. Only decoration changes with the zoom, never a height, so
 *  `heightOf` does not care. */
function windowRun(s: SolidWriter, ax: number, ay: number, bx: number, by: number, from: number, to: number): void {
  if (!detail) {
    for (let st = from - ((from - 1) % 4); st < to - 0.4; st += 4) {
      const lo = Math.max(st, from);
      s.wall(ax, ay, bx, by, lo + 0.2, Math.min(st + 2.8, to - 0.2), 'towerglass');
    }
    return;
  }
  for (let st = from; st < to - 0.4; st++) {
    if ((st - 1) % 4 === 3) continue;
    s.wall(ax, ay, bx, by, st + 0.2, st + 0.7, 'towerglass');
  }
}

// ── ZAKKYO: Kabukichō's pencil buildings ─────────────────────────────────────
//
// Two skinny towers in one massing, so a lot reads as two buildings. Their
// footprints are disjoint in x (A west, B east), which is what keeps painter's
// order trivial: A, then B, then everything that hangs in front of either.
// Signs are the loud part — blades that stick out of the +gy face and plates
// that sit on the +gx face, in rotating neon slots, plus a billboard on posts.

const ZNEON: readonly Ink[] = ['neon_red', 'neon_cyan', 'neon_amber', 'neon_pink'];
const ZWALLS: readonly Ink[] = [
  'concrete', 'plaster', 'cream', 'granite', 'stucco', 'darkstone', 'brick', 'concrete',
];

const A_X0 = 0.08, A_X1 = 0.94, B_X0 = 0.99, B_X1 = 1.91, Z_Y0 = 0.1;

/** Everything about a zakkyo that `massing` and `animate` must agree on.
 *  Filled in place per call: a hook allocating one per building per frame is
 *  garbage the frame did not need. Safe, because nothing re-enters. */
const Z = {
  aTall: true, billboard: false, hA: 0, hB: 0, hT: 0, hS: 0, yA: 0, yB: 0,
  wallA: 'concrete' as Ink, wallB: 'concrete' as Ink,
  c1: 'neon_red' as Ink, c2: 'neon_cyan' as Ink, c3: 'neon_amber' as Ink,
  // The tall tower's x-span and south face, and where its sign column stands.
  tx0: 0, tw: 0, ty: 0, sx: 0, sw: 0, sd: 0, blade: false,
};

function zOf(v: Variant): typeof Z {
  const L = v.level;
  Z.billboard = L >= 3 && at(v, 100) < 0.8;
  // Leave room for the billboard under the level + 1 ceiling.
  Z.hT = Z.billboard ? L - 0.3 : L + 0.5;
  Z.hS = Math.max(1.3, Z.hT * (0.5 + 0.3 * at(v, 101)));
  Z.aTall = at(v, 102) > 0.5;
  Z.hA = Z.aTall ? Z.hT : Z.hS;
  Z.hB = Z.aTall ? Z.hS : Z.hT;
  // The south faces stop short of the lot edge so blades have 0.3+ to stick out.
  Z.yA = 1.3 + 0.3 * at(v, 103);
  Z.yB = 1.3 + 0.3 * at(v, 104);
  const ia = Math.floor(at(v, 105) * ZWALLS.length);
  Z.wallA = ZWALLS[ia] ?? 'concrete';
  // B is a DIFFERENT index from A, so the two towers never share a wall.
  Z.wallB = ZWALLS[(ia + 1 + Math.floor(at(v, 106) * (ZWALLS.length - 1))) % ZWALLS.length] ?? 'plaster';
  const ic = Math.floor(at(v, 107) * 4);
  Z.c1 = ZNEON[ic] ?? 'neon_red';
  Z.c2 = ZNEON[(ic + 1) % 4] ?? 'neon_cyan';
  Z.c3 = ZNEON[(ic + 2) % 4] ?? 'neon_amber';
  Z.tx0 = Z.aTall ? A_X0 : B_X0;
  Z.tw = Z.aTall ? A_X1 - A_X0 : B_X1 - B_X0;
  Z.ty = Z.aTall ? Z.yA : Z.yB;
  Z.blade = at(v, 109) > 0.5;
  Z.sw = Z.blade ? 0.1 : 0.34;
  Z.sd = Z.blade ? 0.32 : 0.07;
  Z.sx = Z.tx0 + 0.1 + at(v, 108) * (Z.tw - 0.5);
  return Z;
}

const ZAKKYO = defineSprite({
  id: 'shinjuku.zakkyo', w: 2, d: 2,
  massing(s, v) {
    const z = zOf(v);
    s.shadow(0.06, Z_Y0, 1.86, 1.6);
    // Mass: two towers.
    s.box(A_X0, Z_Y0, A_X1 - A_X0, z.yA - Z_Y0, { color: z.wallA, h: z.hA });
    s.box(B_X0, Z_Y0, B_X1 - B_X0, z.yB - Z_Y0, { color: z.wallB, h: z.hB });
    // Shopfronts: a dark ground floor is what makes the storeys above read as
    // stacked rather than extruded.
    // (Fine detail is skipped below the detail zoom — only ever things strictly
    // under the roofline, so `heightOf` is the same at every zoom.)
    if (detail) {
      s.wall(A_X0 + 0.05, z.yA, A_X1 - 0.05, z.yA, 0.05, 0.75, 'darkstone');
      s.wall(B_X0 + 0.05, z.yB, B_X1 - 0.05, z.yB, 0.05, 0.75, 'darkstone');
    }
    windowRun(s, A_X0 + 0.12, z.yA, A_X1 - 0.12, z.yA, 1, z.hA);
    windowRun(s, B_X0 + 0.12, z.yB, B_X1 - 0.12, z.yB, 1, z.hB);
    windowRun(s, B_X1, Z_Y0 + 0.15, B_X1, z.yB - 0.15, 1, z.hB);
    // A's east face is only on screen above B's roof — and below it when A is
    // the taller one, so that is where its windows go.
    if (z.aTall) windowRun(s, A_X1, Z_Y0 + 0.15, A_X1, z.yA - 0.15, Math.ceil(z.hS), z.hA);

    // Feature: the sign stack. Blades (perpendicular to the wall) or plates
    // (flat on it), 2-3 storeys each, in neon slots that rotate along the stack.
    const h1 = Math.min(2.0, 0.45 * z.hT);
    s.box(z.sx, z.ty, z.sw, z.sd, { color: z.c1, h: h1, z: 0.8 });
    const z2 = 0.8 + h1 + 0.1;
    const h2 = Math.min(2.2, z.hT - z2 - 0.3);
    if (h2 >= 0.8) s.box(z.sx, z.ty, z.sw, z.sd, { color: z.c2, h: h2, z: z2 });
    // The short tower gets one of its own, on whichever of its faces shows.
    const hO = Math.min(2.2, z.hS * 0.55);
    if (z.aTall) {
      // B is short: a plate on its east face, which is flush with the lot edge.
      s.box(B_X1, 0.25 + at(v, 111) * Math.max(0.1, z.yB - 0.95), 0.09, 0.5, { color: z.c3, h: hO, z: 0.9 });
    } else {
      const ox = A_X0 + 0.1 + at(v, 111) * (A_X1 - A_X0 - 0.5);
      s.box(ox, z.yA, 0.1, 0.32, { color: z.c3, h: hO, z: 0.9 });
    }
    // The rooftop billboard, on posts, facing the street that shows.
    if (z.billboard) {
      const bx = z.tx0 + 0.08, bw = z.tw - 0.16, by = z.ty - 0.18;
      s.box(bx, by, bw, 0.08, { color: z.c3, h: 0.75, z: z.hT + 0.3 });
      if (detail) {
        s.post(bx + 0.07, by + 0.02, z.hT, 0.3, 'metal', 0.05);
        s.post(bx + bw - 0.07, by + 0.02, z.hT, 0.3, 'metal', 0.05);
        s.wall(bx + 0.1, by + 0.08, bx + bw - 0.1, by + 0.08, z.hT + 0.5, z.hT + 0.78, 'canopy');
      }
    }
    // Third scale: kit on the roof. A tank or an AC unit is the one thing every
    // Tokyo roofline has; one is enough to say so.
    const rx = z.tx0 + z.tw * 0.5;
    if (at(v, 112) > 0.5) s.cylinder(rx, 0.5, 0.1, { color: 'canopy', h: 0.4, z: z.hT });
    else s.box(rx - 0.12, 0.38, 0.24, 0.18, { color: 'metal', h: 0.26, z: z.hT });
  },
  animate(pen, gx, gy, v) {
    const z = zOf(v);
    // Chase light up the stack: every Kabukichō sign has one.
    if (detail) {
      const run = (pen.t * 0.55 + at(v, 113)) % 1;
      glowDot(pen, gx + z.sx + z.sw / 2, gy + z.ty + z.sd, 0.9 + run * 2, z.c1, 0.09, 0.9);
    }
    if (daylight > 0.8) return;
    const h1 = Math.min(2.0, 0.45 * z.hT);
    // At most three pools for the signs, brightness snapped; the lit floors are
    // bands and add no light at all.
    neonPool(pen, gx, gy, z.sx + z.sw / 2, z.ty + z.sd / 2, 0.8 + h1, z.c1, at(v, 114), 0.6);
    const hO = Math.min(2.2, z.hS * 0.55);
    if (z.aTall) neonPool(pen, gx, gy, B_X1, 0.6, 0.9 + hO / 2, z.c3, at(v, 115), 0.6);
    else neonPool(pen, gx, gy, A_X0 + 0.45, z.yA + 0.15, 0.9 + hO / 2, z.c3, at(v, 115), 0.6);
    if (z.billboard) neonPool(pen, gx, gy, z.tx0 + z.tw / 2, z.ty - 0.1, z.hT + 0.7, z.c3, at(v, 116), 0.8);
    litBands(pen, gx, gy, v, A_X0, Z_Y0, A_X1, z.yA, 0.12, false, 1, 1, Math.floor(z.hA), 300);
    litBands(pen, gx, gy, v, B_X0, Z_Y0, B_X1, z.yB, 0.12, true, 1, 1, Math.floor(z.hB), 340);
  },
});

// ── MIDRISE: retail ──────────────────────────────────────────────────────────

const AWNINGS: readonly Ink[] = ['tile', 'jrgreen', 'slate', 'chuo', 'brick'];
const MWALLS: readonly Ink[] = ['concrete', 'plaster', 'cream', 'granite', 'stucco', 'concrete'];
/** Red and blue dominate, as in the reference's rooftop signs. */
const MSIGNS: readonly Ink[] = ['neon_red', 'neon_cyan', 'neon_red', 'neon_amber', 'neon_cyan'];

const M = { top: 0, sx: 0, sw: 0, sy: 1.42, sign: 'neon_red' as Ink };

function mOf(v: Variant): typeof M {
  M.top = v.level - 0.1;
  M.sw = 1.0 + 0.5 * at(v, 142);
  M.sx = 0.2 + at(v, 143) * (1.5 - M.sw);
  M.sign = pick(MSIGNS, at(v, 141));
  return M;
}

const MIDRISE = defineSprite({
  id: 'shinjuku.midrise', w: 2, d: 2,
  massing(s, v) {
    const m = mOf(v);
    s.shadow(0.08, 0.08, 1.84, 1.64);
    // Glazed ground floor, then the upper storeys stepped in a hair.
    s.box(0.1, 0.1, 1.8, 1.6, { color: 'towerglass', h: 0.95 });
    s.box(0.14, 0.14, 1.72, 1.52, { color: pick(MWALLS, at(v, 140)), h: m.top - 0.95, z: 0.95 });
    // The awning band, the one warm stripe at street level, sticking out over
    // the pavement. y 1.7 + 0.26 stays inside the lot.
    s.box(0.08, 1.7, 1.84, 0.26, { color: pick(AWNINGS, at(v, 145)), h: 0.13, z: 0.72 });
    if (detail) s.wall(0.8, 1.7, 1.1, 1.7, 0.02, 0.55, 'darkstone');
    windowRun(s, 0.28, 1.66, 1.78, 1.66, 1, m.top);
    windowRun(s, 1.86, 0.28, 1.86, 1.5, 1, m.top);
    // The rooftop sign: a box on short posts with a pale lettering band, in red
    // or blue. It is the second-loudest thing on the street after zakkyo.
    const zb = m.top + 0.14;
    s.box(m.sx, m.sy, m.sw, 0.12, { color: m.sign, h: 0.8, z: zb });
    if (detail) {
      s.post(m.sx + 0.1, m.sy + 0.05, m.top, 0.14, 'metal', 0.05);
      s.post(m.sx + m.sw - 0.1, m.sy + 0.05, m.top, 0.14, 'metal', 0.05);
      s.wall(m.sx + 0.12, m.sy + 0.12, m.sx + m.sw - 0.12, m.sy + 0.12, zb + 0.25, zb + 0.55, 'canopy');
    }
    // Third scale.
    if (at(v, 144) > 0.5) s.cylinder(0.45, 0.5, 0.11, { color: 'canopy', h: 0.34, z: m.top });
    else s.box(0.32, 0.38, 0.28, 0.22, { color: 'metal', h: 0.28, z: m.top });
  },
  animate(pen, gx, gy, v) {
    const m = mOf(v);
    // A bright dot running along the sign's top edge, by day and by night.
    if (detail) {
      const run = (pen.t * 0.45 + at(v, 146)) % 1;
      glowDot(pen, gx + m.sx + run * m.sw, gy + m.sy + 0.12, m.top + 0.14 + 0.8, 'canopy', 0.07, 0.9);
    }
    if (daylight > 0.8) return;
    neonPool(pen, gx, gy, m.sx + m.sw / 2, m.sy + 0.12, m.top + 0.55, m.sign, at(v, 147), 0.8);
    // The shopfront spilling onto the pavement.
    pen.light?.add(gx + 1, gy + 1.85, 0.4 * LEVEL_H, 0.8, 0.45, 'warn');
    litBands(pen, gx, gy, v, 0.14, 0.14, 1.86, 1.66, 0.14, true, 1, 1, Math.floor(m.top), 320);
  },
});

// ── OFFICE: a Nishi tower on its plaza ───────────────────────────────────────

/** Glass is the Nishi default, but a field of identical blue boxes is the thing
 *  to avoid, so the rest of the list is the beige and grey of the older ones. */
const OWALLS: readonly Ink[] = [
  'towerglass', 'towerglass', 'towerglass', 'concrete', 'concrete', 'cream', 'granite', 'granite',
];

const O = {
  wall: 'towerglass' as Ink, crown: 'granite' as Ink,
  pod: 0, x0: 0, y0: 0, x1: 0, y1: 0,
  /** Where the shaft steps in, or the shaft's top when it does not. Whole storeys. */
  zM: 0, zTop: 0, stepped: false, helipad: false,
};
/** Each setback pulls the faces in this far. */
const SETBACK = 0.3;

function oOf(v: Variant): typeof O {
  const L = v.level;
  O.wall = pick(OWALLS, at(v, 160));
  O.crown = O.wall === 'granite' ? 'concrete' : 'granite';
  // Whole storeys everywhere, so the 3-3-gap rhythm lines up with the floors
  // `litBands` counts. The crown is 1.2 above zTop, kit takes it to ~L+0.5.
  O.zTop = L - 2;
  // A one- or two-storey podium on about half, never so tall the shaft is a stub.
  const room = O.zTop - 3;
  O.pod = at(v, 161) > 0.45 ? Math.max(0, Math.min(2, room)) : 0;
  O.x0 = 0.8 + 0.25 * at(v, 162);
  O.y0 = 0.8 + 0.25 * at(v, 163);
  O.x1 = 3.2 - 0.25 * at(v, 164);
  O.y1 = 3.2 - 0.25 * at(v, 165);
  O.stepped = at(v, 166) > 0.5 && O.zTop - O.pod >= 4;
  O.zM = O.stepped ? Math.round(O.pod + (O.zTop - O.pod) * 0.6) : O.zTop;
  O.helipad = at(v, 167) > 0.6;
  return O;
}

/** Three storeys glazed, one of wall, repeat. On a glass shaft the glazing is the
 *  wall already, so the element that gets drawn is the pale spandrel — the gap. */
function towerBands(
  s: SolidWriter, x0: number, y0: number, x1: number, y1: number, z0: number, z1: number, glass: boolean,
): void {
  for (let z = z0; z < z1 - 0.4; z += 4) {
    if (glass) {
      const g = z + 3;
      if (g + 0.9 > z1) continue;
      s.wall(x0, y1, x1, y1, g + 0.15, g + 0.85, 'granite');
      s.wall(x1, y0, x1, y1, g + 0.15, g + 0.85, 'granite');
    } else {
      const top = Math.min(z + 3, z1 - 0.2);
      s.wall(x0 + 0.2, y1, x1 - 0.2, y1, z + 0.2, top, 'towerglass');
      s.wall(x1, y0 + 0.2, x1, y1 - 0.2, z + 0.2, top, 'towerglass');
    }
  }
}

const OFFICE = defineSprite({
  id: 'shinjuku.office', w: 4, d: 4,
  massing(s, v) {
    const o = oOf(v);
    const glass = o.wall === 'towerglass';
    // The plaza skirt: paving lighter than the street, so the site reads as a
    // site and the shaft as a thing standing in it rather than on it.
    s.patch(0.06, 0.06, 3.88, 3.88, 0, 'concrete');
    s.shadow(o.x0, o.y0, o.x1 - o.x0, o.y1 - o.y0);
    if (o.pod > 0) {
      s.box(0.35, 0.35, 3.3, 3.3, { color: o.wall === 'granite' ? 'concrete' : 'granite', h: o.pod });
      s.wall(0.55, 3.65, 3.45, 3.65, 0.2, o.pod - 0.2, 'towerglass');
      s.wall(3.65, 0.55, 3.65, 3.45, 0.2, o.pod - 0.2, 'towerglass');
    }
    // Setback massing: shaft, optionally a narrower upper shaft, then the crown.
    s.box(o.x0, o.y0, o.x1 - o.x0, o.y1 - o.y0, { color: o.wall, h: o.zM - o.pod, z: o.pod });
    towerBands(s, o.x0, o.y0, o.x1, o.y1, o.pod, o.zM, glass);
    let cx0 = o.x0, cy0 = o.y0, cx1 = o.x1, cy1 = o.y1;
    if (o.stepped) {
      cx0 += SETBACK; cy0 += SETBACK; cx1 -= SETBACK; cy1 -= SETBACK;
      s.box(cx0, cy0, cx1 - cx0, cy1 - cy0, { color: o.wall, h: o.zTop - o.zM, z: o.zM });
      towerBands(s, cx0, cy0, cx1, cy1, o.zM, o.zTop, glass);
    }
    cx0 += SETBACK; cy0 += SETBACK; cx1 -= SETBACK; cy1 -= SETBACK;
    s.box(cx0, cy0, cx1 - cx0, cy1 - cy0, { color: o.crown, h: 1.2, z: o.zTop });
    const roof = o.zTop + 1.2;
    if (o.helipad) {
      // A helipad: dark pad, pale disc. It is the one flat thing up there, so it
      // reads at any zoom as "somebody important works here".
      const px = (cx0 + cx1) / 2, py = (cy0 + cy1) / 2;
      s.patch(px - 0.5, py - 0.5, 1, 1, roof, 'darkstone');
      s.cylinder(px, py, 0.34, { color: 'canopy', h: 0.03, z: roof });
    } else {
      s.box(cx0 + 0.2, cy0 + 0.2, 0.55, 0.4, { color: 'metal', h: 0.35, z: roof });
      s.box(cx1 - 0.55, cy1 - 0.55, 0.3, 0.3, { color: 'concrete', h: 0.25, z: roof });
    }
    // The mast, on the back corner where it cannot hide a face.
    s.post(cx0 + 0.15, cy0 + 0.15, roof, 0.9, 'metal', 0.05);
    // Third scale: trees on the plaza, east and south of the shaft only, which is
    // the side that is on screen.
    for (let i = 0; i < 2; i++) {
      const tx = i === 1 ? 1.5 : 3.78;
      const ty = i === 0 ? 1.5 : 3.78;
      s.cylinder(tx, ty, 0.17, { color: 'leaf', h: 0.6 });
    }
  },
  animate(pen, gx, gy, v) {
    const o = oOf(v);
    // The aviation light: the one thing on a Nishi tower that blinks at noon.
    const on = (pen.t + at(v, 168) * 2) % 1.8 < 0.25 ? 1 : 0;
    const c = SETBACK * (o.stepped ? 2 : 1);
    glowDot(pen, gx + o.x0 + c + 0.15, gy + o.y0 + c + 0.15, o.zTop + 2.1, 'bad', 0.12, on);
    if (daylight > 0.74) return;
    // One pool for the whole plaza, in front of the shaft; the floors are bands.
    pen.light?.add(gx + o.x1 + 0.3, gy + o.y1 + 0.3, 0, 1.4, 0.3, 'warn');
    const inset = o.wall === 'towerglass' ? 0.1 : 0.2;
    litBands(pen, gx, gy, v, o.x0, o.y0, o.x1, o.y1, inset, true, o.pod, Math.max(1, o.pod), o.zM, 360);
    if (o.stepped) {
      litBands(pen, gx, gy, v, o.x0 + SETBACK, o.y0 + SETBACK, o.x1 - SETBACK, o.y1 - SETBACK, inset, true, o.zM, o.zM, o.zTop, 360);
    }
  },
});

// ── NEIGHBOUR: the fringe ────────────────────────────────────────────────────

/** Concrete "mansion" blocks: flat roofs, balcony lines, a tank on the roof.
 *  Four neutrals and no terracotta — a European town is what this used to be. */
const FWALLS: readonly Ink[] = ['concrete', 'plaster', 'cream', 'stucco', 'concrete', 'plaster'];

const NEIGHBOUR = defineSprite({
  id: 'chome.neighbour', w: 2, d: 2,
  massing(s, v) {
    const L = v.level;
    const wall = pick(FWALLS, at(v, 0));
    // The odd low pitched roof is fine; it is the exception. Its rise is part of
    // the height, so it gets a shorter body to stay under level + 1.
    const pitched = L <= 2 && at(v, 5) > 0.8;
    const H = pitched ? L - 0.2 + 0.4 * at(v, 2) : L + 0.2 + 0.4 * at(v, 2);
    // A penthouse set back on the taller ones: massing, not a plain extrusion.
    const step = L >= 3 && at(v, 4) > 0.4 ? 1 : 0;
    const x1 = PAD + SPAN, y1 = PAD + SPAN;
    s.shadow(PAD, PAD, SPAN, SPAN);
    s.box(PAD, PAD, SPAN, SPAN, { color: wall, h: H - step });
    if (step === 1) s.box(PAD + 0.24, PAD + 0.24, SPAN - 0.48, SPAN - 0.48, { color: wall, h: 1, z: H - 1 });
    // Windows on both faces, balcony lines on the +gy one.
    for (let st = 0; st < Math.floor(H - step); st++) {
      s.wall(PAD + 0.24, y1, x1 - 0.24, y1, st + 0.3, st + 0.78, 'towerglass');
      s.wall(x1, PAD + 0.24, x1, y1 - 0.24, st + 0.3, st + 0.78, 'towerglass');
      if (st > 0 && detail) s.wall(PAD + 0.04, y1, x1 - 0.04, y1, st - 0.02, st + 0.12, 'metal');
    }
    if (pitched) {
      s.roof(PAD - 0.02, PAD - 0.02, SPAN + 0.04, SPAN + 0.04, H, 0.5, roofOf(v));
      return;
    }
    s.box(PAD - 0.02, PAD - 0.02, SPAN + 0.04, SPAN + 0.04, { color: 'concrete', h: 0.1, z: H });
    // Third scale: a tank on some, a stair box on the rest.
    if (at(v, 6) > 0.55) s.cylinder(PAD + 0.45, PAD + 0.5, 0.13, { color: 'canopy', h: 0.3, z: H + 0.1 });
    else s.box(PAD + 0.3, PAD + 0.3, 0.34, 0.3, { color: wall, h: 0.28, z: H + 0.1 });
  },
  animate(pen, gx, gy, v) {
    windows(pen, gx, gy, v, v.level);
  },
});

// ── GROVE: Gyoen ─────────────────────────────────────────────────────────────

/** Cells of a 3×3 grid in painter's order (back to front by gx + gy), so trees
 *  overlap the right way without a sort. */
const GROVE_ORDER = [0, 1, 3, 2, 4, 6, 5, 7, 8] as const;
/** The cell nearest the camera. It is never skipped, and its crown is drawn by
 *  `animate`, because that is the tree that sways. */
const FRONT = 8;

const T = { x: 0, y: 0, r: 0, h: 0, color: 'leaf' as Ink, skip: false };

/** One tree is ONE cylinder. A trunk post and a second tier per tree were the
 *  first design and tripled the canvas ops of a Gyoen lot; the trunks were
 *  hidden by the next tree in front anyway. Variety comes from the radius and
 *  height instead — tall and narrow beside low and wide is what a mixed wood
 *  looks like. */
function treeAt(v: Variant, cell: number): typeof T {
  // A little autumn, as in the reference: one tree in twelve, and wider and lower
  // than the rest — a tall narrow rust-red cylinder reads as a barrel, not a tree.
  const autumn = at(v, 260 + cell) > 0.92;
  const r = autumn ? 0.4 : 0.24 + 0.2 * at(v, 200 + cell);
  T.skip = cell !== FRONT && at(v, 210 + cell) < 0.2;
  const cx = (cell % 3) * 0.667 + 0.333, cy = Math.floor(cell / 3) * 0.667 + 0.333;
  // Clamped inside the lot: a canopy poking over its footprint is drawn in the
  // wrong order against the next lot.
  T.x = Math.min(2 - r - 0.02, Math.max(r + 0.02, cx + (at(v, 220 + cell) - 0.5) * 0.34));
  T.y = Math.min(2 - r - 0.02, Math.max(r + 0.02, cy + (at(v, 230 + cell) - 0.5) * 0.34));
  T.r = r;
  T.h = (0.5 + 0.7 * at(v, 240 + cell)) * (autumn ? 0.65 : 1);
  T.color = autumn ? 'tile' : 'leaf';
  return T;
}

const GROVE = defineSprite({
  id: 'shinjuku.grove', w: 2, d: 2,
  massing(s, v) {
    // No lawn patch and no outline: the terrain pass already paints Gyoen's
    // tiles `leaf`, and a drawn lot edge is what stops a forest being one.
    s.shadow(0.1, 0.1, 1.8, 1.8, 0.5);
    let skipped = 0;
    for (const cell of GROVE_ORDER) {
      const t = treeAt(v, cell);
      // 6-8 trees: never skip more than two.
      if (t.skip && skipped < 2) { skipped++; continue; }
      // The front tree is short here; its crown is `animate`'s, on top.
      s.cylinder(t.x, t.y, t.r, { color: t.color, h: cell === FRONT ? t.h * 0.6 : t.h });
    }
  },
  animate(pen, gx, gy, v) {
    // The front tree's crown, swaying. Drawn here and not in `massing` because it
    // is the one thing in the lot that moves, and a sprite where nothing moves
    // reads as a screenshot.
    const t = treeAt(v, FRONT);
    const sway = 0.03 * Math.sin(pen.t * 0.9 + at(v, 270) * 6.283);
    isoCylinder(pen, gx + t.x + sway, gy + t.y, t.r * 0.8, { color: t.color, h: t.h * 0.5, z: t.h * 0.5 });
  },
});

/** Which sprite stands on a built lot. THE seam between the layout and the art:
 *  `neighbourAt` decides THAT a lot is built, this decides WHAT. The footprint
 *  of the answer (`def.w`, `def.d`) is what main.ts gives the depth sorter, so
 *  Nishi's 4×4 towers come from here and nowhere else.
 *
 *  `seed` is the lot's own variant seed: the mix below is a hash of it, so the
 *  same lot is always the same building and raising a share moves no one else. */
export function defForLot(d: District, seed: number): SpriteDef {
  const u = toUnit(hashStep(seed, 77));
  switch (d) {
    case 'N': return OFFICE;
    case 'G': return GROVE;
    case 'K': return u < 0.85 ? ZAKKYO : MIDRISE;
    case 'E': return u < 0.6 ? MIDRISE : ZAKKYO;
    case 'S': return u < 0.5 ? MIDRISE : NEIGHBOUR;
    default: return NEIGHBOUR; // F, and R, which is never built
  }
}

/** Nine levels of brightness rather than a continuous one. `softEllipse`
 *  caches one ramp per colour pair, so a continuously animated intensity is a
 *  cache key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

// ── heights, computed once ───────────────────────────────────────────────────

/** `spriteHeightPx` replays the whole massing to answer, so calling it per
 *  sprite per frame is a second full massing pass over the scene every frame
 *  for a number that cannot change. */
const HEIGHTS = new Map<string, number>();

export function variantFor(seed: number, level: number): Variant {
  return { ...VARIANT_ZERO, seed, level };
}

export function heightOf(def: SpriteDef, v: Variant): number {
  // Keyed on level AND on the seed, because the setbacks and rooftop kit are
  // chosen from it — two buildings at one level are not one height.
  const key = `${def.id}:${v.level}:${v.seed}`;
  let h = HEIGHTS.get(key);
  if (h === undefined) {
    h = spriteHeightPx(def, v);
    HEIGHTS.set(key, h);
  }
  return h;
}

export function paint(pen: Pen, def: SpriteDef, gx: number, gy: number, v: Variant): void {
  drawSprite(pen, def, gx, gy, v, 0);
}

// ── a car, which is the thing that moves before the player does anything ─────

/** Bright, and a metre longer than it wants to be. At the opening zoom there
 *  are about five pixels to a metre, so a realistically-sized car is three
 *  pixels of nothing — the whole ward measured as a still photograph with
 *  forty-eight of them driving through it. */
const CAR_COLORS: readonly Ink[] = ['brand', 'warn', 'glass', 'ok', 'metal'];

export function drawCar(pen: Pen, i: number, gx: number, gy: number, alongX: boolean): void {
  const color = CAR_COLORS[i % CAR_COLORS.length] ?? 'metal';
  const w = alongX ? 0.95 : 0.44;
  const d = alongX ? 0.44 : 0.95;
  isoBox(pen, gx - w / 2, gy - d / 2, w, d, { color, h: 0.5 });
  if (daylight < 0.45) pen.light?.add(gx, gy, 13, 0.75, 0.55, 'warn');
}
