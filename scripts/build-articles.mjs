/**
 * Convertit les articles Markdown de content/articles/*.md vers le format
 * attendu par <ArticleContent> : public/articles_extracted.json
 *
 * Format Markdown source (par fichier <filename-sans-docx>.md) :
 *   # Titre H1
 *   > meta: La méta description SEO (150-160 caractères).
 *   ## Titre H2
 *   ### Titre H3
 *   - item de liste
 *   Paragraphe normal (gras **ainsi**, encadré si commence par 💡 ✅ ⚠️ 📌).
 *
 * La clé de chaque entrée JSON est le `filename` (avec .docx) référencé dans
 * src/data/articles.ts, pour que data[filename] soit trouvé au fetch.
 *
 * Usage : node scripts/build-articles.mjs
 * Le JSON existant (26 articles d'automatisation hérités) est PRÉSERVÉ :
 * on ne fait qu'ajouter/écraser les 12 clés de nos articles.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "content", "articles");
const JSON_PATH = join(ROOT, "public", "articles_extracted.json");

function mdToParagraphs(md) {
  const lines = md.split(/\r?\n/);
  const paragraphs = [];
  const headings = [];
  let meta = "";

  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;

    // Méta description : > meta: ...
    const metaMatch = line.match(/^>\s*meta:\s*(.+)$/i);
    if (metaMatch) {
      meta = metaMatch[1].trim();
      // Le renderer ignore les lignes contenant "meta description"
      paragraphs.push({ text: `Meta description : ${meta}`, style: "Normal" });
      continue;
    }

    if (line.startsWith("### ")) {
      const t = line.slice(4).trim();
      paragraphs.push({ text: t, style: "Heading 3" });
      headings.push(t);
    } else if (line.startsWith("## ")) {
      const t = line.slice(3).trim();
      paragraphs.push({ text: t, style: "Heading 2" });
      headings.push(t);
    } else if (line.startsWith("# ")) {
      const t = line.slice(2).trim();
      paragraphs.push({ text: t, style: "Heading 1" });
    } else if (/^[-*]\s+/.test(line)) {
      // Puce : le renderer détecte •, -, ● … en début de texte
      paragraphs.push({ text: "• " + line.replace(/^[-*]\s+/, ""), style: "Normal" });
    } else {
      paragraphs.push({ text: line.trim(), style: "Normal" });
    }
  }

  const full_text = paragraphs
    .filter((p) => p.style === "Normal" && !/^meta description/i.test(p.text))
    .map((p) => p.text)
    .join("\n");

  return { paragraphs, headings, meta, full_text };
}

async function main() {
  const existing = JSON.parse(await readFile(JSON_PATH, "utf8"));

  const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("Aucun .md dans content/articles/. Rien à faire.");
    return;
  }

  let count = 0;
  let totalWords = 0;
  for (const file of files) {
    const md = await readFile(join(SRC_DIR, file), "utf8");
    const { paragraphs, headings, full_text } = mdToParagraphs(md);
    const key = file.replace(/\.md$/, ".docx");
    existing[key] = { filename: key, paragraphs, full_text, headings };
    const words = full_text.split(/\s+/).filter(Boolean).length;
    totalWords += words;
    count++;
    console.log(`  ✓ ${key} — ${paragraphs.length} paragraphes, ~${words} mots`);
  }

  await writeFile(JSON_PATH, JSON.stringify(existing, null, 0), "utf8");
  console.log(
    `\n✅ ${count} articles écrits dans public/articles_extracted.json (moy. ~${Math.round(
      totalWords / count
    )} mots/article).`
  );
}

main().catch((e) => {
  console.error("✗ Échec build-articles :", e);
  process.exit(1);
});
