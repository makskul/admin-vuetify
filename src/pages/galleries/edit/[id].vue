<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import PreviewTabs from "@/GalleriesPageComponents/PreviewTabs.vue"
import CategoryThumbs from "@/GalleriesPageComponents/CategoryThumbs.vue"
import { getGalleryData, updateGalleryData } from "@/Api/content"
import { useDomainStore } from "@/stores/headerStores"
import { useContentStore } from "@/stores/contentStore"
import { timestampToDate, getIdTitleFromArrayOfObj, getChangedDescriptionsObj, getIdFromArrayOfObj } from "@/utils"
import HintSelector from "@/pages/components/HintSelector.vue"

 // Stores
const domainStore = useDomainStore()
const contentStore = useContentStore()

// Gallery params
const galleryId = useRoute().params.id
const responseData = ref<any>([])
const descriptions = ref([])
const langSelected = ref(0)
const tubeId = ref<number>(0)
const selectedThumb = ref()
const selectedStatus = ref()
const datePicker = ref('')
const selectedTags = ref<any>([])
const selectedCategories = ref<any>([])
const selectedPornstars = ref<any>([])
let langs = []

function setCurrentDate() {
  datePicker.value = timestampToDate(new Date().getTime())
}

async function init() {
  const selectedTube = domainStore.domains.filter((obj: any) => {
    return obj.url === domainStore.globalDomain
  })
  tubeId.value = selectedTube[0].id as number

  const { data } = await getGalleryData(galleryId)
  if (data) {
    responseData.value = data

    let langIndex = responseData.value.descriptions.findIndex((item: any) => item.language.prefix === 'en')
    selectedThumb.value = responseData.value.thumbs.filter((x: any) => x.active === true)[0]?.id
    langs = responseData.value.descriptions.map(({ language }: any) => language.prefix)
    descriptions.value = responseData.value.descriptions[langIndex]
    selectedStatus.value = responseData.value.status === 1 ? 'Active' : 'Inactive'
    datePicker.value = timestampToDate(Date.parse(responseData.value.publishedAt))
  }

  selectedTags.value = getIdTitleFromArrayOfObj(responseData.value.tags)
  selectedCategories.value = getIdTitleFromArrayOfObj(responseData.value.categories)
  selectedPornstars.value = getIdTitleFromArrayOfObj(responseData.value.pornstars)
}

watch(() => domainStore.globalDomain, init)
watch([
  () => contentStore.thumbId
], () => selectedThumb.value = contentStore.thumbId)
watch(() => langSelected.value, (newValue, oldValue) => {
  if (oldValue) {
    responseData.value.descriptions[oldValue] = descriptions.value
  }
  descriptions.value = responseData.value.descriptions[langSelected.value]
})

async function saveChanges() {
  const tempDate = new Date(datePicker.value)
  responseData.value.descriptions[langSelected.value] = descriptions.value

  const sendObj = {
    tubeId: tubeId.value,
    urlTitle: responseData.value.urlTitle,
    status: responseData.value.status,
    thumbs: [ { regionId: 1, thumbId: selectedThumb.value } ],
    publishedAt: tempDate.toISOString(),
    descriptions: getChangedDescriptionsObj(responseData.value.descriptions),
    tags: getIdFromArrayOfObj(selectedTags.value) || [],
    categories: getIdFromArrayOfObj(selectedCategories.value) || [],
    pornstars: getIdFromArrayOfObj(selectedPornstars.value) || [],
  }

  await updateGalleryData(parseInt(galleryId as string), sendObj)
  init()
}

const checkBoxStatusHandler = (value: string) => { responseData.value.status = value === 'Active' ? 1 : 0 }
init()
</script>

<template>
  <div>
    <WhiteRow>
      <VCol>
        <PreviewTabs
          :thumbs="responseData.thumbs || []"
          :sprites="responseData.sprites || []"
          :preview="responseData.previewUrl || []"
          :urls="responseData.urls || []"
        />
      </VCol>
    </WhiteRow>

    <CategoryThumbs
      v-if="responseData.thumbs"
      class="mb-3"
      :id="responseData.id"
      :categories="responseData.categories"
      :thumbs="responseData.thumbs || []"
    />

    <WhiteRow v-if="responseData">
      <VCol cols="12" md="6">
        <VTabs v-if="langs.length" v-model="langSelected">
          <VTab v-for="lang in langs" :key="lang">
            {{ lang }}
          </VTab>
        </VTabs>
        <VDivider v-if="langs.length" class="mb-3"/>
        <div class="mb-4">
          <VChip class="mb-1 mr-1">
            Feed ID: {{ responseData.feedId }}
          </VChip>
          <VChip class="mb-1 mr-1" v-if="responseData.channel">
            Channel: {{ responseData.channel.title }}
          </VChip>
          <VChip class="mb-1 mr-1" v-if="responseData.studio">
            Studio: {{ responseData.studio.title }}
          </VChip>
        </div>

        <VTextField label="Title" class="mb-3" v-model="descriptions.title"/>
        <VTextField label="Description" class="mb-3" v-model="descriptions.description"/>
        <VRow>
          <VCol cols="12" class="mb-3">
            <div class="d-flex align-center">
              <AppDateTimePicker
                v-model="datePicker"
                label="Publish Date"
                :config="{
                  enableTime: true,
                  dateFormat: 'Y-m-d H:i'
                }"
              />
              <VBtn class="ml-2" size="small" @click="setCurrentDate">NOW</VBtn>
            </div>
          </VCol>
        </VRow>
        <VSelect
          v-model="selectedStatus"
          label="Published Status"
          :items="['Active', 'Inactive']"
          @update:modelValue=checkBoxStatusHandler
        />
      </VCol>
      <VCol cols="12" md="6">
        <VTextField label="URL Permalink" class="mb-3" v-model="responseData.urlTitle"/>
        <VTextField label="Seo Title" class="mb-3" v-model="descriptions.metaTitle"/>
        <VTextarea auto-grow label="Seo Description" rows="4" row-height="30" v-model="descriptions.metaDescription"/>
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12" sm="12" md="6" class="pb-0">
        <div class="mb-3">
          <h3>Tags</h3>
          <HintSelector v-if="responseData.tags" v-model="selectedTags" :preSelect="responseData.tags" label="Select tag" itemsGetter="getTags" chip="1"/>
          <HintSelector v-else v-model="selectedTags" label="Select tag" itemsGetter="getTags" chip="1"/>
        </div>
        <div class="mb-3">
          <h3>Pornstars</h3>
          <HintSelector v-if="responseData.pornstars" v-model="selectedPornstars" :preSelect="responseData.pornstars" label="Select pornstar" itemsGetter="getPornstars" chip="1"/>
          <HintSelector v-else v-model="selectedPornstars" label="Select pornstar" itemsGetter="getPornstars" chip="1"/>
        </div>
        <div>
          <h4 class="mt-3 mb-2">Origins</h4>
          <VChip class="mb-1 mr-1">
            <b>Title:</b>&nbsp;{{ responseData.originTitle }}
          </VChip>
          <VChip v-for="tag in responseData.originTags" class="mb-1 mr-1">
            {{ tag }}
          </VChip>
          <div class="chip-box mb-1 mr-1">
            <b>Description:</b> {{ responseData.originDescription }}
          </div>
        </div>
      </VCol>

      <VCol cols="12" sm="12" md="6" class="pb-0">
        <div class="mb-3">
          <h3>Categories</h3>
          <VChip v-for="category in responseData.categories" class="mb-1 mr-1">
            {{ category.title }}
          </VChip>
        </div>
        <div v-if="responseData.generatedTitles">
          <h3>Generated Titles</h3>
          <VChip v-for="title in responseData.generatedTitles" class="mb-1 mr-1" :class="{ 'text-primary': title.used }">
            {{ title.title }}
          </VChip>
        </div>
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success" @click="saveChanges">
            Save
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>
