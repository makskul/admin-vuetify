<script lang="ts" setup>
import { IdTitle } from '@/types/content'
import { getCategoriesBase } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"

const domainStore = useDomainStore()

const props = defineProps(['modelValue', 'itemsGetter', 'preSelect'])
const emit = defineEmits(['update:modelValue'])
const pageNum = ref(0)
const intersect = ref<boolean>(false)
const itemsCount = 30
const filteredProps = props.preSelect && props.preSelect.length ? props.preSelect : []
const selectedItemsModel = ref<any>([])
const items = ref<any>([])
const totalPage = ref(0)
const displayIntersectBlock = ref(true)

const essences: { [K: string]: Function } = {
  getCategories: getCategoriesBase,
}
const selectedTube = domainStore.domains.filter((obj: any) => {
  return obj.url === domainStore.globalDomain
})
const tubeId = selectedTube[0].id

function removeFromModelById(id: number) {
  const newModel = props.modelValue.filter((obj: IdTitle) => obj.id !== id)
  emit('update:modelValue', newModel)
  reloadSelectedItems(newModel)
}

function reloadSelectedItems(model: IdTitle) {
  selectedItemsModel.value = model
}

function vModelHandler(selectValue: any) {
  emit('update:modelValue', selectValue)
  reloadSelectedItems(selectValue)
}

async function onIntersect() {
  if (totalPage.value && (totalPage.value <= pageNum.value)) {
    displayIntersectBlock.value = false
  }

  if (!pageNum.value) {
    intersect.value = true
  }

  if (intersect.value) {
    intersect.value = false
    pageNum.value += 1

    const r = await essences[props.itemsGetter](pageNum.value, itemsCount)
    const newList = r?.data.items || []
    const totalItems = r.data.meta.totalItems

    totalPage.value = Math.ceil(totalItems / itemsCount)
    items.value = [...items.value, ...newList]
    setTimeout(() => intersect.value = true, 1000)
  }
}

async function init() {
  pageNum.value = 0

  selectedItemsModel.value = filteredProps
  items.value.push(filteredProps)
}

init()
</script>
<template>
  <div class="">
    <VCheckbox
      v-for="item in items"
      :key="item.id"
      :value="item.id"
      :label="item.title"
      v-model="selectedItemsModel"
      @update:modelValue="vModelHandler"
    />
    <div v-if="displayIntersectBlock" v-intersect="{
      handler: onIntersect,
      options: {
        threshold: [1.0]
      }}" class="pa-4 teal--text">
      ...
    </div>
  </div>
</template>
