import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";
import { ARTICLES } from "@/data/articles";
import ArticleContent from "@/components/ArticleContent";
import { getArticleVisual } from "@/utils/articleVisuals";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";

const T = {
  h1: "text-4xl md:text-5xl font-extrabold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold leading-snug",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed",
  card: "rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm",
};

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Trouver l'article
  const article = ARTICLES.find((a) => a.slug === slug);

  // Si l'article n'existe pas, rediriger
  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Formater la date
  const formattedDate = new Date(article.publishDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Partager sur les réseaux
  const shareArticle = (platform: "linkedin" | "facebook" | "twitter") => {
    const url = `https://fluxa.fr/articles/${article.slug}`;
    const text = article.title;

    const shareUrls = {
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    };

    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <PageSEO
        title={`${article.title} | Fluxa`}
        description={article.metaDescription}
        canonicalPath={`/articles/${article.slug}`}
        keywords={article.keywords}
        breadcrumb={[
          { name: "Accueil", url: "/" },
          { name: "Articles", url: "/articles" },
          { name: article.title, url: `/articles/${article.slug}` },
        ]}
      />

      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />

      <article className="max-w-4xl mx-auto mt-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Link>
        </div>

        {/* Catégorie */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {article.categoryName}
          </span>
        </div>

        {/* Titre */}
        <header className="space-y-6 mb-12">
          <h1 className={T.h1}>{article.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime} min de lecture</span>
            </div>
            <div>
              <span>Par {article.author}</span>
            </div>
          </div>

          {/* Partage */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Partager :</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareArticle("linkedin")}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareArticle("facebook")}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => shareArticle("twitter")}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Twitter
            </Button>
          </div>
        </header>

        {/* Image avec dégradé coloré */}
        <div className={`aspect-[3/1] bg-gradient-to-br ${getArticleVisual(article).gradient} rounded-xl mb-6 flex items-center justify-center text-white`}>
          <div className="text-center space-y-1 px-4">
            <div className="text-4xl">{getArticleVisual(article).icon}</div>
            <p className="text-base md:text-lg font-bold drop-shadow-lg line-clamp-2">
              {article.categoryName}
            </p>
          </div>
        </div>

        {/* Contenu complet de l'article */}
        <ArticleContent filename={article.filename} />

        {/* CTA Fluxa */}
        <div className={`${T.card} p-3 mt-6 bg-gradient-to-br from-primary/10 to-primary/5`}>
          <h3 className="text-base md:text-lg font-semibold mb-1">🚀 Prêt à automatiser votre entreprise ?</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Découvrez comment Fluxa peut vous aider à gagner du temps et augmenter votre rentabilité.
          </p>
          <Button asChild size="sm" className="h-8 text-xs">
            <Link to="/#automations">Découvrir Fluxa</Link>
          </Button>
        </div>

        {/* Articles similaires */}
        <div className="mt-16 pt-12 border-t">
          <h2 className={`${T.h2} mb-8`}>Articles similaires</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ARTICLES.filter(
              (a) => a.category === article.category && a.id !== article.id
            )
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className={`${T.card} p-6 group hover:shadow-xl transition-all`}
                >
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-3">
                    {relatedArticle.categoryName}
                  </span>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-4">
                    <Clock className="w-3 h-3" />
                    <span>{relatedArticle.readingTime} min</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </main>
  );
}
