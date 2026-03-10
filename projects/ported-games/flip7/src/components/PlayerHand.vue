<template>
  <div class="player-hand-area" :class="{ active: isActive }">
    <div class="player-hand-header">
      <div class="player-hand-name" :style="{ color: player.color }">{{ player.name }}</div>
      <span v-if="status" class="status-tag" :class="status">
        {{ status === 'active' ? '▶ Your Turn' : status }}
      </span>
      <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
        <div style="font-size:12px; color: var(--text-muted); font-weight:800;">
          {{ store.uniqueNumberCount(player) }}<span style="opacity:0.5">/7 unique</span>
        </div>
        <div
          class="player-hand-total"
          :class="{
            busted: player.busted,
            has7: store.uniqueNumberCount(player) === 7 && !player.busted,
          }"
        >
          {{ store.handTotal(player) }} pts
        </div>
      </div>
    </div>
    <div class="hand-cards">
      <div
        v-if="player.hand.length === 0"
        style="color: rgba(255,255,255,0.25); font-size:13px; padding: 4px;"
      >No cards yet</div>
      <div v-for="card in player.hand" :key="card.id" class="hand-card">
        <CardView :card="card" :face-up="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import CardView from './CardView.vue';

const props = defineProps({
  player: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
});

const store = useGameStore();
const status = computed(() => store.playerStatus(props.player));
</script>
