import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCatalogStore } from '../store/useCatalogStore';
import { useCategoriesStore } from '@/features/categories/store/useCategoriesStore';
import { filterProducts, sortProducts } from '../utils/catalog.utils';
import { CatalogSortOption } from '../types/catalog.types';

export const useCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('categoria') || 'Todos';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(categoryFromUrl);
  const [sortBy, setSortBy] = useState<CatalogSortOption>('default');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const products = useCatalogStore((state) => state.products);
  const isLoading = useCatalogStore((state) => state.isLoading);
  const error = useCatalogStore((state) => state.error);
  const fetchProducts = useCatalogStore((state) => state.fetchProducts);

  const dbCategories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Reset de página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy]);

  const handleSelectCategory = useCallback(
    (category: string) => {
      setActiveCategory(category);
      if (category === 'Todos') {
        searchParams.delete('categoria');
        setSearchParams(searchParams);
      } else {
        setSearchParams({ categoria: category });
      }
    },
    [searchParams, setSearchParams]
  );

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      category: activeCategory,
      searchQuery,
    });
    return sortProducts(filtered, sortBy);
  }, [products, activeCategory, searchQuery, sortBy]);

  const totalItems = filteredProducts.length;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const refetch = useCallback(() => {
    return fetchProducts(true);
  }, [fetchProducts]);

  return {
    products,
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
  };
};
