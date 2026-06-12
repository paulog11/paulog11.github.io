/**
 * Planetary disk simulation for the Fine Tuning Explorer.
 * Models planet formation: dust grains orbiting a young star collide and
 * stick, growing into planetesimals, protoplanets, and finally planets —
 * habitable ones if they settle in the habitable zone with working chemistry.
 * Physics only — rendering lives in planetaryRenderer.js (PixiJS).
 */

// ── TUNING KNOBS ──────────────────────────────────────────
export const DISK = {
  M_STAR: 60,          // central star mass
  G0: 50000,           // nominal gravity — disk velocities are seeded with this
  DUST_BASE: 190,      // physics dust grain count at eta = 0
  SEEDS: 4,            // planetesimal seeds that bootstrap runaway accretion
  T_PLANETESIMAL: 5,   // mass thresholds for type promotion
  T_PROTOPLANET: 20,
  T_PLANET: 50,
  CAPTURE_MULT: 1.5,   // collision capture radius multiplier
  FOCUS_DIST: 90,      // gravitational focusing range of grown bodies
}

// ── DISK GEOMETRY ─────────────────────────────────────────
// Habitable zone distance scales with √luminosity; luminosity comes from
// fusion efficiency, i.e. the strong force.
export function diskGeometry(W, H, cv) {
  const diskR = Math.min(W, H) * 0.42
  const diskIn = 55
  const lum = Math.max(0.15, 1 + cv.alphaS * 0.35)
  const hzMid = Math.min(Math.max(diskR * 0.55 * Math.sqrt(lum), diskR * 0.2), diskR * 0.95)
  const hzHalf = diskR * 0.09 * Math.sqrt(lum)
  return { diskR, diskIn, lum, hzInner: hzMid - hzHalf, hzOuter: hzMid + hzHalf }
}

// ── DISK BODY CLASS ───────────────────────────────────────
export class DiskBody {
  constructor(x, y, vx, vy, mass, type) {
    this.x = x; this.y = y
    this.vx = vx; this.vy = vy
    this.mass = mass; this.type = type
    this.alive = true; this.age = 0
    this.trail = []
  }
}

export function bodyRadius(b) {
  switch (b.type) {
    case 'sun':            return Math.cbrt(b.mass) * 4
    case 'dust':           return 1.2
    case 'planetesimal':   return Math.cbrt(b.mass) * 1.1
    case 'protoplanet':    return Math.cbrt(b.mass) * 1.3
    case 'planet':
    case 'planet-sterile': return Math.cbrt(b.mass) * 1.4
    default:               return 2
  }
}

// ── CREATE INITIAL DISK ───────────────────────────────────
export function createPlanetaryDisk(W, H, cv) {
  const cx = W / 2, cy = H / 2
  const geo = diskGeometry(W, H, cv)
  const bodies = []

  // Central star — bodies[0], pinned. Carries luminosity + HZ bounds,
  // valid for the disk's lifetime since constant changes reseed everything.
  const sun = new DiskBody(cx, cy, 0, 0, DISK.M_STAR, 'sun')
  sun.lum = geo.lum
  sun.hzInner = geo.hzInner
  sun.hzOuter = geo.hzOuter
  bodies.push(sun)

  // Dust grains — count from eta (disk mass), grain mass from Higgs
  const higgsMod = Math.max(0.15, 1 + cv.higgs * 0.4)
  const dustCount = Math.min(280, Math.max(80, Math.round(DISK.DUST_BASE + cv.eta * 50)))
  for (let i = 0; i < dustCount; i++) {
    bodies.push(orbitingBody(cx, cy, geo, (0.8 + Math.random() * 0.6) * higgsMod, 'dust'))
  }

  // Planetesimal seeds — km-scale bodies that already exist from earlier sticking
  for (let i = 0; i < DISK.SEEDS; i++) {
    bodies.push(orbitingBody(cx, cy, geo, 6, 'planetesimal'))
  }

  return bodies
}

function orbitingBody(cx, cy, geo, mass, type) {
  // Uniform-in-area radius between diskIn and diskR
  const r = Math.sqrt(geo.diskIn * geo.diskIn + Math.random() * (geo.diskR * geo.diskR - geo.diskIn * geo.diskIn))
  const a = Math.random() * Math.PI * 2
  // Keplerian speed from the NOMINAL G0 — integrating with the actual G_eff
  // is what makes a mistuned G destabilize the inherited disk.
  // The ±8% jitter gives mildly eccentric, crossing orbits → collisions.
  const v = Math.sqrt(DISK.G0 * DISK.M_STAR / r) * (0.92 + Math.random() * 0.16)
  const radial = v * (Math.random() - 0.5) * 0.1
  const x = cx + Math.cos(a) * r
  const y = cy + Math.sin(a) * r
  const vx = -Math.sin(a) * v + Math.cos(a) * radial
  const vy = Math.cos(a) * v + Math.sin(a) * radial
  return new DiskBody(x, y, vx, vy, mass, type)
}

// ── PHYSICS STEP ──────────────────────────────────────────
export function planetaryPhysicsStep(bodies, dt, cv, W, H, outcomeKey) {
  // Two substeps keep tight inner orbits stable
  const h = dt / 2
  for (let s = 0; s < 2; s++) substep(bodies, h, cv, outcomeKey)

  const sun = bodies[0]
  const diskR = Math.min(W, H) * 0.42
  const sunR = bodyRadius(sun)

  for (let i = 1; i < bodies.length; i++) {
    const b = bodies[i]
    if (!b.alive) continue
    b.age += dt
    const d = Math.hypot(b.x - sun.x, b.y - sun.y)
    if (d < sunR * 1.2) { b.alive = false; continue }   // consumed by the star
    if (d > diskR * 1.8) { b.alive = false; continue }  // ejected from the system
    if (b.type === 'protoplanet' || b.type === 'planet' || b.type === 'planet-sterile') {
      b.trail.push({ x: b.x, y: b.y })
      if (b.trail.length > 40) b.trail.shift()
    }
  }

  return bodies.filter(b => b.alive)
}

function substep(bodies, dt, cv, outcomeKey) {
  const sun = bodies[0]
  const cx = sun.x, cy = sun.y
  const G_eff = DISK.G0 * Math.pow(10, cv.G * 0.5)
  // Radiation pressure on dust as a fraction of gravity — from luminosity and c
  const beta = 0.02 * sun.lum * Math.pow(10, cv.c * 0.6)
  const SOFT = 20
  const focus2 = DISK.FOCUS_DIST * DISK.FOCUS_DIST

  // Central gravity (radiation-reduced for dust)
  for (let i = 1; i < bodies.length; i++) {
    const b = bodies[i]
    if (!b.alive) continue
    const dx = cx - b.x, dy = cy - b.y
    const d2 = dx * dx + dy * dy
    const d = Math.sqrt(d2) + 0.01
    let acc = G_eff * DISK.M_STAR / (d2 + SOFT * SOFT)
    if (b.type === 'dust') acc *= (1 - beta)
    b.vx += dx / d * acc * dt
    b.vy += dy / d * acc * dt
  }

  // Outcome hook — keeps Λ/H₀/Ω_Λ extremes legible. Those constants get no
  // bespoke disk physics (negligible at planetary-system scale).
  if (outcomeKey === 'big-crunch' || outcomeKey === 'heat-death') {
    const sign = outcomeKey === 'big-crunch' ? 1 : -1
    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i]
      if (!b.alive) continue
      const dx = cx - b.x, dy = cy - b.y
      const d = Math.sqrt(dx * dx + dy * dy) + 1
      b.vx += dx / d * sign * 12 * dt
      b.vy += dy / d * sign * 12 * dt
    }
  }

  // Pair loop: gravitational focusing by grown bodies + accretion
  for (let i = 1; i < bodies.length; i++) {
    const a = bodies[i]
    if (!a.alive) continue
    for (let j = i + 1; j < bodies.length; j++) {
      const b = bodies[j]
      if (!b.alive) continue
      const dx = b.x - a.x, dy = b.y - a.y
      const d2 = dx * dx + dy * dy
      if (d2 > focus2) continue
      const d = Math.sqrt(d2) + 0.01
      const big = Math.max(a.mass, b.mass)

      // Grown bodies tug nearby grains in — this is what clears lanes
      if (big > DISK.T_PLANETESIMAL) {
        const f = G_eff * a.mass * b.mass / (d2 + 100)
        const fx = f * dx / d, fy = f * dy / d
        a.vx += fx / a.mass * dt; a.vy += fy / a.mass * dt
        b.vx -= fx / b.mass * dt; b.vy -= fy / b.mass * dt
      }

      // Accretion — collide and stick
      const captureR = (bodyRadius(a) + bodyRadius(b)) * DISK.CAPTURE_MULT
        + Math.sqrt(big) * 0.6 * Math.pow(10, cv.G * 0.2)
      if (d < captureR) merge(a, b, cv, sun)
    }
  }

  // Position update
  for (let i = 1; i < bodies.length; i++) {
    const b = bodies[i]
    if (!b.alive) continue
    b.x += b.vx * dt
    b.y += b.vy * dt
  }
}

function merge(a, b, cv, sun) {
  const heavy = a.mass >= b.mass ? a : b
  const light = heavy === a ? b : a
  const tm = a.mass + b.mass
  heavy.vx = (a.vx * a.mass + b.vx * b.mass) / tm
  heavy.vy = (a.vy * a.mass + b.vy * b.mass) / tm
  heavy.x = (a.x * a.mass + b.x * b.mass) / tm
  heavy.y = (a.y * a.mass + b.y * b.mass) / tm
  heavy.mass = tm
  light.alive = false

  // Promotion by mass — habitability is decided once, at planet promotion
  if (heavy.type === 'dust' && tm > DISK.T_PLANETESIMAL) {
    heavy.type = 'planetesimal'
    heavy.age = 0
  }
  if (heavy.type === 'planetesimal' && tm > DISK.T_PROTOPLANET) {
    heavy.type = 'protoplanet'
    heavy.age = 0
  }
  if (heavy.type === 'protoplanet' && tm > DISK.T_PLANET) {
    const chemOk = Math.abs(cv.mpMe) < 1.0 && Math.abs(cv.alpha) < 1.0
    const dSun = Math.hypot(heavy.x - sun.x, heavy.y - sun.y)
    const inHZ = dSun > sun.hzInner && dSun < sun.hzOuter
    heavy.type = (chemOk && inHZ) ? 'planet' : 'planet-sterile'
    heavy.age = 0
  }
}
