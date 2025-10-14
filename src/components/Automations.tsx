import {
  CalendarClock,
  Bell,
  Mail,
  FileText,
  UserPlus,
  BarChart3,
} from "lucide-react";

export function Automations() {
  const items = [
    {
      icon: CalendarClock,
      title: "SMS rappel RDV (J-1)",
      detail: "Envoi auto la veille à 18h",
      text: "Rappel clair avec prénom, date/heure et lien pour confirmer ou déplacer.",
      tag: "Réduction des no-shows",
    },
    {
      icon: Bell,
      title: "Relance facture impayée (J+7)",
      detail: "Message auto + suivi",
      text: "Relance polie avec lien de paiement. Deuxième relance possible à J+14.",
      tag: "Encaissement accéléré",
    },
    {
      icon: Mail,
      title: "Mail après prestation",
      detail: "Envoi le soir même",
      text: "Remerciement + conseils d’entretien + lien pour avis Google ou Instagram.",
      tag: "Fidélisation & avis",
    },
    {
      icon: FileText,
      title: "Facture auto après paiement",
      detail: "Génération + envoi instantané",
      text: "Dès qu’un paiement est enregistré, Fluxa crée et archive la facture PDF automatiquement.",
      tag: "Zéro paperasse",
    },
    {
      icon: UserPlus,
      title: "Nouveau client → agenda + messages",
      detail: "Création et synchro en 1 action",
      text: "Lorsqu’un client est ajouté, sa fiche, son suivi messages et son rendez-vous sont prêts instantanément.",
      tag: "Données centralisées",
    },
    {
      icon: BarChart3,
      title: "Stats hebdo chaque lundi",
      detail: "Récap auto à 8h",
      text: "CA, nouveaux clients, taux de présence, top prestations — envoyés sans ouvrir Excel.",
      tag: "Vision claire",
    },
  ];

  return (
    <section id="automations" className="pt-10 pb-6 md:pt-8 md:pb-2 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Automatisations qui font gagner du temps
          </h2>
          <p className="text-lg text-muted-foreground">
            Des scénarios simples, efficaces, prêts à adapter à votre activité.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((it, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center">
                  <it.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="text-xs text-muted-foreground">{it.detail}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{it.text}</p>
              <div className="mt-4 text-xs inline-flex items-center rounded-full border border-border px-2.5 py-1">
                {it.tag}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-20 pb-20 md:pb-32">
          <a
            href="#infos"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Discuter d’une automatisation sur mesure
          </a>
        </div>
      </div>
    </section>
  );
}