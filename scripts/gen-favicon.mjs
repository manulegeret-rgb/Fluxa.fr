/**
 * Génère les PNG du favicon Fluxa à toutes les tailles depuis un SVG vectoriel,
 * via Puppeteer (rendu Chrome = net). Lancé en LOCAL : node scripts/gen-favicon.mjs
 *
 * Le symbole (X blanc sur carré bleu) est redessiné en SVG, avec un trait
 * légèrement épaissi aux très petites tailles pour rester lisible à 16px.
 */
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUB = join(__dirname, "..", "public");

// stroke-width adapté : plus épais quand l'icône est petite (sinon ça bave)
function svg(size) {
  const sw = size <= 32 ? 12 : 10;
  const rx = size <= 32 ? 18 : 22;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="${rx}" fill="#1b6fd6"/>
    <path d="M28 30 Q50 48 72 70" fill="none" stroke="#ffffff" stroke-width="${sw}" stroke-linecap="round"/>
    <path d="M72 30 Q50 48 28 70" fill="none" stroke="#cfe6ff" stroke-width="${sw}" stroke-linecap="round"/>
  </svg>`;
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
