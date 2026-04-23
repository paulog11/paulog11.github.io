<template>
  <div class="era-filter">
    <span class="era-label">Filter by operator:</span>
    <button
      v-for="option in options"
      :key="option.value"
      :class="['era-btn', { active: activeOperator === option.value }]"
      @click="$emit('update:activeOperator', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeOperator: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeOperator'])

const options = [
  { value: 'all', label: 'All' },
  { value: 'jr', label: 'JR East' },
  { value: 'metro', label: 'Tokyo Metro' },
  { value: 'toei', label: 'Toei Subway' },
  { value: 'private', label: 'Private Railways' }
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

.era-label {
  color: #aaa;
  font-size: 13px;
  margin-right: 4px;
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
  background: #0078c8;
  border-color: #0078c8;
  color: #fff;
  font-weight: 600;
}
</style>
