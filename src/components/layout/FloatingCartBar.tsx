import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';

export const FloatingCartBar: React.FC = () => {
  const itemsCount = useCartStore((state) => state.getTotalItemsCount());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const openDrawer = useCartStore((state) => state.openDrawer);

  if (itemsCount === 0) return null;

  return (
    <>
      {/* Mobile Floating Pill (Visible only on < md) */}
      <aside aria-label="Resumen de compra rápida" className="md:hidden fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-[0_10px_25px_-5px_rgba(90,6,26,0.15)] p-2.5 px-3.5 flex items-center justify-between transition-all animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#5a061a]">
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-stone-500 font-medium leading-none">
                Total estimado
              </span>
              <span className="text-sm font-bold text-[#5a061a] leading-tight mt-0.5">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={openDrawer}
            className="bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-[#5a061a]/25 transition-all cursor-pointer"
          >
            <span>Ver Carrito ({itemsCount})</span>
            <span className="text-sm">🛍️</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </aside>

      {/* Desktop Floating Shortcut (Bottom Right) */}
      <aside aria-label="Bolsa de compra flotante" className="hidden md:flex fixed bottom-8 right-8 z-40">
        <button
          type="button"
          onClick={openDrawer}
          className="bg-[#5a061a] hover:bg-[#720c24] text-white px-5 py-3.5 rounded-full shadow-2xl shadow-[#5a061a]/40 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {itemsCount}
            </span>
          </div>
          <div className="flex flex-col text-left leading-none pr-1">
            <span className="text-[11px] text-rose-200">Tu Bolsa</span>
            <span className="text-sm font-bold mt-0.5">{formatCurrency(totalPrice)}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-200" />
        </button>
      </aside>
    </>
  );
};
