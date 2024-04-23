<script setup lang="ts">
import CardToggler from '@/pages/components/CardToggler.vue'
import { MockThumb } from "@/GalleriesPageComponents/ThumbMock"
import { secondsToTime } from "@/utils"

const props = defineProps(['galleries'])
</script>
<template>
  <VRow>
    <VCol
        cols="12"
        xl="2"
        lg="3"
        sm="4"
        v-for="gallery in props.galleries"
    >
      <VCard>
        <RouterLink :to="{ name: 'galleries-edit-id', params: { id: gallery.id } }">
          <VImg :src="gallery.thumbUrl" class="img-bg">
            <div class="table-small-font">#{{ gallery.id }}</div>
            <div class="table-small-font">{{ secondsToTime(gallery.duration) }}</div>
          </VImg>
        </RouterLink>
        <VCardText class="d-flex align-center flex-wrap pa-2 text-body-2">
          <span>{{ gallery.rating }}<i class="ml-2 mr-2">|</i><VIcon icon="tabler-message-dots" class="mr-2"/>{{ MockThumb.comments }}</span>
        </VCardText>
        <CardToggler>
          <VDivider />
          <VCardText class="text-body-2 pa-2">
            <p><b><VIcon icon="tabler-video" class="mr-2"/></b>
              <span>
                <RouterLink v-for="category in gallery.categories" :to="{ name: 'categories-edit-id', params: { id: category.urlTitle } }" class="mr-1">{{ category.title }}</RouterLink>
              </span>
            </p>
            <p><b><VIcon icon="tabler-tags" class="mr-2"/></b>
              <span>
                <RouterLink v-for="tag in gallery.tags" :to="{ name: 'tags-edit-id', params: { id: tag.urlTitle } }" class="mr-1">#{{ tag.title }}</RouterLink>
              </span>
            </p>
            <p><b><VIcon icon="tabler-user" class="mr-2"/></b>
              <span>
                <RouterLink v-for="pornstar in gallery.pornstars" :to="{ name: 'pornstars-edit-id', params: { id: pornstar.urlTitle } }" class="mr-1">{{ pornstar.title }}</RouterLink>
              </span>
            </p>
            <p><b><VIcon icon="tabler-device-tv" class="mr-2"/></b><span><a href="#">But</a>, <a href="#">Most</a>, <a href="#">Politicians</a></span></p>
            <p><b><VIcon icon="tabler-thumb-up" class="mr-2"/></b><span class="mr-2">{{ gallery.likes }}</span><b><VIcon icon="tabler-thumb-down"/></b>&nbsp;<span>{{ gallery.dislikes }}</span></p>
          </VCardText>
          <VDivider />
        </CardToggler>
        <VCardText class="pa-2">{{ gallery.title }}</VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
<style scoped lang="scss">
.field-width {
  inline-size: 15rem;
}
.pagination .v-btn--icon.v-btn--density-comfortable {
  min-width: 30px;
  width: auto;
}
.table-small-font {
  background: rgba(0,0,0,0.6);
  color: #ffffff;
  font-size: 11px;
  padding: 2px 3px;
  position: absolute;

  &:nth-child(1) {
    left: 4px;
    top: 3px;
  }

  &:nth-child(2) {
    bottom: 3px;
    right: 3px;
  }
}
.img-bg {
  background: #eeeeee;
  border-radius: 6px;
}
</style>
