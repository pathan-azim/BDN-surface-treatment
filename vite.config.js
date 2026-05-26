import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'] , // Ensures GLB files are properly processed and included in the build
  base: "/BDN-surface-treatment/",
})
