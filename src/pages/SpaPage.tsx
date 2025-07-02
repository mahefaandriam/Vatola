import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { spaServices } from '../data/services';

const SpaPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="Spa & Bien-être"
        subtitle="Offrez-vous un monde de détente et de revitalisation avec nos soins spa."
        image="/care.webp"
        ctaText='Réservez votre séance dès maintenant'
        ctaLink='/contact'
        height="h-[70vh]"
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Notre service bien être"
                subtitle="Un havre de paix pour votre corps et votre esprit"
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Entrez dans notre sanctuaire de spa et laissez le monde derrière vous. Notre espace magnifiquement conçu offre une retraite paisible où vous pouvez échapper au stress de la vie quotidienne et se concentrer entièrement sur votre bien-être.
              </p>
              <p className="text-gray-600 mb-6">
                Notre équipe de thérapeutes expérimentés est dévouée à fournir des traitements personnalisés qui répondent à vos besoins spécifiques. En utilisant des produits haut de gamme et des techniques traditionnelles, nous créons des expériences qui rajeunissent et restaurent.
              </p>
              <p className="text-gray-600">
                Des massages revigorants aux soins du visage réparateurs, chaque soin est conçu pour favoriser le bien-être et la relaxation. Notre approche holistique garantit que vous quittez la maison rafraîchie, équilibrée et pleine de vitalité.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/spa2.webp"
                alt="Spa Ambiance"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/spa3.webp"
                alt="Spa Ambiance"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/care2.webp"
                alt="Spa Bath"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="spa4.webp"
                alt="Spa Ambiance"
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
            title="Nos traitements exclusifs"
            subtitle="Découvrez notre gamme de services de spa exceptionnels conçus pour nourrir et restaurer."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spaServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="tel:+15551234567"
              className="bg-accent hover:bg-gold-700 text-white font-medium px-8 py-3 rounded-md transition duration-300"
            >
              Réserver vos soins
            </a>
          </div>
        </div>
      </section>
      
      {/*
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Installations de spa"
            subtitle="Explorez notre gamme d’installations conçues pour améliorer votre bien-être. "
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="spa7.webp"
                  alt="Salle de détente"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Détente dans le Sauna</h3>
              <p className="text-gray-300">
                Laissez-vous envelopper par la chaleur sèche du sauna, ce cocon bienfaisant où le temps semble suspendu.
                Sous l’effet de la température élevée, les tensions se dissipent, les muscles se relâchent, et l’esprit s’apaise.
              </p>
            </div>
            
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="spa2.webp"
                  alt="Sauna"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2"> L’instant où tout ralentit </h3>
              <p className="text-gray-300">
                Dans une atmosphère douce et enveloppante, le Spa vous invite à lâcher prise, à vous reconnecter à vous-même et à ressentir chaque instant.
                Bain chaud, sauna, hammam, soins du corps, rituels du monde… Chaque expérience est une invitation à la détente profonde et à la régénération intérieure.
              </p>
            </div>
            
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="/sauna1.webp"
                  alt="Steam Room"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Hammam aromatique</h3>
              <p className="text-gray-300">
                Notre hammam aromatique offre les bienfaits de la chaleur humide associée aux huiles essentielles pour ouvrir les pores, améliorer la circulation et favoriser une relaxation profonde.
              </p>
            </div>
          </div>
        </div>
      </section>
      */}
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Spa Packages"
            subtitle="Offrez-vous nos forfaits spa soigneusement conçus pour une expérience bien-être complète."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="relaxation.webp"
                  alt="Relaxation Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Relaxation
                </h3>
                <p className="text-gray-600 mb-4">
                  Détendez-vous avec notre forfait de relaxation signature comprenant un massage suédois, un visage rafraîchissant et l’accès à toutes les installations du spa.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$220</span>
                    <span className="text-sm text-gray-500"> / 2.5 heures</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="massageduo.webp"
                  alt="Couples Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Retraite en couple
                </h3>
                <p className="text-gray-600 mb-4">
                  Partagez une expérience spéciale avec des massages côte à côte, une séance privée de hammam et du champagne gratuit pour deux.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$380</span>
                    <span className="text-sm text-gray-500"> / 3 heures (pour deux)</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="rajeunissement.webp"
                  alt="Rejuvenation Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Rajeunissement total
                </h3>
                <p className="text-gray-600 mb-4">
                  Revitalisez votre corps et votre esprit avec notre forfait complet comprenant un massage des tissus profonds, un soin du visage de luxe et un gommage corporel.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$320</span>
                    <span className="text-sm text-gray-500"> / 3.5 heures</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Spa Horaires & informations"
            subtitle="Planifiez votre visite à notre spa de luxe."
          />
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-luxury p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Horaires d'ouverture</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium text-primary-800">9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Samedi - Dimanche</span>
                    <span className="font-medium text-primary-800">10:00 AM - 7:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Etiquette du Spa </h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Veuillez arriver 15 minutes avant votre traitement prévu</li>
                  <li>Parlez doucement pour maintenir l’atmosphère tranquille</li>
                  <li>Éteindre les téléphones portables dans les zones de traitement et de relaxation</li>
                  <li>Informez-nous de tout problème de santé ou allergie</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Pour les rendez-vous et les demandes de renseignements, veuillez communiquer avec la réception du spa :
              </p>
              <a
                href="tel:+15551234567"
                className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
              >
                Réservez votre expérience au spa
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpaPage;