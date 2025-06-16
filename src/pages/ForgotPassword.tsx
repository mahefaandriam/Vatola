import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // ajuste le chemin si besoin

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://ton-site.vercel.app/update-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Mot de passe oublié</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Envoyer le lien
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      ) : (
        <p className="text-green-600">📩 Un lien de réinitialisation a été envoyé à votre email.</p>
      )}
    </div>
  );
}
