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
} from "lucide-react";
import mockupAJour from "@/assets/realisation-client.png"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import fluxaLogo from "@/assets/logo-transparent.webp";

const Index = () => {
  // ========= État du scroll pour styliser le header
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // ========= Scroll deep-link sans hash (depuis /nos-formules)
useEffect(() => {
  const target = sessionStorage.getItem('scrollTo');
  if (target) {
    sessionStorage.removeItem('scrollTo');
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', '/'); // garde l’URL propre (home)
  }
}, []);
    // === SEO global (géré par SEOHead component) ===
// useEffect(() => {
//   document.title = "Fluxa — Outil de gestion sur mesure pour artisans & indépendants";
// }, []);



  // ========= Carrousel des formules (mobile)
  const pricingRef = useRef<HTMLDivElement>(null);

  // ========= Arrows visibility (mobile)
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = pricingRef.current;
    if (!el) return;
    const EPS = 40; // tolérance (marges: ml-6/mr-6, mr-8, -mx-6)
    const atStart = el.scrollLeft <= EPS;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - EPS;
    setCanLeft(!atStart);
    setCanRight(!atEnd);
  };

  useEffect(() => {
    const el = pricingRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    updateArrows();                 // 1) au montage
    const t = setTimeout(updateArrows, 0); // 2) juste après layout
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // ========= Typing effect sur le hero (rAF pour fluidité maximale)
  const typingPhrases = ["livré clé en main", "en 2 à 3 semaines", "prêt à vous trouver des clients"];
  const [typingText, setTypingText] = useState("");
  useEffect(() => {
    let rafId: number;
    let lastTime = 0;
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseUntil = 0;

    const CHAR_INTERVAL = 40;   // ms entre chaque lettre (écriture)
    const DEL_INTERVAL = 18;    // ms entre chaque suppression
    const PAUSE_FULL = 2200;    // pause quand phrase complète
    const PAUSE_EMPTY = 120;    // pause avant phrase suivante

    function tick(now: number) {
      const phrase = typingPhrases[phraseIdx];

      if (now < pauseUntil) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const interval = deleting ? DEL_INTERVAL : CHAR_INTERVAL;
      if (now - lastTime >= interval) {
        lastTime = now;

        if (!deleting) {
          charIdx = Math.min(charIdx + 1, phrase.length);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === phrase.length) {
            pauseUntil = now + PAUSE_FULL;
            deleting = true;
          }
        } else {
          charIdx = Math.max(charIdx - 1, 0);
          setTypingText(phrase.slice(0, charIdx));
          if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % typingPhrases.length;
            pauseUntil = now + PAUSE_EMPTY;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ========= Scroll animations
  const scrollTypes = useScrollAnimation(0.12);
  const scrollHowItWorks = useScrollAnimation(0.1);
  const scrollPricing = useScrollAnimation(0.1);
  const scrollGuarantees = useScrollAnimation(0.12);
  const scrollStats = useScrollAnimation(0.2);
  const scrollAbout = useScrollAnimation(0.1);
  const scrollWhy = useScrollAnimation(0.1);

  // ========= Compteurs animés (stats)
  const stat890 = useCountUp(890, 1200, scrollStats.visible);
  const stat100 = useCountUp(100, 1000, scrollStats.visible);
  const stat48 = useCountUp(48, 900, scrollStats.visible);

  // ========= Tilt 3D sur les cartes
  const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);
  const handleTiltReset = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  }, []);

  // ========= Contrôle du menu mobile (Sheet)
  const [menuOpen, setMenuOpen] = useState(false);

  // ========= Lightbox pour le mockup
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ========= EmailJS pour le formulaire de contact
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
      await emailjs.send(
        "service_mxfwifu",
        "template_co6wxnr",
        templateParams,
        "Fr5bTGX_sdi1ekCv8"
      );
      navigate("/merci");
    } catch {
      setSendError(true);
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead />
      {/* ================= HEADER ================= */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "bg-background/70",
          scrolled ? "border-primary/50" : "border-border",
        ].join(" ")}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Barre mobile (logo centré + hamburger) */}
          <div className="md:hidden grid grid-cols-3 items-center h-20">
            {/* Hamburger */}
            <div className="flex">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <button aria-label="Ouvrir le menu" className="p-3">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-sm">
                  <nav className="flex flex-col gap-2">
                    {[
                      { href: "#comment-ca-marche", label: "Comment ça marche" },
                      { href: "#pricing", label: "Tarifs" },
                      { href: "#pourquoi-choisir-fluxa", label: "Pourquoi nous ?" },
                      { href: "#faq", label: "FAQ" },
                      { href: "#infos", label: "Contact" },
                    ].map((item, i) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="py-3 text-base border-b border-border/40 last:border-0 hover:text-primary hover:pl-2 transition-all duration-200"
                        style={{
                          opacity: menuOpen ? 1 : 0,
                          transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                          transition: `opacity 0.3s ease ${i * 0.06 + 0.1}s, transform 0.3s ease ${i * 0.06 + 0.1}s, color 0.2s, padding-left 0.2s`,
                        }}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                  <div className="mt-4 flex flex-col gap-2"
                    style={{
                      opacity: menuOpen ? 1 : 0,
                      transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                      transition: "opacity 0.3s ease 0.45s, transform 0.3s ease 0.45s",
                    }}
                  >
                    <Button asChild className="w-full">
                      <a href="#infos" onClick={() => setMenuOpen(false)}>Demander un devis</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="#pricing" onClick={() => setMenuOpen(false)}>Voir les tarifs</a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo centré */}
            <div className="flex justify-center items-center translate-y-[2px]">
              <a href="/" aria-label="Fluxa - Accueil" className="inline-flex items-center">
                <img
                  src={fluxaLogo}
                  alt="Fluxa - Agence web création sites vitrines professionnels pour TPE et artisans"
                  className="h-[100px] w-auto object-contain -translate-y-[8px]"
                />
              </a>
            </div>

            {/* Espace à droite pour centrage parfait */}
            <div />
          </div>

          {/* Barre desktop */}
          <div className="hidden md:flex items-center justify-between h-[120px]">
            <a href="/" aria-label="Fluxa - Accueil" className="flex items-center gap-2 animate-[fade-in_0.6s_ease_0.1s_both]">
              <img
                src={fluxaLogo}
                alt="Fluxa - Agence web création sites vitrines professionnels pour TPE et artisans"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-foreground/90 font-medium">
              {[
                { href: "#comment-ca-marche", label: "Comment ça marche" },
                { href: "#pricing", label: "Tarifs" },
                { href: "#pourquoi-choisir-fluxa", label: "Pourquoi nous ?" },
                { href: "#faq", label: "FAQ" },
                { href: "#infos", label: "Contact" },
              ].map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative group hover:text-foreground transition-colors duration-200"
                  style={{ animation: `fade-in 0.5s ease ${i * 0.07 + 0.2}s both` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Fond : halo bleu subtil, pas criard */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 left-1/4 w-[360px] h-[360px] bg-primary/6 rounded-full blur-[100px]" />
  </div>

  <div className="container mx-auto px-6 relative z-10 pt-40 pb-24 md:pt-48 md:pb-32">
    <div className="grid lg:grid-cols-[54%_46%] gap-16 lg:gap-12 items-center max-w-7xl mx-auto">

      {/* ── Colonne gauche ── */}
      <div className="space-y-8">

        {/* Eyebrow */}
        <p
          className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/80 animate-[fade-in_0.6s_ease_0.1s_both]"
        >
          Agence web · Chambéry, Savoie
        </p>

        {/* H1 — Playfair Display, grand, aéré */}
        <h1
          className="font-display text-[clamp(38px,5.2vw,68px)] font-black leading-[1.08] tracking-tight animate-[fade-in-up_0.7s_ease_0.15s_both]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Votre site vitrine<br />
          professionnel,{" "}
          <span className="text-primary">
            {typingText || " "}
          </span>
          <span className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-0.5 animate-pulse" />
        </h1>

        {/* Accroche — sobre, une seule idée par ligne */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg animate-[fade-in-up_0.7s_ease_0.3s_both]">
          Artisan, TPE ou indépendant — vos clients cherchent vos services sur Google.
          Fluxa vous livre un site soigné en 2–3 semaines, hébergement inclus.
        </p>

        {/* Bénéfices — 4 points, icône + texte, pas de puce générique */}
        <ul className="space-y-3 animate-[fade-in-up_0.7s_ease_0.4s_both]">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, txt: "Design responsive — mobile, tablette, desktop" },
            { icon: <Search className="w-4 h-4 text-primary shrink-0 mt-0.5" />, txt: "SEO Google optimisé dès la conception" },
            { icon: <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />, txt: "Hébergement + domaine offerts la 1ʳᵉ année" },
            { icon: <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />, txt: "Support technique inclus après livraison" },
          ].map(({ icon, txt }) => (
            <li key={txt} className="flex items-start gap-3 text-[15px] text-muted-foreground">
              {icon}
              <span>{txt}</span>
            </li>
          ))}
        </ul>

        {/* Prix — tag discret, pas clignotant */}
        <p className="text-sm text-muted-foreground/70 animate-[fade-in_0.6s_ease_0.5s_both]">
          <span className="font-semibold text-foreground">À partir de 890 €</span> tout compris · Paiement en 2 fois sans frais
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 animate-[fade-in-up_0.7s_ease_0.55s_both]">
          <a
            href="#infos"
            className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 overflow-hidden"
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">→</span>
            <div className="btn-shimmer absolute inset-0 z-20 pointer-events-none" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-base font-medium border border-border hover:border-primary/50 hover:text-primary transition-colors duration-200"
          >
            Voir les tarifs →
          </a>
        </div>
      </div>

      {/* ── Colonne droite : mockup ── */}
      <div
        className="relative group cursor-pointer animate-[fade-in-up_0.8s_ease_0.45s_both]"
        onClick={() => setLightboxOpen(true)}
      >
        {/* Halo derrière l'image */}
        <div className="absolute -inset-6 bg-primary/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-500" />

        <img
          src={mockupAJour}
          alt="Exemple site vitrine professionnel créé par Fluxa"
          loading="eager"
          width="1920"
          height="1080"
          className="relative w-full aspect-[16/10] object-cover object-top rounded-2xl border border-primary/15 shadow-[0_24px_60px_-16px_hsl(217,91%,60%,0.2)] group-hover:border-primary/30 transition-all duration-300"
        />

        {/* Caption bas gauche */}
        <div className="absolute left-3 bottom-3 flex items-center gap-1.5 text-[10px] text-muted-foreground bg-background/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-border/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          Site réalisé pour un artisan · Chambéry
        </div>

        {/* Zoom overlay au hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-primary/30">
            <ZoomIn className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-[fade-in_1s_ease_1.2s_both]">
    <span className="text-[10px] text-muted-foreground/40 tracking-[0.2em] uppercase">Découvrir</span>
    <div className="w-5 h-8 rounded-full border border-muted-foreground/20 flex items-start justify-center p-1">
      <div className="w-1 h-2 bg-primary rounded-full animate-[scrollDot_1.6s_ease-in-out_infinite]" />
    </div>
  </div>
</section>


{/* ================= TYPES DE SITES ================= */}
<section className="py-24 md:py-32 bg-background">
  <div ref={scrollTypes.ref} className="container mx-auto px-6">
    <div
      className="text-center space-y-4 mb-16 transition-all duration-700"
      style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(28px)" }}
    >
      <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70">Ce que nous créons</p>
      <h2
        className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Un site taillé pour votre activité
      </h2>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Artisan, TPE, indépendant — chaque site est conçu pour votre métier.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[
        {
          icon: <Palette className="w-5 h-5 text-primary" />,
          tag: "Artisan · Créatif",
          title: "Site Portfolio",
          text: "Galerie photo soignée, page réalisations avant/après, formulaire de contact. Idéal pour mettre vos travaux en valeur.",
          items: ["Galerie haute qualité", "Page avant/après", "Formulaire rapide"],
          delay: "0.08s",
        },
        {
          icon: <Building2 className="w-5 h-5 text-primary" />,
          tag: "TPE · PME",
          title: "Site Entreprise",
          text: "Structure claire, pages services détaillées, présentation équipe et Google Maps. Crédibilité immédiate.",
          items: ["Services détaillés", "Équipe & valeurs", "Google Maps intégré"],
          delay: "0.2s",
        },
        {
          icon: <Briefcase className="w-5 h-5 text-primary" />,
          tag: "Indépendant",
          title: "Profession Libérale",
          text: "Mettez en avant votre expertise, votre parcours et facilitez la prise de contact. Pensé pour les consultants, coachs et thérapeutes.",
          items: ["Services & tarifs", "Biographie pro", "Prise de RDV optionnelle"],
          delay: "0.32s",
        },
      ].map((card, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-border bg-card/50 p-7 flex flex-col hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
          style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.6s ease ${card.delay}, transform 0.6s ease ${card.delay}, border-color 0.3s, background 0.3s` }}
          onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
              {card.icon}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-primary/60">{card.tag}</span>
          </div>
          <h3
            className="text-xl font-bold mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {card.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{card.text}</p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-6">
            {card.items.map(it => (
              <li key={it} className="flex items-center gap-2.5">
                <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
          <a href="#infos" className="group/link text-sm font-semibold text-primary hover:text-primary/80 transition flex items-center gap-1.5 mt-auto">
            Demander un devis
            <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="comment-ca-marche" className="scroll-mt-[-30px] md:scroll-mt-[-54px]">
  <CommentCaMarche />
</section>



      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="py-24 md:py-32 bg-background scroll-mt-[4px] md:scroll-mt-[40px]"
      >
        <div ref={scrollPricing.ref} className="container mx-auto px-6">
          <div
            className="text-center space-y-4 mb-16 transition-all duration-700"
            style={{ opacity: scrollPricing.visible ? 1 : 0, transform: scrollPricing.visible ? "translateY(0)" : "translateY(28px)" }}
          >
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70">Tarifs</p>
            <h2
              className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Transparents, tout compris
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Une formule à partir de <span className="text-foreground font-semibold">890€</span>, hébergement et domaine inclus la première année.
            </p>
          </div>

          {/* Comparatif de prix */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
              <div className="grid grid-cols-3 text-center text-xs md:text-sm font-semibold border-b border-border">
                <div className="py-3.5 px-2 text-muted-foreground/60">Agence classique</div>
                <div className="py-3.5 px-2 bg-primary/10 text-primary border-x border-primary/20">Fluxa</div>
                <div className="py-3.5 px-2 text-muted-foreground/60">Freelance</div>
              </div>
              <div className="grid grid-cols-3 text-center">
                <div className="py-5 px-2 border-r border-border/40">
                  <p className="text-lg md:text-2xl font-bold text-muted-foreground/50">3 000–8 000€</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Délai 2–3 mois</p>
                </div>
                <div className="py-5 px-2 bg-primary/5 border-x border-primary/20">
                  <p className="text-lg md:text-2xl font-bold text-primary">dès 890€</p>
                  <p className="text-xs text-primary/70 mt-1 font-medium">Livré en 2–3 semaines</p>
                </div>
                <div className="py-5 px-2 border-l border-border/40">
                  <p className="text-lg md:text-2xl font-bold text-muted-foreground/50">1 500–3 000€</p>
                  <p className="text-xs text-muted-foreground/50 mt-1">Qualité variable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formule + Options */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <PricingCard
                title="Formule Site Vitrine"
                price="890 €"
                features={[
                  "Jusqu'à 5 pages (Accueil, Services, À propos, Galerie, Contact)",
                  "Design responsive (mobile + desktop)",
                  "Formulaire de contact fonctionnel",
                  "SEO de base (balises, métadonnées)",
                  "Optimisation vitesse/performance",
                  "Hébergement & domaine 1ère année inclus",
                  "1 round de modifications inclus",
                  "Support technique",
                ]}
                className="border-primary"
              />
            </div>

            <div className="space-y-4">
              <div className="mb-2">
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Options à la carte
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Toutes les options sont cumulables.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Pages supplémentaires", price: "+100€/page", desc: "Blog, Équipe, Actualités, etc." },
                  { label: "Galerie photo avancée", price: "+150€", desc: "Lightbox, filtres, mise en page optimisée" },
                  { label: "Prise de RDV en ligne", price: "+180€", desc: "Calendrier + notifications email" },
                  { label: "Rédaction SEO", price: "+250€", desc: "Textes pro optimisés Google (2 000 mots)" },
                  { label: "Multilingue", price: "+250€/langue", desc: "Anglais, espagnol ou autre (traduction non incluse)" },
                ].map((opt) => (
                  <div key={opt.label} className="rounded-xl border border-border bg-card/40 px-4 py-3.5 hover:border-primary/30 hover:bg-card/60 transition-all duration-200">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-semibold text-sm">{opt.label}</span>
                      <span className="text-primary font-bold text-sm shrink-0 ml-3">{opt.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-primary/25 bg-primary/5 px-5 py-4 mt-2">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="font-semibold">Maintenance mensuelle</span>
                  <span className="text-primary font-bold text-lg">59€/mois</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                  {["Mises à jour de sécurité", "Sauvegardes hebdomadaires", "Support technique prioritaire", "Modifications de contenu"].map(li => (
                    <li key={li} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />{li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground/60">
              Paiement en 2 fois sans frais · Propriété totale du site · Support inclus
            </p>
          </div>
        </div>
      </section>


      {/* ================= CTA / INFOS (formulaire) ================= */}
      <section
        id="infos"
        className="py-24 md:py-32 bg-background relative overflow-hidden scroll-mt-[-220px] md:scroll-mt-[-30px]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70 mb-4">Contact</p>
            <h2
              className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.1] tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Parlons de votre projet
            </h2>
            <p className="text-lg text-muted-foreground">
              Devis personnalisé sous 48h, sans engagement.
            </p>
          </div>

          <form
            id="contact"
            onSubmit={onSubmitInfo}
            className="max-w-xl mx-auto space-y-4 scroll-mt-[2px] md:scroll-mt-24"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Nom</label>
                <input id="contact-name" name="name" required className="w-full rounded-xl border border-border bg-card/60 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Email</label>
                <input id="contact-email" name="email" type="email" required className="w-full rounded-xl border border-border bg-card/60 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-need" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Type de site</label>
              <select id="contact-need" name="need" required defaultValue="" className="w-full rounded-xl border border-border bg-card/60 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all">
                <option value="" disabled>Sélectionner…</option>
                <option>Site vitrine simple (890€)</option>
                <option>Site avec galerie photo</option>
                <option>Site avec prise de RDV</option>
                <option>Refonte de site existant</option>
                <option>Autre / Je ne sais pas encore</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5 block">Message</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Votre activité, vos besoins, vos attentes…" className="w-full rounded-xl border border-border bg-card/60 px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all resize-none" />
            </div>

            <button type="submit" className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 overflow-hidden disabled:opacity-60" disabled={sending}>
              {sending && <span className="btn-spinner" />}
              <span className="relative z-10">{sending ? "Envoi en cours…" : "Envoyer ma demande"}</span>
              {!sending && <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">→</span>}
              <div className="btn-shimmer absolute inset-0 z-20 pointer-events-none" />
            </button>

            {sendError && (
              <p className="text-sm text-red-400">Une erreur est survenue. Réessayez ou contactez-nous par email.</p>
            )}
            <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Réponse sous 48h garantie · Sans engagement
            </p>
          </form>

          <div className="mt-12 flex flex-wrap justify-center gap-5 text-sm text-muted-foreground/60">
            <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> fluxa.contact@gmail.com
            </a>
            <a href="https://instagram.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="social-instagram transition-colors flex items-center gap-2 text-muted-foreground/60">
              <Instagram className="w-4 h-4" /> @fluxa.fr
            </a>
            <a href="https://www.facebook.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="social-facebook transition-colors flex items-center gap-2 text-muted-foreground/60">
              <Facebook className="w-4 h-4" /> fluxa.fr
            </a>
            <a href="https://www.linkedin.com/company/fluxa-fr/" target="_blank" rel="noopener noreferrer" className="social-linkedin transition-colors flex items-center gap-2 text-muted-foreground/60">
              <Linkedin className="w-4 h-4" /> Fluxa
            </a>
          </div>
        </div>
      </section>


{/* ================= GARANTIES ================= */}
<section className="py-24 md:py-32 bg-background">
  <div ref={scrollGuarantees.ref} className="container mx-auto px-6">
    <div
      className="text-center space-y-4 mb-16 transition-all duration-700"
      style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(28px)" }}
    >
      <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70">Nos engagements</p>
      <h2
        className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.1] tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Zéro mauvaise surprise
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
      {[
        { icon: <ShieldCheck className="w-5 h-5 text-primary" />, title: "Satisfaction garantie", text: "Modifications incluses jusqu'à validation complète, sans surcoût", delay: "0.08s" },
        { icon: <Zap className="w-5 h-5 text-primary" />, title: "Respect des délais", text: "Livraison en 2–3 semaines ou remboursement partiel", delay: "0.18s" },
        { icon: <Code2 className="w-5 h-5 text-primary" />, title: "Code propre", text: "Standards du web respectés, performance Core Web Vitals", delay: "0.28s" },
        { icon: <Headphones className="w-5 h-5 text-primary" />, title: "Support réactif", text: "Réponse sous 48h, corrections de bugs prioritaires", delay: "0.38s" },
      ].map((g, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-border bg-card/50 p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
          style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.6s ease ${g.delay}, transform 0.6s ease ${g.delay}, border-color 0.3s` }}
          onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
            {g.icon}
          </div>
          <h3 className="font-semibold mb-2 text-[15px]">{g.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{g.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= FAQ ================= */}
<section id="faq" className="scroll-mt-[-60px] md:scroll-mt-[-60px]">
  <Faq />
</section>

{/* ===== SECTION : Pourquoi choisir Fluxa ===== */}
<section id="pourquoi-choisir-fluxa" className="py-24 md:py-32 bg-background">
  <div ref={scrollWhy.ref} className="max-w-6xl mx-auto px-6">

    <div
      className="text-center space-y-4 mb-16 transition-all duration-700"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(28px)" }}
    >
      <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70">Pourquoi nous</p>
      <h2
        className="text-[clamp(28px,3.8vw,48px)] font-black leading-[1.1] tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Local. Rapide. Sans dépendance.
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto text-lg">
        Agence web à Chambéry. Sites livrés clé en main, sans contrat long terme, sans frais cachés.
      </p>
    </div>

    {/* 3 piliers */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        {
          icon: <Zap className="w-5 h-5 text-primary" />,
          title: "Livraison en 2–3 semaines",
          text: "Votre site prêt rapidement, dès validation de la maquette. Option express disponible.",
        },
        {
          icon: <Banknote className="w-5 h-5 text-primary" />,
          title: "Prix transparent dès 890€",
          text: "Design responsive, hébergement et domaine 1ère année inclus. Vous savez exactement ce que vous payez.",
        },
        {
          icon: <Target className="w-5 h-5 text-primary" />,
          title: "Propriété totale",
          text: "Vous êtes propriétaire à 100% du code source. Formation incluse. Vous restez libre.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card/40 p-7 space-y-3 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
          style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s` }}
          onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">{item.icon}</div>
          <h3
            className="text-lg font-bold"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {item.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
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
          className="rounded-2xl border border-border/40 bg-background py-10 px-6 text-center hover:border-primary/30 transition-colors"
          style={{ opacity: scrollStats.visible ? 1 : 0, transform: scrollStats.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${stat.delay}, transform 0.6s ease ${stat.delay}` }}
        >
          <div
            className="text-5xl md:text-6xl font-black text-primary mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {stat.count}{stat.suffix}
          </div>
          <p className="text-muted-foreground text-sm">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* SEO local Savoie */}
    <div
      className="rounded-2xl border border-primary/20 bg-primary/5 p-7 md:p-8"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            Agence web locale · Chambéry &amp; Savoie
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Basée à Cognin, à deux pas de Chambéry, Fluxa accompagne les artisans, TPE et indépendants de toute la Savoie. Un interlocuteur local, réactif, qui connaît votre territoire.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {["Chambéry", "Aix-les-Bains", "Albertville", "Annecy", "Savoie"].map(ville => (
            <span key={ville} className="text-xs font-medium px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary">{ville}</span>
          ))}
        </div>
      </div>
    </div>

    {/* CTA final */}
    <div
      className="text-center mt-12"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transition: "opacity 0.6s ease 0.55s" }}
    >
      <a href="#infos" className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 overflow-hidden">
        <span className="relative z-10">Je veux mon site vitrine</span>
        <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">→</span>
        <div className="btn-shimmer absolute inset-0 z-20 pointer-events-none" />
      </a>
    </div>
  </div>
</section>

{/* ===== SECTION : À propos ===== */}
<section className="py-20 md:py-24 bg-background border-t border-border/30">
  <div ref={scrollAbout.ref} className="max-w-5xl mx-auto px-6">
    <div
      className="text-center mb-12 transition-all duration-700"
      style={{ opacity: scrollAbout.visible ? 1 : 0, transform: scrollAbout.visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary/70 mb-3">L'agence</p>
      <h2
        className="text-[clamp(24px,3.2vw,40px)] font-black leading-[1.1] tracking-tight"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Qui sommes-nous ?
      </h2>
      <p className="mt-4 text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
        <strong className="text-foreground/80">Fluxa</strong> est une agence web locale basée à Chambéry, spécialisée dans la création de sites vitrines pour artisans, TPE et indépendants. Sites responsive, optimisés SEO, hébergement inclus, livrés clé en main.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: <Trophy className="w-4 h-4 text-primary" />, title: "Qualité & prix accessible", text: "Tarif transparent, de la maquette à la mise en ligne." },
        { icon: <Wrench className="w-4 h-4 text-primary" />, title: "Tous corps de métier", text: "Plombier, électricien, coach, consultant, artisan…" },
        { icon: <TrendingUp className="w-4 h-4 text-primary" />, title: "SEO & performance", text: "Core Web Vitals respectés, référencement Google optimisé." },
        { icon: <Lock className="w-4 h-4 text-primary" />, title: "Sécurité & RGPD", text: "SSL inclus, conformité RGPD, hébergement en France." },
      ].map((item, i) => (
        <div
          key={i}
          className="group flex flex-col gap-2.5 rounded-2xl border border-border/50 bg-card/40 p-5 hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
          style={{ opacity: scrollAbout.visible ? 1 : 0, transform: scrollAbout.visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">{item.icon}</div>
            <p className="font-semibold text-sm">{item.title}</p>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ================= FOOTER ================= */}
<footer className="border-t border-border/40 py-12 md:py-14">
  <div className="container mx-auto px-6">
    <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <img
            src={fluxaLogo}
            alt="Logo Fluxa - Agence web création sites internet professionnels"
            className="h-8 w-auto rounded-lg bg-white/5 p-1 ring-1 ring-white/10"
          />
          <p className="text-sm text-muted-foreground/70">
            Création de sites vitrines professionnels
          </p>
        </div>
        <address className="not-italic text-xs text-muted-foreground/50 mt-0.5">
          <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors">
            fluxa.contact@gmail.com
          </a>
          {" · "}Chambéry, Savoie
        </address>
      </div>

      <nav className="flex flex-wrap items-center gap-5 text-sm" aria-label="Réseaux sociaux">
        <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground/60">
          <Mail className="w-4 h-4" /> Email
        </a>
        <a href="https://instagram.com/fluxa.fr" target="_blank" rel="noopener noreferrer nofollow" className="social-instagram transition-colors inline-flex items-center gap-2 text-muted-foreground/60">
          <Instagram className="w-4 h-4" /> Instagram
        </a>
        <a href="https://www.facebook.com/fluxa.fr" target="_blank" rel="noopener noreferrer nofollow" className="social-facebook transition-colors inline-flex items-center gap-2 text-muted-foreground/60">
          <Facebook className="w-4 h-4" /> Facebook
        </a>
        <a href="https://www.linkedin.com/company/fluxa-fr/" target="_blank" rel="noopener noreferrer nofollow" className="social-linkedin transition-colors inline-flex items-center gap-2 text-muted-foreground/60">
          <Linkedin className="w-4 h-4" /> LinkedIn
        </a>
      </nav>
    </div>

    <div className="my-7 border-t border-border/30" />

    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
      <p className="text-xs text-muted-foreground/40">
        © {new Date().getFullYear()} Fluxa · SIRET 83014496000044
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
        <a href="/mentions-legales" className="hover:text-primary transition">Mentions légales</a>
        <span className="text-border/60">·</span>
        <a href="/politique-confidentialite" className="hover:text-primary transition">Confidentialité</a>
        <span className="text-border/60">·</span>
        <a href="/cgv" className="hover:text-primary transition">CGV</a>
      </div>
    </div>
  </div>
</footer>

      {/* ================= LIGHTBOX MOCKUP ================= */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background border border-border hover:border-primary/40 transition"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={mockupAJour}
              alt="Exemple site vitrine professionnel responsive créé par Fluxa - Design moderne optimisé SEO pour TPE et artisans"
              width="1920"
              height="1080"
              className="w-full h-auto rounded-2xl border border-primary/30 shadow-2xl"
            />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Cliquez en dehors de l'image pour fermer
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;