import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    birthday: '',
  });

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    
    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    const user = signUpData.user;
    if (!user) {
      alert('Please check your email to confirm your registration.');
      return;
    }

    // 2. Save extra info in `profiles`
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: user.id,
        name: form.name,
        surname: form.surname,
        birthday: form.birthday,
      }]);
      console.log(profileError);

    if (profileError) {
      alert(profileError.message);
    } else {
      alert('Registration successful!');
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-2 mt-50">
      sim
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="text" placeholder="Surname" onChange={e => setForm({ ...form, surname: e.target.value })} />
      <input type="date" placeholder="Birthday" onChange={e => setForm({ ...form, birthday: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
