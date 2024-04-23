<script setup lang="ts">

import WhiteRow from "@/pages/components/WhiteRow.vue"

const status = ['Active', 'Inactive']
</script>

<template>
  <div>
    <WhiteRow>
      <VCol cols="12" md="6">
        <VCardTitle class="mb-4">Sponsor Edit</VCardTitle>
        <VTextField label="Title" class="mb-3"/>
        <VTextarea auto-grow label="Description" rows="4" row-height="30" class="mb-3"/>
        <VSelect
            :items="status"
            label="Status"
            class="mb-3"
        />
        <VTextField label="Sponsor URL" class="mb-3"/>
        <VTextarea auto-grow label="Rules" rows="4" row-height="30" />
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success">
            Save
          </VBtn>
          <VBtn color="info">
            Save and Add more
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>