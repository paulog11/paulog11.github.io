import { ref, reactive, watch } from 'vue'

const DEFAULT_ORDER = ['wanikani', 'vocab', 'jisho', 'shadowing', 'onomatopoeia', 'grammar', 'reading', 'conversation']
const DEFAULT_CONFIG = {
  wanikani:     { colSpan: 1, height: null },
  vocab:        { colSpan: 2, height: null },
  jisho:        { colSpan: 1, height: null },
  shadowing:    { colSpan: 2, height: null },
  onomatopoeia: { colSpan: 1, height: null },
  grammar:      { colSpan: 1, height: null },
  reading:      { colSpan: 2, height: null },
  conversation: { colSpan: 2, height: null },
}

const STORAGE_KEY = 'japandash:widget-layout-v1'

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const saved = loadSaved()

// Module-level singleton — shared by all WidgetFrame instances
const widgetOrder = ref(
  saved?.order?.length === DEFAULT_ORDER.length ? saved.order : [...DEFAULT_ORDER]
)

const widgetConfig = reactive(
  Object.fromEntries(
    DEFAULT_ORDER.map(id => [
      id,
      { ...DEFAULT_CONFIG[id], ...(saved?.config?.[id] ?? {}) },
    ])
  )
)

// Shared drag state
const draggingId = ref(null)
const dragOverId = ref(null)

watch(
  [widgetOrder, widgetConfig],
  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      order: widgetOrder.value,
      config: { ...widgetConfig },
    }))
  },
  { deep: true }
)

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

  function updateConfig(id, updates) {
    if (widgetConfig[id]) Object.assign(widgetConfig[id], updates)
    else widgetConfig[id] = { ...updates }
  }

  return { widgetOrder, widgetConfig, draggingId, dragOverId, reorder, updateConfig }
}
