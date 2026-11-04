export interface CartItem {
  id: string;
  type: 'product' | 'combo';
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  quantity: number;
}
