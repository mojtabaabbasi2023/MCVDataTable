import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import MCVDataTablePlugin from 'mcv-data-table'
import 'mcv-data-table/style.css'
import App from './App.vue'
import './style.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(vuetify)
  .use(MCVDataTablePlugin)
  .mount('#app')
