<template>
  <button
    :disabled="app.comingSoon"
    @click="$emit('select', app)"
    class="
      group relative w-full text-left
      bg-gradient-to-br from-accent-light to-warm/60
      border border-accent/20
      rounded-sm p-8
      min-h-[180px] flex flex-col justify-between
      transition-all duration-200 ease-out
      outline-none focus-visible:ring-2 focus-visible:ring-accent/50
      overflow-hidden
    "
    :class="[
      app.comingSoon
        ? 'cursor-default opacity-70'
        : 'hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 cursor-pointer'
    ]"
  >
    <!-- Noise texture background -->
    <div class="absolute inset-0 opacity-5 mix-blend-multiply" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"></div>

    <div class="relative z-10">
      <!-- Icon -->
      <div class="mb-4 w-16 h-16 flex items-center justify-center rounded-sm text-4xl font-display bg-accent-light/80 text-accent">
        {{ app.icon }}
      </div>

      <!-- Title -->
      <h2 class="font-display text-[1.4rem] leading-tight text-ink mb-2">
        {{ app.title }}
      </h2>
      <p class="font-mono text-[0.75rem] tracking-wider uppercase text-muted mb-4">
        {{ app.subtitle }}
      </p>

      <!-- Description -->
      <p class="text-[0.9rem] text-muted/90 font-light leading-relaxed mb-4 max-w-lg">
        {{ app.description }}
      </p>
    </div>

    <!-- Footer: Tags and status -->
    <div class="relative z-10 flex items-center justify-between">
      <div class="flex gap-1.5 flex-wrap">
        <span
          v-for="tag in app.tags"
          :key="tag"
          class="font-mono text-[0.65rem] tracking-wider uppercase px-2 py-0.5 bg-white/40 text-ink rounded-sm"
        >
          {{ tag }}
        </span>
      </div>

      <span
        v-if="!app.comingSoon"
        class="text-accent text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0 ml-4"
      >
        →
      </span>
    </div>

    <!-- Hover accent line -->
    <div
      v-if="!app.comingSoon"
      class="absolute bottom-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-b-sm z-20"
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
