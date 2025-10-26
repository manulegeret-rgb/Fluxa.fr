import React from "react";

type Props = {
  href?: string;                 // lien de destination (par défaut "/")
  logoSrc: string;               // chemin de ton logo (png/svg)
  alt?: string;                  // texte alternatif
  size?: number;                 // largeur du logo en px (auto height) - pour DESKTOP
  mobileSize?: number;           // largeur du logo en px sur mobile (optionnel)
  hideOnDesktop?: boolean;       // si tu veux ne le montrer que sur mobile
  topInsteadOfCenter?: boolean;  // si tu préfères en haut centré plutôt qu'au milieu
};

export default function HomeLogoOverlay({
  href = "/",
  logoSrc,
  alt = "Fluxa — retour à l'accueil",
  size = 72,
  mobileSize,                    // si non défini, on utilise automatiquement size * 0.65
  hideOnDesktop = false,
  topInsteadOfCenter = false,
}: Props) {
  // Calcul automatique de la taille mobile (65% de la taille desktop par défaut)
  const mobileSizeValue = mobileSize || Math.round(size * 0.65);

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
        className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-background/70 backdrop-blur-sm border border-border/60 shadow-lg px-3 py-2 md:px-4 md:py-3 hover:bg-background transition"
        aria-label="Revenir à l'accueil"
      >
        {/* Logo avec taille responsive */}
        <img
          src={logoSrc}
          alt={alt}
          className="h-auto"
          loading="eager"
          style={{
            width: `${mobileSizeValue}px`,
          }}
        />
        {/* Version desktop uniquement */}
        <style>{`
          @media (min-width: 768px) {
            a img[src="${logoSrc}"] {
              width: ${size}px !important;
            }
          }
        `}</style>
        <span className="sr-only">{alt}</span>
      </a>
    </div>
  );
}