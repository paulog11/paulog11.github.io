<script setup>
import { ref, computed } from 'vue'
import BookSelector from './components/BookSelector.vue'
import NarrativeApp from './components/NarrativeApp.vue'
import ConceptApp from './components/ConceptApp.vue'
import brothersData from './data/brothers-karamazov.js'
import japaneseData from './data/japanese-mind.js'

const BOOKS = [brothersData, japaneseData]
const selectedId = ref(null)
const selectedBook = computed(() => BOOKS.find((b) => b.id === selectedId.value) || null)
</script>

<template>
  <BookSelector v-if="!selectedBook" :books="BOOKS" @select="selectedId = $event" />
  <NarrativeApp v-else-if="selectedBook.type === 'narrative'" :bookData="selectedBook" @home="selectedId = null" />
  <ConceptApp v-else-if="selectedBook.type === 'concepts'" :bookData="selectedBook" @home="selectedId = null" />
</template>
