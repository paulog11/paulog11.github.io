import * as THREE from 'three'
import { RED, AMBER, CYAN, WARM, GRANITE } from './palette.js'

// Utility neutrals the accent palette doesn't cover (structural, not "colour").
const DARK    = 0x18140f // near-black — ribs, tyres, vents, shadow trim
const STEEL   = 0x6b7280 // brushed metal — pole hardware, pipe, machine frame
const PLASTIC = 0xcac7ba // weathered off-white plastic — AC casing, machine body

// Shared fixed-colour materials — reused across every prop instance so a
// street full of crates/poles/pipes doesn't allocate one material each.
// Lambert, not Standard: metalness/roughness are gone from the pipeline, and
// the scene has no environment map for a metallic surface to reflect anyway.
const matDark     = new THREE.MeshLambertMaterial({ color: DARK })
const matSteel    = new THREE.MeshLambertMaterial({ color: STEEL })
const matPlastic  = new THREE.MeshLambertMaterial({ color: PLASTIC })
const matConcrete = new THREE.MeshLambertMaterial({ color: GRANITE })

// Chōchin profile as (radius fraction, height fraction) pairs — shared by the
// Lathe skin and the rib rings so the ribs sit flush against the bulge.
const LANTERN_PROFILE = [
  [0.22, 0], [0.75, 0.08], [1.0, 0.30], [1.05, 0.55], [0.95, 0.78], [0.6, 0.94], [0.22, 1.0],
]

export function createLantern({ color = AMBER, size = 0.28 } = {}) {
  const r = size / 2
  const h = size * 1.5
  const g = new THREE.Group()

  // SEGMENT BUDGET: a lantern is ~0.4 m, i.e. ~2 px at zoom 1 and ~10 px at the
  // closest zoom. Segment counts here were tuned for a scene with nine lanterns;
  // Golden Gai now places 24, and the ribs alone were costing 12,000 triangles —
  // over half that block — for hoops whose 1.4 cm tube renders at 0.07 px.
  // These counts are the point where reducing further changes the silhouette.
  const profile = LANTERN_PROFILE.map(([xf, yf]) => new THREE.Vector2(xf * r, yf * h))
  const skin = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 8),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.3), side: THREE.DoubleSide,
    }),
  )
  g.add(skin)

  // Ribs — dark bamboo hoops, one at each interior profile point.
  for (const [xf, yf] of LANTERN_PROFILE.slice(1, -1)) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(xf * r, r * 0.035, 3, 6), matDark)
    rib.rotation.x = Math.PI / 2
    rib.position.y = yf * h
    g.add(rib)
  }

  const capH = h * 0.08
  const capBottom = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.15, r * 0.2, capH, 6), matDark)
  capBottom.position.y = capH / 2
  g.add(capBottom)
  const capTop = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.28, r * 0.22, capH, 6), matDark)
  capTop.position.y = h + capH / 2
  g.add(capTop)

  return g
}

export function createNoren({ color = RED, width = 1.2 } = {}) {
  const h = 0.5
  const g = new THREE.Group()

  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, width * 1.05, 6), matDark)
  rod.rotation.z = Math.PI / 2
  rod.position.y = h
  g.add(rod)

  // Split into panels with visible gaps between them.
  const panels = 3
  const gap = 0.025
  const panelW = (width - gap * (panels - 1)) / panels
  const fabric = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide })
  for (let i = 0; i < panels; i++) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(panelW, h, 0.02), fabric)
    panel.position.set(-width / 2 + panelW / 2 + i * (panelW + gap), h / 2, 0)
    g.add(panel)
  }

  return g
}

export function createVendingMachine({ color = CYAN } = {}) {
  const w = 1.1, h = 1.9, d = 0.75
  const g = new THREE.Group()

  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matPlastic)
  body.position.y = h / 2
  g.add(body)

  // Glowing product display — the +Z front face.
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.86, h * 0.68, 0.02),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.25) }),
  )
  glow.position.set(0, h * 0.56, d / 2 + 0.011)
  g.add(glow)

  // Header signage strip.
  const header = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.94, h * 0.09, 0.02),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(RED).lerp(new THREE.Color(0xffffff), 0.15) }),
  )
  header.position.set(0, h * 0.92, d / 2 + 0.011)
  g.add(header)

  // Coin/button panel below the display.
  const panel = new THREE.Mesh(new THREE.BoxGeometry(w * 0.86, h * 0.12, 0.03), matDark)
  panel.position.set(0, h * 0.16, d / 2 + 0.015)
  g.add(panel)

  return g
}

export function createAcUnit() {
  const w = 0.8, h = 0.6, d = 0.3
  const g = new THREE.Group()

  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matPlastic)
  body.position.y = h / 2
  g.add(body)

  // Horizontal vent slats, +Z front face.
  const slats = 5
  for (let i = 0; i < slats; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(w * 0.88, 0.02, 0.02), matDark)
    slat.position.set(0, h * 0.18 + i * (h * 0.5 / slats), d / 2 + 0.005)
    g.add(slat)
  }

  // Fan grille.
  const grille = new THREE.Mesh(new THREE.CylinderGeometry(h * 0.28, h * 0.28, 0.03, 8), matDark)
  grille.rotation.x = Math.PI / 2
  grille.position.set(0, h * 0.72, d / 2 + 0.01)
  g.add(grille)

  return g
}

export function createCrate({ color = RED } = {}) {
  const s = 0.45
  const g = new THREE.Group()
  const mat = new THREE.MeshLambertMaterial({ color })

  const bodyH = s * 0.62
  const body = new THREE.Mesh(new THREE.BoxGeometry(s, bodyH, s), mat)
  body.position.y = bodyH / 2
  g.add(body)

  // Raised rim + cross divider, both above the body top — without the rim
  // this reads as a solid gift box, not an open crate.
  const rimY = bodyH + 0.02
  const edgeAlongX = new THREE.BoxGeometry(s, 0.04, 0.03)
  const edgeAlongZ = new THREE.BoxGeometry(0.03, 0.04, s)
  for (const side of [-1, 1]) {
    const eX = new THREE.Mesh(edgeAlongX, matDark)
    eX.position.set(0, rimY, side * s / 2)
    g.add(eX)
    const eZ = new THREE.Mesh(edgeAlongZ, matDark)
    eZ.position.set(side * s / 2, rimY, 0)
    g.add(eZ)
  }
  for (const rotY of [0, Math.PI / 2]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(s * 0.98, 0.03, 0.03), matDark)
    bar.rotation.y = rotY
    bar.position.y = rimY
    g.add(bar)
  }

  return g
}

export function createBicycle() {
  const g = new THREE.Group()
  const wheelR = 0.33
  const wheelGeo = new THREE.TorusGeometry(wheelR, 0.03, 5, 12)

  const wheelBack = new THREE.Mesh(wheelGeo, matDark)
  wheelBack.rotation.y = Math.PI / 2
  wheelBack.position.set(0, wheelR, -0.55)
  g.add(wheelBack)

  const wheelFront = wheelBack.clone()
  wheelFront.position.z = 0.55
  g.add(wheelFront)

  const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.55, 6), matSteel)
  seatTube.rotation.x = -0.35
  seatTube.position.set(0, wheelR + 0.28, -0.18)
  g.add(seatTube)

  const downTube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 6), matSteel)
  downTube.rotation.x = 0.6
  downTube.position.set(0, wheelR + 0.18, 0.14)
  g.add(downTube)

  const topTube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.58, 6), matSteel)
  topTube.rotation.x = Math.PI / 2 - 0.15
  topTube.position.set(0, wheelR + 0.5, 0.03)
  g.add(topTube)

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.14), matDark)
  seat.position.set(0, wheelR + 0.56, -0.22)
  g.add(seat)

  const handlebar = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 6), matDark)
  handlebar.rotation.z = Math.PI / 2
  handlebar.position.set(0, wheelR + 0.58, 0.5)
  g.add(handlebar)

  // Front basket — common on parked Tokyo commuter bikes.
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.2), matSteel)
  basket.position.set(0, wheelR + 0.42, 0.48)
  g.add(basket)

  return g
}

export function createPowerPole() {
  const H = 9
  const g = new THREE.Group()

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, H, 8), matConcrete)
  pole.position.y = H / 2
  g.add(pole)

  for (const y of [H * 0.88, H * 0.95]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.06), matDark)
    arm.position.y = y
    g.add(arm)
    for (const x of [-0.6, 0, 0.6]) {
      const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.12, 6), matDark)
      insulator.position.set(x, y + 0.09, 0)
      g.add(insulator)
    }
  }

  const xfrm = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.5, 8), matSteel)
  xfrm.rotation.z = Math.PI / 2
  xfrm.position.set(0.28, H * 0.7, 0)
  g.add(xfrm)

  return g
}

export function createPipe({ height = 4 } = {}) {
  const r = 0.09
  const g = new THREE.Group()

  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, height, 8), matSteel)
  body.position.y = height / 2
  g.add(body)

  // Joint collars along the run.
  for (const t of [0.3, 0.6, 0.85]) {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.25, r * 1.25, 0.05, 8), matDark)
    collar.position.y = height * t
    g.add(collar)
  }

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.6, r, 0.12, 8), matDark)
  cap.position.y = height + 0.06
  g.add(cap)

  return g
}
