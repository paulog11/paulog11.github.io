<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import TitleScreen            from './TitleScreen.vue';
import GameScreen             from './GameScreen.vue';
import TVStationOverlay       from './TVStationOverlay.vue';
import BusinessCenterOverlay  from './BusinessCenterOverlay.vue';
import WinOverlay             from './WinOverlay.vue';

const store = useGameStore();

const showTVStation      = computed(() => store.pendingInteraction?.type === 'tv_station');
const showBusinessCenter = computed(() => store.pendingInteraction?.type === 'business_center');
const showWin            = computed(() => store.screen === 'gameover' && store.winnerData);
</script>

<template>
  <div id="app-root">
    <!-- Confetti -->
    <div v-if="store.showConfetti" class="confetti-wrap">
      <div
        v-for="p in store.confettiPieces"
        :key="p.id"
        class="confetti-piece"
        :style="{
          left: p.x + '%',
          width:  p.size + 'px',
          height: p.size * 0.6 + 'px',
          background: p.color,
          animationDuration: p.duration + 's',
          animationDelay: p.delay + 's',
        }"
      ></div>
    </div>

    <!-- Toast -->
    <div v-if="store.toast" class="toast">{{ store.toast }}</div>

    <!-- Screens -->
    <TitleScreen v-if="store.screen === 'title'" />
    <GameScreen  v-else-if="store.screen === 'game' || store.screen === 'gameover'" />

    <!-- Overlays (rendered above game screen) -->
    <TVStationOverlay       v-if="showTVStation" />
    <BusinessCenterOverlay  v-if="showBusinessCenter" />
    <WinOverlay             v-if="showWin" />
  </div>
</template>
