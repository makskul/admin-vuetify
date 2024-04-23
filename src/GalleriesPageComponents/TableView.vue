<script setup lang="ts">
import { secondsToTime, tableDate } from "@/utils"

const props = defineProps(['galleries'])
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center flex-wrap gap-4">
      <VSpacer />
    </VCardText>

    <VDivider />

    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead class="text-uppercase">
      <tr>
        <th scope="col">&nbsp;</th>
        <th scope="col" class="text-center">
          Thumb
        </th>

        <th scope="col" class="text-center">
          Title
        </th>

        <th scope="col" class="text-center">
          Likes / Dislikes
        </th>

        <th scope="col" class="text-center">
          Status
        </th>

        <th scope="col" class="text-center">
          Publishing Date
        </th>

        <th scope="col" class="text-center">
          Rating /Views
        </th>

        <th scope="col" class="text-end">
          ACTIONS
        </th>
      </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
      <tr
          v-for="gallery in props.galleries"
          :key="gallery.id"
          style="height: 3.75rem;"
      >
        <!-- 👉 Id -->
        <td class="text-center"><VCheckbox :value="gallery.id"/></td>
        <td class="text-center position-relative" style="width: 190px; min-width: 180px;">
          <RouterLink :to="{ name: 'galleries-edit-id', params: { id: gallery.id } }">
            <VImg :src="gallery.thumbUrl" height="100" class="img-bg mt-1">
              <div class="table-small-font">#{{ gallery.id }}</div>
              <div class="table-small-font">{{ secondsToTime(gallery.duration) }}</div>
            </VImg>
          </RouterLink>
        </td>

        <!-- 👉 Title -->
        <td class="text-center">
          <div style="margin: 0 auto;width: 150px; overflow: auto; white-space: break-spaces">{{ gallery.title }}</div>
        </td>

        <!-- 👉 Likes -->
        <td class="text-center">
          {{ gallery.likes }} / {{ gallery.dislikes }}
        </td>

        <!-- 👉 Status -->
        <td class="text-center">{{ gallery.status === 1 ? 'Active' : 'Inactive' }}</td>

        <!-- 👉 Date -->
        <td class="text-center">{{ tableDate(gallery.publishedAt) }}</td>

        <!-- 👉 Range -->
        <td class="text-center">{{ gallery.rating }} / {{ gallery.views }}</td>

        <!-- 👉 Actions -->
        <td class="text-end">
          <RouterLink :to="{ name: 'galleries-edit-id', params: { id: gallery.id } }" class="inherit-link">
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
          >
            <VIcon
                size="22"
                icon="tabler-trash"
            />
          </VBtn>
        </td>
      </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!props.galleries">
      <tr>
        <td
            colspan="8"
            class="text-center text-body-1"
        >
          <VProgressLinear
              v-show="!props.galleries"
              indeterminate
              color="primary"
          />
        </td>
      </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->
  </VCard>
</template>
