import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { createSignTexture } from './signTexture.js'
import { createNoren, createVendingMachine } from './props.js'
import { RED, CYAN } from './palette.js'

// Wider and lower than a Golden Gai stall — a konbini reads as a squat glass
// box, not a narrow multi-storey bar. Metres. Front face sits at z = 0.
const W = 7.0, D = 5.5, FRONT_Z = 0
const BODY_H = 3.9, BAND_H = 0.9, ROOF_H = 0.2
const H = BODY_H + BAND_H + ROOF_H

const DOOR_X = -1.4, DOOR_W = 1.5
const VEND_X = -2.9

const TRIM  = 0x101319 // dark frame/trim, matches the alley's structural darks
const BODY  = 0x24272e // dark exterior panel — dim enough that the glass reads as the bright thing
const SHELF = 0x8a7a5c // warm product-box tone — needs contrast against both the
                        // dark body and the near-white glass, not just a darker grey
const GLOW  = 0xdff2ff // cold fluorescent white — the signature konbini cue
const CYAN_STR = '#00E5FF' // createSignTexture paints with Canvas2D, which needs a CSS string

const trimMat  = new THREE.MeshLambertMaterial({ color: TRIM })
const shelfMat = new THREE.MeshLambertMaterial({ color: SHELF })
const redMat   = new THREE.MeshLambertMaterial({ color: RED, side: THREE.DoubleSide })

function panel(w, h, material) {
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), material)
}

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

// The big glass frontage: a wide transparent pane so the shelving behind it
// still reads, plus a frame and two mullions so 4m of unbroken glass doesn't
// look like a flat texture stuck on the wall. Frame + mullions are trim-
// coloured and never hover-touched, so they're baked straight into
// `trimGeos` instead of coming back as their own meshes — only the glowing
// pane itself needs to stay a real, separately-lit mesh.
function bigWindow(trimGeos, w, h, mat, x, y) {
  const pane = panel(w, h, mat)
  pane.position.set(x, y, FRONT_Z + 0.02)

  // z offset must clear the pane's z=0.02 front face — coplanar boxes z-fight
  // (this exact bug flipped bright glass to solid black depending on camera zoom).
  trimGeos.push(posed(new THREE.BoxGeometry(w + 0.08, h + 0.08, 0.05), { x, y, z: FRONT_Z - 0.02 }))
  for (const fx of [-w / 6, w / 6]) {
    trimGeos.push(posed(new THREE.BoxGeometry(0.05, h, 0.03), { x: x + fx, y, z: FRONT_Z + 0.04 }))
  }
  return pane
}

/**
 * A konbini storefront: click target for the site owner's profile page.
 * "Step inside" is conveyed by the shopfront itself — an over-lit glass box
 * with a noren-hung entrance — rather than by any UI chrome.
 *
 * Every part that never changes under hover gets baked (transform included)
 * into one of two shared-material buckets (`trimGeos` for structural darks,
 * `redGeos` for the RED signboard/noren) and merged into a single draw call
 * each — same technique as alley.js/towers.js/station.js. Only the parts
 * setHover() actually mutates stay as their own mesh.
 */
export function createKonbini() {
  const group = new THREE.Group()

  const trimGeos = [] // structural darks: roof, window frame/mullions, noren rod, vend panel
  const redGeos  = []  // signboard band + noren fabric — same RED, both fine DoubleSide

  // ── Body ────────────────────────────────────────────────────────────────
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(W, BODY_H, D),
    new THREE.MeshLambertMaterial({ color: BODY }),
  )
  body.position.set(0, BODY_H / 2, FRONT_Z - D / 2)
  group.add(body)

  // Signboard band across the top — saturated colour, matte (the lit strip
  // below carries the glow so the band itself doesn't double as a window).
  redGeos.push(posed(new THREE.BoxGeometry(W, BAND_H, 0.45), { x: 0, y: BODY_H + BAND_H / 2, z: FRONT_Z - 0.05 }))

  // Neon tube accent, not a facade element — MeshBasicMaterial, so the old
  // emissiveIntensity is folded into the resting colour and hover lerps
  // further toward white (Basic has no emissive to boost instead).
  const litStripBase = new THREE.Color(GLOW).lerp(new THREE.Color(0xffffff), 0.35)
  const litStripMat = new THREE.MeshBasicMaterial({ color: litStripBase.clone() })
  const litStrip = new THREE.Mesh(new THREE.BoxGeometry(W * 0.92, 0.06, 0.05), litStripMat)
  litStrip.position.set(0, BODY_H + 0.06, FRONT_Z + 0.18)
  group.add(litStrip)

  // Full-depth cap — a shallow front-only slab would leave the body's top
  // face exposed, and moon light hits a flat top face almost head-on.
  trimGeos.push(posed(new THREE.BoxGeometry(W + 0.3, ROOF_H, D + 0.3), {
    x: 0, y: BODY_H + BAND_H + ROOF_H / 2, z: FRONT_Z - D / 2 + 0.15,
  }))

  // ── Big glass frontage: brilliantly lit, cold fluorescent white ──────────
  // Kept semi-transparent (not just emissive) so the shelving behind it stays
  // visible — an opaque glow plane would hide the racks entirely.
  const windowMat = new THREE.MeshLambertMaterial({
    color: GLOW, emissive: GLOW, emissiveIntensity: 1.05,
    transparent: true, opacity: 0.42, side: THREE.DoubleSide,
  })
  const glassW = 4.0, glassH = BODY_H - 0.25
  const windowPane = bigWindow(trimGeos, glassW, glassH, windowMat, 1.4, glassH / 2 + 0.1)
  group.add(windowPane)

  // Shelving racks, suggested with a few boxes behind the window plane. The
  // body is a solid box (not a hollow shell), so a shelf sitting deep "inside"
  // would be entombed behind its own front face and never rendered — only the
  // sliver in front of that face (and still behind the glass at z=0.02) is
  // ever visible, so that's all these need: a shallow poke, not real depth.
  const SHELF_DEPTH = 0.3, SHELF_FRONT_Z = 0.015
  const shelves = [
    [-0.1, 0.6, 1.6],
    [0.9, 0.7, 1.9],
    [1.9, 0.6, 1.3],
    [2.9, 0.7, 1.8],
  ]
  const shelfGeos = shelves.map(([x, w, h]) =>
    posed(new THREE.BoxGeometry(w, h, SHELF_DEPTH), { x, y: h / 2, z: SHELF_FRONT_Z - SHELF_DEPTH / 2 }))
  group.add(mergedMesh(shelfGeos, shelfMat))

  // ── Entrance: recessed doorway + noren ────────────────────────────────────
  const doorwayMat = new THREE.MeshLambertMaterial({
    color: 0x141922, emissive: GLOW, emissiveIntensity: 1.0,
  })
  const doorway = new THREE.Mesh(new THREE.BoxGeometry(DOOR_W, 2.3, 0.5), doorwayMat)
  doorway.position.set(DOOR_X, 1.15, FRONT_Z - 0.25)
  group.add(doorway)

  // Noren hangs from the door head downward, mirroring the alley's stalls —
  // a traditional curtain is the "come in" cue even on a modern storefront.
  // Decomposed the same way alley.js splits createNoren()'s children: the
  // rod (props.js's shared matDark, not DoubleSide) joins the trim bucket,
  // the fabric panels (DoubleSide) join the red bucket.
  const noren = createNoren({ color: RED, width: DOOR_W * 0.92 })
  noren.position.set(DOOR_X, 1.8, FRONT_Z + 0.05)
  noren.updateMatrix()
  for (const child of noren.children) {
    child.updateMatrix()
    const geo = child.geometry.clone().applyMatrix4(child.matrix).applyMatrix4(noren.matrix)
    if (child.material.side === THREE.DoubleSide) redGeos.push(geo)
    else trimGeos.push(geo)
  }

  // Vending machine beside the door, proud of the facade. Decomposed instead
  // of added whole: createVendingMachine() always builds [body, glow, header,
  // panel] in that order (see props.js). body is flat Lambert and never
  // hover-touched, so it's just its own single mesh (nothing else in this
  // scene shares its exact colour to merge with); panel is flat Lambert too
  // and matches the trim bucket's role, so it's baked in there. glow and
  // header are the two MeshBasicMaterial parts and are hover-mutable, so each
  // stays its own mesh and material exactly as before. None of these parts
  // carry any rotation, so plain position arithmetic (no matrix bake) is
  // enough for the two that stay standalone.
  const vend = createVendingMachine({ color: CYAN })
  const vX = VEND_X, vY = 0, vZ = FRONT_Z + 0.35
  const [vBody, vGlow, vHeader, vPanel] = vend.children

  const vendBody = new THREE.Mesh(vBody.geometry, vBody.material)
  vendBody.position.set(vX + vBody.position.x, vY + vBody.position.y, vZ + vBody.position.z)
  group.add(vendBody)

  trimGeos.push(posed(vPanel.geometry.clone(), {
    x: vX + vPanel.position.x, y: vY + vPanel.position.y, z: vZ + vPanel.position.z,
  }))

  const vendGlow = new THREE.Mesh(vGlow.geometry, vGlow.material)
  vendGlow.position.set(vX + vGlow.position.x, vY + vGlow.position.y, vZ + vGlow.position.z)
  group.add(vendGlow)

  const vendHeader = new THREE.Mesh(vHeader.geometry, vHeader.material)
  vendHeader.position.set(vX + vHeader.position.x, vY + vHeader.position.y, vZ + vHeader.position.z)
  group.add(vendHeader)

  // createVendingMachine() builds fresh materials per call (not module-shared),
  // so mutating them directly in setHover is safe — no clone needed. The glow
  // and header panels are the only MeshBasicMaterial in the group (body and
  // button panel are Lambert), so that's how hover picks them out now.
  const vendGlowMats = [vGlow.material, vHeader.material]
  const vendGlowBase = vendGlowMats.map((m) => m.color.clone())

  // Every static part collected above merges into exactly one mesh apiece.
  group.add(mergedMesh(trimGeos, trimMat))
  group.add(mergedMesh(redGeos, redMat))

  // ── Signage ────────────────────────────────────────────────────────────
  // "Profile" is the navigation element — legibility beats atmosphere, so it
  // gets the lightbox style (solid backlit panel) rather than thin neon.
  const sign = createSignTexture({
    text: 'Profile', style: 'lightbox', orientation: 'horizontal', color: CYAN_STR, px: 256,
  })
  // Basic: the map is already the lit sign art, so colour just tints its
  // brightness — dim at rest, full (white) on hover.
  const signMat = new THREE.MeshBasicMaterial({ map: sign.map })
  signMat.color.setScalar(0.57)
  const signH = BAND_H * 0.72
  const signMesh = panel(signH * sign.aspect, signH, signMat)
  signMesh.position.set(0, BODY_H + BAND_H / 2, FRONT_Z + 0.2)
  group.add(signMesh)

  // Decorative Japanese vertical sign — pure atmosphere, off the side edge.
  const vert = createSignTexture({
    text: 'コンビニ', style: 'neon', orientation: 'vertical', color: '#FFB347', px: 256,
  })
  const vertMat = new THREE.MeshBasicMaterial({ map: vert.map, side: THREE.DoubleSide })
  vertMat.color.setScalar(0.57)
  const vertH = 1.5
  const vertMesh = panel(vertH * vert.aspect, vertH, vertMat)
  vertMesh.position.set(W / 2 - 0.25, BODY_H - 0.95, FRONT_Z + 0.6)
  vertMesh.rotation.y = -Math.PI / 2
  group.add(vertMesh)

  // ── Pick target ────────────────────────────────────────────────────────
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(W + 1.2, H + 1.2, D + 1.6),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hit.position.set(0, (H + 1.2) / 2, FRONT_Z - D / 2 + 0.5)
  group.add(hit)

  function setHover(on) {
    windowMat.emissiveIntensity = on ? 1.65 : 1.05
    litStripMat.color.copy(litStripBase).lerp(new THREE.Color(0xffffff), on ? 0.35 : 0)
    signMat.color.setScalar(on ? 1 : 0.57)
    vertMat.color.setScalar(on ? 1 : 0.57)
    doorwayMat.emissiveIntensity = on ? 1.5 : 1.0
    vendGlowMats.forEach((m, i) => { m.color.copy(vendGlowBase[i]).lerp(new THREE.Color(0xffffff), on ? 0.35 : 0) })
  }

  return { group, hit, setHover }
}
