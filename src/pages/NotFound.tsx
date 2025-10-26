import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "404 - Page introuvable | Fluxa";
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="Fluxa" className="h-12 w-auto" width="48" height="48" loading="lazy" />
          <span className="text-2xl font-semibold tracking-wide text-white">FLUXA</span>
        </Link>

        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-3">
            Page introuvable
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            <code className="bg-slate-800 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>

        {/* Liens utiles */}
        <div className="pt-8 border-t border-slate-700">
          <p className="text-sm text-gray-400 mb-4">Liens utiles :</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/articles" className="text-blue-400 hover:text-blue-300 transition-colors">
              Articles & Guides
            </Link>
            <Link to="/demo/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors">
              Démo interactive
            </Link>
            <Link to="/mentions-legales" className="text-blue-400 hover:text-blue-300 transition-colors">
              Mentions légales
            </Link>
            <a href="mailto:fluxa.contact@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
