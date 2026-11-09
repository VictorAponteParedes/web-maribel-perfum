import React from 'react';
import { ShoppingBag, Check, MessageCircle } from 'lucide-react';

interface ComboDetailActionsProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  isAdded: boolean;
  whatsappUrl: string;
}

export const ComboDetailActions: React.FC<ComboDetailActionsProps> = ({
  quantity,
  onQuantityChange,
  onAddToCart,
  isAdded,
  whatsappUrl,
}) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3">
        {/* Selector de Cantidad */}
        <div className="flex items-center rounded-xl border border-stone-300 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-700 disabled:opacity-40 transition-colors font-bold cursor-pointer"
          >
            -
          </button>
          <span className="w-10 text-center font-bold text-sm text-stone-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-700 transition-colors font-bold cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Botón Principal: Agregar Set */}
        <button
          type="button"
          onClick={onAddToCart}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-[#5a061a] hover:bg-[#720a23] text-white shadow-[#5a061a]/25'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>¡Set Agregado!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Agregar Set a la Bolsa</span>
            </>
          )}
        </button>
      </div>

      {/* Botón WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
        <span>Pedir Set por WhatsApp</span>
      </a>
    </div>
  );
};
