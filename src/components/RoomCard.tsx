import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Coffee, User, Maximize } from 'lucide-react';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  checkIn?: string | Date | null;
  checkOut?: string | Date | null;
  adults?: number;
  children?: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, checkIn, checkOut, adults, children}) => {
  const { id, name, description, price, size, capacity, images } = room;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-luxury transform hover:scale-105 transition duration-300">
      <div className="relative">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-64 object-cover"
        />
        {room.featured && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
            Sélection spéciale
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">{name}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Maximize size={16} className="mr-1 text-accent" />
            <span>{size} m²</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-1 text-accent" />
            <span>{capacity} invités Max</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Wifi size={16} className="mr-1 text-accent" />
            <span>Wifi gratuit</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Coffee size={16} className="mr-1 text-accent" />
            <span>Petit déjeuner</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-primary-800">
            <span className="font-semibold text-xl">${price}</span>
            <span className="text-sm text-gray-500"> / nuitée</span>
          </div>
          
          {
            checkIn && checkOut ? (
              <div>
                <div className="text-sm text-gray-500 mb-5">
                  {`Réservé du ${checkIn} au ${checkOut}`}
                </div>
                <Link
                  to={`/rooms/${id}?check_in=${encodeURIComponent(
                  typeof checkIn === 'string' ? checkIn : checkIn?.toISOString() || ''
                  )}&check_out=${encodeURIComponent(
                  typeof checkOut === 'string' ? checkOut : checkOut?.toISOString() || ''
                  )}&adults=${adults ?? ''}&children=${children ?? ''}`}
                  className=" bg-primary-800 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Réserver
                </Link>
              </div>
              
            ) : (

            <Link
              to={`/rooms/${id}#roomDetails`}
              className="bg-primary-800 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Afficher les détails
            </Link>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RoomCard;