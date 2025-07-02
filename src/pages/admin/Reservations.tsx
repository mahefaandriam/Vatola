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

export default function Reservations() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchBookings();
    }, [statusFilter, searchTerm]);

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
      
    // Apply status filter if not 'all'
    if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    
    if (data) {
      // Map rooms to a single object (first element) and filter by search term
      const mapped = data.map((booking: any) => ({
        ...booking,
        profiles: booking.profiles,
        rooms: Array.isArray(booking.rooms) ? booking.rooms[0] : booking.rooms,
      }));

    const filtered = mapped.filter(booking =>
      booking.profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

      setBookings(filtered);
    } else {
      console.log("")
    }

    if (error) {
      console.error('Erreur chargement des réservations :', error.message);
    }

    
    setLoading(false);
      console.log(bookings);
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
            fetchBookings(); // refresh data
        }
    };
    

  return (
    <div className='p-5'>    
      <h2 className="text-2xl font-bold mb-4">Liste des Réservations</h2>
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
      ) : (
        <div className='overflow-x-scroll'>
          <table className="min-w-200 border border-gray-300 bg-white overflow-x-scroll text-sm">
            <thead>
              <tr className="bg-gray-100">
                  <th >Client</th>
                  <th >Chambre</th>
                  <th >Début</th>
                  <th >Fin</th>
                  <th >Statut</th>
                  <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td  style={{ position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>{booking.profiles?.name || '—'}</td>
                  <td >{booking.rooms?.name || '—'}</td>
                  <td >{booking.check_in}</td>
                  <td >{booking.check_out}</td>
                  <td >
                      <span
                      className={`px-2 py-1 text-sm rounded 
                          ${
                          booking.status === 'confirmed'
                              ? 'bg-green-200 text-green-800'
                              : booking.status === 'canceled'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                      {booking.status}
                      </span>
                  </td><td >
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
      )}
    </div>
  );
}
