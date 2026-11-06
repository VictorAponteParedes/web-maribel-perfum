import { Product } from '@/types/product.types';
import { BackendProduct } from '../types/catalog.types';

const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80';

export const parseVolumeMl = (size?: string): number => {
  if (!size) return 100;
  const match = size.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 100;
};

export const mapBackendProductToProduct = (raw: BackendProduct): Product => {
  const stock = Number(raw.stock ?? 0);
  const sellingPrice = Number(raw.price || 0);
  const webPrice = raw.webPrice !== null && raw.webPrice !== undefined ? Number(raw.webPrice) : null;

  // Si tiene precio web configurado, ese es el precio de venta en tienda web
  const finalPrice = webPrice && webPrice > 0 ? webPrice : sellingPrice;
  // Si el precio de tienda física es mayor que el precio web, se muestra tachado como originalPrice
  const originalPrice =
    webPrice && sellingPrice > webPrice ? sellingPrice : undefined;

  let badge: string | undefined = raw.webBadge || undefined;
  if (!badge && stock > 0 && stock <= 3) {
    badge = 'Últimas unidades';
  }

  const imageUrl = raw.image?.url || raw.imageUrl || DEFAULT_PRODUCT_IMAGE;

  return {
    id: raw.id,
    name: raw.name,
    brand: raw.brand || 'Maribel Perfum',
    category: raw.category || 'Fragancias',
    volumeMl: parseVolumeMl(raw.size),
    price: finalPrice,
    originalPrice,
    imageUrl,
    stock,
    badge,
  };
};
