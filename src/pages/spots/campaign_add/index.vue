<script setup lang="ts">
import { addCampaign, getSpots } from "@/Api/spots"
import { useDomainStore } from "@/stores/headerStores"
import { getChannels } from "@/Api/content"
import type { VForm } from 'vuetify/components'
import { requiredValidator } from '@validators'

const domainStore = useDomainStore()

interface SpotsData {
  id: number,
  name: string
}

const spots = ref<SpotsData[]>([])
const niches = ref<any>([])

// Form Props
const refForm = ref<VForm>()
const spotsTitle = ref([])
const campaignName = ref()
const campaignStatus = ref('Inactive')
const campaignHtmlCode = ref()
const campaignChannel = ref()
const selectedSpot = ref()
const selectedDomainsStraight = ref<string[]>([])
const selectedDomainsGay = ref<string[]>([])
const selectedDomainsShemales = ref<string[]>([])
const channels = ref<any>([])

function collectFilters(filterName: string) {
  if (!niches.value.includes(filterName)) {
    niches.value.push(filterName)
  }
}

function collectByNicheDomains(niche: string) {
  return domainStore.domains.filter((domain: any) => {
    return domain.niche.title === niche
  }).map((domainObj: any) => domainObj.url)
}

function getSelectsValue() {
  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })
  const tubeId = selectedTube[0].id

  getChannels(tubeId, 1, 500).then((r) => {
    channels.value = r?.data.items
  })

  getSpots().then(r => {
    spots.value = r?.data
    spotsTitle.value = r?.data.map((r: any) => r.name)

    niches.value = []

    domainStore.domains.map((el: any) => {
      collectFilters(el.niche.title)
    })
  })
}
function clearChannel () {
  campaignChannel.value = null
}

getSelectsValue()

async function createCampaign() {
  const validRes = await refForm.value?.validate()
  if (validRes && !validRes.valid) return false

  const getSelectedSpotId = selectedSpot.value?.id
  const campaignStatusBoolean = campaignStatus.value === 'Active' ? 1 : 0
  const selectedDomains = []
  if (selectedDomainsStraight.value.length) {
    selectedDomains.push(...selectedDomainsStraight.value)
  }
  if (selectedDomainsGay.value.length) {
    selectedDomains.push(...selectedDomainsGay.value)
  }
  if (selectedDomainsShemales.value.length) {
    selectedDomains.push(...selectedDomainsShemales.value)
  }

  const selectedDomainsIds = selectedDomains.map((domain: string) => {
    return domainStore.domains.filter((x: any) => x.url === domain)[0].id
  })

  const params = {
    name: campaignName.value,
    code: campaignHtmlCode.value,
    tubes: selectedDomainsIds,
    adSpotId: getSelectedSpotId,
    status: campaignStatusBoolean,
    channelId: campaignChannel.value?.id || null
  }

  await addCampaign(params)
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
            :to="{ name: 'spots-add' }"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add Spot
          </VBtn>
        </RouterLink>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText>
        <VForm ref="refForm">
          <VRow>
            <VCol md="6">
              <h5 class="text-h5 mb-4">Create Campaign</h5>
              <VTextField label="Name"
                class="mb-3"
                v-model="campaignName"
                :rules="[requiredValidator]"
              />
              <VSelect
                  :items="['Active', 'Inactive']"
                  v-model="campaignStatus"
                  label="Status"
                  class="mb-3"
                  :rules="[requiredValidator]"
              />
              <VAutocomplete
                  :items="spots"
                  label="Spot"
                  class="mb-3"
                  v-model="selectedSpot"
                  item-title="name"
                  return-object
                  filled
                  :menu-props="{ maxHeight: 200 }"
                  :rules="[requiredValidator]"
              />
              <div class="d-flex align-center mb-3">
                <VAutocomplete
                  :items="channels"
                  label="Channel"
                  v-model="campaignChannel"
                  return-object
                  filled
                  :menu-props="{ maxHeight: 200 }"
                />
                <VBtn class="ml-2" @click="clearChannel" variant="text" size="small">Clear</VBtn>
              </div>
              <VTextarea
                  label="HTML Code"
                  v-model="campaignHtmlCode"
                  rows="3"
                  class="mb-3"
                  :rules="[requiredValidator]"
              />
            </VCol>
            <VCol md="6">
              <VRow>
                <VCol md="12">
                  <h5 class="text-h5 mb-4">Select tube by niche</h5>
<!-- NICHES: straight, gay, shemale -->
                  <div v-if="collectByNicheDomains('straight').length"  class="d-flex align-center mb-3">
                    <VSelect
                       v-model="selectedDomainsStraight"
                       :items="collectByNicheDomains('straight')"
                       :label="'Straight'"
                       class="label-capitalize"
                       chips
                       multiple
                    />
                  </div>
                  <div v-if="collectByNicheDomains('gay').length"  class="d-flex align-center mb-3">
                    <VSelect
                       v-model="selectedDomainsGay"
                       :items="collectByNicheDomains('gay')"
                       :label="'Gay'"
                       class="label-capitalize"
                       chips
                       multiple
                    />
                  </div>
                  <div v-if="collectByNicheDomains('shemale').length" class="d-flex align-center mb-3">
                    <VSelect
                      v-model="selectedDomainsShemales"
                      :items="collectByNicheDomains('shemale')"
                      :label="'Shemale'"
                      class="label-capitalize"
                      chips
                      multiple
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol sm="12">
              <VBtn color="success" @click="createCampaign" class="mb-2">Create</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
.label-capitalize {
  text-transform: capitalize;
}
</style>
