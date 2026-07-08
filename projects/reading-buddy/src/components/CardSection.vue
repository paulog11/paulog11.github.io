<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div>
    <h4 class="text-xs font-mono uppercase tracking-wider text-silver-500 mb-2">{{ title }}</h4>
    <slot />
  </div>
</template>
