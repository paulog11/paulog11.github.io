<script setup>
defineProps({
  results: { type: Array, default: () => [] },
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="visible" class="show-overlay" @click="emit('close')">
    <div class="show-items">
      <div v-for="(item, i) in results" :key="i" class="show-item">
        <div class="jp">{{ item.jp }}</div>
        <div class="reading">{{ item.reading || '' }}</div>
        <div class="en">{{ item.en }}</div>
      </div>
    </div>
    <span class="tap-hint">Tap anywhere to close</span>
  </div>
</template>
