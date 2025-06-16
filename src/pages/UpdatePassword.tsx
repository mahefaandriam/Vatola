import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { useNavigate } from 'react-router-dom';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      alert(error.message);
    } else {
      setSubmitted(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="p-4">
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Mettre à jour</button>
      </form>

      {submitted && <p>Mot de passe mis à jour. Redirection vers le login...</p>}
    </div>
  );
}
