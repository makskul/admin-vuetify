<template>
  <div>
    <h1>Content removal</h1>
    <v-row>
      <v-col cols="6">
        <VTextarea
          v-model="galleryLinks"
          label="Link to galleries to remove"
          auto-grow
        />
        <v-row>
          <v-col cols="9">
            <VSwitch
              label="Delete files"
              v-model="deleteFiles"
            />
          </v-col>
          <v-col cols="3">
            <VBtn
              block
              :color="theme.current.value.colors.error"
              class="mt-2"
              :loading="resolveLoading"
              @click="resolveDmcaReports"
            >
              Delete
            </VBtn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <v-table>
          <thead>
            <tr>
              <th>
                Niche
              </th>
              <th>
                Domain
              </th>
              <th>
                Status
              </th>
              <th>
                Link
              </th>
              <th>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(dmca, i) in dmcaReports"
              :key="dmca.id"
              :style="{
                backgroundColor: dmca.status === 'accepted'
                  ? theme.current.value.colors.success + '66'
                  : ''
              }"
            >
              <td>
                {{ dmca.nicheTitle }}
              </td>
              <td>
                {{ dmca.tubeUrl }}
              </td>
              <td>
                {{ dmca.status }}
              </td>
              <td>
                <a
                  :href="dmca.reportedGalleryUrl"
                  :style="{
                    color: 'inherit',
                    textDecoration: 'underline'
                  }"
                >
                  {{ dmca.reportedGalleryUrl }}
                </a>
              </td>
              <td>
                {{ dmca.email }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify"
import * as dmcaApi from '@/Api/dmca'

const theme = useTheme()

const dmcaReports = ref([])

onMounted(getReports)

const galleryLinks = ref('')
const deleteFiles = ref(false)

const resolveLoading = ref(false)

async function resolveDmcaReports() {
  resolveLoading.value = true
  try {
    await dmcaApi.resolveDmcaReports({
      galleryLinksToResolve: galleryLinks.value,
      deleteFiles: deleteFiles.value,
    })
    galleryLinks.value = ''
  } finally {
    resolveLoading.value = false
    await getReports()
  }
}

async function getReports() {
  dmcaReports.value = await dmcaApi.getDmcaReports().then(r => r?.data ?? [])
}
</script>

<route>
{
  name: "content-removal"
}
</route>
