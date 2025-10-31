// src/components/Faq.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    q: "Combien coûte un site vitrine ?",
    a: "Notre formule de base est à 390€ pour un site de 5 pages (Accueil, Services, À propos, Galerie, Contact) avec hébergement et domaine inclus la première année. Des options sont disponibles pour personnaliser votre site selon vos besoins.",
  },
  {
    q: "Combien de temps pour créer mon site ?",
    a: "Entre 1 et 2 semaines en moyenne. Après validation de la maquette, votre site est développé et mis en ligne rapidement. Le délai peut varier selon les options choisies et le contenu à intégrer.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix ?",
    a: "Design responsive (mobile + desktop), jusqu'à 5 pages, formulaire de contact, optimisation SEO de base, hébergement et nom de domaine pour la première année, 1 round de modifications, et support technique.",
  },
  {
    q: "Mon site sera-t-il optimisé pour Google (SEO) ?",
    a: "Oui, tous nos sites incluent l'optimisation SEO de base : balises meta, structure HTML propre, vitesse de chargement optimisée, et compatibilité mobile. Idéal pour le référencement local.",
  },
  {
    q: "Puis-je modifier mon site moi-même après ?",
    a: "Les modifications de contenu simples peuvent être faites par nos soins dans le cadre de la maintenance (35€/mois). Pour des changements ponctuels, nous facturons à l'heure selon la complexité.",
  },
  {
    q: "L'hébergement et le nom de domaine sont-ils inclus ?",
    a: "Oui, l'hébergement et le nom de domaine sont inclus la première année dans le tarif de base. Après la première année, le renouvellement est à prévoir (environ 50-80€/an selon l'hébergeur).",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Vous recevez votre site clé en main, prêt à l'emploi. Nous restons disponibles pour le support technique. La maintenance mensuelle (optionnelle, 35€/mois) inclut les mises à jour, sauvegardes et corrections mineures.",
  },
  {
    q: "Puis-je payer en plusieurs fois ?",
    a: "Oui, nous proposons un paiement en 2 fois sans frais : 50% à la commande, 50% à la livraison. Pour des projets plus importants, d'autres arrangements sont possibles sur demande.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait ?",
    a: "Nous incluons 1 round de modifications dans le tarif de base. Nous travaillons avec vous jusqu'à validation complète du site. Notre objectif est votre satisfaction à 100%.",
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