import React from 'react';
import { Search } from 'lucide-react';
import { CategorySearchProps } from './types';

export const CategorySearch: React.FC<CategorySearchProps> = ({
  value,
  onChange,
  inputRef,
}) => {
  return (
    <div className="p-3 bg-stone-50/80 border-b border-stone-100">
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar familia (ej: Dulce, Árabe, Amaderado)..."
          className="w-full bg-white border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-800 outline-none focus:border-[#5a061a] focus:ring-1 focus:ring-[#5a061a]/20"
        />
      </div>
    </div>
  );
};
