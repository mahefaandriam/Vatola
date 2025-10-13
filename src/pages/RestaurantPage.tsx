import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { supabase } from '../lib/supabaseClient';

import { restaurantHighlights } from '../data/services';
import PhotoViewer from "../components/PhotoViewer";
import { Star } from 'lucide-react';

const RestaurantPage: React.FC = () => {
  const [assets, setAssets] = useState<{ id: number; url: string; type: 'image' | 'video'; published?: boolean | null; }[]>([]);

  useEffect(() => {
    document.title = 'Restaurant - Vatola Hotel';
    const load = async () => {
      const { data } = await supabase
        .from('media_assets')
        .select('id, url, type, category, published')
        .eq('category', 'restaurant')
        .order('created_at', { ascending: false });
      setAssets((data as any[]) || []);
    };
    load();
  }, []);

  const imageUrls = [
    '1760290414611.jpg', '1760290454540.jpg', 'bar.jpg', 'resto.webp', '1760290432809.jpg'
  ]

  const publishedAssets = assets.filter(a => a.published === true);

  return (
    <div className="overflow-hidden">
      <Hero
        title="Restaurant Vatola"
        subtitle="Cuisine conviviale, authentique et accessible à tous"
        image="/plat3.webp"
        ctaText="Contactez-nous"
        ctaLink="/contact?subject=restaurant"
        height="h-[70vh]"
      />

      {/* Section Introduction avec parallax */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-700 hover:translate-x-2">
              <SectionTitle
                title="Plus qu'un restaurant"
                subtitle="Partage, simplicité et plaisir"
                alignment="left"
              />
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed transform transition-all duration-500 hover:text-gray-800">
                  Plus qu'un hôtel, Vatola est une maison ouverte à tous. Notre restaurant s'inscrit dans cet esprit :
                  une cuisine généreuse, des saveurs authentiques et une équipe souriante qui met un point d'honneur à vous accueillir chaleureusement.
                </p>
                <p className="text-gray-600 leading-relaxed transform transition-all duration-500 hover:text-gray-800">
                  Que vous soyez en voyage d'affaires, en famille, entre amis ou simplement de passage, profitez d'un cadre agréable et d'une ambiance conviviale.
                </p>
              </div>

              {/* Statistiques animées */}
              <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-primary-800">+100</div>
                  <div className="text-sm text-gray-600">Plats au menu</div>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-primary-800">7j/7</div>
                  <div className="text-sm text-gray-600">Service continu</div>
                </div>
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-primary-800">5★</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Galerie d'images avec effets hover */}
            <div className="grid grid-cols-2 gap-4">

              <div className="w-full h-100 group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105">
                <video
                  className="w-full h-full object-cover"
                  src="/video1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="w-full h-50 bottom-0 absolute bg-gradient-to-t from-black/90 to-transparent opacity-0 opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">L'heure du dressage à sonner !</p>
                  </div>
                </div>
              </div>

              <div className=''>
                <div className="mb-2 group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105 hover:-rotate-1 ">
                  <img
                    src="/plat3.webp"
                    alt="Spécialités du chef"
                    loading="lazy"
                    className="w-full h-49 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Nos spécialités</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg shadow-luxury transform transition-all duration-500 hover:scale-105">
                  <img
                    src="/1760292489903.jpg"
                    alt="Espace lounge attenant"
                    loading="lazy"
                    className="w-full h-49 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Nos tables </p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Galerie Restaurant" subtitle="Photos et vidéos publiées par l'administration" />
          {publishedAssets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {publishedAssets.map((m, idx) => (
                <div key={m.id ?? idx} className="group relative overflow-hidden rounded-lg shadow-luxury">
                  {m.type === 'image' ? (
                    <img src={m.url} alt="Media Restaurant" loading="lazy" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <video src={m.url} controls className="w-full h-64 object-cover" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <><PhotoViewer images={imageUrls} /></>
            /*<p className="text-gray-600">Aucun média publié pour le moment.</p>*/
          )}
        </div>
      </section >

      {/* Section Menu avec animations */}
      < section className="py-20 bg-gray-50 relative overflow-hidden" >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-accent-50/30"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="transform transition-all duration-700">
            <SectionTitle
              title="Notre carte"
              subtitle="Options pour tous les goûts : vegan, allégé, sans matières grasses disponibles sur demande"
            />
          </div>

          {/* Cards avec animations en cascade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {restaurantHighlights.map((item, index) => (
              <div
                key={item.id}
                className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out forwards`
                }}
              >
                <ServiceCard service={item} />
              </div>
            ))}
          </div>

          {/* Menu détaillé avec design premium */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-luxury border border-white/20 overflow-hidden">

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                    <h3 className="font-serif text-lg font-semibold text-primary-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3"></span>
                      Entrées & salades
                    </h3>
                    <p className="text-gray-600 leading-relaxed">Fraîcheur, saisonnalité et équilibre au rendez-vous.</p>
                  </div>
                </div>

                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-l-4 border-orange-500">
                    <h3 className="font-serif text-lg font-semibold text-primary-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm mr-3"></span>
                      Plats & spécialités
                    </h3>
                    <p className="text-gray-600 leading-relaxed">Saveurs locales et inspirations du monde. Options vegan et allégées disponibles.</p>
                  </div>
                </div>

                <div className="group transform transition-all duration-300 hover:scale-105">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-l-4 border-pink-500">
                    <h3 className="font-serif text-lg font-semibold text-primary-800 mb-3 flex items-center">
                      <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm mr-3"></span>
                      Desserts & boissons
                    </h3>
                    <p className="text-gray-600 leading-relaxed">Gourmandises maison, sélection de boissons et jus naturels.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                <p className="text-sm text-gray-500 italic">
                  Prix minimum indiqué sur place selon les plats du jour et disponibilités. Pour toute information tarifaire, merci de nous contacter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Carte détaillée (aperçu) */}
      < section className="py-16 bg-white" >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-luxury border border-gray-100 p-8">
            <h3 className="font-serif text-2xl font-bold text-primary-800 mb-6 text-center">Aperçu de la carte</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                <h4 className="font-semibold text-primary-800 mb-3">Entrées & salades</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Salade fraîcheur (vegan)</span><span className="text-xs bg-green-500/10 text-green-700 px-2 py-0.5 rounded">Vegan</span></li>
                  <li className="flex justify-between"><span>Bruschetta tomates-basilic</span><span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Min. sur place</span></li>
                  <li className="flex justify-between"><span>Soupe du jour (sans MG)</span><span className="text-xs bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded">Sans MG</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-amber-100">
                <h4 className="font-semibold text-primary-800 mb-3">Plats & spécialités</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Poulet sauce citronnelle</span><span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Min. sur place</span></li>
                  <li className="flex justify-between"><span>Poisson grillé, légumes</span><span className="text-xs bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded">Sans MG</span></li>
                  <li className="flex justify-between"><span>Curry de légumes (vegan)</span><span className="text-xs bg-green-500/10 text-green-700 px-2 py-0.5 rounded">Vegan</span></li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-rose-100">
                <h4 className="font-semibold text-primary-800 mb-3">Desserts & boissons</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between"><span>Fruit bowl de saison</span><span className="text-xs bg-green-500/10 text-green-700 px-2 py-0.5 rounded">Vegan</span></li>
                  <li className="flex justify-between"><span>Mousse légère cacao</span><span className="text-xs bg-blue-500/10 text-blue-700 px-2 py-0.5 rounded">Sans MG</span></li>
                  <li className="flex justify-between"><span>Jus naturels & mocktails</span><span className="text-xs bg-gray-200 px-2 py-0.5 rounded">Min. sur place</span></li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6 text-center">Prix minimum affiché sur place. Options vegan et sans matières grasses disponibles sur demande.</p>
          </div>
        </div>
      </section >

      {/* Section Cabaret avec design festif */}
      < section className="py-20 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white relative overflow-hidden" >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="transform transition-all duration-700">
              <SectionTitle
                title="Cabaret tous les samedis"
                subtitle="Ambiance festive, musique et convivialité"
                alignment="left"
                light={true}
              />
              <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                Chaque samedi soir, vivez l'expérience cabaret : musique live, bonne humeur et moments de partage. Un rendez-vous incontournable pour profiter pleinement de votre soirée à Antsirabe.
              </p>

              {/* Bouton CTA animé */}
              {/* <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <span className="flex items-center">
                  Réserver pour samedi
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">🎭</span>
                </span>
              </button> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="group relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                <img
                  src="/pub4.jpg"
                  alt="Ambiance cabaret"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <p className="font-bold text-yellow-300">Spectacle live</p>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-105 hover:-rotate-2 mt-8">
                <img
                  src="/clients1.webp"
                  alt="Moments de partage"
                  loading="lazy"
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent">
                  <div className="absolute bottom-4 left-4">
                    <p className="font-bold text-yellow-300">Convivialité</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Section Services avec design moderne */}
      < section className="py-20 bg-white" >
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Services pratiques"
            subtitle="Flexibilité et rapidité au quotidien"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Petit déjeuner */}
            <div className="group bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-luxury border border-orange-100 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="text-4xl mb-4 text-center"></div>
              <h3 className="font-serif text-xl font-bold text-primary-800 mb-4 text-center">Petit déjeuner</h3>
              <p className="text-gray-600 text-center mb-4">Complet et servi chaque matin</p>
              <div className="text-center">
                <span className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  7h - 10h
                </span>
              </div>
            </div>

            {/* Sandwichs */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-luxury border border-green-100 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="text-4xl mb-4 text-center"></div>
              <h3 className="font-serif text-xl font-bold text-primary-800 mb-4 text-center">Sandwichs & Encas</h3>
              <p className="text-gray-600 text-center mb-4">Disponibles toute la journée</p>
              <div className="text-center">
                <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Non-stop
                </span>
              </div>
            </div>

            {/* À emporter */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-luxury border border-blue-100 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
              <div className="text-4xl mb-4 text-center"></div>
              <h3 className="font-serif text-xl font-bold text-primary-800 mb-4 text-center">À emporter</h3>
              <p className="text-gray-600 text-center mb-4">Service pratique et rapide</p>
              <div className="text-center">
                <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Express
                </span>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Section Équipe avec testimonial style */}
      < section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50" >
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Notre équipe"
            subtitle="Des serveurs professionnels, souriants et attentionnés"
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-luxury p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-accent-500"></div>

              <div className="flex items-center mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary-800">Équipe passionnée</h3>
                  <p className="text-gray-500">À votre service</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg italic">
                "Derrière chaque plat, une équipe passionnée qui prend plaisir à vous servir. Notre personnel est à votre écoute pour vous conseiller et vous garantir un moment agréable."
              </p>

              <div className="flex justify-center mt-6">
                <div className="flex mb-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={25}
                      className={`${i < 5 ? 'animate-pulse text-accent fill-accent' : 'text-gray-300'} mr-1`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Section Espace polyvalent avec design business */}
      < section className="py-20 bg-gradient-to-br from-slate-800 to-gray-900 text-white" >
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Espace polyvalent"
            subtitle="Séminaire, anniversaire, réunion… sur réservation et selon disponibilités"
            light={true}
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-3"></div>
                  <h4 className="font-bold mb-2">Événements pro</h4>
                  <p className="text-gray-300 text-sm">Séminaires, réunions</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-3"></div>
                  <h4 className="font-bold mb-2">Fêtes privées</h4>
                  <p className="text-gray-300 text-sm">Anniversaires, célébrations</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <div className="text-3xl mb-3"></div>
                  <h4 className="font-bold mb-2">Sur mesure</h4>
                  <p className="text-gray-300 text-sm">Configuration adaptable</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-center">
                Nous mettons à votre disposition un espace modulable pour vos événements privés ou professionnels.
                Contactez-nous pour vérifier les disponibilités et les modalités.
              </p>

              {/* <div className="text-center mt-8">
                <button className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-full font-bold transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                  Demander un devis
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section >

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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div >
  );
};

export default RestaurantPage;
