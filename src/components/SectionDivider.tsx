const SectionDivider = () => {
  return (
    <div className="relative w-full h-20 md:h-24 overflow-hidden -my-8 md:-my-12">
      {/* Glow effect - réduit */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent blur-lg"></div>

      {/* Wave SVG centré */}
      <svg
        className="absolute top-1/2 -translate-y-1/2 w-full h-16"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'hsl(217, 91%, 60%)', stopOpacity: 0.08 }} />
            <stop offset="50%" style={{ stopColor: 'hsl(217, 91%, 60%)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(217, 91%, 60%)', stopOpacity: 0.08 }} />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C300,90 600,30 900,60 C1050,75 1200,45 1200,45 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.5"
        />
        <path
          d="M0,75 C300,45 600,90 900,60 C1050,45 1200,75 1200,75 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
