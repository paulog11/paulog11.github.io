<script setup>
defineProps({
  content: { type: String, required: true },
  paragraphClass: { type: String, default: 'text-silver-200 text-sm leading-relaxed' },
})
</script>

<template>
  <div class="space-y-3">
    <p
      v-for="(para, i) in content.split('\n\n')"
      :key="i"
      :class="paragraphClass"
    >
      {{ para }}
    </p>
  </div>
</template>
