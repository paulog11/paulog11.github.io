<script setup lang="ts">
import { computed } from 'vue'
import { type Card, Faction } from '../types/game'
import { playSfx } from '../composables/useSfx'
import { GILT_FRAME, CORNER_FLOURISH, WAX_SEAL, BANNER_FRAME, STAT_PLATE } from '../assets/decorations'

const props = defineProps<{ card: Card; faceDown?: boolean; vanguardHp?: number }>()
const emit = defineEmits<{ click: [card: Card] }>()

function handleClick() {
  playSfx('click')
  emit('click', props.card)
}

const factionMeta = computed(() => {
  switch (props.card.faction) {
    case Faction.FreePeoples:
      return {
        label: 'Free Peoples',
        border: 'border-free-peoples',
        badge: 'bg-free-peoples-bg text-free-peoples-light border border-free-peoples-dark',
        hoverShadow: 'hover:shadow-torch',
      }
    case Faction.Morgoth:
      return {
        label: 'Morgoth',
        border: 'border-morgoth',
        badge: 'bg-morgoth-bg text-morgoth-light border border-morgoth-dark',
        hoverShadow: 'hover:shadow-torch-crimson',
      }
    default:
      return {
        label: 'Neutral',
        border: 'border-neutral',
        badge: 'bg-neutral-bg text-neutral-light border border-neutral-dark',
        hoverShadow: 'hover:shadow-torch',
      }
  }
})
</script>

<template>
  <div
    class="relative flex flex-col w-40 h-60 rounded-xl border-2 bg-parchment-page cursor-pointer select-none
           shadow-card-rest transition-all duration-200 ease-out
           hover:scale-105 hover:-translate-y-1"
    :class="[factionMeta.border, factionMeta.hoverShadow]"
    @click="handleClick"
  >
    <!-- Decorative SVG layers (behind all content) -->
    <span class="absolute inset-0 pointer-events-none rounded-xl overflow-hidden" v-html="GILT_FRAME" />
    <!-- Corner flourishes -->
    <span class="absolute top-0 left-0 w-8 h-8 pointer-events-none" v-html="CORNER_FLOURISH" />
    <span class="absolute top-0 right-0 w-8 h-8 pointer-events-none scale-x-[-1]" v-html="CORNER_FLOURISH" />
    <span class="absolute bottom-0 left-0 w-8 h-8 pointer-events-none scale-y-[-1]" v-html="CORNER_FLOURISH" />
    <span class="absolute bottom-0 right-0 w-8 h-8 pointer-events-none scale-x-[-1] scale-y-[-1]" v-html="CORNER_FLOURISH" />

    <!-- face-down state -->
    <div v-if="faceDown" class="absolute inset-0 rounded-xl bg-card-border flex items-center justify-center">
      <span class="text-muted text-3xl">🌑</span>
    </div>

    <template v-else>
      <!-- All face-up content in a z-10 layer over the SVG decorations -->
      <div class="relative z-10 flex flex-col h-full">

        <!-- Top row: cost + faction badge -->
        <div class="flex items-start justify-between px-2 pt-2">
          <!-- Wax-seal cost medallion -->
          <div class="relative flex items-center justify-center w-7 h-7 flex-shrink-0">
            <span class="absolute inset-0 pointer-events-none" v-html="WAX_SEAL" />
            <span class="relative text-ink text-xs font-bold z-10">{{ card.cost }}</span>
          </div>
          <span class="text-[9px] font-inscription font-bold uppercase tracking-inscription px-1.5 py-0.5 rounded" :class="factionMeta.badge">
            {{ factionMeta.label }}
          </span>
        </div>

        <!-- Card name + type -->
        <div class="px-2 mt-1">
          <p class="text-ink text-[15px] font-bold leading-[1.05] font-display line-clamp-2">{{ card.name }}</p>
          <p class="text-muted text-[9px] font-inscription uppercase tracking-inscription mt-0.5">{{ card.category }}</p>
        </div>

        <!-- Divider -->
        <div class="mx-2 my-1.5 border-t border-card-border" />

        <!-- Ability text -->
        <div class="flex-1 px-2 overflow-hidden">
          <p v-if="card.effect" class="text-muted text-[10px] italic leading-snug line-clamp-4">
            {{ card.effect.description }}
          </p>
          <p v-else class="text-card-border text-[10px] italic">No ability.</p>
        </div>

        <!-- Divider -->
        <div class="mx-2 mb-1 border-t border-card-border" />

        <!-- HP bar (deployed vanguards only) -->
        <div v-if="vanguardHp !== undefined && card.hp" class="px-2 pb-1">
          <div class="relative">
            <span class="absolute inset-0 pointer-events-none" v-html="BANNER_FRAME" />
            <div class="relative z-10 h-1.5 rounded-full bg-card-border overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="vanguardHp / card.hp > 0.5 ? 'bg-green-500' : vanguardHp / card.hp > 0.25 ? 'bg-yellow-400' : 'bg-red-500'"
                :style="{ width: `${(vanguardHp / card.hp) * 100}%` }"
              />
            </div>
            <div class="relative z-10 text-[9px] text-center text-muted/60 mt-0.5 tabular-nums">{{ vanguardHp }}/{{ card.hp }} hp</div>
          </div>
        </div>

        <!-- Bottom row: attack + resources + fate -->
        <div class="flex items-center justify-between px-2 pb-2 text-[11px] font-bold">
          <span class="relative inline-flex items-center px-1.5 py-0.5 text-morgoth-light" title="Attack">
            <span class="absolute inset-0 pointer-events-none" v-html="STAT_PLATE" />
            <span class="relative">⚔ {{ card.attack }}</span>
          </span>
          <span class="relative inline-flex items-center px-1.5 py-0.5 text-free-peoples-light" title="Resources">
            <span class="absolute inset-0 pointer-events-none" v-html="STAT_PLATE" />
            <span class="relative">◈ {{ card.resources }}</span>
          </span>
          <span
            v-if="card.fateGeneration !== 0"
            class="relative inline-flex items-center px-1.5 py-0.5 text-neutral-light"
            title="Fate generation"
          >
            <span class="absolute inset-0 pointer-events-none" v-html="STAT_PLATE" />
            <span class="relative">✦ {{ card.fateGeneration > 0 ? '+' : '' }}{{ card.fateGeneration }}</span>
          </span>
        </div>

      </div>
    </template>
  </div>
</template>
