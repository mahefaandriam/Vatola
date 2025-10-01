import React from 'react';
import { Star, UserRoundPen } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onShow?: (testimonial: Testimonial) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, onShow }) => {
  const { name, image, text, rating, date } = testimonial;

  return (
    <div className="bg-white rounded-lg shadow-luxury p-6 md:p-8">
      <div className="flex items-center mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <UserRoundPen className="text-accent fill-accent" />
        )}
        <div>
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

      <p className="text-gray-600 italic h-30 overflow-hidden text-ellipsis md:text-clip">
        "{text.length > 120 ? text.slice(0, 120) + '...' : text}"
      </p>
      {onShow && (
        <button
          className="text-accent underline mt-2 text-sm"
          onClick={() => onShow(testimonial)}
        >
          Plus
        </button>
      )}
    </div>
  );
};

export default TestimonialCard;