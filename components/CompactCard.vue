<template>
  <button
    :disabled="app.comingSoon"
    @click="$emit('select', app)"
    class="
      group relative text-left w-full
      bg-white/40 hover:bg-white/70 border border-warm
      rounded-sm px-4 py-3
      transition-all duration-150 ease-out
      outline-none focus-visible:ring-2 focus-visible:ring-accent/50
      flex items-center justify-between gap-4
    "
    :class="[
      app.comingSoon
        ? 'cursor-default opacity-60'
        : 'hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 cursor-pointer'
    ]"
  >
    <!-- Left: Icon + Title + Subtitle + Tags -->
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <!-- Icon -->
      <div class="shrink-0 w-8 h-8 flex items-center justify-center rounded-sm text-lg font-display bg-accent-light/60 text-accent">
        {{ app.icon }}
      </div>

      <!-- Text content -->
      <div class="flex-1 min-w-0">
        <h3 class="font-display text-[0.95rem] leading-tight text-ink">
          {{ app.title }}
        </h3>
        <div class="flex items-center gap-2 mt-0.5 flex-wrap">
          <p class="font-mono text-[0.65rem] tracking-wider uppercase text-muted">
            {{ app.subtitle }}
          </p>
          <div class="flex gap-1">
            <span
              v-for="tag in app.tags.slice(0, 1)"
              :key="tag"
              class="font-mono text-[0.6rem] tracking-wider uppercase px-1.5 py-0.5 bg-warm text-muted rounded-sm"
            >
              {{ tag }}
            </span>
            <span
              v-if="app.tags.length > 1"
              class="font-mono text-[0.6rem] tracking-wider uppercase text-muted/60"
            >
              +{{ app.tags.length - 1 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Arrow or Coming Soon -->
    <div class="shrink-0">
      <span
        v-if="app.comingSoon"
        class="font-mono text-[0.65rem] tracking-widest uppercase text-muted/60"
      >
        Soon
      </span>
      <span
        v-else
        class="text-accent text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      >
        →
      </span>
    </div>

    <!-- Hover accent line (bottom) -->
    <div
      v-if="!app.comingSoon"
      class="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left rounded-b-sm"
    />
  </button>
</template>

<script setup>
defineProps({
  app: {
    type: Object,
    required: true,
  },
})
defineEmits(['select'])
</script>
