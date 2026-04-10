const JISHO_BASE = 'https://jisho.org/api/v1/search/words'

const PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
]

export async function searchWords(keyword) {
  const target = `${JISHO_BASE}?keyword=${encodeURIComponent(keyword)}`
  let lastError
  for (const proxy of PROXIES) {
    try {
      const res = await fetch(proxy(target))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json.data.map(parseResult)
    } catch (err) {
      lastError = err
    }
  }
  throw new Error(`Jisho unavailable: ${lastError?.message}`)
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
