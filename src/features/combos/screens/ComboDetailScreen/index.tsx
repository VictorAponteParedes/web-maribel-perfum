import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { combosService } from '../../services/combos.service';
import { Combo } from '@/types/product.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWebSettingsStore } from '@/features/web-settings';
import {
  ComboDetailHeader,
  ComboDetailGallery,
  ComboDetailItemsList,
  ComboDetailActions,
  ComboDetailTrustBadges,
  ComboDetailSkeleton,
  ComboDetailNotFound,
} from './components';

export const ComboDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const getCleanWhatsAppNumber = useWebSettingsStore((state) => state.getCleanWhatsAppNumber);

  const [combo, setCombo] = useState<Combo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    combosService
      .getComboById(id)
      .then((data) => {
        if (isMounted) {
          setCombo(data);
          setActiveImageIndex(0);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching combo detail:', err);
          setError('No pudimos cargar los detalles del set seleccionado.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <ComboDetailSkeleton />;
  }

  if (error || !combo) {
    return <ComboDetailNotFound error={error} />;
  }

  const images =
    combo.images && combo.images.length > 0 ? combo.images : [combo.imageUrl];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: combo.id,
        type: 'combo',
        title: combo.title,
        subtitle: combo.fragranceCountLabel,
        price: combo.price,
        originalPrice: combo.originalPrice,
        imageUrl: combo.imageUrl,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappClean = getCleanWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    `¡Hola Maribel Perfumería! Quiero pedir este combo: *${combo.title}* (${combo.fragranceCountLabel}) por ${formatCurrency(combo.price)}. ¿Está disponible para entrega inmediata?\n\nLink: ${window.location.href}`
  )}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <ComboDetailHeader title={combo.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Columna Izquierda: Galería Multicapa */}
          <div className="lg:col-span-7">
            <ComboDetailGallery
              images={images}
              title={combo.title}
              activeImageIndex={activeImageIndex}
              onSelectImage={setActiveImageIndex}
              discountBadge={combo.discountBadge}
              fragranceCountLabel={combo.fragranceCountLabel}
            />
          </div>

          {/* Columna Derecha: Información del Set & Acciones */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#9b7036] mb-1">
              {combo.kicker}
            </span>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight tracking-tight">
              {combo.title}
            </h1>

            <p className="text-stone-600 text-sm leading-relaxed mt-3">
              {combo.description}
            </p>

            {/* Precio & Ahorro */}
            <div className="mt-6 p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#5a061a]">
                  {formatCurrency(combo.price)}
                </span>
                {combo.originalPrice && combo.originalPrice > combo.price && (
                  <span className="text-sm sm:text-base text-stone-400 line-through">
                    {formatCurrency(combo.originalPrice)}
                  </span>
                )}
              </div>
              {combo.savingsAmount && combo.savingsAmount > 0 && (
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  ✓ Ahorraste {formatCurrency(combo.savingsAmount)} comprando este set en lugar de por separado.
                </p>
              )}
            </div>

            {/* Lista de fragancias incluidas */}
            <ComboDetailItemsList items={combo.items || []} />

            {/* Selector de cantidad y compra */}
            <ComboDetailActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              isAdded={added}
              whatsappUrl={whatsappUrl}
            />

            {/* Sellos de confianza boutique */}
            <ComboDetailTrustBadges />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
