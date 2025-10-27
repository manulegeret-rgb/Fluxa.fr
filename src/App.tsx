import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/Mentions-Legales"; // ✅
import PolitiqueConfidentialite from "./pages/politique-confidentialite"; // ✅ NOUVELLE PAGE
import Ressources from "./pages/Ressources/Ressources"; // ✅ NOUVELLE PAGE (blog)
import Articles from "./pages/Articles";
import ArticleViral from "./pages/ArticleViral";
import DemoLayout from "@/_import_demo/components/demo/DemoLayout";
import Dashboard from "@/_import_demo/pages/demo/Dashboard";
import Clients from "@/_import_demo/pages/demo/Clients";
import Messages from "@/_import_demo/pages/demo/Messages";
import Factures from "@/_import_demo/pages/demo/Factures";
import Automations from "@/_import_demo/pages/demo/Automations";
import { Navigate } from "react-router-dom";

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
    { label: "Automatisations", href: "/#automations" },
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

  // Cache le header sur la home et TOUTES les routes /demo/*
  const hideHeader =
    location.pathname === "/" ||
    location.pathname.startsWith("/demo") ||
    location.pathname === "/mentions-legales" ||
    location.pathname === "/politique-confidentialite" ||
    location.pathname === "/ressources" ||
    location.pathname === "/articles" ||
    location.pathname === "/guide-complet-roi-automatisation-artisans";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        {/* ... on ajoutera les routes démo juste en dessous */}

        <Route path="/" element={<Index />} />
        <Route path="/ressources" element={<Ressources />} /> {/* ✅ nouvelle route */}
        <Route path="/mentions-legales" element={<MentionsLegales />} /> {/* ✅ */}
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} /> {/* ✅ */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/guide-complet-roi-automatisation-artisans" element={<ArticleViral />} /> {/* ✅ Article viral ROI */}
        <Route path="/demo" element={<DemoLayout />}>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="clients" element={<Clients />} />
  <Route path="messages" element={<Messages />} />
  <Route path="factures" element={<Factures />} />
  <Route path="automations" element={<Automations />} />
</Route>
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