<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGameStore } from '../stores/game'
import { useCombatEngine } from '../composables/useCombatEngine'
import StrongholdCard from './Stronghold.vue'
import PlayingCard from './PlayingCard.vue'
import FateTrack from './FateTrack.vue'
import MarketRow from './MarketRow.vue'
import HelpModal from './HelpModal.vue'
import TutorialDrawer from './TutorialDrawer.vue'
import { useTutorial } from '../composables/useTutorial'
import { Faction, PlayerId, type Card } from '../types/game'
import { CARD_DATABASE, FREE_PEOPLES_STARTER, MORGOTH_STARTER } from '../data/cardDatabase'

const store = useGameStore()
const { executeAttack } = useCombatEngine()

// Active player — drives all bottom-panel logic and attack assignment.
const activeId = computed(() => store.gameState.activePlayer)
const activePlayer = computed(() => store.players[activeId.value])

// Enemy is whichever player is NOT active.
const enemyId = computed(() =>
  activeId.value === PlayerId.PlayerOne ? PlayerId.PlayerTwo : PlayerId.PlayerOne
)
const enemyBases = computed(() => store.strongholds[enemyId.value] ?? [])
const ownBases = computed(() => store.strongholds[activeId.value] ?? [])


const showHelp = ref(false)
const { onCardPlayed, onTurnEnded } = useTutorial()

// ── Attack assignment state ───────────────────────────────────────────────
const selectedAttacker = ref<Card | null>(null)

function selectAttacker(c: Card): void {
  if (activePlayer.value.attackAssigned.has(c.id)) return
  if (c.attack === 0) return
  selectedAttacker.value = selectedAttacker.value?.id === c.id ? null : c
}

function cancelSelection(): void {
  selectedAttacker.value = null
}

function handleStrongholdTarget(strongholdId: string): void {
  const attacker = selectedAttacker.value
  if (!attacker) return
  executeAttack(activeId.value, attacker.id, 'Stronghold', strongholdId, attacker.attack)
  selectedAttacker.value = null
}

function handleMarketAttack(marketCard: Card): void {
  const attacker = selectedAttacker.value
  if (!attacker) return
  executeAttack(activeId.value, attacker.id, 'MarketCard', marketCard.id, attacker.attack)
  selectedAttacker.value = null
}

const hasUnassignedAttack = computed(() =>
  activePlayer.value.inPlay.some(c => c.attack > 0 && !activePlayer.value.attackAssigned.has(c.id))
)

// Base-choice modal — the surviving bases the pending player can pick from.
const pendingChoiceBases = computed(() => {
  const pid = store.gameState.pendingBaseChoice
  if (!pid) return []
  return (store.strongholds[pid] ?? []).filter(b => b.currentHealth > 0)
})

function choosePendingBase(strongholdId: string): void {
  const pid = store.gameState.pendingBaseChoice
  if (!pid) return
  store.setActiveStronghold(pid, strongholdId)
}

// ── Seed initial game state ──────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a 10-card starter deck: 7× resource, 2× attack, 1× fate.
// Each copy gets a unique id suffix so Vue keys and Set lookups stay distinct.
function makeStarterDeck(starters: typeof FREE_PEOPLES_STARTER, prefix: string): Card[] {
  const [resource, attack, fate] = starters
  const copies: Card[] = [
    ...Array.from({ length: 7 }, (_, i) => ({ ...resource, id: `${prefix}-r${i}` })),
    ...Array.from({ length: 2 }, (_, i) => ({ ...attack,   id: `${prefix}-a${i}` })),
    { ...fate, id: `${prefix}-f0` },
  ]
  return shuffle(copies)
}

onMounted(() => {
  store.strongholds[PlayerId.PlayerOne] = [
    {
      id: 'gondolin', name: 'Gondolin', faction: Faction.FreePeoples,
      maxHealth: 20, currentHealth: 20,
      innateAbility: 'Once per turn, when you play a Champion, draw 1 card.',
    },
    {
      id: 'menegroth', name: 'Menegroth', faction: Faction.FreePeoples,
      maxHealth: 18, currentHealth: 18,
      innateAbility: 'Whenever an ally is acquired from the Beleriand Row, gain 1 Resource.',
    },
    {
      id: 'nargothrond', name: 'Nargothrond', faction: Faction.FreePeoples,
      maxHealth: 15, currentHealth: 15,
      innateAbility: 'Once per turn, you may discard 1 card to draw 1 card.',
    },
    {
      id: 'barad-eithel', name: 'Barad Eithel', faction: Faction.FreePeoples,
      maxHealth: 12, currentHealth: 12,
      innateAbility: 'Whenever this stronghold takes damage, gain 1 Attack.',
    },
    {
      id: 'pass-of-aglon', name: 'Pass of Aglon', faction: Faction.FreePeoples,
      maxHealth: 10, currentHealth: 10,
      innateAbility: 'Whenever an enemy attacks this stronghold, deal 1 damage back to the opposing stronghold.',
    },
    {
      id: 'vinyamar', name: 'Vinyamar', faction: Faction.FreePeoples,
      maxHealth: 8, currentHealth: 8,
      innateAbility: 'At the start of your turn, draw 1 card and shift the Fate marker 1 step toward Light.',
    },
    {
      id: 'himring', name: 'Himring', faction: Faction.FreePeoples,
      maxHealth: 6, currentHealth: 6,
      innateAbility: 'This stronghold cannot be destroyed while the Fate marker is on the Light side.',
    },
  ]
  store.strongholds[PlayerId.PlayerTwo] = [
    {
      id: 'angband', name: 'Angband', faction: Faction.Morgoth,
      maxHealth: 30, currentHealth: 30,
      innateAbility: 'At the start of each Shadow turn, move the Fate marker 1 step toward Shadow.',
    },
    {
      id: 'utumno', name: 'Utumno', faction: Faction.Morgoth,
      maxHealth: 26, currentHealth: 26,
      innateAbility: 'Whenever a Morgoth card is defeated in the Beleriand Row, gain 2 Attack.',
    },
    {
      id: 'thangorodrim', name: 'Thangorodrim', faction: Faction.Morgoth,
      maxHealth: 22, currentHealth: 22,
      innateAbility: 'Orc and Troll cards cost 1 less Resource to acquire.',
    },
  ]
  store.setActiveStronghold(PlayerId.PlayerOne, 'gondolin')
  store.setActiveStronghold(PlayerId.PlayerTwo, 'angband')

  // Build shuffled 10-card starter decks and deal opening hand of 5.
  const fpDeck = makeStarterDeck(FREE_PEOPLES_STARTER, 'fp')
  store.players[PlayerId.PlayerOne].deck = fpDeck.slice(5)
  store.players[PlayerId.PlayerOne].hand = fpDeck.slice(0, 5)

  const mgDeck = makeStarterDeck(MORGOTH_STARTER, 'mg')
  store.players[PlayerId.PlayerTwo].deck = mgDeck.slice(5)
  store.players[PlayerId.PlayerTwo].hand = mgDeck.slice(0, 5)

  // Shuffle CARD_DATABASE into the Beleriand deck, deal 6 to the row.
  const marketDeck = shuffle([...CARD_DATABASE])
  store.beleriandRow.push(...marketDeck.slice(0, 6))
  store.beleriandDeck.push(...marketDeck.slice(6))
})

// ── Game over ────────────────────────────────────────────────────────────
function resetGame(): void {
  window.location.reload()
}

// ── Play a card from hand ────────────────────────────────────────────────
function playCard(c: Card): void {
  const player = activePlayer.value
  const idx = player.hand.findIndex(h => h.id === c.id)
  if (idx === -1) return
  player.hand.splice(idx, 1)
  player.inPlay.push(c)
  store.gainResources(activeId.value, c.resources)
  store.gainAttack(activeId.value, c.attack)
  onCardPlayed()
}

// ── Play all cards from hand ──────────────────────────────────────────────
function playAllCards(): void {
  const player = activePlayer.value
  if (player.hand.length === 0) return
  const cards = [...player.hand]
  player.hand.splice(0, player.hand.length)
  for (const c of cards) {
    player.inPlay.push(c)
    store.gainResources(activeId.value, c.resources)
    store.gainAttack(activeId.value, c.attack)
  }
  onCardPlayed()
}

// ── End turn ─────────────────────────────────────────────────────────────
function handleEndTurn(): void {
  selectedAttacker.value = null
  store.endTurn()
  onTurnEnded()
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden" @click.self="cancelSelection">

    <!-- ═══════════════════════════════════════════════════════════════════
         TOP — Enemy zone (whoever is NOT the active player)
    ════════════════════════════════════════════════════════════════════ -->
    <div
      class="flex-shrink-0 border-b px-6 py-3"
      :class="enemyId === PlayerId.PlayerTwo
        ? 'bg-morgoth-bg/60 border-morgoth-dark'
        : 'bg-free-peoples-bg/60 border-free-peoples-dark'"
    >
      <div class="flex items-center gap-5">

        <!-- Enemy bases — only the active one is targetable -->
        <div id="enemy-stronghold" class="flex gap-3">
          <StrongholdCard
            v-for="base in enemyBases"
            :key="base.id"
            :stronghold="base"
            :is-active="base.id === store.gameState.activeStrongholdId[enemyId]"
            :is-target="selectedAttacker !== null && base.id === store.gameState.activeStrongholdId[enemyId]"
            @target="handleStrongholdTarget"
          />
        </div>

        <!-- Enemy pool counters (read-only) -->
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-morgoth-light text-base">⚔</span>
            <span class="font-bold text-ink tabular-nums w-5 text-right">{{ store.players[enemyId].attack }}</span>
            <span class="text-muted text-xs">attack</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-neutral-light text-base">◈</span>
            <span class="font-bold text-ink tabular-nums w-5 text-right">{{ store.players[enemyId].resources }}</span>
            <span class="text-muted text-xs">resources</span>
          </div>
        </div>

        <div class="flex-1" />

        <!-- Help button -->
        <button
          class="w-8 h-8 rounded-full bg-card-bg border border-card-border text-muted
                 hover:text-ink hover:border-muted transition-colors text-sm font-bold
                 flex items-center justify-center flex-shrink-0"
          title="Help &amp; Reference"
          @click="showHelp = true"
        >
          ?
        </button>

        <!-- Enemy hand — face-down fanned cards -->
        <div class="flex items-end" style="padding-bottom: 6px;">
          <div
            v-for="(_, i) in store.players[enemyId].hand"
            :key="i"
            class="w-11 h-16 rounded-lg border border-card-border/70 bg-card-bg shadow-md flex items-center justify-center flex-shrink-0"
            :class="i > 0 ? '-ml-5' : ''"
            :style="{
              zIndex: i,
              transform: `rotate(${(i - (store.players[enemyId].hand.length - 1) / 2) * 5}deg) translateY(${Math.abs(i - (store.players[enemyId].hand.length - 1) / 2) * 2}px)`,
            }"
          >
            <span class="text-muted/30 text-sm select-none">🌑</span>
          </div>
          <span class="ml-3 text-muted text-xs self-center">{{ store.players[enemyId].hand.length }} cards</span>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         MIDDLE — Fate Track · Active Player's In-Play · Market Row
    ════════════════════════════════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col gap-4 overflow-y-auto px-6 py-4">

      <FateTrack
        id="fate-track"
        :fate-track="store.gameState.fateTrack"
        class="w-full max-w-2xl mx-auto"
      />

      <!-- Active player's in-play zone -->
      <div id="in-play-zone" v-if="activePlayer.inPlay.length > 0" class="flex flex-col gap-1.5">
        <div class="flex items-center gap-3">
          <span class="text-[10px] font-bold uppercase tracking-widest text-free-peoples/70">In Play</span>
          <span v-if="hasUnassignedAttack && !selectedAttacker" class="text-[10px] text-morgoth-light animate-pulse">
            ⚔ Click a card to assign its attack
          </span>
          <span v-if="selectedAttacker" class="text-[10px] text-morgoth-light font-bold">
            ⚔ {{ selectedAttacker.attack }} — now click a target above
            <button class="ml-2 text-muted underline" @click="cancelSelection">cancel</button>
          </span>
        </div>
        <div class="flex gap-2 overflow-x-auto pb-1">
          <TransitionGroup name="arrive-to-play" tag="div" class="flex gap-2">
            <div
              v-for="c in activePlayer.inPlay"
              :key="c.id"
              class="flex flex-col items-center gap-1 flex-shrink-0"
            >
              <div
                class="overflow-hidden rounded-xl transition-all duration-150"
                :class="{
                  'opacity-40': activePlayer.attackAssigned.has(c.id),
                  'ring-2 ring-morgoth cursor-pointer hover:ring-morgoth-light': c.attack > 0 && !activePlayer.attackAssigned.has(c.id) && selectedAttacker?.id !== c.id,
                  'ring-2 ring-offset-2 ring-offset-parchment ring-morgoth-light scale-105': selectedAttacker?.id === c.id,
                }"
                style="width: 120px; height: 180px;"
                @click="c.attack > 0 && selectAttacker(c)"
              >
                <div style="transform: scale(0.75); transform-origin: top left; width: 160px; height: 240px;">
                  <PlayingCard :card="c" @click="() => {}" />
                </div>
              </div>
              <div
                v-if="c.attack > 0"
                class="text-[10px] font-bold px-2 py-0.5 rounded-full border select-none"
                :class="activePlayer.attackAssigned.has(c.id)
                  ? 'bg-card-border/30 text-muted/50 border-card-border/30'
                  : 'bg-morgoth/10 text-morgoth-light border-morgoth/40'"
              >
                {{ activePlayer.attackAssigned.has(c.id) ? '⚔ spent' : `⚔ ${c.attack}` }}
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <MarketRow
        id="beleriand-row"
        :selecting-attacker="selectedAttacker"
        @attack="handleMarketAttack"
      />

    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         BOTTOM — Active player zone
    ════════════════════════════════════════════════════════════════════ -->
    <div
      class="flex-shrink-0 border-t px-6 py-3"
      :class="activeId === PlayerId.PlayerOne
        ? 'bg-free-peoples-bg/60 border-free-peoples-dark'
        : 'bg-morgoth-bg/60 border-morgoth-dark'"
    >
      <div class="flex items-start gap-5">

        <div class="flex flex-col gap-3 flex-shrink-0">
          <div id="player-stronghold" class="flex gap-3">
            <StrongholdCard
              v-for="base in ownBases"
              :key="base.id"
              :stronghold="base"
              :is-active="base.id === store.gameState.activeStrongholdId[activeId]"
            />
          </div>

          <div id="player-pool" class="flex gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-morgoth-light text-base">⚔</span>
              <span class="font-bold text-ink tabular-nums w-5 text-right">{{ activePlayer.attack }}</span>
              <span class="text-muted text-xs">attack</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-free-peoples text-base">◈</span>
              <span class="font-bold text-ink tabular-nums w-5 text-right">{{ activePlayer.resources }}</span>
              <span class="text-muted text-xs">resources</span>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              id="end-turn-btn"
              class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
              :class="activeId === PlayerId.PlayerOne
                ? 'bg-free-peoples text-parchment hover:bg-free-peoples-dark'
                : 'bg-morgoth text-parchment hover:bg-morgoth-dark'"
              @click="handleEndTurn"
            >
              End Turn
            </button>
            <button
              class="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors"
              :class="activePlayer.hand.length > 0
                ? 'bg-card-border text-ink hover:bg-muted/30'
                : 'bg-card-border/40 text-muted/40 cursor-not-allowed'"
              :disabled="activePlayer.hand.length === 0"
              @click="playAllCards"
            >
              Play All
            </button>
          </div>
        </div>

        <!-- Active player's hand -->
        <div id="player-hand" class="flex flex-col gap-1.5 flex-1 min-w-0">
          <span class="text-[10px] font-bold uppercase tracking-widest text-muted">
            Hand ({{ activePlayer.hand.length }}) — click to play
          </span>
          <div class="overflow-x-auto pb-1">
            <TransitionGroup name="play-from-hand" tag="div" class="hand-group">
              <PlayingCard
                v-for="c in activePlayer.hand"
                :key="c.id"
                :card="c"
                @click="playCard(c)"
              />
            </TransitionGroup>
          </div>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         BASE CHOICE MODAL — shown when a stronghold is destroyed
    ════════════════════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <div
        v-if="store.gameState.pendingBaseChoice !== null"
        class="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      >
        <div
          class="rounded-2xl border-2 p-8 shadow-2xl w-auto max-w-2xl text-center"
          :class="store.gameState.pendingBaseChoice === PlayerId.PlayerOne
            ? 'bg-free-peoples-bg border-free-peoples'
            : 'bg-morgoth-bg border-morgoth'"
        >
          <h2
            class="font-display text-xl font-bold mb-1"
            :class="store.gameState.pendingBaseChoice === PlayerId.PlayerOne
              ? 'text-free-peoples'
              : 'text-morgoth-light'"
          >
            Stronghold Destroyed
          </h2>
          <p class="text-muted text-sm mb-6">Choose your next active stronghold.</p>
          <div class="flex gap-4 justify-center">
            <StrongholdCard
              v-for="base in pendingChoiceBases"
              :key="base.id"
              :stronghold="base"
              :is-target="true"
              @target="choosePendingBase"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════════════════════════════════════
         GAME OVER MODAL
    ════════════════════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <div
        v-if="store.gameState.winner !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      >
        <div
          class="rounded-2xl border-2 p-10 text-center shadow-2xl w-80"
          :class="store.gameState.winner === Faction.FreePeoples
            ? 'bg-free-peoples-bg border-free-peoples'
            : 'bg-morgoth-bg border-morgoth'"
        >
          <div class="text-5xl mb-4 select-none">
            {{ store.gameState.winner === Faction.FreePeoples ? '⚔' : '🌑' }}
          </div>

          <h2
            class="font-display text-2xl font-bold mb-2"
            :class="store.gameState.winner === Faction.FreePeoples
              ? 'text-free-peoples'
              : 'text-morgoth-light'"
          >
            {{ store.gameState.winner === Faction.FreePeoples
              ? 'The Light Prevails'
              : 'Shadow Consumes All' }}
          </h2>

          <p class="text-muted text-sm mb-8">
            {{ store.gameState.winner === Faction.FreePeoples
              ? 'The Free Peoples of Beleriand stand victorious. Morgoth is driven back into the dark.'
              : "Morgoth's dominion spreads across Beleriand. All hope is extinguished." }}
          </p>

          <button
            class="w-full py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-colors"
            :class="store.gameState.winner === Faction.FreePeoples
              ? 'bg-free-peoples text-parchment hover:bg-free-peoples-dark'
              : 'bg-morgoth text-ink hover:bg-morgoth-dark'"
            @click="resetGame"
          >
            Play Again
          </button>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════════════════════════════════════════════════════════
         HELP MODAL
    ════════════════════════════════════════════════════════════════════ -->
    <Transition name="fade">
      <HelpModal v-if="showHelp" @close="showHelp = false" />
    </Transition>

    <!-- Tutorial drawer — always mounted so Transition works correctly -->
    <TutorialDrawer />

  </div>
</template>

<style scoped>
/* ─── Hand group ──────────────────────────────────────────────────────────── */
.hand-group {
  display: flex;
  gap: 0.75rem;   /* gap-3 */
  position: relative;
  align-items: flex-start;
  /* Wide enough to never wrap; parent overflow-x-auto provides the scroll */
  width: max-content;
}

/* ─── Card played from hand ───────────────────────────────────────────────── */
.play-from-hand-leave-active {
  position: absolute;
  pointer-events: none;
  transition: opacity 0.2s ease-in, transform 0.22s ease-in;
}
.play-from-hand-leave-to {
  opacity: 0;
  transform: translateY(-28px) scale(0.88);
}
.play-from-hand-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ─── Fade (help modal + game over overlay) ───────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ─── Card arriving into in-play zone ────────────────────────────────────── */
.arrive-to-play-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  transition-delay: 0.12s; /* starts after hand departure is underway */
}
.arrive-to-play-enter-from {
  opacity: 0;
  transform: translateY(-14px) scale(0.88);
}
.arrive-to-play-move {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
