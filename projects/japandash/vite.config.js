import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import { devApiPlugin } from './vite-plugin-dev-api.js'

export default defineConfig({
  plugins: [vue(), devApiPlugin()],
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
})
