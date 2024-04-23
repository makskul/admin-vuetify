<script setup lang="ts">
import ThumbView from "@/GalleriesPageComponents/ThumbView.vue"
import TableView from "@/GalleriesPageComponents/TableView.vue"
import { getGalleries } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { useContentStore } from "@/stores/contentStore"
import { GalleriesType } from "@/types/content"
import { statusObj } from "@/utils"
import AutocompleteSelector from "@/pages/components/AutocompleteSelector.vue"
import { usePagination } from "@/composables/usePagination"

const route = useRoute()
const router = useRouter()
const toggleView = ref(1)
const domainStore = useDomainStore()
const contentStore = useContentStore()
const galleries = ref<GalleriesType>()
const meta = ref([])

// filters
const selectedStatus = ref('All')
const selectedSort = ref('Newest')
const searchField = ref('')
const llamaField = ref('All')
const searchByTag = ref('')
const searchByStar = ref('')
const filter = ref<any>([])
//end filters

// pagination
const { setCurrentPageQuery, resetPage, rowPerPage, currentPage, totalPage, total, paginationData } = usePagination()

async function init () {
  currentPage.value = Number(route.query.page || 1)
  const requestProps: any = {
    page: currentPage.value,
    perPage: rowPerPage.value,
    filter: filter.value,
    sort: selectedSort.value.toLowerCase()
  }

  const { data } = await getGalleries(requestProps)

  galleries.value = data.items
  total.value = data.meta.totalItems
  totalPage.value = Math.ceil(total.value / rowPerPage.value)

  if (totalPage.value && currentPage.value > totalPage.value) {
    currentPage.value = totalPage.value
    setCurrentPageQuery(router, currentPage.value)
  }
}

// make re-fetch essence on domain, page, itemscount change
function rowsCountChange(value: number) {
  contentStore.setItemsCount(value)
  resetPage(router)
}

function sortChange() {
  resetPage(router)
  init()
}

function filterHandler() {
  if (selectedStatus.value == 'Active' || selectedStatus.value == 'Inactive') {
    filter.value.status = statusObj[selectedStatus.value]
  } else {
    filter.value.status = null
  }
  const llamaValuesMap: any = {
    'Generated': '1',
    'All': null
  }
  filter.value.tag = searchByTag.value !== '' ? searchByTag.value : null
  filter.value.llamaExist = llamaValuesMap[llamaField.value]
  filter.value.pornstar = searchByStar.value !== '' ? searchByStar.value : null
  filter.value.search = searchField.value.length ? searchField.value : null

  resetPage(router)
  init()
}
watch([
  () => domainStore.globalDomain,
  () => route.query.page
], init)
// call init onMounted
init()
</script>

<template>
  <div>
    <VCard class="mb-3">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <div class="d-flex align-center">
          <VBtnToggle
              v-model="toggleView"
              divided
              color="primary"
              variant="outlined"
              class="mr-1"
          >
            <VBtn icon="tabler-photo" />
            <VBtn icon="tabler-list" />
          </VBtnToggle>
          <div
              class="d-inline-block mr-1"
              style="width: 95px;"
          >
            <VSelect
                label="Show"
                v-model="rowPerPage"
                @update:modelValue="rowsCountChange"
                density="compact"
                :items="[10, 20, 30, 50]"
            />
          </div>
          <div class="d-inline-block">
            <VSelect
                class="filter-status-filed"
                label="Sort by"
                v-model="selectedSort"
                density="compact"
                :items="['Popular', 'Newest']"
                @update:model-value="sortChange"
            />
          </div>
        </div>
        <VSpacer />
        <div class="filter-container align-center">
          <VSelect
              class="d-inline-block filter-status-filed"
              label="Status"
              v-model="selectedStatus"
              density="compact"
              :items="['All', 'Active', 'Inactive']"
          />
          <VTextField
              class="ml-2 d-inline-block filter-search-field"
              density="compact"
              label="Search by name / id"
              v-model="searchField"
          />
          <AutocompleteSelector
              class="ml-2 d-inline-block filter-search-field"
              label="Filter by tag"
              v-model="searchByTag"
              itemsGetter="getTags"
          />
          <AutocompleteSelector
              class="ml-2 d-inline-block filter-search-field"
              density="compact"
              label="Filter by star"
              v-model="searchByStar"
              itemsGetter="getPornstars"
          />
          <VSelect
              class="ml-2 d-inline-block filter-search-field"
              label="AI title"
              v-model="llamaField"
              density="compact"
              :items="['All', 'Generated']"
          />
          <VBtn class="d-inline-block ml-md-1" variant="text" @click="filterHandler">
              <VIcon icon="tabler-search" />
          </VBtn>
        </div>
      </VCardText>
    </VCard>
    <div v-if="galleries">
      <TableView v-if="toggleView" :galleries="galleries" :meta="meta"/>
      <ThumbView v-else :galleries="galleries" :meta="meta"/>
    </div>
    <VCard class="mt-2">
      <!-- SECTION Pagination -->
      <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-4">
        <!-- 👉  Pagination meta -->
        <span class="text-sm text-disabled">{{ paginationData }}</span>

        <!-- 👉 Pagination -->
        <VPagination
            v-model="currentPage"
            @update:modelValue="(value) => setCurrentPageQuery(router, value)"
            :length="totalPage"
            :total-visible="5"
            size="small"
            class="pagination"
        />
      </VCardText>
      <!-- !SECTION -->
    </VCard>
  </div>
</template>
