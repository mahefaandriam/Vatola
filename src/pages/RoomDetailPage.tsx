import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link , useSearchParams} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';
import { CheckCircle2, Users, Calendar, CreditCard, Star, MapPin, Wifi, Car, Shield, Bath, Tv, Coffee } from 'lucide-react';
import { getRoomById } from '../../api/getRoomById';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useReservations } from '../context/ReservationContext';

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

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();
  const { setCount } = useReservations();

  const checkIn = searchParams.get('check_in');
  const checkOut = searchParams.get('check_out');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');  
  const goto = searchParams.get('goto');

  const fetchReservationCount = async () => {
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (error) {
      console.error('Erreur fetch reservations:', error.message);
      return 0;
    }
    
    if(!user){
      return 0;
    }

    return count;
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });    
    
    document.title = room ? `${room.name} - Détails de la chambre` : 'Détails de la chambre';
  }, []);

  useEffect(() => {

    if (goto === 'roomdetails' && loading === false) {
      const element = document.getElementById('roomdetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (goto === 'bookingSummary' && loading === false) {
      const element = document.getElementById('roomdetails');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

  }, [loading]);

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

    if (!showSummary) navigate(`/booking?selecttype=${room.type}`);

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
      toast.success("Merci, votre Réservation a été enregistrer avec succés, nous allons confirmer votre invitaion et vous repondre bientot !");

      const count = await fetchReservationCount();
      setCount(count ?? 0);

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

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={16} className="text-accent" />;
    if (amenityLower.includes('parking') || amenityLower.includes('voiture')) return <Car size={16} className="text-accent" />;
    if (amenityLower.includes('sécurisé') || amenityLower.includes('coffre')) return <Shield size={16} className="text-accent" />;
    if (amenityLower.includes('salle de bain') || amenityLower.includes('sanitaire')) return <Bath size={16} className="text-accent" />;
    if (amenityLower.includes('télé') || amenityLower.includes('tv')) return <Tv size={16} className="text-accent" />;
    if (amenityLower.includes('petit déjeuner') || amenityLower.includes('café')) return <Coffee size={16} className="text-accent" />;
    return <CheckCircle2 size={16} className="text-accent" />;
  };

  if (!room) {
    return (
      <>
        {loading 
          ? (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-200 mx-auto"></div>
                  <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2" style={{animationDuration: '0.8s'}}></div>
                </div>
                <p className="text-primary-800 font-medium mt-4">Chargement des détails de la chambre...</p>
              </div>
            </div>
          )
          : (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
              <motion.div 
                className="text-center bg-white rounded-2xl p-12 shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-gradient-to-r from-primary-600 to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary-800 mb-4">Chambre non trouvée</h2>
                <p className="text-gray-600 mb-8 text-lg">La chambre que vous recherchez n'existe pas ou a été supprimée.</p>
                <Link
                  to="/rooms"
                  className="inline-flex items-center bg-gradient-to-r from-accent to-primary-600 hover:from-primary-600 hover:to-accent text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Découvrir nos chambres
                </Link>
              </motion.div>
            </div>
          )
        }
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Booking Summary Section */}
      {showSummary && (
        <motion.div 
          id='bookingSummary'
          className="sticky top-0 z-40 bg-white border-b-4 border-accent shadow-lg"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="bg-gradient-to-r from-primary-50 via-white to-accent-50 rounded-xl p-6 border border-primary-100 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold bg-gradient-to-r from-primary-800 to-accent bg-clip-text text-transparent">
                    Récapitulatif de votre réservation
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '200px' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 bg-gradient-to-r from-accent to-primary-600 rounded-full mt-2"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { icon: <Star className="text-accent" size={20} />, label: 'Chambre', value: `${room.name} (${room.type})` },
                  { icon: <Calendar className="text-accent" size={20} />, label: 'Arrivée', value: checkIn },
                  { icon: <Calendar className="text-accent" size={20} />, label: 'Départ', value: checkOut },
                  { icon: <Users className="text-accent" size={20} />, label: 'Invités', value: `${adults} adultes, ${children} enfants` },
                  { icon: <CreditCard className="text-accent" size={20} />, label: 'Prix/nuit', value: `${room.price} Ar` },
                  { icon: <Users className="text-accent" size={20} />, label: 'Capacité', value: `${room.capacity} invités Max` }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="mr-3 p-2 bg-accent/10 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                      <p className="text-gray-800 font-semibold">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end">
                <motion.button
                  className="bg-gradient-to-r from-accent to-primary-600 hover:from-primary-600 hover:to-accent text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
                  onClick={handleConfirmBooking}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle2 size={20} />
                  <span>Confirmer Réservation</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Room Details Section */}
      <div id='roomdetails' className={`${showSummary ? 'pt-8' : 'pt-20'} pb-16`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            
            {/* Image Gallery - Enhanced */}
            <div className="xl:col-span-2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{ 
                    clickable: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-accent'
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  className="rounded-2xl overflow-hidden shadow-2xl group"
                  onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                >
                  {room.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative">
                        <img
                          src={image}
                          alt={`${room.name} - Image ${index + 1}`}
                          loading="lazy"
                          className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {activeImageIndex + 1} / {room.images.length}
                </div>
              </motion.div>

              {/* Room Description - Enhanced */}
              <motion.div
                className="mt-8 bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-primary-800">À propos de cette chambre</h2>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-accent fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{room.description}</p>
              </motion.div>

              {/* Amenities Section - Enhanced */}
              <motion.div
                className="mt-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="font-serif text-2xl font-bold text-primary-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-3">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                  Équipements & Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {room.amenities.map((amenity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-x-2 border border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="mr-3 p-2 bg-accent/10 rounded-full">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-700 font-medium">{amenity}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Booking Card - Enhanced */}
            <div className="xl:col-span-1">
              <motion.div
                className="sticky top-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Room Info Card */}
                <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100 mb-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary-600 to-accent"></div>
                  
                  <div className="text-center mb-6">
                    <h1 className="font-serif text-3xl font-bold bg-gradient-to-r from-primary-800 to-accent bg-clip-text text-transparent mb-2">
                      {room.name}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-gray-600">
                      <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                        {room.type}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {room.size && <>{room.size} m²</>}
                      </span>
                      <span className="flex items-center">
                        <Users size={16} className="mr-1" />
                        {room.capacity} invités Max
                      </span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
                    {room.price ? (
                      <>
                        <div className="text-4xl font-serif font-bold bg-gradient-to-r from-primary-800 to-accent bg-clip-text text-transparent">
                          {room.price} Ar
                        </div>
                        <div className="text-gray-500 font-medium">par nuitée</div>
                      </>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-primary-800 mb-2">
                          Prix sur demande
                        </div>
                        <div className="text-accent font-medium">
                          +261 34 11 937 77
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-accent to-primary-600 hover:from-primary-600 hover:to-accent text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
                    onClick={handleConfirmBooking}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {showSummary ? 'Confirmer Réservation' : 'Réservez Maintenant'}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    *Les prix peuvent varier en fonction de la saison et de la disponibilité. Taxes et frais non inclus.
                  </p>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl shadow-lg p-6 border border-primary-100">
                  <h4 className="font-serif text-lg font-bold text-primary-800 mb-4 text-center">Informations rapides</h4>
                  <div className="space-y-3">
                    {[
                      { icon: <Users size={18} className="text-accent" />, label: 'Capacité maximale', value: `${room.capacity} personnes` },
                      { icon: <MapPin size={18} className="text-accent" />, label: 'Superficie', value: room.size ? `${room.size} m²` : 'N/A' },
                      { icon: <Star size={18} className="text-accent" />, label: 'Catégorie', value: room.type },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors duration-300">
                        <div className="flex items-center">
                          <div className="mr-3 p-1 bg-accent/10 rounded-full">
                            {item.icon}
                          </div>
                          <span className="text-gray-700 font-medium text-sm">{item.label}</span>
                        </div>
                        <span className="text-primary-800 font-semibold text-sm">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Booking Form Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 via-white to-accent-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              title="Réserver votre séjour"
              subtitle="Découvrez le luxe et le confort de nos chambres en réservant votre séjour aujourd'hui."
            />
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary-600 to-accent rounded-t-2xl"></div>
            <BookingForm />
          </motion.div>
        </div>
      </section>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(0, 0, 0, 0.5) !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
        }
        
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #d4a574 !important;
        }
      `}</style>
    </div>
  );
};

export default RoomDetailPage;