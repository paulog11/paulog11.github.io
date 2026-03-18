<script setup>
import { getAmenities } from '../services/venue-data.js'

const props = defineProps({
  sortBy: String,
  maxPrice: Number,
  selectedAmenities: Array,
  hasResults: Boolean,
})

const emit = defineEmits(['update:sortBy', 'update:maxPrice', 'update:selectedAmenities', 'reset'])

const amenities = getAmenities()

const priceOptions = [
  { label: 'Any price', value: null },
  { label: 'Under ¥10,000/hr', value: 10000 },
  { label: 'Under ¥30,000/hr', value: 30000 },
  { label: 'Under ¥80,000/hr', value: 80000 },
  { label: 'Under ¥150,000/hr', value: 150000 },
]

function toggleAmenity(amenity) {
  const current = [...props.selectedAmenities]
  const idx = current.indexOf(amenity)
  if (idx >= 0) {
    current.splice(idx, 1)
  } else {
    current.push(amenity)
  }
  emit('update:selectedAmenities', current)
}
</script>

<template>
  <div v-if="hasResults" class="bg-white/40 rounded-xl border border-sand p-4 space-y-3">
    <div class="flex flex-wrap items-center gap-4">
      <!-- Sort -->
      <div class="flex items-center gap-2">
        <label class="text-xs text-muted whitespace-nowrap">Sort by</label>
        <select
          :value="sortBy"
          @change="emit('update:sortBy', $event.target.value)"
          class="rounded-md border border-sand bg-white px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-accent/30"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="capacity">Capacity: largest first</option>
        </select>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2">
        <label class="text-xs text-muted whitespace-nowrap">Budget</label>
        <select
          :value="maxPrice"
          @change="emit('update:maxPrice', $event.target.value ? Number($event.target.value) : null)"
          class="rounded-md border border-sand bg-white px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-accent/30"
        >
          <option v-for="opt in priceOptions" :key="opt.label" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Reset filters -->
      <button
        @click="emit('reset')"
        class="text-xs text-muted hover:text-ink transition-colors ml-auto"
      >
        Reset filters
      </button>
    </div>

    <!-- Amenities -->
    <div class="flex flex-wrap gap-1.5">
      <button
        v-for="amenity in amenities"
        :key="amenity"
        @click="toggleAmenity(amenity)"
        :class="[
          'text-[11px] px-2.5 py-1 rounded-full border transition-colors',
          selectedAmenities.includes(amenity)
            ? 'bg-accent text-white border-accent'
            : 'bg-white text-muted border-sand hover:border-steel-light'
        ]"
      >
        {{ amenity }}
      </button>
    </div>
  </div>
</template>
