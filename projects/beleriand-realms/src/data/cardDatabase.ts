import { type Card, CardType, Faction } from '../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// EffectReward context notes:
//   When a card is defeated from the Beleriand Row, applyReward fires with
//   the attacker as the beneficiary.  dealDamage always hits the *opposing*
//   stronghold of that beneficiary, so:
//     • dealDamage on a Morgoth card   → Free Peoples defeats it → Angband hit
//     • dealDamage on a Free Peoples card → Morgoth defeats it → Gondolin hit
//   adjustFate is absolute: positive shifts toward Light (+10), negative
//   toward Shadow (-10), regardless of who triggered it.
// ─────────────────────────────────────────────────────────────────────────────

export const CARD_DATABASE: readonly Card[] = [

  // ══════════════════════════════════════════════════════════════════════════
  //  FREE PEOPLES  (20 cards)
  // ══════════════════════════════════════════════════════════════════════════

  // ── Tier 1 (cost 1–2): cheap engine pieces ─────────────────────────────

  {
    id: 'fp-lembas-bread',
    name: 'Lembas Bread',
    type: CardType.Artifact,
    faction: Faction.FreePeoples,
    cost: 1,
    attack: 0,
    resources: 3,
    fateGeneration: 1,
  },

  {
    id: 'fp-dunedain-scout',
    name: 'Dúnedain Scout',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 1,
    attack: 1,
    resources: 1,
    fateGeneration: 1,
    effect: {
      description: 'Draw 1 card.',
      reward: { type: 'drawCards', count: 1 },
    },
  },

  {
    id: 'fp-elven-archer',
    name: 'Elven Archer',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 2,
    attack: 2,
    resources: 1,
    fateGeneration: 1,
  },

  {
    id: 'fp-gondolin-warrior',
    name: 'Gondolin Warrior',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 2,
    attack: 3,
    resources: 0,
    fateGeneration: 1,
  },

  // ── Tier 2 (cost 2–3): solid mid-range ──────────────────────────────────

  {
    id: 'fp-noldor-craftsman',
    name: 'Noldor Craftsman',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 2,
    attack: 0,
    resources: 3,
    fateGeneration: 1,
  },

  {
    id: 'fp-elf-warrior-doriath',
    name: 'Elf-Warrior of Doriath',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 2,
    attack: 2,
    resources: 1,
    fateGeneration: 1,
    effect: {
      description: 'Draw 1 card.',
      reward: { type: 'drawCards', count: 1 },
    },
  },

  {
    id: 'fp-phial-of-light',
    name: 'Phial of Light',
    type: CardType.Artifact,
    faction: Faction.FreePeoples,
    cost: 3,
    attack: 0,
    resources: 2,
    fateGeneration: 2,
    effect: {
      description: 'Shift the Fate marker 2 steps toward Light.',
      reward: { type: 'adjustFate', amount: 2 },
    },
  },

  {
    id: 'fp-ranger-of-the-north',
    name: 'Ranger of the North',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 3,
    attack: 3,
    resources: 1,
    fateGeneration: 1,
    effect: {
      description: 'Gain +1 Attack.',
      reward: { type: 'gainAttack', amount: 1 },
    },
  },

  {
    id: 'fp-mablung',
    name: 'Mablung the Hunter',
    type: CardType.Character,
    faction: Faction.FreePeoples,
    cost: 3,
    attack: 3,
    resources: 1,
    fateGeneration: 1,
    effect: {
      description: 'Gain +1 Attack.',
      reward: { type: 'gainAttack', amount: 1 },
    },
  },

  {
    id: 'fp-nauglamir',
    name: 'Nauglamír',
    type: CardType.Artifact,
    faction: Faction.FreePeoples,
    cost: 3,
    attack: 0,
    resources: 2,
    fateGeneration: 2,
    effect: {
      description: 'Shift the Fate marker 2 steps toward Light.',
      reward: { type: 'adjustFate', amount: 2 },
    },
  },

  // ── Tier 3 (cost 4–5): high-impact plays ────────────────────────────────

  {
    id: 'fp-white-ships',
    name: 'White Ships of Círdan',
    type: CardType.Artifact,
    faction: Faction.FreePeoples,
    cost: 4,
    attack: 0,
    resources: 4,
    fateGeneration: 1,
    effect: {
      description: 'Gain 2 Resources.',
      reward: { type: 'gainResources', amount: 2 },
    },
  },

  {
    id: 'fp-tuor',
    name: 'Tuor of Gondolin',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 4,
    attack: 4,
    resources: 1,
    fateGeneration: 1,
    effect: {
      description: 'Gain +2 Attack.',
      reward: { type: 'gainAttack', amount: 2 },
    },
  },

  {
    id: 'fp-glorfindel',
    name: 'Glorfindel of Gondolin',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 5,
    attack: 5,
    resources: 0,
    fateGeneration: 2,
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
    },
  },

  {
    id: 'fp-beren',
    name: 'Beren One-Hand',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 5,
    attack: 5,
    resources: 0,
    fateGeneration: 2,
    // Defeating Beren strikes a blow — but his legend endures.
    effect: {
      description: 'Deal 2 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 2 },
    },
  },

  {
    id: 'fp-hurin',
    name: 'Húrin of Dor-lómin',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 4,
    attack: 5,
    resources: 0,
    fateGeneration: 1,
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
    },
  },

  {
    id: 'fp-cirdan',
    name: 'Círdan the Shipwright',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 5,
    attack: 2,
    resources: 3,
    fateGeneration: 1,
    effect: {
      description: 'Draw 2 cards.',
      reward: { type: 'drawCards', count: 2 },
    },
  },

  {
    id: 'fp-eagles-of-manwe',
    name: 'Eagles of Manwë',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 5,
    attack: 4,
    resources: 0,
    fateGeneration: 2,
    effect: {
      description: 'Shift the Fate marker 2 steps toward Light.',
      reward: { type: 'adjustFate', amount: 2 },
    },
  },

  // ── Tier 4 (cost 6–7): legendary anchors ────────────────────────────────

  {
    id: 'fp-finrod',
    name: 'Finrod Felagund',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 6,
    attack: 3,
    resources: 2,
    fateGeneration: 2,
    effect: {
      description: 'Draw 2 cards.',
      reward: { type: 'drawCards', count: 2 },
    },
  },

  {
    id: 'fp-luthien',
    name: 'Lúthien Tinúviel',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 7,
    attack: 2,
    resources: 1,
    fateGeneration: 3,
    // Her song breaks Morgoth's enchantments — a massive fate swing.
    effect: {
      description: 'Shift the Fate marker 3 steps toward Light.',
      reward: { type: 'adjustFate', amount: 3 },
    },
  },

  {
    id: 'fp-fingolfin',
    name: 'Fingolfin',
    type: CardType.Champion,
    faction: Faction.FreePeoples,
    cost: 7,
    attack: 6,
    resources: 1,
    fateGeneration: 3,
    // When Morgoth defeats Fingolfin from the row: beneficiary = PlayerTwo,
    // dealDamage hits PlayerOne (Gondolin) — his death wounds the Free Peoples.
    // When played from hand by Free Peoples: deals 3 to Angband.
    effect: {
      description: 'Deal 3 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 3 },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MORGOTH  (8 cards)
  // ══════════════════════════════════════════════════════════════════════════

  // ── Tier 1 (cost 1–2): early aggression ─────────────────────────────────

  {
    id: 'mg-orc-soldier',
    name: 'Orc Soldier',
    type: CardType.Character,
    faction: Faction.Morgoth,
    cost: 1,
    attack: 2,
    resources: 0,
    fateGeneration: -1,
  },

  {
    id: 'mg-warg-rider',
    name: 'Warg Rider',
    type: CardType.Character,
    faction: Faction.Morgoth,
    cost: 2,
    attack: 2,
    resources: 1,
    fateGeneration: -1,
    effect: {
      description: 'Gain 1 Resource.',
      reward: { type: 'gainResources', amount: 1 },
    },
  },

  // ── Tier 2 (cost 3): pressure and disruption ────────────────────────────

  {
    id: 'mg-cave-troll',
    name: 'Cave-Troll',
    type: CardType.Character,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 4,
    resources: 0,
    fateGeneration: -1,
  },

  {
    id: 'mg-dark-sorcerer',
    name: 'Dark Sorcerer',
    type: CardType.Character,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 1,
    resources: 2,
    fateGeneration: -1,
    // Trap card: only Free Peoples can attack this card, and the reward fires
    // against the attacker — defeating it shifts fate toward Shadow.
    effect: {
      description: 'Shift the Fate marker 2 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -2 },
    },
  },

  // ── Tier 3 (cost 4–6): elite threats ────────────────────────────────────

  {
    id: 'mg-gothmog',
    name: 'Gothmog',
    type: CardType.Champion,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 4,
    resources: 0,
    fateGeneration: -2,
    // When FP defeats Gothmog from row: beneficiary = PlayerOne,
    // dealDamage hits PlayerTwo (Angband) — a blow to Morgoth worth chasing.
    // When played from hand by Morgoth: deals 2 to Gondolin.
    effect: {
      description: 'Deal 2 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 2 },
    },
  },

  {
    id: 'mg-ungoliant',
    name: 'Ungoliant',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 5,
    attack: 3,
    resources: 1,
    fateGeneration: -2,
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
    },
  },

  {
    id: 'mg-glaurung',
    name: 'Glaurung',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 6,
    attack: 5,
    resources: 0,
    fateGeneration: -2,
    // The Father of Dragons falling shakes Angband's foundations.
    effect: {
      description: 'Deal 3 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 3 },
    },
  },

  // ── Tier 4 (cost 8): ultimate threat ────────────────────────────────────

  {
    id: 'mg-balrog',
    name: 'Balrog of Morgoth',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 8,
    attack: 6,
    resources: 0,
    fateGeneration: -3,
    // Defeating the Balrog at great cost partially replenishes the attacker.
    effect: {
      description: 'Gain +4 Attack.',
      reward: { type: 'gainAttack', amount: 4 },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NEUTRAL  (2 cards)
  //  Cannot be attacked (combat engine rejects Neutral targets).
  //  These are acquire-only; effects fire when played from hand.
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'nt-wandering-ranger',
    name: 'Wandering Ranger',
    type: CardType.Character,
    faction: Faction.Neutral,
    cost: 2,
    attack: 1,
    resources: 1,
    fateGeneration: 0,
    effect: {
      description: 'Draw 1 card.',
      reward: { type: 'drawCards', count: 1 },
    },
  },

  {
    id: 'nt-ancient-stone',
    name: 'Ancient Stone',
    type: CardType.Artifact,
    faction: Faction.Neutral,
    cost: 1,
    attack: 0,
    resources: 2,
    fateGeneration: 0,
  },
]
