/**
 * The 3-chōme shopping side and Shin-Okubo: 伊勢丹 (a multi-lot landmark) plus
 * the filler sprites for the `E` and `O` districts. Placement is `LANDMARKS` and
 * `DISTRICTS` in layout.ts; this file is what they look like.
 *
 *   ISETAN   the department store, 8×6 tiles at (102, 74). The biggest thing in
 *            the district on purpose: pale stone, stepped back, a blue lightbox.
 *   SHOP     `E`: shopping-street retail. Brighter and more commercial than the
 *            plain MIDRISE (striped awning, shop-name fascia, primary-colour
 *            signs), but with far less neon than Kabukichō's ZAKKYO.
 *   OKUBO    `O`, Shin-Okubo: a low building behind a row of open stalls under
 *            candy awnings, katakana and kanji on every sign. Pinker and lower
 *            than K, and never amber. NO HANGUL: the canvas font stack is only
 *            known to have kana and kanji.
 *
 * The rules are landmarks.ts's, and they bite here too: `massing` reads no
 * palette (the measuring replay runs it with only the kit's ten slots, so it
 * speaks in slot NAMES, or in raw numbers via `byHour`, never `palette.get`), it
 * emits back to front because call order IS paint order inside one sprite, and
 * `animate` runs after all of it, so anything lit there may only go where nothing
 * of the sprite stands in front.
 * The rolls below use indices 500-799, clear of sprites.ts's partition (its
 * `litBands` salts are 300+f, so the salts passed in here sit at 800+).
 *
 * Three things the layout dictates about where a sign can go, found by looking
 * rather than by arithmetic. NOTE the first was written when 伊勢丹 stood at
 * gy 72, with a row of lots on its south side; it now stands at gy 74, flush
 * with the block's south edge, so that face looks onto a street. The sign and
 * entrance placements below were tuned for the old position and still work, but
 * the south face now has room that the tuning did not use:
 *  - The row of lots directly SOUTH of 伊勢丹 (gy 78) was built right up to its
 *    +gy face, with 0.16 of paving between. A filler of height H hides the
 *    face behind it up to about H - 0.2, so the lightbox goes on the TOP two
 *    floors of the podium, above the tallest filler, and the main entrance
 *    stands in front of the lot there that happens to be empty (local x 2-4).
 *  - The street on the EAST (gx 110-111) is two tiles wide, and each tile of
 *    gap buys 1.2 storeys of visibility, so that face is the open one and gets
 *    the second lightbox.
 *  - Setbacks help for the same reason: every 0.8 tile a tier steps back is a
 *    storey of face a filler cannot reach.
 */
import { hashStep, toUnit } from '@latticekit/core';
import { LEVEL_H, defineSprite, glowDot, isoWall, mix } from '@latticekit/draw';
import type { Ink, Pen, SolidWriter, SpriteDef, Variant } from '@latticekit/draw';

import type { District } from './layout.ts';
import { at, hourNow, litBands, pick, windowRun } from './sprites.ts';

/** Lettering. A raw number is a valid `Ink`, and that is the point: the day
 *  text colour (`canopy`) rolls down to a dark grey at night, which is white
 *  text on a glowing sign going grey. This stays white in both stop sets. */
const WHITE: Ink = 0xffffffff;

/** Dark text for the pale signage slots (cyan and amber); white for the rest. */
function inkOn(c: Ink): Ink {
  return c === 'neon_cyan' || c === 'neon_amber' ? 'ink' : WHITE;
}

/** A raw colour that still goes dark at night: the blend of a day and a night
 *  value by the hour, which is what `palette.lerp` does to a slot. Raw numbers
 *  are valid `Ink` and read no palette, so they are safe in `massing`; the
 *  ward's slots just have no limestone and no pink wall to give them. */
function byHour(day: number, night: number): Ink {
  return mix(night, day, hourNow());
}

/** Fine detail (mullions, door panes, lettering) is sub-pixel below this zoom.
 *  `massing` has no `pen`, so the zoom is carried over from the last `animate`,
 *  which runs before the next sprite's massing: stale only for the first
 *  shopping sprite of a frame in which the zoom just changed, which nobody can
 *  see. It may gate things strictly under the roofline only — `heightOf` is
 *  computed once, from whatever the flag was then. */
let near = false;
/** One glyph on a 0.32-tile board is ~8 px at zoom 0.7 and only reads from about
 *  1.0; `wallText` would draw it (the band clears its 12 px floor) as mush, at the
 *  price of a canvas `fillText`, which is the most expensive thing in this file
 *  — measured at ~1 ms of a 6 ms frame over a view of Shin-Okubo. */
let read = false;

/** Nine levels of brightness, for the same reason as everywhere else: a ramp
 *  is cached per colour and a continuous intensity is a key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

// ── 伊勢丹 ───────────────────────────────────────────────────────────────────
//
// Reads as a department store, not a big MIDRISE, by four things the fillers
// never have: it is pale where everything else is grey or cream, it steps back
// twice, its upper floors are punched windows in a stone grid (not stacked
// glass), and the only blue on the street is its sign.

/** The podium's footprint. 0.2 of paving on three sides; the front is 0.45
 *  short of the lot edge, which is where the entrance canopy sticks out to. */
const X0 = 0.2, X1 = 7.8, Y0 = 0.2, Y1 = 5.55;
/** Ground floor, then five floors of one storey. */
const ZG = 1.5;
const ZA = 6.5;
/** Tier B (set back 0.8 on the two faces that show) and the penthouse C. */
const ZB = 8.1;
const ZC = 8.9;
const BT = { x0: 0.7, y0: 0.7, x1: 7.0, y1: 4.75 } as const;
const CT = { x0: 1.6, y0: 1.5, x1: 5.9, y1: 3.95 } as const;

/** Window bays per face: [from, to] along the face, with a 0.2 stone pier
 *  between each pair. The south face has five, the east three. */
type Bays = readonly (readonly [number, number])[];
const BAYS_S: Bays = [[0.4, 1.7], [1.9, 3.2], [3.4, 4.7], [4.9, 6.2], [6.4, 7.7]];
const BAYS_E: Bays = [[0.45, 1.85], [2.05, 3.45], [3.65, 5.05]];
/** Where the ground-floor glazing is broken by a stone pier. The middle of the
 *  south face is the door, so it has none there. */
const PIERS_S: readonly number[] = [1.8, 4.8, 6.3];
const PIERS_E: readonly number[] = [1.95, 3.55];
const FACES = [true, false] as const;
/** Windows are punched into a bay, not the whole bay: 0.2 of stone each side.
 *  Full-width ribbons made the podium read as a glass block; a department
 *  store is mostly wall. */
const WIN = 0.2;

/** The lightbox covers the top two floors (k = 3, 4) of these bays. */
const SIGN_Z0 = 4.6;
const SIGN_Z1 = 6.4;
const SIGN_S: readonly [number, number] = [1.9, 6.2];
const SIGN_E: readonly [number, number] = [2.05, 5.05];

/** Is this window (face, bay, floor) behind the lightbox? Massing skips it and
 *  `animate` must skip it too, or the night overlay paints across the sign. */
function behindSign(south: boolean, bay: number, k: number): boolean {
  return k >= 3 && bay >= 1 && bay <= (south ? 3 : 2);
}

/** One wall on the south face (along gx at y = `edge`) or the east face (along
 *  gy at x = `edge`). `stroke` is for lightboxes only. */
function onFace(
  s: SolidWriter, south: boolean, edge: number, a: number, b: number, z0: number, z1: number,
  fill: Ink, stroke?: Ink,
): void {
  if (south) s.wall(a, edge, b, edge, z0, z1, fill, stroke);
  else s.wall(edge, a, edge, b, z0, z1, fill, stroke);
}

/** The same on the pen, for the night overlay. */
function litOn(
  pen: Pen, gx: number, gy: number, south: boolean, edge: number, a: number, b: number, z0: number, z1: number,
): void {
  if (south) isoWall(pen, gx + a, gy + edge, gx + b, gy + edge, z0, z1, 'warn');
  else isoWall(pen, gx + edge, gy + a, gx + edge, gy + b, z0, z1, 'warn');
}

/** One face of the podium: glazed ground floor, a stone belt course, then the
 *  floors as punched windows in bays.
 *
 *  The windows are drawn per bay and per floor near, and as one tall wall per
 *  bay per run of floors far: a floor is 9 px at the opening zoom, and the far
 *  band is allowed to be simpler, never missing. The south face is the lit one
 *  (towerglass), the east the shaded one, which wants the darker tone. */
function facade(s: SolidWriter, south: boolean): void {
  const edge = south ? Y1 : X1;
  const bays = south ? BAYS_S : BAYS_E;
  const piers = south ? PIERS_S : PIERS_E;
  const glass: Ink = south ? 'towerglass' : 'darkstone';
  onFace(s, south, edge, south ? 0.3 : 0.35, south ? 7.7 : 5.4, 0.1, 1.25, 'glass');
  if (near) for (const p of piers) onFace(s, south, edge, p - 0.1, p + 0.1, 0.1, 1.25, 'granite');
  onFace(s, south, edge, south ? X0 : Y0, south ? X1 : Y1, 1.25, ZG, 'granite');
  let bay = 0;
  for (const [a, b] of bays) {
    if (near) {
      for (let k = 0; k < 5; k++) {
        if (!behindSign(south, bay, k)) onFace(s, south, edge, a + WIN, b - WIN, ZG + k + 0.3, ZG + k + 0.72, glass);
      }
    } else {
      onFace(s, south, edge, a + WIN, b - WIN, ZG + 0.3, ZG + 2.72, glass);
      if (!behindSign(south, bay, 3)) onFace(s, south, edge, a + WIN, b - WIN, ZG + 3.3, ZG + 4.72, glass);
    }
    bay++;
  }
}

/** The lightbox: a shallow blue box for the depth, a flat wall over its front
 *  (a wall is full-bright where a box face is shaded, which is what makes a
 *  lightbox read as lit) with the station's pale border, then the lettering. */
function lightbox(s: SolidWriter, south: boolean, a: number, b: number): void {
  if (south) {
    s.box(a, Y1, b - a, 0.12, { color: 'isetan_blue', h: SIGN_Z1 - SIGN_Z0, z: SIGN_Z0 });
    s.wall(a, Y1 + 0.12, b, Y1 + 0.12, SIGN_Z0, SIGN_Z1, 'isetan_blue', 'canopy');
    s.sign(a, Y1 + 0.12, b, Y1 + 0.12, SIGN_Z1, SIGN_Z1 - SIGN_Z0, '伊勢丹', WHITE);
  } else {
    s.box(X1, a, 0.12, b - a, { color: 'isetan_blue', h: SIGN_Z1 - SIGN_Z0, z: SIGN_Z0 });
    s.wall(X1 + 0.12, a, X1 + 0.12, b, SIGN_Z0, SIGN_Z1, 'isetan_blue', 'canopy');
    // b to a, not a to b: on the +gx face +gy runs right to left on screen, and a
    // sign drawn along it is mirrored.
    s.sign(X1 + 0.12, b, X1 + 0.12, a, SIGN_Z1, SIGN_Z1 - SIGN_Z0, '伊勢丹', WHITE);
  }
}

/** Rooftop trees, in painter's order (back to front by x + y). Two on the east
 *  terrace, four on the south one. */
const TREES: readonly (readonly [number, number])[] = [
  [1.4, 5.08], [2.9, 5.08], [7.4, 1.5], [4.4, 5.08], [7.4, 3.0], [5.9, 5.08],
];

/** The mast, on tier C's back corner where it cannot hide a face. */
const MAST_X = CT.x0 + 0.3;
const MAST_Y = CT.y0 + 0.3;

export const ISETAN: SpriteDef = defineSprite({
  id: 'shinjuku.isetan', w: 8, d: 6,
  massing(s) {
    // Limestone: warmer and paler than any slot, so that against a street of
    // grey and cream it is the one pale building. 0.74 of this is the lit face.
    const stone = byHour(0xf6eedaff, 0x58544cff);
    s.shadow(X0, Y0, X1 - X0, Y1 - Y0 + 0.2, 0.5);

    // The podium, with a granite cornice ring on top. The ring is a box that
    // paints its own top over the podium's roof at the same height, which is
    // fine: the terrace garden below is drawn after it.
    s.box(X0, Y0, X1 - X0, Y1 - Y0, { color: stone, h: ZA });
    s.box(X0 - 0.06, Y0 - 0.06, X1 - X0 + 0.12, Y1 - Y0 + 0.12, { color: 'granite', h: 0.2, z: ZA - 0.2 });

    // Facades, then the lightboxes over them.
    for (const south of FACES) facade(s, south);
    lightbox(s, true, SIGN_S[0], SIGN_S[1]);
    lightbox(s, false, SIGN_E[0], SIGN_E[1]);

    // The entrance: a dark recess with two door panes, under a canopy on two
    // posts with a blue fascia. Door panes and the fascia are drawn after the
    // facade because they stand in front of it.
    s.wall(2.1, Y1, 3.9, Y1, 0.05, 1.3, 'darkstone');
    if (near) {
      s.wall(2.2, Y1, 2.95, Y1, 0.1, 1.15, 'glass');
      s.wall(3.05, Y1, 3.8, Y1, 0.1, 1.15, 'glass');
    }
    s.post(1.85, 5.9, 0, 1.3, 'metal', 0.07);
    s.post(4.15, 5.9, 0, 1.3, 'metal', 0.07);
    s.box(1.7, Y1, 2.6, 0.42, { color: 'canopy', h: 0.14, z: 1.3 });
    s.wall(1.7, Y1 + 0.42, 4.3, Y1 + 0.42, 1.3, 1.44, 'isetan_blue');

    // Tier B. Set back, so a terrace of the podium's roof shows in front of it.
    s.box(BT.x0, BT.y0, BT.x1 - BT.x0, BT.y1 - BT.y0, { color: stone, h: ZB - ZA, z: ZA });
    for (const south of FACES) {
      const edge = south ? BT.y1 : BT.x1;
      const a = south ? BT.x0 + 0.3 : BT.y0 + 0.3;
      const b = south ? BT.x1 - 0.3 : BT.y1 - 0.3;
      onFace(s, south, edge, a, b, ZA + 0.35, ZA + 1.25, south ? 'towerglass' : 'darkstone');
      if (near) {
        for (let p = a + 1.5; p < b - 0.2; p += 1.5) onFace(s, south, edge, p - 0.08, p + 0.08, ZA + 0.35, ZA + 1.25, 'granite');
      }
    }
    // The penthouse: a glazed restaurant floor.
    s.box(CT.x0, CT.y0, CT.x1 - CT.x0, CT.y1 - CT.y0, { color: stone, h: ZC - ZB, z: ZB });
    onFace(s, true, CT.y1, CT.x0 + 0.25, CT.x1 - 0.25, ZB + 0.2, ZB + 0.65, 'glass');
    onFace(s, false, CT.x1, CT.y0 + 0.25, CT.y1 - 0.25, ZB + 0.2, ZB + 0.65, 'glass');

    // Rooftop plant: tier B's roof east of the penthouse, and the penthouse's
    // own. The mast is the tallest thing here, at ZC + 0.9 = 9.8.
    s.box(6.15, 1.2, 0.6, 1.0, { color: 'metal', h: 0.45, z: ZB });
    s.cylinder(6.5, 3.2, 0.28, { color: 'canopy', h: 0.5, z: ZB });
    s.box(2.4, 2.0, 1.3, 0.8, { color: 'metal', h: 0.35, z: ZC });
    s.cylinder(4.9, 2.6, 0.3, { color: 'canopy', h: 0.45, z: ZC });
    s.post(MAST_X, MAST_Y, ZC, 0.9, 'metal', 0.05);

    // The terrace garden on the podium's roof: lawn, then trees back to front,
    // then the low parapet last because it stands in front of all of it.
    s.patch(0.9, 4.88, 6.0, 0.42, ZA, 'leaf');
    s.patch(7.12, 0.9, 0.4, 4.2, ZA, 'leaf');
    // A tree is a trunk and a crown when near, one cylinder far: one flat-topped
    // cylinder is a barrel the moment the camera is close enough to see it.
    for (const [x, y] of TREES) {
      if (near) {
        s.post(x, y, ZA, 0.3, 'wood', 0.06);
        s.cylinder(x, y, 0.2, { color: 'leaf', h: 0.32, z: ZA + 0.28 });
      } else s.cylinder(x, y, 0.17, { color: 'leaf', h: 0.55, z: ZA });
    }
    s.box(X0 + 0.04, Y1 - 0.1, X1 - X0 - 0.08, 0.1, { color: 'canopy', h: 0.25, z: ZA });
    s.box(X1 - 0.1, Y0 + 0.04, 0.1, Y1 - Y0 - 0.08, { color: 'canopy', h: 0.25, z: ZA });
  },
  animate(pen, gx, gy, v) {
    near = pen.camera.zoom >= 0.7;
    read = pen.camera.zoom >= 1;
    // The aviation light on the mast: on a third of each 1.8 s, day and night,
    // like every other tall thing in the ward.
    glowDot(pen, gx + MAST_X, gy + MAST_Y, ZC + 0.95, 'bad', 0.14, (pen.t + 0.4) % 1.8 < 0.6 ? 1 : 0);
    const dn = hourNow();
    if (dn > 0.74) return;
    // A department store is the lit thing on its street: nearly every floor,
    // dimming only as the first lights come on. The threshold is per floor and
    // per bay, so the facade is a pattern and not a stripe.
    const bar = 0.08 + 0.6 * dn;
    for (const south of FACES) {
      const edge = south ? Y1 : X1;
      const bays = south ? BAYS_S : BAYS_E;
      let bay = 0;
      for (const [a, b] of bays) {
        if (near) {
          for (let k = 0; k < 5; k++) {
            if (!behindSign(south, bay, k) && at(v, 700 + bay * 5 + k + (south ? 0 : 40)) > bar) {
              litOn(pen, gx, gy, south, edge, a + WIN, b - WIN, ZG + k + 0.3, ZG + k + 0.72);
            }
          }
        } else {
          if (at(v, 700 + bay * 5 + (south ? 0 : 40)) > bar) litOn(pen, gx, gy, south, edge, a + WIN, b - WIN, ZG + 0.3, ZG + 2.72);
          if (!behindSign(south, bay, 3) && at(v, 703 + bay * 5 + (south ? 0 : 40)) > bar) {
            litOn(pen, gx, gy, south, edge, a + WIN, b - WIN, ZG + 3.3, ZG + 4.72);
          }
        }
        bay++;
      }
      // Tier B and the penthouse are one lit band each.
      const be = south ? BT.y1 : BT.x1;
      const ba = south ? BT.x0 + 0.3 : BT.y0 + 0.3;
      const bb = south ? BT.x1 - 0.3 : BT.y1 - 0.3;
      if (at(v, 790 + (south ? 0 : 1)) > bar) litOn(pen, gx, gy, south, be, ba, bb, ZA + 0.35, ZA + 1.25);
      const ce = south ? CT.y1 : CT.x1;
      litOn(pen, gx, gy, south, ce, (south ? CT.x0 : CT.y0) + 0.25, (south ? CT.x1 : CT.y1) - 0.25, ZB + 0.2, ZB + 0.65);
      // The doors, always.
      if (south) litOn(pen, gx, gy, true, Y1, 2.2, 3.8, 0.1, 1.15);
    }
    const L = pen.light;
    if (L === undefined || !L.active) return;
    const warmth = snap(1 - dn);
    // The sign glows: a pool at its height on each face, in its own blue. Few,
    // and tight, for the usual reason — a wide pool is a disc hovering in the air.
    L.add(gx + (SIGN_S[0] + SIGN_S[1]) / 2, gy + Y1 + 0.2, 5.5 * LEVEL_H, 2.4, snap(0.45 * warmth), 'isetan_blue');
    L.add(gx + X1 + 0.2, gy + (SIGN_E[0] + SIGN_E[1]) / 2, 5.5 * LEVEL_H, 2.0, snap(0.4 * warmth), 'isetan_blue');
    // The entrance spills onto the paving in front, and the east frontage onto
    // the street.
    L.add(gx + 3.0, gy + Y1 + 0.9, 0, 2.4, snap(0.6 * warmth), 'warn');
    L.add(gx + X1 + 0.9, gy + 3.0, 0, 2.6, snap(0.42 * warmth), 'warn');
    if (near) {
      // Lamps under the canopy.
      for (let i = 0; i < 3; i++) glowDot(pen, gx + 2.2 + i * 0.8, gy + Y1 + 0.3, 1.25, 'warn', 0.07, snap(warmth));
    }
  },
});

// ── SHOP: 3-chōme retail ─────────────────────────────────────────────────────
//
// What MIDRISE is not: a shop-name fascia between the glazing and the first
// floor, a deep striped awning, one or two stacked blade signs in the colours of
// retail chains (red, green, yellow, magenta, cyan) and not of a night district,
// and a rooftop billboard that is sometimes turned to face the east street.
// Blades sit on the WEST end of the south face and nowhere else, because
// `litBands` paints over everything and a blade at the east end would be
// overpainted by the lit window next to it.

const SHOP_WALLS: readonly Ink[] = ['canopy', 'cream', 'plaster', 'canopy', 'stucco', 'cream'];
/** Cloth, so these roll down to dark at night like any awning. */
const SHOP_AWNINGS: readonly Ink[] = ['chuo', 'jrgreen', 'brand', 'tile', 'jrgreen'];
/** Signage slots: the ones that do NOT roll down at night. */
const SHOP_SIGNS: readonly Ink[] = ['metro_red', 'metro_green', 'neon_amber', 'neon_cyan', 'metro_magenta'];

/** What the billboards sell: a drugstore, electronics, books, a cafe, a sale. */
const SHOP_WORDS: readonly string[] = ['薬局', '家電', '書店', 'カフェ', 'セール', '靴', 'ラーメン'];

const SH = {
  word: '', top: 0, wall: 'canopy' as Ink, awn: 'chuo' as Ink,
  c1: 'metro_red' as Ink, c2: 'metro_green' as Ink, bill: 'neon_amber' as Ink,
  h1: 0, h2: 0, east: false, bx: 0, bw: 0,
};

function shOf(v: Variant): typeof SH {
  const L = v.level;
  SH.top = L - 0.1;
  SH.word = pick(SHOP_WORDS, at(v, 512));
  SH.wall = pick(SHOP_WALLS, at(v, 500));
  SH.awn = pick(SHOP_AWNINGS, at(v, 501));
  // Three DIFFERENT signage colours: the blades and the billboard never repeat.
  const i1 = Math.floor(at(v, 503) * SHOP_SIGNS.length);
  const i2 = (i1 + 1 + Math.floor(at(v, 504) * (SHOP_SIGNS.length - 1))) % SHOP_SIGNS.length;
  const i3 = (i2 + 1 + Math.floor(at(v, 506) * (SHOP_SIGNS.length - 1))) % SHOP_SIGNS.length;
  SH.c1 = SHOP_SIGNS[i1] ?? 'metro_red';
  SH.c2 = SHOP_SIGNS[i2] ?? 'metro_green';
  SH.bill = SHOP_SIGNS[i3] ?? 'neon_amber';
  // The stack runs from storey 1.3 to just under the roofline: a two-storey
  // shop gets one short blade, a five-storey one two tall ones.
  const room = Math.max(0.5, L - 1.6);
  SH.h1 = Math.min(1.1, room * 0.6);
  SH.h2 = Math.min(1.1, room - SH.h1 - 0.1);
  SH.east = at(v, 505) > 0.5;
  SH.bw = 1.2 + 0.2 * at(v, 508);
  SH.bx = 0.3 + at(v, 509) * (1.5 - SH.bw);
  return SH;
}

export const SHOP: SpriteDef = defineSprite({
  id: 'shinjuku.shop', w: 2, d: 2,
  massing(s, v) {
    const h = shOf(v);
    s.shadow(0.08, 0.08, 1.84, 1.66);
    s.box(0.1, 0.1, 1.8, 1.62, { color: h.wall, h: h.top });
    // The shopfront: glass the whole width, wrapped round the east corner, and
    // a dark door where it is flat. All under the awning, which hides the top.
    s.wall(0.2, 1.72, 1.8, 1.72, 0.08, 0.92, 'glass');
    s.wall(1.9, 0.25, 1.9, 1.5, 0.08, 0.92, 'glass');
    if (near) s.wall(0.95, 1.72, 1.25, 1.72, 0.06, 0.8, 'darkstone');
    // The shop-name fascia, a signage-coloured band over the glazing.
    s.wall(0.1, 1.72, 1.9, 1.72, 0.97, 1.17, h.c2);
    windowRun(s, 0.26, 1.72, 1.74, 1.72, 1, h.top);
    windowRun(s, 1.9, 0.26, 1.9, 1.56, 1, h.top);
    // The awning, a deep slab in front of the fascia: stripes only when near,
    // laid on its front face in white.
    s.box(0.08, 1.72, 1.84, 0.26, { color: h.awn, h: 0.12, z: 0.78 });
    if (near) {
      for (let x = 0.3; x < 1.8; x += 0.5) s.wall(x, 1.98, x + 0.25, 1.98, 0.78, 0.9, 'canopy');
    }
    // The blade stack: west end of the south face, stacked, in two colours.
    // One box for the whole stack and a flat wall for the second board: the same
    // two colours for half the ops of two boxes.
    const two = h.h2 >= 0.4;
    s.box(0.12, 1.72, 0.1, 0.26, { color: h.c1, h: two ? h.h1 + 0.1 + h.h2 : h.h1, z: 1.3 });
    if (two) s.wall(0.12, 1.98, 0.22, 1.98, 1.3 + h.h1 + 0.1, 1.3 + h.h1 + 0.1 + h.h2, h.c2);
    // The billboard, on posts: along the south edge, or turned to the east.
    const zb = h.top + 0.14;
    if (h.east) {
      s.box(1.62, 0.3, 0.1, h.bw, { color: h.bill, h: 0.8, z: zb });
      if (near) {
        s.post(1.67, 0.4, h.top, 0.14, 'metal', 0.05);
        s.post(1.67, 0.3 + h.bw - 0.1, h.top, 0.14, 'metal', 0.05);
        s.wall(1.72, 0.4, 1.72, 0.3 + h.bw - 0.1, zb + 0.12, zb + 0.68, 'canopy');
      }
      // The east face is the one that shows, and +gy runs right to left on it, so
      // the text is drawn b to a (see the same note on 伊勢丹's east lightbox).
      if (read) s.sign(1.72, 0.3 + h.bw - 0.1, 1.72, 0.4, zb + 0.68, 0.56, h.word, byHour(0x1d2233ff, 0xf0eadaff));
    } else {
      s.box(h.bx, 1.4, h.bw, 0.1, { color: h.bill, h: 0.8, z: zb });
      if (near) {
        s.post(h.bx + 0.1, 1.44, h.top, 0.14, 'metal', 0.05);
        s.post(h.bx + h.bw - 0.1, 1.44, h.top, 0.14, 'metal', 0.05);
        s.wall(h.bx + 0.1, 1.5, h.bx + h.bw - 0.1, 1.5, zb + 0.12, zb + 0.68, 'canopy');
      }
      if (read) s.sign(h.bx + 0.1, 1.5, h.bx + h.bw - 0.1, 1.5, zb + 0.68, 0.56, h.word, byHour(0x1d2233ff, 0xf0eadaff));
    }
    // Third scale: a roof tank or an AC unit, behind the billboard. Near only.
    if (near) {
      if (at(v, 507) > 0.5) s.cylinder(0.5, 0.45, 0.12, { color: 'canopy', h: 0.34, z: h.top });
      else s.box(0.35, 0.3, 0.3, 0.22, { color: 'metal', h: 0.28, z: h.top });
    }
  },
  animate(pen, gx, gy, v) {
    near = pen.camera.zoom >= 0.7;
    read = pen.camera.zoom >= 1;
    const dn = hourNow();
    if (dn > 0.8) return;
    const h = shOf(v);
    // ONE pool, on the pavement in front: the shopfront's light. The billboard
    // and the blades are signage slots and glow by themselves, and a pool at the
    // height of a rooftop sign is a disc hovering over the roof — three of those
    // per building was the confetti NEXT.md names, and the windows are bands.
    const L = pen.light;
    if (L !== undefined && L.active) L.add(gx + 1, gy + 2.05, 0, 0.95, snap(0.42 * (1 - dn)), 'warn');
    litBands(pen, gx, gy, v, 0.1, 0.1, 1.9, 1.72, 0.16, true, 1, 1, Math.floor(h.top), 800);
  },
});

// ── OKUBO: Shin-Okubo ────────────────────────────────────────────────────────
//
// A low building (a storey under the level, so the street is friendlier than
// K's) behind a strip of open stalls: a plaster counter and three candy awnings
// across it. Over the stalls, a column of vertical signs, one glyph a board, and
// on the roof a hoarding with a katakana word. The colours are pink-led and
// amber never appears, which is what makes it a different street from K's red /
// cyan / amber / pink rotation. Six lots in ten are painted pastel pink, peach
// or rose, which the slots cannot do (see `byHour`).
//
// The sign column is on the west end for the same reason as SHOP's blades. Every
// primitive here was counted with a recording surface (a box is four ops, a wall
// one, a cylinder four): the first version was 39 ops far and dearer than
// ZAKKYO; it is 23-25 now by using flat walls and patches for what a box was
// doing, and the stall counter, the dark backing and the tank are near only.

const CANDY: readonly Ink[] = ['neon_pink', 'neon_red', 'neon_cyan'];
/** Awning colours left to right. Pink dominates; no two patterns are K's. */
const STALLS: readonly (readonly [Ink, Ink, Ink])[] = [
  ['neon_pink', 'neon_cyan', 'neon_pink'],
  ['neon_pink', 'neon_red', 'neon_pink'],
  ['neon_red', 'neon_pink', 'neon_cyan'],
  ['neon_cyan', 'neon_pink', 'neon_red'],
  ['neon_pink', 'neon_pink', 'neon_cyan'],
];
const OWALLS: readonly Ink[] = ['cream', 'stucco', 'plaster', 'cream'];
/** Shin-Okubo's pastels, as [day, night]. The only pink slot is the neon one,
 *  which is a sign, and warm and pink was the brief. */
const PASTELS: readonly (readonly [number, number])[] = [
  [0xf2c3c9ff, 0x5a474eff], // blush
  [0xf5cfaaff, 0x5c4a3eff], // peach
  [0xe8a9b5ff, 0x54404aff], // rose
];

function pastel(i: number): Ink {
  const p = PASTELS[i];
  return p === undefined ? 'cream' : byHour(p[0], p[1]);
}
/** The vertical column: one glyph per board, so a 2-glyph word for two boards
 *  and a 3-glyph word for three. */
const WORDS_2: readonly string[] = ['韓国', '韓流', '焼肉', '美容'];
const WORDS_3: readonly string[] = ['コスメ', 'キムチ', 'カフェ'];
/** The hoarding is horizontal, so it can carry a longer word. */
const HOARD: readonly string[] = ['チーズ', 'コスメ', '韓国', 'キムチ', '韓流'];

const OK = {
  top: 0, wall: 'cream' as Ink, stall: STALLS[0] as readonly [Ink, Ink, Ink],
  hoard: 'neon_pink' as Ink, boards: 1, bh: 0, word: '', sign: '',
  hx: 0, hw: 1.3, ci: 0,
};

function okOf(v: Variant): typeof OK {
  const L = v.level;
  OK.top = L - 0.25;
  // Six in ten are pastel; the rest are the warm slots.
  OK.wall = at(v, 600) < 0.6 ? pastel(Math.floor(at(v, 608) * PASTELS.length)) : pick(OWALLS, at(v, 609));
  OK.stall = pick(STALLS, at(v, 601));
  OK.hoard = pick(CANDY, at(v, 604));
  OK.sign = pick(HOARD, at(v, 603));
  OK.hx = 0.3 + 0.2 * at(v, 606);
  OK.ci = Math.floor(at(v, 607) * CANDY.length);
  // The column runs from storey 1.1 to just under the roofline. Boards are at
  // least 0.7 tall or the glyph is mush, so a short building gets one board.
  const room = OK.top - 0.15 - 1.1;
  OK.boards = room >= 2.4 ? 3 : room >= 1.5 ? 2 : 1;
  OK.bh = (room - 0.06 * (OK.boards - 1)) / OK.boards;
  OK.word = OK.boards === 3 ? pick(WORDS_3, at(v, 602)) : OK.boards === 2 ? pick(WORDS_2, at(v, 602)) : '';
  return OK;
}

export const OKUBO: SpriteDef = defineSprite({
  id: 'shinjuku.okubo', w: 2, d: 2,
  massing(s, v) {
    const o = okOf(v);
    s.shadow(0.08, 0.08, 1.84, 1.86);
    s.box(0.1, 0.1, 1.8, 1.4, { color: o.wall, h: o.top });
    windowRun(s, 0.26, 1.5, 1.74, 1.5, 1, o.top);
    windowRun(s, 1.9, 0.26, 1.9, 1.34, 1, o.top);
    // The stalls: a dark open front (hidden behind the counter and awnings from
    // any distance, so near only), then the counter in front of it. The counter
    // is a WALL, not a box: the awning slab hides its top from any camera this
    // game has, so the box's other two faces and its stroke were seven wasted ops.
    if (near) s.wall(0.1, 1.5, 1.9, 1.5, 0.05, 0.9, 'darkstone');
    s.wall(0.1, 1.95, 1.9, 1.95, 0, 0.5, 'plaster');
    // The candy awnings: ONE slab in the first stall's colour, with the other two
    // stalls' colours laid on its top as flat patches. Three boxes were twelve
    // ops, and this is the same picture from above, which is where it is seen.
    s.box(0.1, 1.5, 1.8, 0.48, { color: o.stall[0], h: 0.1, z: 0.92 });
    s.patch(0.7, 1.5, 0.6, 0.48, 1.02, o.stall[1]);
    s.patch(1.3, 1.5, 0.6, 0.48, 1.02, o.stall[2]);
    // The vertical sign column: a dark backing, then one flat board per glyph
    // from storey 1.1 (a wall is full-bright where a box face is shaded, which
    // is what makes a board read as lit), 0.06 apart. A board on a 0.32-tile
    // face is ~11 px wide at zoom 1, which is the width of one 0.8-storey glyph;
    // any wider and wallText shrinks it to fit.
    s.box(0.12, 1.5, 0.32, 0.12, { color: 'darkstone', h: o.boards * (o.bh + 0.06) - 0.06, z: 1.1 });
    for (let i = 0; i < o.boards; i++) {
      const c = CANDY[(o.ci + i) % 3] ?? 'neon_pink';
      const z0 = 1.1 + i * (o.bh + 0.06);
      s.wall(0.12, 1.62, 0.44, 1.62, z0, z0 + o.bh, c);
      // Board 0 is the LOWEST, and a vertical word reads from the top down.
      const g = o.word.charAt(o.boards - 1 - i);
      if (read && g !== '') s.sign(0.12, 1.62, 0.44, 1.62, z0 + o.bh, o.bh, g, inkOn(c));
    }
    // The hoarding on the roof: a wide low board with a katakana word.
    const zb = o.top + 0.12;
    s.box(o.hx, 1.18, o.hw, 0.1, { color: o.hoard, h: 0.9, z: zb });
    if (near) {
      s.post(o.hx + 0.1, 1.2, o.top, 0.14, 'metal', 0.05);
      s.post(o.hx + o.hw - 0.1, 1.2, o.top, 0.14, 'metal', 0.05);
      s.sign(o.hx, 1.28, o.hx + o.hw, 1.28, zb + 0.9, 0.9, o.sign, inkOn(o.hoard));
    }
    // Third scale: a tank behind the hoarding, near only; at far zoom it is two
    // pixels and a cylinder is the dearest primitive in the kit.
    if (near) s.cylinder(1.55, 0.5, 0.12, { color: 'canopy', h: 0.34, z: o.top });
  },
  animate(pen, gx, gy, v) {
    near = pen.camera.zoom >= 0.7;
    read = pen.camera.zoom >= 1;
    const dn = hourNow();
    if (dn > 0.8) return;
    const o = okOf(v);
    // ONE pool, on the pavement in front of the stalls, in the middle awning's
    // candy colour; the hoarding and the sign column glow by themselves, and the
    // windows are bands (see SHOP's note on confetti).
    const L = pen.light;
    if (L !== undefined && L.active) L.add(gx + 1, gy + 2.05, 0, 0.95, snap(0.45 * (1 - dn)), o.stall[1] ?? 'neon_pink');
    litBands(pen, gx, gy, v, 0.1, 0.1, 1.9, 1.5, 0.16, true, 1, 1, Math.floor(o.top), 850);
    // A string of lamps along the awnings, warm, the way a market is lit.
    if (near) {
      const warmth = snap(1 - dn);
      for (let i = 0; i < 4; i++) glowDot(pen, gx + 0.2 + i * 0.5, gy + 1.96, 0.95, 'warn', 0.05, warmth);
    }
  },
});

/** Which filler a built lot gets in the shopping districts, or `undefined` to
 *  fall through to sprites.ts's `defForLot`: about 45% of `E` is SHOP and the
 *  rest MIDRISE/ZAKKYO, about 85% of `O` is OKUBO and the rest the default.
 *
 *  Deterministic from the lot's own variant seed, like `defForLot`. The salt is
 *  78, not 77: `defForLot` rolls 77 for its own mix, and the same roll here
 *  would make the leftover 55% of E all `u >= 0.45` — i.e. skewed to ZAKKYO,
 *  because MIDRISE is `u < 0.6` there. A different salt leaves that mix intact. */
export function shoppingDefFor(d: District, seed: number): SpriteDef | undefined {
  const u = toUnit(hashStep(seed, 78));
  if (d === 'E') return u < 0.45 ? SHOP : undefined;
  if (d === 'O') return u < 0.85 ? OKUBO : undefined;
  return undefined;
}
