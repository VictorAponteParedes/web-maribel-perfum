import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/features/cart/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      type: 'product',
      title: product.name,
      subtitle: `${product.brand} · ${product.volumeMl}ml`,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group"
    >
      <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-stone-700 text-[10.5px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-xs">
          {product.volumeMl}ml
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#9b7036]">
          {product.brand}
        </span>
        <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 line-clamp-1 mt-1 group-hover:text-[#5a061a] transition-colors">
          {product.name}
        </h4>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="font-bold text-base sm:text-lg text-[#5a061a]">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-rose-50 text-[#5a061a] hover:bg-[#5a061a] hover:text-white'
            }`}
            aria-label={`Agregar ${product.name}`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Listo</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
