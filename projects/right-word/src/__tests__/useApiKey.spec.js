import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useApiKey } from '../composables/useApiKey'

describe('useApiKey', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('hasKey is false when localStorage is empty', () => {
    const { hasKey } = useApiKey()
    expect(hasKey.value).toBe(false)
  })

  it('saveKey sets the ref and writes to localStorage', () => {
    const { apiKey, saveKey } = useApiKey()
    saveKey('sk-ant-test-123')
    expect(apiKey.value).toBe('sk-ant-test-123')
    expect(localStorage.getItem('nihongo_api_key')).toBe('sk-ant-test-123')
  })

  it('hasKey becomes true after saveKey', () => {
    const { hasKey, saveKey } = useApiKey()
    saveKey('sk-ant-test-123')
    expect(hasKey.value).toBe(true)
  })

  it('clearKey resets the ref to empty string', () => {
    const { apiKey, saveKey, clearKey } = useApiKey()
    saveKey('sk-ant-test-123')
    clearKey()
    expect(apiKey.value).toBe('')
  })

  it('clearKey removes the item from localStorage', () => {
    const { saveKey, clearKey } = useApiKey()
    saveKey('sk-ant-test-123')
    clearKey()
    expect(localStorage.getItem('nihongo_api_key')).toBeNull()
  })

  it('hasKey becomes false after clearKey', () => {
    const { hasKey, saveKey, clearKey } = useApiKey()
    saveKey('sk-ant-test-123')
    clearKey()
    expect(hasKey.value).toBe(false)
  })
})
