<template>
  <div :class="[cardClass(card), { 'is-flipping': faceUp, 'card-already-flipped': faceUp }]">
    <div class="card-inner">
      <div class="card-back">
        <div class="card-back-logo">F7</div>
      </div>
      <div class="card-front">
        <div class="card-corner tl">
          <span class="corner-val">{{ cardCorner(card) }}</span>
          <span class="corner-suit">{{ cardSuit(card) }}</span>
        </div>
        <div class="card-body">
          <div class="card-main">{{ cardMain(card) }}</div>
          <div v-if="cardLabel(card)" class="card-label">{{ cardLabel(card) }}</div>
        </div>
        <div class="card-corner br">
          <span class="corner-val">{{ cardCorner(card) }}</span>
          <span class="corner-suit">{{ cardSuit(card) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cardClass, cardMain, cardLabel, cardCorner, cardSuit } from '../cardUtils.js';

defineProps({
  card: { type: Object, required: true },
  faceUp: { type: Boolean, default: false },
});
</script>
