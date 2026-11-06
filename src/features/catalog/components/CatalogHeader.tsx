import React from 'react';
import { ArrowLeft, Sparkles, SlidersHorizontal } from 'lucide-react';
import { CatalogSortOption } from '../types/catalog.types';

interface CatalogHeaderProps {
  sortBy: CatalogSortOption;
  onSortChange: (newSort: CatalogSortOption) => void;
  onBackToHome: () => void;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  sortBy,
  onSortChange,
  onBackToHome,
}) => {
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm py-1.5 px-3 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <span className="text-[#9b7036] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            Catálogo Exclusivo
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 tracking-tight">
            Colecciones Individuales
          </h1>
          <p className="text-stone-500 text-sm mt-1 max-w-xl">
            Fragancias importadas 100% originales por unidad, seleccionadas por fijación y listas para entrega inmediata.
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-4 h-4 text-stone-400" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as CatalogSortOption)}
            aria-label="Ordenar productos"
            className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 outline-none cursor-pointer focus:border-[#5a061a]"
          >
            <option value="default">Más Populares</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="name_asc">Nombre: A a Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};
