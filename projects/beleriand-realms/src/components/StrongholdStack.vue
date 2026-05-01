<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Stronghold, Faction } from '../types/game'
import StrongholdCard from './Stronghold.vue'

const props = defineProps<{
  bases: Stronghold[]
  activeStrongholdId: string | null
  isEnemy?: boolean
  selectingAttacker?: boolean
}>()

const emit = defineEmits<{
  target: [id: string]
}>()

const showDrawer = ref(false)

const activeBase = computed(() =>
  props.bases.find(b => b.id === props.activeStrongholdId) ?? props.bases[0] ?? null,
)

// Inactive bases (not active, not destroyed) form the depth of the pile
const inactiveCount = computed(() => props.bases.filter(b => b.id !== props.activeStrongholdId).length)

const isTargetable = computed(() => props.selectingAttacker && props.activeBase !== null)

const factionColor = computed(() => {
  const base = activeBase.value
  if (!base) return { tab: 'bg-card-border border-card-border text-muted', border: 'border-card-border' }
  switch (base.faction) {
    case Faction.FreePeoples:
      return { tab: 'bg-free-peoples-bg border-free-peoples text-free-peoples', border: 'border-free-peoples' }
    case Faction.Morgoth:
      return { tab: 'bg-morgoth-bg border-morgoth text-morgoth-light', border: 'border-morgoth' }
    default:
      return { tab: 'bg-card-bg border-neutral text-neutral-light', border: 'border-neutral' }
  }
})

function handleCardTarget(id: string) {
  emit('target', id)
}
</script>

<template>
  <!--
    Outer wrapper is exactly the size of the active card (w-64 = 256px wide).
    Depth ghost layers and the stack tab are positioned absolutely but overflow
    is clipped so nothing spills outside the card's bounding box.
  -->
  <div class="relative" style="width: 256px;">

    <!-- Shadow depth layers — shifted left, same height, clipped by overflow:hidden wrapper -->
    <template v-if="inactiveCount > 0">
      <div
        v-for="n in Math.min(inactiveCount, 3)"
        :key="n"
        class="absolute rounded-xl border-2 bg-card-bg"
        :class="factionColor.border"
        :style="{
          left: `${-n * 5}px`,
          top: 0,
          right: `${n * 5}px`,
          bottom: 0,
          zIndex: n,
          opacity: 1 - n * 0.25,
        }"
      />
    </template>

    <!-- Active stronghold card on top -->
    <div class="relative" style="z-index: 4;">
      <StrongholdCard
        v-if="activeBase"
        :stronghold="activeBase"
        :is-active="true"
        :is-target="isTargetable"
        @target="handleCardTarget"
      />
      <div
        v-else
        class="rounded-xl border-2 border-card-border bg-card-bg/50 flex items-center justify-center text-muted text-xs italic"
        style="width: 256px; height: 180px;"
      >
        No active stronghold
      </div>
    </div>

    <!-- Stack tab — sits flush against the left edge of the card, same height -->
    <button
      v-if="inactiveCount > 0"
      class="absolute top-0 bottom-0 rounded-l-lg border-2 border-r-0 flex flex-col items-center justify-center transition-colors hover:brightness-110"
      :class="factionColor.tab"
      style="left: -16px; width: 16px; z-index: 5;"
      :title="`View all strongholds (${bases.length} total)`"
      @click.stop="showDrawer = true"
    >
      <span
        class="text-[8px] font-bold uppercase tracking-widest select-none"
        style="writing-mode: vertical-rl; transform: rotate(180deg);"
      >
        {{ bases.length }}
      </span>
    </button>

    <!-- Stack viewer drawer -->
    <Transition name="stack-drawer">
      <div
        v-if="showDrawer"
        class="fixed inset-0 z-50 flex"
        @click.self="showDrawer = false"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showDrawer = false" />

        <!-- Drawer panel -->
        <div
          class="relative z-10 flex flex-col rounded-2xl border-2 shadow-2xl m-auto p-6 gap-4 max-h-[90vh] overflow-y-auto"
          :class="[factionColor.border, 'bg-card-bg']"
          style="max-width: 640px; min-width: 320px;"
          @click.stop
        >
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-display font-bold text-base text-ink">
              {{ isEnemy ? 'Enemy' : 'Your' }} Strongholds
            </h2>
            <button
              class="w-7 h-7 rounded-full bg-card-border/50 text-muted hover:text-ink hover:bg-card-border transition-colors flex items-center justify-center text-xs font-bold"
              @click="showDrawer = false"
            >
              ✕
            </button>
          </div>

          <div class="flex flex-wrap gap-4 justify-center">
            <div
              v-for="base in bases"
              :key="base.id"
              class="flex flex-col items-center gap-1.5"
            >
              <StrongholdCard
                :stronghold="base"
                :is-active="base.id === activeStrongholdId"
                :is-target="false"
              />
              <span
                v-if="base.id === activeStrongholdId"
                class="text-[10px] font-bold uppercase tracking-wider"
                :class="base.faction === Faction.FreePeoples ? 'text-free-peoples' : 'text-morgoth-light'"
              >
                ▲ Active
              </span>
              <span
                v-else-if="base.currentHealth === 0"
                class="text-[10px] font-bold uppercase tracking-wider text-red-400"
              >
                ✕ Destroyed
              </span>
              <span v-else class="text-[10px] text-muted uppercase tracking-wider">In reserve</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.stack-drawer-enter-active,
.stack-drawer-leave-active {
  transition: opacity 0.25s ease;
}
.stack-drawer-enter-from,
.stack-drawer-leave-to {
  opacity: 0;
}
</style>
