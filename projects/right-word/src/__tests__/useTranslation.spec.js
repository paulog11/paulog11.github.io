import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useTranslation, contextOptions } from '../composables/useTranslation'

const mockPhrases = [
  { jp: 'ありがとう', reading: 'arigatou', en: 'Thank you', register: 'casual', note: null },
  { jp: 'ありがとうございます', reading: 'arigatou gozaimasu', en: 'Thank you (polite)', register: 'polite', note: 'Use with strangers' },
]

function makeFetchMock(responseBody) {
  return vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(responseBody)
    })
  )
}

describe('useTranslation', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', makeFetchMock({
      content: [{ text: JSON.stringify(mockPhrases) }]
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('translate exits early if apiKey is empty', async () => {
    const { translate } = useTranslation()
    await translate('')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('translate exits early if query is empty', async () => {
    const { translate } = useTranslation()
    await translate('sk-ant-123')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('sets loading to true during call and false after', async () => {
    const { query, translate, loading } = useTranslation()
    query.value = 'Thank you'

    let loadingDuringCall = false
    vi.stubGlobal('fetch', vi.fn(() => {
      loadingDuringCall = loading.value
      return Promise.resolve({ json: () => Promise.resolve({ content: [{ text: JSON.stringify(mockPhrases) }] }) })
    }))

    await translate('sk-ant-123')
    expect(loadingDuringCall).toBe(true)
    expect(loading.value).toBe(false)
  })

  it('successful response populates results', async () => {
    const { query, translate, results } = useTranslation()
    query.value = 'Thank you'
    await translate('sk-ant-123')
    expect(results.value).toEqual(mockPhrases)
  })

  it('API error in response body sets error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({ error: { message: 'invalid api key' } }))
    const { query, translate, error, results } = useTranslation()
    query.value = 'Thank you'
    await translate('sk-ant-123')
    expect(error.value).toBe('invalid api key')
    expect(results.value).toEqual([])
  })

  it('malformed JSON response sets error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({
      content: [{ text: 'this is not json' }]
    }))
    const { query, translate, error } = useTranslation()
    query.value = 'Thank you'
    await translate('sk-ant-123')
    expect(error.value).toBeTruthy()
  })

  it('clearResults resets results and error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({ error: { message: 'fail' } }))
    const { query, translate, clearResults, results, error } = useTranslation()
    query.value = 'Thank you'
    await translate('sk-ant-123')
    expect(error.value).toBeTruthy()

    clearResults()
    expect(results.value).toEqual([])
    expect(error.value).toBeNull()
  })

  it('system prompt for formal context includes "formal"', async () => {
    const { query, context, translate } = useTranslation()
    query.value = 'I need to speak formally'
    context.value = 'formal'
    await translate('sk-ant-123')

    const callBody = JSON.parse(fetch.mock.calls[0][1].body)
    expect(callBody.system).toContain('formal')
  })

  it('contextOptions has 6 entries', () => {
    expect(contextOptions).toHaveLength(6)
  })
})
