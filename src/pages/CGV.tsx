import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";

export default function CGV() {
  return (
    <main className="relative min-h-screen bg-[#0B1120] text-[#E5E7EB]">
      <PageSEO
        title="Conditions Générales de Vente — Fluxa"
        description="Conditions générales de vente de Fluxa — Création de sites web professionnels. Emmanuel Légeret, Entrepreneur Individuel, Cognin (73160)."
        canonicalPath="/cgv"
        noindex={false}
      />

      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />

      {/* Effets visuels */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 -top-32 h-64 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(17,24,39,0.0),rgba(17,24,39,0.7))]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-20 pb-12 mt-24">
        <h1 className="text-3xl font-bold text-white mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-gray-400 mb-10">En vigueur au 19 mars 2026</p>

        {/* Article 1 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 1 — Objet</h2>
          <p className="text-gray-300 leading-relaxed">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
            Emmanuel Légeret, exerçant sous l'enseigne <strong className="text-white">Fluxa</strong>,
            Entrepreneur Individuel immatriculé sous le SIRET 83014496000044, dont le siège est situé
            36 rue des Criquets, 73160 Cognin (<em>ci-après « le Prestataire »</em>), et tout client
            professionnel ou particulier souhaitant bénéficier des services de création de sites web
            (<em>ci-après « le Client »</em>).
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Toute commande implique l'acceptation sans réserve des présentes CGV.
          </p>
        </section>

        {/* Article 2 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 2 — Services proposés</h2>
          <p className="text-gray-300 leading-relaxed">
            Fluxa propose des prestations de création de sites web professionnels (sites vitrines, sites
            de présentation), incluant la conception, le développement, l'intégration de contenu fourni
            par le Client, ainsi que l'hébergement et le nom de domaine pour la première année.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le détail de chaque prestation est précisé dans le devis accepté par le Client, qui constitue
            l'annexe contractuelle.
          </p>
        </section>

        {/* Article 3 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 3 — Tarifs</h2>
          <p className="text-gray-300 leading-relaxed">
            Les prix sont exprimés en euros TTC. TVA non applicable — Article 293 B du Code Général des Impôts.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Les tarifs en vigueur sont indiqués sur le site <strong className="text-white">fluxa.fr</strong>.
            Un devis personnalisé est établi pour chaque projet et reste valable <strong className="text-white">30 jours</strong> à
            compter de sa date d'émission.
          </p>
        </section>

        {/* Article 4 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 4 — Modalités de paiement</h2>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-none">
            <li>▸ <strong className="text-white">Acompte de 50 %</strong> du montant total TTC, exigible à la signature du devis et avant tout démarrage de la prestation.</li>
            <li>▸ <strong className="text-white">Solde de 50 %</strong> exigible à la livraison du site, avant mise en ligne.</li>
            <li>▸ Règlement par <strong className="text-white">virement bancaire</strong> uniquement, selon les coordonnées figurant sur la facture.</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            Tout retard de paiement entraîne l'application de pénalités au taux d'intérêt légal en vigueur,
            ainsi qu'une indemnité forfaitaire de recouvrement de <strong className="text-white">40 €</strong>,
            conformément à l'article L.441-10 du Code de commerce.
          </p>
        </section>

        {/* Article 5 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 5 — Délais de réalisation</h2>
          <p className="text-gray-300 leading-relaxed">
            Le délai de réalisation est précisé dans le devis. Il prend effet à compter de la réception
            de l'acompte <strong className="text-white">et</strong> de la transmission par le Client de
            l'ensemble des éléments nécessaires (textes, images, logo, informations).
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le Prestataire ne saurait être tenu responsable de tout retard résultant d'un manque de
            réactivité ou d'un envoi tardif des éléments par le Client.
          </p>
        </section>

        {/* Article 6 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 6 — Révisions et modifications</h2>
          <p className="text-gray-300 leading-relaxed">
            Chaque prestation inclut <strong className="text-white">jusqu'à 3 sessions de révisions</strong>.
            Au-delà, toute modification fera l'objet d'un avenant tarifaire soumis à l'accord du Client.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le Client s'engage à valider chaque livrable intermédiaire dans un délai de
            <strong className="text-white"> 7 jours ouvrés</strong>. Passé ce délai sans retour, le livrable
            est considéré comme accepté.
          </p>
        </section>

        {/* Article 7 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 7 — Hébergement et nom de domaine</h2>
          <p className="text-gray-300 leading-relaxed">
            L'hébergement et le nom de domaine sont inclus dans la prestation pour la
            <strong className="text-white"> première année</strong>. À partir de la deuxième année,
            leur renouvellement est à la charge du Client, selon les tarifs du prestataire d'hébergement.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            En cas de non-renouvellement, le Client reste propriétaire de son site et peut le transférer
            vers un autre hébergeur à ses frais.
          </p>
        </section>

        {/* Article 8 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 8 — Propriété intellectuelle</h2>
          <p className="text-gray-300 leading-relaxed">
            Les droits d'utilisation du site livré sont intégralement transférés au Client après
            <strong className="text-white"> paiement complet</strong> de la prestation.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le Client garantit être titulaire des droits sur l'ensemble des contenus (textes, images,
            logo, vidéos) qu'il transmet au Prestataire. Toute réclamation d'un tiers relative à ces
            contenus ne pourra être imputée au Prestataire.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le Prestataire se réserve le droit de mentionner la réalisation dans son portfolio,
            sauf opposition explicite du Client.
          </p>
        </section>

        {/* Article 9 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 9 — Obligations du Client</h2>
          <p className="text-gray-300 leading-relaxed">
            Le Client s'engage à :
          </p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-none mt-3">
            <li>▸ Fournir dans les meilleurs délais tous les éléments nécessaires à la réalisation de la prestation.</li>
            <li>▸ Valider les livrables dans les délais convenus.</li>
            <li>▸ Garantir la légalité des contenus transmis au Prestataire.</li>
            <li>▸ Régler les sommes dues aux échéances prévues.</li>
          </ul>
        </section>

        {/* Article 10 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 10 — Responsabilité</h2>
          <p className="text-gray-300 leading-relaxed">
            Le Prestataire s'engage à apporter tout le soin nécessaire à la réalisation de la prestation.
            Sa responsabilité ne saurait être engagée en cas de :
          </p>
          <ul className="text-gray-300 leading-relaxed space-y-2 list-none mt-3">
            <li>▸ Retard dû à un défaut de transmission des éléments par le Client.</li>
            <li>▸ Dommages indirects ou perte de chiffre d'affaires du Client.</li>
            <li>▸ Interruption de service liée à l'hébergeur ou à un tiers.</li>
          </ul>
        </section>

        {/* Article 11 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 11 — Droit de rétractation</h2>
          <p className="text-gray-300 leading-relaxed">
            Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne
            peut être exercé pour les prestations de services pleinement exécutées avant la fin du délai
            de rétractation et dont l'exécution a commencé avec l'accord du consommateur.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Le versement de l'acompte et le démarrage de la prestation valent accord exprès du Client
            pour la renonciation au droit de rétractation.
          </p>
        </section>

        {/* Article 12 */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Article 12 — Loi applicable et litiges</h2>
          <p className="text-gray-300 leading-relaxed">
            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable
            sera recherchée en priorité. À défaut, les tribunaux compétents du ressort du siège du
            Prestataire seront seuls compétents.
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            Conformément aux articles L.611-1 et suivants du Code de la consommation, le Client
            consommateur peut recourir gratuitement au service de médiation de la consommation.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8 border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold text-blue-400 mb-3">Contact</h2>
          <p className="text-gray-300 leading-relaxed">
            Emmanuel Légeret — Fluxa<br />
            36 rue des Criquets, 73160 Cognin<br />
            SIRET : 83014496000044<br />
            Email : <a href="mailto:fluxa.contact@gmail.com" className="text-blue-400 hover:underline">fluxa.contact@gmail.com</a><br />
            Site : <a href="https://www.fluxa.fr" className="text-blue-400 hover:underline">www.fluxa.fr</a>
          </p>
        </section>
      </div>
    </main>
  );
}
