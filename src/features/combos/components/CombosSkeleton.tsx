import React from 'react';

interface CombosSkeletonProps {
  count?: number;
}

export const CombosSkeleton: React.FC<CombosSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`combo-skeleton-${index}`}
          className="w-full bg-white rounded-2xl border border-stone-200/80 p-0 overflow-hidden shadow-xs animate-pulse"
        >
          {/* Imagen esqueleto */}
          <div className="aspect-[16/10] bg-stone-200" />

          {/* Contenido esqueleto */}
          <div className="p-5 space-y-3">
            <div className="h-3 bg-stone-200 rounded w-1/3" />
            <div className="h-6 bg-stone-200 rounded w-3/4" />
            <div className="h-4 bg-stone-200 rounded w-full" />
            <div className="h-4 bg-stone-200 rounded w-5/6" />

            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-3 bg-stone-200 rounded w-16" />
                <div className="h-5 bg-stone-200 rounded w-24" />
              </div>
              <div className="h-9 bg-stone-200 rounded-xl w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
