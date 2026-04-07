const BASE_URL = 'https://api.wanikani.com/v2'
const REVISION = '20170710'

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Wanikani-Revision': REVISION,
  }
}

async function fetchJSON(url, token) {
  const res = await fetch(url, { headers: headers(token) })
  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid API key')
    throw new Error(`WaniKani API error: ${res.status}`)
  }
  return res.json()
}

export async function fetchUser(token) {
  const data = await fetchJSON(`${BASE_URL}/user`, token)
  return data.data
}

export async function fetchSummary(token) {
  const data = await fetchJSON(`${BASE_URL}/summary`, token)
  return data.data
}

export async function fetchAssignments(token, params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = query ? `${BASE_URL}/assignments?${query}` : `${BASE_URL}/assignments`
  const data = await fetchJSON(url, token)
  return data
}

export async function fetchAllAssignments(token) {
  const items = []
  let url = `${BASE_URL}/assignments?started=true`
  while (url) {
    const data = await fetchJSON(url, token)
    items.push(...data.data)
    url = data.pages?.next_url || null
  }
  return items
}

export async function fetchLevelProgressions(token) {
  const data = await fetchJSON(`${BASE_URL}/level_progressions`, token)
  return data.data
}

export async function fetchSubjects(token, params = {}) {
  const items = []
  let url = `${BASE_URL}/subjects?${new URLSearchParams(params)}`
  while (url) {
    const data = await fetchJSON(url, token)
    items.push(...data.data)
    url = data.pages?.next_url || null
  }
  return items
}
