import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Now we add these below things to avoid cors errors
    proxy: {
			"/api": {
				target: "http://localhost:8000",
			},
		},
  }
})
