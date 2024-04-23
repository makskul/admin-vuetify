<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { getCategoryData, updateCategoryData } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import HintSelector from "@/pages/components/HintSelector.vue"
import { getChangedDescriptionsObj, getIdFromArrayOfObj } from "@/utils"
import RelatedBlock from "@/pages/components/RelatedBlock.vue"

const categoryId = useRoute().params.id
const responseData = ref<any>([])
const langSelected = ref<any>(0)
const descriptions = ref<any>([])
const domainStore = useDomainStore()
const selectedTags = ref<any>([])
const setLangIndex = ref(0)
const langs = ref<any>([])
const related = ref<any>([])

const init = async (reload = false) => {
  const { data } = await getCategoryData(categoryId)

  if (data) {
    responseData.value = data
    let langIndex = responseData.value.descriptions.findIndex((item: any) => item.language.prefix === 'en')

    if (reload) {
      langIndex = setLangIndex.value
    }

    langs.value = responseData.value.descriptions.map(({ language }: any) => language.prefix)
    descriptions.value = responseData.value.descriptions[langIndex]
    selectedTags.value = responseData.value.tags
    related.value = responseData.value.related
  }
}

watch(() => domainStore.globalDomain, init)
watch(() => langSelected.value, (newValue, oldValue) => {
  if (oldValue) {
    responseData.value.descriptions[oldValue] = descriptions.value
  }
  descriptions.value = responseData.value.descriptions[langSelected.value]
})

const saveChanges = async() => {
  responseData.value.descriptions[langSelected.value] = descriptions.value

  // category: responseData.value.categories && responseData.value.categories.length ? responseData.value.categories[0].id : null,
  const sendObj: any = {
    urlTitle: responseData.value.urlTitle,
    descriptions: getChangedDescriptionsObj(responseData.value.descriptions),
    tags: getIdFromArrayOfObj(selectedTags.value),
    related: {
      categories: getIdFromArrayOfObj(related.value.categories) || [],
      tags: getIdFromArrayOfObj(related.value.tags) || [],
      channels: getIdFromArrayOfObj(related.value.channels) || [],
      pornstars: getIdFromArrayOfObj(related.value.pornstars) || []
    }
  }

  await updateCategoryData(parseInt(categoryId as string), sendObj)
  init(true)
}

init()
</script>

<template>
  <div>
    <WhiteRow>
      <VCol cols="12" md="6">
        <VTabs v-model="langSelected">
          <VTab
              v-for="lang in langs"
              :key="lang"
          >
            {{ lang }}
          </VTab>
        </VTabs>
        <VDivider class="mb-3"/>
        <div class="mb-4">
          <VChip class="mb-1 mr-1">
            Feed ID: {{ responseData.feedId }}
          </VChip>
          <VChip class="mb-1 mr-1" v-if="responseData.total">
            Total: {{ responseData.total }}
          </VChip>
          <VChip class="mb-1 mr-1" v-if="responseData.totalCommon">
            Total Common: {{ responseData.totalCommon }}
          </VChip>
          <VChip class="mb-1 mr-1" v-if="responseData.totalSponsor">
            Total Sponsor: {{ responseData.totalSponsor }}
          </VChip>
        </div>
        <VTextField label="Title" class="mb-3" v-model="descriptions.title"/>
        <VTextField label="URL Permalink" class="mb-3" v-model="responseData.urlTitle"/>
        <VTextField label="Description" class="mb-3" v-model="descriptions.description"/>
        <h3>Tags</h3>
        <HintSelector v-if="responseData.tags" v-model="selectedTags" :preSelect="responseData.tags" label="Select tags" itemsGetter="getTags" chip="1"/>
        <HintSelector v-else v-model="selectedTags" label="Select tags" itemsGetter="getTags" chip="1"/>
      </Vcol>
      <VCol cols="12" md="6">
        <VTextField label="Seo Title" class="mb-3" v-model="descriptions.metaTitle"/>
        <VTextarea
          auto-grow
          label="SEO Description"
          rows="4"
          row-height="30"
          v-model="descriptions.metaDescription"
        />
      </VCol>
    </WhiteRow>
    <RelatedBlock :related="responseData.related" v-model="related"/>
    <WhiteRow>
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success" @click="saveChanges">
            Save
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>
