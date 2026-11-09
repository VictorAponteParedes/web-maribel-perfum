import { create } from 'zustand';
import { WebStoreSettings, WebCampaign } from '../types/webSettings.types';
import {
  webSettingsService,
  DEFAULT_WEB_SETTINGS,
} from '../services/webSettings.service';

interface WebSettingsState {
  settings: WebStoreSettings;
  campaigns: WebCampaign[];
  isLoading: boolean;
  error: string | null;
  fetchWebSettings: (force?: boolean) => Promise<void>;
  getCleanWhatsAppNumber: () => string;
}

export const useWebSettingsStore = create<WebSettingsState>((set, get) => ({
  settings: DEFAULT_WEB_SETTINGS,
  campaigns: [],
  isLoading: false,
  error: null,

  fetchWebSettings: async (force = false) => {
    // Si ya cargó y no es forzado, no repetir llamada
    if (!force && get().campaigns.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const { settings, activeCampaigns } =
        await webSettingsService.fetchWebSettings();
      set({ settings, campaigns: activeCampaigns, isLoading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error al cargar ajustes de la tienda';
      set({ error: message, isLoading: false });
    }
  },

  getCleanWhatsAppNumber: () => {
    const rawNumber = get().settings.whatsappNumber || DEFAULT_WEB_SETTINGS.whatsappNumber;
    // Limpiar espacios, guiones y símbolos
    let clean = rawNumber.replace(/\D/g, '');
    // Si empieza con 0 (ej: 0981...), reemplazar el 0 por el código de país Paraguay 595
    if (clean.startsWith('0')) {
      clean = '595' + clean.slice(1);
    } else if (!clean.startsWith('595')) {
      clean = '595' + clean;
    }
    return clean;
  },
}));
