<template>
  <div style="position:relative;width:100%;height:100%;">
    <canvas ref="canvasEl"></canvas>

    <!-- Atmospheric tint overlay -->
    <div class="tri-overlay" :style="{ background: currentEvent.overlayColor }"></div>

    <!-- Event narrative card -->
    <div class="tri-card">
      <div class="tri-era">{{ currentEvent.era }}</div>
      <div class="tri-name">{{ currentEvent.name }}</div>
      <div class="tri-desc">{{ currentEvent.desc }}</div>
      <div class="tri-progress">
        <div
          v-for="(ev, i) in TRI_EVENTS" :key="ev.key"
          class="tri-prog-dot"
          :class="{ done: i < eventIndex, active: i === eventIndex }"
        ></div>
      </div>
      <button class="tri-next-btn" @click="nextEvent">Next Event →</button>
    </div>

    <!-- Status bar -->
    <div class="tri-status-bar">
      <div class="status-item">Suns visible <span class="status-val">{{ status.sunCount }} / 3</span></div>
      <div class="status-item">Surface temp <span class="status-val">{{ status.temp }}</span></div>
      <div class="status-item">Era stability <span class="status-val">{{ currentEvent.stabilityText }}</span></div>
    </div>

    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-tri);box-shadow:0 0 6px var(--accent-tri);"></span>
      Planet-centric view
    </div>

    <div class="controls-bar">
      <div class="slider-group">
        <span class="ctrl-label">Time Scale</span>
        <input type="range" v-model.number="params.speed" min="1" max="100">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Trail Length</span>
        <input type="range" v-model.number="params.trail" min="20" max="500">
      </div>
      <div class="ctrl-divider"></div>
      <button class="ctrl-btn" @click="nextEvent">Next Event</button>
      <button class="ctrl-btn" @click="restartEvent">↺ Restart</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { rk4Step, hexToRgb } from '../../composables/useRK4.js'
import { TRI_EVENTS } from './trisolaris/events.js'

const canvasEl = ref(null)
let ctx, W, H, animId

const params    = reactive({ speed: 40, trail: 200 })
const eventIndex = ref(0)
const triTime    = ref(0)
const status     = reactive({ sunCount: '—', temp: '—' })

const currentEvent = computed(() => TRI_EVENTS[eventIndex.value])

let suns   = []
let planet = null
let stars  = []
let statusTimer = 0

// ── STARS ───────────────────────────────────────────────────
function genStars() {
  stars = Array.from({ length: 220 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.2,
    a: 0.1 + Math.random() * 0.5
  }))
}

// ── INIT EVENT ──────────────────────────────────────────────
function initEvent(idx) {
  eventIndex.value = idx
  triTime.value    = 0
  const ev  = TRI_EVENTS[idx]
  const sc  = Math.min(W, H) * 0.28
  const cfg = ev.setup(W/2, H/2, sc)
  suns   = cfg.suns.map(s => ({ ...s, trail: [] }))
  planet = { ...cfg.planet, trail: [] }
}

function nextEvent()    { initEvent((eventIndex.value + 1) % TRI_EVENTS.length) }
function restartEvent() { initEvent(eventIndex.value) }

// ── STATUS ──────────────────────────────────────────────────
function updateStatus() {
  if (!planet) return
  let vis = 0
  for (const s of suns) {
    const dx = s.x - planet.x, dy = s.y - planet.y
    if (Math.sqrt(dx*dx+dy*dy) < W * 0.9) vis++
  }
  const ev     = currentEvent.value
  const noise  = (Math.sin(triTime.value * 0.3)*0.5+0.5) * ev.tempVar
  const temp   = Math.round(ev.tempBase + noise)
  status.sunCount = vis
  status.temp     = temp > 0 ? `+${temp}°C` : `${temp}°C`
}

// ── PHYSICS ─────────────────────────────────────────────────
function step(dt) {
  const all = [...suns, planet]
  rk4Step(all, 1800, 30, dt, params.trail)
  triTime.value += dt
}

// ── RENDER ──────────────────────────────────────────────────
function drawStarfield(alpha) {
  ctx.save(); ctx.globalAlpha = alpha
  for (const s of stars) {
    ctx.globalAlpha = alpha * s.a
    ctx.fillStyle = '#fff'
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill()
  }
  ctx.restore()
}

function drawBody(b, isSun, label) {
  const r     = isSun ? Math.cbrt(b.mass) * 4.2 : 5
  const color = b.color || '#5af'
  const {r:cr,g:cg,b:cb} = hexToRgb(color)

  if (b.trail.length > 1) {
    const tl = b.trail.length
    for (let i = 1; i < tl; i++) {
      ctx.beginPath()
      ctx.moveTo(b.trail[i-1].x, b.trail[i-1].y)
      ctx.lineTo(b.trail[i].x,   b.trail[i].y)
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(i/tl)*(isSun?0.45:0.6)})`
      ctx.lineWidth   = (i/tl) * (isSun ? 2.0 : 1.2)
      ctx.stroke()
    }
  }

  if (isSun) {
    const grd = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,r*5)
    grd.addColorStop(0,   `rgba(${cr},${cg},${cb},0.5)`)
    grd.addColorStop(0.3, `rgba(${cr},${cg},${cb},0.15)`)
    grd.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`)
    ctx.beginPath(); ctx.arc(b.x,b.y,r*5,0,Math.PI*2)
    ctx.fillStyle = grd; ctx.fill()
  }

  ctx.beginPath(); ctx.arc(b.x,b.y,r,0,Math.PI*2)
  ctx.fillStyle   = color
  ctx.shadowColor = color; ctx.shadowBlur = isSun ? r*3 : 10
  ctx.fill(); ctx.shadowBlur = 0

  if (isSun && label) {
    ctx.font      = '700 9px "Space Mono",monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.textAlign = 'center'
    ctx.fillText(label, b.x, b.y - r - 6)
  }
}

function drawPlanet(p) {
  const r = 7
  const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*4)
  grd.addColorStop(0, 'rgba(80,160,255,0.5)')
  grd.addColorStop(1, 'rgba(20,60,160,0)')
  ctx.beginPath(); ctx.arc(p.x,p.y,r*4,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill()

  ctx.beginPath(); ctx.arc(p.x,p.y,r+3,0,Math.PI*2)
  ctx.strokeStyle='rgba(100,180,255,0.25)'; ctx.lineWidth=2.5; ctx.stroke()

  const pg = ctx.createRadialGradient(p.x-2,p.y-2,1,p.x,p.y,r)
  pg.addColorStop(0,'#6ab4ff'); pg.addColorStop(0.5,'#2a72c8'); pg.addColorStop(1,'#0d2a5a')
  ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2)
  ctx.fillStyle=pg; ctx.shadowColor='#4090ff'; ctx.shadowBlur=12; ctx.fill(); ctx.shadowBlur=0

  ctx.font='700 9px "Space Mono",monospace'
  ctx.fillStyle='rgba(100,180,255,0.5)'; ctx.textAlign='center'
  ctx.fillText('TRISOLARIS', p.x, p.y - r - 7)
}

function drawSunlightOnPlanet(p) {
  for (const s of suns) {
    const dx = s.x-p.x, dy = s.y-p.y
    const dist = Math.sqrt(dx*dx+dy*dy)
    if (dist < 2) continue
    const intensity = Math.min(1, 3000/(dist*dist*0.01+300))
    if (intensity < 0.01) continue
    const {r,g,b} = hexToRgb(s.color)
    const nx = dx/dist, ny = dy/dist
    const grd = ctx.createRadialGradient(p.x+nx*6,p.y+ny*6,0,p.x,p.y,14)
    grd.addColorStop(0, `rgba(${r},${g},${b},${intensity*0.5})`)
    grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.beginPath(); ctx.arc(p.x,p.y,14,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill()
  }
}

function checkSyzygy() {
  if (suns.length < 3) return false
  const [a,b,c] = suns
  return Math.abs((b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x)) < Math.max(W,H)**2 * 0.012
}

function loop() {
  animId = requestAnimationFrame(loop)
  const ev  = currentEvent.value
  const dt  = 0.016 * (params.speed/100) * 5

  ctx.fillStyle = ev.skyTop; ctx.fillRect(0,0,W,H)
  ctx.fillStyle = 'rgba(7,8,15,0.28)'; ctx.fillRect(0,0,W,H)

  const starAlpha = ev.key==='flyingStars' ? 0.9 : ev.key==='stable' ? 0.3 : 0.1
  drawStarfield(starAlpha)

  if (ev.key === 'syzygy' && checkSyzygy()) {
    const pulse = 0.15 + 0.12*Math.sin(triTime.value*4)
    ctx.save(); ctx.strokeStyle=`rgba(255,220,100,${pulse})`; ctx.lineWidth=3
    ctx.setLineDash([8,12]); ctx.beginPath(); ctx.moveTo(suns[0].x,suns[0].y)
    for (let i=1;i<suns.length;i++) ctx.lineTo(suns[i].x,suns[i].y)
    ctx.stroke(); ctx.setLineDash([]); ctx.restore()
  }

  for (let s = 0; s < 6; s++) step(dt/6)

  if (planet) drawSunlightOnPlanet(planet)
  suns.forEach(s => drawBody(s, true, s.name))
  if (planet) drawPlanet(planet)

  statusTimer++
  if (statusTimer % 10 === 0) updateStatus()
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
.tri-overlay {
  position: absolute; inset: 0;
  pointer-events: none;
  transition: background 2s ease;
  z-index: 2;
}

.tri-card {
  position: absolute; top: 24px; left: 24px;
  width: 280px;
  background: rgba(7,8,15,0.82);
  border: 1px solid rgba(232,200,122,0.2);
  border-radius: 12px;
  padding: 18px 20px;
  backdrop-filter: blur(12px);
  z-index: 10;
}
.tri-era {
  font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent-tri); margin-bottom: 8px; opacity: 0.7;
}
.tri-name {
  font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
  color: #fff; margin-bottom: 10px; line-height: 1.2;
}
.tri-desc {
  font-size: 9px; line-height: 1.7; color: rgba(255,255,255,0.45);
}
.tri-progress {
  display: flex; gap: 5px; margin-top: 14px;
}
.tri-prog-dot {
  flex: 1; height: 2px; border-radius: 2px;
  background: rgba(255,255,255,0.1);
  transition: background 0.4s;
}
.tri-prog-dot.done   { background: rgba(232,200,122,0.5); }
.tri-prog-dot.active { background: var(--accent-tri); }
.tri-next-btn {
  margin-top: 14px; width: 100%;
  font-family: 'Space Mono', monospace; font-size: 8px;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(232,200,122,0.6); background: rgba(232,200,122,0.06);
  border: 1px solid rgba(232,200,122,0.15); border-radius: 6px;
  padding: 8px; cursor: none; transition: all 0.15s; outline: none;
}
.tri-next-btn:hover { color: var(--accent-tri); background: rgba(232,200,122,0.12); }

.tri-status-bar {
  position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 20px; align-items: center;
  background: rgba(7,8,15,0.7); border: 1px solid rgba(232,200,122,0.1);
  border-radius: 20px; padding: 8px 18px; backdrop-filter: blur(10px);
  z-index: 10; pointer-events: none; font-size: 8px;
  letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3);
}
.status-item { display: flex; align-items: center; gap: 6px; }
.status-val  { color: var(--accent-tri); font-weight: 700; }

input[type=range] { background: rgba(232,200,122,0.2); }
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 12px; height: 12px;
  border-radius: 50%; background: var(--accent-tri);
  box-shadow: 0 0 8px rgba(232,200,122,0.5); cursor: none;
}
</style>
