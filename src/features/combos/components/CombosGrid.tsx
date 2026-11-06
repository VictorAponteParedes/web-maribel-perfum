import React from 'react';
import { Combo } from '@/types/product.types';
import { ComboCard } from '@/features/home/components/ComboCard';

interface CombosGridProps {
  combos: Combo[];
}

export const CombosGrid: React.FC<CombosGridProps> = ({ combos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {combos.map((combo) => (
        <ComboCard key={combo.id} combo={combo} />
      ))}
    </div>
  );
};
