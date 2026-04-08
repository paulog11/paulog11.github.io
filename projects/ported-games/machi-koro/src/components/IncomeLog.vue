<script setup>
import { watch, nextTick, ref } from 'vue';
import { useGameStore } from '../stores/game.js';

const store = useGameStore();
const logEl = ref(null);

watch(() => store.incomeLog.length, async () => {
  await nextTick();
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight;
});
</script>

<template>
  <div v-if="store.incomeLog.length > 0" class="income-log" ref="logEl">
    <div
      v-for="entry in store.incomeLog"
      :key="entry.id"
      class="income-entry"
      :class="entry.isPositive ? 'positive' : 'negative'"
    >
      <span class="ie-amount">{{ entry.isPositive ? '+' : '-' }}{{ entry.amount }}💰</span>
      <span class="ie-source">{{ entry.playerName }} · {{ entry.source }}</span>
    </div>
  </div>
</template>
