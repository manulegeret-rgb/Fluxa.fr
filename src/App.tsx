import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { CookieBanner } from "./components/CookieBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/Mentions-Legales";
import PolitiqueConfidentialite from "./pages/politique-confidentialite";
import CGV from "./pages/CGV";
import Ressources from "./pages/Ressources/Ressources";
import ArticlesHub from "./pages/ArticlesHub";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleViral from "./pages/ArticleViral";
import Merci from "./pages/Merci";
import MaquetteExemple from "./pages/MaquetteExemple";
import SiteVitrineArtisanChambery from "./pages/seo/SiteVitrineArtisanChambery";
import SiteVitrineArtisanPlombier from "./pages/seo/SiteVitrineArtisanPlombier";
import SiteVitrineElectricien from "./pages/seo/SiteVitrineElectricien";
import SiteVitrinePaysagiste from "./pages/seo/SiteVitrinePaysagiste";
import PrixSiteVitrine from "./pages/seo/PrixSiteVitrine";
import SiteInternetAixLesBains from "./pages/seo/SiteInternetAixLesBains";
import SiteInternetLaMotteServolex from "./pages/seo/SiteInternetLaMotteServolex";

const queryClient = new QueryClient();

const Header = () => {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (window.scrollY > 8) {
        header?.classList.add("shadow-[0_1px_8px_rgba(0,0,0,0.30)]");
      } else {
        header?.classList.remove("shadow-[0_1px_8px_rgba(0,0,0,0.30)]");
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative px-3 py-2 text-white/80 hover:text-white transition-colors duration-200 ease-in-out group";

  return (
    <header
      id="siteHeader"
      className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 transition-shadow"
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Fluxa" className="h-6 w-auto" width="24" height="24" loading="lazy" />
          <span className="text-lg font-semibold tracking-wide text-white">FLUXA</span>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-x-8">
  {[
    { label: "Formules", href: "/#pricing" },
    { label: "Comment ça marche", href: "/#comment-ca-marche" },
    { label: "FAQ", href: "/#faq" },
    { label: "En savoir plus", href: "/#more" },
    { label: "fluxa.fr", href: "https://fluxa.fr", external: true },
  ].map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkBase}
                >
                  {item.label}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-0 bg-sky-500 transition-[width] duration-200 ease-in-out group-hover:w-4/5" />
                </a>
              ) : (
                <a href={item.href} className={linkBase}>
                  {item.label}
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-0 bg-sky-500 transition-[width] duration-200 ease-in-out group-hover:w-4/5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const AppInner = () => {
  const location = useLocation();

  // Cache le header sur la home et les pages sans header
  const hideHeader =
    location.pathname === "/" ||
    location.pathname === "/mentions-legales" ||
    location.pathname === "/politique-confidentialite" ||
    location.pathname === "/cgv" ||
    location.pathname === "/ressources" ||
    location.pathname === "/articles" ||
    location.pathname.startsWith("/articles/") || // Cache aussi sur les pages articles individuels
    location.pathname === "/guide-complet-roi-automatisation-artisans" ||
    location.pathname === "/merci" ||
    location.pathname === "/maquette-exemple" ||
    location.pathname === "/creation-site-vitrine-artisan-chambery" ||
    location.pathname === "/creation-site-vitrine-plombier" ||
    location.pathname === "/creation-site-vitrine-electricien" ||
    location.pathname === "/creation-site-vitrine-paysagiste" ||
    location.pathname === "/creation-site-internet-aix-les-bains" ||
    location.pathname === "/creation-site-internet-la-motte-servolex" ||
    location.pathname === "/prix-site-vitrine-2026";

  return (
    <>
      {!hideHeader && <Header />}
      <CookieBanner />

      <Routes>
        {/* Routes principales */}
        <Route path="/" element={<Index />} />
        <Route path="/ressources" element={<Ressources />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/cgv" element={<CGV />} />

        {/* Routes articles */}
        <Route path="/articles" element={<ArticlesHub />} /> {/* ✅ Hub des 26 articles */}
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/guide-complet-roi-automatisation-artisans" element={<ArticleViral />} />
        <Route path="/merci" element={<Merci />} />

        {/* Maquette de démo prospect — cf. docs/PROMPT-MAQUETTE-LOVABLE.md */}
        <Route path="/maquette-exemple" element={<MaquetteExemple />} />

        {/* Pages SEO locales — non visibles dans le menu */}
        <Route path="/creation-site-vitrine-artisan-chambery" element={<SiteVitrineArtisanChambery />} />
        <Route path="/creation-site-vitrine-plombier" element={<SiteVitrineArtisanPlombier />} />
        <Route path="/creation-site-vitrine-electricien" element={<SiteVitrineElectricien />} />
        <Route path="/creation-site-vitrine-paysagiste" element={<SiteVitrinePaysagiste />} />
        <Route path="/creation-site-internet-aix-les-bains" element={<SiteInternetAixLesBains />} />
        <Route path="/creation-site-internet-la-motte-servolex" element={<SiteInternetLaMotteServolex />} />
        <Route path="/prix-site-vitrine-2026" element={<PrixSiteVitrine />} />

        {/* Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;