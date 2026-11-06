import { Product } from '@/types/product.types';
import { CatalogSortOption } from '../types/catalog.types';

export const filterProducts = (
  products: Product[],
  options: {
    category?: string;
    searchQuery?: string;
  }
): Product[] => {
  const { category = 'Todos', searchQuery = '' } = options;
  const q = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      category === 'Todos' ||
      category === 'Combos' ||
      product.category.toLowerCase() === category.toLowerCase();

    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q)
    );
  });
};

export const sortProducts = (
  products: Product[],
  sortBy: CatalogSortOption
): Product[] => {
  const cloned = [...products];

  switch (sortBy) {
    case 'price_asc':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return cloned.sort((a, b) => b.price - a.price);
    case 'name_asc':
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    case 'default':
    default:
      return cloned;
  }
};
