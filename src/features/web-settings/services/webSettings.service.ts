import { httpClient } from '@/lib/httpClient';
import { WebStoreSettings, WebCampaign } from '../types/webSettings.types';

export interface WebSettingsResponse {
  settings: WebStoreSettings;
  activeCampaigns: WebCampaign[];
}

export const DEFAULT_WEB_SETTINGS: WebStoreSettings = {
  tradeName: 'Maribel Tienda de Regalos',
  storeBio:
    'Perfumería fina, fragancias exclusivas y detalles especiales con atención cálida en Pedro Juan Caballero y envíos a todo Paraguay.',
  whatsappNumber: '0986 314 630',
  businessPhone: '0986 314 630',
  storeAddress: 'Avda. Dr. Francia e/ Tte. Herrero',
  city: 'Pedro Juan Caballero',
  country: 'Paraguay',
  mapsUrl: 'https://maps.google.com/?q=Pedro+Juan+Caballero',
  openingHours: 'Lunes a Sábados: 07:30 a 19:30 hs',
  instagramUrl: 'https://instagram.com/maribel_tiendaderegalos',
  facebookUrl: '',
  tiktokUrl: '',
  logoUrl: '/logo-maribel.png',
  footerCopyright:
    '© 2026 Maribel Tienda de Regalos. Todos los derechos reservados.',
  announcementText:
    'Envíos a todo el país · Caja de lujo de obsequio con tarjeta dedicatoria en compras desde Gs. 250.000',
  announcementActive: true,
  freeShippingThreshold: 250000,
  bankDetails: [],
  deliveryRates: [],
};

export const webSettingsService = {
  fetchWebSettings: async (): Promise<WebSettingsResponse> => {
    const response = await httpClient.get('/web-settings');
    const raw = response.data?.data || response.data || {};

    const rawSettings = raw.settings || raw || {};
    const settings: WebStoreSettings = {
      tradeName: rawSettings.tradeName || DEFAULT_WEB_SETTINGS.tradeName,
      storeBio: rawSettings.storeBio || DEFAULT_WEB_SETTINGS.storeBio,
      whatsappNumber:
        rawSettings.whatsappNumber || DEFAULT_WEB_SETTINGS.whatsappNumber,
      businessPhone:
        rawSettings.businessPhone || DEFAULT_WEB_SETTINGS.businessPhone,
      storeAddress:
        rawSettings.storeAddress || DEFAULT_WEB_SETTINGS.storeAddress,
      city: rawSettings.city || DEFAULT_WEB_SETTINGS.city,
      country: rawSettings.country || DEFAULT_WEB_SETTINGS.country,
      mapsUrl: rawSettings.mapsUrl || DEFAULT_WEB_SETTINGS.mapsUrl,
      openingHours:
        rawSettings.openingHours || DEFAULT_WEB_SETTINGS.openingHours,
      instagramUrl:
        rawSettings.instagramUrl || DEFAULT_WEB_SETTINGS.instagramUrl,
      facebookUrl: rawSettings.facebookUrl || '',
      tiktokUrl: rawSettings.tiktokUrl || '',
      logoUrl: rawSettings.logoUrl || DEFAULT_WEB_SETTINGS.logoUrl,
      footerCopyright:
        rawSettings.footerCopyright || DEFAULT_WEB_SETTINGS.footerCopyright,
      announcementText:
        rawSettings.announcementText || DEFAULT_WEB_SETTINGS.announcementText,
      announcementActive:
        rawSettings.announcementActive !== undefined
          ? rawSettings.announcementActive
          : true,
      freeShippingThreshold: Number(
        rawSettings.freeShippingThreshold || DEFAULT_WEB_SETTINGS.freeShippingThreshold
      ),
      bankDetails: rawSettings.bankDetails || [],
      deliveryRates: rawSettings.deliveryRates || [],
    };

    const activeCampaigns: WebCampaign[] = Array.isArray(raw.activeCampaigns)
      ? raw.activeCampaigns
      : [];

    return {
      settings,
      activeCampaigns,
    };
  },
};
