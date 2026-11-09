import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, Eye } from 'lucide-react';
import { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWebSettingsStore } from '@/features/web-settings';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';
import { getProductDetailRoute } from '@/navigation/routes';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const cartQty = useCartStore(
    (state) => state.items.find((i) => i.id === product.id)?.quantity ?? 0
  );
  const showStockInWeb = useWebSettingsStore(
    (state) => state.settings.showStockInWeb ?? true
  );
  const lowStockThreshold = useWebSettingsStore(
    (state) => state.settings.lowStockThreshold ?? 5
  );

  const isOutOfStock = product.stock <= 0;
  const isMaxInCart = product.stock > 0 && cartQty >= product.stock;

  const images = (product.images && product.images.length > 0)
    ? product.images
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isMaxInCart) {
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 1800);
      return;
    }

    const success = addItem({
      id: product.id,
      barcode: product.barcode,
      type: 'product',
      title: product.name,
      subtitle: `${product.brand} · ${product.volumeMl}ml`,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      stock: product.stock,
    });

    if (success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    } else {
      setLimitReached(true);
      setTimeout(() => setLimitReached(false), 1800);
    }
  };

  const handleNavigateDetail = () => {
    navigate(getProductDetailRoute(product.id));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleNavigateDetail}
      className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group cursor-pointer"
    >
      <div className="relative">
        <ProductImageCarousel
          images={images}
          alt={product.name}
          badge={product.badge}
          aspectRatioClass="aspect-[4/5]"
          onImageClick={handleNavigateDetail}
        />
        <span className="absolute bottom-2.5 right-2.5 z-10 bg-white/95 backdrop-blur-xs text-stone-700 text-[10.5px] sm:text-xs font-semibold px-2 py-0.5 rounded shadow-xs pointer-events-none">
          {product.volumeMl}ml
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#9b7036] truncate">
            {product.brand}
          </span>
          {showStockInWeb ? (
            <span
              className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                isOutOfStock
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : product.stock <= lowStockThreshold
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isOutOfStock
                ? 'Agotado'
                : product.stock <= lowStockThreshold
                ? `¡Últimas ${product.stock} uds!`
                : `Stock: ${product.stock} uds`}
            </span>
          ) : (
            <span className="text-[11px] text-stone-400 flex items-center gap-1 group-hover:text-[#5a061a] transition-colors shrink-0">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Ver detalle</span>
            </span>
          )}
        </div>

        <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 line-clamp-1 mt-1 group-hover:text-[#5a061a] transition-colors">
          {product.name}
        </h4>

        {(limitReached || isMaxInCart) && !isOutOfStock && (
          <p className="text-[10.5px] font-semibold text-amber-700 mt-1">
            Máximo disponible en tu bolsa ({product.stock} uds)
          </p>
        )}

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
            disabled={isOutOfStock || isMaxInCart}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
              isOutOfStock
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : isMaxInCart
                ? 'bg-amber-50 text-amber-800 border border-amber-200 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white shadow-emerald-600/20 cursor-pointer'
                : 'bg-rose-50 text-[#5a061a] hover:bg-[#5a061a] hover:text-white cursor-pointer'
            }`}
            aria-label={`Agregar ${product.name}`}
          >
            {isOutOfStock ? (
              <span>Agotado</span>
            ) : isMaxInCart ? (
              <span>Máx. ({product.stock})</span>
            ) : added ? (
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
