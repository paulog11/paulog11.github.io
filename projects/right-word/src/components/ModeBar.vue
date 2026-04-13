<script setup>
defineProps({
  modelValue: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mode-bar">
    <span class="mode-label">MODE</span>
    <button
      class="ctx-btn"
      :class="{ active: modelValue === 'translate' }"
      @click="emit('update:modelValue', 'translate')"
    >Translate</button>
    <button
      class="ctx-btn"
      :class="{ active: modelValue === 'transform' }"
      @click="emit('update:modelValue', 'transform')"
    >Transform ↕</button>
  </div>
</template>
