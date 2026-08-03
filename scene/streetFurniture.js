// Diegetic navigation widgets: a vending machine bank (résumé download) and a
// kōban (contact links). Both read as ordinary Golden Gai street furniture.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { createVendingMachine } from './props.js'
import { createSignTexture } from './signTexture.js'
import { RED, AMBER, CYAN, WARM, GRANITE } from './palette.js'

// signTexture.js hands its `color` straight to Canvas2D's fillStyle, which
// needs a CSS string — the palette's numbers silently fail that assignment.
const hex = (n) => '#' + n.toString(16).padStart(6, '0')

/** Clones a geometry with a transform baked in, ready for mergeGeometries. Same idiom as station.js/alley.js/towers.js. */
function posed(geo, { x = 0, y = 0, z = 0, ry = 0, rz = 0 } = {}) {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, rz)),
    new THREE.Vector3(1, 1, 1),
  )
  return geo.applyMatrix4(m)
}

function mergedMesh(geoms, material) {
  return new THREE.Mesh(mergeGeometries(geoms), material)
}

// ── Vending bank ──────────────────────────────────────────────────────────

const MACHINE_COLORS = [CYAN, RED, AMBER]
const MW = 1.1, MH = 1.9, MD = 0.75
const GAP = 0.08

function createRecycleBin() {
  const g = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.27, 0.6, 10),
    new THREE.MeshLambertMaterial({ color: 0x2c2f36 }),
  )
  body.position.y = 0.3
  g.add(body)
  // Blue-lidded recycling bin is a common Tokyo streetside sight — kept dim,
  // it's atmosphere, not a hover target.
  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.26, 0.05, 10),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(CYAN).lerp(new THREE.Color(0xffffff), 0.1) }),
  )
  lid.position.y = 0.62
  g.add(lid)
  return g
}

/** Flat glow decal standing in for a wet light pool — no extra PointLight cost. */
function createPuddle() {
  const p = new THREE.Mesh(
    new THREE.CircleGeometry(1, 16),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1b2338).lerp(new THREE.Color(WARM), 0.3),
    }),
  )
  p.scale.set(1.4, 1.0, 1)
  p.rotation.x = -Math.PI / 2
  p.position.y = 0.015
  return p
}

/** Three vending machines + kerb + bin + résumé sign. Click → download résumé. */
export function createVendingBank() {
  const group = new THREE.Group()
  const n = MACHINE_COLORS.length
  const totalW = n * MW + (n - 1) * GAP // ≈3.5m, matches the scale contract
  const plinthH = 0.1

  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(totalW + 0.3, plinthH, MD + 0.3),
    new THREE.MeshLambertMaterial({ color: GRANITE }),
  )
  plinth.position.set(0, plinthH / 2, 0)
  group.add(plinth)

  // Decomposed instead of adding each machine's group whole: createVendingMachine()
  // always builds [body, glow, header, panel] in that order (see props.js).
  // body and panel are flat Lambert and never hover-touched — merged into one
  // draw call apiece across all three machines. header is Basic but its base
  // colour ignores the `color` arg (always RED-derived, see props.js), so all
  // three headers are visually identical and merge too. Only glow is both
  // Basic *and* genuinely different per machine (it's the one part that uses
  // `color`), so it's the sole part that must stay hover-mutable and separate.
  // None of these parts carry any rotation, so plain position arithmetic (no
  // matrix bake) is enough.
  const bodyGeos = [], panelGeos = []
  let bodyMat, panelMat, headerMat
  const headerGeos = []
  const glowMats = []
  MACHINE_COLORS.forEach((color, i) => {
    const machine = createVendingMachine({ color })
    const mx = (i - (n - 1) / 2) * (MW + GAP), my = plinthH, mz = 0
    const [mBody, mGlow, mHeader, mPanel] = machine.children

    bodyGeos.push(posed(mBody.geometry.clone(), { x: mx + mBody.position.x, y: my + mBody.position.y, z: mz + mBody.position.z }))
    bodyMat ??= mBody.material
    panelGeos.push(posed(mPanel.geometry.clone(), { x: mx + mPanel.position.x, y: my + mPanel.position.y, z: mz + mPanel.position.z }))
    panelMat ??= mPanel.material
    headerGeos.push(posed(mHeader.geometry.clone(), { x: mx + mHeader.position.x, y: my + mHeader.position.y, z: mz + mHeader.position.z }))
    headerMat ??= mHeader.material

    // Glow keeps its own mesh + material — per-machine colour, and the hover
    // target. props.js hands back a fresh MeshBasicMaterial per call (not a
    // module-shared one), so mutating it directly in setHover is safe with no
    // clone needed — same as konbini.js's vending machine.
    const glowMat = mGlow.material
    const glowMesh = new THREE.Mesh(mGlow.geometry, glowMat)
    glowMesh.position.set(mx + mGlow.position.x, my + mGlow.position.y, mz + mGlow.position.z)
    group.add(glowMesh)
    glowMats.push(glowMat)
  })
  const glowBase = glowMats.map((m) => m.color.clone())

  group.add(mergedMesh(bodyGeos, bodyMat))
  group.add(mergedMesh(panelGeos, panelMat))
  group.add(mergedMesh(headerGeos, headerMat))
  // header is also a hover target (it's Basic, same as glow) — since every
  // machine's header is visually identical, the one merged material stands
  // in for all three and mutates exactly like the old per-header materials did.
  glowMats.push(headerMat)
  glowBase.push(headerMat.color.clone())

  // Résumé sign, mounted above the centre machine — the legible one.
  const sign = createSignTexture({
    text: 'Résumé', sub: 'PDF', style: 'lightbox', orientation: 'horizontal', color: hex(WARM), px: 256,
  })
  const signMat = new THREE.MeshBasicMaterial({ map: sign.map })
  signMat.color.setScalar(0.5)
  const signW = 1.0
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(signW, signW / sign.aspect), signMat)
  signMesh.position.set(0, plinthH + MH + 0.2, MD / 2 - 0.02)
  group.add(signMesh)

  const bin = createRecycleBin()
  bin.position.set(totalW / 2 + 0.55, 0, 0.1)
  group.add(bin)

  const puddle = createPuddle()
  puddle.position.set(0, 0, MD / 2 + 0.9)
  group.add(puddle)

  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(totalW + 1.6, plinthH + MH + 0.7, MD + 1.4),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hit.position.set(0.3, (plinthH + MH + 0.7) / 2, 0.1)
  group.add(hit)

  function setHover(on) {
    glowMats.forEach((m, k) => { m.color.copy(glowBase[k]).lerp(new THREE.Color(0xffffff), on ? 0.45 : 0) })
    signMat.color.setScalar(on ? 1 : 0.5)
  }

  return { group, hit, setHover }
}

// ── Kōban ─────────────────────────────────────────────────────────────────

const KW = 4, KD = 4, KH = 5.5
const FRONT_Z = KD / 2

/** Pane + frame, no mullion — simpler than alley.js's glazing since these
 * windows are smaller and don't need to sell a divided sash. The frame is
 * always trim-coloured and never hover-touched, so it's baked straight into
 * `trimGeos` instead of coming back as its own mesh — only the pane itself
 * needs to stay a real mesh (some panes are hover-lit, some aren't). */
function glazing(trimGeos, w, h, material, x, y, z) {
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material)
  pane.position.set(x, y, z)
  trimGeos.push(posed(new THREE.BoxGeometry(w + 0.08, h + 0.08, 0.04), { x, y, z: z - 0.025 }))
  return pane
}

/** A kōban: red lamp over the door, lit counter window, 交番 sign, notice board. */
export function createKoban() {
  const group = new THREE.Group()

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(KW, KH, KD),
    new THREE.MeshLambertMaterial({ color: GRANITE }),
  )
  body.position.y = KH / 2
  group.add(body)

  // Structural darks — roof, belt course, and both window frames — never
  // hover-touched, so they bake into one merged mesh instead of four meshes.
  const trimMat = new THREE.MeshLambertMaterial({ color: 0x14171f })
  const trimGeos = []
  trimGeos.push(posed(new THREE.BoxGeometry(KW + 0.3, 0.2, KD + 0.3), { x: 0, y: KH + 0.1, z: 0 }))
  // Belt course at mid-height — cheapest possible cue that this is two storeys.
  trimGeos.push(posed(new THREE.BoxGeometry(KW + 0.06, 0.12, KD + 0.06), { x: 0, y: KH / 2, z: 0 }))

  const doorW = 1.3, doorH = 2.3
  const doorMat = new THREE.MeshLambertMaterial({
    color: 0x1a1206, emissive: WARM, emissiveIntensity: 0.55,
  })
  const doorway = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.4), doorMat)
  doorway.position.set(0, doorH / 2, FRONT_Z - 0.18)
  group.add(doorway)

  // Ground-floor counter window, offset from the door.
  const windowMat = new THREE.MeshLambertMaterial({
    color: 0x1c1408, emissive: WARM, emissiveIntensity: 0.8,
  })
  group.add(glazing(trimGeos, 1.1, 1.0, windowMat, 1.1, 1.1, FRONT_Z + 0.02))
  // Counter, just inside the glass — its silhouette against the lit window is
  // the "counter visible" cue; there's no modelled interior beyond it.
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.12, 0.3),
    new THREE.MeshLambertMaterial({ color: 0x2a2015 }),
  )
  counter.position.set(1.1, 0.75, FRONT_Z - 0.32)
  group.add(counter)

  // Dim upper-floor window — sells the two-storey read without a second lit box.
  group.add(glazing(trimGeos, 0.9, 0.8, new THREE.MeshLambertMaterial({ color: 0x0d1017 }),
    -0.6, KH - 1.3, FRONT_Z + 0.02))

  // ── Red lamp — the single strongest kōban cue ──────────────────────────
  const armMat = new THREE.MeshLambertMaterial({ color: 0x2b2b2b })
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 6), armMat)
  arm.rotation.z = Math.PI / 2
  arm.position.set(0, doorH + 0.55, FRONT_Z + 0.1)
  group.add(arm)
  // Beacon, not a facade element — MeshBasicMaterial, matching the tower's
  // aircraft-warning-light treatment. Old emissiveIntensity folded into the
  // resting colour; hover lerps further toward white.
  const lampBase = new THREE.Color(RED).lerp(new THREE.Color(0xffffff), 0.4)
  const lampMat = new THREE.MeshBasicMaterial({ color: lampBase.clone() })
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), lampMat)
  lamp.position.set(0, doorH + 0.55, FRONT_Z + 0.28)
  group.add(lamp)

  // 交番 — vertical, projecting off the facade like the alley's ambient signs.
  const kobanSign = createSignTexture({
    text: '交番', style: 'lightbox', orientation: 'vertical', color: hex(RED), px: 256,
  })
  const kobanSignMat = new THREE.MeshBasicMaterial({ map: kobanSign.map, side: THREE.DoubleSide })
  kobanSignMat.color.setScalar(0.61)
  const kobanSignH = 1.4
  const kobanSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(kobanSignH * kobanSign.aspect, kobanSignH), kobanSignMat,
  )
  kobanSignMesh.position.set(KW / 2 - 0.2, KH - 1.0, FRONT_Z + 0.5)
  kobanSignMesh.rotation.y = -Math.PI / 2
  group.add(kobanSignMesh)

  // "Contact" placard — the legible Latin navigation label.
  const contactSign = createSignTexture({
    text: 'Contact', style: 'lightbox', orientation: 'horizontal', color: hex(WARM), px: 256,
  })
  const contactSignMat = new THREE.MeshBasicMaterial({ map: contactSign.map })
  contactSignMat.color.setScalar(0.62)
  const contactW = 0.7
  const contactSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(contactW, contactW / contactSign.aspect), contactSignMat,
  )
  contactSignMesh.position.set(-1.1, 1.75, FRONT_Z + 0.02)
  group.add(contactSignMesh)

  // Notice board with a few pinned papers. The papers share one material and
  // are never hover-touched, so their (rotated) geometry merges into a single
  // draw call.
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.55, 0.04),
    new THREE.MeshLambertMaterial({ color: 0x3b2a1c }),
  )
  board.position.set(-1.1, 0.85, FRONT_Z + 0.04)
  group.add(board)
  const paperMat = new THREE.MeshLambertMaterial({ color: 0xf2ede0 })
  const paperGeos = [[-0.12, 0.09, 0.12], [0.1, -0.03, -0.1], [-0.02, -0.13, 0.05]].map(([dx, dy, rot]) =>
    posed(new THREE.PlaneGeometry(0.2, 0.26), {
      x: board.position.x + dx, y: board.position.y + dy, z: board.position.z + 0.03, rz: rot,
    }))
  group.add(mergedMesh(paperGeos, paperMat))

  // Every structural-dark part collected above merges into one mesh.
  group.add(mergedMesh(trimGeos, trimMat))

  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(KW + 1.2, KH + 1.2, KD + 1.4),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hit.position.set(0, (KH + 1.2) / 2, 0.2)
  group.add(hit)

  function setHover(on) {
    doorMat.emissiveIntensity = on ? 1.0 : 0.55
    windowMat.emissiveIntensity = on ? 1.3 : 0.8
    lampMat.color.copy(lampBase).lerp(new THREE.Color(0xffffff), on ? 0.3 : 0)
    kobanSignMat.color.setScalar(on ? 1 : 0.61)
    contactSignMat.color.setScalar(on ? 1 : 0.62)
  }

  return { group, hit, setHover }
}
