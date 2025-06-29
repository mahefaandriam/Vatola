import React from 'react';
import { Star } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, image, text, rating, date } = testimonial;

  return (
    <div className="bg-white rounded-lg shadow-luxury p-6 md:p-8">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-serif font-medium text-primary-800">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < rating ? 'text-accent fill-accent' : 'text-gray-300'} mr-1`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">"{text}"</p>
    </div>
  );
};

export default TestimonialCard;