import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 3001, // Cambia este valor al puerto que desees
  // },
  plugins: [react()],
})
