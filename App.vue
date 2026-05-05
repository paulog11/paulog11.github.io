<template>
  <div class="min-h-full bg-parchment font-body text-ink bg-ledger">
    <div class="max-w-[760px] mx-auto px-6 sm:px-10 py-12 sm:py-16">

      <!-- ── Header ── -->
      <header class="animate-fade-up" style="animation-delay: 0.05s; opacity: 0; animation-fill-mode: forwards;">
        <div class="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted">
          Catalog №01
        </div>
        <h1 class="mt-2 font-mono text-[0.95rem] sm:text-[1.05rem] tracking-[0.14em] uppercase text-ink">
          Paulo Gonzales · A Catalog of Things Made
        </h1>
        <div class="mt-3 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted">
          updated {{ updatedLabel }} · {{ apps.length }} entries · sorted newest first
        </div>
        <a
          :href="portfolioUrl"
          target="_blank"
          rel="noopener"
          class="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-accent hover:text-ink transition-colors"
        >
          <span class="underline underline-offset-4 decoration-accent/50">profile card</span>
          <span>↗</span>
        </a>
      </header>

      <hr class="my-8 border-t border-warm" />

      <!-- ── Filter row ── -->
      <div
        class="flex flex-wrap items-baseline gap-x-4 gap-y-2 animate-fade-up"
        style="animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards;"
      >
        <span class="font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted">filter</span>
        <template v-for="(cat, i) in categories" :key="cat.id">
          <button
            @click="selectedCategory = cat.id"
            :class="[
              'font-mono text-[0.72rem] tracking-[0.12em] uppercase transition-colors',
              selectedCategory === cat.id
                ? 'text-accent underline underline-offset-4 decoration-accent'
                : 'text-muted hover:text-ink'
            ]"
          >
            {{ cat.label }}
          </button>
          <span v-if="i < categories.length - 1" class="text-muted/50 font-mono text-[0.7rem]">·</span>
        </template>
        <span class="ml-auto font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted/70">
          press <kbd class="px-1 border border-warm rounded-sm">/</kbd> to search ·
          <kbd class="px-1 border border-warm rounded-sm">j</kbd>/<kbd class="px-1 border border-warm rounded-sm">k</kbd> to navigate
        </span>
      </div>

      <!-- ── Search input (revealed on / press) ── -->
      <div
        v-show="searchOpen"
        class="mt-4 flex items-center gap-2 border-b border-ink pb-1"
      >
        <span class="font-mono text-[0.75rem] text-accent">/</span>
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="filter entries…"
          class="flex-1 bg-transparent outline-none font-mono text-[0.85rem] text-ink placeholder:text-muted/60"
          @keydown.esc="closeSearch"
        />
        <button
          @click="closeSearch"
          class="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-muted hover:text-ink"
        >esc</button>
      </div>

      <hr class="mt-8 mb-2 border-t border-warm" />

      <!-- ── Entries ── -->
      <ul class="divide-y divide-warm">
        <li
          v-for="(entry, i) in filteredApps"
          :key="entry.id"
          :ref="el => entryRefs[i] = el"
          @mouseenter="focusedIndex = i"
          @click="open(entry)"
          @keydown.enter="open(entry)"
          tabindex="0"
          :class="[
            'group relative py-7 px-4 sm:px-6 -mx-4 sm:-mx-6 cursor-pointer outline-none transition-colors',
            'hover:bg-warm/60 focus-visible:bg-warm/60',
            focusedIndex === i ? 'entry-focused' : '',
            entry.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''
          ]"
          :style="{
            animationDelay: `${0.15 + i * 0.04}s`,
            opacity: 0,
            animationFillMode: 'forwards',
          }"
          class="animate-fade-up"
        >
          <!-- Index + title row -->
          <div class="flex items-baseline gap-4">
            <span class="font-mono text-[0.85rem] text-accent shrink-0 tabular-nums">
              [{{ String(entry.indexNumber).padStart(3, '0') }}]
            </span>
            <div class="flex-1 min-w-0">
              <h2 class="font-display text-[1.4rem] leading-tight text-ink">
                {{ entry.title }}
              </h2>
              <p class="mt-1 font-mono italic text-[0.78rem] text-muted">
                {{ entry.tagline }}
              </p>
            </div>
            <span
              v-if="entry.status !== 'coming-soon'"
              class="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-accent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity shrink-0 self-center"
              :class="focusedIndex === i ? 'opacity-100' : ''"
            >
              → open
            </span>
            <span
              v-else
              class="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted shrink-0 self-center"
            >
              soon
            </span>
          </div>

          <!-- Metadata grid -->
          <div class="mt-4 ml-0 sm:ml-[3.25rem] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 font-mono text-[0.72rem] text-muted">
            <div>
              <span class="text-muted/70">cat</span>
              <span class="mx-1.5 text-muted/40">·</span>
              <span class="text-ink">{{ entry.category }}</span>
            </div>
            <div>
              <span class="text-muted/70">year</span>
              <span class="mx-1.5 text-muted/40">·</span>
              <span class="text-ink">{{ entry.year }}</span>
            </div>
            <div class="sm:col-span-2">
              <span class="text-muted/70">tools</span>
              <span class="mx-1.5 text-muted/40">·</span>
              <span class="text-ink">{{ entry.tools.join(' · ') }}</span>
            </div>
            <div>
              <span class="text-muted/70">status</span>
              <span class="mx-1.5 text-muted/40">·</span>
              <span :class="statusClass(entry.status)">{{ statusLabel(entry.status) }}</span>
            </div>
          </div>

          <!-- Blurb -->
          <p class="mt-4 ml-0 sm:ml-[3.25rem] text-[0.92rem] leading-relaxed text-ink/80 max-w-[58ch]">
            {{ entry.description }}
          </p>

          <!-- URL line revealed on hover/focus -->
          <div
            class="mt-3 ml-0 sm:ml-[3.25rem] font-mono text-[0.68rem] text-muted/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
            :class="focusedIndex === i ? 'opacity-100' : ''"
          >
            {{ entry.url }}
          </div>
        </li>
      </ul>

      <p
        v-if="filteredApps.length === 0"
        class="py-10 text-center font-mono text-[0.78rem] tracking-[0.1em] uppercase text-muted"
      >
        no entries match
      </p>

      <!-- ── Footer ── -->
      <footer class="mt-12 pt-6 border-t border-warm font-mono text-[0.68rem] tracking-[0.14em] uppercase text-muted/70">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <span>end of catalog · paulog.github.io</span>
          <span>© {{ new Date().getFullYear() }} Paulo Gonzales</span>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const portfolioUrl = ref('./projects/profile/')
const updatedLabel = '2026-05'

const categories = [
  { id: 'all',         label: 'all' },
  { id: 'language',    label: 'language' },
  { id: 'games',       label: 'games' },
  { id: 'maps',        label: 'maps' },
  { id: 'simulations', label: 'simulations' },
  { id: 'reading',     label: 'reading' },
]

const selectedCategory = ref('all')
const searchOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const focusedIndex = ref(0)
const entryRefs = ref([])

// Sorted newest-first. indexNumber stays fixed regardless of filter.
const apps = ref([
  {
    id: 'algo-lab',
    indexNumber: 9,
    title: 'Algorithm Lab',
    tagline: 'things in motion, on a canvas',
    description: 'Flocking boids, n-body gravity, the three-body problem, and other simulations rendered with vanilla canvas.',
    category: 'simulations',
    year: '2026',
    tools: ['canvas', 'vanilla js'],
    status: 'live',
    url: './projects/algo-lab/dist/index.html',
  },
  {
    id: 'flip7',
    indexNumber: 8,
    title: 'Flip 7',
    tagline: 'a card game of risky math',
    description: 'A multiplayer port of the press-your-luck card game. Draw cards, dodge duplicates, race to the target score.',
    category: 'games',
    year: '2026',
    tools: ['vue', 'vite', 'tailwind'],
    status: 'live',
    url: './projects/ported-games/flip7/dist/index.html',
  },
  {
    id: 'machi-koro',
    indexNumber: 7,
    title: 'Machi Koro',
    tagline: 'build a city by rolling dice',
    description: 'A web port of the dice-driven city-building board game. Roll, collect, buy, and outbuild your opponent.',
    category: 'games',
    year: '2025',
    tools: ['vue', 'vite', 'tailwind'],
    status: 'live',
    url: './projects/ported-games/machi-koro/dist/index.html',
  },
  {
    id: 'venue-search',
    indexNumber: 6,
    title: 'Venue Search',
    tagline: 'rentable rooms in tokyo',
    description: 'A better search for event spaces in Tokyo.',
    category: 'maps',
    year: '2025',
    tools: ['vue', 'leaflet'],
    status: 'WIP',
    url: './projects/venue-search/dist/index.html',
  },
  {
    id: 'reading-buddy',
    indexNumber: 5,
    title: 'Reading Buddy',
    tagline: 'a companion for the long book',
    description: 'Track your reading with progressive character reveals and chapter-by-chapter companion guides.',
    category: 'reading',
    year: '2025',
    tools: ['vue', 'vite'],
    status: 'live',
    url: './projects/reading-buddy/dist/index.html',
  },
  {
    id: 'japan-map',
    indexNumber: 4,
    title: 'Japan History Map',
    tagline: 'centuries on a single canvas',
    description: 'Significant events in Japanese history and the Tokyo train system, laid out on an interactive Leaflet map.',
    category: 'maps',
    year: '2025',
    tools: ['leaflet', 'vue'],
    status: 'live',
    url: './projects/japan-map/dist/index.html',
  },
  {
    id: 'right-word-japanese',
    indexNumber: 3,
    title: 'The Right Word',
    tagline: 'a phrasebook for awkward moments',
    description: 'Quick help when speaking Japanese — find the right word for the situation. Includes keigo for the careful moments.',
    category: 'language',
    year: '2025',
    tools: ['vue', 'vite'],
    status: 'WIP',
    url: './projects/right-word/dist/index.html',
  },
  {
    id: 'japanese-dashboard',
    indexNumber: 2,
    title: 'Japanese Learning',
    tagline: 'a dashboard of small tools',
    description: 'A collection of small, useful utilities for Japanese learning, all in one place.',
    category: 'language',
    year: '2025',
    tools: ['vue', 'vite'],
    status: 'live',
    url: './projects/japandash/dist/index.html',
  },
  {
    id: 'bible-hymn-kids',
    indexNumber: 1,
    title: 'Bible Hymn Learning',
    tagline: 'hymns and scripture for young learners',
    description: 'Interactive hymn and scripture learning experience designed for kids.',
    category: 'reading',
    year: '2024',
    tools: ['html', 'css', 'js'],
    status: 'WIP',
    url: './projects/bible-hymn/hymn-app.html',
  },
])

const filteredApps = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return apps.value.filter(a => {
    if (selectedCategory.value !== 'all' && a.category !== selectedCategory.value) return false
    if (!q) return true
    return (
      a.title.toLowerCase().includes(q) ||
      a.tagline.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tools.join(' ').toLowerCase().includes(q)
    )
  })
})

function statusLabel(status) {
  return status === 'coming-soon' ? 'coming soon' : status
}

function statusClass(status) {
  if (status === 'live')     return 'text-accent'
  if (status === 'wip')      return 'text-ink'
  if (status === 'archived') return 'text-muted'
  return 'text-muted'
}

function open(entry) {
  if (entry.status === 'coming-soon' || !entry.url) return
  window.open(entry.url, '_blank', 'noopener')
}

async function openSearch() {
  searchOpen.value = true
  await nextTick()
  searchInput.value?.focus()
}

function closeSearch() {
  searchOpen.value = false
  searchQuery.value = ''
  searchInput.value?.blur()
}

function onKeydown(e) {
  const isInputFocused =
    document.activeElement?.tagName === 'INPUT' ||
    document.activeElement?.tagName === 'TEXTAREA'

  if (e.key === '/' && !isInputFocused) {
    e.preventDefault()
    openSearch()
    return
  }

  if (isInputFocused) return

  const max = filteredApps.value.length - 1
  if (max < 0) return

  if (e.key === 'j' || e.key === 'ArrowDown') {
    e.preventDefault()
    focusedIndex.value = Math.min(focusedIndex.value + 1, max)
    entryRefs.value[focusedIndex.value]?.focus()
  } else if (e.key === 'k' || e.key === 'ArrowUp') {
    e.preventDefault()
    focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
    entryRefs.value[focusedIndex.value]?.focus()
  } else if (e.key === 'Enter') {
    const entry = filteredApps.value[focusedIndex.value]
    if (entry) open(entry)
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
