<script setup>
const props = defineProps({
  timelineData: { type: Object, required: true },
  chapters: { type: Array, required: true },
})

const brothers = [
  { key: 'dmitri', label: 'Dmitri' },
  { key: 'ivan', label: 'Ivan' },
  { key: 'alyosha', label: 'Alyosha' },
]

const toneColors = {
  conflict: 'bg-red-400',
  growth: 'bg-emerald-400',
  neutral: 'bg-silver-400',
  revelation: 'bg-gold-400',
  suffering: 'bg-amber-400',
}

function toneColor(tone) {
  return toneColors[tone] || 'bg-silver-400'
}

function getEvent(brotherKey, chapterId) {
  const events = props.timelineData[brotherKey]
  if (!events) return null
  return events.find((e) => e.chapterId === chapterId) || null
}

function brothersInChapter(chapterId) {
  return brothers.filter((b) => getEvent(b.key, chapterId)).length
}
</script>

<template>
  <div class="overflow-x-auto">
    <div class="min-w-[600px]">
      <!-- Header -->
      <div
        class="grid grid-cols-[100px_1fr_1fr_1fr] gap-0 mb-2 pb-2 border-b border-forest-700 sticky top-0 bg-forest-950 z-10"
      >
        <div></div>
        <div
          v-for="brother in brothers"
          :key="brother.key"
          class="text-center font-serif text-gold-400 font-bold text-sm"
        >
          {{ brother.label }}
        </div>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap gap-3 mb-4 px-1">
        <div v-for="(cls, tone) in toneColors" :key="tone" class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full" :class="cls"></span>
          <span class="text-[10px] text-silver-500 font-mono uppercase">{{ tone }}</span>
        </div>
      </div>

      <!-- Chapter rows -->
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        class="grid grid-cols-[100px_1fr_1fr_1fr] gap-0 relative"
      >
        <!-- Chapter label -->
        <div
          class="text-[10px] text-silver-500 font-mono pr-2 py-3 text-right leading-tight"
          :title="chapter.title"
        >
          {{ chapter.id }}
        </div>

        <!-- Lane per brother -->
        <div
          v-for="brother in brothers"
          :key="brother.key"
          class="relative flex items-start justify-center py-3 min-h-[48px]"
        >
          <!-- Vertical track line -->
          <div
            class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
            :class="getEvent(brother.key, chapter.id) ? 'bg-forest-600' : 'bg-forest-800'"
          ></div>

          <!-- Dot + label -->
          <div
            v-if="getEvent(brother.key, chapter.id)"
            class="relative z-10 flex flex-col items-center gap-1 animate-fade-in"
          >
            <span
              class="w-3 h-3 rounded-full border-2 border-forest-900 flex-shrink-0"
              :class="toneColor(getEvent(brother.key, chapter.id).tone)"
            ></span>
            <span class="text-[11px] text-silver-300 text-center max-w-[140px] leading-tight">
              {{ getEvent(brother.key, chapter.id).label }}
            </span>
          </div>
        </div>

        <!-- Horizontal connector when 2+ brothers interact -->
        <div
          v-if="brothersInChapter(chapter.id) >= 2"
          class="absolute left-[100px] right-0 top-[22px] border-t border-dashed border-silver-500/20 pointer-events-none"
        ></div>
      </div>
    </div>
  </div>
</template>
