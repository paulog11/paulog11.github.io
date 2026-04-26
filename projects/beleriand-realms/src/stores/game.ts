import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  type Card,
  type GameState,
  type PlayerState,
  type Stronghold,
  Faction,
  PlayerId,
  TurnPhase,
  FATE_TRACK_MIN,
  FATE_TRACK_MAX,
} from '../types/game'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makePlayerState(): PlayerState {
  return { deck: [], hand: [], discard: [], inPlay: [], resources: 0, attack: 0, attackAssigned: new Set() }
}

export const useGameStore = defineStore('game', () => {
  const players = ref<Record<PlayerId, PlayerState>>({
    [PlayerId.PlayerOne]: makePlayerState(),
    [PlayerId.PlayerTwo]: makePlayerState(),
  })

  const beleriandDeck = ref<Card[]>([])
  const beleriandRow = ref<Card[]>([])

  // Immutable faction assignment — asymmetrical game, each side has a fixed role
  const playerFactions: Record<PlayerId, Faction> = {
    [PlayerId.PlayerOne]: Faction.FreePeoples,
    [PlayerId.PlayerTwo]: Faction.Morgoth,
  }

  // Each player has an array of 3 bases. All must be destroyed to lose.
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
  })

  function drawCards(playerId: PlayerId, count: number): void {
    const player = players.value[playerId]
    let remaining = count

    while (remaining > 0) {
      if (player.deck.length === 0) {
        if (player.discard.length === 0) break
        // Shuffle discard pile back into deck
        player.deck = shuffle(player.discard)
        player.discard = []
      }
      player.hand.push(player.deck.pop()!)
      remaining--
    }
  }

  function gainResources(playerId: PlayerId, amount: number): void {
    players.value[playerId].resources += amount
  }

  function gainAttack(playerId: PlayerId, amount: number): void {
    players.value[playerId].attack += amount
  }

  // Mark a specific in-play card's attack as spent toward a target.
  function markAttackAssigned(playerId: PlayerId, cardId: string): void {
    players.value[playerId].attackAssigned.add(cardId)
  }

  // Accumulate damage on a market card for this turn. Returns new total.
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

  function declareWinner(faction: Faction): void {
    gameState.value.winner = faction
  }

  // Find a stronghold by id and return [playerId, stronghold] or null.
  function findStrongholdById(id: string): [PlayerId, Stronghold] | null {
    for (const pid of [PlayerId.PlayerOne, PlayerId.PlayerTwo] as const) {
      const bases = strongholds.value[pid]
      if (!bases) continue
      const base = bases.find(b => b.id === id)
      if (base) return [pid, base]
    }
    return null
  }

  // Call after any HP change. Declares winner if all bases are destroyed;
  // otherwise clears the active stronghold and sets pendingBaseChoice so the
  // owning player must select a replacement before play continues.
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

    // Active base was just destroyed — clear it and prompt for a new choice.
    const activeId = gameState.value.activeStrongholdId[damagedPlayerId]
    const activeBase = bases.find(b => b.id === activeId)
    if (activeBase && activeBase.currentHealth === 0) {
      gameState.value.activeStrongholdId[damagedPlayerId] = null
      gameState.value.pendingBaseChoice = damagedPlayerId
    }
  }

  // Set the active stronghold for a player (called when they choose a replacement).
  function setActiveStronghold(playerId: PlayerId, strongholdId: string): void {
    gameState.value.activeStrongholdId[playerId] = strongholdId
    if (gameState.value.pendingBaseChoice === playerId) {
      gameState.value.pendingBaseChoice = null
    }
  }

  function purchaseCard(buyerId: PlayerId, cardId: string): boolean {
    const cardIndex = beleriandRow.value.findIndex(c => c.id === cardId)
    if (cardIndex === -1) return false

    const card = beleriandRow.value[cardIndex]

    // Can only purchase same-faction or neutral cards; opposing-faction cards must be attacked
    if (card.faction !== Faction.Neutral && card.faction !== playerFactions[buyerId]) return false

    const player = players.value[buyerId]
    if (player.resources < card.cost) return false

    player.resources -= card.cost
    beleriandRow.value.splice(cardIndex, 1)
    player.discard.push(card)          // goes to discard, shuffled in when deck runs out

    if (beleriandDeck.value.length > 0) {
      beleriandRow.value.push(beleriandDeck.value.pop()!)
    }

    return true
  }

  function endTurn(): void {
    const activeId = gameState.value.activePlayer
    const player = players.value[activeId]

    player.discard.push(...player.inPlay, ...player.hand)
    player.inPlay = []
    player.hand = []
    player.resources = 0
    player.attack = 0
    player.attackAssigned = new Set()

    // Market damage resets each turn — cards fully recover between turns.
    gameState.value.marketDamage = {}

    drawCards(activeId, 5)

    gameState.value.activePlayer =
      activeId === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
  }

  return {
    players,
    beleriandDeck,
    beleriandRow,
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
    declareWinner,
    findStrongholdById,
    checkWinCondition,
    setActiveStronghold,
    endTurn,
  }
})
