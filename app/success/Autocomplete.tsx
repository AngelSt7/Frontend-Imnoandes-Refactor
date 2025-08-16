import Errors from "@/src/components/ui/errors/Errors";
import { Autocomplete as Auto, AutocompleteItem, Merge } from '@heroui/react';
import { useRef } from "react";
import { FieldValues, Path, UseFormRegisterReturn, UseFormSetValue, UseFormWatch, FieldError, FieldErrorsImpl, PathValue } from "react-hook-form";

interface Option {
    key: string | number;
    label: string;
    active?: boolean | number;
}

interface SelectItemProps<T extends FieldValues> {
    data: Option[];
    name: Path<T>;
    register: UseFormRegisterReturn;
    setValue: UseFormSetValue<T>;
    watch: UseFormWatch<T>;
    label?: string;
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};


export default function Autocomplete<T extends FieldValues>({
    data,
    register,
    errorMessage,
    name,
    label = "Seleccionar opción",
    watch,
    setValue
}: SelectItemProps<T>) {

    const selectedValue = watch(name);

    const position = useRef<HTMLDivElement>(null);

    const myFilter = (textValue: string, inputValue: string) => {
        if (inputValue.length === 0) {
            return true;
        }
        textValue = textValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();

        return textValue.startsWith(inputValue);
    };

    const handleChange = (value: string) => {
        setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
    };

    const labelId = `label-${name}`;

    return (
        <div ref={position} className="relative z-[9999]">
            <div className="w-full z-[9999]">
                <label
                    id={labelId}
                    htmlFor={name}
                    className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7] flex justify-between items-center w-full"
                >
                    <span>{label}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {`(${data.length})`}
                    </span>
                </label>

                <input type="hidden" {...register} />

                <div
                    className={`mt-[8px] z-[9999] rounded-md border ${errorMessage
                        ? "border-[#d10b30]"
                        : "border-[#afaeae] dark:border-[#3f3f46]"
                        }`}
                >
                    <Auto
                        shouldCloseOnBlur={false}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="w-full"
                        defaultFilter={myFilter}
                        aria-labelledby={labelId}
                        defaultItems={data}
                        size="lg"
                        radius="sm"
                        selectedKey={selectedValue}
                        showScrollIndicators={true}
                        popoverProps={{
                            portalContainer: position.current ?? undefined
                        }}
                        listboxProps={{
                            emptyContent: "No se encontraron resultados",
                        }}
                        onSelectionChange={(keys) => handleChange(keys?.toString() as string)}
                        disabledKeys={data
                            .filter((item) => item.active === false || item.active === 0)
                            .map((item) => item.key.toString())}
                        placeholder="Seleccione una opción"
                    >
                        {(item) => <AutocompleteItem className="z-[9999]" onMouseDown={(e) => e.stopPropagation()} key={item.key}>
                            {item.label}
                        </AutocompleteItem>}
                    </Auto>
                </div>

                {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
            </div>
        </div>
    );
}