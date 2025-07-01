import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { pubServices } from '../data/services';

const PubPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="VATOLAHY, Pub & Bar de luxe"
        subtitle="Détendez-vous dans l’atmosphère chic de notre pub, proposant une sélection de cocktails faits maison, de vins raffinés et de bouchées gourmandes."
        image="/une-verre2.webp"
       // image="https://images.pexels.com/photos/1554654/pexels-photo-1554654.jpeg"
        height="h-[70vh]"
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Découvrez notre luxueux pub"
                subtitle="Un espace sophistiqué pour se détendre et savourer des boissons de qualité supérieure et des bouchées gastronomiques."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Notre élégant pub offre le mélange parfait de confort et de luxe, offrant un cadre idéal pour la détente après une journée d’exploration ou de travail. L’atmosphère chaleureuse et accueillante est complétée par de riches finitions en bois, des sièges moelleux et un éclairage subtil qui crée une ambiance de tranquillité raffinée.
              </p>
              <p className="text-gray-600 mb-6">
                Laissez-vous tenter par notre sélection de spiritueux raffinés, de bières artisanales et de vins du monde entier. Nos mixologues qualifiés créent des cocktails classiques et innovants en utilisant des ingrédients de première qualité et des techniques de présentation artistiques.
              </p>
              <p className="text-gray-600">
                Complétez vos boissons avec notre menu de bouchées de bar gastronomique, conçu par nos chefs talentueux pour offrir l’accompagnement parfait à la boisson de votre choix. Des fromages artisanaux aux petites assiettes sophistiquées, chaque offre est élaborée avec précision et soin.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/une-verre2.webp"
                alt="Cocktail and Glass"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="une-verre3.webp"
                alt="Cocktail Preparation"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/clients1.webp"
                alt="Craft Beer Selection"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/plat-de-poulets.webp"
                alt="Gourment plat de poulet"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Nos produits phares"
            subtitle="Découvrez notre sélection de boissons et de délices culinaires haut de gamme."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pubServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Événements spéciaux & divertissements"
                subtitle="Rejoignez-vous à nous pour des événements réguliers et des spectacles dans notre luxueux pub."
                alignment="left"
                light={true}
              />
              <p className="text-gray-300 mb-6">
                Notre pub accueille une variété d’événements spéciaux tout au long de la semaine, améliorant votre expérience avec de la musique live, des séances de dégustation et des soirées à thème. Notre calendrier d’événements est conçu pour offrir quelque chose pour tous les goûts et préférences.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <span className="text-accent font-serif font-bold">Lundi</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Cocktail Masterclass</h4>
                    <p className="text-gray-300">Lapprendre l’art de la mixologie grâce à nos barmans experts. </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <span className="text-accent font-serif font-bold">Mercedi</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Soirée de dégustation de vins</h4>
                    <p className="text-gray-300">Découvrez des vins sélectionnés du monde entier avec des notes de dégustation guidées. </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <span className="text-accent font-serif font-bold">Vendredi</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Live Jazz Night</h4>
                    <p className="text-gray-300">Profitez de spectacles de jazz sophistiqués dans un cadre intime. </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-3">
                    <span className="text-accent font-serif font-bold">Samedi</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Soirée cocktail</h4>
                    <p className="text-gray-300">Découvrez nos créations de cocktails exclusives à des prix spéciaux. </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <img
                src="/pub.jpg"
                alt="Live Music at Pub"
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-lg hidden md:block">
                <img
                  src="/good-time.webp"
                  alt="Craft Beer"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg transform -translate-x-4 -translate-y-4 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Heures d'ouverture"
            subtitle="Visitez notre pub pendant ces heures pour découvrir notre service et notre ambiance exceptionnels."
          />
          
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-luxury p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Heures habituelles</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Jeudi</span>
                    <span className="font-medium text-primary-800">3:00 PM - 12:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Vendredi - Samedi</span>
                    <span className="font-medium text-primary-800">3:00 PM - 2:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium text-primary-800">3:00 PM - 11:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Happy Hour</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium text-primary-800">4:00 PM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Offres spéciales</span>
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">-20 % sur certaines boissons</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Pour les événements privés et les réservations, veuillez nous contacter à 
                <p className="text-accent">
                  <a href="tel:+261376607863" className='hover:text-gold-700'>
                    +261 37 66 078 63
                  </a>&nbsp;|&nbsp;
                  <a href="tel:+261341193777" className='hover:text-gold-700'>
                    +261 34 11 937 77
                  </a>
                </p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PubPage;