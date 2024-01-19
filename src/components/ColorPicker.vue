<template>
  <div class="flex items-center color-picker-container">
    <label class="block text-sm font-medium leading-6 text-gray-900" for="color">{{ label }}</label>
    <input
      class="block w-full"
      type="color"
      id="color"
      name="color"
      :value="value"
      @change="
        (e) => {
          //@ts-ignore
          emit('change', e.target?.value)
        }
      "
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['change'])
</script>
<style>
.color-picker-container label {
  min-width: 150px;
}
.color-picker-container input {
  padding: 0 !important;
  outline: none;
  width: 30px;
  height: 30px;
}
</style>
