import { create } from 'zustand';
import { Category } from '../types/category.types';
import { categoriesService } from '../services/categories.service';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    // Si ya tiene categorías cargadas, no recargar a menos que sea forzado
    if (get().categories.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const items = await categoriesService.fetchCategories();
      set({ categories: items });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Error al cargar categorías';
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
