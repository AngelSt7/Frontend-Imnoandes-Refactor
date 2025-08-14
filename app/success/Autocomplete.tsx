import Errors from "@/src/components/ui/errors/Errors";
import { Autocomplete as Auto, AutocompleteItem, Merge } from "@heroui/react";
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
    setValue,
}: SelectItemProps<T>) {

    const selectedValue = watch(name);

    const handleChange = (value: string) => {
        setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
    };

    const labelId = `label-${name}`;

    return (

        <div className="w-full">
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
                className={`mt-[8px] rounded-md border ${errorMessage
                    ? "border-[#d10b30]"
                    : "border-[#afaeae] dark:border-[#3f3f46]"
                    }`}
            >
                <Auto
                    className="max-w-xs"
                    defaultItems={animals}
                    label="Favorite Animal"
                    selectedKey={selectedValue}
                    showScrollIndicators={true}
                    onSelectionChange={(keys) => handleChange(keys?.toString() as string)}
                    listboxProps={{
                        emptyContent: "No se encontraron resultados",
                    }}
                    disabledKeys={data
                        .filter((item) => item.active === false || item.active === 0)
                        .map((item) => item.key.toString())}
                    placeholder="Seleccione una opción"
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Auto>
            </div>

            {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
        </div>
    );
}

export const animals = [
    { label: "Cat", key: "cat" },
    { label: "Dog", key: "dog" },
    { label: "Elephant", key: "elephant" },
    { label: "Lion", key: "lion" },
    { label: "Tiger", key: "tiger" },
    { label: "Giraffe", key: "giraffe" },
    {
        label: "Dolphin",
        key: "dolphin",
    },
    { label: "Penguin", key: "penguin" },
    { label: "Zebra", key: "zebra" },
    {
        label: "Shark",
        key: "shark",
    },
    {
        label: "Whale",
        key: "whale"
    },
    { label: "Otter", key: "otter" },
    { label: "Crocodile", key: "crocodile" },
];
