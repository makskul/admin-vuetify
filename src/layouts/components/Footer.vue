<script setup lang="ts">
  import {useFlagsStore} from "@/stores/headerStores";

  const showMsg = ref(false)
  const msgColor = ref()
  const msgText = ref()
  const flagStore = useFlagsStore()

  watch(() => flagStore.snackBarState, () => {
    showMsg.value = flagStore.snackBarState.show
    msgColor.value = flagStore.snackBarState.color
    msgText.value = flagStore.snackBarState.msg
  })
</script>
<template>
  <VSnackbar
    v-model="showMsg"
    location="bottom center"
    variant="flat"
    :color="msgColor"
  >
    {{ msgText }}
  </VSnackbar>
  <div class="h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center"></span>
  </div>
</template>
