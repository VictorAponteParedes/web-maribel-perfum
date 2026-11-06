import { useState, useEffect } from 'react';
import { CampaignBanner, Product } from '@/types/product.types';
import { useCategoriesStore } from '@/features/categories/store/useCategoriesStore';
import { useCombosStore } from '@/features/combos/store/useCombosStore';

export const useHomeData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const dbCategories = useCategoriesStore((state) => state.categories);
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const rawCombos = useCombosStore((state) => state.combos);
  const isLoadingCombos = useCombosStore((state) => state.isLoading);
  const fetchCombos = useCombosStore((state) => state.fetchCombos);

  useEffect(() => {
    fetchCategories();
    fetchCombos();
  }, [fetchCategories, fetchCombos]);

  const campaign: CampaignBanner = {
    tag: 'EDICIÓN ESPECIAL ✨',
    title: 'Regalos que enamoran · Fragancias Exclusivas',
    subtitle: 'Envío gratis desde Gs. 250.000 + Caja de lujo Maribel con tarjeta dedicatoria de obsequio.',
    ctaText: 'Ver Colección Especial ✨',
  };

  const products: Product[] = [
    {
      id: 'prod-cool-girl',
      name: 'Cool Girl Velvet Pour Femme',
      brand: 'Carolina H.',
      category: 'Femenino',
      volumeMl: 85,
      price: 165000,
      originalPrice: 190000,
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80',
      stock: 12,
      badge: 'Más Vendido',
    },
    {
      id: 'prod-sauvage',
      name: 'Sauvage Eau de Parfum',
      brand: 'Dior Luxe',
      category: 'Masculino',
      volumeMl: 100,
      price: 180000,
      originalPrice: 210000,
      imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=500&q=80',
      stock: 8,
      badge: 'Top Masculino',
    },
    {
      id: 'prod-baccarat',
      name: 'Rouge Ambré 540 Sillage',
      brand: 'Maison Chic',
      category: 'Unisex',
      volumeMl: 70,
      price: 210000,
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=500&q=80',
      stock: 5,
      badge: 'Exclusivo',
    },
    {
      id: 'prod-khamrah',
      name: 'Khamrah Qahwa Imperial',
      brand: 'Lattafa Perfumes',
      category: 'Árabe',
      volumeMl: 100,
      price: 195000,
      originalPrice: 230000,
      imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=500&q=80',
      stock: 14,
      badge: 'Tendencia',
    },
  ];

  const filteredCombos = rawCombos.filter((combo) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      combo.title.toLowerCase().includes(query) ||
      combo.description.toLowerCase().includes(query)
    );
  });

  const filteredProducts = products.filter((product) => {
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
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    dbCategories,
  };
};
