/**
 * PixiJS renderer for the Atom view (early-universe epochs).
 * Renders the BBParticle array from the component — trails, glows, mass
 * labels, the bang flash — and adds a visual-only epoch haze: ~10K hot
 * particles whose color and spread are pure functions of bbTime, so the
 * fireball cools from white-hot (Planck) through orange (quark/hadron)
 * and fades out by the end of nucleosynthesis. Being stateless in time,
 * the haze is correct immediately after jumpToEpoch fast-forwards.
 */
import { Container, Graphics, Particle, ParticleContainer, Sprite, Text, Texture } from 'pixi.js'

const HAZE_COUNT = 10000
const HAZE_OFF_AT = 0.27 // past nucleosynthesis the haze is gone — skip everything

// [bbTime, r, g, b, alpha] — the cooling curve of the early universe
const HAZE_KEYS = [
  [0.00, 255, 246, 238, 0.35],
  [0.01, 255, 200, 120, 0.28],
  [0.05, 255, 140, 70, 0.18],
  [0.10, 255, 96, 56, 0.10],
  [0.25, 255, 96, 56, 0.00],
]

export function createAtomRenderer(stage) {
  const dotTex = stage.dotTex
  const hardDotTex = stage.hardDotTex

  // Bang flash — unzoomed, under the world (canvas drew it before the
  // zoom transform)
  const flashSprite = new Sprite(makeFlashTexture())
  flashSprite.anchor.set(0.5)
  flashSprite.visible = false

  const root = new Container()
  const hazePC = new ParticleContainer({ dynamicProperties: { position: true, color: true } })
  hazePC.blendMode = 'add'
  const trailG = new Graphics()
  const bodiesC = new Container()
  root.addChild(hazePC, trailG, bodiesC)

  const state = {
    views: new Map(), // BBParticle → view
    haze: null,
  }

  function attach() {
    stage.world.addChild(root)
    stage.underlay.addChild(flashSprite)
    stage.setBackgroundGradient(true)
    stage.setBloom({ threshold: 0.5, bloomScale: 0.8, blur: 7 })
  }
  function detach() {
    if (root.parent) stage.world.removeChild(root)
    if (flashSprite.parent) stage.underlay.removeChild(flashSprite)
    stage.setBackgroundGradient(false)
  }

  // Recompute the haze velocity field — mirrors the bigBang() speed
  // formula so the fireball expands with the H₀/Λ sliders
  function seed(cv) {
    if (!state.haze) {
      const n = HAZE_COUNT
      const haze = {
        n,
        dirX: new Float32Array(n), dirY: new Float32Array(n),
        speed: new Float32Array(n),
        r0: new Float32Array(n),
        jit: new Float32Array(n),
        parts: new Array(n),
      }
      for (let i = 0; i < n; i++) {
        const scale = 0.03 + Math.random() * 0.05
        const p = new Particle({
          texture: dotTex, x: 0, y: 0,
          scaleX: scale, scaleY: scale, anchorX: 0.5, anchorY: 0.5,
          tint: 0xffffff, alpha: 0,
        })
        haze.parts[i] = p
        hazePC.addParticle(p)
      }
      state.haze = haze
    }
    const h = state.haze
    const H0mod = 1 + cv.H0 * 0.8
    const Lmod = 1 + cv.lambda * 0.4
    for (let i = 0; i < h.n; i++) {
      const a = Math.random() * Math.PI * 2
      h.dirX[i] = Math.cos(a)
      h.dirY[i] = Math.sin(a)
      h.speed[i] = (60 + Math.random() * 90) * H0mod * Lmod
      h.r0[i] = 30 * Math.sqrt(Math.random()) // filled disc, not a shell
      h.jit[i] = 0.4 + Math.random() * 0.6
    }
  }

  function update(particles, cv, bbTime, zoom, outcomeKey, paused) {
    stage.setZoom(zoom)

    // Bang flash — pure function of bbTime
    if (bbTime < 0.08) {
      flashSprite.visible = true
      flashSprite.position.set(stage.W / 2, stage.H / 2)
      flashSprite.width = flashSprite.height = Math.max(stage.W, stage.H) * 1.4
      flashSprite.alpha = Math.max(0, 0.95 - bbTime * 12)
    } else {
      flashSprite.visible = false
    }

    updateHaze(bbTime)
    drawTrails(particles)
    syncBodies(particles)
    stage.updateOutcome(outcomeKey, bbTime, 'vignette')

    stage.render()
  }

  function updateHaze(bbTime) {
    const h = state.haze
    if (!h) return
    if (bbTime > HAZE_OFF_AT) {
      hazePC.renderable = false
      return
    }
    hazePC.renderable = true
    // Lerp the cooling curve
    let k = 0
    while (k < HAZE_KEYS.length - 2 && bbTime > HAZE_KEYS[k + 1][0]) k++
    const a = HAZE_KEYS[k], b = HAZE_KEYS[k + 1]
    const f = Math.min(1, Math.max(0, (bbTime - a[0]) / (b[0] - a[0])))
    const r = Math.round(a[1] + (b[1] - a[1]) * f)
    const g = Math.round(a[2] + (b[2] - a[2]) * f)
    const bl = Math.round(a[3] + (b[3] - a[3]) * f)
    const tint = (r << 16) | (g << 8) | bl
    const alpha = a[4] + (b[4] - a[4]) * f

    const cx = stage.W / 2, cy = stage.H / 2
    for (let i = 0; i < h.n; i++) {
      const p = h.parts[i]
      const d = h.r0[i] + h.speed[i] * bbTime * 2
      p.x = cx + h.dirX[i] * d
      p.y = cy + h.dirY[i] * d
      p.tint = tint
      p.alpha = alpha * h.jit[i]
    }
  }

  function drawTrails(particles) {
    trailG.clear()
    for (const p of particles) {
      const t = p.trail
      if (!t || t.length < 2) continue
      const [r, g, b] = p.baseColor
      const tint = (r << 16) | (g << 8) | b
      const tl = t.length
      for (let i = 1; i < tl; i++) {
        trailG.moveTo(t[i - 1].x, t[i - 1].y).lineTo(t[i].x, t[i].y)
          .stroke({ width: Math.max(0.5, (i / tl) * 1.5), color: tint, alpha: (i / tl) * 0.35 })
      }
    }
  }

  function syncBodies(particles) {
    for (const view of state.views.values()) view.seen = false
    for (const p of particles) {
      if (!p.alive) continue
      let view = state.views.get(p)
      if (!view) {
        view = buildParticleView(p)
        state.views.set(p, view)
        bodiesC.addChild(view.root)
      }
      view.seen = true
      const glowR = p.bound ? Math.cbrt(p.mass) * 3.5 : p.r
      view.glow.width = view.glow.height = glowR * 3.5 * 2
      view.core.width = view.core.height = Math.max(1.5, glowR) * 2
      view.root.position.set(p.x, p.y)
      // Mass label for heavy bound clumps — created lazily, text updated
      // only when the rounded mass changes
      if (p.bound && p.mass > 40) {
        if (!view.label) {
          const [r, g, b] = p.baseColor
          view.label = new Text({
            text: '',
            style: { fontFamily: '"Space Mono", monospace', fontSize: 7, fill: `rgb(${r},${g},${b})` },
          })
          view.label.anchor.set(0.5, 1)
          view.label.alpha = 0.4
          view.root.addChild(view.label)
        }
        const m = Math.round(p.mass)
        if (view.lastMass !== m) {
          view.label.text = `${m}m`
          view.lastMass = m
        }
        view.label.position.set(0, -glowR - 5)
        view.label.visible = true
      } else if (view.label) {
        view.label.visible = false
      }
    }
    for (const [particle, view] of state.views) {
      if (!view.seen) {
        view.root.destroy({ children: true })
        state.views.delete(particle)
      }
    }
  }

  function buildParticleView(p) {
    const [r, g, b] = p.baseColor
    const tint = (r << 16) | (g << 8) | b
    const root = new Container()
    const glow = new Sprite({ texture: dotTex, anchor: 0.5 })
    glow.blendMode = 'add'
    glow.tint = tint
    glow.alpha = 0.45
    const core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
    core.tint = tint
    core.alpha = 0.95
    root.addChild(glow, core)
    return { root, glow, core, label: null, lastMass: 0, seen: true }
  }

  function destroy() {
    detach()
    root.destroy({ children: true })
    flashSprite.destroy()
  }

  return { seed, update, attach, detach, destroy }
}

// Port of canvas drawFlash(): white core → orange → purple → transparent
function makeFlashTexture() {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  grd.addColorStop(0, 'rgba(255,250,240,1)')
  grd.addColorStop(0.15, 'rgba(255,200,120,0.7)')
  grd.addColorStop(0.5, 'rgba(200,100,255,0.3)')
  grd.addColorStop(1, 'rgba(100,50,200,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}
