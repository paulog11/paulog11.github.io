<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container" />
    <MapLegend v-if="historyMode === 'events'" :activeCategories="activeCategories" @toggle-category="toggleCategory" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import events from '../data/events.json'
import cities from '../data/cities.json'
import { categoryColors, categoryLabels, tileLayers } from '../constants.js'
import MapLegend from './MapLegend.vue'

const props = defineProps({
  activeEra: {
    type: String,
    required: true
  },
  mapLang: {
    type: String,
    required: true
  },
  historyMode: {
    type: String,
    required: true
  }
})

const mapContainer = ref(null)
const eventMarkers = ref([])
const cityMarkers = ref([])
const activeTileLayer = ref(null)
const activeCategories = ref(Object.keys(categoryColors))
let map = null

function toggleCategory(category) {
  if (activeCategories.value.includes(category)) {
    activeCategories.value = activeCategories.value.filter(c => c !== category)
  } else {
    activeCategories.value = [...activeCategories.value, category]
  }
}

function popupMaxWidth(max) {
  return Math.min(Math.floor(window.innerWidth * 0.85), max)
}

function makeEventIcon(category) {
  const color = categoryColors[category] || '#888'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z"
      fill="${color}" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="5" fill="#fff" opacity="0.9"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [0, -36]
  })
}

function makeCityIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <circle cx="16" cy="16" r="14" fill="#6c5ce7" stroke="#fff" stroke-width="2"/>
    <circle cx="16" cy="16" r="6" fill="#fff" opacity="0.95"/>
  </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20]
  })
}

function buildEventPopup(event) {
  const siteHtml = event.contemporarySite
    ? `<div class="event-site">
        <strong>Visit today:</strong> ${event.contemporarySite.name}
        <br>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.contemporarySite.query)}"
           target="_blank" rel="noopener noreferrer" class="maps-link">View on Google Maps →</a>
      </div>`
    : ''

  return `
    <div class="event-popup">
      <h3>${event.name}</h3>
      <div class="event-meta">
        <span class="event-year">${event.year}</span>
        <span class="event-period">${event.period} Period</span>
        <span class="event-category">${event.category}</span>
      </div>
      <p class="event-description">${event.description}</p>
      ${siteHtml}
    </div>
  `
}

function buildCityPopup(city) {
  const historicalNote = city.historicalName
    ? ` <span class="historical-name">(formerly ${city.historicalName})</span>`
    : ''
  const paragraphs = city.description.map(p => `<p class="city-para">${p}</p>`).join('')
  return `
    <div class="city-popup">
      <h3>${city.name}${historicalNote}</h3>
      <div class="city-body">${paragraphs}</div>
    </div>
  `
}

function updateMarkers(era, mode) {
  const showEvents = mode === 'events'
  const cats = activeCategories.value

  eventMarkers.value.forEach(({ marker, event }) => {
    const visible = showEvents && (era === 'all' || event.era === era) && cats.includes(event.category)
    if (visible) marker.addTo(map)
    else marker.remove()
  })

  cityMarkers.value.forEach(({ marker }) => {
    if (!showEvents) marker.addTo(map)
    else marker.remove()
  })
}

function swapTileLayer(lang) {
  if (activeTileLayer.value) {
    activeTileLayer.value.remove()
  }
  const { url, attribution } = tileLayers[lang]
  activeTileLayer.value = L.tileLayer(url, { attribution, maxZoom: 18 }).addTo(map)
}

onMounted(() => {
  map = L.map(mapContainer.value).setView([36.5, 137.5], 6)

  const { url, attribution } = tileLayers[props.mapLang]
  activeTileLayer.value = L.tileLayer(url, { attribution, maxZoom: 18 }).addTo(map)

  eventMarkers.value = events.map(event => {
    const marker = L.marker([event.lat, event.lng], { icon: makeEventIcon(event.category) })
      .bindPopup(buildEventPopup(event), { maxWidth: popupMaxWidth(340) })
      .bindTooltip(event.name, { direction: 'top', offset: [0, -32] })
    marker.addTo(map)
    return { marker, event }
  })

  cityMarkers.value = cities.map(city => {
    const marker = L.marker([city.lat, city.lng], { icon: makeCityIcon() })
      .bindPopup(buildCityPopup(city), { maxWidth: popupMaxWidth(400) })
      .bindTooltip(city.name, { direction: 'top', offset: [0, -18] })
    return { marker, city }
  })
})

watch(() => props.activeEra, era => updateMarkers(era, props.historyMode))
watch(() => props.historyMode, mode => updateMarkers(props.activeEra, mode))
watch(activeCategories, () => updateMarkers(props.activeEra, props.historyMode))
watch(() => props.mapLang, swapTileLayer)
</script>

<style>
.map-wrapper {
  flex: 1;
  position: relative;
  width: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
}

/* Event popup styles */
.event-popup {
  font-family: system-ui, sans-serif;
  min-width: 240px;
}

.event-popup h3 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.event-meta span {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 3px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.event-year {
  background: #1a1a2e;
  color: #fff;
}

.event-period {
  background: #eee;
  color: #444;
}

.event-category {
  background: #f0e6d3;
  color: #7a4a1e;
}

.event-description {
  margin: 0 0 10px;
  font-size: 13px;
  color: #333;
  line-height: 1.5;
}

.event-site {
  font-size: 12px;
  color: #444;
  border-top: 1px solid #e8e8e8;
  padding-top: 8px;
  line-height: 1.6;
}

.maps-link {
  color: #2980b9;
  text-decoration: none;
  font-weight: 600;
}

.maps-link:hover {
  text-decoration: underline;
}

/* City popup styles */
.city-popup {
  font-family: system-ui, sans-serif;
  min-width: 300px;
}

.city-popup h3 {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.historical-name {
  font-size: 13px;
  font-weight: 400;
  color: #666;
}

.city-body {
  max-height: 340px;
  overflow-y: auto;
  padding-right: 4px;
}

.city-para {
  margin: 0 0 10px;
  font-size: 13px;
  color: #333;
  line-height: 1.6;
}

.city-para:last-child {
  margin-bottom: 0;
}
</style>
