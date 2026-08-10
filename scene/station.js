// Shinjuku Station: the centrepiece the whole city grid is arranged around.
//
// The station occupies the WHOLE CENTRE COLUMN (STATION.cells, cityLayout.js)
// — an open rail CORRIDOR at grade, not a podium on a viaduct. Concourse
// buildings are cross-decks BRIDGING the corridor (see CROSS_DECKS), and the
// four E-W streets already sit at y=0 spanning the corridor width, so they
// read as road bridges over the tracks with no extra geometry of their own.
//
// The old design was a 44x44m podium standing IN the space the corridor now
// occupies, on an 8.5m viaduct. Both had to go entirely — a podium can't
// coexist with a corridor running through the same footprint, and a viaduct
// has nothing left to carry once the tracks are down at grade. Nothing below
// derives from that old stack (no PODIUM_H, no DECK_TOP): every vertical
// constant here is independent, specifically because letting one negative
// value flow through a chain of derived constants is exactly how the old
// podium's facade canvas would have ended up sized at a negative height.
//
// Two things sit BELOW grade (TRENCH_FLOOR_Y, RAIL_Y) so they can run the
// corridor's full length, including under the road bridges, without a
// collision. Everything else that stands taller than the road slab —
// platforms, canopy vaults, catenary, standing trains — is deliberately
// CONFINED to the centre cell's own z-range ([1,1], z in [-21,21]) rather
// than spanning the whole corridor, for exactly that reason: a platform at
// PLATFORM_Y (above y=0) would clip straight through a road-bridge slab
// anywhere the two coincide in z. Confining them to the centre cell also
// concentrates the most detailed geometry at the map's most visible, least-
// occluded point, rather than spreading it thin across 178m most of which
// this camera can barely resolve.
import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import {
  STATION, MAP_HALF, BLOCK, CORRIDOR_W, TRENCH_FLOOR_Y, RAIL_Y, PLATFORM_Y,
  TRACK_SPACING, PLATFORM_XS, PLATFORM_W, CROSS_DECKS,
} from './cityLayout.js'
import { CYAN, AMBER, WARM, GRANITE, RED, JR_GREEN } from './palette.js'
import { createSignTexture } from './signTexture.js'

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

const RAIL_W = 0.18, RAIL_H = 0.14
const CORRIDOR_LEN = 2 * MAP_HALF   // matches street.js's ground-plane hole exactly

// The centre cell's own usable z-range: BLOCK/2 (23) less the same 2m margin
// CROSS_DECKS' 'concourse' entry already keeps from its street edge. Anything
// that must stay clear of the road bridges at z=+-28 lives inside this.
const STATION_CORE_HALF = BLOCK / 2 - 2   // 21

const WALL_T = 2   // matches cityLayout.js's CORRIDOR_W = BLOCK - 2*WALL_T
// The retaining walls run the FULL corridor, including under the road
// bridges, so their top must stay at/below the road slab's y=0 — the same
// reason street.js's ground plane sits at -0.04 rather than exactly 0.
const WALL_TOP_Y = -0.06

const VAULT_R = 3.4
const VAULT_SPRING_Y = PLATFORM_Y + 0.2
const VAULT_SEGMENTS = 8   // 180/8 = 22.5 degrees per facet, under outline.js's 27-degree threshold

// Three barrel vaults, staggered in length like the reference photo's
// separate platform sheds — not one continuous roof. Confined inside
// STATION_CORE_HALF (+-21) on purpose; see header.
const VAULTS = [
  { x: -6.4, z: [-19, 15] },
  { x: 0, z: [-15, 21] },
  { x: 6.4, z: [-21, 17] },
]

// ── Facade + roof textures, shared across the three cross-decks ─────────────
// ponytail: one shared texture, sized for the tallest/most visible deck (the
// main concourse), is stretched onto the shorter north and southern decks
// too, rather than baking a correctly-proportioned texture per deck via a UV
// atlas. Upgrade path: per-face UV baking like blocks.js's atlas, if the
// stretch ever visibly bugs someone — it hasn't shown up as a problem yet
// because the north/southern decks are the least-visible parts of the scene.

// W===H-agnostic: any w,h reads correctly, no separate front/side art needed.
function concourseFacade(w, h) {
  const PX = 8
  const cw = Math.round(w * PX), ch = Math.round(h * PX)
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = cw; c.height = ch
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()
  g.fillStyle = '#7f8896'; g.fillRect(0, 0, cw, ch)
  ge.fillStyle = '#000';   ge.fillRect(0, 0, cw, ch)

  const rng = makeRng(20260731)
  const bayW = 2.6 * PX
  const bays = Math.round(cw / bayW)
  for (let i = 0; i < bays; i++) {
    const x = i * bayW
    if (i % 3 === 0) {
      g.fillStyle = hex(GRANITE)
      g.fillRect(x, 0, bayW * 0.35, ch)
      continue
    }
    const wy = ch * 0.18, wh = ch * 0.64
    if (rng() > 0.55) {
      g.fillStyle = 'rgba(0,0,0,0.22)'
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

/** Rooftop plant/parapet, plan-view. Shared across all three deck roof caps. */
function deckRoofTexture(size) {
  const PX = 6
  const n = Math.round(size * PX)
  const c = document.createElement('canvas')
  c.width = n; c.height = n
  const g = c.getContext('2d')

  g.fillStyle = '#252b36'; g.fillRect(0, 0, n, n)
  g.strokeStyle = 'rgba(255,255,255,0.035)'
  g.lineWidth = 1
  for (let i = 0; i < n; i += PX * 3) {
    g.beginPath(); g.moveTo(0, i); g.lineTo(n, i); g.stroke()
  }

  const rng = makeRng(20260801)
  for (let i = 0; i < 26; i++) {
    const bw = (2 + rng() * 4) * PX
    const bh = (2 + rng() * 3) * PX
    const x = rng() * (n - bw), y = rng() * (n - bh)
    g.fillStyle = 'rgba(0,0,0,0.45)'
    g.fillRect(x + 3, y + 3, bw, bh)
    g.fillStyle = rng() > 0.7 ? '#3a4150' : '#2e3441'
    g.fillRect(x, y, bw, bh)
    g.strokeStyle = 'rgba(255,255,255,0.08)'
    g.strokeRect(x + 0.5, y + 0.5, bw - 1, bh - 1)
  }

  g.strokeStyle = '#2a2f3a'
  g.lineWidth = PX * 0.8
  g.strokeRect(PX * 0.4, PX * 0.4, n - PX * 0.8, n - PX * 0.8)

  return Object.assign(new THREE.CanvasTexture(c), {
    colorSpace: THREE.SRGBColorSpace, anisotropy: 8,
  })
}

// ── Corridor: trench, rails ──────────────────────────────────────────────────
// Runs the FULL corridor length, including under the road bridges — both stay
// at or below the road slab's y=0, so there is no collision to avoid.
function buildTrench() {
  const floorMat = new THREE.MeshLambertMaterial({ color: 0x14161d })
  const floorGeo = new THREE.BoxGeometry(CORRIDOR_W - 2 * WALL_T, 0.2, CORRIDOR_LEN)
  floorGeo.translate(0, TRENCH_FLOOR_Y - 0.1, 0)
  const floor = new THREE.Mesh(floorGeo, floorMat)

  const wallMat = new THREE.MeshLambertMaterial({
    color: 0x2a2f3a, emissive: 0x2a2f3a, emissiveIntensity: 0.25,
  })
  const wallH = WALL_TOP_Y - TRENCH_FLOOR_Y
  const wallY = (TRENCH_FLOOR_Y + WALL_TOP_Y) / 2
  const sideX = CORRIDOR_W / 2 - WALL_T / 2
  const endZ = MAP_HALF - WALL_T / 2
  const wallGeos = [
    posed(new THREE.BoxGeometry(WALL_T, wallH, CORRIDOR_LEN), { x: -sideX, y: wallY }),
    posed(new THREE.BoxGeometry(WALL_T, wallH, CORRIDOR_LEN), { x: sideX, y: wallY }),
    // End caps close the trench off visually at the map edge, rather than
    // leaving it looking like a bottomless slot cut into the ground plane.
    posed(new THREE.BoxGeometry(CORRIDOR_W, wallH, WALL_T), { y: wallY, z: -endZ }),
    posed(new THREE.BoxGeometry(CORRIDOR_W, wallH, WALL_T), { y: wallY, z: endZ }),
  ]
  const walls = mergedMesh(wallGeos, wallMat)
  return { floor, walls }
}

function buildRails() {
  const trackXs = Array.from({ length: STATION.trackCount },
    (_, t) => (t - (STATION.trackCount - 1) / 2) * TRACK_SPACING)
  const mat = new THREE.MeshLambertMaterial({
    color: GRANITE, emissive: GRANITE, emissiveIntensity: 0.15,
  })
  const geos = trackXs.map((x) => posed(
    new THREE.BoxGeometry(RAIL_W, RAIL_H, CORRIDOR_LEN),
    { x, y: RAIL_Y + RAIL_H / 2 },
  ))
  return { mesh: mergedMesh(geos, mat), trackXs }
}

// ── Platforms, canopy, catenary, standing trains — centre cell only ─────────
function buildPlatforms() {
  const mat = new THREE.MeshLambertMaterial({ color: 0x9199a8 })
  const len = STATION_CORE_HALF * 2
  const geos = PLATFORM_XS.map((x) => posed(
    new THREE.BoxGeometry(PLATFORM_W, 0.2, len),
    { x, y: PLATFORM_Y - 0.1 },
  ))
  return mergedMesh(geos, mat)
}

/** Warm strip down each platform centreline — the cheapest "there are people
 * on this platform" cue, and what the vault's faint underglow is meant to be
 * reflecting. */
function buildPlatformGlow() {
  const len = STATION_CORE_HALF * 2 - 4
  const geos = PLATFORM_XS.map((x) => posed(
    new THREE.BoxGeometry(PLATFORM_W * 0.6, 0.06, len),
    { x, y: PLATFORM_Y + 0.04 },
  ))
  return mergedMesh(geos, new THREE.MeshBasicMaterial({ color: WARM }))
}

function buildVaults() {
  const mat = new THREE.MeshLambertMaterial({
    color: 0x9aa8bb, emissive: WARM, emissiveIntensity: 0.08,
  })
  const geos = VAULTS.map(({ x, z }) => {
    const len = z[1] - z[0]
    // Open half-cylinder, axis along Z: default CylinderGeometry's axis is Y,
    // rotateX(90deg) carries that to Z. thetaStart=PI, thetaLength=PI sweeps
    // just the upper half — spring points at y=0 (local), crown at y=R.
    const geo = new THREE.CylinderGeometry(
      VAULT_R, VAULT_R, len, VAULT_SEGMENTS, 1, false, Math.PI, Math.PI,
    )
    geo.rotateX(Math.PI / 2)
    return posed(geo, { x, y: VAULT_SPRING_Y, z: (z[0] + z[1]) / 2 })
  })
  return mergedMesh(geos, mat)
}

/** Portal-frame masts every 8m — rhythm, not full overhead-line structure. No
 * wires: sub-pixel at zoom 1 and would alias against RES_SCALE + pixelated
 * upscaling. First thing to cut if the draw-call budget bites. */
function buildCatenary() {
  const mat = new THREE.MeshLambertMaterial({ color: 0x1c1f27 })
  const postH = VAULT_SPRING_Y + VAULT_R + 1 - PLATFORM_Y
  const topY = PLATFORM_Y + postH
  const postX = CORRIDOR_W / 2 - WALL_T - 1
  const geos = []
  for (let z = -20; z <= 20; z += 8) {
    for (const sx of [-1, 1]) {
      geos.push(posed(
        new THREE.BoxGeometry(0.5, postH, 0.5),
        { x: sx * postX, y: PLATFORM_Y + postH / 2, z },
      ))
    }
    geos.push(posed(new THREE.BoxGeometry(postX * 2, 0.4, 0.4), { y: topY, z }))
  }
  return mergedMesh(geos, mat)
}

const TRAIN_CAR_D = 1.3, TRAIN_CAR_H = 1.6, TRAIN_LEN = 16

/** Two short static trains parked at platforms, in the vault gaps — the
 * "trains standing at platforms" reference feature the moving ambient.js
 * train alone can't give (its platforms are empty 45% of the cycle). */
function buildStandingTrains(trackXs) {
  const carY = RAIL_Y + RAIL_H + TRAIN_CAR_H / 2
  const winMat = new THREE.MeshLambertMaterial({ color: 0x1a1206, emissive: WARM, emissiveIntensity: 0.2 })

  const jrBody = new THREE.Mesh(
    new THREE.BoxGeometry(TRAIN_CAR_D, TRAIN_CAR_H, TRAIN_LEN),
    new THREE.MeshLambertMaterial({ color: JR_GREEN }),
  )
  jrBody.position.set(trackXs[1], carY, 2)   // beside platform A (x=-6.4)

  const nexBody = new THREE.Mesh(
    new THREE.BoxGeometry(TRAIN_CAR_D, TRAIN_CAR_H, TRAIN_LEN),
    new THREE.MeshLambertMaterial({ color: RED }),
  )
  nexBody.position.set(trackXs[4], carY, -2)   // beside platform C (x=6.4)

  const winGeos = [jrBody, nexBody].map((body) => posed(
    new THREE.PlaneGeometry(TRAIN_LEN * 0.85, TRAIN_CAR_H * 0.4),
    { x: body.position.x + TRAIN_CAR_D / 2 + 0.02, y: carY, z: body.position.z, ry: Math.PI / 2 },
  ))
  const windows = mergedMesh(winGeos, winMat)

  return { jrBody, nexBody, windows }
}

function buildCrossDecks() {
  const DECK_W = CORRIDOR_W - 2   // just inside the retaining walls
  const REF_H = 8                 // the concourse deck's own height; see header note above

  const facade = concourseFacade(DECK_W, REF_H)
  const bodyMat = new THREE.MeshLambertMaterial({
    map: facade.map, emissiveMap: facade.emissiveMap,
    emissive: 0xffffff, emissiveIntensity: 0.15,
  })
  const bodyGeos = CROSS_DECKS.map(({ z, y }) => posed(
    new THREE.BoxGeometry(DECK_W, y[1] - y[0], z[1] - z[0]),
    { y: (y[0] + y[1]) / 2, z: (z[0] + z[1]) / 2 },
  ))
  const bodies = mergedMesh(bodyGeos, bodyMat)

  const roofMat = new THREE.MeshLambertMaterial({ map: deckRoofTexture(DECK_W) })
  const roofGeos = CROSS_DECKS.map(({ z, y }) => {
    const geo = new THREE.PlaneGeometry(DECK_W, z[1] - z[0])
    geo.rotateX(-Math.PI / 2)
    return posed(geo, { y: y[1] + 0.02, z: (z[0] + z[1]) / 2 })
  })
  const roofs = mergedMesh(roofGeos, roofMat)

  return { bodies, roofs }
}

export function createStation() {
  const group = new THREE.Group()

  const { floor, walls } = buildTrench()
  group.add(floor, walls)

  const { mesh: rails, trackXs } = buildRails()
  group.add(rails)

  group.add(buildPlatforms())
  group.add(buildPlatformGlow())
  group.add(buildVaults())
  group.add(buildCatenary())

  const { jrBody, nexBody, windows } = buildStandingTrains(trackXs)
  group.add(jrBody, nexBody, windows)

  const { bodies, roofs } = buildCrossDecks()
  group.add(bodies, roofs)

  const deckZ = CROSS_DECKS[1].z[1]   // main concourse deck's south fascia — the
                                       // facade that faces the camera most
                                       // directly (azimuth 45 makes +X and +Z
                                       // equally foreshortened; +Z matches the
                                       // rest of the scene's front-faces-+Z
                                       // convention)

  // Station nameplate, JR green.
  const name = createSignTexture({ text: '新宿駅', style: 'lightbox', orientation: 'horizontal', color: hex(JR_GREEN), px: 512 })
  const nameMat = new THREE.MeshBasicMaterial({ map: name.map })
  const nameW = 11
  const nameMesh = new THREE.Mesh(new THREE.PlaneGeometry(nameW, nameW / name.aspect), nameMat)
  nameMesh.position.set(0, 11, deckZ + 0.35)
  group.add(nameMesh)

  // Platform guide.
  const plat = createSignTexture({ text: '1-6', sub: 'のりば', style: 'neon', orientation: 'horizontal', color: hex(AMBER), px: 256 })
  const platMat = new THREE.MeshBasicMaterial({ map: plat.map })
  const platW = 6
  const platMesh = new THREE.Mesh(new THREE.PlaneGeometry(platW, platW / plat.aspect), platMat)
  platMesh.position.set(-14, 8, deckZ + 0.35)
  group.add(platMesh)

  // Where the departure board hangs — the main concourse deck's south fascia.
  // Height is derived, not assumed: verified against the occlusion test in
  // test/scene.test.mjs, not just the sightline arithmetic (see CLAUDE.md on
  // why this exact bug has shipped once already, from a podium mount that
  // looked fine on paper).
  const BOARD_BASE = 2.6   // departureBoard.js's own bottom offset
  const boardAnchor = new THREE.Object3D()
  boardAnchor.position.set(-14, 6.5 - BOARD_BASE, deckZ + 0.3)
  group.add(boardAnchor)

  return { group, boardAnchor, trackY: RAIL_Y }
}
