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
import { useState, useRef } from "react";

type Step = {
  icon: LucideIcon;
  etape: string;
  title: string;
  text: string;
  delay: string;
};

export function CommentCaMarche() {
  const scrollSection = useScrollAnimation(0.08);
  const [activeStep, setActiveStep] = useState(0);
  const touchStartX = useRef(0);

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
      className="relative scroll-mt-[20px]"
      style={{ paddingBottom: "70px", background: "linear-gradient(180deg,#050a18,hsl(217,40%,8%),#050a18)" }}
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

        {/* ── Desktop : grid 5 colonnes ── */}
        <div
          className="hidden md:grid gap-[18px] relative"
          style={{ gridTemplateColumns: "repeat(5,1fr)" }}
        >
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
                onMouseEnter={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,.45)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(217,32%,16%)"; e.currentTarget.style.transform = scrollSection.visible ? "translateY(0)" : "translateY(28px)"; }}
              >
                <div className="grid place-items-center mb-[18px]" style={{ width: 52, height: 52, borderRadius: 13, background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,44%))", boxShadow: "0 10px 26px -10px hsl(217,91%,60%,.6)" }}>
                  <Icon style={{ width: 22, height: 22, color: "#fff" }} />
                </div>
                <div className="mb-[7px]" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "hsl(217,91%,66%)" }}>{step.etape}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: "hsl(215,20%,70%)", lineHeight: 1.6 }}>{step.text}</p>
              </div>
            );
          })}
        </div>

        {/* ── Mobile : stepper animé ── */}
        <div className="md:hidden">

          {/* Indicateurs numérotés */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => setActiveStep(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === activeStep ? 36 : 28,
                    height: i === activeStep ? 36 : 28,
                    borderRadius: "50%",
                    background: i === activeStep
                      ? "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,44%))"
                      : i < activeStep ? "hsl(217,91%,60%,0.3)" : "hsl(217,32%,16%)",
                    border: i === activeStep ? "none" : `1px solid ${i < activeStep ? "hsl(217,91%,60%,.5)" : "hsl(217,32%,20%)"}`,
                    color: i === activeStep ? "#fff" : i < activeStep ? "hsl(217,91%,66%)" : "hsl(215,20%,45%)",
                    fontSize: 12,
                    fontWeight: 700,
                    boxShadow: i === activeStep ? "0 8px 20px -6px hsl(217,91%,60%,.6)" : "none",
                  }}
                >
                  {i + 1}
                </button>
                {i < steps.length - 1 && (
                  <div style={{
                    width: 28,
                    height: 2,
                    background: i < activeStep ? "hsl(217,91%,60%,.6)" : "hsl(217,32%,16%)",
                    transition: "background 0.4s",
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Carte active avec swipe */}
          <div
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (diff > 50 && activeStep < steps.length - 1) setActiveStep(s => s + 1);
              if (diff < -50 && activeStep > 0) setActiveStep(s => s - 1);
            }}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: i === activeStep ? "block" : "none",
                    border: "1px solid hsl(217,91%,60%,.3)",
                    background: "hsl(222,84%,5%)",
                    borderRadius: 18,
                    padding: 28,
                    animation: "fade-in-up 0.4s ease both",
                  }}
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,44%))", boxShadow: "0 12px 28px -10px hsl(217,91%,60%,.65)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon style={{ width: 24, height: 24, color: "#fff" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "hsl(217,91%,66%)", marginBottom: 3 }}>{step.etape}</div>
                      <h3 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}>{step.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: "hsl(215,20%,72%)", lineHeight: 1.7 }}>{step.text}</p>
                </div>
              );
            })}
          </div>

          {/* Flèches nav */}
          <div className="flex justify-between items-center mt-5 px-1">
            <button
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              disabled={activeStep === 0}
              className="transition-all duration-200"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid hsl(217,32%,20%)",
                background: "transparent",
                color: activeStep === 0 ? "hsl(215,20%,30%)" : "hsl(215,20%,72%)",
                fontSize: 13,
                fontWeight: 600,
                cursor: activeStep === 0 ? "default" : "pointer",
              }}
            >
              ← Précédent
            </button>
            <span style={{ fontSize: 12, color: "hsl(215,20%,45%)" }}>{activeStep + 1} / {steps.length}</span>
            <button
              onClick={() => setActiveStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={activeStep === steps.length - 1}
              className="transition-all duration-200"
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid hsl(217,32%,20%)",
                background: activeStep === steps.length - 1 ? "transparent" : "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,44%))",
                color: activeStep === steps.length - 1 ? "hsl(215,20%,30%)" : "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: activeStep === steps.length - 1 ? "default" : "pointer",
                boxShadow: activeStep === steps.length - 1 ? "none" : "0 8px 20px -8px hsl(217,91%,60%,.5)",
              }}
            >
              Suivant →
            </button>
          </div>
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
