<script setup>
import { computed } from 'vue'

const props = defineProps({
  books: { type: Array, required: true },
  unlockedChapterIds: { type: Set, required: true },
  nextChapterId: { type: String, default: null },
})

const emit = defineEmits(['unlock'])

function isUnlocked(chapterId) {
  return props.unlockedChapterIds.has(chapterId)
}

function isNext(chapterId) {
  return chapterId === props.nextChapterId
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="section in books" :key="section.id">
      <h3 class="font-serif text-sm text-silver-300 font-bold mb-2 px-1">
        {{ section.title }}
      </h3>
      <ul class="space-y-0.5">
        <li v-for="chapter in section.chapters" :key="chapter.id">
          <button
            @click="isNext(chapter.id) && emit('unlock', chapter.id)"
            :class="[
              'w-full text-left px-3 py-2 rounded text-sm transition-all flex items-center gap-2',
              isUnlocked(chapter.id)
                ? 'bg-forest-800/50 text-silver-300'
                : isNext(chapter.id)
                  ? 'bg-forest-800 text-silver-100 ring-1 ring-gold-400/50 cursor-pointer hover:ring-gold-400'
                  : 'text-silver-500/40 cursor-not-allowed',
            ]"
            :disabled="!isNext(chapter.id)"
          >
            <!-- Icon -->
            <span class="flex-shrink-0 w-5 text-center">
              <span v-if="isUnlocked(chapter.id)" class="text-forest-500">&#10003;</span>
              <span v-else-if="isNext(chapter.id)" class="text-gold-400 text-xs">&#9654;</span>
              <span v-else class="text-silver-500/30 text-xs">&#9679;</span>
            </span>
            <!-- Title -->
            <span class="truncate">{{ chapter.title }}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
