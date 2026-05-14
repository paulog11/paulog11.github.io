import { useGameStore } from '../stores/game'
import { type Card, CardCategory, Faction, PlayerId } from '../types/game'

// ─── Card factories ────────────────────────────────────────────────────────────

let _cardCounter = 0

export function makeCard(overrides: Partial<Card> = {}): Card {
  const id = overrides.id ?? `test-card-${++_cardCounter}`
  return {
    id,
    name: overrides.name ?? id,
    category: overrides.category ?? CardCategory.Troop,
    faction: overrides.faction ?? Faction.FreePeoples,
    cost: overrides.cost ?? 2,
    attack: overrides.attack ?? 1,
    resources: overrides.resources ?? 1,
    fateGeneration: overrides.fateGeneration ?? 0,
    ...overrides,
  }
}

export function makeVanguardCard(overrides: Partial<Card> = {}): Card {
  return makeCard({ category: CardCategory.Vanguard, hp: 4, attack: 2, ...overrides })
}

// ─── Stronghold seeder ────────────────────────────────────────────────────────

export function seedStrongholds(store: ReturnType<typeof useGameStore>) {
  store.strongholds[PlayerId.PlayerOne] = [
    {
      id: 'gondolin', name: 'Gondolin', faction: Faction.FreePeoples,
      maxHealth: 20, currentHealth: 20, innateAbility: '',
    },
  ]
  store.strongholds[PlayerId.PlayerTwo] = [
    {
      id: 'angband', name: 'Angband', faction: Faction.Morgoth,
      maxHealth: 40, currentHealth: 40, innateAbility: '',
    },
  ]
  store.gameState.activeStrongholdId[PlayerId.PlayerOne] = 'gondolin'
  store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
}

// ─── Attack helper ─────────────────────────────────────────────────────────────

let _armCounter = 0

/** Give a player enough attack to execute a specific amount and return a fresh unique card ID. */
export function armPlayer(
  store: ReturnType<typeof useGameStore>,
  playerId: PlayerId,
  attackAmount: number,
): string {
  store.players[playerId].attack += attackAmount
  const cardId = `armed-card-${playerId}-${++_armCounter}`
  const card = makeCard({ id: cardId, faction: playerId === PlayerId.PlayerOne ? Faction.FreePeoples : Faction.Morgoth })
  store.players[playerId].inPlay.push(card)
  return cardId
}
