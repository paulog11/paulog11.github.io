<template>
  <div class="score-bar">
    <div
      v-for="(p, i) in store.players"
      :key="p.id"
      class="score-chip"
      :class="{
        'active-player': i === store.currentPlayerIdx && !store.showingSummary,
        'busted': p.busted,
        'frozen': p.frozen,
      }"
    >
      <div class="score-chip-dot" :style="{ background: p.color }"></div>
      <div>
        <div class="score-chip-name">{{ p.name }}</div>
        <div class="score-progress">
          <div
            class="score-progress-fill"
            :style="{ width: Math.min(100, p.totalScore / store.winScore * 100) + '%', background: p.color }"
          ></div>
        </div>
      </div>
      <div class="score-chip-pts">{{ p.totalScore }}</div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
