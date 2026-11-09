import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, AlertCircle } from 'lucide-react';
import { WebRoutes } from '@/navigation/routes';
import { useCheckout } from '../../hooks';
import {
  CheckoutHeader,
  CheckoutEmptyCart,
  CustomerStep,
  DeliveryStep,
  PaymentStep,
  OrderSummaryCard,
  OrderSuccessView,
} from '../../components';

export const CheckoutScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    form,
    items,
    subtotal,
    deliveryType,
    deliveryFee,
    selectedCity,
    confirmedOrder,
    submitError,
    isSubmitting,
    handleSubmit,
  } = useCheckout();

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
      <CheckoutHeader onBackToHome={() => navigate(WebRoutes.HOME)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {items.length === 0 ? (
          <CheckoutEmptyCart onGoToCatalog={() => navigate(WebRoutes.CATALOG)} />
        ) : (
          <>
            {/* Banner Informativo */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#5a061a] to-[#7a0d26] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-[#5a061a]/15">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h1 className="font-serif font-bold text-base sm:text-lg">
                    Finalizar Compra Directa
                  </h1>
                  <p className="text-white/80 text-xs">
                    Confirmá tu pedido para registrarlo y coordinar la entrega por WhatsApp.
                  </p>
                </div>
              </div>
              <span className="text-xs bg-white/15 px-3 py-1.5 rounded-full font-bold self-start sm:self-auto">
                {items.length} {items.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>

            {/* Alerta de error si falla la creación de orden */}
            {submitError && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Columna Izquierda: Pasos de Formulario */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  <CustomerStep control={form.control} />

                  <DeliveryStep
                    control={form.control}
                    watch={form.watch}
                    setValue={form.setValue}
                  />

                  <PaymentStep />
                </div>

                {/* Columna Derecha: Resumen de Pedido */}
                <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
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
          </>
        )}
      </main>
    </div>
  );
};
