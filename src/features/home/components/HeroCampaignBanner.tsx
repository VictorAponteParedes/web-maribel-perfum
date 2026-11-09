import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowRight, Gift, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CampaignBanner } from '@/types/product.types';
import { WebCampaign } from '@/features/web-settings';

interface HeroCampaignBannerProps {
  campaign: CampaignBanner;
  campaigns?: WebCampaign[];
  onExploreClick?: () => void;
  onNavigateToCombos?: () => void;
}

interface HeroSlide {
  id: string | number;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 'default-0',
    badge: '★ SET DESTACADO DEL MES',
    title: 'Duo Sensualité & Estuche Velvet',
    subtitle: 'Ahorro de Gs. 60.000 incluido en caja rígida',
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'default-1',
    badge: '♥ BOUQUET FLORAL',
    title: 'Pack Romance Florale & Glow',
    subtitle: 'Fragancia EdP + Loción corporal de obsequio',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'default-2',
    badge: '✦ ÉXITO EN VENTAS',
    title: 'Duo Imperial Noir & Travel Spray',
    subtitle: 'Sauvage Intense 100ml + atomizador recargable',
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'default-3',
    badge: '✨ COLECCIÓN ÁRABE',
    title: 'Khamrah Qahwa & Oud Royale',
    subtitle: 'Fragancias orientales de fijación superior 24hs',
    imageUrl: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=700&q=80',
  },
];

export const HeroCampaignBanner: React.FC<HeroCampaignBannerProps> = ({
  campaign,
  campaigns = [],
  onExploreClick,
  onNavigateToCombos,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides: HeroSlide[] = useMemo(() => {
    if (campaigns && campaigns.length > 0) {
      return campaigns.map((c, idx) => ({
        id: c.id || `campaign-${idx}`,
        badge: c.tag || '★ CAMPAÑA DESTACADA',
        title: c.title,
        subtitle: c.subtitle,
        imageUrl:
          c.imageUrl ||
          DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].imageUrl,
      }));
    }
    return DEFAULT_SLIDES;
  }, [campaigns]);

  // Auto-play cada 4.5 segundos
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#720c24] via-[#5c081c] to-[#30030c] text-white shadow-2xl shadow-rose-950/20 my-4 md:my-6">
      {/* Decorative ambient background glows */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 -bottom-24 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 py-8 md:px-12 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fef2e8]/95 text-[#5a061a] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wide shadow-md">
            <span>EDICIÓN ESPECIAL</span>
            <Sparkles className="w-3.5 h-3.5 text-[#9b7036]" />
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3">
            {campaign.title}
          </h2>

          {/* Subtitle Description */}
          <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed mb-6 max-w-xl font-normal">
            {campaign.subtitle}
          </p>

          {/* Luxury Value Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 text-xs text-rose-100/90 font-medium">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              100% Originales
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Gift className="w-4 h-4 text-amber-300" />
              Caja Rígida de Regalo
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <HeartHandshake className="w-4 h-4 text-rose-300" />
              Dedicatoria Personalizada
            </span>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 bg-white text-[#5a061a] font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl shadow-black/20 hover:bg-rose-50 active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <span>{campaign.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#5a061a] stroke-[2.5]" />
            </button>

            {onNavigateToCombos && (
              <button
                type="button"
                onClick={onNavigateToCombos}
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-all cursor-pointer"
              >
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Ver todos los combos</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase with 4 Interactive Dots */}
        <div className="lg:col-span-5 hidden sm:flex justify-center">
          <div className="relative group w-full max-w-sm">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-rose-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-stone-900/60 backdrop-blur-md">
              {/* Slide Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  key={currentSlide.id}
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-opacity duration-700 animate-in fade-in zoom-in-95"
                />

                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 pb-9">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300">
                    {currentSlide.badge}
                  </span>
                  <span className="font-serif text-lg font-bold text-white mt-0.5 leading-snug">
                    {currentSlide.title}
                  </span>
                  <span className="text-xs text-rose-200 mt-1 line-clamp-1">
                    {currentSlide.subtitle}
                  </span>
                </div>

                {/* Interactive Dots Carousel Indicator */}
                <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-20">
                  {slides.map((slide, index) => {
                    const isActive = index === currentSlideIndex;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setCurrentSlideIndex(index)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          isActive
                            ? 'w-6 h-2 bg-white shadow-sm'
                            : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                        }`}
                        aria-label={`Ir al slide ${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
