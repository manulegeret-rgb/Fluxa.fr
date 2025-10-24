import { useEffect } from "react";

export default function Ressources() {
  // === SEO par route ===
  useEffect(() => {
    document.title = "Ressources — Astuces & Automatisations | Fluxa";

    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    ensureMeta(
      "description",
      "Guides et idées d’automatisations pour artisans & indépendants : gagnez 1h/j sans complexité. Teasers, démo et devis."
    );

    // canonical
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://fluxa.fr/ressources";
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-10 md:pt-14">
      <section className="container mx-auto px-6">
        {/* En-tête */}
        <header className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Ressources</h1>
          <p className="text-muted-foreground mt-3">
            Des conseils concrets pour gagner du temps — sans rentrer dans la technique.
          </p>
        </header>

        {/* Teasers — bénéfices (pas de pas-à-pas) */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Carte 1 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Rappels de RDV automatiques</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Moins d’oublis, planning rempli. Vos clients reçoivent un rappel au bon moment, par SMS ou email.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="/#automations" className="text-primary underline underline-offset-4">
                Voir en démo
              </a>
              <a href="/#pricing" className="text-primary/80 hover:text-primary underline underline-offset-4">
                Obtenir un devis
              </a>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Relances de devis qui convertissent</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Messages polis, personnalisés et espacés intelligemment. Vous restez pro sans courir après les réponses.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="/#automations" className="text-primary underline underline-offset-4">
                Exemple d’envoi
              </a>
              <a href="/#pricing" className="text-primary/80 hover:text-primary underline underline-offset-4">
                Tarifs & mise en place
              </a>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Suivi factures & retards en 1 clic</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Qui a payé ? Qui relancer ? Fluxa vous le dit et pré-remplit le message. Finis les oublis.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <a href="/#automations" className="text-primary underline underline-offset-4">
                Voir le suivi
              </a>
              <a href="/#pricing" className="text-primary/80 hover:text-primary underline underline-offset-4">
                Mettre en place
              </a>
            </div>
          </div>
        </div>

        {/* CTA central */}
        <div className="mt-10 text-center">
          <a href="/#pricing" className="inline-block rounded-xl border px-5 py-3 hover:shadow">
            Démarrer sans complexité — Devis sous 24–48h
          </a>
          <p className="text-xs text-muted-foreground mt-2">
            Installation et réglages faits pour vous. Vous gardez la main, sans y passer des heures.
          </p>
        </div>

        {/* Micro-FAQ rassurante */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Faut-il des compétences techniques&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Non. On s’occupe de la configuration et des réglages. Vous validez, et c’est tout.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Puis-je arrêter facilement&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Oui. Aucune contrainte : vous pouvez suspendre, ajuster ou arrêter à tout moment.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Quand suis-je opérationnel&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              En général sous 48h après validation, selon les modules choisis.
            </p>
          </div>
        </div>

        {/* Maillage interne light */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a href="/#automations" className="underline underline-offset-4">Voir les automatisations</a>
          <a href="/#pricing" className="underline underline-offset-4">Découvrir les formules</a>
          <a href="/#faq" className="underline underline-offset-4">Questions fréquentes</a>
        </div>
      </section>
    </main>
  );
}