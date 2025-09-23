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
  const [priceRange, setPriceRange] = useState(1000450);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        setRooms(data);
        // Apply initial filter after rooms are fetched
        setFilteredRooms(data.filter(room => room.price <= priceRange));
        setLoading(false);
      } catch (err) {
        console.error(err);
      } 
    }

    fetchRooms();

    document.title = 'Nos Chambres - Vatola Hotel';
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
        title="Nos Chambres"
        subtitle="Découvrez nos chambres conçue pour votre confort et un moment de détente inégalable."
        image="/familiales.webp"
        height="h-[70vh]"
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Explorez nos chambres"
            subtitle="Chaque chambre au sein de notre hôtel est conçue pour satisfaire vos besoins et vous assurez un séjour apaisant."
          />

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">Tarifs & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="mb-2"><strong>Chambre standard (simple/double)</strong> — Veuillez nous contacter pour toute information complémentaire&nbsp;: +261 34 11 937 77</p>
                <p className="mb-2"><strong>Chambre twin (2 petits lits)</strong> — 145 000 Ar (tarif susceptible de varier, contactez-nous)</p>
                <p className="mb-2"><strong>Chambre familiale 3 pers.</strong> — 175 000 Ar (tarif susceptible de varier)</p>
                <p className="mb-2"><strong>Chambre familiale 4 pers.</strong> — 205 500 Ar (tarif susceptible de varier)</p>
                <p className="mb-2"><strong>Chambre familiale 5 pers.</strong> — 255 000 Ar (tarif susceptible de varier)</p>
                <p className="mb-2"><strong>Chambre familiale 8 pers.</strong> — 315 500 Ar (tarif susceptible de varier)</p>
                <p className="mb-2"><strong>Suite 1/2 personnes</strong> — 315 500 Ar (tarif fixe)</p>
              </div>
              <div>
                <p className="mb-2"><strong>Services compris (selon les chambres)</strong> :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Accès au parking intérieur sécurisé</li>
                  <li>Coffre-fort sécurisé</li>
                  <li>Télévision en chambre avec Canal +</li>
                  <li>Wifi (standard ou exclusif selon catégorie)</li>
                  <li>Accès piscine</li>
                  <li>Sanitaires privatifs, eau chaude</li>
                  <li>Cadre exceptionnel</li>
                  <li>Chambre chauffeur gratuite (selon conditions)</li>
                  <li>Berceau sur demande (gratuit)</li>
                  <li>Décoration/champagne sur demande</li>
                </ul>
              </div>
            </div>
          </div>

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
              
              {/*
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
              */}
            </div>
          </div>
          
          {loading ? (
            <div className="col-span-2 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
            </div>
          ) :( 
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
          )};
        </div>
      </section>
    </div>
  );
};

export default RoomsPage;
