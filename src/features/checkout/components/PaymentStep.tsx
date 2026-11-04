import React from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Banknote, Landmark, QrCode } from 'lucide-react';
import { CheckoutFormValues, PaymentMethod } from '../types/checkout.types';

interface PaymentStepProps {
  control: Control<CheckoutFormValues>;
  watch: UseFormWatch<CheckoutFormValues>;
  setValue: UseFormSetValue<CheckoutFormValues>;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ watch, setValue }) => {
  const paymentMethod = watch('paymentMethod');
  const cashAmount = watch('cashAmountToPayWith');

  const handleSelect = (method: PaymentMethod) => {
    setValue('paymentMethod', method, { shouldValidate: true });
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5a061a] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#5a061a]/20">
          3
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Forma de Pago
        </h2>
      </div>

      <div className="space-y-3 pt-1">
        {/* Option 1: Efectivo contra entrega */}
        <div
          onClick={() => handleSelect('CASH_ON_DELIVERY')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            paymentMethod === 'CASH_ON_DELIVERY'
              ? 'border-[#5a061a] bg-[#fdfbf9] shadow-sm'
              : 'border-stone-200/90 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              checked={paymentMethod === 'CASH_ON_DELIVERY'}
              onChange={() => handleSelect('CASH_ON_DELIVERY')}
              className="mt-1 text-[#5a061a] focus:ring-[#5a061a] cursor-pointer"
            />
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9b7036] flex items-center justify-center flex-shrink-0">
              <Banknote className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-stone-900">
                  Efectivo contra entrega
                </span>
                <span className="bg-[#fef2e8] text-[#9a3412] border border-[#fed7aa] text-[10.5px] font-bold px-2 py-0.5 rounded-md">
                  Recomendado
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Abonás en mano al recibir tu paquete sellado.
              </p>

              {/* Sub-field: ¿Con cuánto pagás? */}
              {paymentMethod === 'CASH_ON_DELIVERY' && (
                <div className="mt-4 pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label htmlFor="cashAmountInput" className="text-xs font-semibold text-stone-700">
                    ¿Con cuánto pagás? (para llevarte vuelto exacto):
                  </label>
                  <div className="relative w-full sm:w-44">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      Gs.
                    </span>
                    <input
                      id="cashAmountInput"
                      type="text"
                      value={cashAmount}
                      onChange={(e) => setValue('cashAmountToPayWith', e.target.value)}
                      placeholder="350.000"
                      className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-sm font-bold text-stone-900 focus:outline-none focus:border-[#5a061a]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Option 2: Transferencia SIPAP */}
        <div
          onClick={() => handleSelect('SIPAP_TRANSFER')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            paymentMethod === 'SIPAP_TRANSFER'
              ? 'border-[#5a061a] bg-[#fdfbf9] shadow-sm'
              : 'border-stone-200/90 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              checked={paymentMethod === 'SIPAP_TRANSFER'}
              onChange={() => handleSelect('SIPAP_TRANSFER')}
              className="mt-1 text-[#5a061a] focus:ring-[#5a061a] cursor-pointer"
            />
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#5a061a] flex items-center justify-center flex-shrink-0">
              <Landmark className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-stone-900">
                  Transferencia SIPAP
                </span>
                <span className="bg-stone-100 text-stone-600 text-[10.5px] font-semibold px-2 py-0.5 rounded-md">
                  Bancos Py
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Itaú, Continental, Ueno, BNF, Atlas.
              </p>

              {paymentMethod === 'SIPAP_TRANSFER' && (
                <div className="mt-3.5 p-3 rounded-xl bg-stone-100/80 border border-stone-200 text-xs text-stone-600 space-y-1">
                  <p><strong>Banco Itaú</strong> · Cta Cte: 720014890</p>
                  <p><strong>Titular:</strong> Maribel Perfum · RUC: 4.890.123-1</p>
                  <p className="text-[11px] text-[#9b7036] font-medium pt-1">
                    Te enviaremos el comprobante directo por WhatsApp para validar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Option 3: QR Bancard o Tarjeta al recibir */}
        <div
          onClick={() => handleSelect('POS_CARD_OR_QR')}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            paymentMethod === 'POS_CARD_OR_QR'
              ? 'border-[#5a061a] bg-[#fdfbf9] shadow-sm'
              : 'border-stone-200/90 hover:border-stone-300 bg-white'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <input
              type="radio"
              checked={paymentMethod === 'POS_CARD_OR_QR'}
              onChange={() => handleSelect('POS_CARD_OR_QR')}
              className="mt-1 text-[#5a061a] focus:ring-[#5a061a] cursor-pointer"
            />
            <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-stone-900">
                  QR Bancard o Tarjeta al recibir 💳
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                El repartidor lleva el POS inalámbrico a tu puerta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
