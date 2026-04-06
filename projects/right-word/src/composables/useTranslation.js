import { ref } from 'vue'

export const contextOptions = [
  { id: 'casual',     label: 'Casual',          description: 'casual conversation between friends or peers' },
  { id: 'polite',     label: 'Polite',           description: 'polite everyday interaction (standard です/ます)' },
  { id: 'formal',     label: 'Formal',           description: 'formal or business setting (keigo)' },
  { id: 'taxi',       label: 'Taxi / Transport', description: 'talking to a taxi driver in Japan' },
  { id: 'shop',       label: 'Shopping',         description: 'shopping at a Japanese store' },
  { id: 'restaurant', label: 'Restaurant',       description: 'at a Japanese restaurant' },
]

export function useTranslation() {
  const context = ref('casual')
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  let abortController = null

  async function translate(query, apiKey) {
    if (!apiKey || !query?.trim()) return

    if (abortController) abortController.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null
    results.value = []

    const ctx = contextOptions.find(o => o.id === context.value)
    const systemPrompt = `You are a Japanese language assistant for a conversation aid app. The user is intermediate level.
Return ONLY a JSON array of 3-6 phrases/words to express what the user wants to say.
Context: ${ctx.description}.
Each item: { "jp": "Japanese text", "reading": "hiragana reading", "en": "short English", "register": "casual|polite|formal", "note": "optional short tip, max 8 words" }
No explanations, no markdown, only the raw JSON array.`

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: query.trim() }]
        }),
        signal: abortController.signal
      })

      const data = await resp.json()
      if (data.error) throw new Error(data.error.message)

      const text = data.content[0].text.trim().replace(/```json|```/g, '')
      results.value = JSON.parse(text)
    } catch (e) {
      if (e.name === 'AbortError') return
      error.value = e.message || 'An unexpected error occurred.'
    } finally {
      loading.value = false
    }
  }

  function clearResults() {
    results.value = []
    error.value = null
  }

  return { context, contextOptions, results, loading, error, translate, clearResults }
}
