import { useEffect, useMemo, useState } from "react";

type QItem = {
  q: string;
  href: string;        // ancre vers la section
  detail: string;      // petite phrase pour contexte
  tags: string[];      // pour filtrer
};

export default function Articles() {
  // ====== SEO minimal ======
  useEffect(() => {
    document.title =
      "Automatisation & gestion — Guide complet pour artisans, indépendants et PME | Fluxa";
    const desc =
      "Découvrez comment les artisans, indépendants et petites entreprises peuvent automatiser leurs rappels, relances et suivi client avec Fluxa. Gagnez du temps et simplifiez votre gestion quotidienne.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;

    // Scroll automatique vers l’ancre si présente dans l’URL
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

  // ====== Données du menu de questions (extensible à l'infini) ======
  const QUESTIONS: QItem[] = useMemo(
    () => [
      {
        q: "Comment réduire les no-shows avec des rappels SMS ?",
        href: "#rappels-confirmations",
        detail: "Mettre fin aux rendez-vous oubliés grâce à un rappel la veille à 18h.",
        tags: ["rendez-vous", "sms", "automatisation", "agenda"],
      },
      {
        q: "Comment relancer efficacement une facture impayée ?",
        href: "#relances-impayes",
        detail: "Relances automatiques J+7 / J+14 avec lien de paiement.",
        tags: ["facturation", "trésorerie", "paiement", "relance", "automatisation"],
      },
      {
        q: "Que met-on dans un message post-prestation qui fidélise ?",
        href: "#messages-post-prestation",
        detail: "Email de remerciement + lien avis Google pour ancrer la relation.",
        tags: ["fidélisation", "email", "avis", "relation client"],
      },
      {
        q: "Quels indicateurs suivre sur mon tableau de bord ?",
        href: "#tableaux-de-bord",
        detail: "CA, taux de conversion, impayés, taux de présence au RDV, etc.",
        tags: ["tableau de bord", "kpi", "pilotage", "statistiques"],
      },
      {
        q: "Pourquoi un logiciel de gestion quand on est auto-entrepreneur ?",
        href: "#auto-entrepreneur-logiciel",
        detail: "Gains de 6 à 12 h/semaine, conformité et vision claire de l’activité.",
        tags: ["auto-entrepreneur", "micro", "logiciel", "facturation"],
      },
      {
        q: "Comment préparer la facturation électronique sereinement ?",
        href: "#conformite-facturation-electronique",
        detail: "Mentions obligatoires, archivage, exports comptables.",
        tags: ["facturation électronique", "conformité", "archivage", "tva"],
      },
      {
        q: "Combien d’heures puis-je réellement gagner par semaine ?",
        href: "#pourquoi-passer-a-laction",
        detail: "Bénéfices immédiats et charge mentale en baisse.",
        tags: ["productivité", "automatisation", "temps", "organisation"],
      },
      {
        q: "Existe-t-il un exemple concret de mise en place ?",
        href: "#cas-concret",
        detail: "Du désordre à la clarté chez un artisan en rénovation.",
        tags: ["cas concret", "artisan", "workflow", "exemple"],
      },
    ],
    []
  );

  const ALL_TAGS = useMemo(() => {
    const s = new Set<string>();
    QUESTIONS.forEach((i) => i.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [QUESTIONS]);

  // ====== État recherche/filtre ======
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return QUESTIONS.filter((item) => {
      const matchesQuery =
        !query ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.detail.toLowerCase().includes(query.toLowerCase());
      const matchesTags =
        activeTags.length === 0 || activeTags.every((t) => item.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [QUESTIONS, query, activeTags]);

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* ======== INTRO ======== */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Automatisation & gestion : le guide complet pour artisans, indépendants et PME
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Le monde change, les outils aussi. Ce guide vous montre comment les professionnels
            indépendants peuvent simplifier leur gestion, automatiser leurs tâches répétitives
            et reprendre le contrôle sur leur temps, sans changer leur façon de travailler.
          </p>
        </header>

        {/* ======== MENU QUESTIONS (recherche + tags) ======== */}
        <section className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Questions fréquentes — Articles & sections
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Tapez un mot-clé (ex. <em>auto-entrepreneur</em>, <em>facture</em>,{" "}
              <em>rendez-vous</em>) ou filtrez par tag. Cliquez sur une question pour vous rendre
              directement à la réponse dans la page.
            </p>

            {/* Barre de recherche */}
            <div className="mt-5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une question…"
                className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filtres tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    activeTags.includes(t)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="px-3 py-1 rounded-full text-sm border bg-background border-border/60 text-muted-foreground hover:text-foreground"
                >
                  Réinitialiser filtres
                </button>
              )}
            </div>

            {/* Liste des questions filtrées */}
            <div className="mt-6 grid md:grid-cols-2 gap-3">
              {filtered.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group rounded-xl border border-border/60 bg-background/50 p-4 hover:bg-background/80 transition"
                >
                  <p className="font-medium leading-snug group-hover:underline">{item.q}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 border border-border/60 rounded-full text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-sm text-muted-foreground">
                  Aucun résultat. Essayez d’autres mots-clés.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======== SECTION 1 : LA RÉALITÉ DU QUOTIDIEN ======== */}
        <section id="realite-quotidien" className="space-y-6">
          <h2 className="text-3xl font-semibold">
            1. Le quotidien des indépendants : efficacité freinée, charge mentale augmentée
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Être à son compte, c’est porter plusieurs casquettes : gérer les clients, produire,
            facturer, communiquer, suivre les paiements, répondre aux messages…
            Une seule journée suffit pour jongler entre mille tâches, souvent administratives, rarement passionnantes.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Beaucoup d’artisans et de petites entreprises perdent chaque semaine entre{" "}
            <strong>4 et 8 heures</strong> à gérer des rappels, des devis, des factures et des relances manuelles.
            Le problème, c’est que ces actions ne créent pas de valeur directe, mais elles sont indispensables
            au bon fonctionnement de l’activité.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            À mesure que l’activité se développe, cette organisation “papier + mémoire” atteint ses limites :
            oublis de rendez-vous, erreurs dans la facturation, retards de paiement, ou encore clients perdus faute de suivi.
          </p>
          <h3 className="text-2xl font-semibold pt-4">📉 Des pertes invisibles mais réelles</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Des rendez-vous annulés faute de rappel.</li>
            <li>Des factures impayées faute de relance automatique.</li>
            <li>Des clients oubliés faute de suivi structuré.</li>
            <li>Des heures perdues à rechercher une information ou un message.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Ces “micro-fuites” finissent par coûter cher, financièrement comme mentalement.
            C’est précisément là que la notion d’automatisation prend tout son sens.
          </p>
        </section>

        {/* ======== SECTION 2 : L'AUTOMATISATION EXPLIQUÉE ======== */}
        <section id="automatisation-expliquee" className="space-y-6">
          <h2 className="text-3xl font-semibold">
            2. L’automatisation : une approche moderne, simple et humaine
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Contrairement à ce que beaucoup imaginent, l’automatisation ne déshumanise pas la relation client.
            Bien au contraire : elle la rend plus fluide, plus régulière et plus professionnelle.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Automatiser, c’est déléguer à un système ce qui peut être fait de manière répétitive,
            pour vous permettre de rester concentré sur votre métier.
            Un SMS de rappel envoyé automatiquement la veille d’un rendez-vous, une facture générée
            dès le paiement reçu, ou encore un mail de remerciement programmé après une prestation —
            autant de gestes simples qui, cumulés, transforment l’expérience de vos clients.
          </p>
          <h3 className="text-2xl font-semibold pt-4">💡 Ce que l’automatisation n’est pas</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Ce n’est pas une robotisation : vous gardez le contrôle sur le ton, le moment et le contenu.</li>
            <li>Ce n’est pas réservé aux grandes entreprises : les indépendants peuvent y accéder facilement.</li>
            <li>Ce n’est pas une usine à gaz technique : les automatisations modernes sont simples et visuelles.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            En résumé, l’automatisation ne remplace pas votre savoir-faire, elle le met en valeur.
            Elle prend le relais sur la logistique pour que votre temps soit consacré à l’essentiel :
            votre service, votre relation client et votre croissance.
          </p>
        </section>

        {/* ======== SECTION 3 : POURQUOI PASSER À L'ACTION ======== */}
        <section id="pourquoi-passer-a-laction" className="space-y-6">
          <h2 className="text-3xl font-semibold">
            3. Pourquoi l’automatisation devient indispensable pour les petites structures
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            En 2025, les clients attendent de la réactivité, de la clarté et du suivi.
            Les grandes entreprises disposent déjà d’outils intégrés.
            Pour les artisans, indépendants et PME, les solutions comme Fluxa permettent enfin d’accéder
            à la même efficacité, sans infrastructure lourde ni abonnement complexe.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Passer à une gestion automatisée, c’est investir dans une meilleure expérience client
            et une meilleure qualité de vie professionnelle.
            C’est accepter que votre temps a de la valeur, et que le digital peut vous aider à en gagner.
          </p>
          <h3 className="text-2xl font-semibold pt-4">🚀 Les bénéfices immédiats</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Un agenda toujours à jour, sans rappels manuels.</li>
            <li>Des relances automatiques pour améliorer les paiements.</li>
            <li>Une visibilité en temps réel sur votre chiffre d’affaires.</li>
            <li>Moins de stress, plus de sérénité dans la gestion quotidienne.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            L’automatisation n’est pas un luxe technologique, mais une évolution naturelle de la gestion moderne.
            Et c’est précisément ce que Fluxa met à portée de tous les indépendants.
          </p>
        </section>

        {/* ======== SECTION 4 : DOMAINES CLÉS DE L’AUTOMATISATION ======== */}
        <section className="space-y-10">
          <h2 className="text-3xl font-semibold">
            4. Les domaines où l’automatisation change tout
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            L’automatisation ne se résume pas à envoyer un SMS ou un e-mail automatique.
            Elle s’intègre dans un ensemble de processus qui assurent la continuité, la rigueur
            et la qualité du suivi client. Voici les principaux domaines où elle apporte une vraie valeur ajoutée.
          </p>

          {/* --- Sous-section 1 --- */}
          <div id="rappels-confirmations" className="space-y-3 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-foreground">
              🔔 Rappels & confirmations de rendez-vous
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Combien de fois un client oublie-t-il un rendez-vous fixé depuis deux semaines ?
              Les rappels manuels sont chronophages et souvent oubliés.
              Une automatisation bien paramétrée envoie un SMS la veille à 18h avec le prénom du client,
              la date et l’heure du rendez-vous, ainsi qu’un lien pour confirmer, déplacer ou annuler.
              Résultat : un <strong>taux de présence en hausse</strong> et un <strong>agenda enfin fiable</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Ce type de scénario est aujourd’hui incontournable pour tout artisan ou entrepreneur de service
              qui veut réduire les “no-shows” et fluidifier son planning.
            </p>
          </div>

          {/* --- Sous-section 2 --- */}
          <div id="relances-impayes" className="space-y-3 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-foreground">
              💰 Relances de factures impayées
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Les retards de paiement pèsent sur la trésorerie et l’énergie des petites entreprises.
              Pourtant, la majorité des impayés ne sont pas liés à la mauvaise foi,
              mais à l’oubli ou à la désorganisation.
              Une relance automatique, polie et professionnelle à J+7, puis J+14, suffit souvent à débloquer la situation.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Avec Fluxa, chaque relance contient un lien sécurisé vers le paiement,
              et s’arrête automatiquement dès que le règlement est reçu.
              Fini les oublis, les doubles relances, ou les heures passées à suivre les virements.
              Vous améliorez vos encaissements tout en gardant une relation client saine.
            </p>
          </div>

          {/* --- Sous-section 3 --- */}
          <div id="messages-post-prestation" className="space-y-3 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-foreground">
              💬 Fidélisation et messages post-prestation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Une fois la prestation terminée, le contact client ne doit pas s’arrêter là.
              Un e-mail de remerciement ou un message de suivi envoyé automatiquement le soir même
              montre votre sérieux et entretient la relation.
              Il peut inclure des conseils, un rappel des prochaines étapes ou un lien vers votre page d’avis Google.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cette attention renforce la confiance, augmente le taux d’avis positifs,
              et crée un cercle vertueux de bouche-à-oreille.
              L’automatisation devient ici un outil de fidélisation naturelle, sans effort quotidien.
            </p>
          </div>

          {/* --- Sous-section 4 --- */}
          <div id="tableaux-de-bord" className="space-y-3 scroll-mt-24">
            <h3 className="text-2xl font-semibold text-foreground">
              📊 Tableaux de bord & statistiques
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Beaucoup de professionnels travaillent sans vision claire de leurs chiffres :
              combien de nouveaux clients ce mois-ci ? Quel chiffre d’affaires ? Combien d’impayés ?
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fluxa automatise la remontée des données pour vous envoyer chaque lundi matin un
              <strong>rapport d’activité complet</strong> :
              nouveaux clients, rendez-vous effectués, taux de présence, encaissements, et comparatif avec la semaine précédente.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Cet aperçu rapide vous permet de piloter votre entreprise comme un pro,
              sans passer des heures sur Excel ou sur un tableau de suivi manuel.
            </p>
          </div>
        </section>

        {/* ======== SECTION 5 : FLUXA COMME SOLUTION ======== */}
        <section id="fluxa-solution" className="space-y-6">
          <h2 className="text-3xl font-semibold">
            5. Fluxa : l’assistant digital sur mesure des indépendants
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Fluxa n’est pas un outil standard ou une plateforme complexe.
            C’est une <strong>solution sur mesure</strong>, pensée pour s’adapter à votre métier,
            vos habitudes et vos priorités.
            Chaque interface est configurée individuellement pour simplifier votre quotidien,
            tout en intégrant vos couleurs, votre logo et votre organisation.
          </p>
          <h3 className="text-2xl font-semibold pt-4">⚙️ Une mise en place accompagnée</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Diagnostic initial pour comprendre votre fonctionnement et vos besoins.</li>
            <li>Création de votre interface personnalisée (agenda, devis, factures, rappels).</li>
            <li>Activation des automatisations adaptées à votre métier.</li>
            <li>Formation express à la prise en main (souvent en moins d’1h).</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Vous ne perdez pas de temps à “apprendre un logiciel” :
            Fluxa s’adapte à vous, pas l’inverse.
          </p>
        </section>

        {/* ======== SECTION 6 : CAS CONCRET ======== */}
        <section id="cas-concret" className="space-y-6">
          <h2 className="text-3xl font-semibold">6. Cas concret : du désordre à la clarté</h2>
          <p className="text-muted-foreground leading-relaxed">
            Prenons l’exemple d’un artisan en rénovation.
            Chaque semaine, il gère entre 15 et 25 chantiers, des devis à envoyer,
            des acomptes à suivre et des clients à rappeler.
            Avant Fluxa, tout passait par le téléphone, les SMS et quelques fichiers Excel.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Après la mise en place de Fluxa :
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Les clients reçoivent automatiquement un rappel la veille de chaque visite.</li>
            <li>Les factures se génèrent dès qu’un paiement est enregistré.</li>
            <li>Les impayés sont relancés à J+7 sans intervention manuelle.</li>
            <li>Un rapport hebdomadaire synthétise l’activité en un coup d’œil.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Résultat : moins de stress, plus de rigueur, et une image plus professionnelle.
            L’artisan ne passe plus ses soirées à “faire de l’administratif”,
            mais à planifier, se reposer ou développer son activité.
          </p>
        </section>

        {/* ======== SECTION 7 : CONCLUSION ======== */}
        <section id="conclusion" className="space-y-6">
          <h2 className="text-3xl font-semibold">7. Conclusion : reprendre le contrôle</h2>
          <p className="text-muted-foreground leading-relaxed">
            Gérer une entreprise indépendante, c’est une aventure exigeante.
            Les clients, les devis, les factures, les messages… tout compte.
            L’automatisation n’est pas là pour remplacer votre savoir-faire, mais pour le protéger :
            elle vous redonne du temps, de la clarté et de la sérénité.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Avec Fluxa, chaque tâche répétitive devient un processus fluide.
            Vous gagnez du temps, vous renforcez votre image de pro,
            et vous offrez à vos clients une expérience simple, moderne et réactive.
          </p>
        </section>

        {/* ======== SECTION 8 : AUTO-ENTREPRENEUR & LOGICIEL DE GESTION ======== */}
        <section id="auto-entrepreneur-logiciel" className="space-y-10 border-t border-border/60 pt-16">
          <h2 className="text-4xl font-bold text-center">
            Pourquoi utiliser un logiciel de gestion quand on est auto-entrepreneur ?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto text-center">
            La micro-entreprise se gagne au temps, à la rigueur et au suivi. Un{" "}
            <strong>logiciel de gestion auto-entrepreneur</strong> transforme vos tâches
            répétitives en process fluides : vous travaillez moins « dans » l’administratif
            et davantage « sur » votre activité.
          </p>

          <div className="space-y-3">
            <h3 id="conformite-facturation-electronique" className="text-2xl font-semibold scroll-mt-24">
              1) Un gain de temps massif
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Automatisation des devis/factures, enregistrement des paiements, édition du livre de comptes,
              rappels de RDV et relances : les indépendants constatent couramment un gain de
              <strong> 6 à 12 h/semaine</strong> sur l’administratif. Sur un mois, cela représente
              <strong> 24 à 48 h</strong> récupérées pour produire, vendre et prospecter.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">2) Moins d’erreurs, plus de sérénité</h3>
            <p className="text-muted-foreground leading-relaxed">
              Mentions légales à jour, numérotation correcte, cohérence des totaux, alertes seuils de TVA ou de CA :
              le logiciel verrouille les points sensibles et réduit les risques de pénalités.
              Vous gagnez en sérénité et en crédibilité auprès des clients comme des organismes.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">3) Vision pilotage claire</h3>
            <p className="text-muted-foreground leading-relaxed">
              Tableau de bord CA mensuel/annuel, taux de conversion des devis, encaissements/impayés,
              activité par client/prestation. Cette lecture immédiate aide à ajuster vos prix, prioriser vos actions
              et prévoir vos charges.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">4) Conformité & facturation électronique</h3>
            <p className="text-muted-foreground leading-relaxed">
              La transition vers la <strong>facturation électronique</strong> s’accélère. Un outil à jour vous prépare :
              mentions obligatoires, archivage sécurisé, export comptable, journal d’écritures. Vous anticipez sereinement
              les évolutions au lieu de les subir.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">5) Tout-en-un, prêt à évoluer</h3>
            <p className="text-muted-foreground leading-relaxed">
              Remplacez la pile d’outils épars par un hub unique : clients, devis, factures, rappels, relances, stats.
              Vous commencez simple puis activez des modules (TVA, CRM léger, paiements en ligne, recouvrement)
              au rythme de votre croissance.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">6) Impact direct sur le chiffre</h3>
            <p className="text-muted-foreground leading-relaxed">
              En réduisant le « non-productif » et les no-shows, en accélérant les encaissements et en améliorant
              la conversion des devis, le logiciel crée un effet ciseau : moins de pertes invisibles, plus de revenus visibles.
              Le ROI est souvent atteint en quelques mois seulement.
            </p>
          </div>

          <p className="text-center text-muted-foreground pt-2">
            En bref : adopter un <strong>logiciel de gestion auto-entrepreneur</strong>, c’est gagner du temps,
            fiabiliser la gestion et se donner les moyens d’une croissance durable — sans complexité.
          </p>
        </section>

        {/* ======== CTA FINAL (CONSERVÉ, UNIQUE) ======== */}
        <section className="text-center space-y-4 pt-10 border-t border-border/60">
          <h3 className="text-2xl font-semibold">Prêt à franchir le cap ?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez concrètement comment Fluxa peut adapter ses automatisations à votre métier.
            En quelques jours, vous pouvez transformer votre organisation et retrouver du temps pour ce qui compte.
          </p>
          <a
            href="/#automations"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Découvrir Fluxa
          </a>
        </section>
      </div>
    </main>
  );
}