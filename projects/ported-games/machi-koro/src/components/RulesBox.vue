<script setup>
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <div>
    <button class="rules-toggle" @click="open = !open">
      {{ open ? '▲ Hide Rules' : '▼ Show Rules' }}
    </button>
    <div v-if="open" class="rules-box" style="margin-top:10px;">
      <h4>How to Play</h4>
      <p style="margin-bottom:8px;">First player to complete all 4 landmarks wins!</p>
      <ul>
        <li><b>Each turn:</b> Roll dice → Collect income → Buy one card/landmark (optional)</li>
        <li style="margin-top:6px;"><b>Card colors:</b></li>
        <li style="padding-left:0;">
          <span class="rules-color blue">Blue</span> — Anyone's turn, collect from bank<br>
          <span class="rules-color green">Green</span> — Your turn only, collect from bank<br>
          <span class="rules-color red">Red</span> — Other players' turns, take from roller<br>
          <span class="rules-color purple">Purple</span> — Your turn only, special effects (max 1)
        </li>
        <li style="margin-top:6px;"><b>Activation order:</b> Red → Blue/Green → Purple</li>
        <li style="margin-top:6px;"><b>Landmarks:</b></li>
        <li>🚂 Train Station (4💰) — Roll 1 or 2 dice</li>
        <li>🛍️ Shopping Mall (10💰) — ☕/🍞 cards earn +1</li>
        <li>🎡 Amusement Park (16💰) — Doubles = extra turn</li>
        <li>📻 Radio Tower (22💰) — Reroll once per turn</li>
      </ul>
    </div>
  </div>
</template>
