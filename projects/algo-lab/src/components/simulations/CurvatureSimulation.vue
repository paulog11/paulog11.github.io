<template>
  <div style="width:100%;height:100%;position:relative;">
    <canvas ref="canvasEl" />

    <!-- Shape space inset canvas -->
    <canvas
      ref="shapeEl"
      v-show="params.showShape"
      class="shape-canvas"
    />

    <!-- Info badge -->
    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-curve);box-shadow:0 0 6px var(--accent-curve);" />
      {{ mode === 'ftl' ? 'Curvature Drive → Spacetime Wake → FTL Travel' : 'Curvature Wave → Geometric Phase → Propulsion' }}
    </div>

    <!-- Phase counter (geometric mode only) -->
    <div v-if="mode === 'geometric'" class="phase-counter" :style="{ color: 'var(--accent-curve)' }">
      PHASE ×{{ phaseCount }}
    </div>

    <!-- FTL HUD (FTL mode only) -->
    <div v-if="mode === 'ftl'" class="ftl-hud">
      <div class="ftl-row">
        <span class="ftl-label">v</span>
        <span class="ftl-value">{{ ftlSpeedText }}</span>
      </div>
      <div class="ftl-row">
        <span class="ftl-label">γ</span>
        <span class="ftl-value">{{ ftlGammaText }}</span>
      </div>
      <div class="ftl-inner-divider" />
      <div class="ftl-section-label">time elapsed</div>
      <div class="ftl-row">
        <span class="ftl-label">origin</span>
        <span class="ftl-value">{{ ftlExtTimeText }}</span>
      </div>
      <div class="ftl-row">
        <span class="ftl-label">ship</span>
        <span class="ftl-value ftl-value-ship">{{ ftlShipTimeText }}</span>
      </div>
      <div class="ftl-phase-badge" :class="'ftl-phase-' + ftlMission.phase">{{ ftlPhaseName }}</div>
    </div>

    <!-- Physics explanation panel -->
    <transition name="panel-slide">
      <div v-if="params.showPhysics" class="physics-panel">
        <!-- Geometric mode sections -->
        <template v-if="mode === 'geometric'">
          <div class="panel-section">
            <div class="panel-title">Curvature Drive</div>
            <p class="panel-body">
              In Liu Cixin's <em>Three-Body Problem</em>, curvature propulsion bends
              local spacetime — ships ride the curvature like a wave, reaching light
              speed with no reaction mass.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">The Real Physics</div>
            <p class="panel-body">
              The physical analog is <span class="hl">geometric phase locomotion</span>:
              a deformable body achieves net displacement through cyclic internal
              shape changes — zero external force, conserved angular momentum.
              The same principle explains how a cat flips mid-air and how
              microorganisms swim.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">How the Wave Propels</div>
            <p class="panel-body">
              A traveling curvature wave <span class="mono">κ(s,t) = A·sin(2πsλ/L − ωt)</span>
              runs along the spine. Each segment bends and straightens in sequence,
              pushing asymmetrically against the surrounding medium. These micro-pushes
              never fully cancel over a cycle — the body drifts forward even though
              momentum is conserved globally.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">Key Equation</div>
            <div class="equation">v ∝ A² · f · λ</div>
            <div class="eq-labels">
              <span>amplitude²</span>
              <span>frequency</span>
              <span>wavelengths</span>
            </div>
            <p class="panel-body" style="margin-top:8px;">
              Speed is <span class="hl">quadratic in amplitude</span> — doubling the
              wave height quadruples the speed. Frequency and wavelength scale linearly.
              Try the sliders to see this directly.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">The Shape Space Inset</div>
            <p class="panel-body">
              The <span class="hl">(w₁, w₂)</span> panel shows the body's curvature
              decomposed into two Fourier modes. Each wave cycle traces one closed
              loop. The <span class="hl">area enclosed by that loop</span> equals the
              net displacement per cycle — this is the geometric phase. A larger loop
              means more drift. No loop means no motion.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">Three-Body Context</div>
            <p class="panel-body">
              Enable <span class="hl">Gravity</span> to place three suns. The ship
              navigates their potential wells using only internal shape changes — no
              thruster plume, no propellant. The chaotic 3-body gravity field deflects
              the trajectory; curvature propulsion steers it back.
            </p>
          </div>
        </template>

        <!-- FTL mode sections -->
        <template v-if="mode === 'ftl'">
          <div class="panel-section">
            <div class="panel-title">FTL Travel</div>
            <p class="panel-body">
              In <em>Death's End</em>, curvature drive works by <span class="hl">flattening
              spacetime behind the ship</span>. The gradient between normal space ahead
              and the flattened wake propels the craft — no reaction mass, no propellant.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">Asymptotic Lightspeed</div>
            <p class="panel-body">
              The ship accelerates continuously toward — but never past — <span class="hl">c</span>.
              Stronger drive settings raise the cruise speed ceiling. Sliders tune
              drive strength: <span class="mono">drive = A² · f · λ</span>.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">Time Dilation</div>
            <div class="equation">γ = 1/√(1−v²/c²)</div>
            <p class="panel-body" style="margin-top:8px;">
              At cruise speed, the Lorentz factor γ shows how much slower ship-time
              passes vs. the outside universe. At 0.9c, γ ≈ 2.3 — every year aboard
              equals 2.3 years outside.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">The Permanent Wake</div>
            <p class="panel-body">
              The flattened spacetime region left behind is <span class="hl">permanent</span>.
              In the novel this wake (痕迹) reduces local lightspeed — any civilization
              caught inside goes dark. Every FTL journey leaves a visible scar.
              Toggle <span class="hl">Wake Trail</span> to reveal it.
            </p>
          </div>

          <div class="panel-divider" />

          <div class="panel-section">
            <div class="panel-heading">Relativistic Effects</div>
            <p class="panel-body">
              Near <span class="hl">c</span>, the spine's nose blue-shifts and the tail
              red-shifts — the classic Doppler signature of relativistic travel.
              The destination star's glow intensifies as you approach (headlight effect).
            </p>
          </div>
        </template>
      </div>
    </transition>

    <!-- Heading nav panel (FTL mode only, floating above controls bar) -->
    <div v-if="mode === 'ftl'" class="nav-panel">
      <button class="ctrl-btn nav-btn" @click="ftlSetDirection(0)" title="Snap heading toward Sol">← Sol</button>
      <div class="nav-arrows">
        <button class="ctrl-btn nav-btn" @click="ftlRotateHeading(-Math.PI / 12)" title="Rotate heading up 15°">↑</button>
        <button class="ctrl-btn nav-btn" @click="ftlRotateHeading(Math.PI / 12)" title="Rotate heading down 15°">↓</button>
      </div>
      <button class="ctrl-btn nav-btn" @click="ftlSetDirection(1)" title="Snap heading toward Trisolaris">Trisolaris →</button>
    </div>

    <!-- Controls -->
    <div class="controls-bar">
      <!-- Mode switch -->
      <button class="ctrl-btn" :class="{ active: mode === 'geometric' }" @click="switchMode('geometric')">Geometric</button>
      <button class="ctrl-btn" :class="{ active: mode === 'ftl' }" @click="switchMode('ftl')">FTL Travel</button>
      <div class="ctrl-divider" />

      <div class="slider-group">
        <span class="ctrl-label">{{ mode === 'ftl' ? 'Drive Power' : 'Amplitude' }}</span>
        <input type="range" v-model.number="params.amplitude" min="0.05" max="2.0" step="0.05"
          :style="sliderStyle" />
      </div>
      <div class="ctrl-divider" />
      <div class="slider-group">
        <span class="ctrl-label">Frequency</span>
        <input type="range" v-model.number="params.freq" min="0.2" max="3.0" step="0.05"
          :style="sliderStyle" />
      </div>
      <div class="ctrl-divider" />
      <div class="slider-group">
        <span class="ctrl-label">Wavelengths</span>
        <input type="range" v-model.number="params.wavelengths" min="0.5" max="3.0" step="0.1"
          :style="sliderStyle" />
      </div>
      <div class="ctrl-divider" />

      <!-- Gravity toggle (geometric) / Wake Trail + Engage (FTL) -->
      <template v-if="mode === 'geometric'">
        <button class="ctrl-btn" :class="{ active: params.gravity }" @click="params.gravity = !params.gravity">
          Gravity
        </button>
      </template>
      <template v-if="mode === 'ftl'">
        <button class="ctrl-btn" :class="{ active: params.showWake }" @click="params.showWake = !params.showWake">
          Wake Trail
        </button>
        <button class="ctrl-btn ftl-engage-btn" :class="{ active: ftlMission.phase !== 'idle' }" @click="ftlEngage">
          {{ ftlEngageLabel }}
        </button>
      </template>

      <button class="ctrl-btn" :class="{ active: params.showShape }" @click="params.showShape = !params.showShape">
        Shape Space
      </button>
      <button class="ctrl-btn" :class="{ active: params.showPhysics }" @click="params.showPhysics = !params.showPhysics">
        Physics
      </button>
      <div class="ctrl-divider" />
      <button class="ctrl-btn" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import {
  buildSpine,
  computeShapeModes,
  propulsionSpeed,
  gravityAccel,
  defaultSuns,
  BODY_LENGTH,
  // FTL helpers
  FTL_C_PX,
  ftlTargetSpeed,
  ftlAccelStep,
  ftlDecelStep,
  lorentzGamma,
  steerHeading,
  defaultStarPair,
} from './curvature/physics.js'

// ── Canvas refs ──────────────────────────────────────────────────────────────
const canvasEl = ref(null)
const shapeEl  = ref(null)
let ctx, shapeCtx, W, H, animId

// ── Mode ─────────────────────────────────────────────────────────────────────
const mode = ref('geometric')  // 'geometric' | 'ftl'

// ── Reactive params ──────────────────────────────────────────────────────────
const params = reactive({
  amplitude:   0.8,
  freq:        1.2,
  wavelengths: 1.5,
  gravity:     false,
  showShape:   true,
  showPhysics: true,
  showWake:    true,
})

const sliderStyle = computed(() => {
  return `background:rgba(79,255,176,0.35);`
})

// ── Simulation state ─────────────────────────────────────────────────────────
let state = null
let suns  = []
let stars = []  // FTL star pair
const phaseCount = ref(0)

// ── Starfield ─────────────────────────────────────────────────────────────────
let starfield = []   // [{x, y, r, alpha, bright}]
let nebulae   = []   // [{cx, cy, r, rgb}]

function generateStarfield() {
  starfield = []
  nebulae   = []
  const count = Math.round((W * H) / 3200)
  for (let i = 0; i < count; i++) {
    const roll = Math.random()
    const r    = roll < 0.72 ? Math.random() * 0.5 + 0.25   // tiny (0.25–0.75)
               : roll < 0.94 ? Math.random() * 0.7 + 0.75   // medium (0.75–1.45)
               :               Math.random() * 0.8 + 1.5     // bright (1.5–2.3)
    const alpha = r < 0.75  ? Math.random() * 0.35 + 0.15
                : r < 1.45  ? Math.random() * 0.40 + 0.35
                :             Math.random() * 0.30 + 0.65
    starfield.push({ x: Math.random() * W, y: Math.random() * H, r, alpha, bright: r > 1.5 })
  }
  // Subtle nebula clouds
  const nebDefs = [
    { fx: 0.20, fy: 0.30, fr: 0.22, rgb: '90,70,160'  },
    { fx: 0.70, fy: 0.65, fr: 0.26, rgb: '30,90,110'  },
    { fx: 0.85, fy: 0.20, fr: 0.16, rgb: '110,50,140' },
    { fx: 0.45, fy: 0.75, fr: 0.18, rgb: '40,80,130'  },
  ]
  for (const d of nebDefs) {
    nebulae.push({ cx: d.fx * W, cy: d.fy * H, r: d.fr * Math.min(W, H), rgb: d.rgb })
  }
}

// Geometric trail ring buffer
const TRAIL_MAX = 350
let trail = []

// FTL permanent wake (capped to protect perf)
const WAKE_MAX = 5000
let wakeTrail = []

// Shape-space history ring buffer
const SHAPE_MAX = 600
let shapeHistory = []

// ── FTL mission state ────────────────────────────────────────────────────────
const ftlMission = reactive({
  phase:      'idle',   // idle | engaging | accelerating | cruise
  chargeTime: 0,
  vFrac:      0,
  extTime:    0,   // coordinate time elapsed (star frame), seconds
  shipTime:   0,   // proper time elapsed (ship frame), seconds
})

const ftlPhaseName = computed(() => {
  const map = {
    idle:         'STANDBY',
    engaging:     'ENGAGING',
    accelerating: 'ACCELERATING',
    cruise:       'CRUISE',
  }
  return map[ftlMission.phase] || ftlMission.phase.toUpperCase()
})

const ftlSpeedText   = computed(() => `${ftlMission.vFrac.toFixed(3)}c`)
const ftlGammaText   = computed(() => lorentzGamma(ftlMission.vFrac).toFixed(2))
const ftlEngageLabel = computed(() => ftlMission.phase === 'idle' ? 'Engage' : 'Abort')

// Sol → Trisolaris = Alpha Centauri ≈ 4.22 ly. Stars are placed at x = W*0.13 and W*0.87,
// so their pixel separation = W*0.74. At c (FTL_C_PX px/s) that crossing takes
// W*0.74/FTL_C_PX sim-seconds = 4.22 story-years → scale = 4.22*FTL_C_PX / (W*0.74).
const STORY_DIST_LY = 4.22

function yearPerSimSec() {
  return W ? STORY_DIST_LY * FTL_C_PX / (W * 0.74) : 1
}

function fmtYears(y) {
  if (y < 0.01) return '0.00 yr'
  if (y < 10)   return `${y.toFixed(2)} yr`
  return `${y.toFixed(1)} yr`
}
const ftlExtTimeText  = computed(() => fmtYears(ftlMission.extTime))
const ftlShipTimeText = computed(() => fmtYears(ftlMission.shipTime))

// ── Mode switching ────────────────────────────────────────────────────────────
function switchMode(newMode) {
  mode.value = newMode
  reset()
}

// Snap heading toward a star without resetting the mission
function ftlSetDirection(idx) {
  if (!state || !stars[idx]) return
  const s = stars[idx]
  state.heading = Math.atan2(s.y - state.cy, s.x - state.cx)
}

// Rotate heading by delta radians (positive = clockwise / downward on canvas)
function ftlRotateHeading(delta) {
  if (!state) return
  state.heading += delta
}

function ftlEngage() {
  if (ftlMission.phase === 'idle') {
    ftlMission.phase = 'engaging'
    ftlMission.chargeTime = 0
  } else {
    // Abort → standby, keep position
    ftlMission.phase = 'idle'
    ftlMission.vFrac = 0
    state.vx = 0
    state.vy = 0
  }
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function reset() {
  if (mode.value === 'ftl') {
    stars = W ? defaultStarPair(W, H) : []
    const origin = stars[0] || { x: W * 0.13, y: H / 2 }
    state = {
      cx:        origin.x + 35,
      cy:        origin.y,
      heading:   0,   // start pointing right (toward Trisolaris)
      vx:        0,
      vy:        0,
      wavePhase: 0,
    }
    ftlMission.phase      = 'idle'
    ftlMission.chargeTime = 0
    ftlMission.vFrac      = 0
    ftlMission.extTime    = 0
    ftlMission.shipTime   = 0
    wakeTrail = []
  } else {
    state = {
      cx:       W ? W / 2 : 400,
      cy:       H ? H / 2 : 300,
      heading:  -Math.PI / 2,
      vx:       0,
      vy:       0,
      wavePhase: 0,
    }
    suns = W ? defaultSuns(W, H) : []
    trail = []
    phaseCount.value = 0
  }
  shapeHistory = []
}

// ── Draw: starfield ───────────────────────────────────────────────────────────
function drawStarfield() {
  // Nebula clouds
  for (const neb of nebulae) {
    const grad = ctx.createRadialGradient(neb.cx, neb.cy, 0, neb.cx, neb.cy, neb.r)
    grad.addColorStop(0,   `rgba(${neb.rgb},0.055)`)
    grad.addColorStop(0.5, `rgba(${neb.rgb},0.025)`)
    grad.addColorStop(1,   `rgba(${neb.rgb},0)`)
    ctx.beginPath()
    ctx.arc(neb.cx, neb.cy, neb.r, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
  }
  // Stars — bright ones get a glow halo
  ctx.save()
  for (const s of starfield) {
    if (s.bright) {
      ctx.shadowBlur  = 6
      ctx.shadowColor = `rgba(200,220,255,${s.alpha * 0.6})`
    } else {
      ctx.shadowBlur = 0
    }
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    // Slight blue-white tint for most stars, warm tint for a few
    const warm = (s.x * 31 + s.y * 17) % 10 < 2  // ~20% warm
    ctx.fillStyle = warm
      ? `rgba(255,230,200,${s.alpha})`
      : `rgba(210,225,255,${s.alpha})`
    ctx.fill()
  }
  ctx.restore()
}

// ── Resize ───────────────────────────────────────────────────────────────────
function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
  generateStarfield()
  if (state) {
    if (mode.value === 'ftl') {
      stars = defaultStarPair(W, H)
    } else {
      suns = defaultSuns(W, H)
    }
  }
}

// ── Draw: gravity field (geometric mode) ─────────────────────────────────────
function drawGravityField() {
  if (!params.gravity) return
  for (const sun of suns) {
    const maxR = Math.min(W, H) * 0.45
    const steps = 6
    for (let i = steps; i >= 1; i--) {
      const r = (i / steps) * maxR
      const alpha = 0.04 + (1 - i / steps) * 0.04
      const grad = ctx.createRadialGradient(sun.x, sun.y, r * 0.7, sun.x, sun.y, r)
      grad.addColorStop(0, `rgba(247,169,110,${alpha})`)
      grad.addColorStop(1, 'rgba(247,169,110,0)')
      ctx.beginPath()
      ctx.arc(sun.x, sun.y, r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }
    const glow = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, 28)
    glow.addColorStop(0, sun.color)
    glow.addColorStop(0.3, sun.color + 'aa')
    glow.addColorStop(1, 'transparent')
    ctx.beginPath()
    ctx.arc(sun.x, sun.y, 28, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()
    ctx.font = '10px "Space Mono", monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.textAlign = 'center'
    ctx.fillText(sun.label, sun.x, sun.y - 34)
  }
}

// ── Draw: star systems (FTL mode) ────────────────────────────────────────────
function drawStarSystems(vFrac) {
  for (const star of stars) {
    const isDest = star.role === 'destination'
    // Destination star grows brighter as ship approaches at relativistic speed
    const glowScale = isDest ? 1 + 1.5 * vFrac * vFrac : 1
    const coreR = 18 * (isDest ? 1 + 0.6 * vFrac : 1)
    const maxR  = 100 * glowScale

    // Outer glow rings
    for (let i = 4; i >= 1; i--) {
      const r = (i / 4) * maxR
      const alpha = 0.04 + (1 - i / 4) * 0.05
      const grad = ctx.createRadialGradient(star.x, star.y, r * 0.5, star.x, star.y, r)
      const hex = star.color
      grad.addColorStop(0, `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`)
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(star.x, star.y, r, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
    }

    // Core
    const core = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, coreR)
    core.addColorStop(0, '#ffffff')
    core.addColorStop(0.35, star.color)
    core.addColorStop(1, 'transparent')
    ctx.beginPath()
    ctx.arc(star.x, star.y, coreR, 0, Math.PI * 2)
    ctx.fillStyle = core
    ctx.fill()

    // Label
    ctx.font = '10px "Space Mono", monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.textAlign = 'center'
    ctx.fillText(star.label, star.x, star.y - 28)

    ctx.font = '8px "Space Mono", monospace'
    ctx.fillStyle = isDest ? 'rgba(122,180,247,0.55)' : 'rgba(247,201,122,0.55)'
    ctx.fillText(isDest ? 'DESTINATION' : 'ORIGIN', star.x, star.y + 32)
  }

  // Aberration streaks at high speed (destination star radiates forward streaks)
  if (vFrac > 0.5 && stars.length >= 1 && state) {
    // Pick the star most aligned with the ship's heading
    const heading = state.heading
    const destStar = stars.reduce((best, s) => {
      const a = Math.atan2(s.y - state.cy, s.x - state.cx)
      const b = Math.atan2(best.y - state.cy, best.x - state.cx)
      const da = Math.abs(((a - heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI)
      const db = Math.abs(((b - heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI)
      return da < db ? s : best
    }, stars[0])
    const streakAlpha = (vFrac - 0.5) * 0.6
    const streakLen = 40 + 120 * (vFrac - 0.5)
    ctx.save()
    ctx.globalAlpha = streakAlpha * 0.5
    for (let i = -2; i <= 2; i++) {
      const angle = heading + i * 0.12
      ctx.beginPath()
      ctx.moveTo(destStar.x, destStar.y)
      ctx.lineTo(destStar.x + Math.cos(angle) * streakLen, destStar.y + Math.sin(angle) * streakLen)
      ctx.strokeStyle = '#7ab4f7'
      ctx.lineWidth = i === 0 ? 1.5 : 0.7
      ctx.stroke()
    }
    ctx.restore()
  }
}

// ── Draw: geometric trail ────────────────────────────────────────────────────
function drawTrail() {
  if (trail.length < 2) return
  const accent = [79, 255, 176]
  for (let i = 1; i < trail.length; i++) {
    const t = i / trail.length
    const alpha = t * t * 0.55
    ctx.beginPath()
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
    ctx.lineTo(trail[i].x, trail[i].y)
    ctx.strokeStyle = `rgba(${accent[0]},${accent[1]},${accent[2]},${alpha})`
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}

// ── Draw: FTL permanent wake trail ───────────────────────────────────────────
function drawWakeTrail() {
  if (!params.showWake || wakeTrail.length < 2) return

  // Dark desaturated band — the lightspeed-reduction scar
  ctx.save()
  ctx.lineCap = 'round'
  for (let i = 1; i < wakeTrail.length; i++) {
    const p0 = wakeTrail[i - 1]
    const p1 = wakeTrail[i]
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.strokeStyle = 'rgba(10,20,14,0.5)'
    ctx.lineWidth = 7
    ctx.stroke()
  }
  // Teal centerline — the curvature trace
  for (let i = 1; i < wakeTrail.length; i++) {
    const p0 = wakeTrail[i - 1]
    const p1 = wakeTrail[i]
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.strokeStyle = 'rgba(79,255,176,0.1)'
    ctx.lineWidth = 1
    ctx.stroke()
  }
  ctx.restore()
}

// ── Draw: spacecraft spine ────────────────────────────────────────────────────
function drawSpine(spine, vFrac = 0) {
  if (spine.length < 2) return
  const N = spine.length
  const tintAmount = Math.max(0, (vFrac - 0.5) * 2)  // 0 at 0.5c, 1 at ~c

  ctx.save()
  ctx.shadowBlur = 18
  ctx.shadowColor = 'rgba(79,255,176,0.5)'

  for (let i = 1; i < N; i++) {
    const t = i / N  // 0→tail, 1→nose
    const width = 1.5 + 4.5 * Math.sin(t * Math.PI)

    const kappa = (spine[i].kappa + spine[i - 1].kappa) / 2
    const kappaAbs = Math.abs(kappa)
    const intensity = Math.min(1, kappaAbs / (params.amplitude * 1.2 + 0.01))
    let r = kappa >= 0 ? 79  : 32
    let g = kappa >= 0 ? 255 : 180
    let b = kappa >= 0 ? 176 : 140

    // Relativistic Doppler tint: blue at nose, red at tail
    if (tintAmount > 0) {
      const noseFactor = t * t * tintAmount
      const tailFactor = (1 - t) * (1 - t) * tintAmount
      r = Math.min(255, Math.max(0, r + Math.round(tailFactor * 70 - noseFactor * 30)))
      g = Math.min(255, Math.max(0, g - Math.round((tailFactor + noseFactor) * 60)))
      b = Math.min(255, Math.max(0, b + Math.round(noseFactor * 80 - tailFactor * 30)))
    }

    const alpha = 0.35 + 0.65 * intensity
    ctx.beginPath()
    ctx.moveTo(spine[i - 1].x, spine[i - 1].y)
    ctx.lineTo(spine[i].x, spine[i].y)
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.stroke()
  }
  ctx.restore()

  // Bright core overlay
  ctx.save()
  ctx.shadowBlur = 6
  ctx.shadowColor = '#4fffb0'
  for (let i = 1; i < N; i++) {
    const t = i / N
    const width = 0.8 + 1.5 * Math.sin(t * Math.PI)
    ctx.beginPath()
    ctx.moveTo(spine[i - 1].x, spine[i - 1].y)
    ctx.lineTo(spine[i].x, spine[i].y)
    ctx.strokeStyle = `rgba(79,255,176,0.9)`
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.stroke()
  }
  ctx.restore()

  // Nose indicator dot
  const nose = spine[N - 1]
  ctx.beginPath()
  ctx.arc(nose.x, nose.y, 3.5, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.shadowBlur = 8
  ctx.shadowColor = '#4fffb0'
  ctx.fill()
  ctx.shadowBlur = 0
}

// ── Draw: shape space inset ───────────────────────────────────────────────────
function drawShapeSpace() {
  if (!shapeCtx) return
  const SW = shapeEl.value.width  = shapeEl.value.offsetWidth
  const SH = shapeEl.value.height = shapeEl.value.offsetHeight
  shapeCtx.clearRect(0, 0, SW, SH)

  const cx = SW / 2, cy = SH / 2
  const scale = SW * 0.38

  shapeCtx.strokeStyle = 'rgba(255,255,255,0.08)'
  shapeCtx.lineWidth = 1
  shapeCtx.beginPath()
  shapeCtx.moveTo(8, cy); shapeCtx.lineTo(SW - 8, cy)
  shapeCtx.moveTo(cx, 8); shapeCtx.lineTo(cx, SH - 8)
  shapeCtx.stroke()

  shapeCtx.font = '7px "Space Mono", monospace'
  shapeCtx.fillStyle = 'rgba(255,255,255,0.2)'
  shapeCtx.textAlign = 'center'
  shapeCtx.fillText('w₁', SW - 10, cy - 4)
  shapeCtx.textAlign = 'left'
  shapeCtx.fillText('w₂', cx + 4, 14)

  shapeCtx.font = '7px "Space Mono", monospace'
  shapeCtx.fillStyle = 'rgba(79,255,176,0.5)'
  shapeCtx.textAlign = 'center'
  shapeCtx.fillText('SHAPE SPACE', SW / 2, SH - 6)

  if (shapeHistory.length < 2) return

  if (shapeHistory.length > 20) {
    shapeCtx.beginPath()
    const first = shapeHistory[0]
    shapeCtx.moveTo(cx + first.w1 * scale, cy - first.w2 * scale)
    for (let i = 1; i < shapeHistory.length; i++) {
      shapeCtx.lineTo(cx + shapeHistory[i].w1 * scale, cy - shapeHistory[i].w2 * scale)
    }
    shapeCtx.closePath()
    shapeCtx.fillStyle = 'rgba(79,255,176,0.06)'
    shapeCtx.fill()
  }

  for (let i = 1; i < shapeHistory.length; i++) {
    const t = i / shapeHistory.length
    shapeCtx.beginPath()
    shapeCtx.moveTo(cx + shapeHistory[i - 1].w1 * scale, cy - shapeHistory[i - 1].w2 * scale)
    shapeCtx.lineTo(cx + shapeHistory[i].w1 * scale,     cy - shapeHistory[i].w2 * scale)
    shapeCtx.strokeStyle = `rgba(79,255,176,${t * 0.7})`
    shapeCtx.lineWidth = 1.2
    shapeCtx.stroke()
  }

  const last = shapeHistory[shapeHistory.length - 1]
  const px = cx + last.w1 * scale
  const py = cy - last.w2 * scale
  shapeCtx.beginPath()
  shapeCtx.arc(px, py, 3.5, 0, Math.PI * 2)
  shapeCtx.fillStyle = '#4fffb0'
  shapeCtx.shadowBlur = 8
  shapeCtx.shadowColor = '#4fffb0'
  shapeCtx.fill()
  shapeCtx.shadowBlur = 0
}

// ── Physics update: geometric mode ───────────────────────────────────────────
function updateGeometric(dt) {
  const prevPhase = state.wavePhase
  state.wavePhase += 2 * Math.PI * params.freq * dt

  if (Math.floor(state.wavePhase / (2 * Math.PI)) > Math.floor(prevPhase / (2 * Math.PI))) {
    phaseCount.value++
  }

  const vProp = propulsionSpeed(params.amplitude, params.freq, params.wavelengths)
  state.vx += Math.cos(state.heading) * vProp * dt
  state.vy += Math.sin(state.heading) * vProp * dt

  if (params.gravity) {
    const { ax, ay } = gravityAccel(state.cx, state.cy, suns)
    state.vx += ax * dt
    state.vy += ay * dt
  }

  const drag = params.gravity ? 0.992 : 0.978
  state.vx *= drag
  state.vy *= drag

  state.cx += state.vx * dt
  state.cy += state.vy * dt

  const pad = BODY_LENGTH
  if (state.cx < -pad) { state.cx = W + pad; trail = [] }
  if (state.cx > W + pad) { state.cx = -pad;  trail = [] }
  if (state.cy < -pad) { state.cy = H + pad; trail = [] }
  if (state.cy > H + pad) { state.cy = -pad;  trail = [] }

  trail.push({ x: state.cx, y: state.cy })
  if (trail.length > TRAIL_MAX) trail.shift()
}

// ── Physics update: FTL mode ─────────────────────────────────────────────────
function updateFTL(dt) {
  state.wavePhase += 2 * Math.PI * params.freq * dt

  const ph = ftlMission.phase
  if (ph === 'idle' || ph === 'arrived') return

  // Warm-up: hold position, let spine animate
  if (ph === 'engaging') {
    ftlMission.chargeTime += dt
    if (ftlMission.chargeTime >= 1.5) ftlMission.phase = 'accelerating'
    return
  }

  const vTarget = ftlTargetSpeed(params.amplitude, params.freq, params.wavelengths)

  if (ph === 'accelerating') {
    ftlMission.vFrac = ftlAccelStep(ftlMission.vFrac, vTarget, params.amplitude, params.freq, params.wavelengths, dt)
    if (ftlMission.vFrac >= vTarget * 0.94) ftlMission.phase = 'cruise'
  }

  if (ph === 'cruise') {
    ftlMission.vFrac = ftlAccelStep(ftlMission.vFrac, vTarget, params.amplitude, params.freq, params.wavelengths, dt)
  }

  // Accumulate relativistic time in story-years (Sol–Trisolaris = 4.22 ly scale)
  const yps = yearPerSimSec()
  ftlMission.extTime  += dt * yps
  ftlMission.shipTime += dt * yps / lorentzGamma(ftlMission.vFrac)

  // Move ship in current heading direction
  const speed = ftlMission.vFrac * FTL_C_PX
  state.cx += Math.cos(state.heading) * speed * dt
  state.cy += Math.sin(state.heading) * speed * dt

  // Edge wrapping — ship reappears on the opposite side, trail breaks
  const pad = BODY_LENGTH
  if (state.cx < -pad)    { state.cx = W + pad; wakeTrail = [] }
  if (state.cx > W + pad) { state.cx = -pad;    wakeTrail = [] }
  if (state.cy < -pad)    { state.cy = H + pad; wakeTrail = [] }
  if (state.cy > H + pad) { state.cy = -pad;    wakeTrail = [] }

  // Accumulate permanent wake
  if (params.showWake) {
    wakeTrail.push({ x: state.cx, y: state.cy })
    if (wakeTrail.length > WAKE_MAX) wakeTrail.shift()
  }
}

// ── Main loop ─────────────────────────────────────────────────────────────────
let lastTime = null

function loop(ts) {
  animId = requestAnimationFrame(loop)
  if (!state) return

  const dt = lastTime ? Math.min((ts - lastTime) / 1000, 0.05) : 0.016
  lastTime = ts

  // Physics
  if (mode.value === 'ftl') {
    updateFTL(dt)
  } else {
    updateGeometric(dt)
  }

  // Build spine (shared between modes)
  const spine = buildSpine(
    state.cx, state.cy, state.heading,
    state.wavePhase, params.amplitude, params.wavelengths, 40
  )

  // Shape-space modes (shared)
  const modes = computeShapeModes(spine)
  shapeHistory.push(modes)
  if (shapeHistory.length > SHAPE_MAX) shapeHistory.shift()

  // Motion-blur fade (dims previous frame content so trails fade out)
  ctx.fillStyle = 'rgba(7,8,15,0.88)'
  ctx.fillRect(0, 0, W, H)

  // Starfield — drawn fresh every frame so stars stay bright despite the fade above
  drawStarfield()

  // Draw background / field
  if (mode.value === 'ftl') {
    drawStarSystems(ftlMission.vFrac)
    drawWakeTrail()
  } else {
    drawGravityField()
    drawTrail()
  }

  drawSpine(spine, mode.value === 'ftl' ? ftlMission.vFrac : 0)
  drawShapeSpace()
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  ctx      = canvasEl.value.getContext('2d')
  shapeCtx = shapeEl.value.getContext('2d')
  resize()
  reset()

  const ro = new ResizeObserver(() => { resize() })
  ro.observe(canvasEl.value.parentElement)

  animId = requestAnimationFrame(loop)

  canvasEl.value._ro = ro
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  if (canvasEl.value?._ro) canvasEl.value._ro.disconnect()
})
</script>

<style scoped>
.shape-canvas {
  position: absolute;
  top: 16px;
  right: 20px;
  width: 160px;
  height: 160px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(28, 34, 52, 0.80);
  backdrop-filter: blur(8px);
  pointer-events: none;
}

.phase-counter {
  position: absolute;
  top: 16px;
  left: 20px;
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: rgba(28, 34, 52, 0.72);
  backdrop-filter: blur(8px);
  pointer-events: none;
  user-select: none;
  opacity: 0.75;
}

/* ── FTL HUD ── */
.ftl-hud {
  position: absolute;
  top: 16px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(28, 34, 52, 0.78);
  backdrop-filter: blur(10px);
  pointer-events: none;
  user-select: none;
  min-width: 130px;
}

.ftl-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.ftl-label {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.3);
  min-width: 48px;
}

.ftl-value {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #4fffb0;
  letter-spacing: 0.06em;
}

.ftl-phase-badge {
  margin-top: 4px;
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(79, 255, 176, 0.55);
  padding-top: 4px;
  border-top: 1px solid rgba(79, 255, 176, 0.15);
}

.ftl-phase-cruise    { color: #4fffb0; }
.ftl-phase-arrived   { color: #7ab4f7; }
.ftl-phase-engaging  { color: rgba(247, 201, 122, 0.8); }

/* ── FTL HUD inner divider / section label ── */
.ftl-inner-divider {
  width: 100%;
  height: 1px;
  background: rgba(79, 255, 176, 0.12);
  margin: 4px 0 2px;
}

.ftl-section-label {
  font-family: 'Space Mono', monospace;
  font-size: 7px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.22);
  margin-bottom: 4px;
}

.ftl-value-ship {
  color: rgba(122, 200, 255, 0.85);
}

/* ── Nav panel (heading controls, floating above controls bar) ── */
.nav-panel {
  position: absolute;
  bottom: 72px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: rgba(28, 34, 52, 0.72);
  border: 1px solid var(--border);
  border-radius: 10px;
  backdrop-filter: blur(8px);
  z-index: 5;
}

.nav-arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-btn {
  font-size: 10px !important;
  padding: 4px 8px !important;
  min-height: unset !important;
  height: auto !important;
  line-height: 1.2 !important;
}

/* ── FTL engage button ── */
.ftl-engage-btn {
  color: rgba(79, 255, 176, 0.7) !important;
  border-color: rgba(79, 255, 176, 0.4) !important;
}
.ftl-engage-btn.active {
  color: #4fffb0 !important;
  border-color: #4fffb0 !important;
}

input[type=range] {
  background: rgba(79, 255, 176, 0.25) !important;
}
input[type=range]::-webkit-slider-thumb {
  background: #4fffb0 !important;
  box-shadow: 0 0 6px #4fffb0 !important;
}

.ctrl-btn.active {
  color: #4fffb0 !important;
  border-color: #4fffb0 !important;
}

/* ── Physics panel ── */
.physics-panel {
  position: absolute;
  top: 56px;
  left: 20px;
  width: 252px;
  max-height: calc(100% - 130px);
  overflow-y: auto;
  background: rgba(28, 34, 52, 0.85);
  border: 1px solid var(--border);
  border-radius: 14px;
  backdrop-filter: blur(16px);
  padding: 18px 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 10;
  scrollbar-width: none;
}
.physics-panel::-webkit-scrollbar { display: none; }

.panel-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #4fffb0;
  margin-bottom: 8px;
}

.panel-heading {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(79, 255, 176, 0.6);
  margin-bottom: 7px;
}

.panel-section {
  padding: 2px 0 12px;
}

.panel-body {
  font-family: 'Space Mono', monospace;
  font-size: 9.5px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.58);
  font-style: normal;
}
.panel-body em {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.panel-divider {
  width: 100%;
  height: 1px;
  background: var(--border);
  margin-bottom: 12px;
  flex-shrink: 0;
}

.hl {
  color: #4fffb0;
  opacity: 0.85;
}

.mono {
  font-family: 'Space Mono', monospace;
  font-size: 8.5px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.02em;
}

.equation {
  font-family: 'Space Mono', monospace;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #4fffb0;
  text-align: center;
  margin: 6px 0 4px;
}

.eq-labels {
  display: flex;
  justify-content: space-between;
  font-family: 'Space Mono', monospace;
  font-size: 7px;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  margin-bottom: 2px;
  padding: 0 2px;
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
