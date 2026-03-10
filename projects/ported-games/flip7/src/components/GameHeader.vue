<template>
  <div class="game-header">
    <div class="game-logo-sm">Flip 7</div>
    <div class="round-badge">Round {{ store.round }}</div>
    <div class="deck-info">Deck: <span>{{ store.deckRemaining }}</span></div>
    <button class="btn-sm" @click="store.toggleMute" style="font-size:16px; padding: 6px 12px;">
      {{ store.isMuted ? '🔇' : '🔊' }}
    </button>
    <button class="btn-sm" @click="store.resetAll">✕ Quit</button>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
