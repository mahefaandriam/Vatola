import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
   const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('redirect');
      const redirectSanitized = redirect ? redirect.replace(/;/g, '&') : null;
      if (redirectSanitized) {
        navigate(redirectSanitized);
      } else {
        if (form.email === '/admin') {
          navigate('/admin'); // Redirect to admin dashboard if user is admin
        } else {
          navigate('/profil'); // Redirect to user profile if not admin  
        }
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-2 mt-60">
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
      <a href="/forgot-password" className="text-blue-500 hover:underline">
        Mot de passe oublié ?
      </a>
    </form>
    
  );
}
