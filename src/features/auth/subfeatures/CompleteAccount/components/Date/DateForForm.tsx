
import { DateInput } from '@heroui/react'
import { DateValue } from '@internationalized/date'
import { Errors } from '@/src/components/ui/Errors'
import { FieldError, FieldErrorsImpl, FieldValues, Merge, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useBirthDateForForm } from './hooks'
import { useState } from 'react'

type DateForFormProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    htmlFor?: string;
    register: UseFormRegister<T>;
    setValue: UseFormSetValue<T>;
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export function DateForForm<T extends FieldValues>({
    name,
    register,
    errorMessage,
    label,
    htmlFor,
    setValue
}: DateForFormProps<T>) {
    const [birthDate, setBirthDate] = useState<DateValue | null>(null);
    const { validateDate } = useBirthDateForForm<T>({ value: birthDate, setValue });
    const inputId = `input-${label ? label : htmlFor}`;

    return (
        <div>
            <label htmlFor={inputId} className="overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">
                {label}
            </label>
            <div
                className={`mt-[8px] rounded-md border ${errorMessage ? "border-[#d10b30]" : "border-[#afaeae] dark:border-[#3f3f46]"
                    }`}
            >
                <DateInput
                    size='lg'
                    labelPlacement="outside"
                    value={birthDate as any}
                    onChange={setBirthDate as any}
                />
            </div>

            <input type="hidden" {...register(name, { validate: validateDate })} />
            {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
        </div>
    );
}