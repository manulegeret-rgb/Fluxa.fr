import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string; // chemin relatif, ex: "/articles"
  keywords?: string[];
  ogImage?: string;
  noindex?: boolean; // pour les pages légales si souhaité
  breadcrumb?: Array<{ name: string; url: string }>; // pour le fil d'Ariane
}

/**
 * Composant SEO réutilisable pour toutes les pages
 * Gère automatiquement : title, description, canonical, OG tags
 */
export default function PageSEO({
  title,
  description,
  canonicalPath,
  keywords = [],
  ogImage = "https://fluxa.fr/og-image.png",
  noindex = false,
  breadcrumb,
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

    // === META DESCRIPTION ===
    ensureMeta("description", description);

    // === KEYWORDS (si fournis) ===
    if (keywords.length > 0) {
      ensureMeta("keywords", keywords.join(", "));
    }

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
    ensureOG("og:type", "website");
    ensureOG("og:url", canonicalUrl);
    ensureOG("og:image", ogImage);
    ensureOG("og:image:width", "1200");
    ensureOG("og:image:height", "630");
    ensureOG("og:image:alt", "Fluxa - Outil de gestion automatisé pour artisans et indépendants");
    ensureOG("og:site_name", "Fluxa");
    ensureOG("og:locale", "fr_FR");

    // === TWITTER CARD ===
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", ogImage);
    ensureMeta("twitter:image:alt", "Fluxa - Outil de gestion automatisé pour artisans et indépendants");

    // === BREADCRUMB (Schema.org) ===
    if (breadcrumb && breadcrumb.length > 0) {
      const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `https://fluxa.fr${item.url}`,
        })),
      };

      // Supprimer ancien script breadcrumb s'il existe
      const oldScript = document.querySelector('script[data-breadcrumb="true"]');
      if (oldScript) {
        oldScript.remove();
      }

      // Ajouter nouveau script
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-breadcrumb", "true");
      script.text = JSON.stringify(breadcrumbList);
      document.head.appendChild(script);
    }

    // Cleanup au démontage
    return () => {
      // Retirer le breadcrumb schema si présent
      const breadcrumbScript = document.querySelector('script[data-breadcrumb="true"]');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }
    };
  }, [title, description, canonicalPath, location.pathname, keywords, ogImage, noindex, breadcrumb]);

  return null; // Composant invisible
}
