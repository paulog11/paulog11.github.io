<script setup>
import { ref } from 'vue'

const props = defineProps({
  character: { type: Object, required: true },
  allCharacters: { type: Object, required: true },
})

const showEvents = ref(false)

function resolveCharacterName(key) {
  const c = props.allCharacters[key]
  return c ? c.shortName : key
}
</script>

<template>
  <div class="bg-forest-900 border border-forest-700 rounded-lg p-5 animate-fade-in">
    <!-- Header -->
    <div class="mb-3">
      <h3 class="font-serif text-lg text-gold-400 font-bold leading-tight">
        {{ character.shortName }}
      </h3>
      <p class="text-silver-400 text-xs font-mono uppercase tracking-wider mt-0.5">
        {{ character.epithet }}
      </p>
    </div>

    <!-- Description -->
    <p class="text-silver-300 text-sm leading-relaxed mb-3">
      {{ character.description }}
    </p>

    <!-- Traits -->
    <div v-if="character.traits.length" class="flex flex-wrap gap-1.5 mb-3">
      <span
        v-for="trait in character.traits"
        :key="trait"
        class="bg-forest-800 text-silver-300 px-2 py-0.5 rounded-full text-xs"
      >
        {{ trait }}
      </span>
    </div>

    <!-- Relationships -->
    <div v-if="character.relationships.length" class="mb-3">
      <h4 class="text-silver-400 text-xs font-mono uppercase tracking-wider mb-1.5">
        Relationships
      </h4>
      <ul class="space-y-1">
        <li
          v-for="rel in character.relationships"
          :key="`${rel.to}-${rel.type}`"
          class="text-sm text-silver-300"
        >
          <span class="text-gold-400">{{ rel.type }}</span>
          <span class="text-silver-500"> &mdash; </span>
          <span>{{ resolveCharacterName(rel.to) }}</span>
          <span v-if="rel.note" class="text-silver-500 text-xs block ml-4">
            {{ rel.note }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Events (collapsible) -->
    <div v-if="character.events.length">
      <button
        @click="showEvents = !showEvents"
        class="text-xs font-mono uppercase tracking-wider text-silver-500 hover:text-silver-300 transition-colors flex items-center gap-1"
      >
        <span class="inline-block transition-transform" :class="{ 'rotate-90': showEvents }">
          &#9654;
        </span>
        Key Events ({{ character.events.length }})
      </button>
      <Transition name="slide">
        <ul v-if="showEvents" class="mt-2 space-y-1 pl-4 border-l border-forest-700">
          <li
            v-for="(event, i) in character.events"
            :key="i"
            class="text-sm text-silver-400"
          >
            {{ event }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
