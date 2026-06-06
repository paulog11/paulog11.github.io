<template>
  <div class="min-h-screen bg-washi font-body text-sumi">

    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-4 border-b border-koshi">
      <div>
        <h1 class="font-display text-2xl font-semibold tracking-tight">
          ペラペラQuest
        </h1>
        <p class="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-usuzumi mt-0.5">
          Japanese Learning Dashboard <span class="normal-case tracking-normal opacity-50">v{{ appVersion }}</span>
        </p>
      </div>
      <div class="flex items-center gap-1.5">
        <a
          href="../../../"
          class="p-2 rounded-lg font-mono text-[0.65rem] tracking-[0.1em] uppercase text-usuzumi hover:text-sumi hover:bg-koshi/60 transition-colors"
        >← Home</a>
        <!-- Theme toggle -->
        <button
          class="p-2 rounded-lg text-usuzumi hover:text-sumi hover:bg-koshi/60 transition-colors"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        >
          <!-- Moon: shown in light mode, click to go dark -->
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
          <!-- Sun: shown in dark mode, click to go light -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        </button>
        <!-- Settings -->
        <button
          class="p-2 rounded-lg text-usuzumi hover:text-sumi hover:bg-koshi/60 transition-colors"
          title="Settings"
          @click="showSettings = !showSettings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Path pills (hidden in focus mode) -->
    <div v-if="!focusedWidget" class="flex items-center gap-2 px-6 py-3 border-b border-koshi overflow-x-auto">
      <button
        v-for="path in PATHS"
        :key="path.id"
        class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap min-h-[44px]"
        :class="activePath === path.id
          ? 'bg-ai text-white shadow-sm'
          : 'bg-koshi/40 text-sumi hover:bg-koshi/70'"
        @click="activePath = path.id"
      >
        <span>{{ path.icon }}</span>
        <span>{{ path.label }}</span>
      </button>
    </div>

    <!-- Settings panel -->
    <div v-if="showSettings" class="border-b border-koshi bg-koshi/30 px-6 py-4 animate-slide-down">
      <div class="max-w-xl">
        <label class="block font-mono text-[0.65rem] tracking-[0.1em] uppercase text-usuzumi mb-1.5">
          WaniKani API Key
        </label>
        <div class="flex gap-2">
          <input
            v-model="wanikaniKey"
            type="password"
            placeholder="Enter your WaniKani API token..."
            class="flex-1 px-3 py-2 text-sm rounded-md border border-koshi bg-surface/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-2 focus:ring-ai/30 focus:border-ai/50"
          />
          <button
            class="px-4 py-2 text-sm font-medium rounded-md bg-ai text-white hover:bg-ai/90 transition-colors"
            @click="saveSettings"
          >
            Save
          </button>
        </div>
        <p class="mt-1.5 text-[0.7rem] text-usuzumi">
          Get your API token from WaniKani → Settings → API Tokens
        </p>
        <div class="mt-4">
          <label class="block font-mono text-[0.65rem] tracking-[0.1em] uppercase text-usuzumi mb-1.5">
            Anthropic API Key
          </label>
          <div class="flex gap-2">
            <input
              v-model="anthropicKey"
              type="password"
              placeholder="sk-ant-..."
              class="flex-1 px-3 py-2 text-sm rounded-md border border-koshi bg-surface/80 placeholder:text-usuzumi/50 focus:outline-none focus:ring-2 focus:ring-ai/30 focus:border-ai/50"
            />
          </div>
          <p class="mt-1.5 text-[0.7rem] text-usuzumi">
            Used by the Conversation widget — get yours at console.anthropic.com
          </p>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <main class="p-6">

      <!-- FOCUS view: strip of other activities + maximized active widget -->
      <div v-if="focusedWidget" class="space-y-4">

        <!-- Other activities strip -->
        <div class="flex items-center gap-2 flex-wrap">
          <button
            class="px-3 py-1.5 text-xs rounded-md border border-koshi text-usuzumi hover:bg-koshi/40 transition-colors"
            @click="clearFocus()"
          >
            ✕ Exit Focus
          </button>
          <button
            v-for="wid in focusStripWidgets"
            :key="wid"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-colors"
            :class="'border-koshi text-sumi hover:bg-koshi/40'"
            @click="setFocus(wid)"
          >
            <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="areaColorFor(wid)" />
            <span>{{ widgetIcon(wid) }}</span>
            <span>{{ widgetTitle(wid) }}</span>
          </button>
        </div>

        <!-- Maximized widget -->
        <div class="min-h-[72vh] flex">
          <component
            :is="widgetComponents[focusedWidget]"
            :widget-id="focusedWidget"
            class="flex-1"
          />
        </div>
      </div>

      <!-- DASHBOARD view (normal) -->
      <template v-else>

        <!-- ALL view: four skill zones -->
        <div v-if="activePath === 'all'" class="space-y-10">
          <section v-for="zone in populatedZones" :key="zone.id">
            <!-- Zone header -->
            <div class="flex items-center gap-3 mb-5">
              <span class="font-display text-base font-semibold text-sumi">{{ zone.ja }}</span>
              <span class="font-mono text-[0.58rem] tracking-[0.15em] uppercase text-usuzumi">{{ zone.en }}</span>
              <div class="flex-1 h-px bg-koshi" />
            </div>
            <!-- Bento grid — fixed row height aligns all cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-[176px]">
              <component
                v-for="wid in zoneWidgets(zone.id)"
                :key="wid"
                :is="widgetComponents[wid]"
                :widget-id="wid"
              />
            </div>
          </section>
        </div>

        <!-- PATH view: curated widget subset -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-[176px]">
            <component
              v-for="wid in pathWidgets"
              :key="wid"
              :is="widgetComponents[wid]"
              :widget-id="wid"
            />
          </div>
        </div>

      </template>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useLocalStorage } from './composables/useLocalStorage.js'
import { useWidgetLayout, ZONES, PATHS, WIDGET_META } from './composables/useWidgetLayout.js'

const appVersion = __APP_VERSION__
import WaniKaniWidget from './components/widgets/WaniKaniWidget.vue'
import VocabWidget from './components/widgets/VocabWidget.vue'
import JishoWidget from './components/widgets/JishoWidget.vue'
import ShadowingWidget from './components/widgets/ShadowingWidget.vue'
import OnomatopoeiaWidget from './components/widgets/OnomatopoeiaWidget.vue'
import GrammarWidget from './components/widgets/GrammarWidget.vue'
import ReadingWidget from './components/widgets/ReadingWidget.vue'
import ConversationWidget from './components/widgets/ConversationWidget.vue'
import MistakeReviewWidget from './components/widgets/MistakeReviewWidget.vue'

const { widgetOrder, activePath, focusedWidget, setFocus, clearFocus } = useWidgetLayout()

const widgetComponents = {
  wanikani: WaniKaniWidget,
  vocab: VocabWidget,
  jisho: JishoWidget,
  shadowing: ShadowingWidget,
  onomatopoeia: OnomatopoeiaWidget,
  grammar: GrammarWidget,
  reading: ReadingWidget,
  conversation: ConversationWidget,
  review: MistakeReviewWidget,
}

// — Theme —
const storedTheme = useLocalStorage('japandash:theme', 'light')
const isDark = ref(storedTheme.value === 'dark')

function toggleTheme() {
  isDark.value = !isDark.value
  storedTheme.value = isDark.value ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', isDark.value)
}

// — Settings —
const showSettings = ref(false)
const storedKey = useLocalStorage('japandash:wanikani-key', '')
const wanikaniKey = ref(storedKey.value)
const storedAnthropicKey = useLocalStorage('japandash:anthropic-key', '')
const anthropicKey = ref(storedAnthropicKey.value)

function saveSettings() {
  storedKey.value = wanikaniKey.value
  storedAnthropicKey.value = anthropicKey.value
  showSettings.value = false
}

// — Zone helpers —
const populatedZones = computed(() =>
  ZONES.filter(zone => widgetOrder.value.some(id => WIDGET_META[id]?.area === zone.id))
)

function zoneWidgets(zoneId) {
  return widgetOrder.value.filter(id => WIDGET_META[id]?.area === zoneId)
}

// — Path helpers —
const pathWidgets = computed(() => {
  const p = PATHS.find(p => p.id === activePath.value)
  if (!p?.widgets) return []
  const all = [...p.widgets, ...(p.rail ?? [])]
  // Maintain widgetOrder sequence within the path's widget set
  return widgetOrder.value.filter(id => all.includes(id))
})

// — Focus helpers —
const focusStripWidgets = computed(() =>
  widgetOrder.value.filter(id => id !== focusedWidget.value && !WIDGET_META[id]?.tool)
)

const AREA_COLORS = {
  track: 'bg-ai', input: 'bg-matcha', output: 'bg-beni', reference: 'bg-kin',
}
function areaColorFor(id) {
  return AREA_COLORS[WIDGET_META[id]?.area] ?? 'bg-usuzumi'
}

const WIDGET_LABELS = {
  wanikani: { icon: '🐊', title: 'WaniKani' },
  review: { icon: '直', title: 'Mistake Review' },
  vocab: { icon: '📚', title: 'Vocab' },
  shadowing: { icon: '🎙', title: 'Shadowing' },
  reading: { icon: '📖', title: 'Reading' },
  conversation: { icon: '💬', title: 'Conversation' },
  jisho: { icon: '辞', title: 'Jisho' },
  grammar: { icon: '文', title: 'Grammar' },
  onomatopoeia: { icon: '💥', title: 'Onomatopoeia' },
}
function widgetIcon(id) { return WIDGET_LABELS[id]?.icon ?? '' }
function widgetTitle(id) { return WIDGET_LABELS[id]?.title ?? id }

// Scroll to top when entering focus mode
watch(focusedWidget, (val) => { if (val) window.scrollTo({ top: 0, behavior: 'smooth' }) })
</script>
