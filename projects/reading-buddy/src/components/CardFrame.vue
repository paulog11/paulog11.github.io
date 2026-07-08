<script setup>
defineProps({
  title: { type: String, required: true },
  label: { type: String, default: '' },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <div class="bg-forest-900/40 border border-forest-700/40 rounded-xl p-5 space-y-4 animate-fade-in">
    <div>
      <div class="flex items-baseline gap-2 flex-wrap mb-1">
        <h3 class="font-serif text-lg text-gold-400">{{ title }}</h3>
        <span v-if="label" class="text-silver-400 font-mono text-sm">{{ label }}</span>
      </div>
      <p class="text-silver-500 text-xs font-mono uppercase tracking-wider">{{ subtitle }}</p>
    </div>

    <slot />
  </div>
</template>
