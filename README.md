# mcv-data-table

A Vue 3 + Vuetify 3 data table component based on `v-data-table` with column visibility, column resizing, and drag-and-drop column reordering.

## Demo

https://mojtabaabbasi2023.github.io/MCVDataTable/

### Run the demo against local source

The demo imports the package from the repository's `index.ts` and SCSS source, so changes to the component and styles are picked up by Vite without rebuilding `dist`.

```bash
cd demo
npm install
npm run dev
```

Open the local URL printed by Vite. The production demo build still uses the `/MCVDataTable/` base path for GitHub Pages.

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

## Header Props

Headers use the same props as Vuetify `v-data-table` headers. This package adds the following optional header props:

```ts
type MCVDataTableHeader = {
  group?: string
  hide?: boolean
  resizable?: boolean
}
```

### `resizable`

Set `resizable` to `false` to disable resizing for a specific column.

```ts
{ title: 'Amount', key: 'amount', resizable: false }
```

### `group`

Use `group` to group columns in the column visibility menu. Columns with the same group value are displayed together.

```ts
{ title: 'Status', key: 'status', group: 'workflow' }
{ title: 'Owner', key: 'owner', group: 'workflow' }
```

### `hide`

Set `hide` to `true` to hide a column by default when the table is first rendered.

```ts
{ title: 'Amount', key: 'amount', hide: true }
```

## Component Props

### `menuWidth`

Set the width of the column visibility menu. Accepts a number (pixels) or a CSS string (e.g. `'100%'`). Defaults to `320`.

```vue
<MCVDataTable :headers="headers" :items="items" menu-width="420" />
```

## Notes

This package expects Vuetify to be installed and configured in the consuming Vue application.

## License

MIT
