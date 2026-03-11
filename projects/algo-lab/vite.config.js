import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    // Single file output for GitHub Pages static deploy
    rollupOptions: {
      output: {
        // Inline all assets directly into the HTML
        inlineDynamicImports: true,
        manualChunks: undefined,
      }
    },
    // Inline assets below this size (set very high to capture everything)
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
  }
})
