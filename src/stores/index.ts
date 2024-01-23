import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { defaultBanners, defaultOptions, defaultStyles } from '@/utils/const'
import type { Banner, State } from '@/utils/types'
import { v4 as uuid } from 'uuid'
import { createCss, createHtml, createJS } from '@/utils/helper'

export const useStore = defineStore('store', () => {
  const state: Ref<State> = ref({
    banners: defaultBanners,
    headlineFont: defaultStyles.headlineFont,
    contentFont: defaultStyles.contentFont,
    buttonColor: defaultStyles.buttonColor,
    currency: defaultOptions.currency,
    bulletColor: defaultStyles.bulletColor,
    theme: defaultStyles.theme,
    previewMode: false,
    widgetId: uuid()
  })

  const getItem = (key: string) => {
    return state.value?.[key]
  }

  const setItem = (key: string, value: Banner[] | string | number | boolean) => {
    if (!Object.keys(state.value).includes(key)) {
      console.error("Key doesn't exist in store!", key)
      return
    }
    state.value[key] = value
    console.info(`Updated ${key} with value: ${JSON.stringify(value)}`)
  }

  const html = computed(() => {
    return `
    <style>${css.value}</style>
    <div class="hl-banner">
      ${body.value}
    </div>
    `
  })

  const js = computed(() => {
    return createJS(state.value)
  })

  const css = computed(() => {
    return createCss(state.value)
  })

  const body = computed(() => {
    return createHtml(state.value)
  })

  const handshake = undefined

  return { state, getItem, setItem, html, js, body, css, handshake }
})
