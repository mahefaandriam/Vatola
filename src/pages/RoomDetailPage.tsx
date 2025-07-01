import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link , useSearchParams} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';
import { CheckCircle2 } from 'lucide-react';
import { getRoomById } from '../../api/getRoomById';
import Hero from '../components/Hero';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
//import { useForm } from "react-hook-form";

type Room = {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
};

/*type BookingFormInputs = {
  check_in: string;
  check_out: string;
};*/

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const checkIn = searchParams.get('check_in');
  const checkOut = searchParams.get('check_out');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');  

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) {
        setRoom(null);
        return;
      }
      try {
        const numericId = Number(id);
        if (isNaN(numericId)) {
          setRoom(null);
          return;
        }
        const data = await getRoomById(numericId);
        setRoom(data);
      } catch (error) {
        //console.error('Error fetching room:', error);
        setRoom(null);
      }
      setLoading(false);
    };

    fetchRoom();


    if (checkIn && checkOut) {
      setShowSummary(true)
    }

  }, [id]);

  const handleConfirmBooking = async () => {
    if (!user) {    
      // rediriger vers la page login
      navigate(`/login?redirect=/rooms/${id}?check_in=${encodeURIComponent(checkIn || '')};check_out=${encodeURIComponent(checkOut|| ''
                  )};adults=${adults ?? ''};children=${children ?? ''}`);
      return;
    }

    if (!room) {
      alert("Aucune chambre sélectionnée pour la réservation.");
      return;
    }

    if (!showSummary) navigate('/booking');


    let nights = 0;
    let totalPrice = 0;
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
        nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24);
        nights = Math.max(0, nights);
        totalPrice = nights * room.price;
      }
    }

    const { error } = await supabase.from('bookings').insert({
      room_id: room.id,
      check_in: checkIn,
      check_out: checkOut,
      status: 'pending',
      people: (parseInt(adults ?? '0', 10) + parseInt(children ?? '0', 10)),
      night: nights,
      total_price: totalPrice,
      user_id: user.id
    });

    if (!error) {
      alert("Merci, votre Réservation a été enregistrer avec succés, nous allons confirmer votre invitaion et vous repondre bientot !");
      setShowSummary(false);
      navigate(`/rooms/${id}`);
      // Envoi de la notification
      await supabase.from('notifications').insert([
      {
        type: 'booking',
        message: `Nouvelle réservation de ${user.name} pour ${room.name}`,
        data: {
          user_id: user.id,
          email: user.email,
          checkIn,
          checkOut,
          adults: parseInt(adults ?? '0', 10),
          children: parseInt(children ?? '0', 10),
          totalPrice,
          room: room.name,
        },
      },
    ]);
    }
  };

  if (!room) {
    return (
      <>
        {loading 
          ? (
            <div className="h-150 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
            </div>
          )
          : (
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
          )
        }

      </>
    );
  }
  
  return (
    <div>
      <Hero 
      title={room.name}
      subtitle={`Notre ${room.name} spacieuse de  ${room.size}m² est conçue pour le confort et la commodité.`}
      image={room.images[0]}
      ctaText='Détails'
      ctaLink='#roomdetails'
      ctaBgNone={true}
      height="h-[80vh]"
      />
      
      <div id='roomdetails' className="pt-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 pb-10">
          { showSummary && (
              <div id='bookingSummary' className="flex items-center mb-10 py-5 border border-accent px-5 rounded">
                  <div className="mb-8 h-50 w-full ">
                      <h3 className="font-serif text-xl font-semibold text-primary-800 mb-1">Récapitulatif de votre réservation</h3>
                      <div className='w-full '>
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: '150px' }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className={`h-1 bg-accent mr-auto mb-4`}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Chambre :</strong> {room.name} ({room.type})</span>
                      </div>
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Date d’arrivée :</strong> {checkIn}</span>
                      </div>
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Date de départ :</strong> {checkOut}</span>
                      </div>
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Nombre de personnes :</strong>Adultes: {adults}, Enfants: {children}</span>
                      </div>
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Prix par nuit :</strong> {room.price} $</span>
                      </div>
                      <div className="flex items-center">
                          <CheckCircle2 size={16} className="text-accent mr-2" />
                          <span className="text-gray-600"><strong>Capacité :</strong> {room.capacity} invités Max</span>
                      </div>
                    </div>
                      <div className='flex justify-between items-center w-full'>
                        <div >
                        </div>
                        <button
                          className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300 right-0"
                          onClick={handleConfirmBooking}
                          >
                          Confirmer Réservation
                        </button>
                    </div>
                  </div>
                
              </div>          
            )}
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
                loading="lazy"
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
                
                {showSummary ? (
                    <button
                      className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                      onClick={handleConfirmBooking}
                      >
                      Confirmer Réservation
                    </button>
                ) : (
                  <button
                  className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                  onClick={handleConfirmBooking}
                  >
                  Réservez Maintenant
                  </button>
                )}
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