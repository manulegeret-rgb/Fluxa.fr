import { useEffect } from "react";
import { CheckCircle2, Zap, Shield, Clock, ArrowRight } from "lucide-react";

export default function SiteVitrineElectricien() {
  useEffect(() => {
    document.title = "Création site vitrine électricien : Fluxa, dès 890€ tout compris";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", "Fluxa crée le site vitrine de votre entreprise d'électricité. SEO local, design professionnel, formulaire de contact, hébergement inclus. Livré en 2-3 semaines dès 890€.");

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://fluxa.fr/creation-site-vitrine-electricien";

    const ld = { "@context": "https://schema.org", "@type": "Service", "name": "Création site vitrine électricien", "provider": { "@type": "LocalBusiness", "name": "Fluxa", "url": "https://fluxa.fr" }, "description": "Création de sites vitrines professionnels pour électriciens.", "offers": { "@type": "Offer", "price": "890", "priceCurrency": "EUR" } };
    const s = document.createElement("script"); s.type = "application/ld+json"; s.setAttribute("data-seo-page", "true"); s.text = JSON.stringify(ld); document.head.appendChild(s);
    return () => document.querySelectorAll('script[data-seo-page]').forEach(e => e.remove());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 md:py-28 bg-gradient-to-b from-[hsl(217_40%_6%)] to-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" /> Spécial électriciens & installateurs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Site vitrine professionnel<br className="hidden md:block" />
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent"> pour électricien</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Vos clients cherchent un électricien qualifié sur Google avant d'appeler. Sans site, vous ratez ces opportunités chaque jour. Fluxa crée votre site vitrine en 2-3 semaines, dès 890€ tout compris.
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
          <h2 className="text-3xl font-bold mb-4">Ce qu'un site vitrine apporte à un électricien</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Un électricien sérieux avec un site professionnel inspire confiance dès le premier regard. Vos certifications, vos interventions (installation électrique, tableau, domotique, bornes de recharge), votre zone d'intervention — tout ça visible en quelques secondes. Le client appelle vous, pas la concurrence.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Afficher vos qualifications", text: "Certification Qualifelec, habilitations — vos clients veulent savoir que vous êtes certifié avant de vous confier leur installation." },
              { title: "Détailler vos interventions", text: "Installation, dépannage, mise aux normes, bornes de recharge VE — chaque service bien décrit améliore votre référencement Google." },
              { title: "Zone d'intervention claire", text: "Indiquez précisément où vous intervenez. Google vous affiche alors aux personnes qui cherchent dans votre secteur." },
              { title: "Contact simple et rapide", text: "Un bouton d'appel direct sur mobile, un formulaire de contact — le client obtient votre numéro en un clic." },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-card/40 p-5">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Notre offre site vitrine pour électricien</h2>
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 mb-6">
            <p className="text-2xl font-bold text-primary mb-1">890€ tout compris</p>
            <p className="text-sm text-muted-foreground mb-4">Tout ce qu'il faut pour être visible et crédible en ligne :</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["5 pages personnalisées à votre activité", "Design soigné et responsive", "SEO local optimisé (votre ville + métier)", "Galerie de réalisations", "Hébergement + domaine inclus 1 an", "Formulaire de contact + appel direct mobile", "Livraison en 2-3 semaines", "Support technique inclus"].map((f, i) => (
                <li key={i} className="flex items-center gap-2"><span className="text-primary">✓</span> {f}</li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">Paiement en 2 fois sans frais · Propriété totale du site · 1 round de modifications inclus</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-[hsl(217_40%_6%)]">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Lancez votre présence en ligne dès maintenant</h2>
          <p className="text-muted-foreground mb-8">Devis gratuit sous 48h, sans engagement. On adapte le site à votre activité et votre zone d'intervention.</p>
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
