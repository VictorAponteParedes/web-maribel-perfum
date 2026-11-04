import React from 'react';
import { MessageCircle, ShieldCheck, Truck, Gift, Heart } from 'lucide-react';
import { logoAdmin } from '@/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0 border border-stone-700">
                <img src={logoAdmin} alt="Maribel Perfum" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white tracking-tight leading-none">
                  Maribel Perfum
                </h3>
                <span className="text-[9.5px] font-bold tracking-[0.25em] text-amber-400 uppercase">
                  Alta Perfumería & Regalos
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Boutique especializada en fragancias importadas 100% originales, sets de regalo exclusivos y atención personalizada con empaque de lujo.
            </p>
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
              Delivery en el día para Asunción y Gran Asunción. Envíos diarios al interior vía encomienda segura.
            </p>
            <span className="inline-block px-3 py-1 bg-stone-800 rounded-lg text-emerald-400 text-xs font-semibold">
              Envío Gratis desde Gs. 250.000
            </span>
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
              href="https://wa.me/595981000000?text=Hola%20Maribel%20Perfumer%C3%ADa,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa"
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
          <p>© {new Date().getFullYear()} Maribel Perfum. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para amantes de la perfumería fina</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
