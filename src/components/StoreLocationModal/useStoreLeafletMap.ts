import { useEffect, useRef, useState } from 'react';
import { WebStoreSettings } from '@/features/web-settings';
import { parseStoreCoordinates } from './types';

// Tipado extendido de Window para soportar Leaflet cargado por CDN
declare global {
  interface Window {
    L?: any;
  }
}

export const useStoreLeafletMap = (isOpen: boolean, settings: WebStoreSettings) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const { lat, lng } = parseStoreCoordinates(settings.mapsUrl);

  const googleMapsUrl =
    settings.mapsUrl || `https://maps.google.com/?q=${lat},${lng}`;

  // 1. Cargar estilos y script de Leaflet bajo demanda al abrir
  useEffect(() => {
    if (!isOpen) return;

    if (window.L) {
      setIsLeafletLoaded(true);
      return;
    }

    const existingCss = document.getElementById('leaflet-css');
    if (!existingCss) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

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

  // 2. Inicializar y configurar el mapa interactivo
  useEffect(() => {
    if (!isOpen || !isLeafletLoaded || !mapContainerRef.current) return;

    const L = window.L;
    if (!L) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Pin boutique personalizado con la paleta oficial de Maribel
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

      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    } catch (e) {
      console.error('Error al inicializar mapa Leaflet', e);
      setLoadError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, isLeafletLoaded, lat, lng, settings]);

  return {
    mapContainerRef,
    lat,
    lng,
    loadError,
    googleMapsUrl,
  };
};
