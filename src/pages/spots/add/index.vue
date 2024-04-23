<script setup lang="ts">
import { addSpot } from "@/Api/spots";
import type { VForm } from 'vuetify/components'
import { requiredValidator } from '@validators'

const spotName = ref()
const spotCode = ref()
const saveAlert = ref(false)
const saveErrorAlert = ref(false)
const saveErrorText = ref('')
const refForm = ref<VForm>()

async function createSpotBtnHandler() {
  const validRes = await refForm.value?.validate()
  if (validRes && !validRes.valid) return false

  await addSpot({name: spotName.value, code: spotCode.value})
}
</script>

<template>
  <div>
    <VCard class="mb-3">
      <VCardText class="pa-3 pl-6">
        <RouterLink
            class="mr-2"
            :to="{ name: 'spots' }"
        >
          <VBtn color="primary" size="small" variant="text">
            Spots
          </VBtn>
        </RouterLink>
        <RouterLink
            class="ms-2"
            :to="{ name: 'spots-campaign_add' }"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add Campaign
          </VBtn>
        </RouterLink>
      </VCardText>
    </VCard>
    <VCard>
      <VRow>
        <VCol md="6">
          <VCardText>
            <h5 class="text-h5 mb-4">Create Spot</h5>
            <VForm ref="refForm" @submit.prevent>
              <VTextField
                  label="Name"
                  class="mb-3"
                  v-model="spotName"
                  :rules="[requiredValidator]"
              />
              <VTextField
                  label="Code"
                  class="mb-3"
                  v-model="spotCode"
              />
              <VBtn
                  color="success"
                  class="mb-3"
                  type="submit"
                  @click="createSpotBtnHandler"
              >
                Create
              </VBtn>
            </VForm>
            <VAlert v-if="saveAlert" color="success" variant="tonal">
              Saved
            </VAlert>
            <VAlert v-if="saveErrorAlert" color="error" variant="tonal">
              {{ saveErrorText }}
            </VAlert>
          </VCardText>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>
