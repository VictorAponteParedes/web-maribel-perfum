import { httpClient } from '@/lib/httpClient';
import { Product } from '@/types/product.types';
import {
  BackendProduct,
  CatalogFilterParams,
  ProductsApiResponse,
} from '../types/catalog.types';
import { mapBackendProductToProduct } from '../utils/catalog.mappers';

export const catalogService = {
  fetchProducts: async (params?: CatalogFilterParams): Promise<Product[]> => {
    const response = await httpClient.get('/products', {
      params: {
        limit: params?.limit ?? 500,
        isActive: params?.isActive ?? true,
        ...params,
      },
    });

    const data: ProductsApiResponse = response.data?.data || response.data || { items: [] };
    const items: BackendProduct[] = Array.isArray(data.items) ? data.items : [];

    // Solo mostramos productos visibles en tienda web y con datos válidos
    const visibleProducts = items.filter((p) => p.isWebVisible !== false);

    return visibleProducts.map(mapBackendProductToProduct);
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await httpClient.get(`/products/${id}`);
    const raw: BackendProduct = response.data?.data || response.data;
    return mapBackendProductToProduct(raw);
  },
};
