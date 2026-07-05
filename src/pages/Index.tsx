import SEOHead from "@/components/SEOHead";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, ArrowRight, Send, MapPin, Clock, Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import fluxaLogo from "@/assets/logo-transparent.webp";
import { HeroOdyssey } from "@/components/HeroOdyssey";
import { Reveal, RevealGroup } from "@/components/Reveal";

const SORA: React.CSSProperties = { fontFamily: "'Sora', sans-serif" };
const INTER: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };

const FAQ_DATA = [
  { q: "Combien coûte un site web ?", a: "Notre formule de base est à 890 € pour un site jusqu'à 5 pages, avec hébergement et domaine inclus la première année. Des options sont disponibles pour personnaliser selon vos besoins." },
  { q: "Combien de temps pour créer mon site ?", a: "Après validation de la maquette, votre site est développé et mis en ligne généralement en 2 à 3 semaines, selon les options choisies et le contenu à intégrer." },
  { q: "Qu'est-ce qui est inclus dans le prix ?", a: "Design responsive, jusqu'à 5 pages, formulaire de contact, SEO de base, hébergement et nom de domaine la première année, 1 round de modifications et le support technique." },
  { q: "L'hébergement et le domaine sont-ils inclus ?", a: "Oui, l'hébergement et le nom de domaine sont inclus la première année. Ensuite, le renouvellement est à prévoir (environ 50 à 80 €/an selon l'hébergeur)." },
  { q: "Puis-je payer en plusieurs fois ?", a: "Oui, paiement en 2 fois sans frais : 50% à la commande, 50% à la livraison. D'autres arrangements sont possibles pour des projets plus importants." },
  { q: "Que se passe-t-il si je ne suis pas satisfait ?", a: "Nous incluons 1 round de modifications et travaillons avec vous jusqu'à validation complète. Notre objectif est votre satisfaction à 100%." },
];

function SectionBadge({ label, color = "hsl(217,91%,60%)" }: { label: string; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "6px 16px", borderRadius: 999, border: `1px solid ${color}26`, background: `${color}0a` }}>
      <span style={{ ...INTER, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color }}>{label}</span>
    </div>
  );
}

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderRadius: 14, border: `1px solid ${isOpen ? "hsl(217,91%,60%,.35)" : "hsl(217,32%,14%)"}`, background: "hsl(217,33%,8%)", overflow: "hidden", transition: "border-color 0.3s" }}>
      <button onClick={onToggle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", padding: "20px 22px", border: "none", cursor: "pointer", background: "transparent", ...INTER, fontSize: 15, fontWeight: 600, color: "hsl(210,40%,96%)" }}>
        <span>{q}</span>
        <ChevronDown size={18} style={{ flexShrink: 0, transition: "transform 0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0)", color: "hsl(217,91%,64%)" }} />
      </button>
      <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div style={{ padding: "0 22px 20px", ...INTER, fontSize: 14, color: "hsl(215,20%,68%)", lineHeight: 1.7, opacity: isOpen ? 1 : 0, transform: isOpen ? "translateY(0)" : "translateY(-6px)", transition: "opacity 0.25s ease 0.1s, transform 0.25s ease 0.1s" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

const Index = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "/");
    }
  }, []);

  const [spot, setSpot] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setSpot({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const PHRASES = ["livré clé en main", "qui vous trouve des clients", "sans prise de tête"];
  const [typingText, setTypingText] = useState("");
  useEffect(() => {
    let rafId: number;
    let phraseIdx = 0, charIdx = 0, deleting = false, pauseUntil = 0, lastTime = 0;
    const CHAR = 80, DEL = 35, PAUSE_FULL = 3000, PAUSE_EMPTY = 300;
    const tick = (now: number) => {
      const phrase = PHRASES[phraseIdx];
      if (now < pauseUntil) { rafId = requestAnimationFrame(tick); return; }
      if (!lastTime) lastTime = now;
      if (now - lastTime >= (deleting ? DEL : CHAR)) {
        lastTime = now;
        if (!deleting) {
          charIdx = Math.min(charIdx + 1, phrase.length);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === phrase.length) { pauseUntil = now + PAUSE_FULL; deleting = true; }
        } else {
          charIdx = Math.max(charIdx - 1, 0);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; pauseUntil = now + PAUSE_EMPTY; }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector<HTMLElement>(".method-card");
      const cardW = card ? card.offsetWidth + 16 : el.offsetWidth;
      const idx = Math.round(el.scrollLeft / cardW);
      setCarouselIdx(Math.min(idx, 3));
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    // Touch: un swipe = une carte, peu importe la vélocité
    let touchStartX = 0;
    let touchStartScroll = 0;
    let currentIdx = 0;

    const getCardWidth = () => {
      const card = el.querySelector<HTMLElement>(".method-card");
      return card ? card.offsetWidth + 16 : el.offsetWidth;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartScroll = el.scrollLeft;
      currentIdx = Math.round(el.scrollLeft / getCardWidth());
      // Désactive le scroll natif pendant qu'on gère nous-mêmes
      el.style.overflowX = "hidden";
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const threshold = 30; // px minimum pour compter comme swipe
      const cardW = getCardWidth();
      let next = currentIdx;
      if (dx > threshold) next = Math.min(currentIdx + 1, 3);
      else if (dx < -threshold) next = Math.max(currentIdx - 1, 0);
      el.style.overflowX = "auto";
      el.scrollTo({ left: next * cardW, behavior: "smooth" });
      setCarouselIdx(next);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = new FormData(e.currentTarget);
    setSending(true); setSendError(false);
    try {
      await emailjs.send("service_mxfwifu", "template_co6wxnr", {
        from_name: f.get("name") as string || "",
        from_email: f.get("email") as string || "",
        subject: `Demande de site : ${f.get("need") || ""}`,
        message: f.get("message") as string || "(aucun message)",
      }, "RZoXBavBZ_H8G_AYk");
      navigate("/merci");
    } catch {
      setSendError(true);
      setSending(false);
    }
  };

  const NAV = [
    { href: "#methode", label: "Méthode" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#pourquoi", label: "Pourquoi nous ?" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#030812", color: "hsl(210,40%,98%)" }}>
      <SEOHead />

      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        @keyframes glowPulse { 0%,100%{opacity:.25}50%{opacity:.5} }
        @keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(8px);opacity:1} }
        @keyframes gridShift { 0%{transform:translateY(0)}100%{transform:translateY(72px)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)}100%{transform:translateX(100%)} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        .nl span.nl-bar{position:absolute;bottom:0;left:0;width:100%;height:2px;background:hsl(217,91%,60%);border-radius:1px;transform:scaleX(0);transform-origin:left;transition:transform .3s cubic-bezier(.4,0,.2,1)}
        .nl:hover span.nl-bar{transform:scaleX(1)}
        .opt:hover{border-color:hsl(217,91%,60%,0.25)!important;background:hsl(217,91%,60%,0.04)!important}
        .gc:hover{transform:translateY(-4px)}
        .sc:hover{transform:translateY(-4px)}
        .si:hover{border-color:hsl(217,91%,60%,.3)!important;background:hsl(217,91%,60%,.15)!important}
        input:focus,textarea:focus,select:focus{border-color:hsl(217,91%,60%,.5)!important;box-shadow:0 0 0 2px hsl(217,91%,60%,.12)!important;outline:none}
        .bp:hover{transform:translateY(-3px);box-shadow:0 20px 50px -12px hsl(217,91%,60%,.65)!important}
        .bs:hover{background:hsl(217,91%,60%,.12)!important;border-color:hsl(217,91%,60%,.35)!important}
        .ch:hover{box-shadow:0 0 24px -4px hsl(217,91%,60%,.5)!important;transform:translateY(-1px)}
        .opt{transition:all .2s ease}.gc{transition:all .3s ease}.sc{transition:all .35s ease}
        .method-carousel{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:16px;padding-bottom:16px;scrollbar-width:none;padding-left:20px;padding-right:20px}
        .method-carousel::-webkit-scrollbar{display:none}
        .method-carousel>.method-card{flex:0 0 calc(100vw - 60px);max-width:320px}
        @media(min-width:768px){.method-carousel{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));overflow-x:visible;scroll-snap-type:none;padding-bottom:0}.method-carousel>.method-card{flex:unset;max-width:unset}}
        @keyframes swipeHint{0%{transform:translateX(0);opacity:.7}40%{transform:translateX(10px);opacity:1}70%{transform:translateX(4px);opacity:.9}100%{transform:translateX(0);opacity:.7}}
        .swipe-hint{animation:swipeHint 1.8s ease-in-out 1.2s 2 forwards}
        @media(min-width:768px){#methode{scroll-margin-top:-95px!important}#pricing{scroll-margin-top:-95px!important}#pourquoi{scroll-margin-top:-95px!important}#faq{scroll-margin-top:-95px!important}.section-mobile-pad{padding-top:120px!important;padding-bottom:120px!important}.swipe-hint{display:none}.header-mobile{display:none!important}.header-desktop{display:flex!important}}
        @media(max-width:767px){#methode{scroll-margin-top:-60px!important}#pricing{scroll-margin-top:-60px!important}#pourquoi{scroll-margin-top:-60px!important}#faq{scroll-margin-top:-60px!important}.section-mobile-pad{padding-top:64px!important;padding-bottom:64px!important;padding-left:20px!important;padding-right:20px!important}.header-mobile{display:flex!important}.header-desktop{display:none!important}}
        .header-cta-shiny{
          position:relative;display:inline-flex;align-items:center;gap:10px;
          padding:5px 22px 5px 5px;border-radius:999px;
          font-family:'Inter',sans-serif;font-size:15px;font-weight:600;letter-spacing:.01em;
          color:#fff;text-decoration:none;cursor:pointer;
          background:hsl(217,91%,60%);
          box-shadow:0 6px 18px -6px hsl(217,91%,55%,.5),inset 0 1px 0 hsl(0,0%,100%,.15);
          transition:background .2s ease,transform .2s ease,box-shadow .2s ease;
        }
        .header-cta-shiny .cta-ico{
          display:inline-flex;align-items:center;justify-content:center;
          width:34px;height:34px;border-radius:999px;flex-shrink:0;
          background:hsl(0,0%,100%,.16);
          box-shadow:inset 0 0 0 1px hsl(0,0%,100%,.2);
          transition:background .2s ease,transform .2s ease;
        }
        .header-cta-shiny:hover{background:hsl(217,91%,64%);transform:translateY(-1px);box-shadow:0 10px 26px -6px hsl(217,91%,55%,.6),inset 0 1px 0 hsl(0,0%,100%,.2)}
        .header-cta-shiny:hover .cta-ico{background:hsl(0,0%,100%,.24);transform:scale(1.05)}
        .header-cta-shiny:active{transform:translateY(0);box-shadow:0 4px 12px -6px hsl(217,91%,55%,.5),inset 0 1px 0 hsl(0,0%,100%,.15)}
      `}</style>

      {/* HEADER */}
      <header style={{ position: "fixed", inset: "0 0 auto 0", zIndex: 1000, transition: "all 0.4s cubic-bezier(.4,0,.2,1)", height: 80, background: scrolled ? "hsla(222,84%,3.5%,.88)" : "transparent", backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none", borderBottom: `1px solid ${scrolled ? "hsl(217,32%,14%)" : "transparent"}` }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 1, width: "100%", transformOrigin: "left", transform: `scaleX(${scrollProgress})`, background: "linear-gradient(90deg,hsl(217,91%,60%),hsl(263,90%,74%))", transition: "transform .1s linear" }} />
        {/* ── MOBILE HEADER ── hamburger gauche | logo centré | spacer droite */}
        <div className="header-mobile" style={{ width: "100%", height: 80, padding: "0 16px", alignItems: "center", justifyContent: "space-between" }}>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button aria-label="Menu" style={{ padding: 8, background: "transparent", border: "none", cursor: "pointer", color: "#fff", flexShrink: 0 }}><Menu size={22} /></button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm">
              <nav style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 56 }}>
                {NAV.map((item, i) => (
                  <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{ padding: "12px 0", ...INTER, fontSize: 16, borderBottom: "1px solid hsl(217,32%,16%)", color: "hsl(210,40%,96%)", textDecoration: "none", opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(20px)", transition: `opacity .3s ease ${i * 0.06 + 0.1}s, transform .3s ease ${i * 0.06 + 0.1}s` }}>{item.label}</a>
                ))}
                <a href="#contact-form" onClick={() => setMenuOpen(false)} style={{ marginTop: 16, display: "flex", justifyContent: "center", padding: 14, borderRadius: 12, background: "linear-gradient(135deg,hsl(217,91%,58%),hsl(217,77%,44%))", color: "#fff", ...INTER, fontWeight: 600, textDecoration: "none" }}>Nous contacter</a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo centré — disparaît quand le menu est ouvert */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", opacity: menuOpen ? 0 : 1, pointerEvents: menuOpen ? "none" : "auto", transition: "opacity 0.2s ease", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <img src={fluxaLogo} alt="Fluxa" style={{ height: 160, width: "auto", objectFit: "contain" }} />
          </a>

          {/* Spacer droite pour équilibrer le hamburger */}
          <div style={{ width: 38, flexShrink: 0 }} />
        </div>

        {/* ── DESKTOP HEADER ── logo gauche | nav centre | CTA droite */}
        <div className="header-desktop" style={{ maxWidth: 1400, width: "100%", height: 80, margin: "0 auto", padding: "0 40px", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img src={fluxaLogo} alt="Fluxa" style={{ height: 160, width: "auto", objectFit: "contain" }} />
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 44 }}>
            {NAV.map(item => (
              <a key={item.href} href={item.href} className="nl" style={{ position: "relative", textDecoration: "none", ...INTER, fontSize: 16, fontWeight: 500, color: "#fff", letterSpacing: "0.02em", paddingBottom: 5, display: "block" }}>
                {item.label}<span className="nl-bar" />
              </a>
            ))}
          </nav>
          <a href="#contact-form" className="header-cta-shiny">
            <span className="cta-ico"><Phone size={16} strokeWidth={2.2} /></span>
            <span>Nous contacter</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <HeroOdyssey
        typingText={typingText}
        onCta={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        onPricing={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
      />

            {/* TRUST STRIP */}
      <div style={{ background: "#030812", borderTop: "1px solid hsl(217,32%,10%)", padding: "clamp(20px,4vw,52px) 20px" }}>
        <RevealGroup stagger={0.15} delay={0} style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "nowrap", gap: 0 }}>
          {[{ value: "890€", label: "Tout compris" }, { value: "2–3 sem.", label: "Livraison" }, { value: "100%", label: "Propriété" }].map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              {i > 0 && <div style={{ width: 1, height: 32, background: "hsl(217,32%,12%)", flexShrink: 0 }} />}
              <div style={{ textAlign: "center", flex: 1, padding: "0 8px" }}>
                <div style={{ ...SORA, fontSize: "clamp(18px,4vw,36px)", fontWeight: 700, color: "hsl(210,40%,98%)", letterSpacing: "-0.03em", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ ...INTER, fontSize: "clamp(10px,2.2vw,12px)", fontWeight: 500, color: "hsl(215,20%,42%)", marginTop: 6, letterSpacing: "0.04em" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>

      {/* MÉTHODE */}
      <section id="methode" className="section-mobile-pad" style={{ position: "relative", background: "#030812", padding: "120px 40px", overflow: "hidden", scrollMarginTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 80%,hsl(217,50%,6%) 0%,#030812 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 80 }}>
            <SectionBadge label="Notre méthode" />
            <h2 style={{ ...SORA, fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "hsl(210,40%,98%)", margin: "0 0 16px", lineHeight: 1.1 }}>Simple, rapide, efficace</h2>
            <p style={{ ...INTER, fontSize: 17, color: "hsl(215,20%,55%)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>De votre premier message à la mise en ligne, en 4 étapes claires.</p>
          </Reveal>
          <div ref={carouselRef} className="method-carousel">
            {[
              { num: "01", color: "hsl(217,91%,66%)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(217,91%,66%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>, title: "Échange initial", text: "On discute de votre activité, vos besoins et vos objectifs. Gratuit et sans engagement." },
              { num: "02", color: "hsl(263,90%,74%)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(263,90%,74%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" /><path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" /></svg>, title: "Maquette et design", text: "On crée la maquette visuelle de votre site. Vous validez, on ajuste ensemble." },
              { num: "03", color: "hsl(160,84%,45%)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(160,84%,45%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: "Développement", text: "On code votre site, optimisé SEO, rapide et responsive. Vous suivez l'avancement en temps réel." },
              { num: "04", color: "hsl(43,96%,56%)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="hsl(43,96%,56%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" /></svg>, title: "Mise en ligne", text: "Votre site est en ligne, avec domaine et hébergement configurés. Vous êtes visible." },
            ].map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1} y={20} className="method-card">
              <div className="sc" style={{ height: "100%", position: "relative", padding: "36px 28px", borderRadius: 20, border: "1px solid hsl(217,32%,14%)", background: "linear-gradient(180deg,hsl(217,40%,7%) 0%,hsl(222,84%,4.9%) 100%)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 66, height: 56, borderRadius: 12, background: `${step.color}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ ...SORA, fontSize: 40, fontWeight: 700, color: step.color }}>{step.num}</span>
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${step.color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{step.icon}</div>
                <h3 style={{ ...SORA, fontSize: 18, fontWeight: 600, color: "hsl(210,40%,98%)", margin: "0 0 10px", letterSpacing: "-0.01em" }}>{step.title}</h3>
                <p style={{ ...INTER, fontSize: 14, color: "hsl(215,20%,50%)", lineHeight: 1.65, margin: 0 }}>{step.text}</p>
                {/* Swipe hint sur la première carte uniquement, visible mobile seulement */}
                {i === 0 && (
                  <div className="swipe-hint" style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(217,91%,60%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    <span style={{ ...INTER, fontSize: 11, color: "hsl(217,91%,60%)", letterSpacing: "0.08em" }}>Glisser</span>
                  </div>
                )}
              </div>
              </Reveal>
            ))}
          </div>
          {/* Dots pagination — mobile only */}
          <div className="md:hidden" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
            {[0,1,2,3].map(i => (
              <button key={i} onClick={() => { const el = carouselRef.current; if (!el) return; const card = el.querySelector<HTMLElement>(".method-card"); const cardW = card ? card.offsetWidth + 16 : el.offsetWidth; el.scrollTo({ left: i * cardW, behavior: "smooth" }); setCarouselIdx(i); }} style={{ width: carouselIdx === i ? 20 : 6, height: 6, borderRadius: 999, border: "none", cursor: "pointer", transition: "all .3s ease", background: carouselIdx === i ? "hsl(217,91%,60%)" : "hsl(217,32%,20%)", padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-mobile-pad" style={{ position: "relative", background: "#030812", padding: "120px 40px", overflow: "hidden", scrollMarginTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 20%,hsl(217,50%,7%) 0%,#030812 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionBadge label="Tarifs" />
            <h2 style={{ ...SORA, fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "hsl(210,40%,98%)", margin: "0 0 16px", lineHeight: 1.1 }}>Transparents, tout compris</h2>
            <p style={{ ...INTER, fontSize: 17, color: "hsl(215,20%,55%)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Un site soigné, livré rapidement, à partir de <span style={{ color: "hsl(210,40%,96%)", fontWeight: 600 }}>890€</span> tout compris.
            </p>
          </Reveal>

          {/* Comparatif */}
          <Reveal delay={0.15} style={{ maxWidth: 720, margin: "0 auto 64px", borderRadius: 18, overflow: "hidden", border: "1px solid hsl(217,32%,14%)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center", borderBottom: "1px solid hsl(217,32%,14%)" }}>
              <div style={{ padding: "16px 8px", ...INTER, fontSize: 13, fontWeight: 600, color: "hsl(215,20%,45%)" }}>Agence web</div>
              <div style={{ padding: "16px 8px", ...INTER, fontSize: 13, fontWeight: 600, color: "hsl(217,91%,68%)", background: "hsl(217,91%,60%,.08)", borderLeft: "1px solid hsl(217,91%,60%,.15)", borderRight: "1px solid hsl(217,91%,60%,.15)" }}>Fluxa</div>
              <div style={{ padding: "16px 8px", ...INTER, fontSize: 13, fontWeight: 600, color: "hsl(215,20%,45%)" }}>Freelance</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", textAlign: "center" }}>
              <div style={{ padding: "24px 8px" }}>
                <div style={{ ...SORA, fontSize: 28, fontWeight: 700, color: "hsl(215,20%,35%)", letterSpacing: "-0.02em" }}>3k–8k€</div>
                <div style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,35%)", marginTop: 4 }}>2 à 4 mois</div>
              </div>
              <div style={{ padding: "24px 8px", background: "hsl(217,91%,60%,.04)", borderLeft: "1px solid hsl(217,91%,60%,.15)", borderRight: "1px solid hsl(217,91%,60%,.15)" }}>
                <div style={{ ...SORA, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>dès 890€</div>
                <div style={{ ...INTER, fontSize: 12, color: "hsl(217,91%,65%)", marginTop: 4, fontWeight: 500 }}>Livré en 2–3 semaines</div>
              </div>
              <div style={{ padding: "24px 8px" }}>
                <div style={{ ...SORA, fontSize: 28, fontWeight: 700, color: "hsl(215,20%,35%)", letterSpacing: "-0.02em" }}>1k–4k€</div>
                <div style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,35%)", marginTop: 4 }}>Délai variable</div>
              </div>
            </div>
          </Reveal>

          {/* Grid prix */}
          <Reveal delay={0.2} style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32, alignItems: "start" }}>
            <div style={{ position: "relative", borderRadius: 24, padding: "40px 36px", border: "1px solid hsl(217,91%,60%,.3)", background: "linear-gradient(180deg,hsl(217,33%,9%) 0%,hsl(222,84%,4.9%) 100%)", boxShadow: "0 40px 90px -40px hsl(217,91%,60%,.3)" }}>
              <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 2, borderRadius: "0 0 2px 2px", background: "linear-gradient(90deg,hsl(217,91%,60%),hsl(263,90%,74%))" }} />
              <div style={{ ...INTER, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "hsl(217,91%,60%)", marginBottom: 12 }}>Formule Site Web</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                <span style={{ ...SORA, fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>890€</span>
                <span style={{ ...INTER, fontSize: 14, color: "hsl(215,20%,50%)" }}>tout compris</span>
              </div>
              <p style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,45%)", margin: "0 0 28px" }}>Hébergement + domaine offerts la 1ère année</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {["Jusqu'à 5 pages (Accueil, Services, À propos, Galerie, Contact)", "Design responsive mobile + desktop", "Formulaire de contact fonctionnel", "SEO de base (balises, métadonnées)", "Optimisation vitesse et performance", "Hébergement et domaine 1ère année inclus", "1 round de modifications inclus"].map(feat => (
                  <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(217,91%,60%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    <span style={{ ...INTER, fontSize: 14, color: "hsl(215,20%,72%)", lineHeight: 1.5 }}>{feat}</span>
                  </div>
                ))}
              </div>
              <a href="#contact-form" className="bp" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: 16, borderRadius: 14, ...INTER, fontSize: 15, fontWeight: 600, textDecoration: "none", color: "#fff", background: "linear-gradient(135deg,hsl(217,91%,58%),hsl(217,77%,44%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,.5)", transition: "all .25s ease" }}>
                Démarrer mon projet <ArrowRight size={16} />
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ marginBottom: 4 }}>
                <h3 style={{ ...SORA, fontSize: 24, fontWeight: 700, color: "hsl(210,40%,98%)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Options à la carte</h3>
                <p style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,50%)", margin: 0 }}>Toutes les options sont cumulables.</p>
              </div>
              {[
                { label: "Pages supplémentaires", price: "+100€/page", desc: "Blog, Équipe, Actualités, etc." },
                { label: "Galerie photo avancée", price: "+150€", desc: "Lightbox, filtres, mise en page optimisée" },
                { label: "Prise de RDV en ligne", price: "+180€", desc: "Calendrier + notifications email" },
                { label: "Rédaction SEO", price: "+250€", desc: "Textes pro optimisés Google (2 000 mots)" },
                { label: "Multilingue", price: "+250€/langue", desc: "Anglais, espagnol ou autre" },
              ].map(opt => (
                <div key={opt.label} className="opt" style={{ borderRadius: 14, padding: "16px 18px", border: "1px solid hsl(217,32%,14%)", background: "hsl(217,33%,8%)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                    <span style={{ ...INTER, fontSize: 14, fontWeight: 600, color: "hsl(210,40%,92%)" }}>{opt.label}</span>
                    <span style={{ ...SORA, fontSize: 14, fontWeight: 700, color: "hsl(217,91%,66%)" }}>{opt.price}</span>
                  </div>
                  <p style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,45%)", margin: 0 }}>{opt.desc}</p>
                </div>
              ))}
              <div style={{ borderRadius: 16, padding: "20px 22px", border: "1px solid hsl(217,91%,60%,.2)", background: "hsl(217,91%,60%,.04)", marginTop: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                  <span style={{ ...SORA, fontSize: 16, fontWeight: 600, color: "hsl(210,40%,98%)" }}>Maintenance mensuelle</span>
                  <span style={{ ...SORA, fontSize: 20, fontWeight: 700, color: "hsl(217,91%,66%)" }}>59€/mois</span>
                </div>
                {["Mises à jour de sécurité", "Sauvegardes hebdomadaires", "Support technique prioritaire", "Modifications de contenu"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "hsl(217,91%,60%,.5)", flexShrink: 0 }} />
                    <span style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,55%)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,40%)", textAlign: "center", marginTop: 24 }}>
              Paiement en 2 fois sans frais · Propriété totale du site · Support inclus
            </p>
          </Reveal>
        </div>
      </section>

      {/* POURQUOI FLUXA */}
      <section id="pourquoi" className="section-mobile-pad" style={{ position: "relative", background: "#030812", padding: "120px 40px", overflow: "hidden", scrollMarginTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 30% 50%,hsl(217,50%,6%) 0%,#030812 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 72 }}>
            <SectionBadge label="Nos garanties" />
            <h2 style={{ ...SORA, fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", color: "hsl(210,40%,98%)", margin: "0 0 16px", lineHeight: 1.1 }}>Pourquoi choisir Fluxa</h2>
            <p style={{ ...INTER, fontSize: 17, color: "hsl(215,20%,55%)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Ce qui nous différencie des autres agences et freelances.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
            {[
              { color: "hsl(160,84%,50%)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(160,84%,50%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>, title: "Propriété totale", text: "Le site est à vous. Code source, contenu, domaine : tout vous appartient." },
              { color: "hsl(43,96%,56%)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(43,96%,56%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, title: "Rapide et performant", text: "Sites optimisés pour la vitesse. Vos visiteurs n'attendent pas, Google non plus." },
              { color: "hsl(263,90%,74%)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(263,90%,74%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>, title: "Code propre", text: "Pas de WordPress ni de constructeur. Du code sur-mesure, maintenable et évolutif." },
              { color: "hsl(217,91%,66%)", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(217,91%,66%)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>, title: "Support dédié", text: "Un interlocuteur unique, disponible et réactif. Pas de ticket, pas de robot." },
            ].map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1} y={20}>
                <div className="gc" style={{ height: "100%", padding: "32px 24px", borderRadius: 20, border: "1px solid hsl(217,32%,14%)", background: "linear-gradient(180deg,hsl(217,40%,7%) 0%,hsl(222,84%,4.9%) 100%)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${g.color}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>{g.icon}</div>
                  <h3 style={{ ...SORA, fontSize: 17, fontWeight: 600, color: "hsl(210,40%,98%)", margin: "0 0 8px" }}>{g.title}</h3>
                  <p style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,50%)", lineHeight: 1.6, margin: 0 }}>{g.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-mobile-pad" style={{ position: "relative", background: "#030812", padding: "120px 40px", overflow: "hidden", scrollMarginTop: 80 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "hsl(217,91%,60%,.06)", filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 56, alignItems: "start" }}>
            <Reveal y={24}>
              <SectionBadge label="Contact" />
              <h2 style={{ ...SORA, fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.03em", color: "hsl(210,40%,98%)", margin: "0 0 16px", lineHeight: 1.1 }}>
                Créons votre{" "}
                <span style={{ background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>site web</span>
              </h2>
              <p style={{ ...INTER, fontSize: 16, color: "hsl(215,20%,62%)", lineHeight: 1.7, margin: "0 0 32px" }}>Parlez-nous de votre projet et recevez un devis personnalisé sous 48h, sans engagement.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { icon: <Mail size={19} color="hsl(217,91%,64%)" />, label: "Email", content: <a href="mailto:fluxa.contact@gmail.com" style={{ ...INTER, fontSize: 14, fontWeight: 600, color: "hsl(210,40%,94%)", textDecoration: "none" }}>fluxa.contact@gmail.com</a> },
                  { icon: <MapPin size={19} color="hsl(217,91%,64%)" />, label: "Localisation", content: <span style={{ ...INTER, fontSize: 14, fontWeight: 600, color: "hsl(210,40%,94%)" }}>Cognin, Savoie · France entière</span> },
                  { icon: <Clock size={19} color="hsl(217,91%,64%)" />, label: "Délai de réponse", content: <span style={{ ...INTER, fontSize: 14, fontWeight: 600, color: "hsl(210,40%,94%)" }}>Sous 48h, sans engagement</span> },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "hsl(217,91%,60%,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,50%)" }}>{item.label}</div>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} y={24}>
            <div id="contact-form" style={{ borderRadius: 20, border: "1px solid hsl(217,32%,16%)", background: "hsl(217,33%,7%)", backdropFilter: "blur(12px)", padding: 32 }}>
              <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[{ name: "name", label: "Nom", type: "text", placeholder: "Jean Dupont" }, { name: "email", label: "Email", type: "email", placeholder: "jean@exemple.fr" }].map(field => (
                    <div key={field.name}>
                      <label style={{ display: "block", marginBottom: 7, ...INTER, fontSize: 13, fontWeight: 500, color: "hsl(210,40%,88%)" }}>{field.label}</label>
                      <input name={field.name} type={field.type} required placeholder={field.placeholder} style={{ width: "100%", borderRadius: 11, border: "1px solid hsl(217,32%,16%)", background: "hsl(217,33%,10%)", color: "hsl(210,40%,96%)", padding: "13px 15px", ...INTER, fontSize: 14, outline: "none", transition: "all .2s", boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 7, ...INTER, fontSize: 13, fontWeight: 500, color: "hsl(210,40%,88%)" }}>Type de site souhaité</label>
                  <select name="need" required defaultValue="" style={{ width: "100%", borderRadius: 11, border: "1px solid hsl(217,32%,16%)", background: "hsl(217,33%,10%)", color: "hsl(210,40%,96%)", padding: "13px 15px", ...INTER, fontSize: 14, outline: "none", transition: "all .2s", boxSizing: "border-box" as const, cursor: "pointer" }}>
                    <option value="" disabled>Sélectionner</option>
                    <option>Site web simple (890€)</option>
                    <option>Site avec galerie photo</option>
                    <option>Site avec prise de RDV</option>
                    <option>Refonte de site existant</option>
                    <option>Autre / Je ne sais pas encore</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: 7, ...INTER, fontSize: 13, fontWeight: 500, color: "hsl(210,40%,88%)" }}>Votre message</label>
                  <textarea name="message" rows={4} placeholder="Décrivez votre projet : votre activité, vos besoins, vos attentes…" style={{ width: "100%", borderRadius: 11, border: "1px solid hsl(217,32%,16%)", background: "hsl(217,33%,10%)", color: "hsl(210,40%,96%)", padding: "13px 15px", ...INTER, fontSize: 14, outline: "none", transition: "all .2s", boxSizing: "border-box" as const, resize: "none" }} />
                </div>
                {/* Consentement RGPD */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                  <input type="checkbox" name="consent" required style={{ marginTop: 2, flexShrink: 0, accentColor: "hsl(217,91%,60%)", width: 15, height: 15 }} />
                  <span style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,55%)", lineHeight: 1.5 }}>
                    J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
                    <a href="/politique-confidentialite" style={{ color: "hsl(217,91%,65%)", textDecoration: "underline" }}>politique de confidentialité</a>.
                  </span>
                </label>
                {sendError && <p style={{ ...INTER, fontSize: 13, color: "hsl(0,90%,65%)", margin: 0 }}>Erreur d'envoi. Réessayez ou écrivez-nous directement.</p>}
                <button type="submit" className="bp" disabled={sending} style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16, borderRadius: 14, border: "none", ...INTER, fontSize: 15, fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,hsl(217,91%,58%),hsl(217,77%,44%))", boxShadow: "0 12px 32px -10px hsl(217,91%,60%,.5)", cursor: sending ? "not-allowed" : "pointer", overflow: "hidden", transition: "all .25s ease", opacity: sending ? 0.7 : 1 }}>
                  {sending ? "Envoi en cours…" : "Envoyer ma demande"} <Send size={16} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,hsla(0,0%,100%,.1),transparent)", animation: "shimmer 3s ease-in-out infinite", pointerEvents: "none" }} />
                </button>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(160,84%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>, label: "Hébergement sécurisé" },
                    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(43,96%,56%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, label: "Livraison rapide" },
                    { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="hsl(217,91%,64%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>, label: "SEO optimisé" },
                  ].map(tag => (
                    <span key={tag.label} style={{ display: "inline-flex", alignItems: "center", gap: 6, ...INTER, fontSize: 11, color: "hsl(215,20%,60%)", border: "1px solid hsl(217,32%,16%)", borderRadius: 999, padding: "5px 12px" }}>
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </form>
            </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-mobile-pad" style={{ position: "relative", background: "linear-gradient(180deg,#030812,hsl(217,40%,6%),#030812)", padding: "100px 40px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <SectionBadge label="FAQ" />
            <h2 style={{ ...SORA, fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, letterSpacing: "-0.03em", color: "hsl(210,40%,98%)", margin: 0, lineHeight: 1.1 }}>Questions fréquentes</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ_DATA.map((item, i) => (
              <Reveal key={i} delay={i * 0.07} y={16}>
                <FaqItem q={item.q} a={item.a} isOpen={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <p style={{ ...INTER, fontSize: 14, color: "hsl(215,20%,50%)", margin: "0 0 12px" }}>Vous n'avez pas trouvé votre réponse ?</p>
              <a href="#contact-form" style={{ ...INTER, fontSize: 15, fontWeight: 600, color: "hsl(217,91%,66%)", textDecoration: "none" }}>Contactez-nous directement →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020710", borderTop: "1px solid hsl(217,32%,10%)" }}>

        {/* ── MOBILE FOOTER ── */}
        <div className="md:hidden" style={{ padding: "28px 20px 20px" }}>
          {/* Logo centré */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <img src={fluxaLogo} alt="Fluxa" style={{ height: 80, width: "auto", objectFit: "contain" }} />
          </div>
          {/* Nav + Contact côte à côte */}
          <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 20 }}>
            <div>
              <h4 style={{ ...SORA, fontSize: 12, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 10px", letterSpacing: "0.04em" }}>Navigation</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[{ href: "#methode", label: "Méthode" }, { href: "#pricing", label: "Tarifs" }, { href: "#pourquoi", label: "Pourquoi nous" }, { href: "#contact", label: "Contact" }, { href: "#faq", label: "FAQ" },
                  { href: "/creation-site-vitrine-artisan-chambery", label: "Artisans Chambéry" },
                  { href: "/creation-site-vitrine-plombier", label: "Plombier" },
                  { href: "/creation-site-vitrine-electricien", label: "Électricien" },
                  { href: "/creation-site-vitrine-paysagiste", label: "Paysagiste" },
                ].map(l => (
                  <a key={l.href} href={l.href} style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,45%)", textDecoration: "none" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ ...SORA, fontSize: 12, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 10px", letterSpacing: "0.04em" }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                <a href="mailto:fluxa.contact@gmail.com" style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,45%)", textDecoration: "none" }}>fluxa.contact@gmail.com</a>
                <span style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,45%)" }}>Cognin, Savoie</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { href: "https://www.instagram.com/fluxa.fr", icon: <Instagram size={14} color="hsl(215,20%,55%)" /> },
                  { href: "https://www.facebook.com/fluxa.fr", icon: <Facebook size={14} color="hsl(215,20%,55%)" /> },
                  { href: "https://www.linkedin.com/company/fluxa-fr/", icon: <Linkedin size={14} color="hsl(215,20%,55%)" /> },
                ].map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener" className="si" style={{ width: 32, height: 32, borderRadius: 8, background: "hsl(217,91%,60%,.08)", border: "1px solid hsl(217,32%,14%)", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</a>
                ))}
              </div>
            </div>
          </div>
          {/* Bas */}
          <div style={{ borderTop: "1px solid hsl(217,32%,10%)", paddingTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <p style={{ ...INTER, fontSize: 11, color: "hsl(215,20%,28%)", margin: 0 }}>© 2026 Fluxa. Tous droits réservés.</p>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="/mentions-legales" style={{ ...INTER, fontSize: 11, color: "hsl(215,20%,28%)", textDecoration: "none" }}>Mentions légales</a>
              <a href="/politique-confidentialite" style={{ ...INTER, fontSize: 11, color: "hsl(215,20%,28%)", textDecoration: "none" }}>Confidentialité</a>
            </div>
          </div>
        </div>

        {/* ── DESKTOP FOOTER ── inchangé */}
        <div className="hidden md:block" style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 40, marginBottom: 40 }}>
            <div style={{ maxWidth: 280 }}>
              <img src={fluxaLogo} alt="Fluxa" style={{ height: 100, width: "auto", objectFit: "contain", marginBottom: 12 }} />
              <p style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,42%)", lineHeight: 1.6, margin: 0 }}>Agence web spécialisée dans la création de sites professionnels pour artisans, TPE et indépendants.</p>
            </div>
            <div>
              <h4 style={{ ...SORA, fontSize: 13, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 16px", letterSpacing: "0.04em" }}>Navigation</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[{ href: "#methode", label: "Méthode" }, { href: "#pricing", label: "Tarifs" }, { href: "#pourquoi", label: "Pourquoi nous" }, { href: "#contact", label: "Contact" }, { href: "#faq", label: "FAQ" }].map(l => (
                  <a key={l.href} href={l.href} style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,45%)", textDecoration: "none" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ ...SORA, fontSize: 13, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 16px", letterSpacing: "0.04em" }}>Nos pages métiers</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { href: "/creation-site-vitrine-artisan-chambery", label: "Artisans Chambéry" },
                  { href: "/creation-site-vitrine-plombier", label: "Site vitrine plombier" },
                  { href: "/creation-site-vitrine-electricien", label: "Site vitrine électricien" },
                  { href: "/creation-site-vitrine-paysagiste", label: "Site vitrine paysagiste" },
                ].map(l => (
                  <a key={l.href} href={l.href} style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,45%)", textDecoration: "none" }}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ ...SORA, fontSize: 13, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 16px", letterSpacing: "0.04em" }}>Contact</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="mailto:fluxa.contact@gmail.com" style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,45%)", textDecoration: "none" }}>fluxa.contact@gmail.com</a>
                <span style={{ ...INTER, fontSize: 13, color: "hsl(215,20%,45%)" }}>Cognin, Savoie</span>
              </div>
            </div>
            <div>
              <h4 style={{ ...SORA, fontSize: 13, fontWeight: 600, color: "hsl(210,40%,85%)", margin: "0 0 16px", letterSpacing: "0.04em" }}>Suivez-nous</h4>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { href: "https://www.instagram.com/fluxa.fr", icon: <Instagram size={16} color="hsl(215,20%,55%)" /> },
                  { href: "https://www.facebook.com/fluxa.fr", icon: <Facebook size={16} color="hsl(215,20%,55%)" /> },
                  { href: "https://www.linkedin.com/company/fluxa-fr/", icon: <Linkedin size={16} color="hsl(215,20%,55%)" /> },
                ].map(s => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener" className="si" style={{ width: 38, height: 38, borderRadius: 10, background: "hsl(217,91%,60%,.08)", border: "1px solid hsl(217,32%,14%)", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid hsl(217,32%,10%)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,32%)", margin: 0 }}>© 2026 Fluxa. Tous droits réservés.</p>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="/mentions-legales" style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,32%)", textDecoration: "none" }}>Mentions légales</a>
              <a href="/politique-confidentialite" style={{ ...INTER, fontSize: 12, color: "hsl(215,20%,32%)", textDecoration: "none" }}>Politique de confidentialité</a>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Index;
