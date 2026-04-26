<script setup lang="ts">
import { computed } from 'vue'
import { type Stronghold, Faction } from '../types/game'

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
      return { border: 'border-free-peoples', heading: 'text-free-peoples' }
    case Faction.Morgoth:
      return { border: 'border-morgoth', heading: 'text-morgoth-light' }
    default:
      return { border: 'border-neutral', heading: 'text-neutral-light' }
  }
})
</script>

<template>
  <div
    class="relative rounded-xl border-2 bg-card-bg p-3 w-64 transition-all duration-200 select-none"
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
      <span class="text-red-400 font-display font-bold text-lg tracking-widest uppercase">Destroyed</span>
    </div>

    <!-- Header -->
    <div class="flex items-start justify-between mb-2">
      <div>
        <h3 class="font-display font-bold text-sm leading-tight" :class="factionStyle.heading">
          {{ stronghold.name }}
        </h3>
        <p class="text-muted text-[10px] uppercase tracking-wider">
          Stronghold
          <span v-if="isActive && !isDestroyed" class="ml-1 text-free-peoples font-bold">· Active</span>
        </p>
      </div>
      <div class="text-right">
        <span class="font-bold text-sm text-ink">{{ stronghold.currentHealth }}</span>
        <span class="text-muted text-xs"> / {{ stronghold.maxHealth }}</span>
      </div>
    </div>

    <!-- Health bar -->
    <div class="h-2 rounded-full bg-card-border overflow-hidden mb-2">
      <div
        class="h-full rounded-full transition-all duration-500"
        :class="healthBarColor"
        :style="{ width: `${healthPct}%` }"
      />
    </div>

    <!-- Innate ability -->
    <p class="text-muted text-[10px] italic leading-snug border-t border-card-border pt-2">
      {{ stronghold.innateAbility }}
    </p>

    <!-- Target indicator -->
    <div v-if="isTarget" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
      <span class="text-white text-[10px] font-bold">⚔</span>
    </div>
  </div>
</template>
