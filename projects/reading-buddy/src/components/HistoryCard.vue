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
      </div>
      <span class="text-silver-400 font-mono text-sm block mb-1">{{ concept.japanese }}</span>
      <p class="text-silver-500 text-xs font-mono uppercase tracking-wider">{{ concept.subtitle }}</p>
    </div>

    <!-- Summary (multi-paragraph) -->
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

    <!-- Key Figures -->
    <div>
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-2">Key Figures</h4>
      <ul class="space-y-2">
        <li
          v-for="(figure, i) in concept.steps.keyFigures.items"
          :key="i"
          class="flex gap-2 text-sm leading-relaxed"
        >
          <span class="text-gold-400/70 flex-shrink-0 mt-0.5">&bull;</span>
          <span>
            <span class="text-gold-300 font-medium">{{ figure.name }}</span>
            <span class="text-silver-400"> — </span>
            <span class="text-silver-300">{{ figure.role }}</span>
          </span>
        </li>
      </ul>
    </div>

    <!-- Key Terms -->
    <div>
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-2">Key Terms</h4>
      <ul class="space-y-2">
        <li
          v-for="(entry, i) in concept.steps.keyTerms.items"
          :key="i"
          class="text-sm leading-relaxed"
        >
          <span class="text-gold-400 font-mono">{{ entry.term }}</span>
          <span class="text-silver-500 font-mono text-xs"> ({{ entry.reading }})</span>
          <span class="text-silver-400"> — </span>
          <span class="text-silver-300">{{ entry.definition }}</span>
        </li>
      </ul>
    </div>

    <!-- Historical Significance -->
    <div class="border-l-2 border-amber-600/70 pl-4">
      <h4 class="text-xs font-mono uppercase tracking-wider text-amber-700 mb-1.5">Historical Significance</h4>
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.significance.content }}</p>
    </div>
  </div>
</template>
