import { useMemo } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { IconType } from 'react-icons';
import Errors from '../errors/Errors';

type InputProps<T extends FieldValues> = {
  field: Path<T>;
  type: string;
  placeholder?: string;
  htmlFor: Path<T>;
  label?: string;
  disabled?: boolean;
  errorMessage?: FieldError;
  Icon?: IconType;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  max?: number;
  maxLength?: number;
  pattern?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  variant?: 'default' | 'floating';
  className?: string;
  regex?: 'phone' | 'email';
};

export default function Input<T extends FieldValues>({
  type,
  htmlFor,
  placeholder,
  disabled = false,
  errorMessage,
  Icon,
  inputMode,
  label,
  max,
  maxLength,
  pattern,
  register,
  rules = {},
  variant = 'default',
  className,
  field,
  regex
}: InputProps<T>) {
  const isTextArea = type === 'textarea';
  const isNumeric = inputMode === 'numeric' || type === 'number';

  const finalRules = isNumeric
    ? {
        ...rules,
        setValueAs: (v: string) =>
          v === '' || v == null ? null : Number(v),
      }
    : rules;

  const inputClasses = useMemo(() => {
    const base = `text-base block w-full p-2 border ${
      errorMessage
        ? 'border-[#d10b30]'
        : 'border-[#afaeae] dark:border-[#3f3f46]'
    } bg-[#f4f4f5] hover:bg-[#e4e4e7] dark:bg-[#242428] dark:hover:bg-[#3f3f46] rounded-md outline-none focus:ring-1 ${
      errorMessage ? 'ring-[#d10b30]' : 'focus:ring-white/10'
    }`;

    return variant === 'floating'
      ? `${base} peer px-3 pt-3 pb-2`
      : `${base} px-3 py-2.5 pr-10 ${
          isTextArea ? 'min-h-[120px]' : 'h-[50px]'
        }`;
  }, [errorMessage, variant, isTextArea]);

  const autoCompleteValue = useMemo(
    () => (type === 'password' ? 'new-password' : 'off'),
    [type]
  );

  const inputId = `input-${label ? label : htmlFor}`;

  // Clases para el label flotante
  const floatingLabelClasses = `
    absolute left-3 text-gray-500 dark:text-gray-400 text-base 
    transition-all duration-200 ease-in-out origin-left
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100
    peer-focus:-top-1 peer-focus:-translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400
    peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:scale-75
    ${errorMessage ? 'peer-focus:text-[#d10b30]' : ''}
    pointer-events-none select-none
  `;

  return (
    <div className={`flex flex-col w-full gap-2 ${className ?? ''}`}>
      {variant === 'default' && label && (
        <label
          htmlFor={inputId}
          className="select-none capitalize overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021] dark:text-[#c5c5c7]"
        >
          {label}:
        </label>
      )}

      <div className="relative -mb-2">
        {isTextArea ? (
          <>
            <textarea
              id={inputId}
              maxLength={maxLength}
              placeholder={variant === 'floating' ? ' ' : placeholder}
              className={inputClasses}
              {...register(htmlFor, finalRules)}
            />
            {variant === 'floating' && label && (
              <label
                htmlFor={inputId}
                className={`${floatingLabelClasses} peer-placeholder-shown:top-6`}
              >
                {label}
              </label>
            )}
          </>
        ) : (
          <>
            <input
              id={inputId}
              type={type}
              disabled={disabled}
              maxLength={maxLength}
              inputMode={inputMode}
              pattern={pattern}
              min={type === 'number' ? 0 : undefined}
              max={type === 'number' ? max : undefined}
              placeholder={variant === 'floating' ? ' ' : placeholder}
              autoComplete={autoCompleteValue}
              className={inputClasses}
              onKeyDown={(e) => {
                if (
                  inputMode === 'numeric' &&
                  !/[0-9]/.test(e.key) &&
                  !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              {...register(field, finalRules)}
            />
            {variant === 'floating' && label && (
              <label
                htmlFor={inputId}
                className={floatingLabelClasses}
              >
                {label}
              </label>
            )}
          </>
        )}

        {Icon && !isTextArea && (
          <Icon
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={20}
          />
        )}
      </div>

      {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
    </div>
  );
}