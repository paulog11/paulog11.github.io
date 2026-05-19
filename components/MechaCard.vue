<template>
  <div
    :class="[
      'relative bg-mecha-panel',
      'border transition-colors duration-200',
      glow
        ? 'border-mecha-accent/40 shadow-mecha-glow'
        : 'border-mecha-accent/15 hover:border-mecha-accent/35',
    ]"
    style="clip-path: polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)"
  >
    <!-- Corner accent marks — top-left and bottom-right only (clipped corners handle the others) -->
    <span class="absolute top-0 left-0 w-3 h-[1px] bg-mecha-accent/70" />
    <span class="absolute top-0 left-0 h-3 w-[1px] bg-mecha-accent/70" />
    <span class="absolute bottom-0 right-0 w-3 h-[1px] bg-mecha-accent/70" />
    <span class="absolute bottom-0 right-0 h-3 w-[1px] bg-mecha-accent/70" />

    <!-- Optional header slot -->
    <header
      v-if="$slots.header || label"
      class="flex items-center justify-between px-4 py-2 border-b border-mecha-accent/15"
    >
      <div class="flex items-center gap-2">
        <span v-if="label" class="font-tech text-[0.6rem] tracking-[0.22em] uppercase text-mecha-accent/80">
          {{ label }}
        </span>
      </div>
      <slot name="header-right">
        <span class="font-tech text-[0.55rem] tracking-widest text-mecha-text/25 animate-pulse-accent">
          ●
        </span>
      </slot>
      <slot name="header" />
    </header>

    <!-- Body -->
    <div :class="padded ? 'px-4 py-3' : ''">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  glow: {
    type: Boolean,
    default: false,
  },
  padded: {
    type: Boolean,
    default: true,
  },
})

</script>
