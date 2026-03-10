<template>
  <div v-if="store.lastDrawnCard" class="deck-area">
    <div class="last-drawn-card">
      <CardView :card="store.lastDrawnCard" :face-up="!store.lastDrawnFlipping" />
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
import CardView from './CardView.vue';

const store = useGameStore();
</script>
