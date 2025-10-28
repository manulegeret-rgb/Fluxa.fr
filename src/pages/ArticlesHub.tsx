import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { ARTICLES, CATEGORIES } from "@/data/articles";
import { getArticleVisual } from "@/utils/articleVisuals";
import { Clock, ArrowRight, Search } from "lucide-react";

const T = {
  h1: "text-4xl md:text-5xl font-extrabold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold leading-snug",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed",
  card: "rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm hover:border-border transition-all duration-300",
};

export default function ArticlesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Filtrer les articles
  const filteredArticles = useMemo(() => {
    let filtered = ARTICLES;

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keywords.some(kw => kw.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <PageSEO
        title="Blog Automatisation pour Artisans et TPE : Guides & Tutoriels | Fluxa"
        description="Découvrez nos guides complets sur l'automatisation pour artisans et TPE. N8N, workflow, gestion client, facturation automatique et plus encore."
        canonicalPath="/articles"
        keywords={[
          "blog automatisation",
          "guides artisans",
          "tutoriels n8n",
          "workflow automatisation",
          "gestion tpe",
          "automatisation artisan",
          "guides fluxa",
        ]}
        breadcrumb={[
          { name: "Accueil", url: "/" },
          { name: "Articles", url: "/articles" },
        ]}
      />

      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />

      <div className="max-w-7xl mx-auto mt-20">
        {/* Header */}
        <header className="text-center space-y-6 mb-16">
          <h1 className={T.h1}>
            Guides & Ressources sur l'Automatisation
          </h1>
          <p className={`${T.p} max-w-3xl mx-auto`}>
            Découvrez nos guides complets pour automatiser votre entreprise, gagner du temps et augmenter votre rentabilité.
            26 articles rédigés par des experts pour artisans, TPE et indépendants.
          </p>
        </header>

        {/* Barre de recherche */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un article, un sujet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              Tous les articles ({ARTICLES.length})
            </Button>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.slug)}
                className="rounded-full"
              >
                {cat.name} ({cat.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Résultats */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className={T.p}>Aucun article trouvé pour cette recherche.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <>
            <p className="text-center text-muted-foreground mb-8">
              {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""} trouvé{filteredArticles.length > 1 ? "s" : ""}
            </p>

            {/* Grille d'articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const visual = getArticleVisual(article);
                return (
                  <Link
                    key={article.id}
                    to={`/articles/${article.slug}`}
                    className={`${T.card} group overflow-hidden hover:shadow-xl`}
                  >
                    {/* Image avec dégradé coloré */}
                    <div className={`aspect-video bg-gradient-to-br ${visual.gradient} flex items-center justify-center text-white`}>
                      <div className="text-center space-y-2 px-4">
                        <div className="text-6xl">{visual.icon}</div>
                        <p className="text-sm font-semibold drop-shadow">
                          {article.categoryName}
                        </p>
                      </div>
                    </div>

                  <div className="p-6 space-y-4">
                    {/* Catégorie */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {article.categoryName}
                    </span>

                    {/* Titre */}
                    <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readingTime} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* CTA Article Viral */}
        <div className={`${T.card} p-8 mt-16 bg-gradient-to-br from-primary/10 to-primary/5 text-center`}>
          <h2 className={`${T.h3} mb-4`}>
            📊 Calculez Vos Pertes Actuelles
          </h2>
          <p className={T.p}>
            Découvrez combien vous perdez vraiment en temps et en argent avec la gestion manuelle.
            Calculateur ROI interactif + 150 automatisations détaillées.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/guide-complet-roi-automatisation-artisans">
              Voir l'Étude Complète ROI
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
