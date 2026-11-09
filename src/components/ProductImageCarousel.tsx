import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  badge?: string | null;
  aspectRatioClass?: string;
  className?: string;
  onImageClick?: () => void;
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  alt,
  badge,
  aspectRatioClass = 'aspect-[4/5]',
  className = '',
  onImageClick,
}) => {
  const validImages = images.filter((img) => Boolean(img?.trim()));
  const displayImages = validImages.length > 0 ? validImages : ['/placeholder-perfume.png'];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div
      onClick={onImageClick}
      className={`relative w-full ${aspectRatioClass} bg-stone-100 overflow-hidden cursor-pointer select-none group ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={displayImages[currentIndex]}
          alt={`${alt} - imagen ${currentIndex + 1}`}
          initial={{ opacity: 0.6, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.7 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </AnimatePresence>

      {/* Badge Flotante (ej. Más Vendido, Exclusivo) */}
      {badge && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
          {badge}
        </span>
      )}

      {/* Flechas de Navegación (visibles en hover en desktop si hay más de 1 imagen) */}
      {displayImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Imagen anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Imagen siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicadores Inferiores */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-stone-900/40 backdrop-blur-xs">
            {displayImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => handleDotClick(index, e)}
                aria-label={`Ver foto ${index + 1}`}
                className={`transition-all rounded-full ${
                  currentIndex === index
                    ? 'w-4 h-1.5 bg-amber-400'
                    : 'w-1.5 h-1.5 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
