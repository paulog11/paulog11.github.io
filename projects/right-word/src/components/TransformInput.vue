<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  direction: { type: String, default: 'to-keigo' },
  directionOptions: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  hasKey: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'update:direction', 'transform'])

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('transform')
  }
}
</script>

<template>
  <div class="input-area">
    <div class="context-bar">
      <span class="mode-label">DIRECTION</span>
      <button
        v-for="opt in directionOptions"
        :key="opt.id"
        class="ctx-btn"
        :class="{ active: direction === opt.id }"
        @click="emit('update:direction', opt.id)"
      >{{ opt.label }}</button>
    </div>
    <textarea
      :value="modelValue"
      placeholder="Paste or type Japanese text to transform..."
      rows="3"
      @input="emit('update:modelValue', $event.target.value)"
      @keydown="onKeydown"
    ></textarea>
    <div class="input-row">
      <button
        class="ask-btn"
        :disabled="loading || !hasKey"
        @click="emit('transform')"
      >
        Transform →
      </button>
    </div>
  </div>
</template>
