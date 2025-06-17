// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [_, setFullName] = useState('');
  const [profile, setProfile] = useState({ name: '', surname: '', birthday: '' });
  const [bookings, setBookings] = useState<any>([]);
 // const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/login');
        return;
      }
      setUser(user);
      loadProfile(user.id);
      loadBookings(user.id);
     // setEmail(user.email ?? '');

      const { data: profile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (profile) setFullName(profile.name);
    };

    getUser();
  }, []);

  const loadBookings = async (userId: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        check_in,
        check_out,
        total_price,
        status,
        rooms ( type )
      `)
      .eq('user_id', userId)
      .order('check_in', { ascending: false });
    if (data && !error) setBookings(data);
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
      .from('reservations')
      .update({ status: 'Annulée' })
      .eq('id', bookingId);

    if (!error) {
      alert("Réservation annulée.");
      loadBookings(user.id); // recharge les données
    } else {
      alert("Erreur lors de l’annulation.");
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

    if (!error) alert("Profil mis à jour !");
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-4">Mon Profil</h2>
      <label>Nom</label>
      <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />

      <label>Prénom</label>
      <input value={profile.surname} onChange={e => setProfile({ ...profile, surname: e.target.value })} />

      <label>Date de naissance</label>
      <input type="date" value={profile.birthday} onChange={e => setProfile({ ...profile, birthday: e.target.value })} />

      <label>Email</label>
      <input value={user?.email} disabled />

      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white p-2 rounded">Mettre à jour</button>
    
      <a href="/forgot-password" className="text-blue-500 hover:underline">
        Mot de passe oublié ?
      </a>

      <h3 className="text-lg font-semibold mt-6 mb-2">Mes réservations</h3>

      {bookings.length === 0 ? (
        <p>Aucune réservation pour le moment.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Chambre</th>
              <th className="p-2 text-left">Début</th>
              <th className="p-2 text-left">Fin</th>
              <th className="p-2 text-left">Prix</th>
              <th className="p-2 text-left">Statut</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b: any) => {
              const now = new Date();
              const start = new Date(b.check_in);
              const timeDiff = start.getTime() - now.getTime();
              const isMoreThan24h = timeDiff > 24 * 60 * 60 * 1000;
              return(
              <tr key={b.id}>
                <td className="p-2">{b.rooms?.type || '—'}</td>
                <td className="p-2">{b.check_in}</td>
                <td className="p-2">{b.check_out}</td>
                <td className="p-2">{b.total_price} €</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">
                    {isMoreThan24h && (b.status === 'confirmed' || b.status === 'pending') && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Annuler
                    </button>
                    )}
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
