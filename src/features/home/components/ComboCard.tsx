import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, Eye } from 'lucide-react';
import { Combo } from '@/types/product.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';
import { getComboDetailRoute } from '@/navigation/routes';

interface ComboCardProps {
  combo: Combo;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const navigate = useNavigate();
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const images = (combo.images && combo.images.length > 0)
    ? combo.images
    : combo.imageUrl
    ? [combo.imageUrl]
    : [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: combo.id,
      type: 'combo',
      title: combo.title,
      subtitle: combo.fragranceCountLabel,
      price: combo.price,
      originalPrice: combo.originalPrice,
      imageUrl: combo.imageUrl,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleNavigateDetail = () => {
    navigate(getComboDetailRoute(combo.id));
  };

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleNavigateDetail}
      className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Image Carousel Container with Badges */}
      <div className="relative">
        <ProductImageCarousel
          images={images}
          alt={combo.title}
          aspectRatioClass="aspect-[16/10]"
          onImageClick={handleNavigateDetail}
        />

        {/* Top-Left Savings Badge */}
        {combo.discountBadge && (
          <div className="absolute top-3 left-3 z-10 bg-[#fef2e8]/95 backdrop-blur-sm border border-[#fed7aa] text-[#9a3412] text-xs font-bold px-3 py-1 rounded-lg shadow-sm pointer-events-none">
            {combo.discountBadge}
          </div>
        )}

        {/* Bottom-Right Fragrance Count Badge */}
        {combo.fragranceCountLabel && (
          <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-sm text-stone-800 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
            {combo.fragranceCountLabel}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          {/* Kicker */}
          <span className="text-[#9b7036] text-[11px] font-bold tracking-wider uppercase">
            {combo.kicker}
          </span>
          <span className="text-[11px] text-stone-400 flex items-center gap-1 group-hover:text-[#5a061a] transition-colors">
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Ver set</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-stone-900 leading-snug group-hover:text-[#5a061a] transition-colors">
          {combo.title}
        </h3>

        {/* Description */}
        <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-2">
          {combo.description}
        </p>

        {/* Price & Action Footer */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-stone-400 line-through">
              {formatCurrency(combo.originalPrice)}
            </span>
            <span className="font-serif font-bold text-lg sm:text-xl text-[#5a061a]">
              {formatCurrency(combo.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-[#5a061a] hover:bg-[#720c24] text-white shadow-[#5a061a]/25'
            }`}
            aria-label={`Agregar combo ${combo.title} a la bolsa`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Agregado!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};
