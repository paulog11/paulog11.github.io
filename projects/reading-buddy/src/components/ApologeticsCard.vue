<script setup>
import CardFrame from './CardFrame.vue'
import CardSection from './CardSection.vue'
import CardCallout from './CardCallout.vue'
import CardParagraphs from './CardParagraphs.vue'
import CardBulletList from './CardBulletList.vue'

defineProps({
  concept: { type: Object, required: true },
})
</script>

<template>
  <CardFrame :title="concept.title" :label="concept.label" :subtitle="concept.subtitle">
    <CardSection title="Summary">
      <CardParagraphs :content="concept.steps.summary.content" />
    </CardSection>

    <CardSection title="Examples">
      <CardBulletList :items="concept.steps.examples.items" />
    </CardSection>

    <CardCallout title="The Argument" tone="amber">
      <CardParagraphs
        :content="concept.steps.argument.content"
        paragraph-class="text-silver-300 text-sm leading-relaxed"
      />
    </CardCallout>

    <CardCallout title="Objection &amp; Response" tone="gold">
      <p class="text-silver-400 text-sm leading-relaxed italic mb-2">"{{ concept.steps.objection.challenge }}"</p>
      <p class="text-xs font-mono uppercase tracking-wider text-silver-600 mb-1">Lewis's Response</p>
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.objection.response }}</p>
    </CardCallout>

    <!-- Key Quote -->
    <div class="border border-forest-600/50 rounded-lg p-4 bg-forest-800/30">
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">Key Quote</h4>
      <p class="text-silver-200 text-sm leading-relaxed font-serif italic">{{ concept.steps.quote.content }}</p>
    </div>
  </CardFrame>
</template>
