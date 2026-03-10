<template>
  <div class="game-screen">
    <GameHeader />
    <ScoreBar />
    <TurnPanel />
    <DeckArea />
    <PlayerHand
      v-for="(p, i) in store.players"
      :key="p.id"
      :player="p"
      :is-active="i === store.currentPlayerIdx"
    />
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
import GameHeader from './GameHeader.vue';
import ScoreBar from './ScoreBar.vue';
import TurnPanel from './TurnPanel.vue';
import DeckArea from './DeckArea.vue';
import PlayerHand from './PlayerHand.vue';

const store = useGameStore();
</script>
