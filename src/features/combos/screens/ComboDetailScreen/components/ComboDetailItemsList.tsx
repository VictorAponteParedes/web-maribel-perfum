import React from 'react';
import { PackageCheck } from 'lucide-react';
import { ComboItemDetail } from '../../../types/combos.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface ComboDetailItemsListProps {
  items: ComboItemDetail[];
}

export const ComboDetailItemsList: React.FC<ComboDetailItemsListProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6 p-5 rounded-2xl bg-white border border-stone-200">
      <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base mb-3 flex items-center gap-2">
        <PackageCheck className="w-4 h-4 text-[#5a061a]" />
        <span>Fragancias Incluidas en este Set</span>
      </h3>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 text-xs"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-rose-100 text-[#5a061a] font-bold text-[11px] flex items-center justify-center shrink-0">
                {item.quantity}x
              </span>
              <div>
                <p className="font-bold text-stone-800">{item.productName}</p>
                <p className="text-[11px] text-stone-500 uppercase">{item.brand}</p>
              </div>
            </div>
            <span className="text-stone-400 font-medium line-through">
              {formatCurrency(item.originalPrice * item.quantity)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
