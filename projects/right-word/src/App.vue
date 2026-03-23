<script setup>
import { ref } from 'vue'
import { useApiKey } from './composables/useApiKey.js'
import { useTranslation } from './composables/useTranslation.js'
import ApiKeyBar from './components/ApiKeyBar.vue'
import ContextBar from './components/ContextBar.vue'
import QueryInput from './components/QueryInput.vue'
import ResultList from './components/ResultList.vue'
import ShowOverlay from './components/ShowOverlay.vue'

const { apiKey, hasKey, saveKey, clearKey } = useApiKey()
const { context, contextOptions, query, results, loading, error, translate, clearResults } = useTranslation()

const showOverlay = ref(false)

function onTranslate() {
  clearResults()
  translate(apiKey.value)
}
</script>

<template>
  <div class="container">
    <header>
      <span class="title-jp">日本語</span>
      <span class="title-en">Quick Assist</span>
    </header>

    <ApiKeyBar
      :hasKey="hasKey"
      @save="saveKey"
      @clear="clearKey"
    />

    <ContextBar
      :options="contextOptions"
      v-model="context"
    />

    <QueryInput
      v-model="query"
      :loading="loading"
      :hasKey="hasKey"
      @translate="onTranslate"
    />

    <ResultList
      :results="results"
      :loading="loading"
      :error="error"
      @show="showOverlay = true"
    />

    <ShowOverlay
      :results="results"
      :visible="showOverlay"
      @close="showOverlay = false"
    />
  </div>
</template>
