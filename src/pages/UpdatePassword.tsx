import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      document.title = "Nouveau mot de passe - Vatola Hotel";
    }, []);

  // Supabase crée automatiquement une session si le lien est valide
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Si aucun token : rediriger ou afficher un message
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
      setTimeout(() => navigate('/login'), 3000); // redirection vers login après 3s
    }
  };

  return (
    <div className="p-4 max-w-md mx-2 md:mx-auto mt-30 border-1 rounded border-accent mb-10">
      <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6">Définir un nouveau mot de passe</h3>
      <p className="text-gray-600 mb-6">
        Merci de définir un nouveau mot de passe afin de poursuivre.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        <p className='italic'>suggestion:</p>Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, un chiffre et un symbole.
      </p>

      {!submitted ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border-2 border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Mettre à jour
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      ) : (
        <p className="text-green-600">✅ Mot de passe mis à jour ! Redirection vers le login...</p>
      )}
    </div>
  );
}
