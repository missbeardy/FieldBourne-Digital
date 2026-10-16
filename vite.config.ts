import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        wirebird: resolve(import.meta.dirname, 'demos/wirebird/index.html'),
        'sorrel-slate': resolve(import.meta.dirname, 'demos/sorrel-slate/index.html'),
        'lantern-gully': resolve(import.meta.dirname, 'demos/lantern-gully/index.html'),
      },
    },
  },
})
