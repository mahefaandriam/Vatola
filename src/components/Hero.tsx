import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  height?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  image,
  ctaText = 'Réservez Maintenant',
  ctaLink = '/booking',
  overlay = true,
  height = 'h-screen'
}) => {
  return (
    <div
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      )}
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
          >
            {subtitle}
          </motion.p>
        )}
        
        {ctaText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              to={ctaLink}
              className="inline-block bg-accent hover:bg-gold-700 text-white font-medium px-8 py-3 rounded-md text-lg transition duration-300"
            >
              {ctaText}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hero;