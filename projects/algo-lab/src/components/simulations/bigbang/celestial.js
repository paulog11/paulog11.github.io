/**
 * Celestial body simulation for the Fine Tuning Explorer.
 * Models cosmic structure formation: gas clouds → proto-stars → stars → black holes,
 * with planet spawning, all influenced by the 10 physical constants.
 */

// ── CELESTIAL BODY CLASS ──────────────────────────────────
export class CelestialBody {
  constructor(x, y, vx, vy, mass, type) {
    this.x = x; this.y = y
    this.vx = vx; this.vy = vy
    this.mass = mass; this.type = type
    this.alive = true; this.age = 0
    this.angle = Math.random() * Math.PI * 2
    this.orbitParent = null
    this.orbitRadius = 0
    this.orbitAngle = Math.random() * Math.PI * 2
    this.subParticles = []
  }
}

// ── SUB-PARTICLE (accretion / emission) ───────────────────
class SubParticle {
  constructor(x, y, vx, vy, life) {
    this.x = x; this.y = y
    this.vx = vx; this.vy = vy
    this.life = life; this.maxLife = life
  }
}

// ── COLORS BY TYPE ────────────────────────────────────────
const COLORS = {
  'gas-cloud':        { r: 100, g: 200, b: 220 },
  'dark-matter-halo': { r: 140, g: 100, b: 220 },
  'proto-star':       { r: 255, g: 180, b: 80  },
  'star':             { r: 220, g: 240, b: 255 },
  'black-hole':       { r: 255, g: 140, b: 60  },
  'planet':           { r: 80,  g: 160, b: 120 },
  'planet-sterile':   { r: 120, g: 120, b: 120 },
}

// ── CREATE INITIAL FIELD ──────────────────────────────────
export function createCelestialField(W, H, cv) {
  const bodies = []
  const cx = W / 2, cy = H / 2

  // Gas clouds — count affected by eta (baryon ratio)
  const gasCount = Math.round(35 + cv.eta * 12)
  const H0mod = 1 + cv.H0 * 0.6
  const higgsMod = Math.max(0.15, 1 + cv.higgs * 0.4)
  for (let i = 0; i < Math.max(8, gasCount); i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 60 + Math.random() * Math.min(W, H) * 0.35
    const x = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 80
    const y = cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 80
    const speed = (5 + Math.random() * 15) * H0mod
    const vx = Math.cos(angle) * speed * 0.3 + (Math.random() - 0.5) * 4
    const vy = Math.sin(angle) * speed * 0.3 + (Math.random() - 0.5) * 4
    const mass = (4 + Math.random() * 12) * higgsMod
    bodies.push(new CelestialBody(x, y, vx, vy, mass, 'gas-cloud'))
  }

  // Dark matter halos — count affected by omegaL
  const dmCount = Math.round(10 + cv.omegaL * 4)
  for (let i = 0; i < Math.max(4, dmCount); i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = 40 + Math.random() * Math.min(W, H) * 0.32
    const x = cx + Math.cos(angle) * dist
    const y = cy + Math.sin(angle) * dist
    const mass = 20 + Math.random() * 30
    bodies.push(new CelestialBody(x, y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, mass, 'dark-matter-halo'))
  }

  return bodies
}

// ── PHYSICS STEP ──────────────────────────────────────────
export function celestialPhysicsStep(bodies, dt, cv, W, H) {
  const G_eff = 800 * Math.pow(10, cv.G * 0.6)
  const alphaEM = 1 + cv.alpha * 0.5
  const alphaS = 1 + cv.alphaS * 0.6
  const lambdaPush = cv.lambda * 0.003
  const cx = W / 2, cy = H / 2
  const SOFTEN = 80

  // Gravity between all primary bodies
  for (let i = 0; i < bodies.length; i++) {
    const a = bodies[i]; if (!a.alive || a.type === 'planet') continue
    for (let j = i + 1; j < bodies.length; j++) {
      const b = bodies[j]; if (!b.alive || b.type === 'planet') continue
      const dx = b.x - a.x, dy = b.y - a.y
      const d2 = dx * dx + dy * dy, d = Math.sqrt(d2) + 0.01
      const f = G_eff * a.mass * b.mass / (d2 + SOFTEN * SOFTEN)
      const fx = f * dx / d, fy = f * dy / d
      a.vx += fx / a.mass * dt; a.vy += fy / a.mass * dt
      b.vx -= fx / b.mass * dt; b.vy -= fy / b.mass * dt

      // Merging logic
      const mergeR = (bodyRadius(a) + bodyRadius(b)) * 0.9
      if (d < mergeR && canMerge(a) && canMerge(b)) {
        merge(a, b, cv)
      }
    }
  }

  // Cosmological constant — expansion push
  if (Math.abs(lambdaPush) > 0.0001) {
    for (const b of bodies) {
      if (!b.alive || b.type === 'planet') continue
      const dx = b.x - cx, dy = b.y - cy
      const d = Math.sqrt(dx * dx + dy * dy) + 0.1
      b.vx += (dx / d) * lambdaPush
      b.vy += (dy / d) * lambdaPush
    }
  }

  // Per-body updates
  for (const b of bodies) {
    if (!b.alive) continue
    b.age += dt

    if (b.type === 'planet') {
      // Orbit parent
      if (b.orbitParent && b.orbitParent.alive) {
        b.orbitAngle += dt * 1.2 / Math.sqrt(b.orbitRadius + 10)
        b.x = b.orbitParent.x + Math.cos(b.orbitAngle) * b.orbitRadius
        b.y = b.orbitParent.y + Math.sin(b.orbitAngle) * b.orbitRadius
      } else {
        b.alive = false
      }
      continue
    }

    // Drag for bound bodies
    if (b.type === 'proto-star' || b.type === 'star' || b.type === 'black-hole') {
      b.vx *= 0.992; b.vy *= 0.992
    }

    b.x += b.vx * dt; b.y += b.vy * dt
    b.angle += dt * 0.3

    // Promotion: proto-star → star
    if (b.type === 'proto-star' && b.age > 0.5) {
      const fusionOk = Math.abs(cv.alphaS) < 1.2 && Math.abs(cv.alpha) < 1.3
      if (fusionOk && b.mass > 25 * Math.max(0.3, alphaS)) {
        b.type = 'star'
        b.age = 0
      }
    }

    // Promotion: star → black-hole (when G high or mass huge)
    if (b.type === 'star' && b.age > 1.0) {
      const bhThreshold = 120 / Math.max(0.5, Math.pow(10, cv.G * 0.3))
      if (b.mass > bhThreshold) {
        b.type = 'black-hole'
        b.age = 0
      }
    }

    // Stars spawn planets
    if (b.type === 'star' && b.age > 0.8 && Math.random() < 0.003) {
      const chemOk = Math.abs(cv.mpMe) < 1.0 && Math.abs(cv.alpha) < 1.0
      const orbitR = bodyRadius(b) * 3 + Math.random() * 40
      const planet = new CelestialBody(
        b.x + orbitR, b.y, 0, 0, 1 + Math.random() * 2,
        chemOk ? 'planet' : 'planet-sterile'
      )
      planet.orbitParent = b
      planet.orbitRadius = orbitR
      planet.orbitAngle = Math.random() * Math.PI * 2
      bodies.push(planet)
    }

    // Stars/black-holes emit sub-particles
    if ((b.type === 'star' || b.type === 'black-hole') && b.subParticles.length < 6 && Math.random() < 0.08) {
      const cMod = Math.pow(10, cv.c * 0.3)
      const angle = Math.random() * Math.PI * 2
      const speed = b.type === 'star' ? 30 * cMod : -20
      b.subParticles.push(new SubParticle(
        b.x, b.y,
        Math.cos(angle) * speed + b.vx * 0.5,
        Math.sin(angle) * speed + b.vy * 0.5,
        0.8 + Math.random() * 0.4
      ))
    }

    // Update sub-particles
    for (const sp of b.subParticles) {
      if (b.type === 'black-hole') {
        // Spiral inward
        const dx = b.x - sp.x, dy = b.y - sp.y
        const d = Math.sqrt(dx * dx + dy * dy) + 1
        sp.vx += dx / d * 15 * dt; sp.vy += dy / d * 15 * dt
        // Tangential
        sp.vx += -dy / d * 8 * dt; sp.vy += dx / d * 8 * dt
      }
      sp.x += sp.vx * dt; sp.y += sp.vy * dt
      sp.life -= dt
    }
    b.subParticles = b.subParticles.filter(sp => sp.life > 0)
  }

  // Remove dead bodies, cap planets
  const planetCount = bodies.filter(b => b.alive && (b.type === 'planet' || b.type === 'planet-sterile')).length
  if (planetCount > 30) {
    const planets = bodies.filter(b => b.alive && (b.type === 'planet' || b.type === 'planet-sterile'))
    planets[0].alive = false
  }

  return bodies.filter(b => b.alive)
}

function canMerge(b) {
  return b.type === 'gas-cloud' || b.type === 'dark-matter-halo' || b.type === 'proto-star'
}

function merge(a, b, cv) {
  const tm = a.mass + b.mass
  a.vx = (a.vx * a.mass + b.vx * b.mass) / tm
  a.vy = (a.vy * a.mass + b.vy * b.mass) / tm
  a.x = (a.x * a.mass + b.x * b.mass) / tm
  a.y = (a.y * a.mass + b.y * b.mass) / tm
  a.mass = tm
  b.alive = false

  // Promote gas → proto-star at mass threshold
  const gThreshold = 18 / Math.max(0.3, Math.pow(10, cv.G * 0.3))
  if (a.type === 'gas-cloud' && a.mass > gThreshold) {
    a.type = 'proto-star'
    a.age = 0
  }
  // DM halo merging into gas keeps gas type but adds mass
  if (a.type === 'dark-matter-halo' && b.type === 'gas-cloud') {
    a.type = 'gas-cloud'
  }
}

function bodyRadius(b) {
  switch (b.type) {
    case 'gas-cloud':        return Math.cbrt(b.mass) * 8
    case 'dark-matter-halo': return Math.cbrt(b.mass) * 10
    case 'proto-star':       return Math.cbrt(b.mass) * 5
    case 'star':             return Math.cbrt(b.mass) * 4
    case 'black-hole':       return Math.cbrt(b.mass) * 3
    case 'planet':
    case 'planet-sterile':   return 3
    default:                 return 4
  }
}

// ── RENDERING ─────────────────────────────────────────────
export function drawCelestialBodies(ctx, bodies, W, H, zoom, time) {
  // Sort: draw dark matter first, then gas, then proto-stars, stars, black holes, planets on top
  const order = { 'dark-matter-halo': 0, 'gas-cloud': 1, 'proto-star': 2, 'star': 3, 'black-hole': 4, 'planet': 5, 'planet-sterile': 5 }
  const sorted = [...bodies].sort((a, b) => (order[a.type] || 0) - (order[b.type] || 0))

  for (const b of sorted) {
    if (!b.alive) continue
    const r = bodyRadius(b)

    switch (b.type) {
      case 'dark-matter-halo':
        drawDarkMatterHalo(ctx, b, r, time)
        break
      case 'gas-cloud':
        drawGasCloud(ctx, b, r, time)
        break
      case 'proto-star':
        drawProtoStar(ctx, b, r, time)
        break
      case 'star':
        drawStar(ctx, b, r, time)
        break
      case 'black-hole':
        drawBlackHole(ctx, b, r, time)
        break
      case 'planet':
      case 'planet-sterile':
        drawPlanet(ctx, b, r)
        break
    }

    // Sub-particles
    for (const sp of b.subParticles) {
      const alpha = (sp.life / sp.maxLife) * 0.6
      const c = b.type === 'black-hole' ? COLORS['black-hole'] : COLORS['star']
      ctx.beginPath()
      ctx.arc(sp.x, sp.y, 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`
      ctx.fill()
    }
  }
}

function drawDarkMatterHalo(ctx, b, r, time) {
  const pulse = 1 + Math.sin(time * 1.5 + b.angle) * 0.08
  const radius = r * pulse
  ctx.beginPath()
  ctx.arc(b.x, b.y, radius, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(140,100,220,0.07)'
  ctx.lineWidth = 2
  ctx.setLineDash([4, 6])
  ctx.stroke()
  ctx.setLineDash([])

  // Faint inner glow
  const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius * 0.6)
  grd.addColorStop(0, 'rgba(140,100,220,0.03)')
  grd.addColorStop(1, 'rgba(140,100,220,0)')
  ctx.beginPath(); ctx.arc(b.x, b.y, radius * 0.6, 0, Math.PI * 2)
  ctx.fillStyle = grd; ctx.fill()
}

function drawGasCloud(ctx, b, r, time) {
  const pulse = 1 + Math.sin(time * 0.8 + b.angle * 3) * 0.06
  const radius = r * pulse

  // Multiple overlapping gradients for nebula feel
  for (let i = 0; i < 3; i++) {
    const offX = Math.cos(b.angle + i * 2.1) * radius * 0.25
    const offY = Math.sin(b.angle + i * 2.1) * radius * 0.25
    const grd = ctx.createRadialGradient(
      b.x + offX, b.y + offY, 0,
      b.x + offX, b.y + offY, radius * (0.8 + i * 0.15)
    )
    const tint = i === 0 ? '100,200,220' : i === 1 ? '140,180,220' : '180,140,200'
    grd.addColorStop(0, `rgba(${tint},${0.10 - i * 0.02})`)
    grd.addColorStop(0.5, `rgba(${tint},${0.05 - i * 0.01})`)
    grd.addColorStop(1, `rgba(${tint},0)`)
    ctx.beginPath(); ctx.arc(b.x + offX, b.y + offY, radius * (0.8 + i * 0.15), 0, Math.PI * 2)
    ctx.fillStyle = grd; ctx.fill()
  }

  // Bright core dot
  ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(1, r * 0.15), 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(180,220,240,0.15)'; ctx.fill()
}

function drawProtoStar(ctx, b, r, time) {
  const pulse = 1 + Math.sin(time * 2.5 + b.angle) * 0.1
  const radius = r * pulse
  const c = COLORS['proto-star']

  // Outer glow
  const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius * 3)
  grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.25)`)
  grd.addColorStop(0.3, `rgba(${c.r},${c.g},${c.b},0.08)`)
  grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
  ctx.beginPath(); ctx.arc(b.x, b.y, radius * 3, 0, Math.PI * 2)
  ctx.fillStyle = grd; ctx.fill()

  // Core
  ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(2, radius), 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.7)`
  ctx.shadowColor = `rgb(${c.r},${c.g},${c.b})`; ctx.shadowBlur = radius * 2
  ctx.fill(); ctx.shadowBlur = 0
}

function drawStar(ctx, b, r, time) {
  const pulse = 1 + Math.sin(time * 3 + b.angle) * 0.05
  const radius = r * pulse
  const c = COLORS['star']

  // Outer glow
  const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius * 4)
  grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.35)`)
  grd.addColorStop(0.2, `rgba(${c.r},${c.g},${c.b},0.1)`)
  grd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
  ctx.beginPath(); ctx.arc(b.x, b.y, radius * 4, 0, Math.PI * 2)
  ctx.fillStyle = grd; ctx.fill()

  // Diffraction spikes (4-pointed)
  ctx.save()
  ctx.globalAlpha = 0.25 + Math.sin(time * 2) * 0.05
  const spikeLen = radius * 5
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 4) * (i * 2) + time * 0.1
    const ex = b.x + Math.cos(a) * spikeLen
    const ey = b.y + Math.sin(a) * spikeLen
    const sg = ctx.createLinearGradient(b.x, b.y, ex, ey)
    sg.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.4)`)
    sg.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`)
    ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(ex, ey)
    ctx.strokeStyle = sg; ctx.lineWidth = 0.8; ctx.stroke()
  }
  ctx.restore()

  // Bright core
  ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(2, radius * 0.8), 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,252,248,0.95)`
  ctx.shadowColor = `rgb(${c.r},${c.g},${c.b})`; ctx.shadowBlur = radius * 3
  ctx.fill(); ctx.shadowBlur = 0
}

function drawBlackHole(ctx, b, r, time) {
  const radius = r

  // Accretion disk — ellipse
  ctx.save()
  ctx.translate(b.x, b.y)
  ctx.rotate(b.angle * 0.5)
  ctx.scale(1, 0.4)
  const diskR = radius * 5
  const grd = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, diskR)
  grd.addColorStop(0, 'rgba(255,160,60,0.5)')
  grd.addColorStop(0.4, 'rgba(255,120,40,0.25)')
  grd.addColorStop(0.7, 'rgba(180,80,200,0.1)')
  grd.addColorStop(1, 'rgba(140,60,180,0)')
  ctx.beginPath(); ctx.arc(0, 0, diskR, 0, Math.PI * 2)
  ctx.fillStyle = grd; ctx.fill()

  // Bright ring
  ctx.beginPath(); ctx.arc(0, 0, radius * 2.5, 0, Math.PI * 2)
  ctx.strokeStyle = `rgba(255,180,80,${0.3 + Math.sin(time * 4) * 0.1})`
  ctx.lineWidth = 1.5; ctx.stroke()
  ctx.restore()

  // Dark core
  ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(2, radius * 0.7), 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(5,2,10,0.95)'; ctx.fill()

  // Event horizon glow
  const ehGrd = ctx.createRadialGradient(b.x, b.y, radius * 0.5, b.x, b.y, radius * 1.5)
  ehGrd.addColorStop(0, 'rgba(5,2,10,0)')
  ehGrd.addColorStop(0.7, 'rgba(255,140,60,0.08)')
  ehGrd.addColorStop(1, 'rgba(255,140,60,0)')
  ctx.beginPath(); ctx.arc(b.x, b.y, radius * 1.5, 0, Math.PI * 2)
  ctx.fillStyle = ehGrd; ctx.fill()
}

function drawPlanet(ctx, b, r) {
  const c = b.type === 'planet' ? COLORS['planet'] : COLORS['planet-sterile']

  // Orbital path
  if (b.orbitParent && b.orbitParent.alive) {
    ctx.beginPath()
    ctx.arc(b.orbitParent.x, b.orbitParent.y, b.orbitRadius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.06)`
    ctx.lineWidth = 0.5; ctx.stroke()
  }

  // Planet dot
  ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.8)`
  ctx.fill()
}
