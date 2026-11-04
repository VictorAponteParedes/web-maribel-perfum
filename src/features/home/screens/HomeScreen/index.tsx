import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroCampaignBanner } from '@/features/home/components/HeroCampaignBanner';
import { CombosSection } from '@/features/home/components/CombosSection';
import { CategoryFilterPills } from '@/features/home/components/CategoryFilterPills';
import { ProductCard } from '@/features/home/components/ProductCard';
import { useHomeData } from '@/features/home/hooks/useHomeData';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { WebRoutes } from '@/navigation/routes';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const combosRef = useRef<HTMLDivElement>(null);

  const {
    campaign,
    combos,
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    categories,
  } = useHomeData();

  const handleScrollToCombos = () => {
    combosRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    navigate(`${WebRoutes.CATALOG}?categoria=${cat}`);
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col pb-20 md:pb-0">
      {/* Full Width Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCombos={() => navigate(WebRoutes.COMBOS)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Hero Campaign Banner (with Carousel and 4 dots) */}
        <HeroCampaignBanner
          campaign={campaign}
          onExploreClick={handleScrollToCombos}
          onNavigateToCombos={() => navigate(WebRoutes.COMBOS)}
        />

        {/* Combos & Gift Sets Section */}
        <div ref={combosRef}>
          <CombosSection
            combos={combos}
            onViewAllCombos={() => navigate(WebRoutes.COMBOS)}
          />
        </div>

        {/* Individual Fragrance Discovery Section */}
        <section className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-stone-200/80 gap-3">
            <div>
              <span className="text-[#9b7036] text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Catálogo de Fragancias Importadas
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1 tracking-tight">
                Colecciones Individuales
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                Fragancias de alta fijación listas para entrega inmediata
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(WebRoutes.CATALOG)}
                className="inline-flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-[#5a061a] border border-rose-200/80 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                <span>Ver todas las colecciones</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 font-medium">
                <SlidersHorizontal className="w-4 h-4 text-stone-400" />
                <span>{products.length} fragancias destacadas</span>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mb-6">
            <CategoryFilterPills
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-16 text-center text-stone-400 bg-white rounded-2xl border border-dashed border-stone-200">
              <p className="font-serif text-base text-stone-600">No se encontraron fragancias para tu búsqueda</p>
              <p className="text-xs text-stone-400 mt-1">Prueba con otra palabra clave o selecciona otra categoría.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
