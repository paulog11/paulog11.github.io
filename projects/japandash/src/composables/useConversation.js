import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'
import { sendMessage as apiSend } from '../services/claude-api.js'

export const SCENARIOS = [
  { id: 'free-chat',    label: '🗣 Free Chat',        persona: 'Have a natural, friendly conversation in Japanese.' },
  { id: 'cafe-order',   label: '☕ Café Order',        persona: 'You are a friendly waiter at a cozy café in Tokyo. Take orders and chat about the menu.' },
  { id: 'train',        label: '🚃 Train Station',     persona: 'You are a helpful station attendant in Tokyo. Assist with tickets, directions, and train schedules.' },
  { id: 'self-intro',   label: '👋 Self-Introduction', persona: 'You are meeting this person for the first time at a Japanese language school. Exchange introductions and backgrounds.' },
  { id: 'hobby-talk',   label: '🎮 Hobby Talk',        persona: 'You are a Japanese friend who enjoys chatting about hobbies, sports, and interests.' },
]

export const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1']

function buildSystemPrompt(scenario, level) {
  return `You are a Japanese conversation partner. ${scenario.persona}

The user is studying Japanese at JLPT ${level} level. Use vocabulary and grammar appropriate for ${level}.

ALWAYS respond with valid JSON in exactly this format — no other text:
{
  "ja": "<your Japanese response, 1–2 sentences>",
  "en": "<English translation of your response>",
  "furigana": [{"word": "<kanji or katakana word>", "reading": "<hiragana reading>"}],
  "correction": "<a single brief, gentle note if the user made a clear grammar or particle mistake — otherwise empty string>"
}

In "furigana", only include words the user likely doesn't know at ${level}. Keep the list short — 0 to 4 entries.
Be encouraging and natural. If the user writes in English, reply in Japanese and gently invite them to try in Japanese.`
}

export function useConversation() {
  const apiKey    = useLocalStorage('japandash:anthropic-key', '')
  const scenarioId = useLocalStorage('japandash:conv-scenario', 'free-chat')
  const level     = useLocalStorage('japandash:conv-level', 'N4')
  const allHistory = useLocalStorage('japandash:conv-history', {})
  const loading   = ref(false)
  const error     = ref(null)

  const hasKey = computed(() => !!apiKey.value)

  const activeScenario = computed(
    () => SCENARIOS.find(s => s.id === scenarioId.value) ?? SCENARIOS[0]
  )

  const activeHistory = computed(() => allHistory.value[scenarioId.value] ?? [])

  async function send(userText) {
    if (!apiKey.value || !userText.trim()) return

    // Push user message immediately so it appears in the log
    const msgs = [...activeHistory.value, { role: 'user', text: userText, ts: Date.now() }]
    allHistory.value = { ...allHistory.value, [scenarioId.value]: msgs }

    loading.value = true
    error.value = null

    try {
      const apiMessages = msgs.slice(-20).map(m => ({
        role: m.role,
        content: m.role === 'user'
          ? m.text
          : JSON.stringify({ ja: m.ja, en: m.en, furigana: m.furigana, correction: m.correction }),
      }))

      const raw = await apiSend({
        apiKey: apiKey.value,
        system: buildSystemPrompt(activeScenario.value, level.value),
        messages: apiMessages,
      })

      let parsed
      try {
        const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()
        parsed = JSON.parse(cleaned)
      } catch { parsed = { ja: raw, en: '', furigana: [], correction: '' } }

      const reply = {
        role: 'assistant',
        ja: parsed.ja ?? '',
        en: parsed.en ?? '',
        furigana: Array.isArray(parsed.furigana) ? parsed.furigana : [],
        correction: parsed.correction ?? '',
        ts: Date.now(),
      }

      allHistory.value = { ...allHistory.value, [scenarioId.value]: [...msgs, reply] }
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function clearHistory() {
    const h = { ...allHistory.value }
    delete h[scenarioId.value]
    allHistory.value = h
  }

  return { apiKey, hasKey, scenarioId, level, loading, error, activeScenario, activeHistory, send, clearHistory }
}
