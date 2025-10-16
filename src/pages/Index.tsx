import { useEffect, useMemo, useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { Automations } from "@/components/Automations";
import { PricingCard } from "@/components/PricingCard";
import {
  Instagram,
  Linkedin,
  Facebook,
  Calendar,
  DollarSign,
  MessageSquare,
  BarChart3,
  Mail,
  CheckCircle2,
  XCircle,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import dashboardMockup from "@/assets/dashboard-mockup.png";
import fluxaLogo from "@/assets/logo transparent.png";




const Index = () => {
    // === SEO HEAD (title, description, canonical, favicon) ===
  useEffect(() => {
    // Title
    document.title = "Fluxa — Application de gestion sur mesure pour artisans & indépendants";

    // Meta description
    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    ensureMeta(
      "description",
      "Fluxa centralise clients, devis, factures, agenda et messages. Automatisations (rappels, relances), statistiques en temps réel. Devis personnalisé sous 24–48 h."
    );

    // Canonical
    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = "https://fluxa.fr/";

    // Favicon (si pas déjà présent dans index.html)
    const hasFavicon = document.querySelector('link[rel="icon"]');
    if (!hasFavicon) {
      const fav = document.createElement("link");
      fav.rel = "icon";
      fav.href = "/favicon.ico";
      fav.type = "image/x-icon";
      document.head.appendChild(fav);
    }
  }, []);

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
          {/* =================== JSON-LD =================== */}
      <script
        type="application/ld+json"
        // @ts-ignore
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Fluxa",
              "applicationCategory": "BusinessApplication",
              "applicationSubCategory": "SaaS",
              "operatingSystem": "Web",
              "url": "https://fluxa.fr/",
              "image": "https://fluxa.fr/og-image.jpg",
              "description":
                "Application de gestion sur mesure pour artisans & indépendants : clients, devis, factures, agenda, messages, automatisations.",
              "offers": {
                "@type": "Offer",
                "price": "800",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Fluxa",
                "url": "https://fluxa.fr/",
                "logo": "https://fluxa.fr/logo.png",
                "sameAs": [
                  "https://instagram.com/fluxa.fr",
                  "https://linkedin.com/company/fluxa-fr",
                  "https://facebook.com/fluxa.fr",
                ],
              },
            },
            null,
            2
          ),
        }}
      />
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
      <section id="hero" aria-label="Présentation de Fluxa — application de gestion pour artisans et indépendants" className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
    <h1 className="text-[clamp(36px,6.5vw,60px)] font-bold leading-tight tracking-tight text-white">
  Application de gestion pour artisans et{" "}
  <span className="text-blue-400">entreprises</span>.
</h1>

    <h2 className="text-[clamp(26px,5.5vw,52px)] font-semibold leading-tight text-gray-200">
      Moins d’administratif,&nbsp;
      <span className="text-blue-400">plus de production</span>.
    </h2>

    <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto md:mx-0">
      Centralisez vos clients, devis, factures, agenda et messages — tout au même endroit, en toute simplicité.
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
  alt="Aperçu du tableau de bord Fluxa : modules clients, factures et agenda"
  width={1200}
  height={800}
  decoding="async"
  fetchPriority="high"
  loading="eager"
  className="relative w-full h-auto rounded-2xl border border-primary/20 shadow-[0_30px_80px_-30px_hsl(217,91%,60%/.25)] select-none [image-rendering:crisp-edges]"
/>
              <div className="absolute left-3 bottom-3 text-[10px] text-muted-foreground/85 bg-background/70 backdrop-blur px-2 py-1 rounded-lg border border-border/60">
                Exemple d’interface — chiffres factices
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="automations" aria-label="Automatisations Fluxa pour artisans et indépendants" className="scroll-mt-[-30px] md:scroll-mt-[-54px]">
        <Automations />
      </section>
      <section
  id="presentation"
  className="max-w-4xl mx-auto px-6 py-20 text-center md:text-left text-gray-300"
>
  <h2 className="text-3xl font-bold mb-6 text-white">
    Pourquoi choisir Fluxa pour votre activité ?
  </h2>

  <p className="mb-4">
    Fluxa est une <strong>application de gestion moderne et intuitive</strong> conçue pour
    simplifier le quotidien des <strong>artisans, indépendants et petites entreprises</strong>.
    En centralisant vos <strong>clients</strong>, <strong>rendez-vous</strong>,
    <strong>devis</strong> et <strong>factures</strong> dans un même espace,
    vous gagnez du temps tout en améliorant votre organisation.
  </p>

  <p className="mb-4">
    Que vous soyez plombier, coiffeur, photographe, menuisier ou gérant d’un atelier,
    Fluxa s’adapte à vos besoins. Grâce à ses modules flexibles,
    vous pouvez activer uniquement les fonctionnalités utiles à votre activité :
    <em>gestion client, agenda automatisé, relances, statistiques, paiements</em> et bien plus.
  </p>

  <p className="mb-4">
    Contrairement aux logiciels traditionnels souvent lourds et coûteux,
    Fluxa se distingue par sa <strong>simplicité</strong>, sa
    <strong>rapidité</strong> et son <strong>hébergement sécurisé en Europe</strong>.
    Aucun téléchargement n’est requis : tout fonctionne directement en ligne,
    depuis votre ordinateur ou votre smartphone.
  </p>

  <h3 className="text-2xl font-semibold mt-10 mb-4 text-white">
    Des automatismes puissants pour gagner du temps
  </h3>
  <p className="mb-4">
    Grâce à l’automatisation intégrée, Fluxa vous permet de configurer des
    <strong>rappels de rendez-vous</strong>, des <strong>relances automatiques</strong>,
    ou encore l’envoi d’un <strong>email de suivi client</strong> après chaque prestation.
    Ces outils réduisent considérablement les oublis et améliorent la satisfaction client.
  </p>

  <h3 className="text-2xl font-semibold mt-10 mb-4 text-white">
    Une vision claire de votre activité
  </h3>
  <p className="mb-4">
    Le tableau de bord Fluxa vous offre une vue complète sur vos indicateurs :
    chiffre d’affaires, taux de fidélité, rendez-vous honorés, retards de paiement, etc.
    Vous savez en un coup d’œil où en est votre activité, et pouvez prendre de meilleures décisions.
  </p>

  <p className="mt-8 text-gray-400">
    En résumé, Fluxa est plus qu’un simple outil de gestion — c’est un assistant digital qui automatise votre administratif pour
    que vous puissiez vous concentrer sur l’essentiel : <strong>votre métier</strong>.
  </p>
</section>

      {/* ================= PRICING ================= */}
      <section
  id="pricing"
  aria-label="Formules d'accompagnement Fluxa — application de gestion"
  className="
    mt-0 pt-2 md:pt-0
    pb-14 md:pb-20
    bg-background
    scroll-mt-[4px] md:scroll-mt-[40px]
    -mt-px md:mt-0
  "
>
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 max-md:mb-4 md:mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold">Nos Formules</h2>
            <p className="text-xl text-muted-foreground">
              Trois niveaux d’accompagnement — tous <span className="text-foreground">personnalisables</span> à votre activité.
            </p>
            <p className="mt-3 md:mt-4 text-sm text-muted-foreground max-w-3xl mx-auto">
  Fluxa est une application de gestion pensée pour les artisans et indépendants :
  centralisation des clients, agenda connecté, devis et factures, messagerie intégrée
  et automatisations intelligentes. Une solution sur mesure pour réduire l’administratif
  et se concentrer sur la production.
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
      <section
  id="faq"
  className="scroll-mt-[-60px] md:scroll-mt-[-60px] -mb-16 md:-mb-24"
>
  <Faq />
</section>
  <section
  id="about"
  aria-label="À propos de Fluxa"
  className="mt-6 mb-12 md:mb-20 px-6"
>
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-xl font-semibold mb-3 text-white">
      À propos de Fluxa
    </h2>
    <p className="text-base md:text-lg text-muted-foreground">
  Fluxa aide les artisans et indépendants à piloter leur activité au quotidien :
  gestion des clients, rendez-vous, devis et factures, rappels automatiques et statistiques en temps réel.
  Notre solution logicielle sur mesure simplifie la vie des professionnels, auto-entrepreneurs et petites entreprises,
  tout en leur offrant un outil de gestion moderne et personnalisable.
</p>
  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="py-4 md:py-5 border-t border-border">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
    <p>© {new Date().getFullYear()} Fluxa. Tous droits réservés.</p>

    <ul className="flex gap-5 mt-2 md:mt-0">
  <li>
    <a
      href="https://instagram.com/fluxa.fr"
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="Instagram"
      className="flex items-center gap-2 hover:text-slate-200 transition-colors"
    >
      <Instagram size={18} strokeWidth={1.5} />
      Instagram
    </a>
  </li>
  <li>
    <a
      href="https://linkedin.com/company/fluxa-fr"
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="LinkedIn"
      className="flex items-center gap-2 hover:text-slate-200 transition-colors"
    >
      <Linkedin size={18} strokeWidth={1.5} />
      LinkedIn
    </a>
  </li>
  <li>
    <a
      href="https://facebook.com/fluxa.fr"
      target="_blank"
      rel="me noopener noreferrer"
      aria-label="Facebook"
      className="flex items-center gap-2 hover:text-slate-200 transition-colors"
    >
      <Facebook size={18} strokeWidth={1.5} />
      Facebook
    </a>
  </li>
</ul>
  </div>
</footer>
    </div>
  );
};

export default Index;