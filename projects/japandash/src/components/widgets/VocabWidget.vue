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
        <!-- Controls row 1: SRS filter + Quiz button -->
        <div class="flex gap-1 flex-wrap items-center">
          <button
            v-for="stage in ['All', 'apprentice', 'guru', 'master', 'enlightened', 'burned']"
            :key="stage"
            class="px-2 py-1 text-[0.6rem] rounded border transition-colors capitalize"
            :class="filterSrs === stage
              ? srsActiveClass(stage)
              : 'border-koshi text-usuzumi hover:bg-koshi/40'"
            :disabled="gameMode"
            @click="filterSrs = stage; selectedVocab = null"
          >
            {{ stage }}
          </button>
          <button
            v-if="!gameMode && filteredVocab.length >= ROUND_SIZE"
            class="ml-auto px-3 py-1 text-[0.6rem] rounded border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
            @click="startGame"
          >
            🎮 Quiz
          </button>
        </div>

        <!-- Game board -->
        <template v-if="gameMode">
          <!-- Game header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi">Match the pairs</span>
              <span class="text-[0.6rem] px-1.5 py-0.5 rounded-full bg-ai-light text-ai font-medium">
                {{ matched.size }} / {{ gameWords.length }}
              </span>
            </div>
            <button
              class="text-[0.65rem] text-usuzumi hover:text-sumi transition-colors"
              @click="exitGame"
            >✕ Exit</button>
          </div>

          <!-- Two-column grid -->
          <div class="grid grid-cols-2 gap-2">
            <!-- Left: Japanese characters -->
            <div class="space-y-1.5">
              <button
                v-for="item in shuffledLeft"
                :key="item.subjectId"
                class="w-full px-3 py-2 rounded-md border text-left transition-all duration-150 font-display text-lg"
                :class="[itemClassLeft(item), matched.has(item.subjectId) ? 'line-through' : '']"
                @click="pickLeft(item)"
              >
                {{ item.characters }}
              </button>
            </div>

            <!-- Right: English meanings -->
            <div class="space-y-1.5">
              <button
                v-for="item in shuffledRight"
                :key="item.subjectId"
                class="w-full px-3 py-2 rounded-md border text-left transition-all duration-150 text-xs"
                :class="[itemClassRight(item), matched.has(item.subjectId) ? 'line-through' : '']"
                @click="pickRight(item)"
              >
                {{ item.primaryMeaning }}
              </button>
            </div>
          </div>

          <!-- End state -->
          <div v-if="isGameOver" class="rounded-lg bg-matcha/10 border border-matcha/30 px-4 py-3 flex items-center justify-between">
            <span class="text-sm font-medium text-matcha">All matched!</span>
            <div class="flex gap-2">
              <button
                class="px-3 py-1.5 text-xs rounded-md bg-matcha text-white hover:bg-matcha/90 transition-colors"
                @click="startGame"
              >Play Again</button>
              <button
                class="px-3 py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
                @click="exitGame"
              >Exit</button>
            </div>
          </div>
        </template>

        <!-- Browse mode (hidden during game) -->
        <template v-else>
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

          <!-- Controls row 3: English voice picker -->
          <div v-if="englishVoices.length > 0" class="flex items-center gap-2">
            <span class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi shrink-0">EN Voice</span>
            <select
              v-model="selectedVoiceName"
              class="flex-1 px-2 py-1 text-xs rounded-md border border-koshi bg-white/80 text-sumi focus:outline-none focus:ring-1 focus:ring-ai/40"
            >
              <option v-for="v in englishVoices" :key="v.name" :value="v.name">
                {{ v.name }} ({{ v.lang }})
              </option>
            </select>
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
                v-if="item.contextSentences?.length > 0"
                class="shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-koshi/60 text-sumi hover:bg-koshi transition-colors text-[0.6rem]"
                title="Sample sentences"
                @click.stop="showSentencesFor(item)"
              >📖</button>
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
      </template>
    </div>
  </WidgetFrame>

  <!-- Context sentences modal -->
  <Teleport to="body">
    <div
      v-if="sentenceVocab"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-sumi/40 backdrop-blur-sm" @click="closeSentences" />
      <div class="relative bg-washi rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 max-h-[80vh] overflow-y-auto">
        <!-- Header -->
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="font-display text-3xl">{{ sentenceVocab.characters }}</p>
            <p class="font-mono text-sm text-usuzumi mt-0.5">{{ sentenceVocab.primaryReading }}</p>
            <p class="text-xs text-usuzumi">{{ sentenceVocab.primaryMeaning }}</p>
          </div>
          <button class="text-usuzumi hover:text-sumi text-xl shrink-0" @click="closeSentences">✕</button>
        </div>
        <!-- Label -->
        <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi">Sample Sentences</p>
        <!-- Sentences -->
        <div class="space-y-4">
          <div
            v-for="(s, i) in sentenceVocab.contextSentences"
            :key="i"
            class="space-y-0.5 border-l-2 border-ai/30 pl-3"
          >
            <p class="text-sm font-display leading-relaxed">{{ s.ja }}</p>
            <p class="text-xs text-usuzumi">{{ s.en }}</p>
          </div>
        </div>
        <p v-if="sentenceVocab.contextSentences?.length === 0" class="text-sm text-usuzumi text-center py-2">
          No sample sentences available.
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useWaniKani } from '../../composables/useWaniKani.js'

const wk = useWaniKani()

const filterSrs = ref('All')
const searchQuery = ref('')
const selectedVocab = ref(null)
const sentenceVocab = ref(null)
const listenMode = ref(false)
const listenIndex = ref(0)
const isPlaying = ref(false)
const playingId = ref(null)
const currentAudio = ref(null)

// --- English voice picker ---
const englishVoices = ref([])
const selectedVoiceName = ref('')

function loadVoices() {
  const voices = window.speechSynthesis?.getVoices() ?? []
  englishVoices.value = voices.filter(v => v.lang.startsWith('en'))
  if (!selectedVoiceName.value && englishVoices.value.length > 0) {
    selectedVoiceName.value = englishVoices.value[0].name
  }
}

if (window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.addEventListener('voiceschanged', loadVoices)
}

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

function showSentencesFor(item) { sentenceVocab.value = item }
function closeSentences()        { sentenceVocab.value = null }

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
      currentAudio.value = null
      speakEnglish(vocab)
    }
    audio.onerror = () => {
      currentAudio.value = null
      speakJapaneseTTS(vocab)
    }
    audio.play().catch(() => speakJapaneseTTS(vocab))
  } else {
    speakJapaneseTTS(vocab)
  }
}

function speakJapaneseTTS(vocab) {
  if (!window.speechSynthesis) {
    speakEnglish(vocab)
    return
  }
  const utt = new SpeechSynthesisUtterance(vocab.primaryReading)
  utt.lang = 'ja-JP'
  utt.rate = 0.9
  utt.onend = () => speakEnglish(vocab)
  window.speechSynthesis.speak(utt)
}

function speakEnglish(vocab) {
  if (!window.speechSynthesis) {
    isPlaying.value = false
    playingId.value = null
    if (listenMode.value) scheduleNext()
    return
  }
  const utt = new SpeechSynthesisUtterance(vocab.primaryMeaning)
  const voice = englishVoices.value.find(v => v.name === selectedVoiceName.value)
  if (voice) utt.voice = voice
  utt.lang = voice?.lang ?? 'en-US'
  utt.rate = 0.95
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
  if (gameMode.value) exitGame()
})

// --- Matching Game ---

const ROUND_SIZE = 6

const gameMode     = ref(false)
const gameWords    = ref([])
const shuffledLeft = ref([])
const shuffledRight = ref([])
const selectedLeft  = ref(null)
const selectedRight = ref(null)
const matched      = ref(new Set())
const wrongLeft    = ref(null)
const wrongRight   = ref(null)

const isGameOver = computed(() =>
  matched.value.size === gameWords.value.length && gameWords.value.length > 0
)

function startGame() {
  stopCurrent()
  listenMode.value = false
  selectedVocab.value = null

  const pool = [...filteredVocab.value]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  gameWords.value = pool.slice(0, ROUND_SIZE)
  shuffledLeft.value  = [...gameWords.value].sort(() => Math.random() - 0.5)
  shuffledRight.value = [...gameWords.value].sort(() => Math.random() - 0.5)
  selectedLeft.value  = null
  selectedRight.value = null
  matched.value       = new Set()
  wrongLeft.value     = null
  wrongRight.value    = null
  gameMode.value      = true
}

function exitGame() {
  stopCurrent()
  gameMode.value      = false
  gameWords.value     = []
  shuffledLeft.value  = []
  shuffledRight.value = []
  selectedLeft.value  = null
  selectedRight.value = null
  matched.value       = new Set()
  wrongLeft.value     = null
  wrongRight.value    = null
}

function pickLeft(item) {
  if (matched.value.has(item.subjectId) || wrongLeft.value) return
  selectedLeft.value = item
  if (selectedRight.value) checkMatch()
}

function pickRight(item) {
  if (matched.value.has(item.subjectId) || wrongRight.value) return
  selectedRight.value = item
  if (selectedLeft.value) checkMatch()
}

function checkMatch() {
  const l = selectedLeft.value
  const r = selectedRight.value
  if (l.subjectId === r.subjectId) {
    matched.value = new Set([...matched.value, l.subjectId])
    playVocab(l)
    selectedLeft.value  = null
    selectedRight.value = null
  } else {
    wrongLeft.value  = l.subjectId
    wrongRight.value = r.subjectId
    setTimeout(() => {
      wrongLeft.value     = null
      wrongRight.value    = null
      selectedLeft.value  = null
      selectedRight.value = null
    }, 500)
  }
}

function itemClassLeft(item) {
  const id = item.subjectId
  if (matched.value.has(id))             return 'opacity-35 cursor-default border-koshi bg-white/40'
  if (wrongLeft.value === id)            return 'border-beni bg-beni/10 text-beni'
  if (selectedLeft.value?.subjectId === id) return 'border-ai bg-ai-light ring-1 ring-ai'
  return 'border-koshi bg-white/60 hover:bg-koshi/40 cursor-pointer'
}

function itemClassRight(item) {
  const id = item.subjectId
  if (matched.value.has(id))              return 'opacity-35 cursor-default border-koshi bg-white/40'
  if (wrongRight.value === id)            return 'border-beni bg-beni/10 text-beni'
  if (selectedRight.value?.subjectId === id) return 'border-ai bg-ai-light ring-1 ring-ai'
  return 'border-koshi bg-white/60 hover:bg-koshi/40 cursor-pointer'
}

onBeforeUnmount(() => {
  stopCurrent()
  window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices)
})

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
