<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';

const store = useGameStore();

const pip = (n) => ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][n] || '?';
</script>

<template>
  <div class="dice-area">
    <div class="dice-row" v-if="store.diceValues.length > 0">
      <div
        v-for="(val, i) in store.diceValues"
        :key="i"
        class="die"
        :class="{ rolling: store.isAnimating }"
      >{{ pip(val) }}</div>
    </div>
    <div class="dice-row" v-else>
      <div class="die" style="opacity:0.3">⚀</div>
    </div>

    <div v-if="store.diceValues.length > 0 && !store.isAnimating" class="dice-total">
      <span class="dice-total-label">Total: </span>
      {{ store.diceTotal }}
      <span v-if="store.isDoubles" style="margin-left:6px;font-size:18px;">🎡</span>
    </div>
  </div>
</template>
