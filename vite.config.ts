import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@assets': resolve('src/shared/assets'),
      '@assets/*': resolve('src/shared/assets*'),
      '@shared': resolve('src/shared'),
      '@entities': resolve('src/entities'),
      '@features': resolve('src/features'),
      '@widgets': resolve('src/widgets'),
      '@pages': resolve('src/pages'),
      '@app': resolve('src/app'),
    },
  },
})
