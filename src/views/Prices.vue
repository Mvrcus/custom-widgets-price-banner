<script setup lang="ts">
import AddEditPriceModal from '@/components/AddEditPriceModal.vue'
import PriceCard from '@/components/PriceCard.vue'
import { useStore } from '@/stores'
import type { Banner } from '@/utils/types'
import { computed, ref } from 'vue'

const store = useStore()
const banners = computed(() => store.state.banners as Banner[])
const priceToEdit = ref()
const open = ref(false)

const deletePrice = (id: string) => {
  const prices = store.getItem('banners') as Banner[]
  const index = prices.findIndex((item) => item.id == id)
  if (index < 0) {
    console.error('Item to delete not found')
    return
  }
  prices.splice(index,1)
  store.setItem('banners', prices)
}

const editPrice = (price: Banner) => {
  priceToEdit.value = price
  open.value = true
}

const openModal = () => {
  open.value = true
}

const close = () => {
  open.value = false
  priceToEdit.value = undefined
}
</script>

<template>
  <div class="pricing-view">
    <div class="header">
      <h4 class="text-xl font-semibold">Pricing Calculator</h4>
      <div class="flex justify-end mt-2">
        <button
          type="button"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="openModal()"
        >
          Add Price
        </button>
      </div>
    </div>

    <div class="content">
      <div class="gap-2 pt-3 prices-container w-full">
        <PriceCard
          class="price-card w-full mb-2"
          v-for="price in banners"
          :key="price.id"
          :price="price"
          @delete="deletePrice"
          @edit="editPrice"
        ></PriceCard>
      </div>
    </div>

    <AddEditPriceModal :open="open" :price="priceToEdit" @hide="close"></AddEditPriceModal>
  </div>
</template>

<style>
.pricing-view {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
}

.content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.prices-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
