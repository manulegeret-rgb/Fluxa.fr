import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

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
          <img src="/logo.png" alt="Fluxa" className="h-6 w-auto" />
          <span className="text-lg font-semibold tracking-wide text-white">
            FLUXA
          </span>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-x-8">
          {[
            { label: "Formules", href: "#pricing" },
            { label: "Automatisations", href: "#automations" },
            { label: "FAQ", href: "#faq" },
            { label: "En savoir plus", href: "#more" },
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
  const showGlobalHeader = location.pathname !== "/";

  return (
    <>
      {/* HEADER GLOBAL (masqué sur la home) */}
      {showGlobalHeader && <Header />}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Index />} />
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
