import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { Bounce, toast } from 'react-toastify';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const notifyError = (error: any) =>   toast.error(error, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });

  /*const notifyWarn = (warn: any) => toast.warn(warn, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });*/

  const notifySucces = (succes: any) => toast.success(succes, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  useEffect(() => {
      document.title = "Connexion - Vatola Hotel";
    }, []);


  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    

    if (error) {
       if (error.message.includes("Invalid login credentials")) {
        toast.error("Mauvais email ou mot de passe, veuillez réessayer ou créer un compte.");
      } else if (error.message.includes("User not found")) {
        notifyError("Utilisateur non trouvé");
      } else {
        toast.error(error.message);
      }
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const redirect = searchParams.get('redirect');
      const redirectSanitized = redirect ? redirect.replace(/;/g, '&') : null;
      toast.success("Connexion")
      if (redirectSanitized) {
        navigate(redirectSanitized);
      } else {
        if (form.email === '/admin') {
          notifySucces("Wecolme Admin")
          navigate('/admin'); // Redirect to admin dashboard if user is admin
        } else {
          navigate('/profil'); // Redirect to user profile if not admin  
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className='mt-25 mb-5 mx-5 md:mx-30'>
      
      <SectionTitle
        title="Authentification"
        subtitle="Heureux de vous revoir ! Entrez vos informations de connexion ci-dessous."
        alignment="left"
      />
    
      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-1  gap-6 ">
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
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Votre Mot de passe*
            </label>
            <input
              type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} 
              id="password"
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
        {loading ? (
            <div className="col-span-2 flex items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent absolute top-0 left-0" style={{animationDuration: '0.8s'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <button type="submit" className="my-5 bg-accent hover:bg-gold-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 mr-5">Connexion</button>
          )
        }
        <a href="/singup" className="text-blue-500 hover:underline">
          Créer un compte ?
        </a>
        &nbsp;
        &nbsp;
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Mot de passe oublié ?
        </a>
      </form>
  </div>
    
  );
}
