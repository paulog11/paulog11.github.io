<template>
  <CommandCenter :entry-count="filteredApps.length">

    <!-- ── LEFT SIDEBAR ── -->
    <template #left>
      <LeftSidebar
        profile-url="./projects/profile/"
        resume-url="./assets/Paulo_Gonzales_Resume_SoftwareEngineer.pdf"
        resume-filename="Paulo_Gonzales_Resume_SoftwareEngineer.pdf"
      />
    </template>

    <!-- ── CENTER MAIN PANEL ── -->
    <div class="h-full flex flex-col font-tech overflow-hidden">

      <!-- Panel header -->
      <div class="flex items-start justify-between pb-3 border-b border-mecha-accent/15 shrink-0">
        <div>
          <div class="text-mecha-accent text-[0.58rem] tracking-[0.22em] mb-1">Projects</div>
          <div class="text-mecha-text/35 text-[0.55rem] tracking-[0.14em]">
            {{ filteredApps.length }} entries · newest first
          </div>
        </div>
        <div class="text-mecha-text/20 text-[0.52rem] tracking-widest">{{ updatedLabel }}</div>
      </div>

      <!-- Filter row -->
      <div class="flex flex-wrap items-center gap-x-1 gap-y-1.5 py-3 border-b border-mecha-accent/10 shrink-0">
        <span class="text-mecha-text/25 text-[0.55rem] tracking-[0.2em] mr-1">FILTER</span>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="setCategory(cat.id)"
          :class="[
            'px-2 py-0.5 text-[0.6rem] tracking-[0.14em] uppercase transition-colors duration-150',
            selectedCategory === cat.id
              ? 'text-mecha-accent border-b border-mecha-accent'
              : 'text-mecha-text/35 hover:text-mecha-text/65'
          ]"
        >{{ cat.label }}</button>
        <span class="ml-auto flex items-center gap-1 text-mecha-text/20 text-[0.5rem] tracking-widest">
          <kbd class="px-1 py-px border border-mecha-accent/15">J</kbd>
          <kbd class="px-1 py-px border border-mecha-accent/15">K</kbd>
          <span class="ml-0.5">NAV</span>
        </span>
      </div>

      <!-- Entry list -->
      <ul class="flex-1 overflow-y-auto divide-y divide-mecha-accent/8">
        <li
          v-for="(entry, i) in filteredApps"
          :key="entry.id"
          v-motion
          :initial="{ opacity: 0, x: -10 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: i * 45, duration: 300 } }"
          :ref="el => { if (el) entryRefs[i] = el }"
          @mouseenter="onHover(entry, i)"
          @click="open(entry)"
          @keydown.enter.prevent="open(entry)"
          tabindex="0"
          :class="[
            'group relative block py-5 cursor-pointer outline-none transition-colors duration-150',
            'hover:bg-mecha-accent/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-mecha-accent/30',
            focusedIndex === i ? 'bg-mecha-accent/[0.06]' : '',
            entry.status === 'coming-soon' ? 'opacity-40 pointer-events-none' : '',
          ]"
        >
          <!-- Left accent bar -->
          <span
            :class="[
              'absolute left-0 top-4 bottom-4 w-[2px] bg-mecha-accent transition-all duration-200',
              focusedIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-50',
            ]"
          />

          <!-- Index + title -->
          <div class="flex items-baseline gap-3 px-4">
            <span class="text-mecha-accent text-[0.68rem] tabular-nums shrink-0 tracking-wider">
              [{{ String(entry.indexNumber).padStart(3, '0') }}]
            </span>
            <span class="text-mecha-text text-[0.9rem] tracking-[0.06em] truncate flex-1">
              {{ entry.title }}
            </span>
            <span
              v-if="entry.status !== 'coming-soon'"
              :class="[
                'text-mecha-accent text-[0.58rem] tracking-[0.18em] shrink-0 transition-opacity duration-150',
                focusedIndex === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
              ]"
            >→ open</span>
            <span v-else class="text-mecha-text/20 text-[0.55rem] tracking-widest shrink-0">QUEUED</span>
          </div>

          <!-- Tagline -->
          <div class="mt-1.5 px-4 pl-[4.6rem] text-mecha-text/40 text-[0.63rem] tracking-[0.06em]">
            {{ entry.tagline }}
          </div>

          <!-- Metadata row -->
          <div class="mt-2 px-4 pl-[4.6rem] flex flex-wrap gap-x-5 gap-y-0.5 text-[0.58rem] tracking-[0.1em]">
            <span class="text-mecha-text/25">
              category <span class="text-mecha-text/55 ml-1">{{ entry.category }}</span>
            </span>
            <span class="text-mecha-text/25">
              year <span class="text-mecha-text/55 ml-1">{{ entry.year }}</span>
            </span>
            <span class="text-mecha-text/25">
              tools <span class="text-mecha-text/50 ml-1">{{ entry.tools.join(', ') }}</span>
            </span>
            <span class="text-mecha-text/25">
              status <span :class="statusClass(entry.status)" class="ml-1">{{ statusLabel(entry.status) }}</span>
            </span>
          </div>
        </li>
      </ul>

      <p
        v-if="filteredApps.length === 0"
        class="py-10 text-center text-mecha-text/25 text-[0.65rem] tracking-[0.14em]"
      >
        No projects match
      </p>

    </div>

    <!-- ── RIGHT TELEMETRY ── -->
    <template #right>
      <RightTelemetry :selected-project="activeProject" />
    </template>

  </CommandCenter>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useMagicKeys, useLocalStorage } from '@vueuse/core'
import CommandCenter from './components/CommandCenter.vue'
import LeftSidebar   from './components/LeftSidebar.vue'
import RightTelemetry from './components/RightTelemetry.vue'

const updatedLabel = '2026-05'

const categories = [
  { id: 'all',         label: 'all' },
  { id: 'language',    label: 'language' },
  { id: 'games',       label: 'games' },
  { id: 'maps',        label: 'maps' },
  { id: 'simulations', label: 'simulations' },
  { id: 'reading',     label: 'reading' },
]

// Persisted across visits via VueUse
const selectedCategory = useLocalStorage('mecha-filter-category', 'all')

const focusedIndex = ref(-1)
const activeProject  = ref(null)
const entryRefs      = ref([])

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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
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
    github: '',
  },
])

const filteredApps = computed(() =>
  selectedCategory.value === 'all'
    ? apps.value
    : apps.value.filter(a => a.category === selectedCategory.value)
)

// ── Interaction handlers ──
function setCategory(id) {
  selectedCategory.value = id
  focusedIndex.value = -1
  activeProject.value  = null
  entryRefs.value = []
}

function onHover(entry, i) {
  focusedIndex.value  = i
  activeProject.value = entry
}

function open(entry) {
  if (entry.status === 'coming-soon' || !entry.url) return
  window.open(entry.url, '_blank', 'noopener')
}

function statusLabel(status) {
  if (status === 'live')        return 'live'
  if (status === 'WIP')         return 'in progress'
  if (status === 'coming-soon') return 'planned'
  return status
}

function statusClass(status) {
  if (status === 'live') return 'text-mecha-accent'
  if (status === 'WIP')  return 'text-mecha-text/55'
  return 'text-mecha-text/30'
}

// ── Keyboard navigation via VueUse ──
function navDown() {
  const max = filteredApps.value.length - 1
  if (max < 0) return
  focusedIndex.value  = focusedIndex.value < max ? focusedIndex.value + 1 : 0
  activeProject.value = filteredApps.value[focusedIndex.value]
  entryRefs.value[focusedIndex.value]?.scrollIntoView({ block: 'nearest' })
}

function navUp() {
  const max = filteredApps.value.length - 1
  if (max < 0) return
  focusedIndex.value  = focusedIndex.value > 0 ? focusedIndex.value - 1 : max
  activeProject.value = filteredApps.value[focusedIndex.value]
  entryRefs.value[focusedIndex.value]?.scrollIntoView({ block: 'nearest' })
}

const keys = useMagicKeys()

watch(keys.j,         v => { if (v && document.activeElement?.tagName !== 'INPUT') navDown() })
watch(keys.k,         v => { if (v && document.activeElement?.tagName !== 'INPUT') navUp()   })
watch(keys.ArrowDown, v => { if (v) navDown() })
watch(keys.ArrowUp,   v => { if (v) navUp()   })
watch(keys.Enter,     v => {
  if (!v || focusedIndex.value < 0) return
  const entry = filteredApps.value[focusedIndex.value]
  if (entry) open(entry)
})
</script>
