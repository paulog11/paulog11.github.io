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
  server: {
    watch: {
      // .pglite/ is the local Postgres engine's live data directory, not source —
      // watching it races the dev server's own startup (see plugin-vue handleHotUpdate crash)
      ignored: ['**/.pglite/**'],
    },
  },
})
