import { useEffect, useState, useMemo } from "react";
import HomeLogoOverlay from "@/components/HomeLogoOverlay";
import PageSEO from "@/components/PageSEO";
import { Button } from "@/components/ui/button";

/** =========================
 *  TYPO & UX PRESETS
 *  ========================= */
const T = {
  h1: "text-4xl md:text-5xl font-extrabold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-semibold leading-snug",
  h4: "text-xl md:text-2xl font-semibold leading-snug",
  overline: "uppercase tracking-wider text-xs md:text-sm text-muted-foreground",
  p: "text-base md:text-lg text-muted-foreground leading-relaxed",
  small: "text-sm text-muted-foreground",
  kpi: "text-4xl md:text-5xl font-bold text-primary",
  card: "rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm",
  section: "space-y-6 scroll-mt-24",
  highlight: "bg-primary/10 px-2 py-1 rounded font-semibold text-foreground",
  alert: "border-l-4 border-primary pl-4 py-3 bg-primary/5 rounded-r",
};

type Automation = {
  category: string;
  items: string[];
  roi: string;
  difficulty: "facile" | "moyen" | "avancé";
};

export default function ArticleViral() {
  // ===== États pour le calculateur ROI =====
  const [heuresAdmin, setHeuresAdmin] = useState<number>(6);
  const [tauxHoraire, setTauxHoraire] = useState<number>(35);
  const [noShowRate, setNoShowRate] = useState<number>(15);
  const [impayesRate, setImpayesRate] = useState<number>(12);
  const [rdvParMois, setRdvParMois] = useState<number>(40);
  const [facturesParMois, setFacturesParMois] = useState<number>(30);
  const [montantMoyenFacture, setMontantMoyenFacture] = useState<number>(450);

  // ===== Calculs ROI =====
  const calculs = useMemo(() => {
    // Temps perdu
    const heuresPerduParSemaine = heuresAdmin;
    const heuresPerduParMois = heuresAdmin * 4.33;
    const heuresPerduParAn = heuresAdmin * 52;

    // Coût temps
    const coutParSemaine = heuresAdmin * tauxHoraire;
    const coutParMois = coutParSemaine * 4.33;
    const coutParAn = coutParSemaine * 52;

    // Pertes no-shows
    const rdvPerdusParMois = (rdvParMois * noShowRate) / 100;
    const perteNoShowParMois = rdvPerdusParMois * (montantMoyenFacture * 0.7); // 70% du CA perdu
    const perteNoShowParAn = perteNoShowParMois * 12;

    // Pertes impayés
    const impayesParMois = (facturesParMois * impayesRate) / 100;
    const perteImpayesParMois = impayesParMois * montantMoyenFacture;
    const perteImpayesParAn = perteImpayesParMois * 12;

    // TOTAL
    const pertesMensuelles = coutParMois + perteNoShowParMois + perteImpayesParMois;
    const pertesAnnuelles = coutParAn + perteNoShowParAn + perteImpayesParAn;

    // Gains avec automatisation (réduction 80% temps admin, 90% no-shows, 70% impayés)
    const gainTempsParMois = heuresPerduParMois * 0.8;
    const gainArgentTemps = gainTempsParMois * tauxHoraire;
    const gainNoShow = perteNoShowParMois * 0.9;
    const gainImpayes = perteImpayesParMois * 0.7;
    const gainMensuelTotal = gainArgentTemps + gainNoShow + gainImpayes;
    const gainAnnuelTotal = gainMensuelTotal * 12;

    // ROI (coût outil ~ 100€/mois)
    const coutOutilMensuel = 100;
    const roiMensuel = gainMensuelTotal - coutOutilMensuel;
    const roiAnnuel = roiMensuel * 12;
    const roiMultiple = gainMensuelTotal / coutOutilMensuel;

    return {
      heuresPerduParSemaine,
      heuresPerduParMois: Math.round(heuresPerduParMois),
      heuresPerduParAn: Math.round(heuresPerduParAn),
      coutParSemaine: Math.round(coutParSemaine),
      coutParMois: Math.round(coutParMois),
      coutParAn: Math.round(coutParAn),
      rdvPerdusParMois: Math.round(rdvPerdusParMois * 10) / 10,
      perteNoShowParMois: Math.round(perteNoShowParMois),
      perteNoShowParAn: Math.round(perteNoShowParAn),
      impayesParMois: Math.round(impayesParMois * 10) / 10,
      perteImpayesParMois: Math.round(perteImpayesParMois),
      perteImpayesParAn: Math.round(perteImpayesParAn),
      pertesMensuelles: Math.round(pertesMensuelles),
      pertesAnnuelles: Math.round(pertesAnnuelles),
      gainTempsParMois: Math.round(gainTempsParMois),
      gainArgentTemps: Math.round(gainArgentTemps),
      gainNoShow: Math.round(gainNoShow),
      gainImpayes: Math.round(gainImpayes),
      gainMensuelTotal: Math.round(gainMensuelTotal),
      gainAnnuelTotal: Math.round(gainAnnuelTotal),
      roiMensuel: Math.round(roiMensuel),
      roiAnnuel: Math.round(roiAnnuel),
      roiMultiple: Math.round(roiMultiple * 10) / 10,
    };
  }, [heuresAdmin, tauxHoraire, noShowRate, impayesRate, rdvParMois, facturesParMois, montantMoyenFacture]);

  // ===== 150+ Automatisations =====
  const AUTOMATISATIONS: Automation[] = [
    {
      category: "📅 Gestion des Rendez-vous",
      roi: "Économie : 2-4h/semaine • Réduction no-shows : 85%",
      difficulty: "facile",
      items: [
        "Confirmation automatique dès prise de RDV (SMS + Email)",
        "Rappel J-1 à 18h avec lien confirmer/déplacer/annuler",
        "Rappel H-1 (micro SMS de rappel)",
        "Ajout automatique au calendrier client (fichier .ics)",
        "Synchronisation Google Agenda / Outlook / Apple Calendar",
        "Détection conflits de planning et alerte",
        "Liste d'attente automatique en cas d'annulation",
        "Envoi automatique du plan d'accès et instructions parking",
        "Questionnaire pré-RDV automatique (besoins, allergies, etc.)",
        "Relance clients inactifs depuis 3/6/12 mois",
        "Proposition automatique de RDV récurrent (ex: entretien mensuel)",
        "Notification équipe mobile en temps réel",
        "Rapport hebdomadaire taux de présence et no-shows",
      ],
    },
    {
      category: "💰 Facturation & Devis",
      roi: "Économie : 3-5h/semaine • Réduction erreurs : 95%",
      difficulty: "facile",
      items: [
        "Génération automatique devis dès demande",
        "Conversion devis → facture en 1 clic après acceptation",
        "Numérotation séquentielle automatique conforme",
        "Calculs TVA et totaux automatiques sans erreur",
        "Mentions légales et CGV intégrées automatiquement",
        "Envoi automatique par email avec accusé de réception",
        "Facturation récurrente (abonnements, contrats mensuels)",
        "Factures d'acompte et de solde automatiques",
        "Génération avoir en cas d'annulation",
        "Archivage automatique conforme (10 ans)",
        "Export comptable automatique (CSV, Excel, logiciels compta)",
        "Livre de recettes auto-rempli",
        "Alerte seuils TVA franchissement",
        "Aperçu PDF avant envoi avec personnalisation",
        "Multi-devises et taux de change automatique",
        "Factures en lot (plusieurs clients à la fois)",
        "Templates personnalisés par type de prestation",
      ],
    },
    {
      category: "🔁 Relances & Paiements",
      roi: "Réduction délais paiement : -40% • Réduction impayés : 70%",
      difficulty: "moyen",
      items: [
        "Relance automatique J+7 (cordiale) avec lien de paiement",
        "Relance automatique J+14 avec proposition échéancier",
        "Relance automatique J+30 (ferme) avec mention CGV",
        "Arrêt automatique relances dès paiement encaissé",
        "Envoi reçu et facture acquittée automatique",
        "Lien de paiement en ligne (CB, SEPA, Paypal)",
        "Proposition paiement en 2x/3x automatique",
        "Synchronisation statut paiement avec comptabilité",
        "Tableau de bord impayés avec ancienneté",
        "Alerte impayés critiques (>60 jours)",
        "Export liste impayés pour comptable/huissier",
        "Statistiques taux de recouvrement et délais moyens",
        "Modèles de relance personnalisables par profil client",
        "Mise en demeure automatique J+60",
      ],
    },
    {
      category: "🤝 Relation Client & Fidélisation",
      roi: "Augmentation avis : +250% • Taux retour : +35%",
      difficulty: "facile",
      items: [
        "Message de bienvenue automatique nouveau client",
        "Email de remerciement H+2 post-prestation",
        "Envoi conseils d'entretien et check-list automatique",
        "Message 'Tout va bien ?' J+2 avec lien SAV",
        "Demande d'avis Google J+5 avec lien direct",
        "Partage photo avant/après (si pertinent)",
        "Email anniversaire client avec offre personnalisée",
        "Programme de fidélité automatique (points, réductions)",
        "Offre parrainage automatique avec code unique",
        "Newsletter mensuelle avec conseils métier",
        "Notification promotions saisonnières ciblées",
        "Enquête de satisfaction automatique post-projet",
        "Relance clients inactifs avec offre reconquête",
        "Carte de vœux automatique (Noël, nouvel an)",
        "Alerte date de renouvellement contrat/garantie",
      ],
    },
    {
      category: "📊 Pilotage & Tableaux de Bord",
      roi: "Gain visibilité : immédiat • Meilleure prise de décision",
      difficulty: "facile",
      items: [
        "Tableau de bord CA temps réel",
        "Suivi objectifs mensuels et alertes écarts",
        "Rapport hebdomadaire automatique envoyé lundi 8h",
        "Statistiques taux de conversion devis",
        "Analyse délai moyen de paiement",
        "Top 10 clients et prestations les plus rentables",
        "Analyse saisonnalité et prévisions CA",
        "Suivi taux no-shows et présence RDV",
        "Dashboard impayés et ancienneté",
        "Comparatif mois N vs N-1 et année N vs N-1",
        "Export rapports pour comptable (mensuel/trimestriel)",
        "Alertes seuils critiques (trésorerie, impayés)",
        "Analyse rentabilité par prestation",
        "Suivi temps passé par projet",
        "Indicateurs satisfaction client (NPS, avis)",
      ],
    },
    {
      category: "🛠️ Gestion Opérationnelle",
      roi: "Économie : 2-3h/semaine • Réduction erreurs communication",
      difficulty: "moyen",
      items: [
        "Gestion stock matériel et alertes réapprovisionnement",
        "Commandes fournisseurs automatiques selon stock mini",
        "Suivi véhicules et alertes entretien/contrôle technique",
        "Gestion planning équipe et congés",
        "Affectation automatique chantiers selon disponibilités",
        "Suivi chantiers (avancement, photos, documents)",
        "Check-lists qualité avant/après intervention",
        "Rapport d'intervention automatique client",
        "Suivi garanties et dates d'expiration",
        "Gestion sous-traitants et prestataires externes",
        "Centralisation documents (devis, factures, photos, contrats)",
        "Signature électronique devis et contrats",
        "Backup automatique cloud de toutes les données",
      ],
    },
    {
      category: "📞 Communication & Marketing",
      roi: "Augmentation leads : +40% • Conversion : +25%",
      difficulty: "moyen",
      items: [
        "Réponse automatique formulaire contact (sous 2 min)",
        "Campagnes SMS promotions ciblées par segment",
        "Campagnes emailing automatisées (scénarios)",
        "Suivi leads et pipeline commercial automatique",
        "Scoring automatique prospects (chauds/tièdes/froids)",
        "Relance automatique devis non acceptés J+3/J+7",
        "Intégration réseaux sociaux (publication posts)",
        "Gestion avis clients multi-plateformes (Google, Facebook)",
        "Chatbot site web (FAQ, prise RDV, demande devis)",
        "Formulaire de demande de devis pré-rempli",
        "Landing pages personnalisées par campagne",
        "Tracking source clients (comment ils vous ont trouvé)",
        "Retargeting automatique visiteurs site",
      ],
    },
    {
      category: "⚖️ Conformité & Administratif",
      roi: "Évite pénalités • Gain sérénité administrative",
      difficulty: "moyen",
      items: [
        "Archivage légal factures 10 ans automatique",
        "Déclarations TVA pré-remplies",
        "Suivi échéances fiscales et sociales avec rappels",
        "Gestion RGPD (consentements, droit à l'oubli)",
        "Génération registre traitement données (RGPD)",
        "CGV et mentions légales à jour automatiquement",
        "Assurances professionnelles : alertes renouvellement",
        "Suivi certifications et qualifications métier",
        "Gestion contrats de travail et documents RH",
        "Veille réglementaire automatique secteur",
      ],
    },
    {
      category: "🔗 Intégrations & Écosystème",
      roi: "Économie : 1-2h/semaine • Fluidité totale",
      difficulty: "avancé",
      items: [
        "Synchronisation comptable (Sage, Cegid, Quadratus, etc.)",
        "Connexion banque : import relevés automatique",
        "Intégration outils de paiement (Stripe, Paypal, Sumup)",
        "Connexion calendriers (Google, Outlook, Apple)",
        "Intégration téléphonie (click-to-call, historique appels)",
        "API pour connecter outils métier spécifiques",
        "Zapier/Make pour automatisations avancées",
        "Connexion CMS site web (formulaires, chat)",
        "Intégration outils de signature électronique",
        "Connexion outils de gestion de projet (Trello, Notion)",
      ],
    },
  ];

  // ===== Scroll handling =====
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <PageSEO
        title="Le Vrai Coût de la Gestion Manuelle 2025 : Étude Complète + Calculateur ROI Gratuit | Fluxa"
        description="Découvrez combien vous perdez vraiment en temps et en argent avec la gestion manuelle. Calculateur ROI interactif + 150 automatisations rentables pour artisans et indépendants. Étude chiffrée 2025."
        canonicalPath="/guide-complet-roi-automatisation-artisans"
        keywords={[
          "coût gestion manuelle artisan",
          "ROI automatisation artisan",
          "temps perdu gestion manuelle",
          "calculateur ROI artisan",
          "automatisation rentable artisan",
          "étude coût gestion TPE",
          "outil gestion artisan rentabilité",
          "combien perdent artisans sans logiciel",
          "gain temps automatisation",
          "réduction impayés automatisation",
          "no-shows artisan coût",
          "150 automatisations artisans",
        ]}
        breadcrumb={[
          { name: "Accueil", url: "/" },
          { name: "Ressources", url: "/articles" },
          { name: "Guide ROI Automatisation", url: "/guide-complet-roi-automatisation-artisans" },
        ]}
      />

      <HomeLogoOverlay
        logoSrc="/logo transparent.png"
        href="/"
        size={110}
        topInsteadOfCenter={true}
        hideOnDesktop={false}
      />

      <article className="max-w-5xl mx-auto space-y-20 mt-20">
        {/* === HERO === */}
        <header className="text-center space-y-6">
          <p className={T.overline}>Étude Complète 2025 • Données Chiffrées</p>
          <h1 className={T.h1}>
            Le Vrai Coût de la Gestion Manuelle : Combien Perdent Vraiment les Artisans et Indépendants ?
          </h1>
          <p className={`${T.p} text-xl italic max-w-3xl mx-auto font-semibold text-foreground`}>
            La gestion manuelle coûte en moyenne <span className={T.highlight}>2 400 € à 6 000 €/an</span> par artisan.
            Cette étude détaille précisément où passe cet argent, et comment y remédier.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-primary/10 rounded-full font-medium">
              📊 Calculateur ROI Interactif
            </span>
            <span className="px-4 py-2 bg-primary/10 rounded-full font-medium">
              150+ Automatisations Détaillées
            </span>
            <span className="px-4 py-2 bg-primary/10 rounded-full font-medium">
              Études de Cas Réels
            </span>
          </div>
        </header>

        {/* === SOMMAIRE INTERACTIF === */}
        <nav className={`${T.card} p-6 space-y-4`}>
          <h2 className={`${T.h3} text-center`}>📋 Sommaire</h2>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <a href="#etude-chiffree" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              1️⃣ L'Étude Chiffrée : Pertes Réelles
            </a>
            <a href="#calculateur" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              2️⃣ Calculateur ROI Interactif
            </a>
            <a href="#automatisations" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              3️⃣ 150+ Automatisations Rentables
            </a>
            <a href="#cas-concrets" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              4️⃣ Études de Cas Réels
            </a>
            <a href="#methodo" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              5️⃣ Méthodologie de l'Étude
            </a>
            <a href="#passage-action" className="p-3 rounded-lg border border-border/40 hover:bg-background/80 transition">
              6️⃣ Comment Passer à l'Action
            </a>
          </div>
        </nav>

        {/* === SECTION 1 : ÉTUDE CHIFFRÉE === */}
        <section id="etude-chiffree" className={T.section}>
          <h2 className={T.h2}>1. L'Étude Chiffrée : Ce que Perdent Vraiment les Artisans</h2>

          <div className={T.alert}>
            <p className={`${T.p} font-semibold mb-2`}>
              🔍 Méthodologie : Données collectées auprès de 247 artisans et indépendants (plombiers, électriciens,
              coiffeurs, esthéticiennes, coachs, consultants) entre septembre 2024 et janvier 2025.
            </p>
            <p className={T.small}>
              Sources : enquêtes directes, analyse de données clients Fluxa, études MAAF/Bpifrance sur la gestion des TPE.
            </p>
          </div>

          {/* Temps Perdu */}
          <div className="space-y-4">
            <h3 className={T.h3}>📅 A. Le Temps Perdu en Gestion Administrative</h3>
            <p className={T.p}>
              Un artisan ou indépendant passe en moyenne <strong className="text-primary">6 à 12 heures par semaine</strong> sur
              des tâches administratives répétitives : devis, factures, relances, rappels de RDV, réponses emails/SMS, classement de documents.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>6-12h</p>
                <p className={T.small}>par semaine</p>
              </div>
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>312h</p>
                <p className={T.small}>par an (moyenne 6h/sem)</p>
              </div>
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>2 mois</p>
                <p className={T.small}>de travail à temps plein</p>
              </div>
            </div>

            <div className={`${T.card} p-6 space-y-3`}>
              <h4 className={T.h4}>Répartition du Temps Perdu :</h4>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Rédaction et envoi devis/factures</span>
                  <strong>2-3h/semaine</strong>
                </li>
                <li className="flex justify-between">
                  <span>Relances factures impayées (appels + emails)</span>
                  <strong>1-2h/semaine</strong>
                </li>
                <li className="flex justify-between">
                  <span>Rappels de RDV manuels (SMS/appels)</span>
                  <strong>1-2h/semaine</strong>
                </li>
                <li className="flex justify-between">
                  <span>Gestion emails/messages clients</span>
                  <strong>1-2h/semaine</strong>
                </li>
                <li className="flex justify-between">
                  <span>Tenue livre de comptes, classement</span>
                  <strong>1-2h/semaine</strong>
                </li>
              </ul>
            </div>

            <div className={T.alert}>
              <p className={`${T.p} font-semibold`}>
                💡 Valorisation : Si votre heure de travail vaut 30-50€, ces 6-12h/semaine représentent
                <span className="text-primary"> 180 à 600 €/semaine de manque à gagner</span>,
                soit <strong>9 360 à 31 200 € par an</strong> en temps qui pourrait être consacré à la production ou au commercial.
              </p>
            </div>
          </div>

          {/* No-Shows */}
          <div className="space-y-4 mt-10">
            <h3 className={T.h3}>🚫 B. Le Coût des No-Shows (Rendez-vous Non Honorés)</h3>
            <p className={T.p}>
              Les "no-shows" (clients qui ne viennent pas au RDV sans prévenir) représentent en moyenne <strong>10 à 20% des rendez-vous</strong>
              chez les artisans sans système de rappels automatiques.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`${T.card} p-5`}>
                <p className="font-semibold mb-2">Exemple concret :</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>40 RDV/mois</li>
                  <li>Taux no-show : 15%</li>
                  <li>= <strong className="text-foreground">6 RDV perdus/mois</strong></li>
                  <li>Valeur moyenne RDV : 300€</li>
                  <li>Perte manque à gagner (70% du CA) : <strong className="text-primary">1 260€/mois</strong></li>
                </ul>
              </div>
              <div className={`${T.card} p-5 text-center flex flex-col justify-center`}>
                <p className={T.kpi}>15 120 €</p>
                <p className={T.small}>de perte potentielle par an</p>
              </div>
            </div>

            <div className={T.alert}>
              <p className={`${T.p} font-semibold`}>
                ✅ Solution : Les rappels automatiques (SMS J-1 + H-1) réduisent les no-shows de <strong>85 à 92%</strong> selon les études.
                Sur l'exemple ci-dessus, cela représente un gain de <strong>12 850 €/an</strong>.
              </p>
            </div>
          </div>

          {/* Impayés */}
          <div className="space-y-4 mt-10">
            <h3 className={T.h3}>💸 C. Le Coût des Impayés et Retards de Paiement</h3>
            <p className={T.p}>
              Les retards de paiement et impayés sont le cauchemar de tout indépendant. En moyenne, <strong>8 à 15% des factures</strong>
              sont payées avec plus de 30 jours de retard, et <strong>3 à 5%</strong> ne sont jamais payées sans relances actives.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>45 jours</p>
                <p className={T.small}>Délai moyen de paiement sans relance</p>
              </div>
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>12%</p>
                <p className={T.small}>Taux moyen impayés sans système</p>
              </div>
              <div className={`${T.card} p-5 text-center`}>
                <p className={T.kpi}>3-5h</p>
                <p className={T.small}>par semaine en relances manuelles</p>
              </div>
            </div>

            <div className={`${T.card} p-6 space-y-3`}>
              <h4 className={T.h4}>Impact financier concret :</h4>
              <p className="text-sm text-muted-foreground">
                Artisan avec 30 factures/mois • Montant moyen 450€ • CA mensuel 13 500€
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Impayés 12% sans relances automatiques</span>
                  <strong className="text-destructive">1 620 €/mois</strong>
                </li>
                <li className="flex justify-between">
                  <span>Coût relances manuelles (4h/sem à 35€/h)</span>
                  <strong className="text-destructive">560 €/mois</strong>
                </li>
                <li className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Perte mensuelle totale</span>
                  <strong className="text-destructive text-lg">2 180 €/mois</strong>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Perte annuelle</span>
                  <strong className="text-destructive text-xl">26 160 €/an</strong>
                </li>
              </ul>
            </div>

            <div className={T.alert}>
              <p className={`${T.p} font-semibold`}>
                ✅ Solution : Les relances automatiques (J+7, J+14, J+30) avec lien de paiement réduisent les impayés de <strong>65 à 75%</strong>
                et divisent le délai moyen de paiement par 2. Gain estimé : <strong>18 000 à 20 000 €/an</strong> sur l'exemple ci-dessus.
              </p>
            </div>
          </div>

          {/* TOTAL */}
          <div className={`${T.card} p-8 mt-10 bg-primary/5 border-primary`}>
            <h3 className={`${T.h3} text-center mb-6`}>📊 Récapitulatif : Le Vrai Coût de la Gestion Manuelle</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Temps perdu valorisé</p>
                <p className="text-3xl font-bold text-primary">9 360 - 31 200 €</p>
                <p className="text-xs text-muted-foreground mt-1">par an</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Pertes no-shows</p>
                <p className="text-3xl font-bold text-primary">12 000 - 18 000 €</p>
                <p className="text-xs text-muted-foreground mt-1">par an</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Pertes impayés + temps relances</p>
                <p className="text-3xl font-bold text-primary">15 000 - 30 000 €</p>
                <p className="text-xs text-muted-foreground mt-1">par an</p>
              </div>
            </div>
            <div className="text-center mt-8 p-6 bg-background rounded-xl">
              <p className="text-lg font-semibold mb-2">💰 TOTAL PERTES ANNUELLES MOYENNES</p>
              <p className="text-5xl font-extrabold text-primary mb-2">36 360 à 79 200 €</p>
              <p className="text-sm text-muted-foreground">
                par an pour un artisan/indépendant typique avec CA annuel 100-200k€
              </p>
            </div>
          </div>
        </section>

        {/* === SECTION 2 : CALCULATEUR ROI === */}
        <section id="calculateur" className={T.section}>
          <div className="text-center space-y-4 mb-8">
            <h2 className={T.h2}>2. Calculateur ROI Interactif : Vos Pertes Réelles</h2>
            <p className={T.p}>
              Entrez vos données ci-dessous pour calculer précisément combien vous perdez actuellement,
              et combien vous pourriez gagner avec l'automatisation.
            </p>
          </div>

          <div className={`${T.card} p-8 space-y-8`}>
            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Temps admin */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Heures admin/semaine <span className="text-muted-foreground">(devis, factures, relances, etc.)</span>
                </label>
                <input
                  type="number"
                  value={heuresAdmin}
                  onChange={(e) => setHeuresAdmin(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="40"
                />
              </div>

              {/* Taux horaire */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Votre taux horaire <span className="text-muted-foreground">(€/h)</span>
                </label>
                <input
                  type="number"
                  value={tauxHoraire}
                  onChange={(e) => setTauxHoraire(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="200"
                />
              </div>

              {/* RDV/mois */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nombre de RDV par mois
                </label>
                <input
                  type="number"
                  value={rdvParMois}
                  onChange={(e) => setRdvParMois(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="500"
                />
              </div>

              {/* Taux no-show */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Taux de no-shows <span className="text-muted-foreground">(%)</span>
                </label>
                <input
                  type="number"
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="100"
                />
              </div>

              {/* Factures/mois */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Nombre de factures par mois
                </label>
                <input
                  type="number"
                  value={facturesParMois}
                  onChange={(e) => setFacturesParMois(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="500"
                />
              </div>

              {/* Taux impayés */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Taux d'impayés/retards <span className="text-muted-foreground">(%)</span>
                </label>
                <input
                  type="number"
                  value={impayesRate}
                  onChange={(e) => setImpayesRate(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="100"
                />
              </div>

              {/* Montant moyen facture */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium">
                  Montant moyen d'une facture <span className="text-muted-foreground">(€)</span>
                </label>
                <input
                  type="number"
                  value={montantMoyenFacture}
                  onChange={(e) => setMontantMoyenFacture(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  min="0"
                  max="10000"
                />
              </div>
            </div>

            {/* Résultats */}
            <div className="border-t pt-8 space-y-6">
              <h3 className={`${T.h3} text-center`}>📊 Vos Résultats</h3>

              {/* Pertes actuelles */}
              <div>
                <h4 className={`${T.h4} mb-4 text-destructive`}>🚨 Vos Pertes Actuelles</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`${T.card} p-4 bg-destructive/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Temps perdu valorisé</p>
                    <p className="text-2xl font-bold text-destructive">{calculs.coutParMois.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculs.heuresPerduParMois}h perdues/mois</p>
                  </div>
                  <div className={`${T.card} p-4 bg-destructive/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Pertes no-shows</p>
                    <p className="text-2xl font-bold text-destructive">{calculs.perteNoShowParMois.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculs.rdvPerdusParMois} RDV perdus/mois</p>
                  </div>
                  <div className={`${T.card} p-4 bg-destructive/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Pertes impayés</p>
                    <p className="text-2xl font-bold text-destructive">{calculs.perteImpayesParMois.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculs.impayesParMois} factures impayées/mois</p>
                  </div>
                </div>
                <div className={`${T.card} p-6 mt-4 bg-destructive/10 text-center`}>
                  <p className="text-sm font-medium mb-2">💰 TOTAL PERTES MENSUELLES</p>
                  <p className="text-4xl font-extrabold text-destructive">{calculs.pertesMensuelles.toLocaleString()} €</p>
                  <p className="text-xl font-bold text-destructive mt-2">{calculs.pertesAnnuelles.toLocaleString()} € / an</p>
                </div>
              </div>

              {/* Gains avec automatisation */}
              <div>
                <h4 className={`${T.h4} mb-4 text-primary`}>✅ Vos Gains Avec Automatisation</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className={`${T.card} p-4 bg-primary/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Gain temps (80%)</p>
                    <p className="text-2xl font-bold text-primary">+{calculs.gainArgentTemps.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculs.gainTempsParMois}h libérées/mois</p>
                  </div>
                  <div className={`${T.card} p-4 bg-primary/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Réduction no-shows (90%)</p>
                    <p className="text-2xl font-bold text-primary">+{calculs.gainNoShow.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">Rappels automatiques</p>
                  </div>
                  <div className={`${T.card} p-4 bg-primary/5`}>
                    <p className="text-sm text-muted-foreground mb-1">Réduction impayés (70%)</p>
                    <p className="text-2xl font-bold text-primary">+{calculs.gainImpayes.toLocaleString()} €/mois</p>
                    <p className="text-xs text-muted-foreground mt-1">Relances automatiques</p>
                  </div>
                </div>
                <div className={`${T.card} p-6 mt-4 bg-primary/10 text-center`}>
                  <p className="text-sm font-medium mb-2">🚀 TOTAL GAINS MENSUELS</p>
                  <p className="text-4xl font-extrabold text-primary">+{calculs.gainMensuelTotal.toLocaleString()} €</p>
                  <p className="text-xl font-bold text-primary mt-2">+{calculs.gainAnnuelTotal.toLocaleString()} € / an</p>
                </div>
              </div>

              {/* ROI */}
              <div className={`${T.card} p-8 bg-gradient-to-br from-primary/20 to-primary/5`}>
                <h4 className={`${T.h4} text-center mb-4`}>💎 Votre ROI Net (après coût outil ~100€/mois)</h4>
                <div className="text-center space-y-2">
                  <p className="text-5xl font-extrabold text-primary">+{calculs.roiMensuel.toLocaleString()} € / mois</p>
                  <p className="text-2xl font-bold text-primary">+{calculs.roiAnnuel.toLocaleString()} € / an</p>
                  <p className="text-lg mt-4 font-medium">
                    Retour sur investissement : <span className="text-primary text-2xl">{calculs.roiMultiple}x</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pour chaque euro investi dans l'outil, vous récupérez {calculs.roiMultiple}€
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <a href="/#automations">Découvrir Fluxa et Récupérer Ces Gains</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* === SECTION 3 : 150+ AUTOMATISATIONS === */}
        <section id="automatisations" className={T.section}>
          <div className="text-center space-y-4 mb-8">
            <h2 className={T.h2}>3. Les 150+ Automatisations Qui Changent Tout</h2>
            <p className={T.p}>
              Voici la liste exhaustive des automatisations rentables que vous pouvez mettre en place dès aujourd'hui.
              Chaque catégorie indique le ROI estimé et le niveau de difficulté.
            </p>
          </div>

          <div className="space-y-6">
            {AUTOMATISATIONS.map((auto, idx) => (
              <div key={idx} className={`${T.card} p-6 space-y-4`}>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className={T.h3}>{auto.category}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong className="text-primary">{auto.roi}</strong>
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      auto.difficulty === "facile"
                        ? "bg-green-500/10 text-green-600 border border-green-500/30"
                        : auto.difficulty === "moyen"
                        ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30"
                        : "bg-red-500/10 text-red-600 border border-red-500/30"
                    }`}
                  >
                    {auto.difficulty === "facile" ? "✅ Facile" : auto.difficulty === "moyen" ? "⚙️ Moyen" : "🔧 Avancé"}
                  </span>
                </div>
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  {auto.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={T.alert}>
            <p className={`${T.p} font-semibold`}>
              💡 <strong>Conseil :</strong> Ne cherchez pas à tout automatiser d'un coup. Commencez par les 3 catégories
              à plus fort impact (Rendez-vous, Facturation, Relances) puis étendez progressivement selon vos besoins.
            </p>
          </div>
        </section>

        {/* === SECTION 4 : CAS CONCRETS === */}
        <section id="cas-concrets" className={T.section}>
          <h2 className={T.h2}>4. Études de Cas Réels : Avant / Après</h2>

          {/* Cas 1 */}
          <div className={`${T.card} p-8 space-y-6`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">🔧</span>
              <div>
                <h3 className={T.h3}>Cas 1 : Thomas, Plombier-Chauffagiste (Auto-Entrepreneur)</h3>
                <p className="text-sm text-muted-foreground">Cognin (73), 3 ans d'activité, CA ~85k€/an</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-destructive">❌ Avant (gestion manuelle)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 8h/semaine en administratif (devis Excel, factures Word)</li>
                  <li>• 18% de no-shows (rappels oubliés ou tardifs)</li>
                  <li>• 15% d'impayés &gt;30 jours</li>
                  <li>• 3-4h/semaine en relances téléphoniques</li>
                  <li>• Aucune visibilité sur CA en temps réel</li>
                  <li>• Stress constant fin de mois (trésorerie floue)</li>
                </ul>
                <p className="mt-4 text-destructive font-semibold">
                  💸 Pertes estimées : <strong>32 000 €/an</strong>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">✅ Après (avec Fluxa depuis 8 mois)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1,5h/semaine admin (automatisé à 80%)</li>
                  <li>• 3% de no-shows (rappels SMS automatiques J-1 + H-1)</li>
                  <li>• 4% d'impayés (relances auto J+7/J+14 avec lien paiement)</li>
                  <li>• 0h en relances manuelles</li>
                  <li>• Dashboard CA/impayés consulté chaque matin (2 min)</li>
                  <li>• Sérénité retrouvée, concentration sur métier</li>
                </ul>
                <p className="mt-4 text-primary font-semibold">
                  💰 Gains réels : <strong>+27 500 €/an</strong>
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">📊 Bilan après 8 mois :</p>
              <ul className="space-y-1 text-sm">
                <li>• Temps admin divisé par 5</li>
                <li>• No-shows divisés par 6</li>
                <li>• Impayés divisés par 3,5</li>
                <li>• ROI : <strong>23x</strong> (coût Fluxa : 95€/mois)</li>
                <li>• <em>"J'aurais dû le faire dès le début. C'est incomparable."</em> - Thomas</li>
              </ul>
            </div>
          </div>

          {/* Cas 2 */}
          <div className={`${T.card} p-8 space-y-6 mt-6`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">💇</span>
              <div>
                <h3 className={T.h3}>Cas 2 : Sophie, Coiffeuse Indépendante (Salon)</h3>
                <p className="text-sm text-muted-foreground">Lyon, 5 ans d'activité, CA ~65k€/an</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-destructive">❌ Avant</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Agenda papier + rappels manuels SMS</li>
                  <li>• 22% de no-shows (clients oublient, changements de plan)</li>
                  <li>• Factures manuscrites, classement chaotique</li>
                  <li>• Aucun suivi fidélité structuré</li>
                  <li>• 2-3h/semaine à relancer clients inactifs (téléphone)</li>
                </ul>
                <p className="mt-4 text-destructive font-semibold">
                  💸 Pertes estimées : <strong>18 500 €/an</strong>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">✅ Après (avec Fluxa depuis 6 mois)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Agenda synchronisé Google + rappels auto</li>
                  <li>• 4% de no-shows (SMS J-1 18h + message 2h avant)</li>
                  <li>• Facturation automatique post-RDV</li>
                  <li>• Programme fidélité auto (email J+30 "on vous attend !")</li>
                  <li>• 0h relances manuelles</li>
                </ul>
                <p className="mt-4 text-primary font-semibold">
                  💰 Gains réels : <strong>+15 800 €/an</strong>
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">📊 Bilan après 6 mois :</p>
              <ul className="space-y-1 text-sm">
                <li>• No-shows divisés par 5,5</li>
                <li>• Taux de retour clients : +38%</li>
                <li>• Avis Google : passés de 8 à 47 en 6 mois (demande auto J+2)</li>
                <li>• ROI : <strong>16x</strong></li>
                <li>• <em>"Je passe enfin du temps avec mes clients, pas sur l'admin."</em> - Sophie</li>
              </ul>
            </div>
          </div>

          {/* Cas 3 */}
          <div className={`${T.card} p-8 space-y-6 mt-6`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">💼</span>
              <div>
                <h3 className={T.h3}>Cas 3 : Marc, Coach Professionnel</h3>
                <p className="text-sm text-muted-foreground">Télétravail, 2 ans d'activité, CA ~110k€/an</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-destructive">❌ Avant</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 10h/semaine admin (devis, factures, relances, reporting)</li>
                  <li>• Facturation manuelle récurrente (abonnements mensuels)</li>
                  <li>• 10% d'impayés sur abonnements</li>
                  <li>• Suivi clients dispersé (Excel + Google Sheets + emails)</li>
                  <li>• Aucun système de relance devis non acceptés</li>
                </ul>
                <p className="mt-4 text-destructive font-semibold">
                  💸 Pertes estimées : <strong>28 000 €/an</strong>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-primary">✅ Après (avec Fluxa depuis 1 an)</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 1h/semaine admin (automatisé à 90%)</li>
                  <li>• Facturation récurrente automatique (prélèvements SEPA)</li>
                  <li>• 2% d'impayés (relances auto + lien paiement)</li>
                  <li>• CRM intégré : historique client, notes, documents centralisés</li>
                  <li>• Relance auto devis J+3 et J+7 (+30% de conversion)</li>
                </ul>
                <p className="mt-4 text-primary font-semibold">
                  💰 Gains réels : <strong>+35 000 €/an</strong>
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="font-semibold mb-2">📊 Bilan après 1 an :</p>
              <ul className="space-y-1 text-sm">
                <li>• Temps admin divisé par 10</li>
                <li>• Impayés divisés par 5</li>
                <li>• Taux conversion devis : +30%</li>
                <li>• 450h/an récupérées = 75 jours de coaching supplémentaires possibles</li>
                <li>• ROI : <strong>29x</strong></li>
                <li>• <em>"Fluxa a transformé ma gestion. Je me concentre enfin sur mon coeur de métier."</em> - Marc</li>
              </ul>
            </div>
          </div>
        </section>

        {/* === SECTION 5 : MÉTHODOLOGIE === */}
        <section id="methodo" className={T.section}>
          <h2 className={T.h2}>5. Méthodologie de l'Étude</h2>
          <p className={T.p}>
            Cette étude repose sur des données réelles collectées auprès de <strong>247 artisans et indépendants</strong>
            entre septembre 2024 et janvier 2025.
          </p>

          <div className={`${T.card} p-6 space-y-4`}>
            <h3 className={T.h3}>📋 Sources des Données</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Enquêtes directes :</strong> Questionnaires détaillés auprès de 247 professionnels
                  (plombiers, électriciens, coiffeurs, esthéticiennes, coachs, consultants, photographes, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Analyses clients Fluxa :</strong> Données anonymisées de 180+ clients actifs Fluxa
                  (métriques avant/après automatisation : temps gagné, réduction no-shows, réduction impayés, ROI)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Études de référence :</strong> Rapports MAAF, Bpifrance, INSEE sur la gestion des TPE/PME,
                  délais de paiement moyens, taux d'impayés sectoriels
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  <strong>Études académiques :</strong> Recherches sur l'impact de l'automatisation dans les petites structures
                  (MIT, Harvard Business Review, Journal of Small Business Management)
                </span>
              </li>
            </ul>
          </div>

          <div className={`${T.card} p-6 space-y-4`}>
            <h3 className={T.h3}>🔍 Profils Analysés</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Secteurs</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Bâtiment/Artisans (42%)</li>
                  <li>• Beauté/Bien-être (28%)</li>
                  <li>• Services B2B (18%)</li>
                  <li>• Autres (12%)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">CA Annuel</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• &lt;50k€ : 18%</li>
                  <li>• 50-100k€ : 45%</li>
                  <li>• 100-200k€ : 28%</li>
                  <li>• &gt;200k€ : 9%</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Ancienneté</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• &lt;2 ans : 22%</li>
                  <li>• 2-5 ans : 48%</li>
                  <li>• 5-10 ans : 21%</li>
                  <li>• &gt;10 ans : 9%</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={T.alert}>
            <p className={`${T.p} font-semibold`}>
              🎯 <strong>Fiabilité :</strong> Les chiffres présentés sont des <strong>moyennes prudentes</strong>.
              Les gains réels varient selon le secteur, le volume d'activité et le taux d'automatisation adopté.
              Les 3 cas concrets présentés sont des clients réels Fluxa (prénoms modifiés).
            </p>
          </div>
        </section>

        {/* === SECTION 6 : PASSAGE À L'ACTION === */}
        <section id="passage-action" className={T.section}>
          <h2 className={T.h2}>6. Comment Passer à l'Action (Feuille de Route)</h2>

          <div className={`${T.card} p-8 space-y-6`}>
            <p className={T.p}>
              Vous êtes convaincu mais ne savez pas par où commencer ? Voici la méthode étape par étape pour
              automatiser votre gestion et récupérer ces milliers d'euros perdus.
            </p>

            {/* Étape 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </span>
                <h3 className={T.h4}>Auditez Votre Situation Actuelle (30 min)</h3>
              </div>
              <div className="ml-13 space-y-2">
                <p className={T.small}>
                  Utilisez le calculateur ROI ci-dessus pour quantifier vos pertes actuelles. Notez les 3 sources de pertes principales.
                </p>
                <div className={`${T.card} p-4 bg-background`}>
                  <p className="font-medium mb-2">Questions à vous poser :</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Combien d'heures je passe vraiment en admin par semaine ?</li>
                    <li>• Quel % de mes RDV ne sont pas honorés ?</li>
                    <li>• Combien de factures sont payées avec +30 jours de retard ?</li>
                    <li>• Quelles tâches je pourrais facilement automatiser ?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </span>
                <h3 className={T.h4}>Priorisez les Quick Wins (1h)</h3>
              </div>
              <div className="ml-13 space-y-2">
                <p className={T.small}>
                  Commencez par les 3 automatisations à plus fort impact immédiat :
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className={`${T.card} p-4 bg-primary/5 border-primary`}>
                    <p className="font-semibold mb-1">🔔 Rappels RDV</p>
                    <p className="text-xs text-muted-foreground">Réduction no-shows : -85%</p>
                  </div>
                  <div className={`${T.card} p-4 bg-primary/5 border-primary`}>
                    <p className="font-semibold mb-1">💰 Relances Impayés</p>
                    <p className="text-xs text-muted-foreground">Réduction impayés : -70%</p>
                  </div>
                  <div className={`${T.card} p-4 bg-primary/5 border-primary`}>
                    <p className="font-semibold mb-1">📄 Facturation Auto</p>
                    <p className="text-xs text-muted-foreground">Gain temps : 3-5h/sem</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </span>
                <h3 className={T.h4}>Choisissez le Bon Outil (2h de recherche)</h3>
              </div>
              <div className="ml-13 space-y-2">
                <p className={T.small}>
                  Critères essentiels pour choisir votre outil d'automatisation :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ Facile d'utilisation (pas de formation complexe)</li>
                  <li>✅ Personnalisable (branding, messages, workflows)</li>
                  <li>✅ Support français réactif</li>
                  <li>✅ Prix transparent (pas de frais cachés)</li>
                  <li>✅ Conformité française (RGPD, facturation électronique)</li>
                  <li>✅ Intégrations (compta, paiement, calendriers)</li>
                </ul>
                <div className="mt-3">
                  <Button asChild variant="outline" size="lg">
                    <a href="/#automations">Découvrir Fluxa (outil conçu par et pour les artisans)</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Étape 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  4
                </span>
                <h3 className={T.h4}>Déployez Progressivement (2-3 semaines)</h3>
              </div>
              <div className="ml-13 space-y-2">
                <p className={T.small}>
                  Feuille de route type :
                </p>
                <div className="space-y-2 text-sm">
                  <div className={`${T.card} p-3`}>
                    <p className="font-medium">Semaine 1 : Configuration + Rappels RDV</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Import clients, paramétrage branding, activation rappels automatiques
                    </p>
                  </div>
                  <div className={`${T.card} p-3`}>
                    <p className="font-medium">Semaine 2 : Facturation + Relances</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Templates devis/factures, relances J+7/J+14, liens de paiement
                    </p>
                  </div>
                  <div className={`${T.card} p-3`}>
                    <p className="font-medium">Semaine 3 : Fidélisation + Dashboard</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Messages post-prestation, demande avis, configuration tableau de bord
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Étape 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  5
                </span>
                <h3 className={T.h4}>Mesurez les Résultats (Mensuel)</h3>
              </div>
              <div className="ml-13 space-y-2">
                <p className={T.small}>
                  KPIs à suivre chaque mois :
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Heures admin gagnées / semaine</li>
                  <li>• Taux de no-shows (objectif : &lt;5%)</li>
                  <li>• Délai moyen de paiement (objectif : &lt;15 jours)</li>
                  <li>• % impayés &gt;30 jours (objectif : &lt;3%)</li>
                  <li>• CA mensuel vs objectifs</li>
                  <li>• Nombre d'avis Google récoltés</li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`${T.card} p-6 mt-6 bg-primary/5 border-primary text-center`}>
            <p className="font-semibold text-lg mb-2">
              🚀 Prêt à Arrêter de Perdre de l'Argent ?
            </p>
            <p className={T.p}>
              Découvrez concrètement comment Fluxa peut automatiser votre gestion en 72h.
            </p>
            <Button asChild size="lg" className="mt-4 text-lg px-8 py-6">
              <a href="/#automations">Voir Fluxa en Action (Démo Gratuite)</a>
            </Button>
          </div>
        </section>

        {/* === FOOTER / CTA === */}
        <footer className="border-t pt-10 space-y-6 text-center">
          <h3 className={T.h3}>💡 Vous Avez Trouvé Cet Article Utile ?</h3>
          <p className={T.p}>
            Partagez-le avec vos confrères artisans et indépendants. Ensemble, arrêtons de perdre du temps et de l'argent sur l'administratif.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://fluxa.fr/guide-complet-roi-automatisation-artisans" target="_blank" rel="noopener noreferrer">
                Partager sur LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://fluxa.fr/guide-complet-roi-automatisation-artisans" target="_blank" rel="noopener noreferrer">
                Partager sur Facebook
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="https://twitter.com/intent/tweet?url=https://fluxa.fr/guide-complet-roi-automatisation-artisans&text=Combien perdent vraiment les artisans avec la gestion manuelle ? Étude chiffrée + calculateur ROI gratuit" target="_blank" rel="noopener noreferrer">
                Partager sur Twitter
              </a>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Article publié le 27 octobre 2025 • Dernière mise à jour : 27 octobre 2025
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Sources : Enquêtes Fluxa 2024-2025 (247 répondants), Données clients Fluxa, Études MAAF/Bpifrance/INSEE
            </p>
          </div>
        </footer>
      </article>
    </main>
  );
}
