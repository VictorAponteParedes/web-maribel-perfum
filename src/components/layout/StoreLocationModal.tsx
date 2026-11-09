import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, ExternalLink, Navigation, Store } from 'lucide-react';
import { WebStoreSettings } from '@/features/web-settings';

interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WebStoreSettings;
}

// Extender el objeto window para tipar Leaflet dinámico
declare global {
  interface Window {
    L?: any;
  }
}

export const StoreLocationModal: React.FC<StoreLocationModalProps> = ({
  isOpen,
  onClose,
  settings,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Coordenadas oficiales de la boutique en Pedro Juan Caballero
  // (Avda. Dr. Francia e/ Tte. Herrero)
  const defaultLat = -22.54823;
  const defaultLng = -55.73359;

  // Extraer coordenadas si vienen especificadas en el URL de maps
  const getCoordinates = () => {
    if (settings.mapsUrl) {
      const match = settings.mapsUrl.match(/[-+]?\d*\.\d+,\s*[-+]?\d*\.\d+/);
      if (match) {
        const [latStr, lngStr] = match[0].split(',');
        const lat = parseFloat(latStr.trim());
        const lng = parseFloat(lngStr.trim());
        if (!isNaN(lat) && !isNaN(lng)) {
          return { lat, lng };
        }
      }
    }
    return { lat: defaultLat, lng: defaultLng };
  };

  const { lat, lng } = getCoordinates();

  // Cargar Leaflet dinámicamente solo al abrir el modal (0 impacto de bundle inicial)
  useEffect(() => {
    if (!isOpen) return;

    if (window.L) {
      setIsLeafletLoaded(true);
      return;
    }

    // 1. Inyectar CSS de Leaflet
    const existingCss = document.getElementById('leaflet-css');
    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // 2. Inyectar JS de Leaflet
    const existingScript = document.getElementById('leaflet-js');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => setIsLeafletLoaded(true);
      script.onerror = () => setLoadError(true);
      document.body.appendChild(script);
    } else {
      setIsLeafletLoaded(true);
    }
  }, [isOpen]);

  // Inicializar el mapa de Leaflet una vez cargado el script y montado el contenedor
  useEffect(() => {
    if (!isOpen || !isLeafletLoaded || !mapContainerRef.current) return;

    const L = window.L;
    if (!L) return;

    // Destruir instancia previa si existe
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false, // Evita scroll trampa involuntario
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Pin personalizado con el color bordó y estética de la perfumería
      const customPin = L.divIcon({
        className: 'maribel-pin-marker',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="background: #5a061a; color: white; border: 2.5px solid white; box-shadow: 0 4px 14px rgba(90,6,26,0.5); border-radius: 9999px; padding: 7px; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #5a061a; margin-top: -1px;"></div>
            <div style="background: white; border: 1px solid #e7e5e4; box-shadow: 0 2px 8px rgba(0,0,0,0.15); border-radius: 8px; padding: 3px 8px; font-size: 11px; font-weight: 700; color: #5a061a; white-space: nowrap; margin-top: 4px;">
              ${settings.tradeName}
            </div>
          </div>
        `,
        iconSize: [44, 66],
        iconAnchor: [22, 42],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([lat, lng], { icon: customPin }).addTo(map);
      marker
        .bindPopup(
          `
          <div style="font-family: serif; font-weight: bold; color: #5a061a; font-size: 14px;">${settings.tradeName}</div>
          <div style="font-size: 11px; color: #57534e; margin-top: 2px;">${settings.storeAddress} · ${settings.city}</div>
          <div style="font-size: 10.5px; color: #15803d; font-weight: 600; margin-top: 4px;">🕒 ${settings.openingHours}</div>
        `
        )
        .openPopup();

      mapInstanceRef.current = map;

      // Invalida tamaño para asegurar renderizado correcto dentro de la animación de modal
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    } catch (e) {
      console.error('Error initializing Leaflet map', e);
      setLoadError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, isLeafletLoaded, lat, lng, settings]);

  const googleMapsUrl =
    settings.mapsUrl ||
    `https://maps.google.com/?q=${lat},${lng}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Tarjeta del Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden z-10 flex flex-col"
          >
            {/* Header del Modal */}
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
                    <span>{settings.storeAddress} · {settings.city}, {settings.country}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal"
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenedor del Mapa Leaflet */}
            <div className="relative w-full h-80 sm:h-96 bg-stone-100 overflow-hidden">
              {loadError ? (
                // Fallback con iframe seguro en caso de fallo de red
                <iframe
                  title="Ubicación de la tienda"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=16&output=embed`}
                />
              ) : (
                <div ref={mapContainerRef} className="w-full h-full" />
              )}

              {/* Botón Flotante para Navegación GPS */}
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

            {/* Footer Informativo */}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
