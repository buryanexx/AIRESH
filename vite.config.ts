import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Генерируем source maps для отладки
    sourcemap: true,
    // Настраиваем пути для ассетов
    assetsDir: 'assets',
    // Оптимизируем размер бандла
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          sdk: ['@twa-dev/sdk']
        }
      }
    }
  },
  server: {
    // Настройки для разработки
    port: 5173,
    strictPort: true,
    host: true
  }
})
