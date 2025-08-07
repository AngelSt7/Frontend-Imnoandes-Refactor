import { Dispatch, SetStateAction, useState } from "react";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { DateInput } from "@heroui/react";
import toast from "react-hot-toast";
import { useBirthDateForm } from "@/src/hooks/auth/useBirthDateForm";

type BirthDateFormProps = {
    setBirthDateCheck: Dispatch<SetStateAction<boolean>>;
    setBirthDate: Dispatch<SetStateAction<string | undefined>>
};

export default function BirthDateForm({ setBirthDateCheck, setBirthDate }: BirthDateFormProps) {
    const [value, setValue] = useState<DateValue | null | undefined>(null);
    const { handleValidation } = useBirthDateForm({ setBirthDateCheck, setBirthDate, value });

    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4 p-6">
            <div className="w-full flex flex-col gap-y-2">
                <DateInput
                    label="Fecha de nacimiento"
                    value={value as any}
                    onChange={setValue as any}
                />
                <button
                    onClick={handleValidation}
                    className="mt-4 bg-zinc-800 text-white  font-semibold py-2 rounded-lg transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400"
                >
                    Validar
                </button>
            </div>
        </div>
    );
}
