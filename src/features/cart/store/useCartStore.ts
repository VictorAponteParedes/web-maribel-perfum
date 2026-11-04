import { create } from 'zustand';
import { CartItem } from '../types/cart.types';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getTotalPrice: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  // Inicializamos con los 2 productos idénticos a las capturas de pantalla del checkout
  items: [
    {
      id: 'prod-cool-girl',
      type: 'product',
      title: 'Cool Girl Eau de Parfum',
      subtitle: 'Frasco 85ml · Alta fijación',
      price: 185000,
      originalPrice: 210000,
      imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80',
      quantity: 1,
    },
    {
      id: 'prod-story-of-flower',
      type: 'product',
      title: 'Story of Flower Luxe',
      subtitle: 'Vaporisateur 50ml · Bouquet floral',
      price: 120000,
      originalPrice: 150000,
      imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80',
      quantity: 1,
    },
  ],
  isDrawerOpen: false,

  addItem: (newItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === newItem.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] };
    });
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      const updated = state.items
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return { items: updated };
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
