<script setup>
import { ref, watch } from 'vue'
import { useApiKey } from './composables/useApiKey.js'

const appVersion = __APP_VERSION__
import { useInput } from './composables/useInput.js'
import { useTranslation } from './composables/useTranslation.js'
import { useTransform } from './composables/useTransform.js'
import ApiKeyBar from './components/ApiKeyBar.vue'
import ContextBar from './components/ContextBar.vue'
import InputBar from './components/InputBar.vue'
import ModeBar from './components/ModeBar.vue'
import ResultList from './components/ResultList.vue'
import ShowOverlay from './components/ShowOverlay.vue'
import TransformInput from './components/TransformInput.vue'
import TransformResultList from './components/TransformResultList.vue'

const { apiKey, hasKey, saveKey, clearKey } = useApiKey()
const { query, recording, supported, startRecording, stopRecording } = useInput()
const { context, contextOptions, results, loading, error, translate, clearResults } = useTranslation()
const { direction, directionOptions, results: transformResults, loading: transformLoading, error: transformError, transform, clearResults: clearTransformResults } = useTransform()

const mode = ref('translate')
const transformQuery = ref('')
const showOverlay = ref(false)

watch(mode, () => { showOverlay.value = false })

function onTranslate() {
  clearResults()
  translate(query.value, apiKey.value)
}

function onTransform() {
  clearTransformResults()
  transform(transformQuery.value, apiKey.value)
}
</script>

<template>
  <div class="container">
    <header>
      <span class="title-jp">日本語</span>
      <span class="title-en">Quick Assist</span>
      <span class="title-version">v{{ appVersion }}</span>
    </header>

    <ModeBar v-model="mode" />

    <ApiKeyBar
      :hasKey="hasKey"
      @save="saveKey"
      @clear="clearKey"
    />

    <template v-if="mode === 'translate'">
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
    </template>

    <template v-else>
      <TransformInput
        v-model="transformQuery"
        v-model:direction="direction"
        :directionOptions="directionOptions"
        :loading="transformLoading"
        :hasKey="hasKey"
        @transform="onTransform"
      />

      <TransformResultList
        :results="transformResults"
        :loading="transformLoading"
        :error="transformError"
        @show="showOverlay = true"
      />
    </template>

    <ShowOverlay
      :results="mode === 'translate' ? results : transformResults"
      :visible="showOverlay"
      @close="showOverlay = false"
    />
  </div>
</template>
