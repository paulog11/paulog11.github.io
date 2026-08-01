import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { LANDMARK_SITES, lotGroupCenter } from './cityLayout.js'

// The two hero landmarks, built as BACKDROP inside the city grid. Position and
// height are table-driven from cityLayout.js's LANDMARK_SITES — see that file
// for why they stand at cell [1,0] — not hard-coded here.
//
// Both are modelled in "spike units" (1 unit = 5 m, matching spike/tocho.html)
// at their real proportions, then the whole group is scaled by
// LANDMARK_SITES[i].h / <real height in spike units>. An orthographic camera
// gives no distance falloff, so a literally-scaled 243 m tower would be nine
// times the screen height — the compression IS the forced perspective.
//
// Height ceiling, worked through the projection (not a taste number):
//   screenY = 0.927y - 0.265(x+z)                         (CLAUDE.md / renderer.js)
// tocho's site centres at x=-48, z=-8 (lotGroupCenter of its LANDMARK_SITES
// lots), so its ground level projects to screenY = -0.265*(-48-8) = 14.8.
// renderer.js's resize() computes frustum = max(CONTENT_H, CONTENT_W/aspect)
// with CONTENT_H=145; the smallest that ever gets is 145 itself, on wide
// screens where CONTENT_H binds — the worst case across every aspect ratio.
// The frame is centred on CONTENT_CY=21.3, so the frame top sits at
// 21.3 + 145/2 = 93.8. Headroom above tocho's own ground level is therefore
// (93.8 - 14.8) / 0.927 = ~85 m — comfortably more than the 35-45 m target,
// so LANDMARK_SITES' heights (40 m tocho, 34 m cocoon, matching the real
// 243:204 ratio) are a legibility choice, not one forced by clipping. The
// bifurcation (at 169/243 of tocho's height, unchanged by rescaling) and the
// mast/warning-light apex above the roof both land far inside that margin.
const TOCHO_SPIKE_H = 48.6    // 243 real metres / 5 metres-per-spike-unit
const COCOON_SPIKE_H = 40.8   // 204 real metres / 5 metres-per-spike-unit

let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

/**
 * Tange's facade: alternating granite piers and dark glass, subdivided at two
 * scales, which is what gives 都庁 its "circuit board" read. Returns separate
 * colour and emissive canvases so only the glass glows.
 */
function facade(cols, rows, { lit = 0.3, pxCol = 24, pxRow = 14 } = {}) {
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g]  = mk()
  const [cEmi, ge] = mk()

  g.fillStyle = '#20242c'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  const sig = [1, 0, 0, 1, 1, 0, 0, 1]
  const isPier = (i) => sig[i % 8] === 1 && sig[Math.floor(i / 8) % 8] === 1

  for (let i = 0; i < cols; i++) {
    const x = i * pxCol
    if (isPier(i)) {
      g.fillStyle = '#b9c0cc'
      g.fillRect(x, 0, pxCol, h)
      g.fillStyle = 'rgba(0,0,0,0.18)'
      g.fillRect(x + pxCol - 3, 0, 3, h)
      continue
    }
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      if (rnd() > lit) continue
      const warm = rnd()
      const col = warm > 0.82 ? '#a8cfe8' : warm > 0.25 ? '#e8c88a' : '#f2e3c4'
      g.fillStyle = col;  g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
      ge.fillStyle = col; ge.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
    }
  }

  g.fillStyle = 'rgba(0,0,0,0.55)'
  for (let j = 0; j < rows; j++) g.fillRect(0, j * pxRow, w, 2)

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/** The Cocoon's woven diagonal lattice — a texture, not geometry. */
function latticeTexture() {
  const w = 512, h = 1024
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  const e = document.createElement('canvas')
  e.width = w; e.height = h
  const ge = e.getContext('2d')

  g.fillStyle = '#161c28'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  // Lit cells behind the lattice.
  for (let y = 0; y < h; y += 26) {
    for (let x = 0; x < w; x += 26) {
      if (rnd() > 0.34) continue
      const col = rnd() > 0.5 ? '#cfe6f5' : '#e8d4a8'
      g.fillStyle = col;  g.fillRect(x + 4, y + 4, 18, 18)
      ge.fillStyle = col; ge.fillRect(x + 4, y + 4, 18, 18)
    }
  }

  // The weave: two sets of diagonals, drawn on both canvases so the white
  // ribs glow faintly the way the real building's lighting picks them out.
  for (const dir of [1, -1]) {
    for (let i = -h; i < w + h; i += 46) {
      for (const [ctx, style, width] of [[g, '#dfe6f0', 5], [ge, '#41505f', 5]]) {
        ctx.strokeStyle = style
        ctx.lineWidth = width
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + dir * h, h)
        ctx.stroke()
      }
    }
  }

  const tex = (cv) => Object.assign(new THREE.CanvasTexture(cv), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(c), emissiveMap: tex(e) }
}

/** A facade texture sized to match a `w x h` slab, as a ready-to-use material. */
function texturedSlabMaterial(w, h, opts = {}) {
  const { map, emissiveMap } = facade(
    Math.max(4, Math.round(w * 5 / 3.6)),
    Math.max(4, Math.round(h * 5 / 4.0)),
    opts,
  )
  return new THREE.MeshLambertMaterial({
    map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.5,
  })
}

/** Clones a geometry with a transform baked in, ready for mergeGeometries.
 * Same idiom as station.js's posed()/mergedMesh(). */
function posed(geo, { x = 0, y = 0, z = 0 } = {}) {
  return geo.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z))
}

function mergedMesh(geoms, material) {
  return new THREE.Mesh(mergeGeometries(geoms), material)
}

/** Tokyo Metropolitan Government Building No.1 — 243 m, 48 floors. */
function createTocho() {
  const g = new THREE.Group()
  const U = 1 / 5
  const PODIUM_H = 33 * U, SPLIT_Y = 169 * U, TOP_Y = 243 * U

  // Podium and spire base: unique footprints, so each stays its own mesh —
  // nothing else shares their size to merge with.
  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(26, PODIUM_H, 22),
    texturedSlabMaterial(26, PODIUM_H, { lit: 0.62 }),
  )
  podium.position.set(0, PODIUM_H / 2, 0)
  g.add(podium)

  const spireH = SPLIT_Y - PODIUM_H
  const spire = new THREE.Mesh(
    new THREE.BoxGeometry(15, spireH, 15),
    texturedSlabMaterial(15, spireH),
  )
  spire.position.set(0, PODIUM_H + spireH / 2, 0)
  g.add(spire)

  // Four corner mullions: identical geometry — one shared texture and one
  // merged mesh instead of four separate draw calls.
  const cornerH = spireH + 1.0
  const cornerMat = texturedSlabMaterial(2.6, cornerH, { lit: 0.22 })
  const cornerGeos = [[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([sx, sz]) =>
    posed(new THREE.BoxGeometry(2.6, cornerH, 2.6),
      { x: sx * 6.3, y: PODIUM_H + cornerH / 2, z: sz * 6.3 }))
  g.add(mergedMesh(cornerGeos, cornerMat))

  // The signature: one mass rising from the podium that bifurcates into twin
  // towers at floor 33 of 48 — mirrored geometry, one shared texture, one
  // merged mesh. This is what makes it identifiable.
  const legH = TOP_Y - SPLIT_Y
  const legMat = texturedSlabMaterial(5.25, legH)
  const legGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(5.25, legH, 12), { x: sx * 4.9, y: SPLIT_Y + legH / 2, z: 0 }))
  g.add(mergedMesh(legGeos, legMat))

  // Roof caps: flat colour, identical geometry mirrored — one merged mesh.
  const capMat = new THREE.MeshLambertMaterial({ color: 0x6a7286 })
  const capGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(3.9, 1.6, 9), { x: sx * 4.9, y: TOP_Y + 0.8, z: 0 }))
  g.add(mergedMesh(capGeos, capMat))

  // Antenna masts: same treatment.
  const mastMat = new THREE.MeshLambertMaterial({ color: 0x7a8394 })
  const mastGeos = [-1, 1].map((sx) =>
    posed(new THREE.CylinderGeometry(0.12, 0.2, 6, 6), { x: sx * 4.9, y: TOP_Y + 1.6 + 3, z: 0 }))
  g.add(mergedMesh(mastGeos, mastMat))

  // Aircraft-warning lights: unlit, self-lit red — merge the two spheres.
  const warnMat = new THREE.MeshBasicMaterial({ color: 0xff2b2b })
  const warnGeos = [-1, 1].map((sx) =>
    posed(new THREE.SphereGeometry(0.34, 10, 10), { x: sx * 4.9, y: TOP_Y + 1.6 + 6.2, z: 0 }))
  g.add(mergedMesh(warnGeos, warnMat))

  return g
}

/** Mode Gakuen Cocoon Tower — 204 m. The lattice is a texture, not geometry. */
function createCocoon() {
  const g = new THREE.Group()
  const H = 204 / 5          // spike units
  const R = 6.6               // the real Cocoon is squat; too slim reads as a tube

  // Elliptical cocoon: narrow at the base, bulging at mid-height, tapering to
  // a rounded crown.
  const profile = [
    [0.52, 0], [0.74, 0.08], [0.92, 0.22], [1.0, 0.42],
    [0.97, 0.6], [0.86, 0.78], [0.62, 0.93], [0.3, 1.0],
  ].map(([rf, hf]) => new THREE.Vector2(rf * R, hf * H))

  const { map, emissiveMap } = latticeTexture()
  const body = new THREE.Mesh(
    new THREE.LatheGeometry(profile, 28),
    new THREE.MeshLambertMaterial({
      map, emissiveMap, emissive: 0xffffff, emissiveIntensity: 0.42,
    }),
  )
  body.scale.z = 0.68        // elliptical in plan, not circular
  g.add(body)

  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(13, 2.4, 10),
    new THREE.MeshLambertMaterial({ color: 0x2a2f3a }),
  )
  podium.position.y = 1.2
  g.add(podium)

  return g
}

/** Both landmarks, table-driven from cityLayout.js's LANDMARK_SITES. */
export function createTowers() {
  const group = new THREE.Group()

  const tochoSite = LANDMARK_SITES.find((s) => s.id === 'tocho')
  const tocho = createTocho()
  tocho.scale.setScalar(tochoSite.h / TOCHO_SPIKE_H)
  const tPos = lotGroupCenter(tochoSite.cell, tochoSite.lots)
  tocho.position.set(tPos.x, 0, tPos.z)
  group.add(tocho)

  const cocoonSite = LANDMARK_SITES.find((s) => s.id === 'cocoon')
  const cocoon = createCocoon()
  cocoon.scale.setScalar(cocoonSite.h / COCOON_SPIKE_H)
  const cPos = lotGroupCenter(cocoonSite.cell, cocoonSite.lots)
  cocoon.position.set(cPos.x, 0, cPos.z)
  group.add(cocoon)

  return group
}
