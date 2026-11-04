import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Zap, Lock } from 'lucide-react';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { PARAGUAY_CITIES } from '../../constants/cities.constants';
import { CheckoutFormValues, ConfirmedOrderData } from '../../types/checkout.types';
import { CustomerStep } from '../../components/CustomerStep';
import { DeliveryStep } from '../../components/DeliveryStep';
import { PaymentStep } from '../../components/PaymentStep';
import { OrderSummaryCard } from '../../components/OrderSummaryCard';
import { OrderSuccessView } from '../../components/OrderSuccessView';
import { formatCurrency } from '@/utils/formatCurrency';
import { logoAdmin } from '@/assets';
import { WebRoutes } from '@/navigation/routes';

export const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrderData | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CheckoutFormValues>({
    defaultValues: {
      fullName: 'Valeria Montserrat Benítez',
      phone: '0981 445 892',
      deliveryType: 'DELIVERY',
      cityId: 'asuncion',
      address: 'Avda. Mariscal López 1250 esq. San Martín',
      reference: 'Casa con portón negro y rejas doradas',
      latitude: -25.2867,
      longitude: -57.6470,
      paymentMethod: 'SIPAP_TRANSFER',
      giftNote: '',
    },
    mode: 'onTouched',
  });

  const deliveryType = watch('deliveryType');
  const cityId = watch('cityId');
  const selectedCity = PARAGUAY_CITIES.find((c) => c.id === cityId) || PARAGUAY_CITIES[0];
  const deliveryFee = deliveryType === 'PICKUP' ? 0 : selectedCity.deliveryFee;
  const total = subtotal + deliveryFee;

  const onSubmit = async (data: CheckoutFormValues) => {
    const orderNumber = `MB-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsSummary = items
      .map((i) => `• ${i.quantity}x ${i.title} (${formatCurrency(i.price * i.quantity)})`)
      .join('\n');

    const gpsLink =
      data.latitude && data.longitude
        ? `\n🛰️ *Ubicación GPS:* https://maps.google.com/?q=${data.latitude},${data.longitude}`
        : '';

    const whatsappMessage = encodeURIComponent(
      `🛍️ *¡Hola Maribel Perfumería! Quiero confirmar mi pedido #${orderNumber}*\n\n` +
      `👤 *Cliente:* ${data.fullName}\n` +
      `📞 *WhatsApp:* +595 ${data.phone}\n` +
      `🚚 *Modalidad:* ${data.deliveryType === 'DELIVERY' ? `Delivery (${selectedCity.name})` : 'Retiro en Boutique'}\n` +
      (data.deliveryType === 'DELIVERY' ? `📍 *Dirección:* ${data.address}\n` : '') +
      (data.reference ? `🏡 *Referencia:* ${data.reference}\n` : '') +
      gpsLink +
      `\n💳 *Forma de Pago:* Transferencia Bancaria SIPAP\n` +
      `💬 *Estado:* Aguardo los datos de cuenta bancaria para transferir y validar el despacho.\n` +
      (data.giftNote ? `💌 *Dedicatoria de regalo:* "${data.giftNote}"\n` : '') +
      `\n📦 *Productos reservados:* \n${itemsSummary}\n\n` +
      `💰 *Subtotal:* ${formatCurrency(subtotal)}\n` +
      `🚚 *Envío:* ${deliveryFee === 0 ? 'Gratis' : formatCurrency(deliveryFee)}\n` +
      `✨ *Total a Transferir:* ${formatCurrency(total)}`
    );

    const whatsappUrl = `https://wa.me/595981000000?text=${whatsappMessage}`;

    const confirmed: ConfirmedOrderData = {
      orderNumber,
      customerName: data.fullName,
      phone: data.phone,
      deliveryType: data.deliveryType,
      cityName: selectedCity.name,
      address: data.address,
      reference: data.reference,
      coordinates:
        data.latitude && data.longitude ? { lat: data.latitude, lng: data.longitude } : null,
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

    setConfirmedOrder(confirmed);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmedOrder) {
    return (
      <OrderSuccessView
        orderData={confirmedOrder}
        onBackToHome={() => {
          navigate(WebRoutes.HOME);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/60 pb-20">
      {/* Top Checkout Header */}
      <header className="bg-white border-b border-stone-200/90 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(WebRoutes.HOME)}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm py-1.5 px-3 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la tienda</span>
          </button>

          {/* Center Title & Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#5a061a]">
              <Zap className="w-5 h-5 fill-amber-400 text-amber-500" />
              <h1 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Checkout Exprés
              </h1>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#fef2e8] text-[#9a3412] border border-[#fed7aa] text-[11px] font-bold px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5" />
              <span>SIN REGISTRO</span>
            </div>
          </div>

          {/* Boutique Logo Symbol */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs border border-stone-200">
              <img src={logoAdmin} alt="Maribel Perfum" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif font-bold text-sm text-[#5a061a] hidden sm:inline">
              Maribel Perfum
            </span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Responsive Checkout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Steps (7 cols on desktop) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Customer */}
              <CustomerStep control={control} />

              {/* Step 2: Delivery */}
              <DeliveryStep control={control} watch={watch} setValue={setValue} />

              {/* Step 3: Payment (SIPAP Only) */}
              <PaymentStep />
            </div>

            {/* Right Column: Order Summary (5 cols on desktop) */}
            <div className="lg:col-span-5">
              <OrderSummaryCard
                items={items}
                subtotal={subtotal}
                deliveryType={deliveryType}
                deliveryFee={deliveryFee}
                cityName={selectedCity.name}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
