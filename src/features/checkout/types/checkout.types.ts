export type DeliveryType = 'DELIVERY' | 'PICKUP';

export type PaymentMethod = 'SIPAP_TRANSFER';

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
