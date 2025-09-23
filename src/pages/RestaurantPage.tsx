import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { restaurantHighlights } from '../data/services';

const RestaurantPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Restaurant - Vatola Hotel';
  }, []);

  return (
    <div>
      <Hero
        title="Restaurant Vatola"
        subtitle="Cuisine conviviale, authentique et accessible à tous"
        image="/plat3.webp"
        ctaText="Réserver une table"
        ctaLink="/contact?subject=restaurant"
        height="h-[70vh]"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Plus qu'un restaurant"
                subtitle="Partage, simplicité et plaisir"
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Plus qu’un hôtel, Vatola est une maison ouverte à tous. Notre restaurant s’inscrit dans cet esprit :
                une cuisine généreuse, des saveurs authentiques et une équipe souriante qui met un point d’honneur à vous accueillir chaleureusement.
              </p>
              <p className="text-gray-600">
                Que vous soyez en voyage d’affaires, en famille, entre amis ou simplement de passage, profitez d’un cadre agréable et d’une ambiance conviviale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/clients1.webp" alt="Salle du restaurant" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-luxury" />
              <img src="/plat3.webp" alt="Spécialités du chef" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-luxury" />
              <div></div>
              <img src="/une-verre2.webp" alt="Espace lounge attenant" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-luxury" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Notre carte"
            subtitle="Options pour tous les goûts : vegan, allégé, sans matières grasses disponibles sur demande"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {restaurantHighlights.map((item) => (
              <ServiceCard key={item.id} service={item} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-luxury p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-2">Entrées & salades</h3>
                <p className="text-gray-600">Fraîcheur, saisonnalité et équilibre au rendez-vous.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-2">Plats & spécialités</h3>
                <p className="text-gray-600">Saveurs locales et inspirations du monde. Options vegan et allégées disponibles.</p>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-primary-800 mb-2">Desserts & boissons</h3>
                <p className="text-gray-600">Gourmandises maison, sélection de boissons et jus naturels.</p>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Prix minimum indiqué sur place selon les plats du jour et disponibilités. Pour toute information tarifaire, merci de nous contacter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Cabaret tous les samedis"
                subtitle="Ambiance festive, musique et convivialité"
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Chaque samedi soir, vivez l’expérience cabaret : musique live, bonne humeur et moments de partage. Un rendez-vous incontournable pour profiter pleinement de votre soirée à Antsirabe.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/pub4.jpg" alt="Ambiance cabaret" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-luxury" />
              <img src="/clients1.webp" alt="Moments de partage" loading="lazy" className="w-full h-64 object-cover rounded-lg shadow-luxury" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Petit déjeuner, sandwichs & à emporter" subtitle="Flexibilité et rapidité au quotidien" />
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-luxury p-6">
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Petit déjeuner complet servi chaque matin.</li>
              <li>Sandwichs et encas disponibles toute la journée.</li>
              <li>Service à emporter pratique et rapide.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Notre équipe" subtitle="Des serveurs professionnels, souriants et attentionnés" />
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-luxury p-6">
            <p className="text-gray-600">
              Derrière chaque plat, une équipe passionnée qui prend plaisir à vous servir. Notre personnel est à votre écoute pour vous conseiller et vous garantir un moment agréable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Espace polyvalent" subtitle="Séminaire, anniversaire, réunion… sur réservation et selon disponibilités" />
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-luxury p-6">
            <p className="text-gray-600">
              Nous mettons à votre disposition un espace modulable pour vos événements privés ou professionnels. Contactez-nous pour vérifier les disponibilités et les modalités.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantPage;
