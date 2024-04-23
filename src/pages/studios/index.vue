<script setup lang="ts">
// TODO: non active index icon = Tabler-ban, color = warning
import { getStudios } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { simpleRequestType, StudioListType } from "@/types/content"
import { usePagination } from "@/composables/usePagination"

const domainStore = useDomainStore()
const searchField = ref('')
const router = useRouter()
const route = useRoute()
const studios = ref<StudioListType[]>([])
const { setCurrentPageQuery, resetPage, rowPerPage, currentPage, totalPage, total, paginationData } = usePagination()

const init = async () => {
  currentPage.value = Number(route.query.page || 1)

  const { data } = await getStudios({
    pageNum: currentPage.value,
    perPage: rowPerPage.value,
    query: searchField.value
  } as simpleRequestType)

  studios.value = data.items
  total.value = data.meta.totalItems
  totalPage.value = Math.ceil(total.value / rowPerPage.value)

  if (totalPage.value && currentPage.value > totalPage.value) {
    currentPage.value = totalPage.value
    setCurrentPageQuery(router, currentPage.value)
  }
}

watch(() => domainStore.globalDomain, init)
watch(() => route.query.page, init)
const rowsCountChange = () => init()
const filterHandler = () => {
  resetPage(router)
  init()
}

// init on mount
init()
</script>
<template>
  <VCard>
    <VCardText>
      <div
        class="d-flex align-center"
      >
        <div class="d-flex align-center" style="width: 135px;">
          <span class="text-no-wrap me-3">Show:</span>
          <VSelect
            v-model="rowPerPage"
            @update:modelValue="rowsCountChange"
            density="compact"
            :items="[10, 20, 30, 50]"
          />
        </div>
        <VSpacer />
        <div class="filter-container align-center">
          <VTextField
            class="ml-2 d-inline-block filter-search-field"
            density="compact"
            label="Search studio by name..."
            v-model="searchField"
          />
          <VBtn class="d-inline-block ml-md-1" size="small" variant="text" @click="filterHandler">
            <VIcon icon="tabler-search" />
          </VBtn>
        </div>
      </div>
    </VCardText>
    <VTable>
      <thead class="text-uppercase">
      <tr>
        <th scope="col" class="text-left cell-small">ID</th>
        <th scope="col" class="text-center cell-small">Feed ID</th>
        <th scope="col" class="text-center">Name</th>
        <th scope="col" class="text-center">Video <br/><i>(total)</i></th>
        <th scope="col" class="text-center">Total Sponsor</th>
        <th scope="col" class="text-center">Total Common</th>
        <th scope="col" class="text-end">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="studio in studios">
        <td class="cell-small">
          <VCheckbox :value="studio.id" :label="studio.id" />
        </td>
        <td class="text-center cell-small">{{ studio.feedId }}</td>
        <td class="text-center">{{ studio.title }}</td>
        <td class="text-center">{{ studio.total || 0 }}</td>
        <td class="text-center">{{ studio.totalSponsor || 0 }}</td>
        <td class="text-center">{{ studio.totalCommon || 0 }}</td>
        <td class="text-end">
          <RouterLink :to="{ name: 'studios-edit-id', params: { id: studio.id } }" class="inherit-link">
            <VBtn
              icon
              size="x-small"
              color="default"
              variant="text"
            >
              <VIcon
                size="22"
                icon="tabler-edit"
              />
            </VBtn>
          </RouterLink>
          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
          >
            <VIcon
              size="22"
              icon="tabler-trash"
            />
          </VBtn>
        </td>
      </tr>
      </tbody>
    </VTable>
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
</template>
