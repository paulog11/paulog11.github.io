const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'

export async function sendMessage({ apiKey, system, messages, maxTokens = 512 }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
      messages,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Claude API ${res.status}: ${body}`)
  }
  const data = await res.json()
  return data.content[0]?.text ?? ''
}
