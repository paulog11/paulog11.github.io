/**
 * CHŌME — the art. Four silhouettes and a car, all of it from one colour per
 * solid; `shade` derives the three faces, which is what keeps cool shadows
 * under warm highlights without anybody choosing either.
 *
 * Nine materials of our own go in through `extendStops`, into BOTH stop sets.
 * A slot defined in only one of them is the bug where a single thing stays
 * gold at midnight while everything around it goes dark, and it is silent.
 *
 * The stop sets are HOISTED. Rebuilding one inside the render callback bumps
 * `Palette.rev` every frame, and `rev` is what every cache in the kit keys on
 * — the symptom is not a wrong colour, it is a frame time that climbs at dusk
 * and stays climbed.
 */
import { hashStep, toUnit } from '@latticekit/core';
import {
  DAY, NIGHT, VARIANT_ZERO, defineSprite, drawSprite, extendStops, isoBox,
  spriteHeightPx,
} from '@latticekit/draw';
import type { Ink, Pen, SpriteDef, Variant } from '@latticekit/draw';
import type { Kind } from './city.ts';

/** The ground is warm-neutral on purpose. A blue-grey paving at 63% lightness
 *  reads as WATER next to warm walls — the ward's empty lots looked like a
 *  frozen lake, and nothing in the code said "blue". */
const MATERIALS_DAY = {
  road: 0x3f424aff, paving: 0x8d877dff,
  tile: 0xb4573cff, slate: 0x6b7585ff,
  stucco: 0xd9cdbaff, brick: 0xc08a6eff, plaster: 0xcfd3cbff,
  wood: 0x7a5a3eff, leaf: 0x5f9b52ff,
};
const MATERIALS_NIGHT = {
  road: 0x191b20ff, paving: 0x2f2c28ff,
  tile: 0x4a2a24ff, slate: 0x2b323cff,
  stucco: 0x4e4c48ff, brick: 0x45342cff, plaster: 0x4a4e4cff,
  wood: 0x32271dff, leaf: 0x24402aff,
};

export const DAY_X = extendStops(DAY, MATERIALS_DAY);
export const NIGHT_X = extendStops(NIGHT, MATERIALS_NIGHT);

/** Three wall materials and two roofs, picked per building. One material for a
 *  whole ward is what makes a city of identical blocks: the massing varies and
 *  nothing reads as varying, because every face is the same colour. */
const WALLS: readonly Ink[] = ['stucco', 'brick', 'plaster'];
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

/** The same number in `massing` and in `animate`, addressed by index rather
 *  than by draw order — the two hooks get different `Rng` streams, so a
 *  feature that draws in the same order in both still lands somewhere else. */
function at(v: Variant, i: number): number {
  return toUnit(hashStep(v.seed, i));
}

function wallOf(v: Variant): Ink {
  return WALLS[Math.floor(at(v, 0) * WALLS.length)] ?? 'stucco';
}
function roofOf(v: Variant): Ink {
  return ROOFS[Math.floor(at(v, 1) * ROOFS.length)] ?? 'tile';
}

/** Window rhythm: three, three, gap, three. Even spacing reads as a
 *  spreadsheet; this reads as a building. */
function litWindow(v: Variant, i: number): boolean {
  if (i % 4 === 3) return false;
  // Somebody is always up, and somebody is always out.
  return at(v, i + 11) > 0.18 + 0.62 * daylight;
}

/** Warm windows up a facade, in storeys.
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
      pen.light?.add(gx + PAD + 0.25 + k * (SPAN - 0.5) / 2, gy + 2 - PAD, (0.55 + s) * 26, 0.45, 0.4, 'warn');
    }
  }
}

// ── the four silhouettes ─────────────────────────────────────────────────────

/** A machiya-ish townhouse: a deep ground floor, one setback storey, a tiled
 *  hip roof, and a drainpipe you can only just resolve. */
const HOME = defineSprite({
  id: 'chome.home', w: 2, d: 2,
  massing(s, v, rng) {
    const wall = wallOf(v);
    const base = 1.8;
    const top = 0.9 + v.level * 0.3;
    s.shadow(PAD, PAD, SPAN, SPAN);
    s.box(PAD, PAD, SPAN, SPAN, { color: wall, h: base });
    s.box(PAD + 0.18, PAD + 0.18, SPAN - 0.36, SPAN - 0.36, { color: wall, h: top, z: base });
    s.roof(PAD - 0.03, PAD - 0.03, SPAN + 0.06, SPAN + 0.06, base + top, 0.7, roofOf(v));
    s.post(2 - PAD - 0.1, PAD + 0.08, 0, base, 'wood', 0.08);
    // Third scale: a planter by the door, on two houses in three.
    if (rng.next() > 0.34) s.box(PAD + 0.1, 2 - PAD - 0.24, 0.42, 0.2, { color: 'leaf', h: 0.28 });
  },
  animate(pen, gx, gy, v) {
    windows(pen, gx, gy, v, 2);
  },
});

/** A corner shop: a glazed front under an awning, two narrow storeys over it,
 *  and a sign that stays lit because real signage runs in daylight too. */
const NAMES = ['OPEN', 'SOBA', 'KŌHĪ', 'PAN'];

const SHOP = defineSprite({
  id: 'chome.shop', w: 2, d: 2,
  massing(s, v) {
    const base = 1.3;
    const top = 1.2 + v.level * 0.3;
    s.shadow(PAD, PAD, SPAN, SPAN);
    s.box(PAD, PAD, SPAN, SPAN, { color: 'glass', h: base });
    s.box(PAD + 0.2, PAD + 0.2, SPAN - 0.4, SPAN - 0.4, { color: wallOf(v), h: top, z: base });
    s.roof(PAD + 0.06, PAD + 0.06, SPAN - 0.12, SPAN - 0.12, base + top, 0.4, roofOf(v));
    // The awning: `brand` is the recolourable slot, and a shopfront is exactly
    // the thing this ward is about.
    s.box(PAD - 0.08, 2 - PAD - 0.3, SPAN + 0.16, 0.4, { color: 'brand', h: 0.13, z: base - 0.15 });
    s.post(PAD - 0.04, 2 - PAD, 0, base - 0.15, 'wood', 0.06);
    s.post(2 - PAD - 0.04, 2 - PAD, 0, base - 0.15, 'wood', 0.06);
    // A sign along the +gy edge. NOT the near-far diagonal: a run whose gx and
    // gy change by the same amount has zero screen width and `wall` throws.
    s.sign(PAD + 0.2, 2 - PAD, 2 - PAD - 0.2, 2 - PAD, base + top * 0.6, 0.38,
      NAMES[Math.abs(v.seed) % NAMES.length] ?? 'OPEN', 'warn');
  },
  animate(pen, gx, gy, v) {
    // The sign, lit at every hour, pulsing barely enough to be alive.
    const breathe = 0.78 + 0.1 * Math.sin(pen.t * 1.4 + v.seed * 0.001);
    pen.light?.add(gx + 1, gy + 2 - PAD, 44, 1.4, snap(breathe * (1.15 - daylight * 0.5)), 'warn');
    windows(pen, gx, gy, v, 2);
  },
});

/** A pocket park. No building, so the trees are the silhouette — and the lamp
 *  is the one thing in the ward that lights the ground it stands on. */
const PARK = defineSprite({
  id: 'chome.park', w: 2, d: 2,
  massing(s, v, rng) {
    s.patch(PAD, PAD, SPAN, SPAN, 0, 'leaf', 'ink');
    s.box(PAD, PAD, SPAN, SPAN, { color: 'leaf', h: 0.09 });
    for (let i = 0; i < 3; i++) {
      const tx = PAD + 0.3 + rng.next() * (SPAN - 0.6);
      const ty = PAD + 0.3 + rng.next() * (SPAN - 0.6);
      const h = 0.7 + at(v, i) * 0.55;
      s.cylinder(tx, ty, 0.07, { color: 'wood', h, z: 0.09 });
      s.cylinder(tx, ty, 0.33 + at(v, i + 5) * 0.12, { color: 'leaf', h: 0.68, z: 0.09 + h * 0.7 });
    }
    s.post(2 - PAD - 0.14, PAD + 0.12, 0.09, 1.4, 'metal', 0.07);
    s.box(2 - PAD - 0.22, PAD + 0.04, 0.17, 0.17, { color: 'warn', h: 0.15, z: 1.47 });
  },
  animate(pen, gx, gy) {
    if (daylight > 0.62) return;
    // Two adds, not one: a small bright core inside a wide dim halo. A single
    // pool is a linear ramp, and the eye reads a linear ramp as the size of
    // the lamp rather than as the reach of its light.
    pen.light?.add(gx + 2 - PAD - 0.14, gy + PAD + 0.12, 40, 0.85, 0.7, 'warn');
    pen.light?.add(gx + 2 - PAD - 0.14, gy + PAD + 0.12, 40, 3.2, 0.26, 'warn');
  },
});

/** Everybody who was already here. Low-rise, varied, and never clickable. */
const NEIGHBOUR = defineSprite({
  id: 'chome.neighbour', w: 2, d: 2,
  massing(s, v, rng) {
    const wall = wallOf(v);
    const base = 1.0 + v.level * 0.5;
    const top = 0.6 + at(v, 2) * v.level * 0.35;
    s.shadow(PAD, PAD, SPAN, SPAN);
    s.box(PAD, PAD, SPAN, SPAN, { color: wall, h: base });
    s.box(PAD + 0.2, PAD + 0.2, SPAN - 0.4, SPAN - 0.4, { color: wall, h: top, z: base });
    if (v.level > 3) {
      s.box(PAD + 0.42, PAD + 0.42, SPAN - 0.84, SPAN - 0.84, { color: wall, h: top * 0.6, z: base + top });
      s.post(1, 1, base + top + top * 0.6, 0.8, 'metal', 0.05);
    } else {
      s.roof(PAD - 0.02, PAD - 0.02, SPAN + 0.04, SPAN + 0.04, base + top, 0.55, roofOf(v));
    }
    // A flue, at the one scale that only just resolves. `ink` is the outline
    // slot and never a fill — except for genuinely black hardware at small
    // area, which this is.
    if (rng.next() > 0.6) s.box(PAD + 0.3, PAD + 0.3, 0.26, 0.26, { color: 'ink', h: 0.36, z: base + top });
  },
  animate(pen, gx, gy, v) {
    windows(pen, gx, gy, v, 1 + v.level);
  },
});

const DEFS: Record<Kind, SpriteDef> = { home: HOME, shop: SHOP, park: PARK };

export function defOf(kind: Kind): SpriteDef {
  return DEFS[kind];
}
export const NEIGHBOUR_DEF = NEIGHBOUR;

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
  // Keyed on level AND on the seed's material pick, because a taller setback
  // is chosen from `at(v, 2)` — two buildings at one level are not one height.
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

/** Ghost of the thing about to be placed: the footprint and height of the real
 *  building, translucent and tinted by whether it is allowed. `drawSprite` has
 *  no alpha, so this is a flat box rather than a faded building. */
export function drawGhost(pen: Pen, gx: number, gy: number, kind: Kind, ok: boolean): void {
  const v = variantFor(1, 2);
  const h = heightOf(DEFS[kind], v) / 26;
  isoBox(pen, gx + PAD, gy + PAD, SPAN, SPAN, {
    color: ok ? 'ok' : 'bad', h, alpha: 0.3, outline: true,
  });
  pen.light?.add(gx + 1, gy + 1, 0, 2.2, ok ? 0.34 : 0.2, ok ? 'ok' : 'bad');
}
