<template>
  <div :key="id" class="preview bg-gray-100 py-5 flex justify-center">
    <div class="render p-5">
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { computed, onMounted, ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'

const props = defineProps({
  html: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  css: {
    type: String,
    required: true
  },
  js: {
    type: String,
    required: true
  },
  widgetId: {
    type: String,
    required: true
  }
})

const id = ref(uuid())

const loadJs = () => {
  const body = document.getElementsByTagName('body')[0]
  const exist = document.getElementById(`script-${props.widgetId}`)
  if (exist) {
    exist.remove()
  }
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.innerHTML = props.js
  body.appendChild(script)
}

watch(()=>{
  return props.html
}, () => {
  id.value = uuid()
})

watch(()=>{
  return props.css
}, () => {
  id.value = uuid()
})

watch(()=>{
  return props.js
}, () => {
  id.value = uuid()
  setTimeout(() => {
    loadJs()
  }, 500)
})

onMounted(() => {
  loadJs()
})
</script>

<style>
.preview {
  min-height: 100vh;
  width: 100%;
}
.render {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
