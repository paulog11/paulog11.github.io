import { defineStore } from 'pinia';
import { ref, computed, nextTick } from 'vue';
import Audio from '../audio.js';
import { buildDeck, shuffle, PLAYER_COLORS } from '../constants.js';

export const useGameStore = defineStore('game', () => {
  // ── STATE: SETUP ──
  const screen = ref('title'); // 'title' | 'game' | 'gameover'
  const playerCount = ref(3);
  const playerNames = ref(['Alice', 'Bob', 'Carol', 'Dave', 'Eve']);
  const winScore = ref(200);

  // ── STATE: GAME ──
  const deck = ref([]);
  const discardPile = ref([]);
  const players = ref([]);
  const currentPlayerIdx = ref(0);
  const dealerIdx = ref(0);
  const round = ref(1);
  const roundPhase = ref('dealing'); // 'dealing' | 'playing' | 'summary'
  const dealingPlayerIdx = ref(0);   // whose turn it is to be dealt to
  const pendingActionCard = ref(null); // action card drawn mid-deal that needs resolving
  const lastDrawnCard = ref(null);
  const lastDrawnFlipping = ref(false);
  const showingSummary = ref(false);
  const summaryData = ref(null);
  const gameOverData = ref(null);
  const toast = ref(null);
  const toastTimer = ref(null);
  const flipThreeData = ref(null);
  const showConfetti = ref(false);
  const confettiPieces = ref([]);
  const isAnimating = ref(false);
  const isMuted = ref(false);

  // ── COMPUTED ──
  const currentPlayer = computed(() => players.value[currentPlayerIdx.value]);
  const deckRemaining = computed(() => deck.value.length);

  // Count only unique NUMBER cards for Flip 7 bonus (0-12, no modifiers or actions)
  function uniqueNumberCount(player) {
    const seen = new Set();
    for (const c of player.hand) {
      if (c.type === 'number') seen.add(c.value);
    }
    return seen.size;
  }

  // Score = sum of number card values, then apply modifiers in order
  function handTotal(player) {
    let base = player.hand.reduce((s, c) => s + (c.type === 'number' ? c.value : 0), 0);
    // Apply flat modifiers first, then multiplier
    let flat = 0, hasX2 = false;
    for (const c of player.hand) {
      if (c.type === 'modifier') {
        if (c.isMultiplier) hasX2 = true;
        else flat += c.modValue;
      }
    }
    let total = base + flat;
    if (hasX2) total *= 2;
    return total;
  }

  // ── SETUP GAME ──
  function startGame() {
    const names = playerNames.value.slice(0, playerCount.value);
    players.value = names.map((name, i) => ({
      id: i,
      name,
      color: PLAYER_COLORS[i],
      hand: [],
      totalScore: 0,
      stopped: false,
      busted: false,
      frozen: false,
      frozenTurns: 0,
      hasSecondChance: false,
    }));
    deck.value = buildDeck();
    discardPile.value = [];
    dealerIdx.value = 0;
    currentPlayerIdx.value = 0;
    round.value = 1;
    roundPhase.value = 'dealing';
    dealingPlayerIdx.value = 0;
    pendingActionCard.value = null;
    showingSummary.value = false;
    gameOverData.value = null;
    lastDrawnCard.value = null;
    flipThreeData.value = null;
    screen.value = 'game';
  }

  function resetRound() {
    players.value.forEach(p => {
      // Cards from players' hands go to discard pile
      discardPile.value.push(...p.hand);
      p.hand = [];
      p.stopped = false;
      p.busted = false;
      p.frozen = false;
      p.frozenTurns = 0;
      p.hasSecondChance = false;
      p.flip7Bonus = false;
    });
    // Do NOT rebuild the deck — keep using remaining deck + discard pile across rounds
    // If deck is empty, reshuffle discard now
    if (deck.value.length === 0) {
      deck.value = shuffle(discardPile.value);
      discardPile.value = [];
      showToast('Deck reshuffled from discard! 🔀');
    }
    // Dealer rotates each round
    dealerIdx.value = (dealerIdx.value + 1) % players.value.length;
    currentPlayerIdx.value = dealerIdx.value;
    roundPhase.value = 'dealing';
    // Dealing starts with player after dealer
    dealingPlayerIdx.value = (dealerIdx.value + 1) % players.value.length;
    pendingActionCard.value = null;
    lastDrawnCard.value = null;
    flipThreeData.value = null;
  }

  // ── TOAST ──
  function showToast(msg) {
    if (toastTimer.value) clearTimeout(toastTimer.value);
    toast.value = msg;
    toastTimer.value = setTimeout(() => { toast.value = null; }, 2100);
  }

  // ── CONFETTI ──
  function fireConfetti() {
    const pieces = [];
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9ff3', '#fff', '#a78bfa'];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 0.8,
        size: 8 + Math.random() * 10,
        rotate: Math.random() * 360,
      });
    }
    confettiPieces.value = pieces;
    showConfetti.value = true;
    setTimeout(() => { showConfetti.value = false; confettiPieces.value = []; }, 4000);
  }

  // ── DEAL NEXT CARD (dealing phase) ──
  async function dealNextCard() {
    if (isAnimating.value) return;
    if (deck.value.length === 0) {
      deck.value = shuffle(discardPile.value);
      discardPile.value = [];
    }
    isAnimating.value = true;
    const card = deck.value.shift();
    Audio.play('cardFlip');
    lastDrawnCard.value = { ...card };
    lastDrawnFlipping.value = true;
    await nextTick();
    setTimeout(async () => {
      lastDrawnFlipping.value = false;
      await nextTick();
      setTimeout(() => {
        processDealCard(card);
        isAnimating.value = false;
      }, 350);
    }, 50);
  }

  function processDealCard(card) {
    if (card.type === 'action' || card.type === 'modifier') {
      // Pause dealing — resolve/apply card, then continue
      pendingActionCard.value = card;
      const target = players.value[dealingPlayerIdx.value];
      handleDealAction(card, target);
    } else {
      // Number card — give to current dealingPlayer
      const player = players.value[dealingPlayerIdx.value];
      const hasDupe = player.hand.some(c => c.type === 'number' && c.value === card.value);
      if (hasDupe) {
        // Check Second Chance
        if (player.hasSecondChance) {
          player.hasSecondChance = false;
          // Remove the Second Chance card from hand, discard the duplicate
          const scIdx = player.hand.findIndex(c => c.special === 'secondchance');
          if (scIdx !== -1) player.hand.splice(scIdx, 1);
          discardPile.value.push(card);
          Audio.play('secondChanceSaved');
          showToast(`🌟 ${player.name} used Second Chance! Duplicate ${card.value} discarded.`);
          advanceDealingPlayer();
          return;
        }
        player.busted = true;
        player.hand.push({ ...card, flipped: true });
        Audio.play('bust');
        showToast(`💥 ${player.name} busted! (duplicate ${card.value})`);
      } else {
        player.hand.push({ ...card, flipped: true });
        Audio.play(card.value >= 8 ? 'drawHigh' : 'draw');
        checkFlip7(player);
      }
      advanceDealingPlayer();
    }
  }

  function handleDealAction(card, target) {
    if (card.type === 'modifier') {
      // Modifier cards go straight into the player's hand during deal, no pause needed
      target.hand.push({ ...card, flipped: true });
      Audio.play(card.isMultiplier ? 'modifierX2' : 'modifier');
      pendingActionCard.value = null;
      advanceDealingPlayer();
    } else if (card.special === 'freeze') {
      Audio.play('freeze');
      showToast(`❄️ Freeze card mid-deal! ${target.name} picks a target.`);
      target.hand.push({ ...card, flipped: true });
      const others = players.value.filter(p => p.id !== target.id && !p.busted);
      if (others.length === 1) {
        others[0].frozen = true;
        others[0].frozenTurns = 2;
        showToast(`❄️ ${others[0].name} is frozen!`);
        pendingActionCard.value = null;
        advanceDealingPlayer();
      } else if (others.length === 0) {
        pendingActionCard.value = null;
        advanceDealingPlayer();
      } else {
        flipThreeData.value = { type: 'freeze', actingPlayer: target, cardsLeft: 0, isDeal: true };
      }
    } else if (card.special === 'flipthree') {
      target.hand.push({ ...card, flipped: true });
      const others = players.value.filter(p => p.id !== target.id && !p.busted && !p.frozen);
      if (others.length === 0) {
        showToast('No valid Flip Three targets!');
        pendingActionCard.value = null;
        advanceDealingPlayer();
      } else if (others.length === 1) {
        Audio.play('flipThree');
        showToast(`×3 ${others[0].name} must flip 3!`);
        flipThreeData.value = { type: 'flipthree', targetPlayerIdx: others[0].id, cardsLeft: 3, originalPlayerIdx: target.id, isDeal: true };
      } else {
        Audio.play('flipThree');
        flipThreeData.value = { type: 'flipthree-pick', actingPlayer: target, possibleTargets: others, isDeal: true };
      }
    } else if (card.special === 'secondchance') {
      // Second Chance: if this player busts later, they discard the duplicate and stay in
      target.hand.push({ ...card, flipped: true });
      target.hasSecondChance = true;
      Audio.play('secondChance');
      showToast(`🌟 ${target.name} has a Second Chance card!`);
      pendingActionCard.value = null;
      advanceDealingPlayer();
    }
  }

  function advanceDealingPlayer() {
    const n = players.value.length;
    let next = (dealingPlayerIdx.value + 1) % n;
    let loops = 0;
    // Skip busted players during deal
    while (players.value[next].busted && loops < n) { next = (next + 1) % n; loops++; }
    dealingPlayerIdx.value = next;
    // Check if deal is complete: everyone has been dealt one card (or busted)
    const allDealt = players.value.every(p => p.busted || p.hand.length >= 1);
    if (allDealt) {
      roundPhase.value = 'playing';
      // First player to act is player after dealer
      currentPlayerIdx.value = (dealerIdx.value + 1) % players.value.length;
      // Advance past any already-done players
      skipToActivePlayer();
      showToast('Dealing done! Press your luck begins 🎲');
    }
  }

  function skipToActivePlayer() {
    let idx = currentPlayerIdx.value;
    let tries = 0;
    while ((players.value[idx].stopped || players.value[idx].busted) && tries < players.value.length) {
      idx = (idx + 1) % players.value.length;
      tries++;
    }
    currentPlayerIdx.value = idx;
  }

  // Check if player achieved Flip 7 (7 unique number cards)
  function checkFlip7(player) {
    if (uniqueNumberCount(player) === 7) {
      Audio.play('flip7');
      showToast(`🎉 FLIP 7! ${player.name} has all 7 unique numbers! +15 bonus!`);
      fireConfetti();
      player.flip7Bonus = true;
      // End round immediately for everyone
      players.value.forEach(p => { if (!p.busted) p.stopped = true; });
      endRound(player);
      return true;
    }
    return false;
  }

  // ── DRAW CARD (press-your-luck phase) ──
  async function drawCard() {
    if (isAnimating.value) return;
    const player = flipThreeData.value && flipThreeData.value.type === 'flipthree'
      ? players.value[flipThreeData.value.targetPlayerIdx]
      : currentPlayer.value;

    if (deck.value.length === 0) {
      if (discardPile.value.length === 0) { showToast('No cards left!'); return; }
      deck.value = shuffle(discardPile.value);
      discardPile.value = [];
      showToast('Deck reshuffled! 🔀');
    }

    isAnimating.value = true;
    const card = deck.value.shift();
    Audio.play('cardFlip');
    lastDrawnCard.value = { ...card };
    lastDrawnFlipping.value = true;

    await nextTick();
    setTimeout(async () => {
      lastDrawnFlipping.value = false;
      await nextTick();
      setTimeout(() => {
        processCard(card, player);
        isAnimating.value = false;
      }, 350);
    }, 50);
  }

  function processCard(card, player) {
    if (card.type === 'number') {
      const hasDupe = player.hand.some(c => c.type === 'number' && c.value === card.value);
      if (hasDupe) {
        // Second Chance saves them
        if (player.hasSecondChance) {
          player.hasSecondChance = false;
          const scIdx = player.hand.findIndex(c => c.special === 'secondchance');
          if (scIdx !== -1) player.hand.splice(scIdx, 1);
          discardPile.value.push(card);
          Audio.play('secondChanceSaved');
          showToast(`🌟 ${player.name} used Second Chance! Duplicate ${card.value} discarded.`);
          // Flip three countdown
          if (flipThreeData.value && flipThreeData.value.type === 'flipthree') {
            flipThreeData.value.cardsLeft--;
            if (flipThreeData.value.cardsLeft <= 0) { flipThreeData.value = null; nextTurn(); }
          }
          return;
        }
        player.busted = true;
        player.hand.push({ ...card, flipped: true });
        Audio.play('bust');
        showToast(`💥 ${player.name} busted! (duplicate ${card.value})`);
        // If busting during a forced Flip Three, end it immediately
        if (flipThreeData.value && flipThreeData.value.type === 'flipthree') {
          flipThreeData.value = null;
          nextTurn();
        } else {
          advanceAfterCard(player);
        }
        return;
      }
      player.hand.push({ ...card, flipped: true });
      Audio.play(card.value >= 8 ? 'drawHigh' : 'draw');
      if (checkFlip7(player)) return;
      if (flipThreeData.value && flipThreeData.value.type === 'flipthree') {
        flipThreeData.value.cardsLeft--;
        if (flipThreeData.value.cardsLeft <= 0) {
          flipThreeData.value = null;
          nextTurn();
        }
        return;
      }
      // Rule 3: advance turn after each flip (one card per turn)
      nextTurn();
    } else {
      // During a forced Flip Three, non-number cards (modifiers/actions) still count as one
      // of the 3 required flips — add to hand but don't trigger special effects mid-sequence
      if (flipThreeData.value && flipThreeData.value.type === 'flipthree') {
        player.hand.push({ ...card, flipped: true });
        if (card.type === 'modifier') Audio.play(card.isMultiplier ? 'modifierX2' : 'modifier');
        flipThreeData.value.cardsLeft--;
        if (flipThreeData.value.cardsLeft <= 0) {
          flipThreeData.value = null;
          nextTurn();
        }
        return;
      }
      // Normal turn — action or modifier card triggers its special effect
      handleSpecial(card, player);
    }
  }

  function handleSpecial(card, player) {
    if (card.type === 'modifier') {
      player.hand.push({ ...card, flipped: true });
      Audio.play(card.isMultiplier ? 'modifierX2' : 'modifier');
      showToast(`🟠 ${player.name} gets a ${card.label} modifier!`);
      nextTurn();
    } else if (card.special === 'freeze') {
      Audio.play('freeze');
      showToast(`❄️ Freeze card! ${player.name} picks a target.`);
      player.hand.push({ ...card, flipped: true });
      const others = players.value.filter(p => p.id !== player.id && !p.busted && !p.stopped);
      if (others.length === 1) {
        others[0].frozen = true;
        others[0].frozenTurns = 2;
        showToast(`❄️ ${others[0].name} is frozen for 2 turns!`);
        advanceAfterCard(player);
      } else if (others.length === 0) {
        advanceAfterCard(player);
      } else {
        flipThreeData.value = { type: 'freeze', actingPlayer: player, cardsLeft: 0 };
      }
    } else if (card.special === 'flipthree') {
      player.hand.push({ ...card, flipped: true });
      const others = players.value.filter(p => p.id !== player.id && !p.busted && !p.stopped && !p.frozen);
      if (others.length === 0) {
        showToast('No valid targets for Flip Three!');
        advanceAfterCard(player);
        return;
      }
      Audio.play('flipThree');
      if (others.length === 1) {
        showToast(`×3 ${others[0].name} must flip 3 cards!`);
        flipThreeData.value = { type: 'flipthree', targetPlayerIdx: others[0].id, cardsLeft: 3, originalPlayerIdx: player.id };
      } else {
        flipThreeData.value = { type: 'flipthree-pick', actingPlayer: player, possibleTargets: others };
      }
    } else if (card.special === 'secondchance') {
      player.hand.push({ ...card, flipped: true });
      player.hasSecondChance = true;
      Audio.play('secondChance');
      showToast(`🌟 ${player.name} has a Second Chance! One bust forgiven.`);
      nextTurn();
    }
  }

  function pickFreezeTarget(targetPlayer) {
    targetPlayer.frozen = true;
    targetPlayer.frozenTurns = 2;
    showToast(`❄️ ${targetPlayer.name} is frozen for 2 turns!`);
    const isDeal = flipThreeData.value && flipThreeData.value.isDeal;
    const actingPlayer = flipThreeData.value.actingPlayer;
    flipThreeData.value = null;
    pendingActionCard.value = null;
    if (isDeal) { advanceDealingPlayer(); } else { advanceAfterCard(actingPlayer); }
  }

  function pickFlipThreeTarget(targetPlayer) {
    const acting = flipThreeData.value.actingPlayer;
    const isDeal = flipThreeData.value.isDeal;
    showToast(`×3 ${targetPlayer.name} must flip 3 cards!`);
    flipThreeData.value = { type: 'flipthree', targetPlayerIdx: targetPlayer.id, cardsLeft: 3, originalPlayerIdx: acting.id, isDeal };
  }

  function advanceAfterCard(player) {
    if (flipThreeData.value && flipThreeData.value.type === 'flipthree') return; // handled elsewhere
    nextTurn();
  }

  function stopTurn() {
    if (isAnimating.value) return;
    Audio.play('stop');
    currentPlayer.value.stopped = true;
    showToast(`✋ ${currentPlayer.value.name} stops!`);
    nextTurn();
  }

  function nextTurn() {
    flipThreeData.value = null;
    const stillPlaying = players.value.filter(p => !p.stopped && !p.busted);
    if (stillPlaying.length === 0) {
      endRound();
      return;
    }
    let idx = (currentPlayerIdx.value + 1) % players.value.length;
    let tries = 0;
    while ((players.value[idx].stopped || players.value[idx].busted) && tries < players.value.length) {
      idx = (idx + 1) % players.value.length;
      tries++;
    }
    // Land on this player — even if frozen, we stop here so they can press "Skip Turn"
    currentPlayerIdx.value = idx;
    lastDrawnCard.value = null;
  }

  // Called by the frozen player to skip their turn
  function skipFrozenTurn() {
    const p = currentPlayer.value;
    if (!p || !p.frozen) return;
    p.frozenTurns--;
    if (p.frozenTurns <= 0) p.frozen = false;
    Audio.play('skipFrozen');
    showToast(`❄️ ${p.name} skips their frozen turn!`);
    nextTurn();
  }

  function endRound(flip7Player = null) {
    roundPhase.value = 'summary';
    const rows = players.value.map(p => {
      const total = handTotal(p);
      let earned = 0;
      let status = '';
      if (p.busted) {
        status = 'Busted! (duplicate)'; earned = 0;
      } else {
        earned = total;
        if (p.flip7Bonus) {
          earned += 15;
          status = `Flip 7 Bonus! ${total} + 15 = ${earned}`;
        } else {
          status = p.stopped ? `Stopped — scored ${total}` : `In play — scored ${total}`;
        }
      }
      return { player: p, handTotal: total, earned, status };
    });

    // Apply scores
    rows.forEach(r => { r.player.totalScore += r.earned; r.player.flip7Bonus = false; });

    const winners = players.value.filter(p => p.totalScore >= winScore.value);
    summaryData.value = { rows, roundNum: round.value, flip7Player };

    if (winners.length > 0) {
      const champion = winners.reduce((a, b) => a.totalScore > b.totalScore ? a : b);
      gameOverData.value = { champion, players: [...players.value].sort((a, b) => b.totalScore - a.totalScore) };
      Audio.play('gameOver');
      fireConfetti();
    } else {
      Audio.play('roundEnd');
    }

    showingSummary.value = true;
  }

  function continueSummary() {
    showingSummary.value = false;
    if (gameOverData.value) {
      screen.value = 'gameover';
      return;
    }
    round.value++;
    resetRound();
  }

  function playerStatus(p) {
    if (p.busted) return 'busted';
    if (p.frozen) return 'frozen';
    if (p.stopped) return 'stopped';
    if (p.id === currentPlayerIdx.value) return 'active';
    return null;
  }

  const isFlipThreePickTarget = computed(() =>
    flipThreeData.value && flipThreeData.value.type === 'flipthree-pick'
  );
  const isFreezePickTarget = computed(() =>
    flipThreeData.value && flipThreeData.value.type === 'freeze'
  );
  const isFlipThreeForceFlip = computed(() =>
    flipThreeData.value && flipThreeData.value.type === 'flipthree'
  );

  const canFlip = computed(() => {
    if (isAnimating.value) return false;
    if (isFlipThreePickTarget.value || isFreezePickTarget.value) return false;
    if (roundPhase.value === 'dealing') return !pendingActionCard.value;
    if (isFlipThreeForceFlip.value) return true;
    const p = currentPlayer.value;
    if (!p || p.stopped || p.busted || p.frozen) return false;
    return true;
  });

  const canStop = computed(() => {
    if (isAnimating.value) return false;
    if (roundPhase.value === 'dealing') return false;
    if (isFlipThreePickTarget.value || isFreezePickTarget.value || isFlipThreeForceFlip.value) return false;
    const p = currentPlayer.value;
    if (!p || p.stopped || p.busted || p.frozen) return false;
    return true;
  });

  const canSkipFrozen = computed(() => {
    if (roundPhase.value !== 'playing') return false;
    if (isAnimating.value) return false;
    const p = currentPlayer.value;
    return p && p.frozen && !p.stopped && !p.busted;
  });

  const turnInstructions = computed(() => {
    if (roundPhase.value === 'dealing') {
      if (pendingActionCard.value) return `Action card mid-deal — resolving...`;
      const name = players.value[dealingPlayerIdx.value]?.name;
      return `Dealing to ${name}... (${players.value[dealerIdx.value]?.name} is dealer)`;
    }
    if (isFlipThreePickTarget.value) return `${flipThreeData.value.actingPlayer.name} played Flip Three — pick a target!`;
    if (isFreezePickTarget.value) return `${flipThreeData.value.actingPlayer.name} played Freeze — pick a target!`;
    if (isFlipThreeForceFlip.value) {
      const t = players.value[flipThreeData.value.targetPlayerIdx];
      return `${t.name} must flip ${flipThreeData.value.cardsLeft} more card(s)!`;
    }
    const p = currentPlayer.value;
    if (!p) return '';
    if (p.frozen) return `${p.name} is frozen ❄️ — ${p.frozenTurns} turn(s) remaining. Press Skip to pass.`;
    return `${p.name}'s turn — Flip a card or Stop`;
  });

  const activePlayerName = computed(() => {
    if (roundPhase.value === 'dealing') return players.value[dealerIdx.value]?.name + ' (Dealer)';
    if (isFlipThreeForceFlip.value) return players.value[flipThreeData.value.targetPlayerIdx]?.name;
    if (isFlipThreePickTarget.value) return flipThreeData.value.actingPlayer?.name;
    if (isFreezePickTarget.value) return flipThreeData.value.actingPlayer?.name;
    return currentPlayer.value?.name;
  });

  function toggleMute() {
    Audio.toggleMute();
    isMuted.value = Audio.muted;
    Audio.play('click');
  }

  function addPlayer() { if (playerCount.value < 5) playerCount.value++; }
  function removePlayer() { if (playerCount.value > 2) playerCount.value--; }
  function resetAll() { screen.value = 'title'; }

  return {
    winScore,
    // Setup state
    screen, playerCount, playerNames,
    // Game state
    players, currentPlayerIdx, dealerIdx, round, roundPhase,
    dealingPlayerIdx, pendingActionCard,
    lastDrawnCard, lastDrawnFlipping,
    showingSummary, summaryData, gameOverData,
    toast, flipThreeData,
    showConfetti, confettiPieces, isAnimating, isMuted,
    // Computed
    deckRemaining,
    isFlipThreePickTarget, isFreezePickTarget, isFlipThreeForceFlip,
    canFlip, canStop, canSkipFrozen, turnInstructions, activePlayerName,
    // Helper functions
    handTotal, uniqueNumberCount, playerStatus,
    // Actions
    startGame, dealNextCard, drawCard, stopTurn, skipFrozenTurn,
    continueSummary, pickFreezeTarget, pickFlipThreeTarget,
    toggleMute, addPlayer, removePlayer, resetAll,
  };
});
