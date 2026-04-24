<script setup lang="ts">
import { useTutorial } from '../composables/useTutorial'

const { isActive, step, stepNumber, totalSteps, isFirst, isLast, stop, next, prev } = useTutorial()
</script>

<template>
  <Transition name="drawer">
    <div
      v-if="isActive"
      class="fixed right-0 top-0 h-full w-72 z-40 bg-card-bg border-l border-card-border
             shadow-2xl flex flex-col"
    >

      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-card-border flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <span class="text-free-peoples text-[10px] font-bold uppercase tracking-widest">Tutorial</span>
          <span class="text-muted/60 text-xs">{{ stepNumber }}/{{ totalSteps }}</span>
        </div>
        <button
          class="text-muted hover:text-ink text-lg leading-none transition-colors"
          aria-label="Close tutorial"
          @click="stop"
        >
          ✕
        </button>
      </div>

      <!-- Progress bar -->
      <div class="h-0.5 bg-parchment flex-shrink-0">
        <div
          class="h-full bg-free-peoples transition-all duration-500 ease-out"
          :style="{ width: `${(stepNumber / totalSteps) * 100}%` }"
        />
      </div>

      <!-- Step content -->
      <div class="flex-1 overflow-y-auto px-4 py-5">
        <h3 class="text-ink font-display font-bold text-base mb-3 leading-snug">
          {{ step.title }}
        </h3>
        <p class="text-muted text-sm leading-relaxed">
          {{ step.body }}
        </p>

        <!-- Action prompt -->
        <div
          v-if="step.actionPrompt"
          class="mt-5 rounded-xl border border-free-peoples/40 bg-free-peoples-bg px-3 py-3"
        >
          <p class="text-[10px] font-bold uppercase tracking-widest text-free-peoples mb-1">Your turn</p>
          <p class="text-free-peoples-light text-xs leading-relaxed">{{ step.actionPrompt }}</p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="px-4 pb-5 pt-3 border-t border-card-border flex-shrink-0 flex items-center gap-2">
        <button
          class="flex-1 py-2 rounded-lg text-sm font-semibold transition-colors"
          :class="isFirst
            ? 'text-muted/30 cursor-not-allowed'
            : 'border border-card-border text-muted hover:border-muted hover:text-ink'"
          :disabled="isFirst"
          @click="prev"
        >
          ← Prev
        </button>

        <button
          v-if="!isLast"
          class="flex-1 py-2 rounded-lg text-sm font-semibold
                 bg-free-peoples text-parchment hover:bg-free-peoples-dark transition-colors"
          @click="next"
        >
          Next →
        </button>
        <button
          v-else
          class="flex-1 py-2 rounded-lg text-sm font-semibold
                 bg-free-peoples text-parchment hover:bg-free-peoples-dark transition-colors"
          @click="stop"
        >
          Finish ✓
        </button>
      </div>

    </div>
  </Transition>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>
