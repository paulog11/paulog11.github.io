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
import { readFileSync } from 'node:fs';
import {
  AVENUES, BLOCKS, CANOPY_Y0, CANOPY_Y1, DECKS, DISTRICTS, ENTRANCES, LANDMARKS, LANE_FAR,
  LANE_NEAR, LOTS, LOT, PITCH, RAIL_X0, RAIL_X1, STATION_PIECES, TOWER_TILES,
  TRAINS, TRAIN_DWELL, W, CAR, CROWDS, ENTRANCE_PEOPLE, WALK_MARGIN, entranceWalk,
  avenue, carVisible, trainCarY, trainPeriod, districtAtTile, districtOf, isClaimed, isRail, isStreet, keyOf,
  levelCap, lotOf, lotOfX, neighbourAt, neighbourLevel, railTileKind, tileOf, towerAnchor,
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

const CODES = 'FNKOESGR';
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
ok(districtAtTile(35, 75) === 'N' && districtAtTile(85, 75) === 'R' && districtAtTile(105, 35) === 'K'
  && districtAtTile(105, 15) === 'O' && districtAtTile(105, 65) === 'E',
  'districtAtTile reads the map (Nishi, rail, Kabukichō, Shin-Okubo, shopping)');
// Shin-Okubo is NORTH of Kabukichō, and the shopping streets SOUTH of it: in
// every column that has all three, O comes above K above E.
for (let bx = 0; bx < BLOCKS; bx++) {
  const col = DISTRICTS.map((r) => r[bx]).join('');
  if (col.includes('O') && col.includes('K')) ok(col.lastIndexOf('O') < col.indexOf('K'), `column ${bx}: Shin-Okubo is north of Kabukichō`);
  if (col.includes('K') && col.includes('E')) ok(col.lastIndexOf('K') < col.indexOf('E'), `column ${bx}: the shopping streets are south of Kabukichō`);
}

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

// Entrances: one lot each, never on a landmark or on each other, outside the
// corridor, and in a block of their own lots (so they claim exactly one).
for (const [i, e] of ENTRANCES.entries()) {
  const r = { gx: e.gx, gy: e.gy, w: LOT, d: LOT };
  const name = `${e.line} entrance at ${e.gx},${e.gy}`;
  ok(e.gx % LOT === 0 && e.gy % LOT === 0, `${name} is lot-aligned`);
  ok(!isStreet(e.gx) && !isStreet(e.gx + 1) && !isStreet(e.gy) && !isStreet(e.gy + 1), `${name} is on a lot, not a street`);
  ok(!isRail(e.gx) && !isRail(e.gx + 1), `${name} is outside the rail corridor`);
  ok(e.gx + LOT <= W && e.gy + LOT <= W, `${name} is inside the ward`);
  const lx = lotOf(e.gx);
  const ly = lotOf(e.gy);
  ok(isClaimed(lx, ly) && !neighbourAt(lx, ly), `${name} claims its lot`);
  for (const m of LANDMARKS) ok(!overlap(r, m), `${name} is clear of ${m.id}`);
  for (const o of ENTRANCES.slice(i + 1)) ok(!overlap(r, { gx: o.gx, gy: o.gy, w: LOT, d: LOT }), `${name} and ${o.line} at ${o.gx},${o.gy} do not overlap`);
}
ok(ENTRANCES.some((e) => e.gx < RAIL_X0) && ENTRANCES.some((e) => e.gx >= RAIL_X1), 'there are entrances both west and east of the station');
// East of the station the lots in front (+gx, +gy) are built up to the street,
// and a neighbour hides everything of an entrance below its own roofline — so an
// east entrance must be a block's SE-corner lot, with only street in front.
for (const e of ENTRANCES.filter((e) => e.gx >= RAIL_X1)) {
  ok(e.gx % PITCH === PITCH - 2 && e.gy % PITCH === PITCH - 2, `east entrance at ${e.gx},${e.gy} is its block's SE-corner lot`);
}

// MAP.md is the index agents use to find a place. It cannot be proved right, but it can be proved
// not to have forgotten a landmark or an entrance: that is the drift that actually happens.
const mapDoc = readFileSync(new URL('../MAP.md', import.meta.url), 'utf8');
for (const m of LANDMARKS) ok(mapDoc.includes(`\`${m.id}\``), `MAP.md lists the landmark \`${m.id}\``);
for (const e of ENTRANCES) ok(mapDoc.includes(`\`${e.gx},${e.gy}\``), `MAP.md lists the entrance at \`${e.gx},${e.gy}\``);

// ── the station ──────────────────────────────────────────────────────────────

const decks = STATION_PIECES.filter((p) => p.kind === 'deck');
const canopies = STATION_PIECES.filter((p) => p.kind === 'canopy');
ok(decks.length === DECKS.length && decks.length === 3, `3 decks, got ${decks.length}`);
ok(canopies.length === 24, `4 canopy segments on each of 6 platforms, got ${canopies.length}`);
ok(decks.length + canopies.length === STATION_PIECES.length, 'every standing piece is a deck or canopy (trains move: they are TRAINS)');
// Trains are runs, not pieces: each on its own track column, 4–7 cars, moving.
const usedTracks = new Set();
for (const t of TRAINS) {
  const name = `train on ${t.gx}`;
  ok(railTileKind(t.gx) === 'track', `${name} is on a track column`);
  ok(!usedTracks.has(t.gx), `${name}: one train per track`);
  ok(railTileKind(t.gx - 1) === 'platform', `${name} has its platform to the WEST: a canopy to the east is nearer the camera and hides the flank`);
  usedTracks.add(t.gx);
  ok(Number.isInteger(t.cars) && t.cars >= 4 && t.cars <= 7, `${name} has 4–7 cars, got ${t.cars}`);
  ok(t.dir === 1 || t.dir === -1, `${name} runs north or south`);
  ok(t.speed > 0 && t.speed <= 3, `${name} runs at a believable 0–3 tiles/s, got ${t.speed}`);
  ok(t.livery === 'jrgreen' || t.livery === 'chuo', `${name} has a livery`);
}
ok(TRAINS.length >= 4 && TRAINS.some((t) => t.dir === 1) && TRAINS.some((t) => t.dir === -1), 'several trains, in both directions');

// Motion: a train is a pure function of (run, t). Sampled at a step that does not
// divide any period, so the wrap and the stop are both crossed mid-step. The hot
// loop records the first failure and asserts once, or the count is half a million.
for (const t of TRAINS) {
  const name = `train on ${t.gx}`;
  const T = trainPeriod(t);
  const y = (k, at) => trainCarY(t, k, at);
  const dt = 0.05;
  let bad = '', still = 0, shown = 0, hidden = 0, peak = 0, atStop = 0, flipped = 0, same = 0;
  const wrong = { ...t, dir: -t.dir };
  for (let at = 0; at < 2 * T; at += dt) {
    let visible = 0;
    for (let k = 0; k < t.cars; k++) {
      const yk = y(k, at);
      // A car one car behind the one in front of it: the train never overlaps itself.
      if (k > 0 && Math.abs(y(k - 1, at) - yk - CAR) > 1e-9) bad ||= `cars ${k - 1} and ${k} are not one car apart at t=${at}`;
      if (!carVisible(yk)) { hidden++; continue; }
      shown++;
      visible++;
      // Never drawn while overlapping a deck, whatever `carVisible` says about why.
      if (yk < 0 || yk + CAR > W) bad ||= `a drawn car at ${yk} is off the ward`;
      for (const d of DECKS) if (yk < d.gy + d.d && yk + CAR > d.gy) bad ||= `a drawn car at ${yk} overlaps the deck at ${d.gy}`;
    }
    // Continuous: at most `speed` per second, forward only, and the one jump
    // allowed is the wrap, by exactly a loop (the ward plus the train's length).
    let step = y(0, at + dt) - y(0, at);
    if (Math.abs(step) > W / 2) step -= Math.sign(step) * (W + t.cars * CAR);
    if (Math.abs(step) > t.speed * dt + 1e-9) bad ||= `moved ${step} in ${dt}s at t=${at}, faster than ${t.speed}/s`;
    if (step * t.dir < -1e-9) bad ||= `moves the wrong way at t=${at}`;
    if (Math.abs(step) < 1e-12) { still += dt; atStop = Math.max(atStop, visible); }
    peak = Math.max(peak, Math.abs(step) / dt);
    // `dir` is the only thing that says which way: flipped, the same moment moves the other way.
    const flip = trainCarY(wrong, 0, at + dt) - trainCarY(wrong, 0, at);
    if (Math.abs(step) > 1e-9 && Math.abs(flip) > 1e-9 && Math.abs(Math.abs(flip) - Math.abs(step)) < 1e-6) { if (flip * step < 0) flipped++; else same++; }
  }
  ok(bad === '', `${name}: ${bad}`);
  ok(shown > 0 && hidden > 0, `${name}: some cars are drawn and some are not`);
  ok(Math.abs(peak - t.speed) < 1e-6, `${name}: cruises at exactly its speed, peak ${peak}`);
  ok(Math.abs(still - 2 * TRAIN_DWELL) < 2 * dt, `${name}: stands ${TRAIN_DWELL}s per loop, measured ${still / 2}`);
  ok(atStop >= 3, `${name}: at the stop at least 3 cars stand in the open, got ${atStop}`);
  ok(flipped > 0 && same === 0, `${name}: flipping dir flips the direction of travel (${flipped} flipped, ${same} not)`);
  // Periodic, and a function of t alone: asked out of order it says the same.
  for (const at of [0, 3.3, 77.7, 150.1]) {
    ok(Math.abs(y(0, at) - y(0, at + T)) < 1e-6, `${name}: repeats after ${T.toFixed(1)}s (t=${at})`);
    const first = y(1, at);
    y(1, at + 9); y(1, at - 4);
    ok(y(1, at) === first, `${name}: same t, same place (t=${at})`);
  }
}
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
const RANGE = { F: [1, 4], N: [6, 11], K: [3, 7], O: [2, 5], E: [2, 5], S: [2, 5], G: [1, 1], R: [1, 1] };
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

    const [lo0, hi0] = RANGE[d];
    // A low zone (see LOW_ZONES) caps the range from above, and may pull it below `lo`.
    const cap = levelCap(lx, ly);
    const lo = Math.min(lo0, cap);
    const hi = Math.min(hi0, cap);
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
const TARGET = { F: 0.55, N: 0.5, K: 0.95, O: 0.9, E: 0.85, S: 0.8, G: 1 };
const shares = [];
for (const [d, p] of Object.entries(TARGET)) {
  const n = eligible[d] ?? 0;
  const share = (built[d] ?? 0) / n;
  const band = 4 * Math.sqrt((p * (1 - p)) / n);
  ok(n >= 40, `district ${d} has enough lots to measure: ${n}`);
  ok(Math.abs(share - p) <= band, `district ${d} builds ${(share * 100).toFixed(1)}% of ${n}, wanted ${p * 100}% ±${(band * 100).toFixed(1)}`);
  shares.push(`${d} ${(share * 100).toFixed(0)}%`);
}

// ── crowds ───────────────────────────────────────────────────────────────────

// People walk where a car does not, so a strip is only worth anything if it is
// ground a person could stand on: a street tile (which is never a lot, so never
// under a filler building), outside the rail corridor, and clear of every landmark,
// station piece and entrance in case one has strayed onto a street.
ok(new Set(CROWDS.map((s) => s.id)).size === CROWDS.length, 'crowd strip ids are unique');
const solids = [...LANDMARKS, ...STATION_PIECES];
let crowdTiles = 0;
for (const s of CROWDS) {
  const name = `crowd strip ${s.id}`;
  ok(s.w > 0 && s.d > 0 && s.perTile > 0, `${name} has a size and a density`);
  ok(s.gx >= 0 && s.gy >= 0 && s.gx + s.w <= W && s.gy + s.d <= W, `${name} is inside the ward`);
  // Every tile the strip touches (its rect is half-open, so a strip ending exactly on a tile edge does not touch the next).
  for (let ty = Math.floor(s.gy); ty < Math.ceil(s.gy + s.d); ty++) {
    for (let tx = Math.floor(s.gx); tx < Math.ceil(s.gx + s.w); tx++) {
      crowdTiles++;
      ok(isStreet(tx) || isStreet(ty), `${name}: tile ${tx},${ty} is a street`);
      ok(!isRail(tx), `${name}: tile ${tx},${ty} is not in the rail corridor`);
    }
  }
  for (const b of solids) ok(!overlap(s, { gx: b.gx, gy: b.gy, w: b.w, d: b.d }), `${name} is clear of the ${b.id ?? b.kind} at ${b.gx},${b.gy}`);
  for (const e of ENTRANCES) ok(!overlap(s, { gx: e.gx, gy: e.gy, w: LOT, d: LOT }), `${name} is clear of the entrance at ${e.gx},${e.gy}`);

  // The short side decides what it is. A margin sits in [0, 0.3] or [1.7, 2] of its
  // street's two tiles, so beside the lane centres and never on them; a crossing is
  // a whole street wide, and is the one place people do walk through the lanes.
  const alongX = s.w >= s.d;
  const lo = alongX ? s.gy : s.gx; // where the short side starts, on the axis ACROSS the walk
  const span = alongX ? s.d : s.w;
  const off = lo - Math.floor(lo / PITCH) * PITCH;
  if (s.kind === 'margin') {
    const eps = 1e-9;
    ok(Math.abs(span - WALK_MARGIN) < eps, `${name} is a margin wide`);
    const near = off >= -eps && off + span <= WALK_MARGIN + eps;
    const far = off >= 2 - WALK_MARGIN - eps && off + span <= 2 + eps;
    ok(near || far, `${name} lies in one of its street's two margins, got offset ${off}`);
    for (const lane of [LANE_NEAR, LANE_FAR]) ok(!(off <= lane && off + span >= lane), `${name} does not cover the lane at +${lane}`);
  } else {
    // The long side spans the street exactly; the short side stays inside the street's tiles.
    const long = alongX ? s.w : s.d;
    const start = alongX ? s.gx : s.gy;
    ok(Math.abs(long - 2) < 1e-9 && start - Math.floor(start / PITCH) * PITCH === 0, `${name} crosses exactly one street, got ${start}+${long}`);
  }
}
ok(CROWDS.some((s) => s.id.startsWith('frontage-w')) && CROWDS.some((s) => s.id.startsWith('frontage-e')), 'both station frontages have a crowd');
ok(CROWDS.some((s) => s.id.startsWith('isetan')) && CROWDS.some((s) => s.id.startsWith('ichibangai')), 'Isetan and the 一番街 gate have a crowd');

// Every entrance has a walk from its stair mouth to a street margin, in four points:
// the first two on its own forecourt, the last two on the street, outside the rail.
for (const e of ENTRANCES) {
  const name = `${e.line} entrance at ${e.gx},${e.gy}`;
  const w = entranceWalk(e);
  ok(w.length === 8 && w.every(Number.isFinite), `${name} has a four-point walk`);
  for (const k of [0, 1]) {
    ok(w[2 * k] >= e.gx && w[2 * k] < e.gx + LOT && w[2 * k + 1] >= e.gy && w[2 * k + 1] < e.gy + LOT, `${name}: walk point ${k} is on its forecourt`);
  }
  for (const k of [2, 3]) {
    const x = w[2 * k], y = w[2 * k + 1];
    ok(isStreet(x) || isStreet(y), `${name}: walk point ${k} is on a street`);
    ok(!isRail(x), `${name}: walk point ${k} is not in the rail corridor`);
    ok(x >= 0 && y >= 0 && x < W && y < W, `${name}: walk point ${k} is inside the ward`);
  }
  // Where it joins the street it is in a margin, not a lane: on the axis ACROSS that street.
  const margin = (g) => { const o = g - Math.floor(g / PITCH) * PITCH; return isStreet(g) && (o < WALK_MARGIN || o >= 2 - WALK_MARGIN); };
  ok(margin(w[4]) || margin(w[5]), `${name}: walk point 2 is in a street margin`);
  ok(Math.hypot(w[2] - w[0], w[3] - w[1]) > 0 && Math.hypot(w[6] - w[4], w[7] - w[5]) > 2, `${name}: the walk has a length`);
}
ok(ENTRANCE_PEOPLE >= 2 && ENTRANCE_PEOPLE % 2 === 0, 'an entrance has people going both ways');

console.log(`shinjuku layout: ${checks} checks passed · ${LOTS}×${LOTS} lots · ${(total / (LOTS * LOTS) * 100).toFixed(1)}% built · ${LOTS * LOTS - total} empty`);
console.log(`shinjuku crowds: ${CROWDS.length} strips over ${crowdTiles} tiles · ${ENTRANCES.length} entrance walks`);
console.log(`shinjuku districts: ${shares.join(' · ')} · ${STATION_PIECES.length} station pieces · ${TRAINS.length} trains · ${LANDMARKS.length} landmarks · ${ENTRANCES.length} entrances`);
