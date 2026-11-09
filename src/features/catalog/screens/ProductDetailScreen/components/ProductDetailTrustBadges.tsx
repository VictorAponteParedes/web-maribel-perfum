import React from 'react';
import { ShieldCheck, Gift, Truck } from 'lucide-react';

export const ProductDetailTrustBadges: React.FC = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <span className="text-xs font-bold text-stone-800">100% Original</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Fragancia original sellada de fábrica.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <Gift className="w-5 h-5 text-amber-600" />
        <span className="text-xs font-bold text-stone-800">Caja de Regalo</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Packaging especial de obsequio.
        </span>
      </div>
      <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex flex-col gap-1.5">
        <Truck className="w-5 h-5 text-rose-600" />
        <span className="text-xs font-bold text-stone-800">Envíos Rápidos</span>
        <span className="text-[11px] text-stone-500 leading-tight">
          Entrega local y a todo el país.
        </span>
      </div>
    </div>
  );
};
