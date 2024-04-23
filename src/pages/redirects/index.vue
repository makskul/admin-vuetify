<script setup lang="ts">
import { getRedirects, addRedirect, deleteRedirect } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { RedirectsList } from "@/types/content"
import { RedirectsTypeEnum } from "./enums"

const redirects = ref<RedirectsList[]>([])
const isAddDialogVisible = ref(false)
const domainStore = useDomainStore()
const fromType = ref<string>('')
const toType = ref<string>('')
const fromUrl = ref<string>('')
const toUrl = ref<string>('')
const redirectTypes = ['home', 'tag', 'category', 'search', 'channel', 'pornstar', 'channel', 'studio']

// pagination
const currentPage = ref(1)
const totalPage = ref(1)
const total = ref(0)
const rowPerPage = ref(20)
// end pagination

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

const add = async () => {
  const fromIndex = RedirectsTypeEnum[fromType.value.toUpperCase() as any]
  const toIndex = RedirectsTypeEnum[fromType.value.toUpperCase() as any]

  const params = {
    fromType: fromIndex,
    fromUrlTitle: fromUrl.value,
    toType: toIndex,
    toUrlTitle: toUrl.value
  }

  await addRedirect(params)
  fromType.value = ''
  fromUrl.value = ''
  toType.value = ''
  toUrl.value = ''
  await init()
}

const remove = async (id: number | string) => {
  await deleteRedirect(id)
  await init()
}

const init = async () => {
  const { data } = await getRedirects(currentPage.value, rowPerPage.value)

  if (data) {
    redirects.value = data.items
    total.value = data.meta.totalItems
    totalPage.value = Math.ceil(total.value / rowPerPage.value)
  }
}

watch(() => domainStore.globalDomain, init)

const rowsCountChange = () => {
  init()
}

const setCurrentPage = (value: number) => {
  let url = '?page='+ value
  window.history.pushState("", "", url)
  init()
}

const paginationData = computed(() => {
  return `Showing ${currentPage.value} to ${totalPage.value} of ${total.value} entries`
})

// call init on mounted
init()
</script>
<template>
  <VCard>
    <VCardText>
      <div class="d-flex justify-space-between">
        <div class="v-col-2 me-3 btn-sm">
          <VDialog
              v-model="isAddDialogVisible"
              width="500"
          >
            <!-- Activator -->
            <template #activator="{ props }">
              <VBtn
                  v-bind="props"
                  color="primary"
                  block
                  prepend-icon="tabler-plus"
                  size="small"
              >
                Add redirect
              </VBtn>
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isAddDialogVisible = !isAddDialogVisible" />

            <!-- Dialog Content -->
            <VCard title="Add redirect">
              <VCardText>
                <VRow>
                  <VCol cols="12" md="6">
                    <VSelect
                        label="From type"
                        class="mb-3"
                        :items="redirectTypes"
                        v-model="fromType"
                    />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField
                        label="From UrlTitle"
                        class="mb-3"
                        v-model="fromUrl"
                    />
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12" md="6">
                    <VSelect
                        label="To type"
                        class="mb-3"
                        :items="redirectTypes"
                        v-model="toType"
                    />
                  </VCol>
                  <VCol cols="12" md="6">
                    <VTextField
                        label="To UrlTitle"
                        class="mb-3"
                        v-model="toUrl"
                    />
                  </VCol>
                </VRow>
              </VCardText>
              <VCardText class="d-flex justify-end">
                <VBtn @click="add" color="success">
                  Add
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>
        </div>
        <div
            class="d-flex align-center"
            style="width: 135px;"
        >
          <span class="text-no-wrap me-3">Show:</span>
          <VSelect
              v-model="rowPerPage"
              @update:modelValue="rowsCountChange"
              density="compact"
              :items="[10, 20, 30, 50]"
          />
        </div>
      </div>
    </VCardText>

    <VTable>
      <thead class="text-uppercase">
      <tr>
        <th scope="col" class="text-left cell-small">ID</th>
        <th scope="col" class="text-center">From</th>
        <th scope="col" class="text-center">To</th>
        <th scope="col" class="text-end">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="redirect in redirects">
        <td class="text-center cell-small">
          <VCheckbox :value="redirect.redirectId" :label="`${redirect.redirectId}`"/>
        </td>
        <td class="text-center">
          {{ redirect.fromType }}: {{ redirect.fromUrlTitle }}
        </td>
        <td class="text-center">
          {{ redirect.toType }}: {{ redirect.toUrlTitle }}
        </td>
        <td class="text-end">
          <RouterLink
            :to="{ name: 'redirects-edit-id',
            params: { id: redirect.redirectId }}"
            class="inherit-link"
          >
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
              @click="remove(redirect.redirectId)"
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
          @update:modelValue="setCurrentPage"
          :length="totalPage"
          :total-visible="5"
          size="small"
          class="pagination"
      />
    </VCardText>
    <!-- !SECTION -->
  </VCard>
</template>
