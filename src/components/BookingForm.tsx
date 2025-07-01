import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Users, ChevronUp, ChevronDown } from 'lucide-react';
import type  { BookingDetails } from '../types';
import { supabase } from '../lib/supabaseClient';
import RoomCard from './RoomCard';

type Room = {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  size: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
};

const BookingForm: React.FC = () => {
  const [roomNames, setRoomNames] = useState<{ name: string, price: string }[] | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    roomType: '',
  });

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('name, price');
        if (error) {
          //console.error(error);
        } else {
          setRoomNames(data);
        }
      } catch (err) {
        //console.error(err);
      } 
    }

    fetchRooms();
  }, []);

  const handleInputChange = (field: keyof BookingDetails, value: any) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

      // Format dates to mm/dd/yyyy before passing to checkAvailability
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
     e.preventDefault();

    const rooms = await checkAvailability(
      formatDate(bookingDetails.checkIn),
      formatDate(bookingDetails.checkOut),
      bookingDetails.adults + bookingDetails.children
    );
    setAvailableRooms(rooms);
    setLoading(false);
  };

  const checkAvailability = async (startDate: any, endDate: any, peopleCount: any) => {
    // Charger toutes les chambres ayant la capacité suffisante
    const { data: allRooms } = await supabase
      .from('rooms')
      .select('*')
      .gte('capacity', peopleCount);

    if (!allRooms) return [];

    let filteredRooms = allRooms; 
    
 

    // Rechercher les chambres déjà réservées qui se chevauchent
    const { data: reservedRooms } = await supabase
      .from('bookings')
      .select('room_id')
      .or(`and(check_in.lte.${endDate},check_out.gte.${startDate})`)
      .not('status', 'eq', 'canceled');

    const reservedIds = reservedRooms?.map(r => r.room_id) ?? [];

    // Filtrer les chambres disponibles
    const filtredAvailableRooms = filteredRooms.filter(room => !reservedIds.includes(room.id));

    return filtredAvailableRooms;
  };

  const incrementGuest = (type: 'adults' | 'children') => {
    const maxGuests = type === 'adults' ? 4 : 3;
    if (bookingDetails[type] < maxGuests) {
      handleInputChange(type, bookingDetails[type] + 1);
    }
  };

  const decrementGuest = (type: 'adults' | 'children') => {
    const minGuests = type === 'adults' ? 1 : 0;
    if (bookingDetails[type] > minGuests) {
      handleInputChange(type, bookingDetails[type] - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-luxury p-6 md:p-8">
      <h3 className="font-serif text-2xl font-semibold text-primary-800 mb-6">Réserver votre séjour</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Check-in Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date d'arrivée</label>
            <div className="relative">
              <DatePicker
                selected={bookingDetails.checkIn}
                onChange={(date) => handleInputChange('checkIn', date)}
                selectsStart
                startDate={bookingDetails.checkIn}
                endDate={bookingDetails.checkOut}
                minDate={new Date()}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholderText="sélectionner la date"
              />
              <Calendar size={18} className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          {/* Check-out Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date de départ</label>
            <div className="relative">
              <DatePicker 
                selected={bookingDetails.checkOut}
                onChange={(date) => handleInputChange('checkOut', date)}
                selectsEnd
                startDate={bookingDetails.checkIn}
                endDate={bookingDetails.checkOut}
                minDate={bookingDetails.checkIn || new Date()}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholderText="sélectionner la date"
              />
              <Calendar size={18} className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Adults */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Adultes</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => decrementGuest('adults')}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
              >
                <ChevronDown size={18} />
              </button>
              <div className="flex items-center justify-center w-full py-2 px-3 border-t border-b border-gray-300">
                <Users size={18} className="text-gray-400 mr-2" />
                <span>{bookingDetails.adults}</span>
              </div>
              <button
                type="button"
                onClick={() => incrementGuest('adults')}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>
          
          {/* Children */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Enfants</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => decrementGuest('children')}
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
              >
                <ChevronDown size={18} />
              </button>
              <div className="flex items-center justify-center w-full py-2 px-3 border-t border-b border-gray-300">
                <Users size={18} className="text-gray-400 mr-2" />
                <span>{bookingDetails.children}</span>
              </div>
              <button
                type="button"
                onClick={() => incrementGuest('children')}
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
              >
                <ChevronUp size={18} />
              </button>
            </div>
          </div>
          
          {/* Room Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Type de chambre</label>
            <select
              value={bookingDetails.roomType}
              onChange={(e) => handleInputChange('roomType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Sélectionnez le type de chambre</option>
              {(roomNames ?? []).map(n => (
                <option key={n.name} value={n.name}>
                  {n.name} (${n.price}/nuitée)
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-accent hover:bg-gold-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!bookingDetails.checkIn || !bookingDetails.checkOut}
          style={{ cursor: !bookingDetails.checkIn || !bookingDetails.checkOut ? 'not-allowed' : 'pointer' }}
        >
          Réservez Maintenant
        </button>
      </form>

            
        <div id='roomList' className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {loading ? (
            <div className="col-span-2 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
            </div>
          ) : availableRooms.length > 0 ? (  
            availableRooms.map((room) => (
              <RoomCard key={room.id} room={room} checkIn={formatDate(bookingDetails.checkIn)} checkOut={formatDate(bookingDetails.checkOut)} adults={bookingDetails.adults} children={bookingDetails.children}/>
                ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">Pas de chambres correspondant à vos critères. S’il vous plaît ajuster vos filtres.</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default BookingForm;
