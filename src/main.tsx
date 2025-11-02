import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Supprime le contenu SEO fallback une fois React chargé
const seoFallback = document.querySelector('.seo-fallback');
if (seoFallback) {
  seoFallback.remove();
}

createRoot(document.getElementById("root")!).render(<App />);
