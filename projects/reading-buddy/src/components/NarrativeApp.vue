<script setup>
import { computed, ref } from 'vue'
import { useBookProgress } from '../composables/useBookProgress.js'
import ChapterTracker from './ChapterTracker.vue'
import BookPage from './BookPage.vue'

const props = defineProps({
  bookData: { type: Object, required: true },
})

const emit = defineEmits(['home'])

const {
  book,
  allChapters,
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
const showSidebar = ref(true)
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
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-forest-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-3">
        <button
          v-if="hasStarted"
          @click="showSidebar = !showSidebar"
          class="lg:hidden text-silver-400 hover:text-silver-200 transition-colors p-1"
          aria-label="Toggle chapters"
        >
          <span class="text-lg">&#9776;</span>
        </button>
        <div>
          <h1 class="font-serif text-lg text-silver-100 leading-tight">
            {{ book.title }}
          </h1>
          <p class="text-silver-500 text-xs">{{ book.author }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="emit('home')"
          class="text-xs text-silver-500 hover:text-silver-300 transition-colors px-2 py-1"
        >&larr; Home</button>
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
      </div>
    </header>

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Transition name="sidebar">
        <aside
          v-if="hasStarted && showSidebar"
          class="w-72 flex-shrink-0 border-r border-forest-800 overflow-y-auto p-4 bg-forest-950 max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:z-10 max-lg:top-[53px]"
        >
          <ChapterTracker
            :books="book.books"
            :unlockedChapterIds="unlockedChapterIds"
            :nextChapterId="nextChapter?.id"
            @unlock="unlockChapter"
          />
        </aside>
      </Transition>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-8">
        <div class="max-w-5xl mx-auto">
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
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
