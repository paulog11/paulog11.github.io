<template>
  <div class="bb-root">

    <!-- Constants Sidebar -->
    <div class="bb-sidebar">
      <div class="bb-sidebar-header">
        <div class="bb-sidebar-title">Physical Constants</div>
        <div class="bb-sidebar-sub">Adjust each constant and observe how the universe responds.</div>
      </div>

      <div class="bb-constants-list">
        <div v-for="c in BB_CONSTANTS" :key="c.id" class="bb-const">
          <div class="bb-const-top">
            <span class="bb-const-name">{{ c.name }}</span>
            <span class="bb-const-symbol">{{ c.symbol }}</span>
          </div>
          <div class="bb-const-slider-row">
            <input type="range"
              :value="constValues[c.id] * 100"
              min="-200" max="200" step="1"
              @input="onConstChange(c.id, $event.target.value / 100)"
            >
            <span class="bb-deviation" :class="deviationClass(constValues[c.id])">
              {{ formatDev(constValues[c.id]) }}
            </span>
            <button class="bb-reset-const" @click="resetConst(c.id)">↺</button>
          </div>
          <div class="bb-const-desc">{{ c.desc }}</div>
        </div>
      </div>

      <div class="bb-sidebar-footer">
        <button class="bb-reset-all" @click="resetAll">↺ Restore Our Universe</button>
      </div>
    </div>

    <!-- Canvas area -->
    <div class="bb-canvas-wrap" ref="canvasWrap">
      <canvas ref="canvasEl"></canvas>

      <!-- Outcome badge -->
      <div class="bb-outcome" :style="{ borderColor: outcomeData.borderColor }">
        <div class="bb-outcome-label">Universe Outcome</div>
        <div class="bb-outcome-name" :style="{ color: outcomeData.color }">{{ outcomeData.name }}</div>
        <div class="bb-outcome-desc">{{ outcomeData.desc }}</div>
      </div>

      <!-- Bottom bar -->
      <div class="bb-bottom-bar">
        <button class="ctrl-btn" @click="bigBang">⟳ Big Bang</button>
        <div class="bb-divider"></div>
        <div class="bb-zoom-controls">
          <button class="bb-zoom-btn" @click="zoom(-0.25)">−</button>
          <span class="bb-zoom-label">{{ Math.round(zoomLevel * 100) }}%</span>
          <button class="bb-zoom-btn" @click="zoom(+0.25)">+</button>
        </div>
        <div class="bb-divider"></div>
        <div class="bb-tuning-meter">
          Fine-tuning
          <div class="bb-tuning-bar-wrap">
            <div class="bb-tuning-bar" :style="{ clipPath: `inset(0 ${Math.round((1-tuning)*100)}% 0 0)` }"></div>
          </div>
          <span class="bb-tuning-label" :style="{ color: 'rgba(192,132,252,0.7)' }">{{ tuningLabel }}</span>
        </div>
        <div class="bb-divider"></div>
        <div class="bb-epoch">Epoch: <span>{{ epochLabel }}</span></div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { BB_CONSTANTS, BB_OUTCOMES, EPOCHS } from './bigbang/constants.js'

const canvasEl  = ref(null)
const canvasWrap = ref(null)
let ctx, W, H, animId

// ── STATE ──────────────────────────────────────────────────
const constValues = reactive(Object.fromEntries(BB_CONSTANTS.map(c => [c.id, 0])))
const zoomLevel   = ref(1.0)
const bbTime      = ref(0)
const bbPhase     = ref('bang')
let   particles   = []
let   stars       = []

// ── COMPUTED ──────────────────────────────────────────────
const outcomeKey = computed(() => {
  let worst = null, maxW = 0
  for (const c of BB_CONSTANTS) {
    const eff = c.effect(constValues[c.id])
    if (eff && eff.weight > maxW) { maxW = eff.weight; worst = eff.outcome }
  }
  return worst || 'life-permitting'
})

const outcomeData = computed(() => BB_OUTCOMES[outcomeKey.value])

const tuning = computed(() => {
  const totalDev = BB_CONSTANTS.reduce((s,c) => s + Math.abs(constValues[c.id]), 0)
  return Math.max(0, 1 - totalDev / (BB_CONSTANTS.length * 2))
})

const tuningLabel = computed(() => {
  const t = tuning.value
  return t > 0.85 ? 'Our Universe' : t > 0.6 ? 'Close' : t > 0.35 ? 'Marginal' : 'Broken'
})

const epochLabel = computed(() => {
  const ep = EPOCHS.find(([s,e]) => bbTime.value >= s && bbTime.value < e)
  return ep ? ep[2] : 'Structure Formation'
})

// ── CONSTANT CONTROLS ─────────────────────────────────────
function onConstChange(id, val) {
  constValues[id] = val
  bigBang()
}
function resetConst(id) { constValues[id] = 0; bigBang() }
function resetAll()     { BB_CONSTANTS.forEach(c => { constValues[c.id] = 0 }); bigBang() }

function formatDev(v)      { return (v >= 0 ? '+' : '') + v.toFixed(1) }
function deviationClass(v) {
  const a = Math.abs(v)
  return a < 0.5 ? 'dev-ok' : a < 1.2 ? 'dev-warn' : 'dev-crit'
}

// ── ZOOM ──────────────────────────────────────────────────
function zoom(delta) {
  zoomLevel.value = Math.max(0.25, Math.min(4.0, zoomLevel.value + delta))
}

// ── PARTICLE CLASS ────────────────────────────────────────
class BBParticle {
  constructor(angle, speed, mass, type) {
    this.x = W/2; this.y = H/2
    this.vx = Math.cos(angle)*speed; this.vy = Math.sin(angle)*speed
    this.mass = mass; this.type = type
    this.trail = []; this.alive = true; this.bound = false
    this.baseColor = type==='matter' ? [180,220,255] : type==='photon' ? [255,240,180] : [140,100,220]
    this.r = Math.cbrt(mass)*3.5
  }
}

// ── BIG BANG ──────────────────────────────────────────────
function bigBang() {
  particles = []; bbTime.value = 0; bbPhase.value = 'bang'
  for (let i = 0; i < 60; i++) {
    const angle   = Math.random()*Math.PI*2
    const H0mod   = 1 + constValues.H0 * 0.8
    const Lmod    = 1 + constValues.lambda * 0.4
    const speed   = (60 + Math.random()*90) * H0mod * Lmod
    const rng     = Math.random()
    const type    = rng < 0.12 ? 'photon' : rng < 0.28 ? 'dark' : 'matter'
    const hMod    = Math.max(0.1, 1 + constValues.higgs * 0.5)
    const mass    = type==='dark' ? 8+Math.random()*20 : type==='photon' ? 0.5 : (2+Math.random()*14)*hMod
    const p = new BBParticle(angle, speed, mass, type)
    p.x += (Math.random()-0.5)*6; p.y += (Math.random()-0.5)*6
    particles.push(p)
  }
}

// ── PHYSICS ──────────────────────────────────────────────
function physicsStep(dt) {
  bbTime.value += dt
  const n      = particles.length
  const G_eff  = 80000 * Math.pow(10, constValues.G * 0.6)
  const alphaEM = 1 + constValues.alpha * 0.5
  const alphaS  = 1 + constValues.alphaS * 0.6
  const SOFTEN  = 120

  // Expansion forces
  if (bbPhase.value === 'bang' || bbPhase.value === 'expand') {
    const cx = W/2, cy = H/2
    for (const p of particles) {
      const dx = p.x-cx, dy = p.y-cy
      const d  = Math.sqrt(dx*dx+dy*dy)+0.1
      const pushStr = constValues.lambda * 0.008
      p.vx += (dx/d)*pushStr; p.vy += (dy/d)*pushStr
      const H_pull = constValues.H0 * 0.004
      p.vx += dx*H_pull*dt; p.vy += dy*H_pull*dt
    }
  }

  // Gravity + merging
  for (let i = 0; i < n; i++) {
    const a = particles[i]; if (!a.alive) continue
    for (let j = i+1; j < n; j++) {
      const b = particles[j]; if (!b.alive) continue
      const dx = b.x-a.x, dy = b.y-a.y
      const d2 = dx*dx+dy*dy, d = Math.sqrt(d2)+0.01
      const f  = G_eff*a.mass*b.mass/(d2+SOFTEN*SOFTEN)
      const fx = f*dx/d, fy = f*dy/d
      a.vx += fx/a.mass*dt; a.vy += fy/a.mass*dt
      b.vx -= fx/b.mass*dt; b.vy -= fy/b.mass*dt

      const fusionR = (a.r+b.r)*0.8*alphaS*Math.max(0.2,alphaEM)
      if (d < fusionR && a.type!=='photon' && b.type!=='photon') {
        const tm = a.mass+b.mass
        a.vx=(a.vx*a.mass+b.vx*b.mass)/tm; a.vy=(a.vy*a.mass+b.vy*b.mass)/tm
        a.x =(a.x *a.mass+b.x *b.mass)/tm; a.y =(a.y *a.mass+b.y *b.mass)/tm
        a.mass=tm; a.r=Math.cbrt(tm)*3.5; b.alive=false; a.bound=true
      }
    }
  }

  // Per-particle updates
  for (const p of particles) {
    if (!p.alive) continue
    if (p.type==='photon') {
      const cMod = Math.pow(10, constValues.c*0.5)
      const sp   = Math.sqrt(p.vx*p.vx+p.vy*p.vy)
      if (sp>0) { p.vx=p.vx/sp*180*cMod; p.vy=p.vy/sp*180*cMod }
    }
    if (p.bound) { p.vx*=0.985; p.vy*=0.985 }
    p.trail.push({x:p.x,y:p.y}); if(p.trail.length>60) p.trail.shift()
    p.x+=p.vx*dt; p.y+=p.vy*dt
    if (p.type==='photon') {
      const margin = W*1.5
      if (p.x<-margin||p.x>W+margin||p.y<-margin||p.y>H+margin) p.alive=false
    }
  }

  // Big crunch pull
  if (outcomeKey.value === 'big-crunch') {
    const cx=W/2, cy=H/2
    for (const p of particles) {
      const dx=cx-p.x,dy=cy-p.y,d=Math.sqrt(dx*dx+dy*dy)+1
      const pull = Math.abs(constValues.G)*0.4
      p.vx+=dx/d*pull; p.vy+=dy/d*pull
    }
  }

  particles = particles.filter(p => p.alive)
  if (bbPhase.value==='bang'   && bbTime.value>0.015) bbPhase.value='expand'
  if (bbPhase.value==='expand' && bbTime.value>0.12)  bbPhase.value='settle'
}

// ── RENDER ────────────────────────────────────────────────
function genStars() {
  stars = Array.from({length:180}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*1.0, a: 0.05+Math.random()*0.3
  }))
}

function drawBG() {
  const grd = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.7)
  grd.addColorStop(0,'#0d0618'); grd.addColorStop(1,'#03020a')
  ctx.fillStyle=grd; ctx.fillRect(0,0,W,H)
  for (const s of stars) {
    ctx.globalAlpha=s.a; ctx.fillStyle='#fff'
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill()
  }
  ctx.globalAlpha=1
}

function drawFlash() {
  if (bbTime.value < 0.08) {
    const alpha = Math.max(0, 0.95 - bbTime.value*12)
    const grd   = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W*0.7)
    grd.addColorStop(0,    `rgba(255,250,240,${alpha})`)
    grd.addColorStop(0.15, `rgba(255,200,120,${alpha*0.7})`)
    grd.addColorStop(0.5,  `rgba(200,100,255,${alpha*0.3})`)
    grd.addColorStop(1,    `rgba(100,50,200,0)`)
    ctx.fillStyle=grd; ctx.fillRect(0,0,W,H)
  }
}

function drawParticle(p) {
  const [r,g,b] = p.baseColor
  let glowR = p.bound ? Math.cbrt(p.mass)*3.5 : p.r

  if (p.trail.length > 1) {
    const tl = p.trail.length
    for (let i=1;i<tl;i++) {
      ctx.beginPath()
      ctx.moveTo(p.trail[i-1].x, p.trail[i-1].y)
      ctx.lineTo(p.trail[i].x,   p.trail[i].y)
      ctx.strokeStyle=`rgba(${r},${g},${b},${(i/tl)*0.35})`
      ctx.lineWidth=Math.max(0.5,(i/tl)*1.5); ctx.stroke()
    }
  }
  const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,glowR*3.5)
  grd.addColorStop(0,   `rgba(${r},${g},${b},0.45)`)
  grd.addColorStop(0.4, `rgba(${r},${g},${b},0.12)`)
  grd.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  ctx.beginPath(); ctx.arc(p.x,p.y,glowR*3.5,0,Math.PI*2); ctx.fillStyle=grd; ctx.fill()

  ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(1.5,glowR),0,Math.PI*2)
  ctx.fillStyle=`rgba(${r},${g},${b},0.95)`
  ctx.shadowColor=`rgb(${r},${g},${b})`; ctx.shadowBlur=glowR*2.5
  ctx.fill(); ctx.shadowBlur=0

  if (p.bound && p.mass>40) {
    ctx.font='7px "Space Mono",monospace'; ctx.fillStyle=`rgba(${r},${g},${b},0.4)`
    ctx.textAlign='center'; ctx.fillText(`${Math.round(p.mass)}m`,p.x,p.y-glowR-5)
  }
}

function drawOutcomeViz() {
  const oc = outcomeKey.value
  if (oc==='big-crunch') {
    const pulse = 0.08+0.04*Math.sin(bbTime.value*3)
    const grd = ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.8)
    grd.addColorStop(0,'rgba(248,113,113,0)'); grd.addColorStop(1,`rgba(248,113,113,${pulse})`)
    ctx.fillStyle=grd; ctx.fillRect(0,0,W,H)
  } else if (oc==='heat-death') {
    ctx.fillStyle=`rgba(20,40,80,${Math.min(0.18,bbTime.value*0.01)})`; ctx.fillRect(0,0,W,H)
  }
}

function loop() {
  animId = requestAnimationFrame(loop)
  ctx.fillStyle='rgba(3,2,10,0.4)'; ctx.fillRect(0,0,W,H)
  drawBG()
  for (let s=0;s<3;s++) physicsStep(0.004/3)
  drawOutcomeViz(); drawFlash()
  ctx.save()
  ctx.translate(W/2,H/2); ctx.scale(zoomLevel.value,zoomLevel.value); ctx.translate(-W/2,-H/2)
  for (const p of particles) drawParticle(p)
  ctx.restore()
  if (particles.length===0) bigBang()
}

function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
  genStars()
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  bigBang()
  canvasWrap.value.addEventListener('wheel', e => {
    e.preventDefault(); zoom(e.deltaY < 0 ? 0.1 : -0.1)
  }, { passive: false })
  window.addEventListener('resize', resize)
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.bb-root {
  position: absolute; inset: 0;
  display: flex; flex-direction: row;
}

/* ── Sidebar ── */
.bb-sidebar {
  width: 300px; min-width: 300px; height: 100%;
  background: rgba(7,8,15,0.92);
  border-right: 1px solid rgba(192,132,252,0.12);
  display: flex; flex-direction: column; overflow: hidden; z-index: 10;
}
.bb-sidebar-header {
  padding: 18px 18px 12px;
  border-bottom: 1px solid rgba(192,132,252,0.1);
  flex-shrink: 0;
}
.bb-sidebar-title {
  font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--accent-bang); margin-bottom: 4px;
}
.bb-sidebar-sub {
  font-size: 8px; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.2); line-height: 1.6;
}
.bb-constants-list {
  flex: 1; overflow-y: auto; padding: 10px 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(192,132,252,0.2) transparent;
}
.bb-const {
  padding: 10px 18px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  transition: background 0.15s;
}
.bb-const:hover { background: rgba(192,132,252,0.04); }
.bb-const-top {
  display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;
}
.bb-const-name  { font-size: 9px; letter-spacing: 0.1em; color: rgba(255,255,255,0.7); text-transform: uppercase; }
.bb-const-symbol { font-size: 11px; color: var(--accent-bang); opacity: 0.8; font-style: italic; }
.bb-const-desc  { font-size: 8px; color: rgba(255,255,255,0.2); letter-spacing: 0.04em; margin-top: 4px; }
.bb-const-slider-row { display: flex; align-items: center; gap: 8px; }
.bb-const-slider-row input[type=range] {
  flex: 1; width: auto; height: 2px;
  background: rgba(192,132,252,0.15); border-radius: 2px;
  -webkit-appearance: none; outline: none; cursor: none;
}
.bb-const-slider-row input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent-bang); box-shadow: 0 0 6px rgba(192,132,252,0.5); cursor: none;
}
.bb-deviation { font-size: 8px; min-width: 36px; text-align: right; font-family: 'Space Mono',monospace; }
.dev-ok   { color: rgba(100,255,150,0.7); }
.dev-warn { color: rgba(255,200,80,0.8); }
.dev-crit { color: rgba(255,80,80,0.9); }
.bb-reset-const {
  font-size: 7px; color: rgba(192,132,252,0.3); background: none; border: none;
  cursor: none; font-family: 'Space Mono',monospace; letter-spacing: 0.1em;
  padding: 0; transition: color 0.15s;
}
.bb-reset-const:hover { color: rgba(192,132,252,0.7); }
.bb-sidebar-footer {
  padding: 12px 18px; border-top: 1px solid rgba(192,132,252,0.1); flex-shrink: 0;
}
.bb-reset-all {
  width: 100%; font-family: 'Space Mono',monospace; font-size: 8px;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: rgba(192,132,252,0.5); background: rgba(192,132,252,0.06);
  border: 1px solid rgba(192,132,252,0.15); border-radius: 8px;
  padding: 8px; cursor: none; transition: all 0.15s; outline: none;
}
.bb-reset-all:hover { color: var(--accent-bang); background: rgba(192,132,252,0.12); }

/* ── Canvas wrap ── */
.bb-canvas-wrap { flex: 1; position: relative; overflow: hidden; }
canvas { display: block; width: 100%; height: 100%; }

/* ── Outcome ── */
.bb-outcome {
  position: absolute; top: 16px; right: 16px; max-width: 240px;
  padding: 14px 16px; background: rgba(7,8,15,0.88);
  border-radius: 12px; backdrop-filter: blur(12px); z-index: 20;
  border: 1px solid rgba(192,132,252,0.2); transition: border-color 0.5s;
}
.bb-outcome-label {
  font-size: 7px; letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(255,255,255,0.25); margin-bottom: 6px;
}
.bb-outcome-name {
  font-family: 'Syne',sans-serif; font-size: 15px; font-weight: 800;
  margin-bottom: 6px; line-height: 1.2; transition: color 0.4s;
}
.bb-outcome-desc { font-size: 8px; line-height: 1.65; color: rgba(255,255,255,0.35); }

/* ── Bottom bar ── */
.bb-bottom-bar {
  position: absolute; bottom: 16px; left: 16px; right: 16px;
  display: flex; align-items: center; gap: 14px; z-index: 20;
  background: rgba(7,8,15,0.75); border: 1px solid rgba(192,132,252,0.1);
  border-radius: 12px; padding: 10px 16px; backdrop-filter: blur(12px);
}
.bb-divider { width:1px; height:20px; background:rgba(192,132,252,0.1); flex-shrink:0; }
.bb-zoom-controls { display:flex; align-items:center; gap:6px; flex-shrink:0; }
.bb-zoom-btn {
  font-family: 'Space Mono',monospace; font-size: 12px;
  color: rgba(192,132,252,0.5); background: rgba(7,8,15,0.8);
  border: 1px solid rgba(192,132,252,0.15); border-radius: 6px;
  width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;
  cursor: none; transition: all 0.15s; outline: none;
}
.bb-zoom-btn:hover { color: var(--accent-bang); border-color: rgba(192,132,252,0.3); }
.bb-zoom-label { font-size:8px; letter-spacing:0.1em; color:rgba(192,132,252,0.4); min-width:34px; text-align:center; }
.bb-tuning-meter { display:flex; align-items:center; gap:8px; font-size:8px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); flex-shrink:0; }
.bb-tuning-bar-wrap { width:90px; height:3px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; }
.bb-tuning-bar { height:100%; width:100%; border-radius:3px; background:linear-gradient(90deg,#f87171,#fb923c,#facc15,#4ade80); transition:clip-path 0.6s ease; }
.bb-tuning-label { font-size:8px; min-width:70px; }
.bb-epoch { font-size:9px; letter-spacing:0.14em; color:rgba(255,255,255,0.2); text-transform:uppercase; white-space:nowrap; }
.bb-epoch span { color:rgba(192,132,252,0.6); }
</style>
