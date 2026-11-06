import React from 'react';
import { Sparkles, ChevronDown, X } from 'lucide-react';
import { CategoryTriggerProps } from './types';

export const CategoryTrigger: React.FC<CategoryTriggerProps> = ({
  isOpen,
  isAll,
  activeCategory,
  activeDescription,
  onToggle,
  onClear,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left shadow-xs ${
        isOpen
          ? 'border-[#5a061a] ring-2 ring-[#5a061a]/15 bg-white shadow-md'
          : !isAll
            ? 'border-[#5a061a]/40 bg-gradient-to-r from-rose-50/90 to-white text-stone-900 shadow-sm'
            : 'border-stone-200/90 bg-white hover:border-stone-300 hover:bg-stone-50/70 text-stone-800'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            !isAll
              ? 'bg-[#5a061a] text-amber-300 shadow-xs'
              : 'bg-stone-100 text-stone-600 group-hover:bg-rose-50 group-hover:text-[#5a061a]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="min-w-0 pr-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#9b7036] block leading-none mb-0.5">
            Filtrar por Familia Olfativa
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-sm text-stone-900 truncate">
              {isAll ? 'Todas las Categorías' : activeCategory}
            </span>
            {activeDescription && (
              <span className="hidden sm:inline-block text-[11px] text-stone-400 font-normal truncate max-w-[180px]">
                · {activeDescription}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-stone-100">
        {!isAll && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                onClear();
              }
            }}
            className="p-1 rounded-lg text-stone-400 hover:text-[#5a061a] hover:bg-rose-100/60 transition-colors"
            title="Restablecer a todas"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}

        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#5a061a]' : 'group-hover:text-stone-600'
          }`}
        />
      </div>
    </button>
  );
};
