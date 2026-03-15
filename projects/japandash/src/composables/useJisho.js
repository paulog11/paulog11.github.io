import { ref } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { searchWords } from '../services/jisho-api.js'

export function useJisho() {
  const query = ref('')
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  const recentSearches = useLocalStorage('japandash:jisho-recent', [])

  let debounceTimer = null

  function search(keyword) {
    query.value = keyword
    clearTimeout(debounceTimer)
    if (!keyword.trim()) {
      results.value = []
      return
    }
    debounceTimer = setTimeout(() => doSearch(keyword.trim()), 300)
  }

  async function doSearch(keyword) {
    loading.value = true
    error.value = null
    try {
      results.value = await searchWords(keyword)
      // Add to recent searches
      const recent = recentSearches.value.filter(s => s !== keyword)
      recent.unshift(keyword)
      recentSearches.value = recent.slice(0, 10)
    } catch (e) {
      error.value = e.message
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { query, results, loading, error, recentSearches, search }
}
