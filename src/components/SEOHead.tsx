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
    const title = "Fluxa | Création de site vitrine professionnel dès 890€";
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
      "création site vitrine, site vitrine professionnel, agence web TPE, site internet artisan, site pas cher, hébergement inclus, SEO optimisé, site vitrine artisan, création site internet, devis site vitrine"
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

    // === STRUCTURED DATA JSON-LD ===
    // Supprimer les anciens scripts JSON-LD injectés par React (pas celui de index.html)
    document
      .querySelectorAll('script[type="application/ld+json"][data-react-seo]')
      .forEach((s) => s.remove());

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        // WebSite avec SearchAction (sitelinks searchbox)
        {
          "@type": "WebSite",
          "@id": "https://fluxa.fr/#website",
          "name": "Fluxa",
          "url": "https://fluxa.fr/",
          "description": description,
          "inLanguage": "fr-FR",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://fluxa.fr/articles?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        },
        // Organization enrichie
        {
          "@type": "Organization",
          "@id": "https://fluxa.fr/#organization",
          "name": "Fluxa",
          "alternateName": "Fluxa Agence Web",
          "url": "https://fluxa.fr/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://fluxa.fr/logo.png",
            "width": 240,
            "height": 240,
          },
          "sameAs": [
            "https://www.instagram.com/fluxa.fr",
            "https://www.facebook.com/fluxa.fr",
            "https://www.linkedin.com/company/fluxa-fr/",
          ],
          "description":
            "Fluxa est une agence web spécialisée dans la création de sites vitrines professionnels pour TPE, artisans, consultants et entrepreneurs indépendants. Développement de sites internet modernes, responsive mobile-first, optimisés SEO à partir de 890€. Hébergement web et nom de domaine inclus.",
          "foundingLocation": {
            "@type": "Place",
            "addressLocality": "Cognin",
            "addressRegion": "Savoie",
            "addressCountry": "FR",
          },
        },
        // LocalBusiness (agence de services)
        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": "https://fluxa.fr/#localbusiness",
          "name": "Fluxa - Agence Web Création Sites Vitrines",
          "url": "https://fluxa.fr/",
          "image": "https://fluxa.fr/og-image-v2.png",
          "priceRange": "890€–2000€",
          "description":
            "Agence de création de sites vitrines professionnels pour TPE, artisans et indépendants. Design responsive, hébergement inclus, SEO optimisé. Livraison 2-3 semaines.",
          "areaServed": {
            "@type": "Country",
            "name": "France",
          },
          "availableLanguage": {
            "@type": "Language",
            "name": "French",
            "alternateName": "fr",
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Services de création de sites vitrines",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Création site vitrine professionnel",
                  "description":
                    "Site vitrine 5 pages responsive, SEO optimisé, hébergement et domaine inclus 1ère année. Livraison en 2-3 semaines.",
                },
                "price": "890",
                "priceCurrency": "EUR",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "890",
                  "priceCurrency": "EUR",
                  "description": "Formule de base tout compris",
                },
              },
            ],
          },
        },
        // WebPage de la homepage
        {
          "@type": "WebPage",
          "@id": "https://fluxa.fr/#webpage",
          "url": "https://fluxa.fr/",
          "name": title,
          "description": description,
          "isPartOf": { "@id": "https://fluxa.fr/#website" },
          "about": { "@id": "https://fluxa.fr/#organization" },
          "inLanguage": "fr-FR",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://fluxa.fr/",
              },
            ],
          },
        },
        // FAQPage (pour les rich snippets FAQ dans les SERP)
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Combien coûte un site vitrine professionnel chez Fluxa ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "La formule de base est à 890€ tout compris pour un site vitrine de 5 pages avec hébergement et nom de domaine inclus la première année. Des options personnalisables sont disponibles selon vos besoins.",
              },
            },
            {
              "@type": "Question",
              "name": "Combien de temps pour créer mon site vitrine ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Entre 1 et 2 semaines en moyenne. Après validation de la maquette, votre site vitrine est développé et mis en ligne rapidement.",
              },
            },
            {
              "@type": "Question",
              "name": "Mon site vitrine sera-t-il optimisé pour Google (SEO) ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, tous nos sites incluent l'optimisation SEO : balises meta, structure HTML propre, vitesse de chargement optimisée, compatibilité mobile et Google Search Console configurée.",
              },
            },
            {
              "@type": "Question",
              "name": "L'hébergement et le nom de domaine sont-ils inclus ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, l'hébergement web sécurisé et le nom de domaine sont inclus la première année dans le tarif de base de 890€. Après la première année, le renouvellement est d'environ 50-80€/an.",
              },
            },
            {
              "@type": "Question",
              "name": "Fluxa crée-t-il des sites pour artisans et TPE ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, Fluxa est spécialisé dans la création de sites vitrines pour artisans, TPE, commerçants, consultants et professions libérales. Nous adaptons chaque site à votre activité et vos besoins spécifiques.",
              },
            },
            {
              "@type": "Question",
              "name": "Puis-je modifier mon site après livraison ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, un round de modifications est inclus dans la formule de base. Nous proposons aussi une maintenance mensuelle à 59€/mois pour garder votre site sécurisé et performant dans la durée.",
              },
            },
          ],
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-react-seo", "true");
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      // Cleanup au démontage
      document
        .querySelectorAll('script[type="application/ld+json"][data-react-seo]')
        .forEach((s) => s.remove());
    };
  }, []);

  return null;
}
