import SEOHead from "@/components/SEOHead";
import { useEffect, useMemo, useRef, useState } from "react";
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

  // ========= Contrôle du menu mobile (Sheet)
  const [menuOpen, setMenuOpen] = useState(false);

  // ========= Lightbox pour le mockup
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
                  <button aria-label="Ouvrir le menu" className="p-2 -ml-2">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-sm">
                  <nav className="flex flex-col gap-2">
                    <a href="#comment-ca-marche" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
                    <a href="#pricing" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Tarifs</a>
                    <a href="#pourquoi-choisir-fluxa" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Pourquoi nous ?</a>
                    <a href="#faq" className="py-2 text-base" onClick={() => setMenuOpen(false)}>FAQ</a>
                    <a href="#infos" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Contact</a>
                  </nav>
                  <div className="mt-4 flex flex-col gap-2">
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
                  alt="Fluxa - Agence web création sites vitrines pas chers pour TPE et artisans"
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
                alt="Fluxa - Agence web création sites vitrines pas chers pour TPE et artisans"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-foreground/90 font-medium">
              <a href="#comment-ca-marche" className="hover:text-foreground transition">Comment ça marche</a>
              <a href="#pricing" className="hover:text-foreground transition">Tarifs</a>
              <a href="#pourquoi-choisir-fluxa" className="hover:text-foreground transition">Pourquoi nous ?</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
              <a href="#infos" className="hover:text-foreground transition">Contact</a>
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
      <h1 className="text-[clamp(37px,7vw,69px)] font-bold leading-tight">
        <span className="whitespace-nowrap">Création site vitrine</span>{" "}
        <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
          professionnel et pas cher
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
            Fluxa crée votre site vitrine professionnel en 2 à 3 semaines — clé en main, livré prêt à recevoir vos clients.
          </p>
          <p>
            Design soigné, référencement Google, hébergement inclus : tout ce qu'il faut pour être visible en ligne et décrocher de nouveaux clients, sans vous occuper de la technique.
          </p>
        </div>

        {/* Bénéfices clés */}
        <ul className="space-y-2 text-[15px] md:text-base text-muted-foreground/90 text-left mx-auto lg:mx-0 max-w-sm lg:max-w-none">
          {[
            { icon: "✅", txt: "Site vitrine responsive — parfait sur mobile, tablette et desktop" },
            { icon: "🔍", txt: "Optimisation SEO incluse pour apparaître sur Google" },
            { icon: "🌐", txt: "Hébergement web + nom de domaine offerts la 1ère année" },
            { icon: "📞", txt: "Support technique inclus — on reste disponibles après livraison" },
          ].map(({ icon, txt }) => (
            <li key={txt} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">{icon}</span>
              <span>{txt}</span>
            </li>
          ))}
        </ul>

        {/* Badge prix */}
        <div className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-4 py-2.5 font-semibold text-foreground bg-primary/10 text-sm mx-auto lg:mx-0">
          💰 À partir de <span className="text-primary">390 € tout compris</span>
        </div>

        {/* CTAs — Devis en principal */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <a
            href="#infos"
            className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition w-full sm:w-auto overflow-hidden"
            aria-label="Demander un devis gratuit"
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(217,77%,45%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border-2 border-primary/50 hover:bg-primary/10 transition w-full sm:w-auto"
            aria-label="Voir nos tarifs"
          >
            Voir nos tarifs
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
  <div className="container mx-auto px-6">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">Exemples de sites vitrines</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Nous adaptons votre site à votre activité et à vos besoins spécifiques
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Carte 1 */}
      <div className="group rounded-2xl border border-border bg-card p-6 hover:border-violet-500/60 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.25)] transition-all flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center text-2xl shrink-0">🎨</div>
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
        <a href="#infos" className="text-sm font-medium text-violet-400 hover:text-violet-300 transition flex items-center gap-1 mt-auto">
          Demander un devis <span>→</span>
        </a>
      </div>

      {/* Carte 2 */}
      <div className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/60 hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.25)] transition-all flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-2xl shrink-0">🏢</div>
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
        <a href="#infos" className="text-sm font-medium text-primary hover:text-primary/80 transition flex items-center gap-1 mt-auto">
          Demander un devis <span>→</span>
        </a>
      </div>

      {/* Carte 3 */}
      <div className="group rounded-2xl border border-border bg-card p-6 hover:border-emerald-500/60 hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.25)] transition-all flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-2xl shrink-0">💼</div>
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
        <a href="#infos" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 mt-auto">
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
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 max-md:mb-12 md:mb-16">
  <div className="relative inline-block">
    <div className="absolute -top-3 -right-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
      NOUVEAU
    </div>
    <h2 className="text-4xl lg:text-5xl font-bold">
      Tarifs site vitrine — Transparent et abordable
    </h2>
  </div>
  <p className="text-xl text-muted-foreground">
    Une <span className="text-foreground font-semibold">formule unique</span> à partir de 390€, ajustable selon vos besoins.
    Hébergement et domaine inclus la première année.
  </p>
</div>

          {/* Formule + Options */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Formule de base */}
            <div className="md:col-span-1">
              <PricingCard
                title="Formule Site Vitrine"
                price="390 €"
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
                    <span className="text-primary font-bold">+80€/page</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ajoutez des pages dédiées (Blog, Équipe, Actualités, etc.)</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Galerie photo avancée</span>
                    <span className="text-primary font-bold">+120€</span>
                  </div>
                  <p className="text-[0.95rem] md:text-base text-muted-foreground">Lightbox, filtres, mise en page optimisée pour vos réalisations</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Prise de rendez-vous en ligne</span>
                    <span className="text-primary font-bold">+150€</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Calendrier de réservation avec notifications email automatiques</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Rédaction de contenu SEO</span>
                    <span className="text-primary font-bold">+200€</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Textes professionnels optimisés pour Google (jusqu'à 2000 mots)</p>
                </div>

                <div className="rounded-2xl border border-border bg-card/40 p-4 hover:bg-card/60 transition">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Multilingue</span>
                    <span className="text-primary font-bold">+180€/langue</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Version anglaise, espagnole ou autre langue (traduction non incluse)</p>
                </div>
              </div>

              {/* Maintenance */}
              <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-lg">Maintenance mensuelle</span>
                  <span className="text-primary font-bold text-xl">35€/mois</span>
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
              💳 Paiement en 2 fois sans frais disponible • 🔒 Propriété totale du site • 🎯 Support inclus
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
          scroll-mt-[84px] md:scroll-mt-[-30px]
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
          <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
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
                <input id="contact-name" name="name" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm">Email</label>
                <input id="contact-email" name="email" type="email" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div>
              <label htmlFor="contact-need" className="text-sm">Type de site souhaité</label>
              <select id="contact-need" name="need" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring">
                <option value="" disabled>— Sélectionner —</option>
                <option>Site vitrine simple (390€)</option>
                <option>Site avec galerie photo</option>
                <option>Site avec prise de RDV</option>
                <option>Refonte de site existant</option>
                <option>Autre / Je ne sais pas encore</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm">Votre message</label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Décrivez votre projet en quelques mots : votre activité, vos besoins, vos attentes…" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
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
            <li className="rounded-full border border-border/70 px-3 py-1">🔐 Hébergement sécurisé inclus</li>
            <li className="rounded-full border border-border/70 px-3 py-1">⚡ Livraison rapide (2-3 semaines)</li>
            <li className="rounded-full border border-border/70 px-3 py-1">🎯 SEO optimisé</li>
          </ul>

          {/* Lien contact — mail + Instagram + Facebook + LinkedIn */}
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
              <a href="https://www.linkedin.com/company/fluxa-fr/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
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
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Nos garanties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons sur la qualité et la transparence de nos prestations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-6 text-center hover:border-emerald-500/50 hover:shadow-[0_0_24px_-8px_rgba(16,185,129,0.2)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-semibold mb-2">Satisfaction garantie</h3>
              <p className="text-sm text-muted-foreground">
                Modifications incluses jusqu'à validation complète — sans surcoût
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center hover:border-amber-500/50 hover:shadow-[0_0_24px_-8px_rgba(245,158,11,0.2)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="font-semibold mb-2">Respect des délais</h3>
              <p className="text-sm text-muted-foreground">
                Livraison en 2-3 semaines ou remboursement partiel
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center hover:border-violet-500/50 hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.2)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="font-semibold mb-2">Code propre</h3>
              <p className="text-sm text-muted-foreground">
                Standards du web respectés, performance optimale
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/50 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.2)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support réactif</h3>
              <p className="text-sm text-muted-foreground">
                Réponse sous 24-48h, corrections de bugs prioritaires
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

     {/* ================= À PROPOS ================= */}
<section className="py-12 md:py-16 bg-background border-t border-border/50">
  <div className="max-w-5xl mx-auto px-6">
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold">
        Agence de création de sites internet pour PME et indépendants
      </h2>
      <p className="mt-3 text-muted-foreground text-[15px] md:text-base max-w-2xl mx-auto">
        <strong className="text-primary">Fluxa</strong> est une agence web française spécialisée dans la création de sites vitrines professionnels pour TPE, artisans, consultants et entrepreneurs — responsive, optimisés SEO et hébergement inclus.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-5">
      <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="text-2xl shrink-0">🏆</div>
        <div>
          <p className="font-semibold text-sm mb-1">Qualité professionnelle, prix accessible</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Pas cher ne signifie pas bas de gamme. De la maquette à la mise en ligne, nous gérons votre projet clé en main avec formation et support inclus.
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="text-2xl shrink-0">🔧</div>
        <div>
          <p className="font-semibold text-sm mb-1">Pour tous les corps de métier</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Plombier, électricien, coach, thérapeute, consultant ou artisan : votre site sera livré en 2-3 semaines, prêt à attirer vos premiers clients.
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="text-2xl shrink-0">📈</div>
        <div>
          <p className="font-semibold text-sm mb-1">Standards modernes & SEO intégré</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Performances optimales, accessibilité, compatibilité tous navigateurs et optimisation SEO pour un bon positionnement sur Google.
          </p>
        </div>
      </div>

      <div className="flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="text-2xl shrink-0">🎯</div>
        <div>
          <p className="font-semibold text-sm mb-1">Adapté à votre secteur</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Site portfolio, entreprise ou profession libérale : nous adaptons chaque création à vos objectifs commerciaux, avec des tarifs transparents dès le départ.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<SectionDivider />

{/* ===== SECTION : Pourquoi choisir Fluxa ===== */}
<section id="pourquoi-choisir-fluxa" className="py-12 md:py-20 border-t border-border/60 bg-gradient-to-b from-background via-card/30 to-background">
  <div className="max-w-6xl mx-auto px-6 space-y-16">
    {/* --- Titre principal --- */}
    <div className="text-center space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Pourquoi choisir Fluxa pour votre site vitrine ?
      </h2>
      <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
        Chez Fluxa, nous créons des sites vitrines professionnels, rapides et abordables.
        Pas de contrat long terme, pas de frais cachés : juste un site de qualité livré clé en main.
        Découvrez nos engagements qui font la différence.
      </p>
    </div>

    {/* --- 3 grands piliers de valeur --- */}
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: "⚡",
          title: "Livraison rapide",
          text: `Votre site est prêt en 2-3 semaines seulement. Nous travaillons efficacement sans compromettre la qualité. Besoin encore plus vite ? Contactez-nous pour une option express. Dès validation de la maquette, votre site est développé et mis en ligne rapidement pour que vous puissiez commencer à gagner en visibilité immédiatement.`,
        },
        {
          icon: "💰",
          title: "Prix transparent et compétitif",
          text: `À partir de 390€ tout compris : design responsive, hébergement et domaine 1ère année inclus, formulaire de contact, SEO de base. Pas de frais cachés, pas de contrat long terme. Vous savez exactement ce que vous payez dès le départ. Options ajustables selon vos besoins réels, sans payer pour des fonctionnalités inutiles.`,
        },
        {
          icon: "🎯",
          title: "Propriété totale & support inclus",
          text: `Vous êtes propriétaire à 100% de votre site, code source inclus. Formation à la gestion offerte à la livraison. Support technique réactif : nous intervenons rapidement en cas de problème. Maintenance optionnelle à 35€/mois pour garder votre site à jour. Pas de dépendance : vous restez libre.`,
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
      <h3 className="text-3xl font-semibold text-center">Des Sites Vitrines Pensés pour les Entrepreneurs</h3>
      <p className="text-muted-foreground text-lg leading-relaxed text-center">
        Fluxa a été créé en observant les besoins réels des TPE, indépendants et entrepreneurs :
        besoin d'une présence en ligne professionnelle, sans se ruiner ni passer des mois en développement.
        L'idée était simple : <strong>offrir un site vitrine de qualité, rapidement et à prix accessible</strong>,
        sans compromis sur la qualité technique.
      </p>
      <p className="text-muted-foreground text-lg leading-relaxed text-center">
        Chaque site — design, développement, SEO, hébergement —
        est pensé pour être efficace dès le premier jour.
        Pas besoin d'être expert : votre site est livré prêt à l'emploi avec formation et support inclus.
      </p>
    </div>

    {/* --- Témoignages / résultats chiffrés --- */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 pt-10">
      {[
        { value: "1-2 sem.", label: "de délai de livraison moyen" },
        { value: "100%", label: "responsive (mobile + desktop)" },
        { value: "390€", label: "tarif de départ tout compris" },
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
      <h3 className="text-2xl font-semibold">Des sites évolutifs, pensés pour grandir avec vous</h3>
      <p className="text-muted-foreground leading-relaxed">
        Votre site peut évoluer au fil de votre activité : nouvelles pages, fonctionnalités supplémentaires, refonte partielle.
        Nous restons à vos côtés pour faire évoluer votre présence en ligne selon vos besoins.
      </p>
      <a
        href="#infos"
        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-medium bg-primary/10 text-primary hover:bg-primary/20 transition"
      >
        Demander un devis gratuit
      </a>
    </div>

    {/* --- Section technologies et bonnes pratiques --- */}
    <div className="max-w-5xl mx-auto space-y-8 pt-16">
      <h3 className="text-3xl font-semibold text-center">Technologies modernes et bonnes pratiques web</h3>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-primary">Performance et rapidité</h4>
          <p className="text-muted-foreground leading-relaxed">
            Chaque <a href="#pricing" className="text-primary hover:underline">site vitrine</a> que nous développons est optimisé pour la vitesse de chargement. Images compressées au format WebP, code minifié, lazy loading des ressources : nous appliquons les <a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">meilleures pratiques web.dev</a> pour garantir un temps de chargement inférieur à 3 secondes. Un site rapide améliore l'expérience utilisateur et favorise votre positionnement sur Google. Les <a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Core Web Vitals</a> sont respectés pour maximiser votre score de performance.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-primary">Référencement naturel (SEO)</h4>
          <p className="text-muted-foreground leading-relaxed">
            Le SEO est au cœur de notre démarche de <a href="#pourquoi-choisir-fluxa" className="text-primary hover:underline">création de sites vitrines</a>. Structure HTML sémantique, balises meta optimisées, sitemap XML, robots.txt, données structurées <a href="https://schema.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Schema.org</a> : tout est mis en place pour que votre site soit facilement indexé par les moteurs de recherche. Nous vous accompagnons également sur la stratégie de mots-clés et la rédaction de contenu optimisé pour le référencement local et national selon les <a href="https://developers.google.com/search/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">directives Google</a>.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-primary">Responsive design mobile-first</h4>
          <p className="text-muted-foreground leading-relaxed">
            Plus de 60% des visites web se font depuis un smartphone. Tous nos <a href="#infos" className="text-primary hover:underline">sites</a> sont développés en mobile-first selon les recommandations <a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MDN Web Docs</a> : nous concevons d'abord pour mobile, puis adaptons pour tablette et desktop. Navigation tactile optimisée, boutons accessibles au pouce, images adaptatives : votre site vitrine offre une expérience utilisateur parfaite sur tous les écrans. Test sur devices réels avant livraison.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-primary">Sécurité et conformité RGPD</h4>
          <p className="text-muted-foreground leading-relaxed">
            Certificat SSL inclus pour sécuriser les échanges, formulaires de contact conformes <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RGPD</a> avec consentement explicite, <a href="/politique-confidentialite" className="text-primary hover:underline">politique de confidentialité</a> claire : votre site vitrine respecte la réglementation française et européenne. Hébergement en France sur serveurs sécurisés avec sauvegardes quotidiennes. Protection anti-spam sur les formulaires et mise à jour régulière des dépendances de sécurité.
          </p>
        </div>
      </div>
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
          alt="Logo Fluxa - Agence web création sites internet professionnels pas chers"
          className="h-8 w-auto rounded-lg bg-white/5 p-1 ring-1 ring-white/10"
        />
        <p className="text-sm text-muted-foreground">
          Fluxa — Création de sites vitrines professionnels
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
        <a
          href="https://www.linkedin.com/company/fluxa-fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors inline-flex items-center gap-2 text-muted-foreground"
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