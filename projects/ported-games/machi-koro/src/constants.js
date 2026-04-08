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
  WHEAT: 'wheat', // Wheat Field, Apple Orchard
  COW:   'cow',   // Ranch
  GEAR:  'gear',  // Forest, Mine
  BREAD: 'bread', // Bakery, Convenience Store, Cheese Factory, Furniture Factory, Produce Market
  CUP:   'cup',   // Café, Family Restaurant
  TOWER: 'tower', // Stadium, TV Station, Business Center
};

// ── Effect Types ─────────────────────────────────────────────────────────────
export const EFFECT = {
  BANK:         'bank',         // receive baseIncome from bank
  STEAL_ACTIVE: 'steal_active', // take baseIncome from the active (rolling) player
  STEAL_ALL:    'steal_all',    // take baseIncome from every other player (Stadium)
  STEAL_CHOOSE: 'steal_choose', // take baseIncome from one chosen player (TV Station) — triggers overlay
  SWAP:         'swap',         // swap one non-purple establishment with another player — triggers overlay
  PER_COW:      'per_cow',      // baseIncome × count of cow-icon (Ranch) cards owned
  PER_GEAR:     'per_gear',     // baseIncome × count of gear-icon (Forest + Mine) cards owned
  PER_WHEAT:    'per_wheat',    // baseIncome × count of wheat-icon (Wheat Field + Apple Orchard) cards owned
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

// Build the initial supply object: { estId: count }
export function buildSupply() {
  const supply = {};
  for (const est of ESTABLISHMENTS) {
    supply[est.id] = est.type === TYPE.PURPLE
      ? SUPPLY_COUNT[TYPE.PURPLE]
      : SUPPLY_COUNT.default;
  }
  return supply;
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
