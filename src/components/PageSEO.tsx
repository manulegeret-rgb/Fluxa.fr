import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string; // chemin relatif, ex: "/articles"
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  breadcrumb?: Array<{ name: string; url: string }>;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

/**
 * Composant SEO réutilisable pour toutes les pages secondaires
 * Gère automatiquement : title, description, canonical, OG tags, Twitter Card, Schema
 */
export default function PageSEO({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogImage = "https://fluxa.fr/og-image-v2.png",
  ogType = "website",
  noindex = false,
  breadcrumb,
  articleMeta,
}: PageSEOProps) {
  const location = useLocation();

  useEffect(() => {
    // === TITLE ===
    document.title = title;

    // === UTILS ===
    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const ensureOG = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const removeOG = (property: string) => {
      document.querySelector(`meta[property="${property}"]`)?.remove();
    };

    // === META DESCRIPTION ===
    ensureMeta("description", description);

    // === KEYWORDS ===
    const baseKeywords = [
      "Fluxa",
      "agence web",
      "création site vitrine",
      "site vitrine professionnel",
    ];
    const allKeywords = [...baseKeywords, ...keywords];
    ensureMeta("keywords", allKeywords.join(", "));

    // === ROBOTS ===
    if (noindex) {
      ensureMeta("robots", "noindex, follow");
    } else {
      ensureMeta(
        "robots",
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      );
    }

    // === CANONICAL ===
    const canonicalUrl = canonicalPath
      ? `https://fluxa.fr${canonicalPath}`
      : `https://fluxa.fr${location.pathname}`;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // === OPEN GRAPH ===
    ensureOG("og:title", title);
    ensureOG("og:description", description);
    ensureOG("og:type", ogType);
    ensureOG("og:url", canonicalUrl);
    ensureOG("og:image", ogImage);
    ensureOG("og:image:width", "1200");
    ensureOG("og:image:height", "630");
    ensureOG(
      "og:image:alt",
      `${title} - Fluxa, agence web création sites vitrines professionnels`
    );
    ensureOG("og:site_name", "Fluxa");
    ensureOG("og:locale", "fr_FR");

    // Article-specific OG tags
    if (ogType === "article" && articleMeta) {
      if (articleMeta.publishedTime) {
        ensureOG("article:published_time", articleMeta.publishedTime);
      }
      if (articleMeta.modifiedTime) {
        ensureOG("article:modified_time", articleMeta.modifiedTime);
      }
      if (articleMeta.author) {
        ensureOG("article:author", articleMeta.author);
      }
      if (articleMeta.section) {
        ensureOG("article:section", articleMeta.section);
      }
      if (articleMeta.tags) {
        // Supprimer les anciens tags article
        document.querySelectorAll('meta[property="article:tag"]').forEach((t) => t.remove());
        articleMeta.tags.forEach((tag) => {
          const el = document.createElement("meta");
          el.setAttribute("property", "article:tag");
          el.content = tag;
          document.head.appendChild(el);
        });
      }
    } else {
      // Nettoyer les tags article si on n'est plus sur un article
      removeOG("article:published_time");
      removeOG("article:modified_time");
      removeOG("article:author");
      removeOG("article:section");
      document.querySelectorAll('meta[property="article:tag"]').forEach((t) => t.remove());
    }

    // === TWITTER CARD ===
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", ogImage);
    ensureMeta(
      "twitter:image:alt",
      `${title} - Fluxa, agence web création sites vitrines professionnels`
    );

    // === STRUCTURED DATA (Breadcrumb + WebPage) ===
    // Supprimer les anciens scripts JSON-LD de PageSEO
    document.querySelectorAll('script[data-page-seo]').forEach((s) => s.remove());

    const schemas: object[] = [];

    // Breadcrumb Schema
    if (breadcrumb && breadcrumb.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `https://fluxa.fr${item.url}`,
        })),
      });
    }

    // WebPage Schema (pour les articles)
    if (ogType === "article" && articleMeta) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "datePublished": articleMeta.publishedTime,
        "dateModified": articleMeta.modifiedTime || articleMeta.publishedTime,
        "author": {
          "@type": "Organization",
          "name": articleMeta.author || "Fluxa",
          "url": "https://fluxa.fr/",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Fluxa",
          "logo": {
            "@type": "ImageObject",
            "url": "https://fluxa.fr/logo.png",
          },
        },
        "inLanguage": "fr-FR",
        "isPartOf": { "@id": "https://fluxa.fr/#website" },
      });
    }

    if (schemas.length > 0) {
      schemas.forEach((schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-page-seo", "true");
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    // Cleanup au démontage
    return () => {
      document.querySelectorAll('script[data-page-seo]').forEach((s) => s.remove());
      document.querySelectorAll('meta[property="article:tag"]').forEach((t) => t.remove());
      removeOG("article:published_time");
      removeOG("article:modified_time");
      removeOG("article:author");
      removeOG("article:section");
    };
  }, [
    title,
    description,
    canonicalPath,
    location.pathname,
    keywords,
    ogImage,
    ogType,
    noindex,
    breadcrumb,
    articleMeta,
  ]);

  return null;
}
