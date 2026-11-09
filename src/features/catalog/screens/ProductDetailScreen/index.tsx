import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { catalogService } from '../../services/catalog.service';
import { Product } from '@/types/product.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCartStore } from '@/features/cart/store/useCartStore';
import { useWebSettingsStore } from '@/features/web-settings';
import {
  ProductDetailHeader,
  ProductDetailGallery,
  ProductDetailInfo,
  ProductDetailOlfactory,
  ProductDetailActions,
  ProductDetailTrustBadges,
  ProductDetailSkeleton,
  ProductDetailNotFound,
} from './components';

export const ProductDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((state) => state.addItem);
  const getCleanWhatsAppNumber = useWebSettingsStore((state) => state.getCleanWhatsAppNumber);

  const [product, setProduct] = useState<Product | null>(null);
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

    catalogService
      .getProductById(id)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setActiveImageIndex(0);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Error fetching product detail:', err);
          setError('No pudimos cargar los detalles del perfume solicitado.');
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
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return <ProductDetailNotFound error={error} />;
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageUrl];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        type: 'product',
        title: product.name,
        subtitle: `${product.brand} · ${product.volumeMl}ml`,
        price: product.price,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrl,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappClean = getCleanWhatsAppNumber();
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    `¡Hola Maribel Perfumería! Me interesa este perfume: *${product.name}* (${product.brand} - ${product.volumeMl}ml) por ${formatCurrency(product.price)}. ¿Tienen disponibilidad para envío?\n\nLink: ${window.location.href}`
  )}`;

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <ProductDetailHeader name={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Columna Izquierda: Galería Multicapa */}
          <div className="lg:col-span-7">
            <ProductDetailGallery
              images={images}
              name={product.name}
              volumeMl={product.volumeMl}
              badge={product.badge}
              activeImageIndex={activeImageIndex}
              onSelectImage={setActiveImageIndex}
            />
          </div>

          {/* Columna Derecha: Información & Compra */}
          <div className="lg:col-span-5 flex flex-col">
            <ProductDetailInfo
              brand={product.brand}
              name={product.name}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
            />

            <ProductDetailActions
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              isAdded={added}
              whatsappUrl={whatsappUrl}
            />

            <ProductDetailOlfactory description={product.description} />

            <ProductDetailTrustBadges />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
