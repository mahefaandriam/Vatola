// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';
import SectionTitle from '../components/SectionTitle';
import { toast } from 'react-toastify';

type Booking = {
  id: number;
  check_in: string;
  check_out: string;
  people: string;
  night: string;
  created_at: string;
  status: string;
  total_price: string
  profiles?: {
    name?: string;
    email?: string; 
    phone?: string; // ← ajouté ici
  } | null;
  rooms?: { name?: string , type?: string} | null;
};


export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', surname: '', birthday: '' });
    const [bookings, setBookings] = useState<Booking[]>([]);
  // const [email, setEmail] = useState('');

  useEffect(() => {
    loadProfile(user.id);
    loadBookings(user.id);

    document.title = 'Mon Profil - Vatola Hotel';
  }, []);

  const loadBookings = async (userId: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        check_in,
        check_out,
        people,
        night,
        total_price,
        status,
        created_at,
        rooms ( type )
      `)
      .eq('user_id', userId)
      .order('check_in', { ascending: false });
    if (data && !error) {
      const formatted = data.map((booking: any) => ({
        ...booking,
        created_at: new Date(booking.created_at)
          .toISOString()
          .slice(0, 16)
          .replace('T', ' ')
      }));

      setBookings(formatted)
    }
  };

  const loadProfile = async (userId: any) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  };

  const handleCancel = async (bookingId: any) => {
    const confirmation = confirm("Voulez-vous vraiment annuler cette réservation ? Nb: les renboursements sont en accord avec les conditions générales de réservation.");
    if (!confirmation) return;

    const { error } = await supabase
      .from('bookings')
      .update({ status: 'Annulée' })
      .eq('id', bookingId);

    if (!error) {
      toast.success("Réservation annulée.");
      loadBookings(user.id); // recharge les données
    } else {
      toast.error("Erreur lors de l’annulation.");
    }
  };

  const handleSave = async () => {
    if (!user) return;

    // Email update
    /*if (email !== user.email) {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) alert("Erreur lors du changement d'email.");
      else alert('Un email de confirmation a été envoyé.');
    }*/

    // Full name update
    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);

    if (!error) toast.success("Profil mis à jour !");
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="md:mx-10 p-6 mt-25 ">
      <SectionTitle
        title="Informations du compte"
        subtitle="Nous aimerions avoir de vos nouvelles. Veuillez remplir le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais."
        alignment="left"
      />
      <div >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Votre Nom*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="prenom" className="block text-gray-700 font-medium mb-2">
                Votre Prénom*
              </label>
              <input
                type="prenom"
                id="prenom"
                name="prenom"
                value={profile.surname} onChange={e => setProfile({ ...profile, surname: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={user?.email} disabled
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="naissance" className="block text-gray-700 font-medium mb-2">
                Date de naissance
              </label>
              <input
                id="naissance"
                name="naissance"
                type="date"
                value={profile.birthday} onChange={e => setProfile({ ...profile, birthday: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe*
            </label>
            <input
              id="password"
              name="password"
              required
              disabled
              value={'****************'}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent cursor-not-allowed"
            ></input>
            <a href="/update-password" className="text-blue-500 underline">
              Changer Mot de passe ?
            </a>
          </div>

          <button
            onClick={handleSave}
            className="bg-accent hover:bg-gold-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 mr-5"
          >
            Mettre à jour
          </button>
          <LogoutButton />
        </div>
      </div>
      <div className='col-span-1 '>
        <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6">Mes réservations</h3>
        {bookings.length === 0 ? (
          <p>Aucune réservation pour le moment.</p>
        ) : (
          <table className="w-full border border-accent/30 text-xs rounded-xl shadow-sm overflow-hidden">
            <thead>
              <tr className="bg-accent text-white">
                <th className="p-3 text-left font-semibold">Chambre</th>
                <th className="p-3 text-left font-semibold">Début</th>
                <th className="p-3 text-left font-semibold">Fin</th>
                <th className="p-3 text-left font-semibold">Personnes</th>
                <th className="p-3 text-left font-semibold">Nuit</th>
                <th className="p-3 text-left font-semibold">Prix</th>
                <th className="p-3 text-left font-semibold">Statut</th>
                <th className="p-3 text-left font-semibold">Créé le</th>
                <th className="p-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const now = new Date();
                const start = new Date(booking.check_in);
                const timeDiff = start.getTime() - now.getTime();
                const isMoreThan24h = timeDiff > 24 * 60 * 60 * 1000;

                return (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3">{booking.rooms?.type || '—'}</td>
                    <td className="p-3">{booking.check_in}</td>
                    <td className="p-3">{booking.check_out}</td>
                    <td className="p-3">{booking.people}</td>
                    <td className="p-3">{booking.night}</td>
                    <td className="p-3 font-medium text-gray-800">{booking.total_price} Ar</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : booking.status === 'canceled'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {booking.status === 'confirmed'
                          ? 'Confirmé'
                          : booking.status === 'pending'
                            ? 'En attente'
                            : booking.status === 'canceled'
                              ? 'Annulé'
                              : booking.status}
                      </span>
                    </td>
                    <td className="p-3">{booking.created_at}</td>
                    <td className="p-3">
                      {isMoreThan24h && (booking.status === 'confirmed' || booking.status === 'pending') && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors duration-200 shadow-sm"
                        >
                          Annuler
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        )}
      </div>
    </div>
  );
}
