import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { WebRoutes } from '@/navigation/routes';

interface CartDrawerProps {
  onProceedToCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const navigate = useNavigate();
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const FREE_SHIPPING_THRESHOLD = 250000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  const handleCheckoutClick = () => {
    closeDrawer();
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      navigate(WebRoutes.CHECKOUT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with framer-motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
            onClick={closeDrawer}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-stone-50 shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="bg-white px-5 py-4 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-[#5a061a] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                      Tu Bolsa de Compras
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      {items.length} {items.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping & Gift Progress */}
              <div className="bg-gradient-to-r from-rose-50 to-amber-50/70 px-5 py-3 border-b border-rose-100/60">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#5a061a] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9b7036]" />
                    {remainingForFreeShipping === 0
                      ? '¡Genial! Calificas para Envío Gratis + Caja de Lujo'
                      : `Faltan ${formatCurrency(remainingForFreeShipping)} para Envío Gratis`}
                  </span>
                  <span className="text-[11px] text-stone-500">{progressPercent}%</span>
                </div>
                <div className="w-full bg-rose-200/50 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#5a061a] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-stone-200/80">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                    <ShoppingBag className="w-12 h-12 stroke-[1.2] text-stone-300 mb-3" />
                    <p className="font-serif text-lg text-stone-700 font-semibold">Tu bolsa está vacía</p>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs">
                      Explora nuestros combos exclusivos y fragancias importadas para agregar a tu pedido.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="py-3.5 flex gap-3.5 items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-stone-900 truncate">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="text-[11px] text-stone-500 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-xs text-[#5a061a]">
                            {formatCurrency(item.price)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 active:scale-90 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-800 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:text-stone-900 active:scale-90 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete Item */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="bg-white border-t border-stone-200 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Empaque de regalo Maribel</span>
                    <span className="text-emerald-600 font-semibold">Gratis</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500 block leading-tight">Total estimado</span>
                      <span className="font-serif text-xl font-bold text-[#5a061a]">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCheckoutClick}
                      className="bg-[#5a061a] hover:bg-[#720c24] active:scale-95 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#5a061a]/25 transition-all cursor-pointer"
                    >
                      <span>Pedir sin registro</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 text-[10.5px] text-stone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Pago contra entrega o transferencia · Coordinación directa</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
