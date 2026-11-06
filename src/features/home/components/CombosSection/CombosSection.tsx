import React from 'react';
import { Combo } from '@/types/product.types';
import { ComboCard } from '../ComboCard';
import { CombosSectionHeader } from './CombosSectionHeader';
import { CombosSectionSkeleton } from './CombosSectionSkeleton';

interface CombosSectionProps {
  combos: Combo[];
  isLoading?: boolean;
  onViewAllCombos?: () => void;
}

export const CombosSection: React.FC<CombosSectionProps> = ({
  combos,
  isLoading = false,
  onViewAllCombos,
}) => {
  // Si no está cargando y no hay ningún combo activo, no mostramos la sección vacía en el Home
  if (!isLoading && combos.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 mb-12">
      <CombosSectionHeader onViewAllCombos={onViewAllCombos} />

      {isLoading ? (
        <CombosSectionSkeleton count={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      )}
    </section>
  );
};
