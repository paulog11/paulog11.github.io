import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TransformResultCard from '../components/TransformResultCard.vue'

const baseItem = { jp: 'ご確認いただけますか', reading: 'gokakunin itadakemasu ka', note: '～ていただく replaces ～てもらう' }

describe('TransformResultCard', () => {
  it('renders Japanese text in .result-jp', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-jp').text()).toBe(baseItem.jp)
  })

  it('renders reading in .result-reading', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-reading').text()).toBe(baseItem.reading)
  })

  it('renders note when note is present', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-note').text()).toBe(baseItem.note)
  })

  it('does not render note when note is null', () => {
    const wrapper = mount(TransformResultCard, { props: { item: { ...baseItem, note: null } } })
    expect(wrapper.find('.result-note').exists()).toBe(false)
  })

  it('note has class result-note--transform', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-note').classes()).toContain('result-note--transform')
  })

  it('does not render .register-tag', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.register-tag').exists()).toBe(false)
  })

  it('does not render .result-en', () => {
    const wrapper = mount(TransformResultCard, { props: { item: baseItem } })
    expect(wrapper.find('.result-en').exists()).toBe(false)
  })
})
