<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container" />
    <TrainLegend />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'
import stations from '../data/stations.json'
import lines from '../data/lines.json'
import { operatorColors, operatorLabels, tileLayers } from '../constants.js'
import TrainLegend from './TrainLegend.vue'

const props = defineProps({
  activeOperator: {
    type: String,
    required: true
  },
  mapLang: {
    type: String,
    required: true
  }
})

const mapContainer = ref(null)
const stationMarkers = ref([])
const linePolylines = ref([])
const activeTileLayer = ref(null)
let map = null

const linesById = Object.fromEntries(lines.map(l => [l.id, l]))

function buildStationPopup(station) {
  const name = props.mapLang === 'ja' ? station.nameJa : station.name
  const operatorLabel = operatorLabels[station.operator]
  const lineList = station.lines
    .map(lineId => {
      const line = linesById[lineId]
      if (!line) return lineId
      const lineName = props.mapLang === 'ja' ? line.nameJa : line.name
      return `<li style="color:${line.color};"><span style="color:#333;">${lineName}</span></li>`
    })
    .join('')

  return `
    <div class="station-popup">
      <h3>${name}</h3>
      <div class="station-meta">
        <span class="station-operator" style="background:${operatorColors[station.operator]}">${operatorLabel}</span>
      </div>
      <div class="station-lines">
        <strong>Lines:</strong>
        <ul>${lineList}</ul>
      </div>
    </div>
  `
}

function updateVisibility(operator) {
  linePolylines.value.forEach(({ polyline, line }) => {
    if (operator === 'all' || line.operator === operator) {
      polyline.addTo(map)
    } else {
      polyline.remove()
    }
  })
  stationMarkers.value.forEach(({ marker, station }) => {
    if (operator === 'all' || station.operator === operator) {
      marker.addTo(map)
    } else {
      marker.remove()
    }
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
  map = L.map(mapContainer.value).setView([35.68, 139.69], 11)

  const { url, attribution } = tileLayers[props.mapLang]
  activeTileLayer.value = L.tileLayer(url, { attribution, maxZoom: 18 }).addTo(map)

  linePolylines.value = lines.map(line => {
    const polyline = L.polyline(line.coordinates, {
      color: line.color,
      weight: 3,
      opacity: 0.85
    }).addTo(map)
    return { polyline, line }
  })

  stationMarkers.value = stations.map(station => {
    const line = station.lines[0] ? linesById[station.lines[0]] : null
    const color = line ? line.color : operatorColors[station.operator]
    const tooltipName = props.mapLang === 'ja' ? station.nameJa : station.name
    const marker = L.circleMarker([station.lat, station.lng], {
      radius: 5,
      fillColor: color,
      fillOpacity: 0.9,
      color: '#fff',
      weight: 1.5
    })
      .bindPopup(buildStationPopup(station), { maxWidth: Math.min(Math.floor(window.innerWidth * 0.85), 300) })
      .bindTooltip(tooltipName, { direction: 'top', offset: [0, -8] })
      .addTo(map)
    return { marker, station }
  })
})

watch(() => props.activeOperator, updateVisibility)
watch(() => props.mapLang, (lang) => {
  swapTileLayer(lang)
  stationMarkers.value.forEach(({ marker, station }) => {
    marker.setPopupContent(buildStationPopup(station))
    marker.setTooltipContent(lang === 'ja' ? station.nameJa : station.name)
  })
})
</script>

<style>
/* Reuse map-wrapper and map-container from MapView */

/* Station popup styles (not scoped — Leaflet renders outside Vue DOM) */
.station-popup {
  font-family: system-ui, sans-serif;
  min-width: 200px;
}

.station-popup h3 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.3;
}

.station-meta {
  margin-bottom: 8px;
}

.station-operator {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 3px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #fff;
}

.station-lines {
  font-size: 13px;
  color: #333;
}

.station-lines strong {
  display: block;
  margin-bottom: 4px;
}

.station-lines ul {
  margin: 0;
  padding-left: 18px;
  list-style: disc;
}

.station-lines li {
  margin-bottom: 2px;
  font-size: 12px;
}
</style>
