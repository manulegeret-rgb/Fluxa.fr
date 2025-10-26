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
      "Fluxa — Gestion automatisée pour artisans & indépendants";
    const description =
      "Fluxa aide les artisans, indépendants et petites entreprises à automatiser votre gestion quotidienne : rappels de rendez-vous pour vos clients, relances automatiques, facturation simplifiée, messagerie centralisée et statistiques claires. Gagnez du temps, réduisez vos oublis et boostez votre chiffre d'affaires.";

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
    ensureOG("og:image:alt", "Fluxa - Outil de gestion automatisé pour artisans et indépendants");
    ensureOG("og:site_name", "Fluxa");
    ensureOG("og:locale", "fr_FR");

    // === TWITTER ===
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", "https://fluxa.fr/og-image.png");
    ensureMeta("twitter:image:alt", "Fluxa - Outil de gestion automatisé pour artisans et indépendants");

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
            "https://www.instagram.com/fluxa",
            "https://www.facebook.com/fluxa.fr",
            "https://www.linkedin.com/company/fluxa"
          ],
          "description":
            "Fluxa est une application de gestion sur mesure conçue pour les artisans, indépendants et TPE. Elle centralise les clients, rendez-vous, factures et statistiques dans une interface simple et moderne.",
        },
        {
          "@type": "WebApplication",
          "name": "Fluxa",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "url": "https://fluxa.fr/",
          "description":
            "Application de gestion automatisée : rappels de rendez-vous, relances impayés, génération de factures PDF, messagerie unifiée et tableau de bord statistique hebdomadaire.",
          "softwareVersion": "1.0.0",
          "creator": { "@type": "Organization", "name": "Fluxa" },
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Fluxa permet-il d’envoyer des rappels de rendez-vous automatiques ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui. Fluxa planifie et envoie automatiquement les rappels de rendez-vous par SMS ou e-mail à J-1, J-2 ou H-24. Les réponses du client mettent à jour l’agenda en temps réel et réduisent les absences."
              }
            },
            {
              "@type": "Question",
              "name": "Peut-on automatiser les relances de factures impayées avec Fluxa ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Tout à fait. Fluxa envoie des relances automatiques à J+7 et J+14, avec lien de paiement sécurisé. Le ton et le message sont personnalisables, et les paiements stoppent automatiquement les relances."
              }
            },
            {
              "@type": "Question",
              "name": "Fluxa est-il adapté aux artisans et indépendants sans compétences techniques ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui, Fluxa a été conçu pour être simple et intuitif. Aucune compétence technique n’est nécessaire : tout se configure en quelques clics depuis votre espace client sur ordinateur ou mobile."
              }
            },
            {
              "@type": "Question",
              "name": "Puis-je personnaliser mes modèles de facture et messages clients ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text":
                  "Oui. Les modèles de facture, devis et messages sont 100% personnalisables : logo, couleurs, textes et variables dynamiques (nom client, date, prestation, montant…)."
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