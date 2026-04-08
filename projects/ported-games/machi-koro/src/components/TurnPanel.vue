<script setup>
import { useGameStore } from '../stores/game.js';

const store = useGameStore();
</script>

<template>
  <div class="turn-panel">
    <div class="turn-banner">
      <span :style="{ color: store.currentPlayer?.color }">{{ store.currentPlayer?.name }}</span>
      {{ store.turnInstructions.replace(store.currentPlayer?.name + ':', '').replace(store.currentPlayer?.name + "'s turn — ", '') }}
    </div>

    <div class="turn-actions">

      <!-- Train Station: choose dice count -->
      <template v-if="store.pendingInteraction?.type === 'dice_count'">
        <div class="phase-prompt">Roll 1 or 2 dice?</div>
        <button class="btn btn-1die"  @click="store.chooseDiceCount(1)">🎲 1 Die</button>
        <button class="btn btn-2dice" @click="store.chooseDiceCount(2)">🎲🎲 2 Dice</button>
      </template>

      <!-- Radio Tower: reroll prompt -->
      <template v-else-if="store.turnPhase === 'reroll_prompt'">
        <div class="phase-prompt">📻 Use Radio Tower to reroll?</div>
        <button class="btn btn-yes" @click="store.chooseReroll()">Yes, Reroll</button>
        <button class="btn btn-no"  @click="store.skipReroll()">No, Keep It</button>
      </template>

      <!-- Normal roll -->
      <template v-else-if="store.canRoll">
        <button class="btn btn-roll" @click="store.rollDice(1)">🎲 Roll Dice</button>
      </template>

      <!-- Income resolving -->
      <template v-else-if="store.turnPhase === 'income'">
        <div class="phase-prompt">Resolving income...</div>
      </template>

      <!-- Buy phase: skip button is in Marketplace -->
      <template v-else-if="store.turnPhase === 'buy'">
        <div class="phase-prompt">Buy a building, or skip to end your turn.</div>
      </template>

    </div>
  </div>
</template>
