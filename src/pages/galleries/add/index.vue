<script setup lang="ts">
import pages3 from '@images/pages/3.png'
import WhiteRow from "@/pages/components/WhiteRow.vue"

const langs = ['EN', 'RU', 'ES', 'PT', 'IT', 'FR', 'DE']
const checkboxOne = ref(true)
</script>

<template>
  <div>
    <WhiteRow>
      <VCol cols="12" md="6">
        <VTabs>
          <VTab
              v-for="i in langs"
              :key="i"
          >
            {{ i }}
          </VTab>
        </VTabs>
        <VDivider class="mb-3"/>
        <VTextField label="Title" class="mb-3"/>
        <VTextField label="Description" class="mb-3"/>
        <VTextField label="Sponsor" class="mb-3"/>
        <VRow>
          <VCol cols="12" md="9" sm="9">
            <VTextField label="Publish Date" class=""/>
          </VCol>
          <VCol cols="12" md="3" sm="3" class="d-flex align-center">
            <VBtn size="small">NOW</VBtn>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="6">
        <VTextField label="User" class="mb-3"/>
        <VTextField label="URL Permalink" class="mb-3"/>
        <VTextField label="Seo Title" class="mb-3"/>
        <VTextarea
            auto-grow
            label="Meta Description"
            rows="4"
            row-height="30"
        />
      </VCol>
      <VCol>
        <div class="demo-space-x">
          <VCheckbox
              v-model="checkboxOne"
              label="Active"
          />
        </div>
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12">
        <VCardTitle class="mb-2">Categorization</VCardTitle>
        <VRow>
          <VCol>
            <VTextField label="Tags"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Add</VBtn>&nbsp;&nbsp;<VBtn size="small">All</VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField label="Categories"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Add</VBtn>&nbsp;&nbsp;<VBtn size="small">All</VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField label="Pornstars"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Add</VBtn>&nbsp;&nbsp;<VBtn size="small">All</VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField label="Channel"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Add</VBtn>&nbsp;&nbsp;<VBtn size="small">All</VBtn>
          </VCol>
        </VRow>

        <VRow>
          <VCol>
            <VTextField label="Sub Channel"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Add</VBtn>&nbsp;&nbsp;<VBtn size="small">All</VBtn>
          </VCol>
        </VRow>
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12" md="12">
        <VCardTitle class="mb-2">Content</VCardTitle>
        <VRow>
          <VCol cols="12" md="8">
            <VTabs>
              <VTab>File Upload</VTab>
              <VTab>Hot Link</VTab>
            </VTabs>
            <VDivider class="mb-3"/>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="4">
        <VRow>
          <VCol cols="12" md="7" sm="6">
            <VFileInput label="Source Video File"/>
          </VCol>
          <VCol cols="12" md="5" sm="6" class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="7" sm="6">
            <VFileInput label="Preview"/>
          </VCol>
          <VCol cols="12" md="5" sm="6" class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="7" sm="6">
            <VFileInput label="Screenshot"/>
          </VCol>
          <VCol cols="12" md="5" sm="6" class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12" md="4">
        <VRow>
          <VCol>
            <VFileInput label="MP4 1080p"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VFileInput label="MP4 360p"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VFileInput label="MP4 480p"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VFileInput label="MP4 4k"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol>
            <VFileInput label="MP4 720p"/>
          </VCol>
          <VCol class="d-flex align-center">
            <VBtn size="small">Upload</VBtn>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="4">
        <VCardText class="pt-0 pl-1 pb-1 pr-1">Thumbnail</VCardText>
        <VImg :src="pages3" class="rounded-sm"/>
      </VCol>
    </WhiteRow>

    <WhiteRow>
      <VCol cols="12">
        <div class="demo-space-x">
          <VBtn color="success">
            Save
          </VBtn>
          <VBtn color="info">
            Save and Add new
          </VBtn>
        </div>
      </VCol>
    </WhiteRow>
  </div>
</template>