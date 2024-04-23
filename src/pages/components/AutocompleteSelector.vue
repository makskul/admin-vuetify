<script lang="ts" setup>
import { IdTitle } from '@/types/content'
import { useDebounceFn } from '@vueuse/core'
import { getTagsBase, getPornstarsBase, getCategoriesBase, getSynonymBase } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"

const domainStore = useDomainStore()

const props = defineProps(['modelValue', 'itemsGetter', 'preSelect', 'label'])
const emit = defineEmits(['update:modelValue'])
const pageNum = ref(0)
const intersect = ref<boolean>(false)
const itemsCount = 30
const filteredProps = props.preSelect && props.preSelect.length ? props.preSelect : []
const memoryItems = ref<any>(filteredProps)
const selectedItemsModel = ref<any>([])
const items = ref<any>([])
const searchValue = ref('')
const totalPage = ref(0)
const displayIntersectBlock = ref(true)

const essences: { [K: string]: Function } = {
  getTags: getTagsBase,
  getCategories: getCategoriesBase,
  getPornstars: getPornstarsBase,
  getSynonyms: getSynonymBase
}

function reloadSelect(model: IdTitle) {
  selectedItemsModel.value = model
}

function selectHandler(selectValue: any) {
  emit('update:modelValue', selectValue)
  reloadSelect(selectValue)
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
    memoryItems.value = [...memoryItems.value, ...newList]
    setTimeout(() => intersect.value = true, 1000)
  }
}

function blurHandler() {
  intersect.value = false
}

async function searchFetch() {
  const r = await essences[props.itemsGetter](pageNum.value, itemsCount, searchValue.value)
  const newList = r.data.items
  const totalItems = r.data.meta.totalItems
  const mixedArray = [...items.value, ...newList]

  items.value = mixedArray.filter((a: any, i: any) => mixedArray.findIndex((s: any) => a.id === s.id) === i)
  memoryItems.value = [...memoryItems.value, ...items.value]
  totalPage.value = Math.ceil(totalItems / itemsCount)
}

const debouncedFn = useDebounceFn(() => {
  searchFetch()
}, 1000)

async function search(value: string) {
  displayIntersectBlock.value = !value.length

  if (!value.length) {
    intersect.value = false
  }

  if (value.length < 2) {
    searchValue.value = ''
    return false
  }

  searchValue.value = value
  pageNum.value = 1

  debouncedFn()
}

async function init() {
  pageNum.value = 0

  selectedItemsModel.value = filteredProps
  items.value = filteredProps
}

init()
</script>
<template>
  <VAutocomplete
    v-model="selectedItemsModel"
    :label="props.label"
    :items="items as []"
    item-title="title"
    item-value="title"
    @update:modelValue="selectHandler"
    @blur="blurHandler"
    :menu-props="{ maxHeight: 200 }"
    @update:search="search($event)"
    :clearable="true"
  >
    <template v-slot:append-item>
      <div v-if="displayIntersectBlock" v-intersect="{
          handler: onIntersect,
          options: {
            threshold: [1.0]
          }}" class="pa-4 teal--text">
        Loading ...
      </div>
    </template>
  </VAutocomplete>
</template>

<style lang="scss"></style>
