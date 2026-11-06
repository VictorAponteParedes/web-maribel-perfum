export interface BackendComboItemProduct {
  id: string;
  name: string;
  brand?: { id: string; name: string } | string;
  barcode?: string;
  sellingPrice?: number | string;
  webPrice?: number | string;
}

export interface BackendComboItem {
  id: string;
  comboId: string;
  productId: string;
  quantity: number;
  unitPrice: number | string;
  product?: BackendComboItemProduct;
}

export interface BackendCombo {
  id: string;
  title: string;
  kicker?: string | null;
  description?: string | null;
  price: number | string;
  originalPrice: number | string;
  savingsAmount: number | string;
  imageId?: string | null;
  imageUrl?: string | null;
  image?: { id: string; url: string } | null;
  isActive: boolean;
  items?: BackendComboItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ComboItemDetail {
  productId: string;
  productName: string;
  brand: string;
  quantity: number;
  originalPrice: number;
}
