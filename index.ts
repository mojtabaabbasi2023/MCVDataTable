import type { App } from 'vue'
import MCVDataTable from './components/MCVdataTable.vue'
import './scss/index.scss'

export { MCVDataTable }

export default {
  install(app: App) {
    app.component('MCVDataTable', MCVDataTable)
  },
}
