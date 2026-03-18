import { ref, computed } from 'vue'

const sortBy = ref('relevance')
const maxPrice = ref(null)
const selectedAmenities = ref([])

export function useFilters(results) {
  const filtered = computed(() => {
    let list = [...results.value]

    if (maxPrice.value) {
      list = list.filter((v) => v.priceRange.hourly <= maxPrice.value)
    }

    if (selectedAmenities.value.length > 0) {
      list = list.filter((v) =>
        selectedAmenities.value.every((a) => v.amenities.includes(a))
      )
    }

    if (sortBy.value === 'price-asc') {
      list.sort((a, b) => a.priceRange.hourly - b.priceRange.hourly)
    } else if (sortBy.value === 'price-desc') {
      list.sort((a, b) => b.priceRange.hourly - a.priceRange.hourly)
    } else if (sortBy.value === 'capacity') {
      list.sort((a, b) => b.capacity.max - a.capacity.max)
    }

    return list
  })

  function resetFilters() {
    sortBy.value = 'relevance'
    maxPrice.value = null
    selectedAmenities.value = []
  }

  return {
    sortBy,
    maxPrice,
    selectedAmenities,
    filtered,
    resetFilters,
  }
}
