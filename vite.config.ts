import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Build simple, sans pré-rendu : le pré-rendu SSG est géré hors build par
// `scripts/prerender.mjs` (npm run prerender), lancé en local. Vercel ne fait
// donc qu'un `vite build` classique (aucun Puppeteer côté serveur de build).
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8086,
    strictPort: true, // Quitte avec erreur si le port est occupé
    headers: {
      // En-têtes de cache pour les images en développement
      'Cache-Control': 'public, max-age=31536000',
      'Expires': new Date(Date.now() + 31536000000).toUTCString(),
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ajouter des hashes pour le cache busting
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
}));
