import { useGameStore } from '../stores/game'
import {
  type CombatEvent,
  type CombatResult,
  type CombatTargetType,
  type EffectReward,
  Faction,
  PlayerId,
} from '../types/game'

type Store = ReturnType<typeof useGameStore>

function applyReward(store: Store, beneficiary: PlayerId, reward: EffectReward): void {
  switch (reward.type) {
    case 'gainResources':
      store.gainResources(beneficiary, reward.amount)
      break
    case 'gainAttack':
      store.gainAttack(beneficiary, reward.amount)
      break
    case 'drawCards':
      store.drawCards(beneficiary, reward.count)
      break
    case 'adjustFate':
      store.adjustFate(reward.amount)
      break
    case 'dealDamage': {
      // Direct damage hits the opposing stronghold (not routed through executeAttack to avoid recursion)
      const opposingId =
        beneficiary === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
      const stronghold = store.strongholds[opposingId]
      if (stronghold) {
        stronghold.currentHealth = Math.max(0, stronghold.currentHealth - reward.amount)
        if (stronghold.currentHealth === 0) {
          store.declareWinner(store.playerFactions[beneficiary])
        }
      }
      break
    }
  }
}

function attackStronghold(
  store: Store,
  attackerId: PlayerId,
  targetId: string,
  cardId: string,
  attackAmount: number,
): CombatResult {
  const targetPlayerId = ([PlayerId.PlayerOne, PlayerId.PlayerTwo] as const).find(
    (pid) => store.strongholds[pid]?.id === targetId,
  )

  if (targetPlayerId === undefined) {
    return { success: false, reason: `Stronghold '${targetId}' not found` }
  }

  if (targetPlayerId === attackerId) {
    return { success: false, reason: 'Cannot attack your own stronghold' }
  }

  const stronghold = store.strongholds[targetPlayerId]!

  store.markAttackAssigned(attackerId, cardId)
  store.players[attackerId].attack -= attackAmount
  stronghold.currentHealth = Math.max(0, stronghold.currentHealth - attackAmount)

  const events: CombatEvent[] = [
    { type: 'StrongholdDamaged', strongholdId: targetId, remainingHealth: stronghold.currentHealth },
  ]

  if (stronghold.currentHealth === 0) {
    events.push({ type: 'StrongholdDestroyed', strongholdId: targetId, faction: stronghold.faction })
    store.declareWinner(store.playerFactions[attackerId])
  }

  return { success: true, events }
}

function attackMarketCard(
  store: Store,
  attackerId: PlayerId,
  targetId: string,
  cardId: string,
  attackAmount: number,
): CombatResult {
  const cardIndex = store.beleriandRow.findIndex((c) => c.id === targetId)
  if (cardIndex === -1) {
    return { success: false, reason: `Card '${targetId}' not found in Beleriand Row` }
  }

  const card = store.beleriandRow[cardIndex]
  const attackerFaction = store.playerFactions[attackerId]

  if (card.faction === Faction.Neutral || card.faction === attackerFaction) {
    return { success: false, reason: `'${card.name}' does not belong to the opposing faction` }
  }

  // Accumulate damage this turn; a card is only defeated when total damage >= cost.
  store.markAttackAssigned(attackerId, cardId)
  store.players[attackerId].attack -= attackAmount
  const totalDamage = store.applyMarketDamage(targetId, attackAmount)

  if (totalDamage < card.cost) {
    // Wounded but not defeated — card stays in row.
    return { success: true, events: [{ type: 'MarketCardDefeated', card, rewardTriggered: false }] }
  }

  // Defeated — remove from row, trigger reward, refill.
  store.beleriandRow.splice(cardIndex, 1)
  // Clear the damage entry since the card is gone.
  delete store.gameState.marketDamage[targetId]

  const rewardTriggered = card.effect?.reward !== undefined
  if (card.effect?.reward) {
    applyReward(store, attackerId, card.effect.reward)
  }

  if (store.beleriandDeck.length > 0) {
    store.beleriandRow.push(store.beleriandDeck.pop()!)
  }

  return { success: true, events: [{ type: 'MarketCardDefeated', card, rewardTriggered }] }
}

export function useCombatEngine() {
  const store = useGameStore()

  // attackerId: the player attacking
  // cardId: the specific in-play card whose attack is being assigned
  // targetType / targetId: what is being attacked
  function executeAttack(
    attackerId: PlayerId,
    cardId: string,
    targetType: CombatTargetType,
    targetId: string,
    attackAmount: number,
  ): CombatResult {
    if (attackAmount <= 0) {
      return { success: false, reason: 'Attack amount must be positive' }
    }

    if (store.players[attackerId].attackAssigned.has(cardId)) {
      return { success: false, reason: 'This card\'s attack has already been assigned this turn' }
    }

    if (store.players[attackerId].attack < attackAmount) {
      return {
        success: false,
        reason: `Insufficient attack: player has ${store.players[attackerId].attack}, needs ${attackAmount}`,
      }
    }

    return targetType === 'Stronghold'
      ? attackStronghold(store, attackerId, targetId, cardId, attackAmount)
      : attackMarketCard(store, attackerId, targetId, cardId, attackAmount)
  }

  return { executeAttack }
}
