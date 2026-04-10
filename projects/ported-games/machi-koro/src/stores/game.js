import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  ESTABLISHMENTS, LANDMARKS, TYPE, EFFECT, ICON,
  buildShuffledDeck, getEst, getLandmark, countByIcon,
  activatesOn, DEFAULT_NAMES, PLAYER_COLORS,
} from '../constants.js';
import { audio } from '../audio.js';

export const useGameStore = defineStore('game', () => {
  // ── Setup ──────────────────────────────────────────────────────────────────
  const screen        = ref('title'); // 'title' | 'game' | 'gameover'
  const playerCount   = ref(2);
  const playerNames   = ref(['Alice', 'Bob', 'Carol', 'Dave']);

  // ── Players ────────────────────────────────────────────────────────────────
  const players = ref([]);
  const currentPlayerIdx = ref(0);

  // ── Supply ─────────────────────────────────────────────────────────────────
  const supply = ref({});
  const deck   = ref([]); // shuffled remaining cards for variable supply

  // ── Turn State Machine ─────────────────────────────────────────────────────
  // Phases: 'rolling' | 'reroll_prompt' | 'harbor_prompt' | 'income' | 'buy' | 'end_turn'
  const turnPhase          = ref('rolling');
  const diceValues         = ref([]);
  const isRolling          = ref(false);
  const usedReroll         = ref(false);
  const extraTurn          = ref(false);
  const consecutiveTurns   = ref(0);
  const harborBonus        = ref(0);    // 0 or 2; added to diceTotal when Harbor is used
  const boughtThisTurn     = ref(false); // Airport: did player buy anything this turn?

  // ── Interaction Modals ─────────────────────────────────────────────────────
  // null | { type, step?, opponentIdx?, opponentEstId?, myEstId? }
  const pendingInteraction = ref(null);

  // ── Income + UI ────────────────────────────────────────────────────────────
  const incomeLog      = ref([]);
  const toast          = ref(null);
  const toastTimer     = ref(null);
  const showConfetti   = ref(false);
  const confettiPieces = ref([]);
  const isAnimating    = ref(false);
  const isMuted        = ref(false);
  const winnerData     = ref(null);

  // ── Computed ───────────────────────────────────────────────────────────────
  const currentPlayer   = computed(() => players.value[currentPlayerIdx.value]);
  const diceTotal       = computed(() => diceValues.value.reduce((s, d) => s + d, 0) + harborBonus.value);
  const isDoubles       = computed(() => diceValues.value.length === 2 && diceValues.value[0] === diceValues.value[1]);

  const hasTrainStation  = computed(() => currentPlayer.value?.landmarks?.train_station ?? false);
  const hasShoppingMall  = computed(() => currentPlayer.value?.landmarks?.shopping_mall ?? false);
  const hasAmusementPark = computed(() => currentPlayer.value?.landmarks?.amusement_park ?? false);
  const hasRadioTower    = computed(() => currentPlayer.value?.landmarks?.radio_tower ?? false);
  const hasHarbor        = computed(() => currentPlayer.value?.landmarks?.harbor ?? false);
  const hasAirport       = computed(() => currentPlayer.value?.landmarks?.airport ?? false);

  const canRoll   = computed(() => turnPhase.value === 'rolling' && !pendingInteraction.value && !isAnimating.value);
  const canReroll = computed(() => turnPhase.value === 'reroll_prompt' && hasRadioTower.value && !usedReroll.value);
  const canBuy    = computed(() => turnPhase.value === 'buy' && !pendingInteraction.value);

  const turnInstructions = computed(() => {
    if (!currentPlayer.value) return '';
    const name = currentPlayer.value.name;
    if (pendingInteraction.value) {
      switch (pendingInteraction.value.type) {
        case 'dice_count': return `${name}: Roll 1 or 2 dice?`;
        case 'tv_station': return `${name}: Choose a player to take 5 coins from.`;
        case 'business_center':
          return pendingInteraction.value.step === 1
            ? `${name}: Choose an opponent to trade with.`
            : `${name}: Choose which buildings to swap.`;
      }
    }
    switch (turnPhase.value) {
      case 'rolling':       return `${name}'s turn — Roll the dice!`;
      case 'reroll_prompt': return `${name}: Use Radio Tower to reroll?`;
      case 'harbor_prompt': return `${name}: Use Harbor to add +2?`;
      case 'income':        return `Resolving income...`;
      case 'buy':           return `${name}: Buy a building or landmark (optional).`;
      case 'end_turn':      return '';
      default: return '';
    }
  });

  // ── Helpers ────────────────────────────────────────────────────────────────
  function makePlayer(id, name, isAI = false) {
    const ests = {};
    for (const e of ESTABLISHMENTS) ests[e.id] = 0;
    // Give starting cards
    const startingCards = ESTABLISHMENTS.filter(e => e.startingCard);
    for (const e of startingCards) ests[e.id] = 1;

    const lm = {};
    for (const l of LANDMARKS) lm[l.id] = false;
    lm['city_hall'] = true; // City Hall is pre-built for all players

    return {
      id,
      name,
      color: PLAYER_COLORS[id % PLAYER_COLORS.length],
      coins: 3,
      establishments: ests,
      landmarks: lm,
      isAI,
      renovatedCards: {},       // { [estId]: count } — face-down (deactivated) copies; only Winery uses this
      techStartupInvestment: 0, // accumulated coins invested into Tech Startup
    };
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  // Count built landmarks for a player
  function builtLandmarkCount(playerIdx) {
    return Object.values(players.value[playerIdx].landmarks).filter(Boolean).length;
  }

  // Draw cards from the deck until we have 10 unique visible stacks
  function drawToFillSupply() {
    const uniqueVisible = () => Object.values(supply.value).filter(v => v > 0).length;
    while (uniqueVisible() < 10 && deck.value.length > 0) {
      const estId = deck.value.shift();
      supply.value[estId] = (supply.value[estId] ?? 0) + 1;
    }
  }

  function transferCoins(fromIdx, toIdx, amount) {
    // Clamp to what fromPlayer can actually pay
    if (fromIdx === -1) {
      // From bank
      players.value[toIdx].coins += amount;
    } else {
      const actual = Math.min(players.value[fromIdx].coins, amount);
      players.value[fromIdx].coins -= actual;
      players.value[toIdx].coins  += actual;
      return actual;
    }
    return amount;
  }

  function addLogEntry(playerName, amount, source, isPositive) {
    incomeLog.value.push({ playerName, amount, source, isPositive, id: Date.now() + Math.random() });
  }

  function showToast(msg) {
    toast.value = msg;
    clearTimeout(toastTimer.value);
    toastTimer.value = setTimeout(() => { toast.value = null; }, 2500);
  }

  function fireConfetti() {
    const pieces = [];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff9f43', '#a29bfe'][Math.floor(Math.random() * 6)],
        duration: 1.5 + Math.random() * 2,
        delay: Math.random() * 0.8,
        size: 6 + Math.random() * 8,
      });
    }
    confettiPieces.value = pieces;
    showConfetti.value = true;
    setTimeout(() => { showConfetti.value = false; confettiPieces.value = []; }, 4000);
  }

  // ── Shopping Mall bonus for a given card owner ────────────────────────────
  function shoppingMallBonus(ownerIdx, icon) {
    // Shopping Mall gives +1 to cup and bread icon cards for the card's OWNER
    const owner = players.value[ownerIdx];
    if (!owner.landmarks.shopping_mall) return 0;
    if (icon === ICON.CUP || icon === ICON.BREAD) return 1;
    return 0;
  }

  // ── Calculate income for one activation of one establishment ──────────────
  // Returns the total income (positive) or cost (negative for LOAN).
  // For WINERY, also marks active copies as renovated.
  // For TECH_STARTUP, PARK, PUBLISHER, TAX_OFFICE — handled directly in resolvePurple.
  function calcIncome(ownerIdx, estId) {
    const est = getEst(estId);
    const owner = players.value[ownerIdx];
    const bonus = shoppingMallBonus(ownerIdx, est.icon);

    // Active count: for Winery, subtract renovated copies
    const totalCount = owner.establishments[estId] || 0;
    const renovated = owner.renovatedCards?.[estId] ?? 0;
    const count = est.renovates ? Math.max(0, totalCount - renovated) : totalCount;
    if (count === 0) return 0;

    let incomePerCard = 0;

    switch (est.effect) {
      case EFFECT.BANK:
      case EFFECT.STEAL_ACTIVE:
        incomePerCard = est.baseIncome + bonus;
        break;
      case EFFECT.STEAL_ALL:
      case EFFECT.STEAL_CHOOSE:
        incomePerCard = est.baseIncome;
        break;
      case EFFECT.SWAP:
        incomePerCard = 0;
        break;
      case EFFECT.PER_COW:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.COW) + bonus;
        break;
      case EFFECT.PER_GEAR:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.GEAR) + bonus;
        break;
      case EFFECT.PER_WHEAT:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.WHEAT) + bonus;
        break;
      // Expansion effects:
      case EFFECT.BANK_IF_FEW_LANDMARKS:
        incomePerCard = builtLandmarkCount(ownerIdx) < 2 ? est.baseIncome + bonus : 0;
        break;
      case EFFECT.BANK_IF_HARBOR:
        incomePerCard = owner.landmarks.harbor ? est.baseIncome + bonus : 0;
        break;
      case EFFECT.STEAL_ACTIVE_IF_HARBOR:
        incomePerCard = owner.landmarks.harbor ? est.baseIncome + bonus : 0;
        break;
      case EFFECT.PER_FLOWER:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.FLOWER) + bonus;
        break;
      case EFFECT.PER_GRAPE:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.GRAPE) + bonus;
        break;
      case EFFECT.PER_BREAD:
        incomePerCard = est.baseIncome * countByIcon(owner.establishments, ICON.BREAD) + bonus;
        break;
      case EFFECT.PER_CUP_ALL: {
        const totalCups = players.value.reduce((sum, p) => sum + countByIcon(p.establishments, ICON.CUP), 0);
        incomePerCard = est.baseIncome * totalCups + bonus;
        break;
      }
      case EFFECT.LOAN:
        return -2 * count; // negative income — owner pays bank
      case EFFECT.WINERY: {
        const grapeCount = countByIcon(owner.establishments, ICON.GRAPE);
        incomePerCard = est.baseIncome * grapeCount;
        // Renovate all active Winery copies after computing income
        owner.renovatedCards[estId] = (owner.renovatedCards[estId] ?? 0) + count;
        break;
      }
      // TECH_STARTUP, PARK, PUBLISHER, TAX_OFFICE handled in resolvePurple
      case EFFECT.TECH_STARTUP:
      case EFFECT.PARK:
      case EFFECT.PUBLISHER:
      case EFFECT.TAX_OFFICE:
        return 0; // handled separately
      default:
        incomePerCard = 0;
    }

    return incomePerCard * count;
  }

  // ── Income Resolution ─────────────────────────────────────────────────────

  function resolveRed() {
    // Red cards activate on other players' turns — card owners collect from active player
    const activeIdx = currentPlayerIdx.value;
    const total = diceTotal.value;
    const activePlayer = players.value[activeIdx];

    const redEsts = ESTABLISHMENTS.filter(e => e.type === TYPE.RED && activatesOn(e, total));
    for (const est of redEsts) {
      for (let ownerIdx = 0; ownerIdx < players.value.length; ownerIdx++) {
        if (ownerIdx === activeIdx) continue; // red doesn't fire for active player
        const owner = players.value[ownerIdx];
        const count = owner.establishments[est.id] || 0;
        if (count === 0) continue;

        let totalIncome = 0;

        if (est.effect === EFFECT.STEAL_ACTIVE_IF_LANDMARKS) {
          // French Restaurant: only fires if roller has 2+ built landmarks
          if (builtLandmarkCount(activeIdx) < 2) continue;
          const bonus = shoppingMallBonus(ownerIdx, est.icon);
          totalIncome = (est.baseIncome + bonus) * count;

        } else if (est.effect === EFFECT.STEAL_ALL_IF_LANDMARKS) {
          // Member's Club: take ALL coins from roller if they have 3+ landmarks
          if (builtLandmarkCount(activeIdx) < 3) continue;
          totalIncome = activePlayer.coins; // take everything

        } else if (est.effect === EFFECT.STEAL_ACTIVE_IF_HARBOR) {
          // Sushi Bar: only fires if owner has Harbor
          if (!owner.landmarks.harbor) continue;
          const bonus = shoppingMallBonus(ownerIdx, est.icon);
          totalIncome = (est.baseIncome + bonus) * count;

        } else {
          // Normal red (STEAL_ACTIVE): Café, Family Restaurant, Pizza Joint
          const bonus = shoppingMallBonus(ownerIdx, est.icon);
          totalIncome = (est.baseIncome + bonus) * count;
        }

        if (totalIncome <= 0) continue;
        const actual = Math.min(activePlayer.coins, totalIncome);
        activePlayer.coins -= actual;
        owner.coins += actual;

        if (actual > 0) {
          addLogEntry(owner.name, actual, est.name, true);
          addLogEntry(activePlayer.name, actual, est.name, false);
          audio.coinLoss();
        }
      }
    }
  }

  function resolveBlueGreen() {
    const activeIdx = currentPlayerIdx.value;
    const total = diceTotal.value;

    const blueGreenEsts = ESTABLISHMENTS.filter(e =>
      (e.type === TYPE.BLUE || e.type === TYPE.GREEN) && activatesOn(e, total)
    );

    for (const est of blueGreenEsts) {
      if (est.type === TYPE.GREEN) {
        // Green: only active player collects (or pays for LOAN)
        if (est.effect === EFFECT.TUNA_BOAT) continue; // TUNA_BOAT is Blue only

        const income = calcIncome(activeIdx, est.id);
        if (income > 0) {
          players.value[activeIdx].coins += income;
          addLogEntry(players.value[activeIdx].name, income, est.name, true);
          audio.coinGain();
        } else if (income < 0) {
          // LOAN: pay to bank (clamped at 0)
          const payment = Math.min(players.value[activeIdx].coins, Math.abs(income));
          players.value[activeIdx].coins -= payment;
          if (payment > 0) {
            addLogEntry(players.value[activeIdx].name, payment, `${est.name} (payment)`, false);
            audio.coinLoss();
          }
        }
      } else {
        // Blue: every player who owns it collects
        for (let ownerIdx = 0; ownerIdx < players.value.length; ownerIdx++) {
          const owner = players.value[ownerIdx];
          const count = owner.establishments[est.id] || 0;
          if (count === 0) continue;

          // Tuna Boat: if owner has Harbor, roll 2 internal dice and gain that total
          if (est.effect === EFFECT.TUNA_BOAT) {
            if (!owner.landmarks.harbor) continue;
            const d1 = Math.ceil(Math.random() * 6);
            const d2 = Math.ceil(Math.random() * 6);
            const tunaTotal = (d1 + d2) * count;
            owner.coins += tunaTotal;
            addLogEntry(owner.name, tunaTotal, `${est.name} (rolled ${d1}+${d2}=${d1+d2})`, true);
            audio.coinGain();
            continue;
          }

          const income = calcIncome(ownerIdx, est.id);
          if (income > 0) {
            owner.coins += income;
            addLogEntry(owner.name, income, est.name, true);
            audio.coinGain();
          }
        }
      }
    }
  }

  async function resolvePurple() {
    const activeIdx = currentPlayerIdx.value;
    const total = diceTotal.value;

    // Purple cards activate only on active player's turn, in fixed order
    const purpleOrder = [
      'stadium', 'tv_station', 'business_center',
      'tech_startup', 'park', 'publisher', 'tax_office',
    ];

    for (const estId of purpleOrder) {
      const count = players.value[activeIdx].establishments[estId] || 0;
      if (count === 0) continue;

      const est = getEst(estId);
      if (!activatesOn(est, total)) continue;

      if (est.effect === EFFECT.STEAL_ALL) {
        // Stadium: take baseIncome from every other player
        let total_gained = 0;
        for (let i = 0; i < players.value.length; i++) {
          if (i === activeIdx) continue;
          const actual = Math.min(players.value[i].coins, est.baseIncome);
          players.value[i].coins  -= actual;
          players.value[activeIdx].coins += actual;
          if (actual > 0) {
            addLogEntry(players.value[activeIdx].name, actual, est.name, true);
            addLogEntry(players.value[i].name, actual, est.name, false);
          }
          total_gained += actual;
        }
        if (total_gained > 0) audio.stadium();

      } else if (est.effect === EFFECT.STEAL_CHOOSE) {
        // TV Station: set interaction, wait for user pick (or AI auto-pick)
        if (players.value[activeIdx].isAI) {
          const targetIdx = aiPickRichestOpponent(activeIdx);
          await pickTVStationTarget(targetIdx);
        } else {
          pendingInteraction.value = { type: 'tv_station' };
          return; // stop here; pickTVStationTarget will call resolvePurpleRemainder
        }

      } else if (est.effect === EFFECT.SWAP) {
        // Business Center: set interaction, wait for user pick (or AI auto-pick)
        if (players.value[activeIdx].isAI) {
          aiPickBusinessCenterSwap(activeIdx);
        } else {
          pendingInteraction.value = { type: 'business_center', step: 1 };
          return;
        }

      } else if (est.effect === EFFECT.TECH_STARTUP) {
        // Tech Startup: collect invested total from bank + each opponent; then reset
        const activePlayer = players.value[activeIdx];
        const invested = activePlayer.techStartupInvestment;
        if (invested > 0) {
          // From bank
          activePlayer.coins += invested;
          addLogEntry(activePlayer.name, invested, `${est.name} (bank)`, true);
          // From each opponent
          for (let i = 0; i < players.value.length; i++) {
            if (i === activeIdx) continue;
            const actual = Math.min(players.value[i].coins, invested);
            players.value[i].coins -= actual;
            activePlayer.coins += actual;
            if (actual > 0) {
              addLogEntry(activePlayer.name, actual, `${est.name} (from ${players.value[i].name})`, true);
              addLogEntry(players.value[i].name, actual, est.name, false);
            }
          }
          activePlayer.techStartupInvestment = 0;
          audio.coinBig();
        }

      } else if (est.effect === EFFECT.PARK) {
        // Park: redistribute all players' coins equally
        const total_coins = players.value.reduce((s, p) => s + p.coins, 0);
        const each = Math.floor(total_coins / players.value.length);
        players.value.forEach(p => { p.coins = each; });
        addLogEntry(players.value[activeIdx].name, 0, `Park: redistributed ${total_coins} coins (${each} each)`, true);
        audio.coinGain();

      } else if (est.effect === EFFECT.PUBLISHER) {
        // Publisher: steal (cup+bread count) from each opponent
        const activePlayer = players.value[activeIdx];
        let gained = 0;
        for (let i = 0; i < players.value.length; i++) {
          if (i === activeIdx) continue;
          const opponent = players.value[i];
          const iconCount = countByIcon(opponent.establishments, ICON.CUP) +
                            countByIcon(opponent.establishments, ICON.BREAD);
          if (iconCount === 0) continue;
          const actual = Math.min(opponent.coins, iconCount);
          opponent.coins -= actual;
          activePlayer.coins += actual;
          gained += actual;
          if (actual > 0) {
            addLogEntry(activePlayer.name, actual, `${est.name} (from ${opponent.name})`, true);
            addLogEntry(opponent.name, actual, est.name, false);
          }
        }
        if (gained > 0) audio.coinBig();

      } else if (est.effect === EFFECT.TAX_OFFICE) {
        // Tax Office: take floor(coins/2) from each player with 10+ coins
        const activePlayer = players.value[activeIdx];
        let gained = 0;
        for (let i = 0; i < players.value.length; i++) {
          if (i === activeIdx) continue;
          const opponent = players.value[i];
          if (opponent.coins < 10) continue;
          const taken = Math.floor(opponent.coins / 2);
          opponent.coins -= taken;
          activePlayer.coins += taken;
          gained += taken;
          if (taken > 0) {
            addLogEntry(activePlayer.name, taken, `${est.name} (from ${opponent.name})`, true);
            addLogEntry(opponent.name, taken, est.name, false);
          }
        }
        if (gained > 0) audio.coinBig();
      }
    }

    // All purples resolved — advance to buy phase
    advanceToBuy();
  }

  // Resolve a subset of purple card IDs (used after overlay interactions complete)
  async function resolveRemainingPurples(activeIdx, total, estIds) {
    const activePlayer = players.value[activeIdx];
    for (const estId of estIds) {
      const count = activePlayer.establishments[estId] || 0;
      if (count === 0) continue;
      const est = getEst(estId);
      if (!activatesOn(est, total)) continue;

      if (est.effect === EFFECT.TECH_STARTUP) {
        const invested = activePlayer.techStartupInvestment;
        if (invested > 0) {
          activePlayer.coins += invested;
          addLogEntry(activePlayer.name, invested, `${est.name} (bank)`, true);
          for (let i = 0; i < players.value.length; i++) {
            if (i === activeIdx) continue;
            const actual = Math.min(players.value[i].coins, invested);
            players.value[i].coins -= actual;
            activePlayer.coins += actual;
            if (actual > 0) {
              addLogEntry(activePlayer.name, actual, `${est.name} (from ${players.value[i].name})`, true);
              addLogEntry(players.value[i].name, actual, est.name, false);
            }
          }
          activePlayer.techStartupInvestment = 0;
          audio.coinBig();
        }
      } else if (est.effect === EFFECT.PARK) {
        const total_coins = players.value.reduce((s, p) => s + p.coins, 0);
        const each = Math.floor(total_coins / players.value.length);
        players.value.forEach(p => { p.coins = each; });
        addLogEntry(activePlayer.name, 0, `Park: redistributed ${total_coins} coins (${each} each)`, true);
        audio.coinGain();
      } else if (est.effect === EFFECT.PUBLISHER) {
        let gained = 0;
        for (let i = 0; i < players.value.length; i++) {
          if (i === activeIdx) continue;
          const opponent = players.value[i];
          const iconCount = countByIcon(opponent.establishments, ICON.CUP) + countByIcon(opponent.establishments, ICON.BREAD);
          if (iconCount === 0) continue;
          const actual = Math.min(opponent.coins, iconCount);
          opponent.coins -= actual;
          activePlayer.coins += actual;
          gained += actual;
          if (actual > 0) {
            addLogEntry(activePlayer.name, actual, `${est.name} (from ${opponent.name})`, true);
            addLogEntry(opponent.name, actual, est.name, false);
          }
        }
        if (gained > 0) audio.coinBig();
      } else if (est.effect === EFFECT.TAX_OFFICE) {
        let gained = 0;
        for (let i = 0; i < players.value.length; i++) {
          if (i === activeIdx) continue;
          const opponent = players.value[i];
          if (opponent.coins < 10) continue;
          const taken = Math.floor(opponent.coins / 2);
          opponent.coins -= taken;
          activePlayer.coins += taken;
          gained += taken;
          if (taken > 0) {
            addLogEntry(activePlayer.name, taken, `${est.name} (from ${opponent.name})`, true);
            addLogEntry(opponent.name, taken, est.name, false);
          }
        }
        if (gained > 0) audio.coinBig();
      }
    }
    advanceToBuy();
  }

  // City Hall: after all income resolved, any player with 0 coins + City Hall gets 1 coin
  function resolveCityHall() {
    for (const player of players.value) {
      if (player.landmarks.city_hall && player.coins === 0) {
        player.coins += 1;
        addLogEntry(player.name, 1, 'City Hall', true);
      }
    }
  }

  function advanceToBuy() {
    resolveCityHall();
    turnPhase.value = 'buy';
    if (players.value[currentPlayerIdx.value].isAI) {
      setTimeout(() => aiDoBuy(), 600);
    }
  }

  // ── TV Station Overlay ────────────────────────────────────────────────────

  async function pickTVStationTarget(targetIdx) {
    const activeIdx = currentPlayerIdx.value;
    const amount = 5;
    const actual = Math.min(players.value[targetIdx].coins, amount);
    players.value[targetIdx].coins  -= actual;
    players.value[activeIdx].coins  += actual;
    if (actual > 0) {
      addLogEntry(players.value[activeIdx].name, actual, 'TV Station', true);
      addLogEntry(players.value[targetIdx].name, actual, 'TV Station', false);
      audio.tvStation();
    }
    pendingInteraction.value = null;

    // Continue purple resolution (check for business center then new purples)
    const total = diceTotal.value;
    const bcCount = players.value[activeIdx].establishments['business_center'] || 0;
    const bcEst = getEst('business_center');
    if (bcCount > 0 && activatesOn(bcEst, total)) {
      if (players.value[activeIdx].isAI) {
        aiPickBusinessCenterSwap(activeIdx);
        await resolveRemainingPurples(activeIdx, total, ['tech_startup', 'park', 'publisher', 'tax_office']);
      } else {
        pendingInteraction.value = { type: 'business_center', step: 1 };
        return;
      }
    } else {
      await resolveRemainingPurples(activeIdx, total, ['tech_startup', 'park', 'publisher', 'tax_office']);
    }
  }

  // ── Business Center Overlay ───────────────────────────────────────────────

  function pickBusinessCenterOpponent(opponentIdx) {
    pendingInteraction.value = {
      type: 'business_center',
      step: 2,
      opponentIdx,
    };
  }

  async function pickBusinessCenterSwap(myEstId, opponentEstId) {
    const activeIdx = currentPlayerIdx.value;
    const { opponentIdx } = pendingInteraction.value;

    // Perform the swap
    players.value[activeIdx].establishments[myEstId]       = Math.max(0, (players.value[activeIdx].establishments[myEstId] || 0) - 1);
    players.value[activeIdx].establishments[opponentEstId] = (players.value[activeIdx].establishments[opponentEstId] || 0) + 1;
    players.value[opponentIdx].establishments[opponentEstId] = Math.max(0, (players.value[opponentIdx].establishments[opponentEstId] || 0) - 1);
    players.value[opponentIdx].establishments[myEstId]       = (players.value[opponentIdx].establishments[myEstId] || 0) + 1;

    addLogEntry(players.value[activeIdx].name, 0, `Swapped ${getEst(myEstId)?.name} ↔ ${getEst(opponentEstId)?.name}`, true);
    audio.businessCenter();

    pendingInteraction.value = null;
    await resolveRemainingPurples(activeIdx, diceTotal.value, ['tech_startup', 'park', 'publisher', 'tax_office']);
  }

  // ── Public: resolve income after roll ─────────────────────────────────────

  function resolveIncome() {
    incomeLog.value = [];
    turnPhase.value = 'income';

    resolveRed();
    resolveBlueGreen();
    resolvePurple(); // may set pendingInteraction and return early
  }

  // ── Dice Rolling ──────────────────────────────────────────────────────────

  function rollDice(count = 1) {
    if (isAnimating.value) return;

    // If train station: ask first
    if (count === 1 && hasTrainStation.value && !pendingInteraction.value) {
      pendingInteraction.value = { type: 'dice_count' };
      return;
    }

    isAnimating.value = true;
    audio.diceRoll();

    // Animate rolling for 600ms with random values
    let animInterval = setInterval(() => {
      const vals = [];
      for (let i = 0; i < count; i++) vals.push(Math.ceil(Math.random() * 6));
      diceValues.value = vals;
    }, 80);

    setTimeout(() => {
      clearInterval(animInterval);
      isRolling.value = false;

      const finalVals = [];
      for (let i = 0; i < count; i++) finalVals.push(Math.ceil(Math.random() * 6));
      diceValues.value = finalVals;
      isAnimating.value = false;

      // Radio Tower: offer reroll if not already used
      if (hasRadioTower.value && !usedReroll.value) {
        turnPhase.value = 'reroll_prompt';
        if (players.value[currentPlayerIdx.value].isAI) {
          setTimeout(() => aiDecideReroll(), 500);
        }
      } else {
        checkHarborThenIncome();
      }
    }, 600);
  }

  // After rolling (and after any reroll), check Harbor before resolving income
  function checkHarborThenIncome() {
    const rawTotal = diceValues.value.reduce((s, d) => s + d, 0);
    if (hasHarbor.value && rawTotal >= 10) {
      turnPhase.value = 'harbor_prompt';
      if (players.value[currentPlayerIdx.value].isAI) {
        // AI always uses Harbor
        setTimeout(() => useHarbor(), 400);
      }
    } else {
      resolveIncome();
    }
  }

  function useHarbor() {
    harborBonus.value = 2;
    resolveIncome();
  }

  function skipHarbor() {
    harborBonus.value = 0;
    resolveIncome();
  }

  function chooseDiceCount(count) {
    pendingInteraction.value = null;
    rollDice(count);
  }

  function chooseReroll() {
    usedReroll.value = true;
    turnPhase.value = 'rolling';
    rollDice(diceValues.value.length); // re-roll same count
  }

  function skipReroll() {
    turnPhase.value = 'rolling'; // just to keep consistent, then immediately resolve
    checkHarborThenIncome();
  }

  // ── Buy Phase ─────────────────────────────────────────────────────────────

  function buyEstablishment(estId) {
    if (!canBuy.value) return;
    const player = players.value[currentPlayerIdx.value];
    const est = getEst(estId);
    if (!est) return;
    if (player.coins < est.cost) return;
    if (supply.value[estId] <= 0) return;

    // Purple: max 1
    if (est.type === TYPE.PURPLE && (player.establishments[estId] || 0) >= 1) return;

    player.coins -= est.cost;
    player.establishments[estId] = (player.establishments[estId] || 0) + 1;
    supply.value[estId] = Math.max(0, supply.value[estId] - 1);

    // Refill variable supply when a stack is depleted
    if (supply.value[estId] === 0) drawToFillSupply();

    // Loan Office: gain 5 coins immediately on purchase
    if (est.buildBonus) {
      player.coins += est.buildBonus;
      addLogEntry(player.name, est.buildBonus, `${est.name} (loan)`, true);
    }

    if (est.cost > 0) {
      addLogEntry(player.name, est.cost, `Bought ${est.name}`, false);
    } else {
      addLogEntry(player.name, 0, `Bought ${est.name} (free)`, true);
    }
    audio.establishmentBuy();
    boughtThisTurn.value = true;
    endTurn();
  }

  function buyLandmark(landmarkId) {
    if (!canBuy.value) return;
    const player = players.value[currentPlayerIdx.value];
    const lm = getLandmark(landmarkId);
    if (!lm) return;
    if (player.coins < lm.cost) return;
    if (player.landmarks[landmarkId]) return; // already built

    player.coins -= lm.cost;
    player.landmarks[landmarkId] = true;

    if (lm.cost > 0) {
      addLogEntry(player.name, lm.cost, `Built ${lm.name}`, false);
    } else {
      addLogEntry(player.name, 0, `Built ${lm.name} (free)`, true);
    }
    audio.landmarkBuy();
    showToast(`🏛️ ${player.name} built ${lm.name}!`);
    boughtThisTurn.value = true;

    if (checkWin()) return;
    endTurn();
  }

  function skipBuy() {
    endTurn();
  }

  // ── Win Detection ─────────────────────────────────────────────────────────

  function checkWin() {
    const player = players.value[currentPlayerIdx.value];
    const allBuilt = LANDMARKS.every(l => player.landmarks[l.id]);
    if (allBuilt) {
      winnerData.value = { player, idx: currentPlayerIdx.value };
      audio.win();
      fireConfetti();
      setTimeout(() => { screen.value = 'gameover'; }, 1200);
      return true;
    }
    return false;
  }

  // ── Turn Advancement ──────────────────────────────────────────────────────

  function endTurn() {
    turnPhase.value = 'end_turn';
    const player = players.value[currentPlayerIdx.value];

    // Airport: if player has Airport and bought nothing this turn, gain 10 coins
    if (hasAirport.value && !boughtThisTurn.value) {
      player.coins += 10;
      addLogEntry(player.name, 10, 'Airport (built nothing)', true);
    }

    // Tech Startup: auto-invest 1 coin per copy owned at end of turn
    const tsCount = player.establishments['tech_startup'] || 0;
    if (tsCount > 0 && player.coins > 0) {
      const invest = Math.min(tsCount, player.coins);
      player.coins -= invest;
      player.techStartupInvestment += invest;
      addLogEntry(player.name, invest, `Tech Startup (invested, total: ${player.techStartupInvestment})`, false);
    }

    // Reset per-turn state
    harborBonus.value = 0;
    boughtThisTurn.value = false;

    // Amusement Park: doubles = extra turn
    if (isDoubles.value && hasAmusementPark.value && extraTurn.value === false) {
      consecutiveTurns.value++;
      if (consecutiveTurns.value < 5) {
        extraTurn.value = true;
        showToast('🎡 Doubles! Extra turn!');
      }
    }

    if (extraTurn.value) {
      extraTurn.value = false;
      startTurnFor(currentPlayerIdx.value);
    } else {
      consecutiveTurns.value = 0;
      const nextIdx = (currentPlayerIdx.value + 1) % players.value.length;
      startTurnFor(nextIdx);
    }
  }

  function startTurnFor(idx) {
    currentPlayerIdx.value = idx;
    turnPhase.value = 'rolling';
    usedReroll.value = false;
    harborBonus.value = 0;
    boughtThisTurn.value = false;
    pendingInteraction.value = null;
    diceValues.value = [];

    if (players.value[idx].isAI) {
      setTimeout(() => aiTakeTurn(), 800);
    }
  }

  // ── Game Setup ────────────────────────────────────────────────────────────

  function startGame() {
    const count = playerCount.value;
    players.value = [];
    for (let i = 0; i < count; i++) {
      const name = playerNames.value[i] || DEFAULT_NAMES[i];
      const isAI = i > 0; // Player 0 is always human, rest are AI
      players.value.push(makePlayer(i, name, isAI));
    }

    // Variable supply: start with all zeros, build from shuffled deck
    supply.value = {};
    for (const est of ESTABLISHMENTS) supply.value[est.id] = 0;
    deck.value = buildShuffledDeck(count);
    drawToFillSupply();

    currentPlayerIdx.value = 0;
    turnPhase.value = 'rolling';
    diceValues.value = [];
    usedReroll.value = false;
    harborBonus.value = 0;
    boughtThisTurn.value = false;
    extraTurn.value = false;
    consecutiveTurns.value = 0;
    pendingInteraction.value = null;
    incomeLog.value = [];
    winnerData.value = null;
    screen.value = 'game';
  }

  function resetAll() {
    screen.value = 'title';
    players.value = [];
    diceValues.value = [];
    deck.value = [];
    winnerData.value = null;
    pendingInteraction.value = null;
    incomeLog.value = [];
    showConfetti.value = false;
    confettiPieces.value = [];
    harborBonus.value = 0;
    boughtThisTurn.value = false;
  }

  function closeWinOverlay() {
    winnerData.value = null;
    screen.value = 'game';
  }

  // ── AI Logic ──────────────────────────────────────────────────────────────

  function aiPickRichestOpponent(activeIdx) {
    let richest = -1, maxCoins = -1;
    for (let i = 0; i < players.value.length; i++) {
      if (i === activeIdx) continue;
      if (players.value[i].coins > maxCoins) {
        maxCoins = players.value[i].coins;
        richest = i;
      }
    }
    return richest;
  }

  function aiPickBusinessCenterSwap(activeIdx) {
    // AI: swap their weakest non-purple card for opponent's best non-purple card
    const nonPurpleIds = ESTABLISHMENTS
      .filter(e => e.type !== TYPE.PURPLE)
      .map(e => e.id);

    let myWeakestId = null, myWeakestCost = Infinity;
    for (const id of nonPurpleIds) {
      const count = players.value[activeIdx].establishments[id] || 0;
      if (count > 0) {
        const cost = getEst(id).cost;
        if (cost < myWeakestCost) { myWeakestCost = cost; myWeakestId = id; }
      }
    }

    let oppIdx = -1, oppBestId = null, oppBestCost = -1;
    for (let i = 0; i < players.value.length; i++) {
      if (i === activeIdx) continue;
      for (const id of nonPurpleIds) {
        const count = players.value[i].establishments[id] || 0;
        if (count > 0) {
          const cost = getEst(id).cost;
          if (cost > oppBestCost) {
            oppBestCost = cost; oppBestId = id; oppIdx = i;
          }
        }
      }
    }

    if (myWeakestId && oppBestId && oppIdx >= 0) {
      // Do the swap inline (same logic as pickBusinessCenterSwap)
      players.value[activeIdx].establishments[myWeakestId]  = Math.max(0, (players.value[activeIdx].establishments[myWeakestId] || 0) - 1);
      players.value[activeIdx].establishments[oppBestId]    = (players.value[activeIdx].establishments[oppBestId] || 0) + 1;
      players.value[oppIdx].establishments[oppBestId]       = Math.max(0, (players.value[oppIdx].establishments[oppBestId] || 0) - 1);
      players.value[oppIdx].establishments[myWeakestId]     = (players.value[oppIdx].establishments[myWeakestId] || 0) + 1;
      audio.businessCenter();
    }
  }

  function aiDecideReroll() {
    // Reroll if no owned cards activate on current total
    const total = diceTotal.value;
    const activeIdx = currentPlayerIdx.value;
    let anyActive = false;

    for (const est of ESTABLISHMENTS) {
      if (!activatesOn(est, total)) continue;
      if (est.type === TYPE.RED) continue; // red fires for opponents, not us
      const count = players.value[activeIdx].establishments[est.id] || 0;
      if (count > 0) { anyActive = true; break; }
    }

    if (!anyActive) {
      chooseReroll();
    } else {
      // After deciding whether to reroll, Harbor check happens inside skipReroll → checkHarborThenIncome
      skipReroll();
    }
  }

  function aiTakeTurn() {
    const activeIdx = currentPlayerIdx.value;
    const player = players.value[activeIdx];

    // Step 1: dice count (train station)
    if (hasTrainStation.value && !pendingInteraction.value) {
      // Roll 2 dice if we own cards that activate on 7-12
      const highRollIds = ESTABLISHMENTS
        .filter(e => e.rolls.some(r => r >= 7))
        .map(e => e.id);
      const ownsHighRoll = highRollIds.some(id => (player.establishments[id] || 0) > 0);
      chooseDiceCount(ownsHighRoll ? 2 : 1);
    } else {
      rollDice(1);
    }
  }

  function aiDoBuy() {
    const player = players.value[currentPlayerIdx.value];

    // Priority 1: Buy a landmark if affordable — cheapest first so free ones (City Hall) are grabbed immediately
    const unbuiltLandmarks = LANDMARKS
      .filter(lm => !player.landmarks[lm.id] && player.coins >= lm.cost)
      .sort((a, b) => a.cost - b.cost);
    if (unbuiltLandmarks.length > 0) {
      buyLandmark(unbuiltLandmarks[0].id);
      return;
    }

    // Priority 2: Buy cheapest affordable establishment that fills a roll gap
    // Find which rolls we DON'T have coverage on (1-12)
    const coveredRolls = new Set();
    for (const est of ESTABLISHMENTS) {
      if ((player.establishments[est.id] || 0) > 0) {
        for (const r of est.rolls) coveredRolls.add(r);
      }
    }

    const affordable = ESTABLISHMENTS.filter(e => {
      if (e.type === TYPE.PURPLE && (player.establishments[e.id] || 0) >= 1) return false;
      // AI limits Loan Office to 1 copy (negative income card — diminishing returns)
      if (e.id === 'loan_office' && (player.establishments['loan_office'] || 0) >= 1) return false;
      if ((supply.value[e.id] || 0) <= 0) return false;
      return player.coins >= e.cost;
    });

    // Prefer cards that cover uncovered rolls
    const gapFillers = affordable.filter(e => e.rolls.some(r => !coveredRolls.has(r)));
    if (gapFillers.length > 0) {
      const cheapest = gapFillers.reduce((a, b) => a.cost <= b.cost ? a : b);
      buyEstablishment(cheapest.id);
      return;
    }

    // Otherwise buy cheapest affordable card
    if (affordable.length > 0) {
      const cheapest = affordable.reduce((a, b) => a.cost <= b.cost ? a : b);
      buyEstablishment(cheapest.id);
      return;
    }

    skipBuy();
  }

  // ── Player setup helpers ──────────────────────────────────────────────────

  function addPlayer() {
    if (playerCount.value < 4) playerCount.value++;
  }

  function removePlayer() {
    if (playerCount.value > 2) playerCount.value--;
  }

  function toggleMute() {
    isMuted.value = !isMuted.value;
    audio.setMuted(isMuted.value);
  }

  return {
    // State
    screen, playerCount, playerNames,
    players, currentPlayerIdx, supply, deck,
    turnPhase, diceValues, isRolling, usedReroll, extraTurn, consecutiveTurns,
    harborBonus, boughtThisTurn,
    pendingInteraction,
    incomeLog, toast, showConfetti, confettiPieces, isAnimating, isMuted, winnerData,
    // Computed
    currentPlayer, diceTotal, isDoubles,
    hasTrainStation, hasShoppingMall, hasAmusementPark, hasRadioTower, hasHarbor, hasAirport,
    canRoll, canReroll, canBuy, turnInstructions,
    // Actions
    startGame, resetAll, closeWinOverlay,
    rollDice, chooseDiceCount, chooseReroll, skipReroll, useHarbor, skipHarbor,
    resolveIncome,
    pickTVStationTarget, pickBusinessCenterOpponent, pickBusinessCenterSwap,
    buyEstablishment, buyLandmark, skipBuy,
    addPlayer, removePlayer, toggleMute,
    showToast,
  };
});
