import { computed } from 'vue'

export function useConceptProgress(book) {
  const allConcepts = computed(() => book.concepts)

  return {
    book,
    allConcepts,
  }
}
