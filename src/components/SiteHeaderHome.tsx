import { Link } from "react-router-dom";

export default function SiteHeaderHome() {
  const linkBase =
    "relative px-3 py-2 text-white/80 hover:text-white transition-colors duration-200 ease-in-out group";

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 transition-shadow">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Fluxa" className="h-6 w-auto" />
          <span className="text-lg font-semibold tracking-wide text-white">FLUXA</span>
        </Link>

        {/* Menu desktop (mêmes liens que la home) */}
        <ul className="hidden md:flex items-center gap-x-8">
          {[
            { label: "Nos formules", href: "/#pricing" },
            { label: "Automatisations", href: "/#automations" },
            { label: "Ressources", href: "/ressources" },
            { label: "FAQ", href: "/#faq" },
            { label: "En savoir plus", href: "/#infos" },
            { label: "fluxa.fr", href: "https://fluxa.fr", external: true },
          ].map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkBase}>
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
}