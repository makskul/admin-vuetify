<script setup lang="ts">

import { getSpots, getCampaignData, updateCampaign } from "@/Api/spots"
import { useDomainStore } from "@/stores/headerStores"
import { getChannels } from "@/Api/content"
import { statusConvert } from "@/utils"
import { VForm } from "vuetify/components"
import { requiredValidator } from '@validators'

const domainStore = useDomainStore()

interface SpotsData {
  id: number,
  name: string
}

const spots = ref<SpotsData[]>([])
const niches = ref<any>([])
const campaignId = useRoute().params.id

// Form Props
const spotsTitle = ref([])
const campaignName = ref()
const campaignStatus = ref()
const campaignHtmlCode = ref()
const campaignChannel = ref()
const selectedSpot = ref()
const selectedDomainsGay = ref<string[]>([])
const selectedDomainsStraight = ref<string[]>([])
const selectedDomainsShemales = ref<string[]>([])
const channels = ref<any>([{ id: 1, title: 'err' }])
const refForm = ref<VForm>()

// Alerts
const saveAlert = ref(false)
const saveErrorAlert = ref(false)
const saveErrorText = ref('')

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

async function getSelectsValue() {
  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })
  const tubeId = selectedTube[0].id

  const responseChannels = await getChannels(tubeId, 1, 500)
  channels.value = responseChannels?.data.items

  const responseSpot = await getSpots()
  spots.value = responseSpot?.data
  spotsTitle.value = responseSpot?.data.map((r: any) => r.name)

  niches.value = []

  domainStore.domains.map((el: any) => {
    collectFilters(el.niche.title)
  })
}

async function initCampaignData() {
  await getSelectsValue()

  getCampaignData(campaignId).then(r => {
    const responseData = r?.data

    campaignName.value = responseData.name
    campaignHtmlCode.value = responseData.code
    campaignStatus.value = statusConvert(responseData.status)

    // pre-select channel
    const preSelectedChannel = channels.value.filter((channel: {
      id: number;
    }) => channel.id === responseData.channelId)
    campaignChannel.value = preSelectedChannel[0]

    // pre-select spot
    const preSelectedSpot = spots.value.filter((spot: { id: number; }) => spot.id === responseData.adSpotId)
    selectedSpot.value = preSelectedSpot[0]

    // pre-select domains
    const domainsResponse = responseData.tubes
    const gaysDomains = collectByNicheDomains('gay')
    selectedDomainsGay.value = domainsResponse.filter((domain:{ id: number, url: string }) => {
      return gaysDomains.includes(domain.url)
    })

    const straightDomains = collectByNicheDomains('straight')
    selectedDomainsStraight.value = domainsResponse.filter((domain:{ id: number, url: string }) => {
      return straightDomains.includes(domain.url)
    })

    const shemaleDomains = collectByNicheDomains('shemale')
    selectedDomainsShemales.value = domainsResponse.filter((domain:{ id: number, url: string }) => {
      return shemaleDomains.includes(domain.url)
    })
  })
}

function clearChannel() {
  campaignChannel.value = null
}

initCampaignData()

async function saveCampaign() {
  const validRes = await refForm.value?.validate()
  if (validRes && !validRes.valid) return false

  const getSelectedSpotId = selectedSpot.value.id
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
    return domainStore.domains.filter((x: any) => x.url === domain.url)[0].id
  })

  const params = {
    name: campaignName.value,
    code: campaignHtmlCode.value,
    tubes: selectedDomainsIds,
    adSpotId: getSelectedSpotId,
    status: campaignStatusBoolean,
    channelId: campaignChannel.value?.id || null
  }

  await updateCampaign(campaignId, params)
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
              <h5 class="text-h5 mb-4">Edit Campaign</h5>
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
              />
              <VAutocomplete
                :items="spots as Array<any>"
                label="Spot"
                class="mb-3"
                v-model="selectedSpot"
                item-title="name"
                return-object
                filled
                :menu-props="{ maxHeight: 200 }"
              />
              <div class="d-flex align-center mb-3">
                <VAutocomplete
                  :items="channels as Array<any>"
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
                  <div class="d-flex align-center mb-3">
                    <VSelect
                      v-model="selectedDomainsStraight"
                      :items="collectByNicheDomains('straight')"
                      :label="'Straight'"
                      item-title="url"
                      item-value="url"
                      class="label-capitalize"
                      chips
                      multiple
                    />
                  </div>
                  <div class="d-flex align-center mb-3">
                    <VSelect
                      v-model="selectedDomainsGay"
                      :items="collectByNicheDomains('gay')"
                      :label="'Gay'"
                      item-title="url"
                      item-value="url"
                      class="label-capitalize"
                      chips
                      multiple
                    />
                  </div>
                  <div v-if="collectByNicheDomains('shemale').length" class="d-flex align-center mb-3">
                    <VSelect
                      v-model="selectedDomainsShemales"
                      :items="collectByNicheDomains('shemale')"
                      :label="'Shemales'"
                      item-title="url"
                      item-value="url"
                      class="label-capitalize"
                      chips
                      multiple
                    />
                  </div>
                </VCol>
              </VRow>
            </VCol>
            <VCol sm="12">
              <VBtn color="success" @click="saveCampaign" class="mb-2">Save</VBtn>
              <VAlert v-if="saveAlert" color="success" variant="tonal" class="text-center">
                Saved!
              </VAlert>
              <VAlert v-if="saveErrorAlert" color="error" variant="tonal">
                {{ saveErrorText }}
              </VAlert>
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
