import { ref } from 'vue'
import { defineStore } from 'pinia'
import { playSfx } from '../composables/useSfx'
import {
  type Card,
  type EffectReward,
  type GameState,
  type PlayerState,
  type Stronghold,
  type VanguardInstance,
  Faction,
  PlayerId,
  TurnPhase,
  FATE_TRACK_MIN,
  FATE_TRACK_MAX,
} from '../types/game'
import { MERCENARY_BUILDERS, MERCENARY_BUILDERS_SUPPLY } from '../data/cardDatabase'

let vanguardInstanceCounter = 0

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makePlayerState(): PlayerState {
  return {
    deck: [], hand: [], discard: [], inPlay: [], vanguards: [],
    resources: 0, attack: 0, attackAssigned: new Set(),
  }
}

export const useGameStore = defineStore('game', () => {
  const players = ref<Record<PlayerId, PlayerState>>({
    [PlayerId.PlayerOne]: makePlayerState(),
    [PlayerId.PlayerTwo]: makePlayerState(),
  })

  const beleriandDeck = ref<Card[]>([])
  const beleriandRow = ref<Card[]>([])
  const mercenarySupply = ref(MERCENARY_BUILDERS_SUPPLY)

  // Immutable faction assignment — asymmetrical game, each side has a fixed role
  const playerFactions: Record<PlayerId, Faction> = {
    [PlayerId.PlayerOne]: Faction.FreePeoples,
    [PlayerId.PlayerTwo]: Faction.Morgoth,
  }

  const strongholds = ref<Partial<Record<PlayerId, Stronghold[]>>>({})

  const gameState = ref<GameState>({
    fateTrack: 0,
    turnPhase: TurnPhase.Start,
    activePlayer: PlayerId.PlayerOne,
    winner: null,
    marketDamage: {},
    basesDestroyed: { [PlayerId.PlayerOne]: 0, [PlayerId.PlayerTwo]: 0 },
    activeStrongholdId: { [PlayerId.PlayerOne]: null, [PlayerId.PlayerTwo]: null },
    pendingBaseChoice: null,
    pendingTrash: null,
  })

  function drawCards(playerId: PlayerId, count: number): void {
    const player = players.value[playerId]
    let remaining = count
    let drew = false
    while (remaining > 0) {
      if (player.deck.length === 0) {
        if (player.discard.length === 0) break
        playSfx('shuffle')
        player.deck = shuffle(player.discard)
        player.discard = []
      }
      player.hand.push(player.deck.pop()!)
      drew = true
      remaining--
    }
    if (drew) playSfx('draw')
  }

  function gainResources(playerId: PlayerId, amount: number): void {
    players.value[playerId].resources += amount
  }

  function gainAttack(playerId: PlayerId, amount: number): void {
    players.value[playerId].attack += amount
  }

  function markAttackAssigned(playerId: PlayerId, cardId: string): void {
    players.value[playerId].attackAssigned.add(cardId)
  }

  function applyMarketDamage(cardId: string, amount: number): number {
    const current = gameState.value.marketDamage[cardId] ?? 0
    const next = current + amount
    gameState.value.marketDamage[cardId] = next
    return next
  }

  function adjustFate(amount: number): void {
    gameState.value.fateTrack = Math.max(
      FATE_TRACK_MIN,
      Math.min(FATE_TRACK_MAX, gameState.value.fateTrack + amount),
    )
  }

  function applyCardEffect(playerId: PlayerId, reward: EffectReward): void {
    switch (reward.type) {
      case 'gainResources':
        gainResources(playerId, reward.amount)
        break
      case 'gainAttack':
        gainAttack(playerId, reward.amount)
        break
      case 'drawCards':
        drawCards(playerId, reward.count)
        break
      case 'adjustFate':
        adjustFate(reward.amount)
        break
      case 'dealDamage': {
        const opposingId = playerId === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
        const enemyVanguards = players.value[opposingId].vanguards
        if (enemyVanguards.length > 0) {
          damageVanguard(opposingId, enemyVanguards[0].instanceId, reward.amount)
        } else {
          const bases = strongholds.value[opposingId]
          const target = bases?.find(b => b.currentHealth > 0)
          if (target) {
            target.currentHealth = Math.max(0, target.currentHealth - reward.amount)
            checkWinCondition(opposingId)
          }
        }
        break
      }
      case 'trash':
        gameState.value.pendingTrash = playerId
        break
    }
  }

  function declareWinner(faction: Faction): void {
    gameState.value.winner = faction
  }

  function findStrongholdById(id: string): [PlayerId, Stronghold] | null {
    for (const pid of [PlayerId.PlayerOne, PlayerId.PlayerTwo] as const) {
      const bases = strongholds.value[pid]
      if (!bases) continue
      const base = bases.find(b => b.id === id)
      if (base) return [pid, base]
    }
    return null
  }

  function checkWinCondition(damagedPlayerId: PlayerId): void {
    if (gameState.value.winner !== null) return
    const bases = strongholds.value[damagedPlayerId]
    if (!bases) return

    const destroyed = bases.filter(b => b.currentHealth === 0).length
    gameState.value.basesDestroyed[damagedPlayerId] = destroyed

    if (destroyed >= bases.length) {
      const winnerFaction = playerFactions[
        damagedPlayerId === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
      ]
      declareWinner(winnerFaction)
      return
    }

    const activeId = gameState.value.activeStrongholdId[damagedPlayerId]
    const activeBase = bases.find(b => b.id === activeId)
    if (activeBase && activeBase.currentHealth === 0) {
      gameState.value.activeStrongholdId[damagedPlayerId] = null
      gameState.value.pendingBaseChoice = damagedPlayerId
    }
  }

  function setActiveStronghold(playerId: PlayerId, strongholdId: string): void {
    gameState.value.activeStrongholdId[playerId] = strongholdId
    if (gameState.value.pendingBaseChoice === playerId) {
      gameState.value.pendingBaseChoice = null
    }
  }

  // Permanently remove a card from hand, inPlay, or discard. Returns true if found.
  function trashCard(playerId: PlayerId, cardId: string): boolean {
    const player = players.value[playerId]
    for (const zone of [player.hand, player.inPlay, player.discard] as Card[][]) {
      const idx = zone.findIndex(c => c.id === cardId)
      if (idx !== -1) {
        zone.splice(idx, 1)
        if (gameState.value.pendingTrash === playerId) {
          gameState.value.pendingTrash = null
        }
        return true
      }
    }
    return false
  }

  // Deploy a Vanguard card from hand to the field. Returns the new instance.
  function deployVanguard(playerId: PlayerId, card: Card): VanguardInstance {
    const instance: VanguardInstance = {
      card,
      instanceId: `vanguard-${++vanguardInstanceCounter}`,
      currentHp: card.hp ?? 1,
    }
    players.value[playerId].vanguards.push(instance)
    return instance
  }

  // Apply damage to a vanguard instance. Returns true if found. Removes it when HP reaches 0.
  function damageVanguard(playerId: PlayerId, instanceId: string, amount: number): boolean {
    const vanguards = players.value[playerId].vanguards
    const idx = vanguards.findIndex(v => v.instanceId === instanceId)
    if (idx === -1) return false
    const v = vanguards[idx]
    v.currentHp = Math.max(0, v.currentHp - amount)
    if (v.currentHp === 0) {
      vanguards.splice(idx, 1)
      players.value[playerId].discard.push(v.card)
    }
    return true
  }

  function purchaseMercenary(buyerId: PlayerId): boolean {
    if (mercenarySupply.value <= 0) return false
    const player = players.value[buyerId]
    if (player.resources < MERCENARY_BUILDERS.cost) return false
    player.resources -= MERCENARY_BUILDERS.cost
    mercenarySupply.value--
    player.discard.push({ ...MERCENARY_BUILDERS })
    return true
  }

  function purchaseCard(buyerId: PlayerId, cardId: string): boolean {
    const cardIndex = beleriandRow.value.findIndex(c => c.id === cardId)
    if (cardIndex === -1) return false

    const card = beleriandRow.value[cardIndex]

    if (card.faction !== Faction.Neutral && card.faction !== playerFactions[buyerId]) return false

    const player = players.value[buyerId]
    if (player.resources < card.cost) return false

    player.resources -= card.cost
    beleriandRow.value.splice(cardIndex, 1)
    player.discard.push(card)

    if (beleriandDeck.value.length > 0) {
      beleriandRow.value.push(beleriandDeck.value.pop()!)
    }

    playSfx('purchase')
    return true
  }

  function endTurn(): void {
    const activeId = gameState.value.activePlayer
    const player = players.value[activeId]

    // Discard troops/heroes; vanguards persist on the field.
    player.discard.push(...player.inPlay, ...player.hand)
    player.inPlay = []
    player.hand = []
    player.resources = 0
    player.attack = 0
    player.attackAssigned = new Set()

    gameState.value.marketDamage = {}

    drawCards(activeId, 5)

    const newActiveId =
      activeId === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
    gameState.value.activePlayer = newActiveId

    // Vanguards refresh their attack contribution at the start of the new player's turn.
    const newPlayer = players.value[newActiveId]
    const vanguardAttack = newPlayer.vanguards.reduce((sum, v) => sum + v.card.attack, 0)
    if (vanguardAttack > 0) {
      newPlayer.attack += vanguardAttack
    }
  }

  return {
    players,
    beleriandDeck,
    beleriandRow,
    mercenarySupply,
    gameState,
    playerFactions,
    strongholds,
    drawCards,
    gainResources,
    gainAttack,
    markAttackAssigned,
    applyMarketDamage,
    adjustFate,
    purchaseCard,
    purchaseMercenary,
    applyCardEffect,
    declareWinner,
    findStrongholdById,
    checkWinCondition,
    setActiveStronghold,
    deployVanguard,
    damageVanguard,
    trashCard,
    endTurn,
  }
})
