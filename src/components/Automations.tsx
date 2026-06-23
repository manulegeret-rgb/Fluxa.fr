import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
  HeadphonesIcon,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Item = {
  icon: LucideIcon;
  title: string;
  detail: string;
  text: string;
  tag: string;
};

export function CommentCaMarche() {
  const scrollSection = useScrollAnimation(0.08);

  const items: Item[] = [
    {
      icon: MessageSquare,
      title: "1. Premier contact & Brief",
      detail: "Contact mail + formulaire détaillé",
      text: "Vous nous contactez par mail pour présenter votre projet. On vous envoie un formulaire de brief pour préciser vos besoins, le style souhaité, les pages à créer. L'objectif : bien comprendre votre activité avant de vous proposer un devis adapté.",
      tag: "Gratuit & sans engagement",
    },
    {
      icon: Palette,
      title: "2. Maquette & Validation",
      detail: "Design personnalisé",
      text: "On crée une maquette visuelle de votre site : structure des pages, couleurs, typographie. Vous voyez exactement le résultat avant qu'on code quoi que ce soit. On ajuste ensemble jusqu'à ce que ce soit parfait, puis on démarre le développement.",
      tag: "Validation avant dev",
    },
    {
      icon: Code,
      title: "3. Développement",
      detail: "Code propre et optimisé",
      text: "On développe votre site avec des technologies modernes : responsive mobile et desktop, formulaires fonctionnels, SEO optimisé, chargement rapide. Code propre, sécurisé, testé sur tous les navigateurs. Vous recevez un site prêt à convertir.",
      tag: "2-3 semaines",
    },
    {
      icon: Rocket,
      title: "4. Mise en ligne",
      detail: "Hébergement & domaine",
      text: "On gère tout : nom de domaine, hébergement sécurisé, mise en ligne. Votre site est accessible immédiatement. Hébergement et domaine inclus la première année, puis renouvellement simple autour de 50 à 80€ par an.",
      tag: "Clé en main",
    },
    {
      icon: HeadphonesIcon,
      title: "5. Support & Suivi",
      detail: "Accompagnement après livraison",
      text: "Après la mise en ligne, on reste disponibles pour toute question ou correction. La maintenance mensuelle optionnelle à 59€/mois couvre les mises à jour de sécurité, sauvegardes régulières et petites corrections pour garder votre site performant dans le temps.",
      tag: "Toujours disponible",
    },
  ];

  return (
    <section className="pt-8 pb-6 md:pt-8 md:pb-2 bg-gradient-to-b from-muted/20 to-background">
      <div ref={scrollSection.ref} className="container mx-auto px-6">
        {/* Titre */}
        <div
          className="text-center space-y-4 md:space-y-6 mb-8 md:mb-14 transition-all duration-700"
          style={{
            opacity: scrollSection.visible ? 1 : 0,
            transform: scrollSection.visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70">Processus</p>
          <h2
            className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            id="comment-ca-marche"
          >
            Comment ça marche ?
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground mt-2 max-w-xl mx-auto">
            De la première discussion à la mise en ligne, 5 étapes claires et sans surprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition-colors"
                style={{
                  opacity: scrollSection.visible ? 1 : 0,
                  transform: scrollSection.visible ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s, border-color 0.3s`,
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  {/* Icône avec pulse au load */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center"
                    style={{
                      animation: scrollSection.visible
                        ? `iconBounce 0.5s ease ${i * 0.1 + 0.3}s both`
                        : "none",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <h3 className="font-semibold">{it.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{it.detail}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-muted-foreground mt-2">{it.text}</p>
                <div className="mt-4 text-xs inline-flex items-center rounded-full border border-primary/30 bg-primary/5 text-primary px-2.5 py-1 font-medium">
                  {it.tag}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-8 md:mt-20 pb-16 md:pb-32"
          style={{
            opacity: scrollSection.visible ? 1 : 0,
            transform: scrollSection.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
          }}
        >
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition gap-2"
            aria-label="Voir les tarifs"
          >
            Voir les tarifs et démarrer
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
