<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import PlayingCard from './PlayingCard.vue'
import { type Card, Faction } from '../types/game'

const props = defineProps<{
  // The in-play card whose attack is being assigned, or null if none selected.
  selectingAttacker: Card | null
}>()

const emit = defineEmits<{ attack: [card: Card] }>()

const store = useGameStore()
const { beleriandRow, beleriandDeck, gameState, players } = storeToRefs(store)

const emptySlotCount = computed(() => Math.max(0, 6 - beleriandRow.value.length))

// ── Active player context ─────────────────────────────────────────────────
const activeId      = computed(() => gameState.value.activePlayer)
const activeFaction = computed(() => store.playerFactions[activeId.value])
const activeResources = computed(() => players.value[activeId.value].resources)

// ── Per-card helpers ──────────────────────────────────────────────────────

function isPurchasable(card: Card): boolean {
  return card.faction === Faction.Neutral || card.faction === activeFaction.value
}

function isAttackable(card: Card): boolean {
  return card.faction !== Faction.Neutral && card.faction !== activeFaction.value
}

function canAffordPurchase(card: Card): boolean {
  return activeResources.value >= card.cost
}

// Damage dealt to this card so far this turn.
function damageOn(card: Card): number {
  return gameState.value.marketDamage[card.id] ?? 0
}

// Whether the selected attacker has enough attack to reach this card.
function canAttackWith(card: Card): boolean {
  return props.selectingAttacker !== null && props.selectingAttacker.attack > 0
    && isAttackable(card)
}

// Visual affordability — dims cards the player can't interact with.
function isAffordable(card: Card): boolean {
  if (props.selectingAttacker !== null) {
    // In attack-selection mode: only attackable cards with reachable cost are lit.
    return canAttackWith(card)
  }
  return isPurchasable(card) ? canAffordPurchase(card) : false
}

// Whether this card glows as a valid attack target right now.
function isTargeted(card: Card): boolean {
  return props.selectingAttacker !== null && canAttackWith(card)
}

// ── Click handler ─────────────────────────────────────────────────────────
function handleCardClick(card: Card): void {
  if (props.selectingAttacker !== null) {
    // Attack-assignment mode: only forward if this is a valid attack target.
    if (isAttackable(card)) emit('attack', card)
    return
  }
  // Normal mode: purchase.
  if (isPurchasable(card) && canAffordPurchase(card)) {
    store.purchaseCard(activeId.value, card.id)
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

      <TransitionGroup name="market-card" tag="div" class="market-row-group">
        <div
          v-for="card in beleriandRow"
          :key="card.id"
          class="flex flex-col items-center gap-1.5 flex-shrink-0 transition-opacity duration-200"
          :class="{
            'opacity-40': !isAffordable(card) && !isTargeted(card),
            'ring-2 ring-morgoth-light ring-offset-1 ring-offset-parchment rounded-xl': isTargeted(card),
            'rotate-180': card.faction === Faction.FreePeoples,
          }"
        >
          <PlayingCard :card="card" @click="handleCardClick(card)" />

          <!-- Health bar and badge rendered un-rotated so they stay readable from below -->
          <div
            class="flex flex-col items-center gap-1 w-full"
            :class="{ 'rotate-180': card.faction === Faction.FreePeoples }"
          >
            <!-- Health bar for attackable faction cards -->
            <div v-if="isAttackable(card)" class="w-full px-1">
              <div class="h-1.5 rounded-full bg-card-border overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-300"
                  :class="damageOn(card) >= card.cost ? 'bg-red-500' : 'bg-morgoth'"
                  :style="{ width: `${Math.min(100, (damageOn(card) / card.cost) * 100)}%` }"
                />
              </div>
              <div class="text-[9px] text-center text-muted/60 mt-0.5 tabular-nums">
                {{ damageOn(card) }}/{{ card.cost }} hp
              </div>
            </div>

            <!-- Interaction badge -->
            <div
              class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border select-none"
              :class="isPurchasable(card)
                ? 'bg-free-peoples/10 text-free-peoples border-free-peoples/30'
                : 'bg-morgoth/10 text-morgoth-light border-morgoth/30'"
            >
              {{ isPurchasable(card) ? '◈' : '⚔' }} {{ card.cost }}
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty slot indicators -->
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
.market-row-group {
  display: flex;
  gap: 0.75rem;
  position: relative;
  align-items: flex-start;
}

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

.market-card-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.market-card-leave-active {
  position: absolute;
  pointer-events: none;
  transition: opacity 0.22s ease-in, transform 0.22s ease-in;
}
.market-card-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.88);
}

.market-card-move {
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
