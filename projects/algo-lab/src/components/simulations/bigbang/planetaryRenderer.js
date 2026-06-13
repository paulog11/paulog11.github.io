/**
 * PixiJS renderer for the Planetary Formation view.
 * Renders the physics bodies from planetary.js plus a dense visual-only
 * layer of ~20K dust tracers on Keplerian orbits, so lane clearing and
 * disk structure are visible at a fidelity Canvas 2D can't reach.
 * Scene infrastructure (Application, bloom, backdrop, zoom, outcome
 * overlay) lives in pixiStage.js. The renderer never mutates physics state.
 */
import { Container, Graphics, Particle, ParticleContainer, Sprite } from 'pixi.js'
import { DISK, bodyRadius, diskGeometry } from './planetary.js'
import { TEX_SIZE } from './pixiStage.js'

const BODY_TINTS = {
  planetesimal: 0xaabed2,
  protoplanet: 0xff9664,
  planet: 0x50a078,
  'planet-sterile': 0x787878,
}
const TRACER_TINTS = [0xd8b894, 0xc9a87e, 0xe0c8a8, 0xb89c78]
const PARKED = -100000 // off-screen position for consumed tracers

export function createPlanetaryRenderer(stage) {
  const dotTex = stage.dotTex

  // Root container: HZ ring, sun, dust, trails, bodies (back → front)
  const root = new Container()
  const hzG = new Graphics()
  const sun = buildSun(dotTex)
  const dustPC = new ParticleContainer({
    dynamicProperties: { position: true, scale: false, rotation: false, color: false },
  })
  dustPC.blendMode = 'add'
  const trailG = new Graphics()
  trailG.blendMode = 'add'
  const bodiesC = new Container()
  root.addChild(hzG, sun.root, dustPC, trailG, bodiesC)

  const state = {
    geo: null,
    tracers: null,
    grains: [], // fixed particle pool mirroring the physics dust grains
    views: new Map(), // DiskBody → sprite container for grown bodies
  }

  function attach() {
    stage.world.addChild(root)
    stage.setBloom({ threshold: 0.3, bloomScale: 1.1, blur: 6 })
  }
  function detach() { if (root.parent) stage.world.removeChild(root) }

  function seed(cv, sunBody) {
    stage.seedStars()
    state.geo = diskGeometry(stage.W, stage.H, cv)
    const cx = stage.W / 2, cy = stage.H / 2

    // Habitable zone annulus
    const { hzInner, hzOuter } = state.geo
    hzG.clear()
    hzG.circle(cx, cy, (hzInner + hzOuter) / 2).stroke({ width: hzOuter - hzInner, color: 0x50a078, alpha: 0.05 })
    hzG.circle(cx, cy, hzInner).stroke({ width: 1, color: 0x50a078, alpha: 0.12 })
    hzG.circle(cx, cy, hzOuter).stroke({ width: 1, color: 0x50a078, alpha: 0.12 })

    // Sun — glow and spikes scale with luminosity
    const lum = sunBody.lum
    sun.root.position.set(cx, cy)
    sun.glow.scale.set(5.6 * lum)
    sun.glow.alpha = Math.min(0.85, 0.55 * Math.sqrt(lum) + 0.1)
    sun.core.scale.set(0.8)
    sun.spikes.alpha = Math.min(0.6, 0.35 * lum)

    // Visual dust tracers
    if (dustPC.particleChildren.length) dustPC.removeParticles(0, dustPC.particleChildren.length)
    const n = Math.round(Math.min(30000, Math.max(6000, 18000 + cv.eta * 6000)))
    const tr = {
      n,
      r: new Float32Array(n),
      ang: new Float32Array(n),
      om: new Float32Array(n),
      alive: new Uint8Array(n),
      parts: new Array(n),
    }
    const { diskIn, diskR } = state.geo
    for (let i = 0; i < n; i++) {
      // Power-law radius — denser toward the star, like a real disk
      const r = diskIn + (diskR - diskIn) * Math.pow(Math.random(), 1.2)
      const ang = Math.random() * Math.PI * 2
      tr.r[i] = r
      tr.ang[i] = ang
      tr.om[i] = Math.sqrt(DISK.G0 * DISK.M_STAR / r) / r * (0.97 + Math.random() * 0.06)
      tr.alive[i] = 1
      const scale = 0.04 + Math.random() * 0.05
      const p = new Particle({
        texture: dotTex,
        x: cx + Math.cos(ang) * r,
        y: cy + Math.sin(ang) * r,
        scaleX: scale, scaleY: scale,
        anchorX: 0.5, anchorY: 0.5,
        tint: TRACER_TINTS[(Math.random() * TRACER_TINTS.length) | 0],
        alpha: 0.25 + Math.random() * 0.35,
      })
      tr.parts[i] = p
      dustPC.addParticle(p)
    }
    // Pool for the physics dust grains — slightly bigger and brighter
    state.grains = []
    for (let i = 0; i < 280; i++) {
      const p = new Particle({
        texture: dotTex,
        x: PARKED, y: PARKED,
        scaleX: 0.085, scaleY: 0.085,
        anchorX: 0.5, anchorY: 0.5,
        tint: 0xe8d0b0,
        alpha: 0.8,
      })
      state.grains.push(p)
      dustPC.addParticle(p)
    }
    state.tracers = tr

    bodiesC.removeChildren().forEach(c => c.destroy({ children: true }))
    state.views.clear()
    trailG.clear()
  }

  function update(bodies, cv, dt, time, zoom, outcomeKey, paused) {
    const sunBody = bodies[0]

    stage.setZoom(zoom)

    // Sun shimmer
    sun.spikes.rotation = time * 0.1
    sun.glow.scale.set(5.6 * sunBody.lum * (1 + Math.sin(time * 2.5) * 0.04))

    if (!paused && state.tracers) advanceTracers(bodies, cv, dt, outcomeKey)
    syncGrains(bodies)
    syncBodies(bodies)
    drawTrails(bodies)
    stage.updateOutcome(outcomeKey, time, 'flat')

    stage.render()
  }

  function advanceTracers(bodies, cv, dt, outcomeKey) {
    const cx = stage.W / 2, cy = stage.H / 2
    const tr = state.tracers
    const G_eff = DISK.G0 * Math.pow(10, cv.G * 0.5)
    const beta = 0.02 * bodies[0].lum * Math.pow(10, cv.c * 0.6)
    // Radial drift: mistuned G spirals the disk in/out, radiation pushes out
    let drift = -((G_eff - DISK.G0) / DISK.G0) * 14 + beta * 60
    if (outcomeKey === 'big-crunch') drift -= 25
    else if (outcomeKey === 'heat-death') drift += 25
    const killInner = bodyRadius(bodies[0]) * 1.5
    const killOuter = state.geo.diskR * 1.7

    // Massive bodies that sweep their lanes
    const sweepers = []
    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i]
      if (b.mass <= DISK.T_PLANETESIMAL) continue
      const rb = Math.hypot(b.x - cx, b.y - cy)
      sweepers.push({
        rb,
        ab: Math.atan2(b.y - cy, b.x - cx),
        clearW: 12 + Math.sqrt(b.mass) * 2.2,
        reach: 16 + Math.sqrt(b.mass) * 3,
        capR: bodyRadius(b) * 3 + 4,
      })
    }

    const TWO_PI = Math.PI * 2
    for (let i = 0; i < tr.n; i++) {
      if (!tr.alive[i]) continue
      tr.ang[i] += tr.om[i] * dt
      tr.r[i] += drift * dt
      const r = tr.r[i]
      if (r < killInner || r > killOuter) {
        tr.alive[i] = 0
        tr.parts[i].x = PARKED; tr.parts[i].y = PARKED
        continue
      }
      for (const s of sweepers) {
        const dr = r - s.rb
        if (dr > s.clearW || dr < -s.clearW) continue
        let da = tr.ang[i] - s.ab
        da -= TWO_PI * Math.round(da / TWO_PI)
        const arc = Math.abs(da) * r
        if (arc > s.reach) continue
        if (arc < s.capR && Math.abs(dr) < s.capR) {
          // Swept up by the growing body
          tr.alive[i] = 0
          tr.parts[i].x = PARKED; tr.parts[i].y = PARKED
          break
        }
        // Pulled toward the body — visible feeding wake before consumption
        tr.r[i] -= dr * 1.5 * dt
        tr.ang[i] -= da * 0.8 * dt
      }
      if (!tr.alive[i]) continue
      tr.parts[i].x = cx + Math.cos(tr.ang[i]) * tr.r[i]
      tr.parts[i].y = cy + Math.sin(tr.ang[i]) * tr.r[i]
    }
  }

  function syncGrains(bodies) {
    let k = 0
    for (let i = 1; i < bodies.length && k < state.grains.length; i++) {
      const b = bodies[i]
      if (b.type !== 'dust') continue
      state.grains[k].x = b.x
      state.grains[k].y = b.y
      k++
    }
    for (; k < state.grains.length; k++) {
      state.grains[k].x = PARKED; state.grains[k].y = PARKED
    }
  }

  function syncBodies(bodies) {
    for (const view of state.views.values()) view.seen = false
    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i]
      if (b.type === 'dust') continue
      let view = state.views.get(b)
      if (!view) {
        view = buildBodyView(dotTex)
        state.views.set(b, view)
        bodiesC.addChild(view.root)
      }
      view.seen = true
      if (view.type !== b.type) {
        const tint = BODY_TINTS[b.type] || 0xffffff
        view.glow.tint = tint
        view.core.tint = b.type === 'planetesimal' ? 0xe8f0ff : tint
        view.type = b.type
      }
      const r = bodyRadius(b)
      view.core.scale.set((r * 2) / TEX_SIZE * 1.6)
      view.glow.scale.set((r * 2) / TEX_SIZE * 5)
      view.glow.alpha = b.type === 'planetesimal' ? 0.3 : 0.5
      view.root.position.set(b.x, b.y)
    }
    for (const [body, view] of state.views) {
      if (!view.seen) {
        view.root.destroy({ children: true })
        state.views.delete(body)
      }
    }
  }

  function drawTrails(bodies) {
    trailG.clear()
    for (let i = 1; i < bodies.length; i++) {
      const b = bodies[i]
      const t = b.trail
      if (!t || t.length < 2) continue
      const tint = BODY_TINTS[b.type] || 0xffffff
      for (let j = 1; j < t.length; j++) {
        trailG.moveTo(t[j - 1].x, t[j - 1].y).lineTo(t[j].x, t[j].y)
          .stroke({ width: 1, color: tint, alpha: (j / t.length) * 0.25 })
      }
    }
  }

  function destroy() {
    detach()
    root.destroy({ children: true })
  }

  return { seed, update, attach, detach, destroy }
}

// ── HELPERS ───────────────────────────────────────────────

function buildSun(dotTex) {
  const root = new Container()
  const glow = new Sprite({ texture: dotTex, anchor: 0.5 })
  glow.blendMode = 'add'
  glow.tint = 0xffeecc
  const spikes = new Graphics()
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 2) * i + Math.PI / 4
    spikes.moveTo(0, 0).lineTo(Math.cos(a) * 80, Math.sin(a) * 80)
      .stroke({ width: 1, color: 0xfff4e0, alpha: 0.35 })
  }
  spikes.blendMode = 'add'
  const core = new Sprite({ texture: dotTex, anchor: 0.5 })
  core.tint = 0xfffcf8
  root.addChild(glow, spikes, core)
  return { root, glow, spikes, core }
}

function buildBodyView(dotTex) {
  const root = new Container()
  const glow = new Sprite({ texture: dotTex, anchor: 0.5 })
  glow.blendMode = 'add'
  const core = new Sprite({ texture: dotTex, anchor: 0.5 })
  root.addChild(glow, core)
  return { root, glow, core, type: null, seen: true }
}
