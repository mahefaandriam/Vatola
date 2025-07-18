import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import SectionTitle from '../components/SectionTitle';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    phone:'',
    name: '',
    surname: '',
    birthday: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    if (!isPasswordValid(form.password)) {
      alert("Le mot de passe doit: Au moins 8 caractères, une majuscule, un caractère spécial");
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      phone: form.phone // Si tu veux ajouter un téléphone
    });
    
    if (signUpError) {
       if (signUpError.code === '23505' || signUpError.message.includes('already registered') || signUpError.message.includes('violates foreign key constraint')) {
        alert('Cet email ou numéro de téléphone est déjà utilisé.');
        return;
      }
      return;
    }

    // Handle specific Supabase sign up error codes
   

    const user = signUpData.user;
    if (!user) {
      alert('Veuillez vérifier votre email pour confirmer votre inscription.');
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
      if (profileError) {
        if (profileError.message.includes('violates foreign key constraint')) {
          alert('Cet email ou numéro de téléphone est déjà utilisé.');
          return;
        }
      }
    } else {
      alert('Inscription réussie !');
      navigate('/login');
    }
  };

  const isPasswordValid = (password: string) => {
    // At least 8 chars, one uppercase, one special char
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
  };

  return (
    <div className='mt-25 mb-5 mx-5 md:mx-30'>
      
      <SectionTitle
        title="Création d'un compte"
        subtitle="Créez un compte en quelques clics."
        alignment="left"
      />

      <form onSubmit={handleRegister} className="space-y-2">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Votre Nom*
          </label>
          <input
            type="text" placeholder="Nom" onChange={e => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Votre Prénom*
          </label>
          <input
            type="text" placeholder="Prénom" onChange={e => setForm({ ...form, surname: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Votre Email*
          </label>
          <input
            type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="birthday" className="block text-gray-700 font-medium mb-2">
            Votre date de naissance*
          </label>
          <input 
            type="date" 
            id="birthday"
            placeholder="Birthday" 
            required
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            onChange={e => setForm({ ...form, birthday: e.target.value })} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-gray-700 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="birthday" className="block text-gray-700 font-medium mb-2">
            Votre Numéro de téléphone*
          </label>
          <input
            type="number"
            placeholder="Numéro de téléphone"
            required
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent'
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Créez un mot de passe*
          </label>
          <input
            type="password"
            placeholder="Création de mot de passe"
            required
            title="Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial."
            onChange={e => setForm({ ...form, password: e.target.value })}
            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent'
          />
        </div>

        <button type='submit' className="my-5 bg-accent hover:bg-gold-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 mr-5">S'inscrire</button>
        &nbsp;
        <a href="/login" className="text-blue-500 hover:underline">
          Connexion
        </a>
      </form>
    </div>
  );
}
