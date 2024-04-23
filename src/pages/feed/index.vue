<script setup lang="ts">
  import {apiGetImportConfig} from "@/Api/config"
  import AsyncCheckboxBlock from "@/pages/components/AsyncCheckboxBlock.vue"
  import {VForm} from "vuetify/components"

  const searchQuery = ref('')
  const select = ref('')
  const items = ['All Galleries', 'Sponsor Galleries', 'Usual Galleries']
  const tubeLegal = ['All', 'Legal', 'Usual Galleries']
  const refVForm = ref<VForm>()

  const selectedCategories = ref([])
  const types = ref<string>()

  onMounted(async() => {
    const r = await apiGetImportConfig()

    selectedCategories.value = r.data.categories
  })
</script>
<template>
  <VRow>
    <VCol sm="12">
      <VCard class="mb-1">
        <VCardText class="d-flex align-center flex-wrap gap-2 py-4">
          <!-- 👉 Search  -->
          <div class="feed-search">
            <VTextField
                v-model="searchQuery"
                placeholder="Search..."
                density="compact"
            />
          </div>

          <!-- 👉 Select status -->
          <div class="feed-status">
            <VCombobox
                v-model="select"
                :items="items"
                label="Content Type"
                multiple
                clearable
            />
          </div>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" sm="6">
      <VCard>
        <VCardTitle>Categories</VCardTitle>
        <VDivider class="my-1"/>
        <VCardText class="pa-3 screen-height-75 vertical-sroll">
          <AsyncCheckboxBlock :preSelect="selectedCategories" itemsGetter="getCategories"/>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" sm="6">
      <VCard>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent>
            <VSelect multiple :items="tubeLegal" label="Import type"/>
            <VCheckbox label="Niche tube"/>
            <VBtn size="small" @click="" class="mt-2">
              Import
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">
  .feed-search, .feed-status {
    inline-size: 20rem;
  }
</style>
