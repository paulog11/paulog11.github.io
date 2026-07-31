// Diegetic navigation widgets: a vending machine bank (résumé download) and a
// kōban (contact links). Both read as ordinary Golden Gai street furniture.
import * as THREE from 'three'
import { createVendingMachine } from './props.js'
import { createSignTexture } from './signTexture.js'
import { RED, AMBER, CYAN, WARM, GRANITE } from './palette.js'

// signTexture.js hands its `color` straight to Canvas2D's fillStyle, which
// needs a CSS string — the palette's numbers silently fail that assignment.
const hex = (n) => '#' + n.toString(16).padStart(6, '0')

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

  const glowMats = []
  MACHINE_COLORS.forEach((color, i) => {
    const machine = createVendingMachine({ color })
    // props.js shares its body/panel materials across every instance in the
    // scene (AC units too) — clone before this bank's hover touches anything.
    machine.traverse((o) => {
      if (!o.material) return
      o.material = o.material.clone()
      if (o.material.isMeshBasicMaterial) glowMats.push(o.material)
    })
    machine.position.set((i - (n - 1) / 2) * (MW + GAP), plinthH, 0)
    group.add(machine)
  })
  const glowBase = glowMats.map((m) => m.color.clone())

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
 * windows are smaller and don't need to sell a divided sash. */
function glazing(w, h, material, x, y, z) {
  const g = new THREE.Group()
  g.add(new THREE.Mesh(new THREE.PlaneGeometry(w, h), material))
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.08, h + 0.08, 0.04),
    new THREE.MeshLambertMaterial({ color: 0x14171f }),
  )
  frame.position.z = -0.025
  g.add(frame)
  g.position.set(x, y, z)
  return g
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

  const trimMat = new THREE.MeshLambertMaterial({ color: 0x14171f })
  const roof = new THREE.Mesh(new THREE.BoxGeometry(KW + 0.3, 0.2, KD + 0.3), trimMat)
  roof.position.y = KH + 0.1
  group.add(roof)
  // Belt course at mid-height — cheapest possible cue that this is two storeys.
  const belt = new THREE.Mesh(new THREE.BoxGeometry(KW + 0.06, 0.12, KD + 0.06), trimMat)
  belt.position.y = KH / 2
  group.add(belt)

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
  group.add(glazing(1.1, 1.0, windowMat, 1.1, 1.1, FRONT_Z + 0.02))
  // Counter, just inside the glass — its silhouette against the lit window is
  // the "counter visible" cue; there's no modelled interior beyond it.
  const counter = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.12, 0.3),
    new THREE.MeshLambertMaterial({ color: 0x2a2015 }),
  )
  counter.position.set(1.1, 0.75, FRONT_Z - 0.32)
  group.add(counter)

  // Dim upper-floor window — sells the two-storey read without a second lit box.
  group.add(glazing(0.9, 0.8, new THREE.MeshLambertMaterial({ color: 0x0d1017 }),
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

  // Notice board with a few pinned papers.
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.55, 0.04),
    new THREE.MeshLambertMaterial({ color: 0x3b2a1c }),
  )
  board.position.set(-1.1, 0.85, FRONT_Z + 0.04)
  group.add(board)
  const paperMat = new THREE.MeshLambertMaterial({ color: 0xf2ede0 })
  for (const [dx, dy, rot] of [[-0.12, 0.09, 0.12], [0.1, -0.03, -0.1], [-0.02, -0.13, 0.05]]) {
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.26), paperMat)
    paper.position.set(board.position.x + dx, board.position.y + dy, board.position.z + 0.03)
    paper.rotation.z = rot
    group.add(paper)
  }

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
