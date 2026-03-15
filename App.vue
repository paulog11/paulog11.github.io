<template>
  <div class="min-h-full flex flex-col bg-parchment font-body">

    <!-- ── Top bar ── -->
    <header class="flex items-center justify-between px-8 py-5 border-b border-warm shrink-0">
      <div>
        <span class="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted">My Apps</span>
      </div>
      <a
        :href="portfolioUrl"
        target="_blank"
        rel="noopener"
        class="group flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-muted hover:text-ink transition-colors duration-200"
      >
        <span>Portfolio &amp; Profile</span>
        <span class="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </header>

    <!-- ── Main ── -->
    <main class="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">

      <!-- Page title -->
      <div class="text-center mb-10 animate-fade-up" style="animation-delay: 0.05s; opacity: 0; animation-fill-mode: forwards;">
        <h1 class="font-display text-4xl md:text-5xl text-ink leading-tight">
          Choose an app
        </h1>
        <p class="mt-2 text-sm text-muted font-body font-light tracking-wide">
          Select a project to open
        </p>
      </div>

      <!-- App grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        <AppCard
          v-for="(app, i) in apps"
          :key="app.id"
          :app="app"
          :style="{ animationDelay: `${0.12 + i * 0.07}s` }"
          @select="handleSelect"
        />
      </div>

    </main>

    <!-- ── Footer ── -->
    <footer class="shrink-0 flex items-center justify-center px-8 py-4 border-t border-warm">
      <span class="font-mono text-[0.65rem] tracking-widest uppercase text-muted/60">
        © {{ new Date().getFullYear() }} · Your Name
      </span>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppCard from './components/AppCard.vue'

// ── Config ──────────────────────────────────────────────
// Replace with your actual GitHub Pages portfolio URL
const portfolioUrl = ref('./projects/profile/')

// ── App list ────────────────────────────────────────────
// To add a new app: copy one entry, give it a unique id,
// fill in title/description/tags, and set the url/comingSoon flag.
const apps = ref([
  {
    id: 'right-word-japanese',
    title: 'The Right Word',
    subtitle: 'Japanese',
    description: 'Build precise vocabulary with context-driven word selection and spaced repetition.',
    tags: ['Language', 'Japanese'],
    icon: '語',
    url: null,          // set to app URL when live
    comingSoon: true,
  },
  {
    id: 'bible-hymn-kids',
    title: 'Bible Hymn Learning',
    subtitle: 'for Kids',
    description: 'Interactive hymn and scripture learning experience designed for young learners.',
    tags: ['Education', 'Music'],
    icon: '♪',
    url: null,
    comingSoon: true,
  },
  {
    id: 'japanese-dashboard',
    title: 'Japanese Learning',
    subtitle: 'Dashboard',
    description: 'Track your Japanese progress across kanji, grammar, and vocabulary in one place.',
    tags: ['Language', 'Analytics'],
    icon: '日',
    url: null,
    comingSoon: true,
  },
  {
    id: 'algo-lab',
    title: 'Algorithm Lab',
    subtitle: 'Simulations',
    description: 'Canvas-based algorithm simulations — flocking boids, N-body gravity, three-body problem, and more.',
    tags: ['Simulation', 'Physics'],
    icon: '⚛',
    url: './projects/algo-lab/dist/index.html',
    comingSoon: false,
  },
  {
    id: 'flip7',
    title: 'Flip 7',
    subtitle: 'Card Game',
    description: 'A multiplayer card game of risky math. Draw cards, dodge duplicates, and race to the target score.',
    tags: ['Game', 'Multiplayer'],
    icon: '🃏',
    url: './projects/ported-games/flip7/dist/index.html',
    comingSoon: false,
  },
  {
    id: 'reading-buddy',
    title: 'Reading Buddy',
    subtitle: 'Book Companion',
    description: 'Track your reading with progressive character reveals and chapter-by-chapter companion guides.',
    tags: ['Reading', 'Literature'],
    icon: '📚',
    url: './projects/reading-buddy/dist/index.html',
    comingSoon: false,
  },
])

function handleSelect(app) {
  if (app.comingSoon || !app.url) return
  window.open(app.url, '_blank', 'noopener')
}
</script>
