<script setup>
import CardFrame from './CardFrame.vue'
import CardSection from './CardSection.vue'
import CardCallout from './CardCallout.vue'
import CardParagraphs from './CardParagraphs.vue'
import CardBulletList from './CardBulletList.vue'

defineProps({
  concept: { type: Object, required: true },
  commentsLabel: { type: String, default: 'Notes' },
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

    <CardCallout
      v-if="concept.steps.culturalGap?.applicable"
      title="Cultural Gap"
      tone="amber"
    >
      <p class="text-silver-300 text-sm leading-relaxed">{{ concept.steps.culturalGap.content }}</p>
    </CardCallout>

    <CardCallout title="Trigger" tone="gold">
      <p class="text-silver-300 text-sm leading-relaxed italic">{{ concept.steps.trigger.content }}</p>
    </CardCallout>

    <!-- Comments -->
    <div class="border border-forest-600/50 rounded-lg p-4 bg-forest-800/30">
      <h4 class="text-xs font-mono uppercase tracking-wider text-silver-400 mb-2">{{ commentsLabel }}</h4>
      <p v-if="concept.comment" class="text-silver-200 text-sm leading-relaxed">{{ concept.comment }}</p>
      <p v-else class="text-silver-600 text-sm italic">No notes yet.</p>
    </div>
  </CardFrame>
</template>
