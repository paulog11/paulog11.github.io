<script setup>
import { computed } from 'vue'
import { getPlatformLinks } from '../services/platform-links.js'

const props = defineProps({
  area: String,
  eventType: String,
  hasSearched: Boolean,
})

const links = computed(() => {
  const area = props.area === 'all' ? null : props.area
  const eventType = props.eventType === 'all' ? null : props.eventType
  return getPlatformLinks(area, eventType)
})
</script>

<template>
  <div v-if="hasSearched" class="bg-white/60 rounded-xl border border-sand p-5">
    <h3 class="text-xs font-medium text-muted uppercase tracking-wide mb-3">
      Search on platforms
    </h3>
    <p class="text-xs text-muted mb-4">
      Open filtered search results directly on these venue platforms{{ area && area !== 'all' ? ` for ${area}` : '' }}.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <a
        v-for="link in links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-3 p-4 rounded-lg border border-sand bg-white hover:shadow-md hover:border-steel-light transition-all duration-200"
      >
        <div
          class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
          :style="{ backgroundColor: link.color }"
        >
          {{ link.name[0] }}
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="text-sm font-medium text-ink">{{ link.name }}</span>
            <svg class="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <span class="text-[11px] text-muted">{{ link.nameJa }} · {{ link.description }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
