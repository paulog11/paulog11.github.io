<template>
  <div class="round-summary-overlay">
    <div class="round-summary-panel">
      <div class="summary-title">Round {{ store.summaryData.roundNum }} Over!</div>
      <div class="summary-subtitle">Scores for this round</div>
      <div class="summary-rows">
        <div
          v-for="r in store.summaryData.rows"
          :key="r.player.id"
          class="summary-row"
          :class="{ 'winner-row': r.earned === Math.max(...store.summaryData.rows.map(x => x.earned)) && r.earned > 0 }"
        >
          <div class="summary-dot" :style="{ background: r.player.color }"></div>
          <div>
            <div class="summary-name">{{ r.player.name }}</div>
            <div class="summary-detail">{{ r.status }}</div>
          </div>
          <div class="summary-pts">
            {{ r.player.totalScore }}
            <span class="pts-delta" :class="{ zero: r.earned === 0 }">+{{ r.earned }}</span>
          </div>
        </div>
      </div>
      <div style="text-align:center">
        <button class="btn-next" @click="store.continueSummary">
          {{ store.gameOverData ? '🏆 See Winner' : 'Next Round →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
