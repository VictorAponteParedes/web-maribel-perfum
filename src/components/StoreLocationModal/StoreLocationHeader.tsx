import React from 'react';
import { Store, MapPin, X } from 'lucide-react';
import { WebStoreSettings } from '@/features/web-settings';

interface StoreLocationHeaderProps {
  settings: WebStoreSettings;
  onClose: () => void;
}

export const StoreLocationHeader: React.FC<StoreLocationHeaderProps> = ({
  settings,
  onClose,
}) => {
  return (
    <div className="p-5 sm:p-6 border-b border-stone-100 flex items-start justify-between gap-4 bg-gradient-to-r from-stone-50 via-white to-stone-50">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#5a061a] border border-rose-100 flex items-center justify-center shrink-0 shadow-xs">
          <Store className="w-6 h-6 stroke-[1.8]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              {settings.tradeName}
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Boutique Física
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>
              {settings.storeAddress} · {settings.city}, {settings.country}
            </span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
