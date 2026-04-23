<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import StrongholdCard from './Stronghold.vue'
import PlayingCard from './PlayingCard.vue'
import FateTrack from './FateTrack.vue'
import MarketRow from './MarketRow.vue'
import { CardType, Faction, PlayerId, type Card } from '../types/game'

const store = useGameStore()

const p1 = computed(() => store.players[PlayerId.PlayerOne])
const p2 = computed(() => store.players[PlayerId.PlayerTwo])
const sh1 = computed(() => store.strongholds[PlayerId.PlayerOne])
const sh2 = computed(() => store.strongholds[PlayerId.PlayerTwo])

// ── Seed initial game state ──────────────────────────────────────────────
function card(
  id: string, name: string, faction: Faction,
  cost: number, atk: number, res: number, ability?: string,
): Card {
  return {
    id, name,
    type: cost >= 4 ? CardType.Champion : CardType.Character,
    faction, cost, attack: atk, resources: res,
    fateGeneration: faction === Faction.FreePeoples ? 1 : faction === Faction.Morgoth ? -1 : 0,
    effect: ability ? { description: ability } : undefined,
  }
}

onMounted(() => {
  store.strongholds[PlayerId.PlayerOne] = {
    id: 'gondolin', name: 'Gondolin', faction: Faction.FreePeoples,
    maxHealth: 30, currentHealth: 30,
    innateAbility: 'Once per turn, when you play a Champion, draw 1 card.',
  }
  store.strongholds[PlayerId.PlayerTwo] = {
    id: 'angband', name: 'Angband', faction: Faction.Morgoth,
    maxHealth: 30, currentHealth: 24,
    innateAbility: 'At the start of each Shadow turn, move the Fate marker 1 step toward Shadow.',
  }

  store.players[PlayerId.PlayerOne].hand.push(
    card('fp-h1', 'Elven Archer',    Faction.FreePeoples, 2, 2, 1),
    card('fp-h2', 'Dúnedain Scout',  Faction.FreePeoples, 1, 1, 1, 'Draw 1 card when played with another Ranger.'),
    card('fp-h3', 'Círdan',          Faction.FreePeoples, 4, 2, 3, 'Gain +1 Resource for each card currently in hand.'),
    card('fp-h4', 'Elf-Stone',       Faction.FreePeoples, 2, 0, 3, 'Artifact — gain 3 Resources.'),
    card('fp-h5', 'Ranger of Ithil', Faction.FreePeoples, 3, 3, 1),
  )
  store.players[PlayerId.PlayerTwo].hand.push(
    card('mg-h1', 'Orc Soldier',   Faction.Morgoth, 1, 2, 0),
    card('mg-h2', 'Cave-Troll',    Faction.Morgoth, 3, 4, 0, 'Cannot be blocked by characters with cost < 2.'),
    card('mg-h3', 'Warg Rider',    Faction.Morgoth, 2, 2, 1),
    card('mg-h4', 'Dark Sorcerer', Faction.Morgoth, 3, 1, 2, 'Move the Fate marker 1 step toward Shadow.'),
  )

  store.beleriandRow.push(
    card('mkt-1', 'Finrod Felagund',  Faction.FreePeoples, 5, 3, 2, 'Draw 1 card. Other Elf allies gain +1 Attack.'),
    card('mkt-2', 'Lúthien Tinúviel', Faction.FreePeoples, 6, 2, 3, 'Adjust Fate +2.'),
    card('mkt-3', 'Gothmog',          Faction.Morgoth, 4, 5, 0, 'Deal 2 damage to opposing Stronghold on play.'),
    card('mkt-4', 'Ungoliant',         Faction.Morgoth, 5, 3, 1, 'Gain +3 Attack this turn.'),
    card('mkt-5', 'Wandering Ranger',  Faction.Neutral, 2, 1, 1),
    card('mkt-6', 'Ancient Stone',     Faction.Neutral, 1, 0, 2, 'Artifact — gain 2 Resources.'),
  )
  store.beleriandDeck.push(
    card('dk-1', 'Círdan the Shipwright', Faction.FreePeoples, 4, 2, 3, 'Draw 2 cards.'),
    card('dk-2', 'Balrog of Morgoth',     Faction.Morgoth, 7, 6, 0, 'Destroy target card in row with cost ≤ 3.'),
    card('dk-3', 'Dwarven Prospector',    Faction.Neutral, 3, 1, 2, 'Gain 3 Resources.'),
  )
})

// ── Play a card from hand ────────────────────────────────────────────────
function playCard(c: Card): void {
  const hand = p1.value.hand
  const idx = hand.findIndex(h => h.id === c.id)
  if (idx === -1) return
  hand.splice(idx, 1)
  p1.value.inPlay.push(c)
  store.gainResources(PlayerId.PlayerOne, c.resources)
  store.gainAttack(PlayerId.PlayerOne, c.attack)
}
</script>

<template>
  <div class="h-screen flex flex-col overflow-hidden">

    <!-- ═══════════════════════════════════════════════════════════════════
         TOP — Opponent (Morgoth)
    ════════════════════════════════════════════════════════════════════ -->
    <div class="flex-shrink-0 bg-morgoth-bg/60 border-b border-morgoth-dark px-6 py-3">
      <div class="flex items-center gap-5">

        <!-- Stronghold -->
        <StrongholdCard v-if="sh2" :stronghold="sh2" />

        <!-- Pool counters -->
        <div class="flex flex-col gap-2 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-morgoth-light text-base">⚔</span>
            <span class="font-bold text-ink tabular-nums w-5 text-right">{{ p2.attack }}</span>
            <span class="text-muted text-xs">attack</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-neutral-light text-base">◈</span>
            <span class="font-bold text-ink tabular-nums w-5 text-right">{{ p2.resources }}</span>
            <span class="text-muted text-xs">resources</span>
          </div>
        </div>

        <!-- Spacer -->
        <div class="flex-1" />

        <!-- Opponent hand — overlapping face-down card backs, fanned -->
        <div class="flex items-end" style="padding-bottom: 6px;">
          <div
            v-for="(_, i) in p2.hand"
            :key="i"
            class="w-11 h-16 rounded-lg border border-card-border/70 bg-card-bg shadow-md flex items-center justify-center flex-shrink-0"
            :class="i > 0 ? '-ml-5' : ''"
            :style="{
              zIndex: i,
              transform: `rotate(${(i - (p2.hand.length - 1) / 2) * 5}deg) translateY(${Math.abs(i - (p2.hand.length - 1) / 2) * 2}px)`,
            }"
          >
            <span class="text-muted/30 text-sm select-none">🌑</span>
          </div>
          <span class="ml-3 text-muted text-xs self-center">{{ p2.hand.length }} cards</span>
        </div>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         MIDDLE — Fate Track · Player's In-Play · Market Row
    ════════════════════════════════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col gap-4 overflow-y-auto px-6 py-4">

      <!-- Fate track -->
      <FateTrack :fate-track="store.gameState.fateTrack" class="w-full max-w-2xl mx-auto" />

      <!-- Player's in-play zone -->
      <div v-if="p1.inPlay.length > 0" class="flex flex-col gap-1.5">
        <span class="text-[10px] font-bold uppercase tracking-widest text-free-peoples/70">In Play</span>
        <div class="flex gap-2 overflow-x-auto pb-1">
          <TransitionGroup name="arrive-to-play" tag="div" class="flex gap-2">
            <!--
              Cards are scaled to 75% (120×180px) inside a clipping wrapper
              so they don't break the flex row height while staying readable.
            -->
            <div
              v-for="c in p1.inPlay"
              :key="c.id"
              class="flex-shrink-0 overflow-hidden rounded-xl"
              style="width: 120px; height: 180px;"
            >
              <div style="transform: scale(0.75); transform-origin: top left; width: 160px; height: 240px;">
                <PlayingCard :card="c" @click="() => {}" />
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Market -->
      <MarketRow @select="(c) => console.log('market select', c.name)" />

    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         BOTTOM — Player (Free Peoples)
    ════════════════════════════════════════════════════════════════════ -->
    <div class="flex-shrink-0 bg-free-peoples-bg/60 border-t border-free-peoples-dark px-6 py-3">
      <div class="flex items-start gap-5">

        <!-- Stronghold + pool counters stacked on left -->
        <div class="flex flex-col gap-3 flex-shrink-0">
          <StrongholdCard v-if="sh1" :stronghold="sh1" />
          <div class="flex gap-4 text-sm">
            <div class="flex items-center gap-2">
              <span class="text-morgoth-light text-base">⚔</span>
              <span class="font-bold text-ink tabular-nums w-5 text-right">{{ p1.attack }}</span>
              <span class="text-muted text-xs">attack</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-free-peoples text-base">◈</span>
              <span class="font-bold text-ink tabular-nums w-5 text-right">{{ p1.resources }}</span>
              <span class="text-muted text-xs">resources</span>
            </div>
          </div>
        </div>

        <!-- Player's hand — full-size cards, horizontally scrollable -->
        <div class="flex flex-col gap-1.5 flex-1 min-w-0">
          <span class="text-[10px] font-bold uppercase tracking-widest text-muted">
            Hand ({{ p1.hand.length }}) — click to play
          </span>
          <div class="overflow-x-auto pb-1">
            <TransitionGroup name="play-from-hand" tag="div" class="hand-group">
              <PlayingCard
                v-for="c in p1.hand"
                :key="c.id"
                :card="c"
                @click="playCard(c)"
              />
            </TransitionGroup>
          </div>
        </div>

      </div>
    </div>

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
