/**
 * PixiJS renderer for the Celestial view (cosmic structure formation).
 * Translates the entity types from celestial.js into sprite views — same
 * palette and painter's order as the old canvas renderer — and adds a
 * visual-only layer of ~10K ambient gas wisps that drift and stream into
 * collapsing bodies. Physics is untouched; bodies are never mutated.
 */
import { Container, Graphics, Particle, ParticleContainer, Sprite, Texture } from 'pixi.js'
import { COLORS, bodyRadius } from './celestial.js'

const PARKED = -100000
const WISP_COUNT = 10000
const WISP_TINTS = [0x64c8dc, 0x8cb4dc, 0xb48cc8]
const GAS_BLOB_TINTS = [0x64c8dc, 0x8cb4dc, 0xb48cc8]
const GAS_BLOB_ALPHAS = [0.10, 0.08, 0.06]
const RING_REF_R = 32 // dashed-ring texture is baked at this radius

const TINTS = Object.fromEntries(
  Object.entries(COLORS).map(([k, c]) => [k, (c.r << 16) | (c.g << 8) | c.b])
)

export function createCelestialRenderer(stage) {
  const dotTex = stage.dotTex
  const hardDotTex = stage.hardDotTex
  const dashedRingTex = makeDashedRingTexture()
  const accretionTex = makeAccretionTexture()
  const ringGlowTex = makeRingGlowTexture()

  // Painter's order (canvas parity): wisps under everything, then
  // DM → gas → proto → star → BH → orbit rings → planets → sub-particles
  const root = new Container()
  const wispPC = new ParticleContainer({ dynamicProperties: { position: true } })
  wispPC.blendMode = 'add'
  const dmC = new Container()
  const gasC = new Container()
  const protoC = new Container()
  const starSpikesG = new Graphics()
  starSpikesG.blendMode = 'add'
  const starC = new Container()
  const bhC = new Container()
  const orbitG = new Graphics()
  const planetC = new Container()
  const subPC = new ParticleContainer({ dynamicProperties: { position: true, color: true } })
  subPC.blendMode = 'add'
  root.addChild(wispPC, dmC, gasC, protoC, starSpikesG, starC, bhC, orbitG, planetC, subPC)

  const layerFor = {
    'dark-matter-halo': dmC,
    'gas-cloud': gasC,
    'proto-star': protoC,
    'star': starC,
    'black-hole': bhC,
    'planet': planetC,
    'planet-sterile': planetC,
  }

  const state = {
    views: new Map(), // CelestialBody → view
    wisps: null,
    subPool: [],
    frame: 0,
  }

  // Pool for sub-particles (≤6 per star/black hole; 280 is plenty)
  for (let i = 0; i < 280; i++) {
    const p = new Particle({
      texture: dotTex, x: PARKED, y: PARKED,
      scaleX: 0.075, scaleY: 0.075, anchorX: 0.5, anchorY: 0.5,
      tint: 0xffffff, alpha: 0,
    })
    state.subPool.push(p)
    subPC.addParticle(p)
  }

  function attach() {
    stage.world.addChild(root)
    stage.setBackgroundGradient(true)
    stage.setBloom({ threshold: 0.55, bloomScale: 0.7, blur: 8 })
  }
  function detach() {
    if (root.parent) stage.world.removeChild(root)
    stage.setBackgroundGradient(false)
  }

  function seed(cv) {
    stage.seedStars()
    for (const view of state.views.values()) view.root.destroy({ children: true })
    state.views.clear()
    orbitG.clear()
    starSpikesG.clear()
    seedWisps()
  }

  function update(bodies, cv, dt, time, zoom, outcomeKey, paused) {
    state.frame++
    stage.setZoom(zoom)
    if (!paused && state.wisps) advanceWisps(bodies, dt)
    syncBodies(bodies, time)
    syncSubs(bodies)
    stage.updateOutcome(outcomeKey, time, 'vignette')
    stage.render()
  }

  // ── WISP DENSITY LAYER ──────────────────────────────────
  function seedWisps() {
    if (!state.wisps) {
      const n = WISP_COUNT
      const wisps = {
        n,
        x: new Float32Array(n), y: new Float32Array(n),
        vx: new Float32Array(n), vy: new Float32Array(n),
        targets: new Array(n).fill(null),
        parts: new Array(n),
      }
      for (let i = 0; i < n; i++) {
        const scale = 0.05 + Math.random() * 0.07
        const p = new Particle({
          texture: dotTex, x: 0, y: 0,
          scaleX: scale, scaleY: scale, anchorX: 0.5, anchorY: 0.5,
          tint: WISP_TINTS[(Math.random() * WISP_TINTS.length) | 0],
          alpha: 0.03 + Math.random() * 0.05,
        })
        wisps.parts[i] = p
        wispPC.addParticle(p)
      }
      state.wisps = wisps
    }
    const w = state.wisps
    for (let i = 0; i < w.n; i++) {
      w.x[i] = Math.random() * stage.W
      w.y[i] = Math.random() * stage.H
      const a = Math.random() * Math.PI * 2
      const s = 1 + Math.random() * 3
      w.vx[i] = Math.cos(a) * s
      w.vy[i] = Math.sin(a) * s
      w.targets[i] = null
      w.parts[i].x = w.x[i]
      w.parts[i].y = w.y[i]
    }
  }

  function respawnWisp(w, i) {
    const side = (Math.random() * 4) | 0
    if (side === 0) { w.x[i] = Math.random() * stage.W; w.y[i] = -10 }
    else if (side === 1) { w.x[i] = Math.random() * stage.W; w.y[i] = stage.H + 10 }
    else if (side === 2) { w.x[i] = -10; w.y[i] = Math.random() * stage.H }
    else { w.x[i] = stage.W + 10; w.y[i] = Math.random() * stage.H }
    // Drift inward with some spread
    const a = Math.atan2(stage.H / 2 - w.y[i], stage.W / 2 - w.x[i]) + (Math.random() - 0.5) * 1.2
    const s = 2 + Math.random() * 4
    w.vx[i] = Math.cos(a) * s
    w.vy[i] = Math.sin(a) * s
    w.targets[i] = null
  }

  function isAttractor(b) {
    return b.alive && (b.type === 'gas-cloud' || b.type === 'proto-star' || b.type === 'star')
  }

  function advanceWisps(bodies, dt) {
    const w = state.wisps
    const attractors = bodies.filter(isAttractor)
    const stride = state.frame & 15

    for (let i = 0; i < w.n; i++) {
      // Strided nearest-attractor re-pick: 1/16 of wisps per frame
      if ((i & 15) === stride && attractors.length) {
        let best = null, bd = Infinity
        for (const b of attractors) {
          const dx = b.x - w.x[i], dy = b.y - w.y[i]
          const d2 = dx * dx + dy * dy
          if (d2 < bd) { bd = d2; best = b }
        }
        w.targets[i] = best
      }
      const t = w.targets[i]
      if (t && isAttractor(t)) {
        const dx = t.x - w.x[i], dy = t.y - w.y[i]
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01
        if (d < bodyRadius(t) * 1.5) {
          // Absorbed — recycle at the edges so wisps never pile up
          respawnWisp(w, i)
          w.parts[i].x = w.x[i]; w.parts[i].y = w.y[i]
          continue
        }
        const acc = 60 * t.mass / Math.max(d, 40)
        w.vx[i] += dx / d * acc * dt
        w.vy[i] += dy / d * acc * dt
      }
      // Gentle damping + speed cap keep streams orderly
      w.vx[i] *= 0.99; w.vy[i] *= 0.99
      const sp2 = w.vx[i] * w.vx[i] + w.vy[i] * w.vy[i]
      if (sp2 > 576) {
        const k = 24 / Math.sqrt(sp2)
        w.vx[i] *= k; w.vy[i] *= k
      }
      w.x[i] += w.vx[i] * dt
      w.y[i] += w.vy[i] * dt
      if (w.x[i] < -80 || w.x[i] > stage.W + 80 || w.y[i] < -80 || w.y[i] > stage.H + 80) {
        respawnWisp(w, i)
      }
      w.parts[i].x = w.x[i]
      w.parts[i].y = w.y[i]
    }
  }

  // ── BODY VIEWS ──────────────────────────────────────────
  function syncBodies(bodies, time) {
    for (const view of state.views.values()) view.seen = false
    orbitG.clear()
    starSpikesG.clear()
    for (const b of bodies) {
      if (!b.alive) continue
      let view = state.views.get(b)
      if (!view || view.type !== b.type) {
        if (view) view.root.destroy({ children: true })
        view = buildView(b)
        state.views.set(b, view)
      }
      view.seen = true
      updateView(b, view, time)
    }
    for (const [body, view] of state.views) {
      if (!view.seen) {
        view.root.destroy({ children: true })
        state.views.delete(body)
      }
    }
  }

  function buildView(b) {
    const root = new Container()
    const view = { root, type: b.type, seen: true }
    switch (b.type) {
      case 'gas-cloud': {
        view.blobs = []
        for (let i = 0; i < 3; i++) {
          const s = new Sprite({ texture: dotTex, anchor: 0.5 })
          s.tint = GAS_BLOB_TINTS[i]
          s.alpha = GAS_BLOB_ALPHAS[i]
          view.blobs.push(s)
          root.addChild(s)
        }
        view.core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
        view.core.tint = 0xb4dcf0
        view.core.alpha = 0.15
        root.addChild(view.core)
        break
      }
      case 'dark-matter-halo': {
        view.glow = new Sprite({ texture: dotTex, anchor: 0.5 })
        view.glow.tint = TINTS['dark-matter-halo']
        view.glow.alpha = 0.03
        view.ring = new Sprite({ texture: dashedRingTex, anchor: 0.5 })
        view.ring.tint = TINTS['dark-matter-halo']
        view.ring.alpha = 0.07
        root.addChild(view.glow, view.ring)
        break
      }
      case 'proto-star': {
        view.glow = new Sprite({ texture: dotTex, anchor: 0.5 })
        view.glow.blendMode = 'add'
        view.glow.tint = TINTS['proto-star']
        view.glow.alpha = 0.3
        view.core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
        view.core.tint = TINTS['proto-star']
        view.core.alpha = 0.7
        root.addChild(view.glow, view.core)
        break
      }
      case 'star': {
        view.glow = new Sprite({ texture: dotTex, anchor: 0.5 })
        view.glow.blendMode = 'add'
        view.glow.tint = TINTS['star']
        view.glow.alpha = 0.35
        view.core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
        view.core.tint = 0xfffcf8
        view.core.alpha = 0.95
        root.addChild(view.glow, view.core)
        break
      }
      case 'black-hole': {
        // BH mass is fixed after promotion — geometry built once
        const r = bodyRadius(b)
        const diskC = new Container()
        const disk = new Sprite({ texture: accretionTex, anchor: 0.5 })
        disk.width = disk.height = r * 5 * 2
        const ring = new Graphics().circle(0, 0, r * 2.5).stroke({ width: 1.5, color: 0xffb450 })
        diskC.addChild(disk, ring)
        diskC.scale.set(1, 0.4)
        const core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
        core.tint = 0x05020a
        core.alpha = 0.95
        core.width = core.height = Math.max(2, r * 0.7) * 2
        const eh = new Sprite({ texture: ringGlowTex, anchor: 0.5 })
        eh.tint = TINTS['black-hole']
        eh.alpha = 0.08
        eh.width = eh.height = r * 1.5 * 2
        root.addChild(diskC, core, eh)
        view.diskC = diskC
        view.ring = ring
        break
      }
      case 'planet':
      case 'planet-sterile': {
        view.dot = new Sprite({ texture: hardDotTex, anchor: 0.5 })
        view.dot.tint = TINTS[b.type]
        view.dot.alpha = 0.8
        view.dot.width = view.dot.height = 6
        root.addChild(view.dot)
        break
      }
    }
    layerFor[b.type].addChild(root)
    return view
  }

  function updateView(b, view, time) {
    const r = bodyRadius(b)
    view.root.position.set(b.x, b.y)
    switch (b.type) {
      case 'gas-cloud': {
        const radius = r * (1 + Math.sin(time * 0.8 + b.angle * 3) * 0.06)
        for (let i = 0; i < 3; i++) {
          const s = view.blobs[i]
          s.position.set(
            Math.cos(b.angle + i * 2.1) * radius * 0.25,
            Math.sin(b.angle + i * 2.1) * radius * 0.25
          )
          s.width = s.height = radius * (0.8 + i * 0.15) * 2
        }
        view.core.width = view.core.height = Math.max(1, r * 0.15) * 2
        break
      }
      case 'dark-matter-halo': {
        const radius = r * (1 + Math.sin(time * 1.5 + b.angle) * 0.08)
        view.ring.scale.set(radius / RING_REF_R)
        view.glow.width = view.glow.height = radius * 0.6 * 2
        break
      }
      case 'proto-star': {
        const radius = r * (1 + Math.sin(time * 2.5 + b.angle) * 0.1)
        view.glow.width = view.glow.height = radius * 3 * 2
        view.core.width = view.core.height = Math.max(2, radius) * 2
        break
      }
      case 'star': {
        const radius = r * (1 + Math.sin(time * 3 + b.angle) * 0.05)
        view.glow.width = view.glow.height = radius * 4 * 2
        view.core.width = view.core.height = Math.max(2, radius * 0.8) * 2
        // Diffraction spikes into the shared Graphics (canvas-faithful:
        // rotating, pulsing, fading outward — gradient approximated with
        // two alpha segments)
        const A = 0.25 + Math.sin(time * 2) * 0.05
        const spikeLen = radius * 5
        const c = TINTS['star']
        for (let k = 0; k < 4; k++) {
          const a = (Math.PI / 4) * (k * 2) + time * 0.1
          const mx = b.x + Math.cos(a) * spikeLen * 0.6
          const my = b.y + Math.sin(a) * spikeLen * 0.6
          const ex = b.x + Math.cos(a) * spikeLen
          const ey = b.y + Math.sin(a) * spikeLen
          starSpikesG.moveTo(b.x, b.y).lineTo(mx, my).stroke({ width: 0.8, color: c, alpha: 0.4 * A })
          starSpikesG.moveTo(mx, my).lineTo(ex, ey).stroke({ width: 0.8, color: c, alpha: 0.15 * A })
        }
        break
      }
      case 'black-hole': {
        view.diskC.rotation = b.angle * 0.5
        view.ring.alpha = 0.3 + Math.sin(time * 4) * 0.1
        break
      }
      case 'planet':
      case 'planet-sterile': {
        if (b.orbitParent && b.orbitParent.alive) {
          orbitG.circle(b.orbitParent.x, b.orbitParent.y, b.orbitRadius)
            .stroke({ width: 0.5, color: TINTS[b.type], alpha: 0.06 })
        }
        break
      }
    }
  }

  // ── SUB-PARTICLES ───────────────────────────────────────
  function syncSubs(bodies) {
    let k = 0
    for (const b of bodies) {
      if (!b.subParticles || !b.subParticles.length) continue
      const tint = b.type === 'black-hole' ? TINTS['black-hole'] : TINTS['star']
      for (const sp of b.subParticles) {
        if (k >= state.subPool.length) break
        const p = state.subPool[k++]
        p.x = sp.x
        p.y = sp.y
        p.tint = tint
        p.alpha = (sp.life / sp.maxLife) * 0.6
      }
    }
    for (; k < state.subPool.length; k++) {
      state.subPool[k].x = PARKED
      state.subPool[k].y = PARKED
      state.subPool[k].alpha = 0
    }
  }

  function destroy() {
    detach()
    root.destroy({ children: true })
  }

  return { seed, update, attach, detach, destroy }
}

// ── TEXTURES ──────────────────────────────────────────────

// Dashed circle baked once — halo radii cluster near the reference radius,
// so dash-length distortion from scaling is invisible at alpha 0.07
function makeDashedRingTexture() {
  const S = 80
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  g.strokeStyle = '#fff'
  g.lineWidth = 2
  g.setLineDash([4, 6])
  g.beginPath()
  g.arc(S / 2, S / 2, RING_REF_R, 0, Math.PI * 2)
  g.stroke()
  return Texture.from(c)
}

// Accretion disk gradient — exact canvas stops, color baked (not tinted)
function makeAccretionTexture() {
  const S = 128
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, S * 0.08, S / 2, S / 2, S / 2)
  grd.addColorStop(0, 'rgba(255,160,60,0.5)')
  grd.addColorStop(0.4, 'rgba(255,120,40,0.25)')
  grd.addColorStop(0.7, 'rgba(180,80,200,0.1)')
  grd.addColorStop(1, 'rgba(140,60,180,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}

// Event-horizon glow ring: transparent center, peak at ~0.7, fading out
function makeRingGlowTexture() {
  const S = 64
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, S * 0.17, S / 2, S / 2, S / 2)
  grd.addColorStop(0, 'rgba(255,255,255,0)')
  grd.addColorStop(0.7, 'rgba(255,255,255,1)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}
