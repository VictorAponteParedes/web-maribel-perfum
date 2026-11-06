import { create } from 'zustand';
import { Product } from '@/types/product.types';
import { catalogService } from '../services/catalog.service';

interface CatalogState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: (force?: boolean) => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async (force = false) => {
    if (!force && get().products.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const items = await catalogService.fetchProducts();
      set({ products: items, isLoading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Error al cargar los productos del catálogo';
      set({ error: message, isLoading: false });
    }
  },
}));
