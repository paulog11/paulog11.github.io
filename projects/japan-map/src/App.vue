<template>
  <div class="app">
    <header class="app-header">
      <div class="header-left">
        <h1>{{ activeView === 'history' ? 'Japan History Map' : 'Tokyo Trains' }}</h1>
        <div class="view-toggle">
          <button
            :class="['view-btn', { active: activeView === 'history' }]"
            @click="activeView = 'history'"
          >History</button>
          <button
            :class="['view-btn', { active: activeView === 'trains' }]"
            @click="activeView = 'trains'"
          >Trains</button>
        </div>
      </div>
      <button class="lang-toggle" @click="toggleLang">
        {{ mapLang === 'ja' ? 'EN' : '日本語' }}
      </button>
    </header>
    <EraFilter v-if="activeView === 'history'" v-model:activeEra="activeEra" v-model:historyMode="historyMode" />
    <LineFilter v-if="activeView === 'trains'" v-model:activeOperator="activeOperator" />
    <MapView v-if="activeView === 'history'" :activeEra="activeEra" :mapLang="mapLang" :historyMode="historyMode" />
    <TrainMapView v-if="activeView === 'trains'" :activeOperator="activeOperator" :mapLang="mapLang" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import EraFilter from './components/EraFilter.vue'
import LineFilter from './components/LineFilter.vue'
import MapView from './components/MapView.vue'
import TrainMapView from './components/TrainMapView.vue'

const activeView = ref('history')
const activeEra = ref('all')
const historyMode = ref('events')
const activeOperator = ref('all')
const mapLang = ref('ja')

function toggleLang() {
  mapLang.value = mapLang.value === 'ja' ? 'en' : 'ja'
}

function serializeState() {
  return new URLSearchParams({
    view: activeView.value,
    era: activeEra.value,
    mode: historyMode.value,
    operator: activeOperator.value,
    lang: mapLang.value
  }).toString()
}

function applyState(params) {
  if (!params) return
  const p = new URLSearchParams(params)
  const view = p.get('view')
  const era = p.get('era')
  const mode = p.get('mode')
  const operator = p.get('operator')
  const lang = p.get('lang')
  if (view && ['history', 'trains'].includes(view)) activeView.value = view
  if (era) activeEra.value = era
  if (mode && ['events', 'cities'].includes(mode)) historyMode.value = mode
  if (operator) activeOperator.value = operator
  if (lang && ['ja', 'en'].includes(lang)) mapLang.value = lang
}

function persistState() {
  const s = serializeState()
  location.hash = s
  localStorage.setItem('japanMapState', s)
}

onMounted(() => {
  const hash = location.hash.slice(1)
  if (hash && new URLSearchParams(hash).get('view')) {
    applyState(hash)
  } else {
    const saved = localStorage.getItem('japanMapState')
    if (saved) applyState(saved)
  }
})

watch([activeView, activeEra, historyMode, activeOperator, mapLang], persistState)

window.addEventListener('hashchange', () => {
  applyState(location.hash.slice(1))
})
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0d0d1a;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a2e;
  padding: 10px 16px;
  border-bottom: 1px solid #2a2a4e;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-header h1 {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.view-toggle {
  display: flex;
  gap: 2px;
  background: #0d0d1a;
  border-radius: 5px;
  padding: 2px;
}

.view-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #888;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.view-btn:hover {
  color: #ccc;
}

.view-btn.active {
  background: #2a2a4e;
  color: #fff;
}

.lang-toggle {
  padding: 5px 14px;
  border: 1px solid #555;
  border-radius: 4px;
  background: transparent;
  color: #ccc;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.lang-toggle:hover {
  background: #2a2a4e;
  border-color: #888;
  color: #fff;
}
</style>
