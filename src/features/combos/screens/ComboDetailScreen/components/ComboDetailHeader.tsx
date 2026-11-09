import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Share2 } from 'lucide-react';
import { WebRoutes } from '@/navigation/routes';

interface ComboDetailHeaderProps {
  title: string;
}

export const ComboDetailHeader: React.FC<ComboDetailHeaderProps> = ({ title }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-6 text-xs text-stone-500">
      <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1">
        <Link to={WebRoutes.HOME} className="hover:text-stone-900 transition-colors">
          Inicio
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <Link to={WebRoutes.COMBOS} className="hover:text-stone-900 transition-colors">
          Combos & Sets
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
        <span className="font-medium text-stone-800 truncate max-w-[200px] sm:max-w-xs">
          {title}
        </span>
      </nav>

      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-2xs transition-all active:scale-95 shrink-0 cursor-pointer"
        title="Copiar enlace para compartir"
      >
        <Share2 className="w-3.5 h-3.5 text-[#5a061a]" />
        <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
      </button>
    </div>
  );
};
