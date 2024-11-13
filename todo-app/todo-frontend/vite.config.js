import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Make the server accessible externally
    port: 5173,  // Optional: you can specify the port explicitly
  },
})
