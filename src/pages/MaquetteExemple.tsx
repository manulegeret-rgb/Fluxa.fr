// MAQUETTE EXEMPLE — Menuiserie Berthet (fictif)
// Généré depuis docs/PROMPT-MAQUETTE-LOVABLE.md — sert de référence de rendu.
// Non routé par défaut : ajouter <Route path="/maquette-exemple" element={<MaquetteExemple />} /> dans App.tsx pour la voir.
import React, { useEffect, useRef, useState } from "react";

const FOND = "#14100C";
const ACCENT = "#C8863C";
const TEXTE = "#EDE6DC";
const MUTED = "#8C8175";

const DISPLAY: React.CSSProperties = { fontFamily: "'Fraunces', Georgia, serif" };
const BODY: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

/* Apparition au scroll : translateY + blur, une seule fois. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        filter: shown ? "blur(0px)" : "blur(8px)",
        transition: `opacity .7s ease-out ${delay}ms, transform .7s ease-out ${delay}ms, filter .7s ease-out ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const PREUVES = [
  { chiffre: "340", label: "chantiers livrés" },
  { chiffre: "2011", label: "atelier ouvert depuis" },
  { chiffre: "10 ans", label: "de garantie sur pose" },
];

const SERVICES = [
  { titre: "Cuisine sur mesure", desc: "Conçue au millimètre pour votre pièce, montée par l'atelier." },
  { titre: "Dressing et rangements", desc: "Chaque volume exploité, jusque sous les combles." },
  { titre: "Escalier bois", desc: "Chêne ou frêne massif, calculé et posé par nos soins." },
  { titre: "Agencement de commerce", desc: "Comptoirs et mobilier qui tiennent le passage." },
];

const REALISATIONS = [
  "Cuisine chêne massif, Chambéry-le-Vieux",
  "Dressing sous combles, Bassens",
  "Escalier frêne deux quarts tournant, Cognin",
  "Comptoir de bar, Chambéry centre",
  "Bibliothèque sur mesure, La Ravoire",
  "Agencement boutique, Aix-les-Bains",
];

export default function MaquetteExemple() {
  useEffect(() => {
    document.title = "Menuiserie Berthet | Menuisier agenceur à Chambéry";
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Menuisier agenceur à Chambéry depuis 2011. Cuisines, dressings et escaliers sur mesure, fabriqués en atelier et posés en Savoie.";
    document.head.appendChild(meta);

    // Le body global de Fluxa est navy (index.css) : il déborde en overscroll
    // et pollue la direction bois. On marque le body le temps de la maquette :
    // un attribut + règle CSS résiste aux styles inline posés par d'autres pages
    // lors des transitions SPA, contrairement à body.style.background.
    document.body.setAttribute("data-maquette", "");

    return () => {
      document.head.removeChild(meta);
      document.body.removeAttribute("data-maquette");
    };
  }, []);

  return (
    <div style={{ background: FOND, color: TEXTE, minHeight: "100vh", ...BODY }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── HERO ───────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "96px 24px 72px",
          overflow: "hidden",
        }}
      >
        {/* Grain bois : stries verticales très basses en opacité */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(200,134,60,.035) 0px, rgba(200,134,60,.035) 1px, transparent 1px, transparent 5px)",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 100%)",
          }}
        />
        {/* Halo chaud unique */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(720px, 90vw)",
            height: "min(720px, 90vw)",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT}1F 0%, transparent 65%)`,
            filter: "blur(90px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: 880, textAlign: "center" }}>
          <Reveal>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 32,
                padding: "6px 18px",
                borderRadius: 999,
                border: `1px solid ${ACCENT}33`,
                background: `${ACCENT}0D`,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: ACCENT }} />
              Menuisier agenceur · Chambéry
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              style={{
                ...DISPLAY,
                fontSize: "clamp(48px, 8vw, 92px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                margin: "0 0 24px",
              }}
            >
              Le bois qui épouse
              <br />
              <span style={{ color: ACCENT }}>votre pièce</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.7,
                color: MUTED,
                maxWidth: 560,
                margin: "0 auto 44px",
              }}
            >
              Cuisines, dressings et escaliers fabriqués dans notre atelier de Chambéry, mesurés chez vous, posés
              par les mains qui les ont faits.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
              <a
                href="#contact"
                style={{
                  padding: "15px 30px",
                  borderRadius: 14,
                  background: ACCENT,
                  color: FOND,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Demander un devis
              </a>
              <a
                href="#realisations"
                style={{
                  padding: "15px 30px",
                  borderRadius: 14,
                  border: `1px solid ${ACCENT}33`,
                  color: TEXTE,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Voir nos réalisations
              </a>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <p style={{ fontSize: 12.5, color: MUTED, margin: 0 }}>
              340 chantiers livrés &nbsp;·&nbsp; Atelier ouvert depuis 2011 &nbsp;·&nbsp; 10 ans de garantie
            </p>
          </Reveal>
        </div>
      </header>

      <main>
        {/* ── RÉASSURANCE ──────────────────────────────────── */}
        <section aria-label="Nos chiffres" className="mq-reassurance" style={{ borderTop: `1px solid ${ACCENT}1A` }}>
          <div className="mq-preuves">
            {PREUVES.map((p, i) => (
              <Reveal key={p.label} delay={i * 120}>
                <div className="mq-preuve">
                  <div
                    style={{
                      ...DISPLAY,
                      fontSize: "clamp(40px, 5vw, 58px)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: ACCENT,
                      lineHeight: 1,
                    }}
                  >
                    {p.chiffre}
                  </div>
                  <div style={{ fontSize: 14, color: MUTED, marginTop: 10 }}>{p.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────── */}
        <section aria-labelledby="services-titre" className="mq-section">
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Reveal>
              <h2 id="services-titre" className="mq-h2">
                Ce que nous fabriquons
              </h2>
            </Reveal>
            <div className="mq-grid-services">
              {SERVICES.map((s, i) => (
                <Reveal key={s.titre} delay={i * 120}>
                  <article
                    style={{
                      borderRadius: 20,
                      border: `1px solid ${ACCENT}1A`,
                      background: "rgba(255,255,255,.015)",
                      padding: 28,
                      height: "100%",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={ACCENT}
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
                    </svg>
                    <h3 style={{ ...DISPLAY, fontSize: 21, fontWeight: 600, margin: "18px 0 8px" }}>{s.titre}</h3>
                    <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED, margin: 0 }}>{s.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── RÉALISATIONS ─────────────────────────────────── */}
        <section id="realisations" aria-labelledby="realisations-titre" className="mq-section">
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Reveal>
              <h2 id="realisations-titre" className="mq-h2">
                Sorties d'atelier
              </h2>
            </Reveal>
            <div className="mq-grid-realisations">
              {REALISATIONS.map((r, i) => (
                <Reveal key={r} delay={(i % 3) * 120}>
                  <figure className="mq-real" style={{ margin: 0 }}>
                    <div
                      style={{
                        aspectRatio: "4 / 3",
                        borderRadius: 20,
                        border: `1px solid ${ACCENT}1A`,
                        background: `linear-gradient(145deg, ${ACCENT}14, transparent 70%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: MUTED,
                        textAlign: "center",
                        padding: 16,
                      }}
                    >
                      [PHOTO CLIENT]
                    </div>
                    <figcaption style={{ fontSize: 13, color: MUTED, marginTop: 12 }}>{r}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── L'ENTREPRISE ─────────────────────────────────── */}
        <section aria-labelledby="atelier-titre" className="mq-section">
          <div className="mq-atelier">
            <Reveal>
              <div
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 20,
                  border: `1px solid ${ACCENT}1A`,
                  background: `linear-gradient(145deg, ${ACCENT}14, transparent 70%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: MUTED,
                }}
              >
                [PHOTO DU DIRIGEANT]
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <h2 id="atelier-titre" style={{ ...DISPLAY, fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 20px", lineHeight: 1.1 }}>
                  L'atelier
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: MUTED, margin: 0 }}>
                  J'ai ouvert l'atelier en 2011, avec une scie à format et deux établis. Aujourd'hui nous sommes
                  quatre, et rien n'a changé sur l'essentiel : je prends les mesures chez vous, et je pose ce que
                  nous avons fabriqué. Nous intervenons dans un rayon de 40 km autour de Chambéry.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section id="contact" aria-labelledby="contact-titre" className="mq-section" style={{ borderTop: `1px solid ${ACCENT}1A` }}>
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <Reveal>
              <h2 id="contact-titre" className="mq-h2">
                Parlons de votre projet
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ textAlign: "center", fontSize: 15, color: MUTED, margin: "0 0 36px" }}>
                Devis gratuit sous 48 h. Ou appelez directement :{" "}
                <a href="tel:+33479000000" style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}>
                  04 79 00 00 00
                </a>
              </p>
            </Reveal>
            <Reveal delay={240}>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                  display: "grid",
                  gap: 14,
                  padding: 28,
                  borderRadius: 20,
                  border: `1px solid ${ACCENT}1A`,
                  background: "rgba(255,255,255,.015)",
                }}
              >
                <label style={{ display: "grid", gap: 7, fontSize: 13, color: MUTED }}>
                  Nom
                  <input type="text" name="nom" required className="mq-input" />
                </label>
                <label style={{ display: "grid", gap: 7, fontSize: 13, color: MUTED }}>
                  Téléphone
                  <input type="tel" name="tel" required className="mq-input" />
                </label>
                <label style={{ display: "grid", gap: 7, fontSize: 13, color: MUTED }}>
                  Votre projet
                  <textarea name="message" rows={4} className="mq-input" style={{ resize: "vertical" }} />
                </label>
                <button
                  type="submit"
                  style={{
                    marginTop: 6,
                    padding: "14px 24px",
                    borderRadius: 14,
                    border: "none",
                    background: ACCENT,
                    color: FOND,
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                  }}
                >
                  Envoyer ma demande
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: `1px solid ${ACCENT}1A`,
          padding: "40px 24px 104px",
          textAlign: "center",
          fontSize: 13,
          color: MUTED,
        }}
      >
        Menuiserie Berthet · Chambéry, Savoie ·{" "}
        <a href="tel:+33479000000" style={{ color: MUTED }}>
          04 79 00 00 00
        </a>
        <br />
        <span style={{ opacity: 0.6 }}>Mentions légales</span>
      </footer>

      {/* ── CTA APPEL MOBILE ───────────────────────────────── */}
      <a href="tel:+33479000000" className="mq-call">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Appeler l'atelier
      </a>

      <style>{`
        body[data-maquette] { background-color: ${FOND} !important; }
        .mq-section { padding: 120px 24px; }
        .mq-reassurance { padding: 96px 0; }
        .mq-h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(30px, 4.5vw, 48px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          text-align: center;
          margin: 0 0 56px;
        }
        .mq-input {
          background: rgba(255,255,255,.03);
          border: 1px solid ${ACCENT}26;
          border-radius: 14px;
          padding: 12px 14px;
          color: ${TEXTE};
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          outline: none;
        }
        .mq-input:focus { border-color: ${ACCENT}; }

        /* Réassurance : 3 colonnes desktop */
        .mq-preuves {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .mq-preuve { text-align: center; }

        .mq-grid-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .mq-grid-realisations { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .mq-real div { transition: border-color .35s ease, transform .35s ease; }
        .mq-real:hover div { border-color: ${ACCENT}59; transform: translateY(-4px); }

        .mq-atelier {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 56px;
          align-items: center;
          max-width: 980px;
          margin: 0 auto;
        }

        /* Bouton d'appel : mobile uniquement, au pouce */
        .mq-call { display: none; }

        @media (max-width: 860px) {
          .mq-section { padding: 72px 20px; }
          .mq-reassurance { padding: 72px 0; }
          .mq-h2 { margin-bottom: 40px; }
          .mq-grid-services { grid-template-columns: 1fr; }
          .mq-grid-realisations { grid-template-columns: 1fr 1fr; gap: 16px; }
          .mq-atelier { grid-template-columns: 1fr; gap: 32px; }

          /* Mobile dessiné : la réassurance devient un swipe, 1 carte à la fois */
          .mq-preuves {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 0;
            padding: 0;
            scrollbar-width: none;
          }
          .mq-preuves::-webkit-scrollbar { display: none; }
          .mq-preuves > * { flex: 0 0 100%; scroll-snap-align: center; }
          .mq-preuve { padding: 0 24px; }

          .mq-call {
            position: fixed;
            left: 20px;
            right: 20px;
            bottom: 20px;
            z-index: 50;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            padding: 15px 24px;
            border-radius: 14px;
            background: ${ACCENT};
            color: ${FOND};
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 15px;
            text-decoration: none;
            box-shadow: 0 12px 32px -8px rgba(0,0,0,.6);
          }
        }

        @media (max-width: 520px) {
          .mq-grid-realisations { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mq-real div { transition: none; }
        }
      `}</style>
    </div>
  );
}
