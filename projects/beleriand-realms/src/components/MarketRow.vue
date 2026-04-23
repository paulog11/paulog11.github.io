<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import PlayingCard from './PlayingCard.vue'
import type { Card } from '../types/game'

const store = useGameStore()
const { beleriandRow, beleriandDeck } = storeToRefs(store)

const emit = defineEmits<{ select: [card: Card] }>()

const emptySlotCount = computed(() => Math.max(0, 6 - beleriandRow.value.length))
</script>

<template>
  <div class="flex flex-col gap-3">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-xs font-bold uppercase tracking-widest text-muted">Beleriand Row</h2>
      <span class="text-[10px] text-muted/60">
        {{ beleriandRow.length }}/6 visible · {{ beleriandDeck.length }} in deck
      </span>
    </div>

    <!-- Row -->
    <div class="flex gap-3 items-start">

      <!--
        TransitionGroup must render a real DOM element (tag="div") so Vue can:
          1. Capture FLIP positions on siblings during leave
          2. Set the absolute-positioned leaving card relative to this container
      -->
      <TransitionGroup name="market-card" tag="div" class="market-row-group">
        <PlayingCard
          v-for="card in beleriandRow"
          :key="card.id"
          :card="card"
          @click="emit('select', card)"
        />
      </TransitionGroup>

      <!-- Empty slot indicators — outside TransitionGroup so they don't participate in FLIP -->
      <div
        v-for="i in emptySlotCount"
        :key="`empty-${i}`"
        class="w-40 h-60 flex-shrink-0 rounded-xl border-2 border-dashed border-card-border/40
               flex items-center justify-center"
      >
        <span class="text-muted/20 text-3xl">✦</span>
      </div>

    </div>
  </div>
</template>

<style scoped>
/*
  The group container: flex row, relative so absolute-positioned leaving
  cards stay visually anchored to their last known position.
*/
.market-row-group {
  display: flex;
  gap: 0.75rem; /* gap-3 */
  position: relative;
  align-items: flex-start;
}

/* ─── Entering card ─────────────────────────────────────────────────────────
   New replacement slides in from slightly above and scales up from 90%.
   Delayed so it starts after the leave animation is underway.           */
.market-card-enter-from {
  opacity: 0;
  transform: translateY(-14px) scale(0.92);
}
.market-card-enter-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
  transition-delay: 0.18s;
}
.market-card-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── Leaving card ──────────────────────────────────────────────────────────
   Removed card slides down and fades. position: absolute takes it out of
   the flex flow immediately, so siblings can FLIP into their new spots.  */
.market-card-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.market-card-leave-active {
  position: absolute; /* ← critical for FLIP to work on siblings */
  pointer-events: none;
  transition:
    opacity 0.22s ease-in,
    transform 0.22s ease-in;
}
.market-card-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.88);
}

/* ─── Moving cards ──────────────────────────────────────────────────────────
   FLIP: Vue records each card's pre- and post-layout positions, then
   applies a CSS transition on transform to animate between them.         */
.market-card-move {
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
