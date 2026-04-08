<script setup>
import { LANDMARKS } from '../constants.js';
import { landmarkEmoji } from '../cardUtils.js';

defineProps({
  playerLandmarks: { type: Object, required: true }, // { train_station: bool, ... }
});
</script>

<template>
  <div class="landmark-row">
    <div
      v-for="lm in LANDMARKS"
      :key="lm.id"
      class="landmark-slot"
      :class="playerLandmarks[lm.id] ? 'built' : 'unbuilt'"
      :title="lm.description"
    >
      <span class="landmark-slot-icon">{{ landmarkEmoji(lm.id) }}</span>
      <span class="landmark-slot-name">{{ lm.name }}</span>
      <span v-if="!playerLandmarks[lm.id]" class="landmark-slot-cost">💰{{ lm.cost }}</span>
    </div>
  </div>
</template>
