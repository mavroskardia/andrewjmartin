import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/andrewjmartin/',
  build: {
    lib: {
      entry: 'index.html',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/,
    },
  },
})
