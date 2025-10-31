import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
  HeadphonesIcon,
  CheckCircle2,
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
    icon: MessageSquare,
    title: "1. Premier contact & Brief",
    detail: "Échange initial (15-20 min)",
    text:
      "On commence par un échange court pour comprendre votre activité, vos besoins et vos objectifs. Quelles pages souhaitez-vous ? Quelles informations mettre en avant ? Quel style vous correspond ? Cet échange nous permet de définir ensemble le périmètre exact du projet et les options nécessaires. Pas de jargon technique, juste une discussion claire pour cerner votre vision et vous proposer un devis ajusté.",
    tag: "Gratuit & sans engagement",
  },
  {
    icon: Palette,
    title: "2. Maquette & Validation",
    detail: "Design personnalisé",
    text:
      "À partir de votre brief, nous créons une maquette visuelle de votre futur site : structure des pages, couleurs, typographie, disposition des éléments. Vous voyez exactement à quoi ressemblera votre site avant le développement. Une fois la maquette validée ensemble (avec ajustements si besoin), nous passons au développement. Cette étape garantit que le résultat final correspond parfaitement à vos attentes.",
    tag: "Validation avant dev",
  },
  {
    icon: Code,
    title: "3. Développement",
    detail: "Code propre et optimisé",
    text:
      "Nous développons votre site avec des technologies modernes et performantes : design responsive (mobile + desktop), formulaires fonctionnels, optimisation SEO, vitesse de chargement rapide. Le code est propre, sécurisé et respecte les standards du web. Tout est testé sur différents navigateurs et appareils pour garantir une expérience utilisateur parfaite.",
    tag: "1-2 semaines",
  },
  {
    icon: Rocket,
    title: "4. Mise en ligne",
    detail: "Hébergement & domaine",
    text:
      "Une fois le site prêt, nous nous occupons de tout : achat et configuration du nom de domaine, hébergement sécurisé, mise en ligne et configuration finale. Votre site est accessible immédiatement et prêt à recevoir vos visiteurs. Hébergement et domaine inclus la première année, puis renouvellement annuel simple (environ 50-80€/an selon l'hébergeur).",
    tag: "Clé en main",
  },
  {
    icon: HeadphonesIcon,
    title: "5. Support & Suivi",
    detail: "Accompagnement après livraison",
    text:
      "Après la mise en ligne, vous n'êtes pas seul. Nous restons disponibles pour toute question technique, correction mineure ou conseil. Si vous souhaitez faire évoluer votre site (nouvelles pages, fonctionnalités), nous sommes là. La maintenance mensuelle optionnelle (35€/mois) inclut les mises à jour de sécurité, sauvegardes régulières, et corrections mineures pour garder votre site performant dans la durée.",
    tag: "Toujours disponible",
  },
];


  return (
    <section className="pt-8 pb-6 md:pt-8 md:pb-2 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Titre + sous-titre : espaces réduits en mobile */}
        <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Notre Processus de Création
          </h2>
          <p className="text-base leading-7 text-muted-foreground mt-1">
            De la première discussion à la mise en ligne, découvrez comment nous créons votre site vitrine professionnel en 5 étapes claires et sans surprise.
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
            href="#infos"
            className="md:hidden inline-flex items-center justify-center w-full
                       rounded-2xl px-6 py-3 text-base font-medium
                       bg-primary text-primary-foreground hover:opacity-90 transition"
            aria-label="Demander un devis"
          >
            Demander un devis gratuit
          </a>

          {/* Desktop → "infos" */}
          <a
            href="#infos"
            className="hidden md:inline-flex items-center justify-center
                       rounded-2xl px-6 py-3 text-base font-medium
                       bg-primary text-primary-foreground hover:opacity-90 transition"
            aria-label="Demander un devis"
          >
            Demander un devis gratuit
          </a>
        </div>
      </div>
    </section>
  );
}