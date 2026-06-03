<template>
  <WidgetFrame title="Mistake Review" icon="直" collapsible :loading="review.loading.value">
    <div class="space-y-3">

      <!-- Error -->
      <div v-if="review.error.value" class="rounded-md bg-beni/10 px-3 py-2 text-sm text-beni">
        {{ review.error.value }}
      </div>

      <!-- All done -->
      <div v-else-if="review.done.value" class="text-center py-6 space-y-2">
        <p class="text-3xl">🎉</p>
        <p class="text-sm font-medium text-sumi">何もありません</p>
        <p class="text-xs text-usuzumi">Nothing due right now</p>
        <p v-if="review.reviewedToday.value > 0" class="text-[0.65rem] text-matcha">
          ✓ {{ review.reviewedToday.value }} reviewed this session
        </p>
        <button
          class="mt-2 px-3 py-1.5 text-xs rounded-md border border-koshi text-usuzumi hover:bg-koshi/40 transition-colors"
          @click="review.loadDue()"
        >Check again</button>
      </div>

      <!-- Reviewing -->
      <template v-else-if="review.current.value">
        <!-- Progress -->
        <div class="flex items-center justify-between text-[0.65rem] text-usuzumi font-mono">
          <span>{{ review.index.value + 1 }} / {{ review.total.value }}</span>
          <span v-if="review.reviewedToday.value > 0" class="text-matcha">
            ✓ {{ review.reviewedToday.value }} done
          </span>
        </div>

        <!-- Prompt card -->
        <div class="rounded-lg bg-koshi/30 p-4 space-y-2">
          <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi">You said</p>
          <p class="text-sm leading-relaxed text-sumi">「{{ currentContext.userText }}」</p>
        </div>

        <!-- Answer input (visible before reveal) -->
        <div v-if="!review.revealed.value" class="space-y-2">
          <p class="text-xs text-usuzumi">How would you say it correctly?</p>
          <div class="flex gap-2">
            <input
              v-model="answerInput"
              type="text"
              placeholder="正しく言うと…"
              class="flex-1 px-3 py-2 text-sm rounded-md border border-koshi bg-white/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-1 focus:ring-ai/40"
              @keydown.enter.prevent="review.reveal()"
            />
            <button
              class="shrink-0 px-2.5 py-2 rounded-md border text-sm leading-none transition-colors"
              :class="isRecording ? 'bg-beni text-white border-beni' : 'border-koshi text-sumi hover:bg-koshi/40'"
              title="Speak your answer"
              @click="toggleMic"
            >🎤</button>
          </div>
          <button
            class="w-full py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
            @click="review.reveal()"
          >Show correction →</button>
        </div>

        <!-- Correction reveal -->
        <div v-else class="space-y-3">
          <div class="rounded-lg bg-[#FFF4E0] border border-[#F0C070]/40 p-3 space-y-1">
            <p class="font-mono text-[0.55rem] uppercase tracking-widest text-[#A85B00]">Correction</p>
            <p class="text-sm leading-relaxed text-sumi">{{ currentContext.correction }}</p>
          </div>

          <!-- Self-rating buttons -->
          <div class="space-y-1">
            <p class="text-[0.65rem] text-usuzumi text-center">How well did you remember?</p>
            <div class="grid grid-cols-4 gap-1.5">
              <button
                v-for="r in ratings"
                :key="r.value"
                class="py-2 rounded-md text-xs font-medium transition-colors border"
                :class="r.classes"
                @click="handleGrade(r.value)"
              >
                <div>{{ r.label }}</div>
                <div class="text-[0.55rem] opacity-70 mt-0.5">{{ r.hint }}</div>
              </button>
            </div>
          </div>
        </div>
      </template>

    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useReview } from '../../composables/useReview.js'

const review = useReview()

const answerInput = ref('')
const isRecording = ref(false)
let recognizer = null
let startedAt = null

const currentContext = computed(() => {
  const payload = review.current.value?.payload
  return payload?.context ?? {}
})

const ratings = [
  { value: 'again', label: 'Again',  hint: '< 10 min', classes: 'bg-beni/10 text-beni border-beni/20 hover:bg-beni/20' },
  { value: 'hard',  label: 'Hard',   hint: '+1–2 d',   classes: 'bg-[#FFF4E0] text-[#A85B00] border-[#F0C070]/40 hover:bg-[#FFF4E0]/80' },
  { value: 'good',  label: 'Good',   hint: '+few d',   classes: 'bg-ai/10 text-ai border-ai/20 hover:bg-ai/20' },
  { value: 'easy',  label: 'Easy',   hint: '+longer',  classes: 'bg-matcha/10 text-matcha border-matcha/20 hover:bg-matcha/20' },
]

function toggleMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) return
  if (isRecording.value) {
    recognizer?.stop()
    return
  }
  isRecording.value = true
  recognizer = new SR()
  recognizer.lang = 'ja-JP'
  recognizer.interimResults = false
  recognizer.onresult = (e) => { answerInput.value = e.results[0][0].transcript }
  recognizer.onerror = () => { isRecording.value = false; recognizer = null }
  recognizer.onend = () => { isRecording.value = false; recognizer = null }
  recognizer.start()
}

function handleGrade(rating) {
  const elapsed = startedAt ? Date.now() - startedAt : undefined
  answerInput.value = ''
  startedAt = Date.now()
  review.grade(rating, elapsed)
}

onMounted(() => {
  review.loadDue()
  startedAt = Date.now()
})

onBeforeUnmount(() => {
  recognizer?.stop()
})
</script>
