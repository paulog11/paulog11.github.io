<script setup>
defineProps({
  concept: { type: Object, required: true },
})
</script>

<template>
  <div class="bg-forest-900/40 border border-forest-700/40 rounded-xl p-5 space-y-4 animate-fade-in">
    <!-- Header -->
    <div>
      <div class="flex items-baseline gap-2 mb-1">
        <h3 class="font-serif text-lg text-gold-400">{{ concept.title }}</h3>
        <span class="text-silver-400 font-mono text-sm">{{ concept.japanese }}</span>
      </div>
      <p class="text-silver-500 text-xs font-mono uppercase tracking-wider">{{ concept.subtitle }}</p>
    </div>

    <!-- Summary -->
    <div>
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-1.5">Summary</h4>
      <p class="text-silver-200 text-sm leading-relaxed">{{ concept.steps.summary.content }}</p>
    </div>

    <!-- Examples -->
    <div>
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-1.5">Examples</h4>
      <ul class="space-y-2">
        <li
          v-for="(item, i) in concept.steps.examples.items"
          :key="i"
          class="text-silver-300 text-sm leading-relaxed flex gap-2"
        >
          <span class="text-forest-500 flex-shrink-0 mt-0.5">&bull;</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Cultural Gap (conditional) -->
    <div
      v-if="concept.steps.culturalGap.applicable"
      class="border-l-2 border-amber-400/60 pl-4"
    >
      <h4 class="text-xs font-mono uppercase tracking-wider text-amber-400/80 mb-1.5">Cultural Gap</h4>
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.culturalGap.content }}</p>
    </div>

    <!-- Trigger -->
    <div class="border-l-2 border-gold-400/60 pl-4">
      <h4 class="text-xs font-mono uppercase tracking-wider text-gold-400/80 mb-1.5">Trigger</h4>
      <p class="text-silver-300 text-sm leading-relaxed italic">{{ concept.steps.trigger.content }}</p>
    </div>
  </div>
</template>
