import { useState, useEffect, useMemo } from 'react';
import { CampaignBanner } from '@/types/product.types';
import { useCategoriesStore } from '@/features/categories/store/useCategoriesStore';
import { useCombosStore } from '@/features/combos/store/useCombosStore';
import { useCatalogStore } from '@/features/catalog/store/useCatalogStore';
import { useWebSettingsStore } from '@/features/web-settings';

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

  const settings = useWebSettingsStore((state) => state.settings);
  const campaigns = useWebSettingsStore((state) => state.campaigns);
  const fetchWebSettings = useWebSettingsStore((state) => state.fetchWebSettings);

  useEffect(() => {
    fetchCategories();
    fetchCombos();
    fetchProducts();
    fetchWebSettings();
  }, [fetchCategories, fetchCombos, fetchProducts, fetchWebSettings]);

  const campaign: CampaignBanner = useMemo(() => {
    if (campaigns && campaigns.length > 0) {
      const top = campaigns[0];
      return {
        tag: top.tag || 'EDICIÓN ESPECIAL ✨',
        title: top.title || 'Regalos que enamoran · Fragancias Exclusivas',
        subtitle:
          top.subtitle ||
          `Envío gratis desde Gs. ${settings.freeShippingThreshold.toLocaleString('es-PY')} + Caja de lujo Maribel con tarjeta dedicatoria de obsequio.`,
        ctaText: top.buttonText || 'Ver Colección Especial ✨',
      };
    }

    return {
      tag: 'EDICIÓN ESPECIAL ✨',
      title: 'Regalos que enamoran · Fragancias Exclusivas',
      subtitle: `Envío gratis desde Gs. ${settings.freeShippingThreshold.toLocaleString('es-PY')} + Caja de lujo Maribel con tarjeta dedicatoria de obsequio.`,
      ctaText: 'Ver Colección Especial ✨',
    };
  }, [campaigns, settings.freeShippingThreshold]);

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
    campaigns,
    settings,
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
