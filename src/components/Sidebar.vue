<template>
  <div class="flex grow flex-col overflow-y-auto bg-gray-900 px-2 sidebar">
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col p-0">
        <li>
          <ul role="list" class="space-y-1 p-0">
            <li v-for="item in navigation" :key="item.name">
              <RouterLink
                :to="item.route"
                :class="[
                  isCurrentRoute(item.route)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold setting-item'
                ]"
              >
                <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="px-2 flex justify-end">
        <Toggle :value="previewMode" @change="(value) => store.setItem('previewMode', value)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores';
import { CurrencyDollarIcon, AdjustmentsHorizontalIcon, BeakerIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router'
import Toggle from './Toggle.vue';

const navigation = [
  { name: 'Themes', route: 'themes', icon: BeakerIcon },
  { name: 'Styles & Options', route: 'settings', icon: AdjustmentsHorizontalIcon },
  { name: 'Prices', route: 'prices', icon: CurrencyDollarIcon }
]

const route = useRoute()
const store = useStore()

const isCurrentRoute = (itemRoute: string) => {
  return route.name === itemRoute
}

const previewMode = computed(() => {
    return store.state?.previewMode as boolean
})

</script>
<style>
.sidebar {
  height: 100vh;
  min-width: 200px;
  max-width: 25%;
}
.setting-item{
    text-decoration: none;
}
</style>
