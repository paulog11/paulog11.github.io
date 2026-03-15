<template>
  <WidgetFrame title="Jisho Dictionary" icon="辞" collapsible>
    <div class="space-y-3">
      <!-- Search bar -->
      <div class="relative">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search Japanese or English..."
          class="w-full px-3 py-2 pl-9 text-sm rounded-md border border-koshi bg-white/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-2 focus:ring-ai/30 focus:border-ai/50"
          @input="jisho.search(searchInput)"
        />
        <svg class="absolute left-2.5 top-2.5 w-4 h-4 text-usuzumi/50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      <!-- Loading -->
      <div v-if="jisho.loading.value" class="flex justify-center py-4">
        <div class="w-4 h-4 border-2 border-ai/30 border-t-ai rounded-full animate-spin" />
      </div>

      <!-- Error -->
      <p v-else-if="jisho.error.value" class="text-beni text-xs text-center py-2">
        {{ jisho.error.value }}
      </p>

      <!-- Results -->
      <div v-else-if="jisho.results.value.length > 0" class="max-h-72 overflow-y-auto space-y-2 pr-1">
        <div
          v-for="(result, i) in jisho.results.value.slice(0, 15)"
          :key="i"
          class="rounded-md border border-koshi/60 px-3 py-2 hover:bg-koshi/20 transition-colors cursor-pointer"
          @click="toggleExpand(i)"
        >
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-body font-medium">{{ result.word }}</span>
            <span v-if="result.reading && result.reading !== result.word" class="text-sm text-usuzumi">
              {{ result.reading }}
            </span>
            <span v-if="result.isCommon" class="ml-auto px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wide rounded bg-matcha/15 text-matcha font-medium">
              common
            </span>
            <span
              v-for="tag in result.jlpt"
              :key="tag"
              class="px-1.5 py-0.5 text-[0.55rem] uppercase tracking-wide rounded bg-ai-light text-ai font-medium"
            >
              {{ tag.replace('jlpt-', '') }}
            </span>
          </div>
          <p class="text-sm text-sumi/80 mt-0.5">
            {{ result.senses[0]?.definitions.join(', ') }}
          </p>

          <!-- Expanded details -->
          <div v-if="expandedIndex === i" class="mt-2 pt-2 border-t border-koshi/40 space-y-1">
            <div
              v-for="(sense, si) in result.senses.slice(0, 5)"
              :key="si"
              class="text-xs"
            >
              <span class="text-usuzumi italic">{{ sense.partsOfSpeech.join(', ') }}</span>
              <span class="text-sumi ml-1">{{ sense.definitions.join('; ') }}</span>
            </div>
            <a
              :href="`https://jisho.org/search/${encodeURIComponent(result.word)}`"
              target="_blank"
              rel="noopener"
              class="inline-block mt-1 text-[0.65rem] text-ai hover:underline"
            >
              View on Jisho →
            </a>
          </div>
        </div>
      </div>

      <!-- Recent searches (when no query) -->
      <div v-else-if="!searchInput && jisho.recentSearches.value.length > 0">
        <p class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi mb-1.5">Recent</p>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="term in jisho.recentSearches.value"
            :key="term"
            class="px-2 py-1 text-xs rounded-md bg-koshi/50 text-sumi hover:bg-koshi transition-colors"
            @click="searchInput = term; jisho.search(term)"
          >
            {{ term }}
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <p v-else-if="!searchInput" class="text-center text-usuzumi text-xs py-4">
        Search for words, kanji, or English meanings
      </p>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useJisho } from '../../composables/useJisho.js'

const jisho = useJisho()
const searchInput = ref('')
const expandedIndex = ref(null)

function toggleExpand(i) {
  expandedIndex.value = expandedIndex.value === i ? null : i
}
</script>
