// Wet asphalt street for the Golden Gai alley. No image assets — the neon
// "reflections" are a hand-drawn canvas texture smeared vertically along Z,
// applied as an emissiveMap so bloom picks it up (kept subtle, see below).
import * as THREE from 'three'
import { NIGHT, ASPHALT, RED, CYAN, AMBER, WARM } from './palette.js'

// Deterministic RNG (same LCG idiom as spike/tocho.html) so streaks/puddles
// are stable across renders.
let seed = 20260729
const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296

const STREAK_COLORS = [RED, CYAN, AMBER, WARM]

// Reflection streaks: soft vertical (canvas-Y = world-Z) smears of neon
// colour bleeding down the alley toward the viewer, irregular in width,
// spacing and brightness so it doesn't read as a tiled pattern.
function reflectionTexture(w, h) {
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')
  // Faint base wash so the surface exists even between light pools. Kept low:
  // the shopfronts each carry a PointLight, so most of the ground's visibility
  // comes from real lighting rather than from this.
  ctx.fillStyle = '#0c1120'
  ctx.fillRect(0, 0, w, h)

  const count = 26
  for (let i = 0; i < count; i++) {
    const x = rnd() * w
    const streakW = 8 + rnd() * 34
    const color = STREAK_COLORS[Math.floor(rnd() * STREAK_COLORS.length)]
    const hex = '#' + color.toString(16).padStart(6, '0')
    // Streak starts near the shopfront edge (canvas top = world z min) and
    // fades out toward the viewer — mimics light bleeding away from source.
    const yStart = rnd() * h * 0.4
    const yEnd = yStart + h * (0.35 + rnd() * 0.55)
    const alpha = 0.3 + rnd() * 0.4

    const grad = ctx.createLinearGradient(0, yStart, 0, yEnd)
    grad.addColorStop(0, hex)
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.globalAlpha = alpha
    ctx.filter = `blur(${streakW * 0.35}px)`
    ctx.fillRect(x - streakW / 2, yStart, streakW, yEnd - yStart)
  }
  ctx.filter = 'none'
  ctx.globalAlpha = 1

  return Object.assign(new THREE.CanvasTexture(c), { colorSpace: THREE.SRGBColorSpace })
}

/** Returns a THREE.Group containing the full ground assembly. */
export function createStreet({ length = 90, width = 26 } = {}) {
  const group = new THREE.Group()

  const zMin = -8, zMax = 18   // fixed span per the layout contract
  const centerZ = (zMin + zMax) / 2

  // Dark base extending well past the paved strip, so the backdrop towers and
  // crowd buildings have something to stand on instead of floating in void.
  const base = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: 0x080b13, roughness: 0.95, metalness: 0 }),
  )
  base.rotation.x = -Math.PI / 2
  base.position.y = -0.04
  group.add(base)

  // ── Main asphalt slab ──────────────────────────────────────────────────
  const reflMap = reflectionTexture(256, 512) // narrow x tall: streaks run along Z (canvas Y)
  const asphalt = new THREE.Mesh(
    new THREE.PlaneGeometry(length, width),
    new THREE.MeshStandardMaterial({
      color: ASPHALT,
      roughness: 0.35,
      metalness: 0.4,
      emissive: 0xffffff,
      emissiveMap: reflMap,
      emissiveIntensity: 0.32,
    }),
  )
  asphalt.rotation.x = -Math.PI / 2
  asphalt.position.set(0, 0, centerZ)
  group.add(asphalt)

  // ── Centre drainage channel, running along X ───────────────────────────
  const channelZ = centerZ - 1.5
  const channel = new THREE.Mesh(
    new THREE.PlaneGeometry(length, 1.4),
    new THREE.MeshStandardMaterial({
      color: NIGHT, roughness: 0.15, metalness: 0.6,
      emissive: NIGHT, emissiveIntensity: 0.4,
    }),
  )
  channel.rotation.x = -Math.PI / 2
  channel.position.set(0, -0.03, channelZ)
  group.add(channel)

  // ── Kerb where the walkable strip meets the shopfront side (z ≈ -1.5) ──
  const kerb = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.15, 0.4),
    new THREE.MeshStandardMaterial({
      color: 0x2a2c33, roughness: 0.8, metalness: 0.1,
      emissive: 0x2a2c33, emissiveIntensity: 0.5,
    }),
  )
  kerb.position.set(0, 0.075, -1.5)
  group.add(kerb)

  // ── Puddles: flat, low-roughness/high-metalness patches, seeded ────────
  // A plain (unmapped) emissive tint, not the streak texture — CircleGeometry's
  // radial UVs would twist the rectangular streak gradient into a rope pattern.
  // Near-mirror finish so the shopfront PointLights throw specular highlights
  // here. Puddles must read BRIGHTER than the asphalt — a dark patch reads as
  // an oil slick or a hole in the road, not water.
  // Emissive deliberately matches the asphalt's base wash so a puddle never
  // reads darker than the road around it — a dark patch looks like a hole.
  // The difference comes from gloss: puddles catch the shopfront lights.
  // roughness ~0.2, not near-zero: a mirror finish gives pinpoint specular dots
  // that read as lasers. Water wants a broad soft smear.
  // Standing water mirrors the SKY, which is brighter than asphalt — so a puddle
  // must read lighter than the road, never darker. The asphalt carries the bright
  // streak emissiveMap and these can't (radial UVs would twist it), so the flat
  // emissive is pitched up to compensate.
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x1b2338, roughness: 0.22, metalness: 0.5,
    emissive: 0x233152, emissiveIntensity: 0.85,
  })
  for (let i = 0; i < 18; i++) {
    const rx = 0.8 + rnd() * 1.3
    const rz = rx * (0.5 + rnd() * 0.4)
    const puddle = new THREE.Mesh(new THREE.CircleGeometry(1, 16), puddleMat)
    puddle.scale.set(rx, rz, 1)
    puddle.rotation.x = -Math.PI / 2
    puddle.rotation.z = rnd() * Math.PI
    // Spread tracks the ALLEY, not `length` — the paving runs far past the
    // stalls so panning never shows its end, and scaling puddles by it would
    // scatter them off-screen. Kept inside the lit strip: a puddle out in the
    // unlit road has no light to catch and just reads as a dark hole.
    puddle.position.set((rnd() - 0.5) * 96, 0.01, -0.8 + rnd() * 8)
    group.add(puddle)
  }

  // ── Manhole / utility covers ────────────────────────────────────────────
  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e24, roughness: 0.6, metalness: 0.5,
    emissive: 0x1c1e24, emissiveIntensity: 0.4,
  })
  for (let i = 0; i < 4; i++) {
    const cover = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 20), coverMat)
    cover.position.set((rnd() - 0.5) * (length - 6), 0.02, zMin + 1 + rnd() * (zMax - zMin - 2))
    group.add(cover)
  }

  return group
}
