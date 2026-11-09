import { create } from 'zustand';
import { CartItem } from '../types/cart.types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  stockWarning: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>, quantityToAdd?: number) => boolean;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearStockWarning: () => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getTotalPrice: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  stockWarning: null,

  clearStockWarning: () => set({ stockWarning: null }),

  addItem: (newItem, quantityToAdd = 1) => {
    const state = get();
    const existing = state.items.find((i) => i.id === newItem.id);
    const maxStock = newItem.stock ?? existing?.stock;
    const currentQty = existing ? existing.quantity : 0;

    if (maxStock !== undefined && maxStock <= 0) {
      set({
        stockWarning: `"${newItem.title}" está agotado actualmente.`,
      });
      return false;
    }

    if (maxStock !== undefined && currentQty + quantityToAdd > maxStock) {
      const allowedQty = Math.max(0, maxStock - currentQty);
      if (allowedQty <= 0) {
        set({
          stockWarning: `Solo contamos con ${maxStock} unidades disponibles de "${newItem.title}" y ya las tienes en tu bolsa.`,
        });
        return false;
      }

      set({
        stockWarning: `Se ajustó a ${maxStock} unidades (stock máximo disponible de "${newItem.title}").`,
        items: existing
          ? state.items.map((i) =>
              i.id === newItem.id
                ? { ...i, quantity: maxStock, stock: maxStock }
                : i
            )
          : [...state.items, { ...newItem, quantity: maxStock }],
      });
      return true;
    }

    set({
      stockWarning: null,
      items: existing
        ? state.items.map((i) =>
            i.id === newItem.id
              ? {
                  ...i,
                  quantity: i.quantity + quantityToAdd,
                  stock: maxStock ?? i.stock,
                  barcode: newItem.barcode ?? i.barcode,
                }
              : i
          )
        : [...state.items, { ...newItem, quantity: quantityToAdd }],
    });
    return true;
  },

  removeItem: (id) => {
    set((state) => ({
      stockWarning: null,
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      let warning: string | null = null;
      const updated = state.items
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            if (item.stock !== undefined && nextQty > item.stock) {
              warning = `Solo quedan ${item.stock} unidades disponibles de "${item.title}".`;
              return item;
            }
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return { items: updated, stockWarning: warning };
    });
  },

  clearCart: () => set({ items: [] }),

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotalItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
