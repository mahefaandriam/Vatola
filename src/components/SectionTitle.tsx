import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = 'center',
  light = false,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const textColor = light ? 'text-white' : 'text-primary-800';
  const subtitleColor = light ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses[alignment]}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${textColor}`}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className={`${subtitleColor}`}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: alignment === 'center' ? '120px' : '80px' }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className={`h-1 bg-accent mt-4 ${alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''}`}
      />
    </div>
  );
};

export default SectionTitle;