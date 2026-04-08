<script setup>
import { computed } from 'vue'
import ConceptCard from './ConceptCard.vue'
import { coverImages } from '../assets/coverImages.js'

const props = defineProps({
  book: { type: Object, required: true },
  concepts: { type: Array, required: true },
  activeConceptId: { type: String, default: null },
})

const emit = defineEmits(['select'])

const activeConcept = computed(() =>
  props.concepts.find((c) => c.id === props.activeConceptId) || null
)
</script>

<template>
  <div>
    <!-- Landing state: no concept selected -->
    <div v-if="!activeConcept" class="text-center py-16 px-4">
      <div class="mb-6 flex justify-center">
        <img
          v-if="coverImages[book.id]"
          :src="coverImages[book.id]"
          :alt="book.title"
          class="w-24 h-32 object-cover rounded shadow-md"
        />
        <div v-else class="text-5xl">{{ book.coverEmoji || '&#128214;' }}</div>
      </div>
      <h2 class="font-serif text-3xl text-silver-100 mb-2">
        {{ book.title }}
      </h2>
      <p class="text-silver-400 mb-1">by {{ book.author }}</p>
      <p class="text-silver-500 text-sm max-w-md mx-auto mt-4 mb-8">
        {{ book.description }}
      </p>
      <p class="text-silver-500 text-sm mb-6">Select a concept from the sidebar, or choose one below.</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-2xl mx-auto">
        <button
          v-for="concept in concepts"
          :key="concept.id"
          @click="emit('select', concept.id)"
          class="text-left px-3 py-2 rounded-lg bg-forest-900/40 border border-forest-700/30 hover:border-gold-400/40 hover:bg-forest-800/60 transition-all"
        >
          <span class="text-silver-400 font-mono text-xs block">{{ concept.japanese }}</span>
          <span class="text-silver-200 text-sm">{{ concept.title }}</span>
        </button>
      </div>
    </div>

    <!-- Single concept view -->
    <div v-else class="max-w-3xl mx-auto">
      <ConceptCard :concept="activeConcept" />
    </div>
  </div>
</template>
