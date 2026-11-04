import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showInfo?: boolean;
  siblingCount?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize = 8,
  pageSizeOptions = [8, 12, 24, 48],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  showInfo = true,
  siblingCount = 1,
  className = '',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Generación inteligente de rango de páginas con elipsis (...)
  const paginationRange = useMemo<(number | 'dots')[]>(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, index) => index + 1);
      return [...leftRange, 'dots', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, index) => totalPages - rightItemCount + index + 1
      );
      return [1, 'dots', ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, index) => leftSiblingIndex + index
    );
    return [1, 'dots', ...middleRange, 'dots', totalPages];
  }, [currentPage, totalPages, siblingCount]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    }
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3.5 bg-white rounded-2xl border border-stone-200 shadow-xs text-xs text-stone-600 select-none ${className}`}
    >
      {/* Sección Izquierda: Selector de items e Información */}
      <div className="flex flex-wrap items-center gap-4">
        {showPageSizeSelector && onPageSizeChange && (
          <div className="flex items-center space-x-2">
            <span className="text-stone-500 font-medium whitespace-nowrap">Mostrar</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#880e2b] focus:border-[#880e2b] transition-colors cursor-pointer"
              aria-label="Cantidad de elementos por página"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-stone-500 font-medium whitespace-nowrap">por página</span>
          </div>
        )}

        {showInfo && (
          <div className="text-stone-500 font-medium">
            {totalItems > 0 ? (
              <span>
                Mostrando <strong className="font-semibold text-stone-800">{startItem}</strong> -{' '}
                <strong className="font-semibold text-stone-800">{endItem}</strong> de{' '}
                <strong className="font-semibold text-stone-800">{totalItems}</strong> fragancias
              </span>
            ) : (
              <span>Sin registros para mostrar</span>
            )}
          </div>
        )}
      </div>

      {/* Sección Derecha: Controles de navegación */}
      <div className="flex items-center space-x-1">
        {/* Botón Primera página */}
        <button
          type="button"
          onClick={() => handlePageChange(1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Primera página"
          aria-label="Primera página"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Botón Anterior */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Página anterior"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Números de Página */}
        <div className="flex items-center space-x-1">
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === 'dots') {
              return (
                <span
                  key={`dots-${index}`}
                  className="px-2 py-1 text-stone-400 select-none text-xs"
                >
                  &#8230;
                </span>
              );
            }

            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                className={`min-w-[32px] h-8 px-2 flex items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#5a061a] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Página ${pageNumber}`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Botón Siguiente */}
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Página siguiente"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Botón Última página */}
        <button
          type="button"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Última página"
          aria-label="Última página"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
