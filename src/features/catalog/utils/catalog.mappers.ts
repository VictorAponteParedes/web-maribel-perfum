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

  // Soporte para múltiples imágenes (array de URLs)
  const rawImages = (raw as { images?: string[] }).images;
  const resolvedRawImages = Array.isArray(rawImages) && rawImages.length > 0
    ? rawImages.filter((img) => Boolean(img?.trim()))
    : [];

  const imageUrl =
    resolvedRawImages[0] || raw.imageUrl || raw.image?.url || DEFAULT_PRODUCT_IMAGE;
  const images = resolvedRawImages.length > 0 ? resolvedRawImages : [imageUrl];

  const description = (raw as { description?: string }).description || undefined;

  // Extraer nombre de marca de forma segura (objeto o string)
  let brandName = 'Maribel Perfum';
  if (typeof raw.brand === 'object' && raw.brand !== null) {
    brandName = (raw.brand as { name?: string }).name || 'Maribel Perfum';
  } else if (typeof raw.brand === 'string') {
    brandName = raw.brand;
  }

  // Extraer nombre de categoría de forma segura (objeto o string)
  let categoryName = 'Fragancias';
  if (typeof raw.category === 'object' && raw.category !== null) {
    categoryName = (raw.category as { name?: string }).name || 'Fragancias';
  } else if (typeof raw.category === 'string') {
    categoryName = raw.category;
  }

  return {
    id: raw.id,
    name: raw.name,
    brand: brandName,
    category: categoryName,
    volumeMl: parseVolumeMl(raw.size),
    price: finalPrice,
    originalPrice,
    imageUrl,
    images,
    description,
    stock,
    badge,
  };
};
