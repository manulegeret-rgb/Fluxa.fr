/**
 * Génère les PNG du favicon Fluxa à toutes les tailles depuis un SVG vectoriel,
 * via Puppeteer (rendu Chrome = net). Lancé en LOCAL : node scripts/gen-favicon.mjs
 *
 * Le symbole (X blanc sur carré bleu) est redessiné en SVG, avec un trait
 * légèrement épaissi aux très petites tailles pour rester lisible à 16px.
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile, readFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");

// Source = le SVG fond noir (X blanc), fourni par l'utilisateur.
// C'est cette version pleine qui sert de favicon aux PNG/ICO (onglet + Google),
// car un fond plein ressort bien en petit et dans les résultats Google.
const SRC = await readFile(join(PUB, "favicon-google-source.svg"), "utf8");

function svg(size) {
  // On force juste la taille du SVG source ; le contenu (X blanc sur fond noir) est repris tel quel.
  return SRC.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`);
}

// tailles à produire (fichier -> dimension px)
const OUT = [
  ["favicon-16.png", 16],
  ["favicon-32.png", 32],
  ["favicon-48.png", 48],
  ["favicon.png", 512],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  try {
    for (const [name, size] of OUT) {
      const s = svg(size);
      const html = `<!doctype html><meta charset="utf-8"><style>*{margin:0;padding:0}html,body{background:transparent}</style>${s}`;
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      await new Promise((r) => setTimeout(r, 60));
      const el = await page.$("svg");
      const buf = await el.screenshot({ omitBackground: true, type: "png" });
      await writeFile(join(PUB, name), buf);
      console.log(`  ✓ ${name} (${size}x${size})`);
    }
  } finally {
    await browser.close();
  }
  console.log("✅ PNG favicon générés. (Le .ico est assemblé à part.)");
}

main().catch((e) => {
  console.error("✗ Échec gen-favicon :", e);
  process.exit(1);
});
