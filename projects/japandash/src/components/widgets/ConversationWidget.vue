<template>
  <WidgetFrame title="Conversation" icon="💬" span="double" collapsible :loading="conv.loading.value">
    <div class="space-y-3">

      <!-- No API key -->
      <div v-if="!conv.hasKey.value" class="text-center py-6 text-usuzumi text-sm space-y-2">
        <p class="text-2xl">🔑</p>
        <p>Add your Anthropic API key in Settings (gear icon) to start chatting.</p>
      </div>

      <!-- Error -->
      <div v-else-if="conv.error.value" class="rounded-md bg-beni/10 px-3 py-3 space-y-2">
        <p class="text-sm text-beni">{{ conv.error.value }}</p>
        <button
          class="px-3 py-1 text-xs rounded-md bg-beni/10 text-beni hover:bg-beni/20 transition-colors"
          @click="conv.error.value = null"
        >Dismiss</button>
      </div>

      <!-- Main UI -->
      <template v-else>

        <!-- Controls row 1: scenario picker + clear -->
        <div class="flex items-center gap-2">
          <select
            v-model="conv.scenarioId.value"
            class="flex-1 px-2 py-1.5 text-xs rounded-md border border-koshi bg-white/80 text-sumi focus:outline-none focus:ring-1 focus:ring-ai/40"
            @change="stopSpeakingMode"
          >
            <option v-for="s in SCENARIOS" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
          <button
            class="p-1.5 rounded-md text-usuzumi hover:text-beni hover:bg-beni/10 transition-colors text-base leading-none"
            title="Clear conversation"
            @click="conv.clearHistory()"
          >🗑</button>
        </div>

        <!-- Controls row 2: level + furigana/translation toggles -->
        <div class="flex items-center gap-2 flex-wrap">
          <div class="flex gap-1">
            <button
              v-for="lvl in LEVELS"
              :key="lvl"
              class="px-2 py-0.5 text-[0.6rem] rounded border transition-colors"
              :class="conv.level.value === lvl
                ? 'bg-ai text-white border-ai'
                : 'border-koshi text-usuzumi hover:bg-koshi/40'"
              @click="conv.level.value = lvl"
            >{{ lvl }}</button>
          </div>
          <div class="flex gap-1 ml-auto">
            <button
              v-for="mode in ['show', 'hover', 'hide']"
              :key="mode"
              class="px-2 py-0.5 text-[0.6rem] rounded border transition-colors"
              :class="furiganaMode === mode
                ? 'bg-sumi text-white border-sumi'
                : 'border-koshi text-usuzumi hover:bg-koshi/40'"
              :title="{ show: 'Show furigana', hover: 'Hover for furigana', hide: 'Hide furigana' }[mode]"
              @click="furiganaMode = mode"
            >{{ { show: '振', hover: '振?', hide: '振—' }[mode] }}</button>
            <button
              class="px-2 py-0.5 text-[0.6rem] rounded border transition-colors"
              :class="showTranslation
                ? 'bg-sumi text-white border-sumi'
                : 'border-koshi text-usuzumi hover:bg-koshi/40'"
              title="Toggle English translation"
              @click="showTranslation = !showTranslation"
            >EN</button>
          </div>
        </div>

        <!-- Message log -->
        <div ref="logEl" class="max-h-72 overflow-y-auto space-y-3 py-1 pr-1">

          <!-- Empty state -->
          <div v-if="conv.activeHistory.value.length === 0" class="text-center py-8 text-usuzumi text-xs space-y-2">
            <p class="text-3xl">💬</p>
            <p class="font-medium">{{ conv.activeScenario.value.label }}</p>
            <p>Type below to start the conversation.</p>
          </div>

          <template v-for="(msg, i) in conv.activeHistory.value" :key="i">
            <!-- User message -->
            <div v-if="msg.role === 'user'" class="flex justify-end">
              <div class="max-w-[75%] px-3 py-2 rounded-2xl rounded-tr-sm bg-ai text-white text-sm leading-relaxed">
                {{ msg.text }}
              </div>
            </div>

            <!-- Assistant message -->
            <div v-else class="flex justify-start">
              <div class="max-w-[82%] space-y-1">
                <div class="px-3 py-2 rounded-2xl rounded-tl-sm bg-koshi/60">
                  <div
                    class="font-body text-sm leading-relaxed"
                    :class="{ 'furigana-hover': furiganaMode === 'hover' }"
                  >
                    <template v-if="furiganaMode === 'hide'">{{ msg.ja }}</template>
                    <span v-else v-html="renderFurigana(msg.ja, msg.furigana)" />
                  </div>
                  <div
                    v-if="showTranslation && msg.en"
                    class="text-[0.65rem] text-usuzumi mt-1 pt-1 border-t border-koshi/50 leading-relaxed"
                  >{{ msg.en }}</div>
                </div>
                <div class="flex items-center gap-2 px-1">
                  <button
                    class="text-[0.65rem] text-usuzumi hover:text-sumi transition-colors"
                    title="Read aloud"
                    @click="speakJapanese(msg.ja)"
                  >🔊</button>
                  <span
                    v-if="msg.correction"
                    class="text-[0.6rem] px-2 py-0.5 rounded bg-[#FFF4E0] text-[#A85B00] flex-1 leading-snug"
                  >💡 {{ msg.correction }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- Typing indicator -->
          <div v-if="conv.loading.value" class="flex justify-start">
            <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-koshi/60 text-sm text-usuzumi">
              <span class="animate-pulse tracking-widest">・・・</span>
            </div>
          </div>
        </div>

        <!-- Speaking mode status bar -->
        <div
          v-if="speakingMode"
          class="flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium"
          :class="{
            'bg-beni/10 text-beni': speechState === 'listening',
            'bg-ai/10 text-ai': speechState === 'thinking',
            'bg-matcha/10 text-matcha': speechState === 'speaking',
          }"
        >
          <span class="flex items-center gap-1.5">
            <span class="animate-pulse">{{ { listening: '👂', thinking: '💭', speaking: '🔊' }[speechState] }}</span>
            {{ { listening: '聞いています…', thinking: '考えています…', speaking: '話しています…' }[speechState] }}
          </span>
          <span v-if="pendingTranscript" class="text-[0.65rem] opacity-70 truncate max-w-[40%]">「{{ pendingTranscript }}」</span>
        </div>

        <!-- Input row -->
        <div class="flex gap-2">
          <input
            v-if="!speakingMode"
            v-model="userInput"
            type="text"
            placeholder="日本語で話しかけてみて…"
            class="flex-1 px-3 py-2 text-sm rounded-md border border-koshi bg-white/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-1 focus:ring-ai/40"
            :disabled="conv.loading.value"
            @keydown.enter.prevent="handleSend"
          />
          <!-- Speaking mode toggle -->
          <button
            class="shrink-0 px-3 py-2 rounded-md border transition-all text-sm font-medium leading-none"
            :class="speakingMode
              ? 'bg-beni text-white border-beni shadow-inner'
              : 'border-koshi text-sumi hover:bg-koshi/40'"
            :title="speakingMode ? 'Exit speaking mode' : 'Enter speaking mode (auto listen + speak)'"
            @click="toggleSpeakingMode"
          >{{ speakingMode ? '🔴 話す' : '🎙 話す' }}</button>
          <!-- Manual mic (only shown outside speaking mode) -->
          <button
            v-if="!speakingMode"
            class="shrink-0 px-2.5 py-2 rounded-md border transition-colors text-sm leading-none"
            :class="isManualRecording
              ? 'bg-beni text-white border-beni'
              : 'border-koshi text-sumi hover:bg-koshi/40'"
            title="Speak in Japanese"
            @click="toggleManualMic"
          >🎤</button>
          <button
            v-if="!speakingMode"
            class="shrink-0 px-3 py-2 rounded-md bg-ai text-white text-xs font-medium hover:bg-ai/90 transition-colors disabled:opacity-40"
            :disabled="conv.loading.value || !userInput.trim()"
            @click="handleSend"
          >送る</button>
        </div>

      </template>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useConversation, SCENARIOS, LEVELS } from '../../composables/useConversation.js'

const conv = useConversation()

const furiganaMode = ref('hover')
const showTranslation = ref(true)
const userInput = ref('')
const logEl = ref(null)

// Manual mic state (outside speaking mode)
const isManualRecording = ref(false)
let manualRecognizer = null

// Speaking mode state
const speakingMode = ref(false)
// 'listening' | 'thinking' | 'speaking'
const speechState = ref('listening')
const pendingTranscript = ref('')
let loopRecognizer = null
let loopActive = false

function renderFurigana(text, furiganaList = []) {
  if (!furiganaList?.length) return text
  let result = text
  const sorted = [...furiganaList].sort((a, b) => b.word.length - a.word.length)
  for (const { word, reading } of sorted) {
    if (word && reading) {
      result = result.replaceAll(word, `<ruby>${word}<rt>${reading}</rt></ruby>`)
    }
  }
  return result
}

function speakJapanese(text) {
  return new Promise(resolve => {
    if (!window.speechSynthesis) { resolve(); return }
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'ja-JP'
    utt.rate = 0.9
    utt.onend = resolve
    utt.onerror = resolve
    window.speechSynthesis.speak(utt)
  })
}

// --- Speaking mode loop ---

function startListening() {
  if (!loopActive) return
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) { stopSpeakingMode(); return }

  speechState.value = 'listening'
  pendingTranscript.value = ''
  loopRecognizer = new SR()
  loopRecognizer.lang = 'ja-JP'
  loopRecognizer.interimResults = false

  loopRecognizer.onresult = async (e) => {
    const transcript = e.results[0][0].transcript
    pendingTranscript.value = transcript

    if (!loopActive) return
    speechState.value = 'thinking'

    // Auto-send after a brief moment so the user can see the transcript
    await new Promise(r => setTimeout(r, 800))
    if (!loopActive) return

    await conv.send(transcript)
    pendingTranscript.value = ''

    if (!loopActive) return

    // Speak the latest assistant reply
    const history = conv.activeHistory.value
    const lastAssistant = [...history].reverse().find(m => m.role === 'assistant')
    if (lastAssistant?.ja) {
      speechState.value = 'speaking'
      await speakJapanese(lastAssistant.ja)
    }

    // Loop back to listening
    if (loopActive) startListening()
  }

  loopRecognizer.onerror = (e) => {
    // Ignore no-speech errors and loop again; stop on other errors
    if (e.error === 'no-speech' && loopActive) {
      startListening()
    } else {
      stopSpeakingMode()
    }
  }

  loopRecognizer.onend = () => {
    // If no result was captured and mode is still active, loop again
    // (onresult handles the normal case; this fires on timeout/abort)
    loopRecognizer = null
  }

  loopRecognizer.start()
}

function stopSpeakingMode() {
  loopActive = false
  speakingMode.value = false
  loopRecognizer?.stop()
  loopRecognizer = null
  window.speechSynthesis?.cancel()
  speechState.value = 'listening'
  pendingTranscript.value = ''
}

function toggleSpeakingMode() {
  if (speakingMode.value) {
    stopSpeakingMode()
  } else {
    speakingMode.value = true
    loopActive = true
    startListening()
  }
}

// --- Manual mic (outside speaking mode) ---

function toggleManualMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) return
  if (isManualRecording.value) {
    manualRecognizer?.stop()
    return
  }
  isManualRecording.value = true
  manualRecognizer = new SR()
  manualRecognizer.lang = 'ja-JP'
  manualRecognizer.interimResults = false
  manualRecognizer.onresult = (e) => { userInput.value = e.results[0][0].transcript }
  manualRecognizer.onerror = () => { isManualRecording.value = false; manualRecognizer = null }
  manualRecognizer.onend = () => { isManualRecording.value = false; manualRecognizer = null }
  manualRecognizer.start()
}

async function handleSend() {
  const text = userInput.value.trim()
  if (!text || conv.loading.value) return
  userInput.value = ''
  await conv.send(text)
}

function scrollToBottom() {
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight
}

watch(() => conv.activeHistory.value.length, () => nextTick(scrollToBottom))
watch(() => conv.loading.value, () => nextTick(scrollToBottom))

onBeforeUnmount(() => {
  loopActive = false
  loopRecognizer?.stop()
  manualRecognizer?.stop()
  window.speechSynthesis?.cancel()
})
</script>

<style scoped>
.furigana-hover :deep(ruby) rt {
  visibility: hidden;
}
.furigana-hover :deep(ruby):hover rt {
  visibility: visible;
}
</style>
