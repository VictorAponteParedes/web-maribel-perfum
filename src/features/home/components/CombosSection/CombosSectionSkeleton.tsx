import React from 'react';

interface CombosSectionSkeletonProps {
  count?: number;
}

export const CombosSectionSkeleton: React.FC<CombosSectionSkeletonProps> = ({
  count = 3,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`home-combo-skeleton-${i}`}
          className="w-full bg-white rounded-2xl border border-stone-200/80 p-0 overflow-hidden shadow-xs animate-pulse"
        >
          <div className="aspect-[16/10] bg-stone-200" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-stone-200 rounded w-1/3" />
            <div className="h-6 bg-stone-200 rounded w-3/4" />
            <div className="h-4 bg-stone-200 rounded w-full" />
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="h-5 bg-stone-200 rounded w-20" />
              <div className="h-9 bg-stone-200 rounded-xl w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
