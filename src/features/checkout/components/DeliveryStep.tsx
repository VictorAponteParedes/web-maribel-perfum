import React, { useState } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Bike, Store, Building2, MapPin, Compass, Navigation, CheckCircle2, Loader2 } from 'lucide-react';
import { ControlledInput } from '@/components/ui/ControlledInput';
import { CheckoutFormValues } from '../types/checkout.types';
import { PARAGUAY_CITIES } from '../constants/cities.constants';
import { formatCurrency } from '@/utils/formatCurrency';

interface DeliveryStepProps {
  control: Control<CheckoutFormValues>;
  watch: UseFormWatch<CheckoutFormValues>;
  setValue: UseFormSetValue<CheckoutFormValues>;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({ control, watch, setValue }) => {
  const deliveryType = watch('deliveryType');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const [isLocating, setIsLocating] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Tu navegador no soporta geolocalización');
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', Number(position.coords.latitude.toFixed(4)), { shouldValidate: true });
        setValue('longitude', Number(position.coords.longitude.toFixed(4)), { shouldValidate: true });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        // Coordenadas simuladas si el usuario deniega o está en localhost
        setValue('latitude', -25.2867, { shouldValidate: true });
        setValue('longitude', -57.6470, { shouldValidate: true });
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5a061a] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#5a061a]/20">
          2
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          Método de Entrega
        </h2>
      </div>

      {/* Delivery vs Store Pickup Toggle Cards */}
      <div className="grid grid-cols-2 gap-3.5 bg-stone-100/70 p-1.5 rounded-2xl border border-stone-200/80">
        {/* Delivery Option */}
        <button
          type="button"
          onClick={() => setValue('deliveryType', 'DELIVERY', { shouldValidate: true })}
          className={`flex items-center gap-3 p-3.5 rounded-xl transition-all text-left cursor-pointer ${
            deliveryType === 'DELIVERY'
              ? 'bg-white shadow-sm border border-stone-200/90 text-stone-900'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#5a061a] flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-[#5a061a] leading-tight">
              Delivery
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 leading-tight">
              Asunción & Alrededores
            </div>
          </div>
        </button>

        {/* Store Pickup Option */}
        <button
          type="button"
          onClick={() => setValue('deliveryType', 'PICKUP', { shouldValidate: true })}
          className={`flex items-center gap-3 p-3.5 rounded-xl transition-all text-left cursor-pointer ${
            deliveryType === 'PICKUP'
              ? 'bg-white shadow-sm border border-stone-200/90 text-stone-900'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#9b7036] flex items-center justify-center flex-shrink-0">
            <Store className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
              Retiro en Tienda
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-[#9b7036] mt-0.5 leading-tight">
              ¡Gratis!
            </div>
          </div>
        </button>
      </div>

      {/* Delivery Fields Container */}
      {deliveryType === 'DELIVERY' ? (
        <div className="space-y-4 pt-1">
          {/* Ciudad de Destino */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="cityId" className="text-xs sm:text-sm font-semibold text-stone-700">
              Ciudad de Destino
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="cityId"
                value={watch('cityId')}
                onChange={(e) => setValue('cityId', e.target.value, { shouldValidate: true })}
                className="w-full bg-[#fdfbf9] border border-stone-200/90 rounded-xl pl-10 pr-9 py-3 text-sm text-stone-900 focus:bg-white focus:outline-none focus:border-[#5a061a] focus:ring-2 focus:ring-[#5a061a]/10 transition-all appearance-none cursor-pointer"
              >
                {PARAGUAY_CITIES.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name} ({formatCurrency(city.deliveryFee)})
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Dirección de Entrega */}
          <ControlledInput
            name="address"
            control={control}
            label="Dirección de Entrega"
            placeholder="Avda. Mariscal López 1250 esq. San Martín"
            leftIcon={<MapPin className="w-4 h-4 text-stone-400" />}
            rules={{
              required: 'Ingresa tu calle y numeración para el repartidor',
            }}
          />

          {/* Referencia para el Repartidor */}
          <ControlledInput
            name="reference"
            control={control}
            label="Referencia para el Repartidor"
            placeholder="Casa con portón negro y rejas doradas"
            leftIcon={<Compass className="w-4 h-4 text-stone-400" />}
            helperText="Punto de referencia visible, color de muralla o número de casa."
          />

          {/* GPS Location Capture Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleCaptureGps}
              disabled={isLocating}
              className="w-full bg-[#fdf2f4] hover:bg-[#fae4e8] active:scale-[0.99] border border-[#f5c2cd] text-[#5a061a] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              {isLocating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Obteniendo coordenadas satelitales...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 stroke-[2.5]" />
                  <span>Usar mi ubicación GPS actual</span>
                </>
              )}
            </button>

            {/* GPS Captured Feedback Badge */}
            {latitude && longitude && (
              <div className="mt-2.5 p-3 rounded-xl bg-[#fdfbf7] border border-[#f5ebd7] flex items-center gap-2.5 text-xs text-stone-700 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-[#9b7036] flex-shrink-0" />
                <span>
                  Coordenadas capturadas: <strong>{latitude}, {longitude}</strong> (Entrega exacta)
                </span>
              </div>
            )}
            {gpsError && (
              <p className="text-[11px] text-rose-600 mt-1.5">{gpsError}</p>
            )}
          </div>
        </div>
      ) : (
        /* Pickup Notice */
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-700 space-y-1">
          <p className="font-bold text-[#9b7036]">
            📍 Boutique Central Maribel Perfumería
          </p>
          <p>
            Tu pedido estará empacado y listo para retirar en nuestra boutique oficial una vez confirmada la orden. Sin costo adicional de envío.
          </p>
        </div>
      )}
    </section>
  );
};
