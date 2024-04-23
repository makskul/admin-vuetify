<script lang="ts" setup>
import { GalleryThumbRequestType, IdTitle } from "@/types/content"
import { getCategoryThumbById, setGalleryCategoryThumb } from "@/Api/content"
import { useFlagsStore } from "@/stores/headerStores"

const panel = ref(false)
const props = defineProps<Props>()
const radioGroup = ref()
const categories = ref<number[]>([])
const flagStore = useFlagsStore()
const categoriesGarbage = ref<any[]>([])
const sortedThumbs = ref<any[]>([])

interface Props {
  id: number
  categories: string | IdTitle | null
  thumbs: any | any[] | null
}

function sendCategoryThumb () {
  if (!radioGroup.value) {
    flagStore.setSnackBarMsg('Best thumb not selected', 'warning')
    return
  }

  if (!categories.value.length) {
    flagStore.setSnackBarMsg('Categories not selected', 'warning')
    return
  }

  async function sendRequest (categoryId: number, thumbId: number) {
    const sendObj: GalleryThumbRequestType = {
      regionId: 1,
      categoryId: categoryId,
      thumbId: thumbId,
      galleryId: props.id
    }

    await setGalleryCategoryThumb(sendObj)
    radioGroup.value = null
    categories.value = []
    categoriesGarbage.value = []
  }

  categories.value.forEach((categoryId: number) => {
    sendRequest(categoryId, radioGroup.value)
  })
}

async function clickHandler(id: number, title: string) {
  const isSelected = categories.value.includes(id)

  if (isSelected) {
    const index = categories.value.indexOf(id)
    categories.value.splice(index, 1)

    categoriesGarbage.value.map((str, index) => {
      let categoriesList = ''

      if (str.includes(`${title},`)) {
        categoriesList = str.replace(`${title},`, '').trim()
        categoriesGarbage.value[index] = categoriesList.endsWith(',') ? categoriesList.slice(0, -1) : categoriesList

      } else if(str.includes(`${title}`)) {
        categoriesList = str.replace(`${title}`, '').trim()
        categoriesGarbage.value[index] = categoriesList.endsWith(',') ? categoriesList.slice(0, -1) : categoriesList
      }
    })

    return
  }

  categories.value.push(id)

  const getParams = {
    regionId: 1,
    categoryId: id,
    galleryId: props.id
  }

  const { data } = await getCategoryThumbById(getParams)
  const bestThumbId = data.filter((obj: any) => {
    return obj.active === true
  }).shift().id

  if (categoriesGarbage.value[bestThumbId]) {
    categoriesGarbage.value[bestThumbId] = `${categoriesGarbage.value[bestThumbId]}, ${title}`
    return
  }

  categoriesGarbage.value[bestThumbId] = title
}

const displayCategoryForThumb = (thumbId: number) => categoriesGarbage.value[thumbId]
const isSelectedCategory = (id: number) => categories.value.includes(id)

const init = () => {
  sortedThumbs.value = props?.thumbs.sort(function(a: { id: number; }, b: { id: number; }){
    return a.id - b.id
  })
}
init()
</script>

<template>
  <VExpansionPanels v-model="panel">
    <!-- SECTION Delivery Address -->
    <VExpansionPanel>
      <VExpansionPanelTitle>Category Thumb</VExpansionPanelTitle>
      <VExpansionPanelText>
        <VRow class="pt-4">
          <VCol cols="12" sm="9" v-if="props.categories">
            <VBtn
              class="checked-button"
              size="x-small"
              variant="tonal"
              v-for="item in props.categories"
              @click="clickHandler(item.id, item.title)"
              :class="{'selected': isSelectedCategory(item.id)}"
            >
              {{item.title}}
            </VBtn>
          </VCol>
          <VCol cols="12" sm="3" class="text-end">
            <VBtn
              color="success"
              @click="sendCategoryThumb"
              size="small"
            >
              <VIcon
                size="22"
                icon="mdi-content-save-outline"
              />&nbsp; Save
            </VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <VRadioGroup class="thumbs-container all" v-model="radioGroup">
              <div class="thumb-item" v-for="thumb in sortedThumbs">
                <span class="category-label">
                  {{ displayCategoryForThumb(thumb.id) }}
                </span>
                <div>
                  <img :src="thumb.thumbUrl" :alt="thumb.thumbUrl"/>
                </div>
                <VRadio
                  :key="thumb.id"
                  label="Set best"
                  :value="thumb.id"
                />
              </div>
            </VRadioGroup>
          </VCol>
        </VRow>
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
