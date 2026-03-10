<template>
  <div class="flipthree-overlay">
    <div class="flipthree-panel">
      <div class="flipthree-title">×3 Flip Three!</div>
      <div class="flipthree-sub">Pick a player to flip 3 cards:</div>
      <div class="target-list">
        <button
          v-for="t in store.flipThreeData.possibleTargets"
          :key="t.id"
          class="target-btn"
          @click="store.pickFlipThreeTarget(t)"
        >
          <div class="target-dot" :style="{ background: t.color }"></div>
          {{ t.name }} ({{ store.handTotal(t) }} pts in hand)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
const store = useGameStore();
</script>
