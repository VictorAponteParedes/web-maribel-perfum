import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWebSettingsStore } from '@/features/web-settings';
import { PARAGUAY_CITIES } from '../constants/cities.constants';
import {
  CheckoutFormValues,
  ConfirmedOrderData,
} from '../types/checkout.types';
import { checkoutService } from '../services/checkout.service';
import { buildOrderPayload, buildWhatsAppUrl } from '../utils/checkout.utils';

export const useCheckout = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [confirmedOrder, setConfirmedOrder] =
    useState<ConfirmedOrderData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: 'Valeria Montserrat Benítez',
      phone: '0981 445 892',
      deliveryType: 'DELIVERY',
      cityId: 'asuncion',
      address: 'Avda. Mariscal López 1250 esq. San Martín',
      reference: 'Casa con portón negro y rejas doradas',
      latitude: -25.2867,
      longitude: -57.647,
      paymentMethod: 'SIPAP_TRANSFER',
      giftNote: '',
    },
    mode: 'onTouched',
  });

  const { watch, handleSubmit } = form;
  const deliveryType = watch('deliveryType');
  const cityId = watch('cityId');

  const selectedCity =
    PARAGUAY_CITIES.find((c) => c.id === cityId) || PARAGUAY_CITIES[0];
  const deliveryFee = deliveryType === 'PICKUP' ? 0 : selectedCity.deliveryFee;
  const total = subtotal + deliveryFee;

  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) {
      setSubmitError('Tu bolsa de compras está vacía.');
      return;
    }

    setSubmitError(null);

    try {
      // 1. Construir el payload tipado para el backend
      const payload = buildOrderPayload(data, items, selectedCity, deliveryFee);

      // 2. Registrar el pedido real en la base de datos a través de la API
      const savedOrder = await checkoutService.createOrder(payload);

      // 3. Generar la URL de WhatsApp con el número de orden oficial del backend y el teléfono configurado
      const boutiquePhone = useWebSettingsStore.getState().getCleanWhatsAppNumber();
      const whatsappUrl = buildWhatsAppUrl(
        savedOrder.orderNumber,
        data,
        items,
        selectedCity,
        subtotal,
        deliveryFee,
        total,
        boutiquePhone
      );

      const confirmed: ConfirmedOrderData = {
        orderNumber: savedOrder.orderNumber,
        customerName: data.fullName,
        phone: data.phone,
        deliveryType: data.deliveryType,
        cityName: selectedCity.name,
        address: data.address,
        reference: data.reference,
        coordinates:
          data.latitude && data.longitude
            ? { lat: data.latitude, lng: data.longitude }
            : null,
        paymentMethod: 'SIPAP_TRANSFER',
        giftNote: data.giftNote,
        subtotal,
        deliveryFee,
        total,
        items: items.map((i) => ({
          title: i.title,
          subtitle: i.subtitle,
          quantity: i.quantity,
          price: i.price,
          imageUrl: i.imageUrl,
        })),
        whatsappUrl,
      };

      startTransition(() => {
        setConfirmedOrder(confirmed);
        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } catch (err: unknown) {
      let message =
        'Ocurrió un error al procesar tu pedido. Intenta nuevamente.';
      if (axios.isAxiosError(err)) {
        const serverMessage = err.response?.data?.message;
        if (Array.isArray(serverMessage)) {
          message = serverMessage.join(', ');
        } else if (typeof serverMessage === 'string') {
          message = serverMessage;
        } else if (err.message) {
          message = err.message;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }
      setSubmitError(message);
    }
  };

  return {
    form,
    items,
    subtotal,
    deliveryType,
    deliveryFee,
    total,
    selectedCity,
    confirmedOrder,
    submitError,
    isSubmitting: form.formState.isSubmitting || isPending,
    handleSubmit: handleSubmit(onSubmit),
  };
};
