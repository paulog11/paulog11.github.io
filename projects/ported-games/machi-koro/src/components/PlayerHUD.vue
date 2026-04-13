<script setup>
import { ref, computed, watch } from 'vue';
import { useGameStore } from '../stores/game.js';

const store = useGameStore();
const humanPlayer = computed(() => store.players[0]);

const notification = ref(null); // { amount: number }
let pendingDelta = 0;
let batchTimer   = null;
let notifTimer   = null;

watch(() => store.incomeLog.length, () => {
  if (!humanPlayer.value) return;
  const last = store.incomeLog[store.incomeLog.length - 1];
  if (!last || last.playerName !== humanPlayer.value.name) return;

  pendingDelta += last.isPositive ? last.amount : -last.amount;

  // Batch entries that arrive within 150 ms of each other (one roll can fire many cards)
  clearTimeout(batchTimer);
  batchTimer = setTimeout(() => {
    if (pendingDelta !== 0) {
      notification.value = { amount: pendingDelta };
      pendingDelta = 0;
      clearTimeout(notifTimer);
      notifTimer = setTimeout(() => { notification.value = null; }, 2500);
    }
  }, 150);
});
</script>

<template>
  <div v-if="humanPlayer" class="player-hud">
    <div class="hud-coins">
      <span class="hud-coin-icon">💰</span>
      <span class="hud-coin-count">{{ humanPlayer.coins }}</span>
    </div>
    <Transition name="hud-notif">
      <div
        v-if="notification"
        class="hud-notification"
        :class="notification.amount >= 0 ? 'hud-notif-positive' : 'hud-notif-negative'"
      >
        {{ notification.amount >= 0 ? '+' : '' }}{{ notification.amount }} coins
      </div>
    </Transition>
  </div>
</template>
