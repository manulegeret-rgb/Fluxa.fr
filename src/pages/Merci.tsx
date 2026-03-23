import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Merci = () => (
  <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 text-center">
    <SEOHead
      title="Merci pour votre message — Fluxa"
      description="Votre demande a bien été reçue. On vous répond sous 48h."
    />
    <div className="max-w-md space-y-6">
      <div className="text-5xl">✅</div>
      <h1 className="text-3xl font-bold">Message envoyé !</h1>
      <p className="text-muted-foreground text-lg">
        Merci pour votre demande. On vous répond sous 48h, sans engagement.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  </div>
);

export default Merci;
