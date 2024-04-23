import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import ability from '@/plugins/casl/ability'
import i18n from '@/plugins/i18n'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import { abilitiesPlugin } from '@casl/vue'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { PiniaSharedState } from 'pinia-shared-state'

loadFonts()

// Create vue app
const app = createApp(App)
const pinia = createPinia()

pinia.use(
PiniaSharedState({
  // Enables the plugin for all stores. Defaults to true.
  enable: true,
  // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
  initialize: false,
  // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
  type: 'localstorage',
}),
)

// Use plugins
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true,
})

// Mount vue app
app.mount('#app')
