<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { getTagData, updateTagData } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { requiredValidator } from "@validators"
import HintSelector from "@/pages/components/HintSelector.vue"
import { TagRequestType } from "@/types/content"
import { getChangedDescriptionsObj, getIdFromArrayOfObj } from "@/utils"
import RelatedBlock from "@/pages/components/RelatedBlock.vue"

const tagId = useRoute().params.id
const responseData = ref<any>([])
const langSelected = ref<any>(0)
const descriptions = ref<any>([])
const domainStore = useDomainStore()
const selectedSynonyms = ref<any>([])
const selectedCategory = ref<any>([])
const tempEqualCat = ref()
const related = ref<any>([])
const langs = ref<any>([])

async function init() {
  const { data } = await getTagData(tagId)

  if (data) {
    responseData.value = data

    let langIndex = responseData.value.descriptions.findIndex((item: any) => item.language.prefix === 'en')
    langs.value = responseData.value.descriptions.map(({ language }: any) => language.prefix)
    descriptions.value = responseData.value.descriptions[langIndex]
    selectedSynonyms.value = responseData.value.synonyms
    selectedCategory.value = responseData.value.categories.filter((cat: any) => !!cat.equal)[0]
    tempEqualCat.value = selectedCategory.value
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

async function saveChanges() {
  responseData.value.descriptions[langSelected.value] = descriptions.value

  const sendObj: TagRequestType = {
    urlTitle: responseData.value.urlTitle,
    // category: responseData.value.categories && responseData.value.categories.length ? responseData.value.categories[0].id : null,
    descriptions: getChangedDescriptionsObj(responseData.value.descriptions),
    synonyms: getIdFromArrayOfObj(selectedSynonyms.value),
    related: {
      categories: getIdFromArrayOfObj(related.value.categories) || [],
      tags: getIdFromArrayOfObj(related.value.tags) || [],
      channels: getIdFromArrayOfObj(related.value.channels) || [],
      pornstars: getIdFromArrayOfObj(related.value.pornstars) || []
    }
  }

  if (selectedCategory.value && !selectedCategory.value.id && selectedCategory.value !== tempEqualCat.value.id) {
    sendObj.category = selectedCategory.value
  }
  await updateTagData(parseInt(tagId as string), sendObj)
  init()
}

init()
</script>

<template>
  <div>
    <WhiteRow>
      <VCol cols="12">
        <VTabs v-model="langSelected">
          <VTab
            v-for="i in langs"
            :key="i"
          >
            {{ i }}
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
        <VRow>
          <VCol cols="12" sm="12" md="6">
            <div class="mb-4">
              <VChip class="mb-1 mr-1">
                Total: {{ responseData.total }}
              </VChip>
              <VChip class="mb-1 mr-1" v-if="responseData.totalSposor">
                Total Sponsor: {{ responseData.totalSposor }}
              </VChip>
              <VChip class="mb-1 mr-1" v-if="responseData.totalCommon">
                Total Common: {{ responseData.totalCommon }}
              </VChip>
            </div>
            <VTextField label="Title" class="mb-3" v-model="descriptions.title" :rules="[requiredValidator]"/>
            <VTextField label="URL Permalink" class="mb-3" v-model="responseData.urlTitle"/>
            <VTextField label="Description" class="mb-3" v-model="descriptions.description"/>
          </VCol>
          <VCol cols="12" sm="12" md="6">
            <VTextField label="Meta Title" class="mb-3" v-model="descriptions.metaTitle"/>
            <VTextarea
              auto-grow
              label="SEO Description"
              rows="4"
              row-height="30"
              v-model="descriptions.metaDescription"
            />
          </VCol>
        </VRow>
        <VDivider class="mt-4 mb-3"/>
        <VRow>
          <VCol cols="12" sm="12" md="6" class="pb-0">
            <h3>Synonyms</h3>
            <HintSelector v-if="responseData.synonyms" v-model="selectedSynonyms" :preSelect="responseData.synonyms" label="Select synonym" itemsGetter="getSynonyms" chip="1"/>
            <HintSelector v-else v-model="selectedSynonyms" label="Select synonym" itemsGetter="getSynonyms" chip="1"/>
          </VCol>
          <VCol cols="12" sm="12" md="6" v-if="responseData.categories && responseData.categories.length">
            <h3 class="mb-2">Select Equal Category</h3>
            <VSelect
              :items="responseData.categories"
              label="Categories"
              v-model="selectedCategory"
              item-value="id"
              item-title="title"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12" sm="6">
            <h4 class="mt-3 mb-2">Origins</h4>
            <VChip class="mb-1 mr-1">
              <b>Name:</b>&nbsp;{{ responseData.originName }}
            </VChip>
            <div class="chip-box mb-1 mr-1" v-if="responseData.originDescription">
              <b>Description:</b> {{ responseData.originDescription }}
            </div>
          </VCol>
        </VRow>
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
