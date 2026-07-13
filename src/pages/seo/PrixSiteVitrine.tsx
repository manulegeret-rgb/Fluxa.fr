import { useEffect } from "react";
import RelatedArticles from "@/components/RelatedArticles";
import { CheckCircle2, Zap, Shield, Clock, ArrowRight, HelpCircle } from "lucide-react";

export default function PrixSiteVitrine() {
  useEffect(() => {
    document.title = "Prix site internet 2026 : combien ça coûte vraiment ?";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Agence, freelance ou constructeur : comparatif honnête des prix pour un site internet professionnel en 2026. Fluxa propose la formule complète dès 890€ tout compris.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/prix-site-vitrine-2026";

    const ld = { "@context": "https://schema.org", "@type": "Article", "headline": "Prix site internet 2026 : combien ça coûte vraiment ?", "author": { "@type": "Organization", "name": "Fluxa" }, "publisher": { "@type": "Organization", "name": "Fluxa", "url": "https://fluxa.fr" }, "datePublished": "2026-01-01", "description": "Comparatif honnête des prix pour un site internet professionnel en 2026." };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-6">
            Guide complet · 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Prix d'un site internet en 2026 :<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> combien ça coûte vraiment ?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agence web, freelance, constructeur de site (Wix, WordPress) — les prix varient de 0€ à 10 000€. On vous explique pourquoi, et ce qui est vraiment inclus dans chaque option.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Comparatif des options en 2026</h2>

          {/* Constructeurs */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 mb-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 text-lg">🔧</div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Constructeurs (Wix, Squarespace, WordPress.com)</h3>
                  <span className="text-sm font-bold text-muted-foreground">0€ à 400€/an</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Vous créez le site vous-même. Gratuit en apparence, mais le résultat est souvent peu professionnel, les fonctionnalités avancées sont payantes, et vous passez des heures dessus sans garantie de résultat.</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Peu cher au départ</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ Résultat peu pro</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ Chronophage</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ SEO limité</span>
                </div>
              </div>
            </div>
          </div>

          {/* Freelance */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 mb-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 text-lg">👨‍💻</div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Freelance</h3>
                  <span className="text-sm font-bold text-muted-foreground">1 500€ à 3 000€</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Un développeur ou designer indépendant. Qualité très variable selon les profils. Pas de garantie de disponibilité après livraison, et le suivi peut être aléatoire si le freelance est sur d'autres projets.</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Prix intermédiaire</span>
                  <span className="bg-amber-500/10 text-amber-400 px-2 py-1 rounded-full">~ Qualité variable</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ Suivi incertain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fluxa */}
          <div className="rounded-2xl border-2 border-primary/50 bg-primary/5 p-6 mb-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 text-lg">⚡</div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-primary">Fluxa — Agence spécialisée artisans</h3>
                  <span className="text-sm font-bold text-primary">dès 890€ tout compris</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Spécialisés dans les sites internet pour artisans et TPE, nous proposons un rapport qualité/prix imbattable : design professionnel, SEO local, hébergement et domaine inclus, livraison en 2-3 semaines. Vous payez une fois, vous êtes propriétaire du site.</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Rapport Q/P optimal</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ SEO local inclus</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Livraison 2-3 semaines</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Support après livraison</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grande agence */}
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 text-lg">🏢</div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-semibold text-lg">Grande agence web</h3>
                  <span className="text-sm font-bold text-muted-foreground">3 000€ à 10 000€+</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Pour des projets complexes (e-commerce, applications web, gros sites corporate). Largement surdimensionné pour un site internet d'artisan ou de TPE. Délais souvent longs (2-4 mois) et prix élevés.</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">✓ Haute qualité</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ Prix élevé</span>
                  <span className="bg-red-500/10 text-red-400 px-2 py-1 rounded-full">✗ Délais longs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Ce qui influence le prix d'un site internet</h2>
          <div className="space-y-4">
            {[
              { q: "Le nombre de pages", a: "Un site à 3 pages (accueil, services, contact) coûte moins cher qu'un site à 8 pages. La formule Fluxa inclut jusqu'à 5 pages — largement suffisant pour un artisan ou une TPE." },
              { q: "Le design sur mesure vs template", a: "Un design créé de zéro pour votre activité coûte plus cher qu'un template modifié. Chez Fluxa, on part toujours d'une maquette personnalisée à votre image." },
              { q: "Les fonctionnalités supplémentaires", a: "Galerie photo avancée, prise de RDV en ligne, version multilingue — chaque option a un coût. On vous propose ce dont vous avez vraiment besoin, rien de plus." },
              { q: "L'hébergement et le domaine", a: "Souvent facturés en plus ailleurs. Chez Fluxa, inclus la première année dans les 890€. Renouvellement environ 50-80€/an ensuite." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-primary shrink-0" />{item.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Ce que vous obtenez chez Fluxa pour 890€</h2>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              {[
                "Site internet jusqu'à 5 pages personnalisées",
                "Design responsive mobile + desktop",
                "Maquette validée avant développement",
                "SEO local optimisé (votre ville + métier)",
                "Hébergement sécurisé inclus 1ère année",
                "Nom de domaine inclus 1ère année",
                "Certificat SSL (cadenas sécurisé)",
                "Formulaire de contact fonctionnel",
                "1 round de modifications inclus",
                "Livraison en 2 à 3 semaines",
                "Support technique après livraison",
                "Paiement en 2 fois sans frais",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <RelatedArticles
        slugs={[
          "combien-coute-un-site-vitrine-professionnel-en-2025",
          "hebergement-web-nom-de-domaine-ce-quil-faut-savoir-pour-votre-site",
          "site-vitrine-vs-page-facebook-quelle-difference-pour-votre-activite",
        ]}
      />

      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Obtenez votre devis gratuit</h2>
          <p className="text-muted-foreground mb-8">Décrivez votre activité et vos besoins — on vous répond sous 48h avec un devis précis, sans engagement.</p>
          <a href="/#infos" className="group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition">
            Demander mon devis gratuit
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Livraison 2-3 semaines</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Réponse sous 48h</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sans engagement</span>
          </div>
        </div>
      </section>
    </div>
  );
}
