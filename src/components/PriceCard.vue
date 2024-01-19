<template>
  <div class="bg-white shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-between">
        <div>
          <h3 class="text-base font-semibold leading-6 text-gray-900 mr-2 mb-0">
            {{ price.title }}
          </h3>
          <p v-if="price.subtitle" class="text-base font-light text-gray-500 m-0 text-xs">
            {{ price.subtitle }}
          </p>
          <Tag v-if="price.pop" text="Best value" type="primary"></Tag>
        </div>
        <Popover class="relative">
          <PopoverButton
            class="inline-flex items-center gap-x-1 text-xs font-semibold leading-6 text-gray-900"
          >
            <span>Actions</span>
          </PopoverButton>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel
              class="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4"
            >
              <div
                class="w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5"
              >
                <a
                  v-for="item in options"
                  :key="item.name"
                  @click="item.func()"
                  class="block p-2 hover:text-indigo-600"
                  >{{ item.name }}</a
                >
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p class="text-xs">Features:</p>
        <Tag
          v-for="(tag, index) in getList(price.list)"
          :key="index"
          :text="tag"
          type="default"
          class="mb-2"
        ></Tag>
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
