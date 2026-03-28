<script setup>
const props = defineProps({
  concepts: { type: Array, required: true },
  activeConceptId: { type: String, default: null },
})

const emit = defineEmits(['select'])
</script>

<template>
  <div class="space-y-0.5">
    <button
      v-for="concept in concepts"
      :key="concept.id"
      @click="emit('select', concept.id)"
      :class="[
        'w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center gap-2 cursor-pointer',
        activeConceptId === concept.id
          ? 'bg-forest-800 text-silver-100 ring-1 ring-gold-400/50'
          : 'text-silver-300 hover:bg-forest-800/50 hover:text-silver-100',
      ]"
    >
      <span class="flex-shrink-0 text-silver-400 font-mono text-xs">{{ concept.japanese }}</span>
      <span class="truncate">{{ concept.title }}</span>
    </button>
  </div>
</template>
