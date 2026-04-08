<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';

const store = useGameStore();

const opponents = computed(() =>
  store.players
    .map((p, idx) => ({ ...p, idx }))
    .filter(p => p.idx !== store.currentPlayerIdx)
);
</script>

<template>
  <div class="overlay-backdrop">
    <div class="overlay-panel">
      <div class="overlay-title">📺 TV Station</div>
      <div class="overlay-sub">Choose a player to take 5 coins from.</div>
      <div class="overlay-list">
        <div
          v-for="p in opponents"
          :key="p.idx"
          class="overlay-item"
          @click="store.pickTVStationTarget(p.idx)"
        >
          <span class="overlay-item-name" :style="{ color: p.color }">{{ p.name }}</span>
          <span class="overlay-item-coins">💰 {{ p.coins }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
