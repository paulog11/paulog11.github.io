import { ref, computed } from 'vue'

export function useBookProgress(book) {
  const storageKey = `reading-buddy:${book.id}`

  // Load persisted state
  function loadUnlocked() {
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return new Set()
      const ids = JSON.parse(stored)
      // Validate that stored IDs actually exist in the book
      const validIds = getAllChapterIds()
      return new Set(ids.filter((id) => validIds.has(id)))
    } catch {
      return new Set()
    }
  }

  function getAllChapterIds() {
    const ids = new Set()
    for (const section of book.books) {
      for (const chapter of section.chapters) {
        ids.add(chapter.id)
      }
    }
    return ids
  }

  // Flat ordered list of all chapters
  const allChapters = computed(() => {
    const chapters = []
    for (const section of book.books) {
      for (const chapter of section.chapters) {
        chapters.push({ ...chapter, bookTitle: section.title })
      }
    }
    return chapters
  })

  const unlockedChapterIds = ref(loadUnlocked())

  function persist() {
    localStorage.setItem(
      storageKey,
      JSON.stringify([...unlockedChapterIds.value])
    )
  }

  function unlockChapter(chapterId) {
    const chapters = allChapters.value
    const targetIndex = chapters.findIndex((c) => c.id === chapterId)
    if (targetIndex < 0) return

    // Ensure all prior chapters are unlocked (sequential enforcement)
    for (let i = 0; i < targetIndex; i++) {
      if (!unlockedChapterIds.value.has(chapters[i].id)) return
    }

    unlockedChapterIds.value = new Set([
      ...unlockedChapterIds.value,
      chapterId,
    ])
    persist()
  }

  function resetProgress() {
    unlockedChapterIds.value = new Set()
    localStorage.removeItem(storageKey)
  }

  const nextChapter = computed(() => {
    return allChapters.value.find(
      (c) => !unlockedChapterIds.value.has(c.id)
    ) || null
  })

  const progress = computed(() => {
    const total = allChapters.value.length
    if (total === 0) return 0
    return unlockedChapterIds.value.size / total
  })

  // Characters visible so far, in introduction order
  const visibleCharacterKeys = computed(() => {
    const keys = []
    const seen = new Set()
    for (const chapter of allChapters.value) {
      if (!unlockedChapterIds.value.has(chapter.id)) continue
      for (const key of chapter.introduces) {
        if (!seen.has(key)) {
          seen.add(key)
          keys.push(key)
        }
      }
    }
    return keys
  })

  function getCharacterProfile(key) {
    const base = book.characters[key]
    if (!base) return null

    const descriptions = []
    const traits = new Set()
    const relationships = []
    const events = []

    for (const chapter of allChapters.value) {
      if (!unlockedChapterIds.value.has(chapter.id)) continue
      const details = chapter.characterDetails[key]
      if (!details) continue

      if (details.description) descriptions.push(details.description)
      if (details.traits) details.traits.forEach((t) => traits.add(t))
      if (details.relationships) {
        for (const r of details.relationships) {
          const existing = relationships.findIndex(
            (e) => e.to === r.to && e.type === r.type
          )
          if (existing >= 0) relationships[existing] = r
          else relationships.push(r)
        }
      }
      if (details.events) events.push(...details.events)
    }

    return {
      ...base,
      key,
      description: descriptions[descriptions.length - 1] || '',
      traits: [...traits],
      relationships,
      events,
    }
  }

  const characterProfiles = computed(() => {
    return visibleCharacterKeys.value.map((key) => getCharacterProfile(key))
  })

  return {
    book,
    allChapters,
    unlockedChapterIds,
    unlockChapter,
    resetProgress,
    nextChapter,
    progress,
    visibleCharacterKeys,
    characterProfiles,
  }
}
