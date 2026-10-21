/**
 * 新宿駅 — the station's art: platform canopies, the cross-decks, the cars of the
 * moving trains, and the ground of the rail corridor. Placement is NOT here; it
 * is `STATION_PIECES` and `TRAINS` in layout.ts, and this file only answers
 * "what does that footprint look like?".
 *
 * The contract with main.ts is `stationDef(piece).w/.d === piece.w/.d`: those
 * are the numbers the depth sorter gets, so a def that disagrees with its piece
 * sorts one place and draws in another. That is why the memo below is keyed on
 * the footprint and not just the kind — `SpriteDef.w/d` are fixed per def, and
 * canopies come in many lengths. A train car is always 1 × `CAR`, so its def is
 * keyed on role and livery instead.
 *
 * Only the +gx (east) and +gy (south) faces of anything are ever visible, so
 * signs and detail go there. A car is long in gy, so its visible flank is
 * +gx; a deck is long in gx, so its is +gy. Every piece stays INSIDE its own
 * footprint — a car on a track column abuts a canopy on the platform column.
 *
 * Night is drawn in `animate`, not `massing`, and only when `hourNow()` says it
 * is dusk: by day the lit-window overlays cost nothing.
 */
import { GROUND_LIFT, defineSprite, glowDot, isoPatch, isoTile, isoWall, wallText } from '@latticekit/draw';
import type { Ink, Pen, SpriteDef } from '@latticekit/draw';

import { CAR, railTileKind } from './layout.ts';
import type { Livery, StationPiece } from './layout.ts';
import { hourNow } from './sprites.ts';

const defs = new Map<string, SpriteDef>();

/** The sprite for one station piece, built once per distinct
 *  kind / footprint / label. Ids look like `station.canopy.1x9`. */
export function stationDef(p: StationPiece): SpriteDef {
  const id = `station.${p.kind}.${p.w}x${p.d}${p.label ? `.${p.label}` : ''}`;
  let def = defs.get(id);
  if (def === undefined) {
    def = build(id, p);
    defs.set(id, def);
  }
  return def;
}

/** Below this much night (`1 - hourNow()`), no lamp is lit. A lit window at
 *  dusk's first minute reads as a bug rather than as evening. */
const LIGHTS_ON = 0.3;

/** Nine levels of brightness: `softEllipse` caches a ramp per colour pair, so a
 *  continuously varying intensity is a cache key that never repeats. */
function snap(x: number): number {
  return Math.round(x * 8) / 8;
}

/** A span along one axis of a wall, in tiles. */
type Span = readonly [number, number];

/** Evenly pitched windows: groups `pitch` long with `gap` between, inside
 *  [from, to]. "Three, three, gap, three" is the rhythm the art skill asks for;
 *  here the gap is the pier and the pitch is three tiles. */
function groups(from: number, to: number, pitch: number, gap: number): Span[] {
  const out: Span[] = [];
  for (let x = from; x + pitch - gap <= to + 1e-6; x += pitch) out.push([x, x + pitch - gap]);
  return out;
}

/** Group `i` is dark when `i % 4 === 3`: somebody is always up, and somebody is
 *  always out. */
function lit(i: number): boolean {
  return i % 4 !== 3;
}

function build(id: string, p: StationPiece): SpriteDef {
  const { w, d } = p;
  switch (p.kind) {
    case 'canopy':
      return canopy(id, w, d);
    case 'deck':
      return deck(id, w, d, p.label);
    case 'bridge':
      return bridge(id, w, d);
  }
}

// ── canopy ───────────────────────────────────────────────────────────────────

/** Height of the canopy's underside, in storeys. */
const CANOPY_Z = 1.0;

/** A platform roof: a white slab a storey up on a row of posts down the middle,
 *  with a narrower raised ridge along its length. `roof` ridges along gx, which
 *  across a strip this long would be a tent every few tiles — tried, and it
 *  reads as a zigzag of light and dark panels, not as the long white vault in
 *  the reference. Two stacked boxes put the highlight where the reference has
 *  it: in one unbroken band down the whole run. */
function canopy(id: string, w: number, d: number): SpriteDef {
  const bays = Math.max(1, Math.round(d / 3));
  const bay = d / bays;
  // One lamp per post, one POOL of light per ~6 tiles of length.
  const lamps: number[] = [];
  for (let b = 0; b < bays; b++) lamps.push((b + 0.5) * bay);
  const pools = Math.max(1, Math.floor(d / 6));
  return defineSprite({
    id, w, d,
    massing(s) {
      for (const y of lamps) s.post(0.5, y, 0, CANOPY_Z, 'metal', 0.07);
      s.box(0, 0, w, d, { color: 'canopy', h: 0.1, z: CANOPY_Z });
      s.box(0, 0, w, d, { color: 'canopy', h: 0.1, z: CANOPY_Z + 0.1, inset: 0.2 });
    },
    animate(pen, gx, gy) {
      const n = 1 - hourNow();
      if (n < LIGHTS_ON) return;
      const lum = snap(n);
      for (const y of lamps) glowDot(pen, gx + 0.5, gy + y, CANOPY_Z - 0.05, 'warn', 0.07, lum);
      for (let i = 0; i < pools; i++) {
        pen.light?.add(gx + 0.5, gy + (i + 0.5) * d / pools, 0, 2, snap(0.45 * n), 'warn');
      }
    },
  });
}

// ── deck ─────────────────────────────────────────────────────────────────────

/** The nameplate: where it sits along the +gy face, and how tall. The band is
 *  2 storeys because `wallText` draws nothing under 12 CSS px of wall height and
 *  fills only 55% of it with glyph — at the 0.35 opening zoom a storey is ~9 px,
 *  so 2 storeys is the least that lets the kanji appear at all. */
const PLATE_X0 = 6.5;
const PLATE_X1 = 11.5;
const PLATE_Z0 = 1.45;
const PLATE_Z1 = 3.45;

/** A cross-deck: a concrete mass spanning the whole corridor, with a dark
 *  undercroft (the tracks pass under it), a glazed band, a parapet and rooftop
 *  plant. The concourse is taller and carries the 新宿駅 lightbox. */
function deck(id: string, w: number, d: number, label: string | undefined): SpriteDef {
  const concourse = label !== undefined;
  const h = concourse ? 3.6 : d >= 4 ? 2.6 : 2.2;
  const glazing = groups(0.15, w - 0.15, 3, 0.3);
  // Windows on the second storey, either side of the plate on the concourse,
  // and all along on the taller south deck.
  const upper: Span[] = concourse
    ? [...groups(0.45, PLATE_X0 - 0.5, 3, 0.3), ...groups(PLATE_X1 + 0.5, w - 0.45, 3, 0.3)]
    : h > 2.4 ? glazing : [];
  const UP: Span = [1.6, 2.3];
  const LOW: Span = [0.7, 1.35];

  // Plant boxes: positions come from the deck's own gy so the three roofs differ
  // and no two decks are the same silhouette. A tiny LCG, because a closure over
  // `Math.random` would make the art reshuffle on reload.
  let seed = (d * 2654435761 + (concourse ? 97 : 31)) >>> 0;
  const rnd = (): number => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  const plant: { x: number; len: number; hgt: number }[] = [];
  for (let x = 1 + rnd() * 1.5; x < w - 2.5; x += 2.6 + rnd() * 3.4) {
    plant.push({ x, len: 1 + rnd() * 1, hgt: 0.25 + rnd() * 0.25 });
  }
  const roofD = Math.min(1.1, d - 1.4);

  return defineSprite({
    id, w, d,
    massing(s) {
      s.shadow(0, 0, w, d);
      s.box(0, 0, w, d, { color: 'concrete', h });

      // ── +gy face (the long one): undercroft, glazing, plate ──
      // Undercroft: dark between piers, so the tracks read as running under.
      for (const [a, b] of groups(0.15, w - 0.15, 3, 0.5)) s.wall(a, d, b, d, 0, 0.5, 'darkstone');
      for (const [a, b] of glazing) s.wall(a, d, b, d, LOW[0], LOW[1], 'glass');
      for (const [a, b] of upper) s.wall(a, d, b, d, UP[0], UP[1], 'glass');
      if (concourse) {
        // The panel is a lightbox with a pale border; the text goes on after it.
        s.wall(PLATE_X0, d, PLATE_X1, d, PLATE_Z0, PLATE_Z1, 'jrgreen', 'canopy');
        s.sign(PLATE_X0, d, PLATE_X1, d, PLATE_Z1, PLATE_Z1 - PLATE_Z0, label, 'canopy');
      }

      // ── +gx face (the short east end) ──
      s.wall(w, 0.2, w, d - 0.2, 0, 0.5, 'darkstone');
      s.wall(w, 0.35, w, d - 0.35, LOW[0], LOW[1], 'glass');
      if (h > 2.4) s.wall(w, 0.35, w, d - 0.35, UP[0], UP[1], 'glass');

      // ── roof: plant first (back), then the lips that hide its feet ──
      for (const q of plant) {
        s.box(q.x, 0.5, Math.min(q.len, w - 0.6 - q.x), roofD, { color: 'darkstone', h: q.hgt, z: h });
      }
      for (let x = 1.2; x < w - 1; x += 3.1) s.box(x, d - 0.62, 0.4, 0.4, { color: 'metal', h: 0.34, z: h });
      s.box(w - 0.18, 0, 0.18, d - 0.18, { color: 'canopy', h: 0.22, z: h });
      s.box(0, d - 0.18, w, 0.18, { color: 'canopy', h: 0.22, z: h });
    },
    animate(pen, gx, gy) {
      // A slow aviation strobe on the first plant box, day and night: the one
      // thing on a station roof that moves.
      const first = plant[0];
      if (first !== undefined) {
        glowDot(pen, gx + first.x + 0.3, gy + 0.6, h + first.hgt + 0.05, 'bad', 0.08, (pen.t % 1.6) < 0.35 ? 1 : 0);
      }
      const n = 1 - hourNow();
      if (n < LIGHTS_ON) return;
      const lum = n;
      // Lit glazing, group by group, in the same 3-3-gap rhythm as the
      // filler. Drawn over the static glass, so by day none of it exists.
      glazing.forEach(([a, b], i) => { if (lit(i)) isoWall(pen, gx + a, gy + d, gx + b, gy + d, LOW[0], LOW[1], 'warn'); });
      upper.forEach(([a, b], i) => { if (lit(i + 1)) isoWall(pen, gx + a, gy + d, gx + b, gy + d, UP[0], UP[1], 'warn'); });
      isoWall(pen, gx + w, gy + 0.35, gx + w, gy + d - 0.35, LOW[0], LOW[1], 'warn');
      if (concourse) {
        // The plate is an `ok` slab by night: that slot does not roll down with
        // the rest, so it is the one green that glows. Dark `ink` text on it,
        // because the day text colour (`canopy`) has gone to a dark grey.
        isoWall(pen, gx + PLATE_X0, gy + d, gx + PLATE_X1, gy + d, PLATE_Z0, PLATE_Z1, 'ok', 'canopy');
        wallText(pen, gx + PLATE_X0, gy + d, gx + PLATE_X1, gy + d, PLATE_Z1, PLATE_Z1 - PLATE_Z0, label, 'ink');
        pen.light?.add(gx + (PLATE_X0 + PLATE_X1) / 2, gy + d + 0.8, 0, 3, snap(0.4 * lum), 'ok');
      }
      // Pools on the ground in front of the glazing — a few, not one per group.
      for (let x = 3; x < w; x += 6) pen.light?.add(gx + x, gy + d + 0.7, 0, 3.4, snap(0.5 * lum), 'warn');
    },
  });
}

// ── bridge ───────────────────────────────────────────────────────────────────

/** Underside of a road bridge, in storeys: clear of a train's roof (1.0). */
const BRIDGE_Z = 1.3;
const SLAB_H = 0.25;
const KERB_H = 0.3;
const KERB_W = 0.18;
const LAMP_H = 0.9;

/** A road bridge over the corridor: a concrete slab on piers that stand on the
 *  platform columns (never on a track), a road surface with a dashed centre
 *  line, and a kerb each side with a lamp every six tiles. Its long visible face
 *  is +gy, so the piers and the slab edge are what the camera reads. The ends
 *  are open: nothing ramps up to it yet. */
function bridge(id: string, w: number, d: number): SpriteDef {
  const top = BRIDGE_Z + SLAB_H;
  const piers: number[] = [];
  for (let x = 1.5; x < w; x += 3) piers.push(x);
  const lamps: number[] = [];
  for (let x = 2.5; x < w; x += 6) lamps.push(x);
  return defineSprite({
    id, w, d,
    massing(s) {
      s.shadow(0, 0, w, d);
      for (const x of piers) {
        s.post(x, 0.4, 0, BRIDGE_Z, 'concrete', 0.2);
        s.post(x, d - 0.4, 0, BRIDGE_Z, 'concrete', 0.2);
      }
      s.box(0, 0, w, d, { color: 'concrete', h: SLAB_H, z: BRIDGE_Z, topColor: 'road' });
      // Back to front: the north kerb, the road marking, then the south kerb.
      s.box(0, 0, w, KERB_W, { color: 'concrete', h: KERB_H, z: top });
      for (let x = 0.6; x < w - 1; x += 1.6) s.box(x, d / 2 - 0.03, 0.8, 0.06, { color: 'paving', h: 0.01, z: top });
      for (const x of lamps) s.post(x, d - KERB_W / 2, top, LAMP_H, 'metal', 0.06);
      s.box(0, d - KERB_W, w, KERB_W, { color: 'concrete', h: KERB_H, z: top });
    },
    animate(pen, gx, gy) {
      const n = 1 - hourNow();
      if (n < LIGHTS_ON) return;
      for (const x of lamps) {
        glowDot(pen, gx + x, gy + d - KERB_W / 2, top + LAMP_H + 0.05, 'warn', 0.07, snap(n));
        pen.light?.add(gx + x, gy + d, 0, 3, snap(0.45 * n), 'warn');
      }
    },
  });
}

// ── trains ───────────────────────────────────────────────────────────────────

/** Which car of a train this is, counted from the +gy end the camera sees:
 *  `cab` has the windscreen and headlights, `tail` the blinking marker, and the
 *  rest are `mid`. Three roles and two liveries is six sprites for any number of
 *  trains. */
export type CarRole = 'cab' | 'mid' | 'tail';

/** One car of a train — its OWN 1 × `CAR` sprite, because a train is a row of
 *  these, each depth-sorted and each hidden while it is under a deck (see
 *  `carVisible`). Built once per role and livery. */
export function trainCarDef(livery: Livery, role: CarRole): SpriteDef {
  const id = `station.car.${role}.${livery}`;
  let def = defs.get(id);
  if (def === undefined) {
    def = car(id, livery, role);
    defs.set(id, def);
  }
  return def;
}

/** The body sits inside the track tile with a margin either side. Along gy it
 *  runs the whole footprint, so two cars of a train meet exactly with no sliver
 *  of ground between them. */
const TX0 = 0.14;
const TX1 = 0.86;
const BODY_H = 0.9;

/** Two windows with a door pillar between, and half a bellows gap at each end. */
const PANES: readonly Span[] = [[0.14, 0.9], [1.1, 1.86]];

/** A silver commuter car: a granite body, the livery as a stripe along its +gx
 *  flank, a dark window band above it, and a roof air-conditioner. The flank is
 *  the only long visible face; the +gy end is the cab, on the `cab` car only. */
function car(id: string, livery: Ink, role: CarRole): SpriteDef {
  const w = 1;
  const d = CAR;
  return defineSprite({
    id, w, d,
    massing(s) {
      s.box(TX0, 0, TX1 - TX0, d, { color: 'granite', h: BODY_H, topColor: 'canopy' });
      // Flank, painted bottom to top: running gear, livery, windows. A wall is
      // a FLAT colour while a box's +gx face is shaded to 52%, so the silver is
      // laid on as a wall too — left as the box's own face the whole flank
      // reads as dark steel and the windows vanish into it.
      s.wall(TX1, 0, TX1, d, 0.1, BODY_H, 'canopy');
      s.wall(TX1, 0, TX1, d, 0, 0.12, 'darkstone');
      s.wall(TX1, 0, TX1, d, 0.12, 0.42, livery);
      for (const [a, b] of PANES) s.wall(TX1, a, TX1, b, 0.5, 0.8, 'towerglass');
      // Bellows: a dark strip full height at each joint, half on each car. The
      // cab has none at its +gy end, nor the tail at its -gy end.
      if (role !== 'cab') s.wall(TX1, d - 0.05, TX1, d, 0.1, BODY_H, 'metal');
      if (role !== 'tail') s.wall(TX1, 0, TX1, 0.05, 0.1, BODY_H, 'metal');
      // The cab end, facing +gy: livery over the whole face, a dark windscreen.
      if (role === 'cab') {
        s.wall(TX0, d, TX1, d, 0.1, BODY_H, livery);
        s.wall(TX0 + 0.12, d, TX1 - 0.12, d, 0.5, 0.8, 'towerglass');
      }
      s.box(0.38, d / 2 - 0.17, 0.26, 0.34, { color: 'metal', h: 0.1, z: BODY_H });
    },
    animate(pen, gx, gy) {
      // A tail marker blinking at the far end, day and night.
      if (role === 'tail') glowDot(pen, gx + TX1, gy + 0.12, 0.3, 'bad', 0.07, (pen.t % 1.4) < 0.5 ? 1 : 0);
      const n = 1 - hourNow();
      if (n < LIGHTS_ON) return;
      for (const [a, b] of PANES) isoWall(pen, gx + TX1, gy + a, gx + TX1, gy + b, 0.5, 0.8, 'warn');
      if (role === 'cab') {
        glowDot(pen, gx + 0.3, gy + d, 0.3, 'warn', 0.08, snap(n));
        glowDot(pen, gx + 0.7, gy + d, 0.3, 'warn', 0.08, snap(n));
      }
      // A pool per car, spilling east onto the platform — and it travels with
      // the car, which is why this is the sprite's and not the station's.
      pen.light?.add(gx + 1.3, gy + d / 2, 0, 2, snap(0.45 * n), 'warn');
    },
  });
}

// ── ground ───────────────────────────────────────────────────────────────────

/** Two thin steel strips per track, inset from the track tile's edges. */
const RAIL_AT = [0.22, 0.68] as const;
const RAIL_W = 0.1;
/** The yellow tactile line along each long edge of a platform. */
const EDGE_AT = 0.03;
const EDGE_W = 0.09;

/** The ground of the rail corridor: ballast under the tracks, concrete under
 *  the platforms, two rail lines on every track and a tactile edge line along
 *  both sides of every platform.
 *
 *  The range is HALF-OPEN tile indices and the caller has ALREADY clipped it to
 *  `[RAIL_X0, RAIL_X1)` — this draws every column it is given. The rail strips
 *  and edge lines run the whole visible gy span as one patch each, rather than
 *  per tile, so a track or a platform costs two patches however far you are
 *  zoomed out.
 *
 *  Tiles first, strips second: the strips sit on top of tiles they do not
 *  overlap in the sort, so the order is paint order and nothing else. */
export function paintRail(pen: Pen, gx0: number, gx1: number, gy0: number, gy1: number): void {
  if (gx1 <= gx0 || gy1 <= gy0) return;
  for (let gy = gy0; gy < gy1; gy++) {
    for (let gx = gx0; gx < gx1; gx++) {
      isoTile(pen, gx, gy, railTileKind(gx) === 'platform' ? 'concrete' : 'ballast');
    }
  }
  for (let gx = gx0; gx < gx1; gx++) {
    const kind = railTileKind(gx);
    if (kind === 'track') {
      for (const at of RAIL_AT) isoPatch(pen, gx + at, gy0, RAIL_W, gy1 - gy0, GROUND_LIFT, 'rail');
    } else if (kind === 'platform') {
      isoPatch(pen, gx + EDGE_AT, gy0, EDGE_W, gy1 - gy0, GROUND_LIFT, 'warn');
      isoPatch(pen, gx + 1 - EDGE_AT - EDGE_W, gy0, EDGE_W, gy1 - gy0, GROUND_LIFT, 'warn');
    }
  }
}
