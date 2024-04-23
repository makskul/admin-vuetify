<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { useDomainStore } from "@/stores/headerStores"
import { getStudioData, updateStudioData } from "@/Api/content"
import { getChangedDescriptionsObj } from "@/utils"

const studioUrl = useRoute().params.id
const responseData = ref<any>([])
const langSelected = ref<any>(0)
const descriptions = ref<any>([])
const domainStore = useDomainStore()
const setLangIndex = ref(0)
const langs = ref<any>([])

const init = async (reload = false) => {
  const { data } = await getStudioData(studioUrl)

  if (data) {
    responseData.value = data
    let langIndex = responseData.value.descriptions.findIndex((item: any) => item.language.prefix === 'en')

    if (reload) {
      langIndex = setLangIndex.value
    }

    langs.value = responseData.value.descriptions.map(({ language }: any) => language.prefix)
    descriptions.value = responseData.value.descriptions[langIndex]
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

  const sendObj: any = {
    urlTitle: responseData.value.urlTitle,
    descriptions: getChangedDescriptionsObj(responseData.value.descriptions)
  }

  await updateStudioData(parseInt(studioUrl as string), sendObj)
  init(true)
}
init()
</script>

<template>
  <div>
    <WhiteRow>
      <VCol cols="12" md="6">
        <VTabs v-model="langSelected" @update:modelValue="selectLanguage">
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
      </VCol>
      <VCol cols="12" sm="12" md="6">
        <VCol>
          <VTextField label="Seo Title" class="mb-3" v-model="descriptions.metaTitle"/>
          <VTextarea
              auto-grow
              label="SEO Description"
              rows="4"
              row-height="30"
              v-model="descriptions.metaDescription"
          />
        </VCol>
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
