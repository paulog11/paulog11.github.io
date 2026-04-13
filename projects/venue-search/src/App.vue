<script setup>
import { useVenueSearch } from './composables/useVenueSearch.js'

const appVersion = __APP_VERSION__
import { useFilters } from './composables/useFilters.js'
import SearchForm from './components/SearchForm.vue'
import VenueList from './components/VenueList.vue'
import FilterBar from './components/FilterBar.vue'
import PlatformLinks from './components/PlatformLinks.vue'

const { query, results, loading, hasSearched, resultCount, search, reset } = useVenueSearch()
const { sortBy, maxPrice, selectedAmenities, filtered, resetFilters } = useFilters(results)

function handleReset() {
  reset()
  resetFilters()
}
</script>

<template>
  <div class="min-h-screen bg-paper">
    <!-- Header -->
    <header class="border-b border-sand bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="font-display font-bold text-xl text-ink">会場探し</h1>
          <p class="text-xs text-muted mt-0.5">Tokyo Venue Search <span class="font-mono text-sand">v{{ appVersion }}</span></p>
        </div>
        <div class="flex items-center gap-3">
          <span v-if="hasSearched" class="text-xs text-muted font-mono bg-paper px-2.5 py-1 rounded-md border border-sand">
            {{ resultCount }} curated venue{{ resultCount === 1 ? '' : 's' }}
          </span>
          <a href="../../../" class="font-mono text-xs text-muted hover:text-ink transition-colors">← Home</a>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
      <SearchForm :query="query" @search="search" @reset="handleReset" />

      <!-- Platform search links -->
      <PlatformLinks
        :area="query.area"
        :event-type="query.eventType"
        :has-searched="hasSearched"
      />

      <FilterBar
        :sort-by="sortBy"
        :max-price="maxPrice"
        :selected-amenities="selectedAmenities"
        :has-results="hasSearched && results.length > 0"
        @update:sort-by="sortBy = $event"
        @update:max-price="maxPrice = $event"
        @update:selected-amenities="selectedAmenities = $event"
        @reset="resetFilters"
      />

      <VenueList
        :venues="filtered"
        :loading="loading"
        :has-searched="hasSearched"
      />
    </main>

    <!-- Footer -->
    <footer class="border-t border-sand mt-12 py-6 text-center">
      <p class="text-xs text-muted">
        Curated venue data + direct links to Instabase & SpaceMarket.
      </p>
    </footer>
  </div>
</template>
