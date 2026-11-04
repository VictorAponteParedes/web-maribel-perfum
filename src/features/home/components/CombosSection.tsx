import React from 'react';
import { Tag, Sparkles, ArrowRight } from 'lucide-react';
import { Combo } from '@/types/product.types';
import { ComboCard } from './ComboCard';

interface CombosSectionProps {
  combos: Combo[];
  onViewAllCombos?: () => void;
}

export const CombosSection: React.FC<CombosSectionProps> = ({ combos, onViewAllCombos }) => {
  return (
    <section className="mt-10 mb-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-stone-200/80 gap-3">
        <div>
          <span className="text-[#9b7036] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Packs listos para regalar
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 tracking-tight">
            Combos & Sets de Regalo
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Ahorro garantizado y presentación de alta perfumería con caja de lujo
          </p>
        </div>

        {/* Right Actions: Precios especiales badge + "Ver todos los combos" Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-[#5a061a] border border-rose-200/80 text-xs font-bold">
            <Tag className="w-3.5 h-3.5 stroke-[2]" />
            <span>Ahorro exclusivo</span>
          </div>

          {onViewAllCombos && (
            <button
              type="button"
              onClick={onViewAllCombos}
              className="inline-flex items-center gap-2 bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-[#5a061a]/20 transition-all cursor-pointer"
            >
              <span>Ver todos los combos</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Responsive Grid for Desktop & Tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {combos.map((combo) => (
          <ComboCard key={combo.id} combo={combo} />
        ))}
      </div>
    </section>
  );
};
