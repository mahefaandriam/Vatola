import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hotel, ChevronDown } from 'lucide-react';
import { useRef } from 'react';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //const handleServicesMouseEnter = () => setIsServicesOpen(true);
  //const handleServicesMouseLeave = () => setIsServicesOpen(false);
   const handleServicesMouseEnter = () => {
    if(timeoutRef.current) clearTimeout(timeoutRef.current); // Cancel any pending close
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    // Set a delay before closing
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if(timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleServicesClick = () => setIsServicesOpen((prev) => !prev);

  const headerClass = isScrolled
    ? 'bg-white shadow-md text-primary-800 py-4'
    : 'bg-transparent text-white py-6';

  const isHomePage = location.pathname === '/';
  
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${headerClass} ${
        !isHomePage && !isScrolled ? 'bg-primary-800' : ''
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Hotel size={28} className="text-accent" />
            <div>
              <h1 className="font-serif text-xl md:text-2xl font-bold tracking-wide">
                VATOLA <span className="text-accent">Hôtel</span>
              </h1>
              <p className="text-xs md:text-sm tracking-widest">Hôtel & SPA</p>
            </div>
          </Link>
          <Link to="/profil">Mon Profil</Link>
          
          <LogoutButton />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-accent transition duration-200">
              Accueil
            </Link>
            <Link to="/rooms" className="hover:text-accent transition duration-200">
              Chambres
            </Link>
            <div
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                to={'#'}
                className="flex items-center hover:text-accent transition-colors duration-200"
                onClick={handleServicesClick}
                aria-expanded={isServicesOpen}
              >
                Services <ChevronDown size={16} className={`ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              <div
                className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition duration-200 transform origin-top-right
                  ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
              >
                <div className="py-1">
                  <Link to="/pub" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pub & Bar
                  </Link>
                  <Link to="/spa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Spa & Bien-être
                  </Link>
                  <Link to="/nail-salon" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Salon des Ongles
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/contact" className="hover:text-accent transition duration-200">
              Contact
            </Link>
            <Link
              to="/booking"
              className="bg-accent hover:bg-gold-700 text-white px-6 py-2 rounded-md transition duration-300"
            >
              Réservez Maintenant
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-primary-800 z-50 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center mt-12 space-y-6 text-white">
          <Link
            to="/"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Accueil
          </Link>
          <Link
            to="/rooms"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Chambres
          </Link>
          <Link
            to="/pub"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Pub & Bar
          </Link>
          <Link
            to="/spa"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Spa & Bien-être
          </Link>
          <Link
            to="/nail-salon"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Salon des Ongles
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="text-xl font-medium hover:text-accent transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/booking"
            onClick={closeMenu}
            className="bg-accent hover:bg-gold-700 text-white px-8 py-3 rounded-md transition duration-300 mt-4"
          >
            Réservez Maintenant
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;