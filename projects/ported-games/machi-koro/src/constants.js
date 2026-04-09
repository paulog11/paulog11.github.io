// ── Card Types ──────────────────────────────────────────────────────────────
export const TYPE = {
  BLUE:   'blue',   // activates on any player's turn
  GREEN:  'green',  // activates on active player's turn only
  RED:    'red',    // activates on other players' turns — takes from active player
  PURPLE: 'purple', // activates on active player's turn, special effects, max 1 per player
};

// ── Icon Groups ──────────────────────────────────────────────────────────────
// Used for Shopping Mall bonus detection and combo card counting
export const ICON = {
  WHEAT:  'wheat',  // Wheat Field, Apple Orchard
  COW:    'cow',    // Ranch
  GEAR:   'gear',   // Forest, Mine
  BREAD:  'bread',  // Bakery, Convenience Store, Cheese Factory, Furniture Factory, Produce Market
  CUP:    'cup',    // Café, Family Restaurant, Pizza Joint, Sushi Bar, French Restaurant, Member's Club
  TOWER:  'tower',  // Stadium, TV Station, Business Center, Tech Startup, Park, Publisher, Tax Office
  FLOWER: 'flower', // Flower Orchard (Flower Shop counts these)
  GRAPE:  'grape',  // Vineyard (Winery counts these)
  FISH:   'fish',   // Mackerel Boat, Tuna Boat (cosmetic)
};

// ── Effect Types ─────────────────────────────────────────────────────────────
export const EFFECT = {
  // Base game
  BANK:         'bank',         // receive baseIncome from bank
  STEAL_ACTIVE: 'steal_active', // take baseIncome from the active (rolling) player
  STEAL_ALL:    'steal_all',    // take baseIncome from every other player (Stadium)
  STEAL_CHOOSE: 'steal_choose', // take baseIncome from one chosen player (TV Station) — triggers overlay
  SWAP:         'swap',         // swap one non-purple establishment with another player — triggers overlay
  PER_COW:      'per_cow',      // baseIncome × count of cow-icon (Ranch) cards owned
  PER_GEAR:     'per_gear',     // baseIncome × count of gear-icon (Forest + Mine) cards owned
  PER_WHEAT:    'per_wheat',    // baseIncome × count of wheat-icon (Wheat Field + Apple Orchard) cards owned
  // Expansion
  BANK_IF_FEW_LANDMARKS:     'bank_if_few_landmarks',     // income only if owner has < 2 built landmarks
  STEAL_ACTIVE_IF_LANDMARKS: 'steal_active_if_landmarks', // steal if roller has 2+ built landmarks
  STEAL_ALL_IF_LANDMARKS:    'steal_all_if_landmarks',    // take ALL coins if roller has 3+ built landmarks
  BANK_IF_HARBOR:            'bank_if_harbor',            // income from bank if owner has Harbor landmark
  STEAL_ACTIVE_IF_HARBOR:    'steal_active_if_harbor',    // steal from roller if owner has Harbor landmark
  TUNA_BOAT:                 'tuna_boat',                 // if owner has Harbor: roll 2 fresh dice internally, gain total
  PER_FLOWER:                'per_flower',                // baseIncome × count of FLOWER icon cards owned
  PER_GRAPE:                 'per_grape',                 // baseIncome × count of GRAPE icon cards owned
  PER_BREAD:                 'per_bread',                 // baseIncome × count of BREAD icon cards owned
  PER_CUP_ALL:               'per_cup_all',               // baseIncome × total CUP icon cards across ALL players
  LOAN:                      'loan',                      // negative income: owner pays 2 on roll; gains 5 on build
  WINERY:                    'winery',                    // 6 × grape count, then self-renovates (permanently deactivates)
  TECH_STARTUP:              'tech_startup',              // invest 1 at end of turn; collect invested total from bank + each opponent
  PARK:                      'park',                      // redistribute all players' coins equally
  PUBLISHER:                 'publisher',                 // steal (cup+bread count) coins from each opponent
  TAX_OFFICE:                'tax_office',                // take floor(coins/2) from each player with 10+ coins
};

// ── Establishments ───────────────────────────────────────────────────────────
export const ESTABLISHMENTS = [
  {
    id: 'wheat_field',
    name: 'Wheat Field',
    type: TYPE.BLUE,
    icon: ICON.WHEAT,
    rolls: [1],
    cost: 1,
    baseIncome: 1,
    effect: EFFECT.BANK,
    description: 'Get 1 coin from the bank.',
    startingCard: true,
  },
  {
    id: 'ranch',
    name: 'Ranch',
    type: TYPE.BLUE,
    icon: ICON.COW,
    rolls: [2],
    cost: 1,
    baseIncome: 1,
    effect: EFFECT.BANK,
    description: 'Get 1 coin from the bank.',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [2, 3],
    cost: 1,
    baseIncome: 1,
    effect: EFFECT.BANK,
    description: 'Get 1 coin from the bank. (Your turn only)',
    startingCard: true,
  },
  {
    id: 'cafe',
    name: 'Café',
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [3],
    cost: 2,
    baseIncome: 1,
    effect: EFFECT.STEAL_ACTIVE,
    description: 'Get 1 coin from the player who rolled the dice.',
  },
  {
    id: 'convenience_store',
    name: 'Convenience Store',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [4],
    cost: 2,
    baseIncome: 3,
    effect: EFFECT.BANK,
    description: 'Get 3 coins from the bank. (Your turn only)',
  },
  {
    id: 'forest',
    name: 'Forest',
    type: TYPE.BLUE,
    icon: ICON.GEAR,
    rolls: [5],
    cost: 3,
    baseIncome: 1,
    effect: EFFECT.BANK,
    description: 'Get 1 coin from the bank.',
  },
  {
    id: 'stadium',
    name: 'Stadium',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [6],
    cost: 6,
    baseIncome: 2,
    effect: EFFECT.STEAL_ALL,
    description: 'Get 2 coins from all other players. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'tv_station',
    name: 'TV Station',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [6],
    cost: 7,
    baseIncome: 5,
    effect: EFFECT.STEAL_CHOOSE,
    description: 'Take 5 coins from any one player. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'business_center',
    name: 'Business Center',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [6],
    cost: 8,
    baseIncome: 0,
    effect: EFFECT.SWAP,
    description: 'Trade one non-purple building for another player\'s. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'cheese_factory',
    name: 'Cheese Factory',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [7],
    cost: 5,
    baseIncome: 3,
    effect: EFFECT.PER_COW,
    description: 'Get 3 coins for every Ranch you own. (Your turn only)',
  },
  {
    id: 'furniture_factory',
    name: 'Furniture Factory',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [8],
    cost: 3,
    baseIncome: 3,
    effect: EFFECT.PER_GEAR,
    description: 'Get 3 coins for every Forest/Mine you own. (Your turn only)',
  },
  {
    id: 'mine',
    name: 'Mine',
    type: TYPE.BLUE,
    icon: ICON.GEAR,
    rolls: [9],
    cost: 6,
    baseIncome: 5,
    effect: EFFECT.BANK,
    description: 'Get 5 coins from the bank.',
  },
  {
    id: 'family_restaurant',
    name: 'Family Restaurant',
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [9, 10],
    cost: 3,
    baseIncome: 2,
    effect: EFFECT.STEAL_ACTIVE,
    description: 'Get 2 coins from the player who rolled the dice.',
  },
  {
    id: 'apple_orchard',
    name: 'Apple Orchard',
    type: TYPE.BLUE,
    icon: ICON.WHEAT,
    rolls: [10],
    cost: 3,
    baseIncome: 3,
    effect: EFFECT.BANK,
    description: 'Get 3 coins from the bank.',
  },
  {
    id: 'produce_market',
    name: 'Produce Market',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [11, 12],
    cost: 2,
    baseIncome: 2,
    effect: EFFECT.PER_WHEAT,
    description: 'Get 2 coins for every Wheat Field/Apple Orchard you own. (Your turn only)',
  },

  // ── Expansion: Harbors + Millionaire's Row ───────────────────────────────
  {
    id: 'sushi_bar',
    name: 'Sushi Bar',
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [1],
    cost: 2,
    baseIncome: 3,
    effect: EFFECT.STEAL_ACTIVE_IF_HARBOR,
    description: 'If you own a Harbor, get 3 coins from the player who rolled.',
  },
  {
    id: 'general_store',
    name: 'General Store',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [2],
    cost: 0,
    baseIncome: 2,
    effect: EFFECT.BANK_IF_FEW_LANDMARKS,
    description: 'Get 2 coins from the bank if you have fewer than 2 built landmarks. (Your turn only)',
  },
  {
    id: 'corn_field',
    name: 'Corn Field',
    type: TYPE.BLUE,
    icon: ICON.WHEAT,
    rolls: [3, 4],
    cost: 2,
    baseIncome: 1,
    effect: EFFECT.BANK_IF_FEW_LANDMARKS,
    description: 'Get 1 coin from the bank if you have fewer than 2 built landmarks.',
  },
  {
    id: 'flower_orchard',
    name: 'Flower Orchard',
    type: TYPE.BLUE,
    icon: ICON.FLOWER,
    rolls: [4],
    cost: 2,
    baseIncome: 1,
    effect: EFFECT.BANK,
    description: 'Get 1 coin from the bank.',
  },
  {
    id: 'french_restaurant',
    name: 'French Restaurant',
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [5],
    cost: 3,
    baseIncome: 5,
    effect: EFFECT.STEAL_ACTIVE_IF_LANDMARKS,
    description: 'Get 5 coins from the roller if they have 2 or more built landmarks.',
  },
  {
    id: 'loan_office',
    name: 'Loan Office',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [5, 6],
    cost: 0,
    baseIncome: 0,
    buildBonus: 5,
    effect: EFFECT.LOAN,
    description: 'Get 5 coins when built. Pay 2 coins to the bank when rolled. (Your turn only)',
  },
  {
    id: 'flower_shop',
    name: 'Flower Shop',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [6],
    cost: 1,
    baseIncome: 1,
    effect: EFFECT.PER_FLOWER,
    description: 'Get 1 coin for each Flower Orchard you own. (Your turn only)',
  },
  {
    id: 'vineyard',
    name: 'Vineyard',
    type: TYPE.BLUE,
    icon: ICON.GRAPE,
    rolls: [7],
    cost: 3,
    baseIncome: 3,
    effect: EFFECT.BANK,
    description: 'Get 3 coins from the bank.',
  },
  {
    id: 'pizza_joint',
    name: 'Pizza Joint',
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [7],
    cost: 1,
    baseIncome: 1,
    effect: EFFECT.STEAL_ACTIVE,
    description: 'Get 1 coin from the player who rolled the dice.',
  },
  {
    id: 'publisher',
    name: 'Publisher',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [7],
    cost: 5,
    baseIncome: 1,
    effect: EFFECT.PUBLISHER,
    description: 'Get 1 coin from all players for each Cup ☕ and Bread 🍞 icon they own. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'mackerel_boat',
    name: 'Mackerel Boat',
    type: TYPE.BLUE,
    icon: ICON.FISH,
    rolls: [8],
    cost: 2,
    baseIncome: 3,
    effect: EFFECT.BANK_IF_HARBOR,
    description: 'If you own a Harbor, get 3 coins from the bank.',
  },
  {
    id: 'tax_office',
    name: 'Tax Office',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [8, 9],
    cost: 4,
    baseIncome: 0,
    effect: EFFECT.TAX_OFFICE,
    description: 'Take half the coins (rounded down) from each player with 10 or more coins. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'winery',
    name: 'Winery',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [9],
    cost: 3,
    baseIncome: 6,
    effect: EFFECT.WINERY,
    renovates: true,
    description: 'Get 6 coins per Vineyard you own, then this card flips face-down (permanently). (Your turn only)',
  },
  {
    id: 'tech_startup',
    name: 'Tech Startup',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [10],
    cost: 1,
    baseIncome: 0,
    effect: EFFECT.TECH_STARTUP,
    description: 'End of turn: invest 1 coin here. On roll: get your invested total from the bank and from each other player. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'soda_bottling_plant',
    name: 'Soda Bottling Plant',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [11],
    cost: 5,
    baseIncome: 1,
    effect: EFFECT.PER_CUP_ALL,
    description: 'Get 1 coin for every Cup ☕ icon in everyone\'s city. (Your turn only)',
  },
  {
    id: 'park',
    name: 'Park',
    type: TYPE.PURPLE,
    icon: ICON.TOWER,
    rolls: [11, 12, 13],
    cost: 3,
    baseIncome: 0,
    effect: EFFECT.PARK,
    description: 'Total all players\' coins and redistribute them equally. (Your turn only)',
    maxPerPlayer: 1,
  },
  {
    id: 'food_warehouse',
    name: 'Food Warehouse',
    type: TYPE.GREEN,
    icon: ICON.BREAD,
    rolls: [12, 13],
    cost: 2,
    baseIncome: 2,
    effect: EFFECT.PER_BREAD,
    description: 'Get 2 coins for each Bread 🍞 icon you own. (Your turn only)',
  },
  {
    id: 'members_club',
    name: "Member's Club",
    type: TYPE.RED,
    icon: ICON.CUP,
    rolls: [12, 13, 14],
    cost: 4,
    baseIncome: 0,
    effect: EFFECT.STEAL_ALL_IF_LANDMARKS,
    description: 'Take all coins from the roller if they have 3 or more built landmarks.',
  },
  {
    id: 'tuna_boat',
    name: 'Tuna Boat',
    type: TYPE.BLUE,
    icon: ICON.FISH,
    rolls: [12, 13, 14],
    cost: 5,
    baseIncome: 0,
    effect: EFFECT.TUNA_BOAT,
    description: 'If you own a Harbor, the active player rolls 2 dice — you get coins equal to that total.',
  },
];

// ── Landmarks ────────────────────────────────────────────────────────────────
export const LANDMARKS = [
  {
    id: 'train_station',
    name: 'Train Station',
    cost: 4,
    description: 'You may roll 1 or 2 dice.',
    emoji: '🚂',
  },
  {
    id: 'shopping_mall',
    name: 'Shopping Mall',
    cost: 10,
    description: 'Your Cup ☕ and Bread 🍞 establishments earn +1 coin.',
    emoji: '🛍️',
  },
  {
    id: 'amusement_park',
    name: 'Amusement Park',
    cost: 16,
    description: 'If you roll doubles, take another turn.',
    emoji: '🎡',
  },
  {
    id: 'radio_tower',
    name: 'Radio Tower',
    cost: 22,
    description: 'Once per turn, you may reroll the dice.',
    emoji: '📻',
  },
  // Expansion landmarks
  {
    id: 'city_hall',
    name: 'City Hall',
    cost: 0,
    description: 'Always Active: if you have 0 coins after income is resolved, gain 1 coin.',
    emoji: '🏛️',
  },
  {
    id: 'harbor',
    name: 'Harbor',
    cost: 2,
    description: 'If you roll 10 or higher, you may add +2 to the total.',
    emoji: '⚓',
  },
  {
    id: 'airport',
    name: 'Airport',
    cost: 30,
    description: 'If you build nothing on your turn, gain 10 coins.',
    emoji: '✈️',
  },
];

// ── Supply Counts ────────────────────────────────────────────────────────────
// How many copies of each establishment exist in the shared supply
export const SUPPLY_COUNT = {
  [TYPE.PURPLE]: 1, // only 1 of each purple in supply
  default: 6,       // 6 copies of all other cards
};

// ── Player Colors ────────────────────────────────────────────────────────────
export const PLAYER_COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'];
export const DEFAULT_NAMES  = ['Alice', 'Bob', 'Carol', 'Dave'];

// ── Helpers ──────────────────────────────────────────────────────────────────

// Build a shuffled deck of all cards, removing starting cards given to players.
// Returns an array of estId strings (one entry per copy in the pool).
export function buildShuffledDeck(playerCount) {
  const pool = [];
  for (const est of ESTABLISHMENTS) {
    const copies = est.type === TYPE.PURPLE ? SUPPLY_COUNT[TYPE.PURPLE] : SUPPLY_COUNT.default;
    for (let i = 0; i < copies; i++) pool.push(est.id);
  }

  // Remove starting cards given to each player
  const startingEsts = ESTABLISHMENTS.filter(e => e.startingCard);
  for (const est of startingEsts) {
    for (let p = 0; p < playerCount; p++) {
      const idx = pool.indexOf(est.id);
      if (idx !== -1) pool.splice(idx, 1);
    }
  }

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

// Return the establishment definition by id
export function getEst(id) {
  return ESTABLISHMENTS.find(e => e.id === id);
}

// Return the landmark definition by id
export function getLandmark(id) {
  return LANDMARKS.find(l => l.id === id);
}

// Return all establishment IDs that have a specific icon
export function estsByIcon(icon) {
  return ESTABLISHMENTS.filter(e => e.icon === icon).map(e => e.id);
}

// Count how many cards with a given icon a player owns (total across all copies)
export function countByIcon(playerEstablishments, icon) {
  const ids = estsByIcon(icon);
  return ids.reduce((sum, id) => sum + (playerEstablishments[id] || 0), 0);
}

// Check if an establishment activates on a given dice total
export function activatesOn(est, diceTotal) {
  return est.rolls.includes(diceTotal);
}
