<script setup>
defineProps({
  venue: Object,
})

const typeLabels = {
  party: 'Party',
  wedding: 'Wedding',
  corporate: 'Corporate',
  workshop: 'Workshop',
  meetup: 'Meetup',
  photoshoot: 'Photoshoot',
}

const amenityIcons = {
  kitchen: '🍳',
  projector: '📽',
  'sound-system': '🔊',
  wifi: '📶',
  terrace: '🌿',
  whiteboard: '📋',
  bar: '🍸',
  stage: '🎭',
  lighting: '💡',
  'drinks-included': '☕',
  '3d-printer': '🖨',
  'laser-cutter': '✂️',
}

function formatPrice(hourly) {
  return '¥' + hourly.toLocaleString()
}
</script>

<template>
  <div class="bg-white/70 rounded-xl border border-sand p-5 hover:shadow-md hover:border-steel-light transition-all duration-200 flex flex-col">
    <!-- Header -->
    <div class="mb-3">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <h3 class="font-display font-semibold text-ink text-lg leading-tight truncate">{{ venue.name }}</h3>
          <p class="text-muted text-xs mt-0.5 font-body">{{ venue.nameJa }}</p>
        </div>
        <span class="shrink-0 text-xs font-medium px-2 py-1 rounded-md bg-steel-light text-steel">
          {{ venue.area }}
        </span>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-muted leading-relaxed mb-4 line-clamp-2 flex-grow">{{ venue.description }}</p>

    <!-- Stats -->
    <div class="flex items-center gap-4 text-xs text-muted mb-3">
      <span class="flex items-center gap-1">
        <span class="text-ink font-medium">{{ venue.capacity.min }}–{{ venue.capacity.max }}</span> people
      </span>
      <span class="flex items-center gap-1">
        <span class="text-ink font-medium">{{ formatPrice(venue.priceRange.hourly) }}</span>/hr
      </span>
    </div>

    <!-- Types -->
    <div class="flex flex-wrap gap-1.5 mb-3">
      <span
        v-for="type in venue.types"
        :key="type"
        class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-light text-accent"
      >
        {{ typeLabels[type] || type }}
      </span>
    </div>

    <!-- Amenities -->
    <div class="flex flex-wrap gap-1 mb-4 text-xs">
      <span
        v-for="amenity in venue.amenities"
        :key="amenity"
        class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-paper text-muted"
        :title="amenity"
      >
        <span>{{ amenityIcons[amenity] || '•' }}</span>
        <span class="text-[10px]">{{ amenity }}</span>
      </span>
    </div>

    <!-- Action -->
    <a
      :href="venue.sourceUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-auto inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-sm font-medium text-accent border border-accent/20 rounded-lg hover:bg-accent hover:text-white transition-colors"
    >
      View listing
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</template>
