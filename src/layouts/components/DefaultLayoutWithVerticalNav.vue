<script lang="ts" setup>
import navItems from '@/navigation/vertical'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import {useDomainStore, useFlagsStore} from "@/stores/headerStores"

// Components
import Footer from '@/layouts/components/Footer.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

import SettingsList from "@/layouts/components/SettingsList.vue"
import {apiReloadCache, getConfig, getDomains} from "@/Api/config"
import axiosIns from "@axios"

const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()
const domainStore = useDomainStore()
const flagStore = useFlagsStore()
const domains = ref<any>([])
const domain = ref()
const route = useRoute()
const configs = ref<any>([])

let disableDomainSelect = false
let storageDomain = localStorage.getItem('domain')

function getDomainFromStorage () {
  if (storageDomain && storageDomain.length > 1 && domain.value !== storageDomain) {
    domain.value = storageDomain
    // axiosIns.defaults.params.tubeUrl = storageDomain
    domainStore.setDomain(storageDomain)
  }
}

// Disable domain selector on spots page
function lockDomainSelector () {
  const routePath = route.path

  disableDomainSelect = !!(routePath && /spots/g.test(routePath as string));
}

function domainChange(item: string) {
  localStorage.setItem('domain', item)
  // axiosIns.defaults.params.tubeUrl = item
  domainStore.setDomain(item)
}

function hideErrorsHandler () {
  flagStore.setErrorMessages([])
}

async function reloadCache() {
  const r = await apiReloadCache(domainStore.globalDomain)
  if (r.data.dag_id) {
    flagStore.setSnackBarMsg('Cache reset queued. It may takes up to 1 min', 'success')
  } else {
    flagStore.setSnackBarMsg('Cache not reset!', 'warning')
  }
}

async function init () {
  const r = await getDomains()
  domains.value = r.data.map((obj: any) => obj.url)
  domainStore.setDomainsObj(r.data)

  // set default domain
  if (!storageDomain) {
    domain.value = domains.value[0]
    // axiosIns.defaults.params.tubeUrl = domain.value
    domainStore.setDomain(domain.value)
    localStorage.setItem('domain', domain.value)
  }

  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })

  const configResponse = await getConfig(selectedTube[0].id)
  const configData = configResponse.data

  configs.value = configData.filter((el: { id: number, group: string, value: string }) => {
    return el.group === 'report'
  })
}

watch(() => domainStore.globalDomain, () => {
  domain.value = domainStore.globalDomain
  // axiosIns.defaults.params.tubeUrl = domainStore.globalDomain
})

watch(route, () => {
  lockDomainSelector()
  hideErrorsHandler()
})

// call functions onMounted
lockDomainSelector()
getDomainFromStorage()
init()
</script>

<template>
  <VerticalNavLayout
    :nav-items="navItems"
  >
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="tools-navbar d-flex h-100">
        <VBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          icon
          variant="text"
          color="default"
          class="ms-n3"
          size="small"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            icon="tabler-menu-2"
            size="24"
          />
        </VBtn>

        <VSelect
          :items="domains"
          label="Domain"
          class="domain-select me-3"
          :disabled="disableDomainSelect"
          @update:modelValue="domainChange"
          v-model="domain"
        />
        <VBtn
            variant="text"
            color="default"
            size="small"
            @click="reloadCache">
          <VIcon icon="tabler-refresh" class="mr-1"/>
          Cache
        </VBtn>

        <VSpacer />
        <SettingsList />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component
          :is="Component"
          :key="route.path"
          v-if="domains.length"
        />
      </Transition>
    </RouterView>

    <VRow v-if="flagStore.errorMessages.length" class="ma-1">
      <div class="d-inline-block ma-1" v-for="msg in flagStore.errorMessages">
        <VAlert color="error" variant="tonal"><span class="text-sm">{{ msg }}</span></VAlert>
      </div>
    </VRow>
    <div v-if="flagStore.errorMessages.length">
      <VBtn variant="text" @click="hideErrorsHandler" size="small">Hide errors</VBtn>
    </div>
    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
<style scoped lang="scss">
.tools-navbar {
  align-items: start;
  position: relative;

  @media (min-width: 450px) {
    align-items: center;
  }
}

.domain-select {
  @media (max-width: 449px) {
    position: absolute;
    top: 52px;
    width: 100%;
  }
}
</style>
