import React from "react";

type Props = {
  href?: string;                 // lien de destination (par défaut "/")
  logoSrc: string;               // chemin de ton logo (png/svg)
  alt?: string;                  // texte alternatif
  size?: number;                 // largeur du logo en px (auto height)
  hideOnDesktop?: boolean;       // si tu veux ne le montrer que sur mobile
  topInsteadOfCenter?: boolean;  // si tu préfères en haut centré plutôt qu'au milieu
};

export default function HomeLogoOverlay({
  href = "/",
  logoSrc,
  alt = "Fluxa — retour à l’accueil",
  size = 72,
  hideOnDesktop = false,
  topInsteadOfCenter = false,
}: Props) {
  return (
    <div
      className={[
        "fixed inset-0 z-[60] flex pointer-events-none",            // calque au-dessus
        topInsteadOfCenter ? "items-start pt-6" : "items-center",   // position Y
        "justify-center",
        hideOnDesktop ? "md:hidden" : "",                           // option: mobile only
      ].join(" ")}
      aria-hidden="false"
    >
      <a
        href={href}
        className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-border/60 shadow-lg px-4 py-3 hover:bg-background transition"
        aria-label="Revenir à l’accueil"
      >
        {/* Logo */}
        <img
          src={logoSrc}
          alt={alt}
          width={size}
          height={size}
          className="h-auto"
          loading="eager"
        />
        <span className="sr-only">{alt}</span>
      </a>
    </div>
  );
}