<template>
  <div
    class="overflow-hidden rounded-lg bg-white shadow-lg cursor-pointer hover:shadow-blue-500/50"
    :class="{ 'border-blue-500 border border-solid shadow-blue-500/50': isActive() }"
    @click="updateSetting()"
  >
    <div class="px-4 py-2 sm:px-6 sm:py-2">
      <p class="option-label">{{ option.label }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { useStore } from '../stores'
import type { SettingOption } from '@/utils/types'

const props = defineProps({
  option: {
    type: Object as PropType<SettingOption>,
    required: true
  },
  setting: {
    type: String,
    required: true
  }
})

const store = useStore()
const emit = defineEmits(['change'])

const settingValue = computed(() => {
  return store.getItem(props.setting)
})

const isActive = () => {
  return props.option?.value === settingValue.value
}

const updateSetting = () => {
  store.setItem(props.setting, props.option?.value)
  emit('change', { setting: props.setting, value: props.option.value })
}
</script>
<style>
.option-label {
  font-size: 14px;
}
</style>
