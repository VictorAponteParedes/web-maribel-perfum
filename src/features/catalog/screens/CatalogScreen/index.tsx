import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCartBar } from '@/components/layout/FloatingCartBar';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { ProductCard } from '@/features/home/components/ProductCard';
import { CategoryFilterPills } from '@/features/home/components/CategoryFilterPills';
import { Pagination } from '@/components/ui/Pagination';
import { ALL_PRODUCTS } from '../../data/products.data';
import { WebRoutes } from '@/navigation/routes';

export const CatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get('categoria') || 'Todos';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl);
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');

  // Paginación (igual que en el panel admin, sin scroll infinito)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const categories = ['Todos', 'Femenino', 'Masculino', 'Árabe', 'Unisex'];

  // Sincronizar parámetro URL si cambia externamente
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Reset a página 1 al cambiar filtros o búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'Todos') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: cat });
    }
  };

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'Todos' || product.category === activeCategory;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return product.name.toLowerCase().includes(q) || product.brand.toLowerCase().includes(q);
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  const totalItems = filteredProducts.length;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCombos={() => navigate(WebRoutes.COMBOS)}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Navigation & Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(WebRoutes.HOME)}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm py-1.5 px-3 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200/80">
            <div>
              <span className="text-[#9b7036] text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Catálogo Exclusivo
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 tracking-tight">
                Colecciones Individuales
              </h1>
              <p className="text-stone-500 text-sm mt-1 max-w-xl">
                Fragancias importadas 100% originales por unidad, seleccionadas por fijación y listas para entrega inmediata.
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'default' | 'price_asc' | 'price_desc')}
                aria-label="Ordenar productos"
                className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 outline-none cursor-pointer focus:border-[#5a061a]"
              >
                <option value="default">Más Populares</option>
                <option value="price_asc">Precio: Menor a Mayor</option>
                <option value="price_desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4">
            <CategoryFilterPills
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        </div>

        {/* Products Grid (4 cols on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="py-20 text-center text-stone-400 bg-white rounded-3xl border border-dashed border-stone-200">
            <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="font-serif text-lg text-stone-700">No hay fragancias que coincidan con tu búsqueda</p>
            <p className="text-xs text-stone-400 mt-1">Prueba cambiando la categoría o usando otro término.</p>
          </div>
        )}

        {/* Pagination Bar Component */}
        {totalItems > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={pageSize}
              pageSizeOptions={[8, 12, 16, 24]}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              showPageSizeSelector={true}
              showInfo={true}
            />
          </div>
        )}
      </main>

      <Footer />
      <FloatingCartBar />
      <CartDrawer onProceedToCheckout={() => navigate(WebRoutes.CHECKOUT)} />
    </div>
  );
};
