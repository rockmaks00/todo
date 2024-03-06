import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyConfig = {
  target: `http://todo.com`,
  changeOrigin: true,
};
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:5173,
    proxy: {
      '/api': proxyConfig
    }
  },
  plugins: [react()],
})
