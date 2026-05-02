// ─────────────────────────────────────────────────────────────────────────────
// CARD ROSTER
//
// Card categories:
//   Troop   — common units; played from hand, discarded at end of turn
//   Hero    — unique named characters; one copy in the market deck
//   Vanguard — powerful named characters with HP; persist on field until killed,
//              contribute attack each turn, block the active stronghold
//
// Free Peoples (starter): Noldor Craftsman, Elven Archer, Dúnedain Scout
// Free Peoples (market):
//   Cost 1 — Elf-scout of Doriath
//   Cost 2 — Gondolin Warrior, Elf-Warrior of Doriath
//   Cost 3 — Ranger of the North, Mablung the Hunter, Galadriel of the Noldor (Hero)
//   Cost 4 — Mariner of the Falas, Tuor of Gondolin (Hero), Húrin of Dor-lómin (Hero)
//   Cost 5 — Glorfindel of Gondolin (Hero), Beren One-Hand (Hero),
//             Círdan the Shipwright (Hero), Eagles of Manwë (Hero)
//   Cost 6 — Finrod Felagund (Hero)
//   Cost 7 — Lúthien Tinúviel (Hero), Fingolfin (Vanguard, HP 6)
//   Cost 8 — Túrin Turambar (Vanguard, HP 7)
//
// Morgoth (starter): Orc Thrall, Orc Soldier, Morgoth's Spy
// Morgoth (market):
//   Cost 1 — Orc Raider, Orc Slavemaster
//   Cost 2 — Warg Rider, Orc Captain
//   Cost 3 — Cave-Troll, Dark Sorcerer, Werewolf of Angband (Vanguard, HP 4), Thrall of Morgoth
//   Cost 4 — Gothmog (Vanguard, HP 6), Thuringwethil (Hero), Draugluin (Vanguard, HP 5)
//   Cost 5 — Carcharoth (Vanguard, HP 6)
//   Cost 6 — Glaurung (Vanguard, HP 8), Sauron the Necromancer (Hero)
//   Cost 7 — Sauron's Lieutenant (Hero), Ancalagon the Black (Vanguard, HP 10)
//   Cost 8 — Balrog of Morgoth (Vanguard, HP 8)
//
// Neutral (market):
//   Cost 1 — Petty-dwarf Outcast
//   Cost 2 — Wandering Ranger, Ulfang the Black, Mîm the Petty-dwarf
//   Cost 3 — Master-smith of Nogrod, Eöl the Dark Elf
//   Cost 4 — Maeglin the Traitor (Hero), Dwarves of Nogrod
//   Cost 5 — Ossë of the Seas (Hero)
//   Cost 6 — Ungoliant (Vanguard, HP 6)
// ─────────────────────────────────────────────────────────────────────────────

import { type Card, CardCategory, Faction } from '../types/game'

// ─────────────────────────────────────────────────────────────────────────────
// EffectReward context notes:
//   When a card is defeated from the Beleriand Row, applyReward fires with
//   the attacker as the beneficiary. dealDamage hits the opposing side's first
//   living vanguard if any exist, otherwise the active stronghold.
//   adjustFate: positive = toward Light, negative = toward Shadow.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// STARTER CARDS — cost 0, personal decks only, never in the Beleriand market.
// ─────────────────────────────────────────────────────────────────────────────

export const FREE_PEOPLES_STARTER: readonly Card[] = [
  // 7× resource card
  {
    id: 'fp-s-craftsman', name: 'Noldor Craftsman',
    category: CardCategory.Troop, faction: Faction.FreePeoples,
    cost: 0, attack: 0, resources: 1, fateGeneration: 0,
  },
  // 2× attack card
  {
    id: 'fp-s-archer', name: 'Elven Archer',
    category: CardCategory.Troop, faction: Faction.FreePeoples,
    cost: 0, attack: 1, resources: 0, fateGeneration: 0,
  },
  // 1× fate card
  {
    id: 'fp-s-scout', name: 'Dúnedain Scout',
    category: CardCategory.Troop, faction: Faction.FreePeoples,
    cost: 0, attack: 0, resources: 0, fateGeneration: 1,
    effect: { description: 'Shift the Fate marker 1 step toward Light.', reward: { type: 'adjustFate', amount: 1 } },
  },
]

export const MORGOTH_STARTER: readonly Card[] = [
  // 7× resource card
  {
    id: 'mg-s-thrall', name: 'Orc Thrall',
    category: CardCategory.Troop, faction: Faction.Morgoth,
    cost: 0, attack: 0, resources: 1, fateGeneration: 0,
  },
  // 2× attack card
  {
    id: 'mg-s-soldier', name: 'Orc Soldier',
    category: CardCategory.Troop, faction: Faction.Morgoth,
    cost: 0, attack: 1, resources: 0, fateGeneration: 0,
  },
  // 1× fate card
  {
    id: 'mg-s-spy', name: "Morgoth's Spy",
    category: CardCategory.Troop, faction: Faction.Morgoth,
    cost: 0, attack: 0, resources: 0, fateGeneration: -1,
    effect: { description: 'Shift the Fate marker 1 step toward Shadow.', reward: { type: 'adjustFate', amount: -1 } },
  },
]

export const CARD_DATABASE: readonly Card[] = [

  // ══════════════════════════════════════════════════════════════════════════
  //  FREE PEOPLES
  // ══════════════════════════════════════════════════════════════════════════

  // ── Cost 1 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-elf-scout-doriath',
    name: 'Elf-scout of Doriath',
    category: CardCategory.Troop,
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

  // ── Cost 2 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-gondolin-warrior',
    name: 'Gondolin Warrior',
    category: CardCategory.Troop,
    faction: Faction.FreePeoples,
    cost: 2,
    attack: 3,
    resources: 0,
    fateGeneration: 1,
  },

  {
    id: 'fp-elf-warrior-doriath',
    name: 'Elf-Warrior of Doriath',
    category: CardCategory.Troop,
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

  // ── Cost 3 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-ranger-of-the-north',
    name: 'Ranger of the North',
    category: CardCategory.Troop,
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
    category: CardCategory.Troop,
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
    id: 'fp-galadriel',
    name: 'Galadriel of the Noldor',
    category: CardCategory.Hero,
    faction: Faction.FreePeoples,
    cost: 3,
    attack: 0,
    resources: 2,
    fateGeneration: 3,
    effect: {
      description: 'Shift the Fate marker 3 steps toward Light.',
      reward: { type: 'adjustFate', amount: 3 },
    },
  },

  // ── Cost 4 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-mariner-of-the-falas',
    name: 'Mariner of the Falas',
    category: CardCategory.Troop,
    faction: Faction.FreePeoples,
    cost: 4,
    attack: 2,
    resources: 3,
    fateGeneration: 1,
    effect: {
      description: 'Gain 2 Resources.',
      reward: { type: 'gainResources', amount: 2 },
    },
  },

  {
    id: 'fp-tuor',
    name: 'Tuor of Gondolin',
    category: CardCategory.Hero,
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
    id: 'fp-hurin',
    name: 'Húrin of Dor-lómin',
    category: CardCategory.Hero,
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

  // ── Cost 5 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-glorfindel',
    name: 'Glorfindel of Gondolin',
    category: CardCategory.Hero,
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
    category: CardCategory.Hero,
    faction: Faction.FreePeoples,
    cost: 5,
    attack: 5,
    resources: 0,
    fateGeneration: 2,
    effect: {
      description: 'Deal 2 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 2 },
    },
  },

  {
    id: 'fp-cirdan',
    name: 'Círdan the Shipwright',
    category: CardCategory.Hero,
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
    category: CardCategory.Hero,
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

  // ── Cost 6 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-finrod',
    name: 'Finrod Felagund',
    category: CardCategory.Hero,
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

  // ── Cost 7 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-luthien',
    name: 'Lúthien Tinúviel',
    category: CardCategory.Hero,
    faction: Faction.FreePeoples,
    cost: 7,
    attack: 2,
    resources: 1,
    fateGeneration: 3,
    effect: {
      description: 'Shift the Fate marker 3 steps toward Light.',
      reward: { type: 'adjustFate', amount: 3 },
    },
  },

  {
    id: 'fp-fingolfin',
    name: 'Fingolfin',
    category: CardCategory.Vanguard,
    faction: Faction.FreePeoples,
    cost: 7,
    attack: 6,
    resources: 1,
    fateGeneration: 3,
    hp: 6,
    // When Morgoth defeats Fingolfin from the row: dealDamage hits Gondolin.
    effect: {
      description: 'Deal 3 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 3 },
    },
  },

  // ── Cost 8 ────────────────────────────────────────────────────────────────

  {
    id: 'fp-turin',
    name: 'Túrin Turambar',
    category: CardCategory.Vanguard,
    faction: Faction.FreePeoples,
    cost: 8,
    attack: 7,
    resources: 0,
    fateGeneration: 2,
    hp: 7,
    // Wielder of Gurthang — his cursed legend strikes fear into Morgoth's hosts.
    effect: {
      description: 'Gain +4 Attack.',
      reward: { type: 'gainAttack', amount: 4 },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MORGOTH
  // ══════════════════════════════════════════════════════════════════════════

  // ── Cost 1 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-orc-raider',
    name: 'Orc Raider',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 1,
    attack: 1,
    resources: 1,
    fateGeneration: -1,
    effect: {
      description: 'Gain 1 Resource.',
      reward: { type: 'gainResources', amount: 1 },
    },
  },

  {
    id: 'mg-orc-slavemaster',
    name: 'Orc Slavemaster',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 1,
    attack: 0,
    resources: 2,
    fateGeneration: -1,
    effect: {
      description: 'Shift the Fate marker 1 step toward Shadow.',
      reward: { type: 'adjustFate', amount: -1 },
    },
  },

  // ── Cost 2 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-warg-rider',
    name: 'Warg Rider',
    category: CardCategory.Troop,
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

  {
    id: 'mg-orc-captain',
    name: 'Orc Captain',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 2,
    attack: 3,
    resources: 0,
    fateGeneration: -1,
    effect: {
      description: 'Gain +1 Attack.',
      reward: { type: 'gainAttack', amount: 1 },
    },
  },

  // ── Cost 3 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-cave-troll',
    name: 'Cave-Troll',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 4,
    resources: 0,
    fateGeneration: -1,
  },

  {
    id: 'mg-dark-sorcerer',
    name: 'Dark Sorcerer',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 1,
    resources: 2,
    fateGeneration: -1,
    // Trap card: Free Peoples who defeat this shift fate toward Shadow.
    effect: {
      description: 'Shift the Fate marker 2 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -2 },
    },
  },

  {
    id: 'mg-werewolf',
    name: 'Werewolf of Angband',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 3,
    resources: 0,
    fateGeneration: -2,
    hp: 4,
    effect: {
      description: 'Gain +2 Attack.',
      reward: { type: 'gainAttack', amount: 2 },
    },
  },

  {
    id: 'mg-thrall',
    name: 'Thrall of Morgoth',
    category: CardCategory.Troop,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 0,
    resources: 3,
    fateGeneration: -1,
    effect: {
      description: 'Shift the Fate marker 2 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -2 },
    },
  },

  // ── Cost 4 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-gothmog',
    name: 'Gothmog',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 4,
    resources: 0,
    fateGeneration: -2,
    hp: 6,
    // When FP defeats Gothmog from row: dealDamage hits Angband.
    effect: {
      description: 'Deal 2 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 2 },
    },
  },

  {
    id: 'mg-thuringwethil',
    name: 'Thuringwethil',
    category: CardCategory.Hero,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 2,
    resources: 2,
    fateGeneration: -2,
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
    },
  },

  {
    id: 'mg-draugluin',
    name: 'Draugluin',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 5,
    resources: 0,
    fateGeneration: -2,
    hp: 5,
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
    },
  },

  // ── Cost 5 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-carcharoth',
    name: 'Carcharoth',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 5,
    attack: 4,
    resources: 0,
    fateGeneration: -2,
    hp: 6,
    // The Red Maw — his defeat strikes a great blow against Angband.
    effect: {
      description: 'Deal 3 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 3 },
    },
  },

  // ── Cost 6 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-glaurung',
    name: 'Glaurung',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 6,
    attack: 5,
    resources: 0,
    fateGeneration: -2,
    hp: 8,
    // Father of Dragons — his defeat shakes Angband's foundations.
    effect: {
      description: 'Deal 3 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 3 },
    },
  },

  {
    id: 'mg-sauron',
    name: 'Sauron the Necromancer',
    category: CardCategory.Hero,
    faction: Faction.Morgoth,
    cost: 6,
    attack: 3,
    resources: 2,
    fateGeneration: -2,
    effect: {
      description: 'Shift the Fate marker 4 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -4 },
    },
  },

  // ── Cost 7 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-saurons-lieutenant',
    name: "Sauron's Lieutenant",
    category: CardCategory.Hero,
    faction: Faction.Morgoth,
    cost: 7,
    attack: 4,
    resources: 3,
    fateGeneration: -3,
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
    },
  },

  {
    id: 'mg-ancalagon',
    name: 'Ancalagon the Black',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 7,
    attack: 6,
    resources: 0,
    fateGeneration: -3,
    hp: 10,
    // Greatest of winged dragons — defeating him shatters Thangorodrim itself.
    effect: {
      description: 'Deal 4 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 4 },
    },
  },

  // ── Cost 8 ────────────────────────────────────────────────────────────────

  {
    id: 'mg-balrog',
    name: 'Balrog of Morgoth',
    category: CardCategory.Vanguard,
    faction: Faction.Morgoth,
    cost: 8,
    attack: 6,
    resources: 0,
    fateGeneration: -3,
    hp: 8,
    effect: {
      description: 'Gain +4 Attack.',
      reward: { type: 'gainAttack', amount: 4 },
    },
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NEUTRAL
  //  Cannot be attacked from the Beleriand Row — acquire only.
  //  Vanguard Neutral cards protect the owner's stronghold when deployed.
  // ══════════════════════════════════════════════════════════════════════════

  // ── Cost 1 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-petty-dwarf-outcast',
    name: 'Petty-dwarf Outcast',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 1,
    attack: 0,
    resources: 2,
    fateGeneration: 0,
  },

  // ── Cost 2 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-wandering-ranger',
    name: 'Wandering Ranger',
    category: CardCategory.Troop,
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
    id: 'nt-ulfang',
    name: 'Ulfang the Black',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 2,
    attack: 2,
    resources: 1,
    fateGeneration: 0,
    effect: {
      description: 'Deal 1 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 1 },
    },
  },

  {
    id: 'nt-mim',
    name: 'Mîm the Petty-dwarf',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 2,
    attack: 0,
    resources: 3,
    fateGeneration: 0,
    effect: {
      description: 'Shift the Fate marker 1 step toward Shadow.',
      reward: { type: 'adjustFate', amount: -1 },
    },
  },

  // ── Cost 3 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-master-smith-nogrod',
    name: 'Master-smith of Nogrod',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 3,
    attack: 2,
    resources: 2,
    fateGeneration: 0,
    effect: {
      description: 'Gain 2 Resources.',
      reward: { type: 'gainResources', amount: 2 },
    },
  },

  {
    id: 'nt-eol',
    name: 'Eöl the Dark Elf',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 3,
    attack: 2,
    resources: 1,
    fateGeneration: 0,
    effect: {
      description: 'Draw 1 card.',
      reward: { type: 'drawCards', count: 1 },
    },
  },

  // ── Cost 4 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-maeglin',
    name: 'Maeglin the Traitor',
    category: CardCategory.Hero,
    faction: Faction.Neutral,
    cost: 4,
    attack: 3,
    resources: 1,
    fateGeneration: 0,
    effect: {
      description: 'Deal 2 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 2 },
    },
  },

  {
    id: 'nt-dwarves-nogrod',
    name: 'Dwarves of Nogrod',
    category: CardCategory.Troop,
    faction: Faction.Neutral,
    cost: 4,
    attack: 4,
    resources: 2,
    fateGeneration: 0,
    effect: {
      description: 'Gain +2 Attack.',
      reward: { type: 'gainAttack', amount: 2 },
    },
  },

  // ── Cost 5 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-osse',
    name: 'Ossë of the Seas',
    category: CardCategory.Hero,
    faction: Faction.Neutral,
    cost: 5,
    attack: 4,
    resources: 2,
    fateGeneration: 0,
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
    },
  },

  // ── Cost 6 ────────────────────────────────────────────────────────────────

  {
    id: 'nt-ungoliant',
    name: 'Ungoliant',
    category: CardCategory.Vanguard,
    faction: Faction.Neutral,
    cost: 6,
    attack: 4,
    resources: 2,
    fateGeneration: 0,
    hp: 6,
    // She serves no one — whoever acquires her watches darkness spread.
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
    },
  },
]
