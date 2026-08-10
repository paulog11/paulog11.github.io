// The road network for the 3x3 block grid. Ground, roads, kerbs and street
// trees all live here; the buildings and station are other modules' concern.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  BLOCK, STREET, MAP_HALF, blockCenter, STREET_LINES, CORRIDOR_W,
  DIAMOND_CELL, DIAMOND_OUTER_SIDE,
} from './cityLayout.js'
import { ASPHALT } from './palette.js'

// Canvas2D wants a CSS string; palette values are hex numbers.
const hex = (n) => '#' + n.toString(16).padStart(6, '0')

// Deterministic LCG — same idiom as cityLayout.js/ambient.js — so texture
// grime, per-slab mirroring and light-pool scatter are stable across renders.
let seed = 20260731
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

// ── Road surface atlas ───────────────────────────────────────────────────────
// One shared texture for the whole network. Top half is the "through" band —
// sampled only by the full-length strips that own the intersections — bottom
// half is the "segment" band the block-edge fillers use. Splitting by band
// rather than by texture keeps the network to one material/one draw call.
const ATLAS_W = 256                 // road cross-section (10m)
const ATLAS_H = 1200
const BAND_H = ATLAS_H / 2
const DASH_PERIOD_M = 7             // dash+gap rhythm, in world metres — kept
                                     // constant so through-strips and segments
                                     // read at the same rhythm despite the two
                                     // bands having different px-per-metre.
const SIDEWALK_W = 1.4              // sidewalk band width (m), painted into
                                     // both edges of the road atlas. Must stay
                                     // above ~0.72m: KERB_T/2 (0.2m) protrudes
                                     // into this band from the block-edge line,
                                     // and tree trunks (below) sit centred in
                                     // it — SIDEWALK_W/2 - 0.2 must exceed the
                                     // trunk's 0.16m max radius to clear it.
const SIDEWALK_COLOR = 0xcbd0d3     // light cool paving grey

function paintDashes(ctx, top, bottom, worldLen) {
  const span = bottom - top
  const count = Math.max(1, Math.round(worldLen / DASH_PERIOD_M))
  const cellH = span / count
  const cx = ATLAS_W / 2
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  for (let i = 0; i < count; i++) {
    // Jittered offset/length so the rhythm reads as painted, not extruded.
    const y = top + i * cellH + (rnd() - 0.5) * cellH * 0.2
    const h = cellH * (0.42 + rnd() * 0.2)
    ctx.fillRect(cx - 3, Math.max(top, y), 6, Math.min(h, bottom - y))
  }
}

// A give-way box at a real intersection. Painted only in the through band —
// the crossing street's own quad stops short of this square (see
// buildRoadNetwork), so this is the only geometry that will ever cover it,
// and the marking has to carry both streets' stop lines.
function paintCrossing(ctx, centerY) {
  const pxPerMetreV = BAND_H / (2 * MAP_HALF)
  const half = (STREET / 2) * pxPerMetreV
  const top = centerY - half

  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  ctx.fillRect(0, top, ATLAS_W, half * 2)

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  const barU = ATLAS_W * 0.08
  const inset = half * 0.55
  // this street's zebra crossing: repeating stripes across the full square,
  // same perpendicular orientation the old stop-line bars used
  const stripeCount = 5
  const cell = (half * 2) / stripeCount
  const stripeH = cell * 0.5
  for (let i = 0; i < stripeCount; i++) {
    const y = top + i * cell + (cell - stripeH) / 2
    ctx.fillRect(0, y, ATLAS_W, stripeH)
  }
  // the crossing street's stop lines — its own quad never reaches this square
  ctx.fillRect(ATLAS_W / 2 - inset, top, barU, half * 2)
  ctx.fillRect(ATLAS_W / 2 + inset - barU, top, barU, half * 2)
}

function buildRoadAtlas() {
  const map = document.createElement('canvas')
  map.width = ATLAS_W; map.height = ATLAS_H
  const emi = document.createElement('canvas')
  emi.width = ATLAS_W; emi.height = ATLAS_H
  const g = map.getContext('2d')
  const ge = emi.getContext('2d')

  // Sidewalk band on both edges of the cross-section, asphalt narrowed to the
  // middle sub-range between them.
  const sidewalkPx = SIDEWALK_W * (ATLAS_W / STREET)
  g.fillStyle = hex(SIDEWALK_COLOR)
  g.fillRect(0, 0, sidewalkPx, ATLAS_H)
  g.fillRect(ATLAS_W - sidewalkPx, 0, sidewalkPx, ATLAS_H)
  g.fillStyle = hex(ASPHALT)
  g.fillRect(sidewalkPx, 0, ATLAS_W - 2 * sidewalkPx, ATLAS_H)
  ge.fillStyle = '#000'; ge.fillRect(0, 0, ATLAS_W, ATLAS_H)

  // Worn patches, kept subtle — the light pools carry the scene's real
  // "alive" variation, this just stops the fill from reading as flat colour.
  g.fillStyle = 'rgba(0,0,0,0.12)'
  for (let i = 0; i < 140; i++) {
    const w = 8 + rnd() * 34, h = 6 + rnd() * 22
    g.fillRect(rnd() * ATLAS_W, rnd() * ATLAS_H, w, h)
  }

  paintDashes(g, 0, BAND_H, 2 * MAP_HALF)   // through band: full map length
  paintDashes(g, BAND_H, ATLAS_H, BLOCK)     // segment band: one block width

  // ponytail: one shared atlas + per-slab mirroring (see roadSlab) gives 2
  // pattern variants per band, not full per-instance uniqueness — the map is
  // small enough (12 segments, 4 strips) that a careful look could spot two
  // mirrored twins. A per-instance grime layer would fix it if that ever
  // actually bugs someone; light pools are doing the heavy lifting for "alive".
  for (const s of STREET_LINES) {
    paintCrossing(g, ((s + MAP_HALF) / (2 * MAP_HALF)) * BAND_H)
  }

  // Dry daytime road: no wet-asphalt neon reflections. emi stays a plain
  // black canvas, so the road material's emissiveMap contributes nothing.
  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(map), emissiveMap: tex(emi) }
}

// ── Road network geometry ────────────────────────────────────────────────────
// `swap` trades which default PlaneGeometry axis (U = across width, V = along
// length) feeds the atlas: through-strips run along Z so their own U/V line up
// with the atlas already; segments run along X, so U/V have to be swapped
// before landing in the (fixed U=width, V=length) atlas convention.
function bakeUV(geo, swap, flip, band) {
  const uv = geo.attributes.uv
  for (let i = 0; i < uv.count; i++) {
    let a = uv.getX(i), b = uv.getY(i)
    if (swap) { const t = a; a = b; b = t }
    if (flip) b = 1 - b   // safe: the intersection marks are painted at
                          // symmetric fractions (see cityLayout.test check),
                          // so a mirrored strip still lands on real marks.
    uv.setXY(i, a, band === 'through' ? b * 0.5 : 0.5 + b * 0.5)
  }
}

function roadSlab(width, length, cx, cz, { swap, band }) {
  const geo = new THREE.PlaneGeometry(width, length)
  bakeUV(geo, swap, rnd() < 0.5, band)
  geo.rotateX(-Math.PI / 2)
  geo.translate(cx, 0, cz)
  return geo
}

function buildRoadNetwork() {
  const quads = []
  const span = 2 * MAP_HALF

  // Full-length strips own every intersection square on the map. Nothing else
  // is allowed to cover that ground, which is what keeps the crossings from
  // z-fighting.
  for (const line of STREET_LINES) {
    quads.push(roadSlab(STREET, span, line, 0, { swap: false, band: 'through' }))
  }

  // The perpendicular streets stop at the block edge instead of running
  // through, so they never re-cover a square the strip above already owns.
  for (const line of STREET_LINES) {
    for (const col of [0, 1, 2]) {
      quads.push(roadSlab(BLOCK, STREET, blockCenter(col), line, { swap: true, band: 'segment' }))
    }
  }

  const geometry = mergeGeometries(quads)
  const { map, emissiveMap } = buildRoadAtlas()
  const material = new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.5,
  })
  return new THREE.Mesh(geometry, material)
}

// ── Ground + kerbs ───────────────────────────────────────────────────────────
const GROUND_SIZE = 4 * MAP_HALF   // reaches well past the map edge so the
                                    // backdrop towers and crowd have ground
                                    // under them instead of floating in void
const GROUND_COLOR = 0x6b6a5f

function buildGround() {
  // The rail corridor (station.js) sits below this plane in a trench, so cut
  // a corridor-shaped hole rather than papering over it — a plain
  // PlaneGeometry can't have a hole, hence Shape+Path triangulated via
  // ShapeGeometry (same rotateX(-PI/2) convention as roadSlab() below).
  const outer = new THREE.Shape()
  outer.moveTo(-GROUND_SIZE / 2, -GROUND_SIZE / 2)
  outer.lineTo(GROUND_SIZE / 2, -GROUND_SIZE / 2)
  outer.lineTo(GROUND_SIZE / 2, GROUND_SIZE / 2)
  outer.lineTo(-GROUND_SIZE / 2, GROUND_SIZE / 2)
  outer.closePath()
  const hole = new THREE.Path()
  const hw = CORRIDOR_W / 2, hl = MAP_HALF   // hole spans the corridor, full map length
  hole.moveTo(-hw, -hl)
  hole.lineTo(hw, -hl)
  hole.lineTo(hw, hl)
  hole.lineTo(-hw, hl)
  hole.closePath()
  outer.holes.push(hole)

  const geo = new THREE.ShapeGeometry(outer)
  geo.rotateX(-Math.PI / 2)
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: GROUND_COLOR }))
  mesh.position.y = -0.04   // strictly under the road slab — coplanar at y=0
                            // would flicker against it
  return mesh
}

const KERB_H = 0.16, KERB_T = 0.4
const KERB_COLOR = 0x2a2c33

// Per-block edge data shared by buildKerbs() and buildTrees(). `angle` is the
// direction (radians, atan2 convention over x/z) the edge runs ALONG — 0 for a
// north/south edge, PI/2 for east/west; `ox,oz` is the outward unit vector —
// away from the block, into the street — replacing the old bare `dir` sign so
// a rotated edge can point outward along a diagonal too. col 1 is the
// station's column (STATION.cells are [0,1],[1,1],[2,1]): its east/west edges
// now overhang the open rail corridor, so they're skipped there. North/south
// edges exist for every block.
//
// DIAMOND_CELL gets 4 rotated edges instead of the usual 4 axis-aligned ones:
// the diamond's own sides, each DIAMOND_OUTER_SIDE long, connecting corners
// that sit at the cell's own edge midpoints (so the diamond's points just
// touch the square it replaces). This is a special case for that one cell —
// every other block keeps the plain axis-aligned edges above.
function blockEdges() {
  const half = BLOCK / 2
  const edges = []
  for (const row of [0, 1, 2]) {
    for (const col of [0, 1, 2]) {
      const bx = blockCenter(col), bz = blockCenter(row)
      if (row === DIAMOND_CELL[0] && col === DIAMOND_CELL[1]) {
        const corners = [
          [bx, bz - half],   // N
          [bx + half, bz],   // E
          [bx, bz + half],   // S
          [bx - half, bz],   // W
        ]
        for (let i = 0; i < 4; i++) {
          const [x1, z1] = corners[i]
          const [x2, z2] = corners[(i + 1) % 4]
          const mx = (x1 + x2) / 2, mz = (z1 + z2) / 2
          edges.push({
            x: mx, z: mz, len: DIAMOND_OUTER_SIDE,
            angle: Math.atan2(z2 - z1, x2 - x1),
            ox: (mx - bx) / (DIAMOND_OUTER_SIDE / 2),
            oz: (mz - bz) / (DIAMOND_OUTER_SIDE / 2),
          })
        }
        continue
      }
      edges.push({ x: bx, z: bz - half, len: BLOCK, angle: 0, ox: 0, oz: -1 })   // north
      edges.push({ x: bx, z: bz + half, len: BLOCK, angle: 0, ox: 0, oz: 1 })    // south
      if (col !== 1) {
        edges.push({ x: bx - half, z: bz, len: BLOCK, angle: Math.PI / 2, ox: -1, oz: 0 })   // west
        edges.push({ x: bx + half, z: bz, len: BLOCK, angle: Math.PI / 2, ox: 1, oz: 0 })    // east
      }
    }
  }
  return edges
}

function buildKerbs() {
  const boxes = []
  for (const e of blockEdges()) {
    // Box is built long-axis-along-local-x, then rotated to `angle` (the
    // edge's running direction) — angle 0 and PI/2 reproduce the old
    // axis-aligned w/d swap exactly; other angles (the diamond) fall out for
    // free.
    const geo = new THREE.BoxGeometry(e.len, KERB_H, KERB_T)
    geo.rotateY(-e.angle)
    geo.translate(e.x, KERB_H / 2, e.z)
    boxes.push(geo)
  }
  const geometry = mergeGeometries(boxes)
  const material = new THREE.MeshLambertMaterial({
    color: KERB_COLOR, emissive: KERB_COLOR, emissiveIntensity: 0.35,
  })
  return new THREE.Mesh(geometry, material)
}

// ── Street trees ─────────────────────────────────────────────────────────
const TREE_TRUNK = 0x6b4a34
const TREE_CANOPY = 0x6fae4a
const TREE_MARGIN = 4   // inset from each block corner, along the edge
// 3 evenly-spaced spots along an edge of length `len`, symmetric about its
// midline, with TREE_MARGIN clearance from both corners. Same derivation the
// diamond's rotated edges reuse, just with DIAMOND_OUTER_SIDE in for BLOCK.
const treeSpots = (len) => {
  const half = len / 2
  const step = (len - 2 * TREE_MARGIN) / 2
  return [0, 1, 2].map((i) => -half + TREE_MARGIN + i * step)
}

function buildTrees() {
  const trunks = [], canopies = []
  const outset = SIDEWALK_W / 2   // stand centred in the sidewalk band
  for (const e of blockEdges()) {
    const cosA = Math.cos(e.angle), sinA = Math.sin(e.angle)
    for (const along of treeSpots(e.len)) {
      const x = e.x + along * cosA + outset * e.ox
      const z = e.z + along * sinA + outset * e.oz
      const scale = 0.85 + rnd() * 0.3   // ±15%
      const rot = rnd() * Math.PI * 2

      const trunk = new THREE.CylinderGeometry(0.12, 0.16, 2.2, 5, 1, true)
      trunk.translate(0, 1.1, 0)   // base on the ground plane
      trunk.scale(scale, scale, scale)
      trunk.rotateY(rot)
      trunk.translate(x, 0, z)
      trunks.push(trunk)

      const canopy = new THREE.IcosahedronGeometry(1.6, 0)
      canopy.translate(0, 2.4, 0)   // caps the trunk
      canopy.scale(scale, scale, scale)
      canopy.rotateY(rot)
      canopy.translate(x, 0, z)
      canopies.push(canopy)
    }
  }
  const group = new THREE.Group()
  group.add(new THREE.Mesh(
    mergeGeometries(trunks),
    new THREE.MeshLambertMaterial({ color: TREE_TRUNK }),
  ))
  group.add(new THREE.Mesh(
    mergeGeometries(canopies),
    new THREE.MeshLambertMaterial({ color: TREE_CANOPY }),
  ))
  return group
}

// ── Diamond corner paving ────────────────────────────────────────────────────
// The 4 triangular gaps between DIAMOND_CELL's rotated kerb outline and its
// original 46m square boundary, painted as plaza rather than plain
// GROUND_COLOR dirt. Same Shape+Path hole-punch technique buildGround() uses
// for the rail-corridor cutout, just with the winding reversed (fills the
// square, punches the diamond out) and flat-coloured — SIDEWALK_COLOR only
// exists baked into the road atlas elsewhere in this file, and generalizing
// that UV-mapped machinery for 4 flat triangles isn't worth it.
function buildDiamondPaving() {
  const [row, col] = DIAMOND_CELL
  const bx = blockCenter(col), bz = blockCenter(row)
  const half = BLOCK / 2

  // ShapeGeometry lies in the shape's XY plane; rotateX(-PI/2) below sends it
  // to world XZ with world z = -shapeY (same convention buildGround() uses),
  // so every point here is written as (worldX, -worldZ).
  const outer = new THREE.Shape()
  outer.moveTo(bx - half, -(bz - half))
  outer.lineTo(bx + half, -(bz - half))
  outer.lineTo(bx + half, -(bz + half))
  outer.lineTo(bx - half, -(bz + half))
  outer.closePath()

  const hole = new THREE.Path()
  hole.moveTo(bx, -(bz - half))         // N
  hole.lineTo(bx + half, -bz)           // E
  hole.lineTo(bx, -(bz + half))         // S
  hole.lineTo(bx - half, -bz)           // W
  hole.closePath()
  outer.holes.push(hole)

  const geo = new THREE.ShapeGeometry(outer)
  geo.rotateX(-Math.PI / 2)
  const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: SIDEWALK_COLOR }))
  mesh.position.y = -0.02   // above buildGround's -0.04, below the road/kerbs at y>=0
  return mesh
}

/** Returns a THREE.Group: ground, roads, kerbs and street trees for the whole
 * map. Ground light pools (fake street-lamp/neon spill) are a night-only
 * effect and don't run in this daytime scene. */
export function createStreets() {
  const group = new THREE.Group()
  group.add(buildGround())
  group.add(buildRoadNetwork())
  group.add(buildDiamondPaving())
  group.add(buildKerbs())
  group.add(buildTrees())
  return group
}
