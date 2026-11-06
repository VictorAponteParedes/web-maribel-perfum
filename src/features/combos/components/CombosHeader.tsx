import React from 'react';
import { ArrowLeft, Gift, Tag } from 'lucide-react';

interface CombosHeaderProps {
  totalCount: number;
  onBackToHome: () => void;
}

export const CombosHeader: React.FC<CombosHeaderProps> = ({
  totalCount,
  onBackToHome,
}) => {
  return (
    <header className="mb-6">
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
            <Gift className="w-4 h-4" />
            Catálogo Especial de Regalos
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 tracking-tight">
            Todos los Combos & Sets
          </h1>
          <p className="text-stone-500 text-sm mt-1 max-w-xl">
            Kits prediseñados con ahorro garantizado, empaque de lujo y tarjeta dedicatoria de obsequio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-[#5a061a] text-xs font-bold px-3 py-1.5 rounded-full">
            <Tag className="w-3.5 h-3.5" />
            <span>{totalCount} Combos Activos</span>
          </span>
        </div>
      </div>
    </header>
  );
};
