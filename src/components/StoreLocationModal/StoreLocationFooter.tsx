import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { WebStoreSettings } from '@/features/web-settings';

interface StoreLocationFooterProps {
  settings: WebStoreSettings;
  googleMapsUrl: string;
}

export const StoreLocationFooter: React.FC<StoreLocationFooterProps> = ({
  settings,
  googleMapsUrl,
}) => {
  return (
    <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-stone-600">
        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Horarios:</strong> {settings.openingHours}
        </span>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#5a061a] hover:bg-[#720a23] text-white font-semibold transition-colors shadow-xs"
        >
          <MapPin className="w-4 h-4" />
          <span>Abrir en Google Maps</span>
        </a>
      </div>
    </div>
  );
};
