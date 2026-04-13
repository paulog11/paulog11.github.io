import { ref } from 'vue'

export const directionOptions = [
  { id: 'to-keigo',  label: '→ Keigo',  description: 'Convert to formal/polite Japanese (keigo)' },
  { id: 'to-normal', label: '→ Normal', description: 'Convert to casual/plain Japanese' },
]

export function useTransform() {
  const direction = ref('to-keigo')
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  let abortController = null

  async function transform(inputText, apiKey) {
    if (!apiKey || !inputText?.trim()) return

    if (abortController) abortController.abort()
    abortController = new AbortController()

    loading.value = true
    error.value = null
    results.value = []

    const systemPrompt = direction.value === 'to-keigo'
      ? `You are a Japanese language assistant. The user provides casual or plain Japanese text.
Return ONLY a JSON array of 2-4 keigo (formal/polite) alternatives.
Each item: { "jp": "Japanese text", "reading": "hiragana reading", "note": "what changed, max 10 words" }
Use ～ていただく, ～でございます, honorific verb forms and お/ご prefixes as appropriate.
No explanations, no markdown, only the raw JSON array.`
      : `You are a Japanese language assistant. The user provides formal or polite Japanese (keigo).
Return ONLY a JSON array of 2-4 casual/plain alternatives.
Each item: { "jp": "Japanese text", "reading": "hiragana reading", "note": "what changed, max 10 words" }
Use plain form verbs, drop keigo prefixes, use だ/だよ/じゃない endings.
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
          max_tokens: 800,
          system: systemPrompt,
          messages: [{ role: 'user', content: inputText.trim() }]
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

  return { direction, directionOptions, results, loading, error, transform, clearResults }
}
