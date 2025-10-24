import { useEffect } from "react";

export default function ExempleInteractif() {
  useEffect(() => {
    document.title = "Exemple interactif — Fluxa";
    const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (meta) meta.content = "Découvrez un exemple interactif de l'application Fluxa en action.";
  }, []);

  return (
    <main className="w-full h-screen bg-[#020617] flex items-center justify-center">
      <iframe
        src="https://fluxa-demo-playground.vercel.app"
        title="Démo interactive Fluxa"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </main>
  );
}