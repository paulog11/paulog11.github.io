<script setup>
import { ref } from 'vue'
import { useApiKey } from './composables/useApiKey.js'

const appVersion = __APP_VERSION__
import { useInput } from './composables/useInput.js'
import { useTranslation } from './composables/useTranslation.js'
import ApiKeyBar from './components/ApiKeyBar.vue'
import ContextBar from './components/ContextBar.vue'
import InputBar from './components/InputBar.vue'
import ResultList from './components/ResultList.vue'
import ShowOverlay from './components/ShowOverlay.vue'

const { apiKey, hasKey, saveKey, clearKey } = useApiKey()
const { query, recording, supported, startRecording, stopRecording } = useInput()
const { context, contextOptions, results, loading, error, translate, clearResults } = useTranslation()

const showOverlay = ref(false)

function onTranslate() {
  clearResults()
  translate(query.value, apiKey.value)
}
</script>

<template>
  <div class="container">
    <header>
      <span class="title-jp">日本語</span>
      <span class="title-en">Quick Assist</span>
      <span class="title-version">v{{ appVersion }}</span>
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

    <InputBar
      v-model="query"
      :loading="loading"
      :hasKey="hasKey"
      :recording="recording"
      :supported="supported"
      @translate="onTranslate"
      @startVoice="startRecording"
      @stopVoice="stopRecording"
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
