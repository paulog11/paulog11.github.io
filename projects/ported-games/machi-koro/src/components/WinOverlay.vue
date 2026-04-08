<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import { LANDMARKS } from '../constants.js';

const store = useGameStore();

const standings = computed(() =>
  [...store.players]
    .map(p => ({
      ...p,
      lmCount: Object.values(p.landmarks).filter(Boolean).length,
    }))
    .sort((a, b) => b.lmCount - a.lmCount)
);
</script>

<template>
  <div class="overlay-backdrop win-overlay">
    <div class="overlay-panel" style="text-align:center;">
      <div class="win-trophy">🏆</div>
      <div class="win-player-name" :style="{ color: store.winnerData?.player?.color }">
        {{ store.winnerData?.player?.name }}
      </div>
      <div class="win-subtitle">Built all 4 landmarks — City complete!</div>

      <div class="win-standings">
        <div
          v-for="(p, i) in standings"
          :key="p.id"
          class="win-standing-row"
        >
          <span class="win-standing-rank">{{ i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.` }}</span>
          <span class="win-standing-name" :style="{ color: p.color }">{{ p.name }}</span>
          <span class="win-standing-lm">{{ p.lmCount }}/4 landmarks</span>
        </div>
      </div>

      <button class="btn-start" @click="store.resetAll()">Play Again</button>
    </div>
  </div>
</template>
