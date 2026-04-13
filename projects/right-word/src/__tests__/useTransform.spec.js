import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useTransform, directionOptions } from '../composables/useTransform'

const mockResults = [
  { jp: 'ご確認いただけますか', reading: 'gokakunin itadakemasu ka', note: '～ていただく replaces ～てもらう' },
  { jp: 'ご確認をお願いいたします', reading: 'gokakunin wo onegai itashimasu', note: 'お願いいたします is more deferential' },
]

function makeFetchMock(responseBody) {
  return vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(responseBody)
    })
  )
}

describe('useTransform', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', makeFetchMock({
      content: [{ text: JSON.stringify(mockResults) }]
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('transform exits early if apiKey is empty', async () => {
    const { transform } = useTransform()
    await transform('確認してください', '')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('transform exits early if inputText is empty', async () => {
    const { transform } = useTransform()
    await transform('', 'sk-ant-123')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('transform exits early if inputText is whitespace only', async () => {
    const { transform } = useTransform()
    await transform('   ', 'sk-ant-123')
    expect(fetch).not.toHaveBeenCalled()
  })

  it('sets loading to true during call and false after', async () => {
    const { transform, loading } = useTransform()

    let loadingDuringCall = false
    vi.stubGlobal('fetch', vi.fn(() => {
      loadingDuringCall = loading.value
      return Promise.resolve({ json: () => Promise.resolve({ content: [{ text: JSON.stringify(mockResults) }] }) })
    }))

    await transform('確認してください', 'sk-ant-123')
    expect(loadingDuringCall).toBe(true)
    expect(loading.value).toBe(false)
  })

  it('successful response populates results', async () => {
    const { transform, results } = useTransform()
    await transform('確認してください', 'sk-ant-123')
    expect(results.value).toEqual(mockResults)
  })

  it('API error in response body sets error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({ error: { message: 'invalid api key' } }))
    const { transform, error, results } = useTransform()
    await transform('確認してください', 'sk-ant-123')
    expect(error.value).toBe('invalid api key')
    expect(results.value).toEqual([])
  })

  it('malformed JSON response sets error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({
      content: [{ text: 'this is not json' }]
    }))
    const { transform, error } = useTransform()
    await transform('確認してください', 'sk-ant-123')
    expect(error.value).toBeTruthy()
  })

  it('clearResults resets results and error', async () => {
    vi.stubGlobal('fetch', makeFetchMock({ error: { message: 'fail' } }))
    const { transform, clearResults, results, error } = useTransform()
    await transform('確認してください', 'sk-ant-123')
    expect(error.value).toBeTruthy()

    clearResults()
    expect(results.value).toEqual([])
    expect(error.value).toBeNull()
  })

  it('system prompt for to-keigo direction contains "keigo"', async () => {
    const { transform } = useTransform()
    await transform('確認してください', 'sk-ant-123')

    const callBody = JSON.parse(fetch.mock.calls[0][1].body)
    expect(callBody.system.toLowerCase()).toContain('keigo')
  })

  it('system prompt for to-normal direction contains "plain"', async () => {
    const { direction, transform } = useTransform()
    direction.value = 'to-normal'
    await transform('ご確認いただけますか', 'sk-ant-123')

    const callBody = JSON.parse(fetch.mock.calls[0][1].body)
    expect(callBody.system.toLowerCase()).toContain('plain')
  })

  it('directionOptions has 2 entries', () => {
    expect(directionOptions).toHaveLength(2)
  })

  it('aborts previous in-flight request when transform is called again', async () => {
    let abortSignal = null
    vi.stubGlobal('fetch', vi.fn((_, opts) => {
      abortSignal = opts.signal
      return new Promise((resolve) => {
        opts.signal.addEventListener('abort', () => resolve({ json: () => Promise.resolve({}) }))
      })
    }))

    const { transform } = useTransform()

    const first = transform('確認してください', 'sk-ant-123')
    expect(abortSignal.aborted).toBe(false)

    vi.stubGlobal('fetch', makeFetchMock({ content: [{ text: JSON.stringify(mockResults) }] }))
    await transform('お願いします', 'sk-ant-123')

    expect(abortSignal.aborted).toBe(true)
    await first
  })
})
