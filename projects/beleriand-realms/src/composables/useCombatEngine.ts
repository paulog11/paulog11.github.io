import { useGameStore } from '../stores/game'
import {
  type CombatEvent,
  type CombatResult,
  type CombatTargetType,
  type EffectReward,
  CardCategory,
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
    case 'trash':
      store.gameState.pendingTrash = beneficiary
      break
    case 'dealDamage': {
      // Direct damage hits the first living enemy vanguard if any; otherwise the active stronghold.
      const opposingId =
        beneficiary === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
      const enemyVanguards = store.players[opposingId].vanguards
      if (enemyVanguards.length > 0) {
        store.damageVanguard(opposingId, enemyVanguards[0].instanceId, reward.amount)
      } else {
        const bases = store.strongholds[opposingId]
        const target = bases?.find(b => b.currentHealth > 0)
        if (target) {
          target.currentHealth = Math.max(0, target.currentHealth - reward.amount)
          store.checkWinCondition(opposingId)
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
  const found = store.findStrongholdById(targetId)
  if (!found) {
    return { success: false, reason: `Stronghold '${targetId}' not found` }
  }
  const [targetPlayerId, stronghold] = found

  if (targetPlayerId === attackerId) {
    return { success: false, reason: 'Cannot attack your own stronghold' }
  }

  if (stronghold.currentHealth === 0) {
    return { success: false, reason: `'${stronghold.name}' is already destroyed` }
  }

  const activeId = store.gameState.activeStrongholdId[targetPlayerId]
  if (activeId !== targetId) {
    return { success: false, reason: `'${stronghold.name}' is not the active stronghold` }
  }

  // Cannot attack stronghold while enemy has living vanguards.
  const enemyVanguards = store.players[targetPlayerId].vanguards
  if (enemyVanguards.some(v => v.currentHp > 0)) {
    return { success: false, reason: 'Must defeat all enemy vanguards before attacking the stronghold' }
  }

  store.markAttackAssigned(attackerId, cardId)
  store.players[attackerId].attack -= attackAmount
  stronghold.currentHealth = Math.max(0, stronghold.currentHealth - attackAmount)

  const events: CombatEvent[] = [
    { type: 'StrongholdDamaged', strongholdId: targetId, remainingHealth: stronghold.currentHealth },
  ]

  if (stronghold.currentHealth === 0) {
    events.push({ type: 'StrongholdDestroyed', strongholdId: targetId, faction: stronghold.faction })
  }

  store.checkWinCondition(targetPlayerId)

  return { success: true, events }
}

function attackVanguard(
  store: Store,
  attackerId: PlayerId,
  instanceId: string,
  cardId: string,
  attackAmount: number,
): CombatResult {
  const targetPlayerId = (
    [PlayerId.PlayerOne, PlayerId.PlayerTwo] as const
  ).find(pid =>
    store.players[pid].vanguards.some(v => v.instanceId === instanceId),
  )

  if (!targetPlayerId) {
    return { success: false, reason: `Vanguard instance '${instanceId}' not found` }
  }

  if (targetPlayerId === attackerId) {
    return { success: false, reason: 'Cannot attack your own vanguard' }
  }

  const vanguard = store.players[targetPlayerId].vanguards.find(v => v.instanceId === instanceId)
  if (!vanguard || vanguard.currentHp === 0) {
    return { success: false, reason: `Vanguard '${instanceId}' is already destroyed` }
  }

  const cardName = vanguard.card.name
  store.markAttackAssigned(attackerId, cardId)
  store.players[attackerId].attack -= attackAmount
  store.damageVanguard(targetPlayerId, instanceId, attackAmount)

  // Check if it's still alive after damage (damageVanguard removes it if HP = 0).
  const stillAlive = store.players[targetPlayerId].vanguards.some(v => v.instanceId === instanceId)

  const events: CombatEvent[] = [
    { type: 'VanguardDamaged', instanceId, remainingHp: stillAlive ? vanguard.currentHp : 0 },
  ]

  if (!stillAlive) {
    events.push({ type: 'VanguardDestroyed', instanceId, cardName })
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

  // Vanguard cards in the market cannot be attacked — they must be acquired with resources.
  if (card.category === CardCategory.Vanguard) {
    return {
      success: false,
      reason: `'${card.name}' is a Vanguard — acquire it with resources instead`,
    }
  }

  store.markAttackAssigned(attackerId, cardId)
  store.players[attackerId].attack -= attackAmount
  const totalDamage = store.applyMarketDamage(targetId, attackAmount)

  if (totalDamage < card.cost) {
    return { success: true, events: [{ type: 'MarketCardDefeated', card, rewardTriggered: false }] }
  }

  store.beleriandRow.splice(cardIndex, 1)
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
      return { success: false, reason: "This card's attack has already been assigned this turn" }
    }

    if (store.players[attackerId].attack < attackAmount) {
      return {
        success: false,
        reason: `Insufficient attack: player has ${store.players[attackerId].attack}, needs ${attackAmount}`,
      }
    }

    if (targetType === 'Stronghold') {
      return attackStronghold(store, attackerId, targetId, cardId, attackAmount)
    }
    if (targetType === 'Vanguard') {
      return attackVanguard(store, attackerId, targetId, cardId, attackAmount)
    }
    return attackMarketCard(store, attackerId, targetId, cardId, attackAmount)
  }

  return { executeAttack }
}
