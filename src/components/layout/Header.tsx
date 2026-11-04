import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Sparkles, X, MessageCircle, Gift } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { logoAdmin } from '@/assets';
import { WebRoutes } from '@/navigation/routes';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onScrollToCombos?: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onScrollToCombos,
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const totalItemsCount = useCartStore((state) => state.getTotalItemsCount());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const openDrawer = useCartStore((state) => state.openDrawer);

  const handleWhatsappAdvisor = () => {
    window.open(
      'https://wa.me/595981000000?text=Hola%20Maribel%20Perfumer%C3%ADa,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20personalizada%20sobre%20fragancias%20y%20regalos',
      '_blank'
    );
  };

  const handleLogoClick = () => {
    navigate(WebRoutes.HOME);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    } else {
      navigate(`${WebRoutes.CATALOG}?categoria=${cat}`);
    }
  };

  const handleCombosNav = () => {
    if (onScrollToCombos) {
      onScrollToCombos();
    } else {
      navigate(WebRoutes.COMBOS);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-[#5a061a] via-[#750c25] to-[#5a061a] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>
          Envíos a todo el país · <strong>Caja de lujo de obsequio</strong> con tarjeta dedicatoria en compras desde Gs. 250.000
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo with Official Image Icon */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-md shadow-[#5a061a]/25 flex-shrink-0 border border-stone-200/80 group-hover:scale-105 transition-transform">
            <img
              src={logoAdmin}
              alt="Maribel Perfum Icono"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#5a061a] leading-none">
              Maribel Perfum
            </h1>
            <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.25em] text-[#9b7036] uppercase mt-1">
              Alta Perfumería & Regalos
            </span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Buscar por fragancia, marca o notas olfativas..."
            className="w-full bg-stone-50 border border-stone-200 rounded-full pl-10 pr-9 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#880e2b]/15 focus:border-[#880e2b] transition-all"
          />
          {searchQuery.length > 0 && onSearchChange && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-600">
          <button
            type="button"
            onClick={handleCombosNav}
            className="hover:text-[#5a061a] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Gift className="w-4 h-4 text-[#9b7036]" />
            <span>Sets & Combos</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNav('Femenino')}
            className="hover:text-[#5a061a] transition-colors cursor-pointer"
          >
            Femeninos
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNav('Masculino')}
            className="hover:text-[#5a061a] transition-colors cursor-pointer"
          >
            Masculinos
          </button>
          <button
            type="button"
            onClick={() => handleCategoryNav('Árabe')}
            className="hover:text-[#5a061a] transition-colors cursor-pointer"
          >
            Árabes
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Asesoría VIP WhatsApp Button */}
          <button
            type="button"
            onClick={handleWhatsappAdvisor}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#25D366]/40 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100/70 text-xs font-semibold transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>Asesoría WhatsApp</span>
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={openDrawer}
            className="flex items-center gap-2.5 bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md shadow-[#5a061a]/20 transition-all cursor-pointer"
            aria-label="Ver bolsa de compras"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[10px] text-rose-200 font-medium">Mi Bolsa</span>
              <span className="text-xs font-bold mt-0.5">
                {totalItemsCount > 0 ? formatCurrency(totalPrice) : 'Gs. 0'}
              </span>
            </div>
          </button>

          {/* Mobile Avatar Emblem Button */}
          <div className="sm:hidden w-8 h-8 rounded-full overflow-hidden shadow-sm border border-stone-200">
            <img src={logoAdmin} alt="Maribel Icono" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      {onSearchChange && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por fragancia, marca..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-9 py-2 text-xs text-stone-800 placeholder:text-stone-400 shadow-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#880e2b]/15 focus:border-[#880e2b]"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
