<script setup>
import { computed } from 'vue';
import { estTypeClass, estIconEmoji, rollLabel } from '../cardUtils.js';

const props = defineProps({
  establishment: { type: Object, required: true },
  supply:        { type: Number, default: 0 },
  canAfford:     { type: Boolean, default: false },
  canBuy:        { type: Boolean, default: false },
  alreadyOwned:  { type: Boolean, default: false }, // purple max-1 check
});

const emit = defineEmits(['buy']);

const disabled = computed(() =>
  !props.canBuy || !props.canAfford || props.supply <= 0 || props.alreadyOwned
);

const typeClass = computed(() => estTypeClass(props.establishment.type));
const icon      = computed(() => estIconEmoji(props.establishment.icon));
const roll      = computed(() => rollLabel(props.establishment.rolls));
</script>

<template>
  <div
    class="est-card"
    :class="{ 'est-card--disabled': disabled }"
    :title="establishment.description"
  >
    <div class="est-card-header" :class="typeClass">
      <span class="est-card-icon-sm">{{ icon }}</span>
      <span class="est-card-roll">{{ roll }}</span>
    </div>
    <div class="est-card-body">
      <div class="est-card-icon">{{ icon }}</div>
      <div class="est-card-name">{{ establishment.name }}</div>
      <div class="est-card-desc">{{ establishment.description }}</div>
    </div>
    <div class="est-card-footer">
      <span class="est-card-cost">💰 {{ establishment.cost }}</span>
      <span class="est-card-supply">×{{ supply }}</span>
      <button
        class="btn-buy-card"
        :disabled="disabled"
        @click.stop="emit('buy', establishment.id)"
      >Buy</button>
    </div>
  </div>
</template>
