<script setup>
import { computed, ref } from 'vue'
import { useBookProgress } from '../composables/useBookProgress.js'
import AppShell from './AppShell.vue'
import ChapterTracker from './ChapterTracker.vue'
import BookPage from './BookPage.vue'

const props = defineProps({
  bookData: { type: Object, required: true },
})

const emit = defineEmits(['home'])

const {
  book,
  unlockedChapterIds,
  unlockChapter,
  resetProgress,
  nextChapter,
  progress,
  characterProfiles,
  brothersTimeline,
  unlockedChaptersFlat,
} = useBookProgress(props.bookData)

const hasStarted = computed(() => unlockedChapterIds.value.size > 0)
const showResetConfirm = ref(false)

function handleUnlockNext() {
  if (nextChapter.value) {
    unlockChapter(nextChapter.value.id)
  }
}

function handleReset() {
  resetProgress()
  showResetConfirm.value = false
}
</script>

<template>
  <AppShell
    :book="book"
    :sidebar-enabled="hasStarted"
    sidebar-toggle-label="Toggle chapters"
    @home="emit('home')"
  >
    <template #header-actions>
      <button
        v-if="hasStarted && !showResetConfirm"
        @click="showResetConfirm = true"
        class="text-xs text-silver-500 hover:text-silver-300 transition-colors px-2 py-1"
      >
        Reset
      </button>
      <div v-if="showResetConfirm" class="flex items-center gap-2">
        <span class="text-xs text-silver-400">Reset progress?</span>
        <button
          @click="handleReset"
          class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
        >
          Yes
        </button>
        <button
          @click="showResetConfirm = false"
          class="text-xs text-silver-500 hover:text-silver-300 px-2 py-1"
        >
          No
        </button>
      </div>
    </template>

    <template #sidebar>
      <ChapterTracker
        :books="book.books"
        :unlockedChapterIds="unlockedChapterIds"
        :nextChapterId="nextChapter?.id"
        @unlock="unlockChapter"
      />
    </template>

    <BookPage
      :book="book"
      :characterProfiles="characterProfiles"
      :progress="progress"
      :nextChapter="nextChapter"
      :hasStarted="hasStarted"
      :brothersTimeline="brothersTimeline"
      :unlockedChapters="unlockedChaptersFlat"
      @unlock-next="handleUnlockNext"
    />
  </AppShell>
</template>
