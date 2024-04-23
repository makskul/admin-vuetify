<script setup lang="ts">

// TODO: non active index icon = Tabler-ban, color = warning
</script>
<template>
  <VCard>
    <VCardText></VCardText>
    <VTable>
      <thead class="text-uppercase">
        <tr>
          <th scope="col" class="text-left cell-small">ID</th>
          <th scope="col" class="text-center cell-small">Feed ID</th>
          <th scope="col" class="text-center">Sponsor</th>
          <th scope="col" class="text-center">Status</th>
          <th scope="col" class="text-center">Video</th>
          <th scope="col" class="text-center">Videos views</th>
          <th scope="col" class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10">
          <td class="cell-small"><VCheckbox  :value="i"/></td>
          <td class="text-center cell-small">{{ i }}</td>
          <td class="text-center">Amateur</td>
          <td class="text-center">Active</td>
          <td class="text-center">164</td>
          <td class="text-center">16.1K</td>
          <td class="text-end">
            <VBtn variant="text" icon="tabler-edit" size="small"/>&nbsp;
            <VBtn variant="text" icon="tabler-trash" size="small" color="error"/>&nbsp;
            <br/>
            <VBtn variant="text" icon="tabler-x" size="small" color="warning"/>&nbsp;
            <VBtn variant="text" icon="tabler-check" size="small" color="success"/>&nbsp;
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
