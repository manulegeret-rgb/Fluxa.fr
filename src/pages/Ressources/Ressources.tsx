import { useEffect } from "react";

export default function Ressources() {
  // === SEO par route ===
  useEffect(() => {
    document.title = "Ressources — Conseils & Astuces Web | Fluxa";

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
      "Conseils et astuces pour artisans & indépendants : créez une présence en ligne professionnelle et attirez plus de clients grâce à un site vitrine optimisé."
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
            Conseils et astuces pour développer votre présence en ligne — sans jargon technique.
          </p>
        </header>

        {/* Teasers — bénéfices */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Carte 1 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Un site visible sur Google</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Chaque site Fluxa est optimisé SEO dès le départ : balises, structure, vitesse. Vos clients vous trouvent plus facilement.
            </p>
            <div className="mt-4">
              <a href="/#pricing" className="text-primary underline underline-offset-4">
                Voir les formules
              </a>
            </div>
          </div>

          {/* Carte 2 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Design professionnel & responsive</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Votre site s’affiche parfaitement sur mobile, tablette et ordinateur. Un design soigné qui inspire confiance dès le premier regard.
            </p>
            <div className="mt-4">
              <a href="/#comment-ca-marche" className="text-primary underline underline-offset-4">
                Comment ça marche
              </a>
            </div>
          </div>

          {/* Carte 3 */}
          <div className="border rounded-2xl p-6">
            <h3 className="text-lg font-semibold">Livré clé en main en 2-3 semaines</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Maquette, développement, mise en ligne : on s’occupe de tout. Vous validez à chaque étape, sans stress technique.
            </p>
            <div className="mt-4">
              <a href="/#pricing" className="text-primary underline underline-offset-4">
                Obtenir un devis
              </a>
            </div>
          </div>
        </div>

        {/* CTA central */}
        <div className="mt-10 text-center">
          <a href="/#pricing" className="inline-block rounded-xl border px-5 py-3 hover:shadow">
            Demander un devis gratuit — Réponse sous 48h
          </a>
          <p className="text-xs text-muted-foreground mt-2">
            Votre site livré clé en main. Vous restez propriétaire à 100%.
          </p>
        </div>

        {/* Micro-FAQ rassurante */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Faut-il des compétences techniques&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Non. On s’occupe de tout : maquette, développement, mise en ligne. Vous validez, c’est tout.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Je reste propriétaire de mon site&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Oui, à 100%. Le code, le domaine, l’hébergement : tout vous appartient dès la livraison.
            </p>
          </div>
          <div className="border rounded-2xl p-6">
            <h4 className="font-medium">Quand mon site est-il en ligne&nbsp;?</h4>
            <p className="text-sm text-muted-foreground mt-2">
              En général 2 à 3 semaines après validation de la maquette, selon les options choisies.
            </p>
          </div>
        </div>

        {/* Maillage interne light */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a href="/#comment-ca-marche" className="underline underline-offset-4">Comment ça marche</a>
          <a href="/#pricing" className="underline underline-offset-4">Découvrir les formules</a>
          <a href="/#faq" className="underline underline-offset-4">Questions fréquentes</a>
        </div>
      </section>
    </main>
  );
}