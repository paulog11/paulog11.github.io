// Background skyline: filler buildings behind the Golden Gai alley. Pure
// scenery — never clickable. Forced-perspective heights (7-15m) sell a
// packed city block under an orthographic camera without dwarfing the
// 6.2m stalls or the 17-20m hero towers built separately.
import * as THREE from 'three'
import { NIGHT, GRANITE, WARM, RED, CYAN, AMBER } from './palette.js'

// Deterministic LCG, same idiom as street.js / spike/tocho.html.
let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

const hex = (n) => '#' + n.toString(16).padStart(6, '0')

// One shared window-grid facade (map + emissiveMap), the same dual-canvas
// idiom as tocho's facade(): granite piers that never light, dark glass bays
// that sometimes do. Shared across every instance so the field is one draw call.
function crowdFacade() {
  const cols = 12, rows = 30, pxCol = 10, pxRow = 8
  const w = cols * pxCol, h = rows * pxRow
  const mk = () => {
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    return [c, c.getContext('2d')]
  }
  const [cMap, g] = mk()
  const [cEmi, ge] = mk()

  g.fillStyle = hex(NIGHT); g.fillRect(0, 0, w, h)  // dark glass base
  ge.fillStyle = '#000';   ge.fillRect(0, 0, w, h)

  const WINDOW_COLORS = [WARM, AMBER, CYAN]
  for (let i = 0; i < cols; i++) {
    const x = i * pxCol
    if (i % 3 === 0) {
      g.fillStyle = hex(GRANITE)                     // granite pier, never lit
      g.fillRect(x, 0, pxCol, h)
      continue
    }
    for (let j = 0; j < rows; j++) {
      const y = j * pxRow
      if (rnd() > 0.3) continue                       // lit fraction — dim, this is background
      const c = hex(WINDOW_COLORS[Math.floor(rnd() * WINDOW_COLORS.length)])
      g.fillStyle = c;  g.fillRect(x + 2, y + 1, pxCol - 4, pxRow - 3)
      ge.fillStyle = c; ge.fillRect(x + 2, y + 1, pxCol - 4, pxRow - 3)
    }
  }
  g.fillStyle = 'rgba(0,0,0,0.5)'                     // floor banding
  for (let j = 0; j < rows; j++) g.fillRect(0, j * pxRow, w, 1)

  const tex = (c) => Object.assign(new THREE.CanvasTexture(c), { colorSpace: THREE.SRGBColorSpace })
  return { map: tex(cMap), emissiveMap: tex(cEmi) }
}

const SIGN_COLORS = [RED, CYAN, AMBER]

/** Returns a THREE.Group: an InstancedMesh of backdrop towers plus a handful of sign planes. */
// Count is generous because the field must cover every pan position, not just
// the home framing. It is one InstancedMesh either way — extra instances are
// effectively free.
export function createCrowd({ count = 108 } = {}) {
  const group = new THREE.Group()

  // Unit box translated so its base sits at y=0 — scaling the instance matrix
  // then just stretches it up from the ground, no extra offset math needed.
  const geo = new THREE.BoxGeometry(1, 1, 1)
  geo.translate(0, 0.5, 0)

  const { map, emissiveMap } = crowdFacade()
  const mat = new THREE.MeshStandardMaterial({
    map, emissiveMap,
    emissive: 0xffffff,
    emissiveIntensity: 0.2,    // dimmer than the alley's signage — backdrop must not out-glow foreground
    roughness: 0.85,
    metalness: 0.05,           // low: scene.environment would otherwise read this as shiny
  })
  const mesh = new THREE.InstancedMesh(geo, mat, count)

  const dummy = new THREE.Object3D()
  const nearCandidates = []   // buildings close enough to the alley to carry a sign

  // NOTE on placement: this stage's camera is a tightly pan-locked isometric
  // ortho rig (FRUSTUM 26m, azimuth 45°, elevation 22°) — the visible ground
  // footprint at default framing is a narrow funnel, NOT the full
  // x∈[-80,80]/z∈[-70,-15] box a wider FOV would allow (placing buildings in
  // that literal box puts them entirely off-screen — verified empirically).
  // centerX/halfWidth below were fit directly to real projected on-screen
  // bounds (binary-scanned per z against this exact camera, 20px margin),
  // not derived by hand — an earlier hand-derived trig approximation was off
  // by enough to place "safe" buildings 90+ px above the frame.
  // Bounds are DERIVED from the projection, not fitted to one camera position.
  // For this rig:  screenX = 0.707(x - z),  screenY = 0.927y - 0.265(x + z).
  // A building is on screen when |screenX| < ~23 and its base screenY is below
  // the frame top. Crucially the camera PANS ±24 m along X, which slides the
  // visible window by ~17 in screenX and ~6.4 in screenY — so the field has to
  // cover the UNION over every pan position, or the skyline develops holes as
  // you travel the alley. Fitting to the home framing alone is not enough.
  const T_MAX = 1
  const xLow  = (z) => Math.max(-86 - z, z - 49)
  const xHigh = (z) => z + 49

  // Buildings are grouped into depth rows and stratified across each row's
  // visible width (one per slot, jittered inside it) rather than placed with
  // pure per-building randomness — with only ~44 buildings, independent
  // random draws left large empty gaps on one side purely by chance.
  const ROWS = 9
  const rows = Array.from({ length: ROWS }, () => [])
  for (let i = 0; i < count; i++) rows[i % ROWS].push(i)

  for (let r = 0; r < ROWS; r++) {
    const slots = rows[r]
    const tRow = (r / (ROWS - 1)) * T_MAX
    const n = slots.length

    slots.forEach((i, k) => {
      // Depth jitter recomputes its own band (not the row's) so a building
      // nudged deeper never inherits a wider band than its actual z allows.
      const t = Math.min(T_MAX, Math.max(0, tRow + (rnd() - 0.5) * 0.08))
      // Starts behind BOTH hero towers (z = -21 and -17). Any nearer and the
      // filler renders in front of the landmarks and hides them — which
      // inverts the composition the whole backdrop exists to support.
      const z = -25 - 25 * t
      // Band recomputed from this building's own jittered z, so one nudged
      // deeper never inherits a band too wide for where it actually landed.
      const lo = xLow(z), hi = xHigh(z)
      const stratLow  = lo + (k / n) * (hi - lo)
      const stratHigh = lo + ((k + 1) / n) * (hi - lo)
      const x = stratLow + rnd() * (stratHigh - stratLow)
      const shrink = 1 - 0.25 * t               // smaller footprints toward the back — reads as farther
      const bw = (3.2 + rnd() * 4.8) * shrink
      const bd = (3.2 + rnd() * 4.8) * shrink
      // Taller near, shorter far: keeps the height ladder (7-15m) while also
      // keeping distant buildings clear of the frustum's vertical cutoff.
      const bh = 7 + (1 - t) * 8 * (0.4 + 0.6 * rnd())
      const ry = (rnd() - 0.5) * 0.16          // small Y-only jitter so it doesn't read as a perfect grid

      dummy.position.set(x, 0, z)
      dummy.rotation.set(0, ry, 0)
      dummy.scale.set(bw, bh, bd)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      if (t < 0.4) nearCandidates.push({ x, z: z + bd / 2, h: bh, w: bw, ry })
    })
  }
  mesh.instanceMatrix.needsUpdate = true
  group.add(mesh)

  // Small emissive sign planes on the nearer buildings only — subtle, background.
  const signCount = Math.min(12, nearCandidates.length)
  for (let i = 0; i < signCount; i++) {
    const b = nearCandidates[Math.floor(rnd() * nearCandidates.length)]
    const color = SIGN_COLORS[i % SIGN_COLORS.length]
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5 + rnd() * 0.5, 0.25 + rnd() * 0.25),
      new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.6 }),
    )
    // Lower-middle of the facade only — the upper stories of a tall near
    // building can already be close to the frustum's top edge.
    sign.position.set(b.x + (rnd() - 0.5) * b.w * 0.6, b.h * (0.15 + rnd() * 0.3), b.z + 0.03)
    sign.rotation.y = b.ry
    group.add(sign)
  }

  return group
}
