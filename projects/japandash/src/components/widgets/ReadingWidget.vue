<template>
  <WidgetFrame title="Reading Practice" icon="📖" span="double" collapsible>
    <div class="space-y-3">
      <!-- Passage selector -->
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5 overflow-x-auto flex-1">
          <button
            v-for="(p, i) in passages"
            :key="p.id"
            class="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors"
            :class="currentIndex === i
              ? 'bg-ai text-white border-ai'
              : 'border-koshi text-sumi hover:bg-koshi/40'"
            @click="currentIndex = i"
          >
            {{ p.title }}
          </button>
        </div>
        <span class="px-1.5 py-0.5 text-[0.55rem] rounded bg-ai-light text-ai font-medium">
          {{ currentPassage.level }}
        </span>
      </div>

      <!-- Furigana controls -->
      <div class="flex items-center gap-2">
        <span class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi">Furigana:</span>
        <button
          v-for="mode in ['show', 'hover', 'hide']"
          :key="mode"
          class="px-2 py-0.5 text-[0.65rem] rounded border transition-colors"
          :class="furiganaMode === mode ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
          @click="furiganaMode = mode"
        >
          {{ mode === 'show' ? 'Show' : mode === 'hover' ? 'Hover' : 'Hide' }}
        </button>
      </div>

      <!-- Reading passage -->
      <div class="rounded-lg bg-koshi/20 p-4">
        <h3 class="font-display text-lg font-semibold mb-1">{{ currentPassage.title }}</h3>
        <p class="text-xs text-usuzumi mb-3">{{ currentPassage.titleEn }}</p>
        <div
          class="text-base leading-relaxed font-body"
          :class="{ 'furigana-hover': furiganaMode === 'hover' }"
        >
          <template v-if="furiganaMode === 'hide'">
            {{ currentPassage.content }}
          </template>
          <template v-else>
            <span v-html="renderWithFurigana(currentPassage)" />
          </template>
        </div>
      </div>

      <!-- Vocabulary -->
      <details>
        <summary class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi cursor-pointer hover:text-sumi">
          Vocabulary ({{ currentPassage.vocabulary.length }} words)
        </summary>
        <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
          <div
            v-for="v in currentPassage.vocabulary"
            :key="v.word"
            class="flex items-baseline gap-2 px-2 py-1 rounded bg-white/50 text-sm"
          >
            <span class="font-medium">{{ v.word }}</span>
            <span class="text-usuzumi text-xs">{{ v.reading }}</span>
            <span class="text-xs text-sumi/70 ml-auto">{{ v.meaning }}</span>
          </div>
        </div>
      </details>

      <!-- Comprehension questions -->
      <details>
        <summary class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi cursor-pointer hover:text-sumi">
          Comprehension Questions ({{ currentPassage.questions.length }})
        </summary>
        <div class="mt-2 space-y-2">
          <div
            v-for="(q, i) in currentPassage.questions"
            :key="i"
            class="rounded-md bg-white/50 px-3 py-2"
          >
            <p class="text-sm font-body mb-1">{{ q.q }}</p>
            <p class="text-xs text-usuzumi italic mb-1">{{ q.qEn }}</p>
            <button
              class="text-xs text-ai hover:underline"
              @click="toggleAnswer(i)"
            >
              {{ revealedAnswers.has(i) ? 'Hide answer' : 'Show answer' }}
            </button>
            <div v-if="revealedAnswers.has(i)" class="mt-1 pl-2 border-l-2 border-matcha/40">
              <p class="text-sm font-body">{{ q.a }}</p>
              <p class="text-xs text-usuzumi">{{ q.aEn }}</p>
            </div>
          </div>
        </div>
      </details>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button
          class="px-3 py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors disabled:opacity-40"
          :disabled="currentIndex === 0"
          @click="currentIndex--; revealedAnswers.clear()"
        >
          ← Previous
        </button>
        <button
          class="px-3 py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors disabled:opacity-40"
          :disabled="currentIndex === passages.length - 1"
          @click="currentIndex++; revealedAnswers.clear()"
        >
          Next →
        </button>
      </div>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { passages } from '../../data/reading-passages.js'

const currentIndex = ref(0)
const furiganaMode = ref('hover')
const revealedAnswers = reactive(new Set())

const currentPassage = computed(() => passages[currentIndex.value])

function toggleAnswer(i) {
  if (revealedAnswers.has(i)) {
    revealedAnswers.delete(i)
  } else {
    revealedAnswers.add(i)
  }
}

function renderWithFurigana(passage) {
  let text = passage.content
  const vocab = [...passage.vocabulary].sort((a, b) => b.word.length - a.word.length)
  for (const v of vocab) {
    text = text.replaceAll(v.word, `<ruby>${v.word}<rt>${v.reading}</rt></ruby>`)
  }
  return text
}
</script>

<style scoped>
.furigana-hover :deep(ruby) rt {
  visibility: hidden;
}
.furigana-hover :deep(ruby):hover rt {
  visibility: visible;
}
</style>
