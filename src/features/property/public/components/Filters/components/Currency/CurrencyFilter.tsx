import { PopoverTrigger, PopoverContent, Button, RadioGroup, Radio, Popover } from "@heroui/react";
import { useFormFilter } from "@/src/features/property/public/components/Filters/hooks/useFormFilter";
import FormCurrency from "./FormCurrency";
import { FilterPrices } from "@/src/types";

interface CurrencyProps {
    setParam: (key: string, value: string) => void
    getParam: (key: string) => string | undefined
    clearParams: (keys: string[]) => void
}

export function CurrencyFilter({ setParam, getParam, clearParams }: CurrencyProps) {
    const initPrices = {
        minPrice: getParam("minPrice") && Number(getParam("minPrice")),
        maxPrice: getParam("maxPrice") && Number(getParam("maxPrice")),
    } as FilterPrices;

    const { register, handleSubmit, errors, onSubmit, handleClearParams } = useFormFilter<FilterPrices>({
        defaultValues: initPrices,
        clearParams,
        clearKeys: ["minPrice", "maxPrice", "currency"],
    })

    return (
        <Popover className="w-full" showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" className=" text-center">Precios</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px]">
                <div className="w-full">
                    <header className="px-3 py-2 mb-3 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 ">     Precio y Moneda</h3>
                    </header>
                    <RadioGroup
                        orientation="horizontal"
                        value={getParam("currency")}
                        onValueChange={(value) => setParam("currency", value)}
                    >
                        <Radio
                            size="sm"
                            value="PEN"
                            className="text-sm font-medium text-gray-600"
                        >
                            Soles</Radio>
                        <Radio size="sm" value="USD" className="text-sm font-medium text-gray-600">USD</Radio>
                    </RadioGroup>
                    <FormCurrency
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        handleClearParams={handleClearParams}
                    />
                </div>
            </PopoverContent>
        </Popover>
    )
}
