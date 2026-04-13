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
      <a href="../../../" class="nav-home">← Home</a>
    </nav>

    <!-- Simulation panels — only the active one is mounted -->
    <div class="sim-panel">
      <BoidsSimulation   v-if="activeTab === 'boids'"      :mouse="mouse" />
      <NBodySimulation   v-if="activeTab === 'nbody'"      />
      <TrisolarisSimulation v-if="activeTab === 'trisolaris'" />
      <DropletSimulation  v-if="activeTab === 'droplet'"     />
      <BigBangSimulation v-if="activeTab === 'bigbang'"    />
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
import DropletSimulation   from './components/simulations/DropletSimulation.vue'

const tabs = [
  { id: 'boids',      label: 'Boids',      color: 'var(--accent-boids)' },
  { id: 'nbody',      label: 'N-Body',     color: 'var(--accent-nbody)' },
  { id: 'trisolaris', label: 'Trisolaris', color: 'var(--accent-tri)'   },
  { id: 'droplet',    label: 'Droplet',    color: 'var(--accent-droplet)' },
  { id: 'bigbang',    label: 'Big Bang',   color: 'var(--accent-bang)'  },
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
</style>
