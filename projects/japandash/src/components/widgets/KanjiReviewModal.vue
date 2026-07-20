<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-sumi/40 backdrop-blur-sm" @click="close" />
      <div class="relative bg-washi rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 max-h-[85vh] overflow-y-auto">

        <!-- Header -->
        <div class="flex items-center justify-between">
          <p class="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-usuzumi font-medium">Review Mnemonics</p>
          <button class="text-usuzumi hover:text-sumi text-xl shrink-0" @click="close">✕</button>
        </div>

        <!-- Phase: select levels -->
        <template v-if="phase === 'select'">
          <div class="space-y-1.5">
            <label class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-koshi/30 cursor-pointer font-medium">
              <input v-model="allChecked" type="checkbox" class="accent-ai" />
              <span class="text-sm">All</span>
            </label>
            <label
              v-for="level in LEVELS"
              :key="level"
              class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-koshi/30 cursor-pointer capitalize"
            >
              <input
                type="checkbox"
                class="accent-ai"
                :checked="selectedLevels.has(level)"
                @change="toggleLevel(level)"
              />
              <span class="text-sm">{{ level }}</span>
              <span class="text-xs text-usuzumi ml-auto normal-case">({{ levelCounts[level] }})</span>
            </label>
          </div>

          <button
            class="w-full py-2.5 text-sm font-medium rounded-lg transition-colors"
            :class="compiledCount > 0 ? 'bg-ai text-white hover:bg-ai/90' : 'bg-koshi/40 text-usuzumi cursor-not-allowed'"
            :disabled="compiledCount === 0"
            @click="startReview"
          >Start Review ({{ compiledCount }})</button>
        </template>

        <!-- Phase: review, card active -->
        <template v-else-if="currentCard">
          <p class="text-center text-[0.65rem] text-usuzumi">{{ doneCount }} / {{ totalCount }} done</p>

          <div class="[perspective:1000px]">
            <div
              class="relative h-80 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
              :style="{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
              @click="flipCard"
            >
              <!-- Front: kanji -->
              <div class="absolute inset-0 [backface-visibility:hidden] rounded-xl border border-koshi bg-surface flex items-center justify-center">
                <span class="font-display text-7xl">{{ currentCard.characters }}</span>
              </div>

              <!-- Back: meaning + reading + mnemonics -->
              <div class="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border border-koshi bg-koshi/20 p-4 overflow-y-auto space-y-3">
                <div class="text-center">
                  <p class="text-lg font-semibold">{{ currentCard.primaryMeaning }}</p>
                  <p class="font-mono text-sm text-usuzumi">{{ currentCard.primaryReading }}</p>
                </div>
                <div>
                  <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Meaning</p>
                  <p class="text-xs leading-relaxed" v-html="renderMnemonic(currentCard.meaningMnemonic)" />
                  <p v-if="currentCard.meaningHint" class="text-xs text-usuzumi mt-1 leading-relaxed" v-html="renderMnemonic(currentCard.meaningHint)" />
                </div>
                <div>
                  <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">Reading</p>
                  <p class="text-xs leading-relaxed" v-html="renderMnemonic(currentCard.readingMnemonic)" />
                  <p v-if="currentCard.readingHint" class="text-xs text-usuzumi mt-1 leading-relaxed" v-html="renderMnemonic(currentCard.readingHint)" />
                </div>
              </div>
            </div>
          </div>
          <p class="text-center text-[0.6rem] text-usuzumi">Tap card to flip</p>

          <div class="flex gap-2">
            <button
              class="flex-1 py-2 text-sm font-medium rounded-lg border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
              @click="again"
            >Again</button>
            <button
              class="flex-1 py-2 text-sm font-medium rounded-lg bg-matcha text-white hover:bg-matcha/90 transition-colors"
              @click="markDone"
            >Done</button>
          </div>
        </template>

        <!-- Phase: review, queue empty -->
        <template v-else>
          <div class="text-center py-6 space-y-3">
            <p class="text-3xl">🎉</p>
            <p class="text-sm font-medium text-sumi">All done!</p>
            <p class="text-xs text-usuzumi">Reviewed {{ totalCount }} kanji this session.</p>
            <div class="flex gap-2 justify-center pt-2">
              <button
                class="px-4 py-2 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
                @click="backToSelect"
              >Review Again</button>
              <button
                class="px-4 py-2 text-xs rounded-md bg-ai text-white hover:bg-ai/90 transition-colors"
                @click="close"
              >Close</button>
            </div>
          </div>
        </template>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { renderMnemonic } from '../../utils/mnemonic.js'

const props = defineProps({
  kanjiList: { type: Array, required: true },
})
const emit = defineEmits(['close'])

const LEVELS = ['apprentice', 'guru', 'master', 'enlightened']

const phase = ref('select') // 'select' | 'review'
const selectedLevels = reactive(new Set(LEVELS))
const queue = ref([])
const flipped = ref(false)
const totalCount = ref(0)
const doneCount = ref(0)

const levelCounts = computed(() => {
  const counts = { apprentice: 0, guru: 0, master: 0, enlightened: 0 }
  for (const k of props.kanjiList) {
    if (counts[k.srsLabel] !== undefined) counts[k.srsLabel]++
  }
  return counts
})

const allChecked = computed({
  get: () => LEVELS.every(l => selectedLevels.has(l)),
  set: (val) => {
    if (val) LEVELS.forEach(l => selectedLevels.add(l))
    else selectedLevels.clear()
  },
})

function toggleLevel(level) {
  if (selectedLevels.has(level)) selectedLevels.delete(level)
  else selectedLevels.add(level)
}

const compiledCount = computed(() =>
  props.kanjiList.filter(k => selectedLevels.has(k.srsLabel)).length
)

const currentCard = computed(() => queue.value[0] ?? null)

function startReview() {
  const pool = props.kanjiList.filter(k => selectedLevels.has(k.srsLabel))
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  queue.value = pool
  totalCount.value = pool.length
  doneCount.value = 0
  flipped.value = false
  phase.value = 'review'
}

function flipCard() {
  flipped.value = !flipped.value
}

function again() {
  if (queue.value.length === 0) return
  const [first, ...rest] = queue.value
  queue.value = [...rest, first]
  flipped.value = false
}

function markDone() {
  if (queue.value.length === 0) return
  queue.value = queue.value.slice(1)
  doneCount.value++
  flipped.value = false
}

function backToSelect() {
  phase.value = 'select'
}

function close() {
  emit('close')
}
</script>
