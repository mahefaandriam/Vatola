import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hotel size={28} className="text-accent" />
              <div>
                <h2 className="font-serif text-xl font-bold tracking-wide">
                  VATOLA <span className="text-accent">Hôtel</span>
                </h2>
                <p className="text-xs tracking-widest">Hôtel & SPA</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Vivez un luxe inégalé dans notre hôtel élégant, avec des chambres exquises, 
              un pub sophistiqué, un spa rajeunissant et un salon de beauté haut de gamme.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-primary-700">
              Accès rapide
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Chambres & Suites
                </Link>
              </li>
              <li>
                <Link to="/pub" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Pub & Bar
                </Link>
              </li>
              <li>
                <Link to="/spa" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Spa & Bien-être
                </Link>
              </li>
              <li>
                <Link to="/nail-salon" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Salon des Ongles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-primary-700">
              Contactez-nous
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-accent" />
                <span className="text-gray-300">
                  27H10 Rue Mahazoarivo sud, Antsirabe
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-accent" />
                <span className="text-gray-300"> +261 34 11 937 77</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-accent" />
                <span className="text-gray-300">info@vatolahyantsirabe.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-4 pb-2 border-b border-primary-700">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Abonnez-vous à notre newsletter pour recevoir des offres spéciales et des mises à jour.
            </p>
            <form className="space-y-3">
              <div>
                <input
                  type="email"
                  placeholder="Votre adresse e-mail"
                  className="w-full px-4 py-2 bg-primary-700 border border-primary-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-gold-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} VATOLA HÔTEL. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;