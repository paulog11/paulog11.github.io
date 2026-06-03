import { ref, computed } from 'vue'
import { reviewApi } from '../services/apiClient.js'

export function useReview() {
  const dueItems = ref([])
  const index    = ref(0)
  const loading  = ref(false)
  const error    = ref(null)
  const revealed = ref(false)
  const reviewedToday = ref(0)

  const current = computed(() => dueItems.value[index.value] ?? null)
  const total   = computed(() => dueItems.value.length)
  const done    = computed(() => index.value >= dueItems.value.length)

  async function loadDue() {
    loading.value = true
    error.value = null
    try {
      const data = await reviewApi.due(30)
      dueItems.value = data.items
      index.value = 0
      revealed.value = false
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function reveal() {
    revealed.value = true
  }

  async function grade(rating, elapsedMs) {
    if (!current.value) return
    const itemId = current.value.id
    try {
      await reviewApi.grade(itemId, rating, elapsedMs)
      reviewedToday.value += 1
      index.value += 1
      revealed.value = false
    } catch (e) {
      error.value = e.message
    }
  }

  return { dueItems, index, current, total, done, loading, error, revealed, reviewedToday, loadDue, reveal, grade }
}
