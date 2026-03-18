<script setup>
import VenueCard from './VenueCard.vue'

defineProps({
  venues: Array,
  loading: Boolean,
  hasSearched: Boolean,
})
</script>

<template>
  <!-- Loading -->
  <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    <div
      v-for="i in 6"
      :key="i"
      class="bg-white/40 rounded-xl border border-sand p-5 animate-pulse"
    >
      <div class="h-5 bg-sand rounded w-3/4 mb-2"></div>
      <div class="h-3 bg-sand rounded w-1/3 mb-4"></div>
      <div class="h-3 bg-sand rounded w-full mb-2"></div>
      <div class="h-3 bg-sand rounded w-5/6 mb-4"></div>
      <div class="h-8 bg-sand rounded w-1/2"></div>
    </div>
  </div>

  <!-- Results -->
  <div v-else-if="venues.length > 0">
    <p class="text-sm text-muted mb-4">
      {{ venues.length }} venue{{ venues.length === 1 ? '' : 's' }} found
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <VenueCard
        v-for="venue in venues"
        :key="venue.id"
        :venue="venue"
        class="animate-fade-in"
      />
    </div>
  </div>

  <!-- Empty state after search -->
  <div v-else-if="hasSearched" class="text-center py-16">
    <p class="text-4xl mb-3">🏢</p>
    <p class="text-ink font-display text-lg">No venues match your criteria</p>
    <p class="text-muted text-sm mt-1">Try broadening your search — fewer filters or a different area.</p>
  </div>

  <!-- Initial state -->
  <div v-else class="text-center py-16">
    <p class="text-4xl mb-3">🔍</p>
    <p class="text-ink font-display text-lg">Search for event spaces in Tokyo</p>
    <p class="text-muted text-sm mt-1">Enter your criteria above and hit search to find venues.</p>
  </div>
</template>
