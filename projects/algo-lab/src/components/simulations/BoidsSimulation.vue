<template>
  <div style="position:relative;width:100%;height:100%;">
    <canvas ref="canvasEl"></canvas>

    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-boids);box-shadow:0 0 6px var(--accent-boids);"></span>
      {{ mode === 'flock' ? 'Mouse = obstacle' : 'Shinjuku Station B1F' }}
    </div>

    <div class="controls-bar">
      <button class="ctrl-btn" :class="{ active: mode === 'flock' }" @click="switchMode('flock')">Flock</button>
      <button class="ctrl-btn" :class="{ active: mode === 'station' }" @click="switchMode('station')">Station</button>
      <div class="ctrl-divider"></div>
      <div class="slider-group">
        <span class="ctrl-label">Separation</span>
        <input type="range" v-model.number="params.sep" min="0" max="100"
          style="background:rgba(126,184,247,0.2);">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Alignment</span>
        <input type="range" v-model.number="params.ali" min="0" max="100"
          style="background:rgba(126,184,247,0.2);">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Cohesion</span>
        <input type="range" v-model.number="params.coh" min="0" max="100"
          style="background:rgba(126,184,247,0.2);">
      </div>
      <div class="slider-group" v-show="mode === 'flock'">
        <span class="ctrl-label">Avoidance</span>
        <input type="range" v-model.number="params.avo" min="0" max="100"
          style="background:rgba(126,184,247,0.2);">
      </div>
      <div class="ctrl-divider"></div>
      <div class="slider-group">
        <span class="ctrl-label">{{ mode === 'flock' ? 'Count' : 'Density' }}</span>
        <input type="range" v-model.number="params.count" min="20" max="300"
          style="background:rgba(126,184,247,0.2);">
      </div>
      <div class="slider-group">
        <span class="ctrl-label">Speed</span>
        <input type="range" v-model.number="params.speed" min="10" max="100"
          style="background:rgba(126,184,247,0.2);">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { createStationLayout, nearestPointOnSegment, segmentsIntersect } from './boids/station.js'

const props = defineProps({
  mouse: { type: Object, required: true }
})

const canvasEl = ref(null)
let ctx, W, H, animId

const mode = ref('flock')
let stationLayout = null

const params = reactive({
  sep: 50, ali: 50, coh: 50, avo: 70, count: 120, speed: 40
})

// Derived param helpers
const getSep   = () => params.sep   / 100 * 2.5
const getAli   = () => params.ali   / 100 * 1.2
const getCoh   = () => params.coh   / 100 * 0.8
const getAvo   = () => params.avo   / 100 * 4.0
const getSpeed = () => params.speed / 100 * 5 + 0.8

const AVOID_R = 90, SEP_R = 28, ALI_R = 75, COH_R = 95, MAX_F = 0.09
const NAV_H   = 52

// Station-mode constants
const WALL_AVOID_R = 20
const WALL_FORCE   = 12.0
const GOAL_WEIGHT  = 1.8
const ARRIVAL_R    = 22

/**
 * Resolve hard wall collisions: if boid crossed a wall, push it back.
 */
function resolveWallCollision(boid, prevX, prevY) {
  const walls = stationLayout.walls
  for (const w of walls) {
    const hit = segmentsIntersect(prevX, prevY, boid.x, boid.y, w.x1, w.y1, w.x2, w.y2)
    if (hit) {
      // Push boid back to just before the wall
      const wallDx = w.x2 - w.x1, wallDy = w.y2 - w.y1
      const wallLen = Math.sqrt(wallDx * wallDx + wallDy * wallDy)
      if (wallLen > 0) {
        // Normal of the wall (perpendicular)
        const nx = -wallDy / wallLen, ny = wallDx / wallLen
        // Push boid to the side it came from
        const dot = (boid.x - hit.x) * nx + (boid.y - hit.y) * ny
        const side = dot >= 0 ? 1 : -1
        boid.x = hit.x + nx * side * 3
        boid.y = hit.y + ny * side * 3
        // Zero out velocity component into the wall
        const vDotN = boid.vx * nx + boid.vy * ny
        boid.vx -= vDotN * nx * 1.2
        boid.vy -= vDotN * ny * 1.2
      }
    }
  }
}

class Boid {
  constructor(isStation, spawnExit, targetExit) {
    if (isStation && spawnExit) {
      this.x = spawnExit.x + spawnExit.spawnDx * 8 + (Math.random() - 0.5) * 12
      this.y = spawnExit.y + spawnExit.spawnDy * 8 + (Math.random() - 0.5) * 12
      this.vx = spawnExit.spawnDx * 0.8
      this.vy = spawnExit.spawnDy * 0.8
      // Warm color palette for people
      const h = 25 + Math.random() * 35
      const s = 15 + Math.random() * 35
      const l = 65 + Math.random() * 25
      this.color = `hsl(${h},${s}%,${l}%)`
      this.target = targetExit || null
      this.state = 'walking'
      this.gone = false
    } else {
      this.x = Math.random() * W
      this.y = Math.random() * H
      const a = Math.random() * Math.PI * 2
      this.vx = Math.cos(a) * 2
      this.vy = Math.sin(a) * 2
      const h = 200 + Math.random() * 45
      const s = 55  + Math.random() * 25
      const l = 68  + Math.random() * 20
      this.color = `hsl(${h},${s}%,${l}%)`
      this.target = null
      this.state = null
      this.gone = false
    }
    this.ax = 0; this.ay = 0
    this.trail = []
    this.isStation = isStation
  }

  steer(tx, ty) {
    const len = Math.sqrt(tx * tx + ty * ty)
    if (!len) return [0, 0]
    const ms = getSpeed()
    let fx = tx / len * ms - this.vx
    let fy = ty / len * ms - this.vy
    const fl = Math.sqrt(fx * fx + fy * fy)
    if (fl > MAX_F) { fx = fx / fl * MAX_F; fy = fy / fl * MAX_F }
    return [fx, fy]
  }

  update(boids) {
    if (this.gone) return
    this.ax = 0; this.ay = 0

    // Flocking forces (both modes)
    let sx=0,sy=0,sc=0, ax=0,ay=0,ac=0, cx=0,cy=0,cc=0
    const sepR = this.isStation ? 16 : SEP_R
    const aliR = this.isStation ? 35 : ALI_R
    const cohR = this.isStation ? 45 : COH_R

    for (const b of boids) {
      if (b === this || b.gone) continue
      const dx = b.x - this.x, dy = b.y - this.y
      const d  = Math.sqrt(dx*dx + dy*dy)
      if (d < sepR && d > 0) { sx -= dx/d; sy -= dy/d; sc++ }
      if (d < aliR)           { ax += b.vx; ay += b.vy; ac++ }
      if (d < cohR)           { cx += b.x;  cy += b.y;  cc++ }
    }

    if (sc > 0) { const [fx,fy] = this.steer(sx,sy);           this.ax += fx*getSep(); this.ay += fy*getSep() }
    if (ac > 0) { const [fx,fy] = this.steer(ax/ac,ay/ac);     this.ax += fx*getAli(); this.ay += fy*getAli() }
    if (cc > 0) { const [fx,fy] = this.steer(cx/cc-this.x,cy/cc-this.y); this.ax += fx*getCoh(); this.ay += fy*getCoh() }

    if (this.isStation) {
      // Soft wall repulsion
      for (const w of stationLayout.walls) {
        const np = nearestPointOnSegment(this.x, this.y, w.x1, w.y1, w.x2, w.y2)
        if (np.dist < WALL_AVOID_R && np.dist > 0) {
          const str = ((1 - np.dist / WALL_AVOID_R) ** 2)
          const ndx = this.x - np.x, ndy = this.y - np.y
          const nd = Math.sqrt(ndx*ndx + ndy*ndy)
          if (nd > 0) {
            this.ax += (ndx / nd) * str * WALL_FORCE * MAX_F
            this.ay += (ndy / nd) * str * WALL_FORCE * MAX_F
          }
        }
      }

      // Goal seeking toward target exit
      if (this.target && this.state === 'walking') {
        const dx = this.target.x - this.x
        const dy = this.target.y - this.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < ARRIVAL_R) {
          this.gone = true
          return
        }
        const [fx, fy] = this.steer(dx, dy)
        this.ax += fx * GOAL_WEIGHT
        this.ay += fy * GOAL_WEIGHT
      }

      // Mouse avoidance
      const mdx = this.x - props.mouse.x
      const mdy = this.y - (props.mouse.y - NAV_H)
      const md  = Math.sqrt(mdx*mdx + mdy*mdy)
      if (md < 50 && md > 0) {
        const str = 1 - md / 50
        this.ax += (mdx / md) * str * 6 * MAX_F
        this.ay += (mdy / md) * str * 6 * MAX_F
      }
    } else {
      // Flock mode: mouse avoidance
      const mdx = this.x - props.mouse.x
      const mdy = this.y - (props.mouse.y - NAV_H)
      const md  = Math.sqrt(mdx*mdx + mdy*mdy)
      if (md < AVOID_R && md > 0) {
        const str = 1 - md / AVOID_R
        const [fx,fy] = this.steer(mdx/md, mdy/md)
        this.ax += fx * getAvo() * str * 12
        this.ay += fy * getAvo() * str * 12
      }
    }

    this.vx += this.ax; this.vy += this.ay
    const ms = getSpeed() * (this.isStation ? 0.55 : 1)
    const sp = Math.sqrt(this.vx*this.vx + this.vy*this.vy)
    if (sp > ms) { this.vx = this.vx/sp*ms; this.vy = this.vy/sp*ms }
    if (sp < ms*0.2 && sp > 0 && !this.isStation) { this.vx = this.vx/sp*ms*0.35; this.vy = this.vy/sp*ms*0.35 }

    const maxTrail = this.isStation ? 5 : 10
    this.trail.unshift({ x: this.x, y: this.y })
    if (this.trail.length > maxTrail) this.trail.pop()

    const prevX = this.x, prevY = this.y
    this.x += this.vx; this.y += this.vy

    if (this.isStation) {
      // Hard wall collision
      resolveWallCollision(this, prevX, prevY)
    } else {
      // Wrap edges
      if (this.x < 0)  this.x += W
      if (this.x > W)  this.x -= W
      if (this.y < 0)  this.y += H
      if (this.y > H)  this.y -= H
    }
  }

  draw() {
    if (this.gone) return
    if (this.isStation) {
      if (this.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(this.trail[0].x, this.trail[0].y)
        for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y)
        ctx.strokeStyle = this.color.replace('hsl','hsla').replace(')',',0.15)')
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.shadowColor = this.color
      ctx.shadowBlur = 4
      ctx.fill()
      ctx.shadowBlur = 0
    } else {
      const angle = Math.atan2(this.vy, this.vx)
      const sz    = 7

      if (this.trail.length > 1) {
        ctx.beginPath()
        ctx.moveTo(this.trail[0].x, this.trail[0].y)
        for (let i = 1; i < this.trail.length; i++) ctx.lineTo(this.trail[i].x, this.trail[i].y)
        ctx.strokeStyle = this.color.replace('hsl','hsla').replace(')',',0.1)')
        ctx.lineWidth = 1
        ctx.stroke()
      }

      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(angle)
      ctx.beginPath()
      ctx.moveTo(sz*1.7, 0)
      ctx.lineTo(-sz*0.85,  sz*0.65)
      ctx.lineTo(-sz*0.45,  0)
      ctx.lineTo(-sz*0.85, -sz*0.65)
      ctx.closePath()
      ctx.fillStyle   = this.color
      ctx.shadowColor = this.color
      ctx.shadowBlur  = 7
      ctx.fill()
      ctx.restore()
      ctx.shadowBlur = 0
    }
  }
}

function spawnStationBoid() {
  const exits = stationLayout.exits
  const spawnIdx = Math.floor(Math.random() * exits.length)
  let targetIdx = Math.floor(Math.random() * (exits.length - 1))
  if (targetIdx >= spawnIdx) targetIdx++
  return new Boid(true, exits[spawnIdx], exits[targetIdx])
}

let boids = []

function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
  if (mode.value === 'station') {
    stationLayout = createStationLayout(W, H)
  }
}

function switchMode(newMode) {
  if (mode.value === newMode) return
  mode.value = newMode
  if (newMode === 'station') {
    stationLayout = createStationLayout(W, H)
    boids = Array.from({ length: params.count }, () => spawnStationBoid())
  } else {
    stationLayout = null
    boids = Array.from({ length: params.count }, () => new Boid(false))
  }
  if (ctx) {
    ctx.fillStyle = '#07080f'
    ctx.fillRect(0, 0, W, H)
  }
}

function drawStation() {
  const layout = stationLayout
  if (!layout) return

  // Platform fills
  ctx.fillStyle = 'rgba(126, 184, 247, 0.025)'
  for (const p of layout.platforms) {
    ctx.fillRect(p.x, p.y, p.w, p.h)
  }

  // Walls
  ctx.strokeStyle = 'rgba(126, 184, 247, 0.25)'
  ctx.lineWidth = 1.5
  ctx.setLineDash([])
  for (const w of layout.walls) {
    ctx.beginPath()
    ctx.moveTo(w.x1, w.y1)
    ctx.lineTo(w.x2, w.y2)
    ctx.stroke()
  }

  // Platform labels
  ctx.font = '7px "Space Mono", monospace'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
  for (const p of layout.platforms) {
    ctx.fillText(p.label, p.x + p.w / 2, p.y + p.h / 2 + 2.5)
  }

  // Exit markers
  for (const e of layout.exits) {
    ctx.beginPath()
    ctx.arc(e.x, e.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(126, 184, 247, 0.4)'
    ctx.fill()
    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.font = '7px "Space Mono", monospace'
    ctx.textAlign = 'center'
    // Position label outside the exit
    const lx = e.x - e.spawnDx * 14
    const ly = e.y - e.spawnDy * 14
    ctx.fillText(e.label, lx, ly + 3)
  }
}

function loop() {
  animId = requestAnimationFrame(loop)

  const isStation = mode.value === 'station'

  if (isStation) {
    ctx.fillStyle = '#07080f'
    ctx.fillRect(0, 0, W, H)
    drawStation()
  } else {
    ctx.fillStyle = 'rgba(7,8,15,0.42)'
    ctx.fillRect(0, 0, W, H)
  }

  if (isStation) {
    // Remove gone boids and spawn replacements
    boids = boids.filter(b => !b.gone)
    const target = params.count
    while (boids.length < target) {
      boids.push(spawnStationBoid())
    }
    while (boids.length > target) {
      boids.pop()
    }
  } else {
    // Gradually adjust boid count
    const target = params.count
    if (target > boids.length) {
      for (let i = 0; i < Math.min(4, target - boids.length); i++) {
        boids.push(new Boid(false))
      }
    } else if (target < boids.length) {
      boids.splice(0, Math.min(4, boids.length - target))
    }
  }

  if (!isStation) {
    // Mouse obstacle zone
    const cmx = props.mouse.x
    const cmy = props.mouse.y - NAV_H
    const grad = ctx.createRadialGradient(cmx,cmy,0,cmx,cmy,AVOID_R)
    grad.addColorStop(0, 'rgba(255,60,60,0.05)')
    grad.addColorStop(1, 'rgba(255,60,60,0)')
    ctx.beginPath(); ctx.arc(cmx,cmy,AVOID_R,0,Math.PI*2)
    ctx.fillStyle = grad; ctx.fill()
    ctx.beginPath(); ctx.arc(cmx,cmy,AVOID_R,0,Math.PI*2)
    ctx.strokeStyle = 'rgba(255,60,60,0.12)'; ctx.lineWidth = 1
    ctx.setLineDash([4,9]); ctx.stroke(); ctx.setLineDash([])
  } else {
    // Subtle mouse ripple
    const cmx = props.mouse.x
    const cmy = props.mouse.y - NAV_H
    ctx.beginPath(); ctx.arc(cmx, cmy, 30, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1
    ctx.stroke()
  }

  for (const b of boids) b.update(boids)
  for (const b of boids) b.draw()
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  boids = Array.from({ length: params.count }, () => new Boid(false))
  window.addEventListener('resize', resize)
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--accent-boids);
  box-shadow: 0 0 8px rgba(126,184,247,0.5);
  cursor: none;
}
</style>
