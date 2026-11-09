import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComboDetailGalleryProps {
  images: string[];
  title: string;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
  discountBadge?: string;
  fragranceCountLabel?: string;
}

export const ComboDetailGallery: React.FC<ComboDetailGalleryProps> = ({
  images,
  title,
  activeImageIndex,
  onSelectImage,
  discountBadge,
  fragranceCountLabel,
}) => {
  const currentImageUrl = images[activeImageIndex] || images[0] || '/placeholder-perfume.png';

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/11] sm:aspect-[16/10] bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageUrl}
            src={currentImageUrl}
            alt={`${title} - imagen ${activeImageIndex + 1}`}
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>

        {/* Badges Flotantes */}
        {discountBadge && (
          <div className="absolute top-4 left-4 bg-[#fef2e8]/95 backdrop-blur-sm border border-[#fed7aa] text-[#9a3412] text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm">
            {discountBadge}
          </div>
        )}

        {fragranceCountLabel && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border border-stone-200">
            {fragranceCountLabel}
          </div>
        )}
      </div>

      {/* Miniaturas de Imágenes */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectImage(idx)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                activeImageIndex === idx
                  ? 'border-[#5a061a] ring-2 ring-[#5a061a]/20 scale-102 shadow-md'
                  : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
