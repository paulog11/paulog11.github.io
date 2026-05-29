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
        <span class="text-silver-500 font-mono text-xs">{{ concept.japanese }}</span>
      </div>
      <p class="text-silver-500 text-xs font-mono uppercase tracking-wider">{{ concept.subtitle }}</p>
    </div>

    <!-- Summary -->
    <div>
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-2">Summary</h4>
      <div class="space-y-3">
        <p
          v-for="(para, i) in concept.steps.summary.content.split('\n\n')"
          :key="i"
          class="text-silver-200 text-sm leading-relaxed"
        >
          {{ para }}
        </p>
      </div>
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

    <!-- The Argument -->
    <div class="border-l-2 border-amber-600/70 pl-4">
      <h4 class="text-xs font-mono uppercase tracking-wider text-amber-700 mb-2">The Argument</h4>
      <div class="space-y-2">
        <p
          v-for="(para, i) in concept.steps.argument.content.split('\n\n')"
          :key="i"
          class="text-silver-300 text-sm leading-relaxed"
        >
          {{ para }}
        </p>
      </div>
    </div>

    <!-- Objection & Response -->
    <div class="border-l-2 border-gold-400/60 pl-4">
      <h4 class="text-xs font-mono uppercase tracking-wider text-gold-400/80 mb-2">Objection &amp; Response</h4>
      <p class="text-silver-400 text-sm leading-relaxed italic mb-2">"{{ concept.steps.objection.challenge }}"</p>
      <p class="text-xs font-mono uppercase tracking-wider text-silver-600 mb-1">Lewis's Response</p>
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.objection.response }}</p>
    </div>

    <!-- Key Quote -->
    <div class="border border-forest-600/50 rounded-lg p-4 bg-forest-800/30">
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">Key Quote</h4>
      <p class="text-silver-200 text-sm leading-relaxed font-serif italic">{{ concept.steps.quote.content }}</p>
    </div>
  </div>
</template>
