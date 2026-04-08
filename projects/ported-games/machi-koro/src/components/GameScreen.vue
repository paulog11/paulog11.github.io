<script setup>
import { useGameStore } from '../stores/game.js';
import GameHeader   from './GameHeader.vue';
import DiceArea     from './DiceArea.vue';
import TurnPanel    from './TurnPanel.vue';
import IncomeLog    from './IncomeLog.vue';
import Marketplace  from './Marketplace.vue';
import PlayerBoard  from './PlayerBoard.vue';

const store = useGameStore();
</script>

<template>
  <div class="game-screen">
    <GameHeader />

    <TurnPanel />
    <DiceArea />
    <IncomeLog />

    <div class="game-body">
      <div class="game-body-left">
        <!-- Player boards -->
        <div class="player-boards">
          <PlayerBoard
            v-for="(player, idx) in store.players"
            :key="player.id"
            :player="player"
            :is-active="idx === store.currentPlayerIdx"
          />
        </div>
      </div>
      <div class="game-body-right">
        <Marketplace />
      </div>
    </div>
  </div>
</template>
