import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface CheckoutEmptyCartProps {
  onGoToCatalog: () => void;
}

export const CheckoutEmptyCart: React.FC<CheckoutEmptyCartProps> = ({
  onGoToCatalog,
}) => {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center">
      <div className="w-20 h-20 bg-rose-50 text-[#5a061a] rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
        <ShoppingBag className="w-10 h-10" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
        Tu bolsa está vacía
      </h2>
      <p className="text-sm text-stone-500 mb-6">
        No tienes productos seleccionados para finalizar la compra. Explora nuestro catálogo y agrega tus fragancias favoritas.
      </p>
      <button
        type="button"
        onClick={onGoToCatalog}
        className="inline-flex items-center gap-2 bg-[#5a061a] hover:bg-[#720c24] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
      >
        <span>Explorar Catálogo</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
