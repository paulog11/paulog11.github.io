<template>
  <ShinjukuScene :projects="apps" @select="open" />
</template>

<script setup>
import { ref } from 'vue'
import ShinjukuScene from './components/ShinjukuScene.vue'

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

// The scene dispatches two payload kinds: a project stall/board row, or a
// diegetic widget standing in for a link (résumé, profile, contact).
function open(payload) {
  if (!payload) return

  if (payload.kind === 'link') {
    if (payload.download) {
      const a = document.createElement('a')
      a.href = payload.url
      a.download = payload.download
      document.body.appendChild(a)
      a.click()
      a.remove()
    } else {
      window.open(payload.url, '_blank', 'noopener')
    }
    return
  }

  const entry = payload.project
  if (!entry || entry.status === 'coming-soon' || !entry.url) return
  window.open(entry.url, '_blank', 'noopener')
}
</script>
