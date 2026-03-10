<template>
  <div class="flipthree-overlay">
    <div class="flipthree-panel">
      <div class="flipthree-title">❄️ Freeze!</div>
      <div class="flipthree-sub">Pick a player to freeze for 2 turns:</div>
      <div class="target-list">
        <button
          v-for="t in targets"
          :key="t.id"
          class="target-btn"
          @click="store.pickFreezeTarget(t)"
        >
          <div class="target-dot" :style="{ background: t.color }"></div>
          {{ t.name }} ({{ store.handTotal(t) }} pts in hand)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';

const store = useGameStore();

const targets = computed(() => {
  if (!store.flipThreeData || !store.flipThreeData.actingPlayer) return [];
  return store.players.filter(
    p => p.id !== store.flipThreeData.actingPlayer.id && !p.busted && !p.stopped
  );
});
</script>
