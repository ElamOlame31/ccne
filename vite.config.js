import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base relative pour que le build puisse être ouvert depuis n'importe quel chemin (démo locale)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
