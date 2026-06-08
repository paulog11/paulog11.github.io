<template>
  <WidgetFrame title="Shadowing Practice" icon="🎙" widget-id="shadowing" collapsible>
    <template #default="{ focused }">

      <!-- Compact summary (dashboard tile) -->
      <div v-if="!focused" class="space-y-3">
        <div class="rounded-lg bg-koshi/20 p-3 space-y-1">
          <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi">
            {{ shadowing.selectedChannel.value?.name ?? 'Shadowing' }}
          </p>
          <template v-if="shadowing.selectedVideo.value">
            <p class="text-sm font-medium leading-snug">{{ shadowing.selectedVideo.value.title }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="px-1.5 py-0.5 text-[0.55rem] rounded bg-ai-light text-ai font-medium">{{ shadowing.selectedVideo.value.level }}</span>
              <span class="text-[0.65rem] text-usuzumi tabular-nums">{{ shadowing.selectedVideo.value.duration }}</span>
            </div>
          </template>
          <p v-else class="text-sm text-usuzumi">Select a video to start</p>
        </div>
        <p class="text-[0.65rem] text-usuzumi font-mono">
          {{ completedCount }} completed
        </p>
      </div>

      <!-- Full practice view (focused) -->
      <div v-else class="space-y-3">

        <!-- Channel selector -->
        <div class="flex gap-1.5 overflow-x-auto pb-1">
          <button
            v-for="ch in shadowing.channels"
            :key="ch.id"
            class="flex-shrink-0 px-3 py-1.5 text-xs rounded-full border transition-colors"
            :class="shadowing.selectedChannelId.value === ch.id
              ? 'bg-ai text-white border-ai'
              : 'border-koshi text-sumi hover:bg-koshi/40'"
            @click="shadowing.selectChannel(ch.id)"
          >
            {{ ch.name }}
          </button>
        </div>

        <!-- Level filter + random pick -->
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <button
              class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
              :class="!shadowing.filterLevel.value ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
              @click="shadowing.filterLevel.value = ''"
            >
              All
            </button>
            <button
              v-for="lvl in ['N5', 'N4', 'N3', 'N2', 'N1']"
              :key="lvl"
              class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
              :class="shadowing.filterLevel.value === lvl ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
              @click="shadowing.filterLevel.value = lvl"
            >
              {{ lvl }}
            </button>
          </div>
          <button
            class="ml-auto px-3 py-1 text-xs rounded-md bg-beni/10 text-beni hover:bg-beni/20 transition-colors"
            @click="shadowing.randomPick()"
          >
            🎲 Random
          </button>
        </div>

        <!-- Practice panel (only when a video is selected) -->
        <template v-if="shadowing.selectedVideo.value">

          <!-- Step stepper -->
          <div class="flex items-center">
            <template v-for="(s, i) in STEPS" :key="i">
              <div class="flex flex-col items-center">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors"
                  :class="i < currentStep
                    ? 'bg-matcha border-matcha text-white'
                    : i === currentStep
                      ? 'bg-ai border-ai text-white'
                      : 'border-koshi text-usuzumi bg-surface'"
                >
                  <span v-if="i < currentStep">✓</span>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="text-[0.5rem] mt-0.5 text-center leading-tight w-12 truncate"
                  :class="i === currentStep ? 'text-ai font-medium' : 'text-usuzumi'"
                >
                  {{ s.shortName }}
                </span>
              </div>
              <div
                v-if="i < 3"
                class="flex-1 h-0.5 mb-3"
                :class="i < currentStep ? 'bg-matcha' : 'bg-koshi'"
              />
            </template>
          </div>

          <!-- Step instruction -->
          <div class="rounded-lg bg-koshi/20 px-3 py-2">
            <p class="text-xs font-medium text-sumi">{{ STEPS[currentStep].name }}</p>
            <p class="text-[0.7rem] text-usuzumi mt-0.5 leading-snug">{{ STEPS[currentStep].desc }}</p>
          </div>

          <!-- YouTube player -->
          <div class="aspect-video rounded-lg overflow-hidden bg-sumi/5">
            <div ref="playerContainer" class="w-full h-full" />
          </div>

          <!-- Playback controls -->
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Speed -->
            <div class="flex gap-1">
              <button
                class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
                :class="playbackRate === 0.75 ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
                @click="setRate(0.75)"
              >
                0.75×
              </button>
              <button
                class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
                :class="playbackRate === 1 ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
                @click="setRate(1)"
              >
                1×
              </button>
            </div>
            <!-- Replay 5s -->
            <button
              class="px-2 py-1 text-[0.65rem] rounded border border-koshi text-usuzumi hover:bg-koshi/40 transition-colors"
              @click="replay5s()"
            >
              ⟳ 5s
            </button>
            <!-- A-B Loop -->
            <div class="flex gap-1 ml-auto">
              <button
                class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
                :class="loopStart !== null ? 'border-ai text-ai bg-ai/10' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
                @click="setLoopA()"
              >
                A{{ loopStart !== null ? ': ' + formatTime(loopStart) : '' }}
              </button>
              <button
                class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
                :class="loopEnd !== null ? 'border-ai text-ai bg-ai/10' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
                @click="setLoopB()"
              >
                B{{ loopEnd !== null ? ': ' + formatTime(loopEnd) : '' }}
              </button>
              <button
                v-if="loopStart !== null || loopEnd !== null"
                class="px-2 py-1 text-[0.65rem] rounded border border-beni/40 text-beni hover:bg-beni/10 transition-colors"
                @click="clearLoop()"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Step 4: Record & Compare -->
          <div v-if="currentStep === 3" class="rounded-lg border border-koshi p-3 space-y-2">
            <p class="text-xs font-medium text-sumi">Pronunciation Check</p>

            <!-- Target phrase input -->
            <textarea
              v-model="targetPhrase"
              placeholder="Type the phrase you want to shadow (pause the video, copy what the speaker said)..."
              class="w-full px-3 py-2 text-sm rounded-md border border-koshi bg-surface/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-2 focus:ring-ai/30 resize-none"
              rows="2"
            />

            <!-- Record controls -->
            <div class="flex items-center gap-2">
              <button
                v-if="!isRecording && !processingRecording"
                :disabled="!targetPhrase.trim()"
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors"
                :class="targetPhrase.trim()
                  ? 'bg-beni text-white hover:bg-beni/90'
                  : 'bg-koshi/50 text-usuzumi cursor-not-allowed'"
                @click="startRecording()"
              >
                🎤 Record
              </button>
              <button
                v-else-if="isRecording"
                class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-sumi text-white hover:bg-sumi/80 transition-colors"
                @click="stopRecording()"
              >
                ⏹ Stop
              </button>
              <span v-else class="text-xs text-usuzumi">Scoring…</span>
              <span v-if="isRecording" class="text-xs text-beni animate-pulse">● Recording</span>
              <span v-if="azureKey" class="ml-auto text-[0.55rem] text-usuzumi font-mono">Azure STT</span>
              <span v-else class="ml-auto text-[0.55rem] text-usuzumi font-mono">Web Speech</span>
            </div>

            <!-- Recording result -->
            <div v-if="recordingResult" class="space-y-2">
              <!-- Error -->
              <p v-if="recordingResult.type === 'error'" class="text-xs text-beni">
                {{ recordingResult.error }}
              </p>

              <template v-else>
                <!-- Score -->
                <div class="flex items-center gap-2">
                  <span
                    class="text-lg font-bold tabular-nums"
                    :class="recordingResult.score >= 80 ? 'text-matcha' : recordingResult.score >= 50 ? 'text-amber-600' : 'text-beni'"
                  >
                    {{ recordingResult.score }}%
                  </span>
                  <span class="text-xs text-usuzumi">
                    {{ recordingResult.score >= 80 ? 'Excellent!' : recordingResult.score >= 50 ? 'Keep going' : 'Try again' }}
                  </span>
                </div>

                <!-- Azure: word-level chips -->
                <div v-if="recordingResult.type === 'azure' && recordingResult.words?.length" class="flex flex-wrap gap-1">
                  <span
                    v-for="w in recordingResult.words"
                    :key="w.word"
                    class="px-1.5 py-0.5 rounded text-xs"
                    :class="w.score >= 80 ? 'bg-matcha/15 text-matcha' : w.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-beni/15 text-beni'"
                  >
                    {{ w.word }}
                  </span>
                </div>

                <!-- Web Speech: mora tiles -->
                <div v-if="recordingResult.type === 'webspeech' && recordingResult.breakdown?.length" class="flex flex-wrap gap-0.5">
                  <span
                    v-for="(m, i) in recordingResult.breakdown"
                    :key="i"
                    class="w-6 h-6 flex items-center justify-center text-xs rounded"
                    :class="m.match ? 'bg-matcha/15 text-matcha' : 'bg-beni/15 text-beni'"
                  >
                    {{ m.expected || '?' }}
                  </span>
                </div>

                <!-- Heard transcript -->
                <p class="text-[0.65rem] text-usuzumi">Heard: {{ recordingResult.heard }}</p>
              </template>
            </div>
          </div>

          <!-- Step navigation -->
          <div class="flex items-center justify-between">
            <button
              class="text-[0.65rem] text-usuzumi hover:text-sumi transition-colors"
              @click="resetProgress()"
            >
              ↺ Reset
            </button>
            <button
              v-if="currentStep < 3"
              class="px-4 py-1.5 text-xs font-medium rounded-md bg-ai text-white hover:bg-ai/90 transition-colors"
              @click="advanceStep()"
            >
              Next Step →
            </button>
            <button
              v-else
              class="px-4 py-1.5 text-xs font-medium rounded-md transition-colors"
              :class="shadowing.isCompleted(shadowing.selectedVideoId.value)
                ? 'bg-matcha/15 text-matcha'
                : 'bg-matcha text-white hover:bg-matcha/90'"
              @click="completeVideo()"
            >
              {{ shadowing.isCompleted(shadowing.selectedVideoId.value) ? '✓ Completed' : 'Mark Complete ✓' }}
            </button>
          </div>

        </template>

        <!-- Video list -->
        <div class="max-h-[40vh] overflow-y-auto space-y-1 pr-1">
          <div
            v-for="video in shadowing.filteredVideos.value"
            :key="video.id"
            class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors"
            :class="shadowing.selectedVideoId.value === video.id ? 'bg-ai-light/50' : 'hover:bg-koshi/30'"
            @click="shadowing.selectVideo(video.id)"
          >
            <span v-if="shadowing.isCompleted(video.id)" class="text-matcha text-xs">✓</span>
            <span v-else class="text-usuzumi/40 text-xs">○</span>
            <span class="text-sm flex-1 truncate">{{ video.title }}</span>
            <span class="px-1.5 py-0.5 text-[0.55rem] rounded bg-ai-light text-ai font-medium">{{ video.level }}</span>
            <span class="text-[0.65rem] text-usuzumi tabular-nums">{{ video.duration }}</span>
          </div>
          <p v-if="shadowing.filteredVideos.value.length === 0" class="text-center text-usuzumi text-xs py-3">
            No videos for this filter
          </p>
        </div>

        <!-- Channel link -->
        <a
          v-if="shadowing.selectedChannel.value"
          :href="shadowing.selectedChannel.value.channelUrl"
          target="_blank"
          rel="noopener"
          class="block text-center text-[0.65rem] text-ai hover:underline"
        >
          Visit {{ shadowing.selectedChannel.value.name }} on YouTube →
        </a>

        <!-- Shadowing tips -->
        <details class="text-xs text-usuzumi">
          <summary class="cursor-pointer hover:text-sumi">Shadowing tips</summary>
          <ul class="mt-1.5 ml-4 space-y-1 list-disc">
            <li>Listen to a short phrase, then immediately repeat it aloud</li>
            <li>Focus on mimicking rhythm, pitch, and intonation</li>
            <li>Start with slow content, gradually increase speed</li>
            <li>Don't worry about understanding every word at first</li>
            <li>Repeat the same video multiple times for best results</li>
          </ul>
        </details>

      </div>

    </template>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { useShadowing } from '../../composables/useShadowing.js'
import { useLocalStorage } from '../../composables/useLocalStorage.js'
import { recognizeWithAzure } from '../../services/azure-speech.js'
import { compareReading } from '../../utils/pronunciation.js'

const shadowing = useShadowing()
const azureKey = useLocalStorage('japandash:azure-speech-key', '')
const azureRegion = useLocalStorage('japandash:azure-speech-region', 'eastus')

const completedCount = computed(() =>
  shadowing.channels.reduce((total, ch) =>
    total + ch.videos.filter(v => shadowing.isCompleted(v.id)).length, 0)
)

const currentStep = computed(() =>
  shadowing.getProgress(shadowing.selectedVideoId.value)?.step ?? 0
)

const STEPS = [
  { shortName: 'Listen', name: 'Blind Listen', desc: 'Watch naturally. Let the rhythm and sounds wash over you without worrying about understanding everything.' },
  { shortName: 'Read', name: 'Listen + Read', desc: 'Replay segments with the A–B loop. Pause to identify individual words and phrases.' },
  { shortName: 'Shadow', name: 'Shadow Aloud', desc: 'Set speed to 0.75×. Speak immediately after—or along with—the speaker. Focus on rhythm and intonation.' },
  { shortName: 'Record', name: 'Record & Compare', desc: 'Pause at a phrase. Type it below, then record yourself to get a pronunciation score.' },
]

// YT Player
const playerContainer = ref(null)
let ytPlayer = null
const playerReady = ref(false)
const playbackRate = ref(1)

// A-B loop
const loopStart = ref(null)
const loopEnd = ref(null)
let loopInterval = null

// Step 4 recording
const targetPhrase = ref('')
const isRecording = ref(false)
const processingRecording = ref(false)
const recordingResult = ref(null)
let mediaRecorder = null
let audioChunks = []
let recognizer = null

// YT API singleton loader (module-level so shared across hot-reloads)
let ytApiPromise = null
function loadYTApi() {
  if (!ytApiPromise) {
    ytApiPromise = new Promise(resolve => {
      if (window.YT?.Player) { resolve(); return }
      window.onYouTubeIframeAPIReady = resolve
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    })
  }
  return ytApiPromise
}

function createPlayer(videoId) {
  const container = playerContainer.value
  if (!container) return
  playerReady.value = false
  container.innerHTML = ''
  const el = document.createElement('div')
  container.appendChild(el)
  ytPlayer = new window.YT.Player(el, {
    videoId,
    playerVars: { rel: 0, modestbranding: 1 },
    events: {
      onReady: () => {
        playerReady.value = true
        ytPlayer.setPlaybackRate(playbackRate.value)
      },
    },
  })
}

async function initPlayer(videoId) {
  await loadYTApi()
  createPlayer(videoId)
}

// Create player when container enters the DOM (widget focused)
watch(playerContainer, async (el) => {
  if (!el) {
    clearLoop()
    ytPlayer = null
    playerReady.value = false
    return
  }
  if (shadowing.selectedVideoId.value) {
    await initPlayer(shadowing.selectedVideoId.value)
  }
})

// Update player when selected video changes
watch(() => shadowing.selectedVideoId.value, async (id) => {
  stopAnyRecording()
  recordingResult.value = null
  targetPhrase.value = ''
  if (!id) return
  await nextTick()
  if (!playerContainer.value) return
  if (ytPlayer && playerReady.value) {
    ytPlayer.loadVideoById(id)
  } else {
    await initPlayer(id)
  }
})

// Clear recording results when stepping
watch(currentStep, () => {
  recordingResult.value = null
  targetPhrase.value = ''
})

// Playback controls
function setRate(rate) {
  playbackRate.value = rate
  ytPlayer?.setPlaybackRate(rate)
}

function replay5s() {
  if (!ytPlayer) return
  ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 5), true)
}

function setLoopA() {
  if (!ytPlayer) return
  loopStart.value = ytPlayer.getCurrentTime()
}

function setLoopB() {
  if (!ytPlayer) return
  const t = ytPlayer.getCurrentTime()
  if (loopStart.value !== null && t > loopStart.value) {
    loopEnd.value = t
    startLoop()
  }
}

function startLoop() {
  if (loopInterval) clearInterval(loopInterval)
  loopInterval = setInterval(() => {
    if (!ytPlayer || loopStart.value === null || loopEnd.value === null) return
    if (ytPlayer.getCurrentTime() >= loopEnd.value) {
      ytPlayer.seekTo(loopStart.value, true)
    }
  }, 250)
}

function clearLoop() {
  if (loopInterval) { clearInterval(loopInterval); loopInterval = null }
  loopStart.value = null
  loopEnd.value = null
}

function formatTime(secs) {
  if (secs === null) return '–'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

// Step navigation
function advanceStep() {
  shadowing.advanceStep(shadowing.selectedVideoId.value)
}

function completeVideo() {
  shadowing.markCompleted(shadowing.selectedVideoId.value)
}

function resetProgress() {
  shadowing.resetProgress(shadowing.selectedVideoId.value)
  recordingResult.value = null
  targetPhrase.value = ''
}

// Recording
async function startRecording() {
  stopAnyRecording()
  recordingResult.value = null

  if (azureKey.value) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunks = []
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data) }
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' })
        processingRecording.value = true
        try {
          const result = await recognizeWithAzure(blob, targetPhrase.value, azureKey.value, azureRegion.value)
          recordingResult.value = { type: 'azure', ...result }
        } catch (err) {
          recordingResult.value = { type: 'error', error: err.message }
        }
        processingRecording.value = false
      }
      mediaRecorder.start()
      isRecording.value = true
    } catch {
      recordingResult.value = { type: 'error', error: 'Microphone access denied.' }
    }
  } else {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      recordingResult.value = { type: 'error', error: 'Speech recognition not supported. Add an Azure key to enable recording.' }
      return
    }
    recognizer = new SR()
    recognizer.lang = 'ja-JP'
    recognizer.interimResults = false
    recognizer.maxAlternatives = 3
    recognizer.onresult = (e) => {
      const alts = Array.from(e.results[0])
      let best = { score: -1, heard: '' }
      for (const alt of alts) {
        const { score } = compareReading(targetPhrase.value, alt.transcript)
        if (score > best.score) best = { score, heard: alt.transcript }
      }
      const { score, breakdown } = compareReading(targetPhrase.value, best.heard)
      recordingResult.value = { type: 'webspeech', score, heard: best.heard, breakdown }
      isRecording.value = false
    }
    recognizer.onerror = () => { isRecording.value = false }
    recognizer.onend = () => { isRecording.value = false }
    recognizer.start()
    isRecording.value = true
  }
}

function stopRecording() {
  if (mediaRecorder?.state === 'recording') {
    mediaRecorder.stop()
    isRecording.value = false
  }
  if (recognizer) {
    recognizer.stop()
  }
}

function stopAnyRecording() {
  if (mediaRecorder?.state === 'recording') mediaRecorder.stop()
  if (recognizer) recognizer.stop()
  mediaRecorder = null
  recognizer = null
  isRecording.value = false
  processingRecording.value = false
}

onBeforeUnmount(() => {
  clearLoop()
  stopAnyRecording()
})
</script>
