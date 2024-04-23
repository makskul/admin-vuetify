<script setup lang="ts">
import WhiteRow from '@/pages/components/WhiteRow.vue'
import HintSelector from "@/pages/components/HintSelector.vue"
import { getIdFromArrayOfObj } from "@/utils";

const props = defineProps(['related'])
const categories = ref([])
const tags = ref([])
const channels = ref([])
const pornstars = ref([])
const emit = defineEmits(['update:modelValue'])

watch([pornstars, categories, tags, channels] , () => {
  const model = {
    pornstars: getIdFromArrayOfObj(pornstars.value) || pornstars.value,
    categories: getIdFromArrayOfObj(categories.value) || categories.value,
    tags: getIdFromArrayOfObj(tags.value) || tags.value,
    channels: getIdFromArrayOfObj(channels.value) || channels.value
  }

  emit('update:modelValue', model)
})
</script>
<template>
  <div>
    <WhiteRow class="pb-6">
      <VCol cols="12" sm="12" md="12">
        <h2>Related</h2>
      </VCol>
      <VDivider class="mb-3"/>
      <VCol cols="12" sm="12" md="6" class="pb-0">
        <h3>Categories</h3>
        <HintSelector v-if="props.related && props.related.categories.length" v-model="categories" :preSelect="props.related.categories" label="Select Categories" itemsGetter="getCategories" chip="1"/>
        <HintSelector v-else v-model="categories" label="Select tag" itemsGetter="getCategories" chip="1"/>
      </VCol>
      <VCol cols="12" sm="12" md="6" class="pb-0">
        <h3>Tags</h3>
        <HintSelector v-if="props.related && props.related.tags.length" v-model="tags" :preSelect="props.related.tags" label="Select tag" itemsGetter="getSynonyms" chip="1"/>
        <HintSelector v-else v-model="tags" label="Select tag" itemsGetter="getSynonyms" chip="1"/>
      </VCol>
      <VCol cols="12" sm="12" md="6" class="pb-0">
        <h3>Channels</h3>
        <HintSelector v-if="props.related && props.related.channels.length" v-model="channels" :preSelect="props.related.channels" label="Select Channels" itemsGetter="getChannel" chip="1"/>
        <HintSelector v-else v-model="channels" label="Select Channels" itemsGetter="getChannels" chip="1"/>
      </VCol>
      <VCol cols="12" sm="12" md="6" class="pb-0">
        <h3>Pornstars</h3>
        <HintSelector v-if="props.related && props.related.pornstars.length" v-model="pornstars" :preSelect="props.related.pornstars" label="Select pornstar" itemsGetter="getPornstars" chip="1"/>
        <HintSelector v-else v-model="pornstars" label="Select pornstars" itemsGetter="getPornstars" chip="1"/>
      </VCol>
    </WhiteRow>
  </div>
</template>
