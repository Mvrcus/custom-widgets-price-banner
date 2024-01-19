<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div>
                  <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                    >Title</label
                  >
                  <div class="mb-2 flex">
                    <input
                      v-model="title"
                      type="text"
                      name="title"
                      id="title"
                      class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Your title goes here"
                    />
                  </div>
                </div>

                <div>
                  <label for="subtitle" class="block text-sm font-medium leading-6 text-gray-900"
                    >Sub title (Optional)</label
                  >
                  <div class="mb-2 flex">
                    <input
                      v-model="subtitle"
                      type="text"
                      name="subtitle"
                      id="subtitle"
                      class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Describe more here"
                    />
                  </div>
                </div>

                <div>
                  <label for="list" class="block text-sm font-medium leading-6 text-gray-900"
                    >List (Separated by commas)</label
                  >
                  <div class="mb-2 flex">
                    <textarea
                      id="list"
                      name="list"
                      rows="4"
                      class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      v-model="list"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900">Price</label>
                  <div class="flex w-full gap-5">
                    <div class="w-1/3">
                      <label for="pretext" class="block text-xs font-medium text-gray-600"
                        >Pre-Text (optional)</label
                      >
                      <div class="mb-2 flex">
                        <input
                          v-model="preText"
                          type="text"
                          name="pretext"
                          id="pretext"
                          class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="w-1/3">
                      <label for="subtitle" class="block text-xs font-medium text-gray-600"
                        >Amount</label
                      >
                      <div class="mb-2 flex">
                        <input
                          v-model="amount"
                          type="number"
                          name="amount"
                          id="amount"
                          class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div class="w-1/3">
                      <label for="per" class="block text-xs font-medium text-gray-6000">Per</label>
                      <div class="mb-2 flex">
                        <input
                          v-model="per"
                          type="text"
                          name="per"
                          id="per"
                          class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label for="image" class="block text-sm font-medium leading-6 text-gray-900"
                      >Image Url (Optional)</label
                    >
                    <div class="mb-2 flex">
                      <input
                        v-model="image"
                        type="text"
                        name="image"
                        id="image"
                        class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="action" class="block text-sm font-medium leading-6 text-gray-900"
                      >Action</label
                    >
                    <div class="mb-2 flex">
                      <select
                        id="action"
                        name="action"
                        class="mb-2 flex block w-full rounded-md border-0 p-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        v-model="action"
                      >
                        <option
                          v-for="option in actions"
                          :key="option.value"
                          :value="option.value"
                          :selected="action === option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label for="url" class="block text-sm font-medium leading-6 text-gray-900"
                      >Url</label
                    >
                    <div class="mb-2 flex">
                      <input
                        v-model="url"
                        type="text"
                        name="url"
                        id="url"
                        class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="relative flex items-start mt-4 ml-0">
                      <div class="flex h-6 items-center">
                        <input
                          id="comments"
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          v-model="pop"
                        />
                      </div>
                      <div class="ml-3 text-sm leading-6">
                        <label for="comments" class="font-small text-gray-900 m-0">Best value</label>
                        <p id="comments-description" class="text-gray-500 text-xs m-0">Highlight this card</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--Footer-->
              <div class="mt-5 sm:mt-6 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  @click="close"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  @click="upsertPrice()"
                  :disabled="disabled"
                >
                  {{ price ? 'Update' : 'Create' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, type PropType, computed, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { type Banner } from '@/utils/types'
//@ts-ignore
import { generateId } from '@/utils//helper'
import { useStore } from '@/stores'

const props = defineProps({
  price: {
    type: Object as PropType<Banner>,
    required: false
  },
  open: {
    type: Boolean,
    required: true
  }
})
const store = useStore()
const emit = defineEmits(['hide'])

const actions = [
  { label: 'Open URL', value: 'openUrl' },
  { label: 'Open Popup', value: 'openPopup' },
  { label: 'Go to Next Step', value: 'goToNextStep' }
]

const title = ref('')
const subtitle = ref('')
const list = ref('')
const preText = ref('')
const amount = ref(0)
const per = ref('')
const image = ref('')
const action = ref('openUrl')
const url = ref('')
const pop = ref(false)

const disabled = computed(() => {
  if (action.value === 'openUrl' && !url.value) return true
  if (!title.value || !list.value || !amount.value || !per.value) return true
  return false
})

const reset = () => {
  title.value = ''
  subtitle.value = ''
  list.value = ''
  preText.value = ''
  amount.value = 0
  per.value = ''
  image.value = ''
  action.value = 'openUrl'
  url.value = ''
  pop.value = false
}

const fill = (price: Banner) => {
  if (!price) return
  title.value = price.title
  subtitle.value = price.subtitle
  list.value = price.list
  preText.value = price.price.preText
  amount.value = price.price.amount
  per.value = price.price.per
  image.value = price.image as string
  action.value = price.action.type as string
  url.value = price.action.url as string
  pop.value = price.pop
}

const close = () => {
  emit('hide')
  reset()
}

const upsertPrice = () => {
  const price = createPrices()
  if (props.price) {
    const prices = store.getItem('banners') as Banner[]
    const index = prices.findIndex((item) => item.id === props.price?.id)
    if (index < 0) {
      console.error('Not found!')
    } else {
      prices[index] = price
      store.setItem('banners', prices)
    }
  } else {
    const prices = store.getItem('banners') as Banner[]
    prices.push(price)
    store.setItem('banners', prices)
  }
  close()
}

const createPrices = () => {
  return {
    id: generateId(title.value),
    title: title.value,
    subtitle: subtitle.value,
    list: list.value,
    price: {
      preText: preText.value,
      amount: amount.value,
      per: per.value
    },
    image: image.value,
    action: {
      type: action.value,
      url: url.value
    },
    pop: pop.value
  }
}

watch(()=> {
    return props.open
}, (value) => {
    if(value) {
        fill(props.price as Banner)
    }
})
</script>
