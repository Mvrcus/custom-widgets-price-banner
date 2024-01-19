<template>
  <div :key="id" class="preview bg-gray-100 py-5 flex justify-center">
    <div class="flex wrap shadow-2xl preview-container bg-white rounded-xl">
      <div class="render p-5">
        <div v-html="html"></div>
      </div>
      <div class="code-container">
        <div class="code p-3">
          <h5>HTML</h5>
          <codemirror
            v-model="htmlValue"
            :style="{ height: '300px' }"
            :autofocus="false"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="[htmlLang(), oneDark]"
            @ready="() => {}"
            :disabled="true"
          />
        </div>
        <div class="code p-3">
          <h5>CSS</h5>
          <codemirror
            v-model="cssValue"
            :style="{ height: '300px' }"
            :autofocus="false"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="[cssLang(), oneDark]"
            @ready="() => {}"
            :disabled="true"
          />
        </div>
        <div class="code p-3">
          <h5>JS</h5>
          <codemirror
            v-model="jsValue"
            :style="{ height: '300px' }"
            :autofocus="false"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="[javascript(), oneDark]"
            @ready="() => {}"
            :disabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { EditorView, basicSetup } from 'codemirror'
import { Compartment } from '@codemirror/state'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { computed, onMounted, ref, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { v4 as uuid } from 'uuid'
const languageConf = new Compartment()
const store = useStore()

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

const htmlValue = computed({
  get: () => {
    return props.body
  },
  set: () => {}
})
const cssValue = computed({
  get: () => {
    return props.css
  },
  set: () => {}
})
const jsValue = computed({
  get: () => {
    return props.js
  },
  set: () => {}
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
  script.innerHTML = jsValue.value
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
.code {
  min-height: 33vh;
  border-bottom: 1px solid #e2e2e2;
}
.render {
  width: 60%;
  border-right: 1px solid #e2e2e2;
}
.code-container {
  width: 40%;
}
.preview-container {
  width: 90%;
}
.code:last-child {
  border-bottom: none;
}
.code:first-child {
  border-top: none;
}

.code code {
  max-height: 200px;
  overflow: auto;
}
</style>
