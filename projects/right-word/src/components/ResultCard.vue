<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true }
})

const tagClass = computed(() => {
  return { casual: 'tag-casual', polite: 'tag-polite', formal: 'tag-formal' }[props.item.register] || 'tag-polite'
})
</script>

<template>
  <div class="result-card">
    <div class="result-jp">{{ item.jp }}</div>
    <div class="result-row">
      <span class="result-reading">{{ item.reading || '' }}</span>
      <span class="result-en">{{ item.en }}</span>
      <span class="register-tag" :class="tagClass">{{ item.register }}</span>
    </div>
    <div v-if="item.note" class="result-note">{{ item.note }}</div>
  </div>
</template>
