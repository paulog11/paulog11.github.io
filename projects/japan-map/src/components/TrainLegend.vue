<template>
  <div class="map-legend">
    <div class="legend-title">Lines</div>
    <div v-for="line in lines" :key="line.id" class="legend-item">
      <span class="legend-line" :style="{ background: line.color }" />
      <span class="legend-label">{{ line.name }}</span>
    </div>
  </div>
</template>

<script setup>
import lines from '../data/lines.json'
</script>

<style scoped>
.map-legend {
  position: absolute;
  bottom: 30px;
  right: 10px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  pointer-events: none;
  max-height: 60vh;
  overflow-y: auto;
}

.legend-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #555;
  margin-bottom: 7px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-line {
  width: 20px;
  height: 4px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-label {
  font-size: 11px;
  color: #333;
  white-space: nowrap;
}
</style>
