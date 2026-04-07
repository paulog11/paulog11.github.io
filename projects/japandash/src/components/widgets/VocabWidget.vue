<template>
  <WidgetFrame title="Vocab & Audio" icon="🔊" span="double" collapsible :loading="wk.vocabLoading.value">
    <div class="space-y-3">

      <!-- No API key -->
      <div v-if="!wk.hasKey.value" class="text-center py-6 text-usuzumi text-sm">
        <p class="text-2xl mb-2">🔑</p>
        <p>Add your WaniKani API key in Settings to load vocabulary.</p>
      </div>

      <!-- Error -->
      <div v-else-if="wk.vocabError.value" class="text-center py-4 space-y-2">
        <p class="text-sm text-beni">{{ wk.vocabError.value }}</p>
        <button
          class="px-3 py-1.5 text-xs rounded-md bg-beni/10 text-beni hover:bg-beni/20 transition-colors"
          @click="wk.fetchLearnedVocabulary(true)"
        >Retry</button>
      </div>

      <!-- Not yet loaded -->
      <div v-else-if="wk.learnedVocabulary.value.length === 0 && !wk.vocabLoading.value" class="text-center py-6 text-usuzumi text-sm">
        <p class="text-2xl mb-2">📚</p>
        <p>No learned vocabulary found yet.</p>
        <p class="text-xs mt-1">Complete some WaniKani lessons to get started.</p>
      </div>

      <!-- Loaded -->
      <template v-else>
        <!-- Controls row 1: SRS filter -->
        <div class="flex gap-1 flex-wrap">
          <button
            v-for="stage in ['All', 'apprentice', 'guru', 'master', 'enlightened', 'burned']"
            :key="stage"
            class="px-2 py-1 text-[0.6rem] rounded border transition-colors capitalize"
            :class="filterSrs === stage
              ? srsActiveClass(stage)
              : 'border-koshi text-usuzumi hover:bg-koshi/40'"
            @click="filterSrs = stage; selectedVocab = null"
          >
            {{ stage }}
          </button>
        </div>

        <!-- Controls row 2: search + listen mode -->
        <div class="flex gap-2 items-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search word or meaning..."
            class="flex-1 px-2.5 py-1.5 text-xs rounded-md border border-koshi bg-white/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-1 focus:ring-ai/40"
            @input="selectedVocab = null"
          />
          <button
            class="flex-shrink-0 px-3 py-1.5 text-xs rounded-md transition-colors font-medium"
            :class="listenMode ? 'bg-beni text-white' : 'border border-koshi text-sumi hover:bg-koshi/40'"
            @click="toggleListenMode"
          >
            {{ listenMode ? '⏹ Stop' : '▶ Listen Mode' }}
          </button>
        </div>

        <!-- Count -->
        <p class="text-[0.65rem] text-usuzumi">
          {{ filteredVocab.length }} words
          <span v-if="filterSrs !== 'All' || searchQuery"> (filtered)</span>
        </p>

        <!-- Vocabulary list -->
        <div class="max-h-56 overflow-y-auto space-y-0.5 pr-1">
          <div
            v-for="item in filteredVocab"
            :key="item.subjectId"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors"
            :class="selectedVocab?.subjectId === item.subjectId ? 'bg-ai-light/60' : 'hover:bg-koshi/30'"
            @click="selectVocab(item)"
          >
            <span class="font-display text-base w-16 shrink-0">{{ item.characters }}</span>
            <span class="font-mono text-xs text-usuzumi w-20 shrink-0 truncate">{{ item.primaryReading }}</span>
            <span class="text-xs text-sumi flex-1 truncate">{{ item.primaryMeaning }}</span>
            <span
              class="text-[0.55rem] px-1.5 py-0.5 rounded-full font-medium shrink-0"
              :style="srsBadgeStyle(item.srsLabel)"
            >{{ item.srsLabel }}</span>
            <button
              class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors relative"
              :class="isPlaying && playingId === item.subjectId
                ? 'bg-beni text-white'
                : 'bg-koshi/60 text-sumi hover:bg-koshi'"
              @click.stop="playVocab(item)"
            >
              <span v-if="isPlaying && playingId === item.subjectId" class="absolute inset-0 rounded-full animate-ping bg-beni/30" />
              <span class="text-[0.6rem] relative">{{ isPlaying && playingId === item.subjectId ? '■' : '▶' }}</span>
            </button>
          </div>
          <p v-if="filteredVocab.length === 0" class="text-center text-usuzumi text-xs py-4">
            No matches for this filter
          </p>
        </div>

        <!-- Detail panel -->
        <div v-if="selectedVocab" class="rounded-lg bg-koshi/30 p-4 space-y-3">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-display text-4xl">{{ selectedVocab.characters }}</p>
              <p class="font-mono text-sm text-usuzumi mt-0.5">{{ selectedVocab.primaryReading }}</p>
            </div>
            <div class="flex flex-col items-end gap-1.5">
              <span
                class="text-[0.6rem] px-2 py-0.5 rounded-full font-medium capitalize"
                :style="srsBadgeStyle(selectedVocab.srsLabel)"
              >{{ selectedVocab.srsLabel }}</span>
              <span class="text-[0.6rem] text-usuzumi">Level {{ selectedVocab.level }}</span>
            </div>
          </div>

          <!-- Meanings -->
          <div>
            <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Meanings</p>
            <p class="text-sm">{{ selectedVocab.meanings.join('、') }}</p>
          </div>

          <!-- Readings -->
          <div v-if="selectedVocab.readings.length > 1">
            <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Readings</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="r in selectedVocab.readings"
                :key="r.reading"
                class="font-mono text-xs px-2 py-0.5 rounded bg-white/60 border border-koshi"
                :class="r.primary ? 'font-semibold' : 'text-usuzumi'"
              >{{ r.reading }}</span>
            </div>
          </div>

          <!-- Audio info -->
          <div class="flex items-center gap-2">
            <button
              class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors relative overflow-hidden"
              :class="isPlaying && playingId === selectedVocab.subjectId
                ? 'bg-beni text-white'
                : 'bg-ai text-white hover:bg-ai/90'"
              @click="playVocab(selectedVocab)"
            >
              <span v-if="isPlaying && playingId === selectedVocab.subjectId" class="absolute inset-0 animate-pulse bg-white/10" />
              <span class="relative">{{ isPlaying && playingId === selectedVocab.subjectId ? '■ Stop' : '▶ Play' }}</span>
            </button>
            <span class="text-[0.65rem] text-usuzumi">
              {{ selectedVocab.audios.length > 0 ? `${selectedVocab.audios.length} audio file(s)` : 'TTS fallback' }}
            </span>
            <button
              class="ml-auto text-[0.65rem] text-usuzumi hover:text-sumi transition-colors"
              @click="wk.fetchLearnedVocabulary(true)"
            >↻ Refresh</button>
          </div>
        </div>
      </template>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useWaniKani } from '../../composables/useWaniKani.js'

const wk = useWaniKani()

const filterSrs = ref('All')
const searchQuery = ref('')
const selectedVocab = ref(null)
const listenMode = ref(false)
const listenIndex = ref(0)
const isPlaying = ref(false)
const playingId = ref(null)
const currentAudio = ref(null)

// Trigger fetch once assignments are loaded
watch(
  () => wk.assignments.value.length,
  (len) => {
    if (len > 0 && wk.learnedVocabulary.value.length === 0 && !wk.vocabLoading.value) {
      wk.fetchLearnedVocabulary()
    }
  },
  { immediate: true }
)

const filteredVocab = computed(() => {
  let list = wk.learnedVocabulary.value
  if (filterSrs.value !== 'All') {
    list = list.filter(v => v.srsLabel === filterSrs.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(v =>
      v.characters.includes(q) ||
      v.primaryMeaning.toLowerCase().includes(q) ||
      v.primaryReading.includes(q)
    )
  }
  return list
})

function selectVocab(item) {
  selectedVocab.value = item
}

// --- Audio ---

function stopCurrent() {
  if (currentAudio.value) {
    currentAudio.value.pause()
    currentAudio.value.onended = null
    currentAudio.value.onerror = null
    currentAudio.value = null
  }
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel()
  }
  isPlaying.value = false
  playingId.value = null
}

function playVocab(vocab) {
  if (isPlaying.value && playingId.value === vocab.subjectId) {
    stopCurrent()
    if (listenMode.value) listenMode.value = false
    return
  }
  stopCurrent()

  playingId.value = vocab.subjectId
  isPlaying.value = true

  if (vocab.audios.length > 0) {
    const preferred = vocab.audios.find(a => a.gender === 'female') ?? vocab.audios[0]
    const audio = new Audio(preferred.url)
    currentAudio.value = audio
    audio.onended = () => {
      isPlaying.value = false
      playingId.value = null
      currentAudio.value = null
      if (listenMode.value) scheduleNext()
    }
    audio.onerror = () => {
      currentAudio.value = null
      speakTTS(vocab)
    }
    audio.play().catch(() => speakTTS(vocab))
  } else {
    speakTTS(vocab)
  }
}

function speakTTS(vocab) {
  if (!window.speechSynthesis) {
    isPlaying.value = false
    playingId.value = null
    return
  }
  const utt = new SpeechSynthesisUtterance(vocab.primaryReading)
  utt.lang = 'ja-JP'
  utt.rate = 0.9
  utt.onend = () => {
    isPlaying.value = false
    playingId.value = null
    if (listenMode.value) scheduleNext()
  }
  window.speechSynthesis.speak(utt)
}

// --- Listen Mode ---

function toggleListenMode() {
  if (listenMode.value) {
    listenMode.value = false
    stopCurrent()
    return
  }
  const list = filteredVocab.value
  if (list.length === 0) return
  listenMode.value = true
  listenIndex.value = selectedVocab.value
    ? list.findIndex(v => v.subjectId === selectedVocab.value.subjectId)
    : 0
  if (listenIndex.value < 0) listenIndex.value = 0
  playAtIndex(listenIndex.value)
}

function playAtIndex(i) {
  const list = filteredVocab.value
  if (i >= list.length) {
    listenMode.value = false
    return
  }
  const vocab = list[i]
  selectedVocab.value = vocab
  playVocab(vocab)
}

function scheduleNext() {
  if (!listenMode.value) return
  listenIndex.value++
  setTimeout(() => playAtIndex(listenIndex.value), 400)
}

// Stop audio if filter changes mid-listen
watch(filteredVocab, () => {
  if (isPlaying.value) stopCurrent()
  if (listenMode.value) listenMode.value = false
})

onBeforeUnmount(() => stopCurrent())

// --- SRS color helpers ---

const SRS_COLORS = {
  apprentice: { bg: '#FFE5F5', text: '#DD0093' },
  guru:       { bg: '#F0E6FF', text: '#882D9E' },
  master:     { bg: '#E5EBFF', text: '#294DDB' },
  enlightened:{ bg: '#E5F4FF', text: '#0093DD' },
  burned:     { bg: '#EBEBEB', text: '#434343' },
}

function srsBadgeStyle(label) {
  const c = SRS_COLORS[label] ?? SRS_COLORS.apprentice
  return { backgroundColor: c.bg, color: c.text }
}

function srsActiveClass(stage) {
  const map = {
    All:        'bg-sumi text-white border-sumi',
    apprentice: 'border-[#DD0093] text-[#DD0093] bg-[#FFE5F5]',
    guru:       'border-[#882D9E] text-[#882D9E] bg-[#F0E6FF]',
    master:     'border-[#294DDB] text-[#294DDB] bg-[#E5EBFF]',
    enlightened:'border-[#0093DD] text-[#0093DD] bg-[#E5F4FF]',
    burned:     'border-[#434343] text-[#434343] bg-[#EBEBEB]',
  }
  return map[stage] ?? 'bg-sumi text-white border-sumi'
}
</script>
