<script setup lang="ts">
import { computed } from 'vue'
import { type FateTrackPosition, FATE_TRACK_MIN, FATE_TRACK_MAX } from '../types/game'

const props = defineProps<{ fateTrack: FateTrackPosition }>()

// Percentage position of the marker along the track (0% = full shadow, 100% = full light)
const markerPct = computed(() =>
  ((props.fateTrack - FATE_TRACK_MIN) / (FATE_TRACK_MAX - FATE_TRACK_MIN)) * 100,
)

const dominance = computed(() => {
  if (props.fateTrack <= -7) return { label: 'Shadow Dominates', color: 'text-morgoth-light' }
  if (props.fateTrack >= 7)  return { label: 'Light Prevails',   color: 'text-free-peoples' }
  return { label: 'Contested', color: 'text-muted' }
})

// Tick marks at every 5 steps: -10, -5, 0, +5, +10
const ticks = [-10, -5, 0, 5, 10]
</script>

<template>
  <div class="flex flex-col items-center gap-2 w-full max-w-lg select-none">

    <!-- Labels -->
    <div class="flex items-center justify-between w-full text-xs font-inscription font-bold uppercase tracking-inscription">
      <span class="text-morgoth-light">◀ Shadow</span>
      <span class="text-sm" :class="dominance.color">{{ dominance.label }}</span>
      <span class="text-free-peoples">Light ▶</span>
    </div>

    <!-- Track -->
    <div class="relative w-full h-6 flex items-center">

      <!-- Gradient bar -->
      <div class="absolute inset-0 rounded-full overflow-hidden"
           style="background: linear-gradient(to right, #4A0A0A, #3d2f14 45%, #3d2f14 55%, #7A6010);">
        <!-- Centre line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-px bg-muted/40" />
      </div>

      <!-- Tick marks -->
      <div
        v-for="tick in ticks"
        :key="tick"
        class="absolute top-0 bottom-0 flex items-end justify-center"
        :style="{ left: `${((tick - FATE_TRACK_MIN) / (FATE_TRACK_MAX - FATE_TRACK_MIN)) * 100}%` }"
      >
        <span class="text-[8px] text-muted/70 mb-[-14px] -translate-x-1/2">{{ tick }}</span>
        <div class="w-px h-2 bg-muted/50 mb-0" />
      </div>

      <!-- Marker -->
      <div
        class="absolute flex items-center justify-center
               w-5 h-5 rounded-full border-2 border-ink bg-ink shadow-lg
               transition-all duration-500 ease-in-out -translate-x-1/2 z-10"
        :style="{ left: `${markerPct}%` }"
      >
        <div
          class="w-2 h-2 rounded-full"
          :class="fateTrack < 0 ? 'bg-morgoth' : fateTrack > 0 ? 'bg-free-peoples' : 'bg-muted'"
        />
      </div>
    </div>

    <!-- Numeric readout -->
    <p class="text-muted text-[10px] font-inscription tracking-inscription tabular-nums">
      Fate: <span class="font-bold" :class="dominance.color">{{ fateTrack > 0 ? '+' : '' }}{{ fateTrack }}</span>
      &nbsp;/&nbsp;{{ FATE_TRACK_MAX }}
    </p>

  </div>
</template>
