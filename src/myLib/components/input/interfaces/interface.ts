import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

export interface InputProps<T extends FieldValues> {
  field: Path<T>;
  type: string;
  placeholder?: string;
  htmlFor: Path<T>;
  label?: string;
  disabled?: boolean;
  errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  Icon?: IconType;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url';
  max?: number;
  maxLength?: number;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T>;
  variant?: 'default' | 'floating';
  className?: string;
  regex?: 'phone' | 'email';
};