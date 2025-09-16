import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
      document.title = "404 - Page non trouvée - Vatola Hotel";
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-grenat text-white p-6">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-gold-700">
          404
        </h1>
        <h2 className="text-3xl font-semibold">Page non trouvée</h2>
        <p className="text-lg text-white/80">
          Désolé, la page que vous cherchez n’existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 rounded-xl text-white font-medium bg-accent hover:bg-yellow-700 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
