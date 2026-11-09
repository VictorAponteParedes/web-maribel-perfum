import React from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { logoAdmin } from '@/assets';

interface CheckoutHeaderProps {
  onBackToHome: () => void;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBackToHome }) => {
  return (
    <header className="bg-white border-b border-stone-200/90 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm py-1.5 px-3 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la tienda</span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src={logoAdmin}
            alt="Maribel Perfumería"
            className="w-8 h-8 rounded-full object-cover shadow-xs border border-stone-200"
          />
          <span className="font-serif font-bold text-base sm:text-lg text-[#5a061a]">
            Maribel Perfum
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200/80">
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Compra Segura</span>
        </div>
      </div>
    </header>
  );
};
