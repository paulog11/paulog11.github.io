<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  hasKey: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'translate'])

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('translate')
  }
}
</script>

<template>
  <div class="input-area">
    <textarea
      :value="modelValue"
      placeholder="What do you want to say? e.g. 'I'd like to get off at the next stop'"
      rows="3"
      @input="emit('update:modelValue', $event.target.value)"
      @keydown="onKeydown"
    ></textarea>
    <div class="input-row">
      <button
        class="ask-btn"
        :disabled="loading || !hasKey"
        @click="emit('translate')"
      >
        Translate →
      </button>
      <span class="hint">tap any Japanese text to select it</span>
    </div>
  </div>
</template>
