<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { getNicheTagData, updateNicheTagData } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { requiredValidator } from "@validators"
import HintSelector from "@/pages/components/HintSelector.vue"
import { getChangedDescriptionsObj, getIdFromArrayOfObj } from "@/utils"

const tagId = useRoute().params.id
const responseData = ref<any>([])
const langSelected = ref<any>(0)
const descriptions = ref<any>([])
const domainStore = useDomainStore()
const selectedSynonyms = ref<any>([])
const selectedStatus = ref()
const langs = ref<any>([])

function checkBoxStatusHandler(value: string) {
  responseData.value.status = value === 'Active' ? 1 : 0
}

async function init() {
  const r = await getNicheTagData(tagId)

  if (r && r.data) {
    responseData.value = r.data

    let langIndex = responseData.value.descriptions.findIndex((item: any) => item.language.prefix === 'en')
    langs.value = responseData.value.descriptions.map(({ language }: any) => language.prefix)
    descriptions.value = responseData.value.descriptions[langIndex]
    selectedStatus.value = responseData.value.status === 1 ? 'Active' : 'Inactive'
    selectedSynonyms.value = responseData.value.synonyms
  }
}

watch(() => domainStore.globalDomain, init)
watch(() => langSelected, (newValue, oldValue) => {
  if (oldValue) {
    responseData.value.descriptions[oldValue] = descriptions.value
  }
  descriptions.value = responseData.value.descriptions[langSelected.value]
})

async function saveChanges() {
  responseData.value.descriptions[langSelected.value] = descriptions.value
  const sendObj: any = {
    urlTitle: responseData.value.urlTitle,
    status: responseData.value.status,
    descriptions: getChangedDescriptionsObj(responseData.value.descriptions),
    synonyms: getIdFromArrayOfObj(selectedSynonyms.value)
  }
  await updateNicheTagData(parseInt(tagId as string), sendObj)
  init()
}

init()
</script>

<template>
  <div>
    <h2>Update Niche Tag</h2>
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
        <VRow>
          <VCol cols="12" sm="12" md="6">
            <VTextField label="Title" class="mb-3" v-model="descriptions.title" :rules="[requiredValidator]"/>
            <VTextField label="URL Permalink" class="mb-3" v-model="responseData.urlTitle"/>
            <VTextField label="Description" class="mb-3" v-model="descriptions.description"/>
            <VSelect
              v-model="selectedStatus"
              label="Published Status"
              :items="['Active', 'Inactive']"
              @update:modelValue=checkBoxStatusHandler
            />
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
