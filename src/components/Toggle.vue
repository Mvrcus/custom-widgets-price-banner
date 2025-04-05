<template>
  <div class="fixed bottom-4 right-4 z-50 bg-gray-800 rounded-lg p-4 shadow-lg">
    <div class="flex items-center gap-3">
      <h5 class="text-white text-sm">Dev Mode</h5>
      <Switch
        v-model="enabled"
        :class="[
          enabled ? 'bg-indigo-600' : 'bg-gray-600',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        ]"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="[
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          ]"
        />
      </Switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const enabled = computed({
  get: () => {
    return props.value
  },
  set: (value) => {
    emit('change', value)
  }
})

const emit = defineEmits(['change'])
</script>
