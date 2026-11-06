import { create } from 'zustand';
import { Combo } from '@/types/product.types';
import { combosService } from '../services/combos.service';

interface CombosState {
  combos: Combo[];
  isLoading: boolean;
  error: string | null;
  fetchCombos: (force?: boolean) => Promise<void>;
}

export const useCombosStore = create<CombosState>((set, get) => ({
  combos: [],
  isLoading: false,
  error: null,

  fetchCombos: async (force = false) => {
    // Evitar peticiones duplicadas si ya tenemos datos cargados en cache (salvo force)
    if (!force && get().combos.length > 0) return;

    set({ isLoading: true, error: null });
    try {
      const items = await combosService.fetchCombos(true);
      set({ combos: items, isLoading: false });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Error al cargar los combos';
      set({ error: message, isLoading: false });
    }
  },
}));
