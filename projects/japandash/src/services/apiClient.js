async function request(method, path, { body, query } = {}) {
  let url = path
  if (query) {
    const params = new URLSearchParams(query)
    url += '?' + params.toString()
  }
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? `API error ${res.status}`)
  return data
}

export const reviewApi = {
  captureMistake: (body) =>
    request('POST', '/api/review/mistakes', { body }),

  due: (limit = 20) =>
    request('GET', '/api/review/due', { query: { limit } }),

  grade: (itemId, rating, elapsedMs) =>
    request('POST', '/api/review/grade', { body: { itemId, rating, elapsedMs } }),

  recent: (limit = 5) =>
    request('GET', '/api/review/recent', { query: { limit } }),
}
