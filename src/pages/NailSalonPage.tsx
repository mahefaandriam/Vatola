import React from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { nailServices } from '../data/services';

const NailSalonPage: React.FC = () => {
  return (
    <div>
      <Hero
        title="Salon de manucure haut de gamme"
        subtitle="Profitez d’un soin des ongles exceptionnel dans notre salon élégant qui offre une gamme de soins allant des manucures classiques aux créations artistiques."
        image="https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg"
        height="h-[70vh]"
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Notre expérience du salon de manucure"
                subtitle="Offrez-vous des soins de qualité dans un environnement luxueux et relaxant."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Notre salon de manucure est conçu pour vous offrir le summum du luxe en matière de soin des ongles. Dès votre entrée, vous serez accueilli dans un espace de tranquillité et de sophistication où chaque détail est soigneusement étudié pour améliorer votre expérience.
              </p>
              <p className="text-gray-600 mb-6">
                Notre équipe de techniciens hautement qualifiés apporte des années d’expertise et de créativité à chaque service. En utilisant uniquement des produits haut de gamme et en respectant les normes d’hygiène les plus strictes, nous veillons à ce que vos ongles reçoivent le meilleur soin possible.
              </p>
              <p className="text-gray-600">
                Que vous soyez à la recherche d’une manucure classique, d’une application de gel longue durée ou d’un nail art complexe, nos techniciens travailleront en étroite collaboration avec vous pour obtenir le look parfait qui reflète votre style personnel.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/nails.webp"
                alt="Manicure Service"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg"
                alt="Pedicure Service"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg"
                alt="Gel Nails"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg"
                alt="Nail Art"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Nos services pour les ongles"
            subtitle="Découvrez notre gamme de services de soins des ongles haut de gamme conçus pour embellir et entretenir vos ongles."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nailServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="tel:+15551234567"
              className="bg-accent hover:bg-gold-700 text-white font-medium px-8 py-3 rounded-md transition duration-300"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Produits Premium que nous utilisons"
                subtitle="Nous n’utilisons que des produits de la plus haute qualité pour assurer des ongles beaux et sains. "
                alignment="left"
                light={true}
              />
              <p className="text-gray-300 mb-6">
                La qualité est au cœur de notre philosophie de salon. Nous avons sélectionné avec soin des marques haut de gamme connues pour leurs formulations exceptionnelles, leurs couleurs vives et leurs ingrédients respectueux des ongles.
              </p>
              <div className="space-y-4">
                <div className="bg-primary-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Vernis de qualité professionnelle</h4>
                  <p className="text-gray-300">
                    Nous utilisons des vernis résistants aux copeaux de longue durée qui maintiennent leur brillance brillante et l’intégrité des couleurs.
                  </p>
                </div>
                <div className="bg-primary-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Nourishing Base & Top Coats</h4>
                  <p className="text-gray-300">
                    Nos couches protectrices de base et de finition contiennent des ingrédients fortifiants pour protéger et améliorer vos ongles naturels.
                  </p>
                </div>
                <div className="bg-primary-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Produits de luxe pour les soins des ongles</h4>
                  <p className="text-gray-300">
                    Des huiles de cuticules aux crèmes pour les mains, nous utilisons des produits haut de gamme avec des ingrédients naturels pour nourrir et hydrater.
                  </p>
                </div>
                <div className="bg-primary-700 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Accessoires pour ongles artistiques</h4>
                  <p className="text-gray-300">
                    Pour le nail art, nous utilisons des embellissements de haute qualité, des foils et des outils spécialisés pour créer des designs étonnants.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2799609/pexels-photo-2799609.jpeg"
                alt="Nail Polish Collection"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent rounded-lg hidden md:block">
                <img
                  src="https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg"
                  alt="Nail Care Products"
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
            title="Conseils pour le soin des ongles"
            subtitle="Conseils d’expert pour maintenir des ongles beaux et sains entre les visites au salon."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Daily Nail Care</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Hydratez vos mains et vos cuticules quotidiennement avec de la crème pour les mains et de l’huile de cuticule de qualité. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Portez des gants lorsque vous nettoyez ou utilisez des produits chimiques agressifs pour protéger vos ongles et le vernis. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Restez hydraté et suivez une alimentation équilibrée riche en biotine pour renforcer la force des ongles. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Évitez d’utiliser vos ongles comme outils pour ouvrir des paquets ou gratter des surfaces. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Appliquez une couche de finition tous les 2 à 3 jours pour prolonger la durée de vie de votre manucure et éviter l’écaillage. </span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Maintenir la santé des ongles</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Laissez vos ongles respirer entre deux applications de gel ou d’acrylique pour maintenir leur force naturelle. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Limez vos ongles dans un sens plutôt que de scier d’avant en arrière pour éviter qu’ils ne se fendent. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Repousser doucement les cuticules après la douche lorsqu’elles sont molles, plutôt que de les couper. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Utiliser un dissolvant sans acétone pour éviter le dessèchement excessif du lit de l’ongle et de la peau environnante. </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent font-bold mr-2">•</span>
                  <span>Programmez des manucures régulières toutes les 2 à 3 semaines pour maintenir la forme et la santé de vos ongles. </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Heures et rendez-vous du salon"
            subtitle="Planifiez votre visite à notre salon de luxe."
          />
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-luxury p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Horaires d'ouverture</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium text-primary-800">10:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium text-primary-800">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium text-primary-800">10:00 AM - 4:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">informations de rendez-vous</h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Nous vous recommandons de prendre rendez-vous à l’avance</li>
                  <li>Les personnes sans rendez-vous sont les bienvenus en fonction des disponibilités</li>
                  <li>Veuillez arriver 10 minutes avant votre rendez-vous prévu</li>
                  <li>Un avis d’annulation de 24 heures est apprécié</li>
               </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Pour fixer votre rendez-vous de service d’ongles, s’il vous plaît contacter notre salon:
              </p>
              <a
                href="tel:+15551234567"
                className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NailSalonPage;