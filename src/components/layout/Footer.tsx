import React, { useState } from 'react';
import { MessageCircle, ShieldCheck, Truck, Gift, Heart, MapPin } from 'lucide-react';
import { logoAdmin } from '@/assets';
import { useWebSettingsStore } from '@/features/web-settings';
import { formatCurrency } from '@/utils/formatCurrency';
import { StoreLocationModal } from './StoreLocationModal';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43 6.3 6.3 0 0 0 1.93-4.52V8.62a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.97-.05z" />
  </svg>
);

export const Footer: React.FC = () => {
  const settings = useWebSettingsStore((state) => state.settings);
  const getCleanWhatsAppNumber = useWebSettingsStore((state) => state.getCleanWhatsAppNumber);
  const whatsappClean = getCleanWhatsAppNumber();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0 border border-stone-700">
                <img
                  src={settings.logoUrl || logoAdmin}
                  alt={settings.tradeName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-none">
                  {settings.tradeName}
                </h3>
                <span className="text-[9.5px] font-bold tracking-[0.25em] text-amber-400 uppercase">
                  Alta Perfumería & Regalos
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {settings.storeBio}
            </p>

            {/* Redes Sociales Oficiales (Opcionales si están configuradas en el Admin) */}
            {(settings.instagramUrl || settings.facebookUrl || settings.tiktokUrl) && (
              <div className="pt-2 flex items-center gap-2.5">
                {settings.instagramUrl && (
                  <a
                    href={
                      settings.instagramUrl.startsWith('http')
                        ? settings.instagramUrl
                        : `https://instagram.com/${settings.instagramUrl.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-rose-400 flex items-center justify-center transition-all hover:scale-105 border border-stone-700"
                    title="Instagram Oficial"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={
                      settings.facebookUrl.startsWith('http')
                        ? settings.facebookUrl
                        : `https://facebook.com/${settings.facebookUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-blue-400 flex items-center justify-center transition-all hover:scale-105 border border-stone-700"
                    title="Facebook Oficial"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                )}
                {settings.tiktokUrl && (
                  <a
                    href={
                      settings.tiktokUrl.startsWith('http')
                        ? settings.tiktokUrl
                        : `https://tiktok.com/@${settings.tiktokUrl.replace('@', '')}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 border border-stone-700"
                    title="TikTok Oficial"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Col 2: Beneficios Boutique */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Nuestra Promesa
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Perfumes 100% Originales y sellados</span>
              </li>
              <li className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Caja de lujo y dedicatoria de obsequio</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Envíos rápidos a todo Paraguay</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Envíos & Cobertura */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              Envíos & Entregas
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Delivery en el día para {settings.city} y alrededores. Envíos diarios al interior vía encomienda segura.
            </p>
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 bg-stone-800 rounded-lg text-emerald-400 text-xs font-semibold">
                Envío Gratis desde {formatCurrency(settings.freeShippingThreshold)}
              </span>

              {/* Botón Interactivo: Ver Tienda en el Mapa */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMapModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 text-xs font-semibold shadow-xs hover:border-amber-400/50 transition-all group cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>Ver Tienda en el Mapa</span>
                  <span className="text-[11px]">📍</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Contacto & Asesoría */}
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4 tracking-wide">
              ¿Dudas con tu elección?
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Nuestras asesoras olfativas te ayudan a elegir la fragancia ideal según la ocasión o personalidad.
            </p>
            <a
              href={`https://wa.me/${whatsappClean}?text=Hola%20Maribel%20Perfumer%C3%ADa,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{settings.footerCopyright}</p>
          <p className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para amantes de la perfumería fina</span>
          </p>
        </div>
      </div>

      {/* Modal Interactivo de Ubicación Boutique con Leaflet */}
      <StoreLocationModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        settings={settings}
      />
    </footer>
  );
};
