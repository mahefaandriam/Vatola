import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';
import { getRooms } from '../../api/getRooms';

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

const RoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [priceRange, setPriceRange] = useState(450);
  
  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
        // Apply initial filter after rooms are fetched
        setFilteredRooms(data.filter(room => room.price <= priceRange));
      } catch (err) {
        console.error(err);
      } 
    }

    fetchRooms();
  }, []);

  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      if (value === 'all') {
        setFilteredRooms(rooms.filter(room => room.price <= priceRange));
      } else {
        setFilteredRooms(rooms.filter(room => room.type === value && room.price <= priceRange));
      }
    } else if (name === 'priceRange') {
      const priceValue = parseInt(value);
      setPriceRange(priceValue);
      setFilteredRooms(rooms.filter(room => {
        const typeFilter = document.getElementById('type') as HTMLSelectElement;
        const selectedType = typeFilter.value;
        return (selectedType === 'all' || room.type === selectedType) && room.price <= priceValue;
      }));
    }
  };
  
  return (
    <div>
      <Hero
        title="Nos hébergements"
        subtitle="Découvrez notre gamme de chambres et suites élégamment aménagées, conçues pour votre confort et votre détente."
        image="/familiales.webp"
        height="h-[70vh]"
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Explorez nos chambres"
            subtitle="Chaque chambre du VATOLA LUXY HOTEL est soigneusement conçue pour offrir le summum en matière de confort et de luxe."
          />
          
          <div className="bg-white rounded-lg shadow-luxury p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                  Type de chambre
                </label>
                <select
                  id="type"
                  name="type"
                  onChange={handleFilterChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="all">Tous les types de chambre</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="priceRange" className="block text-gray-700 font-medium mb-2">
                  Prix Maximum: ${priceRange}
                </label>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="50"
                  max="500"
                  step="10"
                  value={priceRange}
                  onChange={handleFilterChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$50</span>
                  <span>$500</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">Pas de chambres correspondant à vos critères. S’il vous plaît ajuster vos filtres.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;