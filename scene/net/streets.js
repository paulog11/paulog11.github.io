// The painted ground for the traced Shinjuku network. Where street.js builds
// roads as geometry (quads + kerb boxes + tree meshes), this paints the whole
// network into ONE Canvas2D texture on ONE plane: `min over segments of
// (dist - halfWidth)` — plan.js's clearance() — is precisely the region
// Canvas2D strokes with `lineCap:'round'`/`lineJoin:'round'`. Same shape, two
// representations, no fitting constant. Curves and junctions fall out of
// ctx.stroke() for free; there is no per-road quad, no kerb box, no z-fighting
// to manage between an intersection square and the streets crossing it.
//
// This buys draw calls back at the cost of texel density: 2048px over 500m is
// ~4.1 px/m in both axes, against street.js's 25.6 px/m ACROSS a road (its
// 256px atlas over a 10m cross-section). Every marking width below is
// specified in scene metres and deliberately exaggerated for that reason —
// see the widths inline. This is a caricature at MAP_SCALE (~0.6) with an
// ~8.4m legibility floor; exaggerating paint is consistent with exaggerating
// street width (shinjukuNet.js's MIN_ROAD_W), not a compromise layered on it.
import * as THREE from 'three'
import { MAP_HALF, SIDEWALK_W, roads, rail, districts } from './shinjukuNet.js'
import { ASPHALT } from '../palette.js'

// Local copies of street.js's private literals (not exported there, and
// street.js is deliberately left untouched — see CLAUDE.md: nothing in
// scene/ is overwritten by this addition). Same VALUES, so the two networks
// still read as one city if they're ever shown side by side.
const GROUND_COLOR = 0x6b6a5f
const SIDEWALK_COLOR = 0xcbd0d3
const KERB_COLOR = 0x2a2c33
const RAIL_BED_COLOR = 0x9c9285   // no analogue in street.js — that corridor is a 3D trench, not paint
// Barely-different-from-GROUND_COLOR tints per district `kind`, so a district
// with no traced road running through most of it still reads as CHARACTER
// rather than void: a first pass painted only roads + a green park fill, and
// the huge gaps between ~21 hand-traced roads over a 500m map read as
// scattered fragments floating in blank ground. This is a ground hint, not a
// building — deliberately subtle so it doesn't compete with roads once
// buildings eventually land on top of it.
const KIND_TINT = {
  tower: 0x63665f,     // nishi — cooler, slightly darker
  dense: 0x77705f,     // kabukicho — warmer
  midrise: GROUND_COLOR,
  park: 0x8fae6a,       // gyoen; no analogue in street.js, which has no park district
}

const hex = (n) => '#' + n.toString(16).padStart(6, '0')

// Deterministic LCG — same idiom as street.js/cityLayout.js, so grime is
// stable across reloads.
let seed = 20260811
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

// Exaggerated marking widths, in scene metres — see the module header. Real
// street.js widths (0.23m dash, 1.4m sidewalk) would be under 1 texel here.
const DASH_W = 1.2
const DASH_LEN = 8, DASH_GAP = 6
const KERB_LINE_W = 1
const MIN_MARKED_W = 12   // roads narrower than this (the floored secondary
                            // class, 9m) skip a centreline — too crowded

const ATLAS_PX = { high: 2048, low: 1024 }

function strokePath(ctx, pts, toPx) {
  ctx.beginPath()
  pts.forEach(([x, z], i) => {
    const [px, pz] = toPx(x, z)
    if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz)
  })
  ctx.stroke()
}

function paintNetwork(ctx, size) {
  const scale = size / (2 * MAP_HALF)
  const toPx = (x, z) => [size / 2 + x * scale, size / 2 + z * scale]

  // 1. base ground + district fills, each district tinted by KIND_TINT.
  ctx.fillStyle = hex(GROUND_COLOR)
  ctx.fillRect(0, 0, size, size)
  for (const d of districts()) {
    ctx.fillStyle = hex(KIND_TINT[d.kind] ?? GROUND_COLOR)
    ctx.beginPath()
    d.poly.forEach(([x, z], i) => {
      const [px, pz] = toPx(x, z)
      if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz)
    })
    ctx.closePath()
    ctx.fill()
  }

  // 2. rail bed, filled polygon from per-vertex offsets along each segment's
  // normal. Painted BEFORE roads so every road/rail crossing reads as a
  // bridge over the corridor — the same relationship cityLayout.js's station
  // design describes ("the four E-W streets become road bridges over the
  // corridor for free"), just achieved by paint order instead of grade.
  // ponytail: flat fill only, no rail/tie texture — the trench itself (and
  // anything that would earn ballast detail) belongs to whenever station.js
  // is ported; painting texture for a station that doesn't exist yet is
  // speculative. See scene/station.js for the real corridor treatment.
  {
    const rl = rail()
    const left = [], right = []
    for (let i = 0; i < rl.pts.length; i++) {
      const [x, z] = rl.pts[i]
      const [px1, pz1] = rl.pts[Math.max(0, i - 1)]
      const [px2, pz2] = rl.pts[Math.min(rl.pts.length - 1, i + 1)]
      const dx = px2 - px1, dz = pz2 - pz1
      const len = Math.hypot(dx, dz) || 1
      const nx = -dz / len, nz = dx / len
      const hw = rl.widths[i] / 2
      left.push([x + nx * hw, z + nz * hw])
      right.push([x - nx * hw, z - nz * hw])
    }
    ctx.fillStyle = hex(RAIL_BED_COLOR)
    ctx.beginPath()
    const poly = [...left, ...right.reverse()]
    poly.forEach(([x, z], i) => {
      const [px, pz] = toPx(x, z)
      if (i === 0) ctx.moveTo(px, pz); else ctx.lineTo(px, pz)
    })
    ctx.closePath()
    ctx.fill()
  }

  // 3-5. kerb line -> sidewalk band -> asphalt, widest road first WITHIN
  // each layer so a narrow road's kerb never gets buried by a wide road's
  // asphalt painted after it. Sorting by width achieves the same ordering
  // street.js's explicit road-class loop does, without needing road class
  // exposed through the accessor (roads() already returns width pre-sorted
  // by nothing in particular, so this file owns the order).
  const sorted = [...roads()].sort((a, b) => b.w - a.w)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.strokeStyle = hex(KERB_COLOR)
  for (const r of sorted) {
    ctx.lineWidth = (r.w + 2 * SIDEWALK_W + KERB_LINE_W) * scale
    strokePath(ctx, r.pts, toPx)
  }
  ctx.strokeStyle = hex(SIDEWALK_COLOR)
  for (const r of sorted) {
    ctx.lineWidth = (r.w + 2 * SIDEWALK_W) * scale
    strokePath(ctx, r.pts, toPx)
  }
  ctx.strokeStyle = hex(ASPHALT)
  for (const r of sorted) {
    ctx.lineWidth = r.w * scale
    strokePath(ctx, r.pts, toPx)
  }

  // 6. lane markings, then grime. Crosswalks at junction nodes are deferred —
  // detecting junctions (where traced polylines actually cross) is real work
  // this streets-only foundational pass doesn't need to do yet; nothing
  // downstream depends on it.
  ctx.strokeStyle = 'rgba(255,255,255,0.85)'
  ctx.lineWidth = DASH_W * scale
  ctx.setLineDash([DASH_LEN * scale, DASH_GAP * scale])
  for (const r of sorted) {
    if (r.w < MIN_MARKED_W) continue
    strokePath(ctx, r.pts, toPx)
  }
  ctx.setLineDash([])

  ctx.fillStyle = 'rgba(0,0,0,0.10)'
  for (let i = 0; i < 220; i++) {
    const w = 6 + rnd() * 26, h = 5 + rnd() * 18
    ctx.fillRect(rnd() * size, rnd() * size, w, h)
  }
}

function tex(canvas) {
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = THREE.SRGBColorSpace
  // Non-optional: the ground is viewed at 22deg elevation, so the
  // foreshortened axis drives mip selection. Without this the sampler lands
  // around mip 3 (effective 256^2 over 500m) and every marking disappears.
  t.anisotropy = 8
  return t
}

/**
 * Returns { group, painted }. `painted` is the single textured plane that
 * carries the whole network — pass it to createOutlines' `skip` list, or its
 * four boundary edges draw a hard dark rectangle around the map perimeter
 * (EdgesGeometry keeps every unmatched boundary edge of a plain
 * PlaneGeometry).
 */
export function createStreetNet(quality = 'high') {
  const group = new THREE.Group()

  // Backdrop base plane, same trick street.js's buildGround() uses
  // (GROUND_SIZE = 4*MAP_HALF): big enough that its own corners stay off
  // frame even at minZoom, so the painted plane never appears to float over
  // void ground.
  const baseGeo = new THREE.PlaneGeometry(4 * MAP_HALF, 4 * MAP_HALF)
  baseGeo.rotateX(-Math.PI / 2)
  const base = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: GROUND_COLOR }))
  base.position.y = -0.04
  group.add(base)

  const size = ATLAS_PX[quality] ?? ATLAS_PX.high
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  paintNetwork(canvas.getContext('2d'), size)

  const mapGeo = new THREE.PlaneGeometry(2 * MAP_HALF, 2 * MAP_HALF)
  mapGeo.rotateX(-Math.PI / 2)
  // map-only material: no emissive/emissiveMap. street.js's road keeps one
  // only because its emissiveMap canvas is solid black (a documented no-op,
  // emissive x intensity x black = 0) — carrying that pattern here would add
  // a texture and possibly a shader program for zero visual effect.
  const material = new THREE.MeshLambertMaterial({ map: tex(canvas) })
  const painted = new THREE.Mesh(mapGeo, material)
  group.add(painted)

  return { group, painted }
}
