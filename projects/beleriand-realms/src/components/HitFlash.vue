<script setup lang="ts">
import { Faction } from '../types/game'

defineProps<{ active: boolean; faction: Faction }>()
</script>

<template>
  <Transition name="hit-flash">
    <div
      v-if="active"
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-20 rounded-xl"
    >
      <span
        class="text-4xl font-bold select-none"
        :class="faction === Faction.FreePeoples ? 'text-free-peoples-light' : 'text-morgoth-light'"
        style="animation: attack-flash 0.45s ease-out forwards;"
      >⚔</span>
    </div>
  </Transition>
</template>
