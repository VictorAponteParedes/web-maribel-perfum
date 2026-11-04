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
      {/* Mobile Floating Circular Cart Button (Generous Touch Target & High Visibility) */}
      <aside
        aria-label="Bolsa de compra rápida"
        className="md:hidden fixed bottom-20 right-4 z-40 pointer-events-auto"
      >
        <button
          type="button"
          onClick={openDrawer}
          className="w-15 h-15 w-[60px] h-[60px] bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white rounded-full shadow-[0_10px_30px_rgba(90,6,26,0.45)] border-2 border-white flex items-center justify-center transition-all cursor-pointer relative"
          aria-label={`Ver bolsa con ${itemsCount} productos`}
        >
          <ShoppingBag className="w-7 h-7 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white">
            {itemsCount}
          </span>
        </button>
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
