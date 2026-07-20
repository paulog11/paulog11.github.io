<template>
  <WidgetFrame title="Kanji Mnemonics" icon="🈳" widget-id="kanji" collapsible :loading="wk.kanjiLoading.value">
    <template #default="{ focused }">

      <!-- Compact summary (dashboard tile) -->
      <div v-if="!focused" class="space-y-3">
        <div v-if="!wk.hasKey.value" class="text-center py-4 text-usuzumi text-sm space-y-1">
          <p class="text-2xl">🔑</p>
          <p>Add WaniKani key in Settings</p>
        </div>
        <template v-else>
          <div class="rounded-lg bg-koshi/20 p-3 space-y-1">
            <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi">To Review</p>
            <p class="text-4xl font-bold text-sumi">{{ wk.reviewKanji.value.length }}</p>
            <p class="text-[0.65rem] text-usuzumi">kanji not yet burned</p>
          </div>
          <div v-if="featuredKanji" class="flex items-baseline gap-2 px-2 py-1.5 rounded-md bg-koshi/20">
            <span class="font-display text-lg font-semibold">{{ featuredKanji.characters }}</span>
            <span class="font-mono text-xs text-usuzumi">{{ featuredKanji.primaryReading }}</span>
            <span class="text-xs text-sumi/80 ml-auto truncate">{{ featuredKanji.primaryMeaning }}</span>
          </div>
        </template>
      </div>

      <!-- Full review view (focused) -->
      <div v-else class="space-y-3">

      <!-- No API key -->
      <div v-if="!wk.hasKey.value" class="text-center py-6 text-usuzumi text-sm">
        <p class="text-2xl mb-2">🔑</p>
        <p>Add your WaniKani API key in Settings to load kanji.</p>
      </div>

      <!-- Error -->
      <div v-else-if="wk.kanjiError.value" class="text-center py-4 space-y-2">
        <p class="text-sm text-beni">{{ wk.kanjiError.value }}</p>
        <button
          class="px-3 py-1.5 text-xs rounded-md bg-beni/10 text-beni hover:bg-beni/20 transition-colors"
          @click="wk.fetchKanjiMnemonics(true)"
        >Retry</button>
      </div>

      <!-- Not yet loaded / nothing left to review -->
      <div v-else-if="wk.reviewKanji.value.length === 0 && !wk.kanjiLoading.value" class="text-center py-6 text-usuzumi text-sm">
        <p class="text-2xl mb-2">🎉</p>
        <p>No kanji left to review — everything's burned!</p>
      </div>

      <!-- Loaded -->
      <template v-else>
        <!-- SRS filter pills + review + refresh -->
        <div class="flex gap-1 flex-wrap items-center">
          <button
            v-for="stage in ['All', 'apprentice', 'guru', 'master', 'enlightened']"
            :key="stage"
            class="px-2 py-1 text-[0.6rem] rounded border transition-colors capitalize"
            :class="filterSrs === stage
              ? srsActiveClass(stage)
              : 'border-koshi text-usuzumi hover:bg-koshi/40'"
            @click="filterSrs = stage; selectedKanji = null"
          >
            {{ stage }}
          </button>
          <button
            class="ml-auto px-3 py-1 text-[0.6rem] rounded border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
            @click="showReviewModal = true"
          >
            🃏 Review Mnemonics
          </button>
          <button
            class="text-[0.65rem] text-usuzumi hover:text-sumi transition-colors"
            @click="wk.fetchKanjiMnemonics(true)"
          >↻ Refresh</button>
        </div>

        <!-- Count -->
        <p class="text-[0.65rem] text-usuzumi">
          {{ filteredKanji.length }} kanji
          <span v-if="filterSrs !== 'All'"> (filtered)</span>
        </p>

        <!-- Kanji list -->
        <div class="overflow-y-auto space-y-0.5 pr-1 max-h-[50vh]">
          <div v-for="item in filteredKanji" :key="item.subjectId">
            <div
              class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors"
              :class="selectedKanji?.subjectId === item.subjectId ? 'bg-ai-light/60' : 'hover:bg-koshi/30'"
              @click="toggleKanji(item)"
            >
              <span class="font-display text-base w-16 shrink-0">{{ item.characters }}</span>
              <span class="font-mono text-xs text-usuzumi w-20 shrink-0 truncate">{{ item.primaryReading }}</span>
              <span class="text-xs text-sumi flex-1 truncate">{{ item.primaryMeaning }}</span>
              <span class="text-[0.55rem] text-usuzumi shrink-0">Lv{{ item.level }}</span>
              <span
                class="text-[0.55rem] px-1.5 py-0.5 rounded-full font-medium shrink-0 capitalize"
                :style="srsBadgeStyle(item.srsLabel)"
              >{{ item.srsLabel }}</span>
              <span
                class="text-usuzumi text-xs shrink-0 transition-transform"
                :class="selectedKanji?.subjectId === item.subjectId ? 'rotate-180' : ''"
              >▾</span>
            </div>

            <!-- Expanded mnemonics -->
            <div v-if="selectedKanji?.subjectId === item.subjectId" class="px-3 py-2.5 mb-1 space-y-3 bg-koshi/20 rounded-md">
              <div>
                <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Meaning</p>
                <p class="text-sm leading-relaxed" v-html="renderMnemonic(item.meaningMnemonic)" />
                <p v-if="item.meaningHint" class="text-xs text-usuzumi mt-1.5 leading-relaxed" v-html="renderMnemonic(item.meaningHint)" />
              </div>
              <div>
                <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Reading</p>
                <p class="text-sm leading-relaxed" v-html="renderMnemonic(item.readingMnemonic)" />
                <p v-if="item.readingHint" class="text-xs text-usuzumi mt-1.5 leading-relaxed" v-html="renderMnemonic(item.readingHint)" />
              </div>
            </div>
          </div>
          <p v-if="filteredKanji.length === 0" class="text-center text-usuzumi text-xs py-4">
            No matches for this filter
          </p>
        </div>
      </template>
      </div><!-- end focused -->

    </template>
  </WidgetFrame>

  <KanjiReviewModal
    v-if="showReviewModal"
    :kanji-list="wk.reviewKanji.value"
    @close="showReviewModal = false"
  />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import KanjiReviewModal from './KanjiReviewModal.vue'
import { useWaniKani } from '../../composables/useWaniKani.js'
import { renderMnemonic } from '../../utils/mnemonic.js'

const wk = useWaniKani()

const filterSrs = ref('All')
const selectedKanji = ref(null)
const showReviewModal = ref(false)

// Trigger fetch once assignments are loaded
watch(
  () => wk.assignments.value.length,
  (len) => {
    if (len > 0 && wk.reviewKanji.value.length === 0 && !wk.kanjiLoading.value) {
      wk.fetchKanjiMnemonics()
    }
  },
  { immediate: true }
)

const featuredKanji = computed(() => wk.reviewKanji.value[0] ?? null)

const filteredKanji = computed(() => {
  let list = wk.reviewKanji.value
  if (filterSrs.value !== 'All') {
    list = list.filter(k => k.srsLabel === filterSrs.value)
  }
  return list
})

function toggleKanji(item) {
  selectedKanji.value = selectedKanji.value?.subjectId === item.subjectId ? null : item
}

// --- SRS color helpers (mirrors VocabWidget; no 'burned' entry — never present here) ---

const SRS_COLORS = {
  apprentice:  { bg: '#FFE5F5', text: '#DD0093' },
  guru:        { bg: '#F0E6FF', text: '#882D9E' },
  master:      { bg: '#E5EBFF', text: '#294DDB' },
  enlightened: { bg: '#E5F4FF', text: '#0093DD' },
}

function srsBadgeStyle(label) {
  const c = SRS_COLORS[label] ?? SRS_COLORS.apprentice
  return { backgroundColor: c.bg, color: c.text }
}

function srsActiveClass(stage) {
  const map = {
    All:         'bg-sumi text-white border-sumi',
    apprentice:  'border-[#DD0093] text-[#DD0093] bg-[#FFE5F5]',
    guru:        'border-[#882D9E] text-[#882D9E] bg-[#F0E6FF]',
    master:      'border-[#294DDB] text-[#294DDB] bg-[#E5EBFF]',
    enlightened: 'border-[#0093DD] text-[#0093DD] bg-[#E5F4FF]',
  }
  return map[stage] ?? 'bg-sumi text-white border-sumi'
}
</script>
