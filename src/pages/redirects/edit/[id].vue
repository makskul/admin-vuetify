<script setup lang="ts">
import { patchRedirect, getRedirectData } from "@/Api/content"
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { AxiosResponse } from "axios"
import { RedirectsTypeEnum } from "./../enums"

const redirectId = useRoute().params.id
const responseData = ref<any>([])
const fromType = ref<string>('')
const fromUrlTitle = ref<string>('')
const toType = ref<string>('')
const toUrlTitle = ref<string>('')
const redirectTypes = ['home', 'tag', 'category', 'search', 'channel', 'pornstar', 'channel', 'studio']

const patch = async () => {
  const fromIndex = RedirectsTypeEnum[fromType.value.toUpperCase() as any]
  const toIndex = RedirectsTypeEnum[fromType.value.toUpperCase() as any]

  const params = {
    redirectId,
    fromType: fromIndex,
    fromUrlTitle: fromUrlTitle.value,
    toType: toType.value,
    toUrlTitle: toIndex
  }

  await patchRedirect(params)
  init()
}
const init = async () => {
  const { data } = await getRedirectData(redirectId) as AxiosResponse

  if (data) {
    responseData.value = data
    fromType.value = data.fromType
    fromUrlTitle.value = data.fromUrlTitle
    toType.value = data.toType
    toUrlTitle.value = data.toUrlTitle
  }
}

init()
</script>
<template>
  <div>
    <VRow>
      <VCol cols="12" class="mb-3">
        <RouterLink :to="{name: 'redirects'}" class="btn btn-sm">
          <VBtn variant="tonal" color="info" size="small">
            &lsaquo; Redirects
          </VBtn>
        </RouterLink>
      </VCol>
    </VRow>
    <WhiteRow>
      <VCol cols="12" md="5">
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              label="From type"
              class="mb-3"
              :items="redirectTypes"
              v-model="fromType"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              label="From UrlTitle"
              class="mb-3"
              v-model="fromUrlTitle"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              label="To type"
              class="mb-3"
              :items="redirectTypes"
              v-model="toType"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              label="To UrlTitle"
              class="mb-3"
              v-model="toUrlTitle"
            />
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success" @click="patch">
            Save
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>
