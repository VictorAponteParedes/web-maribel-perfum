import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryDropdown } from '@/components';
import { Pagination } from '@/components/ui/Pagination';
import { WebRoutes } from '@/navigation/routes';
import { useCatalog } from '../../hooks';
import {
  CatalogHeader,
  CatalogGrid,
  CatalogSkeleton,
  CatalogEmptyState,
} from '../../components';

export const CatalogScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    filteredProducts,
    paginatedProducts,
    totalItems,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    activeCategory,
    handleSelectCategory,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    dbCategories,
    refetch,
  } = useCatalog();

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col pb-20 md:pb-0">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onScrollToCombos={() => navigate(WebRoutes.COMBOS)}
        onSelectCategory={handleSelectCategory}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <CatalogHeader
          sortBy={sortBy}
          onSortChange={setSortBy}
          onBackToHome={() => navigate(WebRoutes.HOME)}
        />

        {/* Category Dropdown Selector */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <CategoryDropdown
            categories={dbCategories}
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            totalProductsCount={filteredProducts.length}
          />
        </div>

        {/* Body content based on state */}
        {isLoading ? (
          <CatalogSkeleton count={pageSize} />
        ) : error ? (
          <CatalogEmptyState error={error} onRetry={refetch} />
        ) : filteredProducts.length > 0 ? (
          <>
            <CatalogGrid products={paginatedProducts} />

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
          </>
        ) : (
          <CatalogEmptyState />
        )}
      </main>

      <Footer />
    </div>
  );
};
