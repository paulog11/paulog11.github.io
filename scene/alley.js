// Golden Gai (ゴールデン街): scenery only. This used to be the project directory —
// one clickable stall per project — before that job moved to projectBuilding.js.
// What's left is the thing Golden Gai actually is: a warren of tiny 2-storey
// bars packed shoulder-to-shoulder down lanes barely wide enough to pass in.
// Nothing here is a pick target.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { createSignTexture } from './signTexture.js'
import { createLantern, createNoren, createAcUnit } from './props.js'
import { RED, AMBER, WARM } from './palette.js'
import { GOLDEN_GAI_CELL, BLOCK, blockCenter } from './cityLayout.js'

// Stall footprint + facade rhythm, metres — same numbers the old per-project
// stalls used, since a Golden Gai bar is still barely wider than its door.
const W = 4.0, D = 5.0, PITCH = 4.4, FRONT_Z = -1.5
// BLOCK_SPECS in cityLayout.js gives this cell height:[6,9]; it isn't
// exported (it's the old filler generator's private table, and this block
// opts out of that generator entirely), so the range is copied here.
const H_MIN = 6.0, H_MAX = 9.0

// Rows run along local Z, stalls along local X within a row — a finer grid
// than the 3x3 lot lattice every other block uses, which is the whole point
// of this district. ROW_PITCH is a stall's own depth plus a 2m pedestrian lane.
//
// Every per-stall Z offset below (FRONT_Z and everything built from it) is
// inherited from the old single-row alley, where "front" just meant "forward
// of the group origin" — nothing else shared that Z-space, so it didn't
// matter that FRONT_Z isn't centred on 0. Multiple rows DO share it: the
// roof is the deepest part of a stall (D + 0.7, the overhang), and its
// midpoint sits at STALL_MID, not at local z=0. Rows are placed around that
// midpoint (see the row loop in createGoldenGaiBlock), so the gap between
// rows is the real pedestrian-lane width instead of whatever FRONT_Z happens
// to leave over.
const ROWS = 4, STALLS_PER_ROW = 6
const LANE = 2.0
const STALL_DEPTH = D + 0.7                    // roof overhang — the deepest element
const STALL_MID = FRONT_Z - D / 2 + 0.35        // roof's Z centre, local to one stall
const ROW_PITCH = STALL_DEPTH + LANE            // 7.7

const ACCENTS = ['#FF2D55', '#FFB347', '#00E5FF', '#FF6FA8', '#7CE7C4']
// Decorative Japanese signage — pure atmosphere, never the legible thing
// (there's no project name to carry any more). SIGN_VARIANTS distinct
// textures get baked and reused across every stall rather than one canvas
// each; see buildSignVariants.
const AMBIENT = ['居酒屋', '焼鳥', 'ラーメン', 'バー', '喫茶', '小料理', '酒場', 'おでん', '寿司']
const SIGN_VARIANTS = 4

// Deterministic LCG — same idiom as cityLayout.js/street.js, so the block is
// pixel-identical across reloads and screenshots stay comparable.
let seed = 20260731
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

// Stalls must stay inside the 46m block (never bleed into the 10m street
// beyond it). This is the whole safety contract for requirement 1 written as
// code instead of a comment, so a future edit to ROWS/PITCH/BLOCK trips it
// immediately instead of silently drawing into a road — same idiom as
// station.js's buildPiers() clearsStreets() guard.
const HALF = BLOCK / 2
const Z_REACH = ((ROWS - 1) * ROW_PITCH) / 2 + STALL_DEPTH / 2
const X_REACH = ((STALLS_PER_ROW - 1) * PITCH) / 2 + W / 2

/** Clones a geometry with a transform baked in, ready for mergeGeometries. Same idiom as station.js. */
function posed(geo, { x = 0, y = 0, z = 0 } = {}) {
  return geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z))
}

function mergedMesh(geoms, material) {
  return new THREE.Mesh(mergeGeometries(geoms), material)
}

// Bakes one uniform colour into every vertex of a geometry. Lets dozens of
// differently-tinted stalls (bodies, lanterns, noren) still collapse into a
// single draw call: the material just turns vertexColors on and each baked
// triangle carries its own stall's colour.
function tint(geo, color) {
  const n = geo.attributes.position.count
  const arr = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) arr.set([color.r, color.g, color.b], i * 3)
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3))
  return geo
}

// Window: glazed pane plus its frame, mullion and transom — split by `kind`
// so a lit pane lands in the warm bucket and a dark one lands in the trim
// bucket, but the frame around either is always trim.
function addGlazing(buckets, w, h, lx, ly, kind, x, z) {
  const pane = new THREE.PlaneGeometry(w, h)
  pane.translate(lx, ly, FRONT_Z + 0.02)
  buckets[kind].push(posed(pane, { x, z }))

  const surround = new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.05)
  surround.translate(lx, ly, FRONT_Z - 0.01)
  buckets.dark.push(posed(surround, { x, z }))

  const mullion = new THREE.BoxGeometry(0.045, h, 0.03)
  mullion.translate(lx, ly, FRONT_Z + 0.035)
  buckets.dark.push(posed(mullion, { x, z }))

  const transom = new THREE.BoxGeometry(w, 0.045, 0.03)
  transom.translate(lx, ly, FRONT_Z + 0.035)
  buckets.dark.push(posed(transom, { x, z }))
}

// One stall's geometry, sorted straight into the shared buckets rather than
// its own group — there is no per-stall mesh any more, only contributions to
// the handful of merged meshes the whole block ends up as.
function buildStall(i, x, z, buckets, acPlasticMat) {
  const height = H_MIN + rnd() * (H_MAX - H_MIN)

  // ── Body ── subtle per-stall tint, vertex-baked (see `tint`).
  const shellV = 0.05 + rnd() * 0.06
  const bodyColor = new THREE.Color(shellV, shellV * 0.95, shellV * 1.15)
  const body = new THREE.BoxGeometry(W - 0.12, height, D)
  body.translate(0, height / 2, FRONT_Z - D / 2)
  buckets.body.push(tint(posed(body, { x, z }), bodyColor))

  // Roof slab, overhanging the shopfront like a real awning.
  const roof = new THREE.BoxGeometry(W, 0.18, D + 0.7)
  roof.translate(0, height + 0.09, FRONT_Z - D / 2 + 0.35)
  buckets.dark.push(posed(roof, { x, z }))

  // Doorway: recessed, with warm interior spill. No hover any more, so it's
  // just permanently lit instead of brightening on demand.
  const doorway = new THREE.BoxGeometry(1.7, 2.1, 0.5)
  doorway.translate(-0.55, 1.05, FRONT_Z - 0.24)
  buckets.warm.push(posed(doorway, { x, z }))

  // Noren hangs from the door head downward. createNoren hands back a rod
  // (matDark, structural) and 3 fabric panels (coloured, DoubleSide) sharing
  // one group — DoubleSide is the flag that tells the two apart here without
  // reaching into props.js's internals.
  const norenGroup = createNoren({ color: ACCENTS[i % ACCENTS.length], width: 1.6 })
  norenGroup.position.set(-0.55, 1.58, FRONT_Z + 0.04)
  norenGroup.updateMatrix()
  for (const child of norenGroup.children) {
    child.updateMatrix()
    const geo = child.geometry.clone().applyMatrix4(child.matrix).applyMatrix4(norenGroup.matrix)
    if (child.material.side === THREE.DoubleSide) {
      buckets.noren.push(tint(posed(geo, { x, z }), child.material.color))
    } else {
      buckets.dark.push(posed(geo, { x, z }))
    }
  }

  // Ground-floor window: always lit, always the warm bucket.
  addGlazing(buckets, 1.15, 0.95, 1.05, 1.35, 'warm', x, z)
  // Upper floor: not every flat above a bar is occupied — a 1-in-3 dark unit
  // so the row doesn't read as a uniformly lit strip.
  addGlazing(buckets, 1.3, 0.9, -0.4, height - 1.5, i % 3 === 1 ? 'dark' : 'warm', x, z)

  // Lantern: skin colour varies per stall (vertex-tinted bucket, Basic — it's
  // the only MeshBasicMaterial createLantern hands back); ribs and caps are
  // props.js's shared matDark, which is exactly the "no per-instance colour"
  // trim bucket already collecting roofs and window frames.
  const lantern = createLantern({ color: i % 3 === 0 ? AMBER : RED, size: 0.4 })
  lantern.position.set(-1.65, 1.85, FRONT_Z + 0.42)
  lantern.updateMatrix()
  for (const child of lantern.children) {
    child.updateMatrix()
    const geo = child.geometry.clone().applyMatrix4(child.matrix).applyMatrix4(lantern.matrix)
    if (child.material.isMeshBasicMaterial) {
      buckets.lantern.push(tint(posed(geo, { x, z }), child.material.color))
    } else {
      buckets.dark.push(posed(geo, { x, z }))
    }
  }

  // AC unit: fixed colours on every stall (no tint needed) — just split by
  // which of props.js's two materials each part carries. Neither material
  // carries a distinguishing flag the way Basic/DoubleSide do above, so this
  // checks identity against a one-off probe unit built by the caller.
  const ac = createAcUnit()
  ac.position.set(1.35, height - 2.4, FRONT_Z + 0.02)
  ac.updateMatrix()
  for (const child of ac.children) {
    child.updateMatrix()
    const geo = child.geometry.clone().applyMatrix4(child.matrix).applyMatrix4(ac.matrix)
    const target = child.material === acPlasticMat ? buckets.plastic : buckets.dark
    target.push(posed(geo, { x, z }))
  }

  return height
}

// SIGN_VARIANTS baked textures, reused across every stall — a handful of
// canvases instead of one per stall, per the draw-call budget. Vertical
// orientation's aspect is fixed by signTexture.js regardless of text, so one
// plane geometry serves every variant; only the material (and its texture)
// differs.
function buildSignVariants() {
  const variants = []
  for (let v = 0; v < SIGN_VARIANTS; v++) {
    const tex = createSignTexture({
      text: AMBIENT[v % AMBIENT.length],
      style: v % 2 ? 'neon' : 'lightbox',
      orientation: 'vertical',
      color: ACCENTS[(v + 2) % ACCENTS.length],
      px: 256,
    })
    const mat = new THREE.MeshBasicMaterial({ map: tex.map, side: THREE.DoubleSide })
    mat.color.setScalar(0.6)
    variants.push({ mat, aspect: tex.aspect })
  }
  return variants
}

/**
 * Dense, non-interactive Golden Gai block. Placement comes entirely from
 * cityLayout.js: GOLDEN_GAI_CELL says which cell, blockCenter() says where
 * that cell's centre is in world space, BLOCK bounds how far the layout below
 * is allowed to reach. Everything else here is in block-local coordinates —
 * the returned group carries the one offset that places it in the world.
 */
export function createGoldenGaiBlock() {
  if (Z_REACH > HALF || X_REACH > HALF) {
    throw new Error('Golden Gai stalls reach past the block edge into a street')
  }

  const buckets = { dark: [], warm: [], plastic: [], body: [], lantern: [], noren: [] }

  // Both AC materials are fixed (no per-stall colour), so identifying which
  // is the plastic casing only needs doing once, not once per stall.
  const acProbe = createAcUnit()
  const acPlasticMat = acProbe.children[0].material

  const variants = buildSignVariants()
  const vertH = 1.8
  const signGeo = new THREE.PlaneGeometry(vertH * variants[0].aspect, vertH)
  const signInstances = variants.map(() => [])

  let i = 0
  for (let row = 0; row < ROWS; row++) {
    // -STALL_MID re-centres each row on its own real (roof) footprint rather
    // than on the stall's local origin — see the comment on STALL_MID above.
    const z = (row - (ROWS - 1) / 2) * ROW_PITCH - STALL_MID
    for (let col = 0; col < STALLS_PER_ROW; col++, i++) {
      const x = (col - (STALLS_PER_ROW - 1) / 2) * PITCH
      const height = buildStall(i, x, z, buckets, acPlasticMat)
      signInstances[i % SIGN_VARIANTS].push({ x, z, height })
    }
  }

  const group = new THREE.Group()
  group.add(mergedMesh(buckets.dark, new THREE.MeshLambertMaterial({ color: 0x14171f })))
  group.add(mergedMesh(buckets.warm, new THREE.MeshLambertMaterial({
    color: 0x1b1408, emissive: WARM, emissiveIntensity: 0.6,
  })))
  group.add(mergedMesh(buckets.plastic, new THREE.MeshLambertMaterial({ color: 0xcac7ba })))
  group.add(mergedMesh(buckets.body, new THREE.MeshLambertMaterial({ vertexColors: true })))
  group.add(mergedMesh(buckets.lantern, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide })))
  group.add(mergedMesh(buckets.noren, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })))

  // One InstancedMesh per sign variant — SIGN_VARIANTS draw calls instead of
  // one mesh per stall, and genuinely separate materials (not one shared
  // atlas) because ambient.js's flicker layer stutters individual materials.
  const signMats = []
  const dummy = new THREE.Object3D()
  variants.forEach(({ mat }, v) => {
    const list = signInstances[v]
    const mesh = new THREE.InstancedMesh(signGeo, mat, list.length)
    list.forEach((s, idx) => {
      // Sits above the name-sign height this stall no longer has, projecting
      // off the right edge of the facade — same placement the old per-stall
      // vertical sign used.
      dummy.position.set(s.x + W / 2 - 0.3, s.height - 1.05, s.z + FRONT_Z + 0.6)
      dummy.rotation.set(0, -Math.PI / 2, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(idx, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
    group.add(mesh)
    signMats.push(mat)
  })

  const [cellRow, cellCol] = GOLDEN_GAI_CELL
  group.position.set(blockCenter(cellCol), 0, blockCenter(cellRow))

  return { group, signMats }
}
