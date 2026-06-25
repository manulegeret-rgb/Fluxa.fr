import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("fluxa-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("fluxa-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("fluxa-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="mx-auto max-w-3xl flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-[16px] px-5 py-4"
        style={{
          background: "hsl(217,33%,9%)",
          border: "1px solid hsl(217,32%,18%)",
          boxShadow: "0 -8px 40px -16px rgba(0,0,0,0.6), 0 24px 60px -20px rgba(0,0,0,0.8)",
          backdropFilter: "blur(12px)",
          pointerEvents: "all",
        }}
      >
        {/* Texte */}
        <p className="text-[13.5px] flex-1 leading-relaxed" style={{ color: "hsl(215,20%,65%)" }}>
          Ce site utilise des cookies techniques pour son bon fonctionnement.{" "}
          <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: "hsl(217,91%,65%)" }}>
            En savoir plus
          </a>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="text-[13px] font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "hsl(215,20%,50%)" }}
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              padding: "8px 18px",
              borderRadius: 9,
              background: "linear-gradient(135deg,hsl(217,91%,60%),hsl(217,77%,46%))",
              boxShadow: "0 8px 20px -8px hsl(217,91%,60%,0.5)",
            }}
          >
            Accepter
          </button>
          <button
            onClick={decline}
            aria-label="Fermer"
            className="transition-colors duration-200 hover:text-white"
            style={{ color: "hsl(215,20%,40%)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
