import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    host: '0.0.0.0',
    port: 7861,
  },
    preview: {
    host: '0.0.0.0',
    port: 7861,
    allowedHosts: ['hostel-dashboard-48qp.onrender.com'], 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
