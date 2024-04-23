<script setup lang="ts">
  const isCardDetailsVisible = ref(false)
</script>

<template>
  <VCardActions>
    <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
      Details
    </VBtn>

    <VSpacer />

    <VBtn
        icon
        size="small"
        @click="isCardDetailsVisible = !isCardDetailsVisible"
    >
      <VIcon :icon="isCardDetailsVisible ? 'tabler-chevron-up' : 'tabler-chevron-down'" />
    </VBtn>
  </VCardActions>

  <VExpandTransition>
    <div v-show="isCardDetailsVisible">
      <slot></slot>
    </div>
  </VExpandTransition>
</template>
