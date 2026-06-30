import { useEffect } from "react";

export default function SEOHead() {
  useEffect(() => {
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

    // === TITLE & DESCRIPTION ===
    const title = "Fluxa | Création de site internet professionnel dès 890€";
    const description =
      "Agence web création sites vitrines professionnels pour TPE, artisans et indépendants. Site responsive, SEO optimisé, hébergement inclus. Dès 890€. Livraison 2-3 semaines.";

    document.title = title;
    ensureMeta("description", description);
    ensureMeta(
      "robots",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    ensureMeta("theme-color", "#0f172a");
    ensureMeta(
      "keywords",
      "création site vitrine, site vitrine professionnel, agence web TPE, site internet artisan, site vitrine clé en main,hébergement inclus, SEO optimisé, site vitrine artisan, création site internet, devis site vitrine"
    );

    // === CANONICAL ===
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://fluxa.fr/";

    // === OPEN GRAPH ===
    ensureOG("og:title", title);
    ensureOG("og:description", description);
    ensureOG("og:type", "website");
    ensureOG("og:url", "https://fluxa.fr/");
    ensureOG("og:image", "https://fluxa.fr/og-image-v2.png");
    ensureOG("og:image:width", "1200");
    ensureOG("og:image:height", "630");
    ensureOG(
      "og:image:alt",
      "Fluxa - Agence web création site vitrine professionnel dès 890€ pour artisans et TPE"
    );
    ensureOG("og:site_name", "Fluxa");
    ensureOG("og:locale", "fr_FR");

    // === TWITTER ===
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", "https://fluxa.fr/og-image-v2.png");
    ensureMeta(
      "twitter:image:alt",
      "Fluxa - Agence web création site vitrine professionnel dès 890€ pour artisans et TPE"
    );

    // Le schema JSON-LD est défini statiquement dans index.html — pas de doublon React ici.
  }, []);

  return null;
}
