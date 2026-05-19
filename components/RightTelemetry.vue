<template>
  <div class="relative h-full flex flex-col gap-3 font-tech text-[0.65rem] select-none">

    <Transition name="fade" mode="out-in">

      <!-- Idle -->
      <div v-if="!selectedProject" key="idle"
        class="flex-1 flex flex-col items-center justify-center gap-2 text-mecha-text/25 tracking-[0.14em] text-center"
      >
        <span class="text-[1.2rem] opacity-30">◈</span>
        <span>Hover a project<br />to see details</span>
      </div>

      <!-- Active -->
      <div v-else key="active" class="flex-1 flex flex-col gap-4 overflow-y-auto">

        <!-- Project header -->
        <div class="border border-mecha-accent/25 px-3 py-2.5"
          style="clip-path: polygon(8px 0%,100% 0%,100% calc(100% - 8px),calc(100% - 8px) 100%,0% 100%,0% 8px)">
          <div class="text-mecha-text text-[0.82rem] tracking-[0.06em] leading-snug">
            {{ selectedProject.title }}
          </div>
          <div class="mt-1 text-mecha-text/40 text-[0.58rem] tracking-[0.1em]">
            {{ selectedProject.year }} · {{ selectedProject.category }}
          </div>
        </div>

        <!-- Stack -->
        <section>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-mecha-accent text-[0.58rem] tracking-[0.18em] uppercase">Stack</span>
            <span class="flex-1 h-px bg-mecha-accent/20" />
          </div>
          <ul class="flex flex-col gap-1">
            <li
              v-for="tool in selectedProject.tools"
              :key="tool"
              class="flex items-center gap-2 text-mecha-text/65 tracking-[0.08em]"
            >
              <span class="text-mecha-accent/40">›</span>
              <span>{{ tool }}</span>
            </li>
          </ul>
        </section>

        <!-- Architecture -->
        <section>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-mecha-accent text-[0.58rem] tracking-[0.18em] uppercase">Architecture</span>
            <span class="flex-1 h-px bg-mecha-accent/20" />
          </div>
          <ul class="flex flex-col gap-1">
            <li
              v-for="layer in architecture"
              :key="layer"
              class="flex items-start gap-2 text-mecha-text/55 tracking-[0.06em]"
            >
              <span class="text-mecha-accent/40 mt-px">›</span>
              <span>{{ layer }}</span>
            </li>
          </ul>
        </section>

        <!-- Status -->
        <section>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-mecha-accent text-[0.58rem] tracking-[0.18em] uppercase">Status</span>
            <span class="flex-1 h-px bg-mecha-accent/20" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-mecha-text/40 tracking-[0.08em]">Deploy</span>
            <span :class="deployColor" class="tracking-[0.08em]">{{ deployLabel }}</span>
          </div>
        </section>

        <!-- GitHub link -->
        <a
          v-if="selectedProject.github"
          :href="selectedProject.github"
          target="_blank"
          rel="noopener"
          class="mt-auto flex items-center gap-2 text-mecha-text/40 hover:text-mecha-accent transition-colors duration-150 tracking-[0.1em] text-[0.62rem]"
        >
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <span>View on GitHub ↗</span>
        </a>

      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedProject: { type: Object, default: null },
})

const ARCH_MAP = {
  simulations: ['Canvas renderer', 'Animation loop', 'Vector math', 'Entity system'],
  games:       ['State machine', 'Event bus', 'Component tree', 'Local store'],
  maps:        ['Geospatial layer', 'Tile rendering', 'Marker engine', 'Event-driven'],
  language:    ['Static bundle', 'Dictionary lookup', 'Component tree', 'API layer'],
  reading:     ['Static bundle', 'Local state', 'Component tree', 'Media handling'],
}

const architecture = computed(() =>
  ARCH_MAP[props.selectedProject?.category] ?? ['Component tree', 'Static bundle']
)

const deployLabel = computed(() => {
  const s = props.selectedProject?.status
  if (s === 'live') return 'Live'
  if (s === 'WIP')  return 'In progress'
  return 'Planned'
})

const deployColor = computed(() => {
  const s = props.selectedProject?.status
  if (s === 'live') return 'text-mecha-accent'
  if (s === 'WIP')  return 'text-mecha-text/60'
  return 'text-mecha-text/30'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }
</style>
