<script setup>
import { useGameStore } from '../stores/game.js';
import { PLAYER_COLORS } from '../constants.js';
import RulesBox from './RulesBox.vue';

const store = useGameStore();
</script>

<template>
  <div class="title-screen">
    <div>
      <div class="title-logo">🏙️ Machi Koro</div>
      <div class="title-logo-sub">Build Your City</div>
    </div>

    <div class="title-card">
      <!-- Player count -->
      <div class="player-count-row">
        <label>Players</label>
        <button class="count-btn" @click="store.removePlayer()">−</button>
        <span class="count-num">{{ store.playerCount }}</span>
        <button class="count-btn" @click="store.addPlayer()">+</button>
      </div>

      <!-- Player name inputs -->
      <div class="player-rows">
        <div
          v-for="i in store.playerCount"
          :key="i"
          class="player-row"
        >
          <div
            class="player-color-dot"
            :style="{ background: PLAYER_COLORS[i - 1] }"
          ></div>
          <input
            type="text"
            :placeholder="`Player ${i}`"
            v-model="store.playerNames[i - 1]"
            maxlength="16"
          />
          <span class="player-row-label">{{ i === 1 ? '👤 You' : '🤖 AI' }}</span>
        </div>
      </div>

      <button class="btn-start" @click="store.startGame()">Start Game</button>
    </div>

    <RulesBox />
  </div>
</template>
