import SEOHead from "@/components/SEOHead";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { Faq } from "@/components/Faq";
import { CommentCaMarche } from "@/components/Automations";
import { PricingCard } from "@/components/PricingCard";
import SectionDivider from "@/components/SectionDivider";
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

  // ========= Typing effect sur le hero
  const typingPhrases = ["livré clé en main", "en 2 à 3 semaines", "prêt à vous trouver des clients"];
  const [typingIndex, setTypingIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [typingDeleting, setTypingDeleting] = useState(false);
  useEffect(() => {
    const phrase = typingPhrases[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!typingDeleting && typingText.length < phrase.length) {
      timeout = setTimeout(() => setTypingText(phrase.slice(0, typingText.length + 1)), 55);
    } else if (!typingDeleting && typingText.length === phrase.length) {
      timeout = setTimeout(() => setTypingDeleting(true), 2200);
    } else if (typingDeleting && typingText.length > 0) {
      timeout = setTimeout(() => setTypingText(typingText.slice(0, -1)), 30);
    } else if (typingDeleting && typingText.length === 0) {
      setTypingDeleting(false);
      setTypingIndex((i) => (i + 1) % typingPhrases.length);
    }
    return () => clearTimeout(timeout);
  }, [typingText, typingDeleting, typingIndex]);

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

      {/* ================= HERO (épuré) ================= */}
<section className="relative min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center overflow-hidden">
  {/* fond halo */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(217_40%_8%)] to-background">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
  </div>

  {/* top padding ajusté pour le header fixe */}
  <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-32">
    {/* H1 centré en haut */}
    <div className="text-center mb-12 md:mb-16">
      <h1 className="text-[clamp(32px,5.5vw,62px)] font-bold leading-tight">
        <span className="md:whitespace-nowrap">Votre site vitrine professionnel,</span>{" "}
        <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent md:whitespace-nowrap">
          {typingText}
          <span className="inline-block w-[3px] h-[1em] bg-primary align-middle ml-0.5 animate-pulse" />
        </span>
      </h1>
    </div>

    {/* Grille 2 colonnes : Texte + Image */}
    <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-10 items-center">
      {/* Colonne gauche : Accroche + bénéfices + CTAs */}
      <div className="space-y-7 text-center lg:text-left">
        {/* Accroche */}
        <div className="space-y-3 text-[15px] md:text-lg text-muted-foreground/90">
          <p>
            <span className="text-foreground font-semibold">Artisan, TPE ou indépendant ?</span>{" "}
            Fluxa crée votre site vitrine professionnel en 2 à 3 semaines, clé en main, livré prêt à recevoir vos clients.
          </p>
          <p>
            Design soigné, référencement Google, hébergement inclus : tout ce qu'il faut pour être visible en ligne et décrocher de nouveaux clients, sans vous occuper de la technique.
          </p>
        </div>

        {/* Bénéfices clés */}
        <ul className="space-y-2 text-[15px] md:text-base text-muted-foreground/90 text-center md:text-left mx-auto lg:mx-0 max-w-sm lg:max-w-none">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-primary" />, txt: "Site vitrine responsive, parfait sur mobile, tablette et desktop" },
            { icon: <Search className="w-4 h-4 text-primary" />, txt: "Optimisation SEO incluse pour apparaître sur Google" },
            { icon: <Globe className="w-4 h-4 text-primary" />, txt: "Hébergement web + nom de domaine offerts la 1ère année" },
            { icon: <Phone className="w-4 h-4 text-primary" />, txt: "Support technique inclus, on reste disponibles après livraison" },
          ].map(({ icon, txt }) => (
            <li key={txt} className="flex items-start md:items-start justify-center md:justify-start gap-2">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <span>{txt}</span>
            </li>
          ))}
        </ul>

        {/* Badge prix */}
        <div className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-4 py-2.5 font-semibold text-foreground bg-primary/10 text-sm mx-auto lg:mx-0">
          <Banknote className="w-4 h-4" /> À partir de <span className="text-primary">890 € tout compris</span>
        </div>

        {/* CTAs — Devis en principal */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <a
            href="#infos"
            className="group relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition w-full sm:w-auto overflow-hidden"
            aria-label="Demander un devis gratuit"
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <span className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(217,77%,45%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium border-2 border-primary/50 hover:bg-primary/10 transition w-full sm:w-auto"
            aria-label="Voir nos tarifs"
          >
            Voir nos tarifs
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* Visuel (mockup) */}
      <div className="relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[hsl(217,77%,39%)]/20 rounded-2xl blur-2xl group-hover:opacity-80 transition"></div>
        <img
          src={mockupAJour}
          alt="Exemple site vitrine professionnel responsive créé par Fluxa - Design moderne optimisé SEO pour TPE et artisans"
          loading="eager"
          width="1920"
          height="1080"
          className="relative rounded-2xl border border-primary/20 shadow-[0_30px_80px_-30px_hsl(217,91%,60%/.25)] group-hover:border-primary/40 transition w-full aspect-[16/10] object-cover object-center"
        />
        <div className="absolute left-3 bottom-3 text-[10px] text-muted-foreground/85 bg-background/70 backdrop-blur px-2 py-1 rounded-lg border border-border/60">
          Dernière réalisation client
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-primary/40">
            <ZoomIn className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<SectionDivider />

{/* ================= TYPES DE SITES ================= */}
<section className="py-12 md:py-20 bg-background">
  <div ref={scrollTypes.ref} className="container mx-auto px-6">
    <div
      className="text-center space-y-4 mb-12 transition-all duration-700"
      style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(32px)" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold">Exemples de sites vitrines</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Nous adaptons votre site à votre activité et à vos besoins spécifiques
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Carte 1 */}
      <div
        className="group rounded-2xl border border-border bg-card p-6 hover:border-violet-500/60 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.25)] transition-all flex flex-col"
        style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s, border-color 0.3s, box-shadow 0.3s" }}
        onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0"><Palette className="w-6 h-6 text-violet-400" /></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">Artisan / Créatif</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Site Portfolio</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          Mettez en avant vos réalisations avec une galerie photo soignée. Idéal pour les artisans, photographes, designers et prestataires de service.
        </p>
        <ul className="space-y-1.5 text-xs text-muted-foreground mb-5">
          <li className="flex items-center gap-2"><span className="text-violet-400">✓</span> Galerie photo haute qualité</li>
          <li className="flex items-center gap-2"><span className="text-violet-400">✓</span> Page réalisations / avant-après</li>
          <li className="flex items-center gap-2"><span className="text-violet-400">✓</span> Formulaire de contact rapide</li>
        </ul>
        <a href="#infos" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition flex items-center gap-1 mt-auto py-2">
          Demander un devis <span>→</span>
        </a>
      </div>

      {/* Carte 2 */}
      <div
        className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.25)] transition-all flex flex-col"
        style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s, border-color 0.3s, box-shadow 0.3s" }}
        onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0"><Building2 className="w-6 h-6 text-primary" /></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">TPE / PME</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Site Entreprise</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          Présentez vos services, votre équipe et vos valeurs avec une structure claire et professionnelle pour asseoir votre crédibilité.
        </p>
        <ul className="space-y-1.5 text-xs text-muted-foreground mb-5">
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Pages services détaillées</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Présentation équipe & valeurs</li>
          <li className="flex items-center gap-2"><span className="text-primary">✓</span> Google Maps intégré</li>
        </ul>
        <a href="#infos" className="text-sm font-medium text-primary hover:text-primary/80 transition flex items-center gap-1 mt-auto py-2">
          Demander un devis <span>→</span>
        </a>
      </div>

      {/* Carte 3 */}
      <div
        className="group rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/60 hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.25)] transition-all flex flex-col"
        style={{ opacity: scrollTypes.visible ? 1 : 0, transform: scrollTypes.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s, border-color 0.3s, box-shadow 0.3s" }}
        onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0"><Briefcase className="w-6 h-6 text-emerald-400" /></div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">Indépendant</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">Site Profession Libérale</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          Valorisez votre expertise et facilitez la prise de contact. Parfait pour les consultants, coachs, thérapeutes et experts indépendants.
        </p>
        <ul className="space-y-1.5 text-xs text-muted-foreground mb-5">
          <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Présentation claire des services</li>
          <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Biographie & parcours pro</li>
          <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Formulaire de contact rapide</li>
        </ul>
        <a href="#infos" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 mt-auto py-2">
          Demander un devis <span>→</span>
        </a>
      </div>
    </div>
  </div>
</section>

<SectionDivider />

<section id="comment-ca-marche" className="scroll-mt-[-30px] md:scroll-mt-[-54px]">
  <CommentCaMarche />
</section>

<SectionDivider />

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="
          pt-16 md:pt-20
          pb-14 md:pb-20
          bg-background
          scroll-mt-[4px] md:scroll-mt-[40px]
        "
      >
        <div ref={scrollPricing.ref} className="container mx-auto px-6">
          <div
            className="text-center space-y-6 max-md:mb-12 md:mb-16 transition-all duration-700"
            style={{ opacity: scrollPricing.visible ? 1 : 0, transform: scrollPricing.visible ? "translateY(0)" : "translateY(32px)" }}
          >
  <div className="relative inline-block">
    <div className="absolute -top-3 -right-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
      NOUVEAU
    </div>
    <h2 className="text-4xl lg:text-5xl font-bold">
      Tarifs site vitrine : transparents et tout compris
    </h2>
  </div>
  <p className="text-xl text-muted-foreground">
    Une <span className="text-foreground font-semibold">formule unique</span> à partir de 890€, ajustable selon vos besoins.
    Hébergement et domaine inclus la première année.
  </p>
</div>

          {/* Formule + Options */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Formule de base */}
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

            {/* Options supplémentaires */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Options à la carte</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Personnalisez votre site selon vos besoins. Toutes les options sont cumulables.
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Pages supplémentaires</span>
                    <span className="text-primary font-bold">+100€/page</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ajoutez des pages dédiées (Blog, Équipe, Actualités, etc.)</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Galerie photo avancée</span>
                    <span className="text-primary font-bold">+150€</span>
                  </div>
                  <p className="text-[0.95rem] md:text-base text-muted-foreground">Lightbox, filtres, mise en page optimisée pour vos réalisations</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Prise de rendez-vous en ligne</span>
                    <span className="text-primary font-bold">+180€</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Calendrier de réservation avec notifications email automatiques</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Rédaction de contenu SEO</span>
                    <span className="text-primary font-bold">+250€</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Textes professionnels optimisés pour Google (jusqu'à 2000 mots)</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Multilingue</span>
                    <span className="text-primary font-bold">+250€/langue</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Version anglaise, espagnole ou autre langue (traduction non incluse)</p>
                </div>
              </div>

              {/* Maintenance */}
              <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-lg">Maintenance mensuelle</span>
                  <span className="text-primary font-bold text-xl">59€/mois</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Gardez votre site sécurisé et performant dans la durée
                </p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Mises à jour de sécurité et plugins</li>
                  <li>• Sauvegardes hebdomadaires automatiques</li>
                  <li>• Corrections mineures de bugs</li>
                  <li>• Support technique prioritaire (&lt;48h)</li>
                  <li>• Modifications de contenu (textes, images simples)</li>
                  <li>• Monitoring de disponibilité</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Note de réassurance sous les tarifs */}
          <div className="mt-12 max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Paiement en 2 fois sans frais disponible • Propriété totale du site • Support inclus
            </p>
          </div>
        </div>
      </section>

<SectionDivider />

      {/* ================= CTA / INFOS (formulaire) ================= */}
      <section
        id="infos"
        className={`
          pt-0 pb-10 md:pb-16
          bg-gradient-to-b from-background via-[hsl(217_40%_8%)] to-background
          relative overflow-hidden
          scroll-mt-[-220px] md:scroll-mt-[-30px]
        `}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Créons ensemble votre <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">site vitrine professionnel</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Parlez-nous de votre projet et recevez un devis personnalisé sous 48h, sans engagement.
            </p>
          </div>

          {/* Mini-process en 3 étapes */}
          <ul className="mt-8 hidden md:grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <Mail className="w-4 h-4" /> Contact & Brief
              </div>
              <p>Vous nous contactez par mail, nous vous envoyons un formulaire détaillé.</p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <Calendar className="w-4 h-4" /> Maquettes
              </div>
              <p>Création collaborative des maquettes jusqu'à validation complète.</p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Développement
              </div>
              <p>Développement et mise en ligne de votre site professionnel.</p>
            </li>
          </ul>

          {/* Formulaire court */}
          <form
            id="contact"
            onSubmit={onSubmitInfo}
            className="mt-10 max-w-2xl mx-auto space-y-4 scroll-mt-[2px] md:scroll-mt-24"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-sm">Nom</label>
                <input id="contact-name" name="name" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3.5 outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm">Email</label>
                <input id="contact-email" name="email" type="email" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3.5 outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-need" className="text-sm">Type de site souhaité</label>
              <select id="contact-need" name="need" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3.5 outline-none focus:ring-2 focus:ring-ring">
                <option value="" disabled>Sélectionner</option>
                <option>Site vitrine simple (890€)</option>
                <option>Site avec galerie photo</option>
                <option>Site avec prise de RDV</option>
                <option>Refonte de site existant</option>
                <option>Autre / Je ne sais pas encore</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm">Votre message</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Décrivez votre projet en quelques mots : votre activité, vos besoins, vos attentes…" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3.5 outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-70" disabled={sending}>
                {sending && <span className="btn-spinner" />}
                {sending ? "Envoi en cours…" : "Envoyer ma demande"}
                {!sending && <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>}
              </button>
            </div>
            {sendError && (
              <p className="text-sm text-red-400">Une erreur est survenue. Réessayez ou contactez-nous par email.</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Réponse sous 48h, sans engagement.
            </p>
          </form>

          {/* Preuves (mobile) sous le formulaire */}
          <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground justify-start md:justify-center">
            <li className="rounded-full border border-border/70 px-3 py-1">🔐 Hébergement sécurisé inclus</li>
            <li className="rounded-full border border-border/70 px-3 py-1">⚡ Livraison rapide (2-3 semaines)</li>
            <li className="rounded-full border border-border/70 px-3 py-1">🎯 SEO optimisé</li>
          </ul>

          {/* Lien contact — mail + Instagram + Facebook + LinkedIn */}
          <div className="mt-10 text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2 py-2">
                <Mail className="w-4 h-4" /> fluxa.contact@gmail.com
              </a>
              <a href="https://instagram.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="social-instagram transition-colors flex items-center gap-2 py-2 text-muted-foreground">
                <Instagram className="w-4 h-4" /> fluxa.fr
              </a>
              <a href="https://www.facebook.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="social-facebook transition-colors flex items-center gap-2 py-2 text-muted-foreground">
                <Facebook className="w-4 h-4" /> fluxa.fr
              </a>
              <a href="https://www.linkedin.com/company/fluxa-fr/" target="_blank" rel="noopener noreferrer" className="social-linkedin transition-colors flex items-center gap-2 py-2 text-muted-foreground">
                <Linkedin className="w-4 h-4" /> Fluxa
              </a>
            </div>
          </div>
        </div>
      </section>

<SectionDivider />

{/* ================= TÉMOIGNAGES ================= */}
{/* Section supprimée pour conformité légale (loi Hamon - faux avis interdits) */}
{/* TODO: Ajouter de vrais témoignages clients avec leur consentement écrit */}

      {/* ================= GARANTIES ================= */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div ref={scrollGuarantees.ref} className="container mx-auto px-6">
          <div
            className="text-center space-y-4 mb-12 transition-all duration-700"
            style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(32px)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">Nos garanties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons sur la qualité et la transparence de nos prestations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-emerald-500/50 hover:shadow-[0_0_24px_-8px_rgba(16,185,129,0.2)] transition-colors"
              style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s, border-color 0.3s, box-shadow 0.3s" }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold mb-2">Satisfaction garantie</h3>
              <p className="text-sm text-muted-foreground">
                Modifications incluses jusqu'à validation complète, sans surcoût
              </p>
            </div>

            <div
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-amber-500/50 hover:shadow-[0_0_24px_-8px_rgba(245,158,11,0.2)] transition-colors"
              style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s, border-color 0.3s, box-shadow 0.3s" }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold mb-2">Respect des délais</h3>
              <p className="text-sm text-muted-foreground">
                Livraison en 2-3 semaines ou remboursement partiel
              </p>
            </div>

            <div
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-violet-500/50 hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.2)] transition-colors"
              style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.34s, transform 0.6s ease 0.34s, border-color 0.3s, box-shadow 0.3s" }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-semibold mb-2">Code propre</h3>
              <p className="text-sm text-muted-foreground">
                Standards du web respectés, performance optimale
              </p>
            </div>

            <div
              className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/50 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.2)] transition-colors"
              style={{ opacity: scrollGuarantees.visible ? 1 : 0, transform: scrollGuarantees.visible ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.6s ease 0.46s, transform 0.6s ease 0.46s, border-color 0.3s, box-shadow 0.3s" }}
              onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support réactif</h3>
              <p className="text-sm text-muted-foreground">
                Réponse sous 48h, corrections de bugs prioritaires
              </p>
            </div>
          </div>
        </div>
      </section>

<SectionDivider />

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-[-60px] md:scroll-mt-[-60px]">
        <Faq />
      </section>

<SectionDivider />

{/* ===== SECTION : Pourquoi choisir Fluxa (condensée) ===== */}
<section id="pourquoi-choisir-fluxa" className="py-12 md:py-20 bg-gradient-to-b from-background via-card/30 to-background">
  <div ref={scrollWhy.ref} className="max-w-6xl mx-auto px-6">

    {/* Titre */}
    <div
      className="text-center space-y-4 mb-12 transition-all duration-700"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(28px)" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        Pourquoi choisir Fluxa pour votre site vitrine ?
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Agence web locale à Chambéry (Savoie) — sites vitrines professionnels livrés clé en main, sans contrat long terme, sans frais cachés.
      </p>
    </div>

    {/* 3 piliers */}
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        {
          icon: <Zap className="w-7 h-7 text-primary" />,
          title: "Livraison en 2-3 semaines",
          text: "Votre site prêt rapidement, dès validation de la maquette. Option express disponible sur demande.",
        },
        {
          icon: <Banknote className="w-7 h-7 text-primary" />,
          title: "Prix transparent dès 890€",
          text: "Design responsive, hébergement et domaine 1ère année inclus. Vous savez exactement ce que vous payez.",
        },
        {
          icon: <Target className="w-7 h-7 text-primary" />,
          title: "Propriété totale, 0 dépendance",
          text: "Vous êtes propriétaire à 100% du code source. Formation incluse à la livraison. Vous restez libre.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card/40 p-6 space-y-3 hover:bg-card/60 hover:border-primary/30 transition-colors"
          style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s` }}
          onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">{item.icon}</div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
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
          className="rounded-2xl border border-border/60 bg-background/40 py-8 px-6 text-center hover:border-primary/30 transition-colors"
          style={{ opacity: scrollStats.visible ? 1 : 0, transform: scrollStats.visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${stat.delay}, transform 0.6s ease ${stat.delay}` }}
          onMouseMove={handleTilt} onMouseLeave={handleTiltReset}
        >
          <div className="text-4xl md:text-5xl font-bold text-primary mb-1">{stat.count}{stat.suffix}</div>
          <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* SEO local Savoie */}
    <div
      className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 transition-all duration-700"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transform: scrollWhy.visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary shrink-0" />
            Agence web locale — Chambéry &amp; Savoie
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Basée à Cognin, à deux pas de Chambéry, Fluxa accompagne les artisans, TPE et indépendants de toute la Savoie : Chambéry, Aix-les-Bains, Albertville, Annecy et alentours. Un interlocuteur local, réactif, qui connaît votre territoire et vos clients.
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
      className="text-center mt-10"
      style={{ opacity: scrollWhy.visible ? 1 : 0, transition: "opacity 0.6s ease 0.55s" }}
    >
      <a href="#infos" className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition">
        Demander un devis gratuit
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </a>
    </div>
  </div>
</section>

<SectionDivider />

{/* ===== SECTION : À propos + Technologies (condensée) ===== */}
<section className="py-12 md:py-16 bg-background border-t border-border/50">
  <div ref={scrollAbout.ref} className="max-w-5xl mx-auto px-6">
    <div
      className="text-center mb-8 transition-all duration-700"
      style={{ opacity: scrollAbout.visible ? 1 : 0, transform: scrollAbout.visible ? "translateY(0)" : "translateY(24px)" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold">
        Agence de création de sites internet pour artisans et indépendants — Chambéry, Savoie
      </h2>
      <p className="mt-3 text-muted-foreground text-sm max-w-2xl mx-auto">
        <strong className="text-primary">Fluxa</strong> est une agence web locale spécialisée dans la création de sites vitrines professionnels pour TPE, artisans, consultants et entrepreneurs en Savoie et partout en France : responsive, optimisés SEO, hébergement inclus.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { icon: <Trophy className="w-4 h-4 text-primary" />, title: "Qualité & prix accessible", text: "Tarif transparent, de la maquette à la mise en ligne." },
        { icon: <Wrench className="w-4 h-4 text-primary" />, title: "Tous corps de métier", text: "Plombier, électricien, coach, consultant, artisan..." },
        { icon: <TrendingUp className="w-4 h-4 text-primary" />, title: "SEO & performance", text: "Core Web Vitals respectés, référencement Google optimisé." },
        { icon: <Lock className="w-4 h-4 text-primary" />, title: "Sécurité & RGPD", text: "SSL inclus, conformité RGPD, hébergement en France." },
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-4 hover:border-primary/30 transition-colors"
          style={{ opacity: scrollAbout.visible ? 1 : 0, transform: scrollAbout.visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}
        >
          <div className="flex items-center gap-2">{item.icon}<p className="font-semibold text-sm">{item.title}</p></div>
          <p className="text-muted-foreground text-xs leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<SectionDivider />

{/* ===== SECTION : Articles en vedette ===== */}
<section className="py-12 md:py-16 bg-background">
  <div className="max-w-5xl mx-auto px-6">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl md:text-3xl font-bold">Guides &amp; conseils pour votre site web</h2>
      <a href="/articles" className="group hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        Tous les articles
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </a>
    </div>
    <div className="grid md:grid-cols-3 gap-5">
      {[
        {
          tag: "SEO",
          color: "emerald",
          title: "Comment bien référencer son site vitrine sur Google ?",
          desc: "Les bases du SEO local pour un artisan ou une TPE : balises, mots-clés, Google Business.",
          href: "/articles/seo-site-vitrine-artisan",
        },
        {
          tag: "Création web",
          color: "primary",
          title: "Combien coûte vraiment un site vitrine en 2025 ?",
          desc: "Comparatif agences, freelances et constructeurs de sites — ce qui est vraiment inclus.",
          href: "/articles/cout-site-vitrine-2025",
        },
        {
          tag: "Conseils",
          color: "violet",
          title: "5 erreurs à éviter lors de la création de votre site vitrine",
          desc: "Les pièges les plus courants que font les artisans et TPE lors de leur premier site web.",
          href: "/articles/erreurs-site-vitrine",
        },
      ].map((article, i) => (
        <a
          key={i}
          href={article.href}
          className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[0_0_24px_-8px_hsl(217,91%,60%,0.15)] transition-all flex flex-col gap-3"
        >
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit ${
            article.color === "emerald" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
            article.color === "violet"  ? "text-violet-400 bg-violet-500/10 border border-violet-500/20" :
                                          "text-primary bg-primary/10 border border-primary/20"
          }`}>{article.tag}</span>
          <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">{article.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed flex-1">{article.desc}</p>
          <span className="text-xs font-medium text-primary flex items-center gap-1 mt-auto">
            Lire l'article
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </a>
      ))}
    </div>
    <div className="mt-6 text-center md:hidden">
      <a href="/articles" className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
        Tous les articles
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </a>
    </div>
  </div>
</section>

      {/* ================= FOOTER ================= */}
<footer className="mt-16 py-10 border-t border-border/80">
  <div className="container mx-auto px-6">
    {/* Ligne 1 : logo + baseline + NAP */}
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <img
            src={fluxaLogo}
            alt="Logo Fluxa - Agence web création sites internet professionnels"
            className="h-8 w-auto rounded-lg bg-white/5 p-1 ring-1 ring-white/10"
          />
          <p className="text-sm text-muted-foreground">
            Fluxa · Création de sites vitrines professionnels
          </p>
        </div>
        {/* NAP — Name Address Phone (signal SEO local critique) */}
        <address className="not-italic text-xs text-muted-foreground leading-relaxed">
          36 rue des Criquets, 73160 Cognin, Savoie<br />
          <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors">
            fluxa.contact@gmail.com
          </a>
        </address>
      </div>

      {/* Réseaux + lien articles */}
      <nav className="flex flex-wrap items-center gap-5 text-sm" aria-label="Liens utiles">
        <a
          href="/articles"
          className="hover:text-primary transition-colors text-muted-foreground"
        >
          Blog &amp; Guides
        </a>
        <a
          href="mailto:fluxa.contact@gmail.com"
          className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
        <a
          href="https://instagram.com/fluxa.fr"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="social-instagram transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Instagram className="w-4 h-4" />
          Instagram
        </a>
        <a
          href="https://www.facebook.com/fluxa.fr"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="social-facebook transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>
        <a
          href="https://www.linkedin.com/company/fluxa-fr/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="social-linkedin transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
      </nav>
    </div>

    {/* Séparateur */}
    <div className="my-6 border-t border-border/60" />

    {/* Ligne 2 : liens légaux + © */}
    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fluxa · Emmanuel Légeret, Entrepreneur Individuel · SIRET 83014496000044
      </p>

      <div className="flex items-center gap-4 text-sm">
        <a href="/mentions-legales" className="hover:text-primary transition">Mentions légales</a>
        <span className="text-border">•</span>
        <a href="/politique-confidentialite" className="hover:text-primary transition">Politique de confidentialité</a>
        <span className="text-border">•</span>
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