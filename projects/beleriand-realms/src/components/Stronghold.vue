<script setup lang="ts">
import { computed } from 'vue'
import { type Stronghold, Faction } from '../types/game'
import { GONDOLIN_TOWER, ANGBAND_PEAKS, BANNER_FRAME } from '../assets/decorations'

const props = defineProps<{ stronghold: Stronghold; isActive?: boolean; isTarget?: boolean }>()
const emit = defineEmits<{ target: [id: string] }>()

const healthPct = computed(() =>
  Math.max(0, (props.stronghold.currentHealth / props.stronghold.maxHealth) * 100),
)

const healthBarColor = computed(() => {
  if (healthPct.value > 50) return 'bg-green-500'
  if (healthPct.value > 25) return 'bg-yellow-400'
  return 'bg-red-500'
})

const isDestroyed = computed(() => props.stronghold.currentHealth === 0)

const factionStyle = computed(() => {
  switch (props.stronghold.faction) {
    case Faction.FreePeoples:
      return { border: 'border-free-peoples', heading: 'text-free-peoples', motifColor: 'text-free-peoples' }
    case Faction.Morgoth:
      return { border: 'border-morgoth', heading: 'text-morgoth-light', motifColor: 'text-morgoth-light' }
    default:
      return { border: 'border-neutral', heading: 'text-neutral-light', motifColor: '' }
  }
})

const factionMotif = computed(() => {
  switch (props.stronghold.faction) {
    case Faction.FreePeoples: return GONDOLIN_TOWER
    case Faction.Morgoth:     return ANGBAND_PEAKS
    default:                  return ''
  }
})
</script>

<template>
  <div
    class="relative rounded-xl border-2 bg-parchment-page shadow-plaque p-3 w-64 transition-all duration-200 select-none"
    :class="[
      factionStyle.border,
      isActive && !isTarget ? 'ring-2 ring-offset-1 ring-offset-parchment ring-free-peoples/60' : '',
      isTarget ? 'ring-2 ring-offset-1 ring-offset-parchment ring-red-500 cursor-pointer' : 'cursor-default',
      isDestroyed ? 'opacity-50 grayscale' : '',
    ]"
    @click="isTarget && emit('target', stronghold.id)"
  >
    <!-- Destruction banner -->
    <div v-if="isDestroyed" class="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 z-10">
      <span class="text-red-400 font-inscription font-bold text-lg tracking-inscription uppercase">Destroyed</span>
    </div>

    <!-- Faction motif silhouette (behind all content) -->
    <span
      v-if="factionMotif"
      class="absolute inset-0 pointer-events-none opacity-15 rounded-xl overflow-hidden"
      :class="factionStyle.motifColor"
      v-html="factionMotif"
    />

    <!-- All content z-10 over the motif -->
    <div class="relative z-10">

      <!-- Header -->
      <div class="flex items-start justify-between mb-2">
        <div>
          <h3 class="font-display font-bold text-base leading-tight" :class="factionStyle.heading">
            {{ stronghold.name }}
          </h3>
          <p class="text-muted text-[10px] font-inscription uppercase tracking-inscription">
            Stronghold
            <span v-if="isActive && !isDestroyed" class="ml-1 text-free-peoples font-bold">· Active</span>
          </p>
        </div>
        <div class="text-right">
          <span class="font-bold text-sm text-ink">{{ stronghold.currentHealth }}</span>
          <span class="text-muted text-xs"> / {{ stronghold.maxHealth }}</span>
        </div>
      </div>

      <!-- Health bar wrapped in banner ribbon -->
      <div class="relative mb-2">
        <span class="absolute inset-0 pointer-events-none" v-html="BANNER_FRAME" />
        <div class="relative z-10 h-2 rounded-full bg-card-border overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="healthBarColor"
            :style="{ width: `${healthPct}%` }"
          />
        </div>
      </div>

      <!-- Innate ability -->
      <p class="text-muted text-[10px] italic leading-snug border-t border-card-border pt-2">
        {{ stronghold.innateAbility }}
      </p>

    </div>

    <!-- Target indicator -->
    <div v-if="isTarget" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
      <span class="text-white text-[10px] font-bold">⚔</span>
    </div>
  </div>
</template>
