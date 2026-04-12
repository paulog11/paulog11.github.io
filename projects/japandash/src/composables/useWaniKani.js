import { ref, computed, watch } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { fetchUser, fetchSummary, fetchAllAssignments, fetchSubjects } from '../services/wanikani-api.js'

export function useWaniKani() {
  const apiKey = useLocalStorage('japandash:wanikani-key', '')
  const user = ref(null)
  const summary = ref(null)
  const assignments = ref([])
  const loading = ref(false)
  const error = ref(null)

  const hasKey = computed(() => !!apiKey.value)

  // Vocabulary + audio state
  const learnedVocabulary = ref([])
  const vocabLoading = ref(false)
  const vocabError = ref(null)
  const vocabCache = useLocalStorage('japandash:wanikani-vocab-cache-v2', null)

  const SRS_LABELS = {
    1: 'apprentice', 2: 'apprentice', 3: 'apprentice', 4: 'apprentice',
    5: 'guru', 6: 'guru',
    7: 'master',
    8: 'enlightened',
    9: 'burned',
  }

  function mergeVocabItem(assignment, subject) {
    const sd = subject.data
    const ad = assignment.data
    const primaryMeaning = sd.meanings?.find(m => m.primary)?.meaning ?? sd.meanings?.[0]?.meaning ?? ''
    const primaryReading = sd.readings?.find(r => r.primary)?.reading ?? sd.readings?.[0]?.reading ?? ''
    const audios = (sd.pronunciation_audios ?? []).map(a => ({
      url: a.url,
      contentType: a.content_type,
      gender: a.metadata?.gender ?? null,
      voiceActorName: a.metadata?.voice_actor_name ?? null,
      pronunciation: a.metadata?.pronunciation ?? primaryReading,
    }))
    return {
      subjectId: subject.id,
      srsStage: ad.srs_stage,
      srsLabel: SRS_LABELS[ad.srs_stage] ?? 'apprentice',
      level: sd.level,
      characters: sd.characters,
      primaryMeaning,
      meanings: sd.meanings?.map(m => m.meaning) ?? [],
      primaryReading,
      readings: sd.readings ?? [],
      audios,
      contextSentences: (sd.context_sentences ?? []).map(s => ({ ja: s.ja, en: s.en })),
    }
  }

  async function fetchLearnedVocabulary(forceRefresh = false) {
    if (!apiKey.value || assignments.value.length === 0) return

    const cached = vocabCache.value
    if (
      !forceRefresh &&
      cached &&
      cached.userId === user.value?.username &&
      Date.now() - new Date(cached.fetchedAt).getTime() < 24 * 60 * 60 * 1000
    ) {
      learnedVocabulary.value = cached.items
      return
    }

    vocabLoading.value = true
    vocabError.value = null
    try {
      const vocabAssignments = assignments.value.filter(
        a => a.data?.subject_type === 'vocabulary' && a.data?.started_at != null
      )

      const subjectIds = vocabAssignments.map(a => a.data.subject_id)
      const chunks = []
      for (let i = 0; i < subjectIds.length; i += 1000) {
        chunks.push(subjectIds.slice(i, i + 1000))
      }

      const subjectResults = await Promise.all(
        chunks.map(chunk =>
          fetchSubjects(apiKey.value, { types: 'vocabulary', subject_ids: chunk.join(',') })
        )
      )
      const subjects = subjectResults.flat()
      const subjectMap = Object.fromEntries(subjects.map(s => [s.id, s]))

      const merged = vocabAssignments
        .map(a => {
          const subject = subjectMap[a.data.subject_id]
          return subject ? mergeVocabItem(a, subject) : null
        })
        .filter(Boolean)
        .sort((a, b) => a.level - b.level || a.characters.localeCompare(b.characters))

      learnedVocabulary.value = merged
      vocabCache.value = {
        fetchedAt: new Date().toISOString(),
        userId: user.value?.username,
        items: merged,
      }
    } catch (e) {
      vocabError.value = e.message
    } finally {
      vocabLoading.value = false
    }
  }

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
    assignments,
    srsDistribution,
    reviewsAvailable,
    lessonsAvailable,
    upcomingReviews,
    loading,
    error,
    refresh,
    learnedVocabulary,
    vocabLoading,
    vocabError,
    fetchLearnedVocabulary,
  }
}
