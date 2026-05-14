import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '../stores/game'
import { useCombatEngine } from '../composables/useCombatEngine'
import { CardCategory, Faction, PlayerId } from '../types/game'
import { makeCard, makeVanguardCard, seedStrongholds, armPlayer } from './helpers'

function setup() {
  const store = useGameStore()
  seedStrongholds(store)
  const { executeAttack } = useCombatEngine()
  return { store, executeAttack }
}

// ─── Validation guards ──────────────────────────────────────────────────────

describe('executeAttack — input validation', () => {
  it('rejects zero attack amount', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 0)
    expect(result.success).toBe(false)
  })

  it('rejects negative attack amount', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', -1)
    expect(result.success).toBe(false)
  })

  it('rejects when player has insufficient attack', () => {
    const { store, executeAttack } = setup()
    store.players[PlayerId.PlayerOne].attack = 2
    const cardId = armPlayer(store, PlayerId.PlayerOne, 0)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 5)
    expect(result.success).toBe(false)
    expect((result as { success: false; reason: string }).reason).toMatch(/insufficient/i)
  })

  it('rejects double-spending the same card', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 20)
    executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 5)
    const second = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 5)
    expect(second.success).toBe(false)
    expect((second as { success: false; reason: string }).reason).toMatch(/already been assigned/i)
  })
})

// ─── Stronghold attacks ────────────────────────────────────────────────────

describe('executeAttack — stronghold', () => {
  it('deals damage to the enemy stronghold', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(result.success).toBe(true)
    expect(store.strongholds[PlayerId.PlayerTwo]![0].currentHealth).toBe(30)
  })

  it('deducts attack from the attacker pool', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(store.players[PlayerId.PlayerOne].attack).toBe(0)
  })

  it('cannot attack your own stronghold', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'gondolin', 10)
    expect(result.success).toBe(false)
  })

  it('cannot attack a non-active stronghold', () => {
    const { store, executeAttack } = setup()
    // Add a second Morgoth stronghold but don't set it as active
    store.strongholds[PlayerId.PlayerTwo]!.push({
      id: 'utumno', name: 'Utumno', faction: Faction.Morgoth,
      maxHealth: 35, currentHealth: 35, innateAbility: '',
    })
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'utumno', 10)
    expect(result.success).toBe(false)
  })

  it('cannot attack stronghold while enemy vanguards are alive', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.Morgoth })
    store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(result.success).toBe(false)
    expect((result as { success: false; reason: string }).reason).toMatch(/vanguard/i)
  })

  it('declares winner when stronghold HP reaches 0', () => {
    const { store, executeAttack } = setup()
    // Weaken Angband first
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 5
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(store.gameState.winner).toBe(Faction.FreePeoples)
  })

  it('emits StrongholdDamaged event', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 5)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.events.some(e => e.type === 'StrongholdDamaged')).toBe(true)
    }
  })

  it('emits StrongholdDestroyed event when health reaches 0', () => {
    const { store, executeAttack } = setup()
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 3
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 5)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.events.some(e => e.type === 'StrongholdDestroyed')).toBe(true)
    }
  })

  it('does not reduce stronghold HP below 0', () => {
    const { store, executeAttack } = setup()
    store.strongholds[PlayerId.PlayerTwo]![0].currentHealth = 3
    const cardId = armPlayer(store, PlayerId.PlayerOne, 10)
    executeAttack(PlayerId.PlayerOne, cardId, 'Stronghold', 'angband', 10)
    expect(store.strongholds[PlayerId.PlayerTwo]![0].currentHealth).toBe(0)
  })
})

// ─── Vanguard attacks ──────────────────────────────────────────────────────

describe('executeAttack — vanguard', () => {
  it('deals damage to a vanguard', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.Morgoth })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 3)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', instance.instanceId, 3)
    expect(result.success).toBe(true)
    expect(store.players[PlayerId.PlayerTwo].vanguards[0].currentHp).toBe(3)
  })

  it('removes vanguard when HP reaches 0', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 4, faction: Faction.Morgoth })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 4)
    executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', instance.instanceId, 4)
    expect(store.players[PlayerId.PlayerTwo].vanguards).toHaveLength(0)
  })

  it('sends destroyed vanguard card to discard', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 2, faction: Faction.Morgoth, id: 'slain-vanguard' })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', instance.instanceId, 5)
    expect(store.players[PlayerId.PlayerTwo].discard.some(c => c.id === 'slain-vanguard')).toBe(true)
  })

  it('cannot attack your own vanguard', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 6, faction: Faction.FreePeoples })
    const instance = store.deployVanguard(PlayerId.PlayerOne, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', instance.instanceId, 5)
    expect(result.success).toBe(false)
  })

  it('returns error for unknown vanguard instanceId', () => {
    const { store, executeAttack } = setup()
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', 'nonexistent-id', 5)
    expect(result.success).toBe(false)
  })

  it('emits VanguardDestroyed event on kill', () => {
    const { store, executeAttack } = setup()
    const vanguard = makeVanguardCard({ hp: 3, faction: Faction.Morgoth })
    const instance = store.deployVanguard(PlayerId.PlayerTwo, vanguard)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'Vanguard', instance.instanceId, 5)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.events.some(e => e.type === 'VanguardDestroyed')).toBe(true)
    }
  })
})

// ─── Market card attacks ───────────────────────────────────────────────────

describe('executeAttack — market card', () => {
  it('accumulates damage without removing card until cost threshold is reached', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'market-partial', faction: Faction.Morgoth, cost: 5 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 3)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'market-partial', 3)
    expect(store.beleriandRow.some(c => c.id === 'market-partial')).toBe(true)
    expect(store.gameState.marketDamage['market-partial']).toBe(3)
  })

  it('removes card from row when cumulative damage meets cost', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'market-2', faction: Faction.Morgoth, cost: 3 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'market-2', 5)
    expect(store.beleriandRow).not.toContain(card)
  })

  it('cannot attack a Neutral card', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'neutral-mkt', faction: Faction.Neutral, cost: 2 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'neutral-mkt', 5)
    expect(result.success).toBe(false)
    expect((result as { success: false; reason: string }).reason).toMatch(/opposing faction/i)
  })

  it('cannot attack a same-faction card', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'own-faction', faction: Faction.FreePeoples, cost: 2 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'own-faction', 5)
    expect(result.success).toBe(false)
  })

  it('cannot attack a Vanguard card in the market', () => {
    const { store, executeAttack } = setup()
    const vanguardInMarket = makeCard({
      id: 'mkt-vanguard',
      faction: Faction.Morgoth,
      category: CardCategory.Vanguard,
      cost: 4,
    })
    store.beleriandRow.push(vanguardInMarket)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    const result = executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'mkt-vanguard', 5)
    expect(result.success).toBe(false)
    expect((result as { success: false; reason: string }).reason).toMatch(/vanguard/i)
  })

  it('applies reward when card is defeated', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({
      id: 'reward-card',
      faction: Faction.Morgoth,
      cost: 2,
      effect: { description: 'gain 3 resources', reward: { type: 'gainResources', amount: 3 } },
    })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'reward-card', 5)
    expect(store.players[PlayerId.PlayerOne].resources).toBe(3)
  })

  it('draws a replacement from beleriandDeck after defeat', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'replaceable', faction: Faction.Morgoth, cost: 2 })
    const replacement = makeCard({ id: 'market-replacement', faction: Faction.FreePeoples })
    store.beleriandRow.push(card)
    store.beleriandDeck.push(replacement)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'replaceable', 5)
    expect(store.beleriandRow.some(c => c.id === 'market-replacement')).toBe(true)
  })

  it('clears market damage entry after defeat', () => {
    const { store, executeAttack } = setup()
    const card = makeCard({ id: 'clear-damage', faction: Faction.Morgoth, cost: 2 })
    store.beleriandRow.push(card)
    const cardId = armPlayer(store, PlayerId.PlayerOne, 5)
    executeAttack(PlayerId.PlayerOne, cardId, 'MarketCard', 'clear-damage', 5)
    expect(store.gameState.marketDamage['clear-damage']).toBeUndefined()
  })
})
