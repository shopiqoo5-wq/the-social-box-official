import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compress assets for production — serves gzip to all browsers
    compression({ algorithm: 'gzip', threshold: 1024 }),
    // Brotli for modern browsers — ~15-20% smaller than gzip
    compression({ algorithm: 'brotliCompress', threshold: 1024 }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
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
