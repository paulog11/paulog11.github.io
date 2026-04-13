import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModeBar from '../components/ModeBar.vue'

describe('ModeBar', () => {
  it('renders two buttons', () => {
    const wrapper = mount(ModeBar, { props: { modelValue: 'translate' } })
    expect(wrapper.findAll('button')).toHaveLength(2)
  })

  it('"translate" button has active class when modelValue is "translate"', () => {
    const wrapper = mount(ModeBar, { props: { modelValue: 'translate' } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).toContain('active')
    expect(buttons[1].classes()).not.toContain('active')
  })

  it('"transform" button has active class when modelValue is "transform"', () => {
    const wrapper = mount(ModeBar, { props: { modelValue: 'transform' } })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].classes()).not.toContain('active')
    expect(buttons[1].classes()).toContain('active')
  })

  it('clicking Transform emits update:modelValue with "transform"', async () => {
    const wrapper = mount(ModeBar, { props: { modelValue: 'translate' } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['transform']])
  })

  it('clicking Translate emits update:modelValue with "translate"', async () => {
    const wrapper = mount(ModeBar, { props: { modelValue: 'transform' } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['translate']])
  })
})
