import React, { RefObject } from 'react';
import { Navigation, ExternalLink } from 'lucide-react';

interface StoreLocationMapViewerProps {
  mapContainerRef: RefObject<HTMLDivElement | null>;
  loadError: boolean;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

export const StoreLocationMapViewer: React.FC<StoreLocationMapViewerProps> = ({
  mapContainerRef,
  loadError,
  lat,
  lng,
  googleMapsUrl,
}) => {
  return (
    <div className="relative w-full h-80 sm:h-96 bg-stone-100 overflow-hidden">
      {loadError ? (
        <iframe
          title="Ubicación de la tienda"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`}
        />
      ) : (
        <div ref={mapContainerRef as React.RefObject<HTMLDivElement>} className="w-full h-full" />
      )}

      {/* Botón Flotante para Navegación GPS Rápida */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute top-3 right-3 z-[400] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-stone-900 text-xs font-bold shadow-lg border border-stone-200 backdrop-blur-xs transition-all hover:scale-105"
      >
        <Navigation className="w-3.5 h-3.5 text-[#5a061a]" />
        <span>Cómo Llegar (GPS)</span>
        <ExternalLink className="w-3 h-3 text-stone-400" />
      </a>
    </div>
  );
};
