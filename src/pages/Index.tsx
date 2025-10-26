import SEOHead from "@/components/SEOHead";
import { useEffect, useMemo, useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { Automations } from "@/components/Automations";
import { PricingCard } from "@/components/PricingCard";
import {
  Calendar,
  DollarSign,
  MessageSquare,
  BarChart3,
  Mail,
  Instagram,
  Facebook,
  CheckCircle2,
  XCircle,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dashboardMockup from "@/assets/dashboard-mockup.webp";
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
    // === SEO global ===
useEffect(() => {
  document.title = "Fluxa — Outil de gestion sur mesure pour artisans & indépendants";
}, []);



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

  // ========= Contrôle du menu mobile (Sheet)
  const [menuOpen, setMenuOpen] = useState(false);

  // ========= Mailto pour le formulaire "En savoir plus"
  const subject = useMemo(() => encodeURIComponent("Demande d'infos Fluxa"), []);
  const [sending, setSending] = useState(false);

  const onSubmitInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const f = new FormData(e.currentTarget);
    const name = encodeURIComponent((f.get("name") as string) || "");
    const email = encodeURIComponent((f.get("email") as string) || "");
    const activity = encodeURIComponent((f.get("activity") as string) || "");
    const need = encodeURIComponent((f.get("need") as string) || "");
    const budget = encodeURIComponent((f.get("budget") as string) || "");
    const delay = encodeURIComponent((f.get("delay") as string) || "");
    const message = encodeURIComponent((f.get("message") as string) || "");

    const body = encodeURIComponent(
`Bonjour Fluxa,

Je souhaite en savoir plus.

Nom : ${decodeURIComponent(name)}
Email : ${decodeURIComponent(email)}
Activité : ${decodeURIComponent(activity)}
Besoin principal : ${decodeURIComponent(need)}
Budget : ${decodeURIComponent(budget)}
Délai : ${decodeURIComponent(delay)}

Message :
${decodeURIComponent(message)}

Merci !`
    );

    setSending(true);
    window.open(
      `mailto:fluxa.contact@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setTimeout(() => setSending(false), 800);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                  <button aria-label="Ouvrir le menu" className="p-2 -ml-2">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-sm">
                  <nav className="flex flex-col gap-2">
                    <a href="/nos-formules" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Nos formules</a>
                    <a
  href="/demo"
  className="py-2 text-base text-amber-400 font-semibold hover:text-amber-300 transition-all duration-200"
  onClick={() => setMenuOpen(false)}
>
  Voir la démo
</a>
                    <a href="#automations" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Automatisations</a>
                    <a href="#faq" className="py-2 text-base" onClick={() => setMenuOpen(false)}>FAQ</a>
                    <a href="#infos" className="py-2 text-base" onClick={() => setMenuOpen(false)}>En savoir plus</a>
                    <a href="/articles" className="hover:text-foreground transition">Articles</a>
                    <a href="https://instagram.com/fluxa.fr"
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 text-base inline-flex items-center gap-2"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Instagram className="w-4 h-4" />
                      fluxa.fr
                    </a>
                  </nav>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild className="w-full">
                      <a href="#contact" onClick={() => setMenuOpen(false)}>Nous contacter</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="#pricing" onClick={() => setMenuOpen(false)}>Voir les formules</a>
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
                  alt="Fluxa - Outil de gestion sur mesure pour artisans et indépendants"
                  className="h-[100px] w-auto object-contain -translate-y-[8px]"
                />
              </a>
            </div>

            {/* Espace à droite pour centrage parfait */}
            <div />
          </div>

          {/* Barre desktop */}
          <div className="hidden md:flex items-center justify-between h-[120px]">
            <a href="/" aria-label="Fluxa - Accueil" className="flex items-center gap-2">
              <img
                src={fluxaLogo}
                alt="Fluxa - Outil de gestion sur mesure pour artisans et indépendants"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-muted-foreground font-medium">
              <a href="#pricing" className="hover:text-foreground transition">Nos formules</a>
              <a
  href="/demo"
  className="text-amber-400 font-semibold hover:text-amber-300 transition-all duration-200 hover:drop-shadow-[0_0_6px_#fbbf24]"
>
  Voir la démo
</a>
              <a href="#automations" className="hover:text-foreground transition">Automatisations</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
              <a href="#infos" className="hover:text-foreground transition">En savoir plus</a>
              <a href="/articles" className="hover:text-foreground transition">Articles</a>
              <a href="https://instagram.com/fluxa.fr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4" />
                fluxa.fr
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= HERO (épuré) ================= */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* fond halo */}
  <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(217_40%_8%)] to-background">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
  </div>

  {/* top padding ajusté pour le header fixe */}
  <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-24">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Texte (version pro et allégée) */}
      <div className="space-y-8 text-center md:text-left">
        <div className="space-y-5">
          <h1 className="text-[clamp(28px,6vw,56px)] font-bold leading-tight">
            Votre <span className="whitespace-nowrap">outil de gestion</span> sur-mesure,{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
              pensé pour votre activité.
            </span>
          </h1>

          <p className="text-[15px] md:text-lg text-muted-foreground/90 max-w-[62ch]">
            Fluxa centralise vos opérations — <span className="text-foreground">devis & factures, agenda, fichier clients, messages</span> —
            dans un espace unique, configuré à vos couleurs et adapté à votre métier. Suivez vos chiffres
            en temps réel et automatisez relances, rappels et suivis pour gagner du temps sans sacrifier la qualité de service.
          </p>

          {/* 3 points forts sobres */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
            {[
              "Devis & factures en quelques clics",
              "Agenda avec rappels automatiques",
              "Tableau de bord clair (CA, impayés, fidélité)",
            ].map((txt, i) => (
              <div key={i} className="rounded-xl border border-border/70 px-4 py-3">
                {txt}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
          <a
            href="#automations"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
            aria-label="Découvrir l’outil"
          >
            Découvrir l’outil
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border border-border hover:bg-muted transition w-full md:w-auto"
            aria-label="Voir les formules"
          >
            Voir les formules
          </a>
        </div>

        {/* Note de réassurance compacte */}
        <p className="text-xs text-muted-foreground">
          🔐 Données hébergées en Europe — ⚙️ Automatisations incluses — 🎯 Mise en place guidée
        </p>
      </div>

      {/* Visuel (mockup) */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[hsl(217,77%,39%)]/20 rounded-2xl blur-2xl"></div>
        <img
          src={dashboardMockup}
          alt="Outil de gestion Fluxa — aperçu du tableau de bord pour artisans"
          loading="eager"
          className="relative rounded-2xl border border-primary/20 shadow-[0_30px_80px_-30px_hsl(217,91%,60%/.25)]"
        />
        <div className="absolute left-3 bottom-3 text-[10px] text-muted-foreground/85 bg-background/70 backdrop-blur px-2 py-1 rounded-lg border border-border/60">
          Exemple d’interface — chiffres factices
        </div>
      </div>
    </div>
  </div>
</section>

<section id="automations" className="scroll-mt-[-30px] md:scroll-mt-[-54px]">
  <Automations />
</section>

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="
          mt-0 pt-2 md:pt-0
          pb-14 md:pb-20
          bg-background
          scroll-mt-[4px] md:scroll-mt-[40px]
          -mt-px md:mt-0
        "
      >
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 max-md:mb-16 md:mb-28">
            <h2 className="text-4xl lg:text-5xl font-bold">Nos Formules de Gestion pour Artisans</h2>
            <p className="text-xl text-muted-foreground">
              Trois niveaux d'accompagnement pour votre gestion quotidienne — tous <span className="text-foreground">personnalisables</span> à votre activité d'artisan ou d'indépendant.
            </p>
          </div>

          {/* Carrousel + grille */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Piste de cartes */}
              <div
                ref={pricingRef}
                className="
                  flex md:grid md:grid-cols-3
                  gap-0 md:gap-8
                  overflow-x-auto md:overflow-visible
                  snap-x snap-mandatory md:snap-none
                  scroll-smooth
                  -mx-6 px-6 pb-8 md:pb-2
                  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                "
                aria-label="Formules"
              >
                {/* Carte 1 */}
                <div
                  data-pricing-card
                  className="
                    max-md:snap-center
                    max-md:shrink-0
                    max-md:w-[calc(100vw-3rem)]
                    max-md:mr-8
                    max-md:scale-[0.925] max-md:origin-top
                    max-md:first:ml-6
                    max-md:last:mr-6
                    md:w-auto md:shrink md:snap-none
                    max-md:text-center
                    max-md:[&_ul]:mx-auto max-md:[&_ul]:w-fit
                    max-md:[&_ul>li]:justify-center
                    max-md:[&_a]:mx-auto max-md:[&_button]:mx-auto
                  "
                >
                  <PricingCard
                    title="Essentielle"
                    price="800 €"
                    features={[
                      "Modules de base",
                      "1 automatisation incluse",
                      "Rappel RDV automatique",
                      "Mail après prestation",
                      "Support email",
                    ]}
                  />
                </div>

                {/* Carte 2 (Populaire) */}
                <div
                  data-pricing-card
                  className="
                    relative
                    max-md:snap-center max-md:shrink-0 max-md:w-[calc(100vw-3rem)]
                    max-md:mr-8
                    max-md:scale-[0.925] max-md:origin-top
                    md:w-auto md:shrink md:snap-none md:overflow-visible
                    max-md:text-center
                    max-md:[&_ul]:mx-auto max-md:[&_ul]:w-fit
                    max-md:[&_ul>li]:justify-center
                    max-md:[&_a]:mx-auto max-md:[&_button]:mx-auto
                  "
                >
                  <span
                    className="
                      absolute z-10
                      right-3 max-md:top-2 md:-top-3
                      rounded-full px-3 py-1 text-xs font-medium
                      bg-primary/15 text-primary border border-primary/30 backdrop-blur
                    "
                  >
                    ⭐ Populaire
                  </span>

                  <PricingCard
                    title="Professionnelle"
                    price="1 200 €"
                    features={[
                      "Tout Essentielle +",
                      "Gestion des paiements",
                      "Messagerie client intégrée",
                      "3 automatisations",
                      "Facturation automatique",
                      "Rapport hebdomadaire",
                      "Synchronisation agenda",
                    ]}
                    className="md:-translate-y-4 border-primary"
                  />
                </div>

                {/* Carte 3 */}
                <div
                  data-pricing-card
                  className="
                    max-md:snap-center max-md:shrink-0 max-md:w-[calc(100vw-3rem)]
                    max-md:mr-8 max-md:last:mr-6
                    max-md:scale-[0.925] max-md:origin-top
                    md:w-auto md:shrink md:snap-none
                    max-md:text-center
                    max-md:[&_ul]:mx-auto max-md:[&_ul]:w-fit
                    max-md:[&_ul>li]:justify-center
                    max-md:[&_a]:mx-auto max-md:[&_button]:mx-auto
                  "
                >
                  <PricingCard
                    title="Premium"
                    price="1 800 €"
                    features={[
                      "Tout Professionnelle +",
                      "Espace client personnalisé",
                      "Reporting avancé",
                      "Maintenance 1 mois offerte",
                      "Support prioritaire",
                      "Automatisations illimitées",
                    ]}
                  />
                </div>
              </div>

              {/* Flèche gauche (mobile) */}
              {canLeft && (
                <button
                  onClick={() => {
                    const el = pricingRef.current;
                    if (!el) return;
                    const card = el.querySelector<HTMLElement>("[data-pricing-card]");
                    const gap = 32; // ~ mr-8
                    const w = card?.getBoundingClientRect().width ?? el.clientWidth;
                    el.scrollBy({ left: -(w + gap), behavior: "smooth" });
                    setTimeout(updateArrows, 350);
                  }}
                  className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 border border-primary/40 bg-primary/15 backdrop-blur active:scale-95"
                  aria-label="Carte précédente"
                >
                  ‹
                </button>
              )}

              {/* Flèche droite (mobile) */}
              {canRight && (
                <button
                  onClick={() => {
                    const el = pricingRef.current;
                    if (!el) return;
                    const card = el.querySelector<HTMLElement>("[data-pricing-card]");
                    const gap = 32; // ~ mr-8
                    const w = card?.getBoundingClientRect().width ?? el.clientWidth;
                    el.scrollBy({ left: w + gap, behavior: "smooth" });
                    setTimeout(updateArrows, 350);
                  }}
                  className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 border border-primary/40 bg-primary/15 backdrop-blur active:scale-95"
                  aria-label="Carte suivante"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA / INFOS (formulaire) ================= */}
      <section
        id="infos"
        className={`
          pt-0 pb-10 md:pb-16
          bg-gradient-to-b from-background via-[hsl(217_40%_8%)] to-background
          relative overflow-hidden
          scroll-mt-[84px] md:scroll-mt-[-30px]
        `}
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Simplifiez la Gestion de Votre Activité avec <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">Fluxa</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Artisan, auto-entrepreneur ou indépendant ? Dites-nous en un peu plus sur vos besoins : on revient vers vous sous 24–48h avec une proposition adaptée à votre métier.
            </p>
          </div>

          {/* Mini-process en 3 étapes */}
          <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <MessageSquare className="w-4 h-4" /> Diagnostic
              </div>
              <p>15–20 min pour comprendre vos besoins et priorités.</p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <Calendar className="w-4 h-4" /> Maquette
              </div>
              <p>Proposition d’interface adaptée à votre activité.</p>
            </li>
            <li className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 font-medium text-foreground mb-1">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Livraison
              </div>
              <p>Mise en ligne + accompagnement au démarrage.</p>
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
                <label className="text-sm">Nom</label>
                <input name="name" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input name="email" type="email" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Secteur d'activité</label>
                <input name="activity" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm">Besoin principal</label>
                <select name="need" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring">
                  <option value="" disabled>— Sélectionner —</option>
                  <option>Vitrine pro</option>
                  <option>Formulaire & suivi prospects</option>
                  <option>Devis & paiements</option>
                  <option>Automatisations</option>
                  <option>Autre</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Budget (approx.)</label>
                <select name="budget" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring">
                  <option value="" disabled>— Sélectionner —</option>
                  <option>&lt; 500 €</option>
                  <option>500–1 000 €</option>
                  <option>1 000–2 000 €</option>
                  <option>&gt; 2 000 €</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Délai souhaité</label>
                <select name="delay" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring">
                  <option value="" disabled>— Sélectionner —</option>
                  <option>Dès que possible</option>
                  <option>Dans le mois</option>
                  <option>2–3 mois</option>
                  <option>Plus tard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm">Message</label>
              <textarea name="message" rows={4} placeholder="Parlez-nous de votre activité et de vos besoins…" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition" disabled={sending}>
                {sending ? "Ouverture de l’email…" : "Envoyer ma demande"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Réponse sous 24–48h — sans engagement.
            </p>
          </form>

          {/* Preuves (mobile) sous le formulaire */}
          <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground justify-start md:justify-center">
            <li className="rounded-full border border-border/70 px-3 py-1">🔐 Données hébergées en Europe</li>
            <li className="rounded-full border border-border/70 px-3 py-1">⚙️ Automatisations incluses</li>
            <li className="rounded-full border border-border/70 px-3 py-1">🎯 Mise en place guidée</li>
          </ul>

          {/* Lien contact — mail + Instagram + Facebook */}
          <div className="mt-10 text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> fluxa.contact@gmail.com
              </a>
              <a href="https://instagram.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" /> fluxa.fr
              </a>
              <a href="https://www.facebook.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <Facebook className="w-4 h-4" /> fluxa.fr
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-[-60px] md:scroll-mt-[-60px]">
        <Faq />
      </section>
      
     {/* ================= À PROPOS ================= */}
<section className="pt-10 pb-2 bg-background border-t border-border/50 flex items-center justify-center text-center">
  <div className="max-w-3xl px-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-3">
      Logiciel de Gestion Sur Mesure pour Artisans et Indépendants
    </h2>
    <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
      <strong className="text-primary">Fluxa</strong> aide les artisans, auto-entrepreneurs et indépendants à piloter leur activité au quotidien :
      gestion des clients, rendez-vous, devis et factures, rappels automatiques et statistiques en temps réel.
      Notre outil de gestion automatisé simplifie la vie des professionnels et petites entreprises,
      tout en offrant une solution moderne, personnalisable et adaptée à chaque métier.
    </p>
  </div>
</section>{/* ===== SECTION : Pourquoi choisir Fluxa ===== */}
<section id="pourquoi-choisir-fluxa" className="py-24 border-t border-border/60 bg-gradient-to-b from-background via-card/30 to-background">
  <div className="max-w-6xl mx-auto px-6 space-y-16">
    {/* --- Titre principal --- */}
    <div className="text-center space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Pourquoi de plus en plus d’artisans et d’indépendants choisissent Fluxa
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
        Fluxa n’est pas un simple logiciel de facturation ou de planning.  
        C’est un **outil de gestion sur mesure** qui s’adapte à votre manière de travailler,
        vous aide à gagner du temps, à réduire les oublis et à mieux piloter votre activité.  
        Découvrez comment il change le quotidien de ceux qui l’utilisent.
      </p>
    </div>

    {/* --- 3 grands piliers de valeur --- */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: "⚙️",
          title: "Automatiser sans perdre le contrôle",
          text: `Rappels SMS, relances de factures, mails post-prestation : tout se fait automatiquement,
          mais avec vos mots, votre ton et vos règles.  
          Vous décidez du timing, du contenu et des conditions. L’automatisation devient un vrai
          prolongement de votre professionnalisme.`,
        },
        {
          icon: "📊",
          title: "Garder une vision claire en un coup d’œil",
          text: `Fluxa centralise tout ce qui compte : vos clients, vos devis, vos paiements, vos statistiques.  
          En un regard, vous savez combien vous avez encaissé, qui doit être relancé, et comment évolue votre
          chiffre d’affaires semaine après semaine.  
          Fini les tableurs dispersés et les approximations.`,
        },
        {
          icon: "🧠",
          title: "Gagner du temps et réduire la charge mentale",
          text: `Les indépendants perdent souvent jusqu’à 10 heures par semaine dans l’administratif.  
          Fluxa automatise les tâches répétitives et garde tout à jour : agenda, factures, rappels, relances.  
          Vous retrouvez du temps pour votre métier, votre famille, ou simplement pour souffler.`,
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-card/40 p-8 space-y-4 hover:bg-card/60 transition"
        >
          <div className="text-4xl">{item.icon}</div>
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>

    {/* --- Partie narrative / storytelling --- */}
    <div className="max-w-5xl mx-auto space-y-8">
      <h3 className="text-3xl font-semibold text-center">Un Logiciel de Gestion Pensé pour les Artisans et Indépendants</h3>
      <p className="text-muted-foreground text-lg leading-relaxed text-center">
        Fluxa a été conçu en observant le quotidien réel des artisans, freelances et petites entreprises :
        des journées pleines, des clients à rappeler, des devis à envoyer, et des papiers à classer.
        L'idée était simple : <strong>recentrer le professionnel sur son savoir-faire</strong>,
        pas sur la gestion administrative.
      </p>
      <p className="text-muted-foreground text-lg leading-relaxed text-center">
        Chaque module — rappel automatique, tableau de bord, facturation automatique, messages clients —
        est pensé pour s'adapter à vos habitudes, pas les bousculer.
        Pas besoin d'être expert en informatique : tout est visuel, fluide et paramétrable en quelques clics.
      </p>
    </div>

    {/* --- Témoignages / résultats chiffrés --- */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 pt-10">
      {[
        { value: "6 à 12 h", label: "de temps gagné chaque semaine" },
        { value: "95 %", label: "de taux de présence aux rendez-vous" },
        { value: "+37 %", label: "de factures payées dans les délais" },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/60 bg-background/40 py-10 px-6 text-center hover:bg-background/60 transition"
        >
          <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
          <p className="text-muted-foreground font-medium">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* --- Ouverture vers la suite / renvoi blog --- */}
    <div className="text-center space-y-4 pt-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold">Un outil évolutif, pensé pour durer</h3>
      <p className="text-muted-foreground leading-relaxed">
        Chaque mois, Fluxa s’enrichit de nouvelles automatisations et d’améliorations inspirées par ses utilisateurs.
        Notre objectif : créer un **écosystème complet** pour les professionnels qui veulent
        travailler plus efficacement, sans changer leurs habitudes.
      </p>
      <a
        href="/articles"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium bg-primary/10 text-primary hover:bg-primary/20 transition"
      >
        Découvrir nos guides et articles
      </a>
    </div>
  </div>
</section>

      {/* ================= FOOTER ================= */}
<footer className="mt-16 py-10 border-t border-border/80">
  <div className="container mx-auto px-6">
    {/* Ligne 1 : logo + baseline */}
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <img
          src={fluxaLogo}
          alt="Logo Fluxa - Automatisation et gestion pour artisans"
          className="h-8 w-auto rounded-lg bg-white/5 p-1 ring-1 ring-white/10"
        />
        <p className="text-sm text-muted-foreground">
          Fluxa — Automatisation & gestion sur mesure
        </p>
      </div>

      {/* Réseaux */}
      <nav className="flex items-center gap-5 text-sm">
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
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Instagram className="w-4 h-4" />
          Instagram
        </a>
        <a
          href="https://www.facebook.com/fluxa.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </a>
        {/* Ajoute d'autres liens si tu veux :
        <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground">
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        */}
      </nav>
    </div>

    {/* Séparateur */}
    <div className="my-6 border-t border-border/60" />

    {/* Ligne 2 : liens légaux + © */}
    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fluxa — Tous droits réservés.
      </p>

      <div className="flex items-center gap-4 text-sm">
        {/* Si tu as mis les fichiers dans /public, garde .html pour éviter les 404 */}
        <a href="/mentions-legales" className="hover:text-primary transition">Mentions légales</a>
        <span className="text-border">•</span>
        <a href="/politique-confidentialite" className="hover:text-primary transition">
  Politique de confidentialité
</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Index;