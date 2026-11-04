import React from 'react';
import { CheckCircle2, MessageCircle, ArrowLeft, Landmark, Sparkles } from 'lucide-react';
import { ConfirmedOrderData } from '../types/checkout.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderSuccessViewProps {
  orderData: ConfirmedOrderData;
  onBackToHome: () => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ orderData, onBackToHome }) => {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl text-center space-y-6">
        {/* Animated Badge Icon */}
        <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        {/* Heading */}
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full">
            ¡Pedido Reservado con Éxito!
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            Orden #{orderData.orderNumber}
          </h2>
          <div className="mt-3 p-4 rounded-2xl bg-[#fdfbf7] border border-[#f5ebd7] text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed text-left space-y-2">
            <p className="flex items-center gap-2 font-bold text-[#5a061a]">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>¿Qué sucederá ahora?</span>
            </p>
            <p>
              Una de nuestras asesoras <strong>te escribirá de inmediato a tu WhatsApp (+595 {orderData.phone})</strong> para facilitarte los datos de la cuenta bancaria, verificar tu comprobante de transferencia y coordinar la entrega de tu paquete.
            </p>
          </div>
        </div>

        {/* WhatsApp Big CTA Button */}
        <div className="pt-2">
          <a
            href={orderData.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white font-bold text-base py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>Hablar con la asesora por WhatsApp</span>
          </a>
          <p className="text-xs text-stone-400 mt-2">
            Si deseas agilizar el proceso, presiona el botón para enviarle los datos de tu orden directamente.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-stone-50 rounded-2xl p-6 text-left border border-stone-200/80 space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
            <span className="text-stone-500">Destinatario:</span>
            <span className="font-bold text-stone-900">{orderData.customerName}</span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
            <span className="text-stone-500">WhatsApp:</span>
            <span className="font-semibold text-stone-900">+595 {orderData.phone}</span>
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-stone-200/70 gap-4">
            <span className="text-stone-500">Modalidad:</span>
            <span className="font-semibold text-stone-900 text-right">
              {orderData.deliveryType === 'DELIVERY'
                ? `Delivery (${orderData.cityName}) - ${orderData.address}`
                : 'Retiro en Boutique Central Maribel'}
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-stone-200/70">
            <span className="text-stone-500">Forma de Pago:</span>
            <span className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#5a061a]" />
              <span>Transferencia Bancaria SIPAP (A coordinar)</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-serif font-bold text-base text-stone-900">Total a Transferir:</span>
            <span className="font-serif font-bold text-xl text-[#5a061a]">
              {formatCurrency(orderData.total)}
            </span>
          </div>
        </div>

        {/* Back to Home Button */}
        <div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold text-xs sm:text-sm py-2 px-4 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la tienda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
