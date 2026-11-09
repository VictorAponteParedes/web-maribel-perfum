import { CartItem } from '@/features/cart/types/cart.types';
import { formatCurrency } from '@/utils/formatCurrency';
import {
  CheckoutFormValues,
  CityOption,
  CreateOrderItemPayload,
  CreateOrderPayload,
} from '../types/checkout.types';

// Teléfono oficial de WhatsApp de Maribel Perfumería por defecto
export const DEFAULT_BOUTIQUE_PHONE = '595986314630';

export const isUuid = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
};

export const buildOrderPayload = (
  data: CheckoutFormValues,
  items: CartItem[],
  selectedCity: CityOption,
  deliveryFee: number
): CreateOrderPayload => {
  const orderItems: CreateOrderItemPayload[] = items.map((item) => {
    // Si subtitle contiene tamaño (ej: '85ml'), extraerlo
    const sizeMatch = item.subtitle ? item.subtitle.match(/(\d+\s*ml)/i) : null;
    const size = sizeMatch ? sizeMatch[1] : undefined;

    // Extraer marca si está presente en el subtítulo
    const brand = item.subtitle?.split('·')[0]?.trim() || 'Maribel Perfum';

    return {
      barcode: item.id.toUpperCase(),
      brand,
      name: item.title,
      size,
      quantity: item.quantity,
      unitPrice: item.price,
      productId: isUuid(item.id) ? item.id : undefined,
    };
  });

  return {
    customerName: data.fullName.trim(),
    customerPhone: data.phone.trim(),
    deliveryType: data.deliveryType,
    deliveryFee,
    paymentMethod: 'BANK_TRANSFER',
    paymentStatus: 'PENDING',
    status: 'PENDING',
    notes: data.giftNote?.trim() || undefined,
    location:
      data.deliveryType === 'DELIVERY'
        ? {
            city: selectedCity.name,
            address: data.address.trim(),
            reference: data.reference?.trim() || undefined,
            latitude: data.latitude ?? undefined,
            longitude: data.longitude ?? undefined,
          }
        : undefined,
    items: orderItems,
  };
};

export const buildWhatsAppUrl = (
  orderNumber: string,
  data: CheckoutFormValues,
  items: CartItem[],
  selectedCity: CityOption,
  subtotal: number,
  deliveryFee: number,
  total: number,
  boutiquePhone: string = DEFAULT_BOUTIQUE_PHONE
): string => {
  const itemsSummary = items
    .map(
      (i) =>
        `• ${i.quantity}x ${i.title} (${formatCurrency(i.price * i.quantity)})`
    )
    .join('\n');

  const gpsLink =
    data.latitude && data.longitude
      ? `\n🛰️ *Ubicación GPS:* https://maps.google.com/?q=${data.latitude},${data.longitude}`
      : '';

  const message = encodeURIComponent(
    `🛍️ *¡Hola Maribel Perfumería! Quiero confirmar mi pedido #${orderNumber}*\n\n` +
      `👤 *Cliente:* ${data.fullName}\n` +
      `📞 *WhatsApp:* +595 ${data.phone}\n` +
      `🚚 *Modalidad:* ${
        data.deliveryType === 'DELIVERY'
          ? `Delivery (${selectedCity.name})`
          : 'Retiro en Boutique'
      }\n` +
      (data.deliveryType === 'DELIVERY' ? `📍 *Dirección:* ${data.address}\n` : '') +
      (data.reference ? `🏡 *Referencia:* ${data.reference}\n` : '') +
      gpsLink +
      `\n💳 *Forma de Pago:* Transferencia Bancaria SIPAP\n` +
      `💬 *Estado:* Aguardo los datos de cuenta bancaria para transferir y validar el despacho.\n` +
      (data.giftNote ? `💌 *Dedicatoria de regalo:* "${data.giftNote}"\n` : '') +
      `\n📦 *Productos reservados:* \n${itemsSummary}\n\n` +
      `💰 *Subtotal:* ${formatCurrency(subtotal)}\n` +
      `🚚 *Envío:* ${
        deliveryFee === 0 ? 'Gratis' : formatCurrency(deliveryFee)
      }\n` +
      `✨ *Total a Transferir:* ${formatCurrency(total)}`
  );

  return `https://wa.me/${boutiquePhone}?text=${message}`;
};
