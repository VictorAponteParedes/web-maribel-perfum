import { httpClient } from '@/lib/httpClient';
import { Combo } from '@/types/product.types';
import { BackendCombo, ComboItemDetail } from '../types/combos.types';

export const mapBackendComboToCombo = (raw: BackendCombo): Combo => {
  const price = Number(raw.price || 0);
  const originalPrice = Number(raw.originalPrice || 0);
  const savingsAmount = Number(raw.savingsAmount || 0);

  const items: ComboItemDetail[] = (raw.items || []).map((item) => {
    let brandName = 'Maribel Perfum';
    if (typeof item.product?.brand === 'object' && item.product?.brand !== null) {
      brandName = item.product.brand.name;
    } else if (typeof item.product?.brand === 'string') {
      brandName = item.product.brand;
    }

    return {
      productId: item.productId,
      productName: item.product?.name || 'Fragancia Exclusiva',
      brand: brandName,
      quantity: Number(item.quantity || 1),
      originalPrice: Number(item.unitPrice || 0),
    };
  });

  const totalFragrances = items.reduce((sum, item) => sum + item.quantity, 0);

  const discountPercent =
    originalPrice > 0 && savingsAmount > 0
      ? Math.round((savingsAmount / originalPrice) * 100)
      : 0;

  let discountBadge = 'PROMO';
  if (savingsAmount > 0) {
    discountBadge = `Ahorrás Gs. ${savingsAmount.toLocaleString('es-PY')}`;
  } else if (discountPercent > 0) {
    discountBadge = `-${discountPercent}% OFF`;
  }

  let fragranceCountLabel = 'Combo exclusivo';
  if (totalFragrances === 1) {
    fragranceCountLabel = '1 Fragancia';
  } else if (totalFragrances > 1) {
    fragranceCountLabel = `${totalFragrances} Fragancias`;
  }

  const resolvedImage =
    raw.image?.url ||
    raw.imageUrl ||
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80';

  const rawImages = (raw as { images?: string[] }).images;
  const images = Array.isArray(rawImages) && rawImages.length > 0
    ? rawImages.filter((img) => Boolean(img?.trim()))
    : [resolvedImage];

  return {
    id: raw.id,
    title: raw.title,
    kicker: raw.kicker || '★ EDICIÓN ESPECIAL',
    discountBadge,
    savingsAmount,
    fragranceCountLabel,
    description: raw.description || 'Set prediseñado con fragancias de alta fijación.',
    originalPrice,
    price,
    imageUrl: resolvedImage,
    images,
    inStock: raw.isActive,
    items,
  };
};

export const combosService = {
  fetchCombos: async (activeOnly = true): Promise<Combo[]> => {
    const response = await httpClient.get('/combos', {
      params: activeOnly ? { activeOnly: 'true' } : undefined,
    });

    const rawList: BackendCombo[] = Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];

    return rawList.map(mapBackendComboToCombo);
  },

  getComboById: async (id: string): Promise<Combo> => {
    const response = await httpClient.get(`/combos/${id}`);
    const raw: BackendCombo = response.data?.data || response.data;
    return mapBackendComboToCombo(raw);
  },
};
