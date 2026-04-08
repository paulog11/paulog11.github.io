<script setup>
import { computed, ref } from 'vue';
import { useGameStore } from '../stores/game.js';
import { ESTABLISHMENTS, TYPE } from '../constants.js';
import { estIconEmoji } from '../cardUtils.js';

const store = useGameStore();

const step = computed(() => store.pendingInteraction?.step ?? 1);
const opponentIdx = computed(() => store.pendingInteraction?.opponentIdx ?? -1);

const opponents = computed(() =>
  store.players
    .map((p, idx) => ({ ...p, idx }))
    .filter(p => p.idx !== store.currentPlayerIdx)
);

// Non-purple establishments with count > 0
function nonPurpleOwned(playerIdx) {
  const player = store.players[playerIdx];
  return ESTABLISHMENTS
    .filter(e => e.type !== TYPE.PURPLE && (player.establishments[e.id] || 0) > 0)
    .map(e => ({ ...e, count: player.establishments[e.id], icon: estIconEmoji(e.icon) }));
}

const myCards = computed(() => nonPurpleOwned(store.currentPlayerIdx));
const oppCards = computed(() => opponentIdx.value >= 0 ? nonPurpleOwned(opponentIdx.value) : []);

const selectedMyId  = ref(null);
const selectedOppId = ref(null);

function pickOpponent(idx) {
  store.pickBusinessCenterOpponent(idx);
  selectedMyId.value = null;
  selectedOppId.value = null;
}

function confirmSwap() {
  if (!selectedMyId.value || !selectedOppId.value) return;
  store.pickBusinessCenterSwap(selectedMyId.value, selectedOppId.value);
}
</script>

<template>
  <div class="overlay-backdrop">
    <div class="overlay-panel">
      <div class="overlay-title">🏢 Business Center</div>

      <!-- Step 1: pick opponent -->
      <template v-if="step === 1">
        <div class="overlay-sub">Choose an opponent to trade with.</div>
        <div class="overlay-list">
          <div
            v-for="p in opponents"
            :key="p.idx"
            class="overlay-item"
            @click="pickOpponent(p.idx)"
          >
            <span class="overlay-item-name" :style="{ color: p.color }">{{ p.name }}</span>
            <span class="overlay-item-coins">💰 {{ p.coins }}</span>
          </div>
        </div>
      </template>

      <!-- Step 2: pick cards to swap -->
      <template v-else>
        <div class="overlay-sub">Pick one of your buildings and one of theirs to swap.</div>
        <div class="bc-swap-cols">
          <div class="bc-swap-col">
            <h5>Your buildings</h5>
            <div class="bc-card-list">
              <div
                v-for="est in myCards"
                :key="est.id"
                class="bc-card-item"
                :class="{ selected: selectedMyId === est.id }"
                @click="selectedMyId = est.id"
              >{{ est.icon }} {{ est.name }}{{ est.count > 1 ? ` ×${est.count}` : '' }}</div>
            </div>
          </div>
          <div class="bc-swap-col">
            <h5>Their buildings</h5>
            <div class="bc-card-list">
              <div
                v-for="est in oppCards"
                :key="est.id"
                class="bc-card-item"
                :class="{ selected: selectedOppId === est.id }"
                @click="selectedOppId = est.id"
              >{{ est.icon }} {{ est.name }}</div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-yes"
          style="margin-top:14px;width:100%;"
          :disabled="!selectedMyId || !selectedOppId"
          @click="confirmSwap"
        >Confirm Swap</button>
      </template>
    </div>
  </div>
</template>
