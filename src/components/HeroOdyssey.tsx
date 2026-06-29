import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};
const item = {
  hidden: { y: 24, opacity: 0, filter: "blur(8px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

interface HeroOdysseyProps {
  typingText: string;
  onCta: () => void;
  onPricing: () => void;
}

export const HeroOdyssey: React.FC<HeroOdysseyProps> = ({ typingText, onCta, onPricing }) => {
  const SORA: React.CSSProperties = { fontFamily: "'Sora', sans-serif" };
  const INTER: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", background: "#030812", overflow: "hidden" }}>

      {/* Retro grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(hsl(217,32%,12%,.45) 1px, transparent 1px), linear-gradient(90deg, hsl(217,32%,12%,.45) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
      }} />

      {/* Aurora orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
        transition={{ opacity: { duration: 1.4 }, scale: { duration: 1.4 }, x: { duration: 18, repeat: Infinity, ease: "easeInOut" }, y: { duration: 18, repeat: Infinity, ease: "easeInOut" } }}
        style={{ position: "absolute", top: "-10%", left: "20%", width: "clamp(380px,45vw,600px)", height: "clamp(380px,45vw,600px)", borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, hsl(217,91%,60%,.22) 0%, transparent 70%)", filter: "blur(72px)", zIndex: 1, pointerEvents: "none" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, x: [0, -25, 18, 0], y: [0, 18, -12, 0] }}
        transition={{ opacity: { duration: 1.8, delay: 0.3 }, scale: { duration: 1.8, delay: 0.3 }, x: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }, y: { duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
        style={{ position: "absolute", top: "5%", right: "15%", width: "clamp(280px,35vw,480px)", height: "clamp(280px,35vw,480px)", borderRadius: "50%", background: "radial-gradient(circle at 70% 40%, hsl(263,80%,65%,.18) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 1, pointerEvents: "none" }}
      />
      {/* Subtle bottom glow */}
      <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: 2, background: "linear-gradient(90deg, transparent, hsl(217,91%,60%,.3), transparent)", zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(100px,14vw,160px) clamp(20px,5vw,40px) 60px" }}>
        <motion.div variants={container} initial="hidden" animate="visible" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 860 }}>

          {/* Badge */}
          <motion.div variants={item}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32, padding: "6px 18px", borderRadius: 999, border: "1px solid hsl(217,91%,60%,.2)", background: "hsl(217,91%,60%,.07)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(217,91%,60%)", boxShadow: "0 0 10px hsl(217,91%,60%,.7)", display: "inline-block" }} />
              <span style={{ ...INTER, fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "hsl(217,91%,65%)" }}>Agence Web</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={item} style={{ ...SORA, fontSize: "clamp(52px,8vw,96px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 4px" }}>
            Votre site
          </motion.h1>

          {/* Typing line */}
          <motion.div variants={item} style={{ minHeight: "clamp(56px,8vw,100px)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
            <span style={{ ...SORA, fontSize: "clamp(44px,7vw,84px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,80%,72%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {typingText || " "}
              <span style={{ display: "inline-block", width: "0.08em", height: "1em", background: "hsl(217,91%,66%)", borderRadius: 2, marginLeft: "0.05em", animation: "blink 1s step-end infinite", verticalAlign: "text-bottom", WebkitTextFillColor: "initial" }} />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} style={{ ...INTER, fontSize: "clamp(16px,1.3vw,18px)", lineHeight: 1.8, color: "hsl(215,20%,58%)", maxWidth: 580, margin: "0 0 48px" }}>
            Artisan, indépendant ou petite structure.&nbsp;
            <span style={{ color: "hsl(210,40%,88%)", fontWeight: 500 }}>Fluxa conçoit votre site professionnel</span>, rapide et soigné, livré clé en main.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
            {/* Primary CTA — shimmer border */}
            <button onClick={onCta} className="hero-cta-primary">
              <span>Demander un devis gratuit</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={onPricing} style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 28px", borderRadius: 14, ...INTER, fontSize: 15, fontWeight: 600, color: "hsl(210,40%,90%)", background: "hsl(217,91%,60%,.06)", border: "1px solid hsl(217,91%,60%,.18)", cursor: "pointer", transition: "all .25s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "hsl(217,91%,60%,.12)"; e.currentTarget.style.borderColor = "hsl(217,91%,60%,.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "hsl(217,91%,60%,.06)"; e.currentTarget.style.borderColor = "hsl(217,91%,60%,.18)"; }}>
              Voir les tarifs
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 20 }}>
            {[
              { label: "100% responsive" },
              { label: "Visible sur Google" },
              { label: "À partir de 890 € tout compris" },
            ].map((b, i) => (
              <React.Fragment key={b.label}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "hsl(215,20%,18%)", display: "inline-block" }} />}
                <span style={{ ...INTER, fontSize: 12, fontWeight: 500, color: "hsl(215,20%,40%)" }}>{b.label}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @property --hero-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes hero-spin { to { --hero-angle: 360deg; } }
        .hero-cta-primary {
          --h: hsl(217,91%,60%);
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 32px;
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, hsl(217,91%,58%), hsl(217,77%,44%));
          border: none;
          cursor: pointer;
          box-shadow: 0 16px 40px -12px hsl(217,91%,60%,.45);
          transition: transform .3s ease, box-shadow .3s ease;
          overflow: hidden;
        }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          padding: 2px;
          background: conic-gradient(from var(--hero-angle), hsl(217,91%,60%), hsl(263,80%,70%), hsl(217,91%,60%));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: hero-spin 3s linear infinite;
          opacity: 0;
          transition: opacity .3s ease;
        }
        .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 20px 50px -12px hsl(217,91%,60%,.65); }
        .hero-cta-primary:hover::before { opacity: 1; }
      `}</style>
    </div>
  );
};
