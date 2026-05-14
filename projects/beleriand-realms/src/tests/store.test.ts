import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '../stores/game'
import { Faction, PlayerId, TurnPhase } from '../types/game'
import { makeCard, makeVanguardCard, seedStrongholds } from './helpers'

describe('store — drawCards', () => {
  it('moves cards from deck to hand', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].deck = [makeCard(), makeCard(), makeCard()]
    store.drawCards(PlayerId.PlayerOne, 2)
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(2)
    expect(store.players[PlayerId.PlayerOne].deck).toHaveLength(1)
  })

  it('reshuffles discard into deck when deck is empty', () => {
    const store = useGameStore()
    const discardCards = [makeCard(), makeCard()]
    store.players[PlayerId.PlayerOne].discard = discardCards
    store.drawCards(PlayerId.PlayerOne, 2)
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(2)
    expect(store.players[PlayerId.PlayerOne].discard).toHaveLength(0)
  })

  it('draws as many as available when deck + discard < requested count', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].deck = [makeCard()]
    store.drawCards(PlayerId.PlayerOne, 5)
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(1)
  })
})

describe('store — gainResources / gainAttack', () => {
  it('increments resources', () => {
    const store = useGameStore()
    store.gainResources(PlayerId.PlayerOne, 3)
    expect(store.players[PlayerId.PlayerOne].resources).toBe(3)
  })

  it('increments attack', () => {
    const store = useGameStore()
    store.gainAttack(PlayerId.PlayerTwo, 5)
    expect(store.players[PlayerId.PlayerTwo].attack).toBe(5)
  })
})

describe('store — adjustFate', () => {
  it('adjusts by a positive amount', () => {
    const store = useGameStore()
    store.adjustFate(3)
    expect(store.gameState.fateTrack).toBe(3)
  })

  it('clamps at +10', () => {
    const store = useGameStore()
    store.adjustFate(15)
    expect(store.gameState.fateTrack).toBe(10)
  })

  it('clamps at -10', () => {
    const store = useGameStore()
    store.adjustFate(-15)
    expect(store.gameState.fateTrack).toBe(-10)
  })

  it('accumulates across multiple calls', () => {
    const store = useGameStore()
    store.adjustFate(4)
    store.adjustFate(-2)
    expect(store.gameState.fateTrack).toBe(2)
  })
})

describe('store — endTurn', () => {
  it('discards hand and inPlay cards', () => {
    const store = useGameStore()
    const p = store.players[PlayerId.PlayerOne]
    const card1 = makeCard({ id: 'hand-card' })
    const card2 = makeCard({ id: 'play-card' })
    p.hand = [card1]
    p.inPlay = [card2]
    store.endTurn()
    // hand gets refilled with 5 drawn cards, but inPlay must be empty
    expect(p.inPlay).toHaveLength(0)
    expect(p.discard.some(c => c.id === 'hand-card')).toBe(false) // moved to discard then drawn back or just gone
    // The key invariant: cards that were in hand/inPlay end up in discard or hand (after draw)
    const allIds = [...p.hand, ...p.discard].map(c => c.id)
    expect(allIds).toContain('hand-card')
    expect(allIds).toContain('play-card')
  })

  it('resets resources and attack to 0', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].resources = 5
    store.players[PlayerId.PlayerOne].attack = 3
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].resources).toBe(0)
    expect(store.players[PlayerId.PlayerOne].attack).toBe(0)
  })

  it('clears attackAssigned', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].attackAssigned.add('card-x')
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].attackAssigned.size).toBe(0)
  })

  it('swaps active player', () => {
    const store = useGameStore()
    expect(store.gameState.activePlayer).toBe(PlayerId.PlayerOne)
    store.endTurn()
    expect(store.gameState.activePlayer).toBe(PlayerId.PlayerTwo)
    store.endTurn()
    expect(store.gameState.activePlayer).toBe(PlayerId.PlayerOne)
  })

  it('draws 5 cards for the active player', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].deck = Array.from({ length: 10 }, () => makeCard())
    store.endTurn()
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(5)
  })

  it('clears marketDamage on end turn', () => {
    const store = useGameStore()
    store.gameState.marketDamage['some-card'] = 3
    store.endTurn()
    expect(store.gameState.marketDamage).toEqual({})
  })

  it('grants vanguard attack to the next active player at turn start', () => {
    const store = useGameStore()
    const vanguardCard = makeVanguardCard({ attack: 3, faction: Faction.Morgoth })
    store.deployVanguard(PlayerId.PlayerTwo, vanguardCard)
    // End P1's turn → P2 becomes active and gets vanguard attack
    store.endTurn()
    expect(store.players[PlayerId.PlayerTwo].attack).toBe(3)
  })
})

describe('store — deployVanguard / damageVanguard', () => {
  it('creates a vanguard instance with full HP', () => {
    const store = useGameStore()
    const card = makeVanguardCard({ hp: 6 })
    const instance = store.deployVanguard(PlayerId.PlayerOne, card)
    expect(instance.currentHp).toBe(6)
    expect(store.players[PlayerId.PlayerOne].vanguards).toHaveLength(1)
  })

  it('reduces vanguard HP on damage', () => {
    const store = useGameStore()
    const card = makeVanguardCard({ hp: 6 })
    const instance = store.deployVanguard(PlayerId.PlayerOne, card)
    store.damageVanguard(PlayerId.PlayerOne, instance.instanceId, 3)
    expect(store.players[PlayerId.PlayerOne].vanguards[0].currentHp).toBe(3)
  })

  it('removes vanguard and sends to discard when HP reaches 0', () => {
    const store = useGameStore()
    const card = makeVanguardCard({ hp: 4, id: 'vanguard-discard-test' })
    const instance = store.deployVanguard(PlayerId.PlayerOne, card)
    store.damageVanguard(PlayerId.PlayerOne, instance.instanceId, 4)
    expect(store.players[PlayerId.PlayerOne].vanguards).toHaveLength(0)
    expect(store.players[PlayerId.PlayerOne].discard.some(c => c.id === 'vanguard-discard-test')).toBe(true)
  })

  it('does not reduce HP below 0', () => {
    const store = useGameStore()
    const card = makeVanguardCard({ hp: 3 })
    const instance = store.deployVanguard(PlayerId.PlayerOne, card)
    store.damageVanguard(PlayerId.PlayerOne, instance.instanceId, 99)
    expect(store.players[PlayerId.PlayerOne].vanguards).toHaveLength(0)
  })
})

describe('store — trashCard', () => {
  it('removes a card from hand', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'trash-me' })
    store.players[PlayerId.PlayerOne].hand = [card]
    const result = store.trashCard(PlayerId.PlayerOne, 'trash-me')
    expect(result).toBe(true)
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(0)
  })

  it('removes a card from discard', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'trash-from-discard' })
    store.players[PlayerId.PlayerOne].discard = [card]
    store.trashCard(PlayerId.PlayerOne, 'trash-from-discard')
    expect(store.players[PlayerId.PlayerOne].discard).toHaveLength(0)
  })

  it('returns false if card not found', () => {
    const store = useGameStore()
    const result = store.trashCard(PlayerId.PlayerOne, 'ghost-card')
    expect(result).toBe(false)
  })

  it('clears pendingTrash after trashing', () => {
    const store = useGameStore()
    store.gameState.pendingTrash = PlayerId.PlayerOne
    const card = makeCard({ id: 'trash-pending' })
    store.players[PlayerId.PlayerOne].hand = [card]
    store.trashCard(PlayerId.PlayerOne, 'trash-pending')
    expect(store.gameState.pendingTrash).toBeNull()
  })
})

describe('store — purchaseCard', () => {
  it('moves a card from beleriandRow to buyer discard and deducts resources', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'buy-me', faction: Faction.FreePeoples, cost: 3 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerOne].resources = 5
    const result = store.purchaseCard(PlayerId.PlayerOne, 'buy-me')
    expect(result).toBe(true)
    expect(store.players[PlayerId.PlayerOne].resources).toBe(2)
    expect(store.players[PlayerId.PlayerOne].discard.some(c => c.id === 'buy-me')).toBe(true)
    expect(store.beleriandRow.some(c => c.id === 'buy-me')).toBe(false)
  })

  it('rejects purchase when resources are insufficient', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'too-expensive', faction: Faction.FreePeoples, cost: 10 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerOne].resources = 3
    expect(store.purchaseCard(PlayerId.PlayerOne, 'too-expensive')).toBe(false)
  })

  it('rejects purchasing an opposing-faction card', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'enemy-card', faction: Faction.Morgoth, cost: 2 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerOne].resources = 10
    expect(store.purchaseCard(PlayerId.PlayerOne, 'enemy-card')).toBe(false)
  })

  it('allows purchasing a Neutral card', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'neutral-card', faction: Faction.Neutral, cost: 2 })
    store.beleriandRow.push(card)
    store.players[PlayerId.PlayerOne].resources = 5
    expect(store.purchaseCard(PlayerId.PlayerOne, 'neutral-card')).toBe(true)
  })

  it('draws a replacement from beleriandDeck after purchase', () => {
    const store = useGameStore()
    const card = makeCard({ id: 'buy-me', faction: Faction.FreePeoples, cost: 1 })
    const replacement = makeCard({ id: 'replacement-card', faction: Faction.Morgoth })
    store.beleriandRow.push(card)
    store.beleriandDeck.push(replacement)
    store.players[PlayerId.PlayerOne].resources = 5
    store.purchaseCard(PlayerId.PlayerOne, 'buy-me')
    expect(store.beleriandRow.some(c => c.id === 'replacement-card')).toBe(true)
  })
})

describe('store — checkWinCondition', () => {
  it('declares winner when all enemy strongholds are destroyed', () => {
    const store = useGameStore()
    seedStrongholds(store)
    // Destroy Angband (P2's stronghold) → P1 (FreePeoples) wins
    const angband = store.strongholds[PlayerId.PlayerTwo]![0]
    angband.currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.winner).toBe(Faction.FreePeoples)
  })

  it('does not overwrite an existing winner', () => {
    const store = useGameStore()
    seedStrongholds(store)
    store.gameState.winner = Faction.FreePeoples
    const gondolin = store.strongholds[PlayerId.PlayerOne]![0]
    gondolin.currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerOne)
    expect(store.gameState.winner).toBe(Faction.FreePeoples)
  })

  it('sets pendingBaseChoice when the active stronghold is destroyed', () => {
    const store = useGameStore()
    // Give P2 two strongholds so the game doesn't end
    store.strongholds[PlayerId.PlayerTwo] = [
      { id: 'angband', name: 'Angband', faction: Faction.Morgoth, maxHealth: 40, currentHealth: 40, innateAbility: '' },
      { id: 'utumno', name: 'Utumno', faction: Faction.Morgoth, maxHealth: 35, currentHealth: 35, innateAbility: '' },
    ]
    store.gameState.activeStrongholdId[PlayerId.PlayerTwo] = 'angband'
    // Destroy only the active one
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 0
    store.checkWinCondition(PlayerId.PlayerTwo)
    expect(store.gameState.winner).toBeNull()
    expect(store.gameState.pendingBaseChoice).toBe(PlayerId.PlayerTwo)
  })
})

describe('store — applyCardEffect', () => {
  beforeEach(() => {
    seedStrongholds(useGameStore())
  })

  it('gainResources adds to resource pool', () => {
    const store = useGameStore()
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'gainResources', amount: 4 })
    expect(store.players[PlayerId.PlayerOne].resources).toBe(4)
  })

  it('gainAttack adds to attack pool', () => {
    const store = useGameStore()
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'gainAttack', amount: 2 })
    expect(store.players[PlayerId.PlayerOne].attack).toBe(2)
  })

  it('drawCards draws from deck', () => {
    const store = useGameStore()
    store.players[PlayerId.PlayerOne].deck = [makeCard(), makeCard()]
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'drawCards', count: 2 })
    expect(store.players[PlayerId.PlayerOne].hand).toHaveLength(2)
  })

  it('adjustFate moves the fate track', () => {
    const store = useGameStore()
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'adjustFate', amount: 3 })
    expect(store.gameState.fateTrack).toBe(3)
  })

  it('trash sets pendingTrash', () => {
    const store = useGameStore()
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'trash' })
    expect(store.gameState.pendingTrash).toBe(PlayerId.PlayerOne)
  })

  it('dealDamage hits enemy vanguard first when one is present', () => {
    const store = useGameStore()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.Morgoth })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'dealDamage', amount: 3 })
    const stillAlive = store.players[PlayerId.PlayerTwo].vanguards.find(v => v.instanceId === instance.instanceId)
    expect(stillAlive?.currentHp).toBe(3)
  })

  it('dealDamage hits active stronghold when no enemy vanguards exist', () => {
    const store = useGameStore()
    store.applyCardEffect(PlayerId.PlayerOne, { type: 'dealDamage', amount: 5 })
    expect(store.strongholds[PlayerId.PlayerTwo]![0].currentHealth).toBe(35)
  })
})
