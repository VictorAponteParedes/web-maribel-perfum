import { useState, useEffect } from 'react';
import { CampaignBanner } from '@/types/product.types';
import { useCategoriesStore } from '@/features/categories/store/useCategoriesStore';
import { useCombosStore } from '@/features/combos/store/useCombosStore';
import { useCatalogStore } from '@/features/catalog/store/useCatalogStore';

export const useHomeData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const dbCategories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const rawCombos = useCombosStore((state) => state.combos);
  const isLoadingCombos = useCombosStore((state) => state.isLoading);
  const fetchCombos = useCombosStore((state) => state.fetchCombos);

  const rawProducts = useCatalogStore((state) => state.products);
  const isLoadingProducts = useCatalogStore((state) => state.isLoading);
  const fetchProducts = useCatalogStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchCategories();
    fetchCombos();
    fetchProducts();
  }, [fetchCategories, fetchCombos, fetchProducts]);

  const campaign: CampaignBanner = {
    tag: 'EDICIÓN ESPECIAL ✨',
    title: 'Regalos que enamoran · Fragancias Exclusivas',
    subtitle: 'Envío gratis desde Gs. 250.000 + Caja de lujo Maribel con tarjeta dedicatoria de obsequio.',
    ctaText: 'Ver Colección Especial ✨',
  };

  const filteredCombos = rawCombos.filter((combo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      combo.title.toLowerCase().includes(query) ||
      combo.description.toLowerCase().includes(query)
    );
  });

  const filteredProducts = rawProducts.filter((product) => {
    const matchesCategory =
      activeCategory === 'Todos' ||
      activeCategory === 'Combos' ||
      product.category?.toLowerCase() === activeCategory.toLowerCase();

    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );
  });

  return {
    campaign,
    combos: filteredCombos,
    isLoadingCombos,
    products: filteredProducts,
    isLoadingProducts,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    dbCategories,
  };
};
