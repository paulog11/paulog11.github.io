<template>
  <div class="h-full flex flex-col bg-parchment font-body">

    <!-- ── Top bar ── -->
    <header class="flex items-center justify-between px-8 py-5 border-b border-warm shrink-0">
      <div>
        <span class="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted">My Apps</span>
      </div>
      <a
        :href="portfolioUrl"
        target="_blank"
        rel="noopener"
        class="group flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.08em] uppercase
               text-parchment bg-accent
               px-4 py-2 rounded-sm
               shadow-[0_4px_0_0_#7a3d19]
               hover:shadow-[0_2px_0_0_#7a3d19] hover:translate-y-[2px]
               active:shadow-none active:translate-y-[4px]
               transition-all duration-100"
      >
        <span>My Profile</span>
        <span class="inline-block transition-transform duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
      </a>
    </header>

    <!-- ── Main ── -->
    <main class="flex-1 flex flex-col items-center px-6 py-8 overflow-y-auto">

      <!-- Personal header -->
      <div class="text-center mb-8 animate-fade-up w-full max-w-4xl" style="animation-delay: 0.05s; opacity: 0; animation-fill-mode: forwards;">
        <h1 class="font-display text-5xl md:text-6xl text-ink leading-tight">
          Paulo's Projects
        </h1>
        <p class="mt-3 font-mono text-[0.8rem] tracking-[0.12em] uppercase text-muted">
          Software · Languages · Games
        </p>
      </div>

      <!-- Category filter -->
      <div class="flex gap-2 mb-8 flex-wrap justify-center animate-fade-up" style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            'font-mono text-[0.72rem] tracking-[0.1em] uppercase px-4 py-1.5 rounded-sm border transition-all duration-150',
            selectedCategory === cat.id
              ? 'bg-ink text-parchment border-ink'
              : 'bg-transparent text-muted border-warm hover:border-ink hover:text-ink'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Content area -->
      <div class="w-full max-w-4xl">
        <!-- Featured card (first app) -->
        <FeaturedCard
          v-if="filteredApps.length > 0"
          :app="filteredApps[0]"
          :style="{ animationDelay: '0.15s' }"
          @select="handleSelect"
          class="mb-6 animate-fade-up"
        />

        <!-- Compact list (remaining apps) -->
        <div v-if="filteredApps.length > 1" class="flex flex-col gap-2">
          <CompactCard
            v-for="(app, i) in filteredApps.slice(1)"
            :key="app.id"
            :app="app"
            :style="{ animationDelay: `${0.2 + i * 0.05}s` }"
            @select="handleSelect"
            class="animate-fade-up"
          />
        </div>

        <!-- Empty state -->
        <p v-if="filteredApps.length === 0" class="text-muted font-mono text-sm mt-8 text-center animate-fade-up">
          No apps in this category yet.
        </p>
      </div>

    </main>

    <!-- ── Footer ── -->
    <footer class="shrink-0 flex items-center justify-center px-8 py-4 border-t border-warm">
      <span class="font-mono text-[0.65rem] tracking-widest uppercase text-muted/60">
        © {{ new Date().getFullYear() }} · Paulo Gonzales
      </span>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FeaturedCard from './components/FeaturedCard.vue'
import CompactCard from './components/CompactCard.vue'

const portfolioUrl = ref('./projects/profile/')

const categories = [
  { id: 'all',   label: 'All' },
  { id: 'japan', label: 'Japan' },
  { id: 'games', label: 'Games' },
]

const selectedCategory = ref('all')

const apps = ref([
  {
    id: 'japanese-dashboard',
    title: 'Japanese Learning',
    subtitle: 'Dashboard',
    description: 'Track your Japanese progress across kanji, grammar, and vocabulary in one place.',
    tags: ['Language', 'Analytics'],
    icon: '日',
    url: './projects/japandash/dist/index.html',
    comingSoon: false,
    category: 'japan',
  },
  {
    id: 'right-word-japanese',
    title: 'The Right Word',
    subtitle: 'Japanese',
    description: 'Build precise vocabulary with context-driven word selection and spaced repetition.',
    tags: ['Language', 'Japanese'],
    icon: '語',
    url: './projects/right-word/dist/index.html',
    comingSoon: false,
    category: 'japan',
  },
  {
    id: 'japan-map',
    title: 'Japan History Map',
    subtitle: 'Interactive Map',
    description: 'Explore significant events in Japanese history and Tokyo\'s train system on an interactive Leaflet map.',
    tags: ['History', 'Map'],
    icon: '🗾',
    url: './projects/japan-map/dist/index.html',
    comingSoon: false,
    category: 'japan',
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
    category: 'japan',
  },
  {
    id: 'venue-search',
    title: 'Venue Search',
    subtitle: 'Tokyo Event Spaces',
    description: 'Find rentable event spaces in Tokyo — parties, workshops, meetups, corporate events, and more.',
    tags: ['Search', 'Tokyo'],
    icon: '🏛',
    url: './projects/venue-search/dist/index.html',
    comingSoon: false,
    category: 'japan',
  },
  {
    id: 'machi-koro',
    title: 'Machi Koro',
    subtitle: 'City Builder',
    description: 'Build your city by rolling dice and buying establishments. First to complete all 4 landmarks wins!',
    tags: ['Game', 'Board Game'],
    icon: '🏙️',
    url: './projects/ported-games/machi-koro/dist/index.html',
    comingSoon: false,
    category: 'games',
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
    category: 'games',
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
    category: 'other',
  },
  {
    id: 'bible-hymn-kids',
    title: 'Bible Hymn Learning',
    subtitle: 'for Kids',
    description: 'Interactive hymn and scripture learning experience designed for young learners.',
    tags: ['Education', 'Music'],
    icon: '♪',
    url: './projects/bible-hymn/hymn-app.html',
    comingSoon: false,
    category: 'other',
  },
])

const filteredApps = computed(() =>
  selectedCategory.value === 'all'
    ? apps.value
    : apps.value.filter(a => a.category === selectedCategory.value)
)

function handleSelect(app) {
  if (app.comingSoon || !app.url) return
  window.open(app.url, '_blank', 'noopener')
}
</script>
