import { Popover, PopoverTrigger, PopoverContent, Button, RadioGroup, Radio } from "@heroui/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/src/components/ui/inputs/Input";
import { useForm } from 'react-hook-form';
import { FilterPrices } from "@/src/types/publicTypes/publicProperty";

export default function CurrencyFilter() {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const initPrices = { minPrice: '', maxPrice: '', currency: '' }
    const [price, setPrice] = useState(initPrices)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FilterPrices>();

    const onSubmit = (data: FilterPrices) => {
        reset()
        setPrice({
            ...price,
            maxPrice: data.maxPrice.toString(),
            minPrice: data.minPrice.toString()
        })
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(data).forEach(([key, value]) => {
            if (!Number.isNaN(value)) {
                params.set(key, value.toString());
            }
        })
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleSelectCurrency = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value);
        setPrice({ ...price, [key]: value })
        router.push(`${pathname}?${params.toString()}`);
    }

    const handleClearParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        Object.keys(price).forEach((key) => params.delete(key));
        setPrice(initPrices)
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Popover showArrow offset={10} placement="bottom">
            <PopoverTrigger>
                <Button variant="flat" color="secondary">Precios</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px]">
                {(titleProps) => (
                    <div className="px-1 py-2 w-full space-y-3">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                            Precio y Moneda
                        </p>
                        <RadioGroup
                            orientation="horizontal"
                            value={price.currency.toString()}
                            onValueChange={(value) => handleSelectCurrency("currency", value)}
                        >
                            <Radio size="sm" value="PEN">Soles</Radio>
                            <Radio size="sm" value="USD">USD</Radio>
                        </RadioGroup>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5"
                        > 
                            <div className="mt-2 flex flex-row gap-3 w-full ">
                                <Input
                                    htmlFor="minPrice"
                                    field="minPrice"
                                    type="number"
                                    label="Desde"
                                    variant="floating"
                                    register={register}
                                    rules={{
                                        valueAsNumber: true,
                                        min: {
                                            value: 500,
                                            message: "El precio mínimo es 500"
                                        }
                                    }}
                                    errorMessage={errors.minPrice}
                                />
                                <Input
                                    htmlFor="maxPrice"
                                    field="maxPrice"
                                    type="number"
                                    label="Hasta"
                                    placeholder="Precio Máximo"
                                    variant="floating"
                                    register={register}
                                    rules={{
                                        valueAsNumber: true,
                                        max: {
                                            value: 100000000,
                                            message: "El precio máximo es 100000000"
                                        }
                                    }}
                                    errorMessage={errors.maxPrice}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={handleClearParams}
                                    className="w-full"
                                >
                                    Limpiar
                                </button>

                                <Button
                                    radius="sm"
                                    variant="bordered"
                                    fullWidth
                                    type="submit"
                                >
                                    Ver resultados
                                </Button>
                            </div>
                        </form>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}
