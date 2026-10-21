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
 * (hand-placed buildings that claim lots) and `STATION_PIECES` (the decks and
 * canopies that stand in the corridor; trains move, so they are `TRAINS`, and
 * subway entrances are `ENTRANCES`). Replace the data, never
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

/** F fringe residential · N Nishi-Shinjuku towers · K Kabukichō · O Shin-Okubo
 *  (north of Kabukichō) · E east side (3-chōme shopping, south of Kabukichō) ·
 *  S south · G Gyoen · R the rail corridor. */
export type District = 'F' | 'N' | 'K' | 'O' | 'E' | 'S' | 'G' | 'R';

/** THE map. One char per BLOCK: row = block y (`by`, north at the top), column
 *  = block x (`bx`). This is the single source of truth for what kind of ground
 *  a block is — the analogue of the old scene's `cityLayout.js`. Move a
 *  district by editing a character; `tools/check.mjs` checks the shape.
 *
 *  The two R columns (bx 7 and 8) ARE the rail corridor's lots. The corridor
 *  itself (`RAIL_X0..RAIL_X1`) also swallows the avenue between them. */
export const DISTRICTS: readonly string[] = [
  'FFFFFFFRRFOOOOFF',
  'FFNNNNFRROOOOOOF',
  'FNNNNNFRRKKKKKKF',
  'FNNNNNNRRKKKKKKF',
  'FNNNNNNRRKKKKKKF',
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
  // North-west of the station, as in the reference image and in reality. It is
  // the SE quadrant of block (bx 6, by 6), the corner nearest the camera.
  { id: 'cocoon', gx: 66, gy: 66, w: 4, d: 4, label: 'コクーンタワー' },

  // Kabukichō (bx 9–14, by 2–4). The gate is its south mouth, the ward office
  // its north-west corner, Golden Gai its south-east: a walk through the district
  // passes all four. All lot-aligned, each inside one block.
  { id: 'kuyakusho', gx: 92, gy: 22, w: 6, d: 4, label: '新宿区役所' },
  { id: 'toho', gx: 112, gy: 34, w: 4, d: 4, label: 'TOHOシネマズ新宿' },
  { id: 'ichibangai', gx: 102, gy: 48, w: 2, d: 2, label: '歌舞伎町一番街' },
  { id: 'goldengai', gx: 132, gy: 44, w: 4, d: 4, label: 'ゴールデン街' },

  // The 3-chōme shopping streets, east of the station and south of Kabukichō.
  // Flush with the block's south edge (gy 74–79): at gy 72 a row of filler lots
  // stood 0.16 tile from its +gy face and hid the storeys a department store
  // needs to be seen on. Now both visible faces look onto a street.
  { id: 'isetan', gx: 102, gy: 74, w: 8, d: 6, label: '伊勢丹' },
];

/** The four subway lines that matter here. Tokyo Metro: Marunouchi (M, red),
 *  Fukutoshin (F, brown). Toei: Shinjuku (S, leaf green), Oedo (E, magenta). */
export type MetroLine = 'marunouchi' | 'fukutoshin' | 'shinjuku' | 'oedo';

/** A subway entrance. It claims ONE lot (2×2 tiles) and the art makes it a small
 *  plaza with a stair hood, because every lot is otherwise a building and the
 *  streets are full-width roadway. Which line serves which spot is illustrative,
 *  not surveyed. Not in `LANDMARKS`, so it gets no name plate. */
export interface Entrance {
  readonly line: MetroLine;
  readonly gx: number;
  readonly gy: number;
}

export const ENTRANCES: readonly Entrance[] = [
  // West of the station: along the corridor's frontage and into Nishi.
  { line: 'marunouchi', gx: 68, gy: 62 },
  { line: 'oedo', gx: 68, gy: 72 },
  { line: 'shinjuku', gx: 68, gy: 82 },
  { line: 'marunouchi', gx: 68, gy: 92 },
  { line: 'oedo', gx: 58, gy: 72 },
  { line: 'shinjuku', gx: 58, gy: 82 },
  // East of the station: the 3-chōme shopping side, and Kabukichō's south edge.
  // Every one is the SE-corner lot of its block (gx and gy both ≡ 8 mod PITCH),
  // so what stands in front of it, on +gx and +gy, is a two-tile street and not
  // another building. Mid-block they were buried: a neighbour hides everything
  // of the entrance below its own roofline, and a sign 3.4 storeys tall cleared
  // only the top third of it.
  { line: 'oedo', gx: 98, gy: 48 },
  { line: 'marunouchi', gx: 98, gy: 58 },
  { line: 'shinjuku', gx: 98, gy: 68 },
  { line: 'marunouchi', gx: 98, gy: 78 },
  { line: 'fukutoshin', gx: 98, gy: 88 },
  { line: 'fukutoshin', gx: 108, gy: 68 },
  { line: 'shinjuku', gx: 118, gy: 68 },
];

/** Does any landmark or entrance touch this tile rect? */
function claimedRect(gx: number, gy: number, w: number, d: number): boolean {
  for (const m of LANDMARKS) {
    if (gx < m.gx + m.w && gx + w > m.gx && gy < m.gy + m.d && gy + d > m.gy) return true;
  }
  for (const e of ENTRANCES) {
    if (gx < e.gx + LOT && gx + w > e.gx && gy < e.gy + LOT && gy + d > e.gy) return true;
  }
  return false;
}

/** Is this lot (partly or wholly) under a landmark? */
export function isClaimed(lx: number, ly: number): boolean {
  return claimedRect(tileOf(lx), tileOf(ly), LOT, LOT);
}

// ── the station ──────────────────────────────────────────────────────────────

export type StationKind = 'canopy' | 'deck' | 'bridge';
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

/** Road bridges over the corridor, on an east-west street row (`gy % 10` is 0 or
 *  1, so `d` is the street's two tiles). South of the canopies, so nothing has
 *  to be cut for them. Like a deck, a bridge is a static box over the tracks, so
 *  trains are hidden beneath it (`carVisible`). No traffic crosses yet. */
export const BRIDGES: readonly { readonly gy: number; readonly d: number }[] = [
  { gy: 100, d: 2 },
];

/** The platform canopies run over this gy span, minus the decks. */
export const CANOPY_Y0 = 56;
export const CANOPY_Y1 = 98;

/** A train that runs the length of the ward on one TRACK column. It is a pure
 *  function of (run, time), like the cars: no state, nothing to get out of step.
 *  A car is `CAR` tiles, so a run is 4–7 cars, 8–14 tiles. Under a deck a train
 *  is not drawn — car by car, so it reads as passing beneath. `dir` is +1 for
 *  southbound (+gy), −1 northbound; `speed` is the cruise speed in tiles per
 *  second (1 tile ≈ 10 m, so 1.5 is a station-approach crawl); `phase` is how far
 *  along its loop it is at t = 0, in tiles at cruise speed, so the six are never
 *  in step. */
export interface TrainRun {
  readonly gx: number;
  readonly cars: number;
  readonly livery: Livery;
  readonly dir: 1 | -1;
  readonly speed: number;
  readonly phase: number;
}

/** Only the tracks with a platform to their WEST: 74, 77, 80, 83, 86, 89. A
 *  platform canopy is a slab a storey up, and a canopy to a train's EAST is
 *  nearer the camera and sorts after it, so it hangs over the flank — the cars
 *  were there, and invisible. A canopy to the west is behind the train. */
export const TRAINS: readonly TrainRun[] = [
  { gx: 74, cars: 6, livery: 'jrgreen', dir: 1, speed: 1.5, phase: 0 },
  { gx: 77, cars: 6, livery: 'jrgreen', dir: -1, speed: 1.5, phase: 70 },
  { gx: 80, cars: 7, livery: 'chuo', dir: 1, speed: 2.0, phase: 20 },
  { gx: 83, cars: 7, livery: 'chuo', dir: -1, speed: 2.0, phase: 90 },
  { gx: 86, cars: 5, livery: 'jrgreen', dir: 1, speed: 1.7, phase: 45 },
  { gx: 89, cars: 4, livery: 'chuo', dir: -1, speed: 1.8, phase: 120 },
];

/** A car is ~20 m: 2 tiles, and the footprint of one car sprite is 1 × `CAR`. */
export const CAR = 2;

/** Every train stops once per loop on the platform between the concourse deck
 *  and the next one south: it brakes for `TRAIN_RAMP` seconds, stands for
 *  `TRAIN_DWELL`, and pulls away for `TRAIN_RAMP`. The FRONT stops `STOP_GAP`
 *  tiles short of the far deck, so a short train stands wholly in the open and a
 *  long one has its tail tucked under a deck — which `carVisible` then hides. */
export const TRAIN_DWELL = 9;
const TRAIN_RAMP = 3;
const STOP_GAP = 0.5;
const CONCOURSE = DECKS.findIndex((k) => k.label !== undefined);
const PLATFORM_Y0 = (DECKS[CONCOURSE]?.gy ?? 0) + (DECKS[CONCOURSE]?.d ?? 0);
const PLATFORM_Y1 = DECKS[CONCOURSE + 1]?.gy ?? W;

/** Tiles of one loop: the ward plus the train's own length, so it enters with
 *  every car still off the north (or south) edge and leaves the same way. */
function trainLoop(run: TrainRun): number {
  return W + run.cars * CAR;
}

/** Seconds for one loop: cruise, two ramps (each covers half what cruise would
 *  have in the same time) and the dwell. A train repeats exactly after this. */
export function trainPeriod(run: TrainRun): number {
  const ramp = (run.speed * TRAIN_RAMP) / 2;
  return (trainLoop(run) - 2 * ramp) / run.speed + 2 * TRAIN_RAMP + TRAIN_DWELL;
}

/** How far it has travelled along its loop, in tiles, 0 … `trainLoop`. Position
 *  is `speed·t` between stops and a constant-deceleration ramp into and out of
 *  each, so velocity is continuous and the train never lurches. */
function trainProgress(run: TrainRun, t: number): number {
  const v = run.speed;
  const ramp = (v * TRAIN_RAMP) / 2;
  // Where the front is when it stops, as progress: southbound progress IS the
  // front's gy; northbound the front is at `W - progress`.
  const stop = run.dir === 1 ? PLATFORM_Y1 - STOP_GAP : W - PLATFORM_Y0 - STOP_GAP;
  const period = trainPeriod(run);
  let s = (t + run.phase / v) % period;
  if (s < 0) s += period;
  const brake = (stop - ramp) / v;
  if (s < brake) return v * s;
  s -= brake;
  if (s < TRAIN_RAMP) return stop - ramp + v * s - (v * s * s) / (2 * TRAIN_RAMP);
  s -= TRAIN_RAMP;
  if (s < TRAIN_DWELL) return stop;
  s -= TRAIN_DWELL;
  if (s < TRAIN_RAMP) return stop + (v * s * s) / (2 * TRAIN_RAMP);
  return stop + ramp + v * (s - TRAIN_RAMP);
}

/** The gy of car `k` of a train at time `t`; car 0 is the +gy end, the one the
 *  camera sees the cab of, whichever way the train is going. Its footprint is
 *  `[y, y + CAR)` on column `run.gx`. Northbound, progress runs the other way
 *  and the +gy end is the REAR, so cars are numbered by where they stand and
 *  not by which one leads. */
export function trainCarY(run: TrainRun, k: number, t: number): number {
  const progress = trainProgress(run, t);
  const end = run.dir === 1 ? progress : trainLoop(run) - progress;
  return end - (k + 1) * CAR;
}

/** Is a car whose footprint is `[y, y + CAR)` to be drawn? Not off the ward, and
 *  NEVER while it overlaps a deck: the sorter is a topological sort over
 *  footprints, so a car overlapping a deck is a cycle. Not drawing it is also
 *  what makes it read as passing beneath. */
export function carVisible(y: number): boolean {
  if (y < 0 || y + CAR > W) return false;
  for (let i = 0; i < DECKS.length; i++) {
    const k = DECKS[i];
    if (k !== undefined && y < k.gy + k.d && y + CAR > k.gy) return false;
  }
  for (const k of BRIDGES) if (y < k.gy + k.d && y + CAR > k.gy) return false;
  return true;
}

function stationPieces(): readonly StationPiece[] {
  const out: StationPiece[] = [];
  for (const k of DECKS) {
    out.push({ kind: 'deck', gx: RAIL_X0, gy: k.gy, w: RAIL_X1 - RAIL_X0, d: k.d, ...(k.label ? { label: k.label } : {}) });
  }
  for (const k of BRIDGES) out.push({ kind: 'bridge', gx: RAIL_X0, gy: k.gy, w: RAIL_X1 - RAIL_X0, d: k.d });
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
const DENSITY: Record<District, number> = { F: 0.55, N: 0.5, K: 0.95, O: 0.9, E: 0.85, S: 0.8, G: 1, R: 0 };

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
  F: [1, 4], N: [6, 11], K: [3, 7], O: [2, 5], E: [2, 5], S: [2, 5], G: [1, 1], R: [1, 1],
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
  const level = lo + Math.floor(toUnit(hash2(SEED ^ 0x9e37, lx, ly)) * (hi - lo + 1));
  return Math.min(level, levelCap(lx, ly));
}

/** Tile rects (half-open) where filler is capped, so a landmark behind them can
 *  be SEEN. The camera looks from the south-east, so what hides a landmark is the
 *  lots on its +gx and +gy sides: a filler of H storeys hides about H - 0.2 of
 *  its face. Found by looking: ゴールデン街 (2 storeys, 4×4) was invisible behind
 *  five-storey filler, and 新宿区役所's podium and forecourt likewise. */
const LOW_ZONES: readonly { readonly gx0: number; readonly gy0: number; readonly gx1: number; readonly gy1: number; readonly max: number }[] = [
  { gx0: 130, gy0: 42, gx1: 144, gy1: 56, max: 2 }, // ゴールデン街 (132,44): its east and south
  { gx0: 92, gy0: 26, gx1: 106, gy1: 32, max: 3 }, // 新宿区役所 (92,22): the forecourt side
];

/** The tallest a filler on this lot may be, `Infinity` outside every zone. */
export function levelCap(lx: number, ly: number): number {
  const gx = tileOf(lx);
  const gy = tileOf(ly);
  let cap = Infinity;
  for (const z of LOW_ZONES) {
    if (gx >= z.gx0 && gx < z.gx1 && gy >= z.gy0 && gy < z.gy1) cap = Math.min(cap, z.max);
  }
  return cap;
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

// ── crowds ───────────────────────────────────────────────────────────────────
//
// Where people are. There are no sidewalks, so pedestrians use the one place a
// car does not: a street's margins, the 0.3 tile either side of its two-tile
// band, outside the car lanes (`LANE_NEAR` / `LANE_FAR`, which are 0.4 and 1.6).
// The table is DATA ONLY — `crowd.ts` turns it into people, as a pure function of
// (index, time), exactly as `moveCars` does for the traffic.
//
// Streets and the entrances' own forecourts only. A "plaza" in this ward is an
// empty lot, and every empty lot is either paving nobody has a reason to cross or
// an entrance, whose forecourt is the walk below. Add a plaza here the day the
// ward has one worth a crowd; `tools/check.mjs` will say if the rect is wrong.

/** How much of a street's two tiles each margin is. Cars run at +0.4 and +1.6,
 *  so a person in [0, 0.3] or [1.7, 2] is beside the traffic, not in it. */
export const WALK_MARGIN = 0.3;

/** One strip of walkable ground. People walk along its LONG side (back and forth,
 *  half each way) and spread across its short one. A `crossing` is a zebra: the
 *  long side spans a whole street, so they do walk through the lanes, and the
 *  cars (which know nothing of them) drive straight over. */
export interface CrowdStrip {
  readonly id: string;
  readonly kind: 'margin' | 'crossing';
  readonly gx: number;
  readonly gy: number;
  readonly w: number;
  readonly d: number;
  /** People per tile of the long side, at full density (zoom 1.0 and up). */
  readonly perTile: number;
}

/** Both margins of street `a`, from `from` to `to` along it. `axis` 'x' is a
 *  north–south street (its two tiles are gx `avenue(a)`..+2, and it is walked
 *  along gy); 'y' is an east–west one. */
function margins(id: string, axis: 'x' | 'y', a: number, from: number, to: number, perTile: number): CrowdStrip[] {
  const at = avenue(a);
  const out: CrowdStrip[] = [];
  for (const [side, off] of [['a', 0], ['b', 2 - WALK_MARGIN]] as const) {
    out.push(axis === 'x'
      ? { id: `${id}.${side}`, kind: 'margin', gx: at + off, gy: from, w: WALK_MARGIN, d: to - from, perTile }
      : { id: `${id}.${side}`, kind: 'margin', gx: from, gy: at + off, w: to - from, d: WALK_MARGIN, perTile });
  }
  return out;
}

/** A zebra across street `a` at `at` along it: 0.6 tile deep, the street's full 2 wide. */
function crossing(id: string, axis: 'x' | 'y', a: number, at: number, perTile: number): CrowdStrip {
  return axis === 'x'
    ? { id, kind: 'crossing', gx: avenue(a), gy: at, w: 2, d: 0.6, perTile }
    : { id, kind: 'crossing', gx: at, gy: avenue(a), w: 0.6, d: 2, perTile };
}

export const CROWDS: readonly CrowdStrip[] = [
  // The station's two frontages (gx 70–71 west, 90–91 east), the length of the
  // concourse and a block either side of it. The densest thing in the ward.
  ...margins('frontage-w', 'x', 7, 64, 92, 2.4),
  ...margins('frontage-e', 'x', 9, 64, 92, 2.4),
  // Zebras at the two junctions the concourse sits between (gy 70–71 and 80–81).
  crossing('zebra-w-n', 'x', 7, 69.2, 3),
  crossing('zebra-w-s', 'x', 7, 82.1, 3),
  crossing('zebra-e-n', 'x', 9, 69.2, 3),
  crossing('zebra-e-s', 'x', 9, 82.1, 3),
  // Outside 伊勢丹 (gx 102–109, gy 74–79): its south front on gy 80–81, and its
  // west flank on gx 100–101.
  ...margins('isetan-s', 'y', 8, 98, 112, 2.6),
  ...margins('isetan-w', 'x', 10, 70, 84, 2),
  // The 一番街 gate (102,48) opens on gy 50–51; the approach is that street from
  // the 3-chōme side, and the gx 100–101 street running up to it.
  ...margins('ichibangai-s', 'y', 5, 92, 116, 2.6),
  ...margins('ichibangai-w', 'x', 10, 40, 58, 2),
];

/** Person-marks per entrance, at full density: half going down, half coming up. */
export const ENTRANCE_PEOPLE = 6;

/** The walk from an entrance's stair mouth to the street, as four points
 *  `[x0, y0, x1, y1, x2, y2, x3, y3]`, in tiles:
 *    0  the mouth, the middle of the hood's +gy face (`OX0..OX1` and `HY1` in entrances.ts)
 *    1  in front of the hood, still on the forecourt
 *    2  the street margin it joins
 *    3  three tiles on along that margin, toward the concourse.
 *  An entrance whose +gy neighbour is a street steps straight onto it; the west
 *  ones, whose +gy neighbour is a plaza lot, cross the forecourt to the +gx street.
 *  Every entrance in `ENTRANCES` is one or the other, and `check.mjs` says so. */
export function entranceWalk(e: Entrance): readonly number[] {
  const mx = e.gx + 0.9;
  const my = e.gy + 1.5;
  const fy = e.gy + 1.85;
  if (isStreet(e.gy + 2)) {
    const sy = e.gy + 2 + WALK_MARGIN / 2;
    const dx = mx > RAIL_X1 ? -1 : 1;
    return [mx, my, mx, fy, mx, sy, mx + dx * 3, sy];
  }
  const sx = e.gx + 2 + WALK_MARGIN / 2;
  const concourse = (DECKS[CONCOURSE]?.gy ?? 0) + (DECKS[CONCOURSE]?.d ?? 0) / 2;
  const dy = e.gy < concourse ? 1 : -1;
  return [mx, my, mx, fy, sx, fy, sx, fy + dy * 3];
}
