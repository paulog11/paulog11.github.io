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
      Curvature Wave → Geometric Phase → Propulsion
    </div>

    <!-- Phase counter -->
    <div class="phase-counter" :style="{ color: 'var(--accent-curve)' }">
      PHASE ×{{ phaseCount }}
    </div>

    <!-- Physics explanation panel -->
    <transition name="panel-slide">
      <div v-if="params.showPhysics" class="physics-panel">
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
      </div>
    </transition>

    <!-- Controls -->
    <div class="controls-bar">
      <div class="slider-group">
        <span class="ctrl-label">Amplitude</span>
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
      <button class="ctrl-btn" :class="{ active: params.gravity }" @click="params.gravity = !params.gravity">
        Gravity
      </button>
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
} from './curvature/physics.js'

// ── Canvas refs ──────────────────────────────────────────────────────────────
const canvasEl = ref(null)
const shapeEl  = ref(null)
let ctx, shapeCtx, W, H, animId

// ── Reactive params ──────────────────────────────────────────────────────────
const params = reactive({
  amplitude:  0.8,
  freq:       1.2,
  wavelengths: 1.5,
  gravity:    false,
  showShape:  true,
  showPhysics: true,
})

const sliderStyle = computed(() => {
  const c = 'rgba(79,255,176,0.35)'
  return `background:${c};`
})

// ── Simulation state ─────────────────────────────────────────────────────────
let state = null   // initialized in reset()
let suns  = []
const phaseCount = ref(0)
let lastPhase = 0  // track zero-crossings for phase cycle count

// Trail: ring buffer of {x,y} positions
const TRAIL_MAX = 350
let trail = []

// Shape-space history: ring buffer of {w1,w2}
const SHAPE_MAX = 600
let shapeHistory = []

function reset() {
  state = {
    cx:       W ? W / 2 : 400,
    cy:       H ? H / 2 : 300,
    heading:  -Math.PI / 2,  // pointing upward
    vx:       0,
    vy:       0,
    wavePhase: 0,
  }
  suns = W ? defaultSuns(W, H) : []
  trail = []
  shapeHistory = []
  phaseCount.value = 0
  lastPhase = 0
}

// ── Resize ───────────────────────────────────────────────────────────────────
function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
  // Re-place suns relative to new canvas size
  if (state) {
    suns = defaultSuns(W, H)
  }
}

// ── Draw gravity field contours ──────────────────────────────────────────────
function drawGravityField() {
  if (!params.gravity) return

  // Draw potential field as subtle concentric rings around each sun
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

    // Sun glow core
    const glow = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, 28)
    glow.addColorStop(0, sun.color)
    glow.addColorStop(0.3, sun.color + 'aa')
    glow.addColorStop(1, 'transparent')
    ctx.beginPath()
    ctx.arc(sun.x, sun.y, 28, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    // Sun label
    ctx.font = '10px "Space Mono", monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.textAlign = 'center'
    ctx.fillText(sun.label, sun.x, sun.y - 34)
  }
}

// ── Draw trail ───────────────────────────────────────────────────────────────
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

// ── Draw spacecraft spine ─────────────────────────────────────────────────────
function drawSpine(spine) {
  if (spine.length < 2) return
  const N = spine.length

  // Draw glow pass first (wide, low alpha)
  ctx.save()
  ctx.shadowBlur = 18
  ctx.shadowColor = 'rgba(79,255,176,0.5)'

  for (let i = 1; i < N; i++) {
    const t = i / N  // 0→tail, 1→nose
    const width = 1.5 + 4.5 * Math.sin(t * Math.PI)  // taper at ends

    const kappa = (spine[i].kappa + spine[i - 1].kappa) / 2
    const kappaAbs = Math.abs(kappa)
    // Color: teal for +κ, dark-teal for -κ, dim near 0
    const intensity = Math.min(1, kappaAbs / (params.amplitude * 1.2 + 0.01))
    const r = kappa >= 0 ? 79  : 32
    const g = kappa >= 0 ? 255 : 180
    const b = kappa >= 0 ? 176 : 140
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

// ── Draw shape space inset ────────────────────────────────────────────────────
function drawShapeSpace() {
  if (!shapeCtx) return
  const SW = shapeEl.value.width  = shapeEl.value.offsetWidth
  const SH = shapeEl.value.height = shapeEl.value.offsetHeight
  shapeCtx.clearRect(0, 0, SW, SH)

  const cx = SW / 2, cy = SH / 2
  const scale = SW * 0.38  // map w1/w2 ±1 → ±scale pixels

  // Axes
  shapeCtx.strokeStyle = 'rgba(255,255,255,0.08)'
  shapeCtx.lineWidth = 1
  shapeCtx.beginPath()
  shapeCtx.moveTo(8, cy); shapeCtx.lineTo(SW - 8, cy)
  shapeCtx.moveTo(cx, 8); shapeCtx.lineTo(cx, SH - 8)
  shapeCtx.stroke()

  // Axis labels
  shapeCtx.font = '7px "Space Mono", monospace'
  shapeCtx.fillStyle = 'rgba(255,255,255,0.2)'
  shapeCtx.textAlign = 'center'
  shapeCtx.fillText('w₁', SW - 10, cy - 4)
  shapeCtx.textAlign = 'left'
  shapeCtx.fillText('w₂', cx + 4, 14)

  // Title
  shapeCtx.font = '7px "Space Mono", monospace'
  shapeCtx.fillStyle = 'rgba(79,255,176,0.5)'
  shapeCtx.textAlign = 'center'
  shapeCtx.fillText('SHAPE SPACE', SW / 2, SH - 6)

  if (shapeHistory.length < 2) return

  // Shade enclosed area (approximate loop fill)
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

  // Fading trail
  for (let i = 1; i < shapeHistory.length; i++) {
    const t = i / shapeHistory.length
    const alpha = t * 0.7
    shapeCtx.beginPath()
    shapeCtx.moveTo(cx + shapeHistory[i - 1].w1 * scale, cy - shapeHistory[i - 1].w2 * scale)
    shapeCtx.lineTo(cx + shapeHistory[i].w1 * scale,     cy - shapeHistory[i].w2 * scale)
    shapeCtx.strokeStyle = `rgba(79,255,176,${alpha})`
    shapeCtx.lineWidth = 1.2
    shapeCtx.stroke()
  }

  // Current position dot
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

// ── Main loop ─────────────────────────────────────────────────────────────────
let lastTime = null

function loop(ts) {
  animId = requestAnimationFrame(loop)
  if (!state) return

  const dt = lastTime ? Math.min((ts - lastTime) / 1000, 0.05) : 0.016
  lastTime = ts

  // ── Physics update ─────────────────────────────────────────────────────────
  // Advance wave phase
  const prevPhase = state.wavePhase
  state.wavePhase += 2 * Math.PI * params.freq * dt

  // Count completed gait cycles (each 2π of phase = one cycle)
  if (Math.floor(state.wavePhase / (2 * Math.PI)) > Math.floor(prevPhase / (2 * Math.PI))) {
    phaseCount.value++
  }

  // Propulsion in body-frame heading direction (Taylor swimming)
  const vProp = propulsionSpeed(params.amplitude, params.freq, params.wavelengths)
  state.vx += Math.cos(state.heading) * vProp * dt
  state.vy += Math.sin(state.heading) * vProp * dt

  // Gravity
  if (params.gravity) {
    const { ax, ay } = gravityAccel(state.cx, state.cy, suns)
    state.vx += ax * dt
    state.vy += ay * dt
  }

  // Gentle drag to keep things legible
  const drag = params.gravity ? 0.992 : 0.978
  state.vx *= drag
  state.vy *= drag

  // Integrate position
  state.cx += state.vx * dt
  state.cy += state.vy * dt

  // Soft wrap at canvas edges (teleport with trail break)
  const pad = BODY_LENGTH
  if (state.cx < -pad) { state.cx = W + pad; trail = [] }
  if (state.cx > W + pad) { state.cx = -pad;  trail = [] }
  if (state.cy < -pad) { state.cy = H + pad; trail = [] }
  if (state.cy > H + pad) { state.cy = -pad;  trail = [] }

  // ── Build spine ────────────────────────────────────────────────────────────
  const spine = buildSpine(
    state.cx, state.cy, state.heading,
    state.wavePhase, params.amplitude, params.wavelengths, 40
  )

  // ── Trail ──────────────────────────────────────────────────────────────────
  trail.push({ x: state.cx, y: state.cy })
  if (trail.length > TRAIL_MAX) trail.shift()

  // ── Shape space ────────────────────────────────────────────────────────────
  const modes = computeShapeModes(spine)
  shapeHistory.push(modes)
  if (shapeHistory.length > SHAPE_MAX) shapeHistory.shift()

  // ── Draw ───────────────────────────────────────────────────────────────────
  // Clear with slight fade for motion blur effect
  ctx.fillStyle = 'rgba(7,8,15,0.88)'
  ctx.fillRect(0, 0, W, H)

  drawGravityField()
  drawTrail()
  drawSpine(spine)
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

  // Clean up on unmount via closure
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
  background: rgba(7, 8, 15, 0.75);
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
  background: rgba(7, 8, 15, 0.6);
  backdrop-filter: blur(8px);
  pointer-events: none;
  user-select: none;
  opacity: 0.75;
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
  background: rgba(7, 8, 15, 0.82);
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
  color: rgba(255, 255, 255, 0.45);
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

/* slide-in from left */
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
