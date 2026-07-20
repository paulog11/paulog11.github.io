import { ref, watch } from 'vue'

export const WIDGET_META = {
  wanikani:     { area: 'track',     size: 'large', tool: true  },
  kanji:        { area: 'track',     size: 'large' },
  review:       { area: 'track',     size: 'small' },
  vocab:        { area: 'input',     size: 'large' },
  shadowing:    { area: 'input',     size: 'wide'  },
  reading:      { area: 'input',     size: 'large' },
  conversation: { area: 'output',    size: 'large' },
  jisho:        { area: 'reference', size: 'small', tool: true  },
  grammar:      { area: 'reference', size: 'small' },
  onomatopoeia: { area: 'reference', size: 'small' },
}

export const ZONES = [
  { id: 'track',     ja: '進捗',       en: 'Track' },
  { id: 'input',     ja: 'インプット',   en: 'Input' },
  { id: 'output',    ja: 'アウトプット', en: 'Output' },
  { id: 'reference', ja: '辞書',       en: 'Reference' },
]

export const PATHS = [
  { id: 'all',    label: 'All',           icon: '🔍', widgets: null },
  { id: 'warmup', label: 'Daily Warmup',  icon: '🌅', widgets: ['wanikani', 'kanji', 'vocab', 'onomatopoeia'] },
  { id: 'read',   label: 'Comprehension', icon: '📖', widgets: ['reading', 'shadowing'], rail: ['jisho', 'grammar'] },
  { id: 'speak',  label: 'Speaking',      icon: '🗣', widgets: ['conversation', 'review'] },
]

const DEFAULT_ORDER = ['wanikani', 'kanji', 'vocab', 'jisho', 'shadowing', 'onomatopoeia', 'grammar', 'reading', 'conversation', 'review']

function loadSavedOrder() {
  try {
    const v2 = localStorage.getItem('japandash:widget-layout-v2')
    if (v2) {
      const saved = JSON.parse(v2)
      if (saved?.order?.length === DEFAULT_ORDER.length) return saved.order
    }
    // Fall back to v1 order to preserve any existing drag arrangement
    const v1 = localStorage.getItem('japandash:widget-layout-v1')
    if (v1) {
      const saved = JSON.parse(v1)
      if (saved?.order?.length === DEFAULT_ORDER.length) return saved.order
    }
  } catch {}
  return [...DEFAULT_ORDER]
}

function loadSavedPath() {
  try { return localStorage.getItem('japandash:active-path') || 'all' } catch { return 'all' }
}

// Module-level singletons — shared by all consumers
const widgetOrder   = ref(loadSavedOrder())
const activePath    = ref(loadSavedPath())
const draggingId    = ref(null)
const dragOverId    = ref(null)
const focusedWidget = ref(null)

watch(widgetOrder, () => {
  try {
    localStorage.setItem('japandash:widget-layout-v2', JSON.stringify({ order: widgetOrder.value }))
  } catch {}
}, { deep: true })

watch(activePath, (val) => {
  try { localStorage.setItem('japandash:active-path', val) } catch {}
})

export function useWidgetLayout() {
  function reorder(fromId, toId) {
    if (!fromId || !toId || fromId === toId) return
    const arr = [...widgetOrder.value]
    const fi = arr.indexOf(fromId)
    const ti = arr.indexOf(toId)
    if (fi === -1 || ti === -1) return
    arr.splice(fi, 1)
    arr.splice(ti, 0, fromId)
    widgetOrder.value = arr
  }

  function setFocus(id) {
    if (!id || WIDGET_META[id]?.tool) return
    focusedWidget.value = id
  }

  function clearFocus() {
    focusedWidget.value = null
  }

  return { widgetOrder, activePath, draggingId, dragOverId, reorder, focusedWidget, setFocus, clearFocus }
}
