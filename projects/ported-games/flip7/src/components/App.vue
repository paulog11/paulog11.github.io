<template>
  <!-- Stars background -->
  <div class="stars"></div>

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
