<script setup>
import CharacterGrid from './CharacterGrid.vue'

const props = defineProps({
  book: { type: Object, required: true },
  characterProfiles: { type: Array, required: true },
  progress: { type: Number, required: true },
  nextChapter: { type: Object, default: null },
  hasStarted: { type: Boolean, required: true },
})

const emit = defineEmits(['unlock-next'])
</script>

<template>
  <div>
    <!-- Welcome state -->
    <div v-if="!hasStarted" class="text-center py-16 px-4">
      <div class="text-6xl mb-6">&#128214;</div>
      <h2 class="font-serif text-3xl text-silver-100 mb-2">
        {{ book.title }}
      </h2>
      <p class="text-silver-400 mb-1">by {{ book.author }}</p>
      <p class="text-silver-500 text-sm max-w-md mx-auto mt-4 mb-8">
        Unlock chapters as you read to reveal character profiles, relationships, and key events. No spoilers ahead.
      </p>
      <button
        @click="emit('unlock-next')"
        class="bg-forest-700 hover:bg-forest-600 text-silver-100 font-serif px-6 py-3 rounded-lg transition-colors ring-1 ring-forest-600"
      >
        Begin Reading
      </button>
    </div>

    <!-- Active reading state -->
    <div v-else>
      <!-- Progress bar -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-2">
          <h2 class="font-serif text-xl text-silver-100">Characters</h2>
          <span class="text-xs font-mono text-silver-500">
            {{ Math.round(progress * 100) }}% read
          </span>
        </div>
        <div class="h-1 bg-forest-800 rounded-full overflow-hidden">
          <div
            class="h-full bg-forest-500 rounded-full transition-all duration-500"
            :style="{ width: `${progress * 100}%` }"
          />
        </div>
      </div>

      <!-- Unlock next chapter button -->
      <div v-if="nextChapter" class="mb-6">
        <button
          @click="emit('unlock-next')"
          class="bg-forest-800 hover:bg-forest-700 text-silver-200 text-sm px-4 py-2 rounded-lg transition-colors ring-1 ring-forest-700 hover:ring-gold-400/50 flex items-center gap-2"
        >
          <span class="text-gold-400">&#9654;</span>
          <span>
            Unlock: <span class="text-silver-300">{{ nextChapter.title }}</span>
          </span>
        </button>
      </div>

      <!-- Character grid -->
      <CharacterGrid
        :characters="characterProfiles"
        :allCharacters="book.characters"
      />

      <!-- Empty characters state -->
      <div
        v-if="characterProfiles.length === 0"
        class="text-center py-12 text-silver-500"
      >
        <p>No characters revealed yet. Unlock chapters to see them appear.</p>
      </div>
    </div>
  </div>
</template>
