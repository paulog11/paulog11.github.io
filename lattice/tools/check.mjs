/**
 * Shinjuku's layout invariants, with no browser and no test framework.
 *   node tools/check.mjs
 *
 * Everything here is arithmetic over integers, which is exactly the kind of
 * thing that is obviously right and quietly off by one. The round-trip and the
 * street-overlap checks are the two that would let a building be placed on a
 * road, which is the failure you would otherwise find by eye. The district,
 * landmark and station checks are the same idea one level up: a landmark that
 * straddles a street, or a canopy under a deck, renders fine and sorts wrong.
 */
import assert from 'node:assert/strict';
import {
  AVENUES, BLOCKS, CANOPY_Y0, CANOPY_Y1, DECKS, DISTRICTS, LANDMARKS, LANE_FAR,
  LANE_NEAR, LOTS, LOT, PITCH, RAIL_X0, RAIL_X1, STATION_PIECES, TOWER_TILES,
  TRAINS, W,
  avenue, districtAtTile, districtOf, isClaimed, isRail, isStreet, keyOf,
  lotOf, lotOfX, neighbourAt, neighbourLevel, railTileKind, tileOf, towerAnchor,
} from '../src/layout.ts';

let checks = 0;
const ok = (cond, msg) => { assert.ok(cond, msg); checks++; };

// The ward divides evenly into blocks, and a block into lots.
ok(W % PITCH === 0, 'W must divide into whole blocks');
ok((PITCH - 2) % LOT === 0, 'a block must divide into whole lots');
ok(LOTS === (W / PITCH) * 4, 'LOTS must agree with the block arithmetic');

for (let li = 0; li < LOTS; li++) {
  const g = tileOf(li);
  ok(g >= 0 && g < W, `lot ${li} lands inside the ward`);
  ok(!isStreet(g), `lot ${li} does not start on a street`);
  // Both tiles the lot covers resolve back to it — if the second did not, a
  // tap on the far half of a building would address the lot next door.
  ok(lotOf(g) === li, `lot ${li} round-trips through its near tile`);
  ok(lotOf(g + 1) === li, `lot ${li} round-trips through its far tile`);
  ok(!isStreet(g + 1), `lot ${li}'s far tile is not a street either`);
}

// Every street tile, and everything off the ward, refuses to be a lot.
for (let g = 0; g < W; g++) {
  if (isStreet(g)) ok(lotOf(g) === -1, `street tile ${g} is not a lot`);
}
for (const bad of [-1, -0.5, W, W + 40, NaN, Infinity, -Infinity]) {
  ok(lotOf(bad) === -1, `${bad} is not a lot`);
  ok(lotOfX(bad) === -1, `${bad} is not an east-west lot either`);
}

// Two tiles of street per block, eight of lots: no tile is both and none is
// neither.
let streets = 0;
for (let g = 0; g < W; g++) {
  const s = isStreet(g);
  const l = lotOf(g) >= 0;
  ok(s !== l, `tile ${g} is a street or a lot, never both or neither`);
  if (s) streets++;
}
ok(streets === (W / PITCH) * 2, `street tiles per axis: got ${streets}`);

// Lot keys are unique across the whole ward.
const seen = new Set();
for (let ly = 0; ly < LOTS; ly++) {
  for (let lx = 0; lx < LOTS; lx++) {
    const k = keyOf(lx, ly);
    ok(!seen.has(k), `key collision at ${lx},${ly}`);
    seen.add(k);
  }
}
ok(seen.size === LOTS * LOTS, 'one key per lot');

// Both lanes of every avenue are on the road. This is the one that failed:
// the far lane used to be computed from the street's centre, which put it on
// a lot — half the ward's traffic drove through the buildings, and the only
// symptom was a frame that measured as a still photograph.
ok(LANE_NEAR >= 0 && LANE_FAR < 2, 'lanes lie inside the street band');
for (let a = 0; a < AVENUES; a++) {
  for (const lane of [0, LANE_NEAR, LANE_FAR, 1.99]) {
    const g = avenue(a) + lane;
    ok(isStreet(g), `avenue ${a} lane ${lane} runs on a street`);
    ok(lotOf(g) === -1, `avenue ${a} lane ${lane} is not on a lot`);
  }
  // And the tile just past the band is NOT street, or the band is mis-sized.
  ok(!isStreet(avenue(a) + 2), `avenue ${a} is two tiles wide, not three`);
}

// ── districts ────────────────────────────────────────────────────────────────

const CODES = 'FNKESGR';
ok(BLOCKS === W / PITCH, 'BLOCKS agrees with the block arithmetic');
ok(DISTRICTS.length === BLOCKS, `DISTRICTS has one row per block row: ${DISTRICTS.length}`);
for (const [by, row] of DISTRICTS.entries()) {
  ok(row.length === BLOCKS, `DISTRICTS row ${by} is ${BLOCKS} chars, got ${row.length}`);
  for (const [bx, c] of [...row].entries()) {
    ok(CODES.includes(c), `DISTRICTS[${by}][${bx}] is a known code, got '${c}'`);
  }
}
for (const c of CODES) ok(DISTRICTS.some((r) => r.includes(c)), `district ${c} appears on the map`);
// The R columns ARE the corridor's lots: every lot is R exactly when its
// east-west tile is rail, so the map and `isRail` cannot drift apart.
for (let ly = 0; ly < LOTS; ly++) {
  for (let lx = 0; lx < LOTS; lx++) {
    ok((districtOf(lx, ly) === 'R') === isRail(tileOf(lx)), `lot ${lx},${ly}: R iff its tile is rail`);
  }
}
ok(districtAtTile(-1, 5) === 'F' && districtAtTile(5, W) === 'F' && districtAtTile(NaN, 0) === 'F',
  'off the ward is fringe, never undefined');
ok(districtAtTile(35, 75) === 'N' && districtAtTile(85, 75) === 'R' && districtAtTile(105, 15) === 'K',
  'districtAtTile reads the map (Nishi, rail, Kabukichō)');

// ── the rail corridor ────────────────────────────────────────────────────────

ok(RAIL_X0 % PITCH === 2 && RAIL_X1 % PITCH === 0, 'the corridor starts at a lot edge and ends at a street edge');
for (let g = 0; g < W; g++) {
  const rail = g >= RAIL_X0 && g < RAIL_X1;
  ok(isRail(g) === rail, `isRail(${g}) is ${rail}`);
  ok((railTileKind(g) !== undefined) === rail, `railTileKind(${g}) exists exactly on rail`);
  if (rail) ok(lotOfX(g) === -1, `rail tile ${g} is not a lot`);
  else ok(lotOfX(g) === lotOf(g), `off the corridor lotOfX(${g}) agrees with lotOf`);
}
ok(!isRail(RAIL_X0 - 0.01) && isRail(RAIL_X0) && isRail(RAIL_X1 - 0.01) && !isRail(RAIL_X1),
  'isRail floors its argument');
ok(!isRail(NaN) && !isRail(-1) && railTileKind(NaN) === undefined, 'isRail refuses what is not a tile');
for (const g of [RAIL_X0 - 2, RAIL_X0 - 1, RAIL_X1, RAIL_X1 + 1]) {
  ok(isStreet(g) && !isRail(g), `frontage street tile ${g} stays a street`);
}
let tracks = 0;
let platforms = 0;
for (let g = RAIL_X0; g < RAIL_X1; g++) {
  const kind = railTileKind(g);
  ok(kind === ((g - RAIL_X0) % 3 === 1 ? 'platform' : 'track'), `rail tile ${g} follows track/platform/track`);
  if (kind === 'track') tracks++; else platforms++;
}
ok(tracks === 12 && platforms === 6, `12 tracks and 6 platforms, got ${tracks} and ${platforms}`);
ok(railTileKind(RAIL_X0) === 'track' && railTileKind(RAIL_X1 - 1) === 'track', 'the corridor starts and ends on a track');

// ── landmarks ────────────────────────────────────────────────────────────────

/** Do two tile rects overlap? Touching edges do not. */
const overlap = (a, b) => a.gx < b.gx + b.w && a.gx + a.w > b.gx && a.gy < b.gy + b.d && a.gy + a.d > b.gy;

ok(new Set(LANDMARKS.map((m) => m.id)).size === LANDMARKS.length, 'landmark ids are unique');
for (const m of LANDMARKS) {
  ok(m.label.length > 0 && m.w > 0 && m.d > 0, `${m.id} has a label and a size`);
  ok(m.gx >= 0 && m.gy >= 0 && m.gx + m.w <= W && m.gy + m.d <= W, `${m.id} is inside the ward`);
  // Whole lots only: an unaligned rect would claim lots it half-covers.
  ok(m.gx % LOT === 0 && m.gy % LOT === 0 && m.w % LOT === 0 && m.d % LOT === 0, `${m.id} is lot-aligned`);
  for (let gy = m.gy; gy < m.gy + m.d; gy++) {
    ok(!isStreet(gy), `${m.id} row ${gy} is not a street`);
  }
  for (let gx = m.gx; gx < m.gx + m.w; gx++) {
    ok(!isStreet(gx) && !isRail(gx), `${m.id} column ${gx} is neither street nor rail`);
  }
  // One block: both corners resolve to the same block on both axes.
  ok(Math.floor(m.gx / PITCH) === Math.floor((m.gx + m.w - 1) / PITCH), `${m.id} stays in one block east-west`);
  ok(Math.floor(m.gy / PITCH) === Math.floor((m.gy + m.d - 1) / PITCH), `${m.id} stays in one block north-south`);
  // And it claims exactly the lots under it.
  let claimed = 0;
  for (let ly = 0; ly < LOTS; ly++) for (let lx = 0; lx < LOTS; lx++) {
    const t = { gx: tileOf(lx), gy: tileOf(ly), w: LOT, d: LOT };
    if (overlap(t, m)) { claimed++; ok(isClaimed(lx, ly), `${m.id} claims lot ${lx},${ly}`); }
  }
  ok(claimed === (m.w * m.d) / (LOT * LOT), `${m.id} claims ${(m.w * m.d) / (LOT * LOT)} lots, got ${claimed}`);
}
for (const [i, a] of LANDMARKS.entries()) {
  for (const b of LANDMARKS.slice(i + 1)) ok(!overlap(a, b), `${a.id} and ${b.id} do not overlap`);
}

// ── the station ──────────────────────────────────────────────────────────────

const decks = STATION_PIECES.filter((p) => p.kind === 'deck');
const canopies = STATION_PIECES.filter((p) => p.kind === 'canopy');
const trains = STATION_PIECES.filter((p) => p.kind === 'train');
ok(decks.length === DECKS.length && decks.length === 3, `3 decks, got ${decks.length}`);
ok(canopies.length === 24, `4 canopy segments on each of 6 platforms, got ${canopies.length}`);
ok(trains.length === TRAINS.length && trains.length >= 3 && trains.length <= 4, `3–4 trains, got ${trains.length}`);
ok(decks.length + canopies.length + trains.length === STATION_PIECES.length, 'every piece is a deck, canopy or train');
ok(CANOPY_Y0 < DECKS[0].gy && DECKS.at(-1).gy + DECKS.at(-1).d < CANOPY_Y1, 'canopies run past both ends of the decks');
ok(DECKS.every((k, i) => i === 0 || DECKS[i - 1].gy + DECKS[i - 1].d < k.gy), 'decks are in order, with a gap between');

for (const p of STATION_PIECES) {
  const name = `${p.kind} at ${p.gx},${p.gy}`;
  ok(p.w > 0 && p.d > 0, `${name} has a footprint`);
  ok(p.gx >= RAIL_X0 && p.gx + p.w <= RAIL_X1, `${name} is inside the corridor [${RAIL_X0}, ${RAIL_X1})`);
  ok(p.gy >= 0 && p.gy + p.d <= W, `${name} is inside the ward`);
  if (p.kind === 'canopy') {
    ok(p.w === 1 && railTileKind(p.gx) === 'platform', `${name} sits on a platform column`);
    ok(p.gy >= CANOPY_Y0 && p.gy + p.d <= CANOPY_Y1, `${name} is inside the canopy span`);
  }
  if (p.kind === 'train') {
    ok(p.w === 1 && railTileKind(p.gx) === 'track', `${name} sits on a track column`);
    ok(p.d >= 8 && p.d <= 14, `${name} is 8–14 tiles long, got ${p.d}`);
    ok(p.livery === 'jrgreen' || p.livery === 'chuo', `${name} has a livery`);
  }
  if (p.kind === 'deck') {
    ok(p.gx === RAIL_X0 && p.w === RAIL_X1 - RAIL_X0, `${name} spans the whole corridor`);
  }
}
ok(decks.filter((p) => p.label === '新宿駅').length === 1, 'exactly one deck carries the station name');
for (const [i, a] of STATION_PIECES.entries()) {
  for (const b of STATION_PIECES.slice(i + 1)) {
    ok(!overlap(a, b), `${a.kind} ${a.gx},${a.gy} and ${b.kind} ${b.gx},${b.gy} do not overlap`);
  }
}
// Each platform is roofed from end to end except where a deck crosses it.
for (let g = RAIL_X0; g < RAIL_X1; g++) {
  if (railTileKind(g) !== 'platform') continue;
  const roofed = canopies.filter((p) => p.gx === g).reduce((n, p) => n + p.d, 0);
  const under = DECKS.reduce((n, k) => n + k.d, 0);
  ok(roofed === CANOPY_Y1 - CANOPY_Y0 - under, `platform ${g} is roofed everywhere but under the decks, got ${roofed}`);
}

// ── the filler ───────────────────────────────────────────────────────────────

// The ward is a hash, not a stream: asking twice must answer twice the same, or
// panning away and back would rebuild a different city.
const RANGE = { F: [1, 4], N: [6, 11], K: [3, 7], E: [2, 5], S: [2, 5], G: [1, 1], R: [1, 1] };
for (let i = 0; i < 400; i++) {
  const lx = (i * 37) % LOTS;
  const ly = (i * 61) % LOTS;
  ok(neighbourAt(lx, ly) === neighbourAt(lx, ly), 'neighbourAt is a function of position');
  const lvl = neighbourLevel(lx, ly);
  ok(lvl === neighbourLevel(lx, ly), 'neighbourLevel is a function of position');
}

/** Is any of the four lots of the 2×2-lot site anchored here under a landmark? */
const siteClaimed = (lx, ly) => [0, 1].some((dy) => [0, 1].some((dx) => isClaimed(lx + dx, ly + dy)));

const eligible = {};
const built = {};
let total = 0;
for (let ly = 0; ly < LOTS; ly++) {
  for (let lx = 0; lx < LOTS; lx++) {
    const d = districtOf(lx, ly);
    const has = neighbourAt(lx, ly);
    const anchor = towerAnchor(lx, ly);
    if (has) total++;

    const [lo, hi] = RANGE[d];
    const lvl = neighbourLevel(lx, ly);
    ok(Number.isInteger(lvl) && lvl >= lo && lvl <= hi, `${d} lot ${lx},${ly}: level ${lvl} is in ${lo}–${hi}`);

    if (isClaimed(lx, ly)) ok(!has, `claimed lot ${lx},${ly} stays empty`);
    if (d === 'R') ok(!has, `rail lot ${lx},${ly} stays empty`);
    ok(anchor === (d === 'N' && lx % 2 === 0 && ly % 2 === 0), `towerAnchor(${lx},${ly}) is N + even/even`);
    if (d === 'N' && !anchor) ok(!has, `Nishi lot ${lx},${ly} is plaza, not a tower`);
    if (d === 'N' && has) ok(!siteClaimed(lx, ly), `Nishi tower at ${lx},${ly} has all four lots clear`);

    // Eligible: the lots that ROLL the dice. Claimed, rail and plaza lots do not.
    const rolls = d === 'N' ? anchor && !siteClaimed(lx, ly) : d !== 'R' && !isClaimed(lx, ly);
    if (rolls) { eligible[d] = (eligible[d] ?? 0) + 1; if (has) built[d] = (built[d] ?? 0) + 1; }
    else ok(!has, `lot ${lx},${ly} (${d}) does not roll, so it is empty`);
  }
}
ok(TOWER_TILES === 2 * LOT, 'a tower site is 2×2 lots');

// Each district builds at about its stated rate. The band is 4σ of a binomial,
// so a typo in DENSITY fails and ordinary hash scatter does not. At p = 1 the
// band collapses to 0, which is right: `toUnit` is < 1, so Gyoen has NO bare lot.
const TARGET = { F: 0.55, N: 0.5, K: 0.95, E: 0.85, S: 0.8, G: 1 };
const shares = [];
for (const [d, p] of Object.entries(TARGET)) {
  const n = eligible[d] ?? 0;
  const share = (built[d] ?? 0) / n;
  const band = 4 * Math.sqrt((p * (1 - p)) / n);
  ok(n >= 40, `district ${d} has enough lots to measure: ${n}`);
  ok(Math.abs(share - p) <= band, `district ${d} builds ${(share * 100).toFixed(1)}% of ${n}, wanted ${p * 100}% ±${(band * 100).toFixed(1)}`);
  shares.push(`${d} ${(share * 100).toFixed(0)}%`);
}

console.log(`shinjuku layout: ${checks} checks passed · ${LOTS}×${LOTS} lots · ${(total / (LOTS * LOTS) * 100).toFixed(1)}% built · ${LOTS * LOTS - total} empty`);
console.log(`shinjuku districts: ${shares.join(' · ')} · ${STATION_PIECES.length} station pieces · ${LANDMARKS.length} landmarks`);
