<template>
  <div>
    <!-- Custom cursor -->
    <div class="cursor-wrap" :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }">
      <div class="cursor-inner"></div>
      <div class="cursor-outer"></div>
    </div>

    <!-- Nav -->
    <nav class="nav">
      <span class="wordmark">Algo&nbsp;Lab</span>
      <span class="wordmark-version">v{{ appVersion }}</span>
      <!-- Desktop: tab buttons -->
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-tab"
        :class="{ active: activeTab === tab.id }"
        :style="{ color: activeTab === tab.id ? tab.color : '' }"
        @click="switchTab(tab.id)"
      >
        <span class="dot" :style="{ background: tab.color }"></span>
        {{ tab.label }}
        <span class="underline"></span>
      </button>
      <!-- Mobile: dropdown -->
      <select class="nav-select" :value="activeTab" @change="switchTab($event.target.value)">
        <option v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.label }}</option>
      </select>
      <a href="../../../" class="nav-home">← Home</a>
    </nav>

    <!-- Simulation panels — only the active one is mounted -->
    <div class="sim-panel">
      <BoidsSimulation   v-if="activeTab === 'boids'"      :mouse="mouse" />
      <NBodySimulation   v-if="activeTab === 'nbody'"      />
      <TrisolarisSimulation v-if="activeTab === 'trisolaris'" />
<BigBangSimulation v-if="activeTab === 'bigbang'"    />
      <CurvatureSimulation v-if="activeTab === 'curvature'" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const appVersion = __APP_VERSION__
import BoidsSimulation     from './components/simulations/BoidsSimulation.vue'
import NBodySimulation     from './components/simulations/NBodySimulation.vue'
import TrisolarisSimulation from './components/simulations/TrisolarisSimulation.vue'
import BigBangSimulation   from './components/simulations/BigBangSimulation.vue'
import CurvatureSimulation from './components/simulations/CurvatureSimulation.vue'

const tabs = [
  { id: 'boids',      label: 'Boids',      color: 'var(--accent-boids)' },
  { id: 'nbody',      label: 'N-Body',     color: 'var(--accent-nbody)' },
  { id: 'trisolaris', label: 'Trisolaris', color: 'var(--accent-tri)'   },
{ id: 'bigbang',    label: 'Big Bang',   color: 'var(--accent-bang)'  },
  { id: 'curvature',  label: 'Curvature',  color: 'var(--accent-curve)' },
]

const activeTab = ref('boids')
const cursor = reactive({ x: -999, y: -999 })
// Mouse position passed to Boids for obstacle avoidance
const mouse = reactive({ x: -999, y: -999 })

function switchTab(id) { activeTab.value = id }

function onMouseMove(e) {
  cursor.x = e.clientX
  cursor.y = e.clientY
  mouse.x  = e.clientX
  mouse.y  = e.clientY
}

onMounted(()  => window.addEventListener('mousemove', onMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<style scoped>
.nav-home {
  margin-left: auto;
  padding: 0 20px;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-home:hover { color: var(--text); }

.nav-select {
  display: none;
}

@media (max-width: 640px) {
  .nav-tab { display: none; }
  .nav-select {
    display: flex;
    align-items: center;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 6px 10px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
  .nav-select option {
    background: #07080f;
    color: rgba(255,255,255,0.85);
  }
}
</style>
