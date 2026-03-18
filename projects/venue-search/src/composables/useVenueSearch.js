import { ref, computed } from 'vue'
import { searchVenues } from '../services/venue-data.js'

const query = ref({
  area: 'all',
  guests: null,
  date: '',
  eventType: 'all',
})

const results = ref([])
const hasSearched = ref(false)

export function useVenueSearch() {
  const loading = ref(false)

  function search() {
    loading.value = true
    hasSearched.value = true

    // Simulate brief delay for UX
    setTimeout(() => {
      results.value = searchVenues({
        area: query.value.area,
        guests: query.value.guests ? Number(query.value.guests) : null,
        eventType: query.value.eventType,
      })
      loading.value = false
    }, 200)
  }

  function reset() {
    query.value = { area: 'all', guests: null, date: '', eventType: 'all' }
    results.value = []
    hasSearched.value = false
  }

  const resultCount = computed(() => results.value.length)

  return {
    query,
    results,
    loading,
    hasSearched,
    resultCount,
    search,
    reset,
  }
}
