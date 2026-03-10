<template>
  <button
    :disabled="app.comingSoon"
    @click="$emit('select', app)"
    class="
      group relative text-left w-full
      bg-white/60 border border-warm
      rounded-sm p-6
      transition-all duration-200 ease-out
      animate-fade-up
      outline-none focus-visible:ring-2 focus-visible:ring-accent/50
    "
    :class="[
      app.comingSoon
        ? 'cursor-default opacity-80'
        : 'hover:bg-white hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5 cursor-pointer'
    ]"
  >
    <!-- Icon -->
    <div
      class="mb-4 w-10 h-10 flex items-center justify-center rounded-sm text-xl font-display"
      :class="app.comingSoon ? 'bg-warm text-muted' : 'bg-accent-light text-accent'"
    >
      {{ app.icon }}
    </div>

    <!-- Title -->
    <h2 class="font-display text-[1.05rem] leading-tight text-ink">
      {{ app.title }}
    </h2>
    <p class="font-mono text-[0.7rem] tracking-wider uppercase text-muted mt-0.5 mb-2">
      {{ app.subtitle }}
    </p>

    <!-- Description -->
    <p class="text-[0.85rem] text-muted font-light leading-relaxed">
      {{ app.description }}
    </p>

    <!-- Footer -->
    <div class="mt-4 flex items-center justify-between">
      <!-- Tags -->
      <div class="flex gap-1.5 flex-wrap">
        <span
          v-for="tag in app.tags"
          :key="tag"
          class="font-mono text-[0.62rem] tracking-wider uppercase px-2 py-0.5 bg-warm text-muted rounded-sm"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Status badge / arrow -->
      <span
        v-if="app.comingSoon"
        class="font-mono text-[0.62rem] tracking-widest uppercase text-muted/60 shrink-0 ml-2"
      >
        Soon
      </span>
      <span
        v-else
        class="text-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 ml-2"
      >
        →
      </span>
    </div>

    <!-- Hover accent line -->
    <div
      v-if="!app.comingSoon"
      class="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-b-sm"
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
