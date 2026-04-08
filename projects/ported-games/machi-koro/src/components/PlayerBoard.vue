<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import { ESTABLISHMENTS, TYPE } from '../constants.js';
import { estTypeClass, estIconEmoji } from '../cardUtils.js';
import LandmarkRow from './LandmarkRow.vue';

const props = defineProps({
  player:    { type: Object, required: true },
  isActive:  { type: Boolean, default: false },
});

const store = useGameStore();

// Owned establishments grouped as chips (count > 0 only)
const ownedEsts = computed(() =>
  ESTABLISHMENTS
    .filter(e => (props.player.establishments[e.id] || 0) > 0)
    .map(e => ({
      ...e,
      count: props.player.establishments[e.id],
      typeClass: estTypeClass(e.type),
      icon: estIconEmoji(e.icon),
    }))
);

const landmarkCount = computed(() =>
  Object.values(props.player.landmarks).filter(Boolean).length
);
</script>

<template>
  <div class="player-board" :class="{ active: isActive }">
    <div class="player-board-header">
      <div class="player-color-bar" :style="{ background: player.color }"></div>
      <div class="player-name">{{ player.name }}</div>
      <span v-if="player.isAI" class="player-ai-badge">AI</span>
      <div class="player-coins">
        <span class="coin-icon">💰</span>
        {{ player.coins }}
      </div>
    </div>

    <LandmarkRow :player-landmarks="player.landmarks" />

    <div v-if="ownedEsts.length > 0" class="est-grid">
      <div
        v-for="est in ownedEsts"
        :key="est.id"
        class="est-chip"
        :class="est.typeClass"
        :title="est.description"
      >
        <span>{{ est.icon }} {{ est.name }}</span>
        <span v-if="est.count > 1" class="chip-count">{{ est.count }}</span>
      </div>
    </div>
    <div v-else class="text-muted" style="font-size:12px;padding:4px 0;">No establishments yet.</div>
  </div>
</template>
