<script setup lang="ts">
  import router from "@/router"
  import { deleteCampaign, getCampaigns, getSpots } from "@/Api/spots"
  import DeleteBtn from "@/pages/components/DeleteBtn.vue"

  interface SpotsData {
    id: number,
    name: string
  }

  const spots = ref<SpotsData[]>([])
  const spot = ref<any>([])
  const routeQueries = router.currentRoute.value.query

  function init () {
    getSpots().then(r => {
      spots.value = r?.data
      if (routeQueries && routeQueries.spot && routeQueries.spot.length) {
        spot.value = spots.value.find((spot: { name: string }) => spot.name === routeQueries.spot )
      } else {
        getCampaigns().then(campaignResponse => {
          spot.value.campaigns = campaignResponse?.data
        })
      }
    })
  }

  init()
  async function deleteHandler (id: number) {
    await deleteCampaign(id)
    init()
  }
</script>

<template>
  <div>
    <VCard class="mb-3">
      <VCardText class="pa-3 pl-6">
        <RouterLink
            class="mr-2"
            :to="{ name: 'spots-add' }"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add Spot
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
    <VRow>
      <VCol>
        <VCardText class="pb-2">
          <span class="text-caption mr-2">Spots:</span>
          <a href="/spots" class="mr-3">
            <VBtn variant="tonal" color="info" size="small">
              View All
            </VBtn>
          </a>
          <a
              v-for="spot in spots"
              :key="spot"
              :href="spot.name!==routeQueries.spot ? `/spots?spot=${spot.name}`: '#'"
              :class="{'active-filter': spot.name===routeQueries.spot}"
              class="mr-2 mb-2 d-inline-block"
          >
            <VBtn size="small" variant="tonal" :color="spot.name===routeQueries.spot ? 'secondary': 'primary'">
              {{ spot.name }}
            </VBtn>
          </a>
        </VCardText>
        <VTable class="text-no-wrap spots-table">
          <!-- 👉 Table head -->
          <thead class="text-uppercase">
          <tr>
            <th scope="col">Campaign</th>
            <th scope="col">Status</th>
            <th scope="col">Spot</th>
            <th scope="col" class="text-right">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="campaign in spot.campaigns">
            <td>{{ campaign.name }}</td>
            <td>{{ campaign.status === 1 ? 'Active' : 'Inactive' }}</td>
            <td>
              {{ routeQueries.spot || campaign.adSpotName }}
            </td>
            <td class="text-right">
              <a :href="`/spots/campaign_edit/${campaign.id}`">
                <VBtn
                    icon
                    size="x-small"
                    variant="text"
                    color="default"
                >
                  <VIcon
                      size="22"
                      icon="tabler-edit"
                  />
                </VBtn>
              </a>
              <DeleteBtn :action="deleteHandler" :id="campaign.id"/>
            </td>
          </tr>
        </tbody>
        </VTable>
      </VCol>
    </VRow>
  </div>
</template>
