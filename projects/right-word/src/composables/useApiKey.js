import { ref, computed } from 'vue'

const STORAGE_KEY = 'nihongo_api_key'

export function useApiKey() {
  const apiKey = ref(localStorage.getItem(STORAGE_KEY) || '')

  const hasKey = computed(() => apiKey.value.length > 0)

  function saveKey(val) {
    apiKey.value = val
    localStorage.setItem(STORAGE_KEY, val)
  }

  function clearKey() {
    apiKey.value = ''
    localStorage.removeItem(STORAGE_KEY)
  }

  return { apiKey, hasKey, saveKey, clearKey }
}
