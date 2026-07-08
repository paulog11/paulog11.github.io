<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="text-silver-300 text-sm leading-relaxed flex gap-2"
    >
      <span class="text-forest-500 flex-shrink-0 mt-0.5">&bull;</span>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
