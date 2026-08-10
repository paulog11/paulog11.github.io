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
  STREET_LINES, PROJECT_SITES, LANDMARK_SITES,
  SCENERY_SITES, STATION_FLANK_SITES, lotGroupCenter,
  GOLDEN_GAI_CELL, STATION, CORRIDOR_W, TRACK_SPACING, PLATFORM_XS, PLATFORM_W,
  fillerBuildings,
} from './cityLayout.js'

const inStation = (cell) => STATION.cells.some((c) => String(c) === String(cell))

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
  assert.ok(!inStation(p.cell), `${p.id} is inside the station`)
}

// lotGroupCenter reduces to lotCenter for a single-lot group.
assert.deepEqual(lotGroupCenter([1, 0], [[2, 1]]), lotCenter([1, 0], [2, 1]))

// ── Landmark sites are well-formed and collide with nothing ─────────────────
assert.equal(LANDMARK_SITES.length, 2)
assert.equal(new Set(LANDMARK_SITES.map((s) => s.id)).size, 2, 'duplicate landmark id')

const projectLotKeys = new Set(PROJECT_SITES.map((p) => `${p.cell}|${p.lot}`))
const landmarkLotKeys = new Set()
for (const s of LANDMARK_SITES) {
  assert.notEqual(String(s.cell), String(GOLDEN_GAI_CELL),
    `${s.id} is in the Golden Gai block`)
  assert.ok(!inStation(s.cell), `${s.id} is inside the station`)
  for (const lot of s.lots) {
    const key = `${s.cell}|${lot}`
    assert.ok(!projectLotKeys.has(key), `${s.id} lot ${lot} collides with a project`)
    assert.ok(!landmarkLotKeys.has(key), `${s.id} lot ${lot} collides with another landmark`)
    landmarkLotKeys.add(key)
  }
}

// ── Street scenery claims real lots and collides with nothing ────────────────
const sceneryLotKeys = new Set()
for (const s of SCENERY_SITES) {
  assert.notEqual(String(s.cell), String(GOLDEN_GAI_CELL), `scenery ${s.id} is inside Golden Gai`)
  assert.ok(!inStation(s.cell), `scenery ${s.id} is inside the station`)
  const key = `${s.cell}|${s.lot}`
  assert.ok(!projectLotKeys.has(key), `scenery ${s.id} lot ${s.lot} collides with a project`)
  assert.ok(!landmarkLotKeys.has(key), `scenery ${s.id} lot ${s.lot} collides with a landmark`)
  assert.ok(!sceneryLotKeys.has(key), `scenery ${s.id} lot ${s.lot} collides with other scenery`)
  sceneryLotKeys.add(key)
}

// ── Station flank buildings claim real lots and collide with nothing ────────
const flankLotKeys = new Set()
for (const s of STATION_FLANK_SITES) {
  assert.notEqual(String(s.cell), String(GOLDEN_GAI_CELL), `flank building at ${s.cell}|${s.lot} is inside Golden Gai`)
  assert.ok(!inStation(s.cell), `flank building at ${s.cell}|${s.lot} is inside the station`)
  const key = `${s.cell}|${s.lot}`
  assert.ok(!projectLotKeys.has(key), `flank building ${key} collides with a project`)
  assert.ok(!landmarkLotKeys.has(key), `flank building ${key} collides with a landmark`)
  assert.ok(!sceneryLotKeys.has(key), `flank building ${key} collides with scenery`)
  assert.ok(!flankLotKeys.has(key), `flank building ${key} collides with another flank building`)
  assert.ok(s.w <= LOT && s.d <= LOT, `flank building ${key} footprint exceeds its lot budget`)
  flankLotKeys.add(key)
}

// ── No filler ever lands in the Golden Gai block ─────────────────────────────
// fillerBuildings() is trusted to skip GOLDEN_GAI_CELL entirely (alley.js
// builds that block itself), but nothing previously asserted it — a real gap
// found while adding STATION_FLANK_SITES, which could easily have been
// mis-pointed at [2,2] instead of [1,2].
for (const b of fillerBuildings()) {
  const { x: ggx, z: ggz } = lotCenter(GOLDEN_GAI_CELL, [1, 1])
  const half = BLOCK / 2
  assert.ok(
    Math.abs(b.x - ggx) > half || Math.abs(b.z - ggz) > half,
    `filler building at (${b.x},${b.z}) lands inside the Golden Gai block`,
  )
}

// ── The rail corridor packs inside the station's own width ──────────────────
// Six tracks + three islands must fit inside CORRIDOR_W without the platform
// envelope spilling past the retaining walls.
{
  const trackXs = Array.from({ length: STATION.trackCount },
    (_, t) => (t - (STATION.trackCount - 1) / 2) * TRACK_SPACING)
  const envelopeHalf = Math.max(...trackXs.map(Math.abs)) + TRACK_SPACING / 2
  assert.ok(envelopeHalf * 2 <= CORRIDOR_W,
    `track envelope (${envelopeHalf * 2}m) exceeds the corridor (${CORRIDOR_W}m)`)
  assert.equal(PLATFORM_XS.length, 3, 'expected 3 island platforms')
  for (const px of PLATFORM_XS) {
    // Each island must sit centred in a real gap between two adjacent tracks
    // without overlapping either railhead.
    const nearest = trackXs.map((tx) => Math.abs(tx - px)).sort((a, b) => a - b)
    assert.ok(nearest[0] >= PLATFORM_W / 2,
      `platform at x=${px} overlaps its nearest track (gap ${nearest[0]}m < half-width ${PLATFORM_W / 2}m)`)
  }
  // No two islands may overlap each other.
  const sortedXs = [...PLATFORM_XS].sort((a, b) => a - b)
  for (let i = 1; i < sortedXs.length; i++) {
    assert.ok(sortedXs[i] - sortedXs[i - 1] >= PLATFORM_W,
      `platforms at x=${sortedXs[i - 1]} and x=${sortedXs[i]} overlap`)
  }
}

// ── The filler generator behaves ─────────────────────────────────────────────
const filler = fillerBuildings()
const projectLots = new Set(
  PROJECT_SITES.map((p) => { const c = lotCenter(p.cell, p.lot); return `${c.x},${c.z}` }),
)
const landmarkLots = new Set(
  LANDMARK_SITES.flatMap((s) => s.lots.map((lot) => {
    const c = lotCenter(s.cell, lot); return `${c.x},${c.z}`
  })),
)
const sceneryLots = new Set(
  SCENERY_SITES.map((s) => { const c = lotCenter(s.cell, s.lot); return `${c.x},${c.z}` }),
)
for (const b of filler) {
  assert.ok(!projectLots.has(`${b.x},${b.z}`), 'filler building sits on a project lot')
  assert.ok(!landmarkLots.has(`${b.x},${b.z}`), 'filler building sits on a landmark lot')
  assert.ok(!sceneryLots.has(`${b.x},${b.z}`), 'filler building sits on a scenery lot')
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

console.log(`ok — ${filler.length} filler + ${PROJECT_SITES.length} project + ${LANDMARK_SITES.length} landmark + ${SCENERY_SITES.length} scenery`)
