import React from 'react';
import { ShoppingBag, Check, MessageCircle } from 'lucide-react';

interface ProductDetailActionsProps {
  quantity: number;
  maxAvailable?: number;
  totalStock?: number;
  cartQty?: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  isAdded: boolean;
  whatsappUrl: string;
}

export const ProductDetailActions: React.FC<ProductDetailActionsProps> = ({
  quantity,
  maxAvailable = 99,
  totalStock = 99,
  cartQty = 0,
  onQuantityChange,
  onAddToCart,
  isAdded,
  whatsappUrl,
}) => {
  const isOutOfStock = totalStock <= 0;
  const isMaxInCart = !isOutOfStock && maxAvailable <= 0;
  const reachedMax = !isOutOfStock && !isMaxInCart && quantity >= maxAvailable;

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-3">
        {/* Selector de Cantidad */}
        <div className="flex items-center rounded-xl border border-stone-300 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1 || isOutOfStock || isMaxInCart}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-700 disabled:opacity-40 transition-colors font-bold cursor-pointer"
          >
            -
          </button>
          <span className="w-10 text-center font-bold text-sm text-stone-900">
            {isOutOfStock || isMaxInCart ? 0 : quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(Math.min(maxAvailable, quantity + 1))}
            disabled={quantity >= maxAvailable || isOutOfStock || isMaxInCart}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-700 disabled:opacity-40 transition-colors font-bold cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Botón Agregar a la Bolsa */}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={isOutOfStock || isMaxInCart}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
            isOutOfStock || isMaxInCart
              ? 'bg-stone-200 text-stone-500 cursor-not-allowed shadow-none'
              : isAdded
              ? 'bg-emerald-600 text-white shadow-emerald-600/30 cursor-pointer'
              : 'bg-[#5a061a] hover:bg-[#720a23] text-white shadow-[#5a061a]/25 cursor-pointer'
          }`}
        >
          {isOutOfStock ? (
            <span>Producto Agotado</span>
          ) : isMaxInCart ? (
            <span>Máximo en tu bolsa ({totalStock} uds)</span>
          ) : isAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>¡Agregado a tu Bolsa!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Agregar a la Bolsa</span>
            </>
          )}
        </button>
      </div>

      {(reachedMax || isMaxInCart) && totalStock > 0 && (
        <p className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          Solo contamos con <strong>{totalStock} unidades</strong> en stock de esta fragancia
          {cartQty > 0 ? ` (ya tienes ${cartQty} en tu bolsa)` : ''}.
        </p>
      )}

      {/* Botón WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full py-3 px-4 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
        <span>Pedir o Consultar por WhatsApp</span>
      </a>
    </div>
  );
};
