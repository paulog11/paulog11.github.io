/**
 * Kabukichō's landmarks: 新宿区役所, TOHO シネマズ (the Godzilla head), the
 * 歌舞伎町一番街 gate and ゴールデン街. Where they stand is `LANDMARKS` in
 * layout.ts; this file is what they look like.
 *
 * The same hard rules as landmarks.ts, restated because breaking one is silent:
 * - `massing` reads NO palette and speaks in slot NAMES. Anything that needs a
 *   computed colour (a lit window is a blend of the night's stone and amber)
 *   waits for `animate`.
 * - Inside one sprite, call order is paint order: back to front, low gx+gy
 *   first. `animate` runs after ALL of the massing, so it may only draw where
 *   nothing of its own sprite stands in front. Each `animate` below says which
 *   faces it relies on being clear.
 * - Only the +gx and +gy faces are ever on screen.
 *
 * The district is deliberately four different voices, so that walking through
 * it changes the weather: the ward office is the calm one (pale, regular, no
 * neon), TOHO the loud one (posters, a marquee, a monster), the gate a single
 * bright red gesture, and Golden Gai low, warm and dense, the only thing here
 * that is lit by lanterns rather than by signs.
 *
 * Night pools are scarce on purpose (NEXT.md: Kabukichō's pools "look like
 * confetti" when every sign throws its own). Each landmark gets ONE wide steady
 * wash and at most one or two tight accents; the colour is carried by the lit
 * FACES, which cost a fill and spill nowhere.
 *
 * ## Two bands, because the frame has a budget this file can break
 *
 * The first cut drew everything, at every zoom, and the Kabukichō view
 * (centred on tile 115,35 at zoom 0.5, the one `tools/perf.mjs` measures) went
 * from ~14 ms to ~33 ms at night in headless Chrome. Measured, not guessed:
 * with all four landmarks swapped for single boxes the view is 14 ms, and
 * padding those boxes with 20 extra tiny boxes each (no text, no light, no
 * gradient: nothing but boxes) is 33 ms, flat from there. It is a threshold,
 * not a slope: `tools/look.mjs` launches Chrome with `--disable-gpu`, so the
 * canvas is software-rasterised, and the view sits just under a point past
 * which each frame pays one ~19 ms stall. ANY addition tips it, so every
 * primitive here counts against the same allowance as every ZAKKYO's lit
 * floors (the day-time regression on this view, ~10 ms to ~32 ms, was the same
 * cliff, crossed by the shopping filler). With the GPU on, the same view is
 * ~9 ms by day and ~11 ms by night at 60 fps whatever is in it, so this is a
 * property of the measuring rig and not of a phone. It still decides the
 * shape of this file: below the zoom at which detail is visible, each landmark
 * draws about a dozen to twenty primitives and says so; the rest is gated on
 * `fine`, below.
 *
 * `fine` is how `massing` gets a zoom it is not handed. Every landmark's
 * `animate` (which has the camera) writes it, and the next frame's massing
 * reads it, so detail appears one frame after the zoom crosses 0.7, which no
 * one can see. Only decoration may depend on it, never a HEIGHT: `heightOf`
 * measures a massing once, at whatever `fine` was then (false, on the first
 * frame), so everything tall is in the far band and the near band adds only
 * what stands under the same roofline.
 */
import { hashStep, toUnit } from '@latticekit/core';
import { LEVEL_H, defineSprite, glowDot, isoBox, isoWall, mix } from '@latticekit/draw';
import type { Ink, Pen, SpriteDef } from '@latticekit/draw';

import { hourNow } from './sprites.ts';

/** Zoom at which fine detail (window bays, lantern strings, teeth) appears. */
const NEAR = 0.7;

/** True while the camera is close enough for fine detail. See the header. */
let fine = false;

/** Nine levels of brightness. `softEllipse` keys its ramp cache on the colour,
 *  so a continuously animated intensity is a key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

/** Every glow in this file is drawn at THIS intensity and animated by RADIUS
 *  (and by on/off: `glowDot` draws nothing at intensity 0), never by brightness.
 *  The surface caches one radial ramp per (colour, alpha) pair, in a table of 96
 *  with least-recently-used eviction, and a halo's or a pool's alpha is its
 *  intensity, so a glow breathing through nine intensities is nine keys.
 *  Radius is free (the ramp is drawn scaled), and 0.9 is what ZAKKYO's chase
 *  light uses, so the neon halos here are cache HITS on keys that exist. */
const GLOW = 0.9;
/** Pool intensity, likewise one value for every pool in the district. */
const POOL = 0.3;

/** A floor (or a window) is lit at night: a fixed 0-1 draw per key, lit once
 *  the dusk threshold falls below it, so lights come on one by one rather than
 *  all together. The same rule as landmarks.ts. */
function isLit(seed: number, key: number, dn: number): boolean {
  return dn < 0.72 && toUnit(hashStep(seed, key)) > 0.2 + 0.7 * dn;
}

/** A window run along gx on the face `y = y`, from `a` to `b`. One fill when
 *  far; split at every `pitch` when near, so the piers show between the panes.
 *  The caller's massing must put its piers at the same `a + k * pitch`. No
 *  closures: this runs inside `animate`, thirty times a second. */
function runY(pen: Pen, a: number, b: number, pitch: number, y: number, za: number, zb: number, fill: Ink): void {
  if (!fine) { isoWall(pen, a, y, b, y, za, zb, fill); return; }
  for (let u = a; u < b - 0.12; u += pitch) isoWall(pen, u + 0.09, y, Math.min(u + pitch, b), y, za, zb, fill);
}

/** The same along gy on the face `x = x`. */
function runX(pen: Pen, a: number, b: number, pitch: number, x: number, za: number, zb: number, fill: Ink): void {
  if (!fine) { isoWall(pen, x, a, x, b, za, zb, fill); return; }
  for (let u = a; u < b - 0.12; u += pitch) isoWall(pen, x, u + 0.09, x, Math.min(u + pitch, b), za, zb, fill);
}

// ── 新宿区役所 ───────────────────────────────────────────────────────────────
//
// The calm building in a loud district: a two-storey granite podium, a
// four-storey concrete slab on it, a small council-chamber penthouse, and
// nothing on the roof that shines. All of the colour is in the forecourt (a
// flag, two trees), and the only light it throws at night is the lobby.
//
// Far: the podium, the slab (its windows as two bands a face, each two storeys
// of glass), the penthouse, the plant box, the flagpole and the forecourt's
// paving. Near: every storey's own ribbon with the piers between, the podium's
// glazing and plaque, the cornice, the trees, the canopy and the lamps.

const KY_PODIUM = { x: 0.2, y: 0.3, w: 4.9, d: 2.7, h: 2 } as const;
const KY_SLAB = { x: 0.55, y: 0.6, w: 4.2, d: 2.0, z0: 2, z1: 6 } as const;
/** The slab's window piers, tiles apart; massing and the lit strips share it. */
const KY_PITCH = 0.7;
/** The flagpole, and where the flag hangs on it. Tall enough to clear the
 *  podium's roofline: a flag the height of a doorway is a smudge at this zoom. */
const KY_FLAG = { x: 5.5, y: 3.45, top: 4.3, z0: 3.45, z1: 4.2 } as const;
const KY_LAMPS = [1.4, 4.3] as const;
const KY_LAMP_Y = 3.65;

const KUYAKUSHO = defineSprite({
  id: 'shinjuku.kuyakusho', w: 6, d: 4,
  massing(s) {
    const P = KY_PODIUM;
    const S = KY_SLAB;
    const ye = S.y + S.d;
    const xe = S.x + S.w;
    s.shadow(P.x, P.y, P.w, P.d + 0.2, 0.5);
    // The forecourt's paving: the south apron, and near, the east one, a paler
    // approach to the doors and a strip of lawn. Lighter than the street, so
    // the site reads as a site.
    s.patch(0.1, 3.0, 5.8, 0.9, 0, 'concrete');
    if (fine) {
      s.patch(5.1, 0.4, 0.8, 2.6, 0, 'concrete');
      s.patch(1.9, 3.0, 1.8, 0.9, 0, 'canopy');
      s.patch(5.25, 0.6, 0.5, 1.5, 0, 'leaf');
    }

    // Podium, then the slab on it. The podium is the pale base that makes the
    // concrete above read as a different material.
    s.box(P.x, P.y, P.w, P.d, { color: 'granite', h: P.h, topColor: 'concrete' });
    if (fine) {
      // +gy face of the podium: a ground-floor ribbon either side of the doors,
      // a first-floor ribbon either side of the plaque, and a bright lobby. Gaps
      // between the segments are the piers.
      for (const a of [0.4, 3.75]) {
        const b = a === 0.4 ? 1.85 : 4.95;
        s.wall(a, 3.0, b, 3.0, 0.3, 0.95, 'towerglass');
        s.wall(a, 3.0, b, 3.0, 1.25, 1.75, 'towerglass');
      }
      s.wall(2.0, 3.0, 3.6, 3.0, 0.05, 1.0, 'glass');
      s.wall(2.0, 3.0, 3.6, 3.0, 1.3, 1.95, 'darkstone', 'canopy');
      s.sign(2.0, 3.0, 3.6, 3.0, 1.95, 0.65, '新宿区役所', 'canopy');
      // +gx face of the podium.
      s.wall(5.1, 0.5, 5.1, 2.8, 0.3, 0.95, 'darkstone');
      s.wall(5.1, 0.5, 5.1, 2.8, 1.25, 1.75, 'darkstone');
    }

    s.box(S.x, S.y, S.w, S.d, { color: 'concrete', h: S.z1 - S.z0, z: S.z0 });
    if (fine) {
      // Window ribbons, one per storey, then the piers over them. A regular grid
      // is the point: this is the building that is not trying.
      for (let z = S.z0; z < S.z1; z++) {
        s.wall(S.x + 0.12, ye, xe - 0.12, ye, z + 0.25, z + 0.8, 'towerglass');
        s.wall(xe, S.y + 0.12, xe, ye - 0.12, z + 0.25, z + 0.8, 'darkstone');
      }
      for (let u = S.x + 0.12; u < xe - 0.17; u += KY_PITCH) s.wall(u, ye, u + 0.09, ye, S.z0, S.z1, 'canopy');
      for (let u = S.y + 0.12; u < ye - 0.17; u += KY_PITCH) s.wall(xe, u, xe, u + 0.09, S.z0, S.z1, 'slate');
      s.box(S.x - 0.04, S.y - 0.04, S.w + 0.08, S.d + 0.08, { color: 'canopy', h: 0.14, z: S.z1 });
    } else {
      // Far: two bands of glass a face, each two storeys. At 13 px a storey the
      // piers are a pixel wide, and four ribbons and nine piers were 17 walls.
      for (let z = S.z0; z < S.z1; z += 2) {
        s.wall(S.x + 0.12, ye, xe - 0.12, ye, z + 0.25, z + 1.8, 'towerglass');
        s.wall(xe, S.y + 0.12, xe, ye - 0.12, z + 0.25, z + 1.8, 'darkstone');
      }
    }
    // The council chamber behind the cornice, and one plant box: both TALL, so
    // both far.
    s.box(1.0, 0.9, 2.6, 1.4, { color: 'granite', h: 0.76, z: S.z1 + 0.14, topColor: 'concrete' });
    if (fine) s.wall(1.15, 2.3, 3.45, 2.3, S.z1 + 0.3, S.z1 + 0.75, 'towerglass');
    s.box(3.0, 1.05, 0.8, 0.55, { color: 'metal', h: 0.36, z: S.z1 + 0.9 });

    if (fine) {
      // East tree, behind the doors' side of the forecourt, then the forecourt
      // back to front by gx + gy: lamp, tree, canopy and its posts, lamp.
      s.cylinder(5.55, 1.1, 0.06, { color: 'wood', h: 0.8 });
      s.cylinder(5.55, 1.1, 0.34, { color: 'leaf', h: 0.8, z: 0.6 });
      s.post(KY_LAMPS[0], KY_LAMP_Y, 0, 1.2, 'metal', 0.07);
      s.cylinder(0.75, 3.5, 0.06, { color: 'wood', h: 0.8 });
      s.cylinder(0.75, 3.5, 0.34, { color: 'leaf', h: 0.8, z: 0.6 });
      s.post(2.1, 3.5, 0, 1.1, 'metal', 0.06);
      s.box(2.0, 3.0, 1.6, 0.6, { color: 'canopy', h: 0.14, z: 1.1 });
      s.post(3.5, 3.5, 0, 1.1, 'metal', 0.06);
      s.post(KY_LAMPS[1], KY_LAMP_Y, 0, 1.2, 'metal', 0.07);
    }
    s.post(KY_FLAG.x, KY_FLAG.y, 0, KY_FLAG.top, 'metal', 0.05);
  },
  animate(pen, gx, gy, v) {
    fine = pen.camera.zoom >= NEAR;
    // The flag, the one thing that moves on a building that does not: a white
    // field with a red disc, rippling. Drawn here because it changes shape every
    // frame, and clear of everything: it stands in the forecourt, in front of
    // the whole sprite. Its z bounds sway, not its x, so the wall can never
    // sweep through the diagonal that `isoWall` refuses.
    const w = Math.sin(pen.t * 3.1);
    const len = 0.85 + 0.07 * w;
    const fx = gx + KY_FLAG.x;
    const fy = gy + KY_FLAG.y;
    const zb = KY_FLAG.z0 + 0.05 * Math.sin(pen.t * 3.1 + 1);
    const zm = (zb + KY_FLAG.z1) / 2;
    isoWall(pen, fx - len, fy, fx, fy, zb, KY_FLAG.z1, 'canopy', 'metal');
    isoWall(pen, fx - len / 2 - 0.12, fy, fx - len / 2 + 0.12, fy, zm - 0.13, zm + 0.13, 'bad');

    const dn = hourNow();
    if (dn >= 0.72) return;
    const p = pen.palette;
    const dark = p.get('darkstone');
    const warmY = mix(dark, p.get('neon_amber'), 0.8);
    const warmX = mix(dark, p.get('neon_amber'), 0.62);
    const S = KY_SLAB;
    const ye = gy + S.y + S.d;
    const xe = gx + S.x + S.w;
    // Lit storeys on the two slab faces. Nothing of this sprite stands in front
    // of either: the podium is below them, and the forecourt is further round.
    // Fewer lit than a private office, because it is shut at night. Far, the
    // unit is a two-storey band (the same two the massing drew).
    if (fine) {
      for (let k = 0; k < S.z1 - S.z0; k++) {
        const z = S.z0 + k;
        if (isLit(v.seed, 10 + k, dn)) runY(pen, gx + S.x + 0.12, gx + S.x + S.w - 0.12, KY_PITCH, ye, z + 0.25, z + 0.8, warmY);
        if (isLit(v.seed, 20 + k, dn)) runX(pen, gy + S.y + 0.12, gy + S.y + S.d - 0.12, KY_PITCH, xe, z + 0.25, z + 0.8, warmX);
      }
    } else {
      for (let k = 0; k < 2; k++) {
        const z = S.z0 + 2 * k;
        if (isLit(v.seed, 10 + k, dn)) isoWall(pen, gx + S.x + 0.12, ye, gx + S.x + S.w - 0.12, ye, z + 0.25, z + 1.8, warmY);
        if (isLit(v.seed, 20 + k, dn)) isoWall(pen, xe, gy + S.y + 0.12, xe, gy + S.y + S.d - 0.12, z + 0.25, z + 1.8, warmX);
      }
    }
    // The lobby, always on: the one lit thing a passer-by is meant to find.
    isoWall(pen, gx + 2.0, gy + 3.0, gx + 3.6, gy + 3.0, 0.05, 1.0, 'warn');
    if (fine) for (const lx of KY_LAMPS) glowDot(pen, gx + lx, gy + KY_LAMP_Y, 1.25, 'warn', 0.07, GLOW);
    const L = pen.light;
    if (L === undefined || !L.active) return;
    // One wash in front of the doors; the lamps share it rather than each
    // throwing a pool of their own.
    L.add(gx + 2.8, gy + 3.9, 0, 2.6, POOL * snap(1 - dn), 'warn');
  },
});

// ── TOHOシネマズ新宿 ─────────────────────────────────────────────────────────
//
// The cinema: a pale 8-storey body whose +gy face is almost all sign (the TOHO
// lightbox, three LED posters, a marquee), a low screens block set back behind,
// and Godzilla on the 8th-floor terrace, leaning his snout out over the
// parapet. The head is the point of the whole sprite, so the block behind it is
// the PALEST thing on it and stops a storey and a half short of the crown: an
// olive-grey head needs a light thing behind it to be a silhouette, and at night
// that pale block is the only thing that is.
//
// The lightbox is up at the top of the facade and the posters under it, not the
// other way round. The filler across the street is 3-7 storeys, and from the
// camera that hides everything of TOHO below about the 4th floor (the first cut,
// with the sign at storey 2, showed the letters "HO"). What is above the
// neighbours has to carry the building; the marquee and lobby are for the
// zoomed-in view, where the plaza is on screen.
//
// Far: the body, the screens block, the head (neck, skull, snout, two fins),
// the lightbox, the three posters and the video screen, the red blade, and one
// glazing band. Near: the marquee, lobby, board, plaza trees, the brow, eyes and
// teeth, the rest of the fins, the second blade, and every poster's picture.

const T_X = 0.2;
const T_W = 3.6;
const T_Y = 0.2;
const T_D = 3.0;               // so the +gy face is at y = 3.2
const T_TERRACE = 8;           // storeys
const T_TOWER = 9.4;
const T_HC = 1.95;             // the head's centre line, in tile x
const T_EYE_Y = 2.95;          // the skull's front face
const T_EYE_Z = T_TERRACE + 1.64;
/** x of the two eyes' centres. */
const T_EYES = [1.5, 2.4] as const;
/** The three LED posters on the +gy face (x spans), and the storeys they hang between. */
const POSTER_X = [[0.45, 1.42], [1.52, 2.49], [2.59, 3.55]] as const;
const POSTER_Z0 = 2.8;
const POSTER_Z1 = 5.8;
/** What the posters and the big screen cycle through, so no two neighbours match for long. */
const SCREEN_INK: readonly Ink[] = ['neon_cyan', 'neon_pink', 'neon_amber'];
const MARQUEE = { x0: 0.8, x1: 3.2, y: 3.62, z: 1.3 } as const;
const BULBS = 7;
/** The video screen on the +gx face: y span and storeys. */
const SCREEN = { y0: 0.95, y1: 2.45, z0: 5.35, z1: 7.4 } as const;

const TOHO = defineSprite({
  id: 'shinjuku.toho', w: 4, d: 4,
  massing(s) {
    const xe = T_X + T_W;
    const ye = T_Y + T_D;
    s.shadow(T_X, T_Y, T_W, T_D + 0.3, 0.5);
    // The plaza, with (near) a red carpet under the marquee.
    s.patch(0, 3.2, 4, 0.8, 0, 'concrete');
    if (fine) s.patch(0.95, 3.2, 1.3, 0.8, 0, 'bad');

    s.box(T_X, T_Y, T_W, T_D, { color: 'granite', h: T_TERRACE, topColor: 'concrete' });
    // The screens: a plain block on the rear half, flush with the east face.
    s.box(T_X, T_Y, T_W, 1.25, { color: 'canopy', h: T_TOWER - T_TERRACE, z: T_TERRACE, topColor: 'concrete' });

    // +gx face: hotel windows (one band far; two bands over a run of piers near;
    // the video screen above them is `animate`'s), and the tower's single band.
    // Flat-filled walls must be chosen darker than the shaded face they sit on,
    // hence 'darkstone'.
    if (fine) {
      s.wall(xe, 0.4, xe, 3.0, 1.7, 3.3, 'darkstone');
      s.wall(xe, 0.4, xe, 3.0, 3.5, 4.9, 'darkstone');
      s.wall(xe, 0.4, xe, 1.3, T_TERRACE + 0.3, T_TOWER - 0.3, 'darkstone');
      for (let y = 0.4; y < 2.95; y += 0.65) s.wall(xe, y, xe, y + 0.09, 1.7, 4.9, 'slate');
    } else {
      s.wall(xe, 0.4, xe, 3.0, 1.7, 4.9, 'darkstone');
    }
    // The blades on the corner: a tall red one and (near) a shorter cyan one,
    // the two colours of the opposite sides of the street.
    s.box(xe, 2.65, 0.2, 0.12, { color: 'neon_red', h: 5.2, z: 1.9 });
    if (fine) s.box(xe, 0.7, 0.18, 0.1, { color: 'neon_cyan', h: 3.2, z: 2.6 });

    // +gy face: (near) plinth, the lobby glazing and a now-showing board, and
    // the TOHO lightbox at the top. (The posters between are `animate`'s: they
    // change.)
    if (fine) {
      s.wall(T_X, ye, xe, ye, 0, 0.12, 'darkstone');
      s.wall(0.4, ye, 3.6, ye, 0.15, 1.1, 'towerglass');
      s.wall(0.5, ye, 3.5, ye, 1.75, 2.45, 'ink', 'canopy');
      s.sign(0.5, ye, 3.5, ye, 2.45, 0.7, 'NOW SHOWING 上映中', 'warn');
    }
    s.wall(0.45, ye, 3.55, ye, 6.0, 7.5, 'neon_red', 'canopy');
    s.sign(0.45, ye, 3.55, ye, 7.5, 1.5, 'TOHO', 'warn');
    // A blade on the west corner, in front of the face and clear of the posters.
    if (fine) s.box(0.22, ye, 0.1, 0.3, { color: 'neon_pink', h: 4.2, z: 2.2 });

    // The terrace parapet. The head leans over the front one.
    s.box(T_X, 3.0, T_W, 0.2, { color: 'canopy', h: 0.4, z: T_TERRACE });
    if (fine) s.box(3.6, 1.7, 0.2, 1.3, { color: 'canopy', h: 0.4, z: T_TERRACE });

    // The head, back to front: the neck, the fins that stand on it (behind the
    // skull), the skull and the fin on its crown, the eyes and brow on its face,
    // and last the snout, which is in front of the parapet and so is drawn after
    // it. An AC unit on the terrace, east of the whole head, comes after all of
    // it. The tall fin and the crown fin are far (they are the highest thing on
    // the sprite, and the silhouette); the two lower fins are near.
    s.box(1.25, 1.65, 1.4, 0.85, { color: 'kaiju', h: 1.8, z: T_TERRACE });
    for (let i = 0; i < 3; i++) {
      if (i === 0 || fine) s.box(T_HC - 0.14, 1.75 + i * 0.27, 0.28, 0.2, { color: 'darkstone', h: 1.0 - i * 0.12, z: T_TERRACE + 1.8 });
    }
    s.box(1.15, 2.5, 1.6, 0.45, { color: 'kaiju', h: 2.3, z: T_TERRACE });
    s.box(T_HC - 0.14, 2.56, 0.28, 0.22, { color: 'darkstone', h: 0.65, z: T_TERRACE + 2.3 });
    if (fine) {
      for (const ex of T_EYES) s.wall(ex - 0.16, T_EYE_Y, ex + 0.16, T_EYE_Y, T_EYE_Z - 0.14, T_EYE_Z + 0.14, 'bad');
      s.box(1.08, 2.88, 1.74, 0.22, { color: 'kaiju', h: 0.3, z: T_TERRACE + 1.82 });
    }
    s.box(1.45, 2.95, 1.0, 0.75, { color: 'kaiju', h: 0.95, z: T_TERRACE + 0.4 });
    if (fine) {
      s.wall(1.52, 3.7, 2.38, 3.7, T_TERRACE + 0.55, T_TERRACE + 0.72, 'ink');
      s.box(2.9, 1.9, 0.45, 0.4, { color: 'metal', h: 0.32, z: T_TERRACE });

      // The marquee and the plaza, front last.
      s.post(0.9, 3.55, 0, 1.3, 'metal', 0.06);
      s.post(3.1, 3.55, 0, 1.3, 'metal', 0.06);
      s.box(MARQUEE.x0, 3.2, MARQUEE.x1 - MARQUEE.x0, 0.42, { color: 'canopy', h: 0.18, z: MARQUEE.z });
      s.wall(MARQUEE.x0 + 0.05, MARQUEE.y, MARQUEE.x1 - 0.05, MARQUEE.y, MARQUEE.z + 0.03, MARQUEE.z + 0.15, 'neon_amber');
      for (const tx of [0.4, 3.65]) {
        s.cylinder(tx, 3.75, 0.06, { color: 'wood', h: 0.6 });
        s.cylinder(tx, 3.75, 0.28, { color: 'leaf', h: 0.7, z: 0.45 });
      }
    }
  },
  animate(pen, gx, gy, v) {
    fine = pen.camera.zoom >= NEAR;
    const t = pen.t;
    const ye = gy + T_Y + T_D;
    const xe = gx + T_X + T_W;
    const dn = hourNow();

    // The posters and the video screen: digital signage that slides one colour
    // round the cycle every 2.4 s. They are drawn only here, not also in
    // massing, because no massing could know the colour. Everything here is
    // clear: the marquee tops out at 1.5 storeys, the snout starts at 8.4, and
    // the thin blades on the east face stand beside the screen, not over it.
    const phase = Math.floor(t / 2.4);
    for (let i = 0; i < POSTER_X.length; i++) {
      const px = POSTER_X[i];
      if (px === undefined) continue;
      const a = gx + px[0];
      const b = gx + px[1];
      isoWall(pen, a, ye, b, ye, POSTER_Z0, POSTER_Z1, SCREEN_INK[(i + phase) % 3] ?? 'neon_red', 'darkstone');
      if (fine) {
        // A title bar, and the picture in the next colour round with a dark
        // figure in it: enough to say "film poster".
        const mid = (a + b) / 2;
        isoWall(pen, a + 0.08, ye, b - 0.08, ye, POSTER_Z0 + 0.15, POSTER_Z0 + 0.5, 'canopy');
        isoWall(pen, a + 0.1, ye, b - 0.1, ye, POSTER_Z0 + 0.65, POSTER_Z1 - 0.2, SCREEN_INK[(i + phase + 1) % 3] ?? 'neon_red');
        isoWall(pen, mid - 0.14, ye, mid + 0.14, ye, POSTER_Z0 + 0.9, POSTER_Z1 - 1.0, 'ink');
        isoWall(pen, mid - 0.07, ye, mid + 0.07, ye, POSTER_Z1 - 0.9, POSTER_Z1 - 0.55, 'ink');
      }
    }
    isoWall(pen, xe, gy + SCREEN.y0, xe, gy + SCREEN.y1, SCREEN.z0, SCREEN.z1, SCREEN_INK[(phase + 1) % 3] ?? 'neon_red', 'darkstone');

    // The marquee chase: one bright bulb runs the length of the marquee. It is
    // near-only because the marquee is (it is a storey and a half off the
    // ground, behind the neighbours at the opening zoom); the rest of the string
    // sits dim behind the runner.
    if (fine) {
      const span = MARQUEE.x1 - MARQUEE.x0 - 0.2;
      const run = Math.floor(t * 9) % BULBS;
      for (let i = 0; i < BULBS; i++) {
        glowDot(pen, gx + MARQUEE.x0 + 0.1 + (span * i) / (BULBS - 1), ye + 0.42, MARQUEE.z + 0.1, 'neon_amber', i === run ? 0.07 : 0.03, GLOW);
      }
    }

    // The head. Eyes smoulder all day, brighter at night, and every nine
    // seconds he roars: both eyes flare amber and the mouth lights. The roar is
    // the one deliberate event in the whole district, and it is what moves at
    // the opening zoom.
    const roar = t % 9 < 1.4;
    const eyeR = roar ? 0.14 : 0.055 + 0.06 * (1 - dn) + 0.01 * Math.sin(t * 2);
    for (const ex of T_EYES) glowDot(pen, gx + ex, gy + T_EYE_Y, T_EYE_Z, roar ? 'neon_amber' : 'bad', eyeR, GLOW);
    if (roar) glowDot(pen, gx + T_HC, gy + 3.72, T_TERRACE + 0.65, 'neon_amber', 0.02 + 0.16 * Math.sin(((t % 9) / 1.4) * Math.PI), GLOW);
    if (fine) {
      // Teeth along the mouth line: nothing stands in front of the snout.
      for (let i = 0; i < 6; i++) {
        const tx = gx + 1.56 + i * 0.13;
        isoWall(pen, tx, gy + 3.7, tx + 0.06, gy + 3.7, T_TERRACE + 0.55, T_TERRACE + 0.66, 'canopy');
      }
    }

    if (dn >= 0.72) return;
    const warm = snap(1 - dn);
    // The hotel windows on the +gx face, nothing in front of which but the
    // blades. Far, one band; near, three floors split at the piers, and the
    // lobby (which only exists near).
    const p = pen.palette;
    const warmX = mix(p.get('darkstone'), p.get('neon_amber'), 0.62);
    if (fine) {
      isoWall(pen, gx + 0.4, ye, gx + 3.6, ye, 0.15, 1.1, 'warn');
      for (let k = 0; k < 3; k++) {
        if (isLit(v.seed, 40 + k, dn)) runX(pen, gy + 0.4, gy + 3.0, 0.65, xe, 1.9 + k, 2.5 + k, warmX);
      }
    } else if (isLit(v.seed, 40, dn)) {
      isoWall(pen, xe, gy + 0.4, xe, gy + 3.0, 1.9, 4.5, warmX);
    }
    if (isLit(v.seed, 50, dn)) isoWall(pen, xe, gy + 0.4, xe, gy + 1.3, T_TERRACE + 0.5, T_TOWER - 0.5, warmX);

    const L = pen.light;
    if (L === undefined || !L.active) return;
    // One steady wash for the whole frontage, and one red accent on the
    // terrace where the eyes are. The posters' colour is on their faces.
    L.add(gx + 2.0, gy + 4.1, 0, 2.8, POOL * warm, 'neon_amber');
    L.add(gx + T_HC, gy + 3.0, T_TERRACE * LEVEL_H, 0.8 + 0.2 * Math.sin(t * 2), POOL * warm, 'bad');
  },
});

// ── 歌舞伎町一番街 ───────────────────────────────────────────────────────────
//
// The gate. Two red pylons with an amber LED core, a crossbar between them
// carrying the name, a stepped pediment, and a paved passage under it all.
// Small on the map and the whole identity of the district's south mouth, so it
// is built to be the brightest thing within three lots of it.
//
// Far: two shafts, the bar and its panel, the pediment, the finial, the passage.
// Near: the pylon feet and caps, the inside strips, the bollards.

const G_BAR_Z = 2.1;
const G_BAR_Y = 1.32;          // the bar's +gy face
const G_BULBS = 8;

const ICHIBANGAI = defineSprite({
  id: 'shinjuku.ichibangai', w: 2, d: 2,
  massing(s) {
    s.shadow(0.1, 0.55, 1.8, 0.9, 0.5);
    // The passage between the pylons, paler than the street.
    s.patch(0.45, 0, 1.1, 2, 0, 'concrete');

    // West pylon, then east; each a red shaft with an amber LED strip down the
    // middle of every visible face, and (near) a dark foot and cap. The west
    // one's +gx face is the inside of the passage, and it shows. The shaft is
    // the whole height far, so the cap is the only thing that is lower.
    for (const px of [0.1, 1.54]) {
      if (fine) s.box(px, 0.72, 0.36, 0.56, { color: 'darkstone', h: 0.4 });
      s.box(px + 0.02, 0.74, 0.32, 0.52, { color: 'neon_red', h: fine ? 2.9 : 3.3, z: fine ? 0.4 : 0 });
      s.wall(px + 0.14, 1.26, px + 0.22, 1.26, 0.6, 3.1, 'neon_amber');
      if (fine) {
        s.wall(px + 0.34, 0.9, px + 0.34, 1.1, 0.6, 3.1, 'neon_amber');
        s.box(px - 0.03, 0.69, 0.42, 0.62, { color: 'darkstone', h: 0.2, z: 3.3 });
      }
    }
    // The crossbar, full width, and its name panel.
    s.box(0.1, 0.68, 1.8, 0.64, { color: 'neon_red', h: 0.85, z: G_BAR_Z });
    s.wall(0.16, G_BAR_Y, 1.84, G_BAR_Y, G_BAR_Z + 0.08, G_BAR_Z + 0.78, 'darkstone', 'neon_amber');
    s.sign(0.16, G_BAR_Y, 1.84, G_BAR_Y, G_BAR_Z + 0.78, 0.7, '歌舞伎町一番街', 'neon_amber');
    // The pediment: two steps and a finial, which is what makes it an arch and
    // not a lintel.
    s.box(0.55, 0.74, 0.9, 0.52, { color: 'neon_red', h: 0.4, z: G_BAR_Z + 0.85 });
    s.box(0.8, 0.82, 0.4, 0.36, { color: 'neon_amber', h: 0.3, z: G_BAR_Z + 1.25 });
    s.post(1.0, 1.0, G_BAR_Z + 1.55, 0.35, 'metal', 0.05);
    // Bollards at the passage mouth, in front of everything.
    if (fine) {
      s.post(0.55, 1.85, 0, 0.4, 'metal', 0.1);
      s.post(1.45, 1.85, 0, 0.4, 'metal', 0.1);
    }
  },
  animate(pen, gx, gy) {
    fine = pen.camera.zoom >= NEAR;
    const t = pen.t;
    // The chase light under the bar: two bright bulbs run in opposite
    // directions, always. Near, the whole string sits dim behind them. Nothing
    // of the sprite stands in front of the bar's face but the bollards, which
    // are far below it.
    const run = Math.floor(t * 8) % G_BULBS;
    const step = 1.5 / (G_BULBS - 1);
    if (fine) {
      for (let i = 0; i < G_BULBS; i++) glowDot(pen, gx + 0.25 + i * step, gy + G_BAR_Y, G_BAR_Z - 0.04, 'neon_amber', 0.03, GLOW);
    }
    glowDot(pen, gx + 0.25 + run * step, gy + G_BAR_Y, G_BAR_Z - 0.04, 'neon_amber', 0.065, GLOW);
    glowDot(pen, gx + 0.25 + (G_BULBS - 1 - run) * step, gy + G_BAR_Y, G_BAR_Z - 0.04, 'neon_amber', 0.065, GLOW);
    // The finial breathes.
    glowDot(pen, gx + 1.0, gy + 1.0, G_BAR_Z + 1.95, 'neon_amber', 0.09 + 0.04 * Math.sin(t * 2.2), GLOW);

    const dn = hourNow();
    if (dn >= 0.72) return;
    const L = pen.light;
    if (L === undefined || !L.active) return;
    const warm = snap(1 - dn);
    // A red wash in front of the gate and a tight amber core in the passage:
    // one tinted pool, not two. It breathes with the finial.
    const breathe = 0.95 + 0.05 * Math.sin(t * 2.2);
    L.add(gx + 1.0, gy + 1.7, 0, 1.9 * breathe, POOL * warm, 'neon_red');
    L.add(gx + 1.0, gy + 1.4, 0, 1.0, POOL * warm, 'neon_amber');
  },
});

// ── ゴールデン街 ─────────────────────────────────────────────────────────────
//
// Four rows of two-storey shacks running along gx, six to eight to a row, with
// 0.31-tile alleys between the rows. LOW and DENSE: 1.5-2.7 storeys against the
// 5-10 around it, with the back rows taller than the front so the whole cluster
// steps up like a hillside. That is a choice made for the camera and not only
// for the look: a face of height h hides about 1.2h tiles of ground behind it,
// so a back row of the SAME height shows nothing but its roof, and every alley
// is a slot you cannot see into. Tilting the heights up toward the back is what
// lets the upper floors of the back rows (their windows, their signs) show over
// the roofs in front. The first cut had ordinary-looking terraced houses: nine
// shacks of 0.8 tiles at 2-3 storeys is a street of townhouses, and what makes
// Golden Gai itself is how NARROW each bar is.
//
// The layout is built once, at load, from a fixed seed; there is one Golden Gai
// and its shacks should not reshuffle.
//
// What is drawn where. This sprite was the most expensive thing in the district
// (0.5 ms a draw against ~0.05 for a ZAKKYO, ~400 polygons) with every window,
// plate, lantern and eave in `massing`, nearly all of it sub-pixel at the
// opening zoom. Far, it is ~10 boxes: the shacks merged in threes, each group
// as tall as its tallest, which keeps the stepped roofline and the colour
// patchwork. Near, it is the 28 shacks themselves, and `animate` draws every
// window, plate, door and lantern, but only where nothing of the sprite stands
// in front of it: the east ends, the front row, and the back-row windows that
// `winVisible` proved clear of the roofs ahead, which is the only place
// `animate` is allowed to draw.

const GG_SEED = 0x6747;
const GG_X0 = 0.04;
const GG_X1 = 3.88;            // so a plate on the east end stays under x = 4
const GG_Y0 = 0.02;
const GG_D = 0.74;
const GG_ALLEY = 0.31;
const GG_ROWS = 4;
const GG_ROW_H = [2.5, 2.2, 1.95, 1.7] as const;
const GG_WALLS: readonly Ink[] = ['wood', 'wood', 'plaster', 'brick', 'slate', 'stucco', 'wood', 'concrete'];
const GG_ROOFS: readonly Ink[] = ['slate', 'metal', 'wood', 'tile', 'metal', 'slate', 'wood'];
const GG_NEON: readonly Ink[] = ['neon_red', 'neon_cyan', 'neon_amber', 'neon_pink', 'neon_amber'];
/** Where a lantern hangs, and the eave it hangs from. */
const GG_EAVE_Z = 1.0;
const GG_LANTERN_Z = 0.86;
/** Shacks per far-band box. */
const GG_GROUP = 3;

/** A span on a face, in tiles. */
interface Span {
  a: number; b: number;
}

interface Shack {
  row: number;
  x: number; w: number; h: number;
  y0: number; y1: number;
  wall: Ink; roof: Ink; neon: Ink;
  /** The upper window, the plate beside it (`plate.b <= plate.a` when there is
   *  none), and the front-row door; all along x on the +gy face. */
  win: Span; plate: Span; door: Span;
  /** Its east end is the cluster's east face: nothing hides it. */
  last: boolean;
  /** The upper window is clear of the roofs in front, so its night glow may be
   *  painted over the whole sprite from `animate`. */
  winVisible: boolean;
  /** A kit box on the roof. */
  kit: boolean;
}

/** A far-band box: several neighbouring shacks of one row merged. */
interface Group {
  y0: number;
  x: number; w: number; h: number;
  wall: Ink; roof: Ink;
}

interface Lantern {
  x: number; y: number; z: number;
  ink: Ink;
}

const rowY = (r: number): number => GG_Y0 + r * (GG_D + GG_ALLEY);
const rnd = (key: number): number => toUnit(hashStep(GG_SEED, key));

function buildShacks(): { shacks: Shack[]; groups: Group[]; lanterns: Lantern[] } {
  const shacks: Shack[] = [];
  for (let r = 0; r < GG_ROWS; r++) {
    // 6-8 shacks a row, with widths drawn then scaled to fill the row exactly.
    const n = 6 + Math.floor(rnd(r * 17) * 3);
    const raw: number[] = [];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const u = 0.7 + 0.7 * rnd(r * 31 + i + 100);
      raw.push(u);
      sum += u;
    }
    const gaps = 0.04 * (n - 1);
    const scale = (GG_X1 - GG_X0 - gaps) / sum;
    let x = GG_X0;
    for (let i = 0; i < n; i++) {
      const w = (raw[i] ?? 1) * scale;
      const k = r * 40 + i;
      const h = (GG_ROW_H[r] ?? 2) + (rnd(200 + k) - 0.5) * 0.5;
      const ww = Math.min(0.26, w * 0.5);
      const pw = Math.min(0.18, w - ww - 0.18);
      shacks.push({
        row: r, x, w, h,
        y0: rowY(r), y1: rowY(r) + GG_D,
        wall: GG_WALLS[Math.floor(rnd(300 + k) * GG_WALLS.length)] ?? 'wood',
        roof: GG_ROOFS[Math.floor(rnd(400 + k) * GG_ROOFS.length)] ?? 'slate',
        neon: GG_NEON[Math.floor(rnd(500 + k) * GG_NEON.length)] ?? 'neon_red',
        win: { a: x + 0.07, b: x + 0.07 + ww },
        plate: { a: x + 0.07 + ww + 0.05, b: x + 0.07 + ww + 0.05 + pw },
        door: { a: x + 0.07, b: x + 0.07 + Math.min(0.2, w - 0.2) },
        last: i === n - 1,
        winVisible: r === GG_ROWS - 1,
        kit: rnd(600 + k) > 0.65,
      });
      x += w + 0.04;
    }
  }
  // A window is clear if it is above the roofline of the shacks in the row in
  // front: a point at height z on this row's +gy face is visible when
  // z > h_front - 1.23 * gap, gap being the alley (see the header). Checked
  // against every shack of the front row that overlaps it in screen x, which
  // is its own span shifted east by the alley.
  for (const a of shacks) {
    if (a.row === GG_ROWS - 1) continue;
    let front = 0;
    for (const b of shacks) {
      if (b.row !== a.row + 1) continue;
      if (b.x < a.x + a.w + GG_ALLEY && b.x + b.w > a.x + GG_ALLEY) front = Math.max(front, b.h);
    }
    a.winVisible = a.h - 0.6 > front - 1.23 * GG_ALLEY + 0.03;
  }
  // The far band: runs of GG_GROUP neighbours, as tall as the tallest of them,
  // coloured as that one. Shacks are pushed row by row, west to east, so a run
  // is a slice of the array that stops where the row does.
  const groups: Group[] = [];
  for (let i = 0; i < shacks.length;) {
    const first = shacks[i];
    if (first === undefined) break;
    let tall = first;
    let end = first;
    let j = i + 1;
    for (; j < shacks.length && j < i + GG_GROUP; j++) {
      const s = shacks[j];
      if (s === undefined || s.row !== first.row) break;
      end = s;
      if (s.h > tall.h) tall = s;
    }
    groups.push({ y0: first.y0, x: first.x, w: end.x + end.w - first.x, h: tall.h, wall: tall.wall, roof: tall.roof });
    i = j;
  }
  const lanterns: Lantern[] = [];
  for (const s of shacks) {
    // A paper lantern at the door of every other front-row shack, and on every
    // east end.
    if (s.row === GG_ROWS - 1 && s.x < GG_X1 - 0.3) lanterns.push({ x: s.door.b + 0.04, y: s.y1 + 0.04, z: GG_LANTERN_Z, ink: lanterns.length % 2 === 0 ? 'neon_amber' : 'neon_red' });
    if (s.last) lanterns.push({ x: GG_X1 + 0.05, y: s.y0 + 0.3, z: GG_LANTERN_Z, ink: 'neon_red' });
  }
  return { shacks, groups, lanterns };
}

const GG = buildShacks();

const GOLDENGAI = defineSprite({
  id: 'shinjuku.goldengai', w: 4, d: 4,
  massing(s) {
    s.shadow(0.02, 0.02, 3.9, 3.9, 0.5);
    // Rows back to front, each shack west to east: the rows are separated
    // along y and the shacks along x, so this order is the painter's. A
    // far-band group is the same shape of thing, just wider.
    if (fine) {
      // The alleys, dark; mostly hidden, but the east mouths show.
      for (let r = 0; r < GG_ROWS - 1; r++) s.patch(0, rowY(r) + GG_D, 4, GG_ALLEY, 0, 'darkstone');
      for (const sh of GG.shacks) {
        s.box(sh.x, sh.y0, sh.w, GG_D, { color: sh.wall, h: sh.h, topColor: sh.roof });
        if (sh.kit) s.box(sh.x + sh.w * 0.3, sh.y0 + 0.18, 0.2, 0.2, { color: 'metal', h: 0.2, z: sh.h });
      }
    } else {
      for (const g of GG.groups) s.box(g.x, g.y0, g.w, GG_D, { color: g.wall, h: g.h, topColor: g.roof });
    }
    // The utility pole at the south-east corner, in front of everything.
    s.post(3.95, 3.96, 0, 3.4, 'wood', 0.07);
  },
  animate(pen, gx, gy, v) {
    fine = pen.camera.zoom >= NEAR;
    const dn = hourNow();
    const t = pen.t;
    const night = dn < 0.72;
    if (fine) {
      const p = pen.palette;
      const dark = p.get('darkstone');
      const warmY = night ? mix(dark, p.get('neon_amber'), 0.85) : dark;
      const warmX = night ? mix(dark, p.get('neon_amber'), 0.62) : dark;
      for (let i = 0; i < GG.shacks.length; i++) {
        const sh = GG.shacks[i];
        if (sh === undefined) continue;
        const y1 = gy + sh.y1;
        // +gy face: the upper window and the plate beside it (only when clear
        // of the roofs in front), and the front row's door.
        if (sh.winVisible) {
          isoWall(pen, gx + sh.win.a, y1, gx + sh.win.b, y1, sh.h - 0.6, sh.h - 0.2, isLit(v.seed, i, dn) ? warmY : 'towerglass');
          if (sh.plate.b > sh.plate.a) isoWall(pen, gx + sh.plate.a, y1, gx + sh.plate.b, y1, sh.h - 0.6, sh.h - 0.3, sh.neon);
        }
        if (sh.row === GG_ROWS - 1) isoWall(pen, gx + sh.door.a, y1, gx + sh.door.b, y1, 0, 0.8, isLit(v.seed, 200 + i, dn) ? warmY : 'darkstone');
        // +gx face of an east end: a door, a window above it, a blade sign.
        if (sh.last) {
          const x = gx + GG_X1;
          isoWall(pen, x, gy + sh.y0 + 0.1, x, gy + sh.y0 + 0.3, 0, 0.8, 'darkstone');
          isoWall(pen, x, gy + sh.y0 + 0.4, x, gy + sh.y0 + 0.64, sh.h - 0.6, sh.h - 0.2, isLit(v.seed, 100 + i, dn) ? warmX : 'darkstone');
          isoWall(pen, x, gy + sh.y0 + 0.4, x, gy + sh.y0 + 0.66, 0.95, 1.4, sh.neon);
        }
      }
      // The front row's eave, which the lanterns hang from.
      isoBox(pen, gx + GG_X0, gy + rowY(GG_ROWS - 1) + GG_D, GG_X1 - GG_X0, 0.07, { color: 'wood', h: 0.06, z: GG_EAVE_Z });
    }

    // The lanterns, red paper lit from inside. By day they are small red dots,
    // and only near; at night they flicker, each on its own rate and phase so a
    // row of them never pulses in step. Far, every other one: they are a couple
    // of pixels wide and the pool carries the rest.
    const warm = snap(1 - dn);
    for (let i = 0; i < GG.lanterns.length; i++) {
      const l = GG.lanterns[i];
      if (l === undefined) continue;
      if (night) {
        if (!fine && (i & 1) === 1) continue;
        const f = 0.085 + 0.03 * Math.sin(t * (2.6 + (i % 4) * 0.5) + i * 2.1);
        glowDot(pen, gx + l.x, gy + l.y, l.z + 0.07, l.ink, f, GLOW);
      } else if (fine) {
        glowDot(pen, gx + l.x, gy + l.y, l.z + 0.07, 'neon_red', 0.04, GLOW);
      }
    }
    if (!night) return;
    const L = pen.light;
    if (L === undefined || !L.active) return;
    // The lanterns' light: one wide amber wash over the cluster (it also falls
    // on the roofs and faces whose screen pixels it covers), and two red
    // spills out of the front and the east alleys.
    L.add(gx + 2.0, gy + 2.2, 0, 3.4, POOL * warm, 'neon_amber');
    L.add(gx + 2.0, gy + 4.35, 0, 1.6, POOL * warm, 'neon_red');
    L.add(gx + 4.3, gy + 1.6, 0, 1.4, POOL * warm, 'neon_red');
  },
});

export const KABUKICHO_DEFS: ReadonlyMap<string, SpriteDef> = new Map([
  ['kuyakusho', KUYAKUSHO],
  ['toho', TOHO],
  ['ichibangai', ICHIBANGAI],
  ['goldengai', GOLDENGAI],
]);
