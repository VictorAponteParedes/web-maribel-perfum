export type DeliveryType = 'DELIVERY' | 'PICKUP';

export type PaymentMethod =
  | 'SIPAP_TRANSFER'
  | 'CASH_ON_DELIVERY'
  | 'BANK_TRANSFER'
  | 'QR'
  | 'CARD';

export interface CityOption {
  id: string;
  name: string;
  deliveryFee: number;
}

export interface CheckoutFormValues {
  fullName: string;
  phone: string;
  deliveryType: DeliveryType;
  cityId: string;
  address: string;
  reference: string;
  latitude?: number | null;
  longitude?: number | null;
  paymentMethod: PaymentMethod;
  giftNote?: string;
}

// Payload requerido por el backend en POST /orders
export interface CreateOrderItemPayload {
  barcode: string;
  brand: string;
  name: string;
  size?: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  productId?: string;
}

export interface OrderLocationPayload {
  latitude?: number;
  longitude?: number;
  address?: string;
  reference?: string;
  city?: string;
}

export interface CreateOrderPayload {
  customerId?: string;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  location?: OrderLocationPayload;
  items: CreateOrderItemPayload[];
  deliveryFee?: number;
  paymentMethod?: PaymentMethod;
  paymentStatus?: 'PENDING' | 'PAID';
  status?: 'PENDING' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  notes?: string;
}

export interface BackendOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  totalQuantity: number;
  subtotal: number | string;
  deliveryFee: number | string;
  total: number | string;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  notes?: string | null;
  createdAt: string;
  items?: Array<{
    id: string;
    barcode: string;
    brand: string;
    name: string;
    size?: string | null;
    quantity: number;
    unitPrice: number | string;
    subtotal: number | string;
  }>;
  location?: {
    id: string;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
    reference?: string | null;
    city?: string | null;
  } | null;
}

export interface ConfirmedOrderData {
  orderNumber: string;
  customerName: string;
  phone: string;
  deliveryType: DeliveryType;
  cityName: string;
  address: string;
  reference: string;
  coordinates?: { lat: number; lng: number } | null;
  paymentMethod: PaymentMethod;
  giftNote?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: Array<{
    title: string;
    subtitle?: string;
    quantity: number;
    price: number;
    imageUrl: string;
  }>;
  whatsappUrl: string;
}
