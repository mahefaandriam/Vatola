import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';

const PubPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Pub & Bar - Vatola Hotel';
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero
        title="VATOLA PUB & BAR"
        subtitle="Venez découvrir dès maintenant"
        image="/une-verre2.webp"
        ctaText=''
        height="h-[70vh]"
      />
      
      {/* Section principale avec ambiance lounge */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-accent-50/30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-700 hover:translate-x-2">
              <SectionTitle
                title="Le Pub Lounge Bar"
                subtitle="L'élégance décontractée au cœur de votre soirée"
                alignment="left"
              />
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed transform transition-all duration-500 hover:text-gray-800">
                  Bienvenue au Pub Lounge Bar, un lieu chic et chaleureux où se rencontrent ambiance raffinée, cocktails d'exception et instants de détente. Conçu pour offrir une expérience unique, notre espace mêle le confort d'un lounge sophistiqué à l'énergie d'un bar convivial.
                </p>
                
                {/* Features highlights avec vos couleurs */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl border border-primary-200 transform transition-all duration-300 hover:scale-105 hover:shadow-luxury">
                    <div className="text-2xl mb-2">🍸</div>
                    <h4 className="font-bold text-primary-800">Cocktails Premium</h4>
                    <p className="text-gray-600 text-sm">Créations exclusives</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-xl border border-accent-200 transform transition-all duration-300 hover:scale-105 hover:shadow-luxury">
                    <div className="text-2xl mb-2">🎵</div>
                    <h4 className="font-bold text-primary-800">Ambiance Live</h4>
                    <p className="text-gray-600 text-sm">Musique & spectacles</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-4 rounded-xl border border-primary-300 transform transition-all duration-300 hover:scale-105 hover:shadow-luxury">
                    <div className="text-2xl mb-2">🛋️</div>
                    <h4 className="font-bold text-primary-800">Lounge Confort</h4>
                    <p className="text-gray-600 text-sm">Espaces détente</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-100 to-primary-100 p-4 rounded-xl border border-accent-300 transform transition-all duration-300 hover:scale-105 hover:shadow-luxury">
                    <div className="text-2xl mb-2">🌙</div>
                    <h4 className="font-bold text-primary-800">Soirées Uniques</h4>
                    <p className="text-gray-600 text-sm">Événements spéciaux</p>
                  </div>
                </div>
                
                {/* Statistiques animées */}
                <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
                  <div className="text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-primary-800 animate-pulse">+50</div>
                    <div className="text-sm text-gray-600">Cocktails</div>
                  </div>
                  <div className="text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-primary-800 animate-pulse">7j/7</div>
                    <div className="text-sm text-gray-600">Ouvert</div>
                  </div>
                  <div className="text-center transform transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold text-primary-800 animate-pulse">★★★★★</div>
                    <div className="text-sm text-gray-600">Ambiance</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Galerie interactive */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                <img
                  src="/moto2.jpg"
                  alt="Cocktail and Glass"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-accent">Cocktails Signature</p>
                    <p className="text-sm">Art de la mixologie</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Premium
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105 hover:-rotate-1 mt-8">
                <img
                  src="/billard2.jpg"
                  alt="Cocktail Preparation"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-accent">Espace Jeux</p>
                    <p className="text-sm">Billard & divertissement</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                <img
                  src="/clients1.webp"
                  alt="Craft Beer Selection"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-accent">Ambiance Conviviale</p>
                    <p className="text-sm">Moments de partage</p>
                  </div>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105 hover:-rotate-1 mt-8">
                <img
                  src="/pub4.jpg"
                  alt="Gourmet plat de poulet"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-800/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-accent">Gastronomie</p>
                    <p className="text-sm">Plats d'exception</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Carte Snacks & Boissons" subtitle="Sélection emblématique – tarifs variables selon disponibilités" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 p-6">
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Snacks</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Assiette variée (charcuterie, fromages)</li>
                <li>Sandwichs & croques</li>
                <li>Burger maison</li>
                <li>Pizza/panini</li>
                <li>Brochettes & tapas chauds</li>
                <li>Frites, accompagnements</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 p-6">
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Boissons</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Cocktails signature & classiques</li>
                <li>Bières pression & bouteilles</li>
                <li>Vins & spiritueux</li>
                <li>Jus frais & softs</li>
                <li>Mocktails sans alcool</li>
                <li>Café, thé, infusions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section événements avec vos couleurs */}
      <section className="py-20 bg-primary-800 text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary-900/50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <SectionTitle
            title="Événements & Animations"
            subtitle="Une programmation riche pour des soirées inoubliables"
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Lundi - Cocktail Masterclass */}
            <div className="group bg-accent/20 backdrop-blur-sm p-6 rounded-2xl border border-accent/30 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-accent/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl transform transition-transform duration-300 group-hover:rotate-12">
                  🍹
                </div>
                <h3 className="font-bold text-xl mb-2 text-accent">Lundi</h3>
                <h4 className="font-semibold mb-3 text-white">Cocktail Masterclass</h4>
                <p className="text-gray-300 text-sm">Apprenez l'art de la mixologie avec nos barmans experts</p>
              </div>
            </div>
            
            {/* Mercredi - Dégustation */}
            <div className="group bg-accent/20 backdrop-blur-sm p-6 rounded-2xl border border-accent/30 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-accent/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl transform transition-transform duration-300 group-hover:rotate-12">
                  🍷
                </div>
                <h3 className="font-bold text-xl mb-2 text-accent">Mercredi</h3>
                <h4 className="font-semibold mb-3 text-white">Soirée Dégustation</h4>
                <p className="text-gray-300 text-sm">Découvrez des vins sélectionnés avec notes guidées</p>
              </div>
            </div>
            
            {/* Vendredi - Jazz Night */}
            <div className="group bg-accent/20 backdrop-blur-sm p-6 rounded-2xl border border-accent/30 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-accent/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl transform transition-transform duration-300 group-hover:rotate-12">
                  🎷
                </div>
                <h3 className="font-bold text-xl mb-2 text-accent">Vendredi</h3>
                <h4 className="font-semibold mb-3 text-white">Live Jazz Night</h4>
                <p className="text-gray-300 text-sm">Spectacles jazz sophistiqués en cadre intime</p>
              </div>
            </div>
            
            {/* Samedi - Soirée Cocktail */}
            <div className="group bg-accent/20 backdrop-blur-sm p-6 rounded-2xl border border-accent/30 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:bg-accent/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl transform transition-transform duration-300 group-hover:rotate-12">
                  🎉
                </div>
                <h3 className="font-bold text-xl mb-2 text-accent">Samedi</h3>
                <h4 className="font-semibold mb-3 text-white">Soirée Cocktail</h4>
                <p className="text-gray-300 text-sm">Créations exclusives à prix spéciaux</p>
              </div>
            </div>
          </div>
          
          {/* CTA pour événements */}
          {/* <div className="text-center">
            <button className="group bg-gradient-to-r from-accent to-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <span className="flex items-center">
                Réserver votre soirée
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">🍾</span>
              </span>
            </button>
          </div> */}
        </div>
      </section>
      
      {/* Section horaires avec vos couleurs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Heures d'ouverture"
            subtitle="Visitez notre pub pendant ces heures pour découvrir notre service et notre ambiance exceptionnels"
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 overflow-hidden">
              {/* Header avec vos couleurs */}
              <div className="bg-gradient-to-r from-primary-800 to-accent p-6 text-white text-center">
                <h2 className="text-2xl font-bold">Planning de la semaine</h2>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Heures habituelles */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border-l-4 border-primary-500">
                    <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm mr-3">⏰</span>
                      Heures habituelles
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="group flex justify-between items-center p-3 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105">
                        <span className="text-gray-700 font-medium">Lundi - Jeudi</span>
                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">15:00 - 00:00</span>
                      </div>
                      <div className="group flex justify-between items-center p-3 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105">
                        <span className="text-gray-700 font-medium">Vendredi - Samedi</span>
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">15:00 - 02:00</span>
                      </div>
                      <div className="group flex justify-between items-center p-3 bg-white rounded-lg shadow-sm transform transition-all duration-300 hover:scale-105">
                        <span className="text-gray-700 font-medium">Dimanche</span>
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">15:00 - 23:00</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Happy Hour */}
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-xl border-l-4 border-accent">
                    <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm mr-3">🍻</span>
                      Happy Hour
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="group p-4 bg-white rounded-lg shadow-sm border-2 border-dashed border-accent/50 transform transition-all duration-300 hover:scale-105">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 font-medium">Lundi - Vendredi</span>
                          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">16:00 - 19:00</span>
                        </div>
                        <div className="text-center">
                          <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                            -20% sur certaines boissons
                          </span>
                        </div>
                      </div>
                      
                      {/* Avantages Happy Hour */}
                      <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-4 rounded-lg border border-accent/20">
                        <h4 className="font-bold text-primary-800 mb-2">Offres spéciales :</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Cocktails signature à prix réduit</li>
                          <li>• Bières pression en promotion</li>
                          <li>• Tapas offerts pour 2 consommations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact et réservations avec vos couleurs */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary-800 to-accent rounded-xl text-white text-center">
                  <h3 className="text-xl font-bold mb-4">Réservations & Événements Privés</h3>
                  <p className="text-gray-300 mb-4">
                    Pour les événements privés et les réservations, contactez-nous :
                  </p>
                  
                  <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
                    <a 
                      href="tel:+261376607863" 
                      className="group flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    >
                      <span className="text-2xl mr-2">📞</span>
                      <span className="text-white font-bold hover:text-accent">+261 37 66 078 63</span>
                    </a>
                    <a 
                      href="tel:+261341193777" 
                      className="group flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    >
                      <span className="text-2xl mr-2">📱</span>
                      <span className="text-white font-bold hover:text-accent">+261 34 11 937 77</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section finale avec vos couleurs */}
      <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-primary-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
            L'expérience Vatola Pub vous attend
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Plongez dans une atmosphère unique où chaque détail est pensé pour votre plaisir
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* <button className="group bg-gradient-to-r from-accent to-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
              <span className="flex items-center">
                Contactez-nous
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2"></span>
              </span>
            </button> */}
            
            {/* <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 transform transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:border-accent">
              <span className="flex items-center">
                Découvrir la carte
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">📋</span>
              </span>
            </button> */}
          </div>
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
      `}</style>
    </div>
  );
};

export default PubPage;
