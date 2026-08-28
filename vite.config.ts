import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: false,
    }),
    dts({
      entryRoot: '.',
      include: ['index.ts', 'auto-imports.d.ts', 'components/**/*.vue', 'composables/**/*.ts', 'utils/**/*.ts'],
      exclude: ['vite.config.ts', 'node_modules/**', 'dist/**'],
      insertTypesEntry: true,
      logLevel: 'silent',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: 'MCVDataTable',
      fileName: 'mcv-data-table',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'vuetify'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          vuetify: 'Vuetify',
        },
      },
    },
  },
})
