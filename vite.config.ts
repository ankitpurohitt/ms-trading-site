import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      clientPort: 443,
      host: "9000-firebase-ms-trading-site-1773049099188.cluster-44kx2eiocbhe2tyk3zoyo3ryuo.cloudworkstations.dev",
    }
  }
})