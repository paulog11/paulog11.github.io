// The derived layout: "can something stand here?" answered by ONE function,
// clearance(), that both the lot generator below and streets.js's painter
// agree with. Pure maths, no three.js — same contract cityLayout.js keeps,
// same reason: node-testable without a renderer.
import { roads, rail, districts, SIDEWALK_W } from './shinjukuNet.js'

// A lot standing exactly at its margin shouldn't touch the painted sidewalk
// band — SIDEWALK_W is already folded into each segment's halfWidth below, so
// this is a small EXTRA buffer on top of that, not a duplicate of it.
const LOT_MARGIN = 1
// size = lotPitch * SIZE_FRACTION, NOT lotPitch - a fixed gap (cityLayout.js's
// own LOT_PITCH-LOT=2m convention) — a fixed metre gap is a shrinking fraction
// of a bigger pitch, so at this file's largest district (nishi, ~15m scaled
// pitch) a 2m gap would leave size/pitch = 0.87, blowing well past the 1/sqrt2
// (~0.707) bound two independently-rotated adjacent lots need to guarantee
// they can't touch (worst case: both point a corner straight at each other
// along the line joining centres, reach = 2*size*SQRT1_2 <= lotPitch). 0.65
// clears that bound with margin at every district's own pitch.
const SIZE_FRACTION = 0.65

// Every road/rail segment, flattened once. roads()/rail() are pure functions
// of static data, so this never needs to be recomputed.
//
// ponytail: brute-force O(segments) per clearance() query, no spatial index.
// ~150 segments here; an 850-cell lot grid is ~130k distance checks (instant
// in a build step). Bucket into a uniform grid only if the segment count
// passes ~500 — see cityLayout.js's own header for why this file stays pure
// data + maths rather than reaching for real computational geometry early.
const SEGMENTS = buildSegments()

function buildSegments() {
  const segs = []
  for (const r of roads()) {
    const halfW = r.w / 2 + SIDEWALK_W
    for (let i = 0; i < r.pts.length - 1; i++) {
      const [ax, az] = r.pts[i], [bx, bz] = r.pts[i + 1]
      segs.push({ ax, az, bx, bz, halfW })
    }
  }
  const rl = rail()
  for (let i = 0; i < rl.pts.length - 1; i++) {
    const [ax, az] = rl.pts[i], [bx, bz] = rl.pts[i + 1]
    // max(), not lerp: a linearly-tapered segment is the SDF of a round
    // CONE, not `dist - lerp(w0,w1)` — the naive lerp overestimates
    // clearance on a steep taper (up to ~2.5% on this trace's steepest fan
    // segment). max() is conservative and costs one token.
    const halfW = Math.max(rl.widths[i], rl.widths[i + 1]) / 2 + SIDEWALK_W
    segs.push({ ax, az, bx, bz, halfW })
  }
  return segs
}

function distToSegment(px, pz, s) {
  const abx = s.bx - s.ax, abz = s.bz - s.az
  const apx = px - s.ax, apz = pz - s.az
  const abLenSq = abx * abx + abz * abz
  const t = abLenSq > 0 ? Math.max(0, Math.min(1, (apx * abx + apz * abz) / abLenSq)) : 0
  const cx = s.ax + t * abx, cz = s.az + t * abz
  return { dist: Math.hypot(px - cx, pz - cz), angle: Math.atan2(abz, abx) }
}

/**
 * Signed metres to the nearest road/rail EDGE (negative = inside it), and
 * that road's bearing — the nearest segment is already found, so its
 * direction is a free per-lot yaw, correct on curves and at district
 * boundaries in a way one yaw-per-district could never be (a district
 * contains many street directions; a curved arterial changes bearing along
 * its own length).
 */
export function clearance(x, z) {
  let best = Infinity, bestAngle = 0
  for (const s of SEGMENTS) {
    const { dist, angle } = distToSegment(x, z, s)
    const c = dist - s.halfW
    if (c < best) { best = c; bestAngle = angle }
  }
  return { d: best, angle: bestAngle }
}

function pointInPolygon(x, z, poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j]
    const crosses = (zi > z) !== (zj > z)
    if (crosses && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside
  }
  return inside
}

/**
 * Every buildable lot, deterministic. A regular grid at each district's OWN
 * lotPitch, in world axes (the grid itself doesn't rotate — only the kept
 * lots do, via clearance().angle). A cell survives if its centre sits inside
 * the district polygon and its CIRCUMSCRIBED CIRCLE clears every road with
 * margin: testing the four corners instead (an earlier draft's approach) is
 * unsound — an axis-aligned road straight through a lot's centre clears all
 * four corners while running through the building. The circumscribed-circle
 * test is yaw-independent, which is what lets a kept lot freely take its own
 * nearest-street rotation without reopening the overlap question, given
 * size <= lotPitch/sqrt(2) so rotated neighbours can't touch.
 *
 * That bound only guarantees safety WITHIN one district's own regular grid
 * (adjacent cells are always exactly lotPitch apart). Two districts abut
 * along a shared edge with independent pitches and independent grid phase —
 * nothing stops a lot from each side landing close together right at that
 * boundary. So candidates are collected per-district first, then accepted in
 * one deterministic pass that also checks each new lot against every
 * ALREADY-accepted lot (any district): this is what actually makes "no two
 * lots overlap" true of the output, not just something the district-local
 * math happens to arrange most of the time.
 */
export function lots() {
  const candidates = []
  for (const d of districts()) {
    if (d.kind === 'park' || !d.lotPitch) continue
    const size = d.lotPitch * SIZE_FRACTION
    // Circumradius of a `size` square is size*sin(45deg) = size*SQRT1_2 — the
    // FULL half-diagonal, not halved again. An earlier draft divided by 2
    // here too, which would have quietly reopened the same unsoundness the
    // circumscribed-circle test exists to close.
    const need = size * Math.SQRT1_2 + LOT_MARGIN
    const xs = d.poly.map((p) => p[0]), zs = d.poly.map((p) => p[1])
    const minX = Math.min(...xs), maxX = Math.max(...xs)
    const minZ = Math.min(...zs), maxZ = Math.max(...zs)
    let gx = 0
    for (let cx = minX + d.lotPitch / 2; cx < maxX; cx += d.lotPitch, gx++) {
      let gz = 0
      for (let cz = minZ + d.lotPitch / 2; cz < maxZ; cz += d.lotPitch, gz++) {
        if (!pointInPolygon(cx, cz, d.poly)) continue
        const c = clearance(cx, cz)
        if (c.d > need) candidates.push({ district: d.id, g: [gx, gz], x: cx, z: cz, size, yaw: c.angle })
      }
    }
  }

  const out = []
  for (const cand of candidates) {
    const conflicts = out.some((kept) => {
      const dist = Math.hypot(cand.x - kept.x, cand.z - kept.z)
      return dist < (cand.size + kept.size) * Math.SQRT1_2
    })
    if (!conflicts) out.push(cand)
  }
  return out
}
