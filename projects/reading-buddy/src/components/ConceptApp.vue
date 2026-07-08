<script setup>
import { ref } from 'vue'
import { useConceptProgress } from '../composables/useConceptProgress.js'
import AppShell from './AppShell.vue'
import ConceptTracker from './ConceptTracker.vue'
import ConceptPage from './ConceptPage.vue'

const props = defineProps({
  bookData: { type: Object, required: true },
})

const emit = defineEmits(['home'])

const { book, allConcepts } = useConceptProgress(props.bookData)

const activeConceptId = ref(null)

function selectConcept(conceptId) {
  activeConceptId.value = conceptId
}
</script>

<template>
  <AppShell
    :book="book"
    sidebar-toggle-label="Toggle concepts"
    @home="emit('home')"
  >
    <template #sidebar>
      <ConceptTracker
        :concepts="allConcepts"
        :activeConceptId="activeConceptId"
        @select="selectConcept"
      />
    </template>

    <ConceptPage
      :book="book"
      :concepts="allConcepts"
      :activeConceptId="activeConceptId"
      @select="selectConcept"
    />
  </AppShell>
</template>
