<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { addNicheTag } from "@/Api/content"
import { requiredValidator } from "@validators"
import HintSelector from "@/pages/components/HintSelector.vue"
import { getChangedDescriptionsObj, getIdFromArrayOfObj } from "@/utils"

const selectedSynonyms = ref<any>([])
const urlTitle = ref<string>()
const descriptions = ref({
  languageId: 0,
  title: '',
  description: '',
  metaTitle: '',
  metaDescription: ''
})

const saveChanges = async() => {
  const sendObj: any = {
    urlTitle: urlTitle.value,
    descriptions: getChangedDescriptionsObj([descriptions.value] as any),
    synonyms: getIdFromArrayOfObj(selectedSynonyms.value)
  }

  await addNicheTag(sendObj)
}
</script>

<template>
  <div>
    <h2>Add Niche Tag</h2>
    <WhiteRow>
      <VCol cols="12">
        <VRow>
          <VCol cols="12" sm="12" md="6">
            <VTextField label="Title" class="mb-3" v-model="descriptions.title" :rules="[requiredValidator]"/>
            <VTextField label="URL Permalink" class="mb-3" v-model="urlTitle"/>
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
            <HintSelector v-model="selectedSynonyms" label="Select synonym" itemsGetter="getSynonyms" chip="1"/>
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
