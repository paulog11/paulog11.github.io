// Golden Gai (ゴールデン街): scenery only. This used to be the project directory —
// one clickable stall per project — before that job moved to projectBuilding.js.
// What's left is the thing Golden Gai actually is: a warren of tiny 2-storey
// bars packed shoulder-to-shoulder down lanes barely wide enough to pass in.
// Nothing here is a pick target.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { createSignTexture } from './signTexture.js'
import { createNoren, createAcUnit } from './props.js'
import { sharedGradientTexture } from './lightPool.js'
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

// Billboard size: matches the old lathe's own footprint (max profile radius
// 1.05 * r, total height h + two capH) so the swap is a drop-in, not a resize.
const LANTERN_W = 0.42, LANTERN_H = 0.65
const POOL_R = 3.0                        // light-spill radius on the lane, metres

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
  // 0.05-0.11 was so close to black that the stalls read as a void rather than
  // as a dense low-rise mass; the two lights in the scene have almost nothing to
  // pick up off a Lambert surface that dark. Still the darkest bodies in the
  // city — the point is that the block reads as buildings, not a hole.
  const shellV = 0.09 + rnd() * 0.07
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

  // Lantern: a single billboard quad, not a lathe+5 toruses (see buildLanternTexture
  // for why — at ~0.4m wide/~2px on screen, the geometry was pure overdraw). The
  // ribbing and caps are baked into the shared texture; only the paper's own glow
  // colour still varies per stall, via the same vertex-tint idiom as everywhere
  // else in this file. -1.65/1.85/+0.42 are the old lantern group's local offset.
  // Lerp toward white for the paper's lit look, then push past 1 — Basic has no
  // emissive, so brightness lives entirely in the tint, and NoToneMapping means
  // the hottest part of the paper clips to a white core exactly like a real
  // over-exposed lantern. The dark ribs survive it: near-black times 1.35 is
  // still near-black.
  const lanternColor = new THREE.Color(i % 3 === 0 ? AMBER : RED)
    .lerp(new THREE.Color(0xffffff), 0.25).multiplyScalar(1.35)
  const lantern = new THREE.PlaneGeometry(LANTERN_W, LANTERN_H)
  lantern.translate(-1.65, 1.85 + LANTERN_H / 2, FRONT_Z + 0.42)
  buckets.lantern.push(tint(posed(lantern, { x, z }), lanternColor))

  // Light spill on the lane in front of the stall. Every street in the city has
  // pooled light under its signage and this block had none, so the alley floor
  // was the only pure black surface in frame and the stalls read as pasted onto
  // it. Merged like everything else here: 24 quads, one draw call, the shared
  // gradient canvas from lightPool.js — brightness is baked into the vertex
  // tint rather than material opacity, because additive blending multiplies
  // rgb by alpha and there is only one material for the whole block.
  const poolColor = new THREE.Color(ACCENTS[i % ACCENTS.length])
    .lerp(new THREE.Color(WARM), 0.4).multiplyScalar(0.95)
  const pool = new THREE.PlaneGeometry(POOL_R * 2, POOL_R * 2)
  pool.rotateX(-Math.PI / 2)
  pool.translate(-0.55, 0.05, FRONT_Z + POOL_R * 0.45)
  buckets.pool.push(tint(posed(pool, { x, z }), poolColor))

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
    // Full strength. The old 0.6 was a bloom-era value: a pass that re-inflated
    // bright pixels made dimming the source sensible, and with the pass gone it
    // just left the block's signature neon as the darkest signage in the city.
    // Basic + NoToneMapping means this IS the output — 1.0 is the texture as
    // drawn, and the texture is already drawn bright.
    mat.color.setScalar(1.0)
    variants.push({ mat, aspect: tex.aspect })
  }
  return variants
}

// Bakes the paper-lantern look ONCE — warm-lit gradient body, dark ribbing
// bands where the torus rings used to sit, dark caps top and bottom — onto a
// single canvas, alpha 0 outside the chōchin silhouette. Every lantern in the
// block shares this one texture (and one material); only the vertex-baked
// tint varies per stall. Multiplying vertexColors against the texture is safe
// for the dark ribs/caps too: a near-black pixel times any tint is still
// near-black, so they read as dark trim regardless of the paper's own colour.
function buildLanternTexture() {
  const h = 160
  const w = Math.round(h * (LANTERN_W / LANTERN_H))
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const g = canvas.getContext('2d')

  // Same bulge profile LANTERN_PROFILE in props.js used to trace as a lathe.
  const PROFILE = [
    [0.22, 0], [0.75, 0.08], [1.0, 0.30], [1.05, 0.55], [0.95, 0.78], [0.6, 0.94], [0.22, 1.0],
  ]
  const capH = h * 0.08
  const bodyTop = capH, bodyH = h - capH * 2
  const cx = w / 2, maxR = w / 2 - 1
  const pt = (xf, yf) => [cx + xf * maxR, bodyTop + yf * bodyH]
  const tracePath = () => {
    g.beginPath()
    PROFILE.forEach(([xf, yf], i) => {
      const [x, y] = pt(xf, yf)
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y)
    })
    for (let i = PROFILE.length - 2; i >= 0; i--) {
      const [x, y] = pt(-PROFILE[i][0], PROFILE[i][1])
      g.lineTo(x, y)
    }
    g.closePath()
  }

  g.save()
  tracePath()
  g.clip()
  const grad = g.createLinearGradient(0, bodyTop, 0, bodyTop + bodyH)
  grad.addColorStop(0, '#8a8a8a')
  grad.addColorStop(0.45, '#ffffff')
  grad.addColorStop(1, '#8a8a8a')
  g.fillStyle = grad
  g.fillRect(0, 0, w, h)

  g.strokeStyle = 'rgba(15,10,8,0.55)'
  g.lineWidth = h * 0.02
  for (const [, yf] of PROFILE.slice(1, -1)) {
    const y = bodyTop + yf * bodyH
    g.beginPath()
    g.moveTo(0, y)
    g.lineTo(w, y)
    g.stroke()
  }
  g.restore()

  g.fillStyle = '#14100c'
  g.fillRect(cx - w * 0.11, 0, w * 0.22, capH)
  g.fillRect(cx - w * 0.14, h - capH, w * 0.28, capH)

  return Object.assign(new THREE.CanvasTexture(canvas), { colorSpace: THREE.SRGBColorSpace })
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

  const buckets = { dark: [], warm: [], plastic: [], body: [], lantern: [], noren: [], pool: [] }

  // Both AC materials are fixed (no per-stall colour), so identifying which
  // is the plastic casing only needs doing once, not once per stall.
  const acProbe = createAcUnit()
  const acPlasticMat = acProbe.children[0].material

  const variants = buildSignVariants()
  // 1.8m was below this scene's own visibility floor — CLAUDE.md puts it at
  // ~3m, and a 1.8m sign is ~8.6px at zoom 1. The block's signature signage was
  // therefore geometry nobody could see. 3.2m still reads as a shopfront sign on
  // a 6-9m stall, and is the height at which it actually marks the block.
  const vertH = 3.2
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
  // Roofs, trim and rods. Under this camera the stall ROOFS are most of what you
  // actually see of the block — the lanes between rows are hidden by the row in
  // front — so at 0x14171f the block read as a hole in the map rather than as
  // low-rise mass. Lifted just enough to catch the two lights; still the darkest
  // roofline in the city, because a warren of dark roofs is what Golden Gai is.
  group.add(mergedMesh(buckets.dark, new THREE.MeshLambertMaterial({ color: 0x232732 })))
  // Doorways and lit windows — the interior spill that should make the alley
  // read as occupied. Same bloom-era halving as the signs above.
  group.add(mergedMesh(buckets.warm, new THREE.MeshLambertMaterial({
    color: 0x2a1f0c, emissive: WARM, emissiveIntensity: 1.15,
  })))
  group.add(mergedMesh(buckets.plastic, new THREE.MeshLambertMaterial({ color: 0xcac7ba })))
  group.add(mergedMesh(buckets.body, new THREE.MeshLambertMaterial({ vertexColors: true })))
  // Cutout, not blended: transparent stays false and alphaTest does the
  // silhouette clip, so this renders in the opaque pass with normal depth
  // writes/testing — no back-to-front sort against the stalls to get wrong.
  group.add(mergedMesh(buckets.lantern, new THREE.MeshBasicMaterial({
    map: buildLanternTexture(), vertexColors: true, side: THREE.DoubleSide, alphaTest: 0.5,
  })))
  group.add(mergedMesh(buckets.noren, new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide })))
  // Additive and depthWrite:false, exactly like lightPool.js's own decals — and
  // transparent, which also keeps them out of renderer.js's occlusion test so
  // they never block a click.
  group.add(mergedMesh(buckets.pool, new THREE.MeshBasicMaterial({
    map: sharedGradientTexture(), vertexColors: true,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  })))

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
