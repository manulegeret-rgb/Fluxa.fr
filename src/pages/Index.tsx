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
  CheckCircle2,
  XCircle,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import fluxaLogo from "@/assets/logo transparent.png";

const Index = () => {
  // ========= État du scroll pour styliser le header
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
                    <a href="#pricing" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Nos formules</a>
                    <a href="#automations" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Automatisations</a>
                    <a href="#faq" className="py-2 text-base" onClick={() => setMenuOpen(false)}>FAQ</a>
                    <a href="#infos" className="py-2 text-base" onClick={() => setMenuOpen(false)}>En savoir plus</a>
                    <a
                      href="https://instagram.com/fluxa.fr"
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
              <a href="/" aria-label="Fluxa" className="inline-flex items-center">
                <img
                  src={fluxaLogo}
                  alt="Fluxa"
                  className="h-[100px] w-auto object-contain -translate-y-[8px]"
                />
              </a>
            </div>

            {/* Espace à droite pour centrage parfait */}
            <div />
          </div>

          {/* Barre desktop */}
          <div className="hidden md:flex items-center justify-between h-[120px]">
            <a href="/" aria-label="Fluxa" className="flex items-center gap-2">
              <img
                src={fluxaLogo}
                alt="Fluxa"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-muted-foreground font-medium">
              <a href="#pricing" className="hover:text-foreground transition">Nos formules</a>
              <a href="#automations" className="hover:text-foreground transition">Automatisations</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
              <a href="#infos" className="hover:text-foreground transition">En savoir plus</a>
              <a
                href="https://instagram.com/fluxa.fr"
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

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* fond halo */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(217_40%_8%)] to-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* top padding ajusté pour le header fixe */}
        <div className="container mx-auto px-6 relative z-10 pt-28 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h1 className="text-[clamp(28px,6vw,56px)] font-bold leading-tight">
                  Votre app de gestion&nbsp;sur-mesure,{" "}
                  <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
                    pensée pour votre entreprise.
                  </span>
                </h1>

                <p className="text-[15px] md:text-lg text-muted-foreground/90">
                  Centralisez clients, devis/factures, agenda et messages.{" "}
                  <span className="text-foreground">Moins d’administratif, plus de production.</span>
                </p>

                {/* Bénéfices chiffrés */}
                <ul className="mt-4 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  {[
                    "—50% de temps admin",
                    "+30% de RDV honorés",
                    "Vue 360° : CA, impayés, fidélité",
                  ].map((txt, i) => (
                    <li
                      key={i}
                      className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {txt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="mt-1 flex flex-col md:flex-row gap-3 justify-center md:justify-start">
                {/* MOBILE: CTA -> formulaire direct */}
                <a
                  href="#contact"
                  className="inline-flex md:hidden items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition w-full"
                  aria-label="Nous contacter"
                >
                  Nous contacter
                </a>

                {/* DESKTOP: CTA */}
                <a
                  href="#infos"
                  className="hidden md:inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
                  aria-label="En savoir plus"
                >
                  En savoir plus
                </a>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border border-border hover:bg-muted transition w-full md:w-auto"
                  aria-label="Voir les formules"
                >
                  Voir les formules
                </a>
              </div>

              {/* Micro-preuves */}
              <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground justify-center md:justify-start">
                <li className="rounded-full border border-border/70 px-3 py-1">🔐 Données hébergées en Europe</li>
                <li className="rounded-full border border-border/70 px-3 py-1">⚙️ Automatisations incluses</li>
                <li className="rounded-full border border-border/70 px-3 py-1">🎯 Mise en place guidée</li>
              </ul>
            </div>

            {/* Visuel (mockup) */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[hsl(217,77%,39%)]/20 rounded-2xl blur-2xl"></div>
              <img
                src={dashboardMockup}
                alt="Aperçu du tableau de bord Fluxa pour artisans"
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
            <h2 className="text-4xl lg:text-5xl font-bold">Nos Formules</h2>
            <p className="text-xl text-muted-foreground">
              Trois niveaux d’accompagnement — tous <span className="text-foreground">personnalisables</span> à votre activité.
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
              En savoir plus sur <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">Fluxa</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Dites-nous en un peu plus : on revient vers vous sous 24–48h avec des infos et une proposition adaptée.
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

          {/* Lien contact — mail + Instagram */}
          <div className="mt-10 text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="mailto:fluxa.contact@gmail.com" className="hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> fluxa.contact@gmail.com
              </a>
              <a href="https://instagram.com/fluxa.fr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" /> fluxa.fr
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="scroll-mt-[-60px] md:scroll-mt-[-60px]">
        <Faq />
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Fluxa — Automatisation & Gestion sur mesure. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;