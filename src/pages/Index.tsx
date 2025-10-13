import { Faq } from "@/components/Faq";
import { Automations } from "@/components/Automations";
import { useEffect, useMemo, useState } from "react";
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
  Menu, // + hamburger
} from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // shadcn
import dashboardMockup from "@/assets/dashboard-mockup.png";
import fluxaLogo from "@/assets/logo transparent.png"; // renomme en logo-transparent.png si besoin

const Index = () => {
  // ========= État du scroll pour styliser le header (bordure bleue après scroll)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <div className="md:hidden grid grid-cols-3 items-center h-14">
            {/* Hamburger */}
            <div className="flex">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Ouvrir le menu"
                    className="p-2 -ml-2"
                  >
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-sm">
                  <nav className="flex flex-col gap-2">
                    <a href="#pricing" className="py-2 text-base">Formules</a>
                    <a href="#automations" className="py-2 text-base">Automatisations</a>
                    <a href="#faq" className="py-2 text-base">FAQ</a>
                    <a href="#infos" className="py-2 text-base">En savoir plus</a>
                    <a
                      href="https://instagram.com/fluxa.fr"
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 text-base inline-flex items-center gap-2"
                    >
                      <Instagram className="w-4 h-4" />
                      fluxa.fr
                    </a>
                  </nav>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button asChild className="w-full">
                      <a href="#infos">Demander un devis</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="#pricing">Voir les formules</a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo centré */}
            <div className="flex justify-center">
              <a href="/" aria-label="Fluxa" className="inline-flex items-center">
                <img src={fluxaLogo} alt="Fluxa" className="h-12 w-auto object-contain" />
              </a>
            </div>

            {/* Espace à droite pour centrage parfait */}
            <div />
          </div>

          {/* Barre desktop (inchangée) */}
          <div className="hidden md:flex items-center justify-between h-16">
            <a href="/" aria-label="Fluxa" className="flex items-center gap-2">
              <img src={fluxaLogo} alt="Fluxa" className="h-7 w-auto object-contain" />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-muted-foreground font-medium">
              <a href="#pricing" className="hover:text-foreground transition">Formules</a>
              <a href="#automations" className="hover:text-foreground transition">Automatisations</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
              <a href="#infos" className="hover:text-foreground transition">En savoir plus</a>
              <a
                href="https://instagram.com/fluxa.fr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition flex items-center gap-1.5"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                fluxa.fr
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* fond halo */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(217,40%,8%)] to-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        {/* top padding ajusté pour le header fixe */}
        <div className="container mx-auto px-6 relative z-10 pt-16 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-[clamp(28px,6vw,56px)] font-bold leading-tight">
                  Automatisez votre gestion,{" "}
                  <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
                    gagnez du temps
                  </span>
                </h1>
                <p className="text-[15px] md:text-lg text-muted-foreground/90">
                  Application de gestion personnalisée pour <span className="text-foreground">artisans, indépendants & TPE</span>.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                  Fluxa centralise vos clients, vos factures et votre agenda
                  dans une application sur mesure, pensée pour artisans et
                  indépendants.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-1 flex flex-col md:flex-row gap-3">
                <a
                  href="#infos"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition w-full md:w-auto"
                  aria-label="Obtenir un devis personnalisé"
                >
                  Obtenir un devis personnalisé
                </a>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium border border-border hover:bg-muted transition w-full md:w-auto"
                  aria-label="Voir les formules"
                >
                  Voir les formules
                </a>
              </div>

              {/* Preuves rapides */}
              <ul className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <li className="rounded-full border border-border/70 px-3 py-1">⚡️ Réponse sous 24–48h</li>
                <li className="rounded-full border border-border/70 px-3 py-1">🔒 Données respectées</li>
                <li className="rounded-full border border-border/70 px-3 py-1">🧩 Personnalisation sur mesure</li>
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

      {/* ================= PROBLÈME / SOLUTION ================= */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Marre de jongler entre Excel, mails et post-it ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Outils qui ne se parlent pas, informations éparpillées, tâches répétitives…
              résultat&nbsp;: perte de temps, erreurs et aucun suivi fiable.
            </p>
          </div>

          {/* Problèmes vs Solutions */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
            {/* Problèmes */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Problèmes fréquents
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Données éparpillées (Excel, mails, WhatsApp, agenda papier).</li>
                <li>• Duplications / erreurs de saisie, aucune version “source”.</li>
                <li>• Relances manuelles, oublis de rendez-vous et de paiements.</li>
                <li>• Zéro visibilité sur le chiffre, la marge, l’activité réelle.</li>
                <li>• Perte de temps → moins de production, moins de ventes.</li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Ce que Fluxa simplifie
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Un seul espace pour clients, rendez-vous, devis/factures.</li>
                <li>• Automatisations : rappels, relances, mails après prestation.</li>
                <li>• Suivi des paiements & statistiques en temps réel.</li>
                <li>• Process clair, cohérent, partagé avec votre équipe.</li>
                <li>• Vous regagnez du temps pour votre savoir-faire.</li>
              </ul>
            </div>
          </div>

          {/* Fonctionnalités — icônes centrées */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Calendar,    label: "Agenda intelligent",          color: "from-primary to-[hsl(217,77%,39%)]" },
              { icon: DollarSign,  label: "Suivi factures et paiements", color: "from-primary to-[hsl(217,77%,39%)]" },
              { icon: MessageSquare,label: "Messagerie intégrée",         color: "from-primary to-[hsl(217,77%,39%)]" },
              { icon: BarChart3,   label: "Statistiques en temps réel",  color: "from-primary to-[hsl(217,77%,39%)]" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold">{item.label}</h3>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-lg">
            Simplifiez votre quotidien et concentrez-vous sur votre savoir-faire.
          </p>
        </div>
      </section>

      {/* ================= AUTOMATIONS ================= */}
      <section id="automations">
        <Automations />
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Nos Formules</h2>
            <p className="text-xl text-muted-foreground">
              Trois niveaux d’accompagnement — tous <span className="text-foreground">personnalisables</span> à votre activité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Essentielle"
              price="800 €"
              features={["Modules de base", "1 automatisation incluse", "Rappel RDV automatique", "Mail après prestation", "Support email"]}
            />
            <div className="relative">
              <span className="absolute -top-3 right-3 rounded-full px-3 py-1 text-xs font-medium
                   bg-primary/15 text-primary border border-primary/30 backdrop-blur">
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
      </section>

      {/* ================= TECHNO ================= */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Une technologie de pointe pour votre tranquillité
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Fluxa repose sur une architecture moderne, sécurisée et 100% automatisable.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA / INFOS (formulaire) ================= */}
      <section
        id="infos"
        className="pt-0 pb-16 scroll-mt-16 bg-gradient-to-b from-background via-[hsl(217,40%,8%)] to-background relative overflow-hidden"
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
          <form onSubmit={onSubmitInfo} className="mt-10 max-w-2xl mx-auto space-y-4">
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
                {sending ? "Ouverture de l’email…" : "Envoyer la demande"}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Réponse sous 24–48h — sans engagement.
            </p>
          </form>

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
      <section id="faq">
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