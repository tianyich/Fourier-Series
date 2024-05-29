import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist', // This is the default setting and can be omitted unless you need a different directory
  },
  base: "/Fourier-Series-and-Fourier-Transform/"
})
