<script setup>
import TransformResultCard from './TransformResultCard.vue'

defineProps({
  results: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null }
})

const emit = defineEmits(['show'])
</script>

<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <div v-else-if="error" class="error-msg">{{ error }}</div>

    <template v-else-if="results.length > 0">
      <div style="display:flex;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.72rem;color:var(--muted);font-family:'DM Mono',monospace;letter-spacing:0.08em;">RESULTS</span>
        <button class="show-btn" @click="emit('show')">Show to someone ↗</button>
      </div>
      <div class="results">
        <TransformResultCard v-for="(item, i) in results" :key="i" :item="item" />
      </div>
    </template>
  </div>
</template>
