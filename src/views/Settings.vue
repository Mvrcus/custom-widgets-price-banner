<script setup lang="ts">
import ColorPicker from '@/components/ColorPicker.vue'
import Select from '@/components/Select.vue'
import { useStore } from '@/stores'
import { googleFonts, currencies } from '@/utils/const'
import { computed, ref } from 'vue'

const store = useStore()
const headlineFont = computed({
  get: () => store.state.headlineFont as string,
  set: (value) => store.setItem('headlineFont', value)
})

const contentFont = computed({
  get: () => store.state.contentFont as string,
  set: (value) => store.setItem('contentFont', value)
})

const currency = computed({
  get: () => store.state.currency as string,
  set: (value) => store.setItem('currency', value)
})

const buttonColor = computed({
  get: () => store.state.buttonColor as string,
  set: (value) => store.setItem('buttonColor', value)
})

const bulletColor = computed({
  get: () => store.state.bulletColor as string,
  set: (value) => store.setItem('bulletColor', value)
})

const fonts = computed(() => {
  return googleFonts.map((font: string) => {
    return {
      label: font,
      value: font
    }
  })
})
</script>

<template>
  <div class="flex pt-3 themes-container w-full">
    <div class="py-3 w-full">
      <h4 class="p-0 mb-1">Fonts</h4>
      <Select
        class="py-2"
        label="Headline Font"
        :value="headlineFont"
        :options="fonts"
        @change="(value: string) => (headlineFont = value)"
      ></Select>
      <Select
        class="py-2"
        label="Content Font"
        :value="contentFont"
        :options="fonts"
        @change="(value: string) => (contentFont = value)"
      ></Select>
      <h4 class="p-0 mb-1">Color</h4>
      <ColorPicker
      class="py-2"
        label="Button Color"
        :value="buttonColor"
        @change="
          (color) => {
            buttonColor = color
          }
        "
      ></ColorPicker>
      <ColorPicker
      class="py-2"
        label="Icon Color"
        :value="bulletColor"
        @change="
          (color) => {
            bulletColor = color
          }
        "
      ></ColorPicker>
      <h4 class="p-0 mb-1">Other</h4>
      <Select
        class="py-2"
        label="Currency"
        :value="currency"
        :options="currencies"
        @change="(value: string) => (currency = value)"
      ></Select>
    </div>
  </div>
</template>

<style></style>
