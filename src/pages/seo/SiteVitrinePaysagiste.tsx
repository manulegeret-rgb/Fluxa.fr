import { useEffect } from "react";
import { CheckCircle2, Zap, Shield, Clock, ArrowRight } from "lucide-react";

export default function SiteVitrinePaysagiste() {
  useEffect(() => {
    document.title = "Création site vitrine paysagiste & jardinier — Fluxa, dès 890€";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Fluxa crée le site vitrine de votre entreprise de paysagisme ou jardinage. Galerie de réalisations, SEO local, hébergement inclus. Livré en 2-3 semaines dès 890€.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/creation-site-vitrine-paysagiste";

    const ld = { "@context": "https://schema.org", "@type": "Service", "name": "Création site vitrine paysagiste", "provider": { "@type": "LocalBusiness", "name": "Fluxa", "url": "https://fluxa.fr" }, "description": "Création de sites vitrines professionnels pour paysagistes et jardiniers.", "offers": { "@type": "Offer", "price": "890", "priceCurrency": "EUR" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
            🌿 Spécial paysagistes & jardiniers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Site vitrine professionnel<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> pour paysagiste</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Votre travail se voit dans les jardins — il doit aussi se voir sur Google. Un site vitrine avec vos réalisations en photos convaincra vos futurs clients bien mieux que le bouche-à-oreille seul. Fluxa le crée en 2-3 semaines, dès 890€.
          </p>
          <a href="/#contact-form" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Réponse sous 48h · Sans engagement</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Pourquoi un paysagiste a besoin d'un site vitrine ?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Le paysagisme est un métier visuel. Vos clients veulent voir vos réalisations avant de vous faire confiance. Un site avec une belle galerie photo de vos chantiers (création de jardins, terrasses, clôtures, entretien) est votre meilleur argument commercial.
          </p>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            De plus, les recherches locales comme <em>"paysagiste Chambéry"</em> ou <em>"entretien jardin Savoie"</em> sont des opportunités directes : des clients qui cherchent exactement ce que vous faites, prêts à vous contacter. Sans site, vous n'apparaissez pas.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Galerie de réalisations", text: "Vos plus beaux jardins, avant/après, créations — la galerie photo est le cœur du site d'un paysagiste." },
              { title: "Liste de vos prestations", text: "Création, entretien, taille, engazonnement, arrosage automatique — chaque prestation listée améliore votre SEO." },
              { title: "Zone d'intervention", text: "Savoie, Chambéry, Aix-les-Bains, alentours — précisez où vous travaillez pour être trouvé localement." },
              { title: "Formulaire de devis rapide", text: "Un formulaire avec description du jardin et coordonnées — vous recevez des demandes de devis qualifiées." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Notre offre pour votre site paysagiste</h2>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <p className="text-2xl font-bold text-primary mb-1">890€ tout compris</p>
            <p className="text-sm text-muted-foreground mb-4">Ce qui est inclus dans votre site vitrine paysagiste :</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["Galerie photo optimisée de vos réalisations", "Pages services (création, entretien, etc.)", "SEO local pour votre ville et vos prestations", "Design responsive mobile + desktop", "Hébergement + domaine inclus 1 an", "Formulaire de demande de devis", "1 round de modifications inclus", "Livraison 2-3 semaines"].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-primary">✓</span> {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Montrez votre travail, trouvez de nouveaux clients</h2>
          <p className="text-muted-foreground mb-8">Un devis gratuit, une réponse sous 48h. On crée votre site vitrine à partir de vos photos et vos services.</p>
          <a href="/#contact-form" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Obtenir mon devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 2-3 semaines</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Réponse sous 48h</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sans engagement</span>
          </div>
        </div>
      </section>
    </div>
  );
}
