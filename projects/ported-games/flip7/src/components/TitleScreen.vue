<template>
  <div class="title-screen">
    <div class="title-logo">Flip 7</div>
    <div class="title-subtitle">The Card Game of Risky Math</div>

    <div class="title-cards-preview">
      <div v-for="n in [0, 2, 4, 6, 8, 10, 12]" :key="n" class="preview-card">{{ n }}</div>
    </div>

    <!-- Player count + names -->
    <div class="player-setup">
      <div class="setup-label">Players</div>
      <div class="player-count-control">
        <button class="count-btn" @click="store.removePlayer">−</button>
        <span class="count-label">{{ store.playerCount }} Players</span>
        <button class="count-btn" @click="store.addPlayer">+</button>
      </div>
      <div class="player-inputs">
        <div v-for="i in store.playerCount" :key="i" class="player-input-row">
          <div class="player-color-dot" :style="{ background: PLAYER_COLORS[i - 1] }"></div>
          <input
            :placeholder="defaultNames[i - 1]"
            v-model="store.playerNames[i - 1]"
            maxlength="16"
          />
        </div>
      </div>
    </div>

    <!-- Win score selector -->
    <div class="player-setup" style="margin-top: 0">
      <div class="setup-label">Win Score</div>
      <div class="win-score-control">
        <button
          v-for="pts in [100, 150, 200, 250, 300, 500]"
          :key="pts"
          class="count-btn win-score-btn"
          :class="{ 'win-score-active': store.winScore === pts }"
          @click="store.winScore = pts"
        >{{ pts }}</button>
      </div>
    </div>

    <button class="btn-primary" @click="store.startGame">Let's Play! 🃏</button>

    <div class="rules-box">
      <div class="rules-title">📋 How to Play</div>
      The <strong>Dealer</strong> deals one card face-up to each player. If an <strong>Action or Modifier card</strong> appears mid-deal, pause and resolve it, then continue dealing.
      <br><br>
      After dealing, take turns <strong>Flipping</strong> more cards or <strong>Stopping</strong>. Score the <strong>total value</strong> of your number cards (modified by any Modifier cards). Draw a <strong>duplicate number</strong> and you <strong>bust</strong>, scoring 0.
      <br><br>
      Collect all <strong>7 unique number cards</strong> (any seven different values 0–12) to trigger <strong>Flip 7</strong> — round ends immediately, you earn <strong>+15 bonus!</strong> Modifiers and Actions don't count toward the 7-card bonus.
      <br><br>
      <strong>🟠 Score Modifiers:</strong> +2, +4, +6, +8, +10 (add to score) · ×2 (doubles your score)<br>
      <strong>Action cards:</strong> ❄️ Freeze (skip someone 2 turns, press <em>Skip Turn</em> when frozen) · ×3 Flip Three (someone draws 3) · 🌟 Second Chance (survive one bust)<br><br>
      <strong>Deck: 94 cards</strong> — numbers 0–12 (N copies of each N), 6 modifiers, 9 actions. First to <strong>200 points</strong> wins!
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../stores/game.js';
import { PLAYER_COLORS } from '../constants.js';

const store = useGameStore();
const defaultNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
</script>
