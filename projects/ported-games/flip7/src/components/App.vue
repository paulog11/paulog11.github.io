<template>
  <!-- Stars background -->
  <div class="stars"></div>

  <!-- Home button -->
  <a href="../../../../" class="home-btn">← Home</a>

  <!-- Confetti -->
  <div v-if="store.showConfetti" class="confetti-container">
    <div
      v-for="p in store.confettiPieces"
      :key="p.id"
      class="confetti-piece"
      :style="{
        left: p.left + '%',
        top: '-20px',
        width: p.size + 'px',
        height: p.size + 'px',
        background: p.color,
        transform: 'rotate(' + p.rotate + 'deg)',
        animationDuration: p.duration + 's',
        animationDelay: p.delay + 's',
      }"
    ></div>
  </div>

  <!-- Toast -->
  <div v-if="store.toast" class="event-toast">
    <div class="toast-inner">{{ store.toast }}</div>
  </div>

  <!-- Screens -->
  <TitleScreen v-if="store.screen === 'title'" />
  <GameScreen v-if="store.screen === 'game'" />
  <GameOverOverlay v-if="store.screen === 'gameover' && store.gameOverData" />

  <!-- Overlays (rendered above game screen) -->
  <FreezeOverlay v-if="store.isFreezePickTarget" />
  <FlipThreeOverlay v-if="store.isFlipThreePickTarget" />
  <RoundSummaryOverlay v-if="store.showingSummary && store.summaryData" />
</template>

<style scoped>
.home-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  padding: 0.4rem 0.75rem;
  background: rgba(0, 0, 0, 0.55);
  color: rgba(255, 255, 255, 0.65);
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  text-decoration: none;
  backdrop-filter: blur(6px);
  transition: color 0.2s, background 0.2s;
}
.home-btn:hover {
  color: rgba(255, 255, 255, 0.95);
  background: rgba(0, 0, 0, 0.75);
}
</style>

<script setup>
import { useGameStore } from '../stores/game.js';
import TitleScreen from './TitleScreen.vue';
import GameScreen from './GameScreen.vue';
import GameOverOverlay from './GameOverOverlay.vue';
import FreezeOverlay from './FreezeOverlay.vue';
import FlipThreeOverlay from './FlipThreeOverlay.vue';
import RoundSummaryOverlay from './RoundSummaryOverlay.vue';

const store = useGameStore();
</script>
