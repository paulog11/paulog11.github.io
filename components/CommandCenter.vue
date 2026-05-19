<template>
  <div class="relative h-screen w-screen overflow-hidden bg-mecha-bg font-tech text-mecha-text">

    <!-- Ambient grid background -->
    <div
      class="absolute inset-0 pointer-events-none bg-mecha-grid"
      style="background-size: 40px 40px;"
    />

    <!-- Scanline overlay -->
    <div class="absolute inset-0 pointer-events-none bg-mecha-scanlines opacity-40" />

    <!-- Top bar -->
    <header class="relative z-10 flex items-center justify-between px-4 h-10 border-b"
      style="border-color: rgba(255,122,0,0.25);">
      <span class="text-mecha-text/50 text-[0.6rem] tracking-[0.18em] uppercase">
        paulog11.github.io
      </span>
      <span class="text-mecha-text/35 text-[0.6rem] tracking-[0.18em] tabular-nums">
        {{ clock }}
      </span>
      <span class="text-mecha-text/50 text-[0.6rem] tracking-[0.18em] uppercase">
        Paulo Gonzales
      </span>
    </header>

    <!-- 3-column grid body -->
    <div class="relative z-10 grid h-[calc(100vh-2.5rem-2rem)] grid-cols-[20%_1fr_20%]">

      <!-- Left sidebar separator -->
      <div class="absolute top-0 bottom-0 left-[20%] w-px" style="background: rgba(255,122,0,0.2);" />
      <!-- Right sidebar separator -->
      <div class="absolute top-0 bottom-0 right-[20%] w-px" style="background: rgba(255,122,0,0.2);" />

      <!-- ── Left Sidebar ── -->
      <aside class="overflow-y-auto px-3 py-4 flex flex-col gap-4">
        <slot name="left" />
      </aside>

      <!-- ── Center Main Panel ── -->
      <main class="overflow-y-auto px-6 py-4">
        <slot />
      </main>

      <!-- ── Right Telemetry Sidebar ── -->
      <aside class="overflow-y-auto px-3 py-4 flex flex-col gap-4">
        <slot name="right" />
      </aside>

    </div>

    <!-- Bottom bar -->
    <footer class="relative z-10 flex items-center justify-between px-4 h-8 border-t"
      style="border-color: rgba(255,122,0,0.25);">
      <span class="text-mecha-text/30 text-[0.58rem] tracking-[0.18em] uppercase">
        {{ entryCount }} projects
      </span>
      <span class="text-mecha-text/30 text-[0.58rem] tracking-[0.18em] uppercase">
        © {{ year }} Paulo Gonzales
      </span>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  entryCount: { type: Number, default: 0 },
})

const clock = ref('')
const year = new Date().getFullYear()

let timer
function tick() {
  const now = new Date()
  clock.value = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>
