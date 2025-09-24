import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

type Booking = {
  id: number;
  check_in: string;
  check_out: string;
  status: string;
  profiles?: { name?: string } | null;
  rooms?: { name?: string } | null;
};

type WebReservation = {
  id: number;
  name: string;
  contact: string;
  room_type: string | null;
  people: number;
  extra_service: string | null;
  status?: string | null;
  created_at?: string | null;
};

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'web'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [webReservations, setWebReservations] = useState<WebReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'web') fetchWebReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, searchTerm, activeTab]);

  const fetchBookings = async () => {
    setLoading(true);

    let query = supabase
      .from('bookings')
      .select(`
        id,
        check_in,
        check_out,
        status,
        profiles (name),
        rooms (name)
      `);

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erreur chargement des réservations :', error.message);
      setBookings([]);
      setLoading(false);
      return;
    }

    const mapped = (data || []).map((booking: any) => ({
      ...booking,
      profiles: booking.profiles,
      rooms: Array.isArray(booking.rooms) ? booking.rooms[0] : booking.rooms,
    }));

    const filtered = mapped.filter((booking: any) =>
      (booking.profiles?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    setBookings(filtered);
    setLoading(false);
  };

  const fetchWebReservations = async () => {
    setLoading(true);
    let query = supabase
      .from('web_reservations')
      .select('id, name, contact, room_type, people, extra_service, status, created_at')
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Erreur chargement des réservations rapides :', error.message);
      setWebReservations([]);
      setLoading(false);
      return;
    }

    const filtered = (data || []).filter((r: any) =>
      (r.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    setWebReservations(filtered as WebReservation[]);
    setLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      fetchBookings();
    }
  };

  const updateWebStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('web_reservations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      fetchWebReservations();
    }
  };

  return (
    <div className='p-5'>
      <h2 className="text-2xl font-bold mb-4">Réservations</h2>

      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Réservations chambres
        </button>
        <button
          onClick={() => setActiveTab('web')}
          className={`px-4 py-2 rounded ${activeTab === 'web' ? 'bg-primary-800 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Réservations rapides (web)
        </button>
      </div>

      <div className="mb-4 flex items-center gap-4 ">
        <div className="mb-4">
          <label htmlFor="statusFilter" className="mr-2 font-medium">Filtrer par statut :</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-1 rounded"
          >
            <option value="all">Tous</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmée</option>
            <option value="processed">Traitée</option>
            <option value="canceled">Annulée</option>
          </select>
        </div>
        <div>
          <label htmlFor="searchTerm" className="mr-2 font-medium">Rechercher client :</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nom du client"
            className="border border-gray-300 px-3 py-1 rounded"
          />
        </div>
      </div>

      {loading ? (
        <LoadingComponents />
      ) : activeTab === 'bookings' ? (
        <div className='overflow-x-scroll'>
          <table className="min-w-200 border border-gray-300 bg-white overflow-x-scroll text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>Client</th>
                <th>Chambre</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td style={{ position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>{booking.profiles?.name || '—'}</td>
                  <td>{booking.rooms?.name || '—'}</td>
                  <td>{booking.check_in}</td>
                  <td>{booking.check_out}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        booking.status === 'confirmed'
                          ? 'bg-green-200 text-green-800'
                          : booking.status === 'canceled'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          if (confirm("Es-tu sûr de vouloir annuler cette réservation ?")) {
                            updateStatus(booking.id, 'canceled');
                          }
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Annuler
                      </button>
                    )}

                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'confirmed')}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        >
                          Confirmer
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Es-tu sûr de vouloir annuler cette réservation ?")) {
                              updateStatus(booking.id, 'canceled');
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='overflow-x-scroll'>
          <table className="min-w-200 border border-gray-300 bg-white overflow-x-scroll text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>Nom</th>
                <th>Contact</th>
                <th>Type de chambre</th>
                <th>Personnes</th>
                <th>Service complémentaire</th>
                <th>Statut</th>
                <th>Créée le</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {webReservations.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td style={{ position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>{r.name}</td>
                  <td>{r.contact}</td>
                  <td>{r.room_type || '—'}</td>
                  <td>{r.people}</td>
                  <td>{r.extra_service || '—'}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        r.status === 'processed'
                          ? 'bg-green-200 text-green-800'
                          : r.status === 'canceled'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {r.status || 'pending'}
                    </span>
                  </td>
                  <td>{r.created_at ? new Date(r.created_at).toLocaleString() : '—'}</td>
                  <td>
                    {(!r.status || r.status === 'pending') && (
                      <>
                        <button
                          onClick={() => updateWebStatus(r.id, 'processed')}
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                        >
                          Marquer traitée
                        </button>
                        <a
                          href={`tel:${r.contact}`}
                          className="bg-primary-800 text-white px-2 py-1 rounded mr-2 hover:bg-primary-700"
                        >
                          Appeler
                        </a>
                        <button
                          onClick={() => {
                            if (confirm("Confirmer l'annulation de cette demande ?")) {
                              updateWebStatus(r.id, 'canceled');
                            }
                          }}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Annuler
                        </button>
                      </>
                    )}
                    {r.status === 'processed' && (
                      <a
                        href={`mailto:${r.contact}`}
                        className="bg-primary-800 text-white px-2 py-1 rounded hover:bg-primary-700"
                      >
                        Envoyer un email
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
