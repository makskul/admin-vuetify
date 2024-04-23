<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { useCompleteParsingRequest, useUpdateParserState } from "@/composables/useParserState"
import { Update, GetOne } from "@/Api/parsers"
import DynamicTextfields from "@/pages/components/DynamicTextfields.vue"

const self = ref()
const channelId = useRoute().params.id
const router = useRouter()

const submitHandler = async () => {
  const { request } = useCompleteParsingRequest(self)

  await Update(channelId, request.value)
}

const init = async () => {
  const { data } = await GetOne(channelId)

  if (data) {
    const { state } = useUpdateParserState(data)
    self.value = { ...state.value }
  } else {
    router.push('/parsers/add')
  }
}

init()
</script>
<template>
  <div>
    <VRow>
      <VCol cols="12">
        <h2>Parser config for <span v-if="self">{{ self.channelTitle }}</span></h2>
      </VCol>
    </VRow>
    <WhiteRow v-if="self">
      <VCol v-if="self" cols="12">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField label="Channel ID" class="mb-3" v-model="self.channelId"/>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <h3 class="mb-1">Auth config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              :items="['FORM_AUTH']"
              v-model="self.authType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Login" class="mb-3" v-model="self.authLogin"/>
            <VTextField label="Password" class="mb-3" v-model="self.authPassword"/>
            <VTextField label="Url" class="mb-3" v-model="self.authLoginUrl"/>
            <VTextField label="Test Page" class="mb-3" v-model="self.authTestPage"/>
            <VTextField label="Check Text" class="mb-3" v-model="self.authCheckText"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Xpath Login" class="mb-3" v-model="self.authXpathLogin"/>
            <VTextField label="Xpath Password" class="mb-3" v-model="self.authXpathPassword"/>
            <VTextField label="Xpath Submit" class="mb-3" v-model="self.authXpathSubmit"/>
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow>
      <VCol v-if="self" cols="12">
        <h3 class="mb-1">Lister config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              :items="['NEXT_BUTTON']"
              v-model="self.listerType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Start page url" class="mb-3" v-model="self.listerStartPageUrl"/>
            <VTextField label="Items xpath" class="mb-3" v-model="self.listerItemXpath"/>
            <VTextField label="Next button xpath" class="mb-3" v-model="self.listerNextBtnPath"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Url Regex" class="mb-3" v-model="self.listerItemUrlRegex"/>
            <div class="d-flex">
              <VTextField label="Base Page url" class="mb-3" v-model="self.listerBasePageUrl"/>
              <VBtn
                size="x-small"
                color="default"
                variant="text"
              >
                <VIcon
                  id="info-tooltip-1"
                  size="30"
                  icon="mdi-information-variant-box-outline"
                  class="mt-1 ml-2"
                />
                <VTooltip activator="parent" location="start" triggers="hover">
                  Url of gallery <b>page</b>
                </VTooltip>
              </VBtn>
            </div>
            <h4 class="mb-1">Popups Xpath</h4>
            <DynamicTextfields v-model="self.listerPopupsXpaths" :inputs="self.listerPopupsXpaths" />
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow>
      <VCol v-if="self" cols="12">
        <h3 class="mb-1">Page config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              :items="['BASE_PARSER']"
              v-model="self.pageType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Title Xpath" class="mb-3" v-model="self.pageTitleXpath"/>
            <VTextField label="Description Xpath" class="mb-3" v-model="self.pageDescriptionXpath"/>
            <VTextField label="Tags Xpath" class="mb-3" v-model="self.pageTagsXpath"/>
            <VTextField label="Categories Xpath" class="mb-3" v-model="self.pageCategoriesXpath"/>
            <VTextField label="Models Xpath" class="mb-3" v-model="self.pageModelsXpath"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Studio Xpath" class="mb-3" v-model="self.pageStudioXpath"/>
            <VTextField label="Date Publish Xpath" class="mb-3" v-model="self.pageDatePublishXpath"/>
            <div class="d-flex">
              <VTextField label="Date Publish Regex" class="mb-3" v-model="self.pageDatePublishRegex"/>
              <VBtn
                size="x-small"
                color="default"
                variant="text"
              >
                <VIcon
                  id="info-tooltip-1"
                  size="30"
                  icon="mdi-information-variant-box-outline"
                  class="mt-1 ml-2"
                />
                <VTooltip activator="parent" location="start" triggers="hover">
                  Regex which suitable for the <b>Date Publish</b><br/>
                  Ex: for date as <b>12.12.2023</b><br/>
                  regex is <b>\d{2}\.\d{2}\.\d{4}</b>
                </VTooltip>
              </VBtn>
            </div>
            <div class="d-flex">
              <VTextField label="Date Format" class="mb-3" v-model="self.pageDateFormat"/>
              <VBtn
                size="x-small"
                color="default"
                variant="text"
              >
                <VIcon
                  id="info-tooltip-1"
                  size="30"
                  icon="mdi-information-variant-box-outline"
                  class="mt-1 ml-2"
                />
                <VTooltip activator="parent" location="start" triggers="hover">
                  Date format by Python datetime rules<br/>
                  %Y: 4-digit year<br/>
                  %y: 2-digit year<br/>
                  %m: 2-digit month (01-12)<br/>
                  %d: 2-digit day of the month (01-31)<br/>
                  %b: short month name (Jan, Dec)<br/>
                  %B: Full month name (June, December)
                </VTooltip>
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow>
      <VCol cols="12">
        <VRow>
          <VCol v-if="self" cols="12" md="6">
            <h3 class="mb-1">Photo config</h3>
            <VSelect
              :items="['ATTRIBUTE_PARSER']"
              v-model="self.photoType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Xpath" class="mb-3" v-model="self.photoXpath"/>
            <VTextField label="Url attribute" class="mb-3" v-model="self.photoUrlAttr"/>
          </VCol>
          <VCol v-if="self" cols="12" md="6">
            <h3 class="mb-1">Video config</h3>
            <VSelect
              :items="['MP4_VIDEO', 'HLS_VIDEO']"
              v-model="self.videoType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Download Link Xpath" class="mb-3" v-model="self.videoDownloadLinkXpath"/>
            <VTextField label="Url attribute" class="mb-3" v-model="self.videoUrlAttr"/>
            <div class="d-flex">
              <VTextField label="Base site url" class="mb-3" v-model="self.videoBaseSiteStr"/>
              <VBtn
                size="x-small"
                color="default"
                variant="text"
              >
                <VIcon
                  id="info-tooltip-1"
                  size="30"
                  icon="mdi-information-variant-box-outline"
                  class="mt-1 ml-2"
                />
                <VTooltip activator="parent" location="start" triggers="hover">
                  <b>Base site url</b>, for concat with relative Download link<br/>
                  <b>Example</b><br/>
                  <b>base url</b> = 'https://domain.com/'<br/>
                  downloadLink = '/members/video/12_304.mp4'<br/>
                </VTooltip>
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow v-if="self">
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success" @click="submitHandler">
            Save
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>
