<template>
  <div class="era-filter">
    <div class="mode-toggle">
      <button
        :class="['mode-btn', { active: historyMode === 'events' }]"
        @click="$emit('update:historyMode', 'events')"
      >Events</button>
      <button
        :class="['mode-btn', { active: historyMode === 'cities' }]"
        @click="$emit('update:historyMode', 'cities')"
      >City History</button>
    </div>

    <template v-if="historyMode === 'events'">
      <div class="divider" />
      <span class="era-label">Era:</span>
      <button
        v-for="option in options"
        :key="option.value"
        :class="['era-btn', { active: activeEra === option.value }]"
        @click="$emit('update:activeEra', option.value)"
      >
        {{ option.label }}
      </button>
    </template>
  </div>
</template>

<script setup>
defineProps({
  activeEra: {
    type: String,
    required: true
  },
  historyMode: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeEra', 'update:historyMode'])

const options = [
  { value: 'all', label: 'All' },
  { value: 'ancient', label: 'Ancient (–710)' },
  { value: 'classical', label: 'Classical (710–1185)' },
  { value: 'medieval', label: 'Medieval (1185–1615)' },
  { value: 'edo', label: 'Edo (1603–1868)' },
  { value: 'modern', label: 'Modern (1868–1945)' },
  { value: 'postwar', label: 'Postwar (1945–)' }
]
</script>

<style scoped>
.era-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #1a1a2e;
  border-bottom: 1px solid #2a2a4e;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.era-filter::-webkit-scrollbar {
  display: none;
}

.mode-toggle {
  display: flex;
  gap: 2px;
  background: #0d0d1a;
  border-radius: 5px;
  padding: 2px;
  flex-shrink: 0;
}

.mode-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 3px;
  background: transparent;
  color: #888;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.mode-btn:hover {
  color: #ccc;
}

.mode-btn.active {
  background: #6c5ce7;
  color: #fff;
}

.divider {
  width: 1px;
  height: 20px;
  background: #2a2a4e;
  flex-shrink: 0;
}

.era-label {
  color: #aaa;
  font-size: 13px;
  white-space: nowrap;
}

.era-btn {
  padding: 6px 14px;
  border: 1px solid #444;
  border-radius: 4px;
  background: transparent;
  color: #ccc;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}

.era-btn:hover {
  background: #2a2a4e;
  border-color: #666;
  color: #fff;
}

.era-btn.active {
  background: #c0392b;
  border-color: #c0392b;
  color: #fff;
  font-weight: 600;
}
</style>
