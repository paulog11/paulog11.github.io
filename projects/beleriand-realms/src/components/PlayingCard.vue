<script setup lang="ts">
import { computed } from 'vue'
import { type Card, Faction } from '../types/game'
import { playSfx } from '../composables/useSfx'

const props = defineProps<{ card: Card; faceDown?: boolean; vanguardHp?: number }>()
const emit = defineEmits<{ click: [card: Card] }>()

function handleClick() {
  playSfx('click')
  emit('click', props.card)
}

const factionMeta = computed(() => {
  switch (props.card.faction) {
    case Faction.FreePeoples:
      return { label: 'Free Peoples', border: 'border-free-peoples', badge: 'bg-free-peoples-bg text-free-peoples-light border border-free-peoples-dark', glow: 'hover:shadow-free-peoples/30' }
    case Faction.Morgoth:
      return { label: 'Morgoth', border: 'border-morgoth', badge: 'bg-morgoth-bg text-morgoth-light border border-morgoth-dark', glow: 'hover:shadow-morgoth/30' }
    default:
      return { label: 'Neutral', border: 'border-neutral', badge: 'bg-neutral-bg text-neutral-light border border-neutral-dark', glow: 'hover:shadow-neutral/30' }
  }
})
</script>

<template>
  <div
    class="relative flex flex-col w-40 h-60 rounded-xl border-2 bg-card-bg cursor-pointer select-none
           transition-all duration-200 ease-out
           hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
    :class="[factionMeta.border, factionMeta.glow]"
    @click="handleClick"
  >
    <!-- face-down state -->
    <div v-if="faceDown" class="absolute inset-0 rounded-xl bg-card-border flex items-center justify-center">
      <span class="text-muted text-3xl">🌑</span>
    </div>

    <template v-else>
      <!-- Top row: cost + faction badge -->
      <div class="flex items-start justify-between px-2 pt-2">
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-card-border border border-muted/40 text-ink text-xs font-bold">
          {{ card.cost }}
        </div>
        <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" :class="factionMeta.badge">
          {{ factionMeta.label }}
        </span>
      </div>

      <!-- Card name + type -->
      <div class="px-2 mt-1">
        <p class="text-ink text-sm font-bold leading-tight font-display line-clamp-2">{{ card.name }}</p>
        <p class="text-muted text-[10px] uppercase tracking-wide mt-0.5">{{ card.category }}</p>
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
        <div class="h-1.5 rounded-full bg-card-border overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-300"
            :class="vanguardHp / card.hp > 0.5 ? 'bg-green-500' : vanguardHp / card.hp > 0.25 ? 'bg-yellow-400' : 'bg-red-500'"
            :style="{ width: `${(vanguardHp / card.hp) * 100}%` }"
          />
        </div>
        <div class="text-[9px] text-center text-muted/60 mt-0.5 tabular-nums">{{ vanguardHp }}/{{ card.hp }} hp</div>
      </div>

      <!-- Bottom row: attack + resources + fate -->
      <div class="flex items-center justify-between px-2 pb-2 text-[11px] font-bold">
        <span class="flex items-center gap-0.5 text-morgoth-light" title="Attack">
          ⚔ {{ card.attack }}
        </span>
        <span class="flex items-center gap-0.5 text-free-peoples-light" title="Resources">
          ◈ {{ card.resources }}
        </span>
        <span
          v-if="card.fateGeneration !== 0"
          class="flex items-center gap-0.5 text-neutral-light"
          title="Fate generation"
        >
          ✦ {{ card.fateGeneration > 0 ? '+' : '' }}{{ card.fateGeneration }}
        </span>
      </div>
    </template>
  </div>
</template>
