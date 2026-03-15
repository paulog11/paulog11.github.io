const CORS_PROXY = 'https://corsproxy.io/?'
const JISHO_BASE = 'https://jisho.org/api/v1/search/words'

export async function searchWords(keyword) {
  const url = `${CORS_PROXY}${encodeURIComponent(`${JISHO_BASE}?keyword=${encodeURIComponent(keyword)}`)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Jisho API error: ${res.status}`)
  const json = await res.json()
  return json.data.map(parseResult)
}

function parseResult(item) {
  const japanese = item.japanese?.[0] || {}
  const senses = (item.senses || []).map(s => ({
    definitions: s.english_definitions || [],
    partsOfSpeech: s.parts_of_speech || [],
  }))
  return {
    word: japanese.word || japanese.reading || '',
    reading: japanese.reading || '',
    allReadings: item.japanese || [],
    senses,
    jlpt: item.jlpt || [],
    isCommon: item.is_common || false,
    tags: item.tags || [],
  }
}
