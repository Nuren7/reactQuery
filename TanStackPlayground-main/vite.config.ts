import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/rest": "https://go.brightsideserve.com",
    },
  },
  plugins: [react(), svgr(), tailwindcss()],
})
