import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Web4You/',
  plugins: [react()],
  publicDir: 'public',
})
