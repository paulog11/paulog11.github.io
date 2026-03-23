import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ResultCard from '../components/ResultCard.vue'

const baseItem = { jp: 'ありがとう', reading: 'arigatou', en: 'Thank you', register: 'casual', note: null }

describe('ResultCard', () => {
  it('renders the Japanese text', () => {
    const wrapper = mount(ResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-jp').text()).toBe('ありがとう')
  })

  it('casual register → tag-casual class', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, register: 'casual' } } })
    expect(wrapper.find('.register-tag').classes()).toContain('tag-casual')
  })

  it('polite register → tag-polite class', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, register: 'polite' } } })
    expect(wrapper.find('.register-tag').classes()).toContain('tag-polite')
  })

  it('formal register → tag-formal class', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, register: 'formal' } } })
    expect(wrapper.find('.register-tag').classes()).toContain('tag-formal')
  })

  it('unknown register falls back to tag-polite', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, register: 'honorific' } } })
    expect(wrapper.find('.register-tag').classes()).toContain('tag-polite')
  })

  it('does not render note when note is null', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, note: null } } })
    expect(wrapper.find('.result-note').exists()).toBe(false)
  })

  it('renders note when note is present', () => {
    const wrapper = mount(ResultCard, { props: { item: { ...baseItem, note: 'Use with elders' } } })
    expect(wrapper.find('.result-note').exists()).toBe(true)
    expect(wrapper.find('.result-note').text()).toBe('Use with elders')
  })
})
