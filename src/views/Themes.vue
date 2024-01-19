<script setup lang="ts">
import Option from '@/components/Option.vue';
import { ref } from 'vue';

const themes = ref([
  {
    label: 'Comparison Table',
    value: 'table'
  }
])

</script>

<template>
  <h4>Theme</h4>
  <div class="flex gap-2 pt-3 themes-container w-full"> 
    <Option v-for="theme in themes" v-bind:key="theme.value" setting="theme" :option="theme"></Option>
  </div>
</template>
