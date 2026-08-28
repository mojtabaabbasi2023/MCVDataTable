# mcv-data-table

A Vue 3 + Vuetify 3 data table component based on `v-data-table` with column visibility, column resizing, and drag-and-drop column reordering.

## Requirements

- Vue `^3.5.0`
- Vuetify `3.11.3`

## Installation

```bash
npm install mcv-data-table
```

## Usage

Register the plugin:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import MCVDataTablePlugin from 'mcv-data-table'
import 'mcv-data-table/style.css'

const app = createApp(App)

app.use(MCVDataTablePlugin)
app.mount('#app')
```

Use the component:

```vue
<template>
  <MCVDataTable :headers="headers" :items="items" />
</template>
```

Or import the component directly:

```ts
import { MCVDataTable } from 'mcv-data-table'
import 'mcv-data-table/style.css'
```

## Notes

This package expects Vuetify to be installed and configured in the consuming Vue application.

## License

MIT
