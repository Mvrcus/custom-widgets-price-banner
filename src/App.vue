<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import { useStore } from './stores'
import Preview from './components/Preview.vue'
import { computed, onMounted, watch } from 'vue'
import Postmate from 'postmate'
import { cloneDeep } from 'lodash'

const store = useStore()

const previewMode = computed(() => {
  return store.state?.previewMode
})

const html = computed(() => {
  return store.html as string
})

const js = computed(() => {
  return store.js as string
})

const css = computed(() => {
  return store.css as string
})

const body = computed(() => {
  return store.body as string
})

const widgetId = computed(() => {
  return store.state.widgetId as string
})

watch([body, js, css], () => {
  const handshake = store.handshake as any
  if (handshake) {
    handshake?.then((parent: any) => {
      console.log('parent',parent, {
        html: store.html as string,
        js: store.js as string,
        elementStore: store.state
      })
      parent?.emit('code', {
        html: store.html as string,
        js: store.js as string,
        elementStore: cloneDeep(store.state)
      })
    })
  }
})

onMounted(() => {
  const handshake = new Postmate.Model({})

  handshake.then(async ({ model }: any) => {
    console.log('model', model)
    if (model.elementStore) {
      Object.keys(model.elementStore).map((key) => {
        store.setItem(key, model.elementStore[key])
      })
    }
    store.handshake = handshake
  })
})
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="settings-data flex grow flex-col overflow-y-auto px-2">
      <RouterView />
    </div>
  </div>
  <div v-if="previewMode" class="preview">
    <Preview :html="html" :js="js" :css="css" :body="body" :widget-id="widgetId"></Preview>
  </div>
</template>

<style scoped>
.settings-data {
  max-width: 85%;
  max-height: 100vh;
}
</style>
