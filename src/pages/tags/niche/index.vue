<script setup lang="ts">
// TODO: non active index icon = Tabler-ban, color = warning
import { useDomainStore } from "@/stores/headerStores"
import { TagListType } from "@/types/content"
import { getNicheTags } from "@/Api/content"

const domainStore = useDomainStore()
const tags = ref<TagListType[]>([])

// pagination
const currentPage = ref(1)
const totalPage = ref(10)
const total = ref(2)
const rowPerPage = ref(50)
// end pagination


// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})
const init = async () => {
  const { data } = await getNicheTags(currentPage.value, rowPerPage.value)

  if (data) {
    tags.value = data.items
    total.value = data.meta.totalItems
    totalPage.value = Math.ceil(total.value / rowPerPage.value)
  }
}

watch(() => domainStore.globalDomain, init)

const rowsCountChange = () => init()

const setCurrentPage = (value: number) => {
  let url = '?page='+ value
  window.history.pushState("", "", url)
  init()
}

// 👉 Computing pagination data
const paginationData = computed(() => {
  return `Showing ${currentPage.value} to ${totalPage.value} of ${total.value} entries`
})

// call init on mounted
init()
</script>
<template>
  <div>
    <h2>Niche Tags List</h2>
    <VCard class="mb-3">
      <VCardText class="pa-3 pl-6">
        <RouterLink
          class="mr-2"
          :to="{ name: 'tags-niche-add'}"
        >
          <VBtn color="primary" size="small" prepend-icon="tabler-plus">
            Add Tag
          </VBtn>
        </RouterLink>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText>
        <div
          class="d-flex align-center"
          style="width: 135px;"
        >
          <span class="text-no-wrap me-3">Show:</span>
          <VSelect
            v-model="rowPerPage"
            @update:modelValue="rowsCountChange"
            density="compact"
            :items="[20, 50, 100]"
          />
        </div>
      </VCardText>
      <VTable>
        <thead class="text-uppercase">
        <tr>
          <th scope="col" class="text-left cell-small">ID</th>
          <th scope="col" class="text-center cell-small">Feed ID</th>
          <th scope="col" class="text-center">Name</th>
          <th scope="col" class="text-center">URL</th>
          <th scope="col" class="text-center">Status</th>
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
          <td class="text-center">{{ tag.urlTitle }}</td>
          <td class="text-center">{{ tag.status }}</td>
          <td class="text-end">
            <RouterLink :to="{ name: 'tags-niche-edit-id', params: { id: tag.id } }" class="inherit-link">
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
          @update:modelValue="setCurrentPage"
          :total-visible="5"
          size="small"
          class="pagination"
        />
      </VCardText>
      <!-- !SECTION -->
    </VCard>
  </div>
</template>
