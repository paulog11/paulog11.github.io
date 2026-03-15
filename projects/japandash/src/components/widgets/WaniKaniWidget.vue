<template>
  <WidgetFrame title="WaniKani" icon="🐊" :loading="wk.loading.value" collapsible>
    <!-- No API key state -->
    <div v-if="!wk.hasKey.value" class="text-center py-4">
      <p class="text-usuzumi text-sm mb-2">Connect your WaniKani account</p>
      <p class="text-usuzumi/70 text-xs">
        Open <strong>Settings</strong> (gear icon) to enter your API key
      </p>
    </div>

    <!-- Error state -->
    <div v-else-if="wk.error.value" class="text-center py-4">
      <p class="text-beni text-sm mb-2">{{ wk.error.value }}</p>
      <button
        class="text-xs text-ai hover:underline"
        @click="wk.refresh()"
      >
        Try again
      </button>
    </div>

    <!-- Loaded state -->
    <div v-else-if="wk.user.value" class="space-y-4">
      <!-- Header: level + username -->
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-lg bg-ai text-white flex items-center justify-center font-display text-xl font-bold">
          {{ wk.user.value.level }}
        </div>
        <div>
          <p class="font-medium text-sm">{{ wk.user.value.username }}</p>
          <p class="text-usuzumi text-xs">Level {{ wk.user.value.level }}</p>
        </div>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-md bg-beni/10 px-3 py-2 text-center">
          <p class="text-2xl font-bold text-beni">{{ wk.reviewsAvailable.value }}</p>
          <p class="text-[0.65rem] text-usuzumi uppercase tracking-wide">Reviews</p>
        </div>
        <div class="rounded-md bg-ai/10 px-3 py-2 text-center">
          <p class="text-2xl font-bold text-ai">{{ wk.lessonsAvailable.value }}</p>
          <p class="text-[0.65rem] text-usuzumi uppercase tracking-wide">Lessons</p>
        </div>
      </div>

      <!-- SRS distribution -->
      <div>
        <p class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi mb-1.5">SRS Distribution</p>
        <div class="flex rounded-full overflow-hidden h-3 bg-koshi">
          <div
            v-for="stage in srsStages"
            :key="stage.key"
            :style="{ width: srsPercent(stage.key) + '%', backgroundColor: stage.color }"
            :title="`${stage.label}: ${wk.srsDistribution.value[stage.key]}`"
            class="transition-all duration-500"
          />
        </div>
        <div class="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          <span
            v-for="stage in srsStages"
            :key="stage.key"
            class="flex items-center gap-1 text-[0.6rem] text-usuzumi"
          >
            <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: stage.color }" />
            {{ stage.label }} {{ wk.srsDistribution.value[stage.key] }}
          </span>
        </div>
      </div>

      <!-- Upcoming reviews -->
      <div v-if="wk.upcomingReviews.value.length > 0">
        <p class="font-mono text-[0.6rem] uppercase tracking-wider text-usuzumi mb-1.5">Upcoming</p>
        <div class="flex gap-1 overflow-x-auto pb-1">
          <div
            v-for="(r, i) in wk.upcomingReviews.value.slice(0, 8)"
            :key="i"
            class="flex-shrink-0 text-center px-2 py-1 rounded bg-koshi/50"
          >
            <p class="text-xs font-medium">{{ r.count }}</p>
            <p class="text-[0.55rem] text-usuzumi">{{ formatTime(r.time) }}</p>
          </div>
        </div>
      </div>

      <!-- Link to WaniKani -->
      <a
        href="https://www.wanikani.com/dashboard"
        target="_blank"
        rel="noopener"
        class="block text-center text-xs text-ai hover:underline"
      >
        Open WaniKani →
      </a>
    </div>

    <!-- Initial loading placeholder -->
    <div v-else class="text-center py-6 text-usuzumi text-sm">
      Loading...
    </div>
  </WidgetFrame>
</template>

<script setup>
import WidgetFrame from '../WidgetFrame.vue'
import { useWaniKani } from '../../composables/useWaniKani.js'

const wk = useWaniKani()

const srsStages = [
  { key: 'apprentice', label: 'Apprentice', color: '#DD0093' },
  { key: 'guru', label: 'Guru', color: '#882D9E' },
  { key: 'master', label: 'Master', color: '#294DDB' },
  { key: 'enlightened', label: 'Enlightened', color: '#0093DD' },
  { key: 'burned', label: 'Burned', color: '#434343' },
]

const totalItems = () =>
  Object.values(wk.srsDistribution.value).reduce((a, b) => a + b, 0)

function srsPercent(key) {
  const total = totalItems()
  if (total === 0) return 0
  return (wk.srsDistribution.value[key] / total) * 100
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>
