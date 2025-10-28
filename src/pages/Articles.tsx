import { useEffect, useMemo, useState } from "react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";

/** =========================
 *  TYPO & UX PRESETS
 *  ========================= */
const T = {
  h1: "text-4xl md:text-5xl font-extrabold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold leading-snug",
  overline: "uppercase tracking-wider text-xs md:text-sm text-muted-foreground",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed",
  small: "text-sm text-muted-foreground",
  kpi: "text-4xl md:text-5xl font-bold text-primary",
  card: "rounded-2xl border border-border/60 bg-card/40",
  section: "space-y-6 scroll-mt-24",
};

type QItem = {
  q: string;
  href: string;
  detail: string;
  tags: string[];
};

export default function Articles() {
  // ===== Scroll vers ancre si hash présent =====
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

  // ===== Données du menu interactif =====
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
        q: "Que mettre dans un message post-prestation qui fidélise ?",
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
        detail: "Gains de 6 à 12 h/sem., conformité et vision claire de l’activité.",
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

  // ===== États =====
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
    {/* SEO optimisé pour cette page */}
    <PageSEO
      title="Outil d'Automatisation Entreprise — Guide Complet pour Artisans et PME | Fluxa"
      description="Guide complet sur l'automatisation des tâches et la gestion d'entreprise pour artisans et PME. Découvrez notre outil d'automatisation entreprise pour automatiser rappels, relances, facturation et gagner du temps au quotidien."
      canonicalPath="/articles"
      keywords={[
        "outil d'automatisation entreprise",
        "automatisation tâches entreprise",
        "automatisation gestion entreprise",
        "automatisation PME",
        "automatisation artisan",
        "automatisation gestion artisan",
        "logiciel gestion indépendant",
        "rappels automatiques SMS",
        "relances factures impayées",
        "tableau de bord artisan",
        "outil gestion TPE",
        "facturation automatique",
        "gestion clients automatisée",
      ]}
      breadcrumb={[
        { name: "Accueil", url: "/" },
        { name: "Articles & Guides", url: "/articles" },
      ]}
    />

    <HomeLogoOverlay
      logoSrc="/logo transparent.png"
      href="/"
      size={110}
      topInsteadOfCenter={true}
      hideOnDesktop={false}
    />
      <article className="max-w-4xl mx-auto space-y-20 mt-20">
        {/* === INTRO === */}
        <header className="text-center space-y-6">
          <p className={T.overline}>Guide complet</p>
          <h1 className={T.h1}>
            Automatisation & gestion : le guide complet pour artisans, indépendants et PME
          </h1>
          <p className={`${T.p} italic max-w-2xl mx-auto`}>
            Découvrez comment l'automatisation des tâches entreprise transforme le quotidien des artisans et PME. 
            Ce guide complet vous montre comment automatiser la gestion de votre entreprise,
            réduire les tâches répétitives et reprendre le contrôle de votre temps avec notre outil d'automatisation.
          </p>
        </header>

        {/* === ENCART ARTICLE RECOMMANDÉ === */}
        <section className={`${T.card} p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔥</span>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
                📊 Ressource Recommandée
              </p>
              <h3 className="text-lg md:text-xl font-semibold leading-snug mb-1">
                Combien Perdez-Vous Vraiment Avec la Gestion Manuelle ?
              </h3>
              <p className="text-sm text-muted-foreground">
                Découvrez notre étude complète 2025 avec <strong>calculateur ROI interactif</strong> et
                <strong> 150+ automatisations détaillées</strong>. Quantifiez vos pertes actuelles en temps et argent,
                et découvrez combien vous pourriez gagner.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <a
                  href="/guide-complet-roi-automatisation-artisans"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Voir l'Étude Complète + Calculateur ROI
                </a>
                <div className="flex gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    Calculateur ROI
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    150+ Automatisations
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                    Études de Cas Réels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === MENU INTERACTIF === */}
        <section className="space-y-6">
          <div className={`${T.card} p-4`}>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">Sommaire interactif</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Tapez un mot-clé (ex. <em>auto-entrepreneur</em>, <em>facture</em>, <em>rendez-vous</em>)
              ou filtrez par tag. Cliquez sur une question pour accéder à la réponse.
            </p>

            <div className="mt-5">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une question…"
                className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

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

            <div className="mt-6 grid md:grid-cols-2 gap-2">
              {filtered.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="group rounded-xl border border-border/60 bg-background/50 p-3 hover:bg-background/80 transition"
                >
                  <p className="font-medium text-sm leading-snug group-hover:underline">{item.q}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* === SECTION 1 === */}
        <section id="realite-quotidien" className={T.section}>
          <h2 className={T.h2}>1. Le quotidien des indépendants : efficacité freinée, charge mentale augmentée</h2>
          <p className={T.p}>
            Être à son compte, c’est porter plusieurs casquettes : gérer les clients, produire,
            facturer, communiquer, suivre les paiements, répondre aux messages… Une seule journée
            suffit pour jongler entre mille tâches, souvent administratives, rarement passionnantes.
          </p>
          <p className={T.p}>
            Beaucoup d’artisans et de petites entreprises perdent chaque semaine entre{" "}
            <strong>4 et 8 heures</strong> à gérer des rappels, des devis, des factures et des relances manuelles.
            Le problème, c’est que ces actions ne créent pas de valeur directe, mais elles sont indispensables
            au bon fonctionnement de l’activité.
          </p>
          <p className={T.p}>
            À mesure que l’activité se développe, cette organisation “papier + mémoire” atteint ses limites :
            oublis de rendez-vous, erreurs dans la facturation, retards de paiement, ou encore clients perdus faute de suivi.
          </p>
          <h3 className={`${T.h3} italic pt-2`}>Des pertes invisibles mais réelles</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Des rendez-vous annulés faute de rappel.</li>
            <li>Des factures impayées faute de relance automatique.</li>
            <li>Des clients oubliés faute de suivi structuré.</li>
            <li>Des heures perdues à rechercher une information ou un message.</li>
          </ul>
          <p className={`${T.p} italic`}>
            Ces “micro-fuites” finissent par coûter cher, financièrement comme mentalement.
          </p>
        </section>

        {/* === SECTION 2 === */}
        <section id="automatisation-expliquee" className={T.section}>
          <h2 className={T.h2}>2. L’automatisation : une approche moderne, simple et humaine</h2>
          <p className={T.p}>
            Contrairement à ce que beaucoup imaginent, l’automatisation ne déshumanise pas la relation client.
            Bien au contraire : elle la rend plus fluide, plus régulière et plus professionnelle.
          </p>
          <p className={T.p}>
            Automatiser, c’est déléguer à un système ce qui peut être fait de manière répétitive,
            pour vous permettre de rester concentré sur votre métier.  
            Un SMS de rappel envoyé automatiquement la veille d’un rendez-vous, une facture générée
            dès le paiement reçu, ou encore un mail de remerciement programmé après une prestation —
            autant de gestes simples qui, cumulés, transforment l’expérience de vos clients.
          </p>
          <h3 className={T.h3}>Ce que l’automatisation n’est pas</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Ce n’est pas une robotisation : vous gardez le contrôle sur le ton, le moment et le contenu.</li>
            <li>Ce n’est pas réservé aux grandes entreprises : les indépendants peuvent y accéder facilement.</li>
            <li>Ce n’est pas une usine à gaz technique : les automatisations modernes sont simples et visuelles.</li>
          </ul>
          <p className={T.p}>
            En résumé, l’automatisation ne remplace pas votre savoir-faire, elle le met en valeur.
            Elle prend le relais sur la logistique pour que votre temps soit consacré à l’essentiel :
            votre service, votre relation client et votre croissance.
          </p>
        </section>

        {/* === SECTION 3 === */}
        <section id="pourquoi-passer-a-laction" className={T.section}>
          <h2 className={T.h2}>3. Pourquoi l’automatisation devient indispensable pour les petites structures</h2>
          <p className={T.p}>
            En 2025, les clients attendent de la réactivité, de la clarté et du suivi.  
            Les grandes entreprises disposent déjà d’outils intégrés.  
            Pour les artisans, indépendants et PME, les solutions comme Fluxa permettent enfin d’accéder
            à la même efficacité, sans infrastructure lourde ni abonnement complexe.
          </p>
          <p className={T.p}>
            Passer à une gestion automatisée, c’est investir dans une meilleure expérience client
            et une meilleure qualité de vie professionnelle.  
            C’est accepter que votre temps a de la valeur, et que le digital peut vous aider à en gagner.
          </p>
          <h3 className={T.h3}>Les bénéfices immédiats</h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Un agenda toujours à jour, sans rappels manuels.</li>
            <li>Des relances automatiques pour améliorer les paiements.</li>
            <li>Une visibilité en temps réel sur votre chiffre d’affaires.</li>
            <li>Moins de stress, plus de sérénité dans la gestion quotidienne.</li>
          </ul>
          <p className={T.p}>
            L’automatisation n’est pas un luxe technologique, mais une évolution naturelle de la gestion moderne.
            Et c’est précisément ce que Fluxa met à portée de tous les indépendants.
          </p>
        </section>        {/* === SECTION 4 === */}
        <section className="space-y-10" aria-labelledby="s4">
          <h2 id="s4" className={T.h2}>4. Les domaines où l’automatisation change tout</h2>
          <p className={T.p}>
            L’automatisation ne se résume pas à envoyer un SMS ou un e-mail automatique.
            Elle s’intègre dans des processus complets qui assurent la continuité, la rigueur
            et la qualité du suivi client. Voici les domaines où elle apporte une vraie valeur ajoutée.
          </p>

          {/* --- 4.1 Rappels & confirmations --- */}
<div id="rappels-confirmations" className="space-y-5 scroll-mt-24">
  <h3 className={T.h3}>4.1 Rappels & confirmations de rendez-vous</h3>
  <p className={T.p}>
    Les “no-shows” détruisent la rentabilité. Une séquence de rappels <strong>bien cadencée</strong>
    (confirmation instantanée + rappel veille 18h + rappel 1h avant) réduit drastiquement les absences
    et libère des créneaux. Tout en restant humain grâce à la personnalisation (prénom, créneau, lieu).
  </p>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">✅ Cadence recommandée</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li><strong>J0 (immédiat)</strong> : confirmation (SMS/email) avec récap du rendez-vous + bouton "Ajouter au calendrier".</li>
      <li><strong>J-1 à 18h</strong> : rappel avec lien <em>Confirmer / Déplacer / Annuler</em>.</li>
      <li><strong>J0 à H-1</strong> : micro-rappel SMS (120–160 caractères, ultra concis).</li>
    </ul>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">✍️ Exemples de messages (SMS)</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li><em>Confirmation :</em> "{`{prenom}`}, rdv confirmé le {`{date}`}, {`{heure}`}, {`{adresse}`}. Ajoutez au calendrier : {`{lien_ics}`}. À bientôt — Fluxa."</li>
      <li><em>Veille 18h :</em> "{`{prenom}`}, rappel rdv demain {`{heure}`}. Confirmer/Déplacer/Annuler : {`{lien_action}`}. Merci ! — Fluxa"</li>
      <li><em>H-1 :</em> "{`{prenom}`}, rdv dans 1h ({`{heure}`}). Besoin d'ajuster ? {`{lien_action}`}. — Fluxa"</li>
    </ul>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">🔎 Bonnes pratiques</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li>Un seul lien d'action centralisé (évite les malentendus).</li>
      <li>Toujours arrêter les rappels dès que le client confirme/déplace.</li>
      <li>Limiter les majuscules et emojis pour rester pro.</li>
      <li>Proposer l'ajout au calendrier (Google/Apple/Outlook).</li>
    </ul>
  </div>

  <p className={`${T.p} italic`}>
    Résultat : hausse du taux de présence (souvent &gt;90&nbsp;%) et planning stable sans relances manuelles.
  </p>
</div>

          {/* --- 4.2 Relances impayés --- */}
<div id="relances-impayes" className="space-y-5 scroll-mt-24">
  <h3 className={T.h3}>4.2 Relances de factures impayées</h3>
  <p className={T.p}>
    La majorité des impayés vient de l’oubli. Cadencez des relances <strong>polis et automatiques</strong>
    (J+7 → J+14 → J+30) avec un <em>lien de paiement</em> simple, et stoppez la séquence dès règlement.
  </p>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">🔁 Échelle d'escalade (modèle)</p>
    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
      <li><strong>J+7</strong> : rappel cordial (ton "oubli probable"), facture & lien de paiement.</li>
      <li><strong>J+14</strong> : second rappel + proposition d'échéancier (lien d'acceptation en 1 clic).</li>
      <li><strong>J+30</strong> : message plus ferme, mention des CGV et des éventuels frais de retard.</li>
    </ol>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">✉️ Gabarits d'emails/SMS</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li><em>J+7 (cordial)</em> : "Bonjour {`{prenom}`}, un rappel pour la facture {`{num}`}, montant {`{montant}`}. Règlement ici : {`{lien}`}. Merci beaucoup 🙏"</li>
      <li><em>J+14 (solution)</em> : "Bonjour {`{prenom}`}, souhaitez-vous un échéancier en 2/3 fois ? Proposez-le ici : {`{lien_echeancier}`}. Sinon paiement : {`{lien}`}."</li>
      <li><em>J+30 (ferme)</em> : "Bonjour {`{prenom}`}, sauf erreur, la facture {`{num}`}, {`{montant}`}, reste due. Conformément à nos CGV, des frais peuvent s'appliquer. Règlement : {`{lien}`}."</li>
    </ul>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">🧩 Détails utiles</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li>Arrêt automatique des relances dès encaissement (évite les doublons).</li>
      <li>Synchroniser le statut "payé" avec compta/livre de recettes.</li>
      <li>Conserver une trace (journal des relances) — utile en cas de litige.</li>
      <li>Proposer un paiement en un clic (CB/SEPA) pour lever le dernier frein.</li>
    </ul>
  </div>

  <p className={`${T.p} italic`}>Objectif : encaisser plus vite, en restant pro et respectueux.</p>
</div>

          {/* --- 4.3 Post-prestation --- */}
<div id="messages-post-prestation" className="space-y-5 scroll-mt-24">
  <h3 className={T.h3}>4.3 Messages post-prestation & fidélisation</h3>
  <p className={T.p}>
    Après la prestation, un court message <strong>automatique et personnalisé</strong> entretient la relation,
    évite les questions récurrentes et augmente les avis positifs.
  </p>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">🗓️ Mini séquence (exemple)</p>
    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
      <li><strong>H+2</strong> : remerciement + conseils d'usage / check-list courte.</li>
      <li><strong>J+2</strong> : "tout va bien ?" + lien SAV si besoin.</li>
      <li><strong>J+5</strong> : demande d'avis Google (lien direct), photo avant/après si pertinent.</li>
    </ol>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">💬 Gabarits rapides</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li><em>H+2</em> : "Merci {`{prenom}`}, heureux d'avoir travaillé avec vous. Voici nos conseils : {`{lien_pdf}`}. Bonne journée !"</li>
      <li><em>J+2</em> : "Tout se passe bien {`{prenom}`} ? Un souci ? On est là : {`{lien_sav}`}."</li>
      <li><em>J+5</em> : "Un avis de votre part nous aide beaucoup 🙏 : {`{lien_avis_google}`}"</li>
    </ul>
  </div>

  <p className={`${T.p} italic`}>
    Ces 3 touches augmentent la confiance, le bouche-à-oreille et les retours utiles.
  </p>
</div>


          {/* --- 4.4 Tableaux de bord --- */}
<div id="tableaux-de-bord" className="space-y-5 scroll-mt-24">
  <h3 className={T.h3}>4.4 Tableaux de bord & statistiques</h3>
  <p className={T.p}>
    Pilotez avec des indicateurs <strong>simples mais actionnables</strong>. Mieux vaut 6 KPIs clairs que 30 chiffres confus.
  </p>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">📈 KPIs essentiels (définitions)</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li><strong>CA du mois</strong> : total encaissé sur période (pas émis).</li>
      <li><strong>Taux de conversion devis</strong> = devis acceptés / devis envoyés.</li>
      <li><strong>Délai moyen de paiement</strong> : jours entre facture et encaissement.</li>
      <li><strong>No-shows %</strong> : RDV non honorés / RDV planifiés.</li>
      <li><strong>Top clients / prestations</strong> : 80/20 pour prioriser.</li>
      <li><strong>Impayés</strong> : montant + ancienneté (J+30/J+60).</li>
    </ul>
  </div>

  <div className={`${T.card} p-3 space-y-2`}>
    <p className="font-medium text-sm">🎯 Seuils d'alerte (guidelines)</p>
    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
      <li>No-shows &gt; 10&nbsp;% → renforcer rappels & confirmation.</li>
      <li>Délai moyen &gt; 21 jours → proposer CB/SEPA + échéancier.</li>
      <li>Conversion devis &lt; 30&nbsp;% → retravailler modèle & argumentaire.</li>
    </ul>
  </div>

  <p className={T.p}>Un <strong>rapport hebdo auto</strong> (lundi 8h) résume l’essentiel pour démarrer serein.</p>
</div>
        </section>

        {/* === SECTION 5 === */}
<section id="fluxa-solution" className={T.section} aria-labelledby="s5">
  <h2 id="s5" className={T.h2}>5. Fluxa : l’assistant digital sur mesure des indépendants</h2>
  <p className={T.p}>
    Fluxa s’adapte à votre métier et à vos habitudes. L’objectif : <strong>des gains rapides</strong> sans courbe d’apprentissage.
  </p>

  <div className="grid md:grid-cols-2 gap-4">
    <div className={`${T.card} p-4 space-y-2`}>
      <p className="font-medium text-sm">🗓️ Feuille de route (standard)</p>
      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
        <li><strong>Jour 1</strong> : diagnostic + paramétrage (branding, mentions légales, numérotation).</li>
        <li><strong>Jour 2</strong> : scénarios clés (rappels RDV, relances J+7/J+14, post-prestation).</li>
        <li><strong>Jour 3</strong> : import clients/produits + test end-to-end (devis → facture → paiement).</li>
      </ol>
    </div>
    <div className={`${T.card} p-4 space-y-2`}>
      <p className="font-medium text-sm">📦 Livrables</p>
      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
        <li>Interface brandée et prête à l'emploi.</li>
        <li>Modèles (devis, factures, emails/SMS) personnalisés.</li>
        <li>Tableau de bord configuré + rapport hebdomadaire.</li>
        <li>Guide d'usage 1 page + courte formation.</li>
      </ul>
    </div>
  </div>

  <p className={`${T.p} italic`}>En 72h, vous passez d’outils dispersés à un flux simple et pro.</p>
</section>


        {/* === SECTION 6 === */}
        <section id="cas-concret" className={T.section} aria-labelledby="s6">
          <h2 id="s6" className={T.h2}>6. Cas concret&nbsp;: du désordre à la clarté</h2>
          <p className={T.p}>
            Prenons l’exemple d’un artisan en rénovation. Chaque semaine, il gère entre <strong>15 et 25 chantiers</strong>,
            des devis à envoyer, des acomptes à suivre et des clients à rappeler. Avant Fluxa, tout passait par le téléphone,
            les SMS et quelques fichiers Excel.
          </p>
          <p className={T.p}>Après la mise en place de Fluxa&nbsp;:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Les clients reçoivent automatiquement un rappel la veille de chaque visite.</li>
            <li>Les factures se génèrent dès qu’un paiement est enregistré.</li>
            <li>Les impayés sont relancés à J+7 sans intervention manuelle.</li>
            <li>Un rapport hebdomadaire synthétise l’activité en un coup d’œil.</li>
          </ul>
          <p className={T.p}>
            Résultat&nbsp;: <strong>moins de stress</strong>, <strong>plus de rigueur</strong>, et une <strong>image plus professionnelle</strong>.
            L’artisan ne passe plus ses soirées à “faire de l’administratif”, mais à planifier, se reposer ou développer son activité.
          </p>
        </section>

        {/* === SECTION 7 === */}
        <section id="conclusion" className={T.section} aria-labelledby="s7">
          <h2 id="s7" className={T.h2}>7. Conclusion&nbsp;: reprendre le contrôle</h2>
          <p className={T.p}>
            Gérer une entreprise indépendante, c’est une aventure exigeante. Les clients, les devis, les factures, les messages…
            tout compte. L’automatisation n’est pas là pour remplacer votre savoir-faire, mais pour le <em>protéger</em> :
            elle vous redonne du temps, de la clarté et de la sérénité.
          </p>
          <p className={T.p}>
            Avec Fluxa, chaque tâche répétitive devient un processus fluide. Vous gagnez du temps, vous renforcez votre image de pro,
            et vous offrez à vos clients une expérience simple, moderne et réactive.
          </p>
        </section>

        {/* 8.1 */}
<div className="space-y-3">
  <h3 className={T.h3}>8.1 Un gain de temps massif</h3>
  <p className={T.p}>
    Devis/factures automatiques, livre de comptes sans ressaisie, rappels/relances : <strong>+6 à +12 h/sem.</strong>
    gagnées en moyenne. Sur 12 mois, c’est <strong>312 à 624 h</strong> rendues à la production et à la prospection.
  </p>
  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
    <li>“Devis → facture” en 1 clic après acceptation.</li>
    <li>Rappels veille 18h + H-1 sur les RDV.</li>
    <li>Relances J+7 / J+14 avec lien de paiement.</li>
  </ul>
</div>

{/* 8.2 */}
<div className="space-y-3">
  <h3 className={T.h3}>8.2 Moins d’erreurs, plus de sérénité</h3>
  <p className={T.p}>
    Mentions légales, numérotation, TVA, cohérence des totaux : un cadre conforme évite les pénalités et rassure vos clients.
  </p>
  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
    <li>Alerte seuils de CA/TVA, blocage des doublons de numérotation.</li>
    <li>Archivage sécurisé + exports comptables.</li>
  </ul>
</div>

{/* 8.3 */}
<div className="space-y-3">
  <h3 className={T.h3}>8.3 Pilotage clair</h3>
  <p className={T.p}>
    CA, taux de conversion, impayés, top clients/prestations : <strong>une lecture en 30 secondes</strong>
    pour décider sereinement (prix, priorités, charges).
  </p>
</div>

{/* 8.4 */}
<div id="conformite-facturation-electronique" className="space-y-3 scroll-mt-24">
  <h3 className={T.h3}>8.4 Conformité & facturation électronique</h3>
  <p className={T.p}>
    Mentions obligatoires, archivage, exports, journal d’écritures : vous anticipez les évolutions au lieu de les subir.
  </p>
</div>

{/* 8.5 */}
<div className="space-y-3">
  <h3 className={T.h3}>8.5 Solution tout-en-un</h3>
  <p className={T.p}>
    Un seul hub (clients, devis, factures, rappels, relances, stats) + modules à la demande (TVA, CRM léger, paiements, recouvrement).
  </p>
</div>

{/* 8.6 */}
<div className="space-y-3">
  <h3 className={T.h3}>8.6 Impact direct sur le chiffre (ROI)</h3>
  <p className={T.p}>
    Exemple prudent : <strong>8 h/sem.</strong> économisées × <strong>30 €</strong>/h = <strong>240 €</strong>/sem.  
    Soit ~<strong>960 €</strong>/mois de valeur, bien au-delà d’un abonnement pro — sans compter les impayés évités.
  </p>
</div>

        {/* === CTA FINAL (unique, conservé) === */}
        <footer className="text-center space-y-4 pt-10 border-top border-border/60">
          <h3 className={T.h3}>Prêt à franchir le cap&nbsp;?</h3>
          <p className={`${T.p} max-w-xl mx-auto`}>
            Découvrez concrètement comment Fluxa peut adapter ses automatisations à votre métier.
            En quelques jours, vous pouvez transformer votre organisation et retrouver du temps pour ce qui compte.
          </p>
          <a
            href="/#automations"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Découvrir Fluxa
          </a>
        </footer>
      </article>
    </main>
  );
}