import Errors from "@/src/components/ui/errors/Errors";
import { Autocomplete as Auto, AutocompleteItem, Merge } from '@heroui/react';
import { useRef, useState } from "react";
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
}

export default function AutoCompleteWhitTabs<T extends FieldValues>({
    data,
    errorMessage,
    name,
    label = "Seleccionar opción",
    watch,
    setValue
}: SelectItemProps<T>) {
    const initState = watch(name) ? watch(name).map((item: string) => data.find(dataItem => dataItem.key === item)) : []
    const [inputValue, setInputValue] = useState("");
    const [selectItems, setSelectItems] = useState<Partial<Option>[]>(initState);
    const position = useRef<HTMLDivElement>(null);

    const filterData = (data: Option[]) => {
        const filter = data.filter(item => !selectItems.some(selectItem => selectItem.key === item.key));
        return filter
    }

    const handleDelete = (key: string) => {
        const filter = selectItems.filter(item => item.key !== key);
        setSelectItems(filter);
        if (filter.length === 0) {
            setInputValue("");
        }
        setValue(name, filter.map(item => item.key) as PathValue<T, Path<T>>, { shouldValidate: true });
    };

    const myFilter = (textValue: string, inputValue: string) => {
        if (inputValue.length === 0) {
            return true;
        }
        textValue = textValue.normalize("NFC").toLocaleLowerCase();
        inputValue = inputValue.normalize("NFC").toLocaleLowerCase();
        return textValue.startsWith(inputValue);
    };

    const handleChange = (value: string) => {
        const exist = data.find((item) => item.key === value);
        if (!exist) return;
        const prepared = [...selectItems, { key: exist.key, label: exist.label }];
        setSelectItems(prepared);
        setValue(name, prepared.map(item => item.key) as PathValue<T, Path<T>>, { shouldValidate: true });
        setInputValue("");
    };

    const labelId = `label-${name}`;

    return (
        <div ref={position} className="relative " style={{ zIndex: 'auto' }}>
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
                <div
                    className={`mt-[8px] rounded-md border ${errorMessage
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
                        defaultItems={filterData(data)}
                        size="lg"
                        radius="sm"
                        showScrollIndicators={true}
                        popoverProps={{
                            portalContainer: position.current ?? undefined,
                            placement: "bottom-start",
                        }}
                        listboxProps={{
                            emptyContent: "No se encontraron resultados",
                            className: "!z-[99999]"
                        }}
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        onSelectionChange={(keys) => handleChange(keys?.toString() as string)}
                        disabledKeys={data
                            .filter((item) => item.active === false || item.active === 0)
                            .map((item) => item.key.toString())}
                        placeholder="Seleccione una opción"
                    >
                        {(item) => (
                            <AutocompleteItem
                                className="z-[99999]"
                                onMouseDown={(e) => e.stopPropagation()}
                                key={item.key}
                            >
                                {item.label}
                            </AutocompleteItem>
                        )}
                    </Auto>
                </div>
                {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {selectItems.length === 0 ? (
                    <span className="text-sm text-center font-medium text-gray-500 dark:text-gray-400">No hay servicios seleccionados</span>

                ) : selectItems.map(item => (
                    <div
                        key={item.key}
                        onDoubleClick={() => handleDelete(item.key?.toString() as string)}
                        className="select-none px-4 py-2 rounded-full text-sm font-medium border transition flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-foreground-100 cursor-pointer h-fit w-fit"
                    >
                        {item.label}
                    </div>
                ))}

            </div>
        </div>
    );
}