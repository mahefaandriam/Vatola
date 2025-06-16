import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Définir un nouveau mot de passe</h2>

      {!submitted ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
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
