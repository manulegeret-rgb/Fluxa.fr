import { Faq } from "@/components/Faq";
import { Automations } from "@/components/Automations";
import { useEffect, useMemo, useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import HowItWorks from "@/components/HowItWorks";
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* --- offset global mobile pour scroll anchors --- */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
            scroll-padding-top: 96px;
          }
          @media (min-width: 768px) {
            html {
              scroll-padding-top: 160px;
            }
          }
        `}
      </style>

      {/* ================= HEADER ================= */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "bg-background/70",
          scrolled ? "border-primary/50" : "border-border",
        ].join(" ")}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Barre mobile */}
          <div className="md:hidden grid grid-cols-3 items-center h-20">
            <div className="flex">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button aria-label="Ouvrir le menu" className="p-2 -ml-2">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-[85vw] max-w-sm"
                  onClickCapture={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest("a")) setSheetOpen(false);
                  }}
                >
                  <nav className="flex flex-col gap-2">
                    <a href="#pricing" className="py-2 text-base">Formules</a>
                    <a href="#automations" className="py-2 text-base">Automatisations</a>
                    <a href="#howitworks" className="py-2 text-base">Comment ça marche ?</a>
                    <a href="#faq" className="py-2 text-base">FAQ</a>
                    {/* 🔧 redirige vers le vrai formulaire */}
                    <a href="#contact" className="py-2 text-base">En savoir plus</a>
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
                      <a href="#contact">Nous contacter</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="#pricing">Voir les formules</a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex justify-center items-center translate-y-[2px]">
              <a href="/" aria-label="Fluxa" className="inline-flex items-center">
                <img
                  src={fluxaLogo}
                  alt="Fluxa"
                  className="h-[100px] w-auto object-contain -translate-y-[8px]"
                />
              </a>
            </div>
            <div />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between h-[160px]">
            <a href="/" aria-label="Fluxa" className="flex items-center gap-2">
              <img
                src={fluxaLogo}
                alt="Fluxa"
                className="h-[164px] lg:h-[240px] w-auto object-contain shrink-0"
              />
            </a>

            <nav className="flex items-center gap-6 text-base md:text-lg text-muted-foreground font-medium">
              <a href="#pricing" className="hover:text-foreground transition">Formules</a>
              <a href="#automations" className="hover:text-foreground transition">Automatisations</a>
              <a href="#howitworks" className="hover:text-foreground transition">Comment ça marche ?</a>
              <a href="#infos" className="hover:text-foreground transition">En savoir plus</a>
              <a href="#faq" className="hover:text-foreground transition">FAQ</a>
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

      {/* ================= HERO / autres sections inchangées ================= */}
      {/* ... ton code identique ici ... */}

      {/* ================= AUTOMATIONS ================= */}
      <section>
        <div id="automations" className="scroll-mt-24 md:scroll-mt-40">
          <Automations />
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div id="pricing" className="text-center space-y-6 mb-16 scroll-mt-24 md:scroll-mt-40">
            <h2 className="text-4xl lg:text-5xl font-bold">Nos Formules</h2>
            <p className="text-xl text-muted-foreground">
              Trois niveaux d’accompagnement — tous{" "}
              <span className="text-foreground">personnalisables</span> à votre activité.
            </p>
          </div>
          {/* cartes inchangées */}
        </div>
      </section>

      {/* ================= CTA / INFOS ================= */}
      <section
        id="infos"
        className="pt-0 pb-16 bg-gradient-to-b from-background via-[hsl(217,40%,8%)] to-background relative overflow-hidden scroll-mt-24 md:scroll-mt-40"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold">
              En savoir plus sur{" "}
              <span className="bg-gradient-to-r from-primary to-[hsl(217,77%,39%)] bg-clip-text text-transparent">
                Fluxa
              </span>
            </h2>
          </div>

          {/* 👇 Ancre déplacée juste autour du composant */}
          <div id="howitworks" className="scroll-mt-24 md:scroll-mt-40">
            <HowItWorks />
          </div>

          <form
            id="contact"
            onSubmit={onSubmitInfo}
            className="mt-10 max-w-2xl mx-auto space-y-4 scroll-mt-24 md:scroll-mt-40"
          >
            {/* formulaire inchangé */}
          </form>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section>
        <div id="faq" className="scroll-mt-24 md:scroll-mt-40">
          <Faq />
        </div>
      </section>

      {/* ================= FOOTER inchangé ================= */}
    </div>
  );
};

export default Index;