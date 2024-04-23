<script setup lang="ts">
import WhiteRow from "@/pages/components/WhiteRow.vue"
import { useParserState, useCompleteParsingRequest } from "@/composables/useParserState"
import { Add } from "@/Api/parsers"
import DynamicTextfields from "@/pages/components/DynamicTextfields.vue"
const { state } = useParserState()

const submitHandler = async () => {
  const { request } = useCompleteParsingRequest(state)
  await Add(request.value)
}

</script>
<template>
  <div>
    <VRow>
      <VCol cols="12">
        <h2>Add Parser</h2>
      </VCol>
    </VRow>
    <WhiteRow>
      <VCol cols="12">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField label="Channel ID" class="mb-3" v-model="state.channelId"/>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12">
        <h3 class="mb-1">Auth config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
                :items="['FORM_AUTH']"
                v-model="state.authType"
                label="Type"
                class="mb-3"
            />
            <VTextField label="Login" class="mb-3" v-model="state.authLogin"/>
            <VTextField label="Password" class="mb-3" v-model="state.authPassword"/>
            <VTextField label="Url" class="mb-3" v-model="state.authLoginUrl"/>
            <VTextField label="Test Page" class="mb-3" v-model="state.authTestPage"/>
            <VTextField label="Check Text" class="mb-3" v-model="state.authCheckText"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Xpath Login" class="mb-3" v-model="state.authXpathLogin"/>
            <VTextField label="Xpath Password" class="mb-3" v-model="state.authXpathPassword"/>
            <VTextField label="Xpath Submit" class="mb-3" v-model="state.authXpathSubmit"/>
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow>
      <VCol cols="12">
        <h3 class="mb-1">Lister config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
                :items="['NEXT_BUTTON']"
                v-model="state.listerType"
                label="Type"
                class="mb-3"
            />
            <VTextField label="Start page url" class="mb-3" v-model="state.listerStartPageUrl"/>
            <VTextField label="Items xpath" class="mb-3" v-model="state.listerItemXpath"/>
            <VTextField label="Next button xpath" class="mb-3" v-model="state.listerNextBtnPath"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Url Regex" class="mb-3" v-model="state.listerItemUrlRegex"/>
            <div class="d-flex">
              <VTextField label="Base Page url" class="mb-3" v-model="state.listerBasePageUrl"/>
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
            <DynamicTextfields v-model="state.listerPopupsXpaths" :inputs="state.listerPopupsXpaths" />
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>
    <WhiteRow>
      <VCol cols="12">
        <h3 class="mb-1">Page config</h3>
        <VRow>
          <VCol cols="12" md="6">
            <VSelect
              :items="['BASE_PARSER']"
              v-model="state.pageType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Title Xpath" class="mb-3" v-model="state.pageTitleXpath"/>
            <VTextField label="Description Xpath" class="mb-3" v-model="state.pageDescriptionXpath"/>
            <VTextField label="Tags Xpath" class="mb-3" v-model="state.pageTagsXpath"/>
            <VTextField label="Categories Xpath" class="mb-3" v-model="state.pageCategoriesXpath"/>
            <VTextField label="Models Xpath" class="mb-3" v-model="state.pageModelsXpath"/>
          </VCol>
          <VCol cols="12" md="6">
            <VTextField label="Studio Xpath" class="mb-3" v-model="state.pageStudioXpath"/>
            <VTextField label="Date Publish Xpath" class="mb-3" v-model="state.pageDatePublishXpath"/>
            <div class="d-flex">
              <VTextField label="Date Publish Regex" class="mb-3" v-model="state.pageDatePublishRegex"/>
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
              <VTextField label="Date Format" class="mb-3" v-model="state.pageDateFormat"/>
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
          <VCol cols="12" md="6">
            <h3 class="mb-1">Photo config</h3>
            <VSelect
              :items="['ATTRIBUTE_PARSER']"
              v-model="state.photoType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Xpath" class="mb-3" v-model="state.photoXpath"/>
            <VTextField label="Url attribute" class="mb-3" v-model="state.photoUrlAttr"/>
          </VCol>
          <VCol cols="12" md="6">
            <h3 class="mb-1">Video config</h3>
            <VSelect
              :items="['MP4_VIDEO', 'HLS_VIDEO']"
              v-model="state.videoType"
              label="Type"
              class="mb-3"
            />
            <VTextField label="Download Link Xpath" class="mb-3" v-model="state.videoDownloadLinkXpath"/>
            <VTextField label="Url attribute" class="mb-3" v-model="state.videoUrlAttr"/>
            <div class="d-flex">
              <VTextField label="Base site url" class="mb-3" v-model="state.videoBaseSiteStr"/>
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
    <WhiteRow>
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
