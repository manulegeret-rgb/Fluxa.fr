import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const QUESTIONS = [
  {
    q: "Combien coûte un site web ?",
    a: "Notre formule de base est à 890 € pour un site jusqu'à 5 pages, avec hébergement et domaine inclus la première année. Des options sont disponibles pour personnaliser selon vos besoins.",
  },
  {
    q: "Combien de temps pour créer mon site ?",
    a: "Après validation de la maquette, votre site est développé et mis en ligne généralement en 2 à 3 semaines, selon les options choisies et le contenu à intégrer.",
  },
  {
    q: "Qu'est-ce qui est inclus dans le prix ?",
    a: "Design responsive, jusqu'à 5 pages, formulaire de contact, SEO de base, hébergement et nom de domaine la première année, 1 round de modifications et le support technique.",
  },
  {
    q: "L'hébergement et le domaine sont-ils inclus ?",
    a: "Oui, l'hébergement et le nom de domaine sont inclus la première année. Ensuite, le renouvellement est à prévoir (environ 50 à 80 €/an selon l'hébergeur).",
  },
  {
    q: "Puis-je payer en plusieurs fois ?",
    a: "Oui, paiement en 2 fois sans frais : 50% à la commande, 50% à la livraison. D'autres arrangements sont possibles pour des projets plus importants.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait ?",
    a: "Nous incluons 1 round de modifications et travaillons avec vous jusqu'à validation complète. Notre objectif est votre satisfaction à 100%.",
  },
];

function FaqItem({ item, isOpen, onToggle, delay }: {
  item: typeof QUESTIONS[0];
  isOpen: boolean;
  onToggle: () => void;
  delay: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="overflow-hidden transition-colors duration-300"
      style={{
        borderRadius: 14,
        border: `1px solid ${isOpen ? "hsl(217,91%,60%,.35)" : "hsl(217,32%,16%)"}`,
        background: "hsl(217,33%,9%)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left transition-colors duration-200 hover:bg-white/[0.02]"
        style={{ padding: "20px 22px", fontSize: 15.5, fontWeight: 600, color: "hsl(210,40%,96%)" }}
      >
        <span>{item.q}</span>
        <ChevronDown
          style={{ width: 19, height: 19, color: "hsl(217,91%,64%)", flexShrink: 0, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div style={{ maxHeight: height, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div
          ref={contentRef}
          style={{
            padding: "0 22px 20px",
            fontSize: 14,
            color: "hsl(215,20%,72%)",
            lineHeight: 1.7,
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
    <section
      id="faq"
      style={{ position: "relative", paddingBottom: "70px", background: "linear-gradient(180deg,#050a18,hsl(217,40%,8%),#050a18)" }}
    >
      <div ref={scrollFaq.ref} className="mx-auto px-8" style={{ maxWidth: 780 }}>

        {/* Titre */}
        <div className="text-center mb-[52px]">
          <div
            className="inline-flex items-center gap-[10px] mb-[18px] transition-all duration-700"
            style={{ opacity: scrollFaq.visible ? 1 : 0, transform: scrollFaq.visible ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="w-[26px] h-[1px]" style={{ background: "linear-gradient(90deg,transparent,hsl(217,91%,60%))" }} />
            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase" style={{ color: "hsl(217,91%,68%)" }}>FAQ</span>
            <span className="w-[26px] h-[1px]" style={{ background: "linear-gradient(90deg,hsl(217,91%,60%),transparent)" }} />
          </div>
          <h2
            className="transition-all duration-700"
            style={{
              fontSize: "clamp(30px,4vw,46px)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              fontFamily: "'Playfair Display', Georgia, serif",
              opacity: scrollFaq.visible ? 1 : 0,
              transform: scrollFaq.visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.06s",
            }}
          >
            Questions fréquentes
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              style={{
                opacity: scrollFaq.visible ? 1 : 0,
                transform: scrollFaq.visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${i * 0.06}s, transform 0.7s cubic-bezier(.16,1,.3,1) ${i * 0.06}s`,
              }}
            >
              <FaqItem
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
                delay={`${i * 0.06}s`}
              />
            </div>
          ))}
        </div>

        {/* CTA bas */}
        <div
          className="mt-10 text-center transition-all duration-700"
          style={{
            opacity: scrollFaq.visible ? 1 : 0,
            transitionDelay: "0.5s",
          }}
        >
          <p className="text-sm mb-3" style={{ color: "hsl(215,20%,55%)" }}>Vous n'avez pas trouvé votre réponse ?</p>
          <a
            href="#infos"
            className="group inline-flex items-center gap-2 font-semibold transition-all hover:underline"
            style={{ color: "hsl(217,91%,64%)" }}
          >
            Contactez-nous directement
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
