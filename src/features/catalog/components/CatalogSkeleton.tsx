import React from 'react';

interface CatalogSkeletonProps {
  count?: number;
}

export const CatalogSkeleton: React.FC<CatalogSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`catalog-skeleton-${i}`}
          className="bg-white rounded-2xl border border-stone-200/80 p-0 overflow-hidden shadow-xs animate-pulse"
        >
          <div className="aspect-[4/5] bg-stone-200" />
          <div className="p-4 space-y-2.5">
            <div className="h-2.5 bg-stone-200 rounded w-1/3" />
            <div className="h-4 bg-stone-200 rounded w-3/4" />
            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="h-5 bg-stone-200 rounded w-16" />
              <div className="h-8 bg-stone-200 rounded-xl w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
