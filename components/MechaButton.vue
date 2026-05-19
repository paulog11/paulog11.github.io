<template>
  <button
    v-bind="$attrs"
    :class="[
      'relative inline-flex items-center justify-center px-5 py-2',
      'font-tech text-[0.72rem] tracking-[0.2em] uppercase',
      'border transition-colors duration-150 outline-none',
      'focus-visible:ring-1 focus-visible:ring-mecha-accent',
      variant === 'primary'
        ? 'border-mecha-accent text-mecha-accent bg-transparent hover:bg-mecha-accent hover:text-mecha-bg'
        : 'border-mecha-text/20 text-mecha-text/60 bg-transparent hover:border-mecha-accent hover:text-mecha-accent',
    ]"
    :style="clipStyle"
  >
    <!-- Corner screws — decorative -->
    <span class="absolute top-[3px] left-[3px] w-[3px] h-[3px] border-t border-l"
      :class="variant === 'primary' ? 'border-mecha-accent/60' : 'border-mecha-text/20'" />
    <span class="absolute bottom-[3px] right-[3px] w-[3px] h-[3px] border-b border-r"
      :class="variant === 'primary' ? 'border-mecha-accent/60' : 'border-mecha-text/20'" />

    <!-- Brackets + label -->
    <span class="relative flex items-center gap-1.5">
      <span class="text-[0.85em] opacity-60">[</span>
      <slot />
      <span class="text-[0.85em] opacity-60">]</span>
    </span>
  </button>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  variant: {
    type: String,
    default: 'primary', // 'primary' | 'ghost'
  },
})
</script>

<style scoped>
button {
  clip-path: polygon(
    10px 0%,
    100% 0%,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0% 100%,
    0% 10px
  );
}
</style>
