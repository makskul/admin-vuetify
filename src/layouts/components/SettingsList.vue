<script setup lang="ts">
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { AppContentLayoutNav } from '@layouts/enums'

const {
  theme,
  appContentLayoutNav,
  isVerticalNavCollapsed
} = useThemeConfig()

</script>
<template>
  <VBtn
      class="me-3"
      variant="text"
      color="default"
      size="small"
      icon
  >
    <VIcon
        size="24"
        icon="tabler-settings"
    />
      <!-- SECTION Menu -->
      <VMenu
          activator="parent"
          width="230"
          location="bottom end"
          offset="14px"
      >
        <VList>
          <VListItem>
            <VListItemTitle class="font-weight-semibold">
              Theme
            </VListItemTitle>
            <VListItemSubtitle class="d-flex opacity-100">
              <VLabel
                  for="pricing-plan-toggle"
                  class="me-3"
              >
                Light
              </VLabel>

              <div>
                <VSwitch
                    id="pricing-plan-toggle"
                    v-model="theme"
                    label="Dark"
                    true-value="dark"
                    false-value="light"
                />
              </div>
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <VListItem class="mobile-hide">
            <VListItemTitle>Menu Type</VListItemTitle>
            <VListItemSubtitle class="d-flex opacity-100">
              <VRadioGroup
                  v-model="appContentLayoutNav"
                  inline
              >
                <VRadio
                    v-for="[key, val] in Object.entries(AppContentLayoutNav)"
                    :key="key"
                    :label="key"
                    :value="val"
                />
              </VRadioGroup>
            </VListItemSubtitle>
          </VListItem>

          <VListItem>
            <div
                v-if="appContentLayoutNav === AppContentLayoutNav.Vertical"
                class="d-flex align-center justify-space-between"
            >
              <VLabel
                  for="customizer-menu-collapsed"
                  class="text-high-emphasis"
              >
                Collapse Menu
              </VLabel>
              <div>
                <VSwitch
                    id="customizer-menu-collapsed"
                    v-model="isVerticalNavCollapsed"
                    class="ms-2"
                />
              </div>
            </div>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
  </VBtn>
</template>

<style lang="scss">
.mobile-hide {
  @media (max-width: 1180px) {
    display: none;
  }
}
</style>
