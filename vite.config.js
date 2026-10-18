import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work at any URL path,
// including GitHub Pages (niteshkuntal.github.io/Portfolio/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep the 3D libraries in their own chunk so the page text loads first.
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
