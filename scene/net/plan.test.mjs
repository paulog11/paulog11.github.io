// Run: node scene/net/plan.test.mjs
//
// Same spirit as scene/cityLayout.test.mjs: the layout is pure maths, so its
// safety property (a lot cannot collide with a road) is checked without a
// browser. Padded checks that cannot fail on real data are deliberately
// omitted — see the file this replaced in the plan for what got cut and why.
import assert from 'node:assert/strict'
import { roads, rail, districts, MAP_HALF } from './shinjukuNet.js'
import { clearance, lots } from './plan.js'

// ── Every traced point lands inside the map it claims to fill ──────────────
for (const r of roads()) {
  assert.ok(r.pts.length >= 2, `road ${r.id} has fewer than 2 points`)
  for (const [x, z] of r.pts) {
    assert.ok(Math.abs(x) <= MAP_HALF && Math.abs(z) <= MAP_HALF,
      `road ${r.id} point (${x},${z}) escapes MAP_HALF ${MAP_HALF}`)
  }
}
{
  const rl = rail()
  assert.equal(rl.pts.length, rl.widths.length, 'rail pts/widths length mismatch')
  for (const [x, z] of rl.pts) {
    assert.ok(Math.abs(x) <= MAP_HALF && Math.abs(z) <= MAP_HALF,
      `rail point (${x},${z}) escapes MAP_HALF ${MAP_HALF}`)
  }
}
for (const d of districts()) {
  assert.ok(d.poly.length >= 3, `district ${d.id} polygon has fewer than 3 points`)
  for (const [x, z] of d.poly) {
    assert.ok(Math.abs(x) <= MAP_HALF && Math.abs(z) <= MAP_HALF,
      `district ${d.id} point (${x},${z}) escapes MAP_HALF ${MAP_HALF}`)
  }
}

// ── clearance() is well-formed ──────────────────────────────────────────────
// A point far from anything must read strongly positive (outside), and a
// point known to sit ON a traced centreline must read negative (inside) —
// cheap sanity that the segment list actually got built, not left empty.
assert.ok(clearance(MAP_HALF * 3, MAP_HALF * 3).d > 100,
  'a point far outside the map should have large positive clearance')
{
  const rl = rail()
  const [mx, mz] = rl.pts[Math.floor(rl.pts.length / 2)]
  assert.ok(clearance(mx, mz).d < 0, 'a rail centreline vertex should read as inside the corridor')
}

// ── The whole safety property, in one assertion per lot ────────────────────
// lots() is trusted to only keep cells whose circumscribed circle clears
// every road by size*SQRT1_2 + LOT_MARGIN; re-checking without LOT_MARGIN
// (not exported — internal to plan.js) is still a real regression test: it
// fails the instant lots() stops enforcing its own invariant.
const allLots = lots()
for (const l of allLots) {
  assert.ok(clearance(l.x, l.z).d > l.size * Math.SQRT1_2,
    `lot ${l.district}${l.g} at (${l.x},${l.z}) fails its own clearance invariant`)
}

// ── No two lots overlap ─────────────────────────────────────────────────────
// The same conservative circumscribed-circle test lots() uses to clear roads,
// applied pairwise: if two lots' circles don't overlap, the lots themselves
// can't, at ANY rotation either one takes. O(n^2) over ~a few hundred lots is
// cheap, and it is the actual property wanted — it subsumes "district
// polygons don't overlap" without polygon booleans, and without forcing
// districts that must legitimately ABUT (tiling a city) to be literally
// disjoint.
for (let i = 0; i < allLots.length; i++) {
  for (let j = i + 1; j < allLots.length; j++) {
    const a = allLots[i], b = allLots[j]
    const dist = Math.hypot(a.x - b.x, a.z - b.z)
    const minDist = (a.size + b.size) * Math.SQRT1_2
    assert.ok(dist >= minDist - 1e-6,
      `lots ${a.district}${a.g} and ${b.district}${b.g} may overlap: ${dist.toFixed(2)}m apart, need ${minDist.toFixed(2)}m`)
  }
}

// ── lots() is deterministic ─────────────────────────────────────────────────
assert.deepEqual(lots(), allLots, 'lots() is not deterministic')

// ── Lot count is in a sane band ─────────────────────────────────────────────
// Fails loud if a width typo or a malformed district polygon silently wipes
// out a quarter of the city, without pinning an exact count a trace tweak
// would have to keep re-editing.
assert.ok(allLots.length > 50 && allLots.length < 3000,
  `lot count ${allLots.length} is outside the sane band (50, 3000) — check district polygons and lotPitch`)

// ── Network connectivity ────────────────────────────────────────────────────
// A trace whose roads don't quite meet passes every check above and still
// renders as disconnected scratches. Union roads+rail into components by
// endpoint proximity — SNAP is generous (25m) because this is a hand trace
// with an admitted +/-20% calibration tolerance, not survey data; the point
// is to catch a piece that's nowhere NEAR anything else, not to demand
// pixel-exact junctions.
{
  const SNAP = 25
  const elements = [...roads().map((r) => ({ id: r.id, pts: r.pts })), { id: 'rail', pts: rail().pts }]
  const parent = elements.map((_, i) => i)
  const find = (i) => (parent[i] === i ? i : (parent[i] = find(parent[i])))
  const union = (i, j) => { const a = find(i), b = find(j); if (a !== b) parent[a] = b }

  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      outer: for (const [ax, az] of elements[i].pts) {
        for (const [bx, bz] of elements[j].pts) {
          if (Math.hypot(ax - bx, az - bz) <= SNAP) { union(i, j); break outer }
        }
      }
    }
  }
  const roots = new Set(elements.map((_, i) => find(i)))
  assert.equal(roots.size, 1,
    `network has ${roots.size} disconnected components (snap ${SNAP}m) — ` +
    elements.map((e, i) => `${e.id}:${find(i)}`).join(', '))
}

console.log(`ok — ${roads().length} roads, ${rail().pts.length}-pt rail fan, ` +
  `${districts().length} districts, ${allLots.length} lots`)
