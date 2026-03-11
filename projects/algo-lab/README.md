# Algo Lab

Interactive algorithm and physics simulation playground built with Vue 3 and HTML Canvas. Each tab runs a different visualization.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 5** (dev server + single-file production build with inlined assets)
- **HTML Canvas** (`requestAnimationFrame` render loops)
- **Fonts**: Space Mono (monospace), Syne (display headings)

## Simulations

| Tab | File | Description |
|-----|------|-------------|
| **Boids** | `BoidsSimulation.vue` | Craig Reynolds' flocking algorithm with separation, alignment, cohesion forces and mouse obstacle avoidance. Includes a "Station" mode simulating Shinjuku station crowd flow with walls and destination-driven movement. |
| **N-Body** | `NBodySimulation.vue` | Gravitational N-body simulation using RK4 integration. Presets for Figure-8 choreography and orbital configurations. Click canvas to add bodies. |
| **Trisolaris** | `TrisolarisSimulation.vue` | Three-body problem themed after Liu Cixin's novel. 5 sequential narrative events (Chaotic Era, Stable Era, Tri-Solar Day, Syzygy, Flying Stars) with atmospheric overlays and temperature/stability readings. |
| **Big Bang** | `BigBangSimulation.vue` | Fine-tuning simulator exploring the anthropic principle. 10 physical constant sliders (G, electromagnetic force, strong nuclear force, cosmological constant, etc.) control particle physics outcomes (Life-Permitting Universe, Big Crunch, Heat Death, No Atoms, etc.). |

## Project Structure

```
algo-lab/
├── index.html                              # App entry point
├── package.json
├── vite.config.js                          # Builds to single inlined HTML file
└── src/
    ├── main.js                             # Vue app mount
    ├── App.vue                             # Root: nav tabs + custom cursor
    ├── styles/
    │   └── global.css                      # Design tokens, nav, controls, cursor
    ├── composables/
    │   └── useRK4.js                       # Shared RK4 integrator + hexToRgb()
    └── components/
        └── simulations/
            ├── BoidsSimulation.vue
            ├── NBodySimulation.vue
            ├── TrisolarisSimulation.vue
            ├── BigBangSimulation.vue
            ├── boids/
            │   └── station.js              # Shinjuku station layout geometry
            ├── trisolaris/
            │   └── events.js               # 5 Trisolaris event definitions
            └── bigbang/
                └── constants.js            # 10 physical constants + outcomes
```

## Getting Started

```bash
npm install
npm run dev       # development server with hot reload
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## GitHub Pages Deployment

The Vite config inlines all assets, producing a single `dist/index.html` that works as a fully self-contained static page.

```bash
npm run build
# Copy dist/index.html to your deploy target
```

If deploying to a subdirectory (e.g. `username.github.io/algo-lab`), set `base` in `vite.config.js`:

```js
export default defineConfig({
  base: '/algo-lab/',
  plugins: [vue()],
})
```

## Adding a New Simulation

### 1. Create the component

Create `src/components/simulations/YourSimulation.vue` following this template:

```vue
<template>
  <div style="position:relative;width:100%;height:100%;">
    <canvas ref="canvasEl"></canvas>

    <!-- Top-right info badge -->
    <div class="info-badge">
      <span class="badge-dot" style="background:var(--accent-yours);box-shadow:0 0 6px var(--accent-yours);"></span>
      Description text
    </div>

    <!-- Bottom-center controls -->
    <div class="controls-bar">
      <div class="slider-group">
        <span class="ctrl-label">Parameter</span>
        <input type="range" v-model.number="params.val" min="0" max="100"
          style="background:rgba(R,G,B,0.2);">
      </div>
      <div class="ctrl-divider"></div>
      <button class="ctrl-btn" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let ctx, W, H, animId

const params = reactive({ val: 50 })

function resize() {
  W = canvasEl.value.width  = canvasEl.value.offsetWidth
  H = canvasEl.value.height = canvasEl.value.offsetHeight
}

function loop() {
  animId = requestAnimationFrame(loop)
  ctx.fillStyle = 'rgba(7,8,15,0.42)' // fade trail effect
  ctx.fillRect(0, 0, W, H)
  // Simulation logic + rendering here
}

onMounted(() => {
  ctx = canvasEl.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>
```

### 2. Extract data (optional)

For simulations with significant configuration, extract data to a subdirectory:

```
simulations/
  yoursim/
    constants.js    # Exported arrays/objects
  YourSimulation.vue
```

See `trisolaris/events.js` and `bigbang/constants.js` for examples.

### 3. Add an accent color

In `src/styles/global.css`, add a CSS variable under `:root`:

```css
--accent-yours: #hexcolor;
```

Each simulation has its own accent color used for slider thumbs, info badge dots, nav underlines, and in-canvas highlights.

### 4. Register the tab in App.vue

Import and add to the tabs array:

```js
import YourSimulation from './components/simulations/YourSimulation.vue'

const tabs = [
  // ...existing tabs,
  { id: 'yours', label: 'Your Sim', color: 'var(--accent-yours)' },
]
```

Add conditional rendering in the template:

```html
<YourSimulation v-if="activeTab === 'yours'" />
```

If your simulation needs mouse position (like Boids for obstacle avoidance), pass it as a prop: `:mouse="mouse"`.

### Shared utilities

- **`useRK4.js`**: 4th-order Runge-Kutta integrator. Import `rk4Step(bodies, G, soften, dt, trailMax)` for gravitational simulations.
- **`hexToRgb(hex)`**: Convert hex color string to `{r, g, b}` for RGBA canvas operations.

### UI patterns

- **Controls bar** (`controls-bar`): Fixed bottom-center panel with `slider-group` for sliders, `ctrl-btn` for buttons, `ctrl-divider` for vertical separators.
- **Info badge** (`info-badge`): Top-right corner badge with pulsing dot. Use for mode/context information.
- **Canvas fade**: `ctx.fillStyle = 'rgba(7,8,15,0.42)'` for motion trail effects, or full opacity `#07080f` for clean redraws.
