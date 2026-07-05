import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

// Routes à pré-générer en HTML statique au build (SSG par crawl).
// /demo/* est volontairement exclu (aucune valeur SEO).
const PRERENDER_ROUTES = [
  "/",
  "/articles",
  "/ressources",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cgv",
  "/merci",
  "/guide-complet-roi-automatisation-artisans",
  "/creation-site-vitrine-artisan-chambery",
  "/creation-site-vitrine-plombier",
  "/creation-site-vitrine-electricien",
  "/creation-site-vitrine-paysagiste",
  "/prix-site-vitrine-2026",
];

// Résout le chemin d'un exécutable Chrome selon l'environnement de build.
// - Sur Vercel (pas de Chrome système) : @sparticuz/chromium.
// - En local : Chromium téléchargé par Puppeteer, ou Chrome système via PUPPETEER_EXECUTABLE_PATH.
async function resolveChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: [] as string[] };
  }
  if (process.env.VERCEL) {
    const chromium = (await import("@sparticuz/chromium")).default;
    return {
      executablePath: await chromium.executablePath(),
      args: chromium.args,
    };
  }
  // Local : laisse Puppeteer utiliser son Chromium téléchargé (executablePath undefined).
  return { executablePath: undefined as string | undefined, args: [] as string[] };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const isProdBuild = mode !== "development";
  const chromium = isProdBuild
    ? await resolveChromium()
    : { executablePath: undefined as string | undefined, args: [] as string[] };

  return {
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
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // Pré-rendu SSG uniquement au build de production.
    mode !== "development" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          // Attend que l'app soit hydratée avant de capturer le HTML.
          renderAfterTime: 1500,
          headless: true,
          maxConcurrentRoutes: 2,
          executablePath: chromium.executablePath,
          args: chromium.args,
        },
        postProcess(renderedRoute) {
          // 1) Marque le HTML comme pré-rendu -> main.tsx fera hydrateRoot.
          renderedRoute.html = renderedRoute.html.replace(
            '<div id="root">',
            '<div id="root" data-prerendered="true">'
          );
          // 2) Garantit que le contenu animé (Framer Motion, opacity:0 initial)
          //    reste VISIBLE dans le HTML statique pour les bots et aperçus sociaux.
          //    Le JS rejoue ensuite l'animation normalement pour l'humain.
          renderedRoute.html = renderedRoute.html.replace(
            "</head>",
            "<style>[style*=\"opacity:0\"],[style*=\"opacity: 0\"]{opacity:1 !important}</style></head>"
          );
        },
      }),
  ].filter(Boolean),
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
  };
});
