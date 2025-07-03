import { useState } from 'react';
import { motion } from 'framer-motion';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';
//import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import BookingForm from '../components/BookingForm';
//import { pubServices, spaServices, nailServices } from '../data/services';
import { testimonials } from '../data/testimonials';
import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

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

const HomePage: React.FC = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const [loadingFeaturedRooms, setLoadingFeaturedRooms] = useState(true);

  // Zoom effet section :Services & commodités exceptionnels

  const customPagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span key='+ index +' class="' + className + '" style="display:inline-block;width:60px;height:4px;border-radius:2px;background:#2563eb;margin:-15px 4px;"></span>';
    },
  };

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      const { data, error } = await supabase
        .from('rooms')
        .select('*');
        //.eq('featured', true);

      if (!error && data) {
        setFeaturedRooms(data as Room[]);
      }
      setLoadingFeaturedRooms(false);
    };
    fetchFeaturedRooms();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
       {/* Experience Unparalleled Luxury*/}
      <Hero
        title="Vatola Antsirabe - Votre havre à Antsirabe"
        subtitle="Élégance, confort et service exceptionnel : vivez l’expérience unique de l’HÔTEL VATOLA."
        image="/vatola.jpg"
        ctaText="Réservez Votre Séjour dès maintenant"
        ctaLink="/booking"
      />
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Bienvenue à HÔTEL VATOLA"
                subtitle=""
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
               L’HÔTEL VATOLA incarne la quintessence de la sophistication et de l’hospitalité. Dans un cadre raffiné, notre établissement offre un véritable sanctuaire où le luxe contemporain s’harmonise avec un charme intemporel, pour offrir à chaque client une expérience mémorable.
              </p>
              <p className="text-gray-600 mb-6">
                Niché dans la charmante ville thermale d'Antsirabe, Le Vatola Antsirabe est bien plus qu'un hôtel - c'est une expérience raffinée mêlant confort, élégance et hospitalité malgache. Inspiré par l'authenticité des Hautes Terres et rehaussé d'une touche de modernité, notre 
                établissement vous invite à un séjour inoubliable dans un cadre apaisant et soigné.                
              </p>
             <p className="text-gray-600 mb-6">
                Que vous soyez en escapade romantique, en voyage d'affaires ou à la recherche d'un moment de détente, Vatola vous accueille dans un univers où chaque détail est pensé pour votre bien-être.
              </p>
              <div>
                <p className="text-gray-600 mb-6">Ce qui fait notre différence:</p>
                  <ul className="list-disc text-gray-600 mb-6 ml-5">
                    <li>Chambres élégantes & confortables, soigneusement décorées pour allier modernité et ambiance chaleureuse.</li>
                    <li>Espaces bien-être haut de gamme: spa, soins corporels, manucure & plus de 15 options de soins.</li>
                    <li>Restaurants & bars raffinés, proposant une cuisine locale et internationale, ainsi que des cocktails signature.</li>
                    <li>Service de concierge 24/7, pour répondre à toutes vos envies à tout moment.</li>
                  </ul>  
              </div>
              
            </motion.div>
            
            <div className='relative'>
              <img
                src="/clients1.webp"
                alt="Hotel Lobby"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {/* <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent rounded-lg hidden md:block">
                <img
                  src="/plat1.webp"
                  loading="lazy"
                  alt="Hotel Detail"
                  className="w-full h-full object-cover rounded-lg transform translate-x-4 translate-y-4 shadow-lg"
                />
              </div>*/}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Rooms Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Hébergements"
            subtitle="Parcourez notre collection de chambres et suites, pensées avec soin pour marier confort moderne et élégance intemporelle."
          />
          
          <div className="">
            {loadingFeaturedRooms 
            ? (
              <div className="col-span-1 md:col-end-2 lg:col-span-3 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800"></div>
              </div>
            ) : (

             <Swiper
              pagination={customPagination}
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className='roomCard-swiper'
            >
              {featuredRooms.map((room) => (
                <SwiperSlide key={room.id}>                
                    <RoomCard room={room} />
                </SwiperSlide>
              ))}
            </Swiper>
            )}
          </div>
          
        </div>
      </section>
      
      {/* Services Highlights 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Services & commodités"
            subtitle="Bénéficiez de services haut de gamme, soigneusement pensés pour sublimer votre séjour et vous garantir un confort inégalé."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Pub & Bar 
            <div
              className="text-center"
            >
              <div className="mb-6 mx-auto rounded-full bg-primary-50 p-4 w-30 h-30 hover:w-50 hover:h-50 transition-all duration-1000 flex items-center justify-center" onMouseEnter={() => setAddZomm(true)} onMouseLeave={() => setAddZomm(false)}>
                <img
                  src="pub.jpg"
                  alt="Pub Icon"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
                Luxueux pub & bar
              </h3>
              <p className="text-gray-600 mb-4">
                Détendez-vous dans notre pub sophistiqué proposant des cocktails artisanaux, des vins fins et des en-cas gastronomiques dans une ambiance élégante.
              </p>
              <a
                href="/pub"
                className="text-accent hover:text-gold-700 font-medium inline-flex items-center transition duration-300"
              >
                Découvrir plus &nbsp;
                <ChevronRight stroke='currentColor' />
              </a>
            </div>
            
            {/* Nail Salon 
            <div
              className="text-center"
            >
              <div className={`mb-6 mx-auto rounded-full bg-primary-50 p-4   transition-all duration-1000 flex items-center justify-center 
                        ${addZoom ? 'w-16 h-16' : 'w-50 h-50'}
                  `}>
                <img
                  src="resto2.webp"
                  alt="Reslto Plats"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
              Restaurant & Cuisine raffinée
              </h3>
                <p className="text-gray-600 mb-4">
                  Découvrez une carte diversifiée, pensée pour satisfaire toutes les envies, incluant des options végétariennes et des plats adaptés à tous les goûts.<br />
                  Notre restaurant vous propose un voyage culinaire à travers des spécialités italiennes, malgaches, françaises, allemandes et bien d’autres, pour une expérience gastronomique riche et variée.
                </p>
              <a
                href="/nail-salon"
                className="text-accent hover:text-gold-700 font-medium inline-flex items-center transition duration-300"
              >
                Découvrir plus &nbsp;                
                <ChevronRight stroke='currentColor' />
              </a>
            </div>

            {/* Spa & Wellness *
            <div
              className="text-center"
            >
              <div 
                   className="mb-6 mx-auto rounded-full bg-primary-50 p-4 w-30 h-30  transition-all duration-1000  hover:w-50 hover:h-50  flex items-center justify-center" onMouseEnter={() => setAddZomm(true)} onMouseLeave={() => setAddZomm(false)}>
                <img
                  src="/care2.webp"
                  alt="Spa Icon"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
                Spa rajeunissant & bien-être
              </h3>
              <p className="text-gray-600 mb-4">
                Prenez soin de vous avec notre gamme de traitements thérapeutiques, conçus pour détendre votre corps et rajeunir votre esprit.
              </p>
              <a
                href="/spa"
                className="text-accent hover:text-gold-700 font-medium inline-flex items-center transition duration-300"
              >
                Découvrir plus &nbsp; &nbsp;
                <ChevronRight stroke='currentColor' />
              </a>
            </div>
            
          </div>
        </div>
      </section>
      */}
      
      {/* Testimonials Section */}
      <section className="py-20 bg-grenat text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Expérience des clients"
            subtitle="Découvrez ce que nos clients ont à dire sur leur séjour à l’HÔTEL VATOLA."
            light={true}
          />
          
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>        
      </section>

      {/* Promo Section
      <section className="py-20 relative overflow-hidden">
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto bg-blue-500  backdrop-blur-md p-8 md:p-12 rounded-xl border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className='gold-gradient'></div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 text-center">
              Offre <span className="text-accent bg-clip-text">Spécial</span>
            </h2>
            <p className="text-xl text-primary-800 mb-6 font-bold tracking-wide">
              Réservez notre Forfait Relaxation Ultime et économisez 20%
            </p>
            <ul className="space-y-2 text-white mb-8 ">
              <li className="flex items-start">
                <span className="text-cosmic-teal mr-2">✓</span> 
                2 Nuits dans notre Suite Luxe
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal mr-2">✓</span> 
                Massage Cosmic Balance pour deux
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal mr-2">✓</span> 
                Nébuleuse Rajeunissement Facial
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal mr-2">✓</span> 
                Stellar Signature Manucure
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal mr-2">✓</span> 
                Transfert champagne et aéroport gratuit
              </li>
            </ul>
            <div className="text-center">
              <p className="text-2xl font-bold text-white mb-4">
                <span className="line-through text-gray-500 mr-2">940€</span>
                <span className="text-cosmic-teal">750€</span>
              </p>
              <Link
                to="/"
                className=" animate-bounce inline-block bg-accent hover:bg-gold-700 text-white px-6 py-2 rounded-md transition duration-300"
              >
                Réservez Cette Offre
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
       */}
      
      {/* Booking Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Réserver votre séjour"
            subtitle="Réservez votre escapade luxueuse à l’HÔTEL VATOLA et profitez d’un confort et d’un service inégalés."
          />
          
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* <div className="relative">
      <div className="fixed right-0 bottom-0">
        <div className="container mx-auto z-0 ">
          <motion.div 
            className="max-w-2xl mx-auto animate-gradient-xy bg-gradient-to-b from-blue-400 to-yellow-300 backdrop-blur-md md:p-12 rounded-xl border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-sm/8 md:text-sm/8 font-display font-bold text-white text-center">
              Offre <span className="text-accent bg-clip-text">Spécial</span>
            </h2>
            <p className="text-sm/8 text-primary-800 font-bold tracking-wide">
              Réservez notre Forfait Relaxation Ultime et économisez 20%
            </p>
            <ul className="space-y-2 text-sm/8 text-gray-300 ">
              <li className="flex items-start">
                <span className="text-cosmic-teal ">✓</span> 
                2 Nuits dans notre Suite Luxe
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal">✓</span> 
                Massage Cosmic Balance pour deux
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal">✓</span> 
                Nébuleuse Rajeunissement Facial
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal ">✓</span> 
                Stellar Signature Manucure
              </li>
              <li className="flex items-start">
                <span className="text-cosmic-teal ">✓</span> 
                Transfert champagne et aéroport gratuit
              </li>
            </ul>
            <div className="text-center">
              <p className="text-sm/8 font-bold text-white ">
                <span className="line-through text-gray-500 ">940€</span>
                <span className="text-cosmic-teal">750€</span>
              </p>
              <Link
                to="/"
                className=" animate-bounce inline-block bg-accent hover:bg-gold-700 text-white px-6 py-2 rounded-md transition duration-300"
              >
                Réservez Cette Offre
              </Link>
            </div>
          </motion.div>
        </div>
        09

      </div>
      </div>*/}
    </div>

  );
};

export default HomePage;
