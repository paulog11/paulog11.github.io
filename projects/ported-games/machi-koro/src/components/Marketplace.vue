<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import { ESTABLISHMENTS, LANDMARKS, TYPE } from '../constants.js';
import { landmarkEmoji } from '../cardUtils.js';
import EstablishmentCard from './EstablishmentCard.vue';

const store = useGameStore();

const player = computed(() => store.currentPlayer);

function canAfford(cost) {
  return (player.value?.coins ?? 0) >= cost;
}

function isAlreadyOwnedPurple(estId, type) {
  if (type !== TYPE.PURPLE) return false;
  return (player.value?.establishments[estId] ?? 0) >= 1;
}

function supplyFor(estId) {
  return store.supply[estId] ?? 0;
}

// Only show cards that are in supply
const availableEsts = computed(() =>
  ESTABLISHMENTS.filter(e => supplyFor(e.id) > 0)
);
</script>

<template>
  <div class="marketplace">
    <div class="marketplace-title">🏪 Marketplace</div>

    <!-- Landmarks -->
    <div class="marketplace-section">
      <div class="marketplace-section-label">Landmarks</div>
      <div class="landmark-buy-list">
        <div v-for="lm in LANDMARKS" :key="lm.id" class="landmark-buy-row">
          <div class="landmark-buy-info">
            <span class="landmark-buy-icon">{{ landmarkEmoji(lm.id) }}</span>
            <div>
              <div class="landmark-buy-name">{{ lm.name }}</div>
              <div class="landmark-buy-desc">{{ lm.description }}</div>
            </div>
          </div>
          <span v-if="player?.landmarks[lm.id]" class="landmark-built-badge">✓ Built</span>
          <button
            v-else
            class="btn btn-yes"
            style="font-size:12px;padding:6px 12px;"
            :disabled="!store.canBuy || !canAfford(lm.cost)"
            @click="store.buyLandmark(lm.id)"
          >💰{{ lm.cost }}</button>
        </div>
      </div>
    </div>

    <div class="section-divider"></div>

    <!-- Establishments -->
    <div class="marketplace-section">
      <div class="marketplace-section-label">Establishments</div>
      <div class="est-card-grid">
        <EstablishmentCard
          v-for="est in availableEsts"
          :key="est.id"
          :establishment="est"
          :supply="supplyFor(est.id)"
          :can-afford="canAfford(est.cost)"
          :can-buy="store.canBuy"
          :already-owned="isAlreadyOwnedPurple(est.id, est.type)"
          @buy="store.buyEstablishment($event)"
        />
      </div>
    </div>

    <div v-if="store.canBuy" style="margin-top:12px;text-align:center;">
      <button class="btn btn-skip" @click="store.skipBuy()">Skip — End Turn</button>
    </div>
  </div>
</template>
