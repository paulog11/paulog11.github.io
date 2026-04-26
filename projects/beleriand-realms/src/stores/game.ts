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

  const strongholds = ref<Partial<Record<PlayerId, Stronghold>>>({})

  const gameState = ref<GameState>({
    fateTrack: 0,
    turnPhase: TurnPhase.Start,
    activePlayer: PlayerId.PlayerOne,
    winner: null,
    marketDamage: {},
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
    endTurn,
  }
})
