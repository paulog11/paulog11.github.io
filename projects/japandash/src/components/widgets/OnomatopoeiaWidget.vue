<template>
  <WidgetFrame title="Onomatopoeia" icon="💥" collapsible>
    <div class="space-y-3">
      <!-- Category filter -->
      <div class="flex gap-1.5">
        <button
          class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
          :class="!selectedCategory ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
          @click="selectedCategory = ''"
        >
          All
        </button>
        <button
          v-for="(cat, key) in categories"
          :key="key"
          class="px-2 py-1 text-[0.65rem] rounded border transition-colors"
          :class="selectedCategory === key ? 'bg-sumi text-white border-sumi' : 'border-koshi text-usuzumi hover:bg-koshi/40'"
          @click="selectedCategory = key"
        >
          {{ cat.label.split(' ')[1] }}
        </button>
      </div>

      <!-- Daily word card -->
      <div v-if="currentWord" class="rounded-lg bg-koshi/30 p-4 text-center">
        <!-- Jumped-from breadcrumb -->
        <div v-if="jumpedFrom" class="flex items-center justify-center gap-1 mb-2">
          <button
            class="flex items-center gap-1 text-[0.6rem] text-ai hover:underline"
            @click="jumpBack"
          >
            ← {{ jumpedFrom }}
          </button>
        </div>
        <p class="font-mono text-[0.55rem] uppercase tracking-widest text-usuzumi mb-1">
          {{ browseMode ? 'Browse' : "Today's Word" }}
        </p>
        <p class="text-4xl font-body font-bold mb-1">{{ currentWord.word }}</p>
        <p class="text-sm text-usuzumi italic mb-2">{{ currentWord.romaji }}</p>

        <!-- Category badge -->
        <span
          class="inline-block px-2 py-0.5 text-[0.6rem] rounded-full font-medium"
          :class="categoryBadgeClass(currentWord.category)"
        >
          {{ categories[currentWord.category]?.label }}
        </span>

        <p class="text-sm font-medium mt-3">{{ currentWord.meaning }}</p>
        <p class="text-xs text-usuzumi mt-1">{{ currentWord.explanation }}</p>

        <!-- Example -->
        <div v-if="currentWord.examples.length > 0" class="mt-3 text-left bg-white/50 rounded-md p-2">
          <p class="text-sm font-body">{{ currentWord.examples[0].ja }}</p>
          <p class="text-xs text-usuzumi mt-0.5">{{ currentWord.examples[0].en }}</p>
        </div>

        <!-- Related -->
        <div v-if="currentWord.related.length > 0" class="mt-2 flex items-center justify-center gap-1.5">
          <span class="text-[0.6rem] text-usuzumi">Related:</span>
          <span
            v-for="r in currentWord.related"
            :key="r"
            class="text-xs px-1.5 py-0.5 rounded bg-koshi/60 cursor-pointer hover:bg-koshi"
            @click="jumpTo(r)"
          >
            {{ r }}
          </span>
        </div>
      </div>

      <!-- Show another button -->
      <div class="flex gap-2">
        <button
          class="flex-1 py-1.5 text-xs rounded-md border border-koshi text-sumi hover:bg-koshi/40 transition-colors"
          @click="showAnother(); jumpedFrom = null"
        >
          Show Another
        </button>
        <button
          class="py-1.5 px-3 text-xs rounded-md transition-colors"
          :class="browseMode ? 'bg-ai text-white' : 'border border-koshi text-sumi hover:bg-koshi/40'"
          @click="browseMode = !browseMode; jumpedFrom = null"
        >
          {{ browseMode ? 'Daily' : 'Browse' }}
        </button>
      </div>

      <!-- Browse list -->
      <div v-if="browseMode" class="max-h-48 overflow-y-auto space-y-1 pr-1">
        <div
          v-for="item in filteredList"
          :key="item.word"
          class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-koshi/30 transition-colors"
          @click="browseIndex = allItems.indexOf(item); jumpedFrom = null"
        >
          <span class="text-sm font-medium w-16">{{ item.word }}</span>
          <span class="text-xs text-usuzumi flex-1 truncate">{{ item.meaning }}</span>
          <span
            class="w-2 h-2 rounded-full"
            :class="categoryDotClass(item.category)"
          />
        </div>
      </div>
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref, computed } from 'vue'
import WidgetFrame from '../WidgetFrame.vue'
import { onomatopoeia, categories } from '../../data/onomatopoeia.js'

const allItems = onomatopoeia
const selectedCategory = ref('')
const browseMode = ref(false)
const browseIndex = ref(0)
const jumpedFrom = ref(null)   // word we navigated away from via a related link
const jumpedFromIndex = ref(null) // so we can go back

const filteredList = computed(() => {
  if (!selectedCategory.value) return allItems
  return allItems.filter(o => o.category === selectedCategory.value)
})

// Date-seeded daily word
function getDailyIndex() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return seed % allItems.length
}

const dailyIndex = ref(getDailyIndex())

const currentWord = computed(() => {
  if (browseMode.value) {
    return filteredList.value[browseIndex.value % filteredList.value.length] || allItems[0]
  }
  return allItems[dailyIndex.value]
})

function showAnother() {
  if (browseMode.value) {
    browseIndex.value = (browseIndex.value + 1) % filteredList.value.length
  } else {
    dailyIndex.value = (dailyIndex.value + 1) % allItems.length
  }
}

function jumpTo(word) {
  const idx = allItems.findIndex(o => o.word === word)
  if (idx >= 0) {
    jumpedFrom.value = currentWord.value?.word ?? null
    jumpedFromIndex.value = browseMode.value ? browseIndex.value : null
    browseMode.value = true
    browseIndex.value = idx
  }
}

function jumpBack() {
  if (jumpedFrom.value) {
    const idx = jumpedFromIndex.value ?? allItems.findIndex(o => o.word === jumpedFrom.value)
    browseIndex.value = idx >= 0 ? idx : 0
    jumpedFrom.value = null
    jumpedFromIndex.value = null
  }
}

function categoryBadgeClass(cat) {
  const map = {
    giongo: 'bg-ai-light text-ai',
    gitaigo: 'bg-beni/10 text-beni',
    giseigo: 'bg-matcha/15 text-matcha',
  }
  return map[cat] || 'bg-koshi text-sumi'
}

function categoryDotClass(cat) {
  const map = {
    giongo: 'bg-ai',
    gitaigo: 'bg-beni',
    giseigo: 'bg-matcha',
  }
  return map[cat] || 'bg-usuzumi'
}
</script>
