import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WebRoutes } from '@/navigation/routes';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-pulse">
        <div className="h-6 w-48 bg-stone-200 rounded-md mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/5] bg-stone-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 w-28 bg-stone-200 rounded" />
            <div className="h-8 w-3/4 bg-stone-200 rounded" />
            <div className="h-6 w-1/3 bg-stone-200 rounded" />
            <div className="h-24 bg-stone-200 rounded-2xl" />
            <div className="h-12 w-full bg-stone-200 rounded-xl" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface ProductDetailNotFoundProps {
  error?: string | null;
}

export const ProductDetailNotFound: React.FC<ProductDetailNotFoundProps> = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center text-[#5a061a]">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Perfume no encontrado
        </h2>
        <p className="text-stone-600 text-sm mb-6 leading-relaxed">
          {error || 'El producto que buscas ya no se encuentra en el catálogo o cambió de dirección.'}
        </p>
        <button
          type="button"
          onClick={() => navigate(WebRoutes.CATALOG)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5a061a] text-white text-sm font-semibold hover:bg-[#720a23] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>
      </main>
      <Footer />
    </div>
  );
};
