<script setup lang="ts">
import {getSpots} from "@/Api/spots";

interface SpotsData {
  id: number,
  name: string
}

const spots = ref<SpotsData[]>([])
getSpots().then(r => {
  spots.value = r?.data
})
</script>

<template>
  <div>
    <VCard class="mb-3">
      <VCardText class="pa-3 pl-6">
        <RouterLink
            :to="{ name: 'spots-add' }"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add
          </VBtn>
        </RouterLink>
        <VBtn color="warning" size="small" prepend-icon="tabler-refresh" class="ml-2">
          Refresh
        </VBtn>
      </VCardText>
    </VCard>
    <VRow>
      <VCol md="6">
<!--        <SpotsTable :spots="spots" v-if="spots"/>-->
      </VCol>
      <VCol md="6">
<!--        <SpotsEditForm  class="mb-3" title=""/>-->
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.campaign-table {
  & th, & td {
    font-size: 11px;
    padding-left: 2px !important;
    width: 150px;
    text-align: justify;
  }
}
</style>
