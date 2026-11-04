import React from 'react';
import { Store, Gift, ShoppingBag, MessageCircleHeart } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';

export type NavTab = 'catalogo' | 'regalos' | 'bolsa' | 'asesoria';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const itemsCount = useCartStore((state) => state.getTotalItemsCount());
  const openDrawer = useCartStore((state) => state.openDrawer);

  const handleTabClick = (tab: NavTab) => {
    if (tab === 'bolsa') {
      openDrawer();
      return;
    }
    if (tab === 'asesoria') {
      window.open(
        'https://wa.me/595981000000?text=Hola%20Maribel%20Perfumer%C3%ADa,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20personalizada%20sobre%20fragancias',
        '_blank'
      );
      return;
    }
    onTabChange(tab);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-3 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <button
          type="button"
          onClick={() => handleTabClick('catalogo')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'catalogo'
              ? 'text-[#5a061a] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Store className={`w-5 h-5 ${activeTab === 'catalogo' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Catálogo</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('regalos')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'regalos'
              ? 'text-[#5a061a] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Gift className={`w-5 h-5 ${activeTab === 'regalos' ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Regalos</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('bolsa')}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-stone-500 hover:text-[#5a061a] font-medium transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {itemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#5a061a] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Mi Bolsa</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick('asesoria')}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-stone-500 font-medium transition-all"
        >
          <MessageCircleHeart className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] tracking-tight">Asesoría</span>
        </button>
      </div>
    </nav>
  );
};
