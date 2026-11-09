import { WebStoreSettings } from "@/features/web-settings";

export interface StoreLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WebStoreSettings;
}

export interface StoreCoordinates {
  lat: number;
  lng: number;
}

export const DEFAULT_STORE_COORDINATES: StoreCoordinates = {
  lat: -22.54823,
  lng: -55.73359,
};

export const parseStoreCoordinates = (mapsUrl?: string): StoreCoordinates => {
  if (mapsUrl) {
    const match = mapsUrl.match(/[-+]?\d*\.\d+,\s*[-+]?\d*\.\d+/);
    if (match) {
      const [latStr, lngStr] = match[0].split(",");
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
  }
  return DEFAULT_STORE_COORDINATES;
};
