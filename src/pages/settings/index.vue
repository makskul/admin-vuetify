<script setup lang="ts">
import { getConfig, setConfig, addConfig } from "@/Api/config"
import { useDomainStore } from "@/stores/headerStores"
import router from "@/router"

const domainStore = useDomainStore()
const isAddDialogVisible = ref(false)
const configs = ref<any>([])
const filters = ref<any>([])

const currentDomainId = ref()
const routeQueries = router.currentRoute.value.query
const emptyConfig = ref<any>({
  group: "",
  key: "",
  value: "",
  isPrivate: false,
  tubeUrl: domainStore.globalDomain
})

function saveConfig() {
  setConfig(configs.value).then(() => {
    getConfig(currentDomainId.value).then(r => {
      configs.value = r.data
    })
  })
}

async function addNewConfigRow() {
  await addConfig(emptyConfig.value)
  isAddDialogVisible.value = false

  const r = await getConfig(currentDomainId.value)
  configs.value = r.data
}

async function init() {
  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })

  if (!selectedTube.length) {
    return false
  }

  currentDomainId.value = selectedTube[0].id

  getConfig(currentDomainId.value).then((r: any) => {
    configs.value = r.data
    filters.value = []

    configs.value.map((el : { id: number, group: string, value: string }) => {
       collectFilters(el.group)
    })

    if (routeQueries && routeQueries.filter && routeQueries.filter.length) {
      const routeFilters = routeQueries && routeQueries.filter ? routeQueries.filter : ''

      configs.value = configs.value.filter((el: { id: number, group: string, value: string }) => {
        return el.group === routeFilters
      })
    }
  })
}

watch([
    () => domainStore.domains,
    () => domainStore.globalDomain,
], init)

function collectFilters (filterName: string) {
  if (!filters.value.includes(filterName)) {
    filters.value.push(filterName)
  }
}

// call init on mounted
init()
</script>

<template>
  <div>
    <VCard>
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <div class="me-3">
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
              >
                Add config row
              </VBtn>
            </template>

            <!-- Dialog close btn -->
            <DialogCloseBtn @click="isAddDialogVisible = !isAddDialogVisible" />

            <!-- Dialog Content -->
            <VCard title="Edit row">
              <VCardText>
                <VTextField
                    label="Group"
                    class="mb-3"
                    v-model="emptyConfig.group"
                />
                <VTextField
                    label="Key"
                    class="mb-3"
                    v-model="emptyConfig.key"
                />
                <VTextarea
                    v-model="emptyConfig.value"
                    label="Value"
                    auto-grow
                    class="mb-3"
                />
                <VCheckbox label="Private" v-model="emptyConfig.isPrivate"/>
              </VCardText>
              <VCardText class="d-flex justify-end">
                <VBtn @click="addNewConfigRow" color="success">
                  Add
                </VBtn>
              </VCardText>
            </VCard>
          </VDialog>
        </div>

        <div class="d-flex align-center flex-wrap gap-4">
          <a href="/settings">
            <VBtn variant="tonal" color="info" size="small">
              View All
            </VBtn>
          </a>
          <a
              v-for="filter in filters"
              :key="filter"
              :href="filter!==routeQueries.filter ? `/settings?filter=${filter}`: '#'"
              :class="{'active-filter': filter===routeQueries.filter}"
          >
            <VBtn size="small" variant="tonal" :color="filter===routeQueries.filter ? 'secondary': 'primary'">
              {{ filter }}
            </VBtn>
          </a>
        </div>
      </VCardText>

      <VDivider />
      <VRow>
        <VCol>
          <VTable class="text-no-wrap setting-list-table">
            <thead class="text-uppercase">
            <tr>
              <th scope="col" class="text-center cell-xsmall">Private</th>
              <th scope="col" class="pl-2">Key</th>
              <th scope="col" class="pl-2">Group</th>
              <th scope="col" class="pl-2">Value</th>
              <th scope="col" class="text-end">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="config in configs">
              <td class=" text-center cell-xsmall">
                <VCheckbox v-model="config.isPrivate" class="d-inline-block"/>
              </td>
              <td>
                <div class="d-flex">
                  <VTextarea
                    v-model="config.key"
                    rows="2"
                    class="mt-3 mb-3"
                    no-resize
                  />
                </div>

              </td>
              <td>
                <VTextarea
                    v-model="config.group"
                    rows="2"
                    class="mt-3 mb-3"
                    no-resize
                />
              </td>
              <td>
                <VTextarea
                    v-model="config.value"
                    rows="2"
                    class="mt-3 mb-3"
                />
              </td>
              <td class="cell-small text-end">
                <VBtn
                  icon
                  size="x-small"
                  color="default"
                  variant="text"
                  @click="saveConfig"
                >
                  <VIcon
                    size="22"
                    icon="mdi-content-save-outline"
                  />
                </VBtn>
<!--                <VBtn-->
<!--                  icon-->
<!--                  size="x-small"-->
<!--                  color="default"-->
<!--                  variant="text"-->
<!--                >-->
<!--                  <VIcon-->
<!--                    size="22"-->
<!--                    icon="tabler-trash"-->
<!--                  />-->
<!--                </VBtn>-->
              </td>
            </tr>
            </tbody>
          </VTable>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style lang="scss">
  .setting-list-table textarea.v-field__input {
    font-size: 13px;
    padding: 5px !important;
  }
</style>

<style scoped lang="scss">
  table {
    min-width: 1300px;
  }

  td, th {
    padding: 2px !important;

    &:first-child {
      padding-left: 16px !important;
    }

    &:last-child {
      padding-right: 16px !important;
    }
  }

  .active-filter,
  .active-filter button {
    cursor: default;
  }

</style>
