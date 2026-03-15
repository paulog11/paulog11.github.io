<template>
  <div
    class="rounded-lg border border-koshi bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    :class="{
      'md:col-span-2': span === 'double',
      'md:row-span-2': span === 'tall',
    }"
  >
    <!-- Title bar -->
    <div
      class="flex items-center gap-2 px-4 py-2.5 bg-koshi/50 border-b border-koshi select-none"
      :class="{ 'cursor-pointer': collapsible }"
      @click="collapsible && toggle()"
    >
      <!-- Decorative traffic lights -->
      <div class="flex items-center gap-1.5 mr-1">
        <span class="w-2.5 h-2.5 rounded-full bg-beni/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-matcha/60" />
      </div>

      <span v-if="icon" class="text-base leading-none">{{ icon }}</span>
      <span class="font-mono text-[0.7rem] tracking-[0.08em] uppercase text-usuzumi font-medium">
        {{ title }}
      </span>

      <!-- Collapse indicator -->
      <span
        v-if="collapsible"
        class="ml-auto text-usuzumi text-xs transition-transform duration-200"
        :class="{ 'rotate-180': collapsed }"
      >
        ▾
      </span>
    </div>

    <!-- Content -->
    <div v-show="!collapsed" class="p-4">
      <div v-if="loading" class="flex items-center justify-center py-8">
        <div class="w-5 h-5 border-2 border-ai/30 border-t-ai rounded-full animate-spin" />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  span: { type: String, default: 'single', validator: v => ['single', 'double', 'tall'].includes(v) },
  collapsible: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})

const collapsed = ref(false)

function toggle() {
  collapsed.value = !collapsed.value
}
</script>
