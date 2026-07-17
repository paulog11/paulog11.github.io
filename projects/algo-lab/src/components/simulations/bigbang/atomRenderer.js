/**
 * PixiJS renderer for the Atom view (early-universe epochs).
 * Renders the BBParticle array from the component — trails, glows, mass
 * labels, the bang flash — and adds three visual-only layers that match the
 * fidelity of the Celestial/Planetary views:
 *   1. a ~10K gravitating "matter field" that streams into and accretes onto
 *      the bound matter clumps (port of Celestial's wisp layer);
 *   2. richer per-type bodies — dark-matter dashed halos, photon streaks, and
 *      a warm fusion glow that ignites on heavy clumps;
 *   3. epoch events — a recombination/CMB shell at the BBN→Structure boundary
 *      and merge/annihilation sparks.
 * Plus the original epoch haze (~10K hot particles, a pure function of bbTime
 * so it stays correct after jumpToEpoch fast-forwards), and one outcome-gated
 * cue: no-chemistry tints matter cores gray/sterile in syncBodies. All of the
 * above is render-only — physics (including the other outcome-gated changes,
 * in BigBangSimulation.vue's bigBang()/physicsStep()) is untouched here.
 */
import { Container, Graphics, Particle, ParticleContainer, Sprite, Text, Texture } from 'pixi.js'
import { BB_OUTCOMES } from './constants.js'

const PARKED = -100000

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

const FIELD_COUNT = 10000
const FIELD_TINTS = [0x6496c8, 0x88a8d8, 0xb0b0e0]

const SPARK_COUNT = 120
const RING_REF_R = 32 // dashed-halo texture is baked at this radius

const DM_TINT = 0x8c64dc
const PHOTON_TINT = 0xfff0b4
const FUSION_TINT = 0xff9a50
const STERILE_TINT = 0x787878 // no-chemistry: matter core reads as dead/gray

// Recombination shell window — centred on the BBN→Structure boundary (0.25),
// where the real universe becomes transparent (last scattering / CMB)
const RECOMB_START = 0.20
const RECOMB_END = 0.34

// ── CLASSIFICATION & CALLOUTS ───────────────────────────
// Epoch boundaries for classifyParticle — mirror EPOCHS in constants.js
const EPOCH_HADRON = 0.025    // pre-hadron below this
const EPOCH_BBN = 0.10        // hadron/lepton epochs below this
const EPOCH_STRUCTURE = 0.25  // BBN window below this, else structure epoch

// ELI5 one-liners for callout line 2, keyed by particle type
const TYPE_ELI5 = {
  matter: 'clumps into atoms, stars, and planets',
  photon: 'pure light — flies on forever',
  dark: 'invisible scaffold, felt only through gravity',
}

const CALLOUT_KINDS = ['matter', 'photon', 'dark']
const CALLOUT_INTERVAL = 2 // seconds of animTime between re-picks

// Maps type + epoch + mass to the name shown on labels/callouts
function classifyParticle(p, bbTime) {
  if (p.type === 'photon') return 'photon — light'
  if (p.type === 'dark') return 'dark matter'
  if (!p.bound) return bbTime < EPOCH_HADRON ? 'quark' : 'free particle'
  if (bbTime < EPOCH_BBN) return 'proton/neutron'
  if (bbTime < EPOCH_STRUCTURE) return 'light nucleus (H/He)'
  return p.mass > 100 ? 'proto-star seed' : 'matter clump'
}

export function createAtomRenderer(stage) {
  const dotTex = stage.dotTex
  const hardDotTex = stage.hardDotTex
  const dashedRingTex = makeDashedRingTexture()
  const shellTex = makeShellTexture()

  // Bang flash — unzoomed, under the world (canvas drew it before the
  // zoom transform)
  const flashSprite = new Sprite(makeFlashTexture())
  flashSprite.anchor.set(0.5)
  flashSprite.visible = false

  const root = new Container()
  const hazePC = new ParticleContainer({ dynamicProperties: { position: true, color: true } })
  hazePC.blendMode = 'add'
  const fieldPC = new ParticleContainer({ dynamicProperties: { position: true } })
  fieldPC.blendMode = 'add'
  const trailG = new Graphics()
  const bodiesC = new Container()
  const sparkPC = new ParticleContainer({ dynamicProperties: { position: true, scale: true, color: true } })
  sparkPC.blendMode = 'add'
  const recombSprite = new Sprite(shellTex)
  recombSprite.anchor.set(0.5)
  recombSprite.blendMode = 'add'
  recombSprite.tint = 0xbfa8ff
  recombSprite.visible = false

  // Representative callouts — one leader-line Graphics (cleared/redrawn per
  // frame, like trailG) + one persistent two-line Text per kind
  const labelsC = new Container()
  const leaderG = new Graphics()
  const callouts = {}
  for (const kind of CALLOUT_KINDS) {
    const text = new Text({
      text: '',
      style: { fontFamily: '"Space Mono", monospace', fontSize: 7, fill: 0xe8e8e8 },
    })
    text.anchor.set(0, 1)
    text.alpha = 0.85
    text.visible = false
    callouts[kind] = { text, target: null, lastStr: '', lastColor: 0xe8e8e8 }
  }
  labelsC.addChild(leaderG, callouts.matter.text, callouts.photon.text, callouts.dark.text)

  root.addChild(hazePC, fieldPC, trailG, bodiesC, sparkPC, recombSprite, labelsC)

  const state = {
    views: new Map(), // BBParticle → view
    haze: null,
    field: null,
    sparks: null,
    frame: 0,
    animTime: 0, // cosmetic clock — only advances while running, so pause freezes
    calloutNextPick: 0, // animTime of the next scheduled callout re-pick
  }

  // Spark pool (lifetimes are short; 120 covers bursty merging)
  {
    const n = SPARK_COUNT
    const sparks = {
      n,
      life: new Float32Array(n),
      maxLife: new Float32Array(n),
      vx: new Float32Array(n), vy: new Float32Array(n),
      parts: new Array(n),
      next: 0,
    }
    for (let i = 0; i < n; i++) {
      const p = new Particle({
        texture: dotTex, x: PARKED, y: PARKED,
        scaleX: 0.06, scaleY: 0.06, anchorX: 0.5, anchorY: 0.5,
        tint: 0xffffff, alpha: 0,
      })
      sparks.parts[i] = p
      sparkPC.addParticle(p)
    }
    state.sparks = sparks
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

  // Recompute the haze + matter-field seeds — the haze velocity field mirrors
  // the bigBang() speed formula so the fireball expands with the H₀/Λ sliders.
  // Also clears stale body views so a reset/jump doesn't spark or leak.
  function seed(cv) {
    seedHaze(cv)
    seedField()
    for (const view of state.views.values()) view.root.destroy({ children: true })
    state.views.clear()
    for (const kind of CALLOUT_KINDS) callouts[kind].target = null
  }

  function seedHaze(cv) {
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
    state.frame++
    if (!paused) state.animTime += 0.016
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

    if (!paused && state.field) advanceField(particles, 0.016)
    // Hide the field under the bang flash, fade it in as structure forms
    fieldPC.alpha = Math.min(1, Math.max(0, (bbTime - 0.01) * 5))

    updateHaze(bbTime)
    drawTrails(particles)
    syncBodies(particles, bbTime, outcomeKey)
    updateCallouts(particles, bbTime, outcomeKey)
    if (!paused) advanceSparks(0.016)
    updateRecomb(bbTime)
    stage.updateOutcome(outcomeKey, bbTime, 'vignette')

    stage.render()
  }

  // ── EPOCH HAZE ──────────────────────────────────────────
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

  // ── GRAVITATING MATTER FIELD ────────────────────────────
  function seedField() {
    if (!state.field) {
      const n = FIELD_COUNT
      const field = {
        n,
        x: new Float32Array(n), y: new Float32Array(n),
        vx: new Float32Array(n), vy: new Float32Array(n),
        targets: new Array(n).fill(null),
        parts: new Array(n),
      }
      for (let i = 0; i < n; i++) {
        const scale = 0.04 + Math.random() * 0.06
        const p = new Particle({
          texture: dotTex, x: 0, y: 0,
          scaleX: scale, scaleY: scale, anchorX: 0.5, anchorY: 0.5,
          tint: FIELD_TINTS[(Math.random() * FIELD_TINTS.length) | 0],
          alpha: 0.03 + Math.random() * 0.04,
        })
        field.parts[i] = p
        fieldPC.addParticle(p)
      }
      state.field = field
    }
    const f = state.field
    for (let i = 0; i < f.n; i++) {
      f.x[i] = Math.random() * stage.W
      f.y[i] = Math.random() * stage.H
      const a = Math.random() * Math.PI * 2
      const s = 1 + Math.random() * 3
      f.vx[i] = Math.cos(a) * s
      f.vy[i] = Math.sin(a) * s
      f.targets[i] = null
      f.parts[i].x = f.x[i]
      f.parts[i].y = f.y[i]
    }
  }

  function respawnField(f, i) {
    const side = (Math.random() * 4) | 0
    if (side === 0) { f.x[i] = Math.random() * stage.W; f.y[i] = -10 }
    else if (side === 1) { f.x[i] = Math.random() * stage.W; f.y[i] = stage.H + 10 }
    else if (side === 2) { f.x[i] = -10; f.y[i] = Math.random() * stage.H }
    else { f.x[i] = stage.W + 10; f.y[i] = Math.random() * stage.H }
    const a = Math.atan2(stage.H / 2 - f.y[i], stage.W / 2 - f.x[i]) + (Math.random() - 0.5) * 1.2
    const s = 2 + Math.random() * 4
    f.vx[i] = Math.cos(a) * s
    f.vy[i] = Math.sin(a) * s
    f.targets[i] = null
  }

  function isFieldAttractor(p) {
    return p.alive && p.bound && p.type === 'matter'
  }

  function advanceField(particles, dt) {
    const f = state.field
    const attractors = particles.filter(isFieldAttractor)
    const stride = state.frame & 15

    for (let i = 0; i < f.n; i++) {
      // Strided nearest-attractor re-pick: 1/16 of the field per frame
      if ((i & 15) === stride && attractors.length) {
        let best = null, bd = Infinity
        for (const b of attractors) {
          const dx = b.x - f.x[i], dy = b.y - f.y[i]
          const d2 = dx * dx + dy * dy
          if (d2 < bd) { bd = d2; best = b }
        }
        f.targets[i] = best
      }
      const t = f.targets[i]
      if (t && isFieldAttractor(t)) {
        const dx = t.x - f.x[i], dy = t.y - f.y[i]
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01
        if (d < t.r * 1.5) {
          // Accreted — recycle at the edges so the field never piles up
          respawnField(f, i)
          f.parts[i].x = f.x[i]; f.parts[i].y = f.y[i]
          continue
        }
        const acc = 60 * t.mass / Math.max(d, 40)
        f.vx[i] += dx / d * acc * dt
        f.vy[i] += dy / d * acc * dt
      }
      // Gentle damping + speed cap keep streams orderly
      f.vx[i] *= 0.99; f.vy[i] *= 0.99
      const sp2 = f.vx[i] * f.vx[i] + f.vy[i] * f.vy[i]
      if (sp2 > 576) {
        const k = 24 / Math.sqrt(sp2)
        f.vx[i] *= k; f.vy[i] *= k
      }
      f.x[i] += f.vx[i] * dt
      f.y[i] += f.vy[i] * dt
      if (f.x[i] < -80 || f.x[i] > stage.W + 80 || f.y[i] < -80 || f.y[i] > stage.H + 80) {
        respawnField(f, i)
      }
      f.parts[i].x = f.x[i]
      f.parts[i].y = f.y[i]
    }
  }

  // ── TRAILS ──────────────────────────────────────────────
  function drawTrails(particles) {
    trailG.clear()
    for (const p of particles) {
      const t = p.trail
      if (!t || t.length < 2) continue
      const isPhoton = p.type === 'photon'
      const [r, g, b] = isPhoton ? [255, 240, 180] : p.baseColor
      const tint = (r << 16) | (g << 8) | b
      const tl = t.length
      // Photons read as fast, bright light streaks; matter as soft trails
      const wMul = isPhoton ? 2.4 : 1.5
      const aMul = isPhoton ? 0.55 : 0.35
      for (let i = 1; i < tl; i++) {
        trailG.moveTo(t[i - 1].x, t[i - 1].y).lineTo(t[i].x, t[i].y)
          .stroke({ width: Math.max(0.5, (i / tl) * wMul), color: tint, alpha: (i / tl) * aMul })
      }
    }
  }

  // ── BODY VIEWS ──────────────────────────────────────────
  function syncBodies(particles, bbTime, outcomeKey) {
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
      view.lastX = p.x; view.lastY = p.y
      const glowR = p.bound ? Math.cbrt(p.mass) * 3.5 : p.r
      view.root.position.set(p.x, p.y)

      if (p.type === 'dark') {
        view.glow.width = view.glow.height = glowR * 3.5 * 2
        const ringR = glowR * 1.6
        view.ring.scale.set(ringR / RING_REF_R)
        view.ring.rotation = state.animTime * 0.5
        view.core.width = view.core.height = Math.max(1.2, glowR * 0.6) * 2
      } else if (p.type === 'photon') {
        // Orient + stretch the glow into a streak along the velocity
        const ang = Math.atan2(p.vy, p.vx)
        const len = Math.max(8, glowR * 6)
        const thick = Math.max(2, glowR * 1.5)
        view.glow.rotation = ang
        view.glow.width = len
        view.glow.height = thick
        view.core.width = view.core.height = Math.max(1.5, glowR) * 2
      } else {
        // matter
        view.glow.width = view.glow.height = glowR * 3.5 * 2
        view.core.width = view.core.height = Math.max(1.5, glowR) * 2
        // No-chemistry: sterile universe — matter cores read as dead/gray,
        // reverts to normal tint the moment the outcome changes back
        if (outcomeKey === 'no-chemistry') {
          view.core.tint = STERILE_TINT
        } else {
          const [cr, cg, cb] = p.baseColor
          view.core.tint = (cr << 16) | (cg << 8) | cb
        }
        // Fusion glow ignites on heavy bound clumps — created lazily
        if (p.bound && p.mass > 30) {
          if (!view.fusion) {
            view.fusion = new Sprite({ texture: dotTex, anchor: 0.5 })
            view.fusion.blendMode = 'add'
            view.fusion.tint = FUSION_TINT
            view.root.addChildAt(view.fusion, 0)
          }
          view.fusion.visible = true
          view.fusion.alpha = Math.min(0.5, Math.max(0, (p.mass - 30) / 120))
          view.fusion.width = view.fusion.height = glowR * 2 * 2
        } else if (view.fusion) {
          view.fusion.visible = false
        }
      }

      // Mass label for heavy bound clumps — created lazily, text updated only
      // when the rounded mass or classification name changes
      if (p.bound && p.mass > 15) {
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
        const name = classifyParticle(p, bbTime)
        if (view.lastMass !== m || view.lastLabelName !== name) {
          view.label.text = `${name.toUpperCase()} · ${m} mass`
          view.lastMass = m
          view.lastLabelName = name
        }
        view.label.position.set(0, -glowR - 5)
        view.label.visible = true
      } else if (view.label) {
        view.label.visible = false
      }
    }
    for (const [particle, view] of state.views) {
      if (!view.seen) {
        // Merge / annihilation spark — only for on-screen non-photon deaths
        // (photons die far off-screen at the cull margin; exclude them)
        if (view.lastType !== 'photon' &&
            view.lastX > -20 && view.lastX < stage.W + 20 &&
            view.lastY > -20 && view.lastY < stage.H + 20) {
          const [r, g, b] = particle.baseColor
          spawnSparks(view.lastX, view.lastY, (r << 16) | (g << 8) | b)
        }
        view.root.destroy({ children: true })
        state.views.delete(particle)
      }
    }
  }

  function buildParticleView(p) {
    const [r, g, b] = p.baseColor
    const tint = (r << 16) | (g << 8) | b
    const root = new Container()
    const view = { root, type: p.type, lastType: p.type, label: null, lastMass: 0, lastLabelName: '', seen: true, lastX: p.x, lastY: p.y }

    if (p.type === 'dark') {
      // Invisible scaffold — diffuse glow + dashed halo + faint core
      const glow = new Sprite({ texture: dotTex, anchor: 0.5 })
      glow.blendMode = 'add'
      glow.tint = DM_TINT
      glow.alpha = 0.05
      const ring = new Sprite({ texture: dashedRingTex, anchor: 0.5 })
      ring.tint = DM_TINT
      ring.alpha = 0.10
      const core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
      core.tint = tint
      core.alpha = 0.3
      root.addChild(glow, ring, core)
      view.glow = glow; view.ring = ring; view.core = core
    } else {
      const isPhoton = p.type === 'photon'
      const glow = new Sprite({ texture: dotTex, anchor: 0.5 })
      glow.blendMode = 'add'
      glow.tint = isPhoton ? PHOTON_TINT : tint
      glow.alpha = isPhoton ? 0.5 : 0.45
      const core = new Sprite({ texture: hardDotTex, anchor: 0.5 })
      core.tint = isPhoton ? PHOTON_TINT : tint
      core.alpha = 0.95
      root.addChild(glow, core)
      view.glow = glow; view.core = core; view.fusion = null
    }
    return view
  }

  // ── CALLOUTS ────────────────────────────────────────────
  function isOnScreen(p) {
    return p.x > -20 && p.x < stage.W + 20 && p.y > -20 && p.y < stage.H + 20
  }

  function pickCalloutTarget(particles, kind) {
    if (kind === 'matter') {
      // Heaviest on-screen bound matter clump
      let best = null, bestMass = -Infinity
      for (const p of particles) {
        if (p.alive && p.type === 'matter' && p.bound && isOnScreen(p) && p.mass > bestMass) {
          best = p; bestMass = p.mass
        }
      }
      return best
    }
    for (const p of particles) {
      if (p.alive && p.type === kind && isOnScreen(p)) return p
    }
    return null
  }

  // Re-picks targets every ~2s of animTime (frozen while paused) or immediately
  // when a target dies / its view disappears (covers jumpToEpoch resets, since
  // seed() clears state.views before the fast-forwarded particles ever render).
  function updateCallouts(particles, bbTime, outcomeKey) {
    const due = state.animTime >= state.calloutNextPick
    for (const kind of CALLOUT_KINDS) {
      const c = callouts[kind]
      if (c.target && (!c.target.alive || !state.views.has(c.target))) c.target = null
      if (due || !c.target) c.target = pickCalloutTarget(particles, kind)
    }
    if (due) state.calloutNextPick = state.animTime + CALLOUT_INTERVAL

    leaderG.clear()
    for (const kind of CALLOUT_KINDS) renderCallout(callouts[kind], kind, bbTime, outcomeKey)
  }

  function renderCallout(c, kind, bbTime, outcomeKey) {
    const p = c.target
    if (!p || !isOnScreen(p)) { c.text.visible = false; return }

    const name = classifyParticle(p, bbTime)
    let line2 = TYPE_ELI5[p.type]
    let color = kind === 'photon' ? PHOTON_TINT
      : kind === 'dark' ? DM_TINT
      : `rgb(${p.baseColor[0]},${p.baseColor[1]},${p.baseColor[2]})`

    // Matter callout appends the outcome's atomTag, in the outcome color,
    // whenever the tuned constants broke the universe
    if (kind === 'matter' && outcomeKey !== 'life-permitting') {
      const outcome = BB_OUTCOMES[outcomeKey]
      if (outcome && outcome.atomTag) {
        line2 += ` — ${outcome.atomTag}`
        color = outcome.color
      }
    }

    const str = `${name.toUpperCase()}\n${line2}`
    if (c.lastStr !== str) { c.text.text = str; c.lastStr = str }
    if (c.lastColor !== color) { c.text.style.fill = color; c.lastColor = color }

    const ox = 16, oy = -22
    c.text.position.set(p.x + ox, p.y + oy)
    c.text.visible = true
    leaderG.moveTo(p.x, p.y).lineTo(p.x + ox, p.y + oy)
      .stroke({ width: 1, color, alpha: 0.35 })
  }

  // ── SPARKS ──────────────────────────────────────────────
  function spawnSparks(x, y, tint) {
    const s = state.sparks
    const count = 4 + ((Math.random() * 3) | 0)
    for (let k = 0; k < count; k++) {
      const idx = s.next
      s.next = (s.next + 1) % s.n
      const a = Math.random() * Math.PI * 2
      const sp = 30 + Math.random() * 60
      s.vx[idx] = Math.cos(a) * sp
      s.vy[idx] = Math.sin(a) * sp
      s.life[idx] = s.maxLife[idx] = 0.3 + Math.random() * 0.2
      const p = s.parts[idx]
      p.x = x; p.y = y
      p.tint = tint
      p.alpha = 0.9
      const sc = 0.05 + Math.random() * 0.05
      p.scaleX = p.scaleY = sc
    }
  }

  function advanceSparks(dt) {
    const s = state.sparks
    for (let i = 0; i < s.n; i++) {
      if (s.life[i] <= 0) continue
      s.life[i] -= dt
      const p = s.parts[i]
      if (s.life[i] <= 0) {
        p.x = PARKED; p.y = PARKED; p.alpha = 0
        continue
      }
      p.x += s.vx[i] * dt
      p.y += s.vy[i] * dt
      s.vx[i] *= 0.92; s.vy[i] *= 0.92
      p.alpha = (s.life[i] / s.maxLife[i]) * 0.9
    }
  }

  // ── RECOMBINATION SHELL ─────────────────────────────────
  function updateRecomb(bbTime) {
    if (bbTime < RECOMB_START || bbTime > RECOMB_END) {
      recombSprite.visible = false
      return
    }
    const phase = (bbTime - RECOMB_START) / (RECOMB_END - RECOMB_START)
    recombSprite.visible = true
    recombSprite.position.set(stage.W / 2, stage.H / 2)
    const radius = phase * Math.max(stage.W, stage.H) * 0.8
    recombSprite.width = recombSprite.height = Math.max(1, radius * 2)
    recombSprite.alpha = Math.sin(phase * Math.PI) * 0.3
  }

  function destroy() {
    detach()
    root.destroy({ children: true })
    flashSprite.destroy()
  }

  return { seed, update, attach, detach, destroy }
}

// ── TEXTURES ──────────────────────────────────────────────

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

// Dashed circle baked once for dark-matter halos (port of celestial's)
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

// Thin crisp ring for the expanding recombination shell — a transparent
// interior with a narrow bright band near the edge, so it reads as a
// shockwave outline rather than a filled disc
function makeShellTexture() {
  const S = 128
  const c = document.createElement('canvas')
  c.width = c.height = S
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  grd.addColorStop(0, 'rgba(255,255,255,0)')
  grd.addColorStop(0.80, 'rgba(255,255,255,0)')
  grd.addColorStop(0.88, 'rgba(255,255,255,1)')
  grd.addColorStop(0.96, 'rgba(255,255,255,0)')
  grd.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, S, S)
  return Texture.from(c)
}
