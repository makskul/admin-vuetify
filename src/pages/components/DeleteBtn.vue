<script lang="ts" setup>
const props = defineProps(['action', 'id'])
const isDialogVisible = ref(false)

function dialogActionHandler() {
  isDialogVisible.value = false
  props.action(props.id)
}
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    width="500"
  >
    <!-- Activator -->
    <template #activator="{ props }">
      <VBtn
        icon
        size="x-small"
        variant="text"
        color="default"
        v-bind="props"
      >
        <VIcon
          size="22"
          icon="tabler-trash"
        />
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard title="Notification">
      <VCardText>
        Are you sure you want to delete ?
      </VCardText>

      <VCardText class="d-flex justify-end">
        <VBtn @click="dialogActionHandler">
          Delete
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>
