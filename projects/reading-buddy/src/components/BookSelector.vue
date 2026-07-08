<script setup>
import BookCover from './BookCover.vue'

const appVersion = __APP_VERSION__

defineProps({
  books: { type: Array, required: true },
})

const emit = defineEmits(['select'])

const typeLabels = {
  narrative: 'Novel',
  concepts: 'Cultural Guide',
}

function bookTypeLabel(book) {
  return book.typeLabel || typeLabels[book.type] || book.type
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6">
    <div class="text-center mb-10">
      <h1 class="font-serif text-3xl text-silver-100 mb-2">Reading Buddy</h1>
      <p class="font-mono text-xs text-silver-500 mt-1">v{{ appVersion }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
      <button
        v-for="book in books"
        :key="book.id"
        @click="emit('select', book.id)"
        class="group text-left bg-forest-900/60 hover:bg-forest-800/80 border border-forest-700/50 hover:border-gold-400/40 rounded-xl p-6 transition-all duration-200"
      >
        <div class="mb-3">
          <BookCover :book="book" size="sm" />
        </div>
        <h2 class="font-serif text-lg text-silver-100 group-hover:text-gold-400 transition-colors mb-1">
          {{ book.title }}
        </h2>
        <p class="text-silver-500 text-xs mb-3">{{ book.author }}</p>
        <span class="inline-block text-[10px] font-mono uppercase tracking-wider text-silver-400 bg-forest-800 px-2 py-0.5 rounded">
          {{ bookTypeLabel(book) }}
        </span>
        <p class="text-silver-400 text-sm mt-3 leading-relaxed">
          {{ book.description }}
        </p>
      </button>
    </div>
  </div>
</template>
