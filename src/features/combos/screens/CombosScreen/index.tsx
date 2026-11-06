import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WebRoutes } from '@/navigation/routes';
import { useCombos } from '../../hooks';
import {
  CombosHeader,
  CombosTagsFilter,
  CombosGrid,
  CombosSkeleton,
  CombosEmptyState,
} from '../../components';

export const CombosScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    combos,
    filteredCombos,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    tags,
    refetch,
  } = useCombos();

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col pb-20 md:pb-0">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCombos={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onSelectCategory={(cat) =>
          navigate(`${WebRoutes.CATALOG}?categoria=${cat}`)
        }
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <CombosHeader
          totalCount={combos.length}
          onBackToHome={() => navigate(WebRoutes.HOME)}
        />

        <CombosTagsFilter
          tags={[...tags]}
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />

        {isLoading ? (
          <CombosSkeleton count={6} />
        ) : error ? (
          <CombosEmptyState error={error} onRetry={refetch} />
        ) : filteredCombos.length > 0 ? (
          <CombosGrid combos={filteredCombos} />
        ) : (
          <CombosEmptyState />
        )}
      </main>

      <Footer />
    </div>
  );
};
