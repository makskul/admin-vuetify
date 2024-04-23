<script lang="ts" setup>
import { useContentStore } from "@/stores/contentStore"

const currentTab = ref('Appetizers')
const items = ['Thumbs', 'Preview', 'Sprite', 'Video']

const props = defineProps<Props>()
const radioGroup = ref()
const contentStore = useContentStore()

interface Props {
  thumbs: string | string[] | null
  preview: string | string[] | null
  sprites: string[] | null
  urls: string[] | null
}
function getVideoQuality (url: string) {
  const qualities = ['_240', '_480', '_720', '_1080']
  const modifyUrl = url.split('/').pop()

  for (var i = 0; i < qualities.length; i++) {
    if (modifyUrl && modifyUrl.indexOf(qualities[i]) >= 0) {
      return qualities[i].replace('_', '')
    }
  }
}

function radioGroupHandler(value: number) {
  contentStore.setCurrentThumb(value)
}
</script>

<template>
  <VTabs v-model="currentTab">
    <VTab
        v-for="item in items"
        :key="item"
        :value="item"
    >
      {{ item }}
    </VTab>
  </VTabs>
  <VDivider />
  <VWindow
      v-model="currentTab"
      class="mt-6"
      :touch="false"
  >
    <VWindowItem key="Thumbs" value="Thumbs" :transition="false">
      <VRadioGroup class="thumbs-container" v-model="radioGroup" @update:modelValue="radioGroupHandler">
        <div class="thumb-item" v-for="thumb in props.thumbs" :class="{active: thumb.active}">
          <img :src="thumb.thumbUrl" width="300" :alt="thumb.thumbUrl"/>
          <VRadio
              :key="thumb.id"
              label="Set best"
              :value="thumb.id"
              v-if="!thumb.active || (radioGroup && thumb.id !== radioGroup)"
          />
          <VIcon icon="tabler-circle-check" v-if="thumb.active"/>
        </div>
      </VRadioGroup>
    </VWindowItem>
    <VWindowItem key="Preview" value="Preview" :transition="false">
      <div class="thumbs-container" v-if="props.preview.length">
        <div class="thumb-item">
          <video width="310" :src="props.preview" controls></video>
        </div>
      </div>
      <VRow v-else>
        <VCol>
          <h4>No data available.</h4>
        </VCol>
      </VRow>
    </VWindowItem>
    <VWindowItem key="Sprite" value="Sprite" :transition="false">
      <div class="thumbs-container" v-if="props.sprites.length">
        <div class="thumb-item" v-for="thumb in props.sprites">
          <VImg width="310" :src="thumb" />
        </div>
      </div>
      <VRow v-else>
        <VCol>
          <h4>No data available.</h4>
        </VCol>
      </VRow>
    </VWindowItem>
    <VWindowItem key="Video" value="Video" :transition="false">
      <div v-if="props.urls">
        <div class="thumbs-container" v-if="props.urls.mp4">
          <div class="thumb-item" v-for="(videoLink, key) in props.urls.mp4">
            <video :src="videoLink" controls width="310"></video>
            <h4>{{ getVideoQuality(videoLink) }}</h4>
          </div>
        </div>
      </div>
      <div v-else>
        <h4>No data available.</h4>
      </div>
    </VWindowItem>
  </VWindow>
</template>
