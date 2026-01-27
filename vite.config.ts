// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // ✅ 现在 TS 能识别了
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  //配置连接后端
  server: {
    port: 3000,
    open: true,
    // 👇 关键：配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉 /api 前缀再转发
      }
    }
  }
})