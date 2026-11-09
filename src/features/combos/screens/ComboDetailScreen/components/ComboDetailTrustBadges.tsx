import React from 'react';
import { Gift, ShieldCheck, Truck } from 'lucide-react';

export const ComboDetailTrustBadges: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <Gift className="w-5 h-5 text-amber-600" />
        <span className="text-xs font-bold text-stone-800">Listo para Regalar</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Caja decorada con lazo de boutique.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span className="text-xs font-bold text-stone-800">100% Originales</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Todos los frascos sellados.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <Truck className="w-5 h-5 text-rose-600" />
        <span className="text-xs font-bold text-stone-800">Envío Seguro</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Protección anti-impacto.
        </span>
      </div>
    </div>
  );
};
