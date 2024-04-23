<script setup lang="ts">
// TODO: non active index icon = Tabler-ban, color = warning
import { useDomainStore } from "@/stores/headerStores"
import { TagListType } from "@/types/content"
import { getTags } from "@/Api/content"
import { usePagination } from "@/composables/usePagination"

const domainStore = useDomainStore()
const searchField = ref('')
const router = useRouter()
const route = useRoute()
const tags = ref<TagListType[]>([])
const { setCurrentPageQuery, resetPage, rowPerPage, currentPage, totalPage, total, paginationData } = usePagination()

const init = async () => {
  currentPage.value = Number(route.query.page || 1)

  const { data } = await getTags({
    pageNum: currentPage.value,
    perPage: rowPerPage.value,
    query: searchField.value
  })

  if (data) {
    tags.value = data.items
    total.value = data.meta.totalItems
    totalPage.value = Math.ceil(total.value / rowPerPage.value)

    if (totalPage.value && currentPage.value > totalPage.value) {
      currentPage.value = totalPage.value
      setCurrentPageQuery(router, currentPage.value)
    }
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
  <div>
    <VCard class="mb-3">
      <VCardText class="pa-3 pl-6">
        <RouterLink
          class="mr-2"
          :to="{ name: 'tags-create'}"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add Multitag
          </VBtn>
        </RouterLink>
        <RouterLink
          class="mr-2"
          :to="{ name: 'tags-niche'}"
        >
          <VBtn color="primary" size="small">
            Niche tags
          </VBtn>
        </RouterLink>
      </VCardText>
    </VCard>
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
              label="Search tag by name..."
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
          <th scope="col" class="text-center">Rating</th>
          <th scope="col" class="text-center">Video <br/><i>(total)</i></th>
          <th scope="col" class="text-center">Total Common</th>
          <th scope="col" class="text-center">Total Legal</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tag in tags">
          <td class="cell-small">
            <VCheckbox :value="tag.id" :label="tag.id"/>
          </td>
          <td class="text-center cell-small">{{ tag.feedId || 0 }}</td>
          <td class="text-center">{{ tag.title }}</td>
          <td class="text-center">{{ tag.rating || 0 }}</td>
          <td class="text-center">{{ tag.total || 0 }}</td>
          <td class="text-center">{{ tag.totalCommon || 0 }}</td>
          <td class="text-center">{{ tag.totalSponsor || 0 }}</td>
          <td class="text-end">
            <RouterLink :to="{ name: 'tags-edit-id', params: { id: tag.id } }" class="inherit-link">
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
          :length="totalPage"
          @update:modelValue="(value) => setCurrentPageQuery(router, value)"
          :total-visible="5"
          size="small"
          class="pagination"
        />
      </VCardText>
      <!-- !SECTION -->
    </VCard>
  </div>
</template>
