/**
 * Chōme's layout invariants, with no browser and no test framework.
 *   node tools/check.mjs
 *
 * Everything here is arithmetic over integers, which is exactly the kind of
 * thing that is obviously right and quietly off by one. The round-trip and the
 * street-overlap checks are the two that would let a building be placed on a
 * road, which is the failure you would otherwise find by eye.
 */
import assert from 'node:assert/strict';
import {
  AVENUES, LANE_FAR, LANE_NEAR, LOTS, LOT, PITCH, W,
  avenue, isStreet, keyOf, lotOf, neighbourAt, neighbourLevel, tileOf,
} from '../src/layout.ts';
import { createWard } from '../src/city.ts';
import { problems } from '../src/sound.ts';

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

// The existing ward is a hash, not a stream: asking twice must answer twice
// the same, or panning away and back would rebuild a different city.
for (let i = 0; i < 400; i++) {
  const lx = (i * 37) % LOTS;
  const ly = (i * 61) % LOTS;
  ok(neighbourAt(lx, ly) === neighbourAt(lx, ly), 'neighbourAt is a function of position');
  const lvl = neighbourLevel(lx, ly);
  ok(Number.isInteger(lvl) && lvl >= 1 && lvl <= 4, `level in range, got ${lvl}`);
}

// Density: enough that the ward reads as a city on the first frame, with
// enough gaps left that there is somewhere to build.
let built = 0;
for (let ly = 0; ly < LOTS; ly++) {
  for (let lx = 0; lx < LOTS; lx++) if (neighbourAt(lx, ly)) built++;
}
const density = built / (LOTS * LOTS);
ok(density > 0.42 && density < 0.62, `occupied share should be 0.42–0.62, got ${density.toFixed(3)}`);
ok((1 - density) * LOTS * LOTS > 1500, 'at least 1500 empty lots to build on');

console.log(`chome layout: ${checks} checks passed · ${LOTS}×${LOTS} lots · ${(density * 100).toFixed(1)}% already built · ${(LOTS * LOTS - built)} free`);

// ── the economy, which is the only reason any of the above matters ──────────

/** The first lot at or after (lx, ly) that nobody already lives on. */
function freeLot(lx, ly) {
  for (let y = ly; y < LOTS; y++) {
    for (let x = y === ly ? lx : 0; x < LOTS; x++) if (!neighbourAt(x, y)) return [x, y];
  }
  throw new Error('no free lot');
}

{
  const ward = createWard({ coin: 100000, lots: [] });
  const base = ward.rate();
  ok(base > 0, 'an empty ward still pays its standing grant');
  ok(ward.population() === 0, 'an empty ward has no residents');

  // Build on a street: refused, and nothing is charged.
  const coinBefore = ward.coin();
  ok(ward.refuse('home', 0, 0) === 'That is the street.', 'the street is not for sale');
  ok(ward.place('home', 0, 0) === undefined, 'placing on a street does nothing');
  ok(ward.owned('home') === 0, 'a refused placement builds nothing');
  ok(ward.coin() >= coinBefore - 1, 'a refused placement costs nothing');

  // Three homes in a row on free lots.
  const [lx, ly] = freeLot(4, 4);
  const homes = [];
  for (let x = lx, placed = 0; placed < 3 && x < LOTS; x++) {
    if (neighbourAt(x, ly)) continue;
    const p = ward.place('home', tileOf(x), tileOf(ly));
    if (p !== undefined) { homes.push(p); placed++; }
  }
  ok(homes.length === 3, `three homes went up, got ${homes.length}`);
  ok(ward.owned('home') === 3, 'the ledger counts them');

  const rateWithHomes = ward.rate();
  ok(rateWithHomes > base, `homes earn: ${base.toFixed(2)} -> ${rateWithHomes.toFixed(2)}`);
  const popBefore = ward.population();
  ok(popBefore === 12, `three homes house twelve, got ${popBefore}`);

  // The price curve rises, which is the only thing stopping a one-button game.
  ok(ward.price('home') > 45, `the fourth home costs more than the first: ${ward.price('home').toFixed(1)}`);

  // A park next to them: it earns NOTHING itself, and every home near it earns
  // more. This is the whole design of the ward in one assertion — if the
  // banked multiplier were not rebuilt after a placement, `scale` would still
  // be holding the value it was sampled with and this would not move.
  const first = homes[0];
  let parked = false;
  for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [-1, -1]]) {
    const px = first.lx + dx;
    const py = first.ly + dy;
    if (px < 0 || py < 0 || px >= LOTS || py >= LOTS) continue;
    if (ward.place('park', tileOf(px), tileOf(py)) !== undefined) { parked = true; break; }
  }
  ok(parked, 'a park went up beside the homes');
  ok(ward.owned('park') === 1, 'the ledger counts the park');

  const rateWithPark = ward.rate();
  ok(rateWithPark > rateWithHomes,
    `the park lifts the homes it touches: ${rateWithHomes.toFixed(3)} -> ${rateWithPark.toFixed(3)}`);
  ok(ward.population() > popBefore,
    `and the ward grows: ${popBefore} -> ${ward.population()}`);

  // Night is a boundary, not a curve: shops trade better after dark. The shop
  // needs a lot of its OWN — aimed at a lot that already had a home on it,
  // `place` correctly refuses, the ward ends up with zero shops, and a gate
  // with nothing to scale moves nothing. That is this assertion failing for a
  // reason that is not the gate, which is worth more than one that cannot.
  let shopped = false;
  for (let y = 10; y < LOTS && !shopped; y++) {
    for (let x = 0; x < LOTS && !shopped; x++) {
      if (ward.place('shop', tileOf(x), tileOf(y)) !== undefined) shopped = true;
    }
  }
  ok(shopped && ward.owned('shop') === 1, 'a shop opened somewhere in the ward');
  const dayRate = ward.rate();
  ward.setNight(true);
  ok(ward.night(), 'the ward knows it is dark');
  const nightRate = ward.rate();
  ok(nightRate > dayRate,
    `shops trade better after dark: ${dayRate.toFixed(3)} -> ${nightRate.toFixed(3)}`);
  ward.setNight(false);

  // A snapshot round-trips through a fresh ward, which is what a reload is.
  const snap = ward.snapshot();
  const again = createWard({ coin: snap.coin, lots: snap.lots });
  ok(again.owned('home') === ward.owned('home'), 'homes survive a reload');
  ok(again.owned('park') === ward.owned('park'), 'parks survive a reload');
  ok(again.owned('shop') === ward.owned('shop'), 'shops survive a reload');
  ok(again.population() === ward.population(), 'so does the population');
  ok(Math.abs(again.rate() - ward.rate()) < 0.01, 'and so does the income');

  // Junk in the save is dropped rather than believed.
  const junk = createWard({ coin: 10, lots: [-5, 9999, 0, 1, 1, 7, NaN, 2, 0] });
  ok(junk.owned('home') === 0 && junk.owned('shop') === 0 && junk.owned('park') === 0,
    'nothing impossible is restored');
}

// `validateSounds` returns problems rather than throwing, so a shipped game
// never refuses to start over a sound being 0.03 too loud. That makes checking
// the array somebody's job, and it is this one's.
ok(problems.length === 0, `sound table: ${problems.join('; ')}`);

console.log('chome economy: homes pay, parks lift them, night lifts shops, a save round-trips');
console.log('chome sound: every recipe inside the clipping ceiling');
