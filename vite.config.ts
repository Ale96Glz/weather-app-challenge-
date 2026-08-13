import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project site needs the repo name as base path
  base: command === 'build' ? '/weather-app-challenge-/' : '/',
  plugins: [react(), tailwindcss()],
}))
