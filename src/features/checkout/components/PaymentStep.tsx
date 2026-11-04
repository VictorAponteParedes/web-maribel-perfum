import React from 'react';
import { Landmark, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PaymentStep: React.FC = () => {
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

      <div className="space-y-4 pt-1">
        {/* Single Official Payment Card: Transferencia SIPAP */}
        <div className="p-5 sm:p-6 rounded-2xl border-2 border-[#5a061a] bg-[#fdfbf9] shadow-xs relative overflow-hidden">
          {/* Top Row: Method Title & Badge */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 text-[#5a061a] border border-rose-100 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Landmark className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  Transferencia Bancaria (SIPAP)
                </h3>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Método Oficial
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Abonás vía transferencia directa desde cualquier entidad bancaria o billetera virtual de Paraguay (Itaú, Continental, Ueno, BNF, Atlas, etc.).
              </p>
            </div>
          </div>

          {/* Coordinación por WhatsApp Box */}
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-rose-50/80 via-amber-50/60 to-rose-50/80 border border-rose-100/90 space-y-2">
            <div className="flex items-center gap-2 text-[#5a061a] font-bold text-xs sm:text-sm">
              <MessageCircle className="w-4 h-4 fill-[#5a061a] text-white flex-shrink-0" />
              <span>¿Cómo coordinamos tu pago?</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Una vez que confirmes el pedido, <strong>una de nuestras asesoras te escribirá de inmediato a tu WhatsApp</strong> para facilitarte los datos de la cuenta bancaria, verificar tu comprobante de transferencia y coordinar la entrega o despacho de tu paquete.
            </p>
          </div>

          {/* Value points */}
          <div className="mt-4 pt-3 border-t border-stone-200/70 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Perfume reservado a tu nombre</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Despacho al validar transferencia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Caja de lujo y lazo de cortesía</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
