<script setup>
import { ref } from 'vue'

const props = defineProps({
  book: { type: Object, required: true },
  sidebarEnabled: { type: Boolean, default: true },
  sidebarToggleLabel: { type: String, default: 'Toggle sidebar' },
})

const emit = defineEmits(['home'])

const showSidebar = ref(true)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="border-b border-forest-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div class="flex items-center gap-3">
        <button
          v-if="sidebarEnabled"
          @click="showSidebar = !showSidebar"
          class="lg:hidden text-silver-400 hover:text-silver-200 transition-colors p-1"
          :aria-label="sidebarToggleLabel"
        >
          <span class="text-lg">&#9776;</span>
        </button>
        <div>
          <h1 class="font-serif text-lg text-silver-100 leading-tight">
            {{ book.title }}
          </h1>
          <p class="text-silver-500 text-xs">{{ book.author }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="emit('home')"
          class="text-xs text-silver-500 hover:text-silver-300 transition-colors px-2 py-1"
        >&larr; Home</button>
        <slot name="header-actions" />
      </div>
    </header>

    <!-- Body -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <Transition name="sidebar">
        <aside
          v-if="sidebarEnabled && showSidebar"
          class="w-72 flex-shrink-0 border-r border-forest-800 overflow-y-auto p-4 bg-forest-950 max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:z-10 max-lg:top-[53px]"
        >
          <slot name="sidebar" />
        </aside>
      </Transition>

      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-8">
        <div class="max-w-5xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.25s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>
