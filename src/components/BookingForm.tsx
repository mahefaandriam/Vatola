import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Users, ChevronUp, ChevronDown } from 'lucide-react';
import type  { BookingDetails } from '../types';
import { rooms } from '../data/rooms';

const BookingForm: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: null,
    checkOut: null,
    adults: 1,
    children: 0,
    roomType: '',
  });

  const handleInputChange = (field: keyof BookingDetails, value: any) => {
    setBookingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission - in a real app this would connect to a booking API
    console.log('Booking submitted:', bookingDetails);
    alert('Thank you for your booking request! Our team will contact you shortly to confirm your reservation.');
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
              {rooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.name} (${room.price}/nuitée)
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-accent hover:bg-gold-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
        >
          Réservez Maintenant
        </button>
      </form>
    </div>
  );
};

export default BookingForm;