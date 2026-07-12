import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { ARTICLES } from "@/data/articles";

/**
 * Bloc "articles utiles" pour les pages SEO métiers (thème clair/shadcn).
 * Maillage interne croisé : les pages métiers transmettent du jus au blog
 * et donnent aux visiteurs des ressources pour approfondir.
 *
 * @param slugs  slugs d'articles à afficher (dans l'ordre voulu)
 * @param title  titre de section (optionnel)
 */
export default function RelatedArticles({
  slugs,
  title = "Pour aller plus loin",
}: {
  slugs: string[];
  title?: string;
}) {
  const articles = slugs
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is (typeof ARTICLES)[number] => Boolean(a));

  if (articles.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group flex flex-col rounded-xl border border-border/60 bg-card/40 p-5 transition hover:border-primary/40 hover:bg-card/60"
            >
              <span className="self-start text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                {article.categoryName}
              </span>
              <h3 className="font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                {article.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {article.readingTime} min
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  Lire <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
