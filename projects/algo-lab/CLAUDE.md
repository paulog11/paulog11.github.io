# Algo Lab

Canvas-based algorithm simulation lab with 6 tabbed visualizations.

## Tech Stack
- Vue 3 (Composition API), Vite 5, HTML5 Canvas 2D
- Custom CSS with CSS variables (Space Mono + Syne fonts)
- No external physics/rendering libraries

## Simulations

| Tab | Accent Color | Description |
|-----|-------------|-------------|
| Boids | `--accent-boids` #7eb8f7 | Flocking algorithm + Shinjuku Station B1F pedestrian mode |
| N-Body | `--accent-nbody` #f7a96e | Gravitational simulation, click to add bodies, presets (Figure-8, Orbit) |
| Trisolaris | `--accent-tri` #e8c87a | Three-body problem narrative from Liu Cixin's novel, 5 event scenarios |
| Droplet | `--accent-droplet` #7af0f0 | Droplet Attack from "The Dark Forest", 5 phase narrative, fleet destruction |
| Big Bang | `--accent-bang` #c084fc | Universe fine-tuning explorer, 10 physical constants, 10 outcomes |
| Curvature | `--accent-curve` #4fffb0 | Curvature drive (geometric phase locomotion), shape-space inset, 3-body gravity |

## Key Files
- `src/App.vue` — tab navigation, mouse tracking, simulation mounting
- `src/styles/global.css` — theme, accent colors, controls bar, info badge, cursor
- `src/composables/useRK4.js` — shared RK4 physics integrator + `hexToRgb` utility
- `src/components/simulations/` — one Vue component per simulation
- Helper subdirectories: `boids/station.js`, `trisolaris/events.js`, `droplet/events.js`, `droplet/fleet.js`, `bigbang/constants.js`, `curvature/physics.js`

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`

## Patterns
- Every simulation: `<canvas ref="canvasEl">` + `requestAnimationFrame(loop)` + `resize()` on window resize
- Controls bar: fixed bottom, sliders + buttons, custom range thumb matching accent color
- Info badge: top-right context hint with glowing dot
- Simulations receive `mouse` prop (reactive x/y from App.vue)

## Adding a New Simulation
1. Create `src/components/simulations/MySimulation.vue` (canvas + controls bar + info badge)
2. Add accent color `--accent-mysim` in `src/styles/global.css`
3. In `src/App.vue`: import component, add to `tabs` array `{ id, label, color }`, add `<MySimulation v-if="activeTab === 'mysim'" :mouse="mouse" />` in template
4. Optional: create `src/components/simulations/mysim/` subdirectory for data/helpers
5. For physics: import `rk4Step` from `../../composables/useRK4.js`
