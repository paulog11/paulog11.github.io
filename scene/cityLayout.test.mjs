// Run: node scene/cityLayout.test.mjs
//
// cityLayout.js is pure maths with no three.js, which means the geometry that
// everything else trusts can be checked without a browser. These are the
// invariants the rest of the scene assumes and would break silently on:
// buildings must not stand in the road, two projects must not share a lot, and
// the map must not outgrow the camera frustum it was sized for.
import assert from 'node:assert/strict'
import {
  BLOCK, STREET, LOT, LOT_PITCH, MAP_HALF, blockCenter, lotOffset, lotCenter,
  STREET_LINES, PROJECT_SITES, GOLDEN_GAI_CELL, STATION, fillerBuildings,
} from './cityLayout.js'

const overlaps1D = (aC, aHalf, bC, bHalf) => aC - aHalf < bC + bHalf && aC + aHalf > bC - bHalf

// ── The lattice closes ───────────────────────────────────────────────────────
assert.equal(3 * LOT + 2 * (LOT_PITCH - LOT), BLOCK, 'lots must tile the block exactly')
assert.deepEqual([0, 1, 2].map(blockCenter), [-56, 0, 56])
assert.deepEqual(STREET_LINES, [-84, -28, 28, 84])
assert.equal(MAP_HALF, 89)

for (const j of [0, 1, 2]) {
  assert.ok(Math.abs(lotOffset(j)) + LOT / 2 <= BLOCK / 2, `lot ${j} escapes its block`)
}

// ── Nothing stands in the road ───────────────────────────────────────────────
for (const i of [0, 1, 2]) {
  for (const s of STREET_LINES) {
    assert.ok(!overlaps1D(blockCenter(i), BLOCK / 2, s, STREET / 2),
      `block ${i} overlaps the street at ${s}`)
  }
}

// ── Project sites are well-formed ────────────────────────────────────────────
assert.equal(PROJECT_SITES.length, 9)
assert.equal(new Set(PROJECT_SITES.map((p) => p.id)).size, 9, 'duplicate project id')
assert.equal(new Set(PROJECT_SITES.map((p) => `${p.cell}|${p.lot}`)).size, 9,
  'two projects share a lot')
for (const p of PROJECT_SITES) {
  assert.notEqual(String(p.cell), String(GOLDEN_GAI_CELL),
    `${p.id} is in the Golden Gai block, which is deliberately not clickable`)
  assert.notEqual(String(p.cell), String(STATION.cell), `${p.id} is inside the station`)
}

// ── The filler generator behaves ─────────────────────────────────────────────
const filler = fillerBuildings()
const projectLots = new Set(
  PROJECT_SITES.map((p) => { const c = lotCenter(p.cell, p.lot); return `${c.x},${c.z}` }),
)
for (const b of filler) {
  assert.ok(!projectLots.has(`${b.x},${b.z}`), 'filler building sits on a project lot')
  assert.ok(Math.abs(b.x) + b.w / 2 <= MAP_HALF && Math.abs(b.z) + b.d / 2 <= MAP_HALF,
    'filler building escapes the map')
  for (const s of STREET_LINES) {
    assert.ok(!overlaps1D(b.x, b.w / 2, s, STREET / 2), 'filler building spills into a street (x)')
    assert.ok(!overlaps1D(b.z, b.d / 2, s, STREET / 2), 'filler building spills into a street (z)')
  }
}

// Determinism: the same seed twice must give the same city, or screenshots and
// visual regressions mean nothing.
assert.deepEqual(fillerBuildings(), filler, 'fillerBuildings() is not deterministic')

console.log(`ok — ${filler.length} filler + ${PROJECT_SITES.length} project buildings`)
