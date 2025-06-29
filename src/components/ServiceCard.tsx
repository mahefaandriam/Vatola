import React from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { name, description, price, duration, image } = service;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-luxury">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">{name}</h3>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {(price || duration) && (
          <div className="flex flex-wrap justify-between items-center">
            {price && <span className="font-semibold text-primary-800">${price}</span>}
            {duration && <span className="text-sm text-gray-500">{duration}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;