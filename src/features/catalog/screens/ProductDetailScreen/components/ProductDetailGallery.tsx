import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailGalleryProps {
  images: string[];
  name: string;
  volumeMl: number;
  badge?: string;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
}

export const ProductDetailGallery: React.FC<ProductDetailGalleryProps> = ({
  images,
  name,
  volumeMl,
  badge,
  activeImageIndex,
  onSelectImage,
}) => {
  const currentImageUrl = images[activeImageIndex] || images[0] || '/placeholder-perfume.png';

  return (
    <div className="flex flex-col gap-4">
      {/* Visor Principal */}
      <div className="relative aspect-[4/5] sm:aspect-[1/1] bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageUrl}
            src={currentImageUrl}
            alt={`${name} - Presentación ${activeImageIndex + 1}`}
            initial={{ opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </AnimatePresence>

        {badge && (
          <span className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md">
            {badge}
          </span>
        )}

        <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-stone-800 text-xs font-bold px-3 py-1 rounded-lg shadow-sm border border-stone-200">
          {volumeMl} ml / Vaporisateur
        </span>
      </div>

      {/* Miniaturas de Fotos */}
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
              {activeImageIndex === idx && (
                <span className="absolute inset-0 bg-[#5a061a]/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
