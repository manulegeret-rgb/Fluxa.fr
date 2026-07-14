import { useEffect } from "react";
import RelatedArticles from "@/components/RelatedArticles";
import { CheckCircle2, Zap, Shield, Clock, MapPin, ArrowRight } from "lucide-react";

export default function SiteInternetAixLesBains() {
  useEffect(() => {
    document.title = "Création site internet Aix-les-Bains : Fluxa, dès 890€";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Fluxa crée votre site internet professionnel à Aix-les-Bains : artisan, commerçant ou indépendant. Responsive, SEO local, hébergement inclus, livré en 2-3 semaines dès 890€.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/creation-site-internet-aix-les-bains";

    const ld = { "@context": "https://schema.org", "@type": "Service", "name": "Création site internet Aix-les-Bains", "provider": { "@type": "LocalBusiness", "name": "Fluxa", "url": "https://fluxa.fr" }, "areaServed": [
      { "@type": "City", "name": "Aix-les-Bains" },
      { "@type": "City", "name": "Grésy-sur-Aix" },
      { "@type": "City", "name": "Le Bourget-du-Lac" },
      { "@type": "City", "name": "Drumettaz-Clarafond" },
      { "@type": "City", "name": "Mouxy" },
      { "@type": "AdministrativeArea", "name": "Savoie" }
    ], "description": "Création de sites internet professionnels pour artisans, commerçants et indépendants à Aix-les-Bains et autour du lac du Bourget.", "offers": { "@type": "Offer", "price": "890", "priceCurrency": "EUR" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" /> Aix-les-Bains · Lac du Bourget · Savoie
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Création de site internet<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> à Aix-les-Bains</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Artisan, commerçant, restaurateur ou indépendant à Aix-les-Bains ? Fluxa crée votre site internet professionnel en 2 à 3 semaines, clé en main, dès 890€ tout compris. Basés à Cognin, à 15 minutes d'Aix.
          </p>
          <a href="/#contact-form" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 48h · Sans engagement</p>
        </div>
      </section>

      {/* Contexte local */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Un site internet pour se démarquer à Aix-les-Bains</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Aix-les-Bains est une ville où l'artisanat est le premier employeur, avec plus de <strong className="text-foreground">800 entreprises artisanales</strong> réparties entre les services, le bâtiment, l'industrie et les métiers de bouche. Cette densité, c'est une chance — mais aussi une concurrence réelle. Aujourd'hui, un client qui cherche un artisan aixois commence sur Google : sans site, vous laissez la place à vos confrères.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            La ville vit aussi au rythme du <strong className="text-foreground">thermalisme et du tourisme</strong> : 4ᵉ station thermale de France, elle accueille des milliers de curistes et de visiteurs chaque année. Pour un commerçant, un restaurateur, un hébergeur ou un artisan du centre-ville comme des zones des Combaruches ou des Sources, un site bien référencé capte cette clientèle de passage qui cherche « près de moi » sur son téléphone.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Visible sur Google auprès des habitants et des curistes",
              "Crédibilité immédiate face à vos concurrents aixois",
              "Formulaire de contact et réservation 24h/24",
              "Mise en valeur de vos réalisations et de vos services",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qu'on fait */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Comment nous créons votre site</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Fluxa est une agence web basée à Cognin, tout près d'Aix-les-Bains. Nous concevons des sites internet pensés pour votre métier et votre clientèle locale — pas des modèles génériques.
          </p>
          <div className="space-y-4">
            {[
              { num: "1", title: "Échange & maquette", text: "On discute de votre activité, votre clientèle aixoise, votre zone. On crée une maquette visuelle que vous validez avant tout développement." },
              { num: "2", title: "Développement responsive", text: "Un site rapide et parfait sur mobile — l'écran sur lequel curistes et habitants vous cherchent le plus. Formulaire de contact, galerie, réservation si besoin." },
              { num: "3", title: "SEO local Aix-les-Bains", text: "On optimise votre site pour les recherches locales : votre métier, Aix-les-Bains et les communes autour du lac (Grésy-sur-Aix, Le Bourget-du-Lac, Drumettaz…)." },
              { num: "4", title: "Mise en ligne clé en main", text: "Hébergement, nom de domaine, certificat SSL : on s'occupe de tout. Votre site est en ligne en 2 à 3 semaines." },
            ].map((step, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{step.num}</div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarif */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Combien coûte un site internet à Aix-les-Bains ?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Notre formule est à <strong className="text-foreground">890€ tout compris</strong> : design responsive, jusqu'à 5 pages, formulaire de contact, optimisation SEO local, hébergement et nom de domaine inclus la première année. Paiement en 2 fois sans frais.
          </p>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">890€</p>
                <p className="text-sm text-muted-foreground mt-1">Site 5 pages · hébergement + domaine inclus 1ère année</p>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {["Design responsive mobile + desktop", "SEO local Aix-les-Bains", "Formulaire de contact", "1 round de modifications", "Livraison 2-3 semaines"].map((f, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="text-primary">✓</span> {f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-emerald-400" />
            Satisfaction garantie · Propriété totale du code · Support inclus
          </div>
        </div>
      </section>

      {/* Zone géo */}
      <section className="py-12 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Aix-les-Bains et tout le bassin du lac du Bourget</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Depuis Cognin, nous intervenons pour les professionnels d'Aix-les-Bains et des communes voisines. Que vous soyez au centre-ville, au bord du lac ou dans les zones d'activité, votre site est optimisé pour votre secteur.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Aix-les-Bains", "Grésy-sur-Aix", "Le Bourget-du-Lac", "Drumettaz-Clarafond", "Mouxy", "Tresserve", "Brison-Saint-Innocent", "Savoie"].map(v => (
              <span key={v} className="text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">{v}</span>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles
        slugs={[
          "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
          "comment-obtenir-des-avis-google-pour-son-activite-artisanale",
          "combien-coute-un-site-vitrine-professionnel-en-2025",
        ]}
      />

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à être visible à Aix-les-Bains ?</h2>
          <p className="text-muted-foreground mb-8">Contactez-nous pour un devis gratuit et personnalisé. Réponse sous 48h, sans engagement.</p>
          <a href="/#contact-form" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Demander mon devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Livraison 2-3 semaines</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Devis gratuit sous 48h</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sans engagement</span>
          </div>
        </div>
      </section>
    </div>
  );
}
