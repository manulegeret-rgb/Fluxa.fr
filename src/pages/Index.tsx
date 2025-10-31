import SEOHead from "@/components/SEOHead";
import { useEffect, useMemo, useRef, useState } from "react";
import { Faq } from "@/components/Faq";
import { Automations } from "@/components/Automations";
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
                    <a href="#automations" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Notre processus</a>
                    <a href="#pricing" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Nos tarifs</a>
                    <a href="#pourquoi-choisir-fluxa" className="py-2 text-base" onClick={() => setMenuOpen(false)}>Nos engagements</a>
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
                  alt="Fluxa - Agence de création de sites vitrines professionnels"
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
                alt="Fluxa - Agence de création de sites vitrines professionnels"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-muted-foreground font-medium">
              <a href="#automations" className="hover:text-foreground transition">Processus</a>
              <a href="#pricing" className="hover:text-foreground transition">Tarifs</a>
              <a href="#pourquoi-choisir-fluxa" className="hover:text-foreground transition">Avantages</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
              <a href="#infos" className="hover:text-foreground transition">Contact</a>
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
            <span className="whitespace-nowrap">Création site vitrine</span>{" "}
            <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
              professionnel et abordable
            </span>
          </h1>

          <p className="text-[15px] md:text-lg text-muted-foreground/90 max-w-[62ch]">
            <span className="text-foreground">Agence de création de sites vitrines</span> pour TPE, indépendants et entrepreneurs.
            Offrez-vous une présence en ligne professionnelle sans vous ruiner : site responsive, optimisé SEO, formulaire de contact, hébergement et nom de domaine inclus.
            De la maquette personnalisée à la mise en ligne, nous gérons tout pour vous.
          </p>

          {/* 3 points forts sobres */}
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
            {[
              "Design moderne et responsive",
              "Hébergement & domaine inclus",
              "À partir de 390€ tout compris",
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
            href="#pricing"
            className="group relative inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition w-full md:w-auto overflow-hidden"
            aria-label="Voir nos tarifs"
          >
            <span className="relative z-10">Voir nos tarifs</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(217,77%,45%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
          <a
            href="#infos"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border-2 border-primary/50 hover:bg-primary/10 transition w-full md:w-auto"
            aria-label="Demander un devis"
          >
            Demander un devis gratuit
          </a>
        </div>

        {/* Note de réassurance compacte */}
        <p className="text-xs text-muted-foreground">
          🔐 Hébergement & domaine inclus — 🎯 Support technique inclus — ⚡ SEO optimisé
        </p>
      </div>

      {/* Visuel (mockup) */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-[hsl(217,77%,39%)]/20 rounded-2xl blur-2xl"></div>
        <img
          src={dashboardMockup}
          alt="Exemple de site vitrine professionnel créé par Fluxa - Design moderne et responsive"
          loading="eager"
          className="relative rounded-2xl border border-primary/20 shadow-[0_30px_80px_-30px_hsl(217,91%,60%/.25)]"
        />
        <div className="absolute left-3 bottom-3 text-[10px] text-muted-foreground/85 bg-background/70 backdrop-blur px-2 py-1 rounded-lg border border-border/60">
          Exemple de réalisation
        </div>
      </div>
    </div>
  </div>
</section>

{/* ================= TYPES DE SITES ================= */}
<section className="py-16 md:py-24 bg-background">
  <div className="container mx-auto px-6">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">Exemples de sites vitrines</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Nous adaptons votre site à votre activité et à vos besoins spécifiques
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition">
        <div className="text-4xl mb-4">🎨</div>
        <h3 className="text-xl font-semibold mb-3">Site Portfolio</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Idéal pour les créatifs, artisans et prestataires : mettez en avant vos réalisations avec une galerie photo optimisée et des témoignages clients.
        </p>
        <div className="text-xs text-muted-foreground">
          ✓ Galerie photo haute qualité • ✓ Page témoignages • ✓ Formulaire de contact
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/60 transition">
        <div className="text-4xl mb-4">🏢</div>
        <h3 className="text-xl font-semibold mb-3">Site Entreprise</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Pour TPE et PME : présentez vos services, votre équipe et vos valeurs avec une structure claire et professionnelle.
        </p>
        <div className="text-xs text-muted-foreground">
          ✓ Pages services détaillées • ✓ Présentation équipe • ✓ Google Maps intégré
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
          <div className="text-center space-y-6 max-md:mb-12 md:mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-3 -right-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full rotate-12 shadow-lg">
                NOUVEAU
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold">Tarifs Site Vitrine — Transparent et Abordable</h2>
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
                  <p className="text-sm text-muted-foreground">Lightbox, filtres, mise en page optimisée pour vos réalisations</p>
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
                  <li>• Support technique prioritaire (&lt;24h)</li>
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
              Parlez-nous de votre projet et recevez un devis personnalisé sous 24-48h, sans engagement.
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
                <label className="text-sm">Nom</label>
                <input name="name" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input name="email" type="email" required className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div>
              <label className="text-sm">Type de site souhaité</label>
              <select name="need" required defaultValue="" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring">
                <option value="" disabled>— Sélectionner —</option>
                <option>Site vitrine simple (390€)</option>
                <option>Site avec galerie photo</option>
                <option>Site avec prise de RDV</option>
                <option>Refonte de site existant</option>
                <option>Autre / Je ne sais pas encore</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Votre message</label>
              <textarea name="message" rows={4} placeholder="Décrivez votre projet en quelques mots : votre activité, vos besoins, vos attentes…" className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
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
            <li className="rounded-full border border-border/70 px-3 py-1">⚡ Livraison rapide (1-2 semaines)</li>
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

{/* ================= TÉMOIGNAGES ================= */}
<section className="py-16 md:py-20 bg-muted/30">
  <div className="container mx-auto px-6">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold">Ils nous ont fait confiance</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Découvrez les retours de nos clients sur leur expérience avec Fluxa
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            MC
          </div>
          <div>
            <div className="font-semibold">Marie C.</div>
            <div className="text-xs text-muted-foreground">Paysagiste</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "Site livré en 10 jours, exactement comme promis. Le design met parfaitement en valeur mes réalisations. Mes clients me disent que ça fait très pro !"
        </p>
        <div className="mt-4 text-primary text-sm">⭐⭐⭐⭐⭐</div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            JL
          </div>
          <div>
            <div className="font-semibold">Julien L.</div>
            <div className="text-xs text-muted-foreground">Coach sportif</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "Rapport qualité/prix imbattable. J'ai eu un site responsive avec système de réservation pour moins de 600€. L'équipe est très réactive."
        </p>
        <div className="mt-4 text-primary text-sm">⭐⭐⭐⭐⭐</div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            SD
          </div>
          <div>
            <div className="font-semibold">Sophie D.</div>
            <div className="text-xs text-muted-foreground">Photographe</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "Enfin une agence qui comprend les besoins des indépendants ! Prix transparent, pas de surprise, et le résultat est top. Je recommande."
        </p>
        <div className="mt-4 text-primary text-sm">⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  </div>
</section>

      {/* ================= GARANTIES ================= */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Nos garanties</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous nous engageons sur la qualité et la transparence de nos prestations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Satisfaction garantie</h3>
              <p className="text-sm text-muted-foreground">
                Modifications incluses jusqu'à validation complète
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Respect des délais</h3>
              <p className="text-sm text-muted-foreground">
                Livraison en 1-2 semaines ou remboursement partiel
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Code propre</h3>
              <p className="text-sm text-muted-foreground">
                Standards du web respectés, performance optimale
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Support réactif</h3>
              <p className="text-sm text-muted-foreground">
                Réponse sous 24-48h, corrections de bugs prioritaires
              </p>
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
      Création de Sites Vitrines Professionnels
    </h2>
    <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
      <strong className="text-primary">Fluxa</strong> est une agence spécialisée dans la création de sites vitrines pour TPE, indépendants et entrepreneurs.
      Nous concevons des sites internet modernes, optimisés SEO et responsive, avec hébergement inclus.
      Chaque site est livré clé en main avec formation à la gestion, support technique et garantie de qualité.
      Notre objectif : vous offrir une présence en ligne professionnelle et efficace, rapidement et à prix abordable.
    </p>
  </div>
</section>{/* ===== SECTION : Pourquoi choisir Fluxa ===== */}
<section id="pourquoi-choisir-fluxa" className="py-24 border-t border-border/60 bg-gradient-to-b from-background via-card/30 to-background">
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
          text: `Votre site est prêt en 1-2 semaines seulement. Nous travaillons efficacement sans compromettre la qualité. Besoin encore plus vite ? Contactez-nous pour une option express. Dès validation de la maquette, votre site est développé et mis en ligne rapidement pour que vous puissiez commencer à gagner en visibilité immédiatement.`,
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
          alt="Logo Fluxa - Création de sites vitrines professionnels"
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
    </div>
  );
};

export default Index;