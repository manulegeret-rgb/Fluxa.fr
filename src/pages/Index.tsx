import SEOHead from "@/components/SEOHead";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { Faq } from "@/components/Faq";
import { CommentCaMarche } from "@/components/Automations";
import { PricingCard } from "@/components/PricingCard";
import {
  Calendar,
  MessageSquare,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  CheckCircle2,
  Menu,
  X,
  ZoomIn,
  Zap,
  ShieldCheck,
  Code2,
  Headphones,
  Search,
  Globe,
  Phone,
  CreditCard,
  Lock,
  Target,
  Palette,
  Building2,
  Briefcase,
  Trophy,
  Wrench,
  TrendingUp,
  Banknote,
  ArrowRight,
  Tag,
  Send,
  MapPin,
  Clock,
} from "lucide-react";
import mockupAJour from "@/assets/realisation-client.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import fluxaLogo from "@/assets/logo-transparent.webp";

const Index = () => {
  // ── Scroll header
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scroll deep-link
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target) {
      sessionStorage.removeItem("scrollTo");
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "/");
    }
  }, []);

  // ── Pricing carousel (mobile)
  const pricingRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const updateArrows = () => {
    const el = pricingRef.current;
    if (!el) return;
    const EPS = 40;
    setCanLeft(el.scrollLeft > EPS);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - EPS);
  };
  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;
    updateArrows();
    const t = setTimeout(updateArrows, 0);
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => { clearTimeout(t); el.removeEventListener("scroll", updateArrows); ro.disconnect(); };
  }, []);

  // ── Typing effect (rAF)
  const typingPhrases = ["livré clé en main", "en 2 à 3 semaines", "prêt à vous trouver des clients"];
  const [typingText, setTypingText] = useState("");
  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseUntil = 0;
    const CHAR = 40, DEL = 18, PAUSE_FULL = 2200, PAUSE_EMPTY = 120;
    function tick(now: number) {
      const phrase = typingPhrases[phraseIdx];
      if (now < pauseUntil) { rafId = requestAnimationFrame(tick); return; }
      const interval = deleting ? DEL : CHAR;
      if (now - lastTime >= interval) {
        lastTime = now;
        if (!deleting) {
          charIdx = Math.min(charIdx + 1, phrase.length);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === phrase.length) { pauseUntil = now + PAUSE_FULL; deleting = true; }
        } else {
          charIdx = Math.max(charIdx - 1, 0);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % typingPhrases.length; pauseUntil = now + PAUSE_EMPTY; }
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Spotlight mouse tracking
  const heroRef = useRef<HTMLElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  // ── Tilt 3D sur les cartes
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  }, []);
  const handleTiltReset = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  // ── Scroll animations
  const scrollTypes = useScrollAnimation(0.12);
  const scrollPricing = useScrollAnimation(0.1);
  const scrollGuarantees = useScrollAnimation(0.12);
  const scrollStats = useScrollAnimation(0.2);
  const scrollAbout = useScrollAnimation(0.1);
  const scrollWhy = useScrollAnimation(0.1);

  // ── Animated counters
  const stat890 = useCountUp(890, 1500, scrollStats.visible);
  const stat100 = useCountUp(100, 1000, scrollStats.visible);
  const stat48 = useCountUp(48, 900, scrollStats.visible);

  // ── UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ── EmailJS
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const onSubmitInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = new FormData(e.currentTarget);
    const templateParams = {
      from_name: (f.get("name") as string) || "",
      from_email: (f.get("email") as string) || "",
      subject: `Demande de site : ${(f.get("need") as string) || ""}`,
      message: (f.get("message") as string) || "(aucun message)",
    };
    setSending(true);
    setSendError(false);
    try {
      await emailjs.send("service_mxfwifu", "template_co6wxnr", templateParams, "Fr5bTGX_sdi1ekCv8");
      navigate("/merci");
    } catch {
      setSendError(true);
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead />

      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
        style={{
          height: 72,
          background: scrolled ? "hsl(222,84%,4.9%,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(217,32%,18%)" : "1px solid transparent",
          boxShadow: scrolled ? "0 12px 34px -22px rgba(0,0,0,0.9)" : "none",
        }}
      >
        {/* Barre de progression lecture */}
        <div
          className="absolute top-0 left-0 h-[2px] w-full origin-left"
          style={{
            background: "linear-gradient(90deg,hsl(217,91%,60%),hsl(263,90%,74%))",
            transform: `scaleX(${scrollProgress})`,
            transition: "transform 0.1s linear",
          }}
        />

        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" aria-label="Fluxa - Accueil" className="shrink-0">
            <img src={fluxaLogo} alt="Fluxa" className="h-10 w-auto object-contain" />
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-7 text-[14.5px] font-medium text-foreground/75">
            {[
              { href: "#services", label: "Nos sites" },
              { href: "#comment-ca-marche", label: "Méthode" },
              { href: "#pourquoi-choisir-fluxa", label: "Pourquoi nous" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative group hover:text-foreground transition-colors duration-200"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#infos"
              className="hidden md:inline-flex items-center gap-2 rounded-[10px] px-[18px] py-[10px] text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[2px]"
              style={{
                background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))",
                boxShadow: "0 8px 24px -8px hsl(217,91%,60%,0.55)",
              }}
            >
              Devis gratuit <ArrowRight className="w-4 h-4" />
            </a>

            {/* Hamburger mobile */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button aria-label="Menu" className="md:hidden p-2">
                  <Menu size={22} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm">
                <nav className="flex flex-col gap-2 mt-6">
                  {[
                    { href: "#services", label: "Nos sites" },
                    { href: "#comment-ca-marche", label: "Méthode" },
                    { href: "#pricing", label: "Tarifs" },
                    { href: "#pourquoi-choisir-fluxa", label: "Pourquoi nous" },
                    { href: "#faq", label: "FAQ" },
                    { href: "#infos", label: "Contact" },
                  ].map((item, i) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="py-3 text-base border-b border-border/40 last:border-0 hover:text-primary transition-colors"
                      style={{
                        opacity: menuOpen ? 1 : 0,
                        transform: menuOpen ? "translateX(0)" : "translateX(20px)",
                        transition: `opacity 0.3s ease ${i * 0.06 + 0.1}s, transform 0.3s ease ${i * 0.06 + 0.1}s`,
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <a href="#infos" onClick={() => setMenuOpen(false)}>Demander un devis</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "100vh", padding: "120px 0 80px" }}
        onMouseMove={handleHeroMouseMove}
      >
        {/* Radial bg */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 50% 0%,hsl(217,40%,10%),#050a18 60%)" }} />

        {/* Grid animée */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(217,91%,60%,0.06) 1px,transparent 1px),linear-gradient(90deg,hsl(217,91%,60%,0.06) 1px,transparent 1px)",
            backgroundSize: "54px 54px",
            maskImage: "radial-gradient(120% 70% at 50% 25%,#000,transparent 75%)",
            WebkitMaskImage: "radial-gradient(120% 70% at 50% 25%,#000,transparent 75%)",
            animation: "gridFade 8s ease-in-out infinite",
          }}
        />

        {/* Orbe bleu */}
        <div
          className="absolute pointer-events-none"
          style={{ width: 520, height: 520, borderRadius: "50%", background: "hsl(217,91%,60%,0.18)", filter: "blur(120px)", top: "6%", left: "4%", animation: "glowPulse 6s ease-in-out infinite" }}
        />
        {/* Orbe violet */}
        <div
          className="absolute pointer-events-none"
          style={{ width: 440, height: 440, borderRadius: "50%", background: "hsl(263,90%,64%,0.14)", filter: "blur(120px)", bottom: "4%", right: "6%", animation: "glowPulse 7s ease-in-out infinite 1.2s" }}
        />
        {/* Spotlight souris */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(560px circle at ${spotlight.x}% ${spotlight.y}%, hsl(217,91%,60%,0.10), transparent)`, transition: "background 0.2s" }}
        />

        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] w-full">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">

            {/* ── Colonne gauche ── */}
            <div className="flex flex-col items-start">

              {/* Eyebrow pill */}
              <div
                className="inline-flex items-center gap-[9px] px-[14px] py-[7px] rounded-full mb-6 animate-[fade-in-up_0.8s_ease_both]"
                style={{ border: "1px solid hsl(217,91%,60%,0.28)", background: "hsl(217,91%,60%,0.08)" }}
              >
                <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: "hsl(160,84%,45%)", boxShadow: "0 0 0 3px hsl(160,84%,45%,0.25)" }} />
                <span className="text-[12.5px] font-semibold tracking-[0.04em]" style={{ color: "hsl(210,40%,92%)" }}>Agence web · Sites vitrines clé en main</span>
              </div>

              {/* H1 */}
              <h1
                className="mb-5 animate-[fade-in-up_0.8s_ease_0.08s_both]"
                style={{ fontSize: "clamp(34px,5.2vw,62px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.025em", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Votre site vitrine<br />professionnel,{" "}
                <span style={{ background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {typingText || " "}
                </span>
                <span className="inline-block w-[3px] h-[0.85em] align-middle ml-0.5 animate-pulse" style={{ background: "hsl(217,91%,66%)" }} />
              </h1>

              {/* Accroche */}
              <p
                className="mb-7 animate-[fade-in-up_0.8s_ease_0.15s_both]"
                style={{ fontSize: 18, lineHeight: 1.7, color: "hsl(215,20%,76%)", maxWidth: 520 }}
              >
                Artisan, TPE ou indépendant ? Fluxa conçoit votre site en{" "}
                <strong style={{ color: "hsl(210,40%,96%)", fontWeight: 600 }}>2 à 3 semaines</strong>,
                optimisé pour transformer vos visiteurs en clients.
              </p>

              {/* Bénéfices 2×2 */}
              <div
                className="grid grid-cols-2 gap-x-5 gap-y-3 mb-8 w-full max-w-[560px] animate-[fade-in-up_0.8s_ease_0.21s_both]"
              >
                {[
                  { icon: <CheckCircle2 className="w-[17px] h-[17px] shrink-0 mt-[2px]" style={{ color: "hsl(217,91%,62%)" }} />, txt: "Responsive mobile & desktop" },
                  { icon: <Search className="w-[17px] h-[17px] shrink-0 mt-[2px]" style={{ color: "hsl(217,91%,62%)" }} />, txt: "Référencement Google inclus" },
                  { icon: <Globe className="w-[17px] h-[17px] shrink-0 mt-[2px]" style={{ color: "hsl(217,91%,62%)" }} />, txt: "Hébergement + domaine offerts" },
                  { icon: <Headphones className="w-[17px] h-[17px] shrink-0 mt-[2px]" style={{ color: "hsl(217,91%,62%)" }} />, txt: "Support après livraison" },
                ].map(({ icon, txt }) => (
                  <div key={txt} className="flex items-start gap-[9px] text-[14px]" style={{ color: "hsl(215,20%,78%)" }}>
                    {icon}{txt}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3.5 mb-7 animate-[fade-in-up_0.8s_ease_0.27s_both]">
                <a
                  href="#infos"
                  className="group relative inline-flex items-center gap-[10px] rounded-[13px] px-7 py-[15px] text-[15.5px] font-semibold text-white overflow-hidden transition-all duration-200 hover:-translate-y-[3px]"
                  style={{ background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,0.6)" }}
                >
                  Demander un devis gratuit
                  <ArrowRight className="w-[17px] h-[17px]" />
                  <div className="btn-shimmer absolute inset-0 pointer-events-none" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-[9px] rounded-[13px] px-[26px] py-[15px] text-[15.5px] font-semibold transition-all duration-200"
                  style={{ background: "hsl(217,91%,60%,0.07)", border: "1px solid hsl(217,91%,60%,0.30)", color: "hsl(210,40%,96%)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "hsl(217,91%,60%,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "hsl(217,91%,60%,0.55)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "hsl(217,91%,60%,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "hsl(217,91%,60%,0.30)"; }}
                >
                  Voir les tarifs <Tag className="w-4 h-4" />
                </a>
              </div>

              {/* Ligne réassurance */}
              <div className="flex flex-wrap items-center gap-4 text-[13.5px] animate-[fade-in_0.8s_ease_0.33s_both]" style={{ color: "hsl(215,20%,62%)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Banknote className="w-[15px] h-[15px]" style={{ color: "hsl(217,91%,60%)" }} />
                  À partir de <strong style={{ color: "hsl(217,91%,66%)", fontWeight: 700, margin: "0 3px" }}>890 €</strong> tout compris
                </span>
                <span className="w-1 h-1 rounded-full" style={{ background: "hsl(215,20%,30%)" }} />
                <span>Réponse sous 48h</span>
                <span className="w-1 h-1 rounded-full" style={{ background: "hsl(215,20%,30%)" }} />
                <span>Paiement en 2× sans frais</span>
              </div>
            </div>

            {/* ── Colonne droite : mockup ── */}
            <div className="relative cursor-pointer animate-[fade-in-up_1s_ease_0.18s_both]" style={{ perspective: 1400 }} onClick={() => setLightboxOpen(true)}>

              {/* Halo gradient */}
              <div
                className="absolute pointer-events-none"
                style={{ inset: -30, borderRadius: 28, background: "linear-gradient(120deg,hsl(217,91%,60%,0.3),hsl(263,90%,64%,0.25))", filter: "blur(50px)", opacity: 0.7 }}
              />

              {/* Cadre navigateur */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid hsl(217,91%,60%,0.25)", background: "#0a1224", boxShadow: "0 50px 110px -40px hsl(217,91%,60%,0.45), 0 0 0 1px hsl(217,32%,18%)" }}
              >
                {/* Barre navigateur */}
                <div className="flex items-center gap-1.5 px-3.5 py-2.5" style={{ background: "hsl(217,33%,9%)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#28c840" }} />
                  <span className="ml-3 flex items-center gap-1.5 text-[11px] rounded-md px-3 py-[3px] max-w-[200px]" style={{ color: "hsl(215,20%,45%)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Lock className="w-[10px] h-[10px]" />votre-client.fr
                  </span>
                </div>
                <img src={mockupAJour} alt="Exemple site vitrine professionnel créé par Fluxa" loading="eager" width="1920" height="1080" className="w-full block" />
              </div>

              {/* Badge haut gauche */}
              <div
                className="absolute -top-5 -left-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[13px] backdrop-blur-sm"
                style={{ background: "hsl(222,84%,7%,0.92)", border: "1px solid hsl(217,91%,60%,0.25)", boxShadow: "0 16px 40px -16px rgba(0,0,0,0.8)", animation: "floatY 5s ease-in-out infinite" }}
              >
                <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center shrink-0" style={{ background: "hsl(217,91%,60%,0.15)" }}>
                  <Phone className="w-[18px] h-[18px]" style={{ color: "hsl(217,91%,60%)" }} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">100% responsive</div>
                  <div className="text-[11px]" style={{ color: "hsl(215,20%,52%)" }}>mobile · tablette · desktop</div>
                </div>
              </div>

              {/* Badge bas droite */}
              <div
                className="absolute -bottom-5 -right-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[13px] backdrop-blur-sm"
                style={{ background: "hsl(222,84%,7%,0.92)", border: "1px solid hsl(160,84%,45%,0.30)", boxShadow: "0 16px 40px -16px rgba(0,0,0,0.8)", animation: "floatY2 6s ease-in-out infinite 1s" }}
              >
                <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center shrink-0" style={{ background: "hsl(160,84%,45%,0.15)" }}>
                  <TrendingUp className="w-[18px] h-[18px]" style={{ color: "hsl(160,84%,50%)" }} />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white leading-tight">Visible sur Google</div>
                  <div className="text-[11px]" style={{ color: "hsl(215,20%,52%)" }}>SEO optimisé dès le départ</div>
                </div>
              </div>

              {/* Zoom overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200">
                <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-primary/30">
                  <ZoomIn className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1s_ease_1.2s_both]">
          <span className="text-[11px] tracking-[0.18em] uppercase" style={{ color: "hsl(215,20%,40%)" }}>Découvrir</span>
          <div className="w-[22px] h-[34px] rounded-full flex justify-center pt-[6px]" style={{ border: "1px solid hsl(215,20%,30%)" }}>
            <div className="w-[3px] h-[7px] rounded-full animate-[scrollDot_1.8s_ease-in-out_infinite]" style={{ background: "hsl(217,91%,60%)" }} />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          NOS SITES (#services)
      ═══════════════════════════════════════════ */}
      <section id="services" className="py-[110px] bg-background">
        <div ref={scrollTypes.ref} className="container mx-auto px-6 max-w-[1200px]">

          {/* En-tête */}
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(28px)" }}
          >
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "hsl(217,91%,60%)" }}>Ce que nous créons</p>
            <h2
              className="mb-4"
              style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Un site taillé pour votre activité
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(215,20%,65%)" }}>
              Artisan, TPE ou indépendant, chaque site est conçu pour votre métier.
            </p>
          </div>

          {/* 3 cards avec barre top colorée */}
          <div className="grid md:grid-cols-3 gap-[22px]">
            {[
              {
                accent: "hsl(263,90%,74%)",
                accentBg: "hsl(263,90%,74%,0.12)",
                glow: "hsl(263,90%,74%,0.25)",
                icon: <Palette className="w-5 h-5" style={{ color: "hsl(263,90%,74%)" }} />,
                tag: "ARTISAN · CRÉATIF",
                title: "Site Portfolio",
                text: "Galerie photo soignée, page réalisations avant/après, formulaire de contact. Idéal pour mettre vos travaux en valeur.",
                items: ["Galerie haute qualité", "Page avant/après", "Formulaire rapide"],
                delay: "0s",
              },
              {
                accent: "hsl(217,91%,60%)",
                accentBg: "hsl(217,91%,60%,0.12)",
                glow: "hsl(217,91%,60%,0.28)",
                icon: <Building2 className="w-5 h-5" style={{ color: "hsl(217,91%,60%)" }} />,
                tag: "TPE · PME",
                title: "Site Entreprise",
                text: "Structure claire, pages services détaillées, présentation équipe et Google Maps. Crédibilité immédiate.",
                items: ["Services détaillés", "Équipe & valeurs", "Google Maps intégré"],
                delay: "0.08s",
              },
              {
                accent: "hsl(160,84%,39%)",
                accentBg: "hsl(160,84%,39%,0.12)",
                glow: "hsl(160,84%,39%,0.25)",
                icon: <Briefcase className="w-5 h-5" style={{ color: "hsl(160,84%,50%)" }} />,
                tag: "INDÉPENDANT",
                title: "Profession Libérale",
                text: "Mettez en avant votre expertise et facilitez la prise de contact. Pensé pour les consultants, coachs et thérapeutes.",
                items: ["Services & tarifs", "Biographie pro", "Prise de RDV optionnelle"],
                delay: "0.16s",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="flex flex-col rounded-[18px] overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  border: "1px solid hsl(217,32%,16%)",
                  background: "linear-gradient(180deg,hsl(217,33%,10%),hsl(222,84%,5%))",
                  opacity: scrollTypes.visible ? 1 : 0,
                  transform: scrollTypes.visible ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.65s ease ${card.delay}, transform 0.65s ease ${card.delay}, box-shadow 0.25s`,
                }}
                onMouseMove={handleTilt}
                onMouseLeave={(e) => {
                  handleTiltReset(e);
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 30px 60px -20px ${card.glow}`;
                  e.currentTarget.style.borderColor = card.accent.replace(")", ",0.3)").replace("hsl(", "hsl(");
                }}
              >
                {/* Accent bar */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg,${card.accent},transparent)` }} />

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-[12px] grid place-items-center shrink-0" style={{ background: card.accentBg }}>
                      {card.icon}
                    </div>
                    <span className="text-[10.5px] font-bold tracking-[0.08em]" style={{ color: card.accent }}>{card.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{card.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "hsl(215,20%,65%)" }}>{card.text}</p>
                  <ul className="space-y-2 text-sm mb-6" style={{ color: "hsl(215,20%,65%)" }}>
                    {card.items.map(it => (
                      <li key={it} className="flex items-center gap-2.5">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: card.accent }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a href="#infos" className="text-sm font-semibold flex items-center gap-1.5 mt-auto transition-colors" style={{ color: card.accent }}>
                    Demander un devis
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          MÉTHODE (#comment-ca-marche)
      ═══════════════════════════════════════════ */}
      <section id="comment-ca-marche" className="scroll-mt-20">
        <CommentCaMarche />
      </section>


      {/* ═══════════════════════════════════════════
          PRICING (#pricing)
      ═══════════════════════════════════════════ */}
      <section id="pricing" className="py-[110px] bg-background scroll-mt-10">
        <div ref={scrollPricing.ref} className="container mx-auto px-6 max-w-[1200px]">

          {/* En-tête */}
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: scrollPricing.visible ? 1 : 0, transform: scrollPricing.visible ? "translateY(0)" : "translateY(28px)" }}
          >
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "hsl(217,91%,60%)" }}>Tarifs</p>
            <h2
              className="mb-4"
              style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Transparents, tout compris
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(215,20%,65%)" }}>
              Une formule à partir de{" "}
              <span className="font-semibold" style={{ color: "hsl(210,40%,96%)" }}>890€</span>,
              hébergement et domaine inclus la première année.
            </p>
          </div>

          {/* Comparatif */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid hsl(217,32%,16%)" }}>
              <div className="grid grid-cols-3 text-center text-xs md:text-sm font-semibold" style={{ borderBottom: "1px solid hsl(217,32%,16%)" }}>
                <div className="py-3.5 px-2" style={{ color: "hsl(215,20%,52%)" }}>Agence classique</div>
                <div className="py-3.5 px-2" style={{ background: "hsl(217,91%,60%,0.10)", color: "hsl(217,91%,65%)", borderLeft: "1px solid hsl(217,91%,60%,0.20)", borderRight: "1px solid hsl(217,91%,60%,0.20)" }}>Fluxa</div>
                <div className="py-3.5 px-2" style={{ color: "hsl(215,20%,52%)" }}>Freelance</div>
              </div>
              <div className="grid grid-cols-3 text-center">
                <div className="py-5 px-2" style={{ borderRight: "1px solid hsl(217,32%,12%)" }}>
                  <p className="text-lg md:text-2xl font-bold" style={{ color: "hsl(215,20%,40%)" }}>3 000–8 000€</p>
                  <p className="text-xs mt-1" style={{ color: "hsl(215,20%,40%)" }}>Délai 2–3 mois</p>
                </div>
                <div className="py-5 px-2" style={{ background: "hsl(217,91%,60%,0.05)", borderLeft: "1px solid hsl(217,91%,60%,0.20)", borderRight: "1px solid hsl(217,91%,60%,0.20)" }}>
                  <p className="text-lg md:text-2xl font-bold" style={{ background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>dès 890€</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: "hsl(217,91%,65%)" }}>Livré en 2–3 semaines</p>
                </div>
                <div className="py-5 px-2" style={{ borderLeft: "1px solid hsl(217,32%,12%)" }}>
                  <p className="text-lg md:text-2xl font-bold" style={{ color: "hsl(215,20%,40%)" }}>1 500–3 000€</p>
                  <p className="text-xs mt-1" style={{ color: "hsl(215,20%,40%)" }}>Qualité variable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formule + Options */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

            {/* Card principale featured */}
            <div
              className="rounded-[22px] p-8 flex flex-col"
              style={{
                border: "1px solid hsl(217,91%,60%,0.35)",
                background: "linear-gradient(180deg,hsl(217,33%,9%),hsl(222,84%,5%))",
                boxShadow: "0 40px 90px -40px hsl(217,91%,60%,0.4)",
              }}
            >
              {/* Accent top */}
              <div className="h-[3px] w-full rounded-full mb-7" style={{ background: "linear-gradient(90deg,hsl(217,91%,60%),hsl(263,90%,74%))" }} />

              <div className="mb-6">
                <p className="text-[13px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: "hsl(217,91%,60%)" }}>Formule Site Vitrine</p>
                {/* Prix 890€ gradient */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span style={{ fontSize: 54, fontWeight: 800, lineHeight: 1, background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>890€</span>
                  <span className="text-sm" style={{ color: "hsl(215,20%,55%)" }}>tout compris</span>
                </div>
                <p className="text-xs" style={{ color: "hsl(215,20%,52%)" }}>Hébergement + domaine offerts la 1ère année</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Jusqu'à 5 pages (Accueil, Services, À propos, Galerie, Contact)",
                  "Design responsive mobile + desktop",
                  "Formulaire de contact fonctionnel",
                  "SEO de base (balises, métadonnées)",
                  "Optimisation vitesse & performance",
                  "Hébergement & domaine 1ère année inclus",
                  "1 round de modifications inclus",
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "hsl(215,20%,75%)" }}>
                    <CheckCircle2 className="w-[17px] h-[17px] shrink-0 mt-[2px]" style={{ color: "hsl(217,91%,60%)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#infos"
                className="w-full flex items-center justify-center gap-2.5 rounded-[13px] py-[15px] text-[15.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-[2px]"
                style={{ background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,0.55)" }}
              >
                Démarrer mon projet <ArrowRight className="w-[17px] h-[17px]" />
              </a>
            </div>

            {/* Options à la carte */}
            <div className="space-y-4">
              <div className="mb-2">
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Options à la carte</h3>
                <p className="text-sm mt-1" style={{ color: "hsl(215,20%,55%)" }}>Toutes les options sont cumulables.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Pages supplémentaires", price: "+100€/page", desc: "Blog, Équipe, Actualités, etc." },
                  { label: "Galerie photo avancée", price: "+150€", desc: "Lightbox, filtres, mise en page optimisée" },
                  { label: "Prise de RDV en ligne", price: "+180€", desc: "Calendrier + notifications email" },
                  { label: "Rédaction SEO", price: "+250€", desc: "Textes pro optimisés Google (2 000 mots)" },
                  { label: "Multilingue", price: "+250€/langue", desc: "Anglais, espagnol ou autre" },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    className="rounded-[14px] px-4 py-3.5 transition-all duration-200 cursor-default"
                    style={{ border: "1px solid hsl(217,32%,16%)", background: "hsl(217,33%,9%)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(217,91%,60%,0.30)"; (e.currentTarget as HTMLElement).style.background = "hsl(217,91%,60%,0.05)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "hsl(217,32%,16%)"; (e.currentTarget as HTMLElement).style.background = "hsl(217,33%,9%)"; }}
                  >
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-semibold text-sm">{opt.label}</span>
                      <span className="font-bold text-sm shrink-0 ml-3" style={{ color: "hsl(217,91%,60%)" }}>{opt.price}</span>
                    </div>
                    <p className="text-xs" style={{ color: "hsl(215,20%,52%)" }}>{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[14px] px-5 py-4 mt-2" style={{ border: "1px solid hsl(217,91%,60%,0.25)", background: "hsl(217,91%,60%,0.05)" }}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-semibold">Maintenance mensuelle</span>
                  <span className="font-bold text-lg" style={{ color: "hsl(217,91%,60%)" }}>59€/mois</span>
                </div>
                <ul className="text-xs space-y-1 mt-2" style={{ color: "hsl(215,20%,55%)" }}>
                  {["Mises à jour de sécurité", "Sauvegardes hebdomadaires", "Support technique prioritaire", "Modifications de contenu"].map(li => (
                    <li key={li} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "hsl(217,91%,60%,0.5)" }} />{li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: "hsl(215,20%,45%)" }}>
            Paiement en 2 fois sans frais · Propriété totale du site · Support inclus
          </p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          CONTACT (#infos)
      ═══════════════════════════════════════════ */}
      <section id="infos" className="py-[110px] bg-background relative overflow-hidden scroll-mt-20">
        {/* Glow blob centré */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "hsl(217,91%,60%,0.08)", filter: "blur(120px)", animation: "glowPulse 7s ease-in-out infinite" }} />

        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-start">

            {/* Gauche : info */}
            <div>
              <p className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "hsl(217,91%,60%)" }}>Contact</p>
              <h2
                className="mb-4"
                style={{ fontSize: "clamp(28px,3.8vw,44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Parlons de votre projet
              </h2>
              <p className="text-lg mb-8" style={{ color: "hsl(215,20%,65%)" }}>Devis personnalisé sous 48h, sans engagement.</p>

              <div className="space-y-5">
                {[
                  { icon: <Mail className="w-5 h-5" style={{ color: "hsl(217,91%,60%)" }} />, label: "Email", value: "fluxa.contact@gmail.com", href: "mailto:fluxa.contact@gmail.com" },
                  { icon: <MapPin className="w-5 h-5" style={{ color: "hsl(217,91%,60%)" }} />, label: "Localisation", value: "Chambéry, Savoie" },
                  { icon: <Clock className="w-5 h-5" style={{ color: "hsl(217,91%,60%)" }} />, label: "Réponse", value: "Sous 48h garantie" },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-[10px] grid place-items-center shrink-0" style={{ background: "hsl(217,91%,60%,0.10)" }}>{icon}</div>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase mb-0.5" style={{ color: "hsl(215,20%,48%)" }}>{label}</p>
                      {href ? <a href={href} className="text-sm font-medium hover:text-primary transition-colors">{value}</a> : <p className="text-sm">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {[
                  { href: "https://instagram.com/fluxa.fr", icon: <Instagram className="w-4 h-4" />, label: "@fluxa.fr" },
                  { href: "https://www.facebook.com/fluxa.fr", icon: <Facebook className="w-4 h-4" />, label: "fluxa.fr" },
                  { href: "https://www.linkedin.com/company/fluxa-fr/", icon: <Linkedin className="w-4 h-4" />, label: "Fluxa" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-[10px] transition-all duration-200 hover:bg-primary/15" style={{ border: "1px solid hsl(217,32%,18%)", color: "hsl(215,20%,60%)" }}>
                    {s.icon}{s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Droite : formulaire */}
            <div className="rounded-[22px] p-8" style={{ background: "hsl(217,33%,9%,0.85)", border: "1px solid hsl(217,32%,18%)", backdropFilter: "blur(12px)" }}>
              <form id="contact" onSubmit={onSubmitInfo} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest mb-1.5 block" style={{ color: "hsl(215,20%,55%)" }}>Nom</label>
                    <input id="contact-name" name="name" required className="w-full rounded-[11px] px-4 py-3.5 text-sm outline-none transition-all" style={{ border: "1px solid hsl(217,32%,20%)", background: "hsl(217,33%,7%)", color: "hsl(210,40%,96%)" }} onFocus={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 2px hsl(217,91%,60%,0.15)"; }} onBlur={e => { e.currentTarget.style.borderColor = "hsl(217,32%,20%)"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest mb-1.5 block" style={{ color: "hsl(215,20%,55%)" }}>Email</label>
                    <input id="contact-email" name="email" type="email" required className="w-full rounded-[11px] px-4 py-3.5 text-sm outline-none transition-all" style={{ border: "1px solid hsl(217,32%,20%)", background: "hsl(217,33%,7%)", color: "hsl(210,40%,96%)" }} onFocus={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 2px hsl(217,91%,60%,0.15)"; }} onBlur={e => { e.currentTarget.style.borderColor = "hsl(217,32%,20%)"; e.currentTarget.style.boxShadow = "none"; }} />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-need" className="text-xs font-semibold uppercase tracking-widest mb-1.5 block" style={{ color: "hsl(215,20%,55%)" }}>Type de site</label>
                  <select id="contact-need" name="need" required defaultValue="" className="w-full rounded-[11px] px-4 py-3.5 text-sm outline-none transition-all" style={{ border: "1px solid hsl(217,32%,20%)", background: "hsl(217,33%,7%)", color: "hsl(210,40%,96%)" }} onFocus={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 2px hsl(217,91%,60%,0.15)"; }} onBlur={e => { e.currentTarget.style.borderColor = "hsl(217,32%,20%)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <option value="" disabled>Sélectionner…</option>
                    <option>Site vitrine simple (890€)</option>
                    <option>Site avec galerie photo</option>
                    <option>Site avec prise de RDV</option>
                    <option>Refonte de site existant</option>
                    <option>Autre / Je ne sais pas encore</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest mb-1.5 block" style={{ color: "hsl(215,20%,55%)" }}>Message</label>
                  <textarea id="contact-message" name="message" rows={4} placeholder="Votre activité, vos besoins, vos attentes…" className="w-full rounded-[11px] px-4 py-3.5 text-sm outline-none transition-all resize-none" style={{ border: "1px solid hsl(217,32%,20%)", background: "hsl(217,33%,7%)", color: "hsl(210,40%,96%)" }} onFocus={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 2px hsl(217,91%,60%,0.15)"; }} onBlur={e => { e.currentTarget.style.borderColor = "hsl(217,32%,20%)"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative w-full flex items-center justify-center gap-2 rounded-[13px] py-[15px] text-[15.5px] font-semibold text-white overflow-hidden transition-all duration-200 hover:-translate-y-[2px] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,0.55)" }}
                >
                  {sending && <span className="btn-spinner" />}
                  <span className="relative z-10">{sending ? "Envoi en cours…" : "Envoyer ma demande"}</span>
                  {!sending && <Send className="w-[17px] h-[17px] relative z-10" />}
                  <div className="btn-shimmer absolute inset-0 pointer-events-none" />
                </button>

                {sendError && <p className="text-sm text-red-400">Une erreur est survenue. Réessayez ou contactez-nous par email.</p>}

                <div className="flex flex-wrap gap-3 justify-center pt-1">
                  {[
                    { icon: <Lock className="w-3.5 h-3.5" />, txt: "Données sécurisées" },
                    { icon: <Zap className="w-3.5 h-3.5" />, txt: "Réponse sous 48h" },
                    { icon: <Search className="w-3.5 h-3.5" />, txt: "Sans engagement" },
                  ].map(tag => (
                    <span key={tag.txt} className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(215,20%,52%)" }}>
                      {tag.icon}{tag.txt}
                    </span>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          POURQUOI FLUXA (#pourquoi-choisir-fluxa)
      ═══════════════════════════════════════════ */}
      <section id="pourquoi-choisir-fluxa" className="py-[110px] bg-background">
        <div ref={scrollWhy.ref} className="container mx-auto px-6 max-w-[1200px]">

          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(28px)" }}
          >
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "hsl(217,91%,60%)" }}>Pourquoi nous</p>
            <h2
              className="mb-4"
              style={{ fontSize: "clamp(28px,3.8vw,46px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Local. Rapide. Sans dépendance.
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(215,20%,65%)" }}>
              Agence web à Chambéry. Sites livrés clé en main, sans contrat long terme, sans frais cachés.
            </p>
          </div>

          {/* 4 garanties avec accents colorés */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { accent: "hsl(160,84%,39%)", accentLight: "hsl(160,84%,39%,0.12)", icon: <ShieldCheck className="w-5 h-5" style={{ color: "hsl(160,84%,50%)" }} />, title: "Satisfaction garantie", text: "Modifications incluses jusqu'à validation complète.", delay: "0s" },
              { accent: "hsl(43,96%,56%)", accentLight: "hsl(43,96%,56%,0.10)", icon: <Zap className="w-5 h-5" style={{ color: "hsl(43,96%,56%)" }} />, title: "Respect des délais", text: "Livraison en 2–3 semaines ou remboursement partiel.", delay: "0.08s" },
              { accent: "hsl(263,90%,74%)", accentLight: "hsl(263,90%,74%,0.10)", icon: <Code2 className="w-5 h-5" style={{ color: "hsl(263,90%,74%)" }} />, title: "Code propre", text: "Standards du web respectés, performance Core Web Vitals.", delay: "0.16s" },
              { accent: "hsl(217,91%,60%)", accentLight: "hsl(217,91%,60%,0.10)", icon: <Headphones className="w-5 h-5" style={{ color: "hsl(217,91%,60%)" }} />, title: "Support réactif", text: "Réponse sous 48h, corrections de bugs prioritaires.", delay: "0.24s" },
            ].map((g, i) => (
              <div
                key={i}
                className="rounded-[18px] p-6 transition-all duration-300"
                style={{
                  border: "1px solid hsl(217,32%,16%)",
                  background: "linear-gradient(180deg,hsl(217,33%,10%),hsl(222,84%,5%))",
                  opacity: scrollWhy.visible ? 1 : 0,
                  transform: scrollWhy.visible ? "translateY(0)" : "translateY(36px)",
                  transition: `opacity 0.65s ease ${g.delay}, transform 0.65s ease ${g.delay}`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = g.accent.replace(")", ",0.3)").replace("hsl(", "hsl("); e.currentTarget.style.boxShadow = `0 24px 48px -16px ${g.accent.replace(")", ",0.25)").replace("hsl(", "hsl(")}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = scrollWhy.visible ? "translateY(0)" : "translateY(36px)"; e.currentTarget.style.borderColor = "hsl(217,32%,16%)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="w-10 h-10 rounded-[12px] grid place-items-center mb-4" style={{ background: g.accentLight }}>{g.icon}</div>
                <h3 className="font-semibold mb-2 text-[15px]">{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215,20%,60%)" }}>{g.text}</p>
              </div>
            ))}
          </div>

          {/* Stats animées */}
          <div ref={scrollStats.ref} className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { count: stat890, suffix: "€", label: "tarif de départ tout compris", delay: "0s" },
              { count: stat100, suffix: "%", label: "responsive mobile + desktop", delay: "0.15s" },
              { count: stat48, suffix: "h", label: "pour recevoir votre devis", delay: "0.3s" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-[18px] py-10 px-6 text-center"
                style={{
                  border: "1px solid hsl(217,32%,14%)",
                  background: "hsl(217,33%,8%)",
                  opacity: scrollStats.visible ? 1 : 0,
                  transform: scrollStats.visible ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${stat.delay}, transform 0.6s ease ${stat.delay}`,
                }}
              >
                <div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", background: "linear-gradient(110deg,hsl(217,91%,66%),hsl(263,90%,74%))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {stat.count}{stat.suffix}
                </div>
                <p className="text-sm" style={{ color: "hsl(215,20%,55%)" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* SEO local */}
          <div
            className="rounded-[18px] p-7 md:p-8"
            style={{
              border: "1px solid hsl(217,91%,60%,0.20)",
              background: "hsl(217,91%,60%,0.05)",
              opacity: scrollWhy.visible ? 1 : 0,
              transform: scrollWhy.visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 shrink-0" style={{ color: "hsl(217,91%,60%)" }} />
                  Agence web locale · Chambéry &amp; Savoie
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215,20%,60%)" }}>
                  Basée à Cognin, à deux pas de Chambéry, Fluxa accompagne les artisans, TPE et indépendants de toute la Savoie.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {["Chambéry", "Aix-les-Bains", "Albertville", "Annecy", "Savoie"].map(ville => (
                  <span key={ville} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ border: "1px solid hsl(217,91%,60%,0.30)", background: "hsl(217,91%,60%,0.10)", color: "hsl(217,91%,65%)" }}>{ville}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div className="text-center mt-12" style={{ opacity: scrollWhy.visible ? 1 : 0, transition: "opacity 0.6s ease 0.55s" }}>
            <a
              href="#infos"
              className="group relative inline-flex items-center gap-2.5 rounded-[13px] px-8 py-4 text-base font-semibold text-white overflow-hidden transition-all duration-200 hover:-translate-y-[2px]"
              style={{ background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,0.55)" }}
            >
              <span className="relative z-10">Je veux mon site vitrine</span>
              <ArrowRight className="w-[17px] h-[17px] relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              <div className="btn-shimmer absolute inset-0 pointer-events-none" />
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════ */}
      <section id="faq" className="scroll-mt-20">
        <Faq />
      </section>


      {/* ═══════════════════════════════════════════
          À PROPOS
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-24 bg-background" style={{ borderTop: "1px solid hsl(217,32%,12%)" }}>
        <div ref={scrollAbout.ref} className="container mx-auto px-6 max-w-[1100px]">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: scrollAbout.visible ? 1 : 0, transform: scrollAbout.visible ? "translateY(0)" : "translateY(20px)" }}
          >
            <p className="text-[13px] font-semibold tracking-[0.16em] uppercase mb-3" style={{ color: "hsl(217,91%,60%)" }}>L'agence</p>
            <h2
              className="mb-4"
              style={{ fontSize: "clamp(24px,3.2vw,40px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Qui sommes-nous ?
            </h2>
            <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "hsl(215,20%,60%)" }}>
              <strong style={{ color: "hsl(210,40%,80%)" }}>Fluxa</strong> est une agence web locale basée à Chambéry, spécialisée dans la création de sites vitrines pour artisans, TPE et indépendants. Sites responsive, optimisés SEO, hébergement inclus, livrés clé en main.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Trophy className="w-4 h-4" style={{ color: "hsl(217,91%,60%)" }} />, title: "Qualité & prix accessible", text: "Tarif transparent, de la maquette à la mise en ligne." },
              { icon: <Wrench className="w-4 h-4" style={{ color: "hsl(217,91%,60%)" }} />, title: "Tous corps de métier", text: "Plombier, électricien, coach, consultant, artisan…" },
              { icon: <TrendingUp className="w-4 h-4" style={{ color: "hsl(217,91%,60%)" }} />, title: "SEO & performance", text: "Core Web Vitals respectés, référencement Google optimisé." },
              { icon: <Lock className="w-4 h-4" style={{ color: "hsl(217,91%,60%)" }} />, title: "Sécurité & RGPD", text: "SSL inclus, conformité RGPD, hébergement en France." },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2.5 rounded-[16px] p-5 transition-all duration-300"
                style={{
                  border: "1px solid hsl(217,32%,14%)",
                  background: "hsl(217,33%,8%)",
                  opacity: scrollAbout.visible ? 1 : 0,
                  transform: scrollAbout.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "hsl(217,91%,60%,0.25)"; e.currentTarget.style.background = "hsl(217,91%,60%,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(217,32%,14%)"; e.currentTarget.style.background = "hsl(217,33%,8%)"; }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg grid place-items-center shrink-0" style={{ background: "hsl(217,91%,60%,0.10)" }}>{item.icon}</div>
                  <p className="font-semibold text-sm">{item.title}</p>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(215,20%,55%)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="py-12 md:py-14" style={{ borderTop: "1px solid hsl(217,32%,12%)" }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <img src={fluxaLogo} alt="Logo Fluxa" className="h-8 w-auto" />
                <p className="text-sm" style={{ color: "hsl(215,20%,50%)" }}>Création de sites vitrines professionnels</p>
              </div>
              <address className="not-italic text-xs mt-0.5" style={{ color: "hsl(215,20%,40%)" }}>
                <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors">fluxa.contact@gmail.com</a>
                {" · "}Chambéry, Savoie
              </address>
            </div>

            <nav className="flex flex-wrap items-center gap-5 text-sm" aria-label="Réseaux sociaux">
              {[
                { href: "mailto:fluxa.contact@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
                { href: "https://instagram.com/fluxa.fr", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                { href: "https://www.facebook.com/fluxa.fr", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                { href: "https://www.linkedin.com/company/fluxa-fr/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
              ].map(s => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="transition-colors inline-flex items-center gap-2" style={{ color: "hsl(215,20%,45%)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "hsl(217,91%,60%)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "hsl(215,20%,45%)"}
                >
                  {s.icon}{s.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="my-7" style={{ borderTop: "1px solid hsl(217,32%,10%)" }} />

          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
            <p className="text-xs" style={{ color: "hsl(215,20%,35%)" }}>© {new Date().getFullYear()} Fluxa · SIRET 83014496000044</p>
            <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(215,20%,42%)" }}>
              <a href="/mentions-legales" className="hover:text-primary transition">Mentions légales</a>
              <span style={{ color: "hsl(217,32%,18%)" }}>·</span>
              <a href="/politique-confidentialite" className="hover:text-primary transition">Confidentialité</a>
              <span style={{ color: "hsl(217,32%,18%)" }}>·</span>
              <a href="/cgv" className="hover:text-primary transition">CGV</a>
            </div>
          </div>
        </div>
      </footer>


      {/* ═══════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          style={{ background: "hsl(222,84%,4.9%,0.95)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 p-2 rounded-full transition" style={{ background: "hsl(217,33%,10%)", border: "1px solid hsl(217,32%,20%)" }} aria-label="Fermer">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-7xl w-full" onClick={e => e.stopPropagation()}>
            <img src={mockupAJour} alt="Site vitrine professionnel responsive créé par Fluxa" width="1920" height="1080" className="w-full h-auto rounded-2xl" style={{ border: "1px solid hsl(217,91%,60%,0.30)", boxShadow: "0 0 80px -20px hsl(217,91%,60%,0.3)" }} />
            <p className="text-center text-sm mt-4" style={{ color: "hsl(215,20%,45%)" }}>Cliquez en dehors de l'image pour fermer</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
