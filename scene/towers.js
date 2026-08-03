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
// tocho's site centres at x=-52.8, z=-9.6 (lotGroupCenter of its LANDMARK_SITES
// lots — a 5-lot group since the complex grew a No.2 Building and an Assembly
// Building alongside No.1), so its ground level projects to
// screenY = -0.265*(-52.8-9.6) = 16.5. renderer.js's resize() computes
// frustum = max(CONTENT_H, CONTENT_W/aspect) with CONTENT_H=145; the smallest
// that ever gets is 145 itself, on wide screens where CONTENT_H binds — the
// worst case across every aspect ratio. The frame is centred on CONTENT_CY=21.3,
// so the frame top sits at 21.3 + 145/2 = 93.8. Headroom above tocho's own
// ground level is therefore (93.8 - 16.5) / 0.927 = ~83 m — comfortably more
// than the 35-45 m target, so LANDMARK_SITES' heights (40 m tocho, 34 m cocoon,
// matching the real 243:204 ratio) are a legibility choice, not one forced by
// clipping. The bifurcation (at 169/243 of tocho's height, unchanged by
// rescaling) and the mast/warning-light apex above the roof both land far
// inside that margin.
const TOCHO_SPIKE_H = 48.6    // 243 real metres / 5 metres-per-spike-unit
const COCOON_SPIKE_H = 40.8   // 204 real metres / 5 metres-per-spike-unit
const COCOON_R = 6.6           // Cocoon's lathe radius; shared with latticeTexture()

let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

/**
 * Tange's facade: alternating granite piers and dark glass, subdivided at two
 * scales, which is what gives 都庁 its "circuit board" read. Returns separate
 * colour and emissive canvases so only the glass glows.
 */
// `lit` is a fraction of GLASS CELLS, and sizing bays in world metres cut the
// spire from 714 cells to 28 — so holding the old fraction cuts lit *area* by
// the same 25x. It has to go UP as bays get coarser, not down: 0.45 of 21 glass
// cells is ~9 lit windows, which reads as an occupied tower at night. At 0.15 it
// was ~2, and 都庁 rendered as an abandoned slab next to glowing filler towers.
function facade(cols, rows, { lit = 0.45, pxCol = 24, pxRow = 14 } = {}) {
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g]  = mk()
  const [cEmi, ge] = mk()

  // Mid grey-blue mass, not near-black: with bays this coarse (see
  // texturedSlabMaterial) the building itself has to carry the read as a lit
  // mass, and renderer.js's ambient/moon lights (swallowed by the old 14%
  // albedo) finally have something to bounce off. Still short of a daylit ~55%
  // on purpose — this is a night scene and the neon signs stay the brightest
  // thing on screen.
  g.fillStyle = '#565f70'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  // One pier every 4th bay. The old two-scale signature
  // (sig[i%8] && sig[floor(i/8)%8]) assumed ~21 columns; once
  // texturedSlabMaterial started sizing bays in world metres the spire dropped
  // to 4 columns, where floor(i/8) is always 0 and the rule collapses to
  // sig[i%8] — 50% piers instead of 19%, which left 14 glass cells on the whole
  // tower. There is no second scale to subdivide at 4 bays, so don't pretend
  // there is: a flat modulo holds ~25% piers at any column count.
  const isPier = (i) => i % 4 === 0

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
      if (rnd() > lit) {
        // Unlit windows still darken the base, so the grid reads where nothing
        // is lit — otherwise a low `lit` fraction leaves most of the facade as
        // undifferentiated fill and the glow does all the work again.
        g.fillStyle = 'rgba(0,0,0,0.22)'
        g.fillRect(x + 3, y + 2, pxCol - 6, pxRow - 5)
        continue
      }
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

/** The Cocoon's woven diagonal lattice — a texture, not geometry.
 * `scale` (cocoonSite.h / COCOON_SPIKE_H) is the same landmark-compression
 * factor towers.js applies everywhere else: a fixed pixel pitch on this canvas
 * has the same "detailed enough for the uncompressed building, mush after
 * compression" problem texturedSlabMaterial() has, so the weave pitch and lit-
 * cell pitch are derived from the FINAL world circumference/height instead of
 * hardcoded, targeting ~3m per feature like the tower facades. */
function latticeTexture(scale) {
  const w = 512, h = 1024
  const worldH = COCOON_SPIKE_H * scale                          // == cocoonSite.h exactly
  const worldCirc = Math.PI * (COCOON_R + COCOON_R * 0.68) * scale // widest ring (elliptical)
  const cellPitch = Math.round(3.0 * (h / worldH))
  const lineSpacing = Math.round(3.0 * (w / worldCirc))

  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')
  const e = document.createElement('canvas')
  e.width = w; e.height = h
  const ge = e.getContext('2d')

  g.fillStyle = '#161c28'; g.fillRect(0, 0, w, h)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  // Lit cells behind the lattice.
  for (let y = 0; y < h; y += cellPitch) {
    for (let x = 0; x < w; x += cellPitch) {
      if (rnd() > 0.34) continue
      const col = rnd() > 0.5 ? '#cfe6f5' : '#e8d4a8'
      const inset = cellPitch * 0.15
      g.fillStyle = col;  g.fillRect(x + inset, y + inset, cellPitch - inset * 2, cellPitch - inset * 2)
      ge.fillStyle = col; ge.fillRect(x + inset, y + inset, cellPitch - inset * 2, cellPitch - inset * 2)
    }
  }

  // The weave: two sets of diagonals, drawn on both canvases so the white
  // ribs glow faintly the way the real building's lighting picks them out.
  for (const dir of [1, -1]) {
    for (let i = -h; i < w + h; i += lineSpacing) {
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

/** A facade texture sized to match a `w x h` slab, as a ready-to-use material.
 * `scale` is the SAME factor createTowers() applies to the whole landmark group
 * (site.h / <real height in spike units>) — bay counts have to come from the
 * FINAL WORLD SIZE the slab renders at (`w * scale`), not its pre-compression
 * local size, or the texture stays detailed enough for the uncompressed 243m
 * building and mipmaps to grey mush once the group is squeezed down to 40m.
 * ~3m per bay matches CLAUDE.md's "anything finer than ~3m is invisible" floor
 * for geometry — this is the texture-density analogue of that same limit. */
function texturedSlabMaterial(w, h, scale, opts = {}) {
  const worldW = w * scale
  const worldH = h * scale
  const { map, emissiveMap } = facade(
    Math.max(3, Math.round(worldW / 3.0)),
    Math.max(3, Math.round(worldH / 3.0)),
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

/**
 * The 都庁 complex: No.1 (243m, twin-tower bifurcation), No.2 (163m), and the
 * low semicircular Assembly Building (41m) around a plaza. `scale` is
 * site.h / TOCHO_SPIKE_H, threaded down to every texturedSlabMaterial() call
 * so bay density is derived once, not recomputed per-piece (see that function).
 */
function createTocho(scale) {
  const g = new THREE.Group()
  const U = 1 / 5
  const PODIUM_H = 33 * U, SPLIT_Y = 169 * U, TOP_Y = 243 * U

  // No.1 sits centred in its own group by default (local 0,0), but the group's
  // anchor (cityLayout.js's lotGroupCenter of tocho's 5 lots) sits only ~19m
  // from venue-search's fixed building at world (-72,0). A podium widened to a
  // literal 3x the spire's width (45 local, ~37m world) does not fit in the
  // ~35m gap between venue-search and this block's own east edge no matter how
  // it's shifted — the two constraints are mutually exclusive (verified by
  // bounding-box arithmetic, not eyeballed). NO1_DX/DZ nudge the whole tower
  // toward the block's open centre, and the podium is widened as far as that
  // gap actually allows (2.5x, not the full 3x) — short of the brief's literal
  // number, but real: any wider collides with venue-search or the street.
  const NO1_DX = 3.5, NO1_DZ = 4.4

  // No.1: podium and spire base are unique footprints, so each stays its own
  // mesh — nothing else shares their size to merge with.
  const podium = new THREE.Mesh(
    new THREE.BoxGeometry(38, PODIUM_H, 34),
    texturedSlabMaterial(38, PODIUM_H, scale, { lit: 0.4 }),
  )
  podium.position.set(NO1_DX, PODIUM_H / 2, NO1_DZ)
  g.add(podium)

  const spireH = SPLIT_Y - PODIUM_H
  const spire = new THREE.Mesh(
    new THREE.BoxGeometry(15, spireH, 15),
    texturedSlabMaterial(15, spireH, scale),
  )
  spire.position.set(NO1_DX, PODIUM_H + spireH / 2, NO1_DZ)
  g.add(spire)

  // Four corner mullions: identical geometry — one shared texture and one
  // merged mesh instead of four separate draw calls.
  const cornerH = spireH + 1.0
  const cornerMat = texturedSlabMaterial(2.6, cornerH, scale, { lit: 0.25 })
  const cornerGeos = [[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([sx, sz]) =>
    posed(new THREE.BoxGeometry(2.6, cornerH, 2.6),
      { x: NO1_DX + sx * 6.3, y: PODIUM_H + cornerH / 2, z: NO1_DZ + sz * 6.3 }))
  g.add(mergedMesh(cornerGeos, cornerMat))

  // The signature: one mass rising from the podium that bifurcates into twin
  // towers at floor 33 of 48 — mirrored geometry, one shared texture, one
  // merged mesh. This is what makes it identifiable.
  const legH = TOP_Y - SPLIT_Y
  const legMat = texturedSlabMaterial(5.25, legH, scale)
  const legGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(5.25, legH, 12),
      { x: NO1_DX + sx * 4.9, y: SPLIT_Y + legH / 2, z: NO1_DZ }))
  g.add(mergedMesh(legGeos, legMat))

  // Roof caps: flat colour, identical geometry mirrored — one merged mesh.
  const capMat = new THREE.MeshLambertMaterial({ color: 0x6a7286 })
  const capGeos = [-1, 1].map((sx) =>
    posed(new THREE.BoxGeometry(3.9, 1.6, 9), { x: NO1_DX + sx * 4.9, y: TOP_Y + 0.8, z: NO1_DZ }))
  g.add(mergedMesh(capGeos, capMat))

  // Antenna masts: same treatment.
  const mastMat = new THREE.MeshLambertMaterial({ color: 0x7a8394 })
  const mastGeos = [-1, 1].map((sx) =>
    posed(new THREE.CylinderGeometry(0.12, 0.2, 6, 6),
      { x: NO1_DX + sx * 4.9, y: TOP_Y + 1.6 + 3, z: NO1_DZ }))
  g.add(mergedMesh(mastGeos, mastMat))

  // Aircraft-warning lights: unlit, self-lit red — merge the two spheres.
  const warnMat = new THREE.MeshBasicMaterial({ color: 0xff2b2b })
  const warnGeos = [-1, 1].map((sx) =>
    posed(new THREE.SphereGeometry(0.34, 10, 10),
      { x: NO1_DX + sx * 4.9, y: TOP_Y + 1.6 + 6.2, z: NO1_DZ }))
  g.add(mergedMesh(warnGeos, warnMat))

  // No.2 Building — a plainer single slab in the newly-claimed lot [0,0], real
  // 163m compresses through the same U/scale chain to ~27m. One mesh, one
  // draw call: no podium or roof detail of its own, since nothing in the
  // brief asks for one and the pair reads fine as "tall twin-towered one,
  // shorter plain one." Position is a LOCAL offset — everything in this group
  // is scaled by `scale` before rendering, so a target WORLD position has to
  // be divided by `scale` to land there (site world centre - group anchor,
  // over scale); this lands on lot [0,0]'s own centre, clear of both
  // venue-search and No.1's podium (verified by bounding-box arithmetic).
  const noTwoH = 163 * U
  const noTwo = new THREE.Mesh(
    new THREE.BoxGeometry(12, noTwoH, 10),
    texturedSlabMaterial(12, noTwoH, scale),
  )
  noTwo.position.set(-23.33, noTwoH / 2, -7.78)
  g.add(noTwo)

  // Assembly Building (都議会議事堂) — low and semicircular, the piece that
  // makes the group read as a complex rather than a lone tower. A half-drum
  // gives the curved frontage from geometry directly, real 41m compresses to
  // ~7m; radius kept to 7 (not a rounder 9) because the gap between No.1's
  // podium and Cocoon to its south-east is only ~15m — verified to clear both
  // with margin at this size. thetaStart is centred on the (+X,+Z) bisector —
  // this camera's azimuth is fixed at 45 degrees (renderer.js), so the curved
  // face always points at it and the two flat cut ends CylinderGeometry
  // leaves open on a partial sweep land on the far side, out of view, with no
  // extra geometry needed to cap them.
  const assemblyH = 41 * U
  const assembly = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7, assemblyH, 16, 1, false, -Math.PI / 4, Math.PI),
    new THREE.MeshLambertMaterial({ color: 0x565f70 }),
  )
  assembly.position.set(15.55, assemblyH / 2, 29.89)
  g.add(assembly)

  return g
}

/** Mode Gakuen Cocoon Tower — 204 m. The lattice is a texture, not geometry.
 * `scale` is cocoonSite.h / COCOON_SPIKE_H, threaded to latticeTexture() so its
 * weave pitch is derived from the final compressed size (see that function). */
function createCocoon(scale) {
  const g = new THREE.Group()
  const H = 204 / 5          // spike units
  const R = COCOON_R          // the real Cocoon is squat; too slim reads as a tube

  // Elliptical cocoon: narrow at the base, bulging at mid-height, tapering to
  // a rounded crown.
  const profile = [
    [0.52, 0], [0.74, 0.08], [0.92, 0.22], [1.0, 0.42],
    [0.97, 0.6], [0.86, 0.78], [0.62, 0.93], [0.3, 1.0],
  ].map(([rf, hf]) => new THREE.Vector2(rf * R, hf * H))

  const { map, emissiveMap } = latticeTexture(scale)
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
  const tochoScale = tochoSite.h / TOCHO_SPIKE_H
  const tocho = createTocho(tochoScale)
  tocho.scale.setScalar(tochoScale)
  const tPos = lotGroupCenter(tochoSite.cell, tochoSite.lots)
  tocho.position.set(tPos.x, 0, tPos.z)
  group.add(tocho)

  const cocoonSite = LANDMARK_SITES.find((s) => s.id === 'cocoon')
  const cocoonScale = cocoonSite.h / COCOON_SPIKE_H
  const cocoon = createCocoon(cocoonScale)
  cocoon.scale.setScalar(cocoonScale)
  const cPos = lotGroupCenter(cocoonSite.cell, cocoonSite.lots)
  cocoon.position.set(cPos.x, 0, cPos.z)
  group.add(cocoon)

  return group
}
