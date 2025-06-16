// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
        return;
      }
      setUser(user);
      setEmail(user.email ?? '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profile) setFullName(profile.name);
    };

    getUser();
  }, []);

  const handleSave = async () => {
    if (!user) return;

    // Email update
    if (email !== user.email) {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) alert("Erreur lors du changement d'email.");
      else alert('Un email de confirmation a été envoyé.');
    }

    // Full name update
    await supabase
      .from('profiles')
      .update({ name: fullName })
      .eq('id', user.id);
    
    alert('Profil mis à jour !');
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Nom complet</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Adresse email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <small className="text-gray-500">Si tu changes ton email, une confirmation sera demandée.</small>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Sauvegarder
      </button>
      <a href="/forgot-password" className="text-blue-500 hover:underline">
        Mot de passe oublié ?
      </a>
    </div>
  );
}
