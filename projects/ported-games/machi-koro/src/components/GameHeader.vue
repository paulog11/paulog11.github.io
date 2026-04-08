<script setup>
import { useGameStore } from '../stores/game.js';

const store = useGameStore();
</script>

<template>
  <header class="game-header">
    <div class="game-header-left">
      <div class="game-header-title">🏙️ Machi Koro</div>
      <div class="game-header-turn">
        <span
          class="game-header-player"
          :style="{ color: store.currentPlayer?.color }"
        >{{ store.currentPlayer?.name }}'s turn</span>
      </div>
    </div>
    <div class="game-header-right">
      <button
        class="icon-btn"
        :title="store.isMuted ? 'Unmute' : 'Mute'"
        @click="store.toggleMute()"
      >{{ store.isMuted ? '🔇' : '🔊' }}</button>
      <button
        class="icon-btn"
        title="Quit to title"
        @click="store.resetAll()"
      >✕</button>
    </div>
  </header>
</template>
