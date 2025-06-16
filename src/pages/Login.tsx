import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Logged in!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-2 mt-60">
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
