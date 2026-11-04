import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, MessageCircle, MapPin, Truck, Store, Gift } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';

interface CheckoutFormData {
  fullName: string;
  phone: string;
  deliveryType: 'DELIVERY' | 'PICKUP';
  address: string;
  giftNote?: string;
  paymentMethod: 'CASH' | 'TRANSFER';
}

interface FastCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FastCheckoutModal: React.FC<FastCheckoutModalProps> = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fullName: '',
      phone: '',
      deliveryType: 'DELIVERY',
      address: '',
      giftNote: '',
      paymentMethod: 'CASH',
    },
    mode: 'onTouched',
  });

  const selectedDeliveryType = watch('deliveryType');

  if (!isOpen) return null;

  const onSubmit = async (data: CheckoutFormData) => {
    // Generar un número de pedido amigable
    const orderNum = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
    setCreatedOrderNumber(orderNum);
    setIsSuccess(true);
    clearCart();

    // Texto pre-armado para WhatsApp
    const orderItemsSummary = items
      .map((i) => `• ${i.quantity}x ${i.title} (${formatCurrency(i.price * i.quantity)})`)
      .join('\n');

    const whatsappMessage = encodeURIComponent(
      `🛍️ *¡Hola Maribel Perfumería! Quiero confirmar mi pedido #${orderNum}*\n\n` +
      `👤 *Cliente:* ${data.fullName}\n` +
      `📞 *Teléfono:* ${data.phone}\n` +
      `🚚 *Tipo de Entrega:* ${data.deliveryType === 'DELIVERY' ? 'Envío a domicilio' : 'Retiro en Tienda'}\n` +
      (data.address ? `📍 *Dirección:* ${data.address}\n` : '') +
      (data.giftNote ? `💌 *Dedicatoria de regalo:* "${data.giftNote}"\n` : '') +
      `💳 *Método de pago:* ${data.paymentMethod === 'CASH' ? 'Efectivo contra entrega' : 'Transferencia Bancaria'}\n\n` +
      `📦 *Productos:* \n${orderItemsSummary}\n\n` +
      `💰 *Total a pagar:* ${formatCurrency(totalPrice)}`
    );

    // Guardar para link de WhatsApp
    (window as unknown as { __lastOrderWaUrl?: string }).__lastOrderWaUrl = `https://wa.me/595981000000?text=${whatsappMessage}`;
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    onClose();
  };

  const waUrl = (window as unknown as { __lastOrderWaUrl?: string }).__lastOrderWaUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
              {isSuccess ? '¡Pedido Confirmado!' : 'Completar Pedido (Sin Registro)'}
            </h3>
            <span className="text-xs text-stone-500">
              {isSuccess ? 'Te atendemos de inmediato' : 'Ingresa tus datos de entrega en 30 segundos'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase block">
                ¡Recibido con éxito!
              </span>
              <h4 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                Orden #{createdOrderNumber}
              </h4>
              <p className="text-xs text-stone-500 mt-2 max-w-sm mx-auto">
                Tu pedido ya está registrado en nuestro sistema. Haz clic abajo para coordinar la entrega directamente con nosotros por WhatsApp.
              </p>
            </div>

            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Confirmar por WhatsApp ahora</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="text-stone-500 hover:text-stone-800 text-xs font-semibold py-2"
            >
              Cerrar y volver a la tienda
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                placeholder="Ej. María González"
                {...register('fullName', { required: 'Ingresa tu nombre completo' })}
                className={`w-full text-sm bg-stone-50 border rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                  errors.fullName
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                    : 'border-stone-200 focus:border-[#5a061a] focus:ring-2 focus:ring-rose-950/10'
                }`}
              />
              {errors.fullName && (
                <span className="text-[11px] text-rose-600 mt-1 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Teléfono / WhatsApp *
              </label>
              <input
                type="tel"
                placeholder="Ej. 0981 123 456"
                {...register('phone', {
                  required: 'Ingresa tu número de contacto',
                  minLength: { value: 6, message: 'Número inválido' },
                })}
                className={`w-full text-sm bg-stone-50 border rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                  errors.phone
                    ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                    : 'border-stone-200 focus:border-[#5a061a] focus:ring-2 focus:ring-rose-950/10'
                }`}
              />
              {errors.phone && (
                <span className="text-[11px] text-rose-600 mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Delivery Type Radios */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Modalidad de Entrega
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                    selectedDeliveryType === 'DELIVERY'
                      ? 'border-[#5a061a] bg-rose-50/60 font-bold text-[#5a061a]'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    value="DELIVERY"
                    {...register('deliveryType')}
                    className="sr-only"
                  />
                  <Truck className="w-4 h-4" />
                  <span>Envío Delivery</span>
                </label>

                <label
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                    selectedDeliveryType === 'PICKUP'
                      ? 'border-[#5a061a] bg-rose-50/60 font-bold text-[#5a061a]'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    value="PICKUP"
                    {...register('deliveryType')}
                    className="sr-only"
                  />
                  <Store className="w-4 h-4" />
                  <span>Retiro en Tienda</span>
                </label>
              </div>
            </div>

            {/* Address (only if DELIVERY) */}
            {selectedDeliveryType === 'DELIVERY' && (
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Dirección o Ciudad *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Barrio, calle o referencia de entrega"
                    {...register('address', {
                      required:
                        selectedDeliveryType === 'DELIVERY'
                          ? 'Ingresa tu dirección de entrega'
                          : false,
                    })}
                    className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2.5 outline-none focus:border-[#5a061a] focus:ring-2 focus:ring-rose-950/10"
                  />
                </div>
                {errors.address && (
                  <span className="text-[11px] text-rose-600 mt-1 block">
                    {errors.address.message}
                  </span>
                )}
              </div>
            )}

            {/* Gift Dedication Note */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#9b7036]" />
                  <span>Dedicatoria en la tarjeta (Opcional)</span>
                </span>
                <span className="text-[10px] text-stone-400 font-normal">Gratis</span>
              </label>
              <textarea
                rows={2}
                placeholder="Ej. 'Para Mamá con todo mi amor en su día...'"
                {...register('giftNote')}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 outline-none focus:border-[#5a061a] focus:ring-2 focus:ring-rose-950/10"
              />
            </div>

            {/* Total breakdown */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-500 block">Total a pagar:</span>
                <span className="font-serif text-xl font-bold text-[#5a061a]">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-[#5a061a]/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido →'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
