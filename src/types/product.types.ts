export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  volumeMl: number;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  stock: number;
  badge?: string;
}

export interface Combo {
  id: string;
  title: string;
  kicker: string;
  discountBadge: string;
  savingsAmount: number;
  fragranceCountLabel: string;
  description: string;
  originalPrice: number;
  price: number;
  imageUrl: string;
  inStock: boolean;
  items?: Array<{
    productId: string;
    productName: string;
    brand: string;
    quantity: number;
    originalPrice: number;
  }>;
}

export interface CampaignBanner {
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
}
