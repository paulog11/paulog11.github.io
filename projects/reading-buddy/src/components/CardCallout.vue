<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  tone: { type: String, default: 'amber' }, // 'amber' | 'gold'
})

const toneClasses = {
  amber: { border: 'border-amber-600/70', heading: 'text-amber-700' },
  gold: { border: 'border-gold-400/60', heading: 'text-gold-400/80' },
}

const classes = computed(() => toneClasses[props.tone])
</script>

<template>
  <div :class="['border-l-2 pl-4', classes.border]">
    <h4 :class="['text-xs font-mono uppercase tracking-wider mb-2', classes.heading]">{{ title }}</h4>
    <slot />
  </div>
</template>
