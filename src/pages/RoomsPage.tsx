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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero
        title="Nos Chambres"
        subtitle="Découvrez nos chambres conçue pour votre confort et un moment de détente inégalable."
        image="/familiales.webp"
        height="h-[70vh]"
      />
      
      <section className="py-20 relative overflow-hidden">
        {/* Animated background elements - LES ÉLÉMENTS RONDS SUPPRIMÉS ICI */}
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="animate-fadeInUp">
            <SectionTitle
              title="Explorez nos chambres"
              subtitle="Chaque chambre au sein de notre hôtel est conçue pour satisfaire vos besoins et vous assurez un séjour apaisant."
            />
          </div>

          {/* Enhanced pricing section with professional styling */}
          <div className="relative group mb-12 animate-slideInLeft">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-accent to-primary-800 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
            <div className="relative bg-white rounded-xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-primary-800 to-primary-600 bg-clip-text text-transparent">
                  Tarifs & Services
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-primary-600 to-accent rounded-full animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-primary-600 hover:border-accent transition-all duration-300 hover:shadow-md transform hover:translate-x-2">
                    <p className="text-gray-800 leading-relaxed">
                      <span className="font-semibold text-primary-800">Chambre standard (simple/double)</span> 
                      <br />
                      <span className="text-sm text-gray-600">Veuillez nous contacter pour toute information complémentaire : </span>
                      <span className="font-medium text-accent">+261 34 11 937 77</span>
                    </p>
                  </div>
                  
                  {[
                    { type: "Chambre twin (2 petits lits)", price: "145 000 Ar" },
                    { type: "Chambre familiale 3 pers.", price: "175 000 Ar" },
                    { type: "Chambre familiale 4 pers.", price: "205 500 Ar" },
                    { type: "Chambre familiale 5 pers.", price: "255 000 Ar" },
                    { type: "Chambre familiale 8 pers.", price: "315 500 Ar" },
                    { type: "Suite 1/2 personnes", price: "315 500 Ar (tarif fixe)" }
                  ].map((room, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border-l-4 border-primary-600 hover:border-accent transition-all duration-300 hover:shadow-md transform hover:translate-x-2" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary-800">{room.type}</span>
                        <span className="font-bold text-accent bg-accent/10 px-3 py-1 rounded-full text-sm">
                          {room.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">tarif susceptible de varier</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-br from-primary-50 to-accent/5 rounded-lg p-6 border border-primary-100">
                  <h4 className="font-semibold text-primary-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-accent rounded-full mr-3 animate-pulse"></div>
                    Services compris (selon les chambres)
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Accès au parking intérieur sécurisé",
                      "Coffre-fort sécurisé",
                      "Télévision en chambre avec Canal +",
                      "Wifi (standard ou exclusif selon catégorie)",
                      "Accès piscine",
                      "Sanitaires privatifs, eau chaude",
                      "Cadre exceptionnel",
                      "Chambre chauffeur gratuite (selon conditions)",
                      "Berceau sur demande (gratuit)",
                      "Décoration/champagne sur demande"
                    ].map((service, index) => (
                      <li key={index} className="flex items-center text-gray-700 hover:text-primary-800 transition-colors duration-300 group">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced filter section */}
          <div className="relative group mb-12 animate-slideInRight">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent via-primary-600 to-accent rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-x"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-gray-700 font-semibold mb-3 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary-600 to-accent rounded-full mr-3"></div>
                    Type de chambre
                  </label>
                  <div className="relative group">
                    <select
                      id="type"
                      name="type"
                      onChange={handleFilterChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-primary-500 hover:border-primary-400 transition-all duration-300 bg-gradient-to-r from-white to-gray-50 appearance-none cursor-pointer font-medium text-gray-800 group-hover:shadow-md"
                    >
                      <option value="all">Tous les types de chambre</option>
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-5 h-5 text-primary-600 group-hover:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <div className="w-full h-12 bg-gradient-to-r from-primary-100 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <span className="text-primary-800 font-medium ml-3">Filtres disponibles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="col-span-2 flex items-center justify-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent absolute top-0 left-0" style={{animationDuration: '0.8s'}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => (
                  <div 
                    key={room.id} 
                    className="animate-fadeInUp hover:animate-pulse-gentle"
                    style={{animationDelay: `${index * 150}ms`}}
                  >
                    <RoomCard room={room} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 via-accent/20 to-primary-600/20 rounded-full blur-lg animate-pulse"></div>
                    <div className="relative bg-white rounded-lg p-8 shadow-xl border border-gray-100">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-lg font-medium">Pas de chambres correspondant à vos critères</p>
                      <p className="text-gray-500 text-sm mt-2">S'il vous plaît ajuster vos filtres.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default RoomsPage;