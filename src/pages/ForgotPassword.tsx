import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // ajuste le chemin si besoin
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
      document.title = "Mot de passe oublié - Vatola Hotel";
    }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        notifyWarn('Veuillez vous deconnecté! Avant Faire cette opération.')
        navigate('/profil');
      }
    };
    checkSession();
  }, [navigate]);

 /* const notifyError = (error: any) =>   toast.error(error, {
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

  const notifyWarn = (warn: any) => toast.warn(warn, {
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

 /* const notifySucces = (succes: any) => toast.success(succes, {
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://vatola.vercel.app/update-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-4 max-w-md mx-2 md:mx-auto mt-30 border-1 rounded border-accent mb-10">

      <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6">Mot de passe oublié</h3>
      <p className="text-gray-600 mb-6">
        Entrez votre adresse emails en toute confidentialité.
      </p>
      <p className="text-gray-600 text-sm mb-6">
        Pour des raisons de sécurité, veuillez entrer l'adresse email liée à votre compte. Une lien de réinitialisation vous sera envoyé
        par email dans les plus brefs délais.
         Cette information est nécessaire pour vérifier votre indentité et garantir la sécurité de votre compte.
      </p>

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
