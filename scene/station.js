// Shinjuku Station: the centrepiece the whole city grid is arranged around.
// A sprawling low concourse straddling the centre block, with elevated tracks
// running through it and out both ends of the map — the thing that makes the
// station read as a station rather than a big shed.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { STATION, STREET, STREET_LINES, MAP_HALF, blockCenter } from './cityLayout.js'
import { CYAN, AMBER, WARM, GRANITE } from './palette.js'
import { createSignTexture } from './signTexture.js'
import { createLightPool } from './lightPool.js'

const W = STATION.w, D = STATION.d, H = STATION.h   // 44, 44, 13

// The elevated deck sits at STATION.viaductY; the concourse walls below it stop
// exactly where the deck begins, and the canopy above fills the rest of the
// envelope up to STATION.h. One consistent stack, no separate roof slab needed:
//   0 ────────── PODIUM_H  concourse walls (ticket hall, entrances)
//   PODIUM_H ── DECK_TOP   structural deck (rails on top)
//   DECK_TOP ── H          canopy over the platforms
const DECK_TOP = STATION.viaductY          // 8.5 — top surface the rails sit on
const DECK_THICK = 0.8
const PODIUM_H = DECK_TOP - DECK_THICK     // 7.7

const DECK_WIDTH = 22                      // x-span of the elevated structure
const TRACK_SPACING = 3.2
const RAIL_W = 0.18, RAIL_H = 0.14

const CANOPY_LEN = 42                      // canopy only covers the station block
const ROOF_THICK = 1.5
const ROOF_TOP = H                         // canopy roof caps the whole envelope
const ROOF_UNDERSIDE = ROOF_TOP - ROOF_THICK
const COLUMN_X = DECK_WIDTH / 2 - 0.8      // just inside the platform edge

const OVERHANG = 12                        // deck/rails run this far past the map edge
const DECK_LEN = 2 * (MAP_HALF + OVERHANG)

const hex = (n) => '#' + n.toString(16).padStart(6, '0')

// Deterministic LCG — same idiom as cityLayout.js, so the facade's window
// pattern is stable across reloads.
function makeRng(seed) {
  let s = seed
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
}

/** Clones a geometry with a transform baked in, ready for mergeGeometries. */
function posed(geo, { x = 0, y = 0, z = 0, ry = 0 }) {
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(x, y, z),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)),
    new THREE.Vector3(1, 1, 1),
  )
  return geo.applyMatrix4(m)
}

function mergedMesh(geoms, material) {
  return new THREE.Mesh(mergeGeometries(geoms), material)
}

// ── Concourse facade: granite piers + a scatter of lit windows ──────────────
// W === D here, so one texture reads correctly on all four walls without
// needing separate front/side art.
function concourseFacade(w, h) {
  const PX = 8 // px per metre
  const cw = Math.round(w * PX), ch = Math.round(h * PX)
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = cw; c.height = ch
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()
  // 8% luminance was near-indistinguishable from the sky, so the largest
  // structure on the map had no silhouette. Bays here were already sized in
  // world metres (2.6m, below), so albedo was this facade's only real defect.
  g.fillStyle = '#404857'; g.fillRect(0, 0, cw, ch)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, cw, ch)

  const rng = makeRng(20260731)
  const bayW = 2.6 * PX
  const bays = Math.round(cw / bayW)
  for (let i = 0; i < bays; i++) {
    const x = i * bayW
    if (i % 3 === 0) {
      // Granite pier — echoes the Tocho facade language used elsewhere in the city.
      g.fillStyle = hex(GRANITE)
      g.fillRect(x, 0, bayW * 0.35, ch)
      continue
    }
    const wy = ch * 0.18, wh = ch * 0.64
    if (rng() > 0.55) {        // not every bay is lit — real buildings are patchy at night
      g.fillStyle = 'rgba(0,0,0,0.22)'   // but an unlit bay still shows the glazing
      g.fillRect(x + bayW * 0.15, wy, bayW * 0.7, wh)
      continue
    }
    const col = rng() > 0.3 ? hex(WARM) : '#a8cfe8'
    g.fillStyle = col;  g.fillRect(x + bayW * 0.15, wy, bayW * 0.7, wh)
    ge.fillStyle = col; ge.fillRect(x + bayW * 0.15, wy, bayW * 0.7, wh)
  }

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

// ── Roofs ───────────────────────────────────────────────────────────────────
// Under this camera (azimuth 45°, elevation 22°) the roof is the single largest
// visible surface of the station — the canopy alone is 24x42 m, about 115x200 px
// at zoom 1. Left flat and untextured it is what made the centrepiece read as a
// grey slab. Both roofs below are texture work, not geometry: at ~4.8 px per
// metre nothing finer than ~3 m would survive as geometry anyway.

/**
 * Train-shed roof seen from above: standing-seam metal running parallel to the
 * tracks, broken by glazing strips that let the platform light below read
 * through. The glazing is the whole point — an opaque roof over a lit platform
 * is indistinguishable from a warehouse.
 *
 * BoxGeometry's +Y face maps u across X and v along Z, so seams drawn as
 * vertical lines in the canvas end up running along the track axis.
 */
function canopyRoofTexture(w, len) {
  const PX = 12
  const cw = Math.round(w * PX), ch = Math.round(len * PX)
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = cw; c.height = ch
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()

  g.fillStyle = '#1a2230'; g.fillRect(0, 0, cw, ch)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, cw, ch)

  const uOf = (x) => ((x + w / 2) / w) * cw

  // Standing seams every 1.2 m, the pitch that reads as a shed rather than a slab.
  g.strokeStyle = 'rgba(0,0,0,0.55)'
  g.lineWidth = 1.5
  for (let x = -w / 2; x <= w / 2; x += 1.2) {
    g.beginPath(); g.moveTo(uOf(x), 0); g.lineTo(uOf(x), ch); g.stroke()
  }
  g.strokeStyle = 'rgba(255,255,255,0.05)'
  for (let x = -w / 2 + 0.6; x <= w / 2; x += 1.2) {
    g.beginPath(); g.moveTo(uOf(x), 0); g.lineTo(uOf(x), ch); g.stroke()
  }

  // Glazing over the gaps between track pairs. Warm, because what shows through
  // is the platform lighting — the same WARM the concourse windows use.
  const GLAZE_W = 2.0
  for (const cx of [-6.4, 0, 6.4]) {
    const x0 = uOf(cx - GLAZE_W / 2), x1 = uOf(cx + GLAZE_W / 2)
    for (const [ctx, base] of [[g, hex(WARM)], [ge, hex(WARM)]]) {
      ctx.fillStyle = base
      // Broken into bays with mullions between, so it reads as glazing rather
      // than a light bar.
      for (let y = 0; y < ch; y += PX * 3) {
        ctx.fillRect(x0, y + PX * 0.35, x1 - x0, PX * 3 - PX * 0.7)
      }
    }
  }

  // Cross ribs every 8 m, matching the column bays underneath.
  g.fillStyle = 'rgba(0,0,0,0.4)'
  for (let z = 0; z <= len; z += 8) g.fillRect(0, (z / len) * ch, cw, 2)

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

/**
 * The concourse roof deck. Only the two ~10 m strips either side of the canopy
 * are actually visible, but those are ~48x210 px each — big enough that the
 * facade texture leaking onto a horizontal surface was reading as noise.
 * Plant, ducting and parapet, all painted.
 */
function podiumRoofTexture(size) {
  const PX = 6
  const n = Math.round(size * PX)
  const c = document.createElement('canvas')
  c.width = n; c.height = n
  const g = c.getContext('2d')

  // Kept well below the facades — a roof has no windows lighting it from
  // inside — but off sky-black, or the podium's top face vanishes and the
  // station reads as a wall with nothing on top of it.
  g.fillStyle = '#252b36'; g.fillRect(0, 0, n, n)

  // Membrane seams — wide, flat, low contrast. Roofs are not tiled.
  g.strokeStyle = 'rgba(255,255,255,0.035)'
  g.lineWidth = 1
  for (let i = 0; i < n; i += PX * 3) {
    g.beginPath(); g.moveTo(0, i); g.lineTo(n, i); g.stroke()
  }

  const rng = makeRng(20260801)
  // Rooftop plant: AC banks and vent stacks. Drawn as plan-view boxes with a
  // single offset shadow, which is all the depth cue this camera can resolve.
  for (let i = 0; i < 26; i++) {
    const bw = (2 + rng() * 4) * PX
    const bh = (2 + rng() * 3) * PX
    const x = rng() * (n - bw), y = rng() * (n - bh)
    g.fillStyle = 'rgba(0,0,0,0.45)'
    g.fillRect(x + 3, y + 3, bw, bh)
    g.fillStyle = rng() > 0.7 ? '#3a4150' : '#2e3441'   // tracks the lifted roof base
    g.fillRect(x, y, bw, bh)
    g.strokeStyle = 'rgba(255,255,255,0.08)'
    g.strokeRect(x + 0.5, y + 0.5, bw - 1, bh - 1)
  }

  // Parapet: a bright-ish inner edge is what tells you the roof has a lip.
  g.strokeStyle = '#2a2f3a'
  g.lineWidth = PX * 0.8
  g.strokeRect(PX * 0.4, PX * 0.4, n - PX * 0.8, n - PX * 0.8)

  return Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
}

/**
 * Warm strips along the platform edges, in the 3 m band between the deck and
 * the canopy underside. Without them that band is solid black and the station
 * reads as unoccupied — this is the cheapest possible "there are people in
 * there" cue, and it is what the glazing above is meant to be leaking.
 */
function buildPlatformGlow() {
  const geos = []
  for (const cx of [-6.4, 0, 6.4]) {
    geos.push(posed(
      new THREE.BoxGeometry(2.0, 0.12, CANOPY_LEN - 4),
      { x: cx, y: DECK_TOP + 0.9, z: 0 },
    ))
  }
  return mergedMesh(geos, new THREE.MeshBasicMaterial({ color: WARM }))
}

// side 'z' -> opening faces +/-Z (north/south); side 'x' -> faces +/-X (east/west).
// insetFromEdge is measured from the wall's outer surface to the box's centre.
function portalPose(side, sign, w, h, insetFromEdge) {
  const halfX = W / 2, halfZ = D / 2
  const off = (side === 'z' ? halfZ : halfX) - insetFromEdge
  return side === 'z'
    ? { w, h, x: 0, y: h / 2, z: sign * off, ry: 0 }
    : { w, h, x: sign * off, y: h / 2, z: 0, ry: Math.PI / 2 }
}

// [side, sign, width, height] — south is the primary, camera-facing entrance;
// the other three exist so the station reads as a place with traffic on every
// side, not just a stage-front cutout.
const PORTAL_DEFS = [
  ['z',  1, 12, 5.5],  // south — サザン (south terrace), faces the camera
  ['z', -1,  7, 4.5],  // north — 北口広場 (north exit plaza)
  ['x',  1,  7, 4.5],  // east  — toward 伊勢丹
  ['x', -1,  7, 4.5],  // west  — toward the tower district
]
const FRAME_D = 1.0
const GLOW_D = 0.2

function buildPortals() {
  const frameGeos = [], glowGeos = []
  for (const [side, sign, w, h] of PORTAL_DEFS) {
    const frame = portalPose(side, sign, w, h, FRAME_D / 2)
    frameGeos.push(posed(new THREE.BoxGeometry(frame.w, frame.h, FRAME_D), frame))

    // Sits at the back of the reveal, so the doorway reads as lit from inside
    // rather than as a glowing panel stuck on the wall.
    const glow = portalPose(side, sign, w * 0.7, h * 0.7, FRAME_D + 0.3)
    glowGeos.push(posed(new THREE.BoxGeometry(glow.w, glow.h, GLOW_D), glow))
  }
  const frameMat = new THREE.MeshLambertMaterial({ color: 0x14161d })
  const glowMat = new THREE.MeshBasicMaterial({ color: WARM })
  return [mergedMesh(frameGeos, frameMat), mergedMesh(glowGeos, glowMat)]
}

// One pool per entrance — the shared module keeps these to a single texture
// and one draw call each, which at four pools is cheaper than baking a merge.
function buildLightPools() {
  return [
    [0, D / 2 + 3, 4],
    [0, -(D / 2 + 2.5), 3],
    [W / 2 + 2.5, 0, 3],
    [-(W / 2 + 2.5), 0, 3],
  ].map(([x, z, radius]) => {
    const pool = createLightPool({ color: AMBER, radius, intensity: 0.5 })
    pool.position.set(x, 0.03, z)
    return pool
  })
}

// Elevated deck + rails, running the FULL map length along Z (STATION.trackAxis).
// This module only ever builds along Z — trackAxis exists for other modules to
// read, not to make this one axis-generic for a value that never changes.
function buildDeckAndRails() {
  const deckColor = new THREE.Color(0x1c1f27)
  const deckMat = new THREE.MeshLambertMaterial({
    color: deckColor, emissive: deckColor, emissiveIntensity: 0.35,
  })
  const deck = new THREE.Mesh(new THREE.BoxGeometry(DECK_WIDTH, DECK_THICK, DECK_LEN), deckMat)
  deck.position.set(0, DECK_TOP - DECK_THICK / 2, 0)

  const railMat = new THREE.MeshLambertMaterial({
    color: GRANITE, emissive: GRANITE, emissiveIntensity: 0.15,
  })
  const trackXs = Array.from({ length: STATION.trackCount },
    (_, t) => (t - (STATION.trackCount - 1) / 2) * TRACK_SPACING)
  const railGeos = trackXs.map((x) => posed(
    new THREE.BoxGeometry(RAIL_W, RAIL_H, DECK_LEN),
    { x, y: DECK_TOP + RAIL_H / 2 },
  ))
  const rails = mergedMesh(railGeos, railMat)

  return { deck, rails }
}

// Below-deck piers only stand where there is no concourse building to carry the
// load — i.e. in the block north and south of the station, never in the
// station's own footprint (the podium supports the deck there) and never inside
// a street (checked below against STREET_LINES/STREET, per the layout contract).
function buildPiers() {
  const offsets = [-19, -8, 8, 19]
  const zs = [0, 2].flatMap((row) => offsets.map((o) => blockCenter(row) + o))

  const clearsStreets = (z) => STREET_LINES.every((line) => Math.abs(z - line) > STREET / 2)
  for (const z of zs) {
    if (!clearsStreets(z)) throw new Error(`station pier at z=${z} lands inside a street`)
  }

  const mat = new THREE.MeshLambertMaterial({ color: 0x1c1f27 })
  const geos = zs.map((z) => posed(
    new THREE.BoxGeometry(1.2, PODIUM_H, 1.2),
    { x: 0, y: PODIUM_H / 2, z },
  ))
  return mergedMesh(geos, mat)
}

// Platform canopy: one shed roof over all six tracks, ribbed on columns set
// just inside the platform edges. Ribs and columns share a material, so they
// merge into a single mesh — the "don't emit one mesh per rib" budget.
function buildCanopy() {
  const roofTex = canopyRoofTexture(DECK_WIDTH + 2, CANOPY_LEN)
  const roofMat = new THREE.MeshLambertMaterial({
    map: roofTex.map, emissiveMap: roofTex.emissiveMap,
    emissive: 0xffffff, emissiveIntensity: 0.55,
  })
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(DECK_WIDTH + 2, ROOF_THICK, CANOPY_LEN),
    roofMat,
  )
  roof.position.set(0, ROOF_TOP - ROOF_THICK / 2, 0)

  const structMat = new THREE.MeshLambertMaterial({ color: 0x22252d })
  const zs = [-16, -8, 0, 8, 16]
  const geos = []
  for (const z of zs) {
    for (const sx of [-1, 1]) {
      geos.push(posed(
        new THREE.BoxGeometry(0.5, ROOF_UNDERSIDE - DECK_TOP, 0.5),
        { x: sx * COLUMN_X, y: (DECK_TOP + ROOF_UNDERSIDE) / 2, z },
      ))
    }
    geos.push(posed(
      new THREE.BoxGeometry(DECK_WIDTH + 2, 0.4, 0.6),
      { x: 0, y: ROOF_UNDERSIDE, z },
    ))
  }
  return { roof, structure: mergedMesh(geos, structMat) }
}

export function createStation() {
  const group = new THREE.Group()

  const facade = concourseFacade(W, PODIUM_H)
  const podiumMat = new THREE.MeshLambertMaterial({
    map: facade.map, emissiveMap: facade.emissiveMap,
    emissive: 0xffffff, emissiveIntensity: 0.6,
  })
  const podium = new THREE.Mesh(new THREE.BoxGeometry(W, PODIUM_H, D), podiumMat)
  podium.position.set(0, PODIUM_H / 2, 0)
  group.add(podium)

  // A separate plane rather than a per-face material array on the box: a
  // multi-material BoxGeometry renders one draw call per face group (six),
  // whereas this costs exactly one and gives the roof its own UV space.
  const roofDeck = new THREE.Mesh(
    new THREE.PlaneGeometry(W, D),
    new THREE.MeshLambertMaterial({ map: podiumRoofTexture(W) }),
  )
  roofDeck.rotation.x = -Math.PI / 2
  roofDeck.position.y = PODIUM_H + 0.02
  group.add(roofDeck)

  const [frames, glows] = buildPortals()
  group.add(frames, glows)
  group.add(...buildLightPools())

  const { deck, rails } = buildDeckAndRails()
  group.add(deck, rails)
  group.add(buildPiers())

  const { roof, structure } = buildCanopy()
  group.add(roof, structure)
  group.add(buildPlatformGlow())

  // Station nameplate, mounted above the south entrance — the facade that
  // faces the camera most directly (azimuth 45° makes +X and +Z equally
  // foreshortened; +Z is picked to match the alley's existing front-faces-+Z
  // convention, and it's the side the サザン block sits in front of).
  const name = createSignTexture({ text: '新宿駅', style: 'lightbox', orientation: 'horizontal', color: hex(CYAN), px: 512 })
  const nameMat = new THREE.MeshBasicMaterial({ map: name.map })
  const nameW = 10
  const nameMesh = new THREE.Mesh(new THREE.PlaneGeometry(nameW, nameW / name.aspect), nameMat)
  nameMesh.position.set(0, 7.0, D / 2 + 0.35)
  group.add(nameMesh)

  // Platform guide, on the canopy fascia over the south end of the tracks.
  const plat = createSignTexture({ text: '1-6', sub: 'のりば', style: 'neon', orientation: 'horizontal', color: hex(AMBER), px: 256 })
  const platMat = new THREE.MeshBasicMaterial({ map: plat.map })
  const platW = 6
  const platMesh = new THREE.Mesh(new THREE.PlaneGeometry(platW, platW / plat.aspect), platMat)
  platMesh.position.set(0, DECK_TOP + 2.2, CANOPY_LEN / 2 + 0.1)
  group.add(platMesh)

  // Where the departure board hangs. Local +Z already matches this facade's
  // outward normal, so no rotation is needed — just parent the board here.
  //
  // The height is load-bearing, not taste. At ground level the board sat BEHIND
  // the elevated deck from this camera's angle: the sightline runs +x/+y/+z at
  // ~0.572 rise per metre of x, so a row below y≈6.8 climbed into the deck's
  // 7.7-8.5 band while still inside its x-span and was hidden. Six of nine rows
  // were occluded at every zoom — and since renderer.js now rejects clicks
  // through opaque geometry, hidden rows were also unclickable, which broke the
  // board's whole job as the second route to every project.
  //
  // Mounting above DECK_TOP is the only fix that keeps the board's width, and
  // width is what makes it readable — the texture's aspect is fixed, so
  // narrowing it to squeeze past the deck shrinks the type instead.
  const BOARD_BASE = 2.6                     // departureBoard.js's own bottom offset
  const boardAnchor = new THREE.Object3D()
  boardAnchor.position.set(-14, DECK_TOP + 0.3 - BOARD_BASE, D / 2 + 0.3)
  group.add(boardAnchor)

  return { group, boardAnchor, trackY: DECK_TOP }
}
