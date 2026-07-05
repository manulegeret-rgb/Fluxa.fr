/**
 * Pré-rendu SSG hors build (lancé en LOCAL uniquement : `npm run prerender`).
 *
 * Pourquoi hors build : l'environnement de build Vercel n'a pas de Chrome
 * exécutable, donc lancer Puppeteer pendant `vite build` y échoue. On génère
 * donc les pages en local (Chrome présent), et on écrit le HTML pré-rendu dans
 * `public/<route>/index.html`. Vite les copie ensuite tels quels dans `dist/`
 * au build Vercel — qui reste un simple `vite build`, sans Puppeteer.
 *
 * La home (`/`) n'est PAS pré-rendue ici : son template racine `index.html`
 * contient déjà un bloc SEO statique (.seo-fallback) + toutes les métadonnées.
 * Écrire public/index.html entrerait en conflit avec ce template.
 *
 * Workflow : modifier une page pré-rendue -> relancer `npm run prerender`
 * -> committer les public/<route>/index.html mis à jour.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PORT = 4178;
const BASE = `http://localhost:${PORT}`;

// Routes à pré-rendre (hors "/" — voir en-tête). /demo/* volontairement exclu.
const ROUTES = [
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

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: ROOT, shell: true, ...opts });
    p.on("error", reject);
    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))
    );
  });
}

function postProcess(html) {
  // 1) Marque le HTML comme pré-rendu -> main.tsx fera hydrateRoot.
  html = html.replace('<div id="root">', '<div id="root" data-prerendered="true">');
  // 2) Force la visibilité du contenu animé (Framer Motion, opacity:0 initial)
  //    dans le HTML statique. Le JS rejoue ensuite l'animation normalement.
  html = html.replace(
    "</head>",
    '<style>[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important}</style></head>'
  );
  return html;
}

async function main() {
  console.log("→ Build de production…");
  await run("npm", ["run", "build"]);

  console.log("→ Démarrage du serveur de preview…");
  const server = spawn("npm", ["run", "preview", "--", "--port", String(PORT)], {
    cwd: ROOT,
    shell: true,
    stdio: "ignore",
  });

  // Laisse le serveur démarrer.
  await new Promise((r) => setTimeout(r, 3000));

  const browser = await puppeteer.launch({ headless: true });
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
      // Laisse l'app s'hydrater et poser title/canonical/meta via React.
      await new Promise((r) => setTimeout(r, 1500));
      let html = await page.content();
      html = postProcess(html);

      const outDir = join(ROOT, "public", route.replace(/^\//, ""));
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html, "utf8");
      console.log(`  ✓ ${route} -> public${route}/index.html`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.kill();
  }

  console.log("✅ Pré-rendu terminé. Pense à committer les public/<route>/index.html.");
}

main().catch((e) => {
  console.error("✗ Échec du pré-rendu :", e);
  process.exit(1);
});
