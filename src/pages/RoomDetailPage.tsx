import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';
import { rooms } from '../data/rooms';
import { CheckCircle2 } from 'lucide-react';

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const room = rooms.find(room => room.id === id);
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-semibold text-primary-800 mb-4">Chambre non trouvée</h2>
          <p className="text-gray-600 mb-6">La chambre que vous recherchez n’existe pas.</p>
          <Link
            to="/rooms"
            className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
          >
            Afficher toutes les chambres
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="pt-24 md:pt-28 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={true}
                className="rounded-lg overflow-hidden"
              >
                {room.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${room.name} - Image ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-800 mb-2">
                {room.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  {room.type}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">
                  {room.size} m² • {room.capacity} invités Max
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{room.description}</p>
              
              <div className="mb-8">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Chambres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle2 size={16} className="text-accent mr-2" />
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-luxury p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="font-serif text-2xl font-bold text-primary-800">${room.price}</span>
                    <span className="text-gray-500"> / nuitée</span>
                  </div>
                  <Link
                    to="/booking"
                    className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                  >
                    Réservez Maintenant
                  </Link>
                </div>
                <p className="text-sm text-gray-500">
                 *Les prix peuvent varier en fonction de la saison et de la disponibilité. Taxes et frais non inclus.
                </p>
              </div>  
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Réserver votre séjour"
            subtitle="Découvrez le luxe et le confort de nos chambres en réservant votre séjour aujourd’hui."
          />
          
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetailPage;