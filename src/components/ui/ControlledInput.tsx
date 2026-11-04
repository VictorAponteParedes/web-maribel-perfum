import React, { ReactNode } from 'react';
import { useController, Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftPrefix?: ReactNode;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export const ControlledInput = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  leftIcon,
  rightIcon,
  leftPrefix,
  helperText,
  required = false,
  className = '',
}: ControlledInputProps<T>): React.ReactElement => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...(required && !rules?.required ? { required: 'Este campo es requerido' } : {}),
      ...rules,
    },
  });

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-xs sm:text-sm font-semibold text-stone-700">
            {label}
          </label>
          {required && (
            <span className="text-[11px] font-medium text-[#9b7036]">Requerido</span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        {leftPrefix && <div className="flex-shrink-0">{leftPrefix}</div>}

        <div className="relative flex-1 flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-stone-400 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </span>
          )}

          <input
            id={name}
            {...field}
            value={field.value ?? ''}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full bg-[#fdfbf9] border rounded-xl py-3 text-sm text-stone-900 placeholder:text-stone-400 transition-all outline-none ${
              leftIcon ? 'pl-10' : 'pl-4'
            } ${rightIcon ? 'pr-10' : 'pr-4'} ${
              error
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                : 'border-stone-200/90 focus:border-[#5a061a] focus:ring-2 focus:ring-[#5a061a]/10 bg-white'
            } ${disabled ? 'opacity-60 cursor-not-allowed bg-stone-100' : ''}`}
          />

          {rightIcon && (
            <span className="absolute right-3.5 text-stone-400 pointer-events-none flex items-center justify-center">
              {rightIcon}
            </span>
          )}
        </div>
      </div>

      {error ? (
        <span className="text-[11px] font-medium text-rose-600 mt-0.5">
          {error.message}
        </span>
      ) : helperText ? (
        <span className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1.5">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};
