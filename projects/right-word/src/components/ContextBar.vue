<script setup>
defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="context-bar">
    <span style="font-size:0.72rem;color:var(--muted);align-self:center;margin-right:4px;font-family:'DM Mono',monospace;">CONTEXT</span>
    <button
      v-for="option in options"
      :key="option.id"
      class="ctx-btn"
      :class="{ active: modelValue === option.id }"
      @click="emit('update:modelValue', option.id)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
