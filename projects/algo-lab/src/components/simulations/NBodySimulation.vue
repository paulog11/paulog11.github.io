<template>
  <div style="position:relative;width:100%;height:100%;">
    <canvas ref="canvasEl" @click="onCanvasClick"></canvas>

    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-nbody);box-shadow:0 0 6px var(--accent-nbody);"></span>
      Click to add body
    </div>

    <div class="controls-bar">
      <div class="slider-group">
        <span class="ctrl-label">Bodies</span>
        <input type="range" v-model.number="params.count" min="2" max="12" @change="reset">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Gravity</span>
        <input type="range" v-model.number="params.gravity" min="1" max="100">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Mass range</span>
        <input type="range" v-model.number="params.mass" min="1" max="100">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Trail</span>
        <input type="range" v-model.number="params.trail" min="10" max="600">
      </div>
      <div class="ctrl-divider"></div>
      <button class="ctrl-btn" @click="reset">↺ Reset</button>
      <button class="ctrl-btn" @click="loadPreset('figure8')">Figure-8</button>
      <button class="ctrl-btn" @click="loadPreset('orbit')">Orbit</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { rk4Step, hexToRgb } from '../../composables/useRK4.js'

const canvasEl = ref(null)
let ctx, W, H, animId

const params = reactive({ count: 4, gravity: 40, mass: 50, trail: 300 })

const COLORS = [
  '#f7a96e','#f7d06e','#f76e6e','#e86ef7','#6ef7c8',
  '#f7f06e','#6eadf7','#f76ea3','#a3f76e','#f7896e','#c8f76e','#6ef7f0'
]
const SOFTEN = 25

class Body {
  constructor(x, y, vx, vy, mass, color) {
    Object.assign(this, { x, y, vx, vy, mass, color, trail: [] })
  }
  get radius() { return Math.cbrt(this.mass) * 4.5 }
}

let bodies = []

function getG() { return params.gravity / 100 * 2000 }

function reset() {
  bodies = []
  const cx = W/2, cy = H/2
  const massRange = params.mass / 100
  for (let i = 0; i < params.count; i++) {
    const angle = (i/params.count)*Math.PI*2 + Math.random()*0.5
    const r     = 80 + Math.random() * Math.min(W,H)*0.22
    const x     = cx + Math.cos(angle)*r
    const y     = cy + Math.sin(angle)*r
    const speed = Math.sqrt(getG() * 50 / r) * (0.5 + Math.random()*0.5)
    bodies.push(new Body(x, y, -Math.sin(angle)*speed, Math.cos(angle)*speed,
      10 + Math.random()*490*massRange, COLORS[i % COLORS.length]))
  }
  if (params.count >= 3) {
    bodies[0].x = cx; bodies[0].y = cy
    bodies[0].vx = 0; bodies[0].vy = 0
    bodies[0].mass = 600 + Math.random()*400
  }
}

function loadPreset(name) {
  const cx = W/2, cy = H/2
  if (name === 'figure8') {
    const sc = Math.min(W,H)*0.18, vc = 1.5
    bodies = [
      new Body(cx+0.97000436*sc, cy-0.24308753*sc,  0.93240737/2*vc,  0.86473146/2*vc, 200, COLORS[0]),
      new Body(cx-0.97000436*sc, cy+0.24308753*sc,  0.93240737/2*vc,  0.86473146/2*vc, 200, COLORS[1]),
      new Body(cx,               cy,               -0.93240737*vc,   -0.86473146*vc,   200, COLORS[2]),
    ]
  } else if (name === 'orbit') {
    bodies = [new Body(cx, cy, 0, 0, 800, COLORS[0])]
    for (let i = 1; i <= 5; i++) {
      const a  = (i/5)*Math.PI*2
      const r  = 60 + i*40
      const sp = Math.sqrt(getG()*800/r)*0.85
      bodies.push(new Body(cx+Math.cos(a)*r, cy+Math.sin(a)*r,
        -Math.sin(a)*sp, Math.cos(a)*sp, 20+i*12, COLORS[i]))
    }
  }
}

function onCanvasClick(e) {
  const rect = canvasEl.value.getBoundingClientRect()
  bodies.push(new Body(
    e.clientX - rect.left, e.clientY - rect.top,
    (Math.random()-0.5)*3, (Math.random()-0.5)*3,
    50 + Math.random()*200, COLORS[bodies.length % COLORS.length]
  ))
}

function drawBody(b) {
  const r   = b.radius
  const {r:cr,g:cg,b:cb} = hexToRgb(b.color)

  // Trail
  if (b.trail.length > 1) {
    const tl = b.trail.length
    for (let i = 1; i < tl; i++) {
      const a = (i/tl)*0.55
      ctx.beginPath()
      ctx.moveTo(b.trail[i-1].x, b.trail[i-1].y)
      ctx.lineTo(b.trail[i].x,   b.trail[i].y)
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a})`
      ctx.lineWidth   = 1.5*(i/tl)
      ctx.stroke()
    }
  }
  // Glow
  const grd = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,r*3)
  grd.addColorStop(0,   b.color + 'cc')
  grd.addColorStop(0.4, b.color + '44')
  grd.addColorStop(1,   b.color + '00')
  ctx.beginPath(); ctx.arc(b.x,b.y,r*3,0,Math.PI*2)
  ctx.fillStyle = grd; ctx.fill()
  // Body
  ctx.beginPath(); ctx.arc(b.x,b.y,r,0,Math.PI*2)
  ctx.fillStyle   = b.color
  ctx.shadowColor = b.color; ctx.shadowBlur = r*2
  ctx.fill(); ctx.shadowBlur = 0
}

function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
}

function loop() {
  animId = requestAnimationFrame(loop)
  ctx.fillStyle = 'rgba(7,8,15,0.3)'
  ctx.fillRect(0, 0, W, H)
  for (let s = 0; s < 4; s++) rk4Step(bodies, getG(), SOFTEN, 0.016/4, params.trail)
  for (const b of bodies) drawBody(b)
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  reset()
  window.addEventListener('resize', () => { resize(); reset() })
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
input[type=range] { background: rgba(247,169,110,0.2); }
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--accent-nbody);
  box-shadow: 0 0 8px rgba(247,169,110,0.5);
  cursor: none;
}
</style>
