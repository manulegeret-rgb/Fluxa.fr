// src/components/Faq.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    q: "Fluxa, c’est une application toute faite ou du sur-mesure ?",
    a: "Fluxa conçoit des applications entièrement personnalisées. Chaque client reçoit son propre espace, pensé selon ses besoins réels : modules, design, automatisations, tout est ajusté à la main.",
  },
  {
    q: "Combien de temps pour créer mon application ?",
    a: "En moyenne entre 7 et 21 jours selon la complexité du projet. Une maquette est d’abord validée avant le développement, puis la mise en ligne se fait avec accompagnement.",
  },
  {
    q: "Je ne suis pas à l’aise avec l’informatique, est-ce que je vais m’en sortir ?",
    a: "Oui. Chaque app est livrée prête à l’emploi avec un mini guide vidéo, et un accompagnement à la prise en main inclus dans les formules Professionnelle et Premium (à partir de 49 €/mois).",
  },
  {
    q: "Est-ce que mes données sont sécurisées ?",
    a: "Oui. Hébergement en France, chiffrement SSL, sauvegardes automatiques et conformité RGPD. L’accès est strictement limité à toi et à ton équipe si tu le souhaites.",
  },
  {
    q: "Et si je veux faire évoluer mon app plus tard ?",
    a: "C’est prévu : on peut ajouter de nouvelles fonctionnalités, modules ou automatisations à tout moment selon l’évolution de ton activité.",
  },
  {
    q: "Fluxa, c’est pour quel type d’activité ?",
    a: "Beauté et bien-être, immobilier, coaching, artisanat, restauration, formation, services… L’application s’adapte à tous les métiers grâce à son approche 100 % personnalisée.",
  },
  {
    q: "Comment ça se passe concrètement ?",
    a: "Diagnostic gratuit (15–20 min) → maquette personnalisée → développement sur mesure → mise en ligne et accompagnement selon la formule choisie.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-center text-4xl lg:text-5xl font-bold mb-10">
          Questions fréquentes
        </h2>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
  {item.a}
</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}