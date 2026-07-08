<script setup>
import CardFrame from './CardFrame.vue'
import CardSection from './CardSection.vue'
import CardCallout from './CardCallout.vue'
import CardParagraphs from './CardParagraphs.vue'

defineProps({
  concept: { type: Object, required: true },
})
</script>

<template>
  <CardFrame :title="concept.title" :label="concept.label" :subtitle="concept.subtitle">
    <CardSection title="Summary">
      <CardParagraphs :content="concept.steps.summary.content" />
    </CardSection>

    <CardSection title="Key Figures">
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
    </CardSection>

    <CardSection title="Key Terms">
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
    </CardSection>

    <CardCallout title="Historical Significance" tone="amber">
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.significance.content }}</p>
    </CardCallout>
  </CardFrame>
</template>
