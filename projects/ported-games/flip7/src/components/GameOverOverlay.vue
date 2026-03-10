<template>
  <div class="gameover-overlay">
    <div class="gameover-panel">
      <span class="gameover-trophy">🏆</span>
      <div class="gameover-winner" :style="{ color: store.gameOverData.champion.color }">
        {{ store.gameOverData.champion.name }} Wins!
      </div>
      <div class="gameover-sub">with {{ store.gameOverData.champion.totalScore }} points</div>
      <div class="gameover-final summary-rows">
        <div
          v-for="(p, i) in store.gameOverData.players"
          :key="p.id"
          class="summary-row"
          :class="{ 'winner-row': i === 0 }"
        >
          <div style="font-family:'Fredoka One',cursive; font-size:18px; width:28px; color: var(--text-muted)">{{ i + 1 }}.</div>
          <div class="summary-dot" :style="{ background: p.color }"></div>
          <div class="summary-name">{{ p.name }}</div>
          <div class="summary-pts" style="margin-left:auto">{{ p.totalScore }}</div>
        </div>
      </div>
      <button class="btn-primary" @click="store.resetAll" style="width:100%">Play Again 🃏</button>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
