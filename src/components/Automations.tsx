import {
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  HeadphonesIcon,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Step = {
  icon: LucideIcon;
  etape: string;
  title: string;
  text: string;
  delay: string;
};

export function CommentCaMarche() {
  const scrollSection = useScrollAnimation(0.08);

  const steps: Step[] = [
    {
      icon: MessageSquare,
      etape: "ÉTAPE 1",
      title: "Contact & brief",
      text: "Vous nous contactez. Un formulaire de brief précise vos besoins, pages et objectifs.",
      delay: "0s",
    },
    {
      icon: Palette,
      etape: "ÉTAPE 2",
      title: "Maquette & validation",
      text: "Nous créons une maquette. Vous validez structure, couleurs et contenu avant le développement.",
      delay: "0.08s",
    },
    {
      icon: Code2,
      etape: "ÉTAPE 3",
      title: "Développement",
      text: "Code moderne, responsive, testé sur tous les navigateurs. SEO et performance optimisés.",
      delay: "0.16s",
    },
    {
      icon: Rocket,
      etape: "ÉTAPE 4",
      title: "Mise en ligne",
      text: "Domaine, hébergement sécurisé, configuration finale. Votre site est en ligne, clé en main.",
      delay: "0.24s",
    },
    {
      icon: HeadphonesIcon,
      etape: "ÉTAPE 5",
      title: "Support & suivi",
      text: "Nous restons disponibles. Maintenance optionnelle : mises à jour, sauvegardes, corrections.",
      delay: "0.32s",
    },
  ];

  return (
    <section
      id="comment-ca-marche"
      className="relative scroll-mt-[100px]"
      style={{ padding: "70px 0", background: "linear-gradient(180deg,#050a18,hsl(217,40%,8%),#050a18)" }}
    >
      <div ref={scrollSection.ref} className="container mx-auto px-6 max-w-[1200px]">

        {/* Titre */}
        <div className="text-center max-w-[680px] mx-auto mb-[60px]">
          <div
            className="inline-flex items-center gap-[10px] mb-[18px] transition-all duration-700"
            style={{ opacity: scrollSection.visible ? 1 : 0, transform: scrollSection.visible ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="w-[26px] h-[1px]" style={{ background: "linear-gradient(90deg,transparent,hsl(217,91%,60%))" }} />
            <span className="text-[13px] font-semibold tracking-[0.16em] uppercase" style={{ color: "hsl(217,91%,68%)" }}>Méthode</span>
            <span className="w-[26px] h-[1px]" style={{ background: "linear-gradient(90deg,hsl(217,91%,60%),transparent)" }} />
          </div>
          <h2
            className="mb-4 transition-all duration-700"
            style={{
              fontSize: "clamp(30px,4vw,46px)",
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              fontFamily: "'Playfair Display', Georgia, serif",
              opacity: scrollSection.visible ? 1 : 0,
              transform: scrollSection.visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.06s",
            }}
          >
            De l'idée à la mise en ligne, en 5 étapes
          </h2>
          <p
            className="text-[17px] transition-all duration-700"
            style={{
              color: "hsl(215,20%,72%)",
              opacity: scrollSection.visible ? 1 : 0,
              transform: scrollSection.visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "0.12s",
            }}
          >
            Un processus clair et sans surprise, du premier contact au suivi.
          </p>
        </div>

        {/* 5 étapes */}
        <div
          className="grid gap-[18px] relative"
          style={{ gridTemplateColumns: "repeat(5,1fr)" }}
        >
          {/* Ligne connecteur */}
          <div
            className="absolute pointer-events-none"
            style={{ top: 26, left: "8%", right: "8%", height: 2, background: "linear-gradient(90deg,hsl(217,91%,60%,.4),hsl(217,91%,60%,.15))", zIndex: 0 }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-[16px] transition-all duration-300"
                style={{
                  zIndex: 1,
                  border: "1px solid hsl(217,32%,16%)",
                  background: "hsl(222,84%,5%)",
                  padding: 22,
                  opacity: scrollSection.visible ? 1 : 0,
                  transform: scrollSection.visible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${step.delay}, transform 0.8s cubic-bezier(.16,1,.3,1) ${step.delay}, border-color 0.25s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "hsl(217,91%,60%,.45)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "hsl(217,32%,16%)";
                  e.currentTarget.style.transform = scrollSection.visible ? "translateY(0)" : "translateY(28px)";
                }}
              >
                {/* Icône gradient */}
                <div
                  className="grid place-items-center mb-[18px]"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 13,
                    background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,44%))",
                    boxShadow: "0 10px 26px -10px hsl(217,91%,60%,.6)",
                  }}
                >
                  <Icon style={{ width: 22, height: 22, color: "#fff" }} />
                </div>

                {/* Étape label */}
                <div
                  className="mb-[7px]"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "hsl(217,91%,66%)" }}
                >
                  {step.etape}
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "hsl(215,20%,70%)", lineHeight: 1.6 }}>{step.text}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-[52px] transition-all duration-700"
          style={{
            opacity: scrollSection.visible ? 1 : 0,
            transform: scrollSection.visible ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "0.4s",
          }}
        >
          <a
            href="#infos"
            className="group inline-flex items-center gap-[10px] text-white font-semibold transition-all duration-200 hover:-translate-y-[3px]"
            style={{
              fontSize: 15,
              padding: "15px 28px",
              borderRadius: 13,
              background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))",
              boxShadow: "0 14px 36px -10px hsl(217,91%,60%,.55)",
            }}
          >
            Démarrer mon projet
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
