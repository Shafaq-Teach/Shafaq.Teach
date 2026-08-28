import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Shafaq_Teach/',
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173, allowedHosts: true },
})
