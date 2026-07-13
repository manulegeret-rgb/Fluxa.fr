import { useEffect } from "react";
import RelatedArticles from "@/components/RelatedArticles";
import { CheckCircle2, Zap, Shield, Clock, MapPin, ArrowRight } from "lucide-react";

export default function SiteVitrineArtisanChambery() {
  useEffect(() => {
    document.title = "Création site internet artisan Chambéry & Savoie : Fluxa, dès 890€";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Fluxa crée votre site internet professionnel à Chambéry et en Savoie. Artisan, TPE ou indépendant : site responsive, SEO local, hébergement inclus, livré en 2-3 semaines dès 890€.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/creation-site-vitrine-artisan-chambery";

    const ld = { "@context": "https://schema.org", "@type": "Service", "name": "Création site internet artisan Chambéry", "provider": { "@type": "LocalBusiness", "name": "Fluxa", "url": "https://fluxa.fr" }, "areaServed": [
      { "@type": "City", "name": "Chambéry" },
      { "@type": "City", "name": "Cognin" },
      { "@type": "City", "name": "La Motte-Servolex" },
      { "@type": "City", "name": "La Ravoire" },
      { "@type": "City", "name": "Barberaz" },
      { "@type": "City", "name": "Bassens" },
      { "@type": "City", "name": "Challes-les-Eaux" },
      { "@type": "City", "name": "Aix-les-Bains" },
      { "@type": "AdministrativeArea", "name": "Savoie" }
    ], "description": "Création de sites internet professionnels pour artisans à Chambéry, dans l'agglomération et en Savoie.", "offers": { "@type": "Offer", "price": "890", "priceCurrency": "EUR" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" /> Chambéry · Savoie · Cognin
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Création de site internet pour artisans<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> à Chambéry et en Savoie</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Vous êtes artisan, plombier, électricien, paysagiste ou indépendant en Savoie ? Fluxa crée votre site internet professionnel en 2 à 3 semaines, clé en main, dès 890€ tout compris.
          </p>
          <a href="/#contact-form" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 48h · Sans engagement</p>
        </div>
      </section>

      {/* Pourquoi un site internet */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Pourquoi un artisan a besoin d'un site internet en 2026 ?</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            En Savoie comme partout en France, <strong className="text-foreground">85% des clients cherchent un artisan sur Google</strong> avant de décrocher leur téléphone. Si vous n'apparaissez pas en ligne, vous n'existez pas pour eux — peu importe votre réputation locale ou vos années d'expérience.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Un site internet professionnel vous permet d'être trouvé sur Google lorsqu'un habitant de Chambéry, Cognin, Aix-les-Bains ou Albertville cherche votre métier. Il présente vos services, votre zone d'intervention, vos coordonnées, et donne envie au visiteur de vous appeler plutôt que votre concurrent.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Visible sur Google pour vos clients locaux" },
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Crédibilité professionnelle immédiate" },
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Formulaire de contact disponible 24h/24" },
              { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, text: "Présentation de vos réalisations et services" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 p-4">
                <span className="mt-0.5 shrink-0">{item.icon}</span>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qu'on fait */}
      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Ce que Fluxa crée pour vous</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Fluxa est une agence web basée à Cognin, à deux pas de Chambéry. Nous sommes spécialisés dans la création de sites internet pour les artisans et TPE de Savoie. Chaque site est pensé pour votre métier, votre zone géographique, et vos clients potentiels.
          </p>
          <div className="space-y-4">
            {[
              { num: "1", title: "Brief & maquette", text: "Nous commençons par un formulaire de brief pour bien comprendre votre activité, vos clients, votre zone d'intervention. Puis nous créons une maquette visuelle que vous validez avant tout développement." },
              { num: "2", title: "Développement responsive", text: "Votre site est développé avec des technologies modernes : parfait sur mobile, tablette et desktop. Vitesse de chargement optimisée, formulaire de contact fonctionnel, galerie photo si besoin." },
              { num: "3", title: "SEO local Chambéry / Savoie", text: "On optimise votre site pour les recherches locales : votre ville, votre métier, vos zones d'intervention. Balises meta, données structurées, Google Search Console configuré." },
              { num: "4", title: "Mise en ligne clé en main", text: "Hébergement sécurisé, nom de domaine, certificat SSL — on s'occupe de tout. Votre site est en ligne en 2 à 3 semaines, prêt à recevoir vos premiers visiteurs." },
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
          <h2 className="text-3xl font-bold mb-4">Tarif site internet artisan</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Notre formule de base est à <strong className="text-foreground">890€ tout compris</strong> : design responsive, jusqu'à 5 pages, formulaire de contact, optimisation SEO, hébergement et nom de domaine inclus la première année. Paiement en 2 fois sans frais disponible.
          </p>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">890€</p>
                <p className="text-sm text-muted-foreground mt-1">Site internet 5 pages · hébergement + domaine inclus 1ère année</p>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {["Design responsive mobile + desktop", "SEO local optimisé", "Formulaire de contact", "1 round de modifications", "Livraison 2-3 semaines"].map((f, i) => (
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
          <h2 className="text-2xl font-bold mb-4">Notre zone d'intervention autour de Chambéry</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Basés à Cognin (73160), à cinq minutes du centre de Chambéry, nous connaissons bien le tissu artisanal local. Nous créons des sites internet pour les artisans, commerçants et TPE de tout le bassin chambérien et de la Savoie.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { zone: "Chambéry & agglomération", detail: "Chambéry, Cognin, La Motte-Servolex, La Ravoire, Barberaz, Bassens, Challes-les-Eaux : le cœur de notre activité, avec un référencement local pensé pour chaque commune." },
              { zone: "Avant-Pays & Aix-les-Bains", detail: "Aix-les-Bains, Le Bourget-du-Lac, Albertville et l'ensemble de la Savoie : nous nous déplaçons ou travaillons à distance selon votre préférence." },
              { zone: "Au-delà de la Savoie", detail: "Annecy, Grenoble et toute la France : la création d'un site internet se fait très bien à distance, avec des échanges par visio et téléphone." },
            ].map((z, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-4">
                <h3 className="font-semibold text-sm mb-1.5 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary shrink-0" />{z.zone}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{z.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["Chambéry", "Cognin", "La Motte-Servolex", "La Ravoire", "Barberaz", "Bassens", "Challes-les-Eaux", "Aix-les-Bains", "Le Bourget-du-Lac", "Albertville", "Annecy", "Savoie", "France entière"].map(v => (
              <span key={v} className="text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <RelatedArticles
        slugs={[
          "seo-local-artisan-comment-apparaitre-dans-google-maps-et-les-recherches-locales",
          "pourquoi-un-site-vitrine-est-indispensable-pour-un-artisan-en-2025",
          "5-pages-indispensables-pour-un-site-vitrine-artisan-efficace",
        ]}
      />

      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à être visible sur Google ?</h2>
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
