import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Store, Gift, ShoppingBag, MessageCircleHeart } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { WebRoutes } from '@/navigation/routes';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemsCount = useCartStore((state) => state.getTotalItemsCount());
  const openDrawer = useCartStore((state) => state.openDrawer);

  const pathname = location.pathname;

  // Detectar pestaña activa según la URL actual
  const isCatalogoActive = pathname === WebRoutes.HOME || pathname === WebRoutes.CATALOG;
  const isRegalosActive = pathname === WebRoutes.COMBOS;

  const handleTabClick = (tab: 'catalogo' | 'regalos' | 'bolsa' | 'asesoria') => {
    if (tab === 'catalogo') {
      if (pathname === WebRoutes.HOME) {
        navigate(WebRoutes.CATALOG);
      } else {
        navigate(WebRoutes.HOME);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'regalos') {
      navigate(WebRoutes.COMBOS);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-3 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {/* Catálogo Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('catalogo')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            isCatalogoActive
              ? 'text-[#5a061a] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Store className={`w-5 h-5 ${isCatalogoActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Catálogo</span>
        </button>

        {/* Regalos (Combos) Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('regalos')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            isRegalosActive
              ? 'text-[#5a061a] font-bold scale-105'
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <Gift className={`w-5 h-5 ${isRegalosActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] tracking-tight">Regalos</span>
        </button>

        {/* Mi Bolsa Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('bolsa')}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-stone-500 hover:text-[#5a061a] font-medium transition-all cursor-pointer"
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

        {/* Asesoría WhatsApp Tab */}
        <button
          type="button"
          onClick={() => handleTabClick('asesoria')}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-stone-500 hover:text-[#5a061a] font-medium transition-all cursor-pointer"
        >
          <MessageCircleHeart className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] tracking-tight">Asesoría</span>
        </button>
      </div>
    </nav>
  );
};
