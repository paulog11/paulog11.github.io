import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiKeyBar from '../components/ApiKeyBar.vue'

describe('ApiKeyBar', () => {
  describe('when hasKey is false', () => {
    it('shows the password input', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: false } })
      expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    })

    it('shows the Save button', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: false } })
      expect(wrapper.find('.save-btn').text()).toBe('Save')
    })

    it('does not show the saved indicator', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: false } })
      expect(wrapper.find('.api-saved').exists()).toBe(false)
    })

    it('emits save with the input value when Save is clicked', async () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: false } })
      await wrapper.find('input').setValue('sk-ant-test-key')
      await wrapper.find('.save-btn').trigger('click')
      expect(wrapper.emitted('save')).toBeTruthy()
      expect(wrapper.emitted('save')[0]).toEqual(['sk-ant-test-key'])
    })

    it('does not emit save when input is empty', async () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: false } })
      await wrapper.find('.save-btn').trigger('click')
      expect(wrapper.emitted('save')).toBeFalsy()
    })
  })

  describe('when hasKey is true', () => {
    it('shows the saved indicator', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: true } })
      expect(wrapper.find('.api-saved').exists()).toBe(true)
    })

    it('shows the Clear button', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: true } })
      expect(wrapper.find('.save-btn').text()).toBe('Clear')
    })

    it('does not show the password input', () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: true } })
      expect(wrapper.find('input[type="password"]').exists()).toBe(false)
    })

    it('emits clear when Clear is clicked', async () => {
      const wrapper = mount(ApiKeyBar, { props: { hasKey: true } })
      await wrapper.find('.save-btn').trigger('click')
      expect(wrapper.emitted('clear')).toBeTruthy()
    })
  })
})
