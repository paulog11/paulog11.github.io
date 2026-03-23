import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowOverlay from '../components/ShowOverlay.vue'

const mockResults = [
  { jp: 'ありがとう', reading: 'arigatou', en: 'Thank you' },
  { jp: 'どうも', reading: 'doumo', en: 'Thanks' },
]

describe('ShowOverlay', () => {
  it('does not render when visible is false', () => {
    const wrapper = mount(ShowOverlay, { props: { results: mockResults, visible: false } })
    expect(wrapper.find('.show-overlay').exists()).toBe(false)
  })

  it('renders when visible is true', () => {
    const wrapper = mount(ShowOverlay, { props: { results: mockResults, visible: true } })
    expect(wrapper.find('.show-overlay').exists()).toBe(true)
  })

  it('renders all result items when visible', () => {
    const wrapper = mount(ShowOverlay, { props: { results: mockResults, visible: true } })
    expect(wrapper.findAll('.show-item')).toHaveLength(2)
  })

  it('renders the Japanese text for each item', () => {
    const wrapper = mount(ShowOverlay, { props: { results: mockResults, visible: true } })
    const items = wrapper.findAll('.show-item')
    expect(items[0].find('.jp').text()).toBe('ありがとう')
    expect(items[1].find('.jp').text()).toBe('どうも')
  })

  it('emits close when the overlay is clicked', async () => {
    const wrapper = mount(ShowOverlay, { props: { results: mockResults, visible: true } })
    await wrapper.find('.show-overlay').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
