import {
  CalendarClock,
  Bell,
  Mail,
  FileText,
  UserPlus,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type Item = {
  icon: LucideIcon;
  title: string;
  detail: string;
  text: string;
  tag: string;
};

export function Automations() {
  const items: Item[] = [
  {
    icon: CalendarClock,
    title: "SMS rappel RDV (J-1)",
    detail: "Rappel automatique",
    text:
      "Réduisez les no-shows avec des rappels de rendez-vous automatiques. Fluxa envoie un SMS clair la veille à 18h avec le prénom du client, la date/heure et un lien pour confirmer, déplacer ou annuler en un clic. Vous choisissez le délai (J-1, J-2, H-24), le message et le créneau d’envoi. Les réponses mettent l’agenda à jour automatiquement et chaque action est historisée dans la fiche client. Résultat : planning à jour, moins d’absences et du temps gagné au téléphone grâce à un agenda automatisé.",
    tag: "Réduction des no-shows",
  },
  {
    icon: Bell,
    title: "Relance facture impayée (J+7)",
    detail: "Message auto + suivi",
    text:
      "Automatisez vos relances de factures impayées sans y penser. À J+7, Fluxa envoie une relance polie avec lien de paiement sécurisé ; une deuxième peut partir à J+14 si nécessaire. Vous ajustez le ton, le canal (SMS ou e-mail) et les délais. Les paiements enregistrés stoppent immédiatement les relances et le statut s’actualise dans la fiche client. Tableau de bord de suivi, journal des relances, et export comptable inclus. Objectif : encaissement accéléré, moins d’oubli et plus de trésorerie — sans passer des heures à relancer.",
    tag: "Encaissement accéléré",
  },
  {
    icon: Mail,
    title: "Mail après prestation",
    detail: "Envoi le soir même",
    text:
      "Fidélisez automatiquement après chaque prestation. Fluxa envoie un e-mail personnalisé (prénom, prestation, date) le soir même : remerciement, conseils d’entretien, rappel des prochaines étapes et lien pour avis Google/Instagram. Vous pouvez y ajouter une offre de réachat ou un coupon de parrainage. Les modèles sont adaptés par métier et entièrement éditables. Les réponses du client sont centralisées dans la messagerie et rattachées à sa fiche. Résultat : relation soignée, plus d’avis positifs et un retour plus rapide sans tâches manuelles.",
    tag: "Fidélisation & avis",
  },
  {
    icon: FileText,
    title: "Facture auto après paiement",
    detail: "Génération + envoi instantané",
    text:
      "Dès qu’un paiement est enregistré, Fluxa génère la facture conforme (numérotation, mentions légales, TVA) au format PDF, l’archive et l’envoie au client automatiquement. Le lien devis → facture est conservé, la pièce peut être jointe au mail et exportée vers votre comptabilité. Vous gardez la main sur les modèles (logo, couleurs, pied de page) et les séries de numérotation. Objectif : zéro paperasse, zéro oubli et un dossier client toujours à jour, sans repasser par Excel ou par des tâches répétitives.",
    tag: "Zéro paperasse",
  },
  {
    icon: UserPlus,
    title: "Nouveau client → agenda + messages",
    detail: "Création et synchro en 1 action",
    text:
      "Onboardez vos nouveaux clients en un clic. Lorsqu’une fiche est créée, Fluxa prépare automatiquement le premier rendez-vous, ouvre le fil de messages, et centralise coordonnées + préférences. Vous pouvez déclencher un message de bienvenue (SMS/e-mail) avec lien de prise de RDV, documents utiles ou consignes. Les informations sont disponibles partout (mobile/desktop) et prêtes pour vos automatisations suivantes (rappels, relances, suivis). Résultat : un démarrage fluide, moins d’administratif et une expérience pro dès le premier contact.",
    tag: "Données centralisées",
  },
  {
    icon: BarChart3,
    title: "Stats hebdo chaque lundi",
    detail: "Récap auto à 8h",
    text:
      "Recevez chaque lundi à 8h un récap clair de votre activité : chiffre d’affaires de la semaine, nouveaux clients, taux de présence, impayés à relancer, top prestations et comparatif vs semaine précédente. Le rapport met en avant les points d’attention avec des liens directs vers les vues concernées (planning, relances, factures). Vous pouvez choisir les indicateurs, le format (e-mail et/ou PDF) et les destinataires. Objectif : piloter efficacement sans ouvrir Excel, prendre de meilleures décisions, et gagner du temps chaque semaine.",
    tag: "Vision claire",
  },
];


  return (
    <section className="pt-8 pb-6 md:pt-8 md:pb-2 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Titre + sous-titre : espaces réduits en mobile */}
        <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Automatisation des Tâches pour Artisans et PME
          </h2>
          <p className="text-base leading-7 text-muted-foreground mt-1">
            Notre outil d'automatisation entreprise vous propose des scénarios simples et efficaces pour automatiser la gestion de votre activité.{" "}
            <a href="/articles" className="text-primary hover:underline font-medium">
              Découvrez notre guide complet →
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition"
              >
                <div className="flex items-start gap-3 mb-4">
  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
    <Icon className="w-5 h-5" />
  </div>
  <div className="flex flex-col justify-center leading-tight">
    <h3 className="font-semibold">{it.title}</h3>
    <p className="text-xs text-muted-foreground mt-0.5">{it.detail}</p>
  </div>
</div>
                <p className="text-[15px] leading-relaxed text-muted-foreground mt-2">
  {it.text}
</p>
                <div className="mt-4 text-xs inline-flex items-center rounded-full border border-border px-2.5 py-1">
                  {it.tag}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA bas de section */}
        <div className="text-center mt-8 md:mt-20 pb-16 md:pb-32">
          {/* Mobile → direct vers le formulaire */}
          <a
            href="#contact"
            className="md:hidden inline-flex items-center justify-center w-full
                       rounded-2xl px-6 py-3 text-base font-medium
                       bg-primary text-primary-foreground hover:opacity-90 transition"
            aria-label="Nous contacter"
          >
            Discuter d’une automatisation sur mesure
          </a>

          {/* Desktop → “infos” */}
          <a
            href="#infos"
            className="hidden md:inline-flex items-center justify-center
                       rounded-2xl px-6 py-3 text-base font-medium
                       bg-primary text-primary-foreground hover:opacity-90 transition"
            aria-label="En savoir plus"
          >
            Discuter d’une automatisation sur mesure
          </a>
        </div>
      </div>
    </section>
  );
}