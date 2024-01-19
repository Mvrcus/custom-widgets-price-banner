<template>
  <div :class="[types[type], 'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset']">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const types: { [key: string]: string } = {
  success: 'text-green-700 bg-green-50 ring-green-600/20',
  default: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  danger: 'text-red-700 bg-red-50 ring-red-600/10',
  primary: 'text-blue-700 bg-blue-50 ring-blue-600/10'
}
</script>
<style></style>
