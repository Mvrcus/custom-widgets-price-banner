<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="block">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900 mr-2 mb-0">
            {{ price.title }}
          </h3>
          <p v-if="price.subtitle" class="text-base font-light text-gray-500 m-0 text-xs">
            {{ price.subtitle }}
          </p>
          <Tag v-if="price.pop" text="Best value" type="primary"></Tag>
        </div>
        <a
          v-for="item in options"
          :key="item.name"
          @click="item.func()"
          class="block hover:text-indigo-600 text-xs mt-2 cursor-pointer"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import type { Banner } from '@/utils/types'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import Tag from './Tag.vue'

const props = defineProps({
  price: {
    type: Object as PropType<Banner>,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const getList = (list: string) => {
  if (!list) return []
  else return list.split(',')
}

const options = ref([
  {
    name: 'Edit',
    func: () => {
      emit('edit', props.price)
    }
  },
  {
    name: 'Delete',
    func: () => {
      emit('delete', props.price.id)
    }
  }
])
</script>
