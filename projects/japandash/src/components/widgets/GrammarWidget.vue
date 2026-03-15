<template>
  <WidgetFrame title="Grammar" icon="文" collapsible>
    <div class="space-y-3">
      <!-- Level tabs -->
      <div class="flex gap-1.5">
        <button
          v-for="lvl in levels"
          :key="lvl"
          class="px-2.5 py-1 text-[0.65rem] rounded border transition-colors"
          :class="selectedLevel === lvl ? 'bg-ai text-white border-ai' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
          @click="selectedLevel = lvl"
        >
          {{ lvl }}
        </button>
      </div>

      <!-- Grammar card -->
      <div v-if="currentPoint" class="rounded-lg bg-koshi/30 p-4">
        <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">
          {{ browseMode ? 'Browse' : "Today's Grammar" }}
        </p>

        <!-- Pattern -->
        <p class="text-2xl font-display font-semibold text-ai mb-1">{{ currentPoint.pattern }}</p>
        <p class="text-sm text-sumi">{{ currentPoint.meaning }}</p>

        <!-- Formation -->
        <div class="mt-3">
          <p class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi mb-1">Formation</p>
          <ul class="space-y-0.5">
            <li
              v-for="(f, i) in currentPoint.formation"
              :key="i"
              class="text-xs font-mono bg-white/50 rounded px-2 py-1"
            >
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Examples -->
        <div class="mt-3">
          <p class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi mb-1">Examples</p>
          <div
            v-for="(ex, i) in currentPoint.examples"
            :key="i"
            class="bg-white/50 rounded-md px-3 py-2 mb-1.5"
          >
            <p class="text-sm font-body">
              <template v-if="showFurigana && ex.furigana">{{ ex.furigana }}</template>
              <template v-else>{{ ex.ja }}</template>
            </p>
            <p class="text-xs text-usuzumi mt-0.5">{{ ex.en }}</p>
          </div>
        </div>

        <!-- Notes -->
        <p v-if="currentPoint.notes" class="mt-2 text-xs text-usuzumi italic">
          {{ currentPoint.notes }}
        </p>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <button
          class="flex-1 py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
          @click="showAnother"
        >
          Study Another
        </button>
        <button
          class="py-1.5 px-3 text-xs rounded-md border transition-colors"
          :class="showFurigana ? 'bg-ai text-white border-ai' : 'border-koshi text-sumi hover:bg-koshi/40'"
          @click="showFurigana = !showFurigana"
        >
          ふりがな
        </button>
        <button
          class="py-1.5 px-3 text-xs rounded-md transition-colors"
          :class="browseMode ? 'bg-ai text-white' : 'border border-koshi text-sumi hover:bg-koshi/40'"
          @click="browseMode = !browseMode"
        >
          {{ browseMode ? 'Daily' : 'Browse' }}
        </button>
      </div>

      <!-- Browse list -->
      <div v-if="browseMode" class="max-h-48 overflow-y-auto space-y-1 pr-1">
        <div
          v-for="(point, i) in filteredPoints"
          :key="point.id"
          class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-koshi/30 transition-colors"
          :class="{ 'bg-ai-light/30': currentPoint?.id === point.id }"
          @click="browseIndex = i"
        >
          <span
            v-if="studiedPoints.includes(point.id)"
            class="text-matcha text-xs"
          >✓</span>
          <span v-else class="text-usuzumi/40 text-xs">○</span>
          <span class="text-sm font-medium">{{ point.pattern }}</span>
          <span class="text-xs text-usuzumi flex-1 truncate">{{ point.meaning }}</span>
        </div>
        <p v-if="filteredPoints.length === 0" class="text-center text-usuzumi text-xs py-3">
          No grammar points for {{ selectedLevel }} yet
        </p>
      </div>

      <!-- Mark as studied -->
      <button
        v-if="currentPoint && !studiedPoints.includes(currentPoint.id)"
        class="w-full py-1.5 text-xs rounded-md bg-matcha/10 text-matcha hover:bg-matcha/20 transition-colors"
        @click="markStudied(currentPoint.id)"
      >
        Mark as Studied ✓
      </button>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { grammarPoints } from '../../data/grammar.js'
import { useLocalStorage } from '../../composables/useLocalStorage.js'

const levels = ['N5', 'N4', 'N3', 'N2', 'N1']
const selectedLevel = ref('N5')
const showFurigana = ref(false)
const browseMode = ref(false)
const browseIndex = ref(0)
const studiedPoints = useLocalStorage('japandash:grammar-studied', [])

const filteredPoints = computed(() =>
  grammarPoints.filter(p => p.level === selectedLevel.value)
)

// Date-seeded daily grammar
function getDailyIndex() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const points = filteredPoints.value
  return points.length > 0 ? seed % points.length : 0
}

const dailyIndex = ref(getDailyIndex())

const currentPoint = computed(() => {
  const points = filteredPoints.value
  if (points.length === 0) return null
  if (browseMode.value) {
    return points[browseIndex.value % points.length]
  }
  return points[dailyIndex.value % points.length]
})

function showAnother() {
  if (browseMode.value) {
    browseIndex.value = (browseIndex.value + 1) % filteredPoints.value.length
  } else {
    dailyIndex.value = (dailyIndex.value + 1) % filteredPoints.value.length
  }
}

function markStudied(id) {
  if (!studiedPoints.value.includes(id)) {
    studiedPoints.value = [...studiedPoints.value, id]
  }
}
</script>
