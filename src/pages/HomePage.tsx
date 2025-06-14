import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import RoomCard from '../components/RoomCard';
//import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import BookingForm from '../components/BookingForm';
import { rooms } from '../data/rooms';
//import { pubServices, spaServices, nailServices } from '../data/services';
import { testimonials } from '../data/testimonials';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const featuredRooms = rooms.filter(room => room.featured);
  
  return (
    <div>
      {/* Hero Section */}
       {/* Experience Unparalleled Luxury*/}
      <Hero
        title="Vivez un luxe inégalé"
        subtitle="Laissez-vous séduire par le mélange parfait d'élégance, de confort et de service exceptionnel au HÔTEL VATOLA."
        image="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
        ctaText="Réservez Votre Séjour"
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
                subtitle="Plongez dans une oasis de luxe et de confort, où chaque détail est conçu pour dépasser vos attentes."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                HÔTEL VATOLA se présente comme un phare de sophistication et d'hospitalité. Notre établissement élégant offre un sanctuaire où le luxe moderne rencontre le charme intemporel, créant une expérience inoubliable pour tous nos clients.
              </p>
              <p className="text-gray-600 mb-6">
                De nos chambres superbement conçues à nos équipements de classe mondiale, y compris notre pub, spa et salon de manucure, chaque aspect de votre séjour est conçu pour offrir un maximum de confort et de satisfaction.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-serif text-3xl font-bold text-accent mb-2">10+</div>
                  <div className="text-gray-600">Chambres de standards</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-serif text-3xl font-bold text-accent mb-2">3</div>
                  <div className="text-gray-600">Options de Restauration</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-serif text-3xl font-bold text-accent mb-2">15+</div>
                  <div className="text-gray-600">Soins du Spa</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-serif text-3xl font-bold text-accent mb-2">24/7</div>
                  <div className="text-gray-600">Service de concierge</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/clients1.jpg"
                alt="Hotel Lobby"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent rounded-lg hidden md:block">
                <img
                  src="/plat1.jpg"
                  alt="Hotel Detail"
                  className="w-full h-full object-cover rounded-lg transform translate-x-4 translate-y-4 shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Rooms Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Hébergement en vedette"
            subtitle="Explorez notre sélection de chambres et suites soigneusement conçues, offrant le mélange parfait de confort et de raffinement."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <RoomCard room={room} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Services & commodités exceptionnels"
            subtitle="Profitez de notre gamme de services de classe mondiale conçus pour améliorer votre séjour et vous offrir un confort inégalé."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Pub & Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6 mx-auto rounded-full bg-primary-50 p-4 w-16 h-16 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/1554654/pexels-photo-1554654.jpeg"
                  alt="Pub Icon"
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
                Découvrir plus
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
            
            {/* Spa & Wellness */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6 mx-auto rounded-full bg-primary-50 p-4 w-16 h-16 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg"
                  alt="Spa Icon"
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
                Découvrir plus
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
            
            {/* Nail Salon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-6 mx-auto rounded-full bg-primary-50 p-4 w-16 h-16 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg"
                  alt="Nail Salon Icon"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-3">
                Salon de manucure haut de gamme
              </h3>
              <p className="text-gray-600 mb-4">
                Faites l’expérience de l’art de nos techniciens qualifiés offrant une large gamme de services, des manucures classiques aux créations artistiques.
              </p>
              <a
                href="/nail-salon"
                className="text-accent hover:text-gold-700 font-medium inline-flex items-center transition duration-300"
              >
                Découvrir plus
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-primary-800 text-white">
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