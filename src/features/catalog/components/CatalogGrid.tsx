import React from 'react';
import { Product } from '@/types/product.types';
import { ProductCard } from '@/features/home/components/ProductCard';

interface CatalogGridProps {
  products: Product[];
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
