import React from 'react';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface CatalogEmptyStateProps {
  error?: string | null;
  onRetry?: () => void;
}

export const CatalogEmptyState: React.FC<CatalogEmptyStateProps> = ({
  error,
  onRetry,
}) => {
  if (error) {
    return (
      <div className="py-16 text-center bg-rose-50/50 rounded-3xl border border-rose-200/80 p-8 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-[#5a061a] mx-auto mb-3" />
        <h3 className="font-serif text-lg font-bold text-stone-900">
          No pudimos cargar el catálogo
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 mb-5">
          {error}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-[#5a061a] hover:bg-[#720c24] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="py-20 text-center text-stone-400 bg-white rounded-3xl border border-dashed border-stone-200">
      <Sparkles className="w-12 h-12 text-stone-300 mx-auto mb-3" />
      <p className="font-serif text-lg text-stone-700">
        No hay fragancias que coincidan con tu búsqueda
      </p>
      <p className="text-xs text-stone-400 mt-1">
        Prueba cambiando la categoría o usando otro término de búsqueda.
      </p>
    </div>
  );
};
