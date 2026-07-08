<script setup>
import { coverImages } from '../assets/coverImages.js'

defineProps({
  book: { type: Object, required: true },
  size: { type: String, default: 'sm' }, // 'sm' | 'lg'
})

const sizeClasses = {
  sm: { img: 'w-16 h-20 object-cover rounded shadow-sm', emoji: 'text-4xl' },
  lg: { img: 'w-24 h-32 object-cover rounded shadow-md', emoji: 'text-5xl' },
}
</script>

<template>
  <img
    v-if="coverImages[book.id]"
    :src="coverImages[book.id]"
    :alt="book.title"
    :class="sizeClasses[size].img"
  />
  <div v-else :class="sizeClasses[size].emoji">{{ book.coverEmoji || '&#128214;' }}</div>
</template>
