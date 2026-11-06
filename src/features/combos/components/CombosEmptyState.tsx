import React from 'react';
import { Gift, AlertCircle, RefreshCw } from 'lucide-react';

interface CombosEmptyStateProps {
  error?: string | null;
  onRetry?: () => void;
}

export const CombosEmptyState: React.FC<CombosEmptyStateProps> = ({
  error,
  onRetry,
}) => {
  if (error) {
    return (
      <div className="py-16 text-center bg-rose-50/50 rounded-3xl border border-rose-200/80 p-8 max-w-lg mx-auto">
        <AlertCircle className="w-12 h-12 text-[#5a061a] mx-auto mb-3" />
        <h3 className="font-serif text-lg font-bold text-stone-900">
          No pudimos cargar los combos
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
      <Gift className="w-12 h-12 text-stone-300 mx-auto mb-3" />
      <p className="font-serif text-lg text-stone-700">
        No se encontraron combos con ese criterio
      </p>
      <p className="text-xs text-stone-400 mt-1">
        Prueba seleccionando otra etiqueta o borra tu búsqueda.
      </p>
    </div>
  );
};
