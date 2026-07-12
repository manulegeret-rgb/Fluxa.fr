import { useEffect } from "react";
import { CheckCircle2, Zap, Shield, Clock, Wrench, ArrowRight } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export default function SiteVitrineArtisanPlombier() {
  useEffect(() => {
    document.title = "Création site vitrine plombier : Fluxa, dès 890€ tout compris";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Fluxa crée le site vitrine de votre entreprise de plomberie. Design professionnel, SEO local, formulaire de contact, hébergement inclus. Livré en 2-3 semaines dès 890€.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/creation-site-vitrine-plombier";

    const ld = { "@context": "https://schema.org", "@type": "Service", "name": "Création site vitrine plombier", "provider": { "@type": "LocalBusiness", "name": "Fluxa", "url": "https://fluxa.fr" }, "description": "Création de sites vitrines professionnels pour plombiers.", "offers": { "@type": "Offer", "price": "890", "priceCurrency": "EUR" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full mb-6">
            <Wrench className="w-3.5 h-3.5" /> Spécial plombiers & chauffagistes
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Site vitrine professionnel<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> pour plombier</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Quand un client a une fuite à 22h, il cherche "plombier urgence" sur Google. Si vous n'avez pas de site, il appelle votre concurrent. Fluxa crée votre site vitrine en 2-3 semaines, dès 890€ tout compris.
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
          <h2 className="text-3xl font-bold mb-4">Ce que doit contenir le site d'un plombier</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Un bon site vitrine pour un plombier ne se résume pas à une page avec votre numéro de téléphone. Il doit rassurer le client, montrer votre sérieux, et le pousser à vous appeler plutôt qu'un autre. Voici les éléments indispensables :
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { title: "Vos services détaillés", text: "Plomberie, chauffage, débouchage, urgences — listez précisément ce que vous faites pour correspondre aux recherches Google." },
              { title: "Votre zone d'intervention", text: "Chambéry, Aix-les-Bains, toute la Savoie ? Google doit savoir où vous travaillez pour vous afficher aux bons clients." },
              { title: "Formulaire de contact rapide", text: "Un formulaire simple (nom, téléphone, description) accessible en 2 clics depuis n'importe quelle page." },
              { title: "Photos de vos chantiers", text: "Avant/après, installations récentes : ça prouve votre travail bien mieux qu'un texte." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Chez Fluxa, on connaît les besoins des artisans du bâtiment. On crée votre site en partant de votre activité réelle, pas d'un template générique.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Combien coûte un site vitrine pour un plombier ?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Le prix d'un site vitrine varie énormément selon qui vous contactez. Voici une comparaison honnête :
          </p>
          <div className="rounded-2xl border border-border overflow-hidden mb-8">
            <div className="grid grid-cols-3 text-center text-xs md:text-sm font-semibold border-b border-border bg-card/50">
              <div className="py-3 px-2 text-muted-foreground">Agence classique</div>
              <div className="py-3 px-2 bg-primary/10 text-primary border-x border-primary/30">Fluxa</div>
              <div className="py-3 px-2 text-muted-foreground">Constructeur (Wix...)</div>
            </div>
            <div className="grid grid-cols-3 text-center">
              <div className="py-4 px-2 border-r border-border/50">
                <p className="text-xl font-bold text-muted-foreground/70">3 000–8 000€</p>
                <p className="text-xs text-muted-foreground mt-1">Délai 2-3 mois</p>
              </div>
              <div className="py-4 px-2 bg-primary/5 border-x border-primary/30">
                <p className="text-xl font-bold text-primary">dès 890€</p>
                <p className="text-xs text-primary/80 mt-1">Livré en 2-3 semaines</p>
              </div>
              <div className="py-4 px-2 border-l border-border/50">
                <p className="text-xl font-bold text-muted-foreground/70">Gratuit → 30€/mois</p>
                <p className="text-xs text-muted-foreground mt-1">Peu professionnel</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
            <p className="text-2xl font-bold text-primary mb-1">890€ tout compris</p>
            <p className="text-sm text-muted-foreground mb-4">Formule site vitrine Fluxa — ce qui est inclus :</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["5 pages (Accueil, Services, Galerie, À propos, Contact)", "Design responsive mobile + desktop", "SEO local optimisé pour votre ville", "Formulaire de contact fonctionnel", "Hébergement sécurisé inclus 1ère année", "Nom de domaine inclus 1ère année", "1 round de modifications", "Support technique inclus"].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-primary">✓</span> {f}</li>
              ))}
            </ul>
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

      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Votre site vitrine plombier, livré en 2-3 semaines</h2>
          <p className="text-muted-foreground mb-8">Devis gratuit, sans engagement. On vous répond sous 48h avec une proposition adaptée à votre activité.</p>
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
