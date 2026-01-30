import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://ai-resume-builder-backend-y79f.onrender.com",
        changeOrigin: true,
      },
    },
  },
})
