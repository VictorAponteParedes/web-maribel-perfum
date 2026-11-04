import React from 'react';
import { Control } from 'react-hook-form';
import { User, MessageSquare } from 'lucide-react';
import { ControlledInput } from '@/components/ui/ControlledInput';
import { CheckoutFormValues } from '../types/checkout.types';

interface CustomerStepProps {
  control: Control<CheckoutFormValues>;
}

export const CustomerStep: React.FC<CustomerStepProps> = ({ control }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5a061a] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#5a061a]/20">
          1
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          ¿A quién le entregamos?
        </h2>
      </div>

      <div className="space-y-4 pt-1">
        {/* Full Name */}
        <ControlledInput
          name="fullName"
          control={control}
          label="Nombre y Apellido"
          placeholder="Ej. Valeria Montserrat Benítez"
          leftIcon={<User className="w-4 h-4" />}
          rules={{
            required: 'Ingresa tu nombre y apellido completo',
            minLength: { value: 3, message: 'Ingresa un nombre válido' },
          }}
        />

        {/* WhatsApp Phone */}
        <ControlledInput
          name="phone"
          control={control}
          label="WhatsApp de Confirmación"
          placeholder="0981 445 892"
          required
          type="tel"
          leftPrefix={
            <div className="flex items-center gap-1.5 bg-[#fdfbf9] border border-stone-200/90 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-semibold text-stone-800 shadow-xs">
              <span className="text-base leading-none">🇵🇾</span>
              <span>+595</span>
            </div>
          }
          leftIcon={<MessageSquare className="w-4 h-4 text-stone-400" />}
          rules={{
            required: 'El número de WhatsApp es requerido',
            pattern: {
              value: /^[0-9\s-]{8,15}$/,
              message: 'Ingresa un número de celular válido (ej. 0981 445 892)',
            },
          }}
          helperText="Te escribiremos aquí para confirmar el despacho inmediato."
        />
      </div>
    </section>
  );
};
