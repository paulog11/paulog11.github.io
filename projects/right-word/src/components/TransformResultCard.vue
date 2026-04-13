<script setup>
defineProps({
  item: { type: Object, required: true }
})
</script>

<template>
  <div class="result-card">
    <div class="result-jp">{{ item.jp }}</div>
    <div class="result-row">
      <span class="result-reading">{{ item.reading || '' }}</span>
    </div>
    <div v-if="item.note" class="result-note result-note--transform">{{ item.note }}</div>
  </div>
</template>
