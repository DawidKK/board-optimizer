import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), netlifyReactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
