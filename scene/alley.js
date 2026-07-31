import * as THREE from 'three'
import { createSignTexture } from './signTexture.js'
import { createLantern, createNoren, createAcUnit } from './props.js'
import { RED, AMBER, CYAN, WARM } from './palette.js'

// Golden Gai bars are ~2 storeys and barely wider than their door. Metres.
const W = 4.0, D = 5.0, H = 6.2, PITCH = 4.4, FRONT_Z = -1.5

// Neon accents cycle so no two neighbours match.
const ACCENTS = ['#FF2D55', '#FFB347', '#00E5FF', '#FF6FA8', '#7CE7C4']
// Decorative Japanese signage. The project name lives on the horizontal sign —
// these vertical ones are atmosphere, so they stay in Japanese.
const AMBIENT = ['居酒屋', '焼鳥', 'ラーメン', 'バー', '喫茶', '小料理', '酒場', 'おでん', '寿司']

function panel(w, h, material) {
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), material)
}

const frameMat = new THREE.MeshLambertMaterial({ color: 0x0a0c12 })

// A glazed pane plus its frame and centre mullion. Without the dividers a lit
// window is just a flat bright rectangle stuck on the wall.
function glazing(w, h, material, x, y) {
  const g = new THREE.Group()
  g.add(panel(w, h, material))
  const surround = new THREE.Mesh(new THREE.BoxGeometry(w + 0.1, h + 0.1, 0.05), frameMat)
  surround.position.z = -0.03
  g.add(surround)
  const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.045, h, 0.03), frameMat)
  mullion.position.z = 0.015
  g.add(mullion)
  const transom = new THREE.Mesh(new THREE.BoxGeometry(w, 0.045, 0.03), frameMat)
  transom.position.z = 0.015
  g.add(transom)
  g.position.set(x, y, FRONT_Z + 0.02)
  return g
}

function buildStall(project, i, lightEvery) {
  const group = new THREE.Group()
  const accent = ACCENTS[i % ACCENTS.length]
  const height = H + (i % 3) * 0.35          // uneven rooflines read as organic
  const shell = 0.06 + (i % 4) * 0.012       // slight per-stall value shift

  // ── Body ──────────────────────────────────────────────────────────────────
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(W - 0.12, height, D),
    new THREE.MeshLambertMaterial({ color: new THREE.Color(shell, shell * 0.95, shell * 1.15) }),
  )
  body.position.set(0, height / 2, FRONT_Z - D / 2)
  group.add(body)

  // Roof slab, overhanging the shopfront like a real awning.
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(W, 0.18, D + 0.7),
    new THREE.MeshLambertMaterial({ color: 0x14171f }),
  )
  roof.position.set(0, height + 0.09, FRONT_Z - D / 2 + 0.35)
  group.add(roof)

  // ── Doorway: recessed, with warm interior spill ───────────────────────────
  const doorway = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 2.1, 0.5),
    new THREE.MeshLambertMaterial({
      color: 0x1a1206, emissive: WARM, emissiveIntensity: 0.5,
    }),
  )
  doorway.position.set(-0.55, 1.05, FRONT_Z - 0.24)
  group.add(doorway)

  // Noren hangs from the door head downward, so its base sits below the lintel.
  const noren = createNoren({ color: accent, width: 1.6 })
  noren.position.set(-0.55, 1.58, FRONT_Z + 0.04)
  group.add(noren)

  // Ground-floor window beside the door.
  // No environment map exists any more, so a lit window reads as warm glass
  // from the emissive term alone — no roughness/metalness knobs needed.
  const windowMat = new THREE.MeshLambertMaterial({
    color: 0x1c1408, emissive: WARM, emissiveIntensity: 0.75,
  })
  group.add(glazing(1.15, 0.95, windowMat, 1.05, 1.35))

  // Upper floor: not every flat above a bar is occupied, and an unbroken row of
  // identically-lit windows is what makes a procedural row look fake.
  const upperMat = i % 3 === 1
    ? new THREE.MeshLambertMaterial({ color: 0x0d1017 })
    : windowMat
  group.add(glazing(1.3, 0.9, upperMat, -0.4, height - 1.5))

  // ── Signage ───────────────────────────────────────────────────────────────
  // Horizontal sign carries the project name. This is the directory: it MUST
  // be the legible thing on the facade.
  const sign = createSignTexture({
    text: project.title, style: 'neon', orientation: 'horizontal', color: accent, px: 256,
  })
  // Basic: the map is already the lit neon art, so colour just tints its
  // brightness — dim at rest, full (white) on hover.
  const signMat = new THREE.MeshBasicMaterial({ map: sign.map })
  signMat.color.setScalar(0.5)
  const signW = 3.1
  const signMesh = panel(signW, signW / sign.aspect, signMat)
  signMesh.position.set(-0.25, 2.95, FRONT_Z + 0.09)
  group.add(signMesh)

  // Vertical Japanese sign projecting off the facade — pure atmosphere.
  const vert = createSignTexture({
    text: AMBIENT[i % AMBIENT.length], style: i % 2 ? 'neon' : 'lightbox',
    orientation: 'vertical', color: ACCENTS[(i + 2) % ACCENTS.length], px: 256,
  })
  const vertMat = new THREE.MeshBasicMaterial({ map: vert.map, side: THREE.DoubleSide })
  vertMat.color.setScalar(0.57)
  // Sits ABOVE the name sign, not beside it — projecting perpendicular at the
  // same height would occlude the project name from this camera angle.
  const vertH = 1.8
  const vertMesh = panel(vertH * vert.aspect, vertH, vertMat)
  vertMesh.position.set(W / 2 - 0.3, height - 1.05, FRONT_Z + 0.6)
  vertMesh.rotation.y = -Math.PI / 2   // projects out perpendicular to the facade
  group.add(vertMesh)

  // ── Props ─────────────────────────────────────────────────────────────────
  const lantern = createLantern({ color: i % 3 === 0 ? AMBER : RED, size: 0.4 })
  lantern.position.set(-1.65, 1.85, FRONT_Z + 0.42)
  group.add(lantern)

  // props.js shares materials between instances, so hovering one stall would
  // otherwise light every lantern in the alley. Clone this stall's copies.
  // The lantern skin is the only MeshBasicMaterial here (ribs/caps are the
  // shared matDark, a MeshLambertMaterial), so that's how hover picks it out.
  const lanternMats = []
  lantern.traverse((o) => {
    if (!o.material) return
    o.material = o.material.clone()
    if (o.material.isMeshBasicMaterial) lanternMats.push(o.material)
  })
  const lanternBase = lanternMats.map((m) => m.color.clone())

  const ac = createAcUnit()
  ac.position.set(1.35, height - 2.4, FRONT_Z + 0.02)
  group.add(ac)

  // ── Pick target ───────────────────────────────────────────────────────────
  // One generous invisible box per stall, so the whole shopfront is clickable
  // rather than only whichever child mesh happens to be under the cursor.
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(W, height + 1.2, D + 1.4),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hit.position.set(0, (height + 1.2) / 2, FRONT_Z - D / 2 + 0.5)
  group.add(hit)

  // Hover: brighten the sign, the lantern and the doorway spill together, so
  // the whole shopfront lights up rather than just the plane under the cursor.
  function setHover(on) {
    signMat.color.setScalar(on ? 1 : 0.5)
    vertMat.color.setScalar(on ? 1 : 0.57)
    doorway.material.emissiveIntensity = on ? 1.1 : 0.5
    windowMat.emissiveIntensity = on ? 0.95 : 0.55
    lanternMats.forEach((m, k) => { m.color.copy(lanternBase[k]).lerp(new THREE.Color(0xffffff), on ? 0.35 : 0) })
  }

  // vertMat is exposed for the ambient flicker layer. The project-name sign is
  // deliberately NOT — the alley is a directory first, and a stuttering name is
  // an unreadable name.
  return { group, hit, setHover, project, vertMat }
}

/**
 * The alley is the project directory: one Golden Gai stall per entry.
 * Adding a project lengthens the row — no layout rework.
 */
export function createAlley(projects, { lightEvery = 1 } = {}) {
  const group = new THREE.Group()
  const stalls = projects.map((project, i) => {
    const stall = buildStall(project, i, lightEvery)
    stall.group.position.x = (i - (projects.length - 1) / 2) * PITCH
    group.add(stall.group)
    return stall
  })
  return { group, stalls }
}
