import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

const packageRoot = resolve(__dirname, '..')

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/MCVDataTable/' : '/',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      dts: false,
    }),
  ],
  resolve: {
    dedupe: ['vue', 'vuetify'],
  },
  server: {
    fs: {
      allow: [packageRoot],
    },
  },
}))
