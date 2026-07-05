import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

// Détecte si le HTML a été pré-rendu (SSG) : présence d'un marqueur injecté au build.
const isPrerendered = rootEl.hasAttribute("data-prerendered");

// Supprime le contenu SEO fallback (uniquement en mode SPA non pré-rendu).
const seoFallback = document.querySelector(".seo-fallback");
if (seoFallback && !isPrerendered) {
  seoFallback.remove();
}

if (isPrerendered) {
  // Le HTML contient déjà le rendu React : on hydrate au lieu de reconstruire.
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
