/**
 * Game rules enforcement tests.
 * These capture the canonical rules that must hold as mechanics evolve.
 * Failing here means a rule was broken, not just a bug.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '../stores/game'
import { useCombatEngine } from '../composables/useCombatEngine'
import { CardCategory, Faction, PlayerId } from '../types/game'
import { MERCENARY_BUILDERS_SUPPLY } from '../data/cardDatabase'
import { makeCard, makeVanguardCard, seedStrongholds, armPlayer } from './helpers'

function setup() {
  const store = useGameStore()
  seedStrongholds(store)
  const { executeAttack } = useCombatEngine()
  return { store, executeAttack }
}

// ─── Fate Track ────────────────────────────────────────────────────────────────

describe('RULE: Fate track is clamped to [-10, +10]', () => {
  it('never exceeds +10 regardless of large positive adjustment', () => {
    const store = useGameStore()
    store.adjustFate(100)
    expect(store.gameState.fateTrack).toBe(10)
  })

  it('never drops below -10 regardless of large negative adjustment', () => {
    const store = useGameStore()
    store.adjustFate(-100)
    expect(store.gameState.fateTrack).toBe(-10)
  })

  it('starts at 0 (neutral)', () => {
    const store = useGameStore()
    expect(store.gameState.fateTrack).toBe(0)
  })

  it('dominance threshold: Light dominance exists at +7', () => {
    const store = useGameStore()
    store.adjustFate(7)
    expect(store.gameState.fateTrack).toBeGreaterThanOrEqual(7)
  })

  it('dominance threshold: Shadow dominance exists at -7', () => {
    const store = useGameStore()
    store.adjustFate(-7)
    expect(store.gameState.fateTrack).toBeLessThanOrEqual(-7)
  })

  it('accumulates correctly across multiple adjustments without clamping prematurely', () => {
    const store = useGameStore()
    store.adjustFate(5)
    store.adjustFate(3)
    expect(store.gameState.fateTrack).toBe(8)
  })
})

// ─── Vanguard blocks stronghold ────────────────────────────────────────────────

describe('RULE: Cannot attack stronghold while enemy has living vanguards', () => {
  it('rejects stronghold attack when one enemy vanguard is alive', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.Morgoth })
    store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(result.success).toBe(false)
    if (!result.success) expect(result.reason).toMatch(/vanguard/i)
  })

  it('allows stronghold attack after the vanguard is destroyed', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 2, faction: Faction.Morgoth, id: 'guard-vanguard' })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    // Give enough attack and two distinct card IDs
    store.players[PlayerId.PlayerOne].attack = 15
    const killCardId = 'kill-card'
    const attackCardId = 'stronghold-card'
    store.players[PlayerId.PlayerOne].inPlay.push(
      makeCard({ id: killCardId, faction: Faction.FreePeoples }),
      makeCard({ id: attackCardId, faction: Faction.FreePeoples }),
    )
    executeAttack(PlayerId.PlayerOne, killCardId, 'Vanguard', instance.instanceId, 5)
    expect(store.players[PlayerId.PlayerTwo].vanguards).toHaveLength(0)
    const result = executeAttack(PlayerId.PlayerOne, attackCardId, 'Stronghold', 'angband', 5)
    expect(result.success).toBe(true)
  })

  it('rejects stronghold attack even when a vanguard is at 1 HP (still alive)', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.Morgoth })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    // Damage but don't kill
    store.damageVanguard(PlayerId.PlayerTwo, instance.instanceId, 5)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(result.success).toBe(false)
  })
})

// ─── Market card defeat threshold ──────────────────────────────────────────────

describe('RULE: Market card is removed only when cumulative damage meets its cost', () => {
  it('card stays in row when partial damage < cost', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'partial-target', faction: Faction.Morgoth, cost: 6 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'partial-target', 5)
    expect(store.beleriandRow.some(c => c.id === 'partial-target')).toBe(true)
  })

  it('card is removed when cumulative damage across attacks meets cost', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'multi-hit', faction: Faction.Morgoth, cost: 6 })
    store.beleriandRow.push(card)
    // First hit
    store.gameState.marketDamage['multi-hit'] = 4 // simulate prior damage
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'multi-hit', 5)
    expect(store.beleriandRow.some(c => c.id === 'multi-hit')).toBe(false)
  })

  it('market damage resets at end of turn', () => {
    const store = useGameStore()
    store.gameState.marketDamage['some-card'] = 4
    store.endTurn()
    expect(store.gameState.marketDamage).toEqual({})
  })

  it('partial damage entry is cleared from marketDamage after defeat', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'cleanup-card', faction: Faction.Morgoth, cost: 3 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'cleanup-card', 5)
    expect(store.gameState.marketDamage['cleanup-card']).toBeUndefined()
  })
})

// ─── Turn structure & pool reset ───────────────────────────────────────────────

describe('RULE: All pools reset at end of turn', () => {
  it('resources reset to 0', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].resources = 7
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].resources).toBe(0)
  })

  it('attack pool resets to 0', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].attack = 4
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].attack).toBe(0)
  })

  it('attackAssigned set is cleared', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].attackAssigned.add('card-abc')
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].attackAssigned.size).toBe(0)
  })

  it('inPlay is empty after turn ends', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].inPlay = [makeCard(), makeCard()]
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].inPlay).toHaveLength(0)
  })

  it('active player draws 5 cards', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].deck = Array.from({ length: 10 }, (_, i) =>
      makeCard({ id: `deck-card-${i}` })
    )
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(5)
  })

  it('vanguard attack is granted to the incoming active player on turn start', () => {
    const store = useGameStore()
    seedStrongholds(store)
    const v1 = makeVanguardCard({ attack: 2, faction: Faction.Morgoth, id: 'v-turn-1' })
    const v2 = makeVanguardCard({ attack: 3, faction: Faction.Morgoth, id: 'v-turn-2' })
    store.deployVanguard(PlayerId.PlayerTwo, v1)
    store.deployVanguard(PlayerId.PlayerTwo, v2)
    store.endTurn() // P1 ends → P2 becomes active
    expect(store.players[PlayerId.PlayerTwo].attack).toBe(5) // 2 + 3
  })

  it('vanguards are NOT discarded at end of turn', () => {
    const store = useGameStore()
    const v = makeVanguardCard({ hp: 6, faction: Faction.FreePeoples, id: 'persistent-vanguard' })
    store.deployVanguard(PlayerId.PlayerOne, v)
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].vanguards.some(vi => vi.card.id === 'persistent-vanguard')).toBe(true)
  })
})

// ─── Win condition ─────────────────────────────────────────────────────────────

describe('RULE: All strongholds destroyed → game over', () => {
  it('no winner declared while any stronghold has HP', () => {
    const { store } = setup()
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 1
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.winner).toBeNull()
  })

  it('winner declared when the only stronghold reaches 0 HP', () => {
    const { store } = setup()
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.winner).toBe(Faction.FreePeoples)
  })

  it('winner is Morgoth when Free Peoples stronghold is destroyed', () => {
    const { store } = setup()
    store.strongholds[PlayerId.PlayerOne]![0].currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerOne)
    expect(store.gameState.winner).toBe(Faction.Morgoth)
  })

  it('does not declare winner while one of two strongholds remains', () => {
    const store = useGameStore()
    store.strongholds[PlayerId.PlayerTwo] = [
      { id: 'angband', name: 'Angband', faction: Faction.Morgoth, maxHealth: 40, currentHealth: 0, innateAbility: '' },
      { id: 'utumno', name: 'Utumno', faction: Faction.Morgoth, maxHealth: 35, currentHealth: 10, innateAbility: '' },
    ]
    store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.winner).toBeNull()
  })
})

describe('RULE: Active stronghold selection', () => {
  it('sets pendingBaseChoice when active stronghold is destroyed and others remain', () => {
    const store = useGameStore()
    store.strongholds[PlayerId.PlayerTwo] = [
      { id: 'angband', name: 'Angband', faction: Faction.Morgoth, maxHealth: 40, currentHealth: 0, innateAbility: '' },
      { id: 'utumno', name: 'Utumno', faction: Faction.Morgoth, maxHealth: 35, currentHealth: 35, innateAbility: '' },
    ]
    store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.pendingBaseChoice).toBe(PlayerId.PlayerTwo)
  })

  it('clears pendingBaseChoice when player picks a new active stronghold', () => {
    const store = useGameStore()
    store.strongholds[PlayerId.PlayerTwo] = [
      { id: 'angband', name: 'Angband', faction: Faction.Morgoth, maxHealth: 40, currentHealth: 0, innateAbility: '' },
      { id: 'utumno', name: 'Utumno', faction: Faction.Morgoth, maxHealth: 35, currentHealth: 35, innateAbility: '' },
    ]
    store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
    store.gameState.pendingBaseChoice = PlayerId.PlayerTwo
    store.setActiveStronghold(PlayerId.PlayerTwo, 'utumno')
    expect(store.gameState.pendingBaseChoice).toBeNull()
    expect(store.gameState.activeStrongholdId[PlayerId.PlayerTwo]).toBe('utumno')
  })
})

describe('RULE: Winner can only be set once', () => {
  it('does not overwrite an existing winner', () => {
    const { store } = setup()
    store.gameState.winner = Faction.FreePeoples
    // P1 stronghold destroyed
    store.strongholds[PlayerId.PlayerOne]![0].currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerOne)
    expect(store.gameState.winner).toBe(Faction.FreePeoples) // unchanged
  })

  it('declareWinner sets winner directly', () => {
    const store = useGameStore()
    store.declareWinner(Faction.Morgoth)
    expect(store.gameState.winner).toBe(Faction.Morgoth)
  })
})

describe('RULE: Only the active stronghold can be attacked', () => {
  it('rejects attack on a non-active stronghold by ID', () => {
    const store = useGameStore()
    store.strongholds[PlayerId.PlayerTwo] = [
      { id: 'angband', name: 'Angband', faction: Faction.Morgoth, maxHealth: 40, currentHealth: 40, innateAbility: '' },
      { id: 'utumno', name: 'Utumno', faction: Faction.Morgoth, maxHealth: 35, currentHealth: 35, innateAbility: '' },
    ]
    store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
    store.gameState.activeStrongholdId[PlayerId.PlayerOne] = 'gondolin'
    store.strongholds[PlayerId.PlayerOne] = [
      { id: 'gondolin', name: 'Gondolin', faction: Faction.FreePeoples, maxHealth: 20, currentHealth: 20, innateAbility: '' },
    ]
    const { executeAttack } = useCombatEngine()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'utumno', 10)
    expect(result.success).toBe(false)
  })
})

// ─── Acquisition rules ─────────────────────────────────────────────────────────

describe('RULE: Faction purchase restrictions', () => {
  it('Free Peoples player cannot buy Morgoth cards', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'morgoth-card', faction: Faction.Morgoth, cost: 2 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerOne].resources = 10
    expect(store.purchaseCard(PlayerId.PlayerOne, 'morgoth-card')).toBe(false)
  })

  it('Morgoth player cannot buy Free Peoples cards', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'fp-card', faction: Faction.FreePeoples, cost: 2 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerTwo].resources = 10
    expect(store.purchaseCard(PlayerId.PlayerTwo, 'fp-card')).toBe(false)
  })

  it('either player can buy Neutral cards', () => {
    const store = useGameStore()
    const cardP1 = makeCard({ id: 'neutral-p1', faction: Faction.Neutral, cost: 2 })
    const cardP2 = makeCard({ id: 'neutral-p2', faction: Faction.Neutral, cost: 2 })
    store.beleriandRow.push(cardP1, cardP2)
    store.players[PlayerId.PlayerOne].resources = 10
    store.players[PlayerId.PlayerTwo].resources = 10
    expect(store.purchaseCard(PlayerId.PlayerOne, 'neutral-p1')).toBe(true)
    expect(store.purchaseCard(PlayerId.PlayerTwo, 'neutral-p2')).toBe(true)
  })
})

describe('RULE: Vanguard cards in market cannot be attacked', () => {
  it('rejects attack on a Vanguard card in the row', () => {
    const { store, executeAttack } = setup()
    const vanguardInMarket = makeCard({
      id: 'market-vanguard-rule',
      faction: Faction.Morgoth,
      category: CardCategory.Vanguard,
      cost: 5,
    })
    store.beleriandRow.push(vanguardInMarket)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'market-vanguard-rule', 10)
    expect(result.success).toBe(false)
    if (!result.success) expect(result.reason).toMatch(/vanguard/i)
  })
})

describe('RULE: Neutral market cards cannot be attacked', () => {
  it('rejects attack on a Neutral card by Free Peoples', () => {
    const { store, executeAttack } = setup()
    const neutral = makeCard({ id: 'neutral-attack-test', faction: Faction.Neutral, cost: 3 })
    store.beleriandRow.push(neutral)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'neutral-attack-test', 5)
    expect(result.success).toBe(false)
  })

  it('rejects attack on a Neutral card by Morgoth', () => {
    const { store, executeAttack } = setup()
    const neutral = makeCard({ id: 'neutral-attack-mg', faction: Faction.Neutral, cost: 3 })
    store.beleriandRow.push(neutral)
    const cardId = armPlayer(store, PlayerId.PlayerTwo, 5)
    const result = executeAttack(PlayerId.PlayerTwo, cardId, 'MarketCard', 'neutral-attack-mg', 5)
    expect(result.success).toBe(false)
  })
})

describe('RULE: Mercenary Builder supply cap', () => {
  it('starts with the correct supply count', () => {
    const store = useGameStore()
    expect(store.mercenarySupply).toBe(MERCENARY_BUILDERS_SUPPLY)
    expect(store.mercenarySupply).toBe(10)
  })

  it('decrements supply on successful purchase', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].resources = 10
    store.purchaseMercenary(PlayerId.PlayerOne)
    expect(store.mercenarySupply).toBe(9)
  })

  it('rejects purchase when supply is 0', () => {
    const store = useGameStore()
    store.mercenarySupply = 0
    store.players[PlayerId.PlayerOne].resources = 10
    const result = store.purchaseMercenary(PlayerId.PlayerOne)
    expect(result).toBe(false)
    expect(store.mercenarySupply).toBe(0)
  })

  it('rejects purchase when player has insufficient resources', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].resources = 1 // cost is 2
    expect(store.purchaseMercenary(PlayerId.PlayerOne)).toBe(false)
    expect(store.mercenarySupply).toBe(10)
  })

  it('adds card to buyer discard on successful purchase', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].resources = 10
    store.purchaseMercenary(PlayerId.PlayerOne)
    expect(store.players[PlayerId.PlayerOne].discard.some(c => c.id === 'nt-mercenary-builders')).toBe(true)
  })
})
