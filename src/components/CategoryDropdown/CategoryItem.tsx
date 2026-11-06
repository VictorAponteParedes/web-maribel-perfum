import React from 'react';
import { Sparkles, Tag, Check } from 'lucide-react';
import { CategoryItemProps } from './types';

export const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  description,
  count,
  isSelected,
  isSpecialAll = false,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
        isSelected
          ? 'bg-gradient-to-r from-rose-50 to-stone-50 border border-rose-200/70 text-[#5a061a]'
          : 'hover:bg-stone-50 text-stone-700'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            isSelected
              ? 'bg-[#5a061a] text-white shadow-xs'
              : isSpecialAll
                ? 'bg-stone-100 text-stone-500'
                : 'bg-rose-50 text-[#5a061a]'
          }`}
        >
          {isSpecialAll ? <Sparkles className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <span className="font-serif font-bold text-xs text-stone-900 block truncate">
            {title}
          </span>
          {description && (
            <span className="text-[10.5px] text-stone-400 block truncate">
              {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {count !== undefined && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
            {count}
          </span>
        )}
        {isSelected && <Check className="w-4 h-4 text-[#5a061a] shrink-0" />}
      </div>
    </button>
  );
};
