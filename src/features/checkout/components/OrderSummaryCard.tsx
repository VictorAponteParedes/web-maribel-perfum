import React from 'react';
import { Gift, ShieldCheck, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem } from '@/features/cart/types/cart.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { DeliveryType } from '../types/checkout.types';

interface OrderSummaryCardProps {
  items: CartItem[];
  subtotal: number;
  deliveryType: DeliveryType;
  deliveryFee: number;
  cityName: string;
  isSubmitting?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  items,
  subtotal,
  deliveryType,
  deliveryFee,
  cityName,
  isSubmitting = false,
}) => {
  const actualDeliveryFee = deliveryType === 'PICKUP' ? 0 : deliveryFee;
  const total = subtotal + actualDeliveryFee;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Resumen del Pedido
        </h3>
        <span className="text-xs font-bold text-[#5a061a] bg-rose-50 px-2.5 py-1 rounded-full">
          {items.length} {items.length === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>

      {/* Items list */}
      <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 divide-y divide-stone-100">
        {items.map((item) => (
          <div key={item.id} className="pt-3.5 first:pt-0 flex items-center gap-3.5">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover border border-stone-200/80 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-stone-500 truncate mt-0.5">
                {item.subtitle || 'Fragancia importada'} · Cantidad: {item.quantity}
              </p>
            </div>
            <span className="font-bold text-xs sm:text-sm text-stone-900 flex-shrink-0">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs sm:text-sm">
        <div className="flex items-center justify-between text-stone-600">
          <span>Subtotal productos</span>
          <span className="font-medium text-stone-800">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-stone-600">
          <span>
            {deliveryType === 'DELIVERY'
              ? `Envío Delivery (${cityName})`
              : 'Retiro en Boutique'}
          </span>
          <span className="font-medium text-stone-800">
            {actualDeliveryFee === 0 ? (
              <span className="text-emerald-700 font-bold">¡Gratis!</span>
            ) : (
              formatCurrency(actualDeliveryFee)
            )}
          </span>
        </div>

        {/* Total a Pagar Row */}
        <div className="pt-3 border-t border-stone-200/90 flex items-baseline justify-between">
          <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
            Total a Pagar
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-[#5a061a]">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Gift Courtesy Box */}
      <div className="p-3.5 rounded-2xl bg-[#fef7ee] border border-[#fae2c5] flex items-center gap-3 text-xs text-[#9a3412]">
        <Gift className="w-5 h-5 flex-shrink-0 text-[#9b7036]" />
        <span className="leading-snug">
          Incluye empaque de regalo y lazo artesanal Maribel de cortesía.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || items.length === 0}
        className="w-full bg-[#5a061a] hover:bg-[#720c24] active:scale-[0.99] text-white py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#5a061a]/25 transition-all cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Procesando pedido...</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5 stroke-[2]" />
            <span>Confirmar y Enviar Pedido ({formatCurrency(total)})</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </>
        )}
      </button>

      {/* Guarantee Footnote */}
      <div className="flex items-center justify-center gap-2 text-stone-500 text-xs text-center pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Pago seguro · Tu pedido se procesa de inmediato</span>
      </div>
    </div>
  );
};
