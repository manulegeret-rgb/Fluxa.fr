// src/components/Faq.tsx
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const QUESTIONS = [
  {
    q: "Combien coûte un site vitrine ?",
    a: "Notre formule de base est à 890€ pour un site de 5 pages avec hébergement et domaine inclus la première année. Des options sont disponibles pour personnaliser selon vos besoins.",
  },
  {
    q: "Combien de temps pour créer mon site ?",
    a: "Le délai est précisé dans votre devis selon les options choisies. Après validation de la maquette, votre site est développé et mis en ligne en 2 à 3 semaines.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix ?",
    a: "Design responsive mobile et desktop, jusqu'à 5 pages, formulaire de contact, SEO de base, hébergement et nom de domaine pour la première année, un round de modifications et le support technique.",
  },
  {
    q: "Mon site sera-t-il optimisé pour Google ?",
    a: "Oui. Tous nos sites incluent le SEO de base : balises meta, structure HTML propre, vitesse de chargement optimisée et compatibilité mobile. Idéal pour le référencement local.",
  },
  {
    q: "Puis-je modifier mon site moi-même après ?",
    a: "Les modifications simples sont prises en charge dans le cadre de la maintenance (59€/mois). Pour des changements ponctuels, nous facturons à l'heure selon la complexité.",
  },
  {
    q: "L'hébergement et le nom de domaine sont-ils inclus ?",
    a: "Oui, inclus la première année. Après, le renouvellement est à prévoir, environ 50 à 80€ par an selon l'hébergeur.",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Vous recevez votre site clé en main, prêt à l'emploi. Nous restons disponibles pour le support technique. La maintenance mensuelle optionnelle (59€/mois) couvre les mises à jour, sauvegardes et corrections mineures.",
  },
  {
    q: "Puis-je payer en plusieurs fois ?",
    a: "Oui, paiement en 2 fois sans frais : 50% à la commande, 50% à la livraison. Pour des projets plus importants, d'autres arrangements sont possibles sur demande.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait ?",
    a: "Nous incluons un round de modifications dans le tarif de base et travaillons avec vous jusqu'à validation complète. Votre satisfaction est notre priorité.",
  },
];

function FaqItem({ item, index, isOpen, onToggle }: {
  item: typeof QUESTIONS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`rounded-2xl border bg-card overflow-hidden transition-colors duration-300 ${isOpen ? "border-primary/40" : "border-border"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-medium hover:bg-primary/5 transition-colors duration-200"
      >
        <span>{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {/* Slide-down animé */}
      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={contentRef}
          className="px-5 pb-5 text-muted-foreground text-base leading-relaxed"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.25s ease 0.1s, transform 0.25s ease 0.1s",
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const scrollFaq = useScrollAnimation(0.08);

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div ref={scrollFaq.ref} className="container mx-auto px-6 max-w-3xl">
        <div
          className="text-center mb-12 transition-all duration-700"
          style={{
            opacity: scrollFaq.visible ? 1 : 0,
            transform: scrollFaq.visible ? "translateY(0)" : "translateY(28px)",
          }}
        >
          <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70 mb-4">FAQ</p>
          <h2
            className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            id="faq-heading"
          >
            Questions fréquentes
          </h2>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: scrollFaq.visible ? 1 : 0,
                transform: scrollFaq.visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`,
              }}
            >
              <FaqItem
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* CTA bas de FAQ */}
        <div
          className="mt-10 text-center"
          style={{
            opacity: scrollFaq.visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <p className="text-muted-foreground text-sm mb-3">Vous n'avez pas trouvé votre réponse ?</p>
          <a
            href="#infos"
            className="group inline-flex items-center gap-2 text-primary font-medium hover:underline transition-all"
          >
            Contactez-nous directement
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
