<script setup>
import { getEventTypes } from '../services/venue-data.js'
import { getAvailableAreas } from '../services/platform-links.js'

const props = defineProps({
  query: Object,
})

const emit = defineEmits(['search', 'reset'])

const areas = getAvailableAreas()
const eventTypes = getEventTypes()

const typeLabels = {
  party: 'Party',
  wedding: 'Wedding',
  corporate: 'Corporate',
  workshop: 'Workshop',
  meetup: 'Meetup',
  photoshoot: 'Photoshoot',
}

function handleSubmit() {
  emit('search')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white/60 rounded-xl border border-sand p-5 space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Area -->
      <div class="space-y-1.5">
        <label class="block text-xs font-medium text-muted uppercase tracking-wide">Area / Station</label>
        <select
          v-model="query.area"
          class="w-full rounded-lg border border-sand bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        >
          <option value="all">All areas</option>
          <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
        </select>
      </div>

      <!-- Guests -->
      <div class="space-y-1.5">
        <label class="block text-xs font-medium text-muted uppercase tracking-wide">Guests</label>
        <input
          v-model.number="query.guests"
          type="number"
          min="1"
          max="1000"
          placeholder="Number of people"
          class="w-full rounded-lg border border-sand bg-white px-3 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
      </div>

      <!-- Date -->
      <div class="space-y-1.5">
        <label class="block text-xs font-medium text-muted uppercase tracking-wide">Date</label>
        <input
          v-model="query.date"
          type="date"
          class="w-full rounded-lg border border-sand bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
      </div>

      <!-- Event Type -->
      <div class="space-y-1.5">
        <label class="block text-xs font-medium text-muted uppercase tracking-wide">Event Type</label>
        <select
          v-model="query.eventType"
          class="w-full rounded-lg border border-sand bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        >
          <option value="all">All types</option>
          <option v-for="type in eventTypes" :key="type" :value="type">
            {{ typeLabels[type] || type }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30"
      >
        Search venues
      </button>
      <button
        type="button"
        @click="emit('reset')"
        class="px-4 py-2.5 text-sm text-muted hover:text-ink transition-colors"
      >
        Reset
      </button>
    </div>
  </form>
</template>
