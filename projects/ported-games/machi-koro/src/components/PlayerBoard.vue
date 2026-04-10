<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import { ESTABLISHMENTS } from '../constants.js';
import { estTypeClass, estIconEmoji } from '../cardUtils.js';
import LandmarkRow from './LandmarkRow.vue';

const props = defineProps({
  player:   { type: Object, required: true },
  isActive: { type: Boolean, default: false },
  isHuman:  { type: Boolean, default: false },
});

const store = useGameStore();

// Owned establishments grouped as chips (count > 0 only)
const ownedEsts = computed(() =>
  ESTABLISHMENTS
    .filter(e => (props.player.establishments[e.id] || 0) > 0)
    .map(e => {
      const total = props.player.establishments[e.id];
      const renovated = props.player.renovatedCards?.[e.id] ?? 0;
      const active = total - renovated;
      return {
        ...e,
        count: total,
        activeCount: active,
        renovatedCount: renovated,
        typeClass: estTypeClass(e.type),
        icon: estIconEmoji(e.icon),
      };
    })
);

const landmarkCount = computed(() =>
  Object.values(props.player.landmarks).filter(Boolean).length
);
</script>

<template>
  <div class="player-board" :class="{ active: isActive, 'player-board--human': isHuman }">
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
      <!-- Active copies -->
      <div
        v-for="est in ownedEsts.filter(e => e.activeCount > 0)"
        :key="est.id"
        class="est-chip"
        :class="est.typeClass"
      >
        <span class="chip-roll">{{ est.rolls.length > 1 ? `${est.rolls[0]}-${est.rolls[est.rolls.length-1]}` : est.rolls[0] }}</span>
        <span>{{ est.icon }} {{ est.name }}</span>
        <span v-if="est.activeCount > 1" class="chip-count">{{ est.activeCount }}</span>
        <div class="est-tooltip">
          <div class="est-tooltip-name">{{ est.icon }} {{ est.name }}</div>
          <div class="est-tooltip-roll">Roll: {{ est.rolls.join(', ') }}</div>
          <div class="est-tooltip-desc">{{ est.description }}</div>
          <div v-if="est.cost !== undefined" class="est-tooltip-cost">Cost: 💰{{ est.cost }}</div>
        </div>
      </div>
      <!-- Renovated (face-down) copies — shown greyed out -->
      <div
        v-for="est in ownedEsts.filter(e => e.renovatedCount > 0)"
        :key="'renovated-' + est.id"
        class="est-chip est-chip-renovated"
      >
        <span class="chip-roll">{{ est.rolls.length > 1 ? `${est.rolls[0]}-${est.rolls[est.rolls.length-1]}` : est.rolls[0] }}</span>
        <span>{{ est.icon }} {{ est.name }}</span>
        <span class="chip-count chip-renovated-badge">↩</span>
        <span v-if="est.renovatedCount > 1" class="chip-count">{{ est.renovatedCount }}</span>
        <div class="est-tooltip">
          <div class="est-tooltip-name">{{ est.icon }} {{ est.name }}</div>
          <div class="est-tooltip-roll">Roll: {{ est.rolls.join(', ') }}</div>
          <div class="est-tooltip-desc">{{ est.description }}</div>
          <div class="est-tooltip-desc" style="color:#ff6b6b;margin-top:4px;">Face-down — permanently deactivated</div>
        </div>
      </div>
    </div>
    <div v-else class="text-muted" style="font-size:12px;padding:4px 0;">No establishments yet.</div>
  </div>
</template>
