import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   server: {
    port: 8080,     // Вказуємо потрібний порт
    host: true   ,
    allowedHosts: ["aernjdz.ddns.net"]   // Дозволяє доступ з інших пристроїв (приймає всі IP)
   }
})