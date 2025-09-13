import { Popover, PopoverTrigger, PopoverContent, Button, RadioGroup, Radio } from "@heroui/react";
import { useFormFilter } from "@/src/features/property/public/components/Filters/hooks/useFormFilter";
import FormCurrency from "./FormCurrency";
import { FilterPrices } from "@/src/types";

interface CurrencyProps {
    setParam: (key: string, value: string) => void
    getParam: (key: string) => string | undefined
    deleteParams: (keys: string[]) => void
}

export default function CurrencyFilter({ setParam, getParam, deleteParams }: CurrencyProps) {
    const initPrices = {  minPrice: Number(getParam("minPrice")),  maxPrice: Number(getParam("maxPrice")) }

    const { register, handleSubmit, errors , onSubmit, handleClearParams } = useFormFilter<FilterPrices>({
        defaultValues: initPrices,
        deleteParams,
        clearKeys: ["minPrice", "maxPrice", "currency"],
    })

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" color="secondary">Precios</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full space-y-3">
                        <p className="text-lg font-medium text-gray-900 mb-4" {...titleProps}>
                            Precio y Moneda
                        </p>
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
                )}
            </PopoverContent>
        </Popover>
    )
}
