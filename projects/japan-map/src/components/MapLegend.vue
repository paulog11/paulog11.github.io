<template>
  <div class="map-legend">
    <div class="legend-title">Event Type</div>
    <div
      v-for="(color, category) in categoryColors"
      :key="category"
      :class="['legend-item', { inactive: !activeCategories.includes(category) }]"
      :title="activeCategories.includes(category) ? `Hide ${categoryLabels[category]}` : `Show ${categoryLabels[category]}`"
      @click="$emit('toggle-category', category)"
    >
      <span class="legend-dot" :style="{ background: activeCategories.includes(category) ? color : '#ccc' }" />
      <span class="legend-label">{{ categoryLabels[category] }}</span>
    </div>
  </div>
</template>

<script setup>
import { categoryColors, categoryLabels } from '../constants.js'

defineProps({
  activeCategories: {
    type: Array,
    required: true
  }
})
defineEmits(['toggle-category'])
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
  cursor: pointer;
  border-radius: 3px;
  padding: 2px 4px;
  transition: background 0.15s;
  user-select: none;
}

.legend-item:last-child {
  margin-bottom: 0;
}

.legend-item:hover {
  background: rgba(0,0,0,0.06);
}

.legend-item.inactive .legend-label {
  color: #aaa;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.15);
  transition: background 0.2s;
}

.legend-label {
  font-size: 12px;
  color: #333;
  text-transform: capitalize;
  transition: color 0.2s;
}
</style>
