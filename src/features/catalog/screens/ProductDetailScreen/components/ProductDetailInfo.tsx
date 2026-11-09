import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

interface ProductDetailInfoProps {
  brand: string | { name?: string };
  name: string;
  category?: string | { name?: string };
  price: number;
  originalPrice?: number;
}

export const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({
  brand,
  name,
  category,
  price,
  originalPrice,
}) => {
  const displayBrand =
    typeof brand === 'object' && brand !== null
      ? (brand as { name?: string }).name || 'Maribel Perfum'
      : String(brand || 'Maribel Perfum');

  const displayCategory =
    typeof category === 'object' && category !== null
      ? (category as { name?: string }).name || 'Alta Fragancia'
      : String(category || 'Alta Fragancia');

  return (
    <>
      <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#9b7036] mb-1">
        {displayBrand}
      </span>

      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
        {name}
      </h1>

      {/* Categoría & Disponibilidad */}
      <div className="flex items-center gap-3 mt-3">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
          {displayCategory}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Disponible en boutique
        </span>
      </div>

      {/* Precio & Opciones de Pago */}
      <div className="mt-6 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl sm:text-4xl font-bold text-[#5a061a]">
            {formatCurrency(price)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm sm:text-base text-stone-400 line-through">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Efectivo o Transferencia al recibir · Opciones en cuotas disponibles
        </p>
      </div>
    </>
  );
};
