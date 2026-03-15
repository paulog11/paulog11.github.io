import { ref, computed, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { fetchUser, fetchSummary, fetchAllAssignments } from '../services/wanikani-api.js'

export function useWaniKani() {
  const apiKey = useLocalStorage('japandash:wanikani-key', '')
  const user = ref(null)
  const summary = ref(null)
  const assignments = ref([])
  const loading = ref(false)
  const error = ref(null)

  const hasKey = computed(() => !!apiKey.value)

  const srsDistribution = computed(() => {
    const dist = { apprentice: 0, guru: 0, master: 0, enlightened: 0, burned: 0 }
    for (const a of assignments.value) {
      const stage = a.data?.srs_stage ?? -1
      if (stage >= 1 && stage <= 4) dist.apprentice++
      else if (stage >= 5 && stage <= 6) dist.guru++
      else if (stage === 7) dist.master++
      else if (stage === 8) dist.enlightened++
      else if (stage === 9) dist.burned++
    }
    return dist
  })

  const reviewsAvailable = computed(() => {
    if (!summary.value) return 0
    const now = new Date()
    return summary.value.reviews
      ?.filter(r => new Date(r.available_at) <= now)
      .reduce((sum, r) => sum + r.subject_ids.length, 0) ?? 0
  })

  const lessonsAvailable = computed(() => {
    if (!summary.value) return 0
    return summary.value.lessons
      ?.reduce((sum, l) => sum + l.subject_ids.length, 0) ?? 0
  })

  const upcomingReviews = computed(() => {
    if (!summary.value?.reviews) return []
    const now = new Date()
    return summary.value.reviews
      .filter(r => new Date(r.available_at) > now)
      .slice(0, 12)
      .map(r => ({
        time: new Date(r.available_at),
        count: r.subject_ids.length,
      }))
  })

  async function refresh() {
    if (!apiKey.value) return
    loading.value = true
    error.value = null
    try {
      const [u, s, a] = await Promise.all([
        fetchUser(apiKey.value),
        fetchSummary(apiKey.value),
        fetchAllAssignments(apiKey.value),
      ])
      user.value = u
      summary.value = s
      assignments.value = a
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  // Auto-refresh when key changes
  watch(apiKey, (val) => {
    if (val) refresh()
  }, { immediate: true })

  return {
    apiKey,
    hasKey,
    user,
    summary,
    srsDistribution,
    reviewsAvailable,
    lessonsAvailable,
    upcomingReviews,
    loading,
    error,
    refresh,
  }
}
