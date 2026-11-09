import React from 'react';
import { Sparkles } from 'lucide-react';

interface ProductDetailOlfactoryProps {
  description?: string;
}

export const ProductDetailOlfactory: React.FC<ProductDetailOlfactoryProps> = ({
  description,
}) => {
  return (
    <div className="mt-8 p-5 rounded-2xl bg-white border border-stone-200">
      <h3 className="font-serif font-bold text-stone-900 text-base mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span>Pirámide Olfativa & Fijación</span>
      </h3>
      <p className="text-xs text-stone-600 leading-relaxed mb-4">
        {description ||
          'Fragancia exclusiva de alta concentración de esencias puras, diseñada para proyectar sofisticación y dejar una estela memorable durante todo el día.'}
      </p>

      <div className="space-y-2 text-xs border-t border-stone-100 pt-3">
        <div className="flex gap-2">
          <span className="font-bold text-stone-700 min-w-[70px]">Salida:</span>
          <span className="text-stone-500">Notas cítricas finas y acordes chispeantes.</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold text-stone-700 min-w-[70px]">Corazón:</span>
          <span className="text-stone-500">Esencias florales nobles y corazón especiado suave.</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold text-stone-700 min-w-[70px]">Fondo:</span>
          <span className="text-stone-500">Maderas preciosas, ámbar cálido y fijador de larga estela.</span>
        </div>
      </div>
    </div>
  );
};
