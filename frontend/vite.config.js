import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow Vite to read files outside of the frontend folder
      allow: ['..']
    }
  },
  // Ensure Vite treats your local package as a standard dependency
  optimizeDeps: {
    include: ['baonlock']
  }
})