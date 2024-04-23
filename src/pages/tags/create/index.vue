<script setup lang="ts">
import { addTagApi, countMultiTag } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import HintSelector from "@/pages/components/HintSelector.vue"
import { getIdFromArrayOfObj } from "@/utils"
import { IdType, TagsCreatedRequest, TagCounterRequest } from "@/types/content"
import { requiredValidator } from "@validators"
import { VForm } from "vuetify/components"

const domainStore = useDomainStore()
const countLegal = ref(null)
const countCommon = ref(null)
const title = ref('')
const description = ref('')
const aliases = ref('')
const urlTitle = ref('')
const metaTitle = ref('')
const metaDescription = ref('')
const related = ref<any>([])
const selectedCat = ref<any>([])
const selectedTag = ref<any>([])
const refForm = ref<VForm>()

watchEffect(() => {
  if (selectedCat.value.length || selectedTag.value.length) {
    countHandler()
  } else {
    countCommon.value = null
    countLegal.value = null
  }
})

async function countHandler() {
  const params: TagCounterRequest = {}

  if (selectedCat.value.length) {
    params.categories = getIdFromArrayOfObj(selectedCat.value)
  }

  if (selectedTag.value.length) {
    params.tags = getIdFromArrayOfObj(selectedTag.value)
  }

  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })
  const tubeId = selectedTube[0].id
  countCommon.value = null
  countLegal.value = null

  const r = await countMultiTag(tubeId, params as any)

  if (r.data !== null) {
    countCommon.value = r.data.find((x: IdType) => x.type === 'Common').total
    countLegal.value = r.data.find((x: IdType) => x.type === 'Legal').total
  }
}

async function addTag() {
  const validRes = await refForm.value?.validate()
  if (validRes && !validRes.valid) return false

  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })
  const tubeId = selectedTube[0].id

  const requestParams: TagsCreatedRequest = {
    urlTitle: urlTitle.value,
    descriptions: [
      {
        languageId: 1,
        title: title.value,
        description: description.value,
        metaTitle: metaTitle.value,
        metaDescription: metaDescription.value
      }
    ]
  }

  if (selectedTag.value && selectedTag.value.length) {
    requestParams.related = getIdFromArrayOfObj(selectedTag.value)
  }

  if (aliases.value && aliases.value.length) {
    requestParams.aliases = aliases.value.trim().split(',').map(item => item.trim())
  }

  if (selectedTag.value && selectedTag.value.length) {
    requestParams.basedOn = { ...requestParams.basedOn, tags: getIdFromArrayOfObj(selectedTag.value) }
  }

  if (selectedCat.value && selectedCat.value.length) {
    requestParams.basedOn = { ...requestParams.basedOn, categories:getIdFromArrayOfObj(selectedCat.value) }
  }

  await addTagApi(tubeId, requestParams)
}
</script>
<template>
  <VCard>
    <VCardText>
      <h5 class="text-h5 mb-4">Tag create</h5>
      <VForm ref="refForm" @submit.prevent>
        <VRow>
          <VCol cols="12" sm="6">
            <VRow>
              <VCol cols="12" sm="12">
                <VTextField label="Title" v-model="title" :rules="[requiredValidator]"/>
              </VCol>
              <VCol cols="12" sm="12">
                <VTextField label="Aliases" v-model="aliases"/>
              </VCol>
              <VCol cols="12" sm="12">
                <VTextarea
                  auto-grow
                  label="Description"
                  rows="4"
                  row-height="30"
                  v-model="description"
                />
              </VCol>
              <VCol cols="12" sm="12">
                <HintSelector itemsGetter="getTags" label="Related" v-model="related"/>
              </VCol>
              <VCol cols="12" md="6">
                <HintSelector
                  itemsGetter="getCategories"
                  label="Categories"
                  v-model="selectedCat"/>
                <span v-if="countCommon !== null"
                      class="text-caption font-weight-semibold me-1 mt-2">Count common: </span><span
                class="text-caption">{{ countCommon }}</span>
                <br/>
                <span v-if="countLegal !== null"
                      class="text-caption font-weight-semibold me-1 mt-2">Count legal: </span><span
                class="text-caption">{{ countLegal }}</span>
              </VCol>
              <VCol cols="12" md="6">
                <HintSelector
                  items-getter="getTags"
                  :preSelect="[]"
                  label="Tags"
                  v-model="selectedTag"/>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" sm="6">
            <VRow>
              <VCol cols="12" sm="12">
                <VTextField label="Url Title" v-model="urlTitle" :rules="[requiredValidator]"/>
              </VCol>
              <VCol cols="12">
                <VTextField label="Seo Title" class="mb-3" v-model="metaTitle"/>
                <VTextarea
                  auto-grow
                  label="SEO Description"
                  rows="4"
                  row-height="30"
                  v-model="metaDescription"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol>
            <VBtn color="success" @click="addTag">Create</VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
