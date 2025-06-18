import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error.message);
    } else {
      navigate('/login'); // rediriger vers login
    }
  };

  return (
    <button
      onClick={handleLogout}
       className="bg-accent hover:bg-gold-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
    >
      Se déconnecter
    </button>
  );
}
