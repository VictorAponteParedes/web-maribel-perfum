import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Tag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ComboCard } from '@/features/home/components/ComboCard';
import { ALL_COMBOS } from '../../data/combos.data';
import { WebRoutes } from '@/navigation/routes';

export const CombosScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Todos');

  const tags = ['Todos', 'Para Ella', 'Para Él', 'Árabes', 'Tríos'];

  const filteredCombos = ALL_COMBOS.filter((combo) => {
    const matchesTag =
      selectedTag === 'Todos' ||
      (selectedTag === 'Para Ella' && (combo.kicker.includes('FLORAL') || combo.kicker.includes('BOUTIQUE'))) ||
      (selectedTag === 'Para Él' && (combo.kicker.includes('VENTAS') || combo.kicker.includes('MASCULINO'))) ||
      (selectedTag === 'Árabes' && combo.kicker.includes('ORIENTAL')) ||
      (selectedTag === 'Tríos' && combo.fragranceCountLabel.includes('3'));

    if (!matchesTag) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return combo.title.toLowerCase().includes(q) || combo.description.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col pb-20 md:pb-0">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCombos={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onSelectCategory={(cat) => navigate(`${WebRoutes.CATALOG}?categoria=${cat}`)}
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
                <Gift className="w-4 h-4" />
                Catálogo Especial de Regalos
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1 tracking-tight">
                Todos los Combos & Sets
              </h1>
              <p className="text-stone-500 text-sm mt-1 max-w-xl">
                Kits prediseñados con ahorro garantizado, empaque de lujo y tarjeta dedicatoria de obsequio.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-[#5a061a] text-xs font-bold px-3 py-1.5 rounded-full">
                <Tag className="w-3.5 h-3.5" />
                <span>{filteredCombos.length} Combos Activos</span>
              </span>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#5a061a] text-white shadow-sm shadow-[#5a061a]/25'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>

        {filteredCombos.length === 0 && (
          <div className="py-20 text-center text-stone-400 bg-white rounded-3xl border border-dashed border-stone-200">
            <Gift className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <p className="font-serif text-lg text-stone-700">No se encontraron combos con ese criterio</p>
            <p className="text-xs text-stone-400 mt-1">Prueba seleccionando otra etiqueta o borra tu búsqueda.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
