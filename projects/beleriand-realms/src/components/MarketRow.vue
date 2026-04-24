<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import PlayingCard from './PlayingCard.vue'
import { type Card, Faction } from '../types/game'

const store = useGameStore()
const { beleriandRow, beleriandDeck, gameState, players } = storeToRefs(store)

const emit = defineEmits<{ select: [card: Card] }>()

const emptySlotCount = computed(() => Math.max(0, 6 - beleriandRow.value.length))

// ── Active player context ─────────────────────────────────────────────────
const activeId   = computed(() => gameState.value.activePlayer)
const activeFaction  = computed(() => store.playerFactions[activeId.value])
const activeResources = computed(() => players.value[activeId.value].resources)
const activeAttack    = computed(() => players.value[activeId.value].attack)

// ── Per-card interaction helpers ──────────────────────────────────────────

// Same-faction or neutral cards are purchased with resources; opposing-faction
// cards are attacked (attack wiring pending — click still emits 'select').
function isPurchasable(card: Card): boolean {
  return card.faction === Faction.Neutral || card.faction === activeFaction.value
}

// A purchasable card is affordable when the active player has enough resources.
function canAffordPurchase(card: Card): boolean {
  return activeResources.value >= card.cost
}

// An attackable card is reachable when the active player has enough attack.
function canAffordAttack(card: Card): boolean {
  return activeAttack.value >= card.cost
}

// Unified affordability: drives the dim state on the wrapper.
function isAffordable(card: Card): boolean {
  return isPurchasable(card) ? canAffordPurchase(card) : canAffordAttack(card)
}

// ── Click handler ─────────────────────────────────────────────────────────
function handleCardClick(card: Card): void {
  if (isPurchasable(card)) {
    if (!canAffordPurchase(card)) return   // visually dimmed — silently ignore
    store.purchaseCard(activeId.value, card.id)
  } else {
    // Attackable card — emit upward for future combat UI wiring
    emit('select', card)
  }
}
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
        Each card is wrapped in a keyed div so the interaction badge can sit
        below it without breaking FLIP. The wrapper is the TransitionGroup's
        direct child (carries the key); the FLIP animation and leave-active
        position:absolute both apply to the wrapper, not the PlayingCard.
      -->
      <TransitionGroup name="market-card" tag="div" class="market-row-group">
        <div
          v-for="card in beleriandRow"
          :key="card.id"
          class="flex flex-col items-center gap-1.5 flex-shrink-0 transition-opacity duration-200"
          :class="{ 'opacity-40': !isAffordable(card) }"
        >
          <PlayingCard :card="card" @click="handleCardClick(card)" />

          <!-- Interaction badge — buy (◈) or attack (⚔) with cost -->
          <div
            class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border select-none"
            :class="isPurchasable(card)
              ? 'bg-free-peoples/10 text-free-peoples border-free-peoples/30'
              : 'bg-morgoth/10 text-morgoth-light border-morgoth/30'"
          >
            {{ isPurchasable(card) ? '◈' : '⚔' }} {{ card.cost }}
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty slot indicators — outside TransitionGroup to keep them out of FLIP -->
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
  wrappers stay visually anchored to their last known position.
*/
.market-row-group {
  display: flex;
  gap: 0.75rem; /* gap-3 */
  position: relative;
  align-items: flex-start;
}

/* ─── Entering wrapper ──────────────────────────────────────────────────────
   Replacement slides in from slightly above, delayed so the leave is underway. */
.market-card-enter-from {
  opacity: 0;
  transform: translateY(-14px) scale(0.92);
}
.market-card-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  transition-delay: 0.18s;
}
.market-card-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ─── Leaving wrapper ───────────────────────────────────────────────────────
   position:absolute removes it from flex flow so siblings FLIP into place.   */
.market-card-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.market-card-leave-active {
  position: absolute; /* ← critical for FLIP to work on siblings */
  pointer-events: none;
  transition: opacity 0.22s ease-in, transform 0.22s ease-in;
}
.market-card-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.88);
}

/* ─── Moving wrappers ───────────────────────────────────────────────────────
   FLIP: Vue animates the transform between pre- and post-layout positions.   */
.market-card-move {
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
