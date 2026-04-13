<script setup>
import { ref, computed } from 'vue'
import BookSelector from './components/BookSelector.vue'
import NarrativeApp from './components/NarrativeApp.vue'
import ConceptApp from './components/ConceptApp.vue'
import brothersData from './data/brothers-karamazov.js'
import japaneseData from './data/japanese-mind.js'
import japaneseCultureData from './data/japanese-culture.js'
import multiplyingChurchesData from './data/multiplying-churches.js'
import gospelHumanContextsData from './data/gospel-human-contexts.js'
import chrysanthemumSwordData from './data/chrysanthemum-sword.js'
import jesusForJapanData from './data/jesus-for-japan.js'

const BOOKS = [brothersData, japaneseData, japaneseCultureData, multiplyingChurchesData, gospelHumanContextsData, chrysanthemumSwordData, jesusForJapanData]
const selectedId = ref(null)
const selectedBook = computed(() => BOOKS.find((b) => b.id === selectedId.value) || null)
</script>

<template>
  <BookSelector v-if="!selectedBook" :books="BOOKS" @select="selectedId = $event" />
  <NarrativeApp v-else-if="selectedBook.type === 'narrative'" :bookData="selectedBook" @home="selectedId = null" />
  <ConceptApp v-else-if="selectedBook.type === 'concepts'" :bookData="selectedBook" @home="selectedId = null" />
</template>
