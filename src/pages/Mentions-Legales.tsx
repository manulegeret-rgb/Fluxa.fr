import { useEffect } from "react";

export default function MentionsLegales() {
  useEffect(() => {
    document.title = "Mentions légales — Fluxa";
    const desc =
      "Mentions légales du site Fluxa — Application de gestion sur mesure pour artisans et indépendants.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://fluxa.fr/mentions-legales";
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0B1120] text-[#E5E7EB]">
      {/* === Effet visuel global (halo + dégradé) === */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,24,39,0.0),rgba(17,24,39,0.7))]" />
      </div>

      {/* === Contenu principal === */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3B82F6] text-center">
          Mentions légales
        </h1>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">1. Présentation du site internet</h2>
            <p className="mt-4">
              En vertu de l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance
              dans l&apos;économie numérique, il est précisé aux utilisateurs du site{" "}
              <a className="text-[#93C5FD]" href="https://fluxa.fr">
                https://fluxa.fr
              </a>{" "}
              l&apos;identité des différents intervenants :
            </p>
            <p className="mt-4">
              <strong>Propriétaire et éditeur du site :</strong><br />
              Emmanuel Légeret — Particulier<br />
              Ville : Cognin (73160), France<br />
              Adresse e-mail :{" "}
              <a className="text-[#93C5FD]" href="mailto:fluxa.contact@gmail.com">
                fluxa.contact@gmail.com
              </a><br />
              Site édité à titre personnel, sans activité commerciale déclarée.
            </p>
            <p className="mt-4">
              <strong>Responsable de la publication :</strong><br />
              Emmanuel Légeret —{" "}
              <a className="text-[#93C5FD]" href="mailto:fluxa.contact@gmail.com">
                fluxa.contact@gmail.com
              </a>
            </p>
            <p className="mt-4">
              <strong>Webmaster :</strong><br />
              Emmanuel Légeret —{" "}
              <a className="text-[#93C5FD]" href="mailto:fluxa.contact@gmail.com">
                fluxa.contact@gmail.com
              </a>
            </p>
            <p className="mt-4">
              <strong>Hébergeur :</strong><br />
              Vercel Inc.<br />
              340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
              <a className="text-[#93C5FD]" href="https://vercel.com">
                https://vercel.com
              </a>
            </p>
            <p className="mt-4">
              <strong>Tribunal compétent :</strong><br />
              Chambéry (France)
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">2. Conditions d’utilisation</h2>
            <p className="mt-4">
              L’utilisation du site{" "}
              <a className="text-[#93C5FD]" href="https://fluxa.fr">
                https://fluxa.fr
              </a>{" "}
              implique l’acceptation pleine et entière des présentes conditions. Le site est
              normalement accessible à tout moment aux utilisateurs, sauf interruption pour maintenance.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">3. Description des services</h2>
            <p className="mt-4">
              Le site{" "}
              <a className="text-[#93C5FD]" href="https://fluxa.fr">
                https://fluxa.fr
              </a>{" "}
              présente le projet Fluxa, une application web en développement, et permet aux visiteurs
              d’entrer en contact avec son créateur pour obtenir des informations ou une démonstration.
              Le site est géré à titre personnel et ne propose aucun service commercial payant à ce jour.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">4. Données personnelles</h2>
            <p className="mt-4">
              Les données transmises via le formulaire de contact (nom, email, activité, besoin, message, etc.)
              sont utilisées uniquement pour répondre aux messages reçus. Elles sont conservées dans la boîte
              mail de contact pendant un maximum de <strong>12 mois</strong> après le dernier échange.
            </p>
            <p className="mt-2">
              Pour exercer vos droits (accès, rectification, suppression), contactez :
              {" "}
              <a className="text-[#93C5FD]" href="mailto:fluxa.contact@gmail.com">
                fluxa.contact@gmail.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">5. Cookies</h2>
            <p className="mt-4">
              Le site{" "}
              <a className="text-[#93C5FD]" href="https://fluxa.fr">
                https://fluxa.fr
              </a>{" "}
              ne dépose aucun cookie de suivi, publicitaire ou analytique.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#3B82F6]">6. Droit applicable</h2>
            <p className="mt-4">
              Tout litige relatif à l’utilisation du site est soumis au droit français.
              Tribunal compétent : Chambéry (France).
            </p>
          </div>
        </section>

        {/* Petit footer local minimal */}
        <p className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} Fluxa — Emmanuel Légeret. Tous droits réservés.
        </p>
      </div>
    </main>
  );
}