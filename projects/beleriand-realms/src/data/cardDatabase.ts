// ─────────────────────────────────────────────────────────────────────────────
// CARD ROSTER
//
// Free Peoples (starter): Noldor Craftsman, Elven Archer, Dúnedain Scout
// Free Peoples (market):
//   Tier 1 — Lembas Bread, Dúnedain Scout
//   Tier 2 — Elven Archer, Gondolin Warrior, Noldor Craftsman,
//             Elf-Warrior of Doriath, Phial of Light, Ranger of the North,
//             Mablung the Hunter, Nauglamír
//   Tier 3 — White Ships of Círdan, Tuor of Gondolin, Glorfindel of Gondolin,
//             Beren One-Hand, Húrin of Dor-lómin, Círdan the Shipwright,
//             Eagles of Manwë
//   Tier 4 — Finrod Felagund, Lúthien Tinúviel, Fingolfin
//
// Morgoth (starter): Orc Thrall, Orc Soldier, Morgoth's Spy
// Morgoth (market):
//   Tier 1 — Orc Soldier, Orc Raider, Iron Fetter, Warg Rider, Orc Captain
//   Tier 2 — Cave-Troll, Dark Sorcerer, Werewolf of Angband, Thrall of Morgoth
//   Tier 3 — Gothmog, Thuringwethil, Draugluin, Ungoliant,
//             Iron Crown of Morgoth, Glaurung
//   Tier 4 — Sauron the Necromancer, Morgoth's Dark Will, Ancalagon the Black
//   Tier 5 — Balrog of Morgoth
//
// Neutral (market): Ancient Stone, Wandering Ranger
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// STARTER CARDS — cost 0, go into personal decks at game start, never shuffled
// into the Beleriand deck. Exported separately so GameView can build decks.
// ─────────────────────────────────────────────────────────────────────────────

export const FREE_PEOPLES_STARTER: readonly Card[] = [
  // 7× resource card
  {
    id: 'fp-s-craftsman', name: 'Noldor Craftsman',
    type: CardType.Character, faction: Faction.FreePeoples,
    cost: 0, attack: 0, resources: 1, fateGeneration: 0,
  },
  // 2× attack card
  {
    id: 'fp-s-archer', name: 'Elven Archer',
    type: CardType.Character, faction: Faction.FreePeoples,
    cost: 0, attack: 1, resources: 0, fateGeneration: 0,
  },
  // 1× fate card
  {
    id: 'fp-s-scout', name: 'Dúnedain Scout',
    type: CardType.Character, faction: Faction.FreePeoples,
    cost: 0, attack: 0, resources: 0, fateGeneration: 1,
    effect: { description: 'Shift the Fate marker 1 step toward Light.', reward: { type: 'adjustFate', amount: 1 } },
  },
]

export const MORGOTH_STARTER: readonly Card[] = [
  // 7× resource card
  {
    id: 'mg-s-thrall', name: 'Orc Thrall',
    type: CardType.Character, faction: Faction.Morgoth,
    cost: 0, attack: 0, resources: 1, fateGeneration: 0,
  },
  // 2× attack card
  {
    id: 'mg-s-soldier', name: 'Orc Soldier',
    type: CardType.Character, faction: Faction.Morgoth,
    cost: 0, attack: 1, resources: 0, fateGeneration: 0,
  },
  // 1× fate card
  {
    id: 'mg-s-spy', name: "Morgoth's Spy",
    type: CardType.Character, faction: Faction.Morgoth,
    cost: 0, attack: 0, resources: 0, fateGeneration: -1,
    effect: { description: 'Shift the Fate marker 1 step toward Shadow.', reward: { type: 'adjustFate', amount: -1 } },
  },
]

export const CARD_DATABASE: readonly Card[] = [

  // ══════════════════════════════════════════════════════════════════════════
  //  FREE PEOPLES  (20 market cards)
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
  //  MORGOTH  (20 cards)
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
    id: 'mg-orc-raider',
    name: 'Orc Raider',
    type: CardType.Character,
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
    id: 'mg-iron-fetter',
    name: 'Iron Fetter',
    type: CardType.Artifact,
    faction: Faction.Morgoth,
    cost: 1,
    attack: 0,
    resources: 2,
    fateGeneration: -1,
    // Angband's forges churn out chains — a resource engine with a shadow cost.
    effect: {
      description: 'Shift the Fate marker 1 step toward Shadow.',
      reward: { type: 'adjustFate', amount: -1 },
    },
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

  {
    id: 'mg-orc-captain',
    name: 'Orc Captain',
    type: CardType.Character,
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

  {
    id: 'mg-werewolf',
    name: 'Werewolf of Angband',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 3,
    attack: 3,
    resources: 0,
    fateGeneration: -2,
    effect: {
      description: 'Gain +2 Attack.',
      reward: { type: 'gainAttack', amount: 2 },
    },
  },

  {
    id: 'mg-thrall',
    name: 'Thrall of Morgoth',
    type: CardType.Character,
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
    id: 'mg-thuringwethil',
    name: 'Thuringwethil',
    type: CardType.Champion,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 2,
    resources: 2,
    fateGeneration: -2,
    // The vampire messenger of Sauron — her presence deepens the shadow.
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
    },
  },

  {
    id: 'mg-draugluin',
    name: 'Draugluin',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 4,
    attack: 5,
    resources: 0,
    fateGeneration: -2,
    // Sire of Werewolves — his defeat is a victory but comes at a brutal cost.
    effect: {
      description: 'Gain +3 Attack.',
      reward: { type: 'gainAttack', amount: 3 },
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
    id: 'mg-iron-crown',
    name: 'Iron Crown of Morgoth',
    type: CardType.Artifact,
    faction: Faction.Morgoth,
    cost: 5,
    attack: 0,
    resources: 3,
    fateGeneration: -2,
    // The Silmarils were set within — its presence warps fate toward Shadow.
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
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

  // ── Tier 4 (cost 7–8): legendary anchors ────────────────────────────────

  {
    id: 'mg-sauron',
    name: 'Sauron the Necromancer',
    type: CardType.Champion,
    faction: Faction.Morgoth,
    cost: 6,
    attack: 3,
    resources: 2,
    fateGeneration: -2,
    // Sauron in his tower at Tol-in-Gaurhoth — his mere presence poisons hope.
    effect: {
      description: 'Shift the Fate marker 4 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -4 },
    },
  },

  {
    id: 'mg-morgoth-will',
    name: "Morgoth's Dark Will",
    type: CardType.Artifact,
    faction: Faction.Morgoth,
    cost: 7,
    attack: 0,
    resources: 4,
    fateGeneration: -3,
    effect: {
      description: 'Shift the Fate marker 3 steps toward Shadow.',
      reward: { type: 'adjustFate', amount: -3 },
    },
  },

  {
    id: 'mg-ancalagon',
    name: 'Ancalagon the Black',
    type: CardType.GreatBeast,
    faction: Faction.Morgoth,
    cost: 7,
    attack: 6,
    resources: 0,
    fateGeneration: -3,
    // Greatest of winged dragons — his ruin on defeat crushes Gondolin's walls.
    effect: {
      description: 'Deal 4 damage to the opposing Stronghold.',
      reward: { type: 'dealDamage', amount: 4 },
    },
  },

  // ── Tier 5 (cost 8): ultimate threat ────────────────────────────────────

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
