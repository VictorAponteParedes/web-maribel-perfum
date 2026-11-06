export interface BackendProduct {
  id: string;
  barcode?: string;
  brand?: string;
  name: string;
  size?: string;
  category?: string;
  categoryId?: string | null;
  categorySlug?: string | null;
  totalIn?: number;
  totalSold?: number;
  stock?: number;
  costPrice?: number;
  price?: number;
  profit?: number;
  isWebVisible?: boolean;
  webBadge?: string | null;
  webPrice?: number | null;
  receptionDate?: string;
  isActive?: boolean;
  imageId?: string | null;
  imageUrl?: string | null;
  image?: { id: string; url: string } | null;
}

export interface ProductsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductsApiResponse {
  items: BackendProduct[];
  meta?: ProductsMeta;
}

export interface CatalogFilterParams {
  search?: string;
  brand?: string;
  category?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export type CatalogSortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc';
