import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild', // Faster and built-in
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap'],
          'ui-vendor': ['lucide-react', 'react-router-dom']
        }
      }
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1200
  }
})
