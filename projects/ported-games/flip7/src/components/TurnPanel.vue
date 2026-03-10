<template>
  <div class="turn-panel">
    <div class="turn-info">
      <div class="turn-whose">{{ store.activePlayerName }}</div>
      <div class="turn-sub">{{ store.turnInstructions }}</div>
    </div>
    <div class="turn-actions">
      <template v-if="store.canSkipFrozen">
        <button class="btn-skip" @click="store.skipFrozenTurn">❄️ Skip Turn</button>
      </template>
      <template v-else>
        <button
          v-if="store.roundPhase === 'dealing'"
          class="btn-flip"
          :disabled="!store.canFlip"
          @click="store.dealNextCard"
        >🃏 Deal</button>
        <button
          v-else
          class="btn-flip"
          :disabled="!store.canFlip"
          @click="store.drawCard"
        >🃏 Flip</button>
        <button class="btn-stop" :disabled="!store.canStop" @click="store.stopTurn">✋ Stop</button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
