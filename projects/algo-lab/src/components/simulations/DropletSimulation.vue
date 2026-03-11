<template>
  <div style="position:relative;width:100%;height:100%;">
    <canvas ref="canvasEl"></canvas>

    <!-- Atmospheric tint overlay -->
    <div class="drop-overlay" :style="{ background: currentEvent.overlayColor }"></div>

    <!-- Event narrative card -->
    <div class="drop-card">
      <div class="drop-phase">{{ currentEvent.phase }}</div>
      <div class="drop-name">{{ currentEvent.name }}</div>
      <div class="drop-desc">{{ currentEvent.desc }}</div>
      <div class="drop-progress">
        <div
          v-for="(ev, i) in DROPLET_EVENTS" :key="ev.key"
          class="drop-prog-dot"
          :class="{ done: i < eventIndex, active: i === eventIndex }"
        ></div>
      </div>
      <button class="drop-next-btn" @click="nextEvent">Next Phase →</button>
    </div>

    <!-- Status bar -->
    <div class="drop-status-bar">
      <div class="status-item">Ships remaining <span class="status-val">{{ shipsAlive }} / {{ totalShips }}</span></div>
      <div class="status-item">Droplet velocity <span class="status-val">{{ dropletVel }}</span></div>
      <div class="status-item">Fleet status <span class="status-val">{{ currentEvent.statusText }}</span></div>
    </div>

    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-droplet);box-shadow:0 0 6px var(--accent-droplet);"></span>
      Fleet formation view
    </div>

    <div class="controls-bar">
      <div class="slider-group">
        <span class="ctrl-label">Speed</span>
        <input type="range" v-model.number="params.speed" min="1" max="100">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Trail Length</span>
        <input type="range" v-model.number="params.trail" min="20" max="500">
      </div>
      <div class="ctrl-divider"></div>
      <button class="ctrl-btn" @click="nextEvent">Next Phase</button>
      <button class="ctrl-btn" @click="restartEvent">↺ Restart</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { hexToRgb } from '../../composables/useRK4.js'
import { DROPLET_EVENTS } from './droplet/events.js'
import { createFleet, computeSweepPath } from './droplet/fleet.js'

const ROWS = 20, COLS = 25

const canvasEl = ref(null)
let ctx, W, H, animId

const params     = reactive({ speed: 40, trail: 200 })
const eventIndex = ref(0)
const shipsAlive = ref(0)
const totalShips = ref(ROWS * COLS)
const dropletVel = ref('0 km/s')

const currentEvent = computed(() => DROPLET_EVENTS[eventIndex.value])

let fleet    = []
let droplet  = null
let sweepPath = []
let sweepIdx  = 0
let particles = []
let stars     = []
let simTime   = 0
let frameCount = 0

// Camera
let cam = { x: 0, y: 0, zoom: 1, tx: 0, ty: 0, tz: 1 }
let shake = { x: 0, y: 0, decay: 0 }

// ── STARS ────────────────────────────────────────────────
function genStars() {
  stars = Array.from({ length: 240 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.2,
    a: 0.1 + Math.random() * 0.5
  }))
}

// ── INIT EVENT ───────────────────────────────────────────
function initEvent(idx) {
  eventIndex.value = idx
  simTime = 0
  frameCount = 0
  particles = []
  shake = { x: 0, y: 0, decay: 0 }

  const cx = W / 2, cy = H / 2
  const ev = DROPLET_EVENTS[idx]
  const cfg = ev.setup(cx, cy, W, H)

  // Fleet
  if (idx === 4) {
    // aftermath: all ships dead
    fleet = createFleet(cx, cy, W, H, ROWS, COLS)
    fleet.forEach(s => { s.alive = false; s.deathTime = -100 })
  } else {
    fleet = createFleet(cx, cy, W, H, ROWS, COLS)
  }

  // Droplet
  if (cfg.droplet) {
    droplet = {
      x: cfg.droplet.x, y: cfg.droplet.y,
      vx: 0, vy: 0,
      speed: 0,
      trail: [],
      phase: cfg.droplet.phase
    }
  } else {
    droplet = null
  }

  // Sweep path for destruction phases
  if (idx === 2) {
    // firstStrike: target first few ships near the top-right
    sweepPath = computeSweepPath(fleet, ROWS, COLS).slice(0, 8)
    sweepIdx = 0
  } else if (idx === 3) {
    sweepPath = computeSweepPath(fleet, ROWS, COLS)
    sweepIdx = 0
  } else {
    sweepPath = []
    sweepIdx = 0
  }

  // Camera
  cam.tx = cx; cam.ty = cy; cam.tz = cfg.cameraZoom || 1
  cam.x = cam.tx; cam.y = cam.ty; cam.zoom = cam.tz

  updateShipCount()
}

function nextEvent()    { initEvent((eventIndex.value + 1) % DROPLET_EVENTS.length) }
function restartEvent() { initEvent(eventIndex.value) }

function updateShipCount() {
  shipsAlive.value = fleet.filter(s => s.alive).length
}

// ── PARTICLES ────────────────────────────────────────────
function spawnExplosion(x, y) {
  const count = 10 + Math.floor(Math.random() * 6)
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 0.5 + Math.random() * 3
    const isFlash = i < 3
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: isFlash ? 0.04 + Math.random() * 0.03 : 0.008 + Math.random() * 0.015,
      size: isFlash ? 2 + Math.random() * 2 : 1 + Math.random() * 1.5,
      color: isFlash ? [255, 255, 255] : (Math.random() > 0.5 ? [255, 160, 50] : [255, 80, 30])
    })
  }
  // Screen shake
  shake.x = (Math.random() - 0.5) * 6
  shake.y = (Math.random() - 0.5) * 6
  shake.decay = 1
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.98
    p.vy *= 0.98
    p.life -= p.decay
    if (p.life <= 0) { particles.splice(i, 1) }
  }
}

// ── DROPLET MOVEMENT ─────────────────────────────────────
function moveDroplet(dt) {
  if (!droplet) return

  const ev = currentEvent.value
  const speedMul = ev.dropletSpeed * (params.speed / 40)

  if (droplet.phase === 'approaching') {
    // Drift toward fleet center
    const cx = W / 2, cy = H / 2
    const dx = cx - droplet.x, dy = cy - droplet.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > 5) {
      const s = speedMul * 1.5
      droplet.vx = (dx / dist) * s
      droplet.vy = (dy / dist) * s
      droplet.x += droplet.vx
      droplet.y += droplet.vy
      droplet.speed = s
    }
  } else if (droplet.phase === 'attacking' && sweepPath.length > 0 && sweepIdx < sweepPath.length) {
    const target = fleet[sweepPath[sweepIdx]]
    if (!target) { sweepIdx++; return }

    const dx = target.x - droplet.x
    const dy = target.y - droplet.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Lookahead blending for smoother curves
    let dirX = dx / (dist || 1)
    let dirY = dy / (dist || 1)

    if (sweepIdx + 1 < sweepPath.length && dist < 60) {
      const next = fleet[sweepPath[sweepIdx + 1]]
      if (next) {
        const ndx = next.x - droplet.x, ndy = next.y - droplet.y
        const ndist = Math.sqrt(ndx * ndx + ndy * ndy)
        const blend = 1 - (dist / 60)
        dirX = dirX * (1 - blend * 0.3) + (ndx / (ndist || 1)) * blend * 0.3
        dirY = dirY * (1 - blend * 0.3) + (ndy / (ndist || 1)) * blend * 0.3
        const len = Math.sqrt(dirX * dirX + dirY * dirY)
        dirX /= len; dirY /= len
      }
    }

    const s = speedMul * 2
    droplet.vx = dirX * s
    droplet.vy = dirY * s
    droplet.x += droplet.vx
    droplet.y += droplet.vy
    droplet.speed = s

    // Kill radius
    if (dist < 8) {
      if (target.alive) {
        target.alive = false
        target.deathTime = frameCount
        spawnExplosion(target.x, target.y)
        updateShipCount()
      }
      sweepIdx++

      // Auto-advance to aftermath when all targets destroyed
      if (sweepIdx >= sweepPath.length && eventIndex.value === 3) {
        setTimeout(() => {
          if (eventIndex.value === 3) initEvent(4)
        }, 2000)
      }
    }

    // Camera follows droplet during attack
    cam.tx = droplet.x
    cam.ty = droplet.y
  } else if (droplet.phase === 'idle') {
    // Aftermath: slow drift away
    droplet.x += 0.3 * speedMul
    droplet.y -= 0.1 * speedMul
    droplet.vx = 0.3 * speedMul
    droplet.vy = -0.1 * speedMul
    droplet.speed = speedMul * 0.4
  }

  // Trail
  droplet.trail.push({ x: droplet.x, y: droplet.y })
  if (droplet.trail.length > params.trail) {
    droplet.trail.splice(0, droplet.trail.length - params.trail)
  }

  // Update velocity display
  const vel = Math.sqrt(droplet.vx * droplet.vx + droplet.vy * droplet.vy)
  dropletVel.value = (vel * 120).toFixed(0) + ' km/s'
}

// ── RENDER ───────────────────────────────────────────────
function drawStarfield(alpha) {
  ctx.save()
  for (const s of stars) {
    ctx.globalAlpha = alpha * s.a
    ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill()
  }
  ctx.restore()
}

function drawShip(s, camX, camY, camZ) {
  const sx = (s.x - camX) * camZ + W / 2
  const sy = (s.y - camY) * camZ + H / 2

  // Off screen culling
  if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) return

  const size = 3 * camZ

  if (s.alive) {
    // Chevron shape
    ctx.beginPath()
    ctx.moveTo(sx, sy - size)
    ctx.lineTo(sx - size * 0.7, sy + size * 0.5)
    ctx.lineTo(sx, sy)
    ctx.lineTo(sx + size * 0.7, sy + size * 0.5)
    ctx.closePath()
    ctx.fillStyle = 'rgba(120,170,220,0.55)'
    ctx.fill()

    // Tiny engine glow
    ctx.beginPath()
    ctx.arc(sx, sy + size * 0.3, size * 0.3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(100,160,255,0.3)'
    ctx.fill()
  } else if (s.deathTime >= 0 && frameCount - s.deathTime < 20) {
    // Death flash
    const t = (frameCount - s.deathTime) / 20
    const flashR = (1 - t) * 15 * camZ
    const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, flashR)
    grd.addColorStop(0, `rgba(255,200,100,${(1 - t) * 0.8})`)
    grd.addColorStop(1, `rgba(255,100,30,0)`)
    ctx.beginPath(); ctx.arc(sx, sy, flashR, 0, Math.PI * 2)
    ctx.fillStyle = grd; ctx.fill()
  }
}

function drawParticles(camX, camY, camZ) {
  for (const p of particles) {
    const sx = (p.x - camX) * camZ + W / 2
    const sy = (p.y - camY) * camZ + H / 2
    if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) continue
    ctx.globalAlpha = p.life
    ctx.fillStyle = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`
    ctx.beginPath(); ctx.arc(sx, sy, p.size * camZ, 0, Math.PI * 2); ctx.fill()
  }
  ctx.globalAlpha = 1
}

function drawTeardrop(x, y, angle, size) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  // Teardrop: pointed tip at front, rounded back
  ctx.beginPath()
  ctx.moveTo(size * 1.8, 0)
  ctx.bezierCurveTo(size * 0.5, -size * 0.7, -size * 0.9, -size * 0.9, -size, 0)
  ctx.bezierCurveTo(-size * 0.9, size * 0.9, size * 0.5, size * 0.7, size * 1.8, 0)
  ctx.closePath()

  // Mirror gradient
  const grad = ctx.createLinearGradient(-size, 0, size * 1.8, 0)
  grad.addColorStop(0, '#e0f8ff')
  grad.addColorStop(0.3, '#ffffff')
  grad.addColorStop(0.6, '#b0e8f8')
  grad.addColorStop(1, '#7af0f0')
  ctx.fillStyle = grad
  ctx.shadowColor = '#7af0f0'
  ctx.shadowBlur = size * 4
  ctx.fill()
  ctx.shadowBlur = 0

  // Specular highlight
  ctx.beginPath()
  ctx.ellipse(-size * 0.2, -size * 0.25, size * 0.3, size * 0.15, 0, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fill()

  ctx.restore()
}

function drawDroplet(camX, camY, camZ) {
  if (!droplet) return

  const sx = (droplet.x - camX) * camZ + W / 2
  const sy = (droplet.y - camY) * camZ + H / 2

  // Trail
  if (droplet.trail.length > 1) {
    const tl = droplet.trail.length
    ctx.lineCap = 'round'
    for (let i = 1; i < tl; i++) {
      const t0 = droplet.trail[i - 1], t1 = droplet.trail[i]
      const px0 = (t0.x - camX) * camZ + W / 2
      const py0 = (t0.y - camY) * camZ + H / 2
      const px1 = (t1.x - camX) * camZ + W / 2
      const py1 = (t1.y - camY) * camZ + H / 2
      const alpha = (i / tl) * 0.6
      ctx.beginPath()
      ctx.moveTo(px0, py0); ctx.lineTo(px1, py1)
      ctx.strokeStyle = `rgba(122,240,240,${alpha})`
      ctx.lineWidth = (i / tl) * 2.5 * camZ
      ctx.stroke()
    }
  }

  // Glow halo
  const glowSize = (6 + droplet.speed * 1.5) * camZ
  const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowSize)
  grd.addColorStop(0, 'rgba(122,240,240,0.4)')
  grd.addColorStop(0.4, 'rgba(122,240,240,0.1)')
  grd.addColorStop(1, 'rgba(122,240,240,0)')
  ctx.beginPath(); ctx.arc(sx, sy, glowSize, 0, Math.PI * 2)
  ctx.fillStyle = grd; ctx.fill()

  // Teardrop body
  const angle = Math.atan2(droplet.vy, droplet.vx)
  drawTeardrop(sx, sy, angle, 5 * camZ)
}

// ── MAIN LOOP ────────────────────────────────────────────
function loop() {
  animId = requestAnimationFrame(loop)
  const ev = currentEvent.value
  frameCount++

  // Background
  ctx.fillStyle = ev.skyTop; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = 'rgba(7,8,15,0.3)'; ctx.fillRect(0, 0, W, H)

  const starAlpha = ev.key === 'aftermath' ? 0.7 : ev.key === 'assembly' ? 0.4 : 0.15
  drawStarfield(starAlpha)

  // Update camera (smooth follow)
  cam.x += (cam.tx - cam.x) * 0.04
  cam.y += (cam.ty - cam.y) * 0.04
  cam.zoom += (cam.tz - cam.zoom) * 0.03

  // Shake decay
  if (shake.decay > 0) {
    shake.decay *= 0.88
    if (shake.decay < 0.01) { shake.x = 0; shake.y = 0; shake.decay = 0 }
  }

  const camX = cam.x + shake.x * shake.decay
  const camY = cam.y + shake.y * shake.decay
  const camZ = cam.zoom

  // Move droplet
  moveDroplet(0.016 * (params.speed / 40))

  // Update particles
  updateParticles()

  // Draw fleet
  for (const s of fleet) drawShip(s, camX, camY, camZ)

  // Draw particles
  drawParticles(camX, camY, camZ)

  // Draw droplet
  drawDroplet(camX, camY, camZ)
}

function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
  genStars()
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  initEvent(0)
  window.addEventListener('resize', () => { resize(); initEvent(eventIndex.value) })
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.drop-overlay {
  position: absolute; inset: 0;
  pointer-events: none;
  transition: background 2s ease;
  z-index: 2;
}

.drop-card {
  position: absolute; top: 24px; left: 24px;
  width: 280px;
  background: rgba(7,8,15,0.82);
  border: 1px solid rgba(122,240,240,0.2);
  border-radius: 12px;
  padding: 18px 20px;
  backdrop-filter: blur(12px);
  z-index: 10;
}
.drop-phase {
  font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent-droplet); margin-bottom: 8px; opacity: 0.7;
}
.drop-name {
  font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
  color: #fff; margin-bottom: 10px; line-height: 1.2;
}
.drop-desc {
  font-size: 9px; line-height: 1.7; color: rgba(255,255,255,0.45);
}
.drop-progress {
  display: flex; gap: 5px; margin-top: 14px;
}
.drop-prog-dot {
  flex: 1; height: 2px; border-radius: 2px;
  background: rgba(255,255,255,0.1);
  transition: background 0.4s;
}
.drop-prog-dot.done   { background: rgba(122,240,240,0.5); }
.drop-prog-dot.active { background: var(--accent-droplet); }
.drop-next-btn {
  margin-top: 14px; width: 100%;
  font-family: 'Space Mono', monospace; font-size: 8px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(122,240,240,0.6); background: rgba(122,240,240,0.06);
  border: 1px solid rgba(122,240,240,0.15); border-radius: 6px;
  padding: 8px; cursor: none; transition: all 0.15s; outline: none;
}
.drop-next-btn:hover { color: var(--accent-droplet); background: rgba(122,240,240,0.12); }

.drop-status-bar {
  position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 20px; align-items: center;
  background: rgba(7,8,15,0.7); border: 1px solid rgba(122,240,240,0.1);
  border-radius: 20px; padding: 8px 18px; backdrop-filter: blur(10px);
  z-index: 10; pointer-events: none; font-size: 8px;
  letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.status-item { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.status-val  { color: var(--accent-droplet); font-weight: 700; }

input[type=range] { background: rgba(122,240,240,0.2); }
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 12px; height: 12px;
  border-radius: 50%; background: var(--accent-droplet);
  box-shadow: 0 0 8px rgba(122,240,240,0.5); cursor: none;
}
</style>
