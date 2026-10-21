/**
 * SHINJUKU — where everything stands. Pure data and arithmetic; it imports
 * nothing but the hashes, and nothing in here knows that three.js or a canvas
 * exists. `node tools/check.mjs` asserts its invariants without a browser.
 *
 * A block is `PITCH` tiles across: the first two are street, the remaining
 * eight are four lots of 2×2. So "which lot is this tile?" is two divisions
 * and no data structure, and every lot in the ward has an integer address
 * whether anything stands on it or not.
 *
 * Orientation: +gx is EAST (screen down-right), +gy is SOUTH (screen
 * down-left), so north is the top-right edge of the diamond. One tile is about
 * ten metres, with west-east distances compressed.
 *
 * On top of that grid, this file owns four placement tables, all in tiles:
 * `DISTRICTS` (what kind of ground a block is), the rail corridor, `LANDMARKS`
 * (hand-placed buildings that claim lots) and `STATION_PIECES` (the decks,
 * canopies and trains that stand in the corridor). Replace the data, never
 * hard-code a position in the art.
 */
import { hash2, toUnit } from '@latticekit/core';

/** Tiles per axis. 160, not 64: at 64 the whole ward fits inside the viewport
 *  and the result is a diorama — a model of a place rather than a place. The
 *  inequality is `w ≤ 2H − 4h` on the projected diamond, and 64 satisfies it
 *  at exactly one camera position, which is a photograph. */
export const W = 160;

/** Block pitch: 2 tiles of street + 8 tiles of lots. */
export const PITCH = 10;

/** A lot is 2×2 tiles, and so is every filler building in the ward. */
export const LOT = 2;

/** Lots per axis, across the whole ward. */
export const LOTS = (W / PITCH) * 4;

/** Blocks per axis — the side of the `DISTRICTS` map. */
export const BLOCKS = W / PITCH;

/** The ward's identity. Everything that was here before the camera arrived is
 *  a pure function of this and a lot address — never of a sequential Rng, or
 *  panning away and back would hand back a different ward. */
export const SEED = 0x63686f6d;

/** Is this tile part of a street? Streets run both ways, so this is one axis;
 *  the rail corridor is a gx-only overlay and lives in `isRail`. */
export function isStreet(g: number): boolean {
  const t = Math.floor(g);
  return t - Math.floor(t / PITCH) * PITCH < 2;
}

/** The lot address along one axis, or -1 for a street or off the ward.
 *
 *  AXIS-AGNOSTIC on purpose, so it knows nothing about rail: the corridor
 *  occupies gx 72–89 only, and gy 72–89 is ordinary lots (都庁 stands on some
 *  of them). Asking "is this gx a lot?" in the corridor is `lotOfX`. */
export function lotOf(g: number): number {
  if (!Number.isFinite(g) || g < 0 || g >= W) return -1;
  const t = Math.floor(g);
  const b = Math.floor(t / PITCH);
  const m = t - b * PITCH;
  return m < 2 ? -1 : b * 4 + ((m - 2) >> 1);
}

/** `lotOf` for the EAST-WEST axis: -1 on the rail corridor as well, because no
 *  lot address exists there. */
export function lotOfX(gx: number): number {
  return isRail(gx) ? -1 : lotOf(gx);
}

/** The inverse: the tile a lot's near corner sits on. */
export function tileOf(lot: number): number {
  return Math.floor(lot / 4) * PITCH + 2 + (lot % 4) * LOT;
}

/** One key per lot, so the ward is one flat Map rather than a grid of grids. */
export function keyOf(lx: number, ly: number): number {
  return ly * LOTS + lx;
}

// ── districts ────────────────────────────────────────────────────────────────

/** F fringe residential · N Nishi-Shinjuku towers · K Kabukichō · E east side
 *  (3-chōme) · S south · G Gyoen · R the rail corridor. */
export type District = 'F' | 'N' | 'K' | 'E' | 'S' | 'G' | 'R';

/** THE map. One char per BLOCK: row = block y (`by`, north at the top), column
 *  = block x (`bx`). This is the single source of truth for what kind of ground
 *  a block is — the analogue of the old scene's `cityLayout.js`. Move a
 *  district by editing a character; `tools/check.mjs` checks the shape.
 *
 *  The two R columns (bx 7 and 8) ARE the rail corridor's lots. The corridor
 *  itself (`RAIL_X0..RAIL_X1`) also swallows the avenue between them. */
export const DISTRICTS: readonly string[] = [
  'FFFFFFFRRFKKKFFF',
  'FFNNNNFRRKKKKKFF',
  'FNNNNNFRRKKKKKKF',
  'FNNNNNNRRKKKKKKF',
  'FNNNNNNRREKKKKEF',
  'FNNNNNNRREEEEEEF',
  'FNNNNNNRREEEEEEF',
  'FNNNNNNRREEEEEEF', // ← the concourse row
  'FNNNNNNRRESSGGGG',
  'FNNNNNSRRSSSGGGG',
  'FFNNNSSRRSSGGGGG',
  'FFFSSSSRRSSGGGGG',
  'FFFSSSSRRSSGGGGG',
  'FFFFSSSRRSSSGGGF',
  'FFFFFFSRRSSSFFFF',
  'FFFFFFFRRFFFFFFF',
];

/** The district of the BLOCK containing a tile. Off the ward it is fringe, so
 *  a caller never has to range-check. Note it answers for the block as a whole:
 *  the street tiles on a block's west and north edges share its district, and
 *  the terrain pass asks `isRail` first for exactly that reason. */
export function districtAtTile(gx: number, gy: number): District {
  const row = DISTRICTS[Math.floor(gy / PITCH)];
  return (row?.[Math.floor(gx / PITCH)] as District | undefined) ?? 'F';
}

/** The district a lot stands in: the block containing its near tile. */
export function districtOf(lx: number, ly: number): District {
  return districtAtTile(tileOf(lx), tileOf(ly));
}

// ── the rail corridor ────────────────────────────────────────────────────────

/** The corridor is gx 72–89: blocks 7 and 8, plus the avenue between them at
 *  gx 80. The frontage streets at gx 70–71 and 90–91 stay streets. It is 18
 *  tiles (~180 m) wide and runs the full north–south length of the ward. */
export const RAIL_X0 = 72;
export const RAIL_X1 = 90;

export function isRail(gx: number): boolean {
  const t = Math.floor(gx);
  return t >= RAIL_X0 && t < RAIL_X1;
}

/** Track, platform, track — repeating every three tiles from `RAIL_X0`. That is
 *  twelve tracks and six island platforms across the corridor. */
export function railTileKind(gx: number): 'track' | 'platform' | undefined {
  if (!isRail(gx)) return undefined;
  return (Math.floor(gx) - RAIL_X0) % 3 === 1 ? 'platform' : 'track';
}

// ── landmarks ────────────────────────────────────────────────────────────────

/** A hand-placed building. Its rect claims every lot it touches, and
 *  `neighbourAt` leaves those lots empty for it. */
export interface Landmark {
  readonly id: string;
  readonly gx: number;
  readonly gy: number;
  readonly w: number;
  readonly d: number;
  readonly label: string;
}

export const LANDMARKS: readonly Landmark[] = [
  // The whole block (bx 3, by 7): 8×8 tiles of lots.
  { id: 'tocho', gx: 32, gy: 72, w: 8, d: 8, label: '東京都庁舎' },
  // The SE quadrant of block (bx 6, by 8): the corner nearest the camera, so no
  // Nishi tower stands between it and the viewer (in the NE quadrant one did,
  // and hid all but its crown).
  // The reference image puts Cocoon SOUTH-west of the station; in reality it
  // stands west/north-west of it. Moving it is a one-line edit: change gx/gy to
  // any 4×4 corner of a block, and `tools/check.mjs` will say if it lands badly.
  { id: 'cocoon', gx: 66, gy: 86, w: 4, d: 4, label: 'コクーンタワー' },
];

/** Does any landmark touch this tile rect? */
function claimedRect(gx: number, gy: number, w: number, d: number): boolean {
  for (const m of LANDMARKS) {
    if (gx < m.gx + m.w && gx + w > m.gx && gy < m.gy + m.d && gy + d > m.gy) return true;
  }
  return false;
}

/** Is this lot (partly or wholly) under a landmark? */
export function isClaimed(lx: number, ly: number): boolean {
  return claimedRect(tileOf(lx), tileOf(ly), LOT, LOT);
}

// ── the station ──────────────────────────────────────────────────────────────

export type StationKind = 'canopy' | 'deck' | 'train';
export type Livery = 'jrgreen' | 'chuo';

/** One footprint in the corridor, in tiles. `w` and `d` are the SAME numbers
 *  `order.add` must be given, or the depth sort and the art disagree. */
export interface StationPiece {
  readonly kind: StationKind;
  readonly gx: number;
  readonly gy: number;
  readonly w: number;
  readonly d: number;
  readonly label?: string;
  readonly livery?: Livery;
}

/** Cross-decks: concourses spanning the whole corridor, east to west. They are
 *  where the platforms are reached from, so everything else is split around
 *  them — footprints must not overlap, and the sorter is a topological sort
 *  over footprints, so a canopy running UNDER a deck would be a cycle. */
export const DECKS: readonly { readonly gy: number; readonly d: number; readonly label?: string }[] = [
  { gy: 62, d: 3 },
  { gy: 74, d: 5, label: '新宿駅' },
  { gy: 88, d: 4 },
];

/** The platform canopies run over this gy span, minus the decks. */
export const CANOPY_Y0 = 56;
export const CANOPY_Y1 = 98;

/** Parked trains, each on one TRACK column. Lengths 8–14 tiles. They sit
 *  between the decks, or in the open corridor either side of the station —
 *  never under a deck, which `tools/check.mjs` proves by overlap. */
export const TRAINS: readonly { readonly gx: number; readonly gy: number; readonly d: number; readonly livery: Livery }[] = [
  { gx: 74, gy: 65, d: 8, livery: 'jrgreen' }, // between the north and concourse decks
  { gx: 80, gy: 79, d: 8, livery: 'chuo' }, // between the concourse and south decks
  { gx: 86, gy: 42, d: 14, livery: 'chuo' }, // open corridor, north of the canopies
  { gx: 81, gy: 99, d: 12, livery: 'jrgreen' }, // open corridor, south of the canopies
];

function stationPieces(): readonly StationPiece[] {
  const out: StationPiece[] = [];
  for (const k of DECKS) {
    out.push({ kind: 'deck', gx: RAIL_X0, gy: k.gy, w: RAIL_X1 - RAIL_X0, d: k.d, ...(k.label ? { label: k.label } : {}) });
  }
  // One canopy per platform column, cut at every deck: 4 segments × 6 platforms.
  for (let gx = RAIL_X0; gx < RAIL_X1; gx++) {
    if (railTileKind(gx) !== 'platform') continue;
    let y = CANOPY_Y0;
    for (const k of DECKS) {
      if (k.gy > y) out.push({ kind: 'canopy', gx, gy: y, w: 1, d: k.gy - y });
      y = k.gy + k.d;
    }
    if (CANOPY_Y1 > y) out.push({ kind: 'canopy', gx, gy: y, w: 1, d: CANOPY_Y1 - y });
  }
  for (const t of TRAINS) out.push({ kind: 'train', gx: t.gx, gy: t.gy, w: 1, d: t.d, livery: t.livery });
  return out;
}

export const STATION_PIECES: readonly StationPiece[] = stationPieces();

// ── the filler: who is already here ──────────────────────────────────────────

/** A Nishi tower site is a 2×2-LOT quadrant (4×4 tiles) anchored on the lot with
 *  even `lx` and even `ly`. Quadrants never straddle a block, because a block
 *  has four lots a side. */
export const TOWER_TILES = 2 * LOT;

/** Is this lot the anchor of a Nishi tower site? Pure geometry: it says nothing
 *  about whether a tower is actually built there (`neighbourAt`). The other
 *  three lots of a site are plaza paving. */
export function towerAnchor(lx: number, ly: number): boolean {
  return districtOf(lx, ly) === 'N' && lx % 2 === 0 && ly % 2 === 0;
}

/** Chance that a lot (an anchor, for N) is built. Hashed from `(SEED, lx, ly)`
 *  against this, so raising a number adds buildings without moving the rest.
 *  G is 1: Gyoen is a park, so it has no bare lots (`toUnit` is < 1). */
const DENSITY: Record<District, number> = { F: 0.55, N: 0.5, K: 0.95, E: 0.85, S: 0.8, G: 1, R: 0 };

/** Was this lot built on when the camera arrived? Landmarks and the rail
 *  corridor refuse; Nishi builds only on a tower-site anchor whose whole 4×4
 *  quadrant is clear of landmarks. (Gyoen's `G` lots will be tree groves.) */
export function neighbourAt(lx: number, ly: number): boolean {
  const d = districtOf(lx, ly);
  if (d === 'R') return false;
  if (d === 'N') {
    if (!towerAnchor(lx, ly) || claimedRect(tileOf(lx), tileOf(ly), TOWER_TILES, TOWER_TILES)) return false;
  } else if (isClaimed(lx, ly)) return false;
  return toUnit(hash2(SEED, lx, ly)) < DENSITY[d];
}

/** Storeys by district, inclusive. G is 1 because a grove is a ground patch. */
const LEVELS: Record<District, readonly [number, number]> = {
  F: [1, 4], N: [6, 11], K: [3, 7], E: [2, 5], S: [2, 5], G: [1, 1], R: [1, 1],
};

/** How tall that neighbour is — a second hash, so height and existence are
 *  independent and the skyline does not correlate with the gaps.
 *
 *  The fringe stays at four levels and it is not a taste call: on a 2-tile
 *  footprint a six-storey mass is a pencil tower, and a ward of them reads as
 *  a forest rather than as a neighbourhood. Only Nishi goes high, and it builds
 *  on one lot in four, which is what keeps it from being that forest. */
export function neighbourLevel(lx: number, ly: number): number {
  const [lo, hi] = LEVELS[districtOf(lx, ly)];
  return lo + Math.floor(toUnit(hash2(SEED ^ 0x9e37, lx, ly)) * (hi - lo + 1));
}

/** A building's own variant seed, so the same lot is always the same building. */
export function lotSeed(lx: number, ly: number): number {
  return hash2(SEED ^ 0x5a17, lx, ly);
}

/** The NEAR EDGE of street `a` along one axis. A street is the two tiles where
 *  `g % PITCH` is 0 or 1, so the drivable band is `[avenue(a), avenue(a) + 2)`
 *  and the two lanes sit at +`LANE_NEAR` and +`LANE_FAR` inside it.
 *
 *  This returned the street's *centre* once, and the far lane was then written
 *  as centre + 1.7 — which is `a·PITCH + 2.7`, a LOT tile. Half the ward's
 *  traffic drove through the buildings, invisible, and the only symptom was a
 *  frame that measured as static. */
export function avenue(a: number): number {
  return a * PITCH;
}

/** The two lanes, as offsets inside a street's two tiles. */
export const LANE_NEAR = 0.4;
export const LANE_FAR = 1.6;

/** How many avenues the ward has per axis. */
export const AVENUES = W / PITCH;
