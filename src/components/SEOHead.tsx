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
    const title =
      "Fluxa — Création site vitrine professionnel à partir de 390€";
    const description =
      "Agence de création de sites vitrines pour TPE, indépendants et entrepreneurs. Design moderne, responsive, SEO optimisé. Livraison 1-2 semaines. Hébergement inclus.";

    document.title = title;
    ensureMeta("description", description);
    ensureMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    ensureMeta("theme-color", "#0f172a");

    // === CANONICAL ===
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://fluxa.fr/";

    // === OPEN GRAPH (Facebook, LinkedIn, etc.) ===
    ensureOG("og:title", title);
    ensureOG("og:description", description);
    ensureOG("og:type", "website");
    ensureOG("og:url", "https://fluxa.fr/");
    ensureOG("og:image", "https://fluxa.fr/og-image.png");
    ensureOG("og:image:width", "1200");
    ensureOG("og:image:height", "630");
    ensureOG("og:image:alt", "Fluxa - Création de sites vitrines professionnels pour entrepreneurs");
    ensureOG("og:site_name", "Fluxa");
    ensureOG("og:locale", "fr_FR");

    // === TWITTER ===
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", "https://fluxa.fr/og-image.png");
    ensureMeta("twitter:image:alt", "Fluxa - Création de sites vitrines professionnels pour entrepreneurs");

    // === STRUCTURED DATA JSON-LD ===
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Fluxa",
          "url": "https://fluxa.fr/",
          "logo": "https://fluxa.fr/logo.png",
          "email": "fluxa.contact@gmail.com",
          "sameAs": [
            "https://www.instagram.com/fluxa.fr",
            "https://www.facebook.com/fluxa.fr",
            "https://www.linkedin.com/company/fluxa-fr/"
          ],
          "description":
            "Fluxa est une agence spécialisée dans la création de sites vitrines professionnels pour TPE, indépendants et entrepreneurs. Design moderne, responsive et optimisé SEO à partir de 390€.",
        },
        {
          "@type": "ProfessionalService",
          "name": "Fluxa",
          "url": "https://fluxa.fr/",
          "priceRange": "390€-1500€",
          "description":
            "Création de sites vitrines professionnels : design responsive, hébergement inclus, optimisation SEO, livraison rapide en 1-2 semaines.",
          "areaServed": "FR",
          "availableLanguage": "fr",
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Combien coûte un site vitrine chez Fluxa ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Notre formule de base est à 390€ pour un site de 5 pages avec hébergement et domaine inclus la première année. Des options sont disponibles pour personnaliser votre site selon vos besoins."
              }
            },
            {
              "@type": "Question",
              "name": "Combien de temps pour créer mon site vitrine ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Entre 1 et 2 semaines en moyenne. Après validation de la maquette, votre site est développé et mis en ligne rapidement."
              }
            },
            {
              "@type": "Question",
              "name": "Mon site sera-t-il optimisé pour Google (SEO) ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, tous nos sites incluent l'optimisation SEO de base : balises meta, structure HTML propre, vitesse de chargement optimisée, et compatibilité mobile."
              }
            },
            {
              "@type": "Question",
              "name": "L'hébergement et le nom de domaine sont-ils inclus ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, l'hébergement et le nom de domaine sont inclus la première année dans le tarif de base. Après la première année, le renouvellement est à prévoir (environ 50-80€/an)."
              }
            }
          ]
        }
      ]
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }, []);

  return null;
}