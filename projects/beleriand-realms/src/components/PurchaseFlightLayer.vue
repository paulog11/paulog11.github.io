<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import PlayingCard from './PlayingCard.vue'
import { usePurchaseFx, type FlightEntry } from '../composables/usePurchaseFx'

const { flights } = usePurchaseFx()

// Track which flights are "in-flight" (have started their CSS transition).
// On mount we set the start position, then on next tick apply the end style.
interface ActiveFlight {
  key: number
  entry: FlightEntry
  arrived: boolean
}

const active = ref<ActiveFlight[]>([])

watch(flights, (newFlights) => {
  // Detect newly added entries.
  for (const f of newFlights) {
    if (!active.value.some(a => a.key === f.key)) {
      active.value.push({ key: f.key, entry: f, arrived: false })
      // Next tick: flip to arrived state so the CSS transition fires.
      nextTick(() => {
        const item = active.value.find(a => a.key === f.key)
        if (item) item.arrived = true
        // Remove after flight completes.
        setTimeout(() => {
          const idx = active.value.findIndex(a => a.key === f.key)
          if (idx !== -1) active.value.splice(idx, 1)
        }, 700)
      })
    }
  }
}, { deep: true })

function startStyle(entry: FlightEntry) {
  return {
    position: 'fixed' as const,
    left: `${entry.fromRect.left}px`,
    top: `${entry.fromRect.top}px`,
    width: `${entry.fromRect.width}px`,
    height: `${entry.fromRect.height}px`,
    opacity: '1',
    transform: 'translate(0, 0) scale(1)',
    transformOrigin: 'top left',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.55s ease-in',
    pointerEvents: 'none' as const,
    zIndex: 30,
  }
}

function endStyle(entry: FlightEntry) {
  const dx = entry.toRect.left - entry.fromRect.left + (entry.toRect.width - entry.fromRect.width) / 2
  const dy = entry.toRect.top - entry.fromRect.top + (entry.toRect.height - entry.fromRect.height) / 2
  return {
    ...startStyle(entry),
    transform: `translate(${dx}px, ${dy}px) scale(0.28)`,
    opacity: '0',
  }
}
</script>

<template>
  <div class="fixed inset-0 pointer-events-none" style="z-index: 30;">
    <div
      v-for="item in active"
      :key="item.key"
      :style="item.arrived ? endStyle(item.entry) : startStyle(item.entry)"
    >
      <PlayingCard :card="item.entry.card" @click="() => {}" />
    </div>
  </div>
</template>
