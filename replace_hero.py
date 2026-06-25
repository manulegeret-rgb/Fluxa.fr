new_hero = r"""      {/* ================= HERO ================= */}
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Grid animé façon Claude Design */}
  <div className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "linear-gradient(hsl(217,91%,60%,0.06) 1px,transparent 1px),linear-gradient(90deg,hsl(217,91%,60%,0.06) 1px,transparent 1px)",
      backgroundSize: "54px 54px",
      maskImage: "radial-gradient(120% 70% at 50% 25%,#000,transparent 75%)",
      WebkitMaskImage: "radial-gradient(120% 70% at 50% 25%,#000,transparent 75%)",
      animation: "gridFade 8s ease-in-out infinite",
    }}
  />
  {/* Orbe bleu */}
  <div className="absolute top-[4%] left-[2%] w-[560px] h-[560px] rounded-full pointer-events-none"
    style={{ background: "hsl(217,91%,60%,0.18)", filter: "blur(120px)", animation: "glowPulse 6s ease-in-out infinite" }} />
  {/* Orbe violet */}
  <div className="absolute bottom-[2%] right-[4%] w-[480px] h-[480px] rounded-full pointer-events-none"
    style={{ background: "hsl(263,90%,64%,0.14)", filter: "blur(120px)", animation: "glowPulse 7s ease-in-out infinite 1.2s" }} />

  <div className="container mx-auto px-6 relative z-10 pt-40 pb-24 md:pt-48 md:pb-32">
    <div className="grid lg:grid-cols-[54%_46%] gap-16 lg:gap-12 items-center max-w-7xl mx-auto">

      {/* ── Colonne gauche ── */}
      <div className="space-y-7">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-primary/25 bg-primary/8 animate-[fade-in_0.8s_ease_0.1s_both]">
          <span className="w-[7px] h-[7px] rounded-full bg-emerald-400 shadow-[0_0_0_3px_hsl(160,84%,45%,0.25)]" />
          <span className="text-[12.5px] font-semibold tracking-[0.04em] text-foreground/90">Agence web · Sites vitrines clé en main</span>
        </div>

        {/* H1 avec gradient sur le texte typé */}
        <h1
          className="text-[clamp(36px,5.2vw,64px)] font-extrabold leading-[1.08] tracking-[-0.02em] animate-[fade-in-up_0.8s_ease_0.08s_both]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Votre site vitrine<br />
          professionnel,{" "}
          <span className="bg-gradient-to-r from-primary to-[hsl(263,90%,74%)] bg-clip-text text-transparent">
            {typingText || " "}
          </span>
          <span className="inline-block w-[3px] h-[0.85em] bg-primary align-middle ml-0.5 animate-pulse" />
        </h1>

        {/* Accroche */}
        <p className="text-[18px] text-muted-foreground leading-[1.7] max-w-[520px] animate-[fade-in-up_0.8s_ease_0.15s_both]">
          Artisan, TPE ou indépendant ? Fluxa conçoit votre site en{" "}
          <strong className="text-foreground/95 font-semibold">2 à 3 semaines</strong>,
          optimisé pour transformer vos visiteurs en clients.
        </p>

        {/* Bénéfices 2 colonnes */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 max-w-[560px] animate-[fade-in-up_0.8s_ease_0.21s_both]">
          {[
            { icon: <CheckCircle2 className="w-[17px] h-[17px] text-primary shrink-0 mt-[2px]" />, txt: "Responsive mobile & desktop" },
            { icon: <Search className="w-[17px] h-[17px] text-primary shrink-0 mt-[2px]" />, txt: "Référencement Google inclus" },
            { icon: <Globe className="w-[17px] h-[17px] text-primary shrink-0 mt-[2px]" />, txt: "Hébergement + domaine offerts" },
            { icon: <Phone className="w-[17px] h-[17px] text-primary shrink-0 mt-[2px]" />, txt: "Support après livraison" },
          ].map(({ icon, txt }) => (
            <div key={txt} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              {icon}
              <span>{txt}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 animate-[fade-in-up_0.8s_ease_0.27s_both]">
          <a
            href="#infos"
            className="group relative inline-flex items-center justify-center gap-2.5 rounded-[13px] px-7 py-[15px] text-[15.5px] font-semibold text-white overflow-hidden transition-all duration-200 hover:-translate-y-[2px]"
            style={{ background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))", boxShadow: "0 14px 36px -10px hsl(217,91%,60%,0.6)" }}
          >
            <span className="relative z-10">Demander un devis gratuit</span>
            <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">→</span>
            <div className="btn-shimmer absolute inset-0 z-20 pointer-events-none" />
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-[13px] px-7 py-[15px] text-[15.5px] font-semibold border border-primary/30 bg-primary/7 text-foreground hover:bg-primary/15 hover:border-primary/55 transition-all duration-200"
          >
            Voir les tarifs →
          </a>
        </div>

        {/* Sous-CTAs */}
        <div className="flex flex-wrap items-center gap-4 text-[13px] text-muted-foreground/60 animate-[fade-in_0.8s_ease_0.33s_both]">
          <span className="inline-flex items-center gap-1.5">
            <Banknote className="w-[15px] h-[15px] text-primary" />
            À partir de <strong className="text-primary font-bold mx-1">890 €</strong> tout compris
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>Réponse sous 48h</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>Paiement en 2× sans frais</span>
        </div>
      </div>

      {/* ── Colonne droite : mockup navigateur ── */}
      <div
        className="relative cursor-pointer animate-[fade-in-up_1s_ease_0.18s_both]"
        onClick={() => setLightboxOpen(true)}
      >
        {/* Halo gradient */}
        <div className="absolute -inset-8 rounded-[28px] pointer-events-none"
          style={{ background: "linear-gradient(120deg,hsl(217,91%,60%,0.28),hsl(263,90%,64%,0.22))", filter: "blur(50px)", opacity: 0.7 }} />

        {/* Cadre navigateur */}
        <div className="relative rounded-2xl overflow-hidden border border-primary/25 shadow-[0_50px_110px_-40px_hsl(217,91%,60%,0.45),0_0_0_1px_hsl(217,32%,18%)]"
          style={{ background: "#0a1224" }}>
          {/* Barre navigateur */}
          <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/8" style={{ background: "hsl(217,33%,9%)" }}>
            <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#28c840" }} />
            <span className="ml-3 flex-1 max-w-[200px] text-[11px] text-muted-foreground/45 bg-white/5 border border-white/8 rounded-md px-3 py-1 flex items-center gap-1.5">
              <Lock className="w-[10px] h-[10px]" />votre-client.fr
            </span>
          </div>
          <img
            src={mockupAJour}
            alt="Exemple site vitrine professionnel créé par Fluxa"
            loading="eager"
            width="1920"
            height="1080"
            className="w-full block"
          />
        </div>

        {/* Badge flottant haut gauche */}
        <div className="absolute -top-5 -left-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[13px] border border-primary/25 backdrop-blur-sm"
          style={{ background: "hsl(222,84%,7%,0.92)", boxShadow: "0 16px 40px -16px rgba(0,0,0,0.8)", animation: "floatY 5s ease-in-out infinite" }}>
          <div className="w-[34px] h-[34px] rounded-[9px] bg-primary/15 grid place-items-center shrink-0">
            <Phone className="w-[18px] h-[18px] text-primary" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-white leading-tight">100% responsive</div>
            <div className="text-[11px] text-muted-foreground/60">mobile · tablette · desktop</div>
          </div>
        </div>

        {/* Badge flottant bas droite */}
        <div className="absolute -bottom-5 -right-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-[13px] border border-emerald-500/30 backdrop-blur-sm"
          style={{ background: "hsl(222,84%,7%,0.92)", boxShadow: "0 16px 40px -16px rgba(0,0,0,0.8)", animation: "floatY2 6s ease-in-out infinite 1s" }}>
          <div className="w-[34px] h-[34px] rounded-[9px] grid place-items-center shrink-0" style={{ background: "hsl(160,84%,45%,0.15)" }}>
            <TrendingUp className="w-[18px] h-[18px]" style={{ color: "hsl(160,84%,50%)" }} />
          </div>
          <div>
            <div className="text-[13px] font-bold text-white leading-tight">Visible sur Google</div>
            <div className="text-[11px] text-muted-foreground/60">SEO optimisé dès le départ</div>
          </div>
        </div>

        {/* Zoom overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-primary/30">
            <ZoomIn className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-[fade-in_1s_ease_1.2s_both]">
    <span className="text-[11px] text-muted-foreground/40 tracking-[0.18em] uppercase">Découvrir</span>
    <div className="w-[22px] h-[34px] rounded-full border border-muted-foreground/25 flex justify-center pt-[6px]">
      <div className="w-[3px] h-[7px] bg-primary rounded-full animate-[scrollDot_1.8s_ease-in-out_infinite]" />
    </div>
  </div>
</section>"""

with open('src/pages/Index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_idx = 12330
end_idx = 18514  # position after </section>

new_content = content[:start_idx] + new_hero + content[end_idx:]

with open('src/pages/Index.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Done! {len(content)} -> {len(new_content)} chars")
