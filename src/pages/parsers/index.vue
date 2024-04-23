<script setup lang="ts">
import { List } from "@/Api/parsers"
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { usePagination } from "@/composables/usePagination"

const items = ref()
const searchField = ref('')
const router = useRouter()
const route = useRoute()
const { setCurrentPageQuery, resetPage, paginationData, currentPage, totalPage, total } = usePagination()

const init = async () => {
  const PER_PAGE = 50
  currentPage.value = Number(route.query.page || 1)

  const requestProps = {
    pageNum: currentPage.value,
    perPage: PER_PAGE,
    query: searchField.value
  }

  const { data } = await List(requestProps)
  items.value = data.items
  total.value = data.meta.totalItems
  totalPage.value = Math.ceil(total.value / PER_PAGE)

  if (currentPage.value > totalPage.value) {
    currentPage.value = totalPage.value
    setCurrentPageQuery(router, currentPage.value)
  }
}

function filterHandler() {
  resetPage(router)
  init()
}

init()

const deleteHandler = async (channelId: number) => {
  await Delete(channelId)
}

watch(() => route.query.page, init)
</script>
<template>
  <div>
    <h2>Parser list</h2>
    <VCard class="mb-3">
      <div
        class="d-flex align-center"
      >

        <VCardText class="pa-3 pl-6">
          <RouterLink
            class="mr-2"
            :to="{ name: 'parsers-add'}"
          >
            <VBtn color="primary" size="small" prepend-icon="tabler-plus">
              Add Parser
            </VBtn>
          </RouterLink>
        </VCardText>
        <VSpacer />
        <div class="filter-container align-center">
          <VTextField
            class="ml-2 d-inline-block filter-search-field"
            density="compact"
            label="Search channel..."
            v-model="searchField"
          />
          <VBtn class="d-inline-block ml-md-1" size="small" variant="text" @click="filterHandler">
            <VIcon icon="tabler-search" />
          </VBtn>
        </div>
      </div>
    </VCard>
    <WhiteRow>
      <VTable class="w-100">
        <thead class="text-uppercase">
        <tr>
          <th scope="col" class="text-left cell-small">&nbsp;</th>
          <th scope="col" class="text-left cell-small text-no-wrap">Channel ID</th>
          <th scope="col" class="text-center">Channel</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
        </thead>
        <tbody v-if="items && items.length">
          <tr v-for="item in items">
            <td class="cell-small">
              <VCheckbox :value="item.id" :label="item.id"/>
            </td>
            <td class="text-center">{{ item.channelId }}</td>
            <td class="text-center">{{ item.channelTitle }}</td>
            <td class="text-end">
              <RouterLink :to="{ name: 'parsers-edit-id', params: { id: item.channelId } }" class="inherit-link">
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
    </WhiteRow>
  </div>
</template>
