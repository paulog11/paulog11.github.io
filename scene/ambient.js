// Atmosphere layer: rain, flickering neon, a passing JR train, vent haze.
// Everything here is derived from `elapsed` as a closed-form function — no
// per-particle timers to drift, no per-frame allocation, fully deterministic.
import * as THREE from 'three'
import { NIGHT, WARM, CYAN, AMBER, RED } from './palette.js'

function makeRng(seed) {
  let s = seed
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296
}

const RAIN_COUNT = 420
const RAIN_Y_MAX = 26

const TRAIN_CYCLE  = 16  // seconds per full loop
const TRAIN_TRAVEL = 6   // seconds the train is on screen
const TRAIN_START_X = -55
const TRAIN_END_X   = 55
const CARRIAGE_LEN = 3.2, CARRIAGE_H = 1.5, CARRIAGE_D = 1.3, CARRIAGE_GAP = 0.15
const CARRIAGES = 4
const VIADUCT_Z = -22
const VIADUCT_DECK_Y = 9

const PUFF_COUNT = 3
const PUFF_RISE = 8
const PUFF_DURATION = 9

const FLICKER_DIM = 0.15

// Soft vertical streak — a narrow gradient column on a SQUARE canvas. Points
// sprites are always square quads, so a non-square source (e.g. tall-narrow)
// gets squashed back to square and a "vertical" streak reads as horizontal.
function rainStreakTexture() {
  const c = document.createElement('canvas')
  c.width = 16; c.height = 16
  const ctx = c.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 0, 16)
  grad.addColorStop(0,   'rgba(255,255,255,0)')
  grad.addColorStop(0.5, 'rgba(255,255,255,0.9)')
  grad.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(6, 0, 4, 16)
  return new THREE.CanvasTexture(c)
}

function puffTexture() {
  const c = document.createElement('canvas')
  c.width = 64; c.height = 64
  const ctx = c.getContext('2d')
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,0.6)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

// y(elapsed) is a sawtooth per particle — falls then wraps to the top.
// Recycling is implicit in the modulo, so there's no reset branch to get wrong.
function createRain(rng) {
  const positions = new Float32Array(RAIN_COUNT * 3)
  const speeds = new Float32Array(RAIN_COUNT)
  const phases = new Float32Array(RAIN_COUNT)
  for (let i = 0; i < RAIN_COUNT; i++) {
    positions[i * 3]     = -45 + rng() * 90
    positions[i * 3 + 2] = -30 + rng() * 42
    speeds[i] = 7 + rng() * 5
    phases[i] = rng() * RAIN_Y_MAX
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const map = rainStreakTexture()
  const tint = new THREE.Color(CYAN).lerp(new THREE.Color(0xffffff), 0.7)
  // PointsMaterial.size is only distance-attenuated under a PerspectiveCamera
  // (three.js checks isPerspectiveMatrix internally) — under this scene's
  // OrthographicCamera it's raw screen pixels, so this wants to be sized for
  // the viewport, not the metre-scale world.
  const material = new THREE.PointsMaterial({
    map, color: tint, size: 8, sizeAttenuation: false,
    transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const points = new THREE.Points(geometry, material)

  function update(elapsed) {
    const pos = geometry.attributes.position.array
    for (let i = 0; i < RAIN_COUNT; i++) {
      pos[i * 3 + 1] = RAIN_Y_MAX - ((elapsed * speeds[i] + phases[i]) % RAIN_Y_MAX)
    }
    geometry.attributes.position.needsUpdate = true
  }
  return { points, update }
}

// Real failing neon is mostly steady with sudden rapid stutters, not a sine
// wave. Two incommensurate sines produce irregular dips; inside a dip a fast
// term square-waves the intensity. Pure function of elapsed — no timers.
function createFlicker(materials, rng) {
  const count = Math.min(3, materials.length)
  if (count === 0) return { update() {}, reset() {} }
  const step = Math.max(1, Math.floor(materials.length / count))
  const picks = []
  for (let i = 0; i < count; i++) picks.push(materials[(i * step) % materials.length])
  // These are all MeshBasicMaterial now (no emissive), so flicker dims by
  // scaling the base colour toward black instead of emissiveIntensity.
  const base = picks.map((m) => m.color.clone())
  const phase = picks.map(() => rng() * 100)

  function update(elapsed) {
    for (let i = 0; i < picks.length; i++) {
      const slow = Math.sin(elapsed * 0.6 + phase[i]) + Math.sin(elapsed * 1.37 + phase[i] * 2.3) * 0.6
      const stuttering = slow < -1.05
      const factor = stuttering ? (Math.sin(elapsed * 47 + phase[i]) > 0 ? 1 : FLICKER_DIM) : 1
      picks[i].color.copy(base[i]).multiplyScalar(factor)
    }
  }
  function reset() { for (let i = 0; i < picks.length; i++) picks[i].color.copy(base[i]) }
  return { update, reset }
}

// Raised beam + pillars, background-modest. Static — safe to show under
// reduced motion since it doesn't rely on the frame loop to look right.
function createViaduct() {
  const group = new THREE.Group()
  // At z=-22 the scene fog (start 90, end 260) blends most of the lit colour
  // toward the sky before it reaches the camera — a plain dark albedo turned
  // out functionally invisible. A small emissive floor keeps the silhouette
  // readable through the haze without turning it into a light source.
  const structColor = new THREE.Color(NIGHT).lerp(new THREE.Color(0x8a94b0), 0.35)
  const structMat = new THREE.MeshLambertMaterial({
    color: structColor,
    emissive: structColor, emissiveIntensity: 0.4,
  })
  const deck = new THREE.Mesh(new THREE.BoxGeometry(110, 0.6, 3), structMat)
  deck.position.set(0, VIADUCT_DECK_Y - 0.3, VIADUCT_Z)
  group.add(deck)
  const pillarH = VIADUCT_DECK_Y - 0.6
  for (let x = -45; x <= 45; x += 22.5) {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.2, pillarH, 1.2), structMat)
    pillar.position.set(x, pillarH / 2, VIADUCT_Z)
    group.add(pillar)
  }
  return group
}

// Carriages ride the viaduct deck. Position is a pure function of elapsed —
// travels once per TRAIN_CYCLE, hidden while waiting for the next pass.
function createTrain() {
  const group = new THREE.Group()
  const bodyMat = new THREE.MeshLambertMaterial({ color: 0x1b1e26 })
  const winMat = new THREE.MeshLambertMaterial({ color: 0x1a1206, emissive: WARM, emissiveIntensity: 0.7 })
  // Tail light is a beacon, not a window — MeshBasicMaterial like the tower's
  // aircraft-warning light, with the old emissiveIntensity folded into colour.
  const tailMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(RED).lerp(new THREE.Color(0xffffff), 0.3) })
  const totalLen = CARRIAGES * CARRIAGE_LEN + (CARRIAGES - 1) * CARRIAGE_GAP
  for (let i = 0; i < CARRIAGES; i++) {
    const cx = -totalLen / 2 + CARRIAGE_LEN / 2 + i * (CARRIAGE_LEN + CARRIAGE_GAP)
    const body = new THREE.Mesh(new THREE.BoxGeometry(CARRIAGE_LEN, CARRIAGE_H, CARRIAGE_D), bodyMat)
    body.position.set(cx, 0, 0)
    group.add(body)
    const win = new THREE.Mesh(new THREE.PlaneGeometry(CARRIAGE_LEN * 0.82, CARRIAGE_H * 0.4), winMat)
    win.position.set(cx, 0.1, CARRIAGE_D / 2 + 0.01)
    group.add(win)
  }
  // Tail light on the trailing end (rear w.r.t. travel direction, -X).
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, CARRIAGE_D * 0.5), tailMat)
  tail.position.set(-totalLen / 2 - 0.02, -CARRIAGE_H * 0.25, 0)
  group.add(tail)
  group.position.set(TRAIN_START_X, VIADUCT_DECK_Y + CARRIAGE_H / 2, VIADUCT_Z)
  return group
}

function updateTrain(group, elapsed) {
  const t = elapsed % TRAIN_CYCLE
  if (t >= TRAIN_TRAVEL) { group.visible = false; return }
  group.visible = true
  group.position.x = TRAIN_START_X + (TRAIN_END_X - TRAIN_START_X) * (t / TRAIN_TRAVEL)
}

// Slow-rising translucent puffs near the alley — kitchen exhaust / vent haze.
function createSteam(rng) {
  const map = puffTexture()
  const tint = new THREE.Color(AMBER).lerp(new THREE.Color(0x9099ab), 0.75)
  const group = new THREE.Group()
  const sprites = []
  const bases = []
  const phases = []
  for (let i = 0; i < PUFF_COUNT; i++) {
    const material = new THREE.SpriteMaterial({ map, color: tint, transparent: true, opacity: 0, depthWrite: false })
    const sprite = new THREE.Sprite(material)
    const scale = 1.6 + rng() * 0.8
    sprite.scale.set(scale, scale, 1)
    bases.push({ x: -18 + rng() * 36, y: 5.5 + rng() * 1.5, z: -3 + rng() * 3 })
    phases.push(rng() * PUFF_DURATION)
    sprites.push(sprite)
    group.add(sprite)
  }
  function update(elapsed) {
    for (let i = 0; i < PUFF_COUNT; i++) {
      const frac = ((elapsed + phases[i]) % PUFF_DURATION) / PUFF_DURATION
      const b = bases[i]
      sprites[i].position.set(b.x, b.y + frac * PUFF_RISE, b.z)
      const fade = frac < 0.2 ? frac / 0.2 : frac > 0.75 ? (1 - frac) / 0.25 : 1
      sprites[i].material.opacity = 0.3 * fade
    }
  }
  return { group, update }
}

export function createAmbient({ reduceMotion = false, flickerMaterials = [] } = {}) {
  const group = new THREE.Group()
  const rng = makeRng(31337)

  group.add(createViaduct())

  // Same dispose path for both modes: whatever ended up in `group` gets torn
  // down, mirroring renderer.js's own traversal-based dispose.
  function dispose(flicker) {
    flicker.reset()
    group.traverse((o) => {
      o.geometry?.dispose()
      for (const m of [o.material].flat().filter(Boolean)) {
        for (const v of Object.values(m)) v?.isTexture && v.dispose()
        m.dispose()
      }
    })
  }

  if (reduceMotion) {
    const flicker = { update() {}, reset() {} }
    return { group, update() {}, dispose: () => dispose(flicker) }
  }

  const rain = createRain(rng)
  group.add(rain.points)

  const train = createTrain()
  group.add(train)

  const steam = createSteam(rng)
  group.add(steam.group)

  const flicker = createFlicker(flickerMaterials, rng)

  function update(dt, elapsed) {
    rain.update(elapsed)
    updateTrain(train, elapsed)
    steam.update(elapsed)
    flicker.update(elapsed)
  }

  return { group, update, dispose: () => dispose(flicker) }
}
