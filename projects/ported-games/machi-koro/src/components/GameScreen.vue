<script setup>
import { computed } from 'vue';
import { useGameStore } from '../stores/game.js';
import GameHeader   from './GameHeader.vue';
import DiceArea     from './DiceArea.vue';
import TurnPanel    from './TurnPanel.vue';
import IncomeLog    from './IncomeLog.vue';
import Marketplace  from './Marketplace.vue';
import PlayerBoard  from './PlayerBoard.vue';

const store = useGameStore();

const humanPlayer = computed(() => store.players[0]);
const aiPlayers   = computed(() => store.players.slice(1));
</script>

<template>
  <div class="game-screen">
    <GameHeader />

    <TurnPanel />
    <DiceArea />
    <IncomeLog />

    <!-- Marketplace + Landmarks at the top, full width -->
    <Marketplace />

    <!-- Human player board (prominent) -->
    <PlayerBoard
      v-if="humanPlayer"
      :player="humanPlayer"
      :is-active="store.currentPlayerIdx === 0"
      :is-human="true"
    />

    <!-- AI player boards (compact row) -->
    <div v-if="aiPlayers.length" class="ai-boards">
      <PlayerBoard
        v-for="(player, idx) in aiPlayers"
        :key="player.id"
        :player="player"
        :is-active="idx + 1 === store.currentPlayerIdx"
        :is-human="false"
      />
    </div>
  </div>
</template>
