import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Web4You/' : '/',
  plugins: [react()],
  publicDir: 'public',
})
