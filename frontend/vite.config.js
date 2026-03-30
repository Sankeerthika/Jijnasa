import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Keep heavy chart libraries separate
            if (id.includes('recharts') || id.includes('d3')) {
              return 'vendor-charts';
            }
            // Put everything else in node_modules into one vendor chunk
            // This avoids circular dependencies between React and other libraries
            return 'vendor';
          }
        }
      }
    }
  }
})
